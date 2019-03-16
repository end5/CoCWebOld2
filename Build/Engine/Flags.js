define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class FlagDict {
        constructor() {
            this.defaultFlags = {};
            this.flags = {};
        }
        /**
         * Registers a new flag object. This is the default entry for the key.
         * @param key
         * @param entry
         */
        register(key, entry) {
            this.flags[key] = entry;
            this.defaultFlags[key] = JSON.parse(JSON.stringify(entry));
            return entry;
        }
        /**
         * Resets the flags.
         */
        reset() {
            this.overwriteFlags(JSON.parse(JSON.stringify(this.defaultFlags)));
        }
        overwriteFlags(otherFlags) {
            for (const key of Object.keys(this.flags)) {
                for (const valueKey of Object.keys(this.flags[key])) {
                    this.flags[key][valueKey] = otherFlags[key][valueKey];
                }
            }
        }
        serialize() {
            return this.flags;
        }
        deserialize(saveObject) {
            this.overwriteFlags(saveObject);
        }
    }
    exports.Flags = new FlagDict();
});
//# sourceMappingURL=Flags.js.map