import {projectList, todoList, project, todo} from "./arrays.js";

const createItem = (type) => {
    //create project
    const name = prompt(`What is the title of the new ${type}?`);
    if (name && type === "project") {
        const newProject = project(name);
        projectList.projects.push(newProject);
    }
    if (name && type === "todo") {
        const newTodo = todo(name);
        todoList.todos.push(newTodo);
    }
}

const renameItem = (item) => {
    const newName = prompt("What is the new name of " + item.name + "?");
    if(newName) {
        item.name = newName;
        showProjects();
    }
}

const deleteItem = (item) => {
    if(confirm("really remove " + item.name + "?")) {
        if (item.type === "project") {
            projectList.projects.splice(projectList.projects.indexOf(item),1);
            showProjects();
        }
        if (item.type === "todo") {
            todoList.todos.splice(todoList.todos.indexOf(item),1);
            showTodos();
        }
    }
}

export {deleteItem, renameItem, createItem}