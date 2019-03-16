define(["require", "exports", "Engine/Utilities/Dictionary", "Engine/Effects/EffectDesc"], function (require, exports, Dictionary_1, EffectDesc_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class EffectDescDict extends Dictionary_1.Dictionary {
        add(key, name, desc, longDesc) {
            this.set(key, new EffectDesc_1.EffectDesc(key, name, desc, longDesc));
        }
        get(name) {
            if (this.has(name))
                return super.get(name);
            else
                return new EffectDesc_1.EffectDesc(name, name, '');
        }
    }
    exports.EffectDescLib = new EffectDescDict();
});
//# sourceMappingURL=EffectDescLib.js.map