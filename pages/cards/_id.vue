<template>
    <div class="md-layout md-alignment-top-center">
        <md-button class="md-icon-button"
                   :to="'/admin/'+id"
                   v-show="isConnected">
            <md-icon>build</md-icon>
            <md-tooltip md-direction="top">Update</md-tooltip>
        </md-button>
        <CardDetail :card="card"
                    :nextId="nextId"
                    :previousId="previousId"
                    :img="img" />
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
        this.$store.dispatch("layout/setSingleCard", true);
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
        img() {
            return this.$store.getters['cards/img']
        },
        isConnected() {
            return this.$store.getters['auth/isConnected'];
        }
    }

}
</script>