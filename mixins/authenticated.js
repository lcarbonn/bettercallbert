export default {
    mounted() {
        // Redirect to login if user not connected trying to access authenticated pages
        if (!this.$store.getters['auth/isConnected']) {
            return this.$router.push('/login');
        }
    }
};
