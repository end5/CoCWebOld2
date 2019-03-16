define(["require", "exports", "Content/Effects/EffectType", "Engine/Effects/EffectDesc"], function (require, exports, EffectType_1, EffectDesc_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class BrutalBlows extends EffectDesc_1.EffectDesc {
        description(effect, character) {
            if (character.stats.str >= 75)
                return "Reduces enemy armor with each hit.";
            else
                return "<b>You aren't strong enough to benefit from this anymore.</b>";
        }
        constructor() {
            super(EffectType_1.EffectType.BrutalBlows, "Brutal Blows", "", "You choose the 'Brutal Blows' perk, which reduces enemy armor with each hit.");
        }
    }
    exports.BrutalBlows = BrutalBlows;
});
//# sourceMappingURL=BrutalBlows.js.map