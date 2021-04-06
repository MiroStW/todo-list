import {todoList, createTodo} from "../application_logic/arrays.js";
import {  } from "./buttons.js";

const showTodos = (project) => {
    const todoArea = document.querySelector(".todoarea");
    clearTodoList(todoArea);
    // show project list
    const todoHeader = document.createElement("h2");
    todoHeader.textContent = "Todos";
    todoArea.appendChild(todoHeader);
    todoList.todos.forEach(todo => {
        const todoDiv = document.createElement("div");
        todoDiv.textContent = todo.title;
        //TODO port the rest to todos
        createRenameBtn(todoDiv,todo);
        createDeleteBtn(todoDiv,todo);
        todoArea.appendChild(todoDiv);
    });
    const newProjectBtn = document.createElement("button");
    newProjectBtn.textContent = "new project";
    newProjectBtn.addEventListener("click", () => {createProject()});
    todoArea.appendChild(newProjectBtn);
    
}

const clearTodoList = (todoArea) => {
    //clear displayed todo Area
    todoArea.childNodes.forEach(child => {child.remove()});
}

export {showTodos}