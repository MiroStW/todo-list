/* eslint-disable prefer-destructuring */
/* eslint-disable no-param-reassign */
import "flatpickr/dist/flatpickr.min.css";
import "flatpickr/dist/themes/dark.css";
import {
  getTodosByProject,
  getTodosByDate,
  getInboxProject,
} from "application_logic/storage";
import styles from "./showTodos.module.css";
import todoListStyles from "./todoList/todoList.module.css";
import { completedTodosBtn, createNewItemBtn } from "layout/buttons";
import { Project } from "types";
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
