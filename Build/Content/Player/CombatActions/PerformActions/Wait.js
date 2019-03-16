define(["require", "exports", "Engine/Combat/Actions/CombatAction", "Engine/Display/ContentView", "Engine/Combat/Actions/CombatActionType"], function (require, exports, CombatAction_1, ContentView_1, CombatActionType_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Wait extends CombatAction_1.CombatAction {
        constructor() {
            super(...arguments);
            this.name = "Wait";
            this.type = CombatActionType_1.CombatActionType.Wait;
        }
        use() {
            ContentView_1.CView.clear();
            ContentView_1.CView.text("You decide not to take any action this round.\n\n");
        }
    }
    exports.Wait = Wait;
});
//# sourceMappingURL=Wait.js.map