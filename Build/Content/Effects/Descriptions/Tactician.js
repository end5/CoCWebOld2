define(["require", "exports", "Content/Effects/EffectType", "Engine/Effects/EffectDesc"], function (require, exports, EffectType_1, EffectDesc_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Tactician extends EffectDesc_1.EffectDesc {
        description(effect, character) {
            if (character.stats.spe >= 75)
                return "Increases critical hit chance by up to 10% (Intelligence-based).";
            else
                return "<b>You are too dumb to gain benefit from this perk.</b>";
        }
        constructor() {
            super(EffectType_1.EffectType.Tactician, "Tactician", "", "You choose the 'Tactician' perk, increasing critical hit chance by up to 10% (Intelligence-based).");
        }
    }
    exports.Tactician = Tactician;
});
//# sourceMappingURL=Tactician.js.map