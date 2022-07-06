import { renameItem } from "application_logic/storage";
import { Project } from "types";
import { showIcon } from "./showIcon";
import globalStyles from "style.module.css";

const renameBtn = (parent: Element, project: Project) => {
  const renameBtn = showIcon({ parent, iconName: "edit", style: "outlined" });
  renameBtn.classList.add(globalStyles.icon, globalStyles.hiddenIcon);
  renameBtn.addEventListener("click", () => {
    renameItem(project);
  });
  parent.appendChild(renameBtn);
};

export { renameBtn };
