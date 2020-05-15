<template>
    <div class="md-layout md-alignment-top-center">
        <CardDetail :card="card"
                    :nextId="nextId"
                    :previousId="previousId"
                    :src="src"
                    :color="color" />
    </div>
</template>

<script>
import CardDetail from '~/components/domain/card-detail';

export default {
    components: {
        CardDetail
    },
    mounted() {
        this.$store.dispatch("cards/getCard", this.id)
    },

    computed: {
        id() {
            return this.$route.params.id
        },
        card() {
            return this.$store.getters['cards/card']
        },
        nextId() {
            return this.$store.getters['cards/nextId']
        },
        previousId() {
            return this.$store.getters['cards/previousId']
        },
        color() {
            return this.$store.getters['cards/color']
        },
        src() {
            return this.$store.getters['cards/src']
        }
    }

}
</script>