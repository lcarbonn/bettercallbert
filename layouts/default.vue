<template>
    <md-app md-waterfall
            md-mode="fixed">
        <md-app-toolbar class="md-small md-dense md-primary">
            <Toolbar :menus="themes"
                     @filterCards="filterCards"
                     @search="search"
                     @setVisible="setVisible" />
        </md-app-toolbar>
        <md-app-drawer :md-active.sync="menuVisible">
            <Drawer @setVisible="setVisible" />
        </md-app-drawer>
        <md-app-content class="md-gutter">
            <nuxt />
        </md-app-content>
    </md-app>
</template>

<script>
import Toolbar from '~/components/base/Toolbar'
import Drawer from '~/components/base/Drawer'

export default {
    name: 'Overlap',
    components: {
        // Loader,
        // Snackbar,
        Toolbar,
        Drawer,
    },
    data() {
        return {
            menuVisible: false,
        }
    },
    computed: {
        themes() {
            return this.$store.getters['themes/themes']
        }
    },
    methods: {
        setVisible() {
            this.menuVisible = !this.menuVisible;
        },
        filterCards(idTheme) {
            this.$store.dispatch("cards/filterCards", idTheme);
        },
        search(textsearch) {
            this.$store.dispatch("cards/search", textsearch);
        }
    }
}
</script>

<style lang="scss" scoped>
div#__nuxt,
#__layout,
#__layout > div,
#app {
    min-height: 100vh;
}
html {
    font-family: "Source Sans Pro", -apple-system, BlinkMacSystemFont,
        "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
    font-size: 16px;
    word-spacing: 1px;
    -ms-text-size-adjust: 100%;
    -webkit-text-size-adjust: 100%;
    -moz-osx-font-smoothing: grayscale;
    -webkit-font-smoothing: antialiased;
    box-sizing: border-box;
}

.md-app {
    max-height: 400px;
    border: 1px solid rgba(#000, 0.12);
}

.md-drawer {
    width: 230px;
    max-width: calc(100vw - 130px);
}

*,
*:before,
*:after {
    box-sizing: border-box;
    margin: 0;
}

.md-toolbar + .md-toolbar {
    margin-top: 16px;
}

.n-link {
    text-decoration: none !important;
}
</style>
