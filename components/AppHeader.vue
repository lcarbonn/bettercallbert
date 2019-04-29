<template>
  <div class="header">
    <h1>Better Call Bert</h1>
    <h2 v-if="isAll">Agile Cards for coach memory failure</h2>
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
  letter-spacing: 1px;
  text-align: center;
  background-color: black;
  color: white;
}

.header h1 {
  font-weight: 500;
  font-size: 2rem;
}

.header h2 {
  font-weight: 300;
  font-size: 1.2rem;
}

</style>
