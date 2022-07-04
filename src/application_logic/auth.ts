import "firebase.js";
import {
  connectAuthEmulator,
  getAuth,
  onAuthStateChanged,
} from "firebase/auth";
import * as firebaseui from "firebaseui";
import "firebaseui/dist/firebaseui.css";
import uiConfig from "firebaseUI-config.js";

interface authUserProps {
  onUserLogin: () => void;
  onUserLoggedOut: () => void;
}

const auth = getAuth();
// comment out this line to switch to production db
// connectAuthEmulator(auth, "http://localhost:9099");
const fbAuthUi = new firebaseui.auth.AuthUI(auth);

const authUser = ({ onUserLogin, onUserLoggedOut }: authUserProps) => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      // console.log(user);
      // console.log(auth);

      onUserLogin();
    } else {
      fbAuthUi.start("#firebaseui-auth-container", uiConfig);

      onUserLoggedOut();
    }
  });
};

export { auth, authUser };
