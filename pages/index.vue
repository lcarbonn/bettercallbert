<template>
  <b-row cols="1"
         cols-lg="2"
         cols-xl="5">
    <b-col v-if="!cards"><b-spinner label="Loading..."></b-spinner></b-col>
    <b-col v-else
           v-for="card in cards"
           :key="card.id"
           class="py-3">
      <nuxt-link :to="'/cards/' + card.id"
                 class="nodecoLink">
        <b-spinner v-if="!card.img"
                   label="Loading..."></b-spinner>
        <DomainCard v-else
                    :card="card"
                    :theme="getVariantTheme(card.idTheme)"></DomainCard>
      </nuxt-link>
    </b-col>
  </b-row>
</template>

<script>
import { getThemeColor } from '/commons/commons.js';

export default {
  name: 'IndexPage',

  mounted() {
    this.$store.commit('navbar/setSinglePage', false)
  },
  computed: {
    cards() {
      return this.$store.getters['cards/cards']
    },
    themes() {
      return this.$store.getters['themes/themes']
    }
  },
  methods: {
    getVariantTheme(themeId) {
      return getThemeColor(themeId, this.themes)
    },
    goToCard(card) {
      this.$router.push('/cards/' + card.id)
    }
  }
}
</script>
<style scoped>
.nodecoLink {
  text-decoration: none !important;
}
</style>
