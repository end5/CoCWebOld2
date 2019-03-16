define(["require", "exports", "./KeyCombination"], function (require, exports, KeyCombination_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class KeyPair {
        constructor(primaryKey, secondaryKey) {
            this.primaryKey = primaryKey;
            this.secondaryKey = secondaryKey;
        }
        serialize() {
            return {
                primaryKey: this.primaryKey ? this.primaryKey.serialize() : undefined,
                secondaryKey: this.secondaryKey ? this.secondaryKey.serialize() : undefined
            };
        }
        deserialize(saveObject) {
            if (!this.primaryKey)
                this.primaryKey = new KeyCombination_1.KeyCombination();
            if (saveObject.primaryKey)
                this.primaryKey.deserialize(saveObject.primaryKey);
            if (!this.secondaryKey)
                this.secondaryKey = new KeyCombination_1.KeyCombination();
            if (saveObject.secondaryKey)
                this.secondaryKey.deserialize(saveObject.secondaryKey);
        }
    }
    exports.KeyPair = KeyPair;
});
//# sourceMappingURL=KeyPair.js.map