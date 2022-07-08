import { getProjectOfTodo } from "application_logic/storage/getProjects";
import { Todo } from "types";
import { showTodoArea } from "../showTodos";

const cancelBtn = (todo: Todo, parent: Element) => {
  const cancelBtn = document.createElement("button");
  cancelBtn.textContent = "cancel";
  cancelBtn.addEventListener("click", async () => {
    if (confirm("discard changes?")) {
      const project = await getProjectOfTodo(todo);
      showTodoArea("showProject", project);
    }
  });
  parent.appendChild(cancelBtn);
};

export { cancelBtn };
