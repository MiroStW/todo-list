import { showTodoArea } from "components/showTodos/showTodos";
import { addDoc } from "firebase/firestore";
import { projects, todosOfProject } from "./useDb";
import { createProjectData, createTodoData } from "./factory";
import { Project, Todo } from "types";

const createProject = async () => {
  const name = prompt("What is the title of the new project?");
  if (name) {
    const projectData = createProjectData(name);
    const newRef = await addDoc(projects, projectData);
    const project = new Project(newRef, projectData);
    showTodoArea("showProject", project);
  }
};

const createTodo = async (parentProject: Project) => {
  const name = prompt("What is the title of the new todo?");
  if (name) {
    const todoData = createTodoData(name);
    await addDoc(todosOfProject(parentProject), todoData);
  }
};

export { createProject, createTodo };
