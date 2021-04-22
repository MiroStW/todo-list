import {projectArray} from "../application_logic/arrays";
import {createRenameBtn, createDeleteBtn, createNewItemBtn, showPriority} from "./buttons";
import {showTodoList} from "./todos_view";
import {initialPage} from "./initial_page";

const showProjectList = () => {
    clearProjectList();

    //header
    const projectsHeader = document.createElement("h2");
    projectsHeader.textContent = "Projects";
    initialPage.projectArea.appendChild(projectsHeader);

    //special views
    showProject("showToday");
    showProject("showUpcoming");

    //project list
    projectArray.forEach(project => {showProject("showProject",project)});

    createNewItemBtn(initialPage.projectArea,"project");    
}

const showProject = (action,project) => {

    const projectDiv = document.createElement("div");
    projectDiv.classList.add("project");

    const projectName = document.createElement("span");
    switch (action) {
        case "showProject":
            projectName.textContent = project.name;
            projectDiv.addEventListener("click", () => {
            showTodoList("showProject",project)});
            break;
        case "showToday":
            projectName.textContent = "Today";
            projectDiv.addEventListener("click", () => {
            showTodoList("showToday")});
            break;
        case "showUpcoming":
            projectName.textContent = "Upcoming";
            projectDiv.addEventListener("click", () => {
            showTodoList("showUpcoming")});
            break;
    }
    projectDiv.appendChild(projectName);

    // buttons only for projects & if != inbox
    if (project && project !== projectArray[0]) {
        const btnDiv = document.createElement("div");
        btnDiv.classList.add("btnrow");
        createRenameBtn(btnDiv,"project",project);
        createDeleteBtn(btnDiv,"project",project);
        projectDiv.addEventListener("mouseover", () => {
            btnDiv.classList.add("active")});
        projectDiv.addEventListener("mouseout", () => {
            btnDiv.classList.remove("active")});
        projectDiv.appendChild(btnDiv);
    }

    initialPage.projectArea.appendChild(projectDiv);

}

const clearProjectList = () => {
    //clear displayed project Area
    if (initialPage.projectArea && initialPage.projectArea.childNodes.length > 0) {
        while (initialPage.projectArea.firstChild) {
            initialPage.projectArea.removeChild(initialPage.projectArea.lastChild);
          }
    }
}

export {showProjectList}