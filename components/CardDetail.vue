<template>
    <div class="card" v-bind:class="color">
      <span>{{title}}</span>
      <img v-if="src!=null" class="image" v-bind:alt="title" v-bind:title="title" 
        v-bind:class="{ rotate: isRotate }" v-bind:src="src"/>
      <span v-if="link!=null"><a v-bind:href="link" target="_blank">Jump to source</a></span>
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
  }},

  methods: {
    async getColor(idTheme) {
      let doc = await DB.collection("themes").doc(idTheme).get();
        if (!doc.exists) {
          console.log('No such theme with this id:'+idTheme);
          return null;
        } else {
          console.log(`theme:${idTheme} => ${doc.data().color}`);
          return doc.data().color;
        }
    }
  },

  created: async function() {
      let doc = await DB.collection("cards").doc(this.id).get();
        if (!doc.exists) {
          console.log('No such card with this id:'+this.id);
          this.title="No yet such card!";
        } else {
          console.log(`card:${doc.id} => ${doc.data().title}`);
          this.title=doc.data().title;
          this.src= await functions.getUrl(doc.data().src);
          this.isRotate=doc.data().isRotate;
          this.link=doc.data().link;
          if(doc.data().idTheme!=null) {
            let color = await this.getColor(doc.data().idTheme);
            if(color!=null) this.color = color;
          }
        }
  }

}

</script>

<style scoped>
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
  width: fit-content;
  max-height: 100%;
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
  max-height: 80%;
  max-width: 100%;
  object-fit: contain;
}

.rotate {
  width:70%;
  transform: rotate(90deg);
}

a {
  font-size: 1rem;
  letter-spacing: 0px;
  text-decoration: none !important;
  color:white;
}

/* Medium screens */
@media all and (max-width: 800px) {
  .card {
    /* When on medium sized screens, reduced size */
  font-size: 0.8rem;
  }
}

</style>
