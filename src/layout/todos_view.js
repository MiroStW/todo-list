import {projectArray, getTodos} from "../application_logic/arrays";
import {showTodoTitle, editTodoTitle, showPriority, openPrioPicker, completeTodoCheckbox, createUpdateTodoBtn, createDeleteBtn, createNewItemBtn} from "./buttons";
import {initialPage} from "./initial_page";
import {format} from "date-fns";
import flatpickr from "flatpickr";

const showTodoList = (project,filterCompleted) => {    
    if (!filterCompleted) {

        if (!project) {project = projectArray[0];} //default to inbox
        clearTodoList();

        // show project header
        const todoHeader = document.createElement("h2");
        todoHeader.textContent = project.name;
        initialPage.todoArea.appendChild(todoHeader);
   
        const todos = getTodos(project).filter(todo => !todo.complete);

        todos.forEach(todo => {
            showTodoBar(todo);
        });

        createNewItemBtn(initialPage.todoArea,"todo",project);

        showTodoList(project,true);
    }

    else {

        // show project header
        const todoHeader = document.createElement("h2");
        todoHeader.textContent = "Completed Todos";
        initialPage.todoArea.appendChild(todoHeader);

        const todos = getTodos(project).filter(todo => todo.complete);
        
        todos.forEach(todo => {
            showTodoBar(todo);
        });
    }

}

const clearTodoList = () => {
    //clear displayed todo Area
    if (initialPage.todoArea && initialPage.todoArea.childNodes.length > 0) {
        while (initialPage.todoArea.firstChild) {
            initialPage.todoArea.removeChild(initialPage.todoArea.lastChild);
          }
    }
}

const showTodoBar = (todo) => {
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");

    // complete checkbox
    completeTodoCheckbox(todo, todoDiv);

    // priority flag
    const priority = showPriority(todoDiv, todo.priority);
    priority.addEventListener("click", () => {openPrioPicker(todo, todoDiv)});

    // todo bar
    const todoBarDiv = document.createElement("div");
    todoBarDiv.classList.add("todoBar");
    todoDiv.appendChild(todoBarDiv);

    // todo title
    showTodoTitle(todo, todoBarDiv);

    // remove button
    const btnDiv = document.createElement("div");
    btnDiv.classList.add("btnrow");
    createDeleteBtn(btnDiv, "todo", todo);
    todoBarDiv.appendChild(btnDiv);

    todoDiv.addEventListener("mouseover", () => {btnDiv.classList.add("active")});
    todoDiv.addEventListener("mouseout", () => {btnDiv.classList.remove("active")});
    
    todoBarDiv.addEventListener("click", () => {showTodoDetails(todo,todoDiv, todo.project);}, { once: true });
    
    initialPage.todoArea.appendChild(todoDiv);
}

const showTodoDetails = (todo, todoDiv) => {
    todoDiv.classList.add("active");

    // make title editable
    const nameInput = editTodoTitle(todo, todoDiv);
    nameInput.focus();

    const todoDivOpen = document.createElement("div");
    todoDivOpen.classList.add("todoOpen");

    // todo description
    const descriptionInput = document.createElement("textarea");
    descriptionInput.value = todo.description;
    descriptionInput.placeholder = "Description";

    descriptionInput.addEventListener("input", OnInput, false);
    function OnInput() {
        console.log("height changed;")
        this.style.height = "auto";
        this.style.height = (this.scrollHeight) + "px";
    }

    todoDivOpen.appendChild(descriptionInput);
    
    // todo duedate
    const dueDateInput = document.createElement("input");
    dueDateInput.classList.add("todoDueDate");
    dueDateInput.value = todo.dueDate;
    dueDateInput.placeholder = "Duedate";
    todoDivOpen.appendChild(dueDateInput);
    
    // show created date
    const createdDate = document.createElement("div");
    createdDate.value = todo.createdDate;
    todoDivOpen.appendChild(createdDate);

    // buttons
    createUpdateTodoBtn(
        todo,
        todoDivOpen,
        nameInput,
        descriptionInput,
        dueDateInput,
    );
    
    todoDiv.appendChild(todoDivOpen);

    const datepicker = flatpickr(dueDateInput, {});
}

export {showTodoList, showTodoDetails}

// overall todoArea
// [x] focus immediately in title
// [] put each element in own function
// [] review button.js & clean up structure
// [x] create function to close todo
// [] BONUS opening a todo closes all other todos (only one open at a time)
// [] BONUS clicking anywhere else in todoArea closes open todo

// dueDate
// [x] add datepicker
// [] add dueDate icons

// complete todo
// [] completed todos should have checked checkbox
// [] put completed todos in "done" list
// [] add transition period before checked todo is moved there
// [] have done list closed by default

// projectArea
// [] add today view
// [] add upcoming view