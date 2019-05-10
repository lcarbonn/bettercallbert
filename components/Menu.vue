<template>
  <b-navbar toggleable="lg" variant="dark" type="dark">
    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav align="left">
        <b-nav-item>
          <a href="#" class="menu-item" v-bind:class="{activelink:isActive('')}" 
          v-on:click="setActive('')">All</a>
        </b-nav-item>
        <b-nav-item v-for="menu in menus" v-bind:key="menu.id">
          <a href="#" class="menu-item" v-bind:class="[{activelink:isActive(menu.id)}, menu.color]" 
          v-on:click="setActive(menu.id)">{{menu.title}}</a>
        </b-nav-item>
      </b-navbar-nav>
    </b-collapse>
    <b-navbar-nav align="left">
      <b-nav-item>
        <b-nav-form v-on:submit.prevent>
          <b-form-input v-model="textsearch" v-on:keyup="search()"></b-form-input>
        </b-nav-form>
      </b-nav-item>
    </b-navbar-nav>
  </b-navbar>
</template>

<script>

  export default {
    props: {
        menus: {
            type: Array,
            default: null
        }
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
        this.textsearch='';
        this.activeMenu = menu;
        this.$emit('filter-theme', menu);
      },
      search : function() {
        this.activeMenu = '';
        this.$emit('search', this.textsearch)
      }
    }
  }

</script>

<style scoped>

.menu-item {
  text-decoration: none !important;
  color:grey;
  border-top: 1px #e94f2b solid;
}

.activelink {
  color: white;
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
</style>
