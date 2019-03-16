define(["require", "exports", "Content/Effects/EffectType", "Engine/Effects/EffectDesc"], function (require, exports, EffectType_1, EffectDesc_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Resolute extends EffectDesc_1.EffectDesc {
        description(effect, character) {
            if (character.stats.tou >= 75)
                return "Grants immunity to stuns and some statuses.</b>";
            else
                return "<b>You aren't tough enough to benefit from this anymore.</b>";
        }
        constructor() {
            super(EffectType_1.EffectType.Resolute, "Resolute", "", "You choose the 'Resolute' perk, granting immunity to stuns and some statuses.</b>");
        }
    }
    exports.Resolute = Resolute;
});
//# sourceMappingURL=Resolute.js.map