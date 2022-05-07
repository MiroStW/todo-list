import { DocumentData, DocumentReference, Timestamp } from "firebase/firestore";

export interface ProjectData {
  isInbox?: boolean;
  isArchived: boolean;
  name: string;
  createdDate: Timestamp;
  ownerID: string;
}

export interface Project {
  ref: DocumentReference<ProjectData>;
  data: ProjectData;
}

export interface TodoData {
  name: string;
  complete: boolean;
  description: string;
  dueDate: Timestamp | null;
  priority: number;
  createdDate: Timestamp;
  ownerID: string;
}

export interface Todo {
  ref: DocumentReference<TodoData>;
  data: TodoData;
}
