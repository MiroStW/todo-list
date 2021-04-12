import {projectArray, getTodos, todo} from "../application_logic/arrays";
import {completeTodoCheckbox, createUpdateTodoBtn, createDeleteBtn, createNewItemBtn} from "./buttons";
import {initialPage} from "./initial_page";
import {format} from "date-fns";
// import {  } from "material-design-icons";

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

        const flag = document.createElement("span");
        flag.classList.add("material-icons-outlined");
        flag.textContent = format(todo.createdDate, "yyyy-MM-dd");
        todoDiv.appendChild(flag);

        // todo bar
        const todoBarDiv = document.createElement("div");
        todoBarDiv.classList.add("todoBar");
        todoDiv.appendChild(todoBarDiv);

        // todo title
        const todoTitleDiv = document.createElement("span");
        todoTitleDiv.classList.add("todoTitle");
        todoTitleDiv.textContent = todo.name;
        todoBarDiv.appendChild(todoTitleDiv);

        // remove button
        const btnDiv = document.createElement("div");
        btnDiv.classList.add("btnrow");
        // not needed: createRenameBtn(btnDiv, "todo", todo);
        createDeleteBtn(btnDiv, "todo", todo);
        todoBarDiv.appendChild(btnDiv);

        // open todo
        todoDiv.addEventListener("mouseover", () => {btnDiv.classList.add("active")});
        todoDiv.addEventListener("mouseout", () => {btnDiv.classList.remove("active")});
        todoBarDiv.addEventListener("click", () => {showTodo(todo,todoDiv, project)});
        
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

    // complete checkbox
    completeTodoCheckbox(todo, todoDivOpen);

    const nameInput = document.createElement("input");
    nameInput.value = todo.name;
    nameInput.placeholder = "Title";
    todoDivOpen.appendChild(nameInput);

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

// TODO: 
// make it visible in open todo
// put completed todos in "done" list
// add transition period before checked todo is moved there
// have done list closed by default