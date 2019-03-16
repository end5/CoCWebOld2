define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var LegType;
    (function (LegType) {
        LegType[LegType["HUMAN"] = 0] = "HUMAN";
        LegType[LegType["HOOFED"] = 1] = "HOOFED";
        LegType[LegType["DOG"] = 2] = "DOG";
        LegType[LegType["NAGA"] = 3] = "NAGA";
        LegType[LegType["CENTAUR"] = 4] = "CENTAUR";
        LegType[LegType["DEMONIC_HIGH_HEELS"] = 5] = "DEMONIC_HIGH_HEELS";
        LegType[LegType["DEMONIC_CLAWS"] = 6] = "DEMONIC_CLAWS";
        LegType[LegType["BEE"] = 7] = "BEE";
        LegType[LegType["GOO"] = 8] = "GOO";
        LegType[LegType["CAT"] = 9] = "CAT";
        LegType[LegType["LIZARD"] = 10] = "LIZARD";
        LegType[LegType["PONY"] = 11] = "PONY";
        LegType[LegType["BUNNY"] = 12] = "BUNNY";
        LegType[LegType["HARPY"] = 13] = "HARPY";
        LegType[LegType["KANGAROO"] = 14] = "KANGAROO";
        LegType[LegType["CHITINOUS_SPIDER_LEGS"] = 15] = "CHITINOUS_SPIDER_LEGS";
        LegType[LegType["DRIDER_LOWER_BODY"] = 16] = "DRIDER_LOWER_BODY";
        LegType[LegType["FOX"] = 17] = "FOX";
        LegType[LegType["DRAGON"] = 18] = "DRAGON";
        LegType[LegType["RACCOON"] = 19] = "RACCOON";
        LegType[LegType["FERRET"] = 20] = "FERRET";
    })(LegType = exports.LegType || (exports.LegType = {}));
    class Legs {
        constructor() {
            this.type = LegType.HUMAN;
        }
        isBiped() {
            // Naga/Centaur
            if (this.type === LegType.NAGA || this.type === LegType.CENTAUR)
                return false;
            if (this.type === LegType.GOO || this.type === LegType.PONY)
                return false;
            return true;
        }
        isNaga() {
            if (this.type === LegType.NAGA)
                return true;
            return false;
        }
        isTaur() {
            if (this.type === LegType.CENTAUR || this.type === LegType.PONY)
                return true;
            return false;
        }
        isDrider() {
            return (this.type === LegType.DRIDER_LOWER_BODY);
        }
        isGoo() {
            if (this.type === LegType.GOO)
                return true;
            return false;
        }
        serialize() {
            return {
                type: this.type
            };
        }
        deserialize(saveObject) {
            this.type = saveObject.type;
        }
    }
    exports.Legs = Legs;
});
//# sourceMappingURL=Legs.js.map