import { isToday, isBefore, isAfter, parseISO } from "date-fns";

// project & todo array to hold all the data
let projectArray = [];
let todoArray = [];

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

const restoreData = () => {
  projectArray = JSON.parse(localStorage.getItem("todoSystem-projects"));
  todoArray = JSON.parse(localStorage.getItem("todoSystem-todos"));
  //   console.log('projects loaded: ');
  //   console.log(projectArray);
  //   console.log('todos loaded: ');
  //   console.log(todoArray);
};

const updateStorage = () => {
  localStorage.setItem("todoSystem-projects", JSON.stringify(projectArray));
  localStorage.setItem("todoSystem-todos", JSON.stringify(todoArray));
  restoreData();
};

// initiate local storage
(() => {
  if (!localStorage.getItem("todoSystem-projects")) {
    // push default inbox project
    projectArray.push(Project("Inbox"));
    // TODO: add demo data?
    updateStorage();
  } else restoreData();
})();

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

const getProjects = (type) => {
  switch (type) {
    case "inbox":
      return projectArray[0];
    case "noInbox":
      return projectArray.slice(1);
    default:
      return projectArray;
  }
};

const getTodosByProject = (project) => {
  // TODO: find a way to assign an auto-incremental ID
  const projectTodos = todoArray.filter(
    (todo) => todo.project.name === project.name
  );
  return projectTodos;
};

const getTodosByDate = (type) => {
  switch (type) {
    case "past":
      return todoArray.filter(
        (todo) =>
          isToday(parseISO(todo.dueDate)) ||
          isBefore(parseISO(todo.dueDate), new Date())
      );
    case "future":
      return todoArray.filter((todo) =>
        isAfter(parseISO(todo.dueDate), new Date())
      );
    default:
      return false;
  }
};

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
