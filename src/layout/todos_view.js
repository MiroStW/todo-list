import {projectArray, getTodos} from "../application_logic/arrays";
import {completeTodoCheckbox, createUpdateTodoBtn, createDeleteBtn, createNewItemBtn} from "./buttons";
import {initialPage} from "./initial_page";

const showTodoList = (project) => {
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

        // complete checkbox
        completeTodoCheckbox(todo, todoDiv);

        // todo title
        todoDiv.textContent = todo.name;

        // remove button
        const btnDiv = document.createElement("div");
        btnDiv.classList.add("btnrow");
        // not needed: createRenameBtn(btnDiv, "todo", todo);
        createDeleteBtn(btnDiv, "todo", todo);
        todoDiv.appendChild(btnDiv);

        // open todo
        todoDiv.addEventListener("mouseover", () => {btnDiv.classList.add("active")});
        todoDiv.addEventListener("mouseout", () => {btnDiv.classList.remove("active")});
        todoDiv.addEventListener("click", () => {showTodo(todo,todoDiv, project)});
        
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

const showTodo = (todo, todoDivClosed, project) => {
    // TODO no borders of input, but overall border
    // focus immediately in title
    // complete checkbox
    const todoDivOpen = document.createElement("div");
    todoDivOpen.classList.add("todoOpen");

    const nameInput = document.createElement("input");
    nameInput.value = todo.name;
    nameInput.placeholder = "Title";
    todoDivOpen.appendChild(nameInput);

    const descriptionInput = document.createElement("input");
    descriptionInput.value = todo.description;
    descriptionInput.placeholder = "Description";
    todoDivOpen.appendChild(descriptionInput);
    
    const dueDateInput = document.createElement("input");
    dueDateInput.value = todo.dueDate;
    dueDateInput.placeholder = "Duedate";
    todoDivOpen.appendChild(dueDateInput);
    
    const priorityInput = document.createElement("input");
    priorityInput.value = todo.priority;
    todoDivOpen.appendChild(priorityInput);
    
    const createdDate = document.createElement("div");
    createdDate.value = todo.createdDate;
    todoDivOpen.appendChild(createdDate);

    createUpdateTodoBtn(
        todo,
        todoDivOpen,
        nameInput,
        descriptionInput,
        dueDateInput,
        priorityInput
    );

    const cancelBtn = document.createElement("button");
    cancelBtn.textContent = "cancel";
    cancelBtn.addEventListener("click", () => {showTodoList(project)});
    todoDivOpen.appendChild(cancelBtn);
    
    initialPage.todoArea.replaceChild(todoDivOpen,todoDivClosed);
}

export {showTodoList, showTodo}