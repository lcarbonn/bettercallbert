import { getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";


export const state = () => ({
    authUser: {
        uid: null,
        email: null,
    }
});

export const getters = {
    isConnected: state => {
        console.debug("isConnected=" + (!!state.authUser?.uid))
        return !!state.authUser?.uid
    }
};

export const mutations = {
    setUser(state, payload) {
        Object.assign(state.authUser, payload.user)
    }
};

export const actions = {
    setActiveUser({ commit }, payload) {
        commit('setUser', { user: { uid: payload.uid, email: payload.email } })
    },
    signInWithEmailAndPassword({ commit }, payload) {
        const auth = getAuth();
        signInWithEmailAndPassword(auth, payload.email, payload.password)
            .then((userCredential) => {
                commit('setUser', { user: { uid: userCredential.user.uid, email: userCredential.user.email } })
            })
            .catch(e => {
                console.log("e:" + e)
            });
    },
    signOut({ commit }) {
        const auth = getAuth();
        signOut(auth)
            .then(() => {
                commit('setUser', { user: null })
            })
            .catch(e => {
                console.log("e:" + e)
            });
    }
};
