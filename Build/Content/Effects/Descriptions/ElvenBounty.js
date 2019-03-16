define(["require", "exports", "Engine/Effects/EffectDesc", "Content/Effects/EffectType"], function (require, exports, EffectDesc_1, EffectType_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class ElvenBounty extends EffectDesc_1.EffectDesc {
        description(effect) {
            if (!effect.values.fertility)
                effect.values.fertility = 0;
            if (!effect.values.cumQuantity)
                effect.values.cumQuantity = 0;
            return "Increases fertility by " + effect.values.fertility + "% and cum production by " + effect.values.cumQuantity + "mLs.";
        }
        constructor() {
            super(EffectType_1.EffectType.ElvenBounty, "Elven Bounty", "After your encounter with an elf, her magic has left you with increased fertility and virility.");
        }
    }
    exports.ElvenBounty = ElvenBounty;
});
//# sourceMappingURL=ElvenBounty.js.map