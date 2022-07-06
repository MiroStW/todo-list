import { Project } from "types";
import { showTodoArea } from "../showTodos";
import todoStyles from "./showTodo.module.css";
import globalStyles from "style.module.css";

const completedTodosBtn = (
  project: Project,
  todoListCompleted: Element,
  parent: Element
) => {
  const btn = document.createElement("span");
  btn.classList.add(
    todoStyles.completedTodosBtn,
    globalStyles.icon,
    "material-icons"
  );
  btn.textContent = "restore";
  btn.addEventListener("click", () => {
    if (todoListCompleted.childElementCount === 0)
      showTodoArea("showCompleted", project);
    todoListCompleted.toggleAttribute("hidden");
    btn.classList.toggle(globalStyles["md-inactive"]);
  });
  parent.appendChild(btn);
};

export { completedTodosBtn };
