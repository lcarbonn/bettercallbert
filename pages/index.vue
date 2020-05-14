<template>

    <div>
        <Card v-for="card in cards"
              :key="card.id"
              :card="card" />
    </div>
</template>

<script>
import Card from '~/components/domain/card';

export default {
    components: {
        Card
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

