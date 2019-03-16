define(["require", "exports", "Engine/Combat/Actions/CombatAction", "Content/Effects/EffectType"], function (require, exports, CombatAction_1, EffectType_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class PlayerSpellAction extends CombatAction_1.CombatAction {
        canUse(character, monster) {
            if (character.effects.has(EffectType_1.EffectType.BloodMage) || character.stats.fatigue + this.spellCost(character) <= 100) {
                return { canUse: false, reasonCannotUse: "You are too tired to cast this spell." };
            }
            return { canUse: true };
        }
        spellCost(character) {
            // Addiditive mods
            let mod = this.baseCost;
            let costPercent = 100;
            // Limiting it and multiplicative mods
            if (character.effects.has(EffectType_1.EffectType.BloodMage) && costPercent < 50)
                costPercent = 50;
            mod *= costPercent / 100;
            if (character.effects.has(EffectType_1.EffectType.HistoryScholar) && mod > 2)
                mod *= .8;
            if (character.effects.has(EffectType_1.EffectType.BloodMage) && mod < 5)
                mod = 5;
            else if (mod < 2)
                mod = 2;
            mod = Math.round(mod * 100) / 100;
            return mod;
        }
    }
    exports.PlayerSpellAction = PlayerSpellAction;
});
//# sourceMappingURL=PlayerSpellAction.js.map