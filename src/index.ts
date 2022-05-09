import "./firebase.js";
import {
  connectAuthEmulator,
  getAuth,
  onAuthStateChanged,
} from "firebase/auth";
import * as firebaseui from "firebaseui";
import "firebaseui/dist/firebaseui.css";
import uiConfig from "./firebaseUI-config.js";
import { showSnackbar } from "./layout/snackbar";
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
import showSpinner from "layout/spinner";

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

const spinner = showSpinner();

showSnackbar();

export const auth = getAuth();
// comment out this line to switch to production db
// connectAuthEmulator(auth, "http://localhost:9099");
const fbAuthUi = new firebaseui.auth.AuthUI(auth);

onAuthStateChanged(auth, (user) => {
  if (user) {
    console.log(user);
    // console.log(auth);
    authArea.setAttribute("hidden", "true");
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
          getProjectById(match!.data!.id)
            .then((project) => showTodoArea("showProject", project))
            .then(() => spinner.setAttribute("hidden", "true"));
        }
      })
      .on("/today", () => {
        showTodoArea("showToday").then(() =>
          spinner.setAttribute("hidden", "true")
        );
      })
      .on("/upcoming", () => {
        showTodoArea("showUpcoming").then(() =>
          spinner.setAttribute("hidden", "true")
        );
      })
      .on(() => {
        showTodoArea("showProject").then(() =>
          spinner.setAttribute("hidden", "true")
        );
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
