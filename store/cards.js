import { getCards, getCard, getNextId, getPreviousId, saveCard, createCard } from '~/services/cardsServices'
import { getImageSrc } from '~/services/storageServices'

export const state = () => ({
    cards: [],
    fullCards: [],
    card: null,
    nextId: null,
    previousId: null,
    src: null
});

export const getters = {
    cards: state => {
        return state.cards;
    },
    fullCards: state => {
        return state.fullCards
    },
    card: state => {
        return state.card
    },
    nextId: state => {
        return state.nextId
    },
    previousId: state => {
        return state.previousId
    },
    src: state => {
        return state.src
    }
};

export const mutations = {
    setCards(state, payload) {
        state.cards = payload
    },
    setFullCards(state, payload) {
        state.fullCards = payload
    },
    setCard(state, payload) {
        state.card = payload
        state.src = null
        state.nextId = null
        state.previousId = null
    },
    setEachSrc(state, payload) {
        state.cards.forEach(card => {
            if (card.id == payload.id) {
                card.src = payload.src
            }
        });
    },
    setNextId(state, payload) {
        state.nextId = payload
    },
    setPreviousId(state, payload) {
        state.previousId = payload
    },
    setSrc(state, payload) {
        state.src = payload
    },
    setTitle(state, payload) {
        state.card.title = payload
    }
};

export const actions = {
    getCards({ commit, dispatch }) {
        const callback = cards => {
            commit("setCards", cards);
            commit("setFullCards", cards);
            cards.forEach((card) => {
                dispatch("getEachSrc", card)
            })
        }
        getCards(callback);
    },
    getEachSrc({ commit, state }, card) {
        if (card.src.indexOf("http") == -1) {
            const callback = newSrc => {
                let payload = {
                    id: card.id,
                    src: newSrc
                }
                commit("setEachSrc", payload)
            }
            getImageSrc(callback, card.src);
        } else {
            let payload = {
                id: card.id,
                src: card.src
            }
            commit("setEachSrc", payload)
        }
    },
    filterCards({ commit, state }, idTheme) {
        this.textsearch = '';
        let cards = [];
        if (idTheme == '') {
            cards = state.fullCards
        } else {
            state.fullCards.forEach((card) => {
                if (card.idTheme == idTheme) {
                    cards.push(card);
                }
            })
        }
        commit("setCards", cards);
    },
    search({ commit, state }, textsearch) {
        let cards = [];
        if (textsearch.trim() == '') {
            textsearch = textsearch.trim();
            cards = state.fullCards
        } else {

            state.fullCards.forEach((card) => {
                if (card.title.toLowerCase().includes(textsearch.toLowerCase())) {
                    cards.push(card);
                }
            })
        }
        commit("setCards", cards);
    },
    getCard({ commit, dispatch }, id) {
        const callback = card => {
            if (card) {
                commit("setCard", card);
                dispatch("getNextId", card.id)
                dispatch("getPreviousId", card.id)
                dispatch("getImageSrc", card.src)
            }
        }
        getCard(callback, id);
    },
    getNextId({ commit }, id) {
        const callback = nextId => {
            commit("setNextId", nextId)
        }
        getNextId(callback, id);
    },
    getPreviousId({ commit }, id) {
        const callback = previousId => {
            commit("setPreviousId", previousId)
        }
        getPreviousId(callback, id);
    },
    getImageSrc({ commit }, src) {
        if (src && src.indexOf("http") == -1) {
            const callback = newSrc => {
                commit("setSrc", newSrc)
            }
            getImageSrc(callback, src);
        } else {
            commit("setSrc", src)
        }
    },
    setCard({ commit }, card) {
        commit("setCard", card);
    },
    setSrc({ commit }, src) {
        commit("setSrc", src);
    },
    getCurrentCard({ commit }) {
        return state.card;
    },
    saveCard({ commit, dispatch }, card) {
        dispatch("snackbar/setIsLoading", { isLoading: true }, { root: true });
        dispatch("snackbar/setSnackbarMessage", { message: null }, { root: true });
        try {
            saveCard(card);
            dispatch("snackbar/setSnackbarMessage", { message: "Card saved" }, { root: true });
            dispatch("snackbar/setIsLoading", { isLoading: false }, { root: true });
        } catch (error) {
            dispatch("snackbar/setSnackbarMessage", { message: "Error occured while saving card" }, { root: true });
            dispatch("snackbar/setIsLoading", { isLoading: false }, { root: true });
        }
    },
    async createCard({ commit, dispatch }) {
        dispatch("snackbar/setIsLoading", { isLoading: true }, { root: true });
        dispatch("snackbar/setSnackbarMessage", { message: "Creating card" }, { root: true });
        try {
            console.log("creating card");
            const card = await createCard(this);
            commit("setCard", card);
            dispatch("snackbar/setSnackbarMessage", { message: "Card created" }, { root: true });
            dispatch("snackbar/setIsLoading", { isLoading: false }, { root: true });
        } catch (error) {
            dispatch("snackbar/setSnackbarMessage", { message: "Error occured while creating card" }, { root: true });
            dispatch("snackbar/setIsLoading", { isLoading: false }, { root: true });
        }
    },

};
