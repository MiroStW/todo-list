import {
  addDoc,
  getFirestore,
  collection,
  collectionGroup,
  doc,
  getDocs,
  query,
  where,
  setDoc,
  Timestamp,
} from "firebase/firestore";
import { isToday, isBefore, isAfter, parseISO } from "date-fns";
import { id } from "date-fns/locale";

const db = getFirestore();

interface project {
  id: string | null;
  name: string;
  createdDate: Timestamp;
}

interface todo {
  name: string;
  project?: project;
  complete: boolean;
  description: string;
  dueDate: Timestamp | null;
  priority: number;
  createdDate: Timestamp;
}

// project & todo array to hold all the data
const projectArray: {}[] = [];
const todoArray: {}[] = [];

// factory for projects
const Project = (name: string): project => {
  const createdDate = Timestamp.now();
  const id = null;
  return { id, name, createdDate };
};

// factory for todos
const Todo = (name: string, parentProject: project): todo => {
  const complete = false;
  const description = "";
  const dueDate = null;
  const priority = 4;
  const createdDate = Timestamp.now();
  return {
    name,
    complete,
    description,
    dueDate,
    priority,
    createdDate,
  };
};

const getProjects = (type: "inbox" | "noInbox") =>
  // const projects = [];
  getDocs(collection(db, "projects")).then((querySnapshot) => {
    const projects = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    switch (type) {
      case "inbox":
        return projects[0];
      case "noInbox":
        return projects.slice(1);
      default:
        return projects;
    }
  });

const getTodosByProject = (project: project) =>
  getDocs(
    collection(db, `projects/${project.id}/todos`)
  ).then((querySnapshot) => querySnapshot.docs.map((doc) => doc.data()));

const getTodosByDate = (type: "past" | "future") => {
  const q = query(
    collectionGroup(db, "todos"),
    where("dueDate", type === "past" ? "<=" : ">", new Date())
  );

  return getDocs(q).then((querySnapshot) =>
    querySnapshot.docs.map((doc) => doc.data())
  );
};

const updateStorage = () => {
  localStorage.setItem("todoSystem-projects", JSON.stringify(projectArray));
  localStorage.setItem("todoSystem-todos", JSON.stringify(todoArray));
};

// TODO: add initial inbox project

const createItem = (type: "project" | "todo", parentProject: project) => {
  const name = prompt(`What is the title of the new ${type}?`);
  if (name && type === "project") {
    addDoc(collection(db, "projects"), Project(name));
  }
  if (name && parentProject && type === "todo") {
    addDoc(
      collection(db, `projects/${parentProject.id}/todos`),
      Todo(name, parentProject)
    );
  }
};

const renameItem = (item: project | todo) => {
  const newName = prompt(`What is the new name of ${item.name}?`);
  if (newName) {
    item.name = newName;
    updateStorage();
  }
};

const updateTodo = (
  todo: todo,
  newName: string,
  newDescription: string,
  newDueDate: Timestamp
) => {
  // TODO add change project
  todo.name = newName;
  todo.description = newDescription;
  todo.dueDate = newDueDate;
  updateStorage();
};

const updateCompleted = (todo: todo) => {
  todo.complete = !todo.complete;
  updateStorage();
};

const updatePriority = (todo: todo, priority: number) => {
  todo.priority = priority;
  updateStorage();
};

const deleteItem = (item: project | todo, type: "project" | "todo") => {
  if (confirm(`really remove ${item.name}?`)) {
    if (type === "project") {
      projectArray.splice(projectArray.indexOf(item), 1);
      updateStorage();
    }
    if (type === "todo") {
      todoArray.splice(todoArray.indexOf(item), 1);
      updateStorage();
    }
  }
};

const isInbox = (project: project) => project === projectArray[0];

export {
  getTodosByDate,
  getTodosByProject,
  getProjects,
  isInbox,
  deleteItem,
  renameItem,
  updateTodo,
  updateCompleted,
  updatePriority,
  createItem,
};
