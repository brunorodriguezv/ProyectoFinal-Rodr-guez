import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';


const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY_FIREBASE_CONFIG,
  authDomain: "istore-b13bc.firebaseapp.com",
  projectId: "istore-b13bc",
  storageBucket: "istore-b13bc.appspot.com",
  messagingSenderId: "385997200349",
  appId: "1:385997200349:web:8a9dc95f474e2bcc96b434"
};


const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
