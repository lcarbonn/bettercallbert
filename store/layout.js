export const state = () => ({
    isSingleCard: false
});

export const getters = {
    isSingleCard: state => {
        return state.isSingleCard;
    }
};

export const mutations = {
    setSingleCard(state, payload) {
        state.isSingleCard = payload
    }
};

export const actions = {
    setSingleCard({ commit }, isSingleCard) {
        commit("setSingleCard", isSingleCard);
    }
};



