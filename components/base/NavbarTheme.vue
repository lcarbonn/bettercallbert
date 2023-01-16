<template>
  <b-navbar id="theme"
            v-if="themes"
            toggleable="lg"
            type="dark"
            variant="primary">
    <b-navbar-nav small
                  class="d-flex flex-row flex-wrap justify-content-start">
      <b-nav-item v-for="theme in themes"
                  :key="theme.id"
                  :id="theme.id"
                  :active="isActive(theme.id)"
                  @click="filterCards(theme.id)"
                  href="#"
                  class="pr-1">
        <span class="theme-border">{{ theme.title.toUpperCase() }}</span>
      </b-nav-item>
    </b-navbar-nav>
  </b-navbar>
</template>

<script>
export default {
  name: 'NavbarThemeComp',

  props: {
    themes: {
      type: Array,
      default: null
    }
  },

  computed: {
    currentTheme() {
      return this.$store.getters['themes/currentTheme']
    }
  },

  methods: {
    filterCards(idTheme) {
      this.textsearch = ""
      this.$emit('filterCards', idTheme)
      this.$router.push('/')
    },
    isActive(idTheme) {
      if (this.currentTheme) return idTheme == this.currentTheme.id
      return false
    }
  }
}
</script>
<style scoped>
.theme-border {
  border-top: 1px #ffffff solid;
}
</style>
