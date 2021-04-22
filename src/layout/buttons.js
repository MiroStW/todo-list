import {deleteItem, updateTodo, updatePriority, updateCompleted, renameItem, createItem} from "../application_logic/crud";
import {showProjectList} from "./projects_view"
import {showTodoList} from "./todos_view";
import {format, differenceInCalendarDays, differenceInCalendarYears, parseISO} from "date-fns";

const createNewItemBtn = (parent, type, project) => {
    const newBtn = document.createElement("button");
    if (type === "project") {
        newBtn.textContent = "new project";
        newBtn.addEventListener("click", () => {
            createItem(type);
            showProjectList();
        });
        parent.appendChild(newBtn);
    }
    if (type === "todo") {
        newBtn.textContent = "new todo";
        newBtn.addEventListener("click", () => {
            createItem(type, project);
            showTodoList("showProject",project);
        });
        parent.appendChild(newBtn);
    }
}

const createRenameBtn = (parent, type, item) => {
    //rename btn
    const renameBtn = document.createElement("span");
    renameBtn.classList.add("icon");
    renameBtn.textContent = "✎";
    renameBtn.addEventListener("click", () => {
        renameItem(item, type);
        if (type === "project") {
            showProjectList();
        }
        if (type === "todo") {
            showTodoList("showProject",item.project);
        }
    });
    parent.appendChild(renameBtn);
}

const completeTodoCheckbox = (todo, parent) => {
    const todoComplete = document.createElement("input");
    todoComplete.type = "checkbox";
    todoComplete.classList.add("todoComplete");
    if (todo.complete) todoComplete.setAttribute("checked",null);
    todoComplete.addEventListener("click", () => {
        updateCompleted(todo);
        if (!document.querySelector(".todoOpen")) {showTodoList("showProject",todo.project);}
    });
    parent.appendChild(todoComplete);
}

const openPrioPicker = (todo, parent) => {
    const pickerContainer = document.createElement("div");
    pickerContainer.classList.add("priorityPicker");
    priorityBtn(todo,pickerContainer,1);
    priorityBtn(todo,pickerContainer,2);
    priorityBtn(todo,pickerContainer,3);
    priorityBtn(todo,pickerContainer,4);
    parent.appendChild(pickerContainer);
}

const showPriority = (parent, priority) => {
    const flag = document.createElement("span");
    priority == 4 ? 
                flag.classList.add("material-icons-outlined") :
                flag.classList.add("material-icons") ;
    flag.classList.add("prio" + priority);
    flag.classList.add("todoPriority");
    flag.classList.add("md-18");
    flag.textContent = "flag";
    parent.appendChild(flag);

    return flag
}

const priorityBtn = (todo, parent, newPriority) => {
    const btn = showPriority(parent, newPriority);
    btn.addEventListener("click", () => {
        updatePriority(todo,newPriority);
        showTodoList("showCompleted",todo.project);
        parent.remove();
    })
}

const completedTodosBtn = (project, parent) => {
    const btn = document.createElement("span");
    btn.classList.add("completedTodosBtn","icon", "material-icons");
    // btn.classList.add("md-18");
    btn.textContent = "restore";
    btn.addEventListener("click", () => {
        document.querySelector(".completedTodoHeader")
                ? showTodoList("showProject",project)
                : showTodoList("showCompleted",project)
    });
    parent.appendChild(btn);
}

const todoDueDateIcon = (todo, parent) => {
    const icon = document.createElement("div");
    if (todo.dueDate) {
        const daysToToday = differenceInCalendarDays(parseISO(todo.dueDate),new Date());
        const yearsToToday = differenceInCalendarYears(parseISO(todo.dueDate),new Date());
        
        if (daysToToday <= 0 ) {
            icon.classList.add("material-icons", "md-18", "todayIcon");
            icon.textContent = "star";
        }
        else if (daysToToday < 7) {
            icon.classList.add("todoDueDateIcon");
            icon.textContent = format(parseISO(todo.dueDate),"E");
        }
        else if (yearsToToday <= 0) {
            icon.classList.add("todoDueDateIcon");
            icon.textContent = format(parseISO(todo.dueDate),"d. MMM");
        }
        else {
            icon.classList.add("todoDueDateIcon");
            icon.textContent = format(parseISO(todo.dueDate),"MMM yyyy");
        }
    }

    parent.appendChild(icon);
}

const showTodoTitle = (todo, parent) => {
    const todoTitleDiv = document.createElement("span");
    todoTitleDiv.classList.add("todoTitle");
    todoTitleDiv.textContent = todo.name;
    parent.appendChild(todoTitleDiv);
}

const editTodoTitle = (todo, parent) => {
    const nameInput = document.createElement("input");
    nameInput.classList.add("todoTitle");
    nameInput.value = todo.name;
    nameInput.placeholder = "Title";
    parent.querySelector(".todoTitle").replaceWith(nameInput);

    return nameInput
}

const createUpdateTodoBtn = (todo,parent,newName,newDescription,newDueDate) => {

    const saveBtn = document.createElement("button");
    saveBtn.textContent = "save";
    saveBtn.addEventListener("click", () => {
        // const todoBarDiv = parent.parentNode.querySelector(".todoBar");
        // const btnDiv = parent.parentNode.querySelector(".btnrow");

        updateTodo(todo,newName.value,newDescription.value,newDueDate.value);
        showTodoList("showProject",todo.project);
        // // & remove editableTitle & showTitle
        // newName.remove();
        // showTodoTitle(todo, todoBarDiv);
        // // remove active class
        // btnDiv.remove("active");
        // parent.parentNode.classList.remove("active");
        // // add eventlistener to reopen todo
        // todoBarDiv.addEventListener("click", () => {showTodoDetails(todo, parent.parentNode);}, { once: true });
        // // remove openTodoDiv
        // parent.remove();
    });
    parent.appendChild(saveBtn);
}

const createDeleteBtn = (parent, type, item) => {
    //delete btn
    const deleteBtn = document.createElement("span");
    deleteBtn.classList.add("icon");
    deleteBtn.textContent = "❌";
    deleteBtn.addEventListener("click", () => {
        deleteItem(item, type);
        if (type === "project") {
            showProjectList();
            //TODO: if open project is deleted project: showTodoList()
        }
        if (type === "todo") {
            showTodoList("showProject",item.project);
        }
    });
    parent.appendChild(deleteBtn);
}

export {todoDueDateIcon, completedTodosBtn, showTodoTitle, editTodoTitle, createDeleteBtn, createUpdateTodoBtn, completeTodoCheckbox, createRenameBtn, createNewItemBtn, showPriority, openPrioPicker}