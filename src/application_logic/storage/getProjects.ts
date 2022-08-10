import { auth } from "application_logic/auth";
import { showOnlineStatus } from "components/helpers/onlineStatus/showOnlineStatus";
import {
  getDoc,
  query,
  where,
  documentId,
  getDocsFromCache,
  getDocs,
  orderBy,
  onSnapshot,
  Unsubscribe,
} from "firebase/firestore";
import { Todo, Project } from "types";
import { projectConverter } from "./firestoreConverter";
import { projects } from "./useDb";

let unsubscribeProjects: Unsubscribe;

const getProjectOfTodo = async (todo: Todo) => {
  const project = await getDoc(
    todo.ref.parent.parent!.withConverter(projectConverter)
  );
  return project.data();
};

const getProjectById = async (id: string) => {
  const q = query(
    projects,
    where("ownerID", "==", auth.currentUser?.uid),
    where(documentId(), "==", id)
  ).withConverter(projectConverter);

  const cachedSnapshot = await getDocsFromCache(q);
  if (cachedSnapshot.size > 0) return cachedSnapshot.docs[0].data();

  const snapshot = await getDocs(q);
  if (snapshot.size > 0) return snapshot.docs[0].data();
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

  unsubscribeProjects = onSnapshot(
    q,
    { includeMetadataChanges: true },
    async (snapshot) => {
      const projects: Project[] = [];
      snapshot.forEach((doc) => {
        projects.push(doc.data());
      });
      renderer(parent, projects);

      showOnlineStatus(snapshot);
    }
  );
};

export { unsubscribeProjects, getProjects, getProjectById, getProjectOfTodo };
