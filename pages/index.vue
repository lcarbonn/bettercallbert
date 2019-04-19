<template>
  <section class="wrapper">
    <AppHeader/>
    <Menu v-bind:menus="themes"/>
    <div class="main">
      <article class="item" 
        v-for="card in cards"
        v-bind:key="card.id">
        <Card v-bind:card="card"/>
      </article>
    </div>
    <AppFooter/>
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
                color: doc.data().color
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
    }
  },

  created () {
    this.getCards();
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

.main {
  display: flex;
  flex-flow: row wrap;
  justify-content: space-around;
  align-items: stretch;
}

.item {
  width:20rem;
  height: 20rem;
  margin: 5px;
}

/* Medium screens */
@media all and (max-width: 800px) {
  .item {
    /* When on medium sized screens, reduced size */
  width:10rem;
  height: 10rem;
  }
}

</style>
