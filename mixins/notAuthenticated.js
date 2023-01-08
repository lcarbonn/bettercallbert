import { getAuth, onAuthStateChanged } from "firebase/auth";

export const route = () => ({
    nextRoute: null
});

export const getNextPath = () => {
    return route.nextRoute ? route.nextRoute.path : "/"
};

export default {
    mounted() {
        // Redirect to login if user not connected trying to access authenticated pages
        const auth = getAuth();
        onAuthStateChanged(auth, (user) => {
            if (user) {
                // User is signed in, see docs for a list of available properties
                // https://firebase.google.com/docs/reference/js/firebase.User
                this.$store.dispatch('auth/setActiveUser', user)
            } else {
                // nothing
            }
        });
    }
};
