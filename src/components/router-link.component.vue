<template>
    <a v-if="to" v-bind:href="to" v-on:click.prevent="clicked()" disabled>
        <slot></slot>
    </a>
</template>

<script>
import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop, Inject } from 'vue-property-decorator';
import { ROUTER } from '../services/router';

@Component({
    name: 'router-link',
    props: ['to']
})
export default class RouterLinkComponent extends Vue {

//    @Prop(String) to = null;
    @Inject(ROUTER) router;

    clicked() {
        // tell the router to navigate to the path passed via the "to" props.
        this.router.navigateTo(this.to);
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