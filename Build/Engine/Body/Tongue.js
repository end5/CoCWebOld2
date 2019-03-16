define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var TongueType;
    (function (TongueType) {
        TongueType[TongueType["HUMAN"] = 0] = "HUMAN";
        TongueType[TongueType["SNAKE"] = 1] = "SNAKE";
        TongueType[TongueType["DEMONIC"] = 2] = "DEMONIC";
        TongueType[TongueType["DRACONIC"] = 3] = "DRACONIC";
    })(TongueType = exports.TongueType || (exports.TongueType = {}));
    class Tongue {
        constructor() {
            this.type = TongueType.HUMAN;
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
    exports.Tongue = Tongue;
});
//# sourceMappingURL=Tongue.js.map