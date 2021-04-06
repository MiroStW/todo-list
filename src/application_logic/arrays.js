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
                    project = projectList[0]
    }
    const complete = false;
    const description = "";
    const dueDate = null;
    const priority = 4;
    const createdDate = Date.now();
    return Object.assign(Object.create(proto), {name, project, complete, description, dueDate, priority, createdDate})
}

// maintain a todolist for every project, update whenever projects get updated
const todoList = (project) => {
    const todos = project.todos
    return {todos}
};

export {projectList, todoList, project, todo}