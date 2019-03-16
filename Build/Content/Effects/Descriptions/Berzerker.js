define(["require", "exports", "Content/Effects/EffectType", "Engine/Effects/EffectDesc"], function (require, exports, EffectType_1, EffectDesc_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Berzerker extends EffectDesc_1.EffectDesc {
        description(effect, character) {
            if (character.stats.str >= 75)
                return "Grants 'Berzerk' ability.";
            else
                return "<b>You aren't strong enough to benefit from this anymore.</b>";
        }
        constructor() {
            super(EffectType_1.EffectType.Berzerker, "Berzerker", "", "You choose the 'Berzerker' perk, which unlocks the 'Berzerk' magical ability.  Berzerking increases attack and lust resistance but reduces physical defenses.");
        }
    }
    exports.Berzerker = Berzerker;
});
//# sourceMappingURL=Berzerker.js.map