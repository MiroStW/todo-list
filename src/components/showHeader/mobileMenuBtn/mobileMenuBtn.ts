import addIcon from "components/helpers/buttons/addIcon";
import styles from "./mobileMenuBtn.module.css";
import headerStyles from "../header.module.css";

const openSideBar = () => {
  console.log("works");
  // 1. show projects bar (ideally transition)
  // 2. hide todo list (maybe just hidden underneath)
  // 3. change menu btn
};

const mobileMenuBtn = () => {
  const header = document.querySelector(`.${headerStyles.header}`)!;

  const btn = document.createElement("div");
  btn.classList.add(styles.mobileMenuBtn);
  header.appendChild(btn);

  addIcon(btn, "menu", "filled", 24);

  btn.addEventListener("click", () => {
    openSideBar();
  });
};

export default mobileMenuBtn;
