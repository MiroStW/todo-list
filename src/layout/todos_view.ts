/* eslint-disable prefer-destructuring */
/* eslint-disable no-param-reassign */
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import "flatpickr/dist/themes/dark.css";
import { fromUnixTime } from "date-fns";
import {
  getTodosByProject,
  getTodosByDate,
  getInboxProject,
} from "../application_logic/storage";
import styles from "../style.module.css";
import {
  todoDueDateIcon,
  completedTodosBtn,
  showTodoTitle,
  editTodoTitle,
  showPriority,
  openPrioPicker,
  completeTodoCheckbox,
  createUpdateTodoBtn,
  createDeleteBtn,
  createNewItemBtn,
  createCancelBtn,
} from "./buttons";
import { Project, Todo } from "types";

const showTodoDetails = (todo: Todo, todoDiv: Element) => {
  todoDiv.classList.add(styles.active);

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

  createUpdateTodoBtn(
    todo,
    todoBtnBar,
    nameInput,
    descriptionInput,
    document.querySelector(`#checkbox-${todo.ref.id}`)!,
    dueDateInput
  );

  createCancelBtn(todo, todoBtnBar);

  todoBottomRow.appendChild(todoBtnBar);
  todoDivOpen.appendChild(todoBottomRow);

  todoDiv.appendChild(todoDivOpen);

  flatpickr(dueDateInput, {
    defaultDate: todo.data.dueDate
      ? fromUnixTime(todo.data.dueDate.seconds)
      : undefined,
  });
};

const showTodoBar = (todo: Todo) => {
  const todoList = todo.data.complete
    ? document.querySelector(`.${styles.todoListCompleted}`)!
    : document.querySelector(`.${styles.todoList}`)!;
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
  todoDueDateIcon(todo, todoBarDiv);

  // todo title
  showTodoTitle(todo, todoBarDiv);

  // remove button
  createDeleteBtn(todoBarDiv, "todo", todo);

  todoDiv.addEventListener("mouseover", () => {
    todoBarDiv.classList.add(styles.active);
  });
  todoDiv.addEventListener("mouseout", () => {
    todoBarDiv.classList.remove(styles.active);
  });

  todoBarDiv.addEventListener(
    "click",
    () => {
      showTodoDetails(todo, todoDiv);
    },
    { once: true }
  );

  todoList.appendChild(todoDiv);
};

const showTodoList = (todos: Todo[], showCompleted: boolean) => {
  const todoList = document.querySelector(`.${styles.todoList}`)!;

  if (!showCompleted)
    while (todoList.childNodes.length > 0) {
      todoList.removeChild(todoList.childNodes[0]);
    }
  todos.forEach((todo) => showTodoBar(todo));
};

const showTodoArea = async (
  action: "showCompleted" | "showProject" | "showToday" | "showUpcoming",
  project?: Project
) => {
  const todoArea = document.querySelector(`.${styles.todoarea}`)!;
  if (action !== "showCompleted")
    while (todoArea.childNodes.length > 0) {
      todoArea.removeChild(todoArea.childNodes[0]);
    }

  // show header
  const todoHeaderDiv = document.createElement("div");
  todoHeaderDiv.classList.add(styles.todoHeader);
  const todoHeader = document.createElement("h2");
  todoHeaderDiv.appendChild(todoHeader);
  todoArea.appendChild(todoHeaderDiv);

  // show todo list
  const todoList = document.createElement("div");
  todoList.classList.add(styles.todoList);
  todoArea.appendChild(todoList);

  // show completed todos
  const todoListCompleted = document.createElement("div");
  todoListCompleted.classList.add(styles.todoListCompleted);
  todoListCompleted.setAttribute("hidden", "");
  todoArea.appendChild(todoListCompleted);

  switch (action) {
    case "showCompleted":
      if (!project) {
        getInboxProject().then((inbox) => {
          getTodosByProject(inbox, showTodoList, true);
        });
      } else getTodosByProject(project, showTodoList, true);
      break;
    case "showToday":
      todoHeader.textContent = "Today";
      getTodosByDate("past", showTodoList);
      break;
    case "showUpcoming":
      todoHeader.textContent = "Upcoming";
      getTodosByDate("future", showTodoList);
      break;
    case "showProject":
      if (!project) {
        getInboxProject().then((inbox) => {
          todoHeader.textContent = inbox.data.name;
          getTodosByProject(inbox, showTodoList, false);
          createNewItemBtn(todoArea, "todo", project);
        });
      } else {
        todoHeader.textContent = project.data.name;
        getTodosByProject(project, showTodoList, false);
        createNewItemBtn(todoArea, "todo", project);
        completedTodosBtn(project, todoListCompleted, todoHeaderDiv);
      }
      break;
    default:
      break;
  }
};
export { showTodoArea, showTodoDetails };

// overall todoArea
// [x] focus immediately in title
// [ ] put each element in own function
// [ ] review button.js & clean up structure
// [x] create function to close todo
// [ ] BONUS opening a todo closes all other todos (only one open at a time)
// [ ] BONUS clicking anywhere else in todoArea closes open todo

// dueDate
// [x] add datepicker
// [x] dueDate needs to be saved as real date, not string
// [x] add dueDate icons

// complete todo
// [x] completed todos should have checked checkbox
// [x] put completed todos in 'done' list
// [x] add transition period before checked todo is moved there
// [x] have done list closed by default

// [ ] add ability to move todos between projects

// projectArea
// [x] add today view
// [x] add upcoming view
// [ ] highlight open project
