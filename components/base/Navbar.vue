<template>
  <b-navbar toggleable="lg"
            type="dark"
            variant="primary"
            class="sticky-top">
    <b-navbar-brand href="/">
      <b-avatar variant="primary"
                rounded
                src="~/static/icon.png"></b-avatar> BetterCallBert
    </b-navbar-brand>

    <b-navbar-nav small
                  v-if="themes"
                  class="d-flex flex-row flex-wrap justify-content-start">
      <b-nav-item v-for="theme in themes"
                  :key="theme.id"
                  :id="theme.id"
                  :active="isActive(theme.id)"
                  @click="filterCards(theme.id)"
                  href="#"
                  class="pr-1">
        <span style="border-bottom-style: solid;"
              :class="getThemeColor(theme)">
          <!-- <span> -->
          {{ theme.title.toUpperCase() }}</span>
      </b-nav-item>
    </b-navbar-nav>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse"
                is-nav>
      <b-navbar-nav small
                    class="ml-auto">
        <b-nav-form>
          <b-input-group>
            <b-form-input id="textsearch"
                          placeholder="Search"
                          v-model="textsearch"
                          @keyup="search()"></b-form-input>
            <b-input-group-append>
              <b-button :disabled="!textsearch"
                        @click="textsearch = null; search()"><b-icon icon="x" /></b-button>
            </b-input-group-append>
          </b-input-group>
        </b-nav-form>
        <b-nav-item-dropdown text="Settings"
                             v-show="!isAnonymous">
          <b-dropdown-item @click="createCard()"
                           to="#"
                           variant="primary">Add card</b-dropdown-item>
        </b-nav-item-dropdown>

        <b-nav-item-dropdown right>
          <!-- Using 'button-content' slot -->
          <template #button-content>
            <em><b-icon icon="person"></b-icon></em>
          </template>
          <b-dropdown-item v-show="isAnonymous"
                           @click="login()">Login</b-dropdown-item>
          <b-dropdown-item v-show="!isAnonymous"
                           @click="logout()">Logout</b-dropdown-item>
        </b-nav-item-dropdown>

      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

<script>
import { BIcon, BIconPerson, BIconX } from 'bootstrap-vue'
import { setNextPath } from '~/mixins/authenticated.js';

export default {
  name: 'NavbarComp',
  components: {
    BIcon,
    BIconPerson,
    BIconX
  },
  data: () => ({
    textsearch: null
  }),

  props: {
    themes: {
      type: Array,
      default: null
    }
  },

  computed: {
    isAnonymous() {
      return this.$store.getters['auth/isAnonymous'];
    },
    currentTheme() {
      return this.$store.getters['themes/currentTheme']
    },
    isSinglePage() {
      return this.$store.getters['navbar/isSinglePage']
    }
  },

  methods: {
    filterCards(idTheme) {
      this.textsearch = ""
      this.$emit('filterCards', idTheme)
      if (this.isSinglePage) this.$router.push('/');

    },
    search() {
      this.$emit('search', this.textsearch)
      if (this.isSinglePage) this.$router.push('/');
    },
    createCard() {
      this.filterCards(null)
      this.$store.dispatch("cards/createCard").then(() => {
        const card = this.$store.getters['cards/card']
        this.$router.push('/admin/' + card.id);
      });
    },
    login() {
      setNextPath(this.$router.currentRoute)
      this.$router.push('/login')
    },
    logout() {
      this.$store.dispatch('auth/signOut').then(() => {
        let path = this.$router.currentRoute.path
        path = path.replace("/admin/", "/cards/")
        setNextPath(path)
        this.$router.push(path)
      })
    },
    isActive(idTheme) {
      if (this.currentTheme) return idTheme == this.currentTheme.id
      return false
    },
    getThemeColor(theme) {
      let style = "border-" + theme.color
      return style
    }
  }
}
</script>
