import { initializeApp } from "firebase/app";
import {getDatabase} from "firebase/database";
import {getAuth} from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyAFTLuxseiaKehqDC5dWLjhOledyftMN5k",
  authDomain: "gosafe-b9231.firebaseapp.com",
  projectId: "gosafe-b9231",
  storageBucket: "gosafe-b9231.appspot.com",
  messagingSenderId: "12326287513",
  appId: "1:12326287513:web:ce56f196b9a959940d2008",
  measurementId: "G-0222Q009JF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
export const auth = getAuth();