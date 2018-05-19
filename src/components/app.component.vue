<template>
  <div id="app">
    <nav>
      <ul>
        <li><router-link to="/hello">hello</router-link></li>
        <li><router-link to="/bye">bye</router-link></li>
        </ul>
    </nav>
    <main>
      <!-- 
        Retain a reference to the router outlet to be able to register it with the 
        router. The router outlet receives the component matched to a given path by
        the router and renders it.
      -->
      <router-outlet :ref="routerOutletId">
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
import HelloComponent from './hello.component';
import ByeComponent from './bye.component';
import Router, { ROUTER } from '../services/router';

// In a more elaborate scenario, we would probably define a pre-configured router 
// in another file and then export this instead. 
const router = new Router();

// Define a simple router configuration with two components.
const routerOutletConfiguration = {
  'hello': HelloComponent
  , 'bye': ByeComponent
  , '': HelloComponent
};

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

  // Define a router outlet id to identify the router outlet used by the app.
  routerOutletId = 'app-router-outlet';

  mounted() {

    // Register the router outlet and associate it with a configuration.
    const routerOutletRef = this.$refs[this.routerOutletId];
    this.router.register('/', routerOutletRef, routerOutletConfiguration);

    // Navigate to root.
    this.router.navigateTo('/');
  }

}
</script>

<style>
html, body {
  padding: 0;
  margin: 0;
  overflow-y: scroll;
  overflow-x: none;
  width: 100%;
  height: 100%;
}

#app {
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
  margin: 4rem auto;
}
</style>
