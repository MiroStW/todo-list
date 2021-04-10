import {projectArray} from "../application_logic/arrays.js";
import {createRenameBtn, createDeleteBtn, createNewItemBtn} from "./buttons.js";
import {showTodos} from "./todos_view.js";
import {initialPage} from "./initial_page.js";

const showProjects = () => {
    clearProjectView();
    // show project list
    const projectsHeader = document.createElement("h2");
    projectsHeader.textContent = "Projects";
    initialPage.projectArea.appendChild(projectsHeader);
    projectArray.forEach(project => {
        const projectDiv = document.createElement("div");
        projectDiv.classList.add("project");

        const projectName = document.createElement("span");
        projectName.textContent = project.name;
        projectDiv.addEventListener("click", () => {showTodos(project);})
        projectDiv.appendChild(projectName);

        if (project !== projectArray[0]) {
            const btnDiv = document.createElement("div");
            btnDiv.classList.add("buttons");
            createRenameBtn(btnDiv,"project",project);
            createDeleteBtn(btnDiv,"project",project);
            projectDiv.addEventListener("mouseover", () => {btnDiv.classList.add("active")});
            projectDiv.addEventListener("mouseout", () => {btnDiv.classList.remove("active")});
            projectDiv.appendChild(btnDiv);
        }

        initialPage.projectArea.appendChild(projectDiv);
    });

    createNewItemBtn(initialPage.projectArea,"project");
    
}

const clearProjectView = () => {
    //clear displayed project Area
    if (initialPage.projectArea && initialPage.projectArea.childNodes.length > 0) {
        while (initialPage.projectArea.firstChild) {
            initialPage.projectArea.removeChild(initialPage.projectArea.lastChild);
          }
    }
}

export {showProjects}