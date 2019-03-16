define(["require", "exports", "Engine/Combat/Actions/CombatAction", "Engine/Utilities/SMath", "Engine/Display/ContentView", "Engine/Combat/Actions/CombatActionType", "Content/Effects/EffectType"], function (require, exports, CombatAction_1, SMath_1, ContentView_1, CombatActionType_1, EffectType_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Squeeze extends CombatAction_1.CombatAction {
        constructor() {
            super(...arguments);
            this.name = "Squeeze";
            this.type = CombatActionType_1.CombatActionType.Attack;
        }
        canUse(character, target) {
            return { canUse: !!target && target.effects.has(EffectType_1.EffectType.Constricted) };
        }
        use(character, target) {
            ContentView_1.CView.clear();
            // Squeeze -
            ContentView_1.CView.text("Your coils wrap tighter around your prey, leaving " + target.desc.objectivePronoun + " short of breath. You can feel it in your tail as " + target.desc.possessivePronoun + " struggles are briefly intensified.");
            target.stats.HP -= target.stats.maxHP * (.10 + SMath_1.randInt(15) / 100);
            // Enemy faints -
            if (target.stats.HP < 1) {
                ContentView_1.CView.text("You can feel " + target.desc.a + target.desc.short + "'s life signs beginning to fade, and before you crush all the life from " + target.desc.objectivePronoun + ", you let go, dropping " + target.desc.objectivePronoun + " to the floor, unconscious but alive.  In no time, " + target.desc.possessivePronoun + "'s eyelids begin fluttering, and you've no doubt they'll regain consciousness soon.  ");
                if (target.desc.short === "demons")
                    ContentView_1.CView.text("The others quickly back off, terrified at the idea of what you might do to them.");
                ContentView_1.CView.text("\n\n");
            }
            ContentView_1.CView.text("\n\n");
        }
    }
    exports.Squeeze = Squeeze;
});
//# sourceMappingURL=Squeeze.js.map