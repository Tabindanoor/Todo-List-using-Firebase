// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBfwT-3d6RZ9RVl32bWGBYqnI7_D4tF39E",
  authDomain: "solve-todo.firebaseapp.com",
  projectId: "solve-todo",
  storageBucket: "solve-todo.appspot.com",
  messagingSenderId: "936264572386",
  appId: "1:936264572386:web:fcdf6945ebbedbc2b76dbb"
};

// Initialize Firebase
// const app = initializeApp(firebaseConfig);



// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const db = getFirestore(app)
export {app, auth, db}