import {updateStorage, projectArray, todoArray, project, todo} from "./arrays.js";
import {showProjects} from "../layout/projects_view.js"
import {showTodos} from "../layout/todos_view.js";

const createItem = (type, parentProject) => {
    const name = prompt(`What is the title of the new ${type}?`);
    if (name && type === "project") {
        const newProject = project(name);
        projectArray.push(newProject);
        console.log(projectArray);
    }
    if (name && parentProject && type === "todo") {
        const newTodo = todo(name, parentProject);
        todoArray.push(newTodo);
        console.log(todoArray);
    }
    updateStorage();
}

const renameItem = (item, type) => {
    const newName = prompt("What is the new name of " + item.name + "?");
    if(newName) {
        item.name = newName;
        if (type === "project") {
            showProjects();
        }
        if (type === "todo") {
            showTodos();
        }
    }
    updateStorage();
}

const deleteItem = (item, type) => {
    if(confirm("really remove " + item.name + "?")) {
        if (type === "project") {
            projectArray.splice(projectArray.indexOf(item),1);
            showProjects();
        }
        if (type === "todo") {
            item.project.todos.splice(item.project.todos.indexOf(item),1);
            showTodos();
        }
    }
    updateStorage();
}

export {deleteItem, renameItem, createItem}