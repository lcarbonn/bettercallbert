import { getCards, getCard, getNextId, getPreviousId, saveCard, createCard, deleteCard } from '~/services/cardsServices'
import { getImageSrc } from '~/services/storageServices'

export const state = () => ({
    cards: [],
    fullCards: [],
    card: null,
    nextId: null,
    previousId: null,
    img: null
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
    img: state => {
        return state.img
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
        state.nextId = null
        state.previousId = null
        state.img = null
    },
    setCardImg(state, payload) {
        let i = state.cards.indexOf(payload.card)
        if (i != -1) {
            state.cards[i].img = payload.newSrc
        }
    },
    setNextId(state, payload) {
        state.nextId = payload
    },
    setPreviousId(state, payload) {
        state.previousId = payload
    },
    setImg(state, payload) {
        state.img = payload
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
                if (card.src.indexOf("http") == -1) {
                    dispatch("getCardImg", card)
                }
            })
        }
        getCards(callback);
    },
    getCardImg({ commit, state }, card) {
        const callback = newSrc => {
            let payload = {
                card: card,
                newSrc: newSrc
            }
            commit("setCardImg", payload)
        }
        getImageSrc(callback, card.src);
    },
    filterCards({ commit, state }, idTheme) {
        let cards = [];
        if (idTheme == null) {
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
                commit("setImg", newSrc)
            }
            getImageSrc(callback, src);
        } else {
            commit("setImg", src)
        }
    },
    setCard({ commit }, card) {
        commit("setCard", card);
    },
    async saveCard({ commit, dispatch }, card) {
        dispatch("snackbar/setIsLoading", { isLoading: true }, { root: true });
        dispatch("snackbar/setSnackbarMessage", { message: null }, { root: true });
        try {
            await saveCard(card);
            dispatch("snackbar/setSnackbarMessage", { message: "Card saved" }, { root: true });
            dispatch("snackbar/setIsLoading", { isLoading: false }, { root: true });
        } catch (error) {
            console.log(error)
            dispatch("snackbar/setSnackbarMessage", { message: "Error occured while saving card" }, { root: true });
            dispatch("snackbar/setIsLoading", { isLoading: false }, { root: true });
        }
    },
    async deleteCard({ commit, dispatch }, id) {
        dispatch("snackbar/setIsLoading", { isLoading: true }, { root: true });
        dispatch("snackbar/setSnackbarMessage", { message: null }, { root: true });
        try {
            await deleteCard(id);
            dispatch("snackbar/setSnackbarMessage", { message: "Card deleted" }, { root: true });
            dispatch("snackbar/setIsLoading", { isLoading: false }, { root: true });
        } catch (error) {
            console.log(error)
            dispatch("snackbar/setSnackbarMessage", { message: "Error occured while deleting card" }, { root: true });
            dispatch("snackbar/setIsLoading", { isLoading: false }, { root: true });
        }
    },
    async createCard({ commit, dispatch }) {
        dispatch("snackbar/setIsLoading", { isLoading: true }, { root: true });
        dispatch("snackbar/setSnackbarMessage", { message: "" }, { root: true });
        try {
            console.log("creating card");
            const card = await createCard(this);
            commit("setCard", card);
            dispatch("snackbar/setSnackbarMessage", { message: "Card created" }, { root: true });
            dispatch("snackbar/setIsLoading", { isLoading: false }, { root: true });
        } catch (error) {
            console.log(error)
            dispatch("snackbar/setSnackbarMessage", { message: "Error occured while creating card" }, { root: true });
            dispatch("snackbar/setIsLoading", { isLoading: false }, { root: true });
        }
    }
};
