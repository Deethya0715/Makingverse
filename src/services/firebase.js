import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"; // Firestore (existing)
import { getDatabase } from 'firebase/database'; // Realtime Database (added)
import { getAuth } from "firebase/auth"; // <-- ADDED: Need this for authentication checks

// Your web app's Firebase configuration (This section is CORRECT)
const firebaseConfig = {
  apiKey: "AIzaSyDXdcsITSqdAzPSPG0NKOzrnbL-RMmrbns",
  authDomain: "makingverse-1df28.firebaseapp.com",
  projectId: "makingverse-1df28",
  storageBucket: "makingverse-1df28.firebasestorage.app",
  messagingSenderId: "332155817780",
  appId: "1:332155817780:web:f4130b2577dccc768a5f61",
  measurementId: "G-Q0NBH4MCLJ" // This can be left or removed, it's optional
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize and EXPORT the services that the rest of the application needs
export const db = getFirestore(app); // <-- CRITICAL: Exports the database instance
export const auth = getAuth(app); // <-- CRITICAL: Exports the auth instance
export const rtdb = getDatabase(app); // Realtime Database instance for push/ref

// Note: You can remove 'import { getAnalytics } from "firebase/analytics";' 
// and the line 'const analytics = getAnalytics(app);' if you don't use them, 
// but leaving them won't hurt.