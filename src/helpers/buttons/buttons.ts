import {
  format,
  differenceInCalendarDays,
  differenceInCalendarYears,
  fromUnixTime,
} from "date-fns";
import { Timestamp } from "firebase/firestore";
import { Project, Todo } from "types";
import {
  deleteTodo,
  updateTodo,
  updatePriority,
  updateCompleted,
  getProjectOfTodo,
  archiveProject,
} from "../../application_logic/storage";
import globalStyles from "style.module.css";
import todoDetailsStyles from "components/showTodos/todoDetails/todoDetails.module.css";
import todosStyles from "components/showTodos/showTodos.module.css";
import todoStyles from "components/showTodos/showTodo/showTodo.module.css";
import { showTodoArea } from "components/showTodos/showTodos";
import addIcon from "./addIcon";

const showPriority = (parent: Element, priority: number) => {
  const flag = addIcon(parent, "flag", priority === 4 ? "outlined" : undefined);
  flag.classList.add(todoDetailsStyles[`prio${priority}`]);
  flag.classList.add(todoDetailsStyles.todoPriority);
  flag.classList.add(globalStyles["md-18"]);

  return flag;
};

const priorityBtn = (todo: Todo, parent: Element, newPriority: number) => {
  const btn = showPriority(parent, newPriority);
  btn.addEventListener("click", () => {
    updatePriority(todo, newPriority);
    getProjectOfTodo(todo).then((project) => {
      showTodoArea("showProject", project);
    });
    parent.remove();
  });
};

const openPrioPicker = (todo: Todo, parent: Element) => {
  const pickerContainer = document.createElement("div");
  pickerContainer.classList.add(todoDetailsStyles.priorityPicker);
  priorityBtn(todo, pickerContainer, 1);
  priorityBtn(todo, pickerContainer, 2);
  priorityBtn(todo, pickerContainer, 3);
  priorityBtn(todo, pickerContainer, 4);
  parent.appendChild(pickerContainer);
};

const completedTodosBtn = (
  project: Project,
  todoListCompleted: Element,
  parent: Element
) => {
  const btn = document.createElement("span");
  btn.classList.add(
    todoStyles.completedTodosBtn,
    globalStyles.icon,
    "material-icons"
  );
  btn.textContent = "restore";
  btn.addEventListener("click", () => {
    if (todoListCompleted.childElementCount === 0)
      showTodoArea("showCompleted", project);
    todoListCompleted.toggleAttribute("hidden");
    btn.classList.toggle(globalStyles["md-inactive"]);
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
      icon.classList.add(
        "material-icons",
        globalStyles["md-18"],
        globalStyles.todayIcon
      );
      icon.textContent = "star";
    } else if (daysToToday < 7) {
      icon.classList.add(todoStyles.todoDueDateIcon);
      icon.textContent = format(fromUnixTime(todo.data.dueDate.seconds), "E");
    } else if (yearsToToday <= 0) {
      icon.classList.add(todoStyles.todoDueDateIcon);
      icon.textContent = format(
        fromUnixTime(todo.data.dueDate.seconds),
        "d. MMM"
      );
    } else {
      icon.classList.add(todoStyles.todoDueDateIcon);
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
  todoTitleDiv.classList.add(todoStyles.todoTitle);
  todoTitleDiv.textContent = todo.data.name;
  parent.appendChild(todoTitleDiv);
};

const editTodoTitle = (todo: Todo, parent: Element) => {
  const nameInput = document.createElement("input");
  nameInput.classList.add(todoStyles.todoTitle);
  nameInput.value = todo.data.name;
  nameInput.placeholder = "Title";
  parent.querySelector(`.${todoStyles.todoTitle}`)!.replaceWith(nameInput);

  return nameInput;
};

const createUpdateTodoBtn = (
  todo: Todo,
  parent: Element,
  newName: HTMLInputElement,
  newDescription: HTMLTextAreaElement,
  newCompleted: HTMLInputElement,
  newDueDate: HTMLInputElement
) => {
  const saveBtn = document.createElement("button");
  saveBtn.classList.add(globalStyles.primary);
  saveBtn.textContent = "save";
  saveBtn.addEventListener("click", () => {
    if (newDueDate.value) {
      updateTodo(
        todo,
        newName.value,
        newDescription.value,
        newCompleted.hasAttribute("checked"),
        new Timestamp(Date.parse(newDueDate.value) / 1000 || 0, 0)
      );
    } else {
      updateTodo(
        todo,
        newName.value,
        newDescription.value,
        newCompleted.hasAttribute("checked"),
        null
      );
    }
    // getProjectOfTodo(todo).then((project) => {
    //   showTodoArea("showProject", project);
    // });
  });
  parent.appendChild(saveBtn);
};

const createCancelBtn = (todo: Todo, parent: Element) => {
  const cancelBtn = document.createElement("button");
  cancelBtn.textContent = "cancel";
  cancelBtn.addEventListener("click", () => {
    if (confirm("discard changes?"))
      getProjectOfTodo(todo).then((project) => {
        showTodoArea("showProject", project);
      });
  });
  parent.appendChild(cancelBtn);
};

const createDeleteBtn = (
  parent: Element,
  type: "project" | "todo",
  item: Project | Todo
) => {
  const deleteBtn = addIcon(parent, "delete", "outlined");
  deleteBtn.classList.add(globalStyles.icon, globalStyles.hiddenIcon);
  deleteBtn.addEventListener("click", () => {
    type === "project"
      ? // to reduce complexity projects can only be archived, recursive deleteTodo would be necessary
        archiveProject(item as Project)
      : deleteTodo(item as Todo);
  });
  parent.appendChild(deleteBtn);
};

const createSeparator = (parent: Element) => {
  const separator = document.createElement("div");
  separator.classList.add(globalStyles.separator);
  parent.appendChild(separator);
};

export {
  createSeparator,
  todoDueDateIcon,
  completedTodosBtn,
  showTodoTitle,
  editTodoTitle,
  createDeleteBtn,
  createUpdateTodoBtn,
  createCancelBtn,
  showPriority,
  openPrioPicker,
};
