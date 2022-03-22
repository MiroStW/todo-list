/* eslint-disable prefer-destructuring */
/* eslint-disable no-param-reassign */
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import "flatpickr/dist/themes/dark.css";
import { fromUnixTime } from "date-fns";
import {
  getTodosByProject,
  getTodosByDate,
  getProjects,
  isInbox,
} from "../application_logic/storage";
import styles from "../style.module.css";
import {
  todoDueDateIcon,
  completedTodosBtn,
  showTodoTitle,
  editTodoTitle,
  showPriority,
  openPrioPicker,
  completeTodoCheckbox,
  createUpdateTodoBtn,
  createDeleteBtn,
  createNewItemBtn,
} from "./buttons";
import { Project, Todo } from "types";

const clearTodoList = (todoArea: Element) => {
  // clear displayed todo Area
  if (todoArea) {
    while (todoArea.childNodes.length > 0) {
      todoArea.removeChild(todoArea.childNodes[0]);
    }
  }
};

const showTodoDetails = (todo: Todo, todoDiv: Element) => {
  todoDiv.classList.add(styles.active);

  // make title editable
  const nameInput = editTodoTitle(todo, todoDiv);
  nameInput.focus();

  const todoDivOpen = document.createElement("div");
  todoDivOpen.classList.add(styles.todoOpen);

  // todo description
  // [] expand textarea when reopening todo
  const descriptionInput = document.createElement("textarea");
  descriptionInput.value = todo.data.description;
  descriptionInput.placeholder = "Description";

  function OnInput(this: HTMLElement) {
    // console.log('height changed;');
    this.style.height = "auto";
    this.style.height = `${this.scrollHeight}px`;
  }
  descriptionInput.addEventListener("input", OnInput, false);

  todoDivOpen.appendChild(descriptionInput);

  // todo duedate
  const dueDateInput = document.createElement("input");
  dueDateInput.classList.add(styles.todoDueDate);
  dueDateInput.placeholder = "Due date";
  todoDivOpen.appendChild(dueDateInput);

  // show created date
  // const createdDate = document.createElement("div");
  // createdDate.textContent = format(
  //   fromUnixTime(todo.createdDate),
  //   "yyyy-mm-dd"
  // );
  // todoDivOpen.appendChild(createdDate);

  // buttons
  createUpdateTodoBtn(
    todo,
    todoDivOpen,
    nameInput,
    descriptionInput,
    dueDateInput
  );

  todoDiv.appendChild(todoDivOpen);

  flatpickr(dueDateInput, {
    defaultDate: todo.data.dueDate
      ? fromUnixTime(todo.data.dueDate.seconds)
      : undefined,
  });
};

const showTodoBar = (todo: Todo) => {
  const todoArea = document.querySelector(`.${styles.todoarea}`)!;
  const todoDiv = document.createElement("div");
  todoDiv.classList.add(styles.todo);

  // complete checkbox
  completeTodoCheckbox(todo, todoDiv);

  // priority flag
  const priority = showPriority(todoDiv, todo.data.priority);
  priority.addEventListener("click", () => {
    openPrioPicker(todo, todoDiv);
  });

  // todo bar
  const todoBarDiv = document.createElement("div");
  todoBarDiv.classList.add(styles.todoBar);
  todoDiv.appendChild(todoBarDiv);

  // dueDate icon
  todoDueDateIcon(todo, todoBarDiv);

  // todo title
  showTodoTitle(todo, todoBarDiv);

  // remove button
  createDeleteBtn(todoBarDiv, "todo", todo);

  todoDiv.addEventListener("mouseover", () => {
    todoBarDiv.classList.add(styles.active);
  });
  todoDiv.addEventListener("mouseout", () => {
    todoBarDiv.classList.remove(styles.active);
  });

  todoBarDiv.addEventListener(
    "click",
    () => {
      showTodoDetails(todo, todoDiv);
    },
    { once: true }
  );

  todoArea.appendChild(todoDiv);
};

const showTodoList = async (
  action: "showCompleted" | "showProject" | "showToday" | "showUpcoming",
  project?: Project
) => {
  const todoArea = document.querySelector(`.${styles.todoarea}`)!;
  if (action !== "showCompleted") {
    clearTodoList(todoArea);
  }

  // show todolist header
  const todoHeaderDiv = document.createElement("div");
  todoHeaderDiv.classList.add(styles.todoHeader);
  const todoHeader = document.createElement("h2");
  switch (action) {
    case "showCompleted":
      todoHeader.textContent = "Completed Todos";
      break;
    case "showToday":
      todoHeader.textContent = "Today";
      break;
    case "showUpcoming":
      todoHeader.textContent = "Upcoming";
      break;
    case "showProject":
      if (!project) {
        project = (await getProjects()).find((project) => isInbox(project))!;

        todoHeader.textContent = project.data.name;
      } else {
        todoHeader.textContent = project.data.name;
      }
      break;
    default:
      break;
  }
  todoHeaderDiv.appendChild(todoHeader);
  if (action === "showProject" && project)
    completedTodosBtn(project, todoHeaderDiv);
  todoArea.appendChild(todoHeaderDiv);

  // show todos
  if (action === "showToday") {
    getTodosByDate("past").then((todos) =>
      todos.forEach((todo) => {
        showTodoBar(todo);
      })
    );
  } else if (action === "showUpcoming") {
    getTodosByDate("future").then((todos) =>
      todos.forEach((todo) => {
        showTodoBar(todo);
      })
    );
  } else if (action === "showProject" && project) {
    getTodosByProject(project)
      .then((todos) => todos.filter((todo) => !todo.data.complete))
      .then((openTodos) =>
        openTodos.forEach((todo) => {
          console.log(todo);
          showTodoBar(todo);
        })
      );
    createNewItemBtn(todoArea, "todo", project);
  } else if (action === "showCompleted" && project) {
    getTodosByProject(project).then((todos) =>
      todos
        .filter((todo) => todo.data.complete)
        .forEach((todo) => {
          showTodoBar(todo);
        })
    );
  }
};

export { showTodoList, showTodoDetails };

// overall todoArea
// [x] focus immediately in title
// [ ] put each element in own function
// [ ] review button.js & clean up structure
// [x] create function to close todo
// [ ] BONUS opening a todo closes all other todos (only one open at a time)
// [ ] BONUS clicking anywhere else in todoArea closes open todo

// dueDate
// [x] add datepicker
// [x] dueDate needs to be saved as real date, not string
// [x] add dueDate icons

// complete todo
// [x] completed todos should have checked checkbox
// [x] put completed todos in 'done' list
// [x] add transition period before checked todo is moved there
// [x] have done list closed by default

// [ ] add ability to move todos between projects

// projectArea
// [x] add today view
// [x] add upcoming view
// [ ] highlight open project
