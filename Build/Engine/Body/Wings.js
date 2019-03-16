define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var WingType;
    (function (WingType) {
        WingType[WingType["NONE"] = 0] = "NONE";
        WingType[WingType["BEE_LIKE_SMALL"] = 1] = "BEE_LIKE_SMALL";
        WingType[WingType["BEE_LIKE_LARGE"] = 2] = "BEE_LIKE_LARGE";
        WingType[WingType["HARPY"] = 3] = "HARPY";
        WingType[WingType["IMP"] = 4] = "IMP";
        WingType[WingType["BAT_LIKE_TINY"] = 5] = "BAT_LIKE_TINY";
        WingType[WingType["BAT_LIKE_LARGE"] = 6] = "BAT_LIKE_LARGE";
        WingType[WingType["SHARK_FIN"] = 7] = "SHARK_FIN";
        WingType[WingType["FEATHERED_LARGE"] = 8] = "FEATHERED_LARGE";
        WingType[WingType["DRACONIC_SMALL"] = 9] = "DRACONIC_SMALL";
        WingType[WingType["DRACONIC_LARGE"] = 10] = "DRACONIC_LARGE";
        WingType[WingType["GIANT_DRAGONFLY"] = 11] = "GIANT_DRAGONFLY";
    })(WingType = exports.WingType || (exports.WingType = {}));
    class Wings {
        constructor() {
            this.type = WingType.NONE;
            this.desc = "non-existant";
        }
        serialize() {
            return {
                type: this.type,
                desc: this.desc
            };
        }
        deserialize(saveObject) {
            this.type = saveObject.type;
            this.desc = saveObject.desc;
        }
    }
    exports.Wings = Wings;
});
//# sourceMappingURL=Wings.js.map