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

const getTodos = (project) => {

    // TODO: find a way to assign an auto-incremental ID
    const todos = todoArray.filter((todo) => {return todo.project.name == project.name})

    return todos
}

//initiate local storage
const initiateStorage = (() => {
    if(!localStorage.getItem('todoSystem-projects')) {
        // push default inbox project
        projectArray.push(project("Inbox"));
        // add demo data
        // myLibrary.push(new Book("The lean startup","Eric Ries",250,true));
        // myLibrary.push(new Book("The hard thing about hard things","Ben
        // Horowitz",300,true));
        updateStorage();
    } 
    else restoreData();
})();

export {projectArray, todoArray, project, todo, updateStorage, getTodos}

//TODO: fix updateStorage + add storage of todoArray