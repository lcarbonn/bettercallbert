import { auth, firestore } from '~/plugins/firebase.js';

export const state = () => ({
    authUser: null,
    loading: true
});

export const getters = {
    isConnected: state => {
        return !!state.authUser?.uid
        // return state.user.id && state.user.uid && state.user.hasPermission;
    }
};

export const mutations = {
    setUser(state, payload) {
        state.user = payload.user;
        console.log('user assigned:' + payload.user);
        if (payload.user) console.log('user assigned:' + payload.user.uid);
        state.loading = false;
    }
};

export const actions = {
    setActiveUser({ commit }, payload) {
        return new Promise((resolve, reject) => {
            commit('setUser', { user: payload.user });
            resolve();
        });
    },
    signInWithEmailAndPassword({ commit }, payload) {
        return new Promise((resolve, reject) => {
            auth.signInWithEmailAndPassword(payload.email, payload.password)
                .then(res => {
                    commit('setUser', { user: res.user });
                    resolve();
                })
                .catch(e => {
                    reject(e);
                });
        });
    },
    signOut({ commit }) {
        return new Promise((resolve, reject) => {
            auth.signOut()
                .then(() => {
                    commit('setUser', { user: null });
                    resolve();
                })
                .catch(e => {
                    reject(e);
                });
        });
    }
};
