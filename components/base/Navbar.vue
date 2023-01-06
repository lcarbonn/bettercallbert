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

        <b-nav-item-dropdown text="Settings"
                             v-show="isConnected">
          <b-dropdown-item @click="createCard()"
                           to="#"
                           variant="primary">Add card</b-dropdown-item>
        </b-nav-item-dropdown>

        <b-nav-item-dropdown right>
          <!-- Using 'button-content' slot -->
          <template #button-content>
            <em><b-icon icon="person"></b-icon></em>
          </template>
          <b-dropdown-item v-show="!isConnected"
                           href="/login">Login</b-dropdown-item>
          <b-dropdown-item v-show="isConnected"
                           @click="logout()">Logout</b-dropdown-item>
        </b-nav-item-dropdown>

      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

<script>
import { BIcon, BIconPerson } from 'bootstrap-vue'

export default {
  name: 'NavbarComp',
  components: {
    BIcon,
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
    isConnected() {
      return this.$store.getters['auth/isConnected'];
    }
  },

  methods: {
    filterCards(idTheme) {
      this.$emit('filterCards', idTheme)
    },
    search() {
      this.$emit('search', this.textsearch)
    },
    logout() {
      this.$store.dispatch('auth/signOut').then(() => {
        //force back to home
        this.$router.go('/')
      })
    }
  }
}
</script>
