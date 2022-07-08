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
  getDocsFromCache,
  FirestoreDataConverter,
  QueryDocumentSnapshot,
  QuerySnapshot,
} from "firebase/firestore";
import { auth } from "./auth";
import { showTodoArea } from "components/showTodos/showTodos";
import { Project, ProjectData, Todo, TodoData } from "types";
import { showOnlineStatus } from "components/helpers/onlineStatus/showOnlineStatus";
import { projects, todosOfProject, todos } from "./useDb";

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

type LocalDocumentData<D> = { ref: DocumentReference<D>, data: D };

function createFirestoreConverter<T>(): FirestoreDataConverter<LocalDocumentData<T>> {
  return {
    toFirestore: (localData: LocalDocumentData<T>) => {
      return localData.data;
    },
    fromFirestore: (snapshot: QueryDocumentSnapshot<T>): LocalDocumentData<T> => {
      // const data = snapshot.data(options);
      return {
        ref: snapshot.ref,
        data: snapshot.data(),
      };
    },
  };
};

const projectConverter = createFirestoreConverter<ProjectData>();
const todoConverter = createFirestoreConverter<TodoData>();

let unsubscribe: Unsubscribe;

const getProjectOfTodo = (todo: Todo) => {
  return getDoc(todo.ref.parent.parent as DocumentReference).then(
    (doc) =>
    ({
      ref: doc.ref,
      data: doc.data(),
    } as Project)
  );
};

const getProjectById = async (id: string) => {
  const q = query(
    projects,
    where("ownerID", "==", auth.currentUser?.uid),
    where(documentId(), "==", id)
  ).withConverter(projectConverter);

  const cachedSnapshot = await getDocsFromCache(q);
  if (cachedSnapshot.size > 0)
    return cachedSnapshot.docs[0].data();

  const snapshot = await getDocs(q);
  return snapshot.docs[0].data();
};

// add inbox project for new users
const addInboxProject = () => {
  const projectData = createProjectData("Inbox", true);
  return addDoc(projects, projectData).then((newInboxRef) => (new Project(
    newInboxRef,
    projectData
  )))
};

const getInboxProject = async () => {
  const q = query(
    projects,
    where("ownerID", "==", auth.currentUser?.uid),
    where("isInbox", "==", true)
  ).withConverter(createFirestoreConverter<ProjectData>());
  const snapshot = await getDocs(q);

  // for new users inbox project needs to be added first
  if (!snapshot.size) return await addInboxProject();

  return snapshot.docs[0].data();
};

const getProjects = (
  parent: Element,
  renderer: (parent: Element, projects: Project[]) => void
) => {
  const q = query(
    projects,
    where("ownerID", "==", auth.currentUser?.uid),
    where("isArchived", "==", false), // doesnt filter for docs without the field
    orderBy("createdDate")
  ).withConverter(projectConverter);

  unsubscribe = onSnapshot(
    q,
    { includeMetadataChanges: true },
    async (snapshot) => {
      const projects: Project[] = [];
      snapshot.forEach((doc) => {
        projects.push(doc.data());
      });
      renderer(parent, projects);
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

      showOnlineStatus(snapshot);
    }
  );
};

const getTodosByProject = (
  project: Project,
  renderer: (todos: Todo[], showCompleted: boolean) => void,
  isCompleted: boolean = false
) => {
  const q = query(
    todosOfProject(project),
    where("complete", "==", isCompleted),
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
    renderer(todos, isCompleted);
  });
};

const getTodosByDate = (
  type: "past" | "future",
  renderer: (todos: Todo[], showCompleted: boolean) => void
) => {
  const q = query(
    todos,
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
    addDoc(projects, createProjectData(name))
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
    addDoc(todosOfProject(parentProject), createTodoData(name));
  }
};

const renameProject = (project: Project) => {
  const newName = prompt(
    `What is the new name of ${project.data.name}?`,
    project.data.name
  );
  // TODO:  differentiate between project & todo updates
  if (newName) {
    updateDoc(project.ref, {
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
  renameProject,
  updateTodo,
  updateCompleted,
  updatePriority,
  createItem,
};
