<template>
  <section class="wrapper">
    <AppHeader v-bind:isAll="true"/>
    <!-- <Menu v-bind:menus="themes"/> -->
    <Menu/>
    <ul class="cards">
      <li v-for="card in cards" v-bind:key="card.id">
        <Card v-bind:card="card"/>
      </li>
    </ul>
    <AppFooter v-bind:isAll="true"/>
  </section>
</template>

<script>
import AppHeader from '~/components/AppHeader.vue';
import AppFooter from '~/components/AppFooter.vue';
import Menu from '~/components/Menu.vue';
import Card from '~/components/Card.vue';
import { DB } from '@/plugins/firebase.js';

export default {
  components: {
    AppFooter,
    AppHeader,
    Menu,
    Card,
    DB
  },

  data() {return {
    cards: [],
    themes:[],
  }},

  methods: {

    associateColors() {
      console.log("associate");
      this.cards.forEach((card) => {
        console.log(`card:${card.id} => ${card.themeId}`);
      }
      )
    },

    getCards() {
        DB.collection("cards").get().then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
              console.log(`card:${doc.id} => ${doc.data().title}`);
              this.cards.push({
                id: doc.id,
                title: doc.data().title,
                themeId: doc.data().themeId,
                src: doc.data().src,
                color: "themeone",
                isRotate: doc.data().isRotate,
              })
          });
        });
    },

    getThemes() {
        DB.collection("themes").get().then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
              console.log(`theme:${doc.id} => ${doc.data().title}`);
              this.themes.push({
                id: doc.id,
                title: doc.data().title,
                color: doc.data().color
              })
          });
        });
    },

  },

  created () {
    this.getCards();
    this.getThemes();
  },

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

.cards {
  display: flex;
  flex-flow: row wrap;
  justify-content: space-around;
  align-items: stretch;
}

.cards li {
    list-style: none;
    margin: 5px;
}
</style>
