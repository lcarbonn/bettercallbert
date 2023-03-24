// Import Firebase
import { initializeApp } from "firebase/app"
import { getAnalytics } from "firebase/analytics"
import { getFirestore } from "firebase/firestore"
import { getStorage } from "firebase/storage"
import { getAuth, onAuthStateChanged } from "firebase/auth"
import { firebaseConfig } from "./firebaseConfig.js";

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const analytics = getAnalytics(firebaseApp);

export const db = getFirestore();
export const storage = getStorage(firebaseApp);

export default ctx => {
    const { store } = ctx;

    return new Promise((resolve, reject) => {
        const auth = getAuth();
        onAuthStateChanged(auth, (user) => {
            console.debug("onAuthStateChanged user : " + user)
            if (user) {
                console.debug("user anonymous=" + user.isAnonymous)
                console.debug("user email=" + user.email)
                // User is signed in
                store.dispatch('auth/setActiveUser', user)
                    .then(() => {
                        resolve()
                    })
            } else {
                // if no user, login anonymously
                console.debug("signInAnonymously")
                store.dispatch("auth/signInAnonymously")
                    .then(() => {
                        resolve()
                    }
                    )
            }
        });
    });
}
