import { deleteBtn } from "components/helpers/buttons/deleteBtn";
import { Todo } from "types";
import styles from "./showTodo.module.css";
import todoListStyles from "../todoList/todoList.module.css";
import { todoDetails } from "../todoDetails/todoDetails";
import completeTodoCheckbox from "./completedTodoCheckbox";
import { showPriority, openPrioPicker } from "./priorityPicker";
import todoDueDateIcon from "./todoDueDateIcon";
import showTodoTitle from "./todoTitle";
import { router } from "application_logic/router";

const showTodo = (todo: Todo) => {
  const todoList = todo.data.complete
    ? document.querySelector(`.${todoListStyles.todoListCompleted}`)!
    : document.querySelector(`.${todoListStyles.todoList}`)!;
  const todoDiv = document.createElement("div");
  todoDiv.classList.add(styles.todo);

  // complete checkbox
  completeTodoCheckbox(todo, todoDiv);

  // priority flag
  const priority = showPriority(todoDiv, todo.data.priority);
  priority.addEventListener("click", () => {
    openPrioPicker(todo, todoDiv);
  });

  // todo bar
  const todoBarDiv = document.createElement("div");
  todoBarDiv.classList.add(styles.todoBar);
  todoDiv.appendChild(todoBarDiv);

  // dueDate icon
  if (!router.matchLocation("/today")) todoDueDateIcon(todo, todoBarDiv);

  // todo title
  showTodoTitle(todo, todoBarDiv);

  // remove button
  deleteBtn(todoBarDiv, "todo", todo);

  todoDiv.addEventListener("mouseover", () => {
    todoBarDiv.classList.add(styles.active);
  });
  todoDiv.addEventListener("mouseout", () => {
    todoBarDiv.classList.remove(styles.active);
  });

  todoBarDiv.addEventListener(
    "click",
    () => {
      todoDetails(todo, todoDiv);
    },
    { once: true }
  );

  todoList.appendChild(todoDiv);
};

export { showTodo };
