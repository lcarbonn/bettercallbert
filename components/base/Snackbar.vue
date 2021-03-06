<template>
    <md-snackbar :md-active.sync="isASnackbarMessage"
                 md-position="center"
                 :md-duration="4000">
        <span>{{snackbarMessage}}</span>
    </md-snackbar>
</template>

<script>
export default {
    name: 'Snackbar',

    computed: {
        snackbarMessage() {
            return this.$store.getters['snackbar/snackbarMessage']
        },
        isASnackbarMessage: {
            get() {
                return this.$store.getters['snackbar/snackbarMessage'] != null
            },

            set(fullName) {
                this.$store.dispatch("snackbar/setSnackbarMessage", { message: null }, { root: true });
            }
        }
    }
}
</script>
