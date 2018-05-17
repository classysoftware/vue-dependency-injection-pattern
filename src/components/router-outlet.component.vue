<template>
    <div>
        <!-- <pre>constructor: {{constructor}}</pre><br/> -->
        <component v-if="C" v-bind:is="C"></component>
        <slot v-if="!C"></slot>
    </div>
</template>

<script>
import Vue from 'vue';
import Component from 'vue-class-component';
// export default {
//     data() {
//         return {
//             constructor: null
//         };
//     },
//     computed: {
//         component() {
//             this.constructor;
//         }
//     },
//     methods: {
//         updateComponent(C) {
//             this.constructor = C;
//         }
//     }
// }
@Component({
    name: 'router-outlet'
})
export default class RouterOutletComponent extends Vue {
    C = null;

    updateComponent(C) {
        this.C = C;
    }
}

</script>