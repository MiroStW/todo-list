import showHeader from "./showHeader/header";
import todoStyles from "./showTodos/showTodos.module.css";
import projectStyles from "./showProjects/showProjects.module.css";
import showLoader from "helpers/loader/loader";
import { showSnackbar } from "helpers/snackbar/snackbar";

const root = document.querySelector("#root")!;
const projectArea = document.createElement("div");
const todoArea = document.createElement("div");
const authArea = document.createElement("div");
const loader = showLoader();

const showApp = () => {
  // header
  showHeader();

  // project list
  projectArea.classList.add(projectStyles.projectarea);
  projectArea.setAttribute("hidden", "true");
  root.appendChild(projectArea);

  // Todo list
  todoArea.classList.add(todoStyles.todoarea);
  todoArea.setAttribute("hidden", "true");
  root.appendChild(todoArea);

  // sign-in flow
  authArea.setAttribute("id", "firebaseui-auth-container");
  root.appendChild(authArea);

  // show alerts
  showSnackbar();
};

const changeUI = (
  element: "projectArea" | "todoArea" | "authArea" | "loader",
  action: "show" | "hide"
) => {
  switch (element) {
    case "projectArea":
      action === "show"
        ? projectArea.removeAttribute("hidden")
        : projectArea.setAttribute("hidden", "true");
      break;
    case "todoArea":
      action === "show"
        ? todoArea.removeAttribute("hidden")
        : todoArea.setAttribute("hidden", "true");
      break;
    case "authArea":
      action === "show"
        ? authArea.removeAttribute("hidden")
        : authArea.setAttribute("hidden", "true");
      break;
    case "loader":
      action === "show"
        ? loader.removeAttribute("hidden")
        : loader.setAttribute("hidden", "true");
      break;
    default:
      break;
  }
};

export { showApp, changeUI };
