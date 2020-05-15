<template>
    <div>
        <div class="md-toolbar-row"
             v-if="!searchVisible">
            <div class="md-toolbar-section-start">
                <md-button class="md-icon-button"
                           @click="setVisible()">
                    <md-icon>menu</md-icon>
                </md-button>
                <span class="md-title">
                    <n-link to="/"
                            class="md-title n-link">Better Call Bert</n-link>
                </span>
            </div>
            <md-tabs class="md-primary">
                <md-tab id="all"
                        md-label="All"
                        @click="filterCards('')" />
                <md-tab v-for="menu in menus"
                        :key="menu.id"
                        :id="menu.id"
                        :md-label="menu.title"
                        @click="filterCards(menu.id)">
                </md-tab>
            </md-tabs>
            <div class="md-toolbar-section-end">
                <md-button class="md-icon-button"
                           @click="setSearchVisible()">
                    <md-icon>search</md-icon>
                </md-button>
            </div>
        </div>
        <div class="md-toolbar-row"
             v-if="searchVisible">
            <div class="md-toolbar-section">
                <md-field>
                    <md-icon>search</md-icon>
                    <md-input name="search"
                              id="search"
                              v-model="textsearch"
                              @keyup="search()"></md-input>
                </md-field>
            </div>
            <div class="md-toolbar-section-end">
                <md-button class="md-icon-button"
                           @click="setSearchVisible()">
                    <md-icon>close</md-icon>
                </md-button>
            </div>
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
        }
    },
    data() {
        return {
            textsearch: '',
            searchVisible: false
        }
    },
    methods: {
        setSearchVisible() {
            this.filterCards('')
            this.searchVisible = !this.searchVisible
        },
        setVisible() {
            this.$emit('setVisible')
        },
        filterCards(idTheme) {
            this.textsearch = ''
            this.$emit('filterCards', idTheme)
        },
        search() {
            this.$emit('search', this.textsearch)
        }
    }
}
</script>
