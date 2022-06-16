import createItemBtn from "components/helpers/buttons/createItemBtn";
import styles from "./showProjects.module.css";

const showHeader = (parent: Element) => {
  const projectsHeader = document.createElement("h2");
  projectsHeader.textContent = "Projects";
  parent.appendChild(projectsHeader);
};

const showProjectList = (parent: Element) => {
  const projectList = document.createElement("div");
  projectList.classList.add(styles.projectList);
  parent.appendChild(projectList);

  return projectList;
};

const showProjects = (parent: Element) => {
  // pass over projectArea Element instead of find it again and maybe merge with showTodos?

  showHeader(parent);

  showProjectList(parent);

  createItemBtn(parent, "project");
};

export { showProjects };
