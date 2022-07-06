import "firebase.js";
import {
  connectAuthEmulator,
  getAuth,
  onAuthStateChanged,
} from "firebase/auth";
import * as firebaseui from "firebaseui";
import "firebaseui/dist/firebaseui.css";
import { uiConfig } from "firebaseUI-config.js";

const auth = getAuth();
// comment out this line to switch to production db
// connectAuthEmulator(auth, "http://localhost:9099");
const fbAuthUi = new firebaseui.auth.AuthUI(auth);

interface AuthUserProps {
  onUserLoggedIn: () => void;
  onUserLoggedOut: () => void;
}

const authUser = ({ onUserLoggedIn, onUserLoggedOut }: AuthUserProps) => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      // console.log(user);
      // console.log(auth);
      onUserLoggedIn();
    } else {
      fbAuthUi.start("#firebaseui-auth-container", uiConfig);
      onUserLoggedOut();
    }
  });
};

export { auth, authUser };
