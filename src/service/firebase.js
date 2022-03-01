import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";


// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCJyeUscgWXE9jes6L7HSmS38OqvKJDGVQ",
    authDomain: "hometask-app.firebaseapp.com",
    projectId: "hometask-app",
    storageBucket: "hometask-app.appspot.com",
    messagingSenderId: "528919654485",
    appId: "1:528919654485:web:9afe8d5d179471754da4dc"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);