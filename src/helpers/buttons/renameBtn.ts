import { renameItem } from "application_logic/storage";
import { Project } from "types";
import addIcon from "./addIcon";
import globalStyles from "style.module.css";

const renameBtn = (parent: Element, project: Project) => {
  const renameBtn = addIcon(parent, "edit", "outlined");
  renameBtn.classList.add(globalStyles.icon, globalStyles.hiddenIcon);
  renameBtn.addEventListener("click", () => {
    renameItem(project);
  });
  parent.appendChild(renameBtn);
};

export default renameBtn;
