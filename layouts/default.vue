<template>
    <div class="page-container">
        <md-app>
            <md-app-toolbar class="md-large md-primary">
                <Titlebar :isAll=true
                          @setVisible="setVisible" />
                <Toolbar :menus="themes"
                         @filterCards="filterCards"
                         @search="search" />
            </md-app-toolbar>
            <md-app-content>
                <nuxt />
                <AppFooter v-bind:isAll="true" />
            </md-app-content>
        </md-app>
    </div>
</template>

<script>
import Titlebar from '~/components/base/Titlebar'
import Toolbar from '~/components/base/Toolbar'
import AppFooter from '~/components/base/AppFooter'

export default {
    name: 'Overlap',
    components: {
        // Loader,
        // Snackbar,
        Titlebar,
        Toolbar,
        AppFooter
        // Drawer,
    },
    data() {
        return {
            menuVisible: false
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

<style>
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
/* .md-app {
    border: 1px solid rgba(#000, 0.12);
} */

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
