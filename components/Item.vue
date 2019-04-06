<template>
  <div class="theme">{{ theme }}</div>
</template>

<script>

    export default {
        props: ['theme', 'color']
    }

</script>

<style>
.theme {
  font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI',
    Roboto, 'Helvetica Neue', Arial, sans-serif;
  font-weight: 500;
  font-size: 1.5rem;
  background-color: rgb(245, 150, 126);
  color: white;
  letter-spacing: 1px;
  text-align: center;
  height: 100%;
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

</style>
