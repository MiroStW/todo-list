import { Project } from "types";
import { isInbox } from "application_logic/storage/storage";
import styles from "../showProjects.module.css";
import {
  showProject,
  showToday,
  showUpcoming,
} from "../showProject/showProject";

const showSeparator = (parent: Element) => {
  const separator = document.createElement("div");
  separator.classList.add(styles.separator);
  parent.appendChild(separator);
};

//TODO rename "showProjectList"
const showProjectList = (parent: Element, projects: Project[]) => {
  parent.innerHTML = "";
  // inbox view
  showProject(parent, projects.find((project) => isInbox(project))!);

  showSeparator(parent);

  // special views
  showToday(parent);
  showUpcoming(parent);

  showSeparator(parent);

  // project list without inbox
  projects.forEach((project) => {
    if (!isInbox(project)) showProject(parent, project);
  });
};

export { showProjectList };
