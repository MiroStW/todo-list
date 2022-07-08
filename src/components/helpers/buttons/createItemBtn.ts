import { createItem } from "application_logic/storage/createItem";
import { Project } from "types";
import globalStyles from "style.module.css";

const createItemBtn = (
  parent: Element,
  type: "project" | "todo",
  project?: Project
) => {
  const newBtn = document.createElement("button");
  newBtn.classList.add(globalStyles.primary);
  if (type === "project") {
    newBtn.textContent = "new project";
    newBtn.addEventListener("click", () => {
      createItem(type);
    });
    parent.appendChild(newBtn);
  }
  if (type === "todo") {
    newBtn.textContent = "new todo";
    newBtn.addEventListener("click", () => {
      createItem(type, project);
    });
    parent.appendChild(newBtn);
  }
};

export { createItemBtn };
