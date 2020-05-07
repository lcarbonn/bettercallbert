import { getThemes } from '~/services/themesServices'

export const state = () => ({
    themes: [],
    snackbarMessage: undefined,
    isLoading: false
});

export const getters = {
    themes: state => {
        return state.themes;
    }
};


export const mutations = {
    setThemes(state, payload) {
        state.themes = payload;
    },
    setSnackbarMessage(state, payload) {
        state.snackbarMessage = payload.message
    },
    setIsLoading(state, payload) {
        state.isLoading = payload.isLoading
    }
};

export const actions = {
    getThemes({ commit, dispatch }) {
        dispatch("application/setIsLoading", { isLoading: true }, { root: true });
        const callback = themes => {
            commit("setThemes", themes);
            dispatch("application/setIsLoading", { isLoading: false }, { root: true });
        };
        getThemes(callback, this);
    },
};
