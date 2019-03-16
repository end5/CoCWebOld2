define(["require", "exports", "Engine/Combat/Actions/CombatAction", "./BasicAttack", "Engine/Utilities/SMath"], function (require, exports, CombatAction_1, BasicAttack_1, SMath_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class MainAction extends CombatAction_1.CombatAction {
        constructor() {
            super(...arguments);
            this.name = "Action";
            this.subActions = [new BasicAttack_1.BasicAttack()];
        }
        use(char, enemy) {
            SMath_1.randomChoice((this.subActions.filter((subAction) => subAction.isPossible(char) && subAction.canUse(char, enemy).canUse))).use(char, enemy);
        }
    }
    exports.MainAction = MainAction;
});
//# sourceMappingURL=MainAction.js.map