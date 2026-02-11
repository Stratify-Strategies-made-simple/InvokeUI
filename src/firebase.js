import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyALF2rpo0DGHkqSoxtkjcpoEsocAhCnTqM",
  authDomain: "invoke-v2.firebaseapp.com",
  projectId: "invoke-v2",
  storageBucket: "invoke-v2.firebasestorage.app",
  messagingSenderId: "591482857725",
  appId: "1:591482857725:web:c792b5d766a69d93b0b694",
  measurementId: "G-ZDD1L2901D"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);