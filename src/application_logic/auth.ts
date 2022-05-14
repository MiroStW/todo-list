import "firebase.js";
import Navigo from "navigo";
import {
  connectAuthEmulator,
  getAuth,
  onAuthStateChanged,
} from "firebase/auth";
import * as firebaseui from "firebaseui";
import uiConfig from "firebaseUI-config.js";
import showProjectList from "layout/showProjects";
import { showTodoArea } from "layout/showTodos";
import { changeUI } from "layout/showApp";
import {
  currentProjects,
  getProjectById,
  getProjects,
  unsubscribe,
} from "./storage";

const router = new Navigo("/");
// unsubscribe last subscribtion before opening next
router.hooks({
  leave(done, match) {
    unsubscribe();
    done();
  },
});

const auth = getAuth();
// comment out this line to switch to production db
// connectAuthEmulator(auth, "http://localhost:9099");
const fbAuthUi = new firebaseui.auth.AuthUI(auth);

const authUser = () => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      console.log(user);
      // console.log(auth);
      changeUI("authArea", "hide");
      changeUI("projectArea", "show");
      changeUI("todoArea", "show");

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
              .then(() => changeUI("spinner", "hide"));
          }
        })
        .on("/today", () => {
          showTodoArea("showToday").then(() => changeUI("spinner", "hide"));
        })
        .on("/upcoming", () => {
          showTodoArea("showUpcoming").then(() => changeUI("spinner", "hide"));
        })
        .on(() => {
          showTodoArea("showProject").then(() => changeUI("spinner", "hide"));
        })
        .resolve();
    } else {
      fbAuthUi.start("#firebaseui-auth-container", uiConfig);
      changeUI("authArea", "show");
      changeUI("projectArea", "hide");
      changeUI("todoArea", "hide");
    }
  });
};

export { router, auth, authUser };
