<template>
    <nuxt-link :to="'/cards/'+card.id">
        <md-card md-with-hover>
            <md-card-media-cover>
                <md-card-media md-ratio="1:1">
                    <img :title="card.title"
                         :alt="card.title"
                         :src="card.src">
                </md-card-media>
                <md-card-area class="my-solid">
                    <md-card-header>
                        <span class="md-title">{{card.title}}</span>
                    </md-card-header>
                </md-card-area>
            </md-card-media-cover>
        </md-card>
    </nuxt-link>
</template>

<script>
export default {
    props: {
        card: {
            type: Object,
            default: null
        },
    }
}
</script>

<style lang="scss" scoped>
.md-card {
    width: 320px;
    margin: 4px;
    display: inline-block;
    vertical-align: top;
}

.my-solid {
    background-color: rgba(0, 0, 0, 0.54);
}
</style>
