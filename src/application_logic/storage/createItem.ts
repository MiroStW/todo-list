import { showTodoArea } from "components/showTodos/showTodos";
import { Timestamp, addDoc } from "firebase/firestore";
import { auth } from "../auth";
import { ProjectData, TodoData, Project, Todo } from "types";
import { projects, todosOfProject } from "./useDb";

// factory for projects
const createProjectData = (name: string, isInbox?: boolean): ProjectData => {
  return {
    name,
    createdDate: Timestamp.now(),
    ownerID: auth.currentUser?.uid!,
    ...(isInbox && { isInbox: true }),
    isArchived: false,
  };
};

// factory for todos
const createTodoData = (name: string): TodoData => {
  return {
    name,
    complete: false,
    description: "",
    dueDate: null,
    priority: 4,
    createdDate: Timestamp.now(),
    ownerID: auth.currentUser?.uid!,
  };
};

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

export { createItem, createProjectData };
