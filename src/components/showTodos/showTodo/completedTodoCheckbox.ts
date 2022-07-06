import { getProjectOfTodo, updateCompleted } from "application_logic/storage";
import { Todo } from "types";
import { showTodoArea } from "../showTodos";
import todoDetailsStyles from "../todoDetails/todoDetails.module.css";
import todoStyles from "./showTodo.module.css";

const completeTodoCheckbox = (todo: Todo, parent: Element) => {
  const todoComplete = document.createElement("input");
  todoComplete.type = "checkbox";
  todoComplete.classList.add(todoStyles.todoComplete);
  todoComplete.id = `checkbox-${todo.ref.id}`;
  if (todo.data.complete) todoComplete.setAttribute("checked", "");
  parent.appendChild(todoComplete);

  const todoCompleteLabel = document.createElement("label");
  todoCompleteLabel.setAttribute("for", `checkbox-${todo.ref.id}`);
  todoCompleteLabel.classList.add("material-icons");
  if (todo.data.complete) todoCompleteLabel.textContent = "done";
  parent.appendChild(todoCompleteLabel);

  todoComplete.addEventListener("click", () => {
    updateCompleted(todo);
    if (!document.querySelector(`.${todoDetailsStyles.todoOpen}`)) {
      getProjectOfTodo(todo).then((project) => {
        showTodoArea("showProject", project);
      });
    } else {
      todoComplete.toggleAttribute("checked");
      todoCompleteLabel.textContent === "done"
        ? (todoCompleteLabel.textContent = "")
        : (todoCompleteLabel.textContent = "done");
    }
  });
};

export { completeTodoCheckbox };
