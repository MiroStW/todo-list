import { Todo } from "types";
import todoStyles from "./showTodo.module.css";

const showTodoTitle = (todo: Todo, parent: Element) => {
  const todoTitleDiv = document.createElement("span");
  todoTitleDiv.classList.add(todoStyles.todoTitle);
  todoTitleDiv.textContent = todo.data.name;
  parent.appendChild(todoTitleDiv);
};

export { showTodoTitle };
