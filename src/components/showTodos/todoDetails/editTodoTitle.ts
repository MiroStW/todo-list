import { Todo } from "types";
import todoStyles from "../showTodo/showTodo.module.css";

const editTodoTitle = (todo: Todo, parent: Element) => {
  const nameInput = document.createElement("input");
  nameInput.classList.add(todoStyles.todoTitle);
  nameInput.value = todo.data.name;
  nameInput.placeholder = "Title";
  parent.querySelector(`.${todoStyles.todoTitle}`)!.replaceWith(nameInput);

  return nameInput;
};

export { editTodoTitle };
