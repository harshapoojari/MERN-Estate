// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_KEY,
  authDomain: "grhsestate.firebaseapp.com",
  projectId: "grhsestate",
  storageBucket: "grhsestate.appspot.com",
  messagingSenderId: "180584118529",
  appId: "1:180584118529:web:d7c5890850daac128b4300"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);