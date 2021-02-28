export const route = () => ({
    nextRoute: null
});

export const getNextPath = () => {
    return route.nextRoute ? route.nextRoute.path : "/"
};

export default {
    mounted() {
        // Redirect to login if user not connected trying to access authenticated pages
        if (!this.$store.getters['auth/isConnected']) {
            route.nextRoute = this.$router.currentRoute;
            return this.$router.push('/login');
        }
    }
};
