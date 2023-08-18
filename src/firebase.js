// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAqlcSAztmDZQ-2BIGFqXs4Rovn2DJkFS0",
  authDomain: "todo-list-eceaf.firebaseapp.com",
  projectId: "todo-list-eceaf",
  storageBucket: "todo-list-eceaf.appspot.com",
  messagingSenderId: "207436224014",
  appId: "1:207436224014:web:dd82e529d95966c5f14e5f"
};



// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const db = getFirestore(app)
export {app, auth, db}