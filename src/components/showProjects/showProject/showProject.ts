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
  action: "showProject" | "showToday" | "showUpcoming",
  project?: Project
) => {
  const projectList = document.querySelector(`.${projectsStyles.projectList}`)!;
  const projectDiv = document.createElement("div");

  const projectName = document.createElement("span");
  switch (action) {
    case "showToday": {
      const icon = showIcon(projectDiv, "star");
      // could be handled by showIcon
      icon.classList.add(globalStyles.todayIcon);
      projectName.textContent = "Today";
      projectDiv.addEventListener("click", () => {
        router.navigate("today");
        toggleMobileMenu();
        // showTodoArea("showToday");
      });
      break;
    }
    case "showUpcoming": {
      const icon = showIcon(projectDiv, "date_range");
      icon.classList.add(globalStyles.upcomingIcon);
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
          const icon = showIcon(projectDiv, "inbox");
          icon.classList.add(globalStyles.inboxIcon);
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

  projectList.appendChild(projectDiv);
};

export { showProject };
