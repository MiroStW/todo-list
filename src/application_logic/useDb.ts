// Get the imports
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  CollectionReference,
  collection,
  DocumentData,
  collectionGroup,
  connectFirestoreEmulator,
} from "firebase/firestore";
import app from "../firebase.js";
import { Project, ProjectData, TodoData } from "../types";

// Export firestore incase we need to access it directly
export const firestore = getFirestore();
// comment out this line to switch to production db
// connectFirestoreEmulator(firestore, "localhost", 8080);

// This is just a helper to add the type to the db responses
const createCollection = <T = DocumentData>(collectionName: string) => {
  return collection(firestore, collectionName) as CollectionReference<T>;
};
const createCollectionGroup = <T = DocumentData>(collectionName: string) => {
  return collectionGroup(firestore, collectionName) as CollectionReference<T>;
};

// export all your collections
export const projectsCol = createCollection<ProjectData>("projects");
export const todosCol = createCollectionGroup<TodoData>("todos");
export const projectTodosCol = (project: Project) =>
  createCollection<TodoData>(`projects/${project.ref.id}/todos`);
