<template>
    <div class="my-content">
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
    computed: {
        cards() {
            return this.$store.getters['cards/cards']
        },
        currentTheme: {
            get() {
                return this.$store.getters['themes/currentTheme']
            },
            set(newValue) {
                // noting to do, just add a setter to avoid warning
            }
        }
    }
}
</script>
<style scoped>
.my-content {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
}
</style>