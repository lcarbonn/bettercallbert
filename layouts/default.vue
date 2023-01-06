<!-- Main page -->
<template>
  <div class="d-flex flex-column justify-content-between min-vh-100">
    <div>
      <BaseNavbar :themes="themes"
                  :currentTheme="currentTheme"
                  @filterCards="filterCards"
                  @search="search"></BaseNavbar>
      <b-container fluid>
        <b-row>
          <b-col>
            <nuxt />
          </b-col>
        </b-row>
      </b-container>
    </div>
    <div class="d-flex flex-column justify-content-end">
      <BaseSnackbar></BaseSnackbar>
      <BaseFooter :appVersion="appVersion"></BaseFooter>
    </div>
  </div>
</template>

<script>

import { version } from '../package.json';

export default {
  name: "DefaultLayout",

  data: () => ({
    appVersion: version
  }),

  created() {
    console.debug("appVersion:" + this.appVersion)
  },

  computed: {
    themes() {
      return this.$store.getters['themes/themes']
    },
    currentTheme() {
      return this.$store.getters['themes/currentTheme']
    }
  },
  methods: {
    filterCards(idTheme) {
      this.$store.dispatch("themes/setCurrentTheme", idTheme);
      this.$store.dispatch("cards/filterCards", idTheme);
    },
    search(textsearch) {
      this.$store.dispatch("themes/setCurrentTheme", null);
      this.$store.dispatch("cards/search", textsearch);
    },

    // search(textsearch) {
    //   this.$store.dispatch("themes/setCurrentTheme", null);
    //   this.$store.dispatch("cards/search", textsearch);
    // },
    // createCard() {
    //   this.$store.dispatch("cards/createCard").then(() => {
    //     const card = this.$store.getters['cards/card']
    //     this.$router.push('/admin/' + card.id);
    //   });
    // }
  }
};
</script>
