<template>
  <div id="app">
    <nav>
      <ul>
        <li><router-link to="/hello">hello</router-link></li>
        <li><router-link to="/bye">bye</router-link></li>
        </ul>
    </nav>
    <main>
      <router-outlet basePath="/" :routerTable="routerTable">
        Loading...
      </router-outlet>
    </main>
  </div>
</template>

<script>
import Vue from 'vue';
import Component from 'vue-class-component';
import { Provide } from 'vue-property-decorator';

import RouterOutletComponent from './router-outlet.component';
import RouterLinkComponent from './router-link.component';
import Router, { ROUTER } from '../services/router';
import routerTable from '../services/router-table';

// In a more elaborate scenario, we would probably define a pre-configured router for 
// basic app routing in another file and then export it from there.
const router = new Router();

@Component({
  name: 'app',
  components: {
    'router-outlet': RouterOutletComponent
    , 'router-link': RouterLinkComponent
  }
})
export default class App extends Vue {

  // Make the router service injectable in descendant components.
  @Provide(ROUTER) router = router;

  // Define a router table for the outlet.
  routerTable = routerTable;

  mounted() {
    // Navigate to root.
    this.router.navigateTo('/');
  }

}
</script>

<style>
html, body {
  padding: 0;
  margin: 0;
  width: 100%;
  height: 100%;
}

html {
  overflow-y: scroll;
  overflow-x: none;
}


#app {
  height: 100%;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 1rem 2rem;
  background-color: black;
}

nav ul {
  display: flex;
  list-style-type: none;
}

nave u li {
  float: left;
  margin-right: 2rem;
}

main {
  width: 100%;
  height: 100%;
  margin: 4rem auto;
}
</style>
