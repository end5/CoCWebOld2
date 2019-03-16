define(["require", "exports", "Engine/Effects/EffectDesc", "Content/Effects/EffectType"], function (require, exports, EffectDesc_1, EffectType_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class SluttySeduction extends EffectDesc_1.EffectDesc {
        description(effect) {
            if (!effect.values.teaseDamage)
                effect.values.teaseDamage = 0;
            return "Increases odds of successfully teasing and lust damage of successful teases by " + effect.values.teaseDamage + " points.";
        }
        constructor() {
            super(EffectType_1.EffectType.SluttySeduction, "Slutty Seduction", "Your armor allows you access to 'Seduce', an improved form of 'Tease'.");
        }
    }
    exports.SluttySeduction = SluttySeduction;
});
//# sourceMappingURL=SluttySeduction.js.map