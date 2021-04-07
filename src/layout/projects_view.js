import {createRenameBtn, createDeleteBtn, createNewItemBtn} from "./buttons.js";
import {projectList} from "../application_logic/arrays.js";
import {showTodos} from "./todos_view.js";
import {initialPage} from "./initial_page.js";

const showProjects = () => {
    // const projectArea = document.querySelector(".projectarea");
    clearProjectList();
    // show project list
    const projectsHeader = document.createElement("h2");
    projectsHeader.textContent = "Projects";
    initialPage.projectArea.appendChild(projectsHeader);
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

        initialPage.projectArea.appendChild(projectDiv);
    });

    createNewItemBtn(initialPage.projectArea,"project");
    
}

const clearProjectList = () => {
    //clear displayed project Area
    if (initialPage.projectArea && initialPage.projectArea.childNodes.length > 0) {
        while (initialPage.projectArea.firstChild) {
            initialPage.projectArea.removeChild(initialPage.projectArea.lastChild);
          }
    }
}

export {showProjects}