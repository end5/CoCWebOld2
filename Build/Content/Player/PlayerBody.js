define(["require", "exports", "Engine/Body/Body", "Content/Effects/EffectType", "Content/Scenes/Places/TelAdre/UmasShop"], function (require, exports, Body_1, EffectType_1, UmasShop_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class PlayerBody extends Body_1.Body {
        constructor(player) {
            super();
            this.player = player;
        }
        get femininity() {
            return this.femStat;
        }
        set femininity(value) {
            const umasMassage = this.player.effects.getByName(EffectType_1.EffectType.UmasMassage);
            if (umasMassage && umasMassage.values.type && umasMassage.values.type === UmasShop_1.MASSAGE_MODELLING_BONUS && umasMassage.values.bonusValue)
                this.femStat += umasMassage.values.bonusValue;
            super.femininity = value;
        }
    }
    exports.PlayerBody = PlayerBody;
});
//# sourceMappingURL=PlayerBody.js.map