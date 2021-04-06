import {deleteItem, renameItem, createItem} from "../application_logic";
import {showProjects} from "./projects_view.js"

const createNewItemBtn = (parent,type) => {
    const newBtn = document.createElement("button");
    if (type === "project") {
        newBtn.textContent = "new project";
        newBtn.addEventListener("click", () => {
            createItem(type);
            showProjects();
        });
    }
    if (type === "todo"){
    newBtn.textContent = "new todo";
    newBtn.addEventListener("click", () => {
        createItem(type);
        showTodos();
    });
    }
    parent.appendChild(newBtn);
}

const createRenameBtn = (parent,item) => {
    //rename btn
    const RenameBtn = document.createElement("span");
    RenameBtn.classList.add("icon");
    RenameBtn.textContent = "✎";
    RenameBtn.addEventListener("click", () => {renameItem(item)});
    parent.appendChild(RenameBtn);
}

const createDeleteBtn = (parent,item) => {
    //delete btn
    const DeleteBtn = document.createElement("span");
    DeleteBtn.classList.add("icon");
    DeleteBtn.textContent = "❌";
    DeleteBtn.addEventListener("click", () => {deleteItem(item)});
    parent.appendChild(DeleteBtn);
}

export {createDeleteBtn, createRenameBtn, createNewItemBtn}