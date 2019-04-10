// Import Firebase
import firebase from "firebase";
import "firebase/firestore";

// Initialize Firebase
var firebaseConfig = {
    apiKey: "AIzaSyC7stjdwwDpBBBa_YX51teGYwQcfQ2oA_I",
    authDomain: "bettercallbert.firebaseapp.com",
    databaseURL: "https://bettercallbert.firebaseio.com",
    projectId: "bettercallbert",
    storageBucket: "bettercallbert.appspot.com",
    messagingSenderId: "110642051311"
};
!firebase.apps.length ? firebase.initializeApp(firebaseConfig) : '';

export const DB = firebase.firestore();
