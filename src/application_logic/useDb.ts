import {
  getFirestore,
  CollectionReference,
  collection,
  DocumentData,
  collectionGroup,
  connectFirestoreEmulator,
  enableMultiTabIndexedDbPersistence,
} from "firebase/firestore";
import { useSnackbar } from "components/helpers/snackbar/snackbar";
import { Project, ProjectData, TodoData } from "../types";

// Export firestore instance
export const firestore = getFirestore();

// comment out this line to switch to production db
// connectFirestoreEmulator(firestore, "localhost", 8080);

enableMultiTabIndexedDbPersistence(firestore).catch((err) => {
  if (err.code == "failed-precondition") {
    useSnackbar("please don't open multiple tabs", "red");
  } else if (err.code == "unimplemented") {
    useSnackbar("browser does not support offline mode", "red");
  }
});

// This is just a helper to add the type to the db responses
const createCollection = <T = DocumentData>(collectionName: string) => {
  return collection(firestore, collectionName) as CollectionReference<T>;
};
const createCollectionGroup = <T = DocumentData>(collectionName: string) => {
  return collectionGroup(firestore, collectionName) as CollectionReference<T>;
};

// export all collections
export const projects = createCollection<ProjectData>("projects");
export const todos = createCollectionGroup<TodoData>("todos");
export const todosOfProject = (project: Project) =>
  createCollection<TodoData>(`projects/${project.ref.id}/todos`);
