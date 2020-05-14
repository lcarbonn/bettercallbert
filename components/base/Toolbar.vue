<template>
    <div class="md-toolbar-row">
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
        <md-field class="md-toolbar-offset">
            <md-icon>search</md-icon>
            <md-input name="search"
                      id="search"
                      v-model="textsearch"
                      @keyup="search()"></md-input>
        </md-field>
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
            textsearch: ''
        }
    },
    methods: {
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
