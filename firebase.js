// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA2Rsq3K-1GbpkyQPNpumTfnWGkSJ1ynao",
  authDomain: "scannsign-10d3b.firebaseapp.com",
  projectId: "scannsign-10d3b",
  storageBucket: "scannsign-10d3b.appspot.com",
  messagingSenderId: "222274346427",
  appId: "1:222274346427:web:0e83000794d3265b3d389e",
  measurementId: "G-36Y9GPVT8R",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
export const auth = getAuth(app);
