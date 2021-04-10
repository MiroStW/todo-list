import {deleteItem, renameItem, createItem} from "../application_logic";
import {showProjectList} from "./projects_view.js"
import {showTodoList} from "./todos_view.js";

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
    const RenameBtn = document.createElement("span");
    RenameBtn.classList.add("icon");
    RenameBtn.textContent = "✎";
    RenameBtn.addEventListener("click", () => {renameItem(item, type)});
    parent.appendChild(RenameBtn);
}

const createDeleteBtn = (parent, type, item) => {
    //delete btn
    const DeleteBtn = document.createElement("span");
    DeleteBtn.classList.add("icon");
    DeleteBtn.textContent = "❌";
    DeleteBtn.addEventListener("click", () => {deleteItem(item, type)});
    parent.appendChild(DeleteBtn);
}

export {createDeleteBtn, createRenameBtn, createNewItemBtn}