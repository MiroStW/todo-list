import { updatePriority, getProjectOfTodo } from "application_logic/storage";
import addIcon from "components/helpers/buttons/addIcon";
import { Todo } from "types";
import { showTodoArea } from "../showTodos";
import todoStyles from "./showTodo.module.css";
import globalStyles from "style.module.css";

const showPriority = (parent: Element, priority: number) => {
  const flag = addIcon(parent, "flag", priority === 4 ? "outlined" : undefined);
  flag.classList.add(todoStyles[`prio${priority}`]);
  flag.classList.add(todoStyles.todoPriority);
  flag.classList.add(globalStyles["md-18"]);

  return flag;
};

const priorityBtn = (todo: Todo, parent: Element, newPriority: number) => {
  const btn = showPriority(parent, newPriority);
  btn.addEventListener("click", () => {
    updatePriority(todo, newPriority);
    getProjectOfTodo(todo).then((project) => {
      showTodoArea("showProject", project);
    });
    parent.remove();
  });
};

const openPrioPicker = (todo: Todo, parent: Element) => {
  const pickerContainer = document.createElement("div");
  pickerContainer.classList.add(todoStyles.priorityPicker);
  priorityBtn(todo, pickerContainer, 1);
  priorityBtn(todo, pickerContainer, 2);
  priorityBtn(todo, pickerContainer, 3);
  priorityBtn(todo, pickerContainer, 4);
  parent.appendChild(pickerContainer);
};

export { openPrioPicker, showPriority };
