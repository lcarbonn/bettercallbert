<template>
    <b-container>
        <b-button v-if="!disableButton"
                  id="backButton"
                  variant="secondary"
                  :to='"/cards/" + id'>
            <b-icon icon="arrow-up-left-square"></b-icon>
        </b-button>
        <b-tooltip target="backButton"
                   triggers="hover">Back</b-tooltip>

        <DomainCardForm :card="card"
                        :imageUrl="imageUrl"
                        :themes="themes"
                        :imagePath="imagePath"
                        :theme="getVariantTheme(card)"
                        @saveCard="saveCard"
                        @deleteCard="deleteCard"
                        @uploadImageFile="uploadImageFile"
                        @resetImagePath="resetImagePath" />
    </b-container>
</template>

<script>
import { BIcon, BIconArrowUpLeftSquare } from 'bootstrap-vue'
import { getThemeColor } from '/commons/commons.js';

export default {
    name: "adminCardParge",

    components: {
        BIcon,
        BIconArrowUpLeftSquare
    },
    data: () => ({
        disableButton: false,
    }),
    mounted() {
        this.$store.commit('navbar/setSinglePage', true)
        this.$store.dispatch("cards/getCard", this.id)
        this.$store.dispatch("storage/resetImagePath")
    },
    computed: {
        id() {
            return this.$route.params.id
        },
        card() {
            return this.$store.getters['cards/card']
        },
        imageUrl() {
            const im = this.$store.getters['storage/imageUrl']
            if (im) return im
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
            this.$store.dispatch("cards/saveCard", card)
        },
        deleteCard() {
            this.$store.dispatch("cards/deleteCard", this.id).then(() => {
                //force back to home
                this.$router.push('/')
            })
        },
        uploadImageFile(file) {
            this.$store.dispatch("storage/uploadImageFile", file)
        },
        resetImagePath() {
            this.$store.dispatch("storage/resetImagePath")
        },
        getVariantTheme(card) {
            if (card) return getThemeColor(card.idTheme, this.themes)
            return null
        }
    }
}
</script>