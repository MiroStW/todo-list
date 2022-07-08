import { deleteBtn } from "components/helpers/buttons/deleteBtn";
import { Project } from "types";
import styles from "./showProject.module.css";
import globalStyles from "style.module.css";
import { router } from "application_logic/router";
import { isInbox } from "application_logic/storage/storage";
import { showIcon } from "components/helpers/buttons/showIcon";
import { renameBtn } from "components/helpers/buttons/renameBtn";
import { toggleMobileMenu } from "components/showHeader/mobileMenuBtn/mobileMenuBtn";

const showToday = (parent: Element) => {
  const projectDiv = document.createElement("div");
  projectDiv.classList.add(styles.specialProject);
  const projectName = document.createElement("span");
  projectName.classList.add(styles.projectName);
  projectName.textContent = "Today";

  showIcon({
    parent: projectDiv,
    iconName: "star",
    color: "yellow",
  });

  projectDiv.addEventListener("click", () => {
    router.navigate("today");
    toggleMobileMenu();
  });

  projectDiv.appendChild(projectName);
  parent.appendChild(projectDiv);
};

const showUpcoming = (parent: Element) => {
  const projectDiv = document.createElement("div");
  projectDiv.classList.add(styles.specialProject);
  const projectName = document.createElement("span");
  projectName.classList.add(styles.projectName);
  projectName.textContent = "Upcoming";

  showIcon({
    parent: projectDiv,
    iconName: "date_range",
    color: "red",
  });

  projectDiv.addEventListener("click", () => {
    router.navigate("upcoming");
    toggleMobileMenu();
  });

  projectDiv.appendChild(projectName);
  parent.appendChild(projectDiv);
};

const showProject = (parent: Element, project: Project) => {
  const projectDiv = document.createElement("div");
  const projectName = document.createElement("span");
  projectName.classList.add(styles.projectName);
  projectName.textContent = project.data.name;

  if (isInbox(project)) {
    projectDiv.classList.add(styles.specialProject);

    showIcon({
      parent: projectDiv,
      iconName: "inbox",
      color: "teal",
    });

    projectDiv.appendChild(projectName);
  }
  // buttons only for projects & if != inbox
  else {
    projectDiv.appendChild(projectName);

    projectDiv.classList.add(styles.project);
    renameBtn(projectDiv, project);
    deleteBtn(projectDiv, "project", project);
    projectDiv.addEventListener("mouseover", () => {
      projectDiv.classList.add(globalStyles.active);
    });
    projectDiv.addEventListener("mouseout", () => {
      projectDiv.classList.remove(globalStyles.active);
    });
  }

  projectDiv.addEventListener("click", () => {
    router.navigate(`projects/${project.ref.id}`);
    toggleMobileMenu();
  });

  parent.appendChild(projectDiv);
};

export { showProject, showToday, showUpcoming };
