import { getThemes } from '~/services/themesServices'

export const state = () => ({
    themes: [],
    currentTheme: null
});

export const getters = {
    themes: state => {
        return state.themes;
    },
    currentTheme: state => {
        return state.currentTheme;
    }
};

export const mutations = {
    setThemes(state, payload) {
        state.themes = payload;
    },
    setCurrentTheme(state, payload) {
        state.currentTheme = payload;
    },
};

export const actions = {
    getThemes({ commit, dispatch }) {
        const callback = themes => {
            commit("setThemes", themes);
        };
        getThemes(callback, this);
    },
    setCurrentTheme({ commit, dispatch }, idTheme) {
        commit("setCurrentTheme", idTheme);
    },
};
