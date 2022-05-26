import addIcon from "components/helpers/buttons/addIcon";
import styles from "./mobileMenuBtn.module.css";
import headerStyles from "../header.module.css";
import projectStyles from "components/showProjects/showProjects.module.css";

const mobileMenuBtn = () => {
  const projectArea = document.querySelector(`.${projectStyles.projectarea}`)!;
  const header = document.querySelector(`.${headerStyles.header}`)!;

  const btn = document.createElement("div");
  btn.classList.add(styles.mobileMenuBtn);
  header.appendChild(btn);

  const openMenuIcon = addIcon(btn, "menu", "filled", 24);
  const closeMenuIcon = addIcon(btn, "close", "filled", 24);
  closeMenuIcon.classList.add(styles.hideIcon);

  btn.addEventListener("click", () => {
    projectArea.classList.toggle(styles.open);
    openMenuIcon.classList.toggle(styles.hideIcon);
    closeMenuIcon.classList.toggle(styles.hideIcon);
  });
};

export default mobileMenuBtn;
