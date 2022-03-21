import {
  format,
  differenceInCalendarDays,
  differenceInCalendarYears,
  fromUnixTime,
} from "date-fns";
import { DocumentReference, Timestamp } from "firebase/firestore";
import { Project, Todo } from "types";
import {
  deleteItem,
  updateTodo,
  updatePriority,
  updateCompleted,
  renameItem,
  createItem,
  getProjectOfTodo,
} from "../application_logic/storage";
import styles from "../style.module.css";
import showProjectList from "./projects_view";
import { showTodoList } from "./todos_view";

const addIcon = (parent: Element, iconName: string, style?: "outlined") => {
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

const createNewItemBtn = (
  parent: Element,
  type: "project" | "todo",
  project?: Project
) => {
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

const createRenameBtn = (parent: Element, project: Project) => {
  const renameBtn = addIcon(parent, "edit", "outlined");
  renameBtn.classList.add(styles.icon, styles.hiddenIcon);
  renameBtn.addEventListener("click", () => {
    renameItem(project);
    showProjectList();
  });
  parent.appendChild(renameBtn);
};

const completeTodoCheckbox = (todo: Todo, parent: Element) => {
  const todoComplete = document.createElement("input");
  todoComplete.type = "checkbox";
  todoComplete.classList.add(styles.todoComplete);
  //TODO: does setAttribute checked work?
  if (todo.data.complete) todoComplete.setAttribute("checked", "");
  todoComplete.addEventListener("click", () => {
    updateCompleted(todo);
    if (!document.querySelector(`.${styles.todoOpen}`)) {
      getProjectOfTodo(todo).then((project) => {
        showTodoList("showProject", project);
      });
    }
  });
  parent.appendChild(todoComplete);
};

const showPriority = (parent: Element, priority: number) => {
  const flag = addIcon(parent, "flag", priority === 4 ? "outlined" : undefined);
  flag.classList.add(styles[`prio${priority}`]);
  flag.classList.add(styles.todoPriority);
  flag.classList.add(styles["md-18"]);

  return flag;
};

const priorityBtn = (todo: Todo, parent: Element, newPriority: number) => {
  const btn = showPriority(parent, newPriority);
  btn.addEventListener("click", () => {
    updatePriority(todo, newPriority);
    getProjectOfTodo(todo).then((project) => {
      showTodoList("showProject", project);
    });
    parent.remove();
  });
};

const openPrioPicker = (todo: Todo, parent: Element) => {
  const pickerContainer = document.createElement("div");
  pickerContainer.classList.add(styles.priorityPicker);
  priorityBtn(todo, pickerContainer, 1);
  priorityBtn(todo, pickerContainer, 2);
  priorityBtn(todo, pickerContainer, 3);
  priorityBtn(todo, pickerContainer, 4);
  parent.appendChild(pickerContainer);
};

const completedTodosBtn = (project: Project, parent: Element) => {
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

const todoDueDateIcon = (todo: Todo, parent: Element) => {
  const icon = document.createElement("div");
  if (todo.data.dueDate) {
    const daysToToday = differenceInCalendarDays(
      fromUnixTime(todo.data.dueDate.seconds),
      new Date()
    );
    const yearsToToday = differenceInCalendarYears(
      fromUnixTime(todo.data.dueDate.seconds),
      new Date()
    );

    if (daysToToday <= 0) {
      icon.classList.add("material-icons", styles["md-18"], styles.todayIcon);
      icon.textContent = "star";
    } else if (daysToToday < 7) {
      icon.classList.add(styles.todoDueDateIcon);
      icon.textContent = format(fromUnixTime(todo.data.dueDate.seconds), "E");
    } else if (yearsToToday <= 0) {
      icon.classList.add(styles.todoDueDateIcon);
      icon.textContent = format(
        fromUnixTime(todo.data.dueDate.seconds),
        "d. MMM"
      );
    } else {
      icon.classList.add(styles.todoDueDateIcon);
      icon.textContent = format(
        fromUnixTime(todo.data.dueDate.seconds),
        "MMM yyyy"
      );
    }
  }

  parent.appendChild(icon);
};

const showTodoTitle = (todo: Todo, parent: Element) => {
  const todoTitleDiv = document.createElement("span");
  todoTitleDiv.classList.add(styles.todoTitle);
  todoTitleDiv.textContent = todo.data.name;
  parent.appendChild(todoTitleDiv);
};

const editTodoTitle = (todo: Todo, parent: Element) => {
  const nameInput = document.createElement("input");
  nameInput.classList.add(styles.todoTitle);
  nameInput.value = todo.data.name;
  nameInput.placeholder = "Title";
  parent.querySelector(`.${styles.todoTitle}`)!.replaceWith(nameInput);

  return nameInput;
};

const createUpdateTodoBtn = (
  todo: Todo,
  parent: Element,
  newName: HTMLInputElement,
  newDescription: HTMLTextAreaElement,
  newDueDate: HTMLInputElement
) => {
  const saveBtn = document.createElement("button");
  saveBtn.textContent = "save";
  saveBtn.addEventListener("click", () => {
    if (newDueDate.value) {
      updateTodo(
        todo,
        newName.value,
        newDescription.value,
        new Timestamp(Date.parse(newDueDate.value) / 1000 || 0, 0)
      );
    } else {
      updateTodo(todo, newName.value, newDescription.value, null);
    }
    getProjectOfTodo(todo).then((project) => {
      showTodoList("showProject", project);
    });
  });
  parent.appendChild(saveBtn);
};

const createDeleteBtn = (
  parent: Element,
  type: "project" | "todo",
  item: Project | Todo
) => {
  const deleteBtn = addIcon(parent, "clear");
  deleteBtn.classList.add(styles.icon, styles.hiddenIcon);
  deleteBtn.addEventListener("click", () => {
    deleteItem(item, type);
    if (type === "project") {
      showProjectList();
      // TODO: if open project is deleted project: showTodoList()
    }
    if (type === "todo") {
      getProjectOfTodo(item as Todo).then((project) => {
        showTodoList("showProject", project);
      });
    }
  });
  parent.appendChild(deleteBtn);
};

const createSeparator = (parent: Element) => {
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
