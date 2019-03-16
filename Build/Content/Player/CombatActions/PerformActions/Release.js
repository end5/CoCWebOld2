define(["require", "exports", "Engine/Combat/Actions/CombatAction", "Content/Effects/EffectType", "Engine/Display/ContentView", "Engine/Combat/Actions/CombatActionType"], function (require, exports, CombatAction_1, EffectType_1, ContentView_1, CombatActionType_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Release extends CombatAction_1.CombatAction {
        constructor() {
            super(...arguments);
            this.name = "Release";
            this.type = CombatActionType_1.CombatActionType.MoveAway;
        }
        canUse(character, target) {
            return { canUse: !!target && target.effects.has(EffectType_1.EffectType.Constricted) };
        }
        use(character, target) {
            ContentView_1.CView.clear();
            ContentView_1.CView.text("You release " + target.desc.a + target.desc.short + " from " + target.desc.possessivePronoun + " bonds, and " + target.desc.subjectivePronoun + " drops to the ground, catching " + target.desc.possessivePronoun + " breath before " + target.desc.subjectivePronoun + " stands back up, apparently prepared to fight some more.");
            ContentView_1.CView.text("\n\n");
            target.effects.removeByName(EffectType_1.EffectType.Constricted);
        }
    }
    exports.Release = Release;
});
//# sourceMappingURL=Release.js.map