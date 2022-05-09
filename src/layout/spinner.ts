import styles from "./spinner.module.css";

const showSpinner = () => {
  const root = document.querySelector("#root")!;

  const spinner = document.createElement("div");
  spinner.classList.add(styles.loadingSpinner);

  const spinnerSub1 = document.createElement("div");
  spinner.appendChild(spinnerSub1);
  const spinnerSub2 = document.createElement("div");
  spinner.appendChild(spinnerSub2);

  root.appendChild(spinner);

  return spinner;
};

export default showSpinner;
