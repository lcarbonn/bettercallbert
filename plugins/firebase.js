// Import Firebase
import firebase from "firebase/app";
import 'firebase/auth';
import 'firebase/database';
import 'firebase/firestore';
import 'firebase/storage';

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

export const GoogleProvider = new firebase.auth.GoogleAuthProvider();
export const auth = firebase.auth();
export const firestore = firebase.firestore();
export const storage = firebase.storage();

export default ctx => {
    const { store } = ctx;

    return new Promise((resolve, reject) => {
        auth.onAuthStateChanged(user => {
            if (user) {
                store.dispatch('auth/setActiveUser', user).then(() => {
                    resolve();
                });
            } else {
                resolve();
            }
        });
    });
};
