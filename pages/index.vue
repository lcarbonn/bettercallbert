<template>
  <b-row cols="1"
         cols-lg="2"
         cols-xl="5">
    <b-col v-for="card in cards"
           :key="card.id"
           class="p-1">
      <DomainCard :card="card"
                  :theme="getVariantTheme(card.idTheme)"></DomainCard>
    </b-col>
  </b-row>
</template>

<script>
import { getThemeColor } from '/commons/commons.js';

export default {
  name: 'IndexPage',

  mounted() {
    this.$store.dispatch("cards/getCards");
    this.$store.dispatch("themes/getThemes")
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
    }
  }

}
</script>
