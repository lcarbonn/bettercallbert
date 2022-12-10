<template>
    <div class="md-layout md-alignment-top-center">
        <md-button v-if="!disableButton"
                   class="md-icon-button"
                   :to='"/cards/" + id'>
            <md-icon>preview</md-icon>
            <md-tooltip md-direction="top">Back</md-tooltip>
        </md-button>
        <DomainCardForm :card="card"
                        :img="img"
                        :themes="themes"
                        :imagePath="imagePath"
                        @saveCard="saveCard"
                        @deleteCard="deleteCard"
                        @uploadImageFile="uploadImageFile"
                        @resetImagePath="resetImagePath" />
    </div>
</template>

<script>
import authenticated from '~/mixins/authenticated.js';

export default {
    mixins: [authenticated],
    data: () => ({
        disableButton: false,
    }),
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
            const im = this.$store.getters['storage/imageUrl']
            if (im) return im
            return this.$store.getters['cards/img']
        },
        themes() {
            return this.$store.getters['themes/themes']
        },
        imagePath() {
            return this.$store.getters['storage/imagePath']
        },
        imageUrl() {
            return this.$store.getters['storage/imageUrl']
        }
    },
    methods: {
        saveCard(card) {
            card.id = this.id;
            this.$store.dispatch("cards/saveCard", card)
        },
        deleteCard() {
            this.$store.dispatch("cards/deleteCard", this.id)
            this.disableButton = true
        },
        uploadImageFile(file) {
            this.$store.dispatch("storage/uploadImageFile", file)
        },
        resetImagePath() {
            this.$store.dispatch("storage/resetImagePath")
        }
    }
}
</script>