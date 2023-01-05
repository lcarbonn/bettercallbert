<template>
    <b-card v-if="card"
            bg-variant="secondary"
            text-variant="white"
            header-bg-variant="primary"
            img-bottom
            align="center">
        <template #header>
            <small>{{ card.title }}</small>
        </template>
        <b-card-body>
            <b-button v-if="previousId"
                      :href="'/cards/' + previousId">
                <b-icon icon="arrow-left-square"
                        variant="primary" />
            </b-button>
            <b-button v-if="card.link"
                      :href="card.link"
                      target="_blank"
                      variant="primary">Jump to source</b-button>
            <b-button class="md-icon-button"
                      v-if="nextId"
                      :href="'/cards/' + nextId">
                <b-icon icon="arrow-right-square"
                        variant="primary" />
            </b-button>
        </b-card-body>
        <b-card-img :src="img"
                    :alt="card.title"
                    class="b-card-img"></b-card-img>
    </b-card>
    <!-- <div>
            <md-card-media v-if="img">
                <img :title="card.title"
                     :alt="card.title"
                     :src="img"
                     @click="showDialogIn = true">
            </md-card-media>
            <DomainCardDialog v-if="img"
                              :title="card.title"
                              :img="img"
                              :showDialogIn="showDialogIn"
                              @closeDialog="closeDialog" />

            </div> -->
</template>

<script>

import { BIcon, BIconArrowRightSquare, BIconArrowLeftSquare } from 'bootstrap-vue'

export default {
    name: "CardDetail",
    components: {
        BIcon,
        BIconArrowRightSquare,
        BIconArrowLeftSquare
    },

    props: {
        card: {
            type: Object,
            default: null
        },
        nextId: {
            type: String,
            default: null
        },
        previousId: {
            type: String,
            default: null
        },
        img: {
            type: String,
            default: null
        }
    },
    // data: () => ({
    //     showDialogIn: false
    // }),
    mounted() {
        this.setupListeners()
    },
    destroyed() {
        document.removeEventListener("keyup", this.eventHandler)
        document.removeEventListener('swiped-left', this.swipeLeftHandler)
        document.removeEventListener('swiped-right', this.swipeRightHandler)
    },
    methods: {
        setupListeners() {
            document.addEventListener("keyup", this.eventHandler)
            // swiped-left
            document.addEventListener('swiped-left', this.swipeLeftHandler)

            // swiped-right
            document.addEventListener('swiped-right', this.swipeRightHandler)
        },
        eventHandler(e) {
            if (e.keyCode == "39" && this.nextId) this.$router.push('/cards/' + this.nextId)
            if (e.keyCode == "37" && this.previousId) this.$router.push('/cards/' + this.previousId)
        },
        swipeRightHandler(e) {
            if (this.previousId) this.$router.push('/cards/' + this.previousId)
        },
        swipeLeftHandler(e) {
            if (this.nextId) this.$router.push('/cards/' + this.nextId)
        },
        // closeDialog() {
        //     this.showDialogIn = false
        // }
    }
}
</script>
<style scoped>
.b-card-img {
    width: unset;
    max-height: 100vh;
    max-width: 100%;
}

@media (max-width: 400px) {
    .b-card-img {
        width: unset;
        max-height: 60vh;
        max-width: 100%;
    }
}
</style>
