import {
  differenceInCalendarDays,
  fromUnixTime,
  differenceInCalendarYears,
  format,
} from "date-fns";
import { Todo } from "types";
import todoStyles from "./showTodo.module.css";
import { showIcon } from "components/helpers/buttons/showIcon";

const todoDueDateIcon = (todo: Todo, parent: Element) => {
  const icon = document.createElement("div");
  if (todo.data.dueDate) {
    const daysToToday = differenceInCalendarDays(
      fromUnixTime(todo.data.dueDate.seconds),
      new Date()
    );
    const yearsToToday = differenceInCalendarYears(
      fromUnixTime(todo.data.dueDate.seconds),
      new Date()
    );

    if (daysToToday <= 0) {
      showIcon({ parent: icon, iconName: "star", color: "yellow" });
    } else if (daysToToday < 7) {
      icon.classList.add(todoStyles.todoDueDateIcon);
      icon.textContent = format(fromUnixTime(todo.data.dueDate.seconds), "E");
    } else if (yearsToToday <= 0) {
      icon.classList.add(todoStyles.todoDueDateIcon);
      icon.textContent = format(
        fromUnixTime(todo.data.dueDate.seconds),
        "d. MMM"
      );
    } else {
      icon.classList.add(todoStyles.todoDueDateIcon);
      icon.textContent = format(
        fromUnixTime(todo.data.dueDate.seconds),
        "MMM yyyy"
      );
    }
  }

  parent.appendChild(icon);
};

export { todoDueDateIcon };
