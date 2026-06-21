import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAHS-gJik9FP98jpPoMFKE-0vYLbQuSKCs",
  authDomain: "tetris-app-21e10.firebaseapp.com",
  projectId: "tetris-app-21e10",
  storageBucket: "tetris-app-21e10.firebasestorage.app",
  messagingSenderId: "292093215885",
  appId: "1:292093215885:web:05644db386307196900ec4"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
