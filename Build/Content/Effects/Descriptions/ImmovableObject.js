define(["require", "exports", "Content/Effects/EffectType", "Engine/Effects/EffectDesc"], function (require, exports, EffectType_1, EffectDesc_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class ImmovableObject extends EffectDesc_1.EffectDesc {
        description(effect, character) {
            if (character.stats.tou >= 75)
                return "Grants 20% physical damage reduction.</b>";
            else
                return "<b>You aren't tough enough to benefit from this anymore.</b>";
        }
        constructor() {
            super(EffectType_1.EffectType.ImmovableObject, "Immovable Object", "", "You choose the 'Immovable Object' perk, granting 20% physical damage reduction.</b>");
        }
    }
    exports.ImmovableObject = ImmovableObject;
});
//# sourceMappingURL=ImmovableObject.js.map