<template>
    <nuxt-link :to="'/cards/'+card.id" class="card" v-bind:class="card.color">
      <span>{{ card.title }}</span>
      <img v-if="src!=null" class="image" v-bind:title="card.title" v-bind:alt="card.title"
          v-bind:class="{ rotate: card.isRotate }" v-bind:src="src"/>
    </nuxt-link>
</template>

<script>
import * as functions from '~/utils/functions.js';

export default {
  props: {
      card: {
          type: Object,
          default: null
      },
  },

  data() { return {
    src:null
  }},

  created: async function() {
    this.src = await functions.getUrl(this.card.src);
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
  flex-direction: column;
  align-items: center;
  background-color: rgb(245, 150, 126);
  text-align: center;
  height: 20rem;
  width: 20rem;
  text-decoration: none !important;
  color:white;
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

.card:hover {
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
  transform: rotate(90deg);
}

/* Medium screens */
@media all and (max-width: 800px) {
  .card {
    /* When on medium sized screens, reduced size */
  font-size: 0.8rem;
  padding: 5px;
  width: max-content;
  height: 8rem;
  }
}

</style>
