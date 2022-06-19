import { deleteBtn } from "components/helpers/buttons/deleteBtn";
import { Project } from "types";
import styles from "./showProject.module.css";
import projectsStyles from "../projectList/projectList.module.css";
import globalStyles from "style.module.css";
import { router } from "application_logic/router";
import { isInbox } from "application_logic/storage";
import showIcon from "components/helpers/buttons/showIcon";
import renameBtn from "components/helpers/buttons/renameBtn";
import { toggleMobileMenu } from "components/showHeader/mobileMenuBtn/mobileMenuBtn";

const showProject = (
  parent: Element,
  action: "showProject" | "showToday" | "showUpcoming",
  project?: Project
) => {
  const projectDiv = document.createElement("div");

  const projectName = document.createElement("span");
  switch (action) {
    case "showToday": {
      showIcon({
        parent: projectDiv,
        iconName: "star",
        color: "yellow",
      });
      projectName.textContent = "Today";
      projectDiv.addEventListener("click", () => {
        router.navigate("today");
        toggleMobileMenu();
        // showTodoArea("showToday");
      });
      break;
    }
    case "showUpcoming": {
      showIcon({
        parent: projectDiv,
        iconName: "date_range",
        color: "red",
      });
      projectName.textContent = "Upcoming";
      projectDiv.addEventListener("click", () => {
        router.navigate("upcoming");
        toggleMobileMenu();
        // showTodoArea("showUpcoming");
      });
      break;
    }
    default: {
      if (project) {
        if (isInbox(project)) {
          showIcon({
            parent: projectDiv,
            iconName: "inbox",
            color: "teal",
          });
        }
        projectName.textContent = project.data.name;
        projectDiv.addEventListener("click", () => {
          router.navigate(`projects/${project.ref.id}`);
          toggleMobileMenu();
          // showTodoArea("showProject", project);
        });
      }
      break;
    }
  }
  projectDiv.appendChild(projectName);

  // buttons only for projects & if != inbox
  if (project && !isInbox(project)) {
    projectDiv.classList.add(styles.project);
    renameBtn(projectDiv, project);
    deleteBtn(projectDiv, "project", project);
    projectDiv.addEventListener("mouseover", () => {
      projectDiv.classList.add(globalStyles.active);
    });
    projectDiv.addEventListener("mouseout", () => {
      projectDiv.classList.remove(globalStyles.active);
    });
  } else {
    projectDiv.classList.add(styles.specialProject);
  }

  parent.appendChild(projectDiv);
};

export { showProject };
