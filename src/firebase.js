// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore"
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD7JTlgJF8p6e5QIK-UEhElzi1K9QGRkJg",
  authDomain: "flick-estate.firebaseapp.com",
  projectId: "flick-estate",
  storageBucket: "flick-estate.appspot.com",
  messagingSenderId: "400244455550",
  appId: "1:400244455550:web:25ae1b1711ec8bd3d8002f",
  measurementId: "G-8V870M37W4",
};

// Initialize Firebase
 initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export const  db =  getFirestore();
