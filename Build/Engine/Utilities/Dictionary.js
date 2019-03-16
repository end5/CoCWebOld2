define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Dictionary {
        constructor() {
            this.dictionary = {};
        }
        get(key) {
            return this.dictionary[key];
        }
        set(key, entry) {
            this.dictionary[key] = entry;
        }
        remove(key) {
            delete this.dictionary[key];
        }
        has(key) {
            return !!this.dictionary[key];
        }
        keys() {
            return Object.keys(this.dictionary);
        }
        entries() {
            return Object.keys(this.dictionary).map((key) => [key, this.dictionary[key]]);
        }
        values() {
            return Object.keys(this.dictionary).map((key) => this.dictionary[key]);
        }
        clear() {
            this.dictionary = {};
        }
        [Symbol.iterator]() {
            let counter = 0;
            const list = this.dictionary;
            return {
                next() {
                    return {
                        done: counter === Object.keys(list).length,
                        value: list[Object.keys(list)[counter++]]
                    };
                }
            };
        }
        serialize() {
            const saveObject = {};
            const keys = this.keys();
            for (const key of keys) {
                const entry = this.get(key);
                if (entry && 'serialize' in entry && entry.serialize)
                    saveObject[key] = entry.serialize();
                else
                    saveObject[key] = entry;
            }
            return saveObject;
        }
        deserialize(saveObject, objectConstructor, ...args) {
            const keys = Object.keys(saveObject);
            this.clear();
            for (const key of keys) {
                let entry = saveObject[key];
                if (objectConstructor) {
                    entry = new (Function.prototype.bind.apply(objectConstructor, [args]))();
                    if (entry.deserialize)
                        entry.deserialize(saveObject[key]);
                }
                else
                    this.set(key, entry);
            }
        }
    }
    exports.Dictionary = Dictionary;
});
//# sourceMappingURL=Dictionary.js.map