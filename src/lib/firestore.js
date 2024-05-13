// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC2RKL34AQujqHyywBIUVId9a4o_wg8udA",
  authDomain: "quraja-c57ee.firebaseapp.com",
  projectId: "quraja-c57ee",
  storageBucket: "quraja-c57ee.appspot.com",
  messagingSenderId: "773398235129",
  appId: "1:773398235129:web:b48b3a21143b1b30411f28",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
