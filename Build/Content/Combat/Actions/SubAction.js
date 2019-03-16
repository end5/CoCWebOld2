define(["require", "exports", "Engine/Combat/Actions/CombatAction", "Engine/Utilities/SMath"], function (require, exports, CombatAction_1, SMath_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class SubAction extends CombatAction_1.CombatAction {
        canUse(character, target) {
            return { canUse: !!this.subActions.find((action) => action.canUse(character, target).canUse) };
        }
        use(character, target) {
            SMath_1.randomChoice(this.subActions).use(character, target);
        }
    }
    exports.SubAction = SubAction;
});
//# sourceMappingURL=SubAction.js.map