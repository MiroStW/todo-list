import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
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
  userWidget.setAttribute("hidden", "");
  header.appendChild(userWidget);

  const userImage = document.createElement("div");
  userImage.classList.add(styles.userImage);
  userWidget.appendChild(userImage);

  const userMenu = document.createElement("div");
  userMenu.classList.add(styles.userMenu);
  userMenu.setAttribute("hidden", "");
  userWidget.appendChild(userMenu);
  userWidget.addEventListener("click", () =>
    userMenu.toggleAttribute("hidden")
  );

  const userMenuList = document.createElement("ul");
  userMenuList.classList.add(styles.userMenuList);
  userMenu.appendChild(userMenuList);

  const userMenuSignOut = document.createElement("li");
  userMenuSignOut.classList.add(styles.userMenuItem);
  userMenuSignOut.textContent = "sign out";
  userMenuSignOut.addEventListener("click", () => signOut(getAuth()));
  userMenuList.appendChild(userMenuSignOut);

  onAuthStateChanged(auth, (user) => {
    if (user) {
      console.log(user);
      const username =
        user.displayName.slice(0, 1).toUpperCase() +
        user.displayName.slice(1, user.displayName.length);
      headerTitle.textContent = `${username}'s todo system`;
      userWidget.removeAttribute("hidden");
      if (user.photoURL) {
        const userImageTag = document.createElement("img");
        userImageTag.setAttribute("src", user.photoURL);
        userImage.appendChild(userImageTag);
      } else {
        userImage.textContent = username.slice(0, 1);
      }
    } else {
      headerTitle.textContent = "Todo system";
      if (document.querySelector(`.${styles.userImageTag}>img`))
        document.querySelector(`.${styles.userImageTag}>img`).remove();
      userWidget.setAttribute("hidden", "");
    }
  });
};

export default showHeader;
