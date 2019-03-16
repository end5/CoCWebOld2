define(["require", "exports", "Content/Effects/EffectType", "Engine/Effects/EffectDesc"], function (require, exports, EffectType_1, EffectDesc_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class LightningStrikes extends EffectDesc_1.EffectDesc {
        description(effect, character) {
            if (character.stats.spe >= 60)
                return "Increases the attack damage for non-heavy weapons.</b>";
            else
                return "<b>You are too slow to benefit from this perk.</b>";
        }
        constructor() {
            super(EffectType_1.EffectType.LightningStrikes, "Lightning Strikes", "", "You choose the 'Lightning Strikes' perk, increasing the attack damage for non-heavy weapons.</b>");
        }
    }
    exports.LightningStrikes = LightningStrikes;
});
//# sourceMappingURL=LightningStrikes.js.map