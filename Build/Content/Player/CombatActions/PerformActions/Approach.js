define(["require", "exports", "Content/Effects/EffectType", "Engine/Combat/Actions/CombatAction", "Engine/Display/ContentView", "Engine/Combat/Actions/CombatActionType"], function (require, exports, EffectType_1, CombatAction_1, ContentView_1, CombatActionType_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Approach extends CombatAction_1.CombatAction {
        constructor() {
            super(...arguments);
            this.name = "Approach";
            this.type = CombatActionType_1.CombatActionType.Attack;
        }
        canUse(character, target) {
            return { canUse: character.effects.has(EffectType_1.EffectType.KnockedBack) };
        }
        useAction(character, target) {
            ContentView_1.CView.clear();
            ContentView_1.CView.text("You close the distance between you and " + target.desc.a + target.desc.short + " as quickly as possible.\n\n");
            character.effects.removeByName(EffectType_1.EffectType.KnockedBack);
        }
    }
    exports.Approach = Approach;
});
//# sourceMappingURL=Approach.js.map