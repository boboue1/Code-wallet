// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCdnLw7lPzgbTy9tcAXSqolovDD9U6a2SI",
  authDomain: "code-wallet-f3f1d.firebaseapp.com",
  projectId: "code-wallet-f3f1d",
  storageBucket: "code-wallet-f3f1d.firebasestorage.app",
  messagingSenderId: "158183849902",
  appId: "1:158183849902:web:0f306f7057fafc9c3fd23f",
  measurementId: "G-X2F1YSF7TZ"
};


const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;
