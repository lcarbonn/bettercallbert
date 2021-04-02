<template>
    <div class="md-layout md-alignment-top-center">
        <md-button class="md-icon-button"
                   :to='"/cards/"+id'>
            <md-icon>preview</md-icon>
            <md-tooltip md-direction="top">Back</md-tooltip>
        </md-button>
        <CardForm :card="card"
                  :img="img"
                  :themes="themes"
                  :imagePath="imagePath"
                  @saveCard="saveCard"
                  @deleteCard="deleteCard"
                  @uploadImageFile="uploadImageFile" />
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
        this.$store.dispatch("themes/getThemes")
        this.$store.dispatch("storage/resetImagePath")
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
        },
        themes() {
            return this.$store.getters['themes/themes']
        },
        imagePath() {
            return this.$store.getters['storage/imagePath']
        }
    },
    methods: {
        saveCard(card) {
            card.id = this.id;
            this.$store.dispatch("cards/saveCard", card);
        },
        deleteCard() {
            this.$store.dispatch("cards/deleteCard", this.id);
        },
        uploadImageFile(file) {
            this.$store.dispatch("storage/uploadImageFile", file)
        }
    }
}
</script>