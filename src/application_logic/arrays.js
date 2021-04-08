// factory for projects
const project = (name) => {
    const proto = {
        type: "project"
    }
    // maintain a todolist for every project
    const todos = [];
    const createdDate = Date.now();
    return Object.assign(Object.create(proto), {name, todos, createdDate})
}

// factory for todos
const todo = (name, parentProject) => {
    // todo properties: title, description, dueDate, priority, project,
    // complete?
    const proto = {
        type: "todo"
    }
    if (!parentProject || parentProject.type !== "project") {
        parentProject = projectArray[0];
    }
    const project = parentProject;
    const complete = false;
    const description = "";
    const dueDate = null;
    const priority = 4;
    const createdDate = Date.now();
    return Object.assign(Object.create(proto), {name, project, complete, description, dueDate, priority, createdDate})
}

// projects array
let projectArray = [];

const updateStorage = () => {
    localStorage.setItem("todoSystem",JSON.stringify(projectArray));
    restoreData();
}

const restoreData = () => {
    projectArray = JSON.parse(localStorage.getItem("todoSystem"),);
}

//initiate local storage
const initiateStorage = (() => {
    if(!localStorage.getItem('todoSystem')) {
        // push default inbox project
        projectArray.push(project("inbox"));
        // add demo data
        // myLibrary.push(new Book("The lean startup","Eric Ries",250,true));
        // myLibrary.push(new Book("The hard thing about hard things","Ben
        // Horowitz",300,true));
        updateStorage();
    } 
    else restoreData();
})();

export {projectArray, project, todo, updateStorage}

//TODO: todos are not stored in chache