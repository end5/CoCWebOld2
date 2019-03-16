define(["require", "exports", "Engine/Effects/EffectDesc", "Content/Effects/EffectType"], function (require, exports, EffectDesc_1, EffectType_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class PiercedCrimstone extends EffectDesc_1.EffectDesc {
        description(effect) {
            if (!effect.values.minLust)
                effect.values.minLust = 0;
            return "Increases minimum lust by " + Math.round(effect.values.minLust) + ".";
        }
        constructor() {
            super(EffectType_1.EffectType.PiercedCrimstone, "Pierced: Crimstone", "You've been pierced with Crimstone and your lust seems to stay a bit higher than before.");
        }
    }
    exports.PiercedCrimstone = PiercedCrimstone;
});
//# sourceMappingURL=PiercedCrimstone.js.map