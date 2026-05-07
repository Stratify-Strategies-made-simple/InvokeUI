import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Firebase configuration is loaded from Vite environment variables (VITE_*).
// Create a top-level `.env.local` (not checked into git) and add your real values.
const firebaseConfig = {
  apiKey: "AIzaSyBBPq3xOv9Btqqgr9lrNiE5mPEOWH0RGfE",
  authDomain: "tst-invokethoughts.firebaseapp.com",
  projectId: "tst-invokethoughts",
  storageBucket: "tst-invokethoughts.firebasestorage.app",
  messagingSenderId: "727784492978",
  appId: "1:727784492978:web:82a0c548f722cda1ec1eab",
  measurementId: "G-LM6HCX1KC1"
};

if (!firebaseConfig.apiKey) {
  console.warn(
    "Missing Firebase environment variables. Copy `.env.example` to `.env.local` and fill in the VITE_FIREBASE_* values."
  );
}

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
