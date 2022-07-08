import { auth } from "application_logic/auth";
import { Unsubscribe } from "firebase/auth";
import { query, where, orderBy, onSnapshot } from "firebase/firestore";
import { Project, Todo } from "types";
import { todoConverter } from "./firestoreConverter";
import { todosOfProject, todos } from "./useDb";

let unsubscribeTodos: Unsubscribe;

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
  ).withConverter(todoConverter);

  unsubscribeTodos = onSnapshot(q, (snapshot) => {
    const todos: Todo[] = [];
    snapshot.forEach((doc) => {
      todos.push(doc.data());
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
  ).withConverter(todoConverter);

  unsubscribeTodos = onSnapshot(q, (snapshot) => {
    const todos: Todo[] = [];
    snapshot.forEach((doc) => {
      todos.push(doc.data());
    });
    renderer(todos, false);
  });
};

export { unsubscribeTodos, getTodosByProject, getTodosByDate };
