<template>
  <ul class="menu">
    <li><nuxt-link :to="'/'" class="menu-item">Home</nuxt-link></li>
    <li v-for="menu in menus" v-bind:key="menu.id">
      <nuxt-link :to="'/'" class="menu-item" v-bind:class="menu.color">{{menu.title}}</nuxt-link>
    </li>
  </ul>
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

.menu li {
  list-style: none;
  margin-right: 5px;
}

.menu a {
  text-decoration: none !important;
  color:grey;
}

.menu-item {
    border-top: 1px #e94f2b solid;
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

.menu li:hover {
  color:white;
}

</style>
