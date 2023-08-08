// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth,GoogleAuthProvider} from 'firebase/auth'
import {Firestore, getFirestore} from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAd_BjEZxtkCVuyzGIOgApwZAREr5qA5CI",
  authDomain: "social-media-app-9b37c.firebaseapp.com",
  projectId: "social-media-app-9b37c",
  storageBucket: "social-media-app-9b37c.appspot.com",
  messagingSenderId: "932401470835",
  appId: "1:932401470835:web:09bb9c011f9cc65e4e3906"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth=getAuth(app);
export const provider= new GoogleAuthProvider();
export const db=getFirestore(app);

