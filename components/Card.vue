<template>
    <div>
        <nuxt-link :to="'/'" class="home">Home</nuxt-link>
        <div class="card" v-bind:class="color">
          <p>{{title}}</p>
          <p><img class="image" v-bind:src="'/cards/'+src"/></p>

        </div>
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
    src:''
  }},

  created () {
      console.log("card created id="+this.id);
      var docRef = DB.collection("themes").doc(this.id);
      var getDoc = docRef.get()
        .then(doc => {
          if (!doc.exists) {
            console.log('No such document!');
            this.title="No yet such document!";
          } else {
            console.log(`${doc.id} => ${doc.data().title}`);
            this.title=doc.data().title;
            this.color=doc.data().color;
            this.src=doc.data().src;
          }
        })
  }

  }

</script>

<style>
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

.home {
  text-decoration: none !important;
  color:white;
}

.image {
  padding: 10px;
}
</style>
