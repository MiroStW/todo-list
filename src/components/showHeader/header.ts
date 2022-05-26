import { auth } from "application_logic/auth";
import { onAuthStateChanged } from "firebase/auth";
import styles from "./header.module.css";
import mobileMenuBtn from "./mobileMenuBtn/mobileMenuBtn";
import { userMenu } from "./userMenu/userMenu";

const showHeader = () => {
  const root = document.querySelector("#root")!;

  const header = document.createElement("div");
  header.classList.add(styles.header);
  root.appendChild(header);

  const headerTitle = document.createElement("div");
  headerTitle.classList.add(styles.headerTitle);

  onAuthStateChanged(auth, (user) => {
    if (user) {
      headerTitle.textContent = `${user.displayName}'s todo system`;
      mobileMenuBtn();
      header.appendChild(headerTitle);
      userMenu();
    } else {
      headerTitle.textContent = "Todo system";
      header.appendChild(headerTitle);
    }
  });
};

export default showHeader;
