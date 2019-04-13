<template>
    <div class="menu">
        <ul>
        <li><nuxt-link :to="'/'" class="menu-item">Home</nuxt-link></li>
        </ul>
    </div>
</template>

<style>

.menu {
  text-align: left;
  margin: 5px;
}

.menu-item {
  border-top: 1px #e94f2b solid;
  text-decoration: none !important;
  color:grey;
}

.menu-item:hover {
  color:white;
}

</style>
