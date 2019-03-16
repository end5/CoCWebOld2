define(["require", "exports", "Engine/Utilities/List"], function (require, exports, List_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class ObservableList extends List_1.List {
        constructor() {
            super(...arguments);
            this.listeners = [];
        }
        add(item) {
            this.dispatch('add', item, this.length - 1, true);
            this.list.push(item);
            this.dispatch('add', item, this.length - 1, false);
        }
        remove(index) {
            if (index < 0 || index >= this.list.length)
                throw new RangeError('List index out of bounds');
            this.dispatch('remove', this.get(index), index, true);
            const values = this.list.splice(index, 1);
            this.dispatch('remove', values[0], index, false);
        }
        clear() {
            while (this.length > 0)
                this.remove(0);
        }
        on(key, listener, beforeChange) {
            this.listeners.push({ key, beforeChange: !!beforeChange, listener });
        }
        dispatch(key, value, index, beforeChange) {
            for (const entry of this.listeners)
                if (entry.key === key && entry.beforeChange === !!beforeChange)
                    entry.listener(value, index, this);
        }
        off(key, listener, beforeChange) {
            const index = this.listeners.findIndex((entry) => entry.key === key &&
                entry.listener === listener &&
                entry.beforeChange === !!beforeChange);
            if (index !== -1)
                this.listeners.splice(index, 1);
        }
    }
    exports.ObservableList = ObservableList;
});
//# sourceMappingURL=ObservableList.js.map