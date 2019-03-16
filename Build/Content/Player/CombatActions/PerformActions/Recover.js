define(["require", "exports", "Engine/Combat/Actions/CombatAction", "Engine/Display/ContentView", "Engine/Combat/Actions/CombatActionType", "Content/Effects/EffectType"], function (require, exports, CombatAction_1, ContentView_1, CombatActionType_1, EffectType_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Recover extends CombatAction_1.CombatAction {
        constructor() {
            super(...arguments);
            this.name = "Recover";
            this.type = CombatActionType_1.CombatActionType.Attack;
        }
        canUse(character, target) {
            return { canUse: character.effects.has(EffectType_1.EffectType.IsabellaStunned) ||
                    character.effects.has(EffectType_1.EffectType.Stunned) ||
                    character.effects.has(EffectType_1.EffectType.Whispered) ||
                    character.effects.has(EffectType_1.EffectType.Confusion) };
        }
        use(character, target) {
            if (character.effects.has(EffectType_1.EffectType.IsabellaStunned) || character.effects.has(EffectType_1.EffectType.Stunned)) {
                ContentView_1.CView.text("\n<b>You're too stunned to attack!</b>  All you can do is wait and try to recover!");
                // MainScreen.getBottomButton(0).modify("Recover", wait);
            }
            else if (character.effects.has(EffectType_1.EffectType.Whispered)) {
                ContentView_1.CView.text("\n<b>Your mind is too addled to focus on combat!</b>  All you can do is try and recover!");
                // MainScreen.getBottomButton(0).modify("Recover", wait);
            }
            else if (character.effects.has(EffectType_1.EffectType.Confusion)) {
                ContentView_1.CView.text("\nYou're too confused about who you are to try to attack!");
                // MainScreen.getBottomButton(0).modify("Recover", wait);
            }
        }
    }
    exports.Recover = Recover;
});
//# sourceMappingURL=Recover.js.map