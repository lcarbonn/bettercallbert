<template>
    <div class="md-toolbar-row">
        <div class="md-toolbar-section-start">
            <md-button class="md-icon-button"
                       @click="setMenuVisible()">
                <md-icon>menu</md-icon>
            </md-button>
            <span class="md-title"
                  @click="resetTabs()">
                <n-link to="/"
                        class="md-title n-link">Better Call Bert</n-link>
            </span>
        </div>
        <div class="md-toolbar-section-end"
             v-show="!isSingleCard">
            <md-button class="md-icon-button"
                       @click="setSearchVisible()">
                <md-icon>search</md-icon>
            </md-button>
            <md-button class="md-icon-button"
                       @click="logout()">
                <md-icon>logout</md-icon>
            </md-button>
            <md-button class="md-icon-button"
                       @click="logout()"
                       v-show="!isConnected"
                       to="/login">
                <md-icon>login</md-icon>
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
    data() {
        return {
            mdActiveTab: ''
        }
    },
    computed: {
        isConnected() {
            return this.$store.getters['auth/isConnected'];
        }
    },
    methods: {
        resetTabs() {
            this.mdActiveTab = ''
            this.filterCards('')
        },
        setActiveTab(activeTab) {
            this.mdActiveTab = activeTab
            this.filterCards(activeTab)
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
