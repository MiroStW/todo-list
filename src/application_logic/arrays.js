// factory for projects
const project = (name) => {
    const proto = {
        type: "project"
    }
    const createdDate = Date.now();
    return Object.assign(Object.create(proto), {name, createdDate})
}

// projects , list, create, delete, rename
const projectList = (() => {
    const projects = [];
    // default project: inbox
    if (projects.length == 0) {
        projects.push(project("inbox"));
    }
    return {projects}
})();

// factory for todos
const todo = (name, project) => {
    // todo properties: title, description, dueDate, priority, project,
    // complete?
    const proto = {
        type: "todo"
    }
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
    const createdDate = Date.now();
    return Object.assign(Object.create(proto), {name, project, complete, description, dueDate, priority, createdDate})
}

// projects , list, create, delete, rename
const todoList = (() => {
    const todos = [];
    // for all todos in selected project:
    todos.push();
    return {todos}
})();

export {projectList, todoList, project, todo}