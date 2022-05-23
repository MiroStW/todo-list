import { getProjectOfTodo } from "application_logic/storage";
import { Todo } from "types";
import { showTodoArea } from "../showTodos";

const cancelBtn = (todo: Todo, parent: Element) => {
  const cancelBtn = document.createElement("button");
  cancelBtn.textContent = "cancel";
  cancelBtn.addEventListener("click", () => {
    if (confirm("discard changes?"))
      getProjectOfTodo(todo).then((project) => {
        showTodoArea("showProject", project);
      });
  });
  parent.appendChild(cancelBtn);
};

export default cancelBtn;
