<style>
    h1, h2, h3 { letter-spacing: 0.2rem; }
    </style>

Vue Dependency Injection
===
## TL;DR
Vue allows us to use **dependency injection** for fine control over dependencies. For suitable dependencies, e.g. a router service, we may replace 
```javascript
Vue.use(C)
```
with [provide/inject][9]; e.g.
```javascript
// parent component
@Component()
class ParentComponent extends Vue {
    @Provide(ROUTER) router = router;
}

// child component
@Component()
class ChildComponent extends Vue {
    @Inject(ROUTER) router;
}
```


## About
This repository contains a minimal proof of concept for a **Vue JS** app with **dependency injection** of a router service instead of

The project depends on the following packages 
+ [vue-class-component][1],
+ [vue-property-decorator][2] and
+ [vue-router][4]
+ [@babel/plugin-proposal-class-properties][6]

The first two packages allow us to write **Vue** components using ES5 class syntax leveraging decorators for compactness and clarity. 

A minimal router was implemented using Vue's `<component>` for dynamic component creation. The router will be used as the injected ressource.

## Installation
1. Clone this repository
2. Start the server
```bash
npm run serve
```
---

[1]: https://github.com/vuejs/vue-class-component
[2]: https://github.com/kaorun343/vue-property-decorator
[3]: https://github.com/loganfsmyth/babel-plugin-transform-decorators-legacy
[4]: https://github.com/vuejs/vue-router
[5]: https://github.com/babel/babel/issues/7831
[6]: https://github.com/babel/babel/tree/master/packages/babel-plugin-proposal-class-properties
[7]: https://github.com/vuejs/vue-cli
[8]: https://nodejs.org/en/download/
[9]: https://vuejs.org/v2/api/#provide-inject