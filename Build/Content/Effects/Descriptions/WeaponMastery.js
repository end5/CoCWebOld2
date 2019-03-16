define(["require", "exports", "Content/Effects/EffectType", "Engine/Effects/EffectDesc"], function (require, exports, EffectType_1, EffectDesc_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class WeaponMastery extends EffectDesc_1.EffectDesc {
        description(effect, character) {
            if (character.stats.str > 60)
                return "Doubles damage bonus of weapons classified as 'Large'.";
            else
                return "<b>You aren't strong enough to benefit from this anymore.</b>";
        }
        constructor() {
            super(EffectType_1.EffectType.WeaponMastery, "Weapon Mastery", "", "You choose the 'Weapon Mastery' perk, doubling the effectiveness of large weapons.");
        }
    }
    exports.WeaponMastery = WeaponMastery;
});
//# sourceMappingURL=WeaponMastery.js.map