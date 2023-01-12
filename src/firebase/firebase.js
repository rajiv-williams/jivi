// Import the functions you need from the SDKs you need
import { initializeApp} from "firebase/app";

// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBHE2hqQECoJjMCrpvCU2fmbJ6CariKFAc",
  authDomain: "rajiv-beats.firebaseapp.com",
  projectId: "rajiv-beats",
  storageBucket: "rajiv-beats.appspot.com",
  messagingSenderId: "908700489205",
  appId: "1:908700489205:web:f506124cda09940d4b7cbc",
  measurementId: "G-EGEMEBM5MS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

import {getStorage} from "firebase/storage"
const storage = getStorage(app);

export {storage,firebaseConfig}