import showProjectList from "./layout/projects_view";
import { showTodoList } from "./layout/todos_view";
import styles from "./style.module.css";

const root = document.querySelector("#root");

// header
const header = document.createElement("div");
header.classList.add(styles.header);
header.textContent = "Todo system";
root.appendChild(header);

// project list
const projectArea = document.createElement("div");
projectArea.classList.add(styles.projectarea);
root.appendChild(projectArea);

// Todo list
const todoArea = document.createElement("div");
todoArea.classList.add(styles.todoarea);
root.appendChild(todoArea);

showProjectList();
showTodoList("showProject");
