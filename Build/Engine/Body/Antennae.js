define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var AntennaeType;
    (function (AntennaeType) {
        AntennaeType[AntennaeType["NONE"] = 0] = "NONE";
        AntennaeType[AntennaeType["BEE"] = 1] = "BEE";
    })(AntennaeType = exports.AntennaeType || (exports.AntennaeType = {}));
    class Antennae {
        constructor() {
            this.type = AntennaeType.NONE;
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
    exports.Antennae = Antennae;
});
//# sourceMappingURL=Antennae.js.map