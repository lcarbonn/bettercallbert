import { auth } from '~/plugins/firebase.js';

export const state = () => ({
    authUser: {
        uid: null,
        email: null,
    },
    loading: true
});

export const getters = {
    isConnected: state => {
        return !!state.authUser?.uid
    }
};

export const mutations = {
    setUser(state, payload) {
        Object.assign(state.authUser, payload.user);
        console.log('user assigned:' + payload.user);
        state.loading = false;
    }
};

export const actions = {
    setActiveUser({ commit }, payload) {
        return new Promise((resolve, reject) => {
            commit('setUser', { user: { uid: payload.uid, email: payload.email } });
            resolve();
        });
    },
    signInWithEmailAndPassword({ commit }, payload) {
        return new Promise((resolve, reject) => {
            console.log("auth:" + auth);
            auth.signInWithEmailAndPassword(payload.email, payload.password)
                .then(res => {
                    console.log('user assigned:' + res.user.uid);
                    commit('setUser', { user: { uid: res.user.uid, email: res.user.email } });
                    resolve();
                })
                .catch(e => {
                    console.log("e:" + e);
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
