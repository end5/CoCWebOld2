define(["require", "exports", "Content/Effects/EffectType", "Engine/Effects/EffectDesc"], function (require, exports, EffectType_1, EffectDesc_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class LungingAttacks extends EffectDesc_1.EffectDesc {
        description(effect, character) {
            if (character.stats.spe >= 75)
                return "Grants 50% armor penetration for standard attacks.";
            else
                return "<b>You are too slow to benefit from this perk.</b>";
        }
        constructor() {
            super(EffectType_1.EffectType.LungingAttacks, "Lunging Attacks", "", "You choose the 'Lunging Attacks' perk, granting 50% armor penetration for standard attacks.");
        }
    }
    exports.LungingAttacks = LungingAttacks;
});
//# sourceMappingURL=LungingAttacks.js.map