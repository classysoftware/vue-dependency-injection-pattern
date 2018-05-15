<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import Vue from 'vue';
import Component from 'vue-class-component';
import { Provide } from 'vue-property-decorator';

import Router, { ROUTER } from '../services/router.service';

@Component()
export default class App extends Vue {
  @Provide(ROUTER) router;
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
