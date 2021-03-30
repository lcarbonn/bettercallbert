<template>
    <div class="md-layout md-alignment-top-center">
        <md-button class="md-icon-button"
                   :to='"/cards/"+id'>
            <md-icon>preview</md-icon>
            <md-tooltip md-direction="top">Back</md-tooltip>
        </md-button>
        <CardForm :card="card"
                  :img="img"
                  @saveCard="saveCard"
                  @deleteCard="deleteCard" />
    </div>
</template>

<script>
import authenticated from '~/mixins/authenticated.js';
import CardForm from '~/components/domain/card-form';

export default {
    mixins: [authenticated],
    components: {
        CardForm
    },
    mounted() {
        this.$store.dispatch("cards/getCard", this.id)
        this.$store.dispatch("layout/setSingleCard", true);
    },

    computed: {
        id() {
            return this.$route.params.id
        },
        card() {
            return this.$store.getters['cards/card']
        },
        img() {
            return this.$store.getters['cards/img']
        }
    },
    methods: {
        saveCard(card) {
            card.id = this.id;
            this.$store.dispatch("cards/saveCard", card);
        },
        deleteCard() {
            this.$store.dispatch("cards/deleteCard", this.id);
        }
    }
}
</script>