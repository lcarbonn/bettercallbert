export const route = () => ({
    nextRoute: null
});
export default {
    mounted() {
        // Redirect to login if user not connected trying to access authenticated pages
        if (!this.$store.getters['auth/isConnected']) {
            route.nextRoute = this.$router.currentRoute;
            return this.$router.push('/login');
        }
    }
};
