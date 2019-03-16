define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var EyeType;
    (function (EyeType) {
        EyeType[EyeType["HUMAN"] = 0] = "HUMAN";
        EyeType[EyeType["FOUR_SPIDER_EYES"] = 1] = "FOUR_SPIDER_EYES";
        EyeType[EyeType["BLACK_EYES_SAND_TRAP"] = 2] = "BLACK_EYES_SAND_TRAP";
    })(EyeType = exports.EyeType || (exports.EyeType = {}));
    class Eyes {
        constructor() {
            this.type = EyeType.HUMAN;
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
    exports.Eyes = Eyes;
});
//# sourceMappingURL=Eyes.js.map