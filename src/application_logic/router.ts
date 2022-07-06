import { changeUI } from "components/showApp";
import { showTodoArea } from "components/showTodos/showTodos";
import Navigo from "navigo";
import { getProjectById, unsubscribe } from "./storage";

const router = new Navigo("/").hooks({
  leave(done, match) {
    // unsubscribe last subscribtion before opening next
    unsubscribe();
    done();
  },
});

const createRoutes = () => {
  router
    .on("/projects/:id", (match) => {
      getProjectById(match!.data!.id)
        .then((project) => showTodoArea("showProject", project))
        .then(() => changeUI("loader", "hide"));
    })
    .on("/today", () => {
      showTodoArea("showToday").then(() => changeUI("loader", "hide"));
    })
    .on("/upcoming", () => {
      showTodoArea("showUpcoming").then(() => changeUI("loader", "hide"));
    })
    .on(() => {
      showTodoArea("showProject").then(() => changeUI("loader", "hide"));
    })
    .resolve();
};
export { router, createRoutes };
