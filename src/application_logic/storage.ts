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
  updateDoc,
  DocumentReference,
  getDoc,
} from "firebase/firestore";
import { Project, ProjectData, Todo, TodoData } from "types";
import { projectsCol, projectTodosCol, todosCol } from "./useDb";

const db = getFirestore();

// project & todo array to hold all the data
const projectArray: {}[] = [];
const todoArray: {}[] = [];

// factory for projects
const Project = (name: string): ProjectData => ({
  name,
  createdDate: Timestamp.now(),
});

// factory for todos
// TODO: parentProject not saved yet!
const Todo = (name: string, parentProject: Project): TodoData => ({
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

const getProjects = (type?: "inbox" | "noInbox") =>
  // const projects = [];
  getDocs(projectsCol).then((querySnapshot) => {
    const projects = querySnapshot.docs.map((doc) => ({
      ref: doc.ref,
      data: doc.data(),
    })) as Project[];

    switch (type) {
      case "inbox":
        console.log(projects);
        return [projects[0]];
      case "noInbox":
        return projects.slice(1);
      default:
        return projects;
    }
  });

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

const updateStorage = () => {
  localStorage.setItem("todoSystem-projects", JSON.stringify(projectArray));
  localStorage.setItem("todoSystem-todos", JSON.stringify(todoArray));
};

// TODO: add initial inbox project
// TODO: on open, open inbox
// TODO: fix order of buttons & inbox project on page

const createItem = (type: "project" | "todo", parentProject?: Project) => {
  const name = prompt(`What is the title of the new ${type}?`);
  if (name && type === "project") {
    addDoc(collection(db, "projects"), Project(name));
  }
  if (name && parentProject && type === "todo") {
    addDoc(
      collection(db, `projects/${parentProject.ref.id}/todos`),
      Todo(name, parentProject)
    );
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
  newDueDate?: Timestamp
) => {
  // TODO add change project
  todo.data.name = newName;
  todo.data.description = newDescription;
  if (newDueDate) todo.data.dueDate = newDueDate;
  updateStorage();
};

const updateCompleted = (todo: Todo) => {
  todo.data.complete = !todo.data.complete;
  updateStorage();
};

const updatePriority = (todo: Todo, priority: number) => {
  todo.data.priority = priority;
  updateStorage();
};

const deleteItem = (item: Project | Todo, type: "project" | "todo") => {
  if (confirm(`really remove ${item.data.name}?`)) {
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

const isInbox = (project: Project) => project === projectArray[0];

function withConverter(
  arg0: any
): {
  <U>(
    converter: import("@firebase/firestore").FirestoreDataConverter<U>
  ): DocumentReference<U>;
  (converter: null): DocumentReference<
    import("@firebase/firestore").DocumentData
  >;
} {
  throw new Error("Function not implemented.");
}

function converter(arg0: null): any {
  throw new Error("Function not implemented.");
}

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
