import { changeUI } from "layout/showApp";
import { showTodoArea } from "layout/showTodos";
import Navigo from "navigo";
import { currentProjects, getProjectById, unsubscribe } from "./storage";

const router = new Navigo("/").hooks({
  leave(done, match) {
    // unsubscribe last subscribtion before opening next
    unsubscribe();
    done();
  },
});

const getRoutes = () => {
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
};
export { router, getRoutes };
