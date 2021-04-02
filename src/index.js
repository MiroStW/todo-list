// factory for todos
const todo = (title, project) => {
// todo properties: title, description, dueDate, priority, project, complete?
    if (project) {
        project.type === "project" ? 
                    project : 
                    project = "inbox"; 
                    //TODO needs to point to inbox project
    }
    const complete = false;
    const description = "";
    const dueDate = null;
    const priority = 4;
    return {title, project, complete, description, dueDate, priority}
}

import {projectList, createProject, deleteProject, renameProject} from "./projects_logic.js";
import { } from "./projects_view.js"; //TODO move views here

console.log("x");

const initialPage = (() => {
    const container = document.querySelector("#content");

    //header
    const header = document.createElement("div");
    header.classList.add("header");
    header.textContent = "Todo system";
    container.appendChild(header);

    //project list
    const projectArea = document.createElement("div");
    projectArea.classList.add("projectlist");
    container.appendChild(projectArea);

    return {projectArea}
})();

const showProjects = () => {
    clearProjectList();
    // show project list
    initialPage.projectArea.textContent = "Projects";
    projectList.projects.forEach(project => {
        const projectDiv = document.createElement("div");
        projectDiv.textContent = project.name;
        
        if (project.name !== "inbox") {
            //rename btn
            const projectRenameBtn = document.createElement("span");
            projectRenameBtn.classList.add("icon");
            projectRenameBtn.textContent = "✎";
            projectRenameBtn.addEventListener("click", () => {renameProject(project)});
            projectDiv.appendChild(projectRenameBtn);

            //delete btn
            const projectDeleteBtn = document.createElement("span");
            projectDeleteBtn.classList.add("icon");
            projectDeleteBtn.textContent = "❌";
            projectDeleteBtn.addEventListener("click", () => {deleteProject(project)});
            projectDiv.appendChild(projectDeleteBtn);
        }

        initialPage.projectArea.appendChild(projectDiv);
    });
    const newProjectBtn = document.createElement("button");
    newProjectBtn.textContent = "new project";
    newProjectBtn.addEventListener("click", () => {createProject()});
    initialPage.projectArea.appendChild(newProjectBtn);
    
}

const clearProjectList = () => {
    //clear displayed project Area
    initialPage.projectArea.childNodes.forEach(child => {child.remove()});
}

showProjects();

// separate logic from DOM
// store in localstorage
// use date-fns to handle duedate