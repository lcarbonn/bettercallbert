import { uploadImageFile } from '~/services/storageServices'

export const state = () => ({
    imagePath: null
});

export const getters = {
    imagePath: state => {
        return state.imagePath;
    }
};

export const mutations = {
    setImagePath(state, payload) {
        state.imagePath = payload
    },
    resetImagePath(state) {
        state.imagePath = null
    }
};

export const actions = {
    uploadImageFile({ commit, dispatch }, imageFile) {
        dispatch("snackbar/setIsLoading", { isLoading: true }, { root: true });
        dispatch("snackbar/setSnackbarMessage", { message: "Uploading image" }, { root: true });
        try {
            console.debug("uploading image");
            const callback = imagePath => {
                console.debug("uploaded image:" + imagePath);
                commit("setImagePath", imagePath);
                dispatch("snackbar/setSnackbarMessage", { message: "Image uploaded" }, { root: true });
                dispatch("snackbar/setIsLoading", { isLoading: false }, { root: true });
            }
            uploadImageFile(callback, imageFile);
        } catch (error) {
            console.log(error)
            dispatch("snackbar/setSnackbarMessage", { message: "Error occured while uploading image" }, { root: true });
            dispatch("snackbar/setIsLoading", { isLoading: false }, { root: true });
        }
    },
    resetImagePath({ commit }) {
        commit("resetImagePath");
    }
};



