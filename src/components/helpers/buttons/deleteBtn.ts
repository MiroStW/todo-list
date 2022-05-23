import { Project, Todo } from "types";
import { deleteTodo, archiveProject } from "../../../application_logic/storage";
import globalStyles from "style.module.css";
import addIcon from "./addIcon";

const deleteBtn = (
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

export { deleteBtn };
