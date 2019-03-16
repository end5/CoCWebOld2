define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class EffectDesc {
        constructor(key, name, desc, longDesc) {
            this.key = key;
            this.name = name;
            this.desc = desc || this.name;
            this.longDesc = longDesc || this.desc;
        }
        description(effect, char) {
            return this.desc;
        }
    }
    exports.EffectDesc = EffectDesc;
});
//# sourceMappingURL=EffectDesc.js.map