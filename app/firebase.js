// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyASabreozbfkcAoPLV1IrnwvSVB602hzr0",
  authDomain: "pantry-tracker-890b1.firebaseapp.com",
  projectId: "pantry-tracker-890b1",
  storageBucket: "pantry-tracker-890b1.appspot.com",
  messagingSenderId: "400430808806",
  appId: "1:400430808806:web:174471125c5166b64d0527",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
