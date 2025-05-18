import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDkFFIbPdDasb4IYSBy9W2nVKOfewi5dLE",
  authDomain: "myportfolio-38a90.firebaseapp.com",
  projectId: "myportfolio-38a90",
  storageBucket: "myportfolio-38a90.firebasestorage.app",
  messagingSenderId: "1094111748375",
  appId: "1:1094111748375:web:6a15459e7cfbb10f139752",
  measurementId: "G-HMBJP2E051"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);