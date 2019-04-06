<template>
  <section class="wrapper">
    <AppHeader/>
    <div class="main">
      <article class="item" 
        v-for="theme in themes"
        v-bind:key="theme.id">
        <Item v-bind:theme="theme.title" v-bind:class="theme.color"/>
      </article>
    </div>
    <AppFooter/>
  </section>
</template>

<script>
import Logo from '~/components/Logo.vue'
import AppHeader from '~/components/AppHeader.vue'
import AppFooter from '~/components/AppFooter.vue'
import Item from '~/components/Item.vue'

export default {
  components: {
    Logo,
    AppFooter,
    AppHeader,
    Item
  },

  data() {return {
    themes: [
      { id: 1, title: 'Facilitation', color:'themeone' },
      { id: 2, title: 'Innovation Game', color:'themeone' },
      { id: 3, title: 'Lean', color:'themetwo' },
      { id: 4, title: 'Agile', color:'themetwo' },
      { id: 5, title: 'Scrum', color:'themetwo' },
      { id: 6, title: 'User Story', color:'themetwo' },
      { id: 7, title: 'Lean Startup', color:'themethree' },
      { id: 8, title: 'Design Thinking', color:'themethree' },
    ]
  }}

}
</script>

<style>

.wrapper {
  display: flex;  
  flex-flow: row wrap;
  font-weight: bold;
  text-align: center;
  min-height: 100vh;
  background-color: black;
}

.wrapper > * {
  padding: 5px;
  flex: 1 100%;
}

.main {
  display: flex;
  flex-flow: row wrap;
  justify-content: space-around;
  align-items: stretch;
}

.item {
  width:20rem;
  height: 20rem;
  margin: 5px;
}

/* Medium screens */
@media all and (max-width: 800px) {
  .item {
    /* When on medium sized screens, reduced size */
  width:10rem;
  height: 10rem;
  }
}

</style>
