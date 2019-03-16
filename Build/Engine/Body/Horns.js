define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var HornType;
    (function (HornType) {
        HornType[HornType["NONE"] = 0] = "NONE";
        HornType[HornType["DEMON"] = 1] = "DEMON";
        HornType[HornType["COW_MINOTAUR"] = 2] = "COW_MINOTAUR";
        HornType[HornType["DRACONIC_X2"] = 3] = "DRACONIC_X2";
        HornType[HornType["DRACONIC_X4_12_INCH_LONG"] = 4] = "DRACONIC_X4_12_INCH_LONG";
        HornType[HornType["ANTLERS"] = 5] = "ANTLERS";
    })(HornType = exports.HornType || (exports.HornType = {}));
    class Horns {
        constructor() {
            this.type = HornType.NONE;
            this.count = 0;
        }
        serialize() {
            return {
                type: this.type,
                count: this.count
            };
        }
        deserialize(saveObject) {
            this.type = saveObject.type;
            this.count = saveObject.count;
        }
    }
    exports.Horns = Horns;
});
//# sourceMappingURL=Horns.js.map