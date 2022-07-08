import { showTodoArea } from "components/showTodos/showTodos";
import { addDoc } from "firebase/firestore";
import { projects, todosOfProject } from "./useDb";
import { createProjectData, createTodoData } from "./factory";
import { Project, Todo } from "types";

const createProject = () => {
  const name = prompt("What is the title of the new project?");
  if (name) {
    const projectData = createProjectData(name);
    addDoc(projects, projectData)
      .then((newRef) => new Project(newRef, projectData))
      .then((project) => showTodoArea("showProject", project));
  }
};

const createTodo = (parentProject: Project) => {
  const name = prompt("What is the title of the new todo?");
  if (name) {
    const todoData = createTodoData(name);
    addDoc(todosOfProject(parentProject), todoData).then(
      (newRef) => new Todo(newRef, todoData)
    );
  }
};

export { createProject, createTodo };
