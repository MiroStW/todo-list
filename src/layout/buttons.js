import {
  format,
  differenceInCalendarDays,
  differenceInCalendarYears,
  fromUnixTime,
} from "date-fns";
import {
  deleteItem,
  updateTodo,
  updatePriority,
  updateCompleted,
  renameItem,
  createItem,
} from "../application_logic/storage";
import styles from "../style.module.css";
import showProjectList from "./projects_view";
import { showTodoList } from "./todos_view";

const addIcon = (parent, iconName, style) => {
  const icon = document.createElement("span");
  if (style === "outlined") {
    icon.classList.add("material-icons-outlined");
  } else {
    icon.classList.add("material-icons");
  }
  icon.classList.add(styles["md-18"]);
  icon.textContent = iconName;
  parent.appendChild(icon);

  return icon;
};

const createNewItemBtn = (parent, type, project) => {
  const newBtn = document.createElement("button");
  if (type === "project") {
    newBtn.textContent = "new project";
    newBtn.addEventListener("click", () => {
      createItem(type);
      showProjectList();
    });
    parent.appendChild(newBtn);
  }
  if (type === "todo") {
    newBtn.textContent = "new todo";
    newBtn.addEventListener("click", () => {
      createItem(type, project);
      showTodoList("showProject", project);
    });
    parent.appendChild(newBtn);
  }
};

const createRenameBtn = (parent, type, item) => {
  // rename btn
  const renameBtn = addIcon(parent, "edit", "outlined");
  renameBtn.classList.add(styles.icon, styles.hiddenIcon);
  renameBtn.addEventListener("click", () => {
    renameItem(item, type);
    if (type === "project") {
      showProjectList();
    }
    if (type === "todo") {
      showTodoList("showProject", item.project);
    }
  });
  parent.appendChild(renameBtn);
};

const completeTodoCheckbox = (todo, parent) => {
  const todoComplete = document.createElement("input");
  todoComplete.type = "checkbox";
  todoComplete.classList.add(styles.todoComplete);
  if (todo.complete) todoComplete.setAttribute("checked", null);
  todoComplete.addEventListener("click", () => {
    updateCompleted(todo);
    if (!document.querySelector(`.${styles.todoOpen}`)) {
      showTodoList("showProject", todo.project);
    }
  });
  parent.appendChild(todoComplete);
};

const showPriority = (parent, priority) => {
  const style = () => {
    if (priority === 4) {
      return "outlined";
    }
    return undefined;
  };
  const flag = addIcon(parent, "flag", style(priority));
  flag.classList.add(styles[`prio${priority}`]);
  flag.classList.add(styles.todoPriority);
  flag.classList.add(styles["md-18"]);

  return flag;
};

const priorityBtn = (todo, parent, newPriority) => {
  const btn = showPriority(parent, newPriority);
  btn.addEventListener("click", () => {
    updatePriority(todo, newPriority);
    showTodoList("showProject", todo.project);
    parent.remove();
  });
};

const openPrioPicker = (todo, parent) => {
  const pickerContainer = document.createElement("div");
  pickerContainer.classList.add(styles.priorityPicker);
  priorityBtn(todo, pickerContainer, 1);
  priorityBtn(todo, pickerContainer, 2);
  priorityBtn(todo, pickerContainer, 3);
  priorityBtn(todo, pickerContainer, 4);
  parent.appendChild(pickerContainer);
};

const completedTodosBtn = (project, parent) => {
  const btn = document.createElement("span");
  btn.classList.add(styles.completedTodosBtn, styles.icon, "material-icons");
  btn.textContent = "restore";
  btn.addEventListener("click", () => {
    document.querySelector(`.${styles.completedTodoHeader}`)
      ? showTodoList("showProject", project)
      : showTodoList("showCompleted", project);
  });
  parent.appendChild(btn);
};

const todoDueDateIcon = (todo, parent) => {
  const icon = document.createElement("div");
  if (todo.dueDate) {
    const daysToToday = differenceInCalendarDays(
      fromUnixTime(todo.dueDate.seconds),
      new Date()
    );
    const yearsToToday = differenceInCalendarYears(
      fromUnixTime(todo.dueDate.seconds),
      new Date()
    );

    if (daysToToday <= 0) {
      icon.classList.add("material-icons", styles["md-18"], styles.todayIcon);
      icon.textContent = "star";
    } else if (daysToToday < 7) {
      icon.classList.add(styles.todoDueDateIcon);
      icon.textContent = format(fromUnixTime(todo.dueDate.seconds), "E");
    } else if (yearsToToday <= 0) {
      icon.classList.add(styles.todoDueDateIcon);
      icon.textContent = format(fromUnixTime(todo.dueDate.seconds), "d. MMM");
    } else {
      icon.classList.add(styles.todoDueDateIcon);
      icon.textContent = format(fromUnixTime(todo.dueDate.seconds), "MMM yyyy");
    }
  }

  parent.appendChild(icon);
};

const showTodoTitle = (todo, parent) => {
  const todoTitleDiv = document.createElement("span");
  todoTitleDiv.classList.add(styles.todoTitle);
  todoTitleDiv.textContent = todo.name;
  parent.appendChild(todoTitleDiv);
};

const editTodoTitle = (todo, parent) => {
  const nameInput = document.createElement("input");
  nameInput.classList.add(styles.todoTitle);
  nameInput.value = todo.name;
  nameInput.placeholder = "Title";
  parent.querySelector(`.${styles.todoTitle}`).replaceWith(nameInput);

  return nameInput;
};

const createUpdateTodoBtn = (
  todo,
  parent,
  newName,
  newDescription,
  newDueDate
) => {
  const saveBtn = document.createElement("button");
  saveBtn.textContent = "save";
  saveBtn.addEventListener("click", () => {
    updateTodo(todo, newName.value, newDescription.value, newDueDate.value);
    showTodoList("showProject", todo.project);
  });
  parent.appendChild(saveBtn);
};

const createDeleteBtn = (parent, type, item) => {
  const deleteBtn = addIcon(parent, "clear");
  deleteBtn.classList.add(styles.icon, styles.hiddenIcon);
  deleteBtn.addEventListener("click", () => {
    deleteItem(item, type);
    if (type === "project") {
      showProjectList();
      // TODO: if open project is deleted project: showTodoList()
    }
    if (type === "todo") {
      showTodoList("showProject", item.project);
    }
  });
  parent.appendChild(deleteBtn);
};

const createSeparator = (parent) => {
  const separator = document.createElement("div");
  separator.classList.add(styles.separator);
  parent.appendChild(separator);
};

export {
  addIcon,
  createSeparator,
  todoDueDateIcon,
  completedTodosBtn,
  showTodoTitle,
  editTodoTitle,
  createDeleteBtn,
  createUpdateTodoBtn,
  completeTodoCheckbox,
  createRenameBtn,
  createNewItemBtn,
  showPriority,
  openPrioPicker,
};
