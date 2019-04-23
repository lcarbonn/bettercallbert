<template>
  <section class="wrapper">
    <AppHeader v-bind:isAll="true"/>

    <Menu v-bind:menus="themes" 
      v-bind:isRoot="true"
      v-on:filter-theme="filterTheme"
      v-on:search="search"
      />
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
    fullCards : [],
    themes:[]
  }},

  methods: {

    filterTheme(idTheme) {
      console.log("filterTheme:"+idTheme);
      this.textsearch = '';
      if(idTheme==null) {
        this.cards = this.fullCards;
        return;
      }
      let cards = [];
      this.fullCards.forEach((card) => {
        if(card.idTheme == idTheme) {
          cards.push(card);
        }
      })
      this.cards = cards;
    },

    search(textsearch) {
      console.log("search");
      if(textsearch.trim()=='') {
        textsearch = textsearch.trim();
        this.cards = this.fullCards;
        return;
      }
      let cards = [];
      this.fullCards.forEach((card) => {
        if(card.title.toLowerCase().includes(textsearch.toLowerCase())) {
          cards.push(card);
        }
      })
      this.cards = cards;
    },

    async getCards() {
      let cards = [];
      // var querySnapshot = await DB.collection("cards").orderBy('idTheme').get();
      let querySnapshot = await DB.collection("cards").get();
      querySnapshot.forEach((doc) => {
        console.log(`get card:${doc.id} => ${doc.data().title}`);
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
      let themes = [];
      let querySnapshot = await DB.collection("themes").get();
      querySnapshot.forEach((doc) => {
        console.log(`get theme:${doc.id} => ${doc.data().title}`);
        themes.push({
          id: doc.id,
          title: doc.data().title,
          color: doc.data().color
        })
      });
      return themes;
    },

    associateColors(cards, themes) {
      cards.forEach((card) => {
        console.log(`associate card:${card.id} => idTheme: ${card.idTheme}`);
        if(card.idTheme!=null) {
          let theme = themes.find(theme => theme.id == card.idTheme)
          console.log(`associate card:${card.id} => color: ${theme.color}`);
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
    this.fullCards = this.cards;
  }
}
</script>

<style scoped>

.wrapper {
  display: flex;  
  flex-flow: column;
  font-weight: bold;
  text-align: center;
  min-height: 100vh;
  background-color: black;
}

.wrapper > * {
  padding: 5px;
  /* flex: 1 100%; */
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
