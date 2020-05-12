<template>
    <section class="wrapper bg-dark">
        <AppHeader v-bind:isAll="true" />

        <Menu :menus="themes"
              @filter-theme="filterCards"
              @search="search" />
        <ul class="cards">
            <li v-for="card in cards"
                :key="card.id">
                <Card :card="card" />
            </li>
        </ul>
        <AppFooter v-bind:isAll="true" />
    </section>
</template>

<script>
import AppHeader from '~/components/base/AppHeader';
import AppFooter from '~/components/base/AppFooter';
import Menu from '~/components/menu/menu';
import Card from '~/components/domain/card';

export default {
    components: {
        AppFooter,
        AppHeader,
        Menu,
        Card
    },

    methods: {

        filterCards(idTheme) {
            this.$store.dispatch("cards/filterCards", idTheme);
        },

        search(textsearch) {
            this.$store.dispatch("cards/search", textsearch);
        }
    },

    mounted() {
        this.$store.dispatch("cards/getCards");
    },
    computed: {
        cards() {
            return this.$store.getters['cards/cards']
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

