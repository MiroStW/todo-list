import {deleteItem, updateTodo, updatePriority, updateCompleted, renameItem, createItem} from "../application_logic/crud";
import {showProjectList} from "./projects_view"
import {showTodoList} from "./todos_view";

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
            showTodoList(project);
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
            showTodoList(item.project);
        }
    });
    parent.appendChild(renameBtn);
}

const completeTodoCheckbox = (todo, parent) => {
    const todoComplete = document.createElement("input");
    todoComplete.type = "checkbox";
    todoComplete.classList.add("todoComplete");
    todoComplete.addEventListener("click", () => {
        updateCompleted(todo, true);
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
        showTodoList(todo.project);
        parent.remove();
    })
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
        const todoBarDiv = parent.parentNode.querySelector(".todoBar");
        const btnDiv = parent.parentNode.querySelector(".btnrow");

        updateTodo(todo,newName.value,newDescription.value,newDueDate.value);
        showTodoList(todo.project);
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
            showTodoList(item.project);
        }
    });
    parent.appendChild(deleteBtn);
}

export {showTodoTitle, editTodoTitle, createDeleteBtn, createUpdateTodoBtn, completeTodoCheckbox, createRenameBtn, createNewItemBtn, showPriority, openPrioPicker}