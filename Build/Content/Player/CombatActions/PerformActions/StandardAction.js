define(["require", "exports", "Engine/Combat/Actions/CombatAction", "./Approach", "./Recover", "./Squeeze", "./Attack", "Engine/Combat/Actions/CombatActionType"], function (require, exports, CombatAction_1, Approach_1, Recover_1, Squeeze_1, Attack_1, CombatActionType_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class StandardAction extends CombatAction_1.CombatAction {
        constructor() {
            super(...arguments);
            this.name = "MainAction";
            this.type = CombatActionType_1.CombatActionType.Attack;
            this.approach = new Approach_1.Approach();
            this.recover = new Recover_1.Recover();
            this.squeeze = new Squeeze_1.Squeeze();
            // private struggle = new Struggle();
            this.attack = new Attack_1.Attack();
        }
        canUse(character, target) {
            if (this.approach.canUse(character, target).canUse) {
                this.name = this.approach.name;
            }
            else if (this.recover.canUse(character, target).canUse) {
                this.name = this.recover.name;
            }
            else if (this.squeeze.canUse(character, target).canUse) {
                this.name = this.squeeze.name;
            }
            // else if (this.struggle.canUse(character, target).canUse) {
            //     this.name = this.struggle.name;
            // }
            else {
                this.name = this.attack.name;
            }
            return super.canUse(character, target);
        }
        use(character, target) {
            if (this.approach.canUse(character, target).canUse) {
                this.approach.use(character, target);
            }
            else if (this.recover.canUse(character, target).canUse) {
                this.recover.use(character, target);
            }
            else if (this.squeeze.canUse(character, target).canUse) {
                this.squeeze.use(character, target);
            }
            // else if (this.struggle.canUse(character, target).canUse) {
            //     this.struggle.use(character, target);
            // }
            else {
                this.attack.use(character, target);
            }
        }
    }
    exports.StandardAction = StandardAction;
});
//# sourceMappingURL=StandardAction.js.map