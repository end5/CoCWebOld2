define(["require", "exports", "Engine/Combat/Actions/CombatAction", "./Release", "./Run", "Engine/Combat/Actions/CombatActionType"], function (require, exports, CombatAction_1, Release_1, Run_1, CombatActionType_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class MoveAway extends CombatAction_1.CombatAction {
        constructor() {
            super(...arguments);
            this.name = "Flee";
            this.type = CombatActionType_1.CombatActionType.MoveAway;
            this.release = new Release_1.Release();
            this.run = new Run_1.Run();
        }
        canUse(character, target) {
            if (target) {
                if (this.release.canUse(character, target).canUse) {
                    this.name = this.release.name;
                }
            }
            else {
                this.name = this.run.name;
            }
            return super.canUse(character, target);
        }
        use(character, target) {
            if (this.release.canUse(character, target).canUse) {
                this.release.use(character, target);
            }
            else {
                this.run.use(character, target);
            }
        }
    }
    exports.MoveAway = MoveAway;
});
//# sourceMappingURL=MoveAway.js.map