import styles from "./todoList.module.css";
import { Todo } from "types";
import { showTodo } from "../showTodo/showTodo";

const showTodoList = (todos: Todo[], showCompleted: boolean) => {
  const todoList = document.querySelector(`.${styles.todoList}`)!;
  if (todos.length === 0) todoList.textContent = "No todos yet.";
  if (!showCompleted)
    while (todoList.childNodes.length > 0) {
      todoList.removeChild(todoList.childNodes[0]);
    }
  todos.forEach((todo) => showTodo(todo));
};

export { showTodoList };
