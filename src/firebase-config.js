// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAk8myjepIx4AYYq2jph8QpipyAeFZNyFM",
  authDomain: "real-jammers-f0160.firebaseapp.com",
  projectId: "real-jammers-f0160",
  storageBucket: "real-jammers-f0160.appspot.com",
  messagingSenderId: "373780485603",
  appId: "1:373780485603:web:eea8650669f196ca6d3cd6"
};

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(firebaseApp);

// Initialize Cloud Firestore and get a reference to the service
export const authDb = getFirestore(firebaseApp);