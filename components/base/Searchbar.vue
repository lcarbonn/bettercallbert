<template>
    <div class="md-toolbar-row">
        <div class="md-toolbar-section-end">
            <md-field md-inline>
                <label>Search</label>
                <md-input v-model="textsearch"
                          class="md-primary"
                          @keyup="search()"></md-input>
            </md-field>
            <md-button class="md-icon-button"
                       @click="setSearchVisible()">
                <md-icon>close</md-icon>
            </md-button>
        </div>
    </div>
</template>

<script>
export default {
    name: "searchbar",

    props: {
        searchVisibile: {
            type: Boolean,
            default: false
        }
    },

    data() {
        return {
            textsearch: '',
        }
    },
    methods: {
        setSearchVisible() {
            this.textsearch = ''
            this.$emit('setSearchVisible')
        },
        search() {
            this.$emit('search', this.textsearch)
        }
    }
}
</script>

<style lang="scss" scoped>
.search-form-scrim {
    display: block;
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    z-index: -1;
}
</style>