<template>
    <nuxt-link :to="'themes/'+theme.id" class="theme" v-bind:class="theme.color">
      {{ theme.title }}
      <img v-if="theme.src!=null" class="image" v-bind:src="'/cards/'+theme.src"/>
    </nuxt-link>
</template>

<script>

  export default {
    props: {
        theme: {
            type: Object,
            default: null
        }
    }

    // created() {
    //   alert(this.id);
    // }

  }

</script>

<style scoped>
.theme {
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

.theme:hover {
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
