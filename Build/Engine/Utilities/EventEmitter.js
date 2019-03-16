define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class EventEmitter {
        constructor() {
            this.listeners = [];
        }
        on(key, listener) {
            this.listeners.push({ key, listener });
        }
        dispatch(key, value) {
            for (const entry of this.listeners)
                if (entry.key === key)
                    entry.listener(value);
        }
        off(key, listener) {
            const index = this.listeners.findIndex((entry) => entry.key === key && entry.listener === listener);
            if (index !== -1)
                this.listeners.splice(index, 1);
        }
    }
    exports.EventEmitter = EventEmitter;
});
//# sourceMappingURL=EventEmitter.js.map