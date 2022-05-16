import {
  GoogleAuthProvider,
  // GithubAuthProvider,
  EmailAuthProvider,
} from "firebase/auth";

const uiConfig = {
  callbacks: {
    // signInSuccessWithAuthResult(authResult, redirectUrl) {
    // console.log("signInSuccessWithAuthResult called, user:");
    // console.log(authResult.user);
    // User successfully signed in.
    // Return type determines whether we continue the redirect automatically
    // or whether we leave that to developer to handle.

    //   return false;
    // },
    uiShown() {
      // The widget is rendered.
      // Hide the loader.
      document.getElementById("loader").style.display = "none";
    },
  },
  // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
  signInFlow: "popup",
  signInSuccessUrl: "/",
  signInOptions: [
    // Leave the lines as is for the providers you want to offer your users.
    GoogleAuthProvider.PROVIDER_ID,
    // GithubAuthProvider.PROVIDER_ID,
    EmailAuthProvider.PROVIDER_ID,
    // firebase.auth.AnonymousAuthProvider.PROVIDER_ID,
  ],
  // Terms of service url.
  // tosUrl: "<your-tos-url>",
  // Privacy policy url.
  // privacyPolicyUrl: "<your-privacy-policy-url>",
};

export default uiConfig;
