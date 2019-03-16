define(["require", "exports", "Content/Effects/EffectType", "Engine/Effects/EffectDesc"], function (require, exports, EffectType_1, EffectDesc_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Archmage extends EffectDesc_1.EffectDesc {
        description(effect, character) {
            if (character.stats.int >= 75)
                return "Increases base spell strength by 50%.";
            else
                return "<b>You are too dumb to gain benefit from this perk.</b>";
        }
        constructor() {
            super(EffectType_1.EffectType.Archmage, "Archmage", "", "You choose the 'Archmage' perk, increasing base spell strength by 50%.");
        }
    }
    exports.Archmage = Archmage;
});
//# sourceMappingURL=Archmage.js.map