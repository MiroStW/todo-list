import addIcon from "components/helpers/buttons/addIcon";
import styles from "./mobileMenuBtn.module.css";
import headerStyles from "../header.module.css";
import projectStyles from "components/showProjects/showProjects.module.css";

const toggleMobileMenu = () => {
  const projectArea = document.querySelector(`.${projectStyles.projectarea}`)!;
  const mobileMenuBtn = document.querySelector(`.${styles.mobileMenuBtn}`)!;

  projectArea.classList.toggle(styles.open);
  Array.from(mobileMenuBtn.children).forEach((icon) => {
    icon.classList.toggle(styles.hideIcon);
  });
};

const mobileMenuBtn = () => {
  const header = document.querySelector(`.${headerStyles.header}`)!;

  const btn = document.createElement("div");
  btn.classList.add(styles.mobileMenuBtn);
  header.appendChild(btn);

  const openMenuIcon = addIcon(btn, "menu", "filled", 24);
  const closeMenuIcon = addIcon(btn, "close", "filled", 24);
  closeMenuIcon.classList.add(styles.hideIcon);

  btn.addEventListener("click", toggleMobileMenu);
};

export { mobileMenuBtn, toggleMobileMenu };
