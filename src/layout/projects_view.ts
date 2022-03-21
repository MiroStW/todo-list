import { Project } from "types";
import { isInbox, getProjects } from "../application_logic/storage";
import styles from "../style.module.css";
import {
  addIcon,
  createRenameBtn,
  createDeleteBtn,
  createNewItemBtn,
  createSeparator,
} from "./buttons";
import { showTodoList } from "./todos_view";

const clearProjectList = (projectArea: Element) => {
  // clear displayed project Area
  if (projectArea) {
    while (projectArea.childNodes.length > 0) {
      projectArea.removeChild(projectArea.childNodes[0]);
    }
  }
};

const showProject = (
  action: "showProject" | "showToday" | "showUpcoming",
  project?: Project
) => {
  const projectArea = document.querySelector(`.${styles.projectarea}`)!;
  const projectDiv = document.createElement("div");

  const projectName = document.createElement("span");
  switch (action) {
    case "showToday": {
      const icon = addIcon(projectDiv, "star");
      icon.classList.add(styles.todayIcon);
      projectName.textContent = "Today";
      projectDiv.addEventListener("click", () => {
        showTodoList("showToday");
      });
      break;
    }
    case "showUpcoming": {
      const icon = addIcon(projectDiv, "date_range");
      icon.classList.add(styles.upcomingIcon);
      projectName.textContent = "Upcoming";
      projectDiv.addEventListener("click", () => {
        showTodoList("showUpcoming");
      });
      break;
    }
    default: {
      if (project) {
        if (isInbox(project)) {
          const icon = addIcon(projectDiv, "inbox");
          icon.classList.add(styles.inboxIcon);
        }
        projectName.textContent = project.data.name;
        projectDiv.addEventListener("click", () => {
          showTodoList("showProject", project);
        });
      }
      break;
    }
  }
  projectDiv.appendChild(projectName);

  // buttons only for projects & if != inbox
  if (project && !isInbox(project)) {
    projectDiv.classList.add(styles.project);
    createRenameBtn(projectDiv, project);
    createDeleteBtn(projectDiv, "project", project);
    projectDiv.addEventListener("mouseover", () => {
      projectDiv.classList.add(styles.active);
    });
    projectDiv.addEventListener("mouseout", () => {
      projectDiv.classList.remove(styles.active);
    });
  } else {
    projectDiv.classList.add(styles.specialProject);
  }

  projectArea.appendChild(projectDiv);
};

const showProjectList = () => {
  const projectArea = document.querySelector(`.${styles.projectarea}`)!;
  clearProjectList(projectArea);

  // header
  const projectsHeader = document.createElement("h2");
  projectsHeader.textContent = "Projects";
  projectArea!.appendChild(projectsHeader);

  // inbox view
  getProjects("inbox").then((inbox) => showProject("showProject", inbox[0]));

  createSeparator(projectArea);

  // special views
  showProject("showToday");
  showProject("showUpcoming");

  createSeparator(projectArea);

  // project list without inbox
  getProjects("noInbox").then((projects) =>
    projects.forEach((project) => {
      showProject("showProject", project);
    })
  );

  createNewItemBtn(projectArea, "project");
};

export default showProjectList;