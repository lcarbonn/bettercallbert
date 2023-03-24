export const route = () => ({
    path: null
});

export const setPath = (path) => {
    if (path.indexOf("/login") == -1) route.path = path
}

export const setNextPath = (newPath) => {
    route.nextRoute = newPath
};

export const getNextPath = () => {
    let path = route.path ? route.path : "/"
    return path
};

export default {
    beforeCreate() {
        // get current path for after login
        const path = this.$router.currentRoute.path
        setPath(path)
        if (!this.$store.getters['auth/isConnected']) {
            this.$router.push('/login');
        }
        // User is anonymous and want go to admin, redirect to login
        if (this.$store.getters['auth/isAnonymous'] && path.indexOf('/admin') != -1) {
            console.debug("go to login")
            route.nextRoute = this.$router.currentRoute;
            this.$router.push('/login')
        }

    }
};
