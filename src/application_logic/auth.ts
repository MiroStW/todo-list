import "firebase.js";
import {
  connectAuthEmulator,
  getAuth,
  onAuthStateChanged,
} from "firebase/auth";
import * as firebaseui from "firebaseui";
import uiConfig from "firebaseUI-config.js";
import showProjectList from "layout/showProjects";
import { changeUI } from "layout/showApp";
import { getProjects } from "./storage";
import { getRoutes } from "./router";

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
      getRoutes();
    } else {
      fbAuthUi.start("#firebaseui-auth-container", uiConfig);
      changeUI("authArea", "show");
      changeUI("projectArea", "hide");
      changeUI("todoArea", "hide");
    }
  });
};

export { auth, authUser };
