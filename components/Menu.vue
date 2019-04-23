<template>
  <ul class="menu">
    <li v-if="!isRoot"><nuxt-link :to="'/'" class="menu-item">Home</nuxt-link></li>
    <li v-if="isRoot">
      <a href="#" class="menu-item" v-on:click.stop="$emit('filter-theme')">All</a>
    </li>
    <li v-for="menu in menus" v-bind:key="menu.id">
      <a href="#" class="menu-item" v-bind:class="menu.color" v-on:click.stop="$emit('filter-theme', menu.id)">{{menu.title}}</a>
    </li>
  </ul>
</template>

<script>

  export default {
    props: {
        menus: {
            type: Array,
            default: null
        },
      isRoot:false
    },
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
