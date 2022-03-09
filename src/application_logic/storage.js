import {
  getFirestore,
  collection,
  collectionGroup,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { isToday, isBefore, isAfter, parseISO } from "date-fns";
import { id } from "date-fns/locale";

const db = getFirestore();

// project & todo array to hold all the data
const projectArray = [];
const todoArray = [];

// factory for projects
const Project = (name) => {
  const createdDate = Date.now();
  return { name, createdDate };
};

// factory for todos
const Todo = (name, parentProject) => {
  const project = parentProject || projectArray[0];
  const complete = false;
  const description = "";
  const dueDate = null;
  const priority = 4;
  const createdDate = Date.now();
  return {
    name,
    project,
    complete,
    description,
    dueDate,
    priority,
    createdDate,
  };
};

const getProjects = (type) =>
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
// TODO: make more concise by moving to standard promise pattern
// const projects = [];
// const querySnapshot = await getDocs(collection(db, "projects"));
// querySnapshot.forEach((doc) => {
//   projects.push({ id: doc.id, ...doc.data() });
// });

const getTodosByProject = (project) =>
  getDocs(
    collection(db, `projects/${project.id}/todos`)
  ).then((querySnapshot) => querySnapshot.docs.map((doc) => doc.data()));

const getTodosByDate = (type) => {
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

// initiate local storage
// (async () => {
//   if (!localStorage.getItem("todoSystem-projects")) {
//     // push default inbox project
//     projectArray.push(Project("Inbox"));
//     // TODO: add demo data?
//     updateStorage();
//   } else await restoreData();
// })();

const createItem = (type, parentProject) => {
  const name = prompt(`What is the title of the new ${type}?`);
  if (name && type === "project") {
    const newProject = Project(name);
    projectArray.push(newProject);
    updateStorage();
  }
  if (name && parentProject && type === "todo") {
    const newTodo = Todo(name, parentProject);
    todoArray.push(newTodo);
    updateStorage();
  }
};

const renameItem = (item) => {
  const newName = prompt(`What is the new name of ${item.name}?`);
  if (newName) {
    item.name = newName;
    updateStorage();
  }
};

const updateTodo = (todo, newName, newDescription, newDueDate) => {
  // TODO add change project
  todo.name = newName;
  todo.description = newDescription;
  todo.dueDate = newDueDate;
  updateStorage();
};

const updateCompleted = (todo) => {
  todo.complete = !todo.complete;
  updateStorage();
};

const updatePriority = (todo, priority) => {
  todo.priority = priority;
  updateStorage();
};

const deleteItem = (item, type) => {
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

const isInbox = (project) => project === projectArray[0];

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
