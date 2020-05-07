import { getCards } from '~/services/cardsServices'
import { getThemes } from '~/services/themesServices'

export const state = () => ({
    cards: [],
    fullCards: [],
    snackbarMessage: undefined,
    isLoading: false
});

export const getters = {
    cards: state => {
        return state.cards;
    },
    fullCards: state => {
        return state.fullCards
    }
};

export const mutations = {
    setCards(state, payload) {
        state.cards = payload;
    },
    setFullCards(state, payload) {
        state.fullCards = payload;
    },
    setSnackbarMessage(state, payload) {
        state.snackbarMessage = payload.message
    },
    setIsLoading(state, payload) {
        state.isLoading = payload.isLoading
    }
};

export const associateColors = (cards, themes) => {
    cards.forEach((card) => {
        // console.debug(`associate card:${card.id} => idTheme: ${card.idTheme}`);
        if (card.idTheme != null) {
            let theme = themes.find(theme => theme.id == card.idTheme)
            // console.debug(`associate card:${card.id} => color: ${theme.color}`);
            if (theme.color != null) card.color = theme.color;
        }
    })
};

export const actions = {
    getCards({ commit, dispatch }) {
        dispatch("application/setIsLoading", { isLoading: true }, { root: true });
        const callback = cards => {
            const callbacktheme = themes => {
                associateColors(cards, themes)
                commit("setCards", cards);
                commit("setFullCards", cards);
                dispatch("application/setIsLoading", { isLoading: false }, { root: true });
            }
            getThemes(callbacktheme)
        };
        getCards(callback);
    },
    filterTheme({ commit, dispatch, state }, idTheme) {
        dispatch("application/setIsLoading", { isLoading: true }, { root: true });
        // console.debug("filterTheme:" + idTheme);
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
        dispatch("application/setIsLoading", { isLoading: false }, { root: true });
    },
    search({ commit, dispatch, state }, textsearch) {
        dispatch("application/setIsLoading", { isLoading: true }, { root: true });
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
        dispatch("application/setIsLoading", { isLoading: false }, { root: true });
    }
};



