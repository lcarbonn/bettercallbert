<template>
  <section class="wrapper">
    <AppHeader/>
    <Menu/>
    <div class="main">
      <article class="item" 
        v-for="theme in themes"
        v-bind:key="theme.id">
        <Theme v-bind:id="theme.id" v-bind:theme="theme.title" v-bind:color="theme.color"/>
      </article>
    </div>
    <AppFooter/>
  </section>
</template>

<script>
import AppHeader from '~/components/AppHeader.vue';
import AppFooter from '~/components/AppFooter.vue';
import Menu from '~/components/Menu.vue';
import Theme from '~/components/Theme.vue';
import { DB } from '@/plugins/firebase.js';

export default {
  components: {
    AppFooter,
    AppHeader,
    Menu,
    Theme,
    DB
  },

  data() {return {
    themes: []
  }},

  created () {
      DB.collection("themes").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            console.log(`${doc.id} => ${doc.data().title}`);
            this.themes.push({
              id: doc.id,
              title: doc.data().title,
              color: doc.data().color
            })
        });
      });
  },

}
</script>

<style>

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
