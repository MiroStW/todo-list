import {
  addDoc,
  getDocs,
  query,
  where,
  Timestamp,
  updateDoc,
  DocumentReference,
  getDoc,
  deleteDoc,
} from "firebase/firestore";
import { Project, ProjectData, Todo, TodoData } from "types";
import { projectsCol, projectTodosCol, todosCol } from "./useDb";

// factory for projects
const Project = (name: string, isInbox?: boolean): ProjectData => ({
  name,
  createdDate: Timestamp.now(),
  ...(isInbox && { isInbox: true }),
});

// factory for todos
const Todo = (name: string): TodoData => ({
  name,
  complete: false,
  description: "",
  dueDate: null,
  priority: 4,
  createdDate: Timestamp.now(),
});

const getProjectOfTodo = (todo: Todo) =>
  getDoc(todo.ref.parent.parent as DocumentReference).then(
    (doc) =>
      ({
        ref: doc.ref,
        data: doc.data(),
      } as Project)
  );

// TODO: get projects/data in right order or sort them
const getProjects = async () => {
  const projects = await getDocs(projectsCol).then(
    (querySnapshot) =>
      querySnapshot.docs.map((doc) => ({
        ref: doc.ref,
        data: doc.data(),
      })) as Project[]
  );

  if (!projects) {
    await addDoc(projectsCol, Project("Inbox", true));
    getProjects();
  }

  return projects;
};

const getTodosByProject = (project: Project) =>
  getDocs(projectTodosCol(project)).then(
    (querySnapshot) =>
      querySnapshot.docs.map((doc) => ({
        ref: doc.ref,
        data: doc.data(),
      })) as Todo[]
  );

const getTodosByDate = (type: "past" | "future") => {
  const q = query(
    todosCol,
    // collectionGroup(db, "todos"),
    where("dueDate", type === "past" ? "<=" : ">", new Date())
  );

  return getDocs(q).then(
    (querySnapshot) =>
      querySnapshot.docs.map((doc) => ({
        ref: doc.ref,
        data: doc.data(),
      })) as Todo[]
  );
};

// TODO: add initial inbox project
// TODO: on open, open inbox
// TODO: fix order of buttons & inbox project on page

const createItem = (type: "project" | "todo", parentProject?: Project) => {
  const name = prompt(`What is the title of the new ${type}?`);
  if (name && type === "project") {
    addDoc(projectsCol, Project(name));
  }
  if (name && parentProject && type === "todo") {
    addDoc(projectTodosCol(parentProject), Todo(name));
  }
};

const renameItem = (item: Project) => {
  const newName = prompt(`What is the new name of ${item.data.name}?`);
  // TODO:  differentiate between project & todo updates
  if (newName) {
    updateDoc(item.ref, {
      name: newName,
    });
  }
};

const updateTodo = (
  todo: Todo,
  newName: string,
  newDescription: string,
  newDueDate?: Timestamp | null
) => {
  // TODO add change project
  updateDoc(todo.ref, {
    name: newName,
    description: newDescription,
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

const deleteItem = (item: Project | Todo) => {
  if (confirm(`really remove ${item.data.name}?`)) deleteDoc(item.ref);
};

const isInbox = (project: Project) => project.data.isInbox === true;

export {
  getTodosByDate,
  getTodosByProject,
  getProjects,
  getProjectOfTodo,
  isInbox,
  deleteItem,
  renameItem,
  updateTodo,
  updateCompleted,
  updatePriority,
  createItem,
};
