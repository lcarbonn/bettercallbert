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
        this.$store.dispatch("layout/setSingleCard", false);
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
