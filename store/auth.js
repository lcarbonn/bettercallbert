import { getAuth, signInWithEmailAndPassword, signInAnonymously, signOut } from "firebase/auth";


export const state = () => ({
    authUser: {
        uid: null,
        email: null,
        isAnonymous: true
    }
});

export const getters = {
    isAnonymous: state => {
        console.debug("isAnonymous=" + (state.authUser?.isAnonymous))
        return state.authUser?.isAnonymous
    }
};

export const mutations = {
    setUser(state, payload) {
        Object.assign(state.authUser, payload.user)
    }
};

export const actions = {
    signInAnonymously({ commit }) {
        const auth = getAuth();
        console.debug("auth signInAnonymously")
        signInAnonymously(auth)
            .then((userCredential) => {
                // Signed in..
                const user = userCredential.user;
                commit('setUser', { user: { uid: user.uid, email: user.email, isAnonymous: user.isAnonymous } });
                console.debug("auth signInAnonymously done")
            })
            .catch((e) => {
                console.log("e:" + e)
                commit('setUser', { user: null });
                dispatch("snackbar/setSnackbarMessage", { message: "Error login" }, { root: true });
            });
    },
    setActiveUser({ commit }, payload) {
        commit('setUser', { user: { uid: payload.uid, email: payload.email, isAnonymous: payload.isAnonymous } })
    },
    signInWithEmailAndPassword({ commit, dispatch }, payload) {
        return new Promise((resolve, reject) => {
            const auth = getAuth();
            signInWithEmailAndPassword(auth, payload.email, payload.password)
                .then((userCredential) => {
                    const user = userCredential.user
                    commit('setUser', { user: { uid: user.uid, email: user.email, isAnonymous: user.isAnonymous } })
                    dispatch("snackbar/setSnackbarMessage", { message: "Welcomme " + user.email }, { root: true })
                    resolve()
                })
                .catch(e => {
                    console.log("e:" + e)
                    commit('setUser', { user: null })
                    dispatch("snackbar/setSnackbarMessage", { message: "Wrong email/password" }, { root: true })
                    reject(e)
                });
        });
    },
    signOut({ commit, dispatch }) {
        const auth = getAuth();
        console.debug("auth signOut")
        dispatch("signInAnonymously").then(() => {
            console.debug("auth signOut done")
        })
    }
};
