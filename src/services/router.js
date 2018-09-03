import { Subject } from 'rxjs/Subject';

export const ROUTER = Symbol('router');
export default class Router {

    // The active route.
    routeChanges = new Subject();

    // The router configuration.
    configuration = {};

    /**
     * Register an outlet reference by a base path and associate it with a configuration.
     * Right now the configuration only maps sub paths of the base path to component constructors. 
     */
    register = (basePath, routerTable) => {
        if(basePath <= '') {
            throw new Error('Illegal argument: base path may not be the empty string.');
        }

        this.configuration[basePath] = routerTable;
    }

    unregister = (basePath) => {
        this.configuration[basePath] = null;
    }

    navigateTo = (path) => {

        // Find a matching base path with longest prefix matching.
        const matchedBasePath = Object.keys(this.configuration)
            .reduce(
                (currentMatch, currentPath) => 
                path.startsWith(currentPath) && currentPath.length > currentMatch.length ? currentPath : currentMatch
                , ''
            );

        const matchedRouterTable = this.configuration[matchedBasePath];
        if (matchedRouterTable) {

            // Determine the component matched by the subpath.
            const matchedSubpath = path.substr(matchedBasePath.length);
            const matchedComponent = matchedRouterTable[matchedSubpath];

            // Emit the path and matched component or log a warning.
            if (matchedComponent) {
               this.routeChanges.next({
                   path
                   , basePath: matchedBasePath
                   , subPath: matchedSubpath
                   , component: matchedComponent
                });
            } else {
                // eslint-disable-next-line
                console.warn(`Unable to find matching component for subpath (base-path: "${matchedBasePath}"`)
            }

        } else {
            // eslint-disable-next-line
            console.warn(`Unable to find a matching outlet for path (path: "${path}").`);
        }
    }
}