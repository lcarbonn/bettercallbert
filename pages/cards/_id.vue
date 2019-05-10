<template>
  <section class="wrapper bg-dark">
    <AppHeader/>
    <div>
      <nuxt-link :to="'/'" class="menu-item">Home</nuxt-link>
    </div>
    <div class="main">
        <CardDetail v-bind:id="id"/>
    </div>
    <AppFooter/>
  </section>
</template>

<script>
import AppHeader from '~/components/AppHeader.vue';
import AppFooter from '~/components/AppFooter.vue';
import Menu from '~/components/Menu.vue';
import CardDetail from '~/components/CardDetail.vue';

export default {
  components: {
    AppFooter,
    AppHeader,
    Menu,
    CardDetail,
  },

    data() {
        return {
            id: null
        };
    },

    created () {
        this.id = this.$route.params.id;
        console.log("_id="+this.id);
    }    
}
</script>

<style scoped>

.wrapper {
  display: flex;  
  flex-flow: row wrap;
  font-weight: bold;
  text-align: center;
  min-height: 100vh;
}

.wrapper > * {
  padding: 5px;
  flex: 1 100%;
}

.main {
  display: flex;
  flex-flow: row wrap;
  justify-content: space-around;
  align-items: stretch;
}

.menu-item {
  text-decoration: none !important;
  color:grey;
  border-top: 1px #e94f2b solid;
}

.menu-item:hover {
  color:white;
}

</style>
