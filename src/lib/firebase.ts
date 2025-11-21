import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCFPhgPtE-r0TAfJ2HfREFN_2NNMc2jMGg",
  authDomain: "portfolio-chat-912a0.firebaseapp.com",
  projectId: "portfolio-chat-912a0",
  storageBucket: "portfolio-chat-912a0.firebasestorage.app",
  messagingSenderId: "724060012732",
  appId: "1:724060012732:web:ca74af9057912eeadb10b9",
  measurementId: "G-KY7D1CHNKX"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);