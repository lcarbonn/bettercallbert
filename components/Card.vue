<template>
    <nuxt-link :to="'cards/'+card.id" class="card" v-bind:class="card.color">
      {{ card.title }}
      <img v-if="card.src!=null" class="image" v-bind:src="'/cards/'+card.src"/>
    </nuxt-link>
</template>

<script>

  export default {
    props: {
        card: {
            type: Object,
            default: null
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
  flex-direction: column;
  background-color: rgb(245, 150, 126);
  text-align: center;
  height: 100%;
  text-decoration: none !important;
  color:white;
}

p {
  font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI',
    Roboto, 'Helvetica Neue', Arial, sans-serif;
  font-weight: 500;
  font-size: 1.5rem;
  letter-spacing: 1px;
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
  transform: rotate(90deg);
  max-height: 100%;
  max-width: 100%;
  object-fit: contain;
}
</style>
