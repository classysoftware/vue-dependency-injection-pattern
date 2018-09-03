<template>
    <a v-if="to" v-bind:href="to" v-on:click.prevent="clicked()" disabled>
        <slot></slot>
    </a>
</template>

<script>
import Vue from 'vue';
import Component from 'vue-class-component';
import { Inject } from 'vue-property-decorator';
import { ROUTER } from '../services/router';

@Component({
    name: 'router-link',
    // `@Prop() to` results in a warning, so we resort to declaring the `to` props in `@Component.props`.
    props: ['to']
})
export default class RouterLinkComponent extends Vue {

    @Inject(ROUTER) router;

    clicked() {
        // Tell the router to navigate to the path passed via the "to" props.
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