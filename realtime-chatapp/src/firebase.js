import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBqvYWw_4AUsWPvOecoGQUmwMI_an_KE38",
  authDomain: "gsvelte-chat.firebaseapp.com",
  projectId: "gsvelte-chat",
  storageBucket: "gsvelte-chat.appspot.com",
  messagingSenderId: "871660842377",
  appId: "1:871660842377:web:81cb1947ae94c98cc4c558",
  measurementId: "G-82HTMQ4999",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
