import { updateTodo } from "application_logic/storage/updateItems";
import { Timestamp } from "firebase/firestore";
import { Todo } from "types";
import globalStyles from "style.module.css";

const createUpdateTodoBtn = (
  todo: Todo,
  parent: Element,
  newName: HTMLInputElement,
  newDescription: HTMLTextAreaElement,
  newCompleted: HTMLInputElement,
  newDueDate: HTMLInputElement
) => {
  const saveBtn = document.createElement("button");
  saveBtn.classList.add(globalStyles.primary);
  saveBtn.textContent = "save";
  saveBtn.addEventListener("click", () => {
    if (newDueDate.value) {
      updateTodo(
        todo,
        newName.value,
        newDescription.value,
        newCompleted.hasAttribute("checked"),
        new Timestamp(Date.parse(newDueDate.value) / 1000 || 0, 0)
      );
    } else {
      updateTodo(
        todo,
        newName.value,
        newDescription.value,
        newCompleted.hasAttribute("checked"),
        null
      );
    }
  });
  parent.appendChild(saveBtn);
};

export { createUpdateTodoBtn };
