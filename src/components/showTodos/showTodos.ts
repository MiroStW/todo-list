/* eslint-disable prefer-destructuring */
/* eslint-disable no-param-reassign */
import "flatpickr/dist/flatpickr.min.css";
import "flatpickr/dist/themes/dark.css";
import {
  getTodosByProject,
  getTodosByDate,
} from "application_logic/storage/getTodos";
import { getInboxProject } from "application_logic/storage/getInboxProject";
import styles from "./showTodos.module.css";
import todoListStyles from "./todoList/todoList.module.css";
import { Project } from "types";
import { showTodoList } from "./todoList/todoList";
import { createItemBtn } from "components/helpers/buttons/createItemBtn";
import { completedTodosBtn } from "./showTodo/completedTodosBtn";
import { showIcon } from "components/helpers/buttons/showIcon";

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
    case "showCompleted": {
      if (!project) {
        getInboxProject().then((inbox) => {
          getTodosByProject(inbox, showTodoList, true);
        });
      } else getTodosByProject(project, showTodoList, true);
      break;
    }
    case "showToday": {
      showIcon({
        parent: todoHeaderDiv,
        iconName: "star",
        style: "filled",
        size: 20,
        color: "yellow",
      });
      todoHeader.textContent = "Today";
      getTodosByDate("past", showTodoList);
      todoHeaderDiv.appendChild(todoHeader);
      break;
    }
    case "showUpcoming": {
      showIcon({
        parent: todoHeaderDiv,
        iconName: "date_range",
        style: "filled",
        size: 20,
        color: "red",
      });
      todoHeader.textContent = "Upcoming";
      getTodosByDate("future", showTodoList);
      todoHeaderDiv.appendChild(todoHeader);
      break;
    }
    case "showProject": {
      if (!project) project = await getInboxProject();
      if (project.data.isInbox) {
        showIcon({
          parent: todoHeaderDiv,
          iconName: "inbox",
          style: "filled",
          size: 20,
          color: "teal",
        });
      }
      todoHeader.textContent = project.data.name;
      getTodosByProject(project, showTodoList, false);
      createItemBtn(todoArea, "todo", project);
      todoHeaderDiv.appendChild(todoHeader);
      completedTodosBtn(project, todoListCompleted, todoHeaderDiv);
      break;
    }
    default:
      break;
  }
};
export { showTodoArea };
