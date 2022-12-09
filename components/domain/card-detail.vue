<template>
    <div>
        <md-card md-with-hover
                 v-if="card">
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
        <CardDialog v-if="img"
                    :title="card.title"
                    :img="img"
                    :showDialogIn="showDialogIn"
                    @closeDialog="closeDialog" />

    </div>
</template>

<script>
import CardDialog from '~/components/domain/card-dialog';


export default {
    components: {
        CardDialog
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

<style scoped>
.md-card {
    margin: 4px;
    display: inline-block;
    vertical-align: top;
    text-align: center;
}

.md-card-media img {
    width: unset;
    max-height: 60vh;
    max-width: 100vw;
}

a {
    font-size: 1rem;
    letter-spacing: 0px;
    text-decoration: none !important;
    color: grey;
}

a:hover {
    color: white;
}

@media (max-width: 400px) {
    .md-card {
        margin: 4px;
        display: inline-block;
        vertical-align: top;
        text-align: center;
        width: -webkit-fill-available;
    }

    .md-card-media img {
        width: 100%;
        max-height: 60vh;
        max-width: 100vw;
    }
}
</style>
