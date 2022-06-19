import showIcon from "components/helpers/buttons/showIcon";
import styles from "./mobileMenuBtn.module.css";
import headerStyles from "../showHeader.module.css";
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

  const openMenuIcon = showIcon({
    parent: btn,
    iconName: "menu",
    style: "filled",
    size: 24,
  });
  const closeMenuIcon = showIcon({
    parent: btn,
    iconName: "close",
    style: "filled",
    size: 24,
  });
  closeMenuIcon.classList.add(styles.hideIcon);

  btn.addEventListener("click", toggleMobileMenu);
};

export { mobileMenuBtn, toggleMobileMenu };
