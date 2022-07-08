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

  unsubscribeProjects = onSnapshot(
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

export { unsubscribeProjects, getProjects, getProjectById, getProjectOfTodo };
