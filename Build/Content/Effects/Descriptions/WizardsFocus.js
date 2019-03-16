define(["require", "exports", "Engine/Effects/EffectDesc", "Content/Effects/EffectType"], function (require, exports, EffectDesc_1, EffectType_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class WizardsFocus extends EffectDesc_1.EffectDesc {
        description(effect) {
            if (!effect.values.spellCost)
                effect.values.spellCost = 0;
            return "Increases your spell effect modifier by " + effect.values.spellCost * 100 + "%.";
        }
        constructor() {
            super(EffectType_1.EffectType.WizardsFocus, "Wizard's Focus", "Your wizard's staff grants you additional focus, reducing the use of fatigue for spells.");
        }
    }
    exports.WizardsFocus = WizardsFocus;
});
//# sourceMappingURL=WizardsFocus.js.map