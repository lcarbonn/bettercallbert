<template>
  <ul class="menu">
    <li v-if="!isRoot"><nuxt-link :to="'/'" class="menu-item menu-link">Home</nuxt-link></li>
    <li v-if="isRoot" class="hideOnSmall">
      <a href="#" class="menu-item menu-link" v-bind:class="{activelink:isActive('')}" v-on:click="setActive('')" v-on:click.stop="$emit('filter-theme')">All</a>
    </li>
    <li v-for="menu in menus" v-bind:key="menu.id" v-bind:class="menu.color" class="menu-item hideOnSmall">
      <a href="#" class="menu-link" v-bind:class="{activelink:isActive(menu.id)}" v-on:click="setActive(menu.id)" v-on:click.stop="$emit('filter-theme', menu.id)">{{menu.title}}</a>
    </li>
    <li v-if="isRoot">
      <form v-on:submit.prevent>
        <input id="search" v-model="textsearch" v-on:keyup="$emit('search', textsearch)">
      </form>
    </li>
  </ul>
</template>

<script>

  export default {
    props: {
        menus: {
            type: Array,
            default: null
        },
      isRoot:false
    },

    data() {return {
      textsearch:'',
      activeMenu:''
    }},

    methods: {
      isActive : function(menu) {
        console.log('active menu:'+this.activeMenu);
        if(menu==this.activeMenu) return true;
        else return false;
      },
      setActive : function (menu) {
        console.log('menu selected:'+menu);
        this.activeMenu ='';
        this.activeMenu = menu;
      }
    }
  }

</script>

<style scoped>

.menu {
  display: flex;
  flex-direction: row;
  text-align: left;
  justify-content: center;  
  margin: 5px;
}

.menu li {
  list-style: none;
  margin-right: 5px;
}

.menu-link {
  text-decoration: none !important;
  color:grey;
}

.activelink {
  color: white;
}

.menu-item {
    border-top: 1px #e94f2b solid;
}

.themeone {
  border-top-color: rgb(245, 150, 126);
}
.themetwo {
  border-top-color: rgb(103, 200, 198);
}
.themethree {
  border-top-color: rgb(178, 209, 127);
}

.menu li:hover {
  color:white;
}

.menu input {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  border: 1px solid grey;
  font-size: 1rem;
  color: grey;
  margin-left: 5px;
  outline: none;
  vertical-align: middle !important;
  background: black url("/search.png") no-repeat;
  background-size: 1.2rem;
  padding : 0 1.5rem 0 1.5rem;
  border-radius: 1.5rem;
}


/* Medium screens */
@media all and (max-width: 820px) {
  .hideOnSmall {
    /* When on medium sized screens, reduced size */
    /* visibility: hidden; */
    display: none;
  }
}
</style>
