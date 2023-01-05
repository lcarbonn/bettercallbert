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
        <b-card-img :src="img"
                    :alt="card.title"
                    style="max-width: 100vh; max-height: 100vh; width:unset"></b-card-img>
    </b-card>
    <!-- <div>
        <md-card md-with-hover
                 v-if="
                card">
            <md-card-header>
                <span class="md-title">{{ card.title }}</span>
            </md-card-header>
            <md-card-actions md-alignment="space-between">
                <md-button class="md-icon-button"
                           v-if="previousId"
                           :href="'/cards/' + previousId">
                    <md-icon>navigate_before</md-icon>
                </md-button>
                <md-button v-if="card.link"
                           :href="card.link"
                           target="_blank"
                           class="md-primary">Jump to source</md-button>
                <md-button class="md-icon-button"
                           v-if="nextId"
                           :href="'/cards/' + nextId">
                    <md-icon>navigate_next</md-icon>
                </md-button>
            </md-card-actions>
            <md-card-media v-if="img">
                <img :title="card.title"
                     :alt="card.title"
                     :src="img"
                     @click="showDialogIn = true">
            </md-card-media>
            </md-card>
            <DomainCardDialog v-if="img"
                              :title="card.title"
                              :img="img"
                              :showDialogIn="showDialogIn"
                              @closeDialog="closeDialog" />

            </div> -->
</template>

<script>
export default {
    name: "CardDetail",
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
    data: () => ({
        showDialogIn: false
    }),
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
        closeDialog() {
            this.showDialogIn = false
        }
    }
}
</script>