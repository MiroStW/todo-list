import { auth } from "application_logic/auth";
import { Timestamp } from "firebase/firestore";
import { ProjectData, TodoData } from "types";

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

export { createProjectData, createTodoData };
