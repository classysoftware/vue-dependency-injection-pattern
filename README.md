<style>
    h1, h2, h3 { letter-spacing: 0.2rem; }
    </style>

Vue Dependency Injection
===
## TL;DR
The dependency injection pattern allows you to replace calls to `Vue.use(x)` with the pair `@Provide(X) x = x` and `@Inject(X) x;`  on parent and child component respectively (where `X` is a symbol identifying the injected resource). 

This is better for various reasons including but not limited to mocking depdencies in test suites.

## About this repository
This repository contains a minimal proof of concept for a **Vue JS** app with **dependency injection** instead of plugins. The project only depends on the following packages 
+ [vue-class-component][1],
+ [vue-property-decorator][2] and
+ [vue-router][4]

The first two packages allow us to write **Vue** components using ES5 class syntax plus component and property decorators. The router will be used as the injected ressource.

## Set Up
1. Create the project 
    ```bash
    vue create $APP_NAME
    ```
    * choose default settings `(babel, eslint)`
2. Install dependencies
    ```bash
    npm i -D vue-class-component vue-property-decorator vue-router
    ```
3. add decorator support
    ```bash
    {
        //...
        "babel": {
            //...
            "plugins": [
                //...
                ,  ["@babel/plugin-proposal-decorators", {
                  "legacy": true
                }]
            ]
        }
    }
    ```
    * this is the current way to enable decorator syntax with **babel**
    * previously, the plugin `babel-transform-plugin-decorators-legacy` was used which appears to be [broken][5] as of May 2018
---

[1]: https://github.com/vuejs/vue-class-component
[2]: https://github.com/kaorun343/vue-property-decorator
[3]: https://github.com/loganfsmyth/babel-plugin-transform-decorators-legacy
[4]: https://github.com/vuejs/vue-router
[5]: https://github.com/babel/babel/issues/7831