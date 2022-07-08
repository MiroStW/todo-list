import { changeUI } from "components/showApp";
import { showTodoArea } from "components/showTodos/showTodos";
import Navigo from "navigo";
import { getProjectById, unsubscribeProjects } from "./storage/getProjects";
import { unsubscribeTodos } from "./storage/getTodos";

const router = new Navigo("/").hooks({
  leave(done, match) {
    // unsubscribe last subscribtion before opening next
    unsubscribeProjects();
    unsubscribeTodos();
    changeUI("loader", "show");
    done();
  },
});

const createRoutes = () => {
  router
    .on("/projects/:id", async (match) => {
      const project = await getProjectById(match!.data!.id);
      await showTodoArea("showProject", project);
      changeUI("loader", "hide");
    })
    .on("/today", async () => {
      await showTodoArea("showToday");
      changeUI("loader", "hide");
    })
    .on("/upcoming", async () => {
      await showTodoArea("showUpcoming");
      changeUI("loader", "hide");
    })
    .on(async () => {
      await showTodoArea("showProject");
      changeUI("loader", "hide");
    })
    .resolve();
};
export { router, createRoutes };
