import { updateDoc, deleteDoc } from "firebase/firestore";
import { Project, Todo } from "types";

const deleteTodo = (todo: Todo) => {
  if (confirm(`really remove ${todo.data.name}?`)) deleteDoc(todo.ref);
};

const archiveProject = (project: Project) => {
  if (
    confirm(
      `CAREFUL - this will remove all todos in this project and can't be undone. Really remove ${project.data.name}?`
    )
  )
    // Delete requires cloud functions, would need billing account
    // --> instead archive projects, they don't need to be visualised for now
    updateDoc(project.ref, {
      isArchived: true,
    });
};

export { deleteTodo, archiveProject };
