import invariant from 'invariant';

const eventTypeList = [
    'error', 'hmr', 'injectCallback', 'beforeCallback', 'beforeDispatch', 'afterDispatch', 'afterCallback'
];

class Event {

    constructor() {
        this.hooks = {};
        eventTypeList.forEach(event => this.hooks[event] = []);
    }

    on(type, handler) {
        const hooks = this.hooks;
        invariant(hooks[type], `shiner->on: unknown hook type: ${type}`);
        const fns = hooks[type];
        fns.push(handler);
        return this.off.bind(this, type, handler);
    }

    off(type, handler) {
        this.hooks[type] = handler ? this.hooks[type].filter(fn => fn !== handler) : [];
    }

    trigger(type, args) {
        const fns = this.hooks[type];
        for (const fn of fns) {
            fn.apply(null, args);
        }
    }

}

export default Event;
