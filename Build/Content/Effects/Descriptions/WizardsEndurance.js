define(["require", "exports", "Engine/Effects/EffectDesc", "Content/Effects/EffectType"], function (require, exports, EffectDesc_1, EffectType_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class WizardsEndurance extends EffectDesc_1.EffectDesc {
        description(effect) {
            if (!effect.values.spellCost)
                effect.values.spellCost = 0;
            return "Reduces fatigue cost of spells by " + effect.values.spellCost + "%.";
        }
        constructor() {
            super(EffectType_1.EffectType.WizardsEndurance, "Wizard's Endurance", "Your spellcasting equipment makes it harder for spell-casting to fatigue you!");
        }
    }
    exports.WizardsEndurance = WizardsEndurance;
});
//# sourceMappingURL=WizardsEndurance.js.map