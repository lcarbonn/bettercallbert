<template>
  <b-navbar toggleable="lg"
            type="dark"
            variant="primary"
            class="sticky-top">
    <b-navbar-brand href="/">
      <b-avatar variant="primary"
                rounded
                src="~/static/icon.png"
                @click="v - b - toggle.sidebar - 1"></b-avatar> Better Call Bert
    </b-navbar-brand>

    <b-navbar-nav v-if="currentTheme">
      <b-nav-item>{{ currentTheme.title }}</b-nav-item>
    </b-navbar-nav>
    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse"
                is-nav>
      <b-navbar-nav v-if="themes"
                    class="ml-auto">

        <b-nav-item-dropdown text="Filter">
          <b-dropdown-item v-for="theme in themes"
                           :key="theme.id"
                           :id="theme.id"
                           @click="filterCards(theme.id)"
                           to="#"
                           variant="primary">{{ theme.title }}</b-dropdown-item>
        </b-nav-item-dropdown>

        <b-nav-form>
          <b-form-input size="sm"
                        class="mr-sm-2"
                        placeholder="Search"
                        v-model="textsearch"
                        @keyup="search()"></b-form-input>
        </b-nav-form>

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
  data: () => ({
    textsearch: ''
  }),

  props: {
    themes: {
      type: Array,
      default: null
    },
    currentTheme: null
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
    search() {
      this.$emit('search', this.textsearch)
    }

    // logout() {
    //   this.$store.dispatch('auth/signOut').then(() => {
    //     this.$router.push('/')
    //   });
    // }
  }
}
</script>
