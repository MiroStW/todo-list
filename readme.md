# Todo-list app: a demo project

Live demo here: https://todo-list-app-5c488.web.app/

## clone or fork the project

After cloning the project locally follow these steps to set up firebase backend:

1. Create a new firebase project
   - go to https://console.firebase.google.com/
   - click `add project`
2. Create web app
   - On the main project page click the `</>` button to add a web app
   - no firebase hosting required
3. add firebase config to local repo
   - create a new file called `firebase-config.js` in the `src` directory
   - paste your `firebaseConfig` like this:

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

4. Add database
   - Go to Cloud Firestore
   - click `create database`, choose test mode
5. Add auth service

   - Go to Authentification and click `get started`
   - enable sign-in providers `Email/Password` and if you like `Google`

6. Push security rules & indices
   - cd into main directory
   - run `npm install`
   - run `npx firebase login`, enter your google credentials
   - run `npx firebase deploy --only firestore`
