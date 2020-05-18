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
        <div class="md-toolbar-section"
             v-show="!isSingleCard">
            <md-tabs class="md-primary"
                     :md-active-tab.sync="mdActiveTab"
                     @md-changed="setActiveTab">
                <md-tab v-for="menu in menus"
                        :key="menu.id"
                        :id="menu.id"
                        :md-label="menu.title"
                        @click="filterCards(menu.id)">
                </md-tab>
            </md-tabs>
        </div>
        <div class="md-toolbar-section-end"
             v-show="!isSingleCard">
            <md-button class="md-icon-button"
                       @click="setSearchVisible()">
                <md-icon>search</md-icon>
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
        }
    }
}
</script>
