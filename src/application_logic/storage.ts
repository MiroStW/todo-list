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
  onSnapshot,
  orderBy,
  Unsubscribe,
  documentId,
} from "firebase/firestore";
import { auth } from "./auth";
import { showTodoArea } from "components/showTodos/showTodos";
import { Project, ProjectData, Todo, TodoData } from "types";
import onlineStatus from "helpers/onlineStatus/onlineStatus";
import { projectsCol, projectTodosCol, todosCol } from "./useDb";

// factory for projects
const Project = (name: string, isInbox?: boolean): ProjectData => ({
  name,
  createdDate: Timestamp.now(),
  ownerID: auth.currentUser?.uid!,
  ...(isInbox && { isInbox: true }),
  isArchived: false,
});

// factory for todos
const Todo = (name: string): TodoData => ({
  name,
  complete: false,
  description: "",
  dueDate: null,
  priority: 4,
  createdDate: Timestamp.now(),
  ownerID: auth.currentUser?.uid!,
});

let currentProjects: Project[] = [];
let unsubscribe: Unsubscribe;

const getProjectOfTodo = (todo: Todo) =>
  getDoc(todo.ref.parent.parent as DocumentReference).then(
    (doc) =>
      ({
        ref: doc.ref,
        data: doc.data(),
      } as Project)
  );

const getProjectById = async (id: string) => {
  const q = query(
    projectsCol,
    where("ownerID", "==", auth.currentUser?.uid),
    where(documentId(), "==", id)
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.map((project) => ({
    ref: project.ref,
    data: project.data(),
  }))[0];
};

// add inbox project for new users
const addInboxProject = () =>
  addDoc(projectsCol, Project("Inbox", true)).then((newInbox) =>
    getDoc(newInbox).then(
      (documentSnapshot) =>
        ({
          ref: documentSnapshot.ref,
          data: documentSnapshot.data(),
        } as Project)
    )
  );

const getInboxProject = async () => {
  const q = query(
    projectsCol,
    where("ownerID", "==", auth.currentUser?.uid),
    where("isInbox", "==", true)
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.map((inbox) => ({
    ref: inbox.ref,
    data: inbox.data(),
  }))[0];
};

const getProjects = (renderer: (projects: Project[]) => void) => {
  const q = query(
    projectsCol,
    where("ownerID", "==", auth.currentUser?.uid),
    where("isArchived", "==", false), // doesnt filter for docs without the field
    orderBy("createdDate")
  );

  unsubscribe = onSnapshot(q, { includeMetadataChanges: true }, (snapshot) => {
    const projects: Project[] = [];
    snapshot.forEach((doc) => {
      projects.push({
        ref: doc.ref,
        data: doc.data(),
      });
    });
    renderer(projects);
    currentProjects = projects;
    // snapshot.docChanges().map((change) => {
    //   if (change.type === "added") {
    //     projects.push({
    //       ref: change.doc.ref,
    //       data: change.doc.data(),
    //     } as Project);
    //   }

    //   if (change.type === "modified") {
    //     const i = projects.findIndex(
    //       (project) => project.ref.id === change.doc.id
    //     );
    //     projects[i] = {
    //       ref: change.doc.ref,
    //       data: change.doc.data(),
    //     };
    //   }

    //   if (change.type === "removed") {
    //     const i = projects.findIndex(
    //       (project) => project.ref.id === change.doc.id
    //     );
    //     projects.splice(i);
    //   }
    // });

    if (!snapshot.size) addInboxProject();
    onlineStatus(snapshot);
  });
};

const getTodosByProject = (
  project: Project,
  renderer: (todos: Todo[], showCompleted: boolean) => void,
  completed: boolean = false
) => {
  const q = query(
    projectTodosCol(project),
    where("complete", "==", completed),
    where("ownerID", "==", auth.currentUser?.uid),
    orderBy("createdDate")
  );

  unsubscribe = onSnapshot(q, (snapshot) => {
    const todos: Todo[] = [];
    snapshot.forEach((doc) => {
      todos.push({
        ref: doc.ref,
        data: doc.data(),
      });
    });
    renderer(todos, completed);
  });
};

const getTodosByDate = (
  type: "past" | "future",
  renderer: (todos: Todo[], showCompleted: boolean) => void
) => {
  const q = query(
    todosCol,
    where("dueDate", type === "past" ? "<=" : ">", new Date()),
    where("complete", "==", false),
    where("ownerID", "==", auth.currentUser?.uid),
    orderBy("dueDate")
  );

  unsubscribe = onSnapshot(q, (snapshot) => {
    const todos: Todo[] = [];
    snapshot.forEach((doc) => {
      todos.push({
        ref: doc.ref,
        data: doc.data(),
      });
    });
    renderer(todos, false);
  });
};

const createItem = (type: "project" | "todo", parentProject?: Project) => {
  const name = prompt(`What is the title of the new ${type}?`);
  if (name && type === "project") {
    addDoc(projectsCol, Project(name))
      .then((ref) => getDoc(ref))
      .then((doc) => {
        const project = {
          ref: doc.ref,
          data: doc.data()!,
        };
        showTodoArea("showProject", project);
      });
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

const deleteTodo = (todo: Todo) => {
  if (confirm(`really remove ${todo.data.name}?`)) deleteDoc(todo.ref);
};

const archiveProject = (project: Project) => {
  if (
    confirm(
      `CAREFUL - this will remove all todos in this project and can't be undone. Really remove ${project.data.name}?`
    )
  )
    // Delete requires cloud functions, would need billing account
    // --> instead archive projects, they don't even need to be visualised for now
    updateDoc(project.ref, {
      isArchived: true,
    });
};

const isInbox = (project: Project) => project.data.isInbox === true;

export {
  currentProjects,
  unsubscribe,
  getProjectById,
  getTodosByDate,
  getTodosByProject,
  getInboxProject,
  getProjects,
  getProjectOfTodo,
  isInbox,
  deleteTodo,
  archiveProject,
  renameItem,
  updateTodo,
  updateCompleted,
  updatePriority,
  createItem,
};
