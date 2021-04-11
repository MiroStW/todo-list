import {updateStorage, projectArray, todoArray, project, todo} from "./arrays";
import {showProjectList} from "../layout/projects_view"
import {showTodoList} from "../layout/todos_view";

const createItem = (type, parentProject) => {
    const name = prompt(`What is the title of the new ${type}?`);
    if (name && type === "project") {
        const newProject = project(name);
        projectArray.push(newProject);
        updateStorage();
    }
    if (name && parentProject && type === "todo") {
        const newTodo = todo(name, parentProject);
        todoArray.push(newTodo);
        updateStorage();
    }
}

const renameItem = (item, type) => {
    const newName = prompt("What is the new name of " + item.name + "?");
    if(newName) {
        item.name = newName;
        updateStorage();
    }
}

const updateTodo = (todo, newName,newDescription,newDueDate,newPriority) => {
    // TODO add change project
    todo.name = newName;
    todo.description = newDescription;
    todo.dueDate = newDueDate;
    todo.priority = newPriority;
    updateStorage();
}

const completeTodo = (todo) => {
    todo.complete = true;
    updateStorage();
}

const deleteItem = (item, type) => {
    if(confirm("really remove " + item.name + "?")) {
        if (type === "project") {
            projectArray.splice(projectArray.indexOf(item),1);
            updateStorage();
            showProjectList();
        }
        if (type === "todo") {
            item.project.todos.splice(item.project.todos.indexOf(item),1);
            updateStorage();
            showTodoList();
        }
    }
}

export {deleteItem, renameItem, updateTodo, completeTodo, createItem}