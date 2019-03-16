define(["require", "exports", "Content/Effects/EffectType", "Engine/Combat/Actions/CombatActionType", "Engine/Combat/Actions/CombatAction"], function (require, exports, EffectType_1, CombatActionType_1, CombatAction_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Climb extends CombatAction_1.CombatAction {
        constructor() {
            super(...arguments);
            this.name = "Climb";
            this.flags = CombatActionType_1.CombatActionType.Attack;
        }
        canUse(character, target) {
            return { canUse: !!target && target.effects.has(EffectType_1.EffectType.Level) };
        }
        use(character, target) {
            // if (monster.combat.effects.has(EffectType.Level)) {
            //     (monster as Sandtrap).sandTrapWait();
            // }
        }
    }
    exports.Climb = Climb;
});
//# sourceMappingURL=Climb.js.map