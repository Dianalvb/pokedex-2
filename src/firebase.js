// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDyLkqQaSLlVvYvi5hMZUIPlGgU4R_oi0E",
  authDomain: "pokedex2-e9d50.firebaseapp.com",
  databaseURL: "https://pokedex2-e9d50-default-rtdb.firebaseio.com",
  projectId: "pokedex2-e9d50",
  storageBucket: "pokedex2-e9d50.firebasestorage.app",
  messagingSenderId: "727964692920",
  appId: "1:727964692920:web:b3d896f2f572e837c61f4d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
export const auth=getAuth(app)