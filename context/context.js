const AsyncHooks = require('async_hooks');


// @ts-ignore
const context = new Map();

const init = function (asyncId, type, triggerAsyncId) {
    if (context.has(triggerAsyncId)) {
        context.set(asyncId, context.get(triggerAsyncId));
    }
};

const destroy = function (asyncId) {
    if (context.has(asyncId)) {
        context.delete(asyncId);
    }
};

const before = function (asyncId) {
    if (context.has(asyncId)) {

    }
};

const after = function (asyncId) {
    if (context.has(asyncId)) {

    }
};

const put = function (asyncId, data) {
    context.set(asyncId, data);
}

const get = function (asyncId) {
    return context.get(asyncId);
}

const hook = AsyncHooks.createHook({
    init: init,
    destroy: destroy,
    before: before,
    after: after
});

module.exports = class Context {
    static initialize() {
        hook.enable();
    }
    static shutdown() {
        hook.disable();
    }
    static get() {
        return get(AsyncHooks.executionAsyncId())
    }
    static put(data) {
        put(AsyncHooks.executionAsyncId(), data)
    }
}