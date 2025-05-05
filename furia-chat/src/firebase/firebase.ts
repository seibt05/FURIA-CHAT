import { getFirestore } from "firebase/firestore";
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebase = {
  apiKey: "AIzaSyAulc9XW32QFBiVF-nmhp76vmA04Y3F-Dw",
  authDomain: "furia-chat-db87f.firebaseapp.com",
  projectId: "furia-chat-db87f",
  storageBucket: "furia-chat-db87f.firebasestorage.app",
  messagingSenderId: "713209715246",
  appId: "1:713209715246:web:59298ca8b77d53aac39dbf"
};

// Initialize Firebase
const app = initializeApp(firebase);
export const db = getFirestore(app);