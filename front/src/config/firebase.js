// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";

import { getAuth, GoogleAuthProvider } from "firebase/auth";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDsN_V5CLIZtKUwaSmg5Ag0bkMZhoP4ZI4",
  authDomain: "tp-final-uade.firebaseapp.com",
  projectId: "tp-final-uade",
  storageBucket: "tp-final-uade.appspot.com",
  messagingSenderId: "494691643254",
  appId: "1:494691643254:web:172f04c2120367e6161457",
  measurementId: "G-D059HDQWD6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);

export const auth = getAuth(app)
export const googleProvider = new GoogleAuthProvider()
