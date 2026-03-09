import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBVdF921FKdyZMY20Lakhk2nELtqNOUyoQ",
  authDomain: "astravision-26ef7.firebaseapp.com",
  projectId: "astravision-26ef7",
  storageBucket: "astravision-26ef7.firebasestorage.app",
  messagingSenderId: "1043089483245",
  appId: "1:1043089483245:web:8cc3a69af5a5320535b3e4"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();