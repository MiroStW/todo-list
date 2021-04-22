import {projectArray, getTodosByProject, getTodosByDate} from "../application_logic/arrays";
import {todoDueDateIcon, completedTodosBtn, showTodoTitle, editTodoTitle, showPriority, openPrioPicker, completeTodoCheckbox, createUpdateTodoBtn, createDeleteBtn, createNewItemBtn} from "./buttons";
import {initialPage} from "./initial_page";
import flatpickr from "flatpickr";
import 'flatpickr/dist/flatpickr.min.css';
import 'flatpickr/dist/themes/dark.css';

const showTodoList = (action,project) => {
    if (action != "showCompleted") {clearTodoList()}

    if (action == "showProject") {
        //default to inbox
        if (!project) {project = projectArray[0];} 
    }

    // show project header
    const todoHeaderDiv = document.createElement("div");
    todoHeaderDiv.classList.add("todoHeader");
    const todoHeader = document.createElement("h2");
    switch (action) {
        case "showProject":
            todoHeader.textContent = project.name;
            break;
        case "showCompleted":
            todoHeader.textContent = "Completed Todos";
            break;
        case "showToday":
            todoHeader.textContent = "Today";
            break;
        case "showUpcoming":
            todoHeader.textContent = "Upcoming";
            break;
    }
    todoHeaderDiv.appendChild(todoHeader);
    if (action == "showProject") completedTodosBtn(project, todoHeaderDiv);
    initialPage.todoArea.appendChild(todoHeaderDiv);

    // show todos
    if (action == "showToday") {
        const todaysTodos = getTodosByDate("past");
        todaysTodos.forEach(todo => {showTodoBar(todo)});
    }
    else if (action == "showUpcoming") {
        const upcomingTodos = getTodosByDate("future");
        upcomingTodos.forEach(todo => {showTodoBar(todo)});
    }
    else if (action == "showProject") {
        const todos = getTodosByProject(project).filter(todo => !todo.complete);
        todos.forEach(todo => {showTodoBar(todo)});
    }
    else if (action == "showCompleted") {
        const completedTodos = getTodosByProject(project).filter(todo => todo.complete);
        completedTodos.forEach(todo => {showTodoBar(todo)});
    }

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

    // dueDate icon
    todoDueDateIcon(todo, todoBarDiv);

    // todo title
    showTodoTitle(todo, todoBarDiv);

    // remove button
    createDeleteBtn(todoBarDiv, "todo", todo);

    todoDiv.addEventListener("mouseover", () => {todoBarDiv.classList.add("active")});
    todoDiv.addEventListener("mouseout", () => {todoBarDiv.classList.remove("active")});
    
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
    // [] expand textarea when reopening todo
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
// [x] dueDate needs to be saved as real date, not string
// [x] add dueDate icons

// complete todo
// [x] completed todos should have checked checkbox
// [x] put completed todos in "done" list
// [x] add transition period before checked todo is moved there
// [x] have done list closed by default

// [] add ability to move todos between projects

// projectArea
// [x] add today view
// [x] add upcoming view
// [] highlight open project