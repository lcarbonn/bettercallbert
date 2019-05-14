<template>
  <section class="wrapper bg-dark">
    <AppHeader/>
    <div>
      <nuxt-link :to="'/'" class="menu-item">Home</nuxt-link>
    </div>
    <div>
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
import { DB } from '@/plugins/firebase.js';

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

  created: function() {
      this.id = this.$route.params.id;
  }    
}
</script>

<style scoped>

.wrapper {
  display: flex;  
  flex-flow: column;
  justify-content: flex-start;
  font-weight: bold;
  text-align: center;
  min-height: 100vh;
}

.wrapper > * {
  padding: 5px;
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
