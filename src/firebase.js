// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBau411xeRk5ieWoFNx1FETxzSu0HLLf7U",
  authDomain: "todo-authentication-14e8d.firebaseapp.com",
  projectId: "todo-authentication-14e8d",
  storageBucket: "todo-authentication-14e8d.appspot.com",
  messagingSenderId: "621137017348",
  appId: "1:621137017348:web:b87948ea60081b7d819351"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const db = getFirestore(app)
export {app, auth, db}