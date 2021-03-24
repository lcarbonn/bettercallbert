<template>
    <div class="md-toolbar-row">
        <div class="md-toolbar-section-start">
            <md-button class="md-icon-button"
                       @click="setMenuVisible()">
                <md-icon>menu</md-icon>
            </md-button>
            <span class="md-title"
                  @click="resetFilter()">
                <n-link to="/"
                        class="md-title n-link">Better Call Bert</n-link>
            </span>
        </div>
        <div class="md-toolbar-section-end">
            <md-button class="md-icon-button"
                       @click="setSearchVisible()"
                       v-show="!isSingleCard">
                <md-icon>search</md-icon>
                <md-tooltip md-direction="top">Search</md-tooltip>
            </md-button>
            <md-button class="md-icon-button"
                       @click="logout()"
                       v-show="isConnected">
                <md-icon>logout</md-icon>
                <md-tooltip md-direction="top">Logout</md-tooltip>
            </md-button>
            <md-button class="
                       md-icon-button"
                       @click="logout()"
                       v-show="!isConnected"
                       to="/login">
                <md-icon>login</md-icon>
                <md-tooltip md-direction="top">Login</md-tooltip>
            </md-button>
        </div>
    </div>
</template>

<script>
export default {
    name: "toolbar",

    props: {
        menus: {
            type: Array,
            default: null
        },
        isSingleCard: {
            type: Boolean,
            default: false
        }
    },
    computed: {
        isConnected() {
            return this.$store.getters['auth/isConnected'];
        }
    },
    methods: {
        resetFilter() {
            this.filterCards('')
        },
        setSearchVisible() {
            this.$emit('setSearchVisible')
        },
        setMenuVisible() {
            this.$emit('setMenuVisible')
        },
        filterCards(idTheme) {
            this.$emit('filterCards', idTheme)
        },
        logout() {
            this.$store.dispatch('auth/signOut').then(() => {
                this.$router.go('/');
            });
        }
    }
}
</script>
