import { authUser } from "application_logic/auth";
import { onUserLoggedOut, onUserLoggedIn } from "application_logic/authEvent";
import { showApp } from "components/showApp";

showApp();

authUser({ onUserLoggedIn, onUserLoggedOut });
