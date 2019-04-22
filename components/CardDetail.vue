<template>
    <div class="card" v-bind:class="color">
      <span>{{title}}</span>
      <img v-if="src!=null" class="image" v-bind:alt="title" v-bind:title="title" 
        v-bind:class="{ rotate: isRotate }" v-bind:src="'/cards/'+src"/>
    </div>
</template>

<script>
import { DB } from '@/plugins/firebase.js';

export default {
  components: {
    DB
  },

  props: ['id'],

  data() { return {
    title:'',
    color:'',
    src:null,
    isRotate:false,
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
          this.src=doc.data().src;
          this.isRotate=doc.data().isRotate;
          let color = await this.getColor(doc.data().idTheme);
          if(color!=null) this.color = color;
        }
  }

}

</script>

<style scoped>
.card {
  background-color: rgb(245, 150, 126);
  display: flex;
  flex-flow: column;
  align-items: center;
  text-align: center;
  color:white;
  width:20rem;
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
  height: 100%;
  max-width: 100%;
  object-fit: contain;
}

.rotate {
  height: 80%;
  transform: rotate(90deg);
}

</style>
