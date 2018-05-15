import VueRouter from 'vue-router'

import Hello from '../components/hello.component.vue';
import Bye from '../components/bye.component.vue';

const routes = [
    { path: '/', alias: '/hello', component: Hello },
    { path: '/bye', component: Bye }
];

const router = new VueRouter({
    mode: 'history',
    base: __dirname,
    routes
})

export default router;
export const ROUTER = Symbol('router');

