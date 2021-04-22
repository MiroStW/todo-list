import {isToday, isBefore, isAfter, parseISO} from "date-fns";

// factory for projects
let project = (name) => {
    // maintain a todolist for every project
    // --> now only stored on todo
    // const todos = [];
    const createdDate = Date.now();
    return {name, createdDate}
}

// factory for todos
const todo = (name, parentProject) => {
    // todo properties: title, description, dueDate, priority, project,
    // complete?
    if (!parentProject) {
        //default to "inbox" project
        parentProject = projectArray[0];
    }
    const project = parentProject;
    const complete = false;
    const description = "";
    const dueDate = null;
    const priority = 4;
    const createdDate = Date.now();
    return {name, project, complete, description, dueDate, priority, createdDate}
}

// project & todo array to hold all the data
let projectArray = [];
let todoArray = [];

const updateStorage = () => {
    localStorage.setItem("todoSystem-projects",JSON.stringify(projectArray));
    localStorage.setItem("todoSystem-todos",JSON.stringify(todoArray));
    restoreData();
}

const restoreData = () => {
    projectArray = JSON.parse(localStorage.getItem("todoSystem-projects"),);
    todoArray = JSON.parse(localStorage.getItem("todoSystem-todos"),);
    console.log("projects loaded: ");
    console.log(projectArray);
    console.log("todos loaded: ");
    console.log(todoArray);
}

const getTodosByProject = (project) => {
    // TODO: find a way to assign an auto-incremental ID
    return todoArray.filter((todo) => {return todo.project.name == project.name})
}

const getTodosByDate = (type, dateA, dateB) => {
    switch (type) {
        case "past":
            return todoArray.filter((todo) => {
                return isToday(parseISO(todo.dueDate)) || isBefore(parseISO(todo.dueDate), new Date()) 
            });
        case "future":
            return todoArray.filter((todo) => {
                return isAfter(parseISO(todo.dueDate), new Date()) 
            });
    }
    
}

//initiate local storage
const initiateStorage = (() => {
    if(!localStorage.getItem('todoSystem-projects')) {
        // push default inbox project
        projectArray.push(project("Inbox"));
        // TODO: add demo data?
        updateStorage();
    } 
    else restoreData();
})();

export {getTodosByDate, projectArray, todoArray, project, todo, updateStorage, getTodosByProject}