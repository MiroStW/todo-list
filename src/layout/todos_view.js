import {todoList, projectList} from "../application_logic/arrays.js";
import {createRenameBtn, createDeleteBtn, createNewItemBtn} from "./buttons.js";

const showTodos = (project) => {
    const todoArea = document.querySelector(".todoarea");
    clearTodoList(todoArea);
    // show project list
    const todoHeader = document.createElement("h2");
    todoHeader.textContent = "Todos";
    todoArea.appendChild(todoHeader);

    if(!project) {project = projectList.projects[0]}
    project.todos.forEach(todo => {
        const todoDiv = document.createElement("div");
        todoDiv.textContent = todo.name;
        //TODO port the rest to todos
        createRenameBtn(todoDiv,todo);
        createDeleteBtn(todoDiv,todo);
        todoArea.appendChild(todoDiv);
    });

    createNewItemBtn(todoArea,"todo",project);
    
}

const clearTodoList = (todoArea) => {
    //clear displayed todo Area
    if (todoArea && todoArea.childNodes.length > 0) {
        while (todoArea.firstChild) {
            todoArea.removeChild(todoArea.lastChild);
          }
    }
}

export {showTodos}