<template>
  <div class="header">
    <header>Better Call Bert</header>
    <p v-if="isAll">Agile Cards for coach memory failure</p>
  </div>
</template>

<script>

  export default {
    props: {
      isAll:false
    }
  }

</script>

<style scoped>

.header {
  font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI',
    Roboto, 'Helvetica Neue', Arial, sans-serif;
  font-weight: 500;
  font-size: 2rem;
  letter-spacing: 1px;
  text-align: center;
  background-color: black;
  color: white;
}

</style>
