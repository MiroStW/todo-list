import { initializeApp } from "firebase/app";
import firebaseConfig from "./firebase-config";

const app = initializeApp(firebaseConfig);

export { app };
