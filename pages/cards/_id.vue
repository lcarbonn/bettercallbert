<template>
    <b-container>
        <b-button v-show="!isAnonymous"
                  id="updateButton"
                  variant="secondary"
                  :to='"/admin/" + id'>
            <b-icon icon="gear"></b-icon>
        </b-button>
        <b-tooltip target="updateButton"
                   triggers="hover">Update</b-tooltip>

        <DomainCardDetail v-if="card"
                          :card="card"
                          :nextId="nextId"
                          :previousId="previousId"
                          :img="img"
                          :theme="getVariantTheme(card)"
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
        this.$store.dispatch("themes/getThemes")
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
        isAnonymous() {
            return this.$store.getters['auth/isAnonymous']
        },
        themes() {
            return this.$store.getters['themes/themes']
        }
    },
    methods: {
        getVariantTheme(card) {
            let color = ""
            this.themes.forEach(theme => {
                if (theme.id == card.idTheme) {
                    color = theme.color
                }
            });
            return color
        }
    }

}
</script>