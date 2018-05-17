<template>
    <a v-if="to" v-bind:href="to" v-on:click.prevent="linkClicked()" disabled>
        <slot></slot>
    </a>
</template>

<script>
import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop, Inject } from 'vue-property-decorator';
import { ROUTER_SERVICE } from '../services/router.service';

@Component({
    name: 'router-link',
    props: ['to']
})
export default class RouterOutletComponent extends Vue {

//    @Prop(String) to = null;
    @Inject(ROUTER_SERVICE) routerService;

    linkClicked() {
        this.routerService.navigateTo(this.to);
    }    

}
</script>

<style scoped>
    a {
        padding: 2rem 1rem;
        color: white;
        text-decoration: none;
        text-transform: uppercase;
        letter-spacing: 0.2rem;
        font-weight: bold;
    }
</style>