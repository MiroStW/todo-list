import { showHeader } from "./showHeader/showHeader";
import todoStyles from "./showTodos/showTodos.module.css";
import projectStyles from "./showProjects/showProjects.module.css";
import styles from "style.module.css";
import { showLoader } from "components/helpers/loader/loader";
import { showSnackbar } from "components/helpers/snackbar/snackbar";
import { showProjects } from "./showProjects/showProjects";

const root = document.querySelector("#root")!;
const main = document.createElement("div");
const projectArea = document.createElement("div");
const todoArea = document.createElement("div");
const authArea = document.createElement("div");
const loader = showLoader();

const showContent = () => {
  main.classList.add(styles.main);
  root.appendChild(main);

  // project list
  projectArea.classList.add(projectStyles.projectarea);
  projectArea.setAttribute("hidden", "true");
  main.appendChild(projectArea);

  showProjects(projectArea);

  // Todo list
  todoArea.classList.add(todoStyles.todoarea);
  todoArea.setAttribute("hidden", "true");
  main.appendChild(todoArea);

  // sign-in flow
  authArea.setAttribute("id", "firebaseui-auth-container");
  main.appendChild(authArea);
};

const showApp = () => {
  // header
  showHeader();

  // show authArea, projectArea, todoArea
  showContent();

  // show alerts
  showSnackbar();
};

const changeUI = (
  element: "projectArea" | "todoArea" | "authArea" | "loader",
  action: "show" | "hide"
) => {
  switch (element) {
    case "projectArea":
      // toggleVisibility()?
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
