define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var TailType;
    (function (TailType) {
        TailType[TailType["HORSE"] = 0] = "HORSE";
        TailType[TailType["DOG"] = 1] = "DOG";
        TailType[TailType["DEMONIC"] = 2] = "DEMONIC";
        TailType[TailType["COW"] = 3] = "COW";
        TailType[TailType["SPIDER_ABDOMEN"] = 4] = "SPIDER_ABDOMEN";
        TailType[TailType["BEE_ABDOMEN"] = 5] = "BEE_ABDOMEN";
        TailType[TailType["SHARK"] = 6] = "SHARK";
        TailType[TailType["CAT"] = 7] = "CAT";
        TailType[TailType["LIZARD"] = 8] = "LIZARD";
        TailType[TailType["BUNNY"] = 9] = "BUNNY";
        TailType[TailType["HARPY"] = 10] = "HARPY";
        TailType[TailType["KANGAROO"] = 11] = "KANGAROO";
        TailType[TailType["FOX"] = 12] = "FOX";
        TailType[TailType["DRACONIC"] = 13] = "DRACONIC";
        TailType[TailType["RACCOON"] = 14] = "RACCOON";
        TailType[TailType["MOUSE"] = 15] = "MOUSE";
        TailType[TailType["FERRET"] = 16] = "FERRET";
    })(TailType = exports.TailType || (exports.TailType = {}));
    class Tail {
        constructor(type = TailType.HORSE, vemon = 0, recharge = 0) {
            this.type = type;
            this.venom = vemon;
            this.recharge = recharge;
        }
        static FilterType(type) {
            return (tail) => {
                return tail.type === type;
            };
        }
        static HasType(type) {
            return (previousValue, currentValue) => {
                return previousValue || currentValue.type === type;
            };
        }
        serialize() {
            return {
                type: this.type,
                venom: this.venom,
                recharge: this.recharge
            };
        }
        deserialize(saveObject) {
            this.type = saveObject.type;
            this.venom = saveObject.venom;
            this.recharge = saveObject.recharge;
        }
    }
    Tail.VenomMost = (a, b) => {
        return a.venom - b.venom;
    };
    Tail.VenomLeast = (a, b) => {
        return b.venom - a.venom;
    };
    Tail.RechargeMost = (a, b) => {
        return a.recharge - b.recharge;
    };
    Tail.RechargeLeast = (a, b) => {
        return b.recharge - a.recharge;
    };
    Tail.HasOvipositor = (a) => {
        return a.type === TailType.BEE_ABDOMEN || a.type === TailType.SPIDER_ABDOMEN;
    };
    exports.Tail = Tail;
});
//# sourceMappingURL=Tail.js.map