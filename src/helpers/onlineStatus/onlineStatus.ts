import { QuerySnapshot } from "firebase/firestore";
import { useSnackbar } from "helpers/snackbar/snackbar";

let onlineStatus: boolean;

const showOnlineStatus = (snapshot: QuerySnapshot) => {
  if (onlineStatus && snapshot.metadata.fromCache) {
    onlineStatus = false;
    useSnackbar("Your are offline, changes will be saved locally", "red");
  }
  if (!onlineStatus && !snapshot.metadata.fromCache) {
    onlineStatus = true;
    useSnackbar("You are online!", "green");
  }
};

export default showOnlineStatus;
