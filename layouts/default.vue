<template>
    <md-app md-waterfall
            md-mode="fixed">
        <md-app-toolbar class="md-small md-dense md-primary">
            <div v-if="!searchVisible">
                <Toolbar :menus="themes"
                         @filterCards="filterCards"
                         @setMenuVisible="setMenuVisible"
                         @setSearchVisible="setSearchVisible" />
            </div>
            <div v-if="searchVisible">
                <Searchbar @search="search"
                           @setSearchVisible="setSearchVisible" />
            </div>
        </md-app-toolbar>
        <md-app-drawer :md-active.sync="menuVisible">
            <Drawer @setMenuVisible="setMenuVisible" />
        </md-app-drawer>
        <md-app-content @click="hideSearchVisible">
            <nuxt />
        </md-app-content>
    </md-app>
</template>

<script>
import Toolbar from '~/components/base/Toolbar'
import Searchbar from '~/components/base/Searchbar'
import Drawer from '~/components/base/Drawer'

export default {
    name: 'Overlap',
    components: {
        Toolbar,
        Searchbar,
        Drawer,
    },
    data() {
        return {
            menuVisible: false,
            searchVisible: false,
        }
    },
    computed: {
        themes() {
            return this.$store.getters['themes/themes']
        }
    },
    methods: {
        setMenuVisible() {
            this.menuVisible = !this.menuVisible;
        },
        setSearchVisible() {
            this.searchVisible = !this.searchVisible;
        },
        hideSearchVisible() {
            this.searchVisible = false;
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
