import "./firebase";
import {
  connectAuthEmulator,
  getAuth,
  onAuthStateChanged,
} from "firebase/auth";
import * as firebaseui from "firebaseui";
import "firebaseui/dist/firebaseui.css";
import uiConfig from "./firebaseUI-config.js";
import showHeader from "./layout/header";
import showProjectList from "./layout/projects_view";
import { showTodoArea } from "./layout/todos_view";
import styles from "./style.module.css";
import {
  currentProjects,
  getProjectById,
  getProjects,
  unsubscribe,
} from "application_logic/storage";
import Navigo from "navigo";

const root = document.querySelector("#root")!;
const router = new Navigo("/");
// unsubscribe last subscribtion before opening next
router.hooks({
  leave(done, match) {
    unsubscribe();
    done();
  },
});

// header
showHeader();

// project list
const projectArea = document.createElement("div");
projectArea.classList.add(styles.projectarea);
projectArea.setAttribute("hidden", "true");
root.appendChild(projectArea);

// Todo list
const todoArea = document.createElement("div");
todoArea.classList.add(styles.todoarea);
todoArea.setAttribute("hidden", "true");
root.appendChild(todoArea);

// Auth
const authArea = document.createElement("div");
authArea.setAttribute("id", "firebaseui-auth-container");
root.appendChild(authArea);

const loader = document.createElement("div");
loader.setAttribute("id", "loader");
loader.textContent = "Loading...";
root.appendChild(loader);

export const auth = getAuth();
// comment out this line to switch to production db
// connectAuthEmulator(auth, "http://localhost:9099");
const fbAuthUi = new firebaseui.auth.AuthUI(auth);

onAuthStateChanged(auth, (user) => {
  if (user) {
    console.log(user);
    // console.log(auth);
    authArea.setAttribute("hidden", "true");
    loader.setAttribute("hidden", "true");
    projectArea.removeAttribute("hidden");
    todoArea.removeAttribute("hidden");

    getProjects(showProjectList);
    router
      .on("/projects/:id", (match) => {
        const openedProject = currentProjects.find(
          (project) => project.ref.id === match!.data!.id
        );
        if (openedProject) showTodoArea("showProject", openedProject);
        else {
          getProjectById(match!.data!.id).then((project) =>
            showTodoArea("showProject", project)
          );
        }
      })
      .on("/today", () => {
        showTodoArea("showToday");
      })
      .on("/upcoming", () => {
        showTodoArea("showUpcoming");
      })
      .on(() => {
        showTodoArea("showProject");
      })
      .resolve();
  } else {
    fbAuthUi.start("#firebaseui-auth-container", uiConfig);
    authArea.removeAttribute("hidden");
    projectArea.setAttribute("hidden", "true");
    todoArea.setAttribute("hidden", "true");
  }
});

export default router;
