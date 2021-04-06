import {createRenameBtn, createDeleteBtn, createNewItemBtn} from "./buttons.js";
import {projectList} from "../application_logic/arrays.js";
import {showTodos} from "./todos_view.js";

const showProjects = () => {
    const projectArea = document.querySelector(".projectarea");
    clearProjectList(projectArea);
    // show project list
    const projectsHeader = document.createElement("h2");
    projectsHeader.textContent = "Projects";
    projectArea.appendChild(projectsHeader);
    projectList.projects.forEach(project => {
        const projectDiv = document.createElement("div");

        const projectName = document.createElement("span");
        projectName.textContent = project.name;
        projectName.addEventListener("click", () => {showTodos(project);})
        projectDiv.appendChild(projectName);

        if (project !== projectList.projects[0]) {
            createRenameBtn(projectDiv,project);
            createDeleteBtn(projectDiv,project);
        }

        projectArea.appendChild(projectDiv);
    });

    createNewItemBtn(projectArea,"project");
    
}

const clearProjectList = (projectArea) => {
    //clear displayed project Area
    if (projectArea && projectArea.childNodes.length > 0) {
        while (projectArea.firstChild) {
            projectArea.removeChild(projectArea.lastChild);
          }
    }
}

export {showProjects}