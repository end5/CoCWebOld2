define(["require", "exports", "Engine/Effects/EffectDesc", "Content/Effects/EffectType"], function (require, exports, EffectDesc_1, EffectType_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class PiercedFertite extends EffectDesc_1.EffectDesc {
        description(effect) {
            if (!effect.values.cumQuantity)
                effect.values.cumQuantity = 0;
            if (!effect.values.fertility)
                effect.values.fertility = 0;
            return "Increases cum production by " + Math.round(2 * effect.values.cumQuantity) + "% and fertility by " + Math.round(effect.values.fertility) + ".";
        }
        constructor() {
            super(EffectType_1.EffectType.PiercedFertite, "Pierced: Fertite", "You've been pierced with Fertite and any male or female organs have become more fertile.");
        }
    }
    exports.PiercedFertite = PiercedFertite;
});
//# sourceMappingURL=PiercedFertite.js.map