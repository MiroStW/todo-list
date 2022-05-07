# Todo-list app: a demo project

## clone or fork the project

After cloning the project locally follow these steps to set up firebase backend:

1. Create a new firebase project at https://console.firebase.google.com/ by
   clicking `add project`
2. On the main project page click the `</>` button to add a web app
   - no firebase hosting required
3. create a new file called `firebase-config.js` in the `src` directory and paste
   your `firebaseConfig` like this:

```
const firebaseConfig = {
  apiKey: "YOURAPIKEY",
  authDomain: "YOURPROJECTNAME.firebaseapp.com",
  projectId: "YOURPROJECTNAME",
  storageBucket: "YOURPROJECTNAME.appspot.com",
  messagingSenderId: "YOURSENDERID",
  appId: "YOURAPPID"
};
export default firebaseConfig;
```

4. Go to Cloud Firestore and click `create database`, starting in test mode
5. Go to Authentification and click `get started`
   - enable sign-in providers `Email/Password` and if you like `Google`

// todo: create indices in config file?
