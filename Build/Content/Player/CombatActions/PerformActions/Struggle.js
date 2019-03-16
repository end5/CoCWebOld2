define(["require", "exports", "Engine/Combat/Actions/CombatAction", "Engine/Combat/Actions/CombatActionType", "Engine/Display/ContentView"], function (require, exports, CombatAction_1, CombatActionType_1, ContentView_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Struggle extends CombatAction_1.CombatAction {
        constructor() {
            super(...arguments);
            this.name = "Struggle";
            this.type = CombatActionType_1.CombatActionType.Attack;
        }
        use(character, target) {
            ContentView_1.CView.text("You struggle.");
        }
    }
    exports.Struggle = Struggle;
});
//# sourceMappingURL=Struggle.js.map