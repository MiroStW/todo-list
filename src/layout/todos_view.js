import {projectArray, getTodos} from "../application_logic/arrays.js";
import {createRenameBtn, createDeleteBtn, createNewItemBtn} from "./buttons.js";
import {initialPage} from "./initial_page.js";

const showTodos = (project) => {
    if (!project) {project = projectArray[0];} //default to inbox
    clearTodoList();
    // show project list
    const todoHeader = document.createElement("h2");
    todoHeader.textContent = "Todos - " + project.name;
    initialPage.todoArea.appendChild(todoHeader);
    
    const todos = getTodos(project);

    todos.forEach(todo => {
        const todoDiv = document.createElement("div");
        todoDiv.classList.add("todo");
        todoDiv.textContent = todo.name;

        const btnDiv = document.createElement("div");
        btnDiv.classList.add("buttons");
        createRenameBtn(btnDiv, "todo", todo);
        createDeleteBtn(btnDiv, "todo", todo);
        todoDiv.appendChild(btnDiv);
        todoDiv.addEventListener("mouseover", () => {btnDiv.classList.add("active")});
        todoDiv.addEventListener("mouseout", () => {btnDiv.classList.remove("active")});

        initialPage.todoArea.appendChild(todoDiv);
    });

    createNewItemBtn(initialPage.todoArea,"todo",project);
    
}

const clearTodoList = () => {
    //clear displayed todo Area
    if (initialPage.todoArea && initialPage.todoArea.childNodes.length > 0) {
        while (initialPage.todoArea.firstChild) {
            initialPage.todoArea.removeChild(initialPage.todoArea.lastChild);
          }
    }
}

export {showTodos}