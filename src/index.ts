import { authUser } from "application_logic/auth";
import { onUserLoggedOut, onUserLogin } from "application_logic/authEvent";
import { showApp } from "components/showApp";

showApp();

authUser({ onUserLogin, onUserLoggedOut });
