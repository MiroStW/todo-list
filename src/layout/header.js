import { getAuth, onAuthStateChanged } from "firebase/auth";
import styles from "./header.module.css";

const showHeader = () => {
  const auth = getAuth();

  const root = document.querySelector("#root");

  const header = document.createElement("div");
  header.classList.add(styles.header);
  root.appendChild(header);

  const headerTitle = document.createElement("div");
  headerTitle.classList.add(styles.headerTitle);
  header.appendChild(headerTitle);

  const userWidget = document.createElement("div");
  userWidget.classList.add(styles.userWidget);
  header.appendChild(userWidget);

  onAuthStateChanged(auth, (user) => {
    if (user) {
      console.log(user);
      const username =
        user.displayName.slice(0, 1).toUpperCase() +
        user.displayName.slice(1, user.displayName.length);
      headerTitle.textContent = `${username}'s todo system`;
      if (user.photoURL) {
        const userImage = document.createElement("img");
        userImage.setAttribute("src", user.photoURL);
        userWidget.appendChild(userImage);
      } else {
        const userInitials = document.createElement("div");
        userInitials.textContent = username.slice(0, 1);
        userWidget.appendChild(userInitials);
      }
    } else {
      headerTitle.textContent = "Todo system";
    }
  });
};

export default showHeader;
