import {todoList, projectList} from "../application_logic/arrays.js";
import {createRenameBtn, createDeleteBtn, createNewItemBtn} from "./buttons.js";
import {initialPage} from "./initial_page.js";

const showTodos = (project) => {
    // const todoArea = document.querySelector(".todoarea");
    clearTodoList();
    // show project list
    const todoHeader = document.createElement("h2");
    todoHeader.textContent = "Todos";
    initialPage.todoArea.appendChild(todoHeader);

    if(!project) {project = projectList.projects[0]}
    project.todos.forEach(todo => {
        const todoDiv = document.createElement("div");
        todoDiv.textContent = todo.name;
        //TODO port the rest to todos
        createRenameBtn(todoDiv,todo);
        createDeleteBtn(todoDiv,todo);
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