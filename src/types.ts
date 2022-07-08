import { DocumentData, DocumentReference, Timestamp } from "firebase/firestore";

export interface ProjectData {
  isInbox?: boolean;
  isArchived: boolean;
  name: string;
  createdDate: Timestamp;
  ownerID: string;
}

export class Project {
  readonly ref: DocumentReference<ProjectData>;
  readonly data: ProjectData;

  constructor(ref: DocumentReference<ProjectData>, data: ProjectData) {
    this.ref = ref;
    this.data = data;
  }
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
