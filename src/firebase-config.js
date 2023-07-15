import { initializeApp } from "firebase/app";

import { getAnalytics } from "firebase/analytics";
import {getAuth} from 'firebase/auth'

// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration

// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {

  apiKey: "AIzaSyCjcUuWjfJyUncn4eO5YqCjmtNgETt3y5A",

  authDomain: "tender-management-581da.firebaseapp.com",

  projectId: "tender-management-581da",

  storageBucket: "tender-management-581da.appspot.com",

  messagingSenderId: "450469669955",

  appId: "1:450469669955:web:b59078359d93ce196038f6",

  measurementId: "G-1KSW3TWLDQ"

};


// Initialize Firebase

 const app = initializeApp(firebaseConfig);
export const auth=getAuth(app)

const analytics = getAnalytics(app);