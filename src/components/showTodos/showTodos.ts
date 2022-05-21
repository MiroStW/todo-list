/* eslint-disable prefer-destructuring */
/* eslint-disable no-param-reassign */
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import "flatpickr/dist/themes/dark.css";
import { fromUnixTime } from "date-fns";
import {
  getTodosByProject,
  getTodosByDate,
  getInboxProject,
} from "application_logic/storage";
import styles from "./showTodos.module.css";
import todoListStyles from "./todoList/todoList.module.css";
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
  createCancelBtn,
} from "layout/buttons";
import { Project, Todo } from "types";
import { showTodoList } from "./todoList/todoList";

const showTodoArea = async (
  action: "showCompleted" | "showProject" | "showToday" | "showUpcoming",
  project?: Project
) => {
  const todoArea = document.querySelector(`.${styles.todoarea}`)!;
  if (action !== "showCompleted")
    while (todoArea.childNodes.length > 0) {
      todoArea.removeChild(todoArea.childNodes[0]);
    }

  // show header
  const todoHeaderDiv = document.createElement("div");
  todoHeaderDiv.classList.add(styles.todoHeader);
  const todoHeader = document.createElement("h2");
  todoHeaderDiv.appendChild(todoHeader);
  todoArea.appendChild(todoHeaderDiv);

  // show todo list
  const todoList = document.createElement("div");
  todoList.classList.add(todoListStyles.todoList);
  todoArea.appendChild(todoList);

  // show completed todos
  const todoListCompleted = document.createElement("div");
  todoListCompleted.classList.add(todoListStyles.todoListCompleted);
  todoListCompleted.setAttribute("hidden", "");
  todoArea.appendChild(todoListCompleted);

  switch (action) {
    case "showCompleted":
      if (!project) {
        getInboxProject().then((inbox) => {
          getTodosByProject(inbox, showTodoList, true);
        });
      } else getTodosByProject(project, showTodoList, true);
      break;
    case "showToday":
      todoHeader.textContent = "Today";
      getTodosByDate("past", showTodoList);
      break;
    case "showUpcoming":
      todoHeader.textContent = "Upcoming";
      getTodosByDate("future", showTodoList);
      break;
    case "showProject":
      if (!project) {
        getInboxProject().then((inbox) => {
          todoHeader.textContent = inbox.data.name;
          getTodosByProject(inbox, showTodoList, false);
          createNewItemBtn(todoArea, "todo", project);
        });
      } else {
        todoHeader.textContent = project.data.name;
        getTodosByProject(project, showTodoList, false);
        createNewItemBtn(todoArea, "todo", project);
        completedTodosBtn(project, todoListCompleted, todoHeaderDiv);
      }
      break;
    default:
      break;
  }
};
export { showTodoArea };

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
