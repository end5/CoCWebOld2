define(["require", "exports", "Engine/Effects/EffectDesc", "Content/Effects/EffectType"], function (require, exports, EffectDesc_1, EffectType_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class CleansingPalm extends EffectDesc_1.EffectDesc {
        description(effect, character) {
            if (character.stats.cor >= 10)
                return "<b>DISABLED</b> - Corruption too high!";
            else
                return super.description();
        }
        constructor() {
            super(EffectType_1.EffectType.CleansingPalm, "Cleansing Palm", "A ranged fighting technique of Jojo’s order, allows you to blast your enemies with waves of pure spiritual energy, weakening them and hurting the corrupt.");
        }
    }
    exports.CleansingPalm = CleansingPalm;
});
//# sourceMappingURL=CleansingPalm.js.map