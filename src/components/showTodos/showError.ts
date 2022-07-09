import styles from "./showTodos.module.css";

const showError = (errorMessage: string = "Unknown error") => {
  const todoArea = document.querySelector(`.${styles.todoarea}`)!;
  while (todoArea.childNodes.length > 0) {
    todoArea.removeChild(todoArea.childNodes[0]);
  }

  todoArea.textContent = errorMessage;
};

export { showError };
