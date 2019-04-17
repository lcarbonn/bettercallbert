<template>
  <section class="wrapper">
    <AppHeader/>
    <Menu/>
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
  background-color: black;
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
</style>
