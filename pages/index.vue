<template>
  <b-row cols="1"
         cols-lg="2"
         cols-xl="5">
    <b-col v-for="card in cards"
           :key="card.id"
           class="py-3">
      <DomainCard :card="card"
                  :theme="getVariantTheme(card)"></DomainCard>
    </b-col>
  </b-row>
</template>

<script>
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
