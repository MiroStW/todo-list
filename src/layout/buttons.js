import {deleteItem, updateTodo, completeTodo, renameItem, createItem} from "../application_logic/crud";
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
        completeTodo(todo);
    })
    parent.appendChild(todoComplete);
}

const priorityFlag = (todo, parent) => {
    const flag = document.createElement("span");
    todo.priority == 4 ? 
                flag.classList.add("material-icons-outlined") :
                flag.classList.add("material-icons") ;
    flag.classList.add("prio" + todo.priority);
    flag.classList.add("todoPriority");
    flag.classList.add("md-18");
    flag.textContent = "flag";
    parent.appendChild(flag);
}

const createUpdateTodoBtn = (todo,parent,newName,newDescription,newDueDate,newPriority) => {

    const saveBtn = document.createElement("button");
    saveBtn.textContent = "save";
    saveBtn.addEventListener("click", () => {
        updateTodo(todo,newName.value,newDescription.value,newDueDate.value,newPriority.value);
        showTodoList(todo.project);
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

export {createDeleteBtn, createUpdateTodoBtn, completeTodoCheckbox, createRenameBtn, createNewItemBtn, priorityFlag}