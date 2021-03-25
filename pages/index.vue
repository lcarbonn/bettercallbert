<template>
    <div>
        <md-toolbar md-elevation="0"
                    v-if="currentTheme">
            <h3>{{currentTheme.title}}</h3>
        </md-toolbar>
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
    beforeUpdate() {
        this.currentTheme = this.$store.getters["themes/currentTheme"];
        this.$store.dispatch("cards/filterCards", this.currentTheme);
    },
    computed: {
        cards() {
            return this.$store.getters['cards/cards']
        },
        currentTheme() {
            return this.$store.getters['themes/currentTheme']
        }
    }
}
</script>
