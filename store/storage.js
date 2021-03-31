import { uploadImageFile } from '~/services/storageServices'

export const state = () => ({
    imageUrl: false
});

export const getters = {
    imageUrl: state => {
        return state.imageUrl;
    }
};

export const mutations = {
    setImageUrl(state, payload) {
        state.imageUrl = payload
    }
};

export const actions = {
    async uploadImageFile({ commit, dispatch }, imageFile) {
        dispatch("snackbar/setIsLoading", { isLoading: true }, { root: true });
        dispatch("snackbar/setSnackbarMessage", { message: "" }, { root: true });
        try {
            console.log("uploading image");
            const imageUrl = await uploadImageFile(imageFile);
            commit("setImageUrl", imageUrl);
            dispatch("snackbar/setSnackbarMessage", { message: "Image uploaded" }, { root: true });
            dispatch("snackbar/setIsLoading", { isLoading: false }, { root: true });
        } catch (error) {
            console.log(error)
            dispatch("snackbar/setSnackbarMessage", { message: "Error occured while uploading image" }, { root: true });
            dispatch("snackbar/setIsLoading", { isLoading: false }, { root: true });
        }
    }

};



