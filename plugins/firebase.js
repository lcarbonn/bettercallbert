// Import Firebase
import { initializeApp } from "firebase/app"
import { getAnalytics } from "firebase/analytics"
import { getFirestore } from "firebase/firestore"
import { getStorage } from "firebase/storage"
import { getAuth } from "firebase/auth"

// Initialize Firebase
var firebaseConfig = {
    apiKey: "AIzaSyC7stjdwwDpBBBa_YX51teGYwQcfQ2oA_I",
    authDomain: "bettercallbert.firebaseapp.com",
    databaseURL: "https://bettercallbert.firebaseio.com",
    projectId: "bettercallbert",
    storageBucket: "bettercallbert.appspot.com",
    messagingSenderId: "110642051311",
    appId: "1:110642051311:web:48c6b911e8086ff8bbc31a",
    measurementId: "G-T2R7DS2NB1"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const analytics = getAnalytics(firebaseApp);

export const db = getFirestore();
export const storage = getStorage(firebaseApp);
