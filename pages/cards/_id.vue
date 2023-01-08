<template>
    <b-container>
        <b-button v-show="isConnected"
                  id="updateButton"
                  variant="secondary"
                  :to='"/admin/" + id'>
            <b-icon icon="gear"></b-icon>
        </b-button>
        <b-tooltip target="updateButton"
                   triggers="hover">Update</b-tooltip>

        <DomainCardDetail :card="card"
                          :nextId="nextId"
                          :previousId="previousId"
                          :img="img"
                          class="py-3" />
    </b-container>
</template>

<script>
import { BIcon, BIconGear } from 'bootstrap-vue'

export default {
    name: "cardPage",

    components: {
        BIcon,
        BIconGear
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
        img() {
            return this.$store.getters['cards/img']
        },
        isConnected() {
            return this.$store.getters['auth/isConnected'];
        }
    }

}
</script>