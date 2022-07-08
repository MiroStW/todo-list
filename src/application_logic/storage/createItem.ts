import { showTodoArea } from "components/showTodos/showTodos";
import { addDoc } from "firebase/firestore";
import { projects, todosOfProject } from "./useDb";
import { createProjectData, createTodoData } from "./factory";
import { Project, Todo } from "types";

const createItem = (type: "project" | "todo", parentProject?: Project) => {
  const name = prompt(`What is the title of the new ${type}?`);
  if (name && type === "project") {
    const projectData = createProjectData(name);
    addDoc(projects, projectData)
      .then((newRef) => new Project(newRef, projectData))
      .then((project) => showTodoArea("showProject", project));
  }
  if (name && parentProject && type === "todo") {
    const todoData = createTodoData(name);
    addDoc(todosOfProject(parentProject), todoData).then(
      (newRef) => new Todo(newRef, todoData)
    );
  }
};

export { createItem };
