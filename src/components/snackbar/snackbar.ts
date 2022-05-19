import styles from "./snackbar.module.css";

const showSnackbar = () => {
  const root = document.querySelector("#root")!;
  const snackbar = document.createElement("div");
  snackbar.id = styles.snackbar;
  root.appendChild(snackbar);
};

const useSnackbar = (message: string, color?: "red" | "green") => {
  // Get the snackbar DIV
  const container = document.getElementById(styles.snackbar)!;

  // Add the "show" class to DIV
  container.classList.add(styles.show);
  if (color) container.classList.add(styles[color]);
  container.textContent = message;

  // After 3 seconds, remove the show class from DIV
  setTimeout(function () {
    container.className = container.className.replace(styles.show, "");
    if (color) container.classList.remove(styles[color]);
  }, 3000);

  return container;
};

export { useSnackbar, showSnackbar };
