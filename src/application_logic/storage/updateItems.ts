import { updateDoc, Timestamp } from "firebase/firestore";
import { Project, Todo } from "types";

const renameProject = (project: Project) => {
  const newName = prompt(
    `What is the new name of ${project.data.name}?`,
    project.data.name
  );
  // TODO:  differentiate between project & todo updates
  if (newName) {
    updateDoc(project.ref, {
      name: newName,
    });
  }
};

const updateTodo = (
  todo: Todo,
  newName: string,
  newDescription: string,
  newCompleted: boolean,
  newDueDate?: Timestamp | null
) => {
  // TODO add change project
  updateDoc(todo.ref, {
    name: newName,
    description: newDescription,
    complete: newCompleted,
    ...(newDueDate !== undefined && { dueDate: newDueDate }),
  });
};

const updateCompleted = (todo: Todo) => {
  updateDoc(todo.ref, {
    complete: !todo.data.complete,
  });
};

const updatePriority = (todo: Todo, priority: number) => {
  updateDoc(todo.ref, {
    priority: priority,
  });
};

export { renameProject, updateTodo, updateCompleted, updatePriority };
