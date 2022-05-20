import { createNewItemBtn } from "layout/buttons";
import { Project } from "types";
import { projectList } from "./projectList/projectList";
import styles from "./showProjects.module.css";

const clearProjectArea = (projectArea: Element) => {
  // clear displayed project Area
  while (projectArea.childNodes.length > 0) {
    projectArea.removeChild(projectArea.childNodes[0]);
  }
};

const showProjects = (projects: Project[]) => {
  const projectArea = document.querySelector(`.${styles.projectarea}`)!;
  clearProjectArea(projectArea);

  // header
  const projectsHeader = document.createElement("h2");
  projectsHeader.textContent = "Projects";
  projectArea.appendChild(projectsHeader);

  projectList(projects);

  createNewItemBtn(projectArea, "project");
};

export { showProjects };
