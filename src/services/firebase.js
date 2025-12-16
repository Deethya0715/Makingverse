import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"; 
import { getDatabase } from 'firebase/database'; 
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDXdcsITSqdAzPSPG0NKOzrnbL-RMmrbns",
  authDomain: "makingverse-1df28.firebaseapp.com",
  projectId: "makingverse-1df28",
  storageBucket: "makingverse-1df28.firebasestorage.app",
  messagingSenderId: "332155817780",
  appId: "1:332155817780:web:f4130b2577dccc768a5f61",
  measurementId: "G-Q0NBH4MCLJ" 
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app); 
export const rtdb = getDatabase(app);