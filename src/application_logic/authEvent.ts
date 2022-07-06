import { changeUI } from "components/showApp";
import { getProjects } from "./storage";
import projectStyles from "components/showProjects/showProjects.module.css";
import { showProjectList } from "components/showProjects/showProjectList/showProjectList";
import { createRoutes } from "./router";

const onUserLoggedIn = () => {
  changeUI("authArea", "hide");
  changeUI("projectArea", "show");
  changeUI("todoArea", "show");
  // TODO: extract getProjectListDom
  const projectListDom = document.querySelector(
    `.${projectStyles.projectList}`
  )!;
  getProjects(projectListDom, showProjectList);
  createRoutes();
};

const onUserLoggedOut = () => {
  changeUI("authArea", "show");
  changeUI("projectArea", "hide");
  changeUI("todoArea", "hide");
};

export { onUserLoggedOut, onUserLoggedIn };
