import { fromUnixTime } from "date-fns";
import flatpickr from "flatpickr";
import { Todo } from "types";
import styles from "./todoDetails.module.css";
import showTodoStyles from "../showTodo/showTodo.module.css";
import editTodoTitle from "./editTodoTitle";
import updateTodoBtn from "./updateTodoBtn";
import cancelBtn from "./cancelBtn";

const todoDetails = (todo: Todo, todoDiv: Element) => {
  todoDiv.classList.add(showTodoStyles.active);

  // make title editable
  const nameInput = editTodoTitle(todo, todoDiv);
  nameInput.focus();

  const todoDivOpen = document.createElement("div");
  todoDivOpen.classList.add(styles.todoOpen);

  // todo description
  // [] expand textarea when reopening todo
  const descriptionInput = document.createElement("textarea");
  descriptionInput.value = todo.data.description;
  descriptionInput.placeholder = "Description";

  function OnInput(this: HTMLElement) {
    this.style.height = "auto";
    this.style.height = `${this.scrollHeight}px`;
  }
  descriptionInput.addEventListener("input", OnInput, false);

  todoDivOpen.appendChild(descriptionInput);

  const todoBottomRow = document.createElement("div");
  todoBottomRow.classList.add(styles.todoBottomRow);
  // todo duedate
  const dueDateInput = document.createElement("input");
  dueDateInput.classList.add(styles.todoDueDate);
  dueDateInput.placeholder = "Due date";
  todoBottomRow.appendChild(dueDateInput);

  // show created date
  // const createdDate = document.createElement("div");
  // createdDate.textContent = format(
  //   fromUnixTime(todo.createdDate),
  //   "yyyy-mm-dd"
  // );
  // todoDivOpen.appendChild(createdDate);

  // buttons
  const todoBtnBar = document.createElement("div");
  todoBtnBar.classList.add(styles.todoBtnBar);

  updateTodoBtn(
    todo,
    todoBtnBar,
    nameInput,
    descriptionInput,
    document.querySelector(`#checkbox-${todo.ref.id}`)!,
    dueDateInput
  );

  cancelBtn(todo, todoBtnBar);

  todoBottomRow.appendChild(todoBtnBar);
  todoDivOpen.appendChild(todoBottomRow);

  todoDiv.appendChild(todoDivOpen);

  flatpickr(dueDateInput, {
    defaultDate: todo.data.dueDate
      ? fromUnixTime(todo.data.dueDate.seconds)
      : undefined,
  });
};

export { todoDetails };
