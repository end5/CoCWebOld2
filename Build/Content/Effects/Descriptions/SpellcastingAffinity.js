define(["require", "exports", "Engine/Effects/EffectDesc", "Content/Effects/EffectType"], function (require, exports, EffectDesc_1, EffectType_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class SpellcastingAffinity extends EffectDesc_1.EffectDesc {
        description(effect) {
            if (!effect.values.spellCost)
                effect.values.spellCost = 0;
            return "Reduces spell costs by " + effect.values.spellCost + "%.";
        }
        constructor() {
            super(EffectType_1.EffectType.SpellcastingAffinity, "Spellcasting Affinity", "Reduces spell costs.");
        }
    }
    exports.SpellcastingAffinity = SpellcastingAffinity;
});
//# sourceMappingURL=SpellcastingAffinity.js.map