define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var EarType;
    (function (EarType) {
        EarType[EarType["HUMAN"] = 0] = "HUMAN";
        EarType[EarType["HORSE"] = 1] = "HORSE";
        EarType[EarType["DOG"] = 2] = "DOG";
        EarType[EarType["COW"] = 3] = "COW";
        EarType[EarType["ELFIN"] = 4] = "ELFIN";
        EarType[EarType["CAT"] = 5] = "CAT";
        EarType[EarType["LIZARD"] = 6] = "LIZARD";
        EarType[EarType["BUNNY"] = 7] = "BUNNY";
        EarType[EarType["KANGAROO"] = 8] = "KANGAROO";
        EarType[EarType["FOX"] = 9] = "FOX";
        EarType[EarType["DRAGON"] = 10] = "DRAGON";
        EarType[EarType["RACCOON"] = 11] = "RACCOON";
        EarType[EarType["MOUSE"] = 12] = "MOUSE";
        EarType[EarType["FERRET"] = 13] = "FERRET";
    })(EarType = exports.EarType || (exports.EarType = {}));
    class Ears {
        constructor() {
            this.type = EarType.HUMAN;
        }
        serialize() {
            return {
                type: this.type,
            };
        }
        deserialize(saveObject) {
            this.type = saveObject.type;
        }
    }
    exports.Ears = Ears;
});
//# sourceMappingURL=Ears.js.map