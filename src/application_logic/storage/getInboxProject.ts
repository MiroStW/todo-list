import { auth } from "application_logic/auth";
import { addDoc, query, where, getDocs } from "firebase/firestore";
import { Project } from "types";
import { createProjectData } from "./factory";
import { projectConverter } from "./firestoreConverter";
import { projects } from "./useDb";

// add inbox project for new users
const createInboxProject = async () => {
  const projectData = createProjectData("Inbox", true);
  const newInboxRef = await addDoc(projects, projectData);
  return new Project(newInboxRef, projectData);
};

const getInboxProject = async () => {
  const q = query(
    projects,
    where("ownerID", "==", auth.currentUser?.uid),
    where("isInbox", "==", true)
  ).withConverter(projectConverter);
  const snapshot = await getDocs(q);

  // for new users inbox project needs to be added first
  if (!snapshot.size) return await createInboxProject();

  return snapshot.docs[0].data();
};

const isInbox = (project: Project) => project.data.isInbox === true;

export { getInboxProject, isInbox };
