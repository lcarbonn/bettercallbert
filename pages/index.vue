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

    async getCards() {
      let querySnapshot = await DB.collection("cards").get();
      let cards = [];
      querySnapshot.forEach((doc) => {
        console.log(`card:${doc.id} => ${doc.data().title}`);
        cards.push({
          id: doc.id,
          title: doc.data().title,
          idTheme: doc.data().idTheme,
          src: doc.data().src,
          isRotate: doc.data().isRotate,
        })
      });
      return cards;
    },

    async getThemes() {
      let querySnapshot = await DB.collection("themes").get();
      let themes = []
      querySnapshot.forEach((doc) => {
        console.log(`theme:${doc.id} => ${doc.data().title}`);
        themes.push({
          id: doc.id,
          title: doc.data().title,
          color: doc.data().color
        })
      });
      return themes;
    },

    associateColors(cards, themes) {
      console.log("associate");
      cards.forEach((card) => {
        console.log(`card:${card.id} => idTheme: ${card.idTheme}`);
        if(card.idTheme!=null) {
          let theme = themes.find(theme => theme.id == card.idTheme)
          console.log(`card:${card.id} => color: ${theme.color}`);
          if(theme.color!=null) card.color = theme.color;
        }
      })
      return cards;
    },


  },

  created: async function() {
    let cards = await this.getCards();
    this.themes = await this.getThemes();
    this.cards = this.associateColors(cards, this.themes);
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
