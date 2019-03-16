define(["require", "exports", "Engine/Utilities/SMath", "Content/Effects/EffectType", "Engine/Display/ContentView", "Engine/Effects/Effect"], function (require, exports, SMath_1, EffectType_1, ContentView_1, Effect_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Poison extends Effect_1.Effect {
        combatTurnStart(character) {
            if (character.effects.has(EffectType_1.EffectType.Medicine) && SMath_1.randInt(100) <= 14) {
                character.effects.removeByName(EffectType_1.EffectType.Poison);
                ContentView_1.CView.text("You manage to cleanse the poison from your system with your knowledge of medicine!");
            }
            else {
                character.combat.loseHP(8 + SMath_1.randInt(character.stats.maxHP / 20));
                ContentView_1.CView.text("The poison continues to work on your body, wracking you with pain!");
            }
            ContentView_1.CView.text("\n\n");
        }
    }
    exports.Poison = Poison;
});
//# sourceMappingURL=Poison.js.map