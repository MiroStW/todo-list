import { initializeApp } from "firebase/app";
import {
  getAuth,
  onAuthStateChanged,
  GoogleAuthProvider,
  GithubAuthProvider,
  EmailAuthProvider,
} from "firebase/auth";
import * as firebaseui from "firebaseui";
import "firebaseui/dist/firebaseui.css";
import firebaseConfig from "./firebase-config";
import showProjectList from "./layout/projects_view";
import { showTodoList } from "./layout/todos_view";
import styles from "./style.module.css";

const root = document.querySelector("#root");

// header
const header = document.createElement("div");
header.classList.add(styles.header);
header.textContent = "Todo system";
root.appendChild(header);

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

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const fbAuthUi = new firebaseui.auth.AuthUI(auth);

const uiConfig = {
  callbacks: {
    signInSuccessWithAuthResult(authResult, redirectUrl) {
      console.log("signInSuccessWithAuthResult called, user:");
      console.log(authResult.user);
      // User successfully signed in.
      // Return type determines whether we continue the redirect automatically
      // or whether we leave that to developer to handle.
      if (authResult.user) {
        authArea.setAttribute("hidden", "true");
        projectArea.removeAttribute("hidden");
        todoArea.removeAttribute("hidden");
        showProjectList();
        showTodoList("showProject");
      }

      return false;
    },
    uiShown() {
      // The widget is rendered.
      // Hide the loader.
      document.getElementById("loader").style.display = "none";
    },
  },
  // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
  signInFlow: "popup",
  signInSuccessUrl: "/",
  signInOptions: [
    // Leave the lines as is for the providers you want to offer your users.
    GoogleAuthProvider.PROVIDER_ID,
    GithubAuthProvider.PROVIDER_ID,
    EmailAuthProvider.PROVIDER_ID,
    // firebase.auth.AnonymousAuthProvider.PROVIDER_ID,
  ],
  // Terms of service url.
  // tosUrl: "<your-tos-url>",
  // Privacy policy url.
  // privacyPolicyUrl: "<your-privacy-policy-url>",
};

function initApp() {
  console.log("initApp called");
}
onAuthStateChanged(auth, (user) => {
  if (user) {
    console.log(user);
    authArea.setAttribute("hidden", "true");
    projectArea.removeAttribute("hidden");
    todoArea.removeAttribute("hidden");

    showProjectList();
    showTodoList("showProject");
  } else {
    fbAuthUi.start("#firebaseui-auth-container", uiConfig);
    authArea.removeAttribute("hidden");
    projectArea.setAttribute("hidden", "true");
    todoArea.setAttribute("hidden", "true");
    console.log("no user:");
    console.log(user);
  }
});

window.addEventListener("load", () => {
  initApp();
});
