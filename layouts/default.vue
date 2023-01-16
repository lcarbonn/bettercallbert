<!-- Main page -->
<template>
  <div class="d-flex flex-column justify-content-between min-vh-100">
    <BaseNavbar @search="search"></BaseNavbar>
    <BaseNavbarTheme :themes="themes"
                     @filterCards="filterCards"></BaseNavbarTheme>
    <b-container fluid>
      <b-row>
        <b-col>
          <nuxt />
        </b-col>
      </b-row>
    </b-container>
    <div class="d-flex flex-column justify-content-end">
      <BaseSnackbar></BaseSnackbar>
      <BaseFooter :appVersion="appVersion"></BaseFooter>
    </div>
  </div>
</template>

<script>

import authenticated from '~/mixins/authenticated.js';

import { version } from '../package.json';

export default {
  name: "DefaultLayout",
  mixins: [authenticated],

  data: () => ({
    appVersion: version
  }),

  created() {
    console.debug("appVersion:" + this.appVersion)
  },

  mounted() {
    this.$store.dispatch("themes/getThemes")
  },

  computed: {
    themes() {
      return this.$store.getters['themes/themes']
    },
  },
  methods: {
    filterCards(idTheme) {
      this.$store.dispatch("themes/setCurrentTheme", idTheme)
      this.$store.dispatch("cards/filterCards", idTheme)
    },
    search(textsearch) {
      this.resetNav()
      this.$store.dispatch("themes/setCurrentTheme", null)
      this.$store.dispatch("cards/search", textsearch)
    },
    resetNav() {
      this.filterCards(null)
    }
  }
};
</script>
