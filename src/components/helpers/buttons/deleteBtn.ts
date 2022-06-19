import { Project, Todo } from "types";
import { deleteTodo, archiveProject } from "../../../application_logic/storage";
import globalStyles from "style.module.css";
import showIcon from "./showIcon";

const deleteBtn = (
  parent: Element,
  type: "project" | "todo",
  item: Project | Todo
) => {
  const deleteBtn = showIcon({ parent, iconName: "delete", style: "outlined" });
  deleteBtn.classList.add(globalStyles.icon, globalStyles.hiddenIcon);
  deleteBtn.addEventListener("click", () => {
    type === "project"
      ? // to reduce complexity projects can only be archived, recursive deleteTodo would be necessary
        archiveProject(item as Project)
      : deleteTodo(item as Todo);
  });
  parent.appendChild(deleteBtn);
};

export { deleteBtn };
