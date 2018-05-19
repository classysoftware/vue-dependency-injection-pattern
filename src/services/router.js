import { Subject } from 'rxjs/Subject';

export const ROUTER = Symbol('router');
export default class Router {

    // The active route.
    routeChanges = new Subject();

    // The outlets controlled by this router instance.
    outlets = {};

    /**
     * Register an outlet reference by a base path and associate it with a configuration.
     * Right now the configuration only maps sub paths of the base path to component constructors. 
     */
    register = (basePath, outletRef, config) => {
        if(basePath <= '') {
            throw new Error('Illegal argument: base path may not be the empty string.');
        }

        this.outlets[basePath] = {outletRef, config};
    }

    unregister = (basePath) => {
        this.outlets[basePath] = null;
    }

    navigateTo = (path) => {

        // Find a matching base path with longest prefix matching.
        const matchedBasePath = Object.keys(this.outlets)
            .reduce(
                (currentMatch, currentPath) => 
                path.startsWith(currentPath) && currentPath.length > currentMatch.length ? currentPath : currentMatch
                , ''
            );

        const matchedOutlet = this.outlets[matchedBasePath];
        if (matchedOutlet) {

            const {outletRef, config} = matchedOutlet;
            const matchedSubpath = path.substring(matchedBasePath.length);
            const matchedComponent = config[matchedSubpath];

            if (matchedComponent) {
               this.routeChanges.next({path, component: matchedComponent});
            } else {
                console.warn(`Unable to find matching component for subpath (base-path: "${matchedBasePath}"`)
            }

        } else {
            console.warn(`Unable to find a matching outlet for path (path: "${path}").`);
        }
    }
}