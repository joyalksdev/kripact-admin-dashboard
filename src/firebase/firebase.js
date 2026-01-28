import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDuophYZHa8xyUQdqAhL_GMDVYEVvc9jJc",
  authDomain: "kripa-dashboard.firebaseapp.com",
  projectId: "kripa-dashboard",
  storageBucket: "kripa-dashboard.firebasestorage.app",
  messagingSenderId: "165500116577",
  appId: "1:165500116577:web:a43223df689ca3151b9420"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
