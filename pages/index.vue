<template>
    <section class="wrapper bg-dark">
        <AppHeader v-bind:isAll="true" />

        <Menu v-bind:menus="themes"
              v-on:filter-theme="filterTheme"
              v-on:search="search" />
        <ul class="cards">
            <li v-for="card in cards"
                v-bind:key="card.id">
                <Card v-bind:card="card" />
            </li>
        </ul>
        <AppFooter v-bind:isAll="true" />
    </section>
</template>

<script>
import AppHeader from '~/components/AppHeader.vue';
import AppFooter from '~/components/AppFooter.vue';
import Menu from '~/components/Menu.vue';
import Card from '~/components/Card.vue';
import { DB } from '@/plugins/firebase.js';

export default {
    components: {
        AppFooter,
        AppHeader,
        Menu,
        Card
    },

    methods: {

        filterTheme(idTheme) {
            this.$store.dispatch("cards/filterTheme", idTheme);
        },

        search(textsearch) {
            this.$store.dispatch("cards/search", textsearch);
        }
    },

    mounted() {
        this.$store.dispatch("cards/getCards");
        this.$store.dispatch("themes/getThemes");
    },
    computed: {
        cards() {
            return this.$store.getters['cards/cards']
        },
        fullCards() {
            return this.$store.getters['cards/fullCards']
        },
        themes() {
            return this.$store.getters['themes/themes']
        }
    }
}
</script>

<style scoped>
.wrapper {
    display: flex;
    flex-flow: column;
    font-weight: bold;
    text-align: center;
    min-height: 100vh;
}

.wrapper > * {
    padding: 5px;
}

.cards {
    display: flex;
    flex-flow: row wrap;
    justify-content: space-around;
    align-items: stretch;
}

.cards li {
    list-style: none;
    margin: 5px;
}
</style>
