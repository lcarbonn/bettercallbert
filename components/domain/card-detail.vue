<template>
    <md-card md-with-hover
             v-if="card">
        <md-card-header>
            <span class="md-title">{{card.title}}</span>
        </md-card-header>
        <md-card-actions md-alignment="space-between">
            <md-button class="md-icon-button">
                <nuxt-link v-if="previousId"
                           :to="'/cards/'+previousId">
                    <md-icon>navigate_before</md-icon>
                </nuxt-link>
            </md-button>
            <md-button>
                <a v-if="card.link"
                   :href="card.link"
                   target="_blank">Jump to source</a>
            </md-button>
            <md-button class="md-icon-button">
                <nuxt-link v-if="nextId"
                           :to="'/cards/'+nextId">
                    <md-icon>navigate_next</md-icon>
                </nuxt-link>
            </md-button>
        </md-card-actions>
        <md-card-media>
            <img :title="card.title"
                 :alt="card.title"
                 :src="src">
        </md-card-media>
    </md-card>
</template>

<script>

export default {

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
        color: {
            type: String,
            default: ""
        },
        src: {
            type: String,
            default: null
        }
    }
}

</script>

<style scoped>
.md-card {
    height: 70vh;
    margin: 4px;
    display: inline-block;
    vertical-align: top;
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
</style>
