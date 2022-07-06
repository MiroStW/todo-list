import { QuerySnapshot } from "firebase/firestore";
import { useSnackbar } from "components/helpers/snackbar/snackbar";

let onlineStatus: boolean;

const showOnlineStatus = (snapshot: QuerySnapshot) => {
  // pass snapshot.metadata.fromCache as prop, not whole snapshot
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
