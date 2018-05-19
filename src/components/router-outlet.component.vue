<template>
    <div>
        <component v-if="activeComponent" v-bind:is="activeComponent"></component>
        <slot v-if="!activeComponent"></slot>
    </div>
</template>

<script>
import Vue from 'vue';
import Component from 'vue-class-component';
import { Inject, Prop } from 'vue-property-decorator';

import { ROUTER } from '../services/router';

@Component({
    name: 'router-outlet',
    props: ['basePath', 'routerTable']
})
export default class RouterOutletComponent extends Vue {

    @Inject(ROUTER) router;
    @Prop(String) basePath;
    @Prop(Object) routerTable;

    activeComponent = null;
    routeChangesSubscription = null;

    created() {
        this.router.register(this.basePath, this.routerTable);
        this.routeChangesSubscription = this.router.routeChanges.subscribe(this.routeChanged);
    }

    destroyed() {
        this.routeChangesSubscription.unsubscribe();
    }

    routeChanged({path, basePath, subPath, component}) {
        // Ignore route changes not meant for this outlet.
        if (basePath === this.basePath) {
            console.info(`route-change (path: ${path}, base-path: ${basePath}, sub-path: ${subPath}): ${component.name}Component`);
            this.activeComponent = component;
        }
    }
}

</script>