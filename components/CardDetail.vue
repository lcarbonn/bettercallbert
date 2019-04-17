<template>
    <div class="card" v-bind:class="color">
      <span>{{title}}</span>
      <img v-if="src!=null" class="image" v-bind:class="{ rotate: isRotate }" v-bind:src="'/cards/'+src"/>
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
    src:'',
    isRotate:false
  }},

  created () {
      var docRef = DB.collection("cards").doc(this.id);
      var getDoc = docRef.get()
        .then(doc => {
          if (!doc.exists) {
            console.log('No such document with this id:'+this.id);
            this.title="No yet such document!";
          } else {
            console.log(`card:${doc.id} => ${doc.data().title}`);
            this.title=doc.data().title;
            this.color=doc.data().color;
            this.src=doc.data().src;
            this.isRotate=doc.data().isRotate;
          }
        })
  }

  }

</script>

<style scoped>
.card {
  display: flex;
  flex-flow: column;
  text-align: center;
  color:white;
  width:20rem;
  height: 30rem;
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
  max-height: 100%;
  max-width: 100%;
  object-fit: contain;
}

.rotate {
  transform: rotate(90deg);
}

</style>
