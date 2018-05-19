<template>
    <div>
        <!-- <pre>constructor: {{constructor}}</pre><br/> -->
        <component v-if="component" v-bind:is="component"></component>
        <slot v-if="!component"></slot>
    </div>
</template>

<script>
import Vue from 'vue';
import Component from 'vue-class-component';
import { Inject } from 'vue-property-decorator';

import { ROUTER } from '../services/router';

@Component({
    name: 'router-outlet'
})
export default class RouterOutletComponent extends Vue {

    @Inject(ROUTER) router;

    component = null;
    routeChangesSubscription = null;

    created() {
        this.routeChangesSubscription = this.router.routeChanges.subscribe(this.routeChanged)
    }

    destroyed() {
        this.routeChangesSubscription.unsubscribe();
    }

    routeChanged({path, component}) {
        this.component = component;
    }
}

</script>