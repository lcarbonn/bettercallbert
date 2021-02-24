export default {
    beforeCreate() {
        // Redirect to homepage if user connected trying to access not authenticated pages
        if (this.$store.getters['auth/isConnected']) {
            return this.$router.push('/');
        }
    }
};
