import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBRkSshaRDV7ZMAztQwDiuBqiV1yG-GHGI",
  authDomain: "hackprinceton-83b00.firebaseapp.com",
  projectId: "hackprinceton-83b00",
  storageBucket: "hackprinceton-83b00.appspot.com",
  messagingSenderId: "695380126377",
  appId: "1:695380126377:web:cbdb9cc60eddaded1b97b8",
  measurementId: "G-7LKD426H4M"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { app, db, auth };