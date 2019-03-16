define(["require", "exports", "Engine/Effects/EffectDesc", "Content/Effects/EffectType"], function (require, exports, EffectDesc_1, EffectType_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class PentUp extends EffectDesc_1.EffectDesc {
        description(effect) {
            if (!effect.values.minLust)
                effect.values.minLust = 0;
            return "Increases minimum lust by " + Math.round(effect.values.minLust) + " and makes you more vulnerable to seduction.";
        }
        constructor() {
            super(EffectType_1.EffectType.PentUp, "Pent Up", "Increases minimum lust and makes you more vulnerable to seduction");
        }
    }
    exports.PentUp = PentUp;
});
//# sourceMappingURL=PentUp.js.map