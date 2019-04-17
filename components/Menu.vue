<template>
  <div class="menu">
    <span><nuxt-link :to="'/'" class="menu-item">Home</nuxt-link></span>
    <span v-for="menu in menus" v-bind:key="menu.id">
      <nuxt-link :to="'/'" class="menu-item" v-bind:class="menu.color">{{menu.title}}</nuxt-link>
    </span>
  </div>
</template>

<script>

  export default {
    props: {
        menus: {
            type: Array,
            default: null
        }
    }
  }

</script>

<style scoped>

.menu {
  display: flex;
  flex-direction: row;
  text-align: left;
  margin: 5px;
}

.menu-item {
  border-top: 1px #e94f2b solid;
  text-decoration: none !important;
  color:grey;
  margin-right: 5px;
}

.themeone {
  border-top-color: rgb(245, 150, 126);
}
.themetwo {
  border-top-color: rgb(103, 200, 198);
}
.themethree {
  border-top-color: rgb(178, 209, 127);
}

.menu-item:hover {
  color:white;
}

</style>
