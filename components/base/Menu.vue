<template>
    <div>
        <md-toolbar class="md-transparent"
                    md-elevation="0">Navigation</md-toolbar>
        <md-list>
            <md-list-item @click="goHome()"
                          to="/">
                <md-icon>home</md-icon>
                <span class="md-list-item-text">Home</span>
            </md-list-item>

            <md-list-item md-expand
                          :md-expanded.sync="expand">
                <md-icon>filter</md-icon>
                <span class="md-list-item-text n-link">Filters</span>
                <md-list slot="md-expand">
                    <md-list-item md-inset
                                  v-for="menu in menus"
                                  :key="menu.id"
                                  :id="menu.id"
                                  @click="filterCards(menu.id)">
                        <span class="md-list-item-text">{{menu.title}}</span>
                    </md-list-item>
                </md-list>
            </md-list-item>

            <md-list-item @click="setMenuVisible()"
                          to="/admin">
                <md-icon>settings</md-icon>
                <span class="md-list-item-text">Settings</span>
            </md-list-item>
        </md-list>
    </div>
</template>

<script>
export default {
    name: "Menu",

    props: {
        menus: {
            type: Array,
            default: null
        },
    },
    data() {
        return {
            expand: false
        }
    },
    methods: {
        setMenuVisible() {
            this.$emit('setMenuVisible')
        },
        goHome() {
            this.$emit('setMenuVisible')
            this.$emit('filterCards', '')
        },
        filterCards(idTheme) {
            this.$emit('setMenuVisible')
            this.$emit('filterCards', idTheme)
        }
    },
}
</script>

