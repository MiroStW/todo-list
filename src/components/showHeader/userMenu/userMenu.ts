import { auth } from "application_logic/auth";
import { onAuthStateChanged, signOut } from "firebase/auth";
import styles from "./userMenu.module.css";
import headerStyles from "../header.module.css";

const userMenu = () => {
  const header = document.querySelector(`.${headerStyles.header}`)!;

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
  userMenuSignOut.addEventListener("click", () => signOut(auth));
  userMenuList.appendChild(userMenuSignOut);

  onAuthStateChanged(auth, (user) => {
    if (user) {
      userWidget.removeAttribute("hidden");
      const userInitials = user
        .displayName!.split(" ")
        .map((n) => n[0])
        .join("");
      if (user.photoURL) {
        const userImageTag = document.createElement("img");
        userImageTag.setAttribute("src", user.photoURL);
        userImageTag.setAttribute("alt", userInitials);
        userImageTag.setAttribute("onerror", "this.classList.add('brokenImg')");
        userImage.appendChild(userImageTag);
      } else {
        userImage.textContent = userInitials;
      }
    } else {
      if (document.querySelector(`.${styles.userImageTag}>img`))
        document.querySelector(`.${styles.userImageTag}>img`)!.remove();
      userWidget.setAttribute("hidden", "");
    }
  });
};

export { userMenu };
