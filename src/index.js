// factory for todos
const todo = (title, project) => {
// todo properties: title, description, dueDate, priority, project, complete?
    project.type === "project" ? project : project = "inbox"; //TODO needs to point to inbox project
    const complete = false;
    const description = "";
    const dueDate = null;
    const priority = 4;
    return {title, project, complete, description, dueDate, priority}
}

// factory for projects
const project = (name) => {
    const proto = {
        type: "project"
    }
    return Object.assign(Object.create(proto), {name})
}



// projects , list, create, delete, rename
// default project: inbox
// separate logic from DOM
// store in localstorage
// use date-fns to handle duedate