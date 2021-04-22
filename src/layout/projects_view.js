import {projectArray} from "../application_logic/arrays";
import {addIcon, createRenameBtn, createDeleteBtn, createNewItemBtn, createSeparator} from "./buttons";
import {showTodoList} from "./todos_view";
import {initialPage} from "./initial_page";
import { addMilliseconds } from "date-fns";

const showProjectList = () => {
    clearProjectList();

    //header
    const projectsHeader = document.createElement("h2");
    projectsHeader.textContent = "Projects";
    initialPage.projectArea.appendChild(projectsHeader);

    //inbox view
    showProject("showProject",projectArray[0]);

    createSeparator(initialPage.projectArea);

    //special views
    showProject("showToday");
    showProject("showUpcoming");
    
    createSeparator(initialPage.projectArea);

    //project list without inbox
    projectArray
        .slice(1)
        .forEach(project => {
            showProject("showProject",project)
        });

    createNewItemBtn(initialPage.projectArea,"project");    
}

const showProject = (action,project) => {

    const projectDiv = document.createElement("div");

    const projectName = document.createElement("span");
    switch (action) {
        case "showProject":
            if (project === projectArray[0]) {
                const inboxIcon = addIcon(projectDiv,"inbox");
                inboxIcon.classList.add("inboxIcon");
            }
            projectName.textContent = project.name;
            projectDiv.addEventListener("click", () => {
            showTodoList("showProject",project)});
            break;
        case "showToday":
            const todayIcon = addIcon(projectDiv,"star");
            todayIcon.classList.add("todayIcon");
            projectName.textContent = "Today";
            projectDiv.addEventListener("click", () => {
            showTodoList("showToday")});
            break;
        case "showUpcoming":
            const upcomingIcon = addIcon(projectDiv,"date_range");
            upcomingIcon.classList.add("upcomingIcon");
            projectName.textContent = "Upcoming";
            projectDiv.addEventListener("click", () => {
            showTodoList("showUpcoming")});
            break;
    }
    projectDiv.appendChild(projectName);

    // buttons only for projects & if != inbox
    if (project && project !== projectArray[0]) {
        projectDiv.classList.add("project");
        createRenameBtn(projectDiv,"project",project);
        createDeleteBtn(projectDiv,"project",project);
        projectDiv.addEventListener("mouseover", () => {
            projectDiv.classList.add("active")});
        projectDiv.addEventListener("mouseout", () => {
            projectDiv.classList.remove("active")});
    }

    else {
        projectDiv.classList.add("specialProject");
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