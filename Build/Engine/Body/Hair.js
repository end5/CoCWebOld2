define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var HairType;
    (function (HairType) {
        HairType[HairType["NORMAL"] = 0] = "NORMAL";
        HairType[HairType["FEATHER"] = 1] = "FEATHER";
        HairType[HairType["GHOST"] = 2] = "GHOST";
        HairType[HairType["GOO"] = 3] = "GOO";
        HairType[HairType["ANEMONE"] = 4] = "ANEMONE";
    })(HairType = exports.HairType || (exports.HairType = {}));
    class Hair {
        constructor() {
            this.type = HairType.NORMAL;
            this.color = "black";
            this.length = 0;
        }
        serialize() {
            return {
                type: this.type,
                color: this.color,
                length: this.length
            };
        }
        deserialize(saveObject) {
            this.type = saveObject.type;
            this.color = saveObject.color;
            this.length = saveObject.length;
        }
    }
    exports.Hair = Hair;
});
//# sourceMappingURL=Hair.js.map