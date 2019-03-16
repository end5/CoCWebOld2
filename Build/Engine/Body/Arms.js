define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var ArmType;
    (function (ArmType) {
        ArmType[ArmType["HUMAN"] = 0] = "HUMAN";
        ArmType[ArmType["HARPY"] = 1] = "HARPY";
        ArmType[ArmType["SPIDER"] = 2] = "SPIDER";
    })(ArmType = exports.ArmType || (exports.ArmType = {}));
    class Arms {
        constructor() {
            this.type = ArmType.HUMAN;
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
    exports.Arms = Arms;
});
//# sourceMappingURL=Arms.js.map