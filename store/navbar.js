export const state = () => ({
    isSinglePage: false
});

export const getters = {
    isSinglePage: state => {
        return state.isSinglePage;
    }
};

export const mutations = {
    setSinglePage(state, payload) {
        state.isSinglePage = payload;
    }
};
