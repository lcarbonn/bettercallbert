import { uploadImageFile } from '~/services/storageServices'

export const state = () => ({
    imagePath: null,
    imageUrl: null
});

export const getters = {
    imagePath: state => {
        return state.imagePath;
    },
    imageUrl: state => {
        return state.imageUrl;
    }
};

export const mutations = {
    setImagePath(state, payload) {
        state.imagePath = payload.imagePath
        state.imageUrl = payload.imageUrl
    },
    resetImagePath(state) {
        state.imagePath = null
        state.imageUrl = null
    }
};

export const actions = {
    uploadImageFile({ commit, dispatch }, imageFile) {
        dispatch("snackbar/setSnackbarMessage", { message: "Uploading image" }, { root: true });
        try {
            console.debug("uploading image");
            const callback = paths => {
                commit("setImagePath", paths);
                dispatch("snackbar/setSnackbarMessage", { message: "Image uploaded" }, { root: true });
            }
            uploadImageFile(callback, imageFile);
        } catch (error) {
            console.log(error)
            dispatch("snackbar/setSnackbarMessage", { message: "Error occured while uploading image" }, { root: true });
        }
    },
    resetImagePath({ commit }) {
        commit("resetImagePath");
    }
};



