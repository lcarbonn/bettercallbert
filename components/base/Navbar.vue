<template>
  <b-navbar toggleable="lg"
            type="dark"
            variant="info"
            class="sticky-top">
    <b-navbar-brand href="/">
      <b-avatar variant="primary"
                rounded
                src="~/static/icon.png"
                @click="v - b - toggle.sidebar - 1"></b-avatar> Better Call Bert
    </b-navbar-brand>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse"
                is-nav>
      <b-navbar-nav>
        <b-nav-item-dropdown text="Filter">
          <b-dropdown-item v-for="theme in themes"
                           :key="theme.id"
                           :id="theme.id"
                           @click="filterCards(theme.id)"
                           to="#"
                           variant="primary">{{ theme.title }}</b-dropdown-item>
        </b-nav-item-dropdown>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

<script>
import { BIcon, BIconHouse, BIconPerson } from 'bootstrap-vue'

export default {
  name: 'NavbarComp',
  components: {
    BIcon,
    BIconHouse,
    BIconPerson
  },

  props: {
    themes: {
      type: Array,
      default: null
    },
  },

  computed: {
    // player() {
    //   return this.$store.getters["players/player"];
    // },
    // game() {
    //   return this.$store.getters["games/game"];
    // },
    // isAnonymous() {
    //   return this.$store.getters['auth/isAnonymous'];
    // },
    // isConnected() {
    //     return this.$store.getters['auth/isConnected'];
    // },
    // userEmail() {
    //   return this.$store.getters['auth/getUserEmail'];
    // }

  },
  methods: {
    filterCards(idTheme) {
      this.$emit('filterCards', idTheme)
    },

    // logout() {
    //   this.$store.dispatch('auth/signOut').then(() => {
    //     this.$router.push('/')
    //   });
    // }
  }
}
</script>
