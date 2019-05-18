<template>
    <div class="detail">
      <div class="navigate">
        <span v-if="previousId!=null" class="paginate"><nuxt-link :to="'/cards/'+previousId">Prev.</nuxt-link></span>
        <span v-if="previousId==null" class="paginate">&nbsp;&nbsp;</span>
        <span v-if="nextId!=null" class="paginate"><nuxt-link :to="'/cards/'+nextId">Next</nuxt-link></span>
        <span v-if="nextId==null" class="paginate">&nbsp;&nbsp;</span>
      </div>
      <div class="card" v-bind:class="color">
        <span>{{title}}</span>
        <img v-if="src!=null" class="image" v-bind:alt="title" v-bind:title="title" 
          v-bind:class="{ rotate: isRotate }" v-bind:src="src"/>
        <span v-if="link!=null"><a v-bind:href="link" target="_blank">Jump to source</a></span>
      </div>
    </div>
</template>

<script>
import { DB } from '@/plugins/firebase.js';
import * as functions from '~/utils/functions.js';

export default {

  props: ['id'],

  data() { return {
    title:'',
    color:'',
    src:null,
    isRotate:false,
    link:null,
    nextId:null,
    previousId:null
  }},

  methods: {

    getDoc() {
      DB.collection("cards").doc(this.id).get().then((doc) => {
        if (!doc.exists) {
          console.log('No such card with this id:'+this.id);
          this.title="No yet such card!";
        } else {
          console.log(`card:${doc.id} => ${doc.data().title}`);
          this.title=doc.data().title;
          functions.getUrl(doc.data().src).then((src) => {
            this.src= src;
          });
          this.isRotate=doc.data().isRotate;
          this.link=doc.data().link;
          if(doc.data().idTheme!=null) {
            this.getColor(doc.data().idTheme);
          }
          this.getNextDoc(doc);
          this.getPreviousDoc(doc);
        }
      });
    },

    getColor(idTheme) {
      DB.collection("themes").doc(idTheme).get().then((theme) => {
        if (!theme.exists) {
          console.log('No such theme with this id:'+idTheme);
          this.color = null;
        } else {
          console.log(`theme:${idTheme} => ${theme.data().color}`);
          this.color = theme.data().color;
        }
      });
    },

    getNextDoc(doc) {
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
    },

    getPreviousDoc(doc) {
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
    },
  },

  created: function() {
    this.getDoc();
  }

}

</script>

<style scoped>
.detail {
  display: flex;
  flex-flow: column;
  justify-content: flex-start;
  align-items: center;
  color:grey;
}

.navigate {
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-around;
  align-items: center;
  width: 100%;
}

.card {
  font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI',
  Roboto, 'Helvetica Neue', Arial, sans-serif;
  font-weight: 500;
  font-size: 1.5rem;
  letter-spacing: 1px;
  display: flex;
  flex-flow: column;
  align-items: center;
  justify-content: flex-start;
  text-align: center;
  color:white;
  width: 100%;
}

.themeone {
  background-color: rgb(245, 150, 126);
}
.themetwo {
  background-color: rgb(103, 200, 198);
}
.themethree {
  background-color: rgb(178, 209, 127);
}

.theme:hover {
  background-color: white;
  color:black;
}

.image {
  padding: 10px;
  max-width: 100%;
  object-fit: contain;
}

.rotate {
  transform: rotate(90deg);
}

.paginate {
  padding: 5px;
}

a {
  font-size: 1rem;
  letter-spacing: 0px;
  text-decoration: none !important;
  color:grey;
}

a:hover {
  color:white;
}

/* Medium screens */
@media all and (max-width: 800px) {
  .rotate {
    width:70%;
    transform: rotate(90deg);
  }
}

</style>
