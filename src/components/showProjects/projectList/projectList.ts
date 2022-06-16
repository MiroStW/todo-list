import { Project } from "types";
import { isInbox } from "application_logic/storage";
import styles from "../showProjects.module.css";
import { showProject } from "../showProject/showProject";

const showSeparator = (parent: Element) => {
  const separator = document.createElement("div");
  separator.classList.add(styles.separator);
  parent.appendChild(separator);
};

const projectList = (parent: Element, projects: Project[]) => {
  parent.innerHTML = "";
  // inbox view
  showProject(
    parent,
    "showProject",
    projects.find((project) => isInbox(project))
  );

  showSeparator(parent);

  // special views
  showProject(parent, "showToday");
  showProject(parent, "showUpcoming");

  showSeparator(parent);

  // project list without inbox
  projects.forEach((project) => {
    if (!isInbox(project)) showProject(parent, "showProject", project);
  });
};

export { projectList };
