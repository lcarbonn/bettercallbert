import { getCards, getCard, getNextId, getPreviousId } from '~/services/cardsServices'
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
    }
};



