export default class Router {

    route = '/';
    outlets = {};

    registerOutlet = (id, outletRef, config) => {
        if (this.outlets[id]) {
            throw new Error(`Invalid argument: outlet already registered (id: "${id}")`);
        }

        this.outlets[id] = {outletRef, config};
    }

    unregisterOutlet = (id) => {
        if (!this.outlets[id]) {
            throw new Error(`Invalid argument: outlet not registered (id: "${id}")`);
        }

        this.outlets[id] = null;
    }

    navigateTo = (path) => {
        const outletId = Object.keys(this.outlets)
            .find(outletId => typeof this.outlets[outletId].config[path] !== undefined);

        if (outletId) {

            const descriptor = this.outlets[outletId]; 
            const outletRef = descriptor.outletRef;
            outletRef.updateComponent(descriptor.config[path]);

        }
    }
}