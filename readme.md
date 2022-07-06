# Todo-list app: a demo project

Live demo here: https://todo-list-app-5c488.web.app/

**Key features**

- google firebase backend, incl. nosql database and auth service
- live updates & offline capability
- fully typed app
- no framework, plain javascript
- responsive design
- webpack & babel set up

## Run the app

To run the app, you must have a Firebase project set up. After cloning the project locally follow these steps to set up your own firebase backend:

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
export {firebaseConfig};
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

7. (optional) switch to local emulators for auth & firestore
   - go to `useDb.ts` and uncomment the line
   ```
   connectFirestoreEmulator(firestore, "localhost", 8080);
   ```
   - go to `index.ts` and uncomment the line
   ```
   connectAuthEmulator(auth, "http://localhost:9099");
   ```
