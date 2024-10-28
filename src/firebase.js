// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC_zWmT1mYh6nDjmlIUVLpLitOXi43zqQs",
  authDomain: "boiss-kiass.firebaseapp.com",
  projectId: "boiss-kiass",
  storageBucket: "boiss-kiass.appspot.com",
  messagingSenderId: "997168966294",
  appId: "1:997168966294:web:cf36a30c60816c436df0b7"
};

// Initialize Firebase
initializeApp(firebaseConfig);
export const db = getFirestore();