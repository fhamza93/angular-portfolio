// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDrsAC2M1WZPkw-JAuBTR2KTvuAOYtMucA",
  authDomain: "angularexercise-ad7e1.firebaseapp.com",
  databaseURL: "https://angularexercise-ad7e1-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "angularexercise-ad7e1",
  storageBucket: "angularexercise-ad7e1.appspot.com",
  messagingSenderId: "370370798361",
  appId: "1:370370798361:web:2d08e8e2bccd73f1679b88",
  measurementId: "G-4W80G0TKME"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);