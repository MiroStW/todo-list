import {
  createProject,
  createTodo,
} from "application_logic/storage/createItem";
import { Project } from "types";
import globalStyles from "style.module.css";

const createProjectBtn = (parent: Element) => {
  const newBtn = document.createElement("button");
  newBtn.classList.add(globalStyles.primary);
  newBtn.textContent = "new project";
  newBtn.addEventListener("click", () => {
    createProject();
  });
  parent.appendChild(newBtn);
};

const createTodoBtn = (parent: Element, project: Project) => {
  const newBtn = document.createElement("button");
  newBtn.classList.add(globalStyles.primary);
  newBtn.textContent = "new todo";
  newBtn.addEventListener("click", () => {
    createTodo(project);
  });
  parent.appendChild(newBtn);
};

export { createProjectBtn, createTodoBtn };
