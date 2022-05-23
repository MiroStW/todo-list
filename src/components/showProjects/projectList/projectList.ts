import { Project } from "types";
import { isInbox } from "application_logic/storage";
import styles from "./projectList.module.css";
import showProjectsStyles from "../showProjects.module.css";
import { showProject } from "../showProject/showProject";

const createSeparator = (parent: Element) => {
  const separator = document.createElement("div");
  separator.classList.add(styles.separator);
  parent.appendChild(separator);
};

const projectList = (projects: Project[]) => {
  const projectArea = document.querySelector(
    `.${showProjectsStyles.projectarea}`
  )!;

  const projectList = document.createElement("div");
  projectList.classList.add(styles.projectList);
  projectArea.appendChild(projectList);

  // inbox view
  showProject(
    "showProject",
    projects.find((project) => isInbox(project))
  );

  createSeparator(projectList);

  // special views
  showProject("showToday");
  showProject("showUpcoming");

  createSeparator(projectList);

  // project list without inbox
  projects.forEach((project) => {
    if (!isInbox(project)) showProject("showProject", project);
  });
};

export { projectList };
