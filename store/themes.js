import { getThemes } from '~/services/themesServices'

export const state = () => ({
    themes: []
});

export const getters = {
    themes: state => {
        return state.themes;
    }
};

export const mutations = {
    setThemes(state, payload) {
        state.themes = payload;
    }
};

export const actions = {
    getThemes({ commit, dispatch }) {
        const callback = themes => {
            commit("setThemes", themes);
        };
        getThemes(callback, this);
    }
};
