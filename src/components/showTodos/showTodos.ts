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
import globalStyles from "style.module.css";
import todoListStyles from "./todoList/todoList.module.css";
import { Project } from "types";
import { showTodoList } from "./todoList/todoList";
import createItemBtn from "components/helpers/buttons/createItemBtn";
import completedTodosBtn from "./showTodo/completedTodosBtn";
import addIcon from "components/helpers/buttons/addIcon";

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
      const icon = addIcon(todoHeaderDiv, "star", "filled", 20);
      icon.classList.add(globalStyles.todayIcon);
      todoHeader.textContent = "Today";
      getTodosByDate("past", showTodoList);
      todoHeaderDiv.appendChild(todoHeader);
      break;
    }
    case "showUpcoming": {
      const icon = addIcon(todoHeaderDiv, "date_range", "filled", 20);
      icon.classList.add(globalStyles.upcomingIcon);
      todoHeader.textContent = "Upcoming";
      getTodosByDate("future", showTodoList);
      todoHeaderDiv.appendChild(todoHeader);
      break;
    }
    case "showProject": {
      if (!project) project = await getInboxProject();
      if (project.data.isInbox) {
        const icon = addIcon(todoHeaderDiv, "inbox", "filled", 20);
        icon.classList.add(globalStyles.inboxIcon);
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
