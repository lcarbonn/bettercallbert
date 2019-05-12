<template>
  <section class="wrapper bg-dark">
    <AppHeader/>
    <div>
      <nuxt-link :to="'/'" class="menu-item">Home</nuxt-link>
    </div>
    <div class="main">
        <span v-if="previousId!=null"><nuxt-link :to="'/cards/'+previousId">--</nuxt-link></span>
        <CardDetail v-bind:id="id"/>
        <span v-if="nextId!=null"><nuxt-link :to="'/cards/'+nextId">++</nuxt-link></span>
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
          id: null,
          nextId:null,
          previousId:null
      };
  },

  methods: {
    getNext(id) {
      this.nextId = null;
      let docRef = DB.collection('cards').doc(id);
      docRef.get().then((doc) => {
        console.log(`this card:${doc.id} => ${doc.data().title}`);
        let nextRef = DB.collection('cards')
          .orderBy('idTheme')
          .startAfter(doc)
          .limit(1);
         nextRef.get().then((nextDocs) => {
            nextDocs.forEach((doc) => {
              console.log(`next card:${doc.id} => ${doc.data().title}`);
               this.nextId = doc.id;
            });
          });
      });
    },
    getPrevious(id) {
      this.previousId = null;
      let docRef = DB.collection('cards').doc(id);
      docRef.get().then((doc) => {
        console.log(`this card:${doc.id} => ${doc.data().title}`);
        let nextRef = DB.collection('cards')
          .orderBy('idTheme')
          .endBefore(doc);
         nextRef.get().then((nextDocs) => {
            nextDocs.forEach((doc) => {
              console.log(`previous card:${doc.id} => ${doc.data().title}`);
               this.previousId = doc.id;
            });
          });
      });
    },

  },
  
  created: function() {
      this.id = this.$route.params.id;
      console.log("_id="+this.id);
      this.getNext(this.id);
      this.getPrevious(this.id);
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
  justify-content: space-evenly;
  align-items: center;
  color:grey;
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
