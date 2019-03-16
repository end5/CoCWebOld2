define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var SkinType;
    (function (SkinType) {
        SkinType[SkinType["PLAIN"] = 0] = "PLAIN";
        SkinType[SkinType["FUR"] = 1] = "FUR";
        SkinType[SkinType["SCALES"] = 2] = "SCALES";
        SkinType[SkinType["GOO"] = 3] = "GOO";
        SkinType[SkinType["UNDEFINED"] = 4] = "UNDEFINED";
    })(SkinType = exports.SkinType || (exports.SkinType = {}));
    class Skin {
        constructor() {
            this.type = SkinType.PLAIN;
            this.tone = "albino";
            this.desc = "skin";
            this.adj = "";
        }
        serialize() {
            return {
                type: this.type,
                tone: this.tone,
                desc: this.desc,
                adj: this.adj
            };
        }
        deserialize(saveObject) {
            this.type = saveObject.type;
            this.tone = saveObject.tone;
            this.desc = saveObject.desc;
            this.adj = saveObject.adj;
        }
    }
    exports.Skin = Skin;
});
//# sourceMappingURL=Skin.js.map