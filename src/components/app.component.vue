<template>
  <div id="app">
    <nav>
      <ul>
        <li><router-link to="/hello">hello</router-link></li>
        <li><router-link to="/bye">bye</router-link></li>
        </ul>
    </nav>
    <main>
      <router-outlet :ref="appOutletId">
        Loading...
        </router-outlet>
      </main>
  </div>
</template>

<script>
import Vue from 'vue';
import Component from 'vue-class-component';
import { Provide } from 'vue-property-decorator';

import routerService, { ROUTER_SERVICE } from '../services/router.service';
import RouterOutletComponent from './router-outlet.component';
import RouterLinkComponent from './router-link.component';
import HelloComponent from './hello.component';
import ByeComponent from './bye.component';
import Router from '../services/router';
// import RouterOutletComponent from '../components/router-outlet.component';

@Component({
  name: 'app',
  components: {
    'router-outlet': RouterOutletComponent,
    'router-link': RouterLinkComponent
  }
})
export default class App extends Vue {

  @Provide(ROUTER_SERVICE) routerService = routerService;
  appOutletId = 'app-router-outlet';

  mounted() {
    const appOutletRef = this.$refs[this.appOutletId];
    this.routerService.registerOutlet(this.appOutletId, appOutletRef, {
      '/hello': HelloComponent,
      '/bye': ByeComponent,
      '*': HelloComponent
    });
    this.routerService.navigateTo('/hello');
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
