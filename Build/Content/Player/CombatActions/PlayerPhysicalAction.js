define(["require", "exports", "Content/Effects/EffectType", "Engine/Combat/Actions/CombatAction", "Engine/Combat/Actions/CombatActionType"], function (require, exports, EffectType_1, CombatAction_1, CombatActionType_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class PlayerPhysicalAction extends CombatAction_1.CombatAction {
        constructor() {
            super(...arguments);
            this.type = CombatActionType_1.CombatActionType.PhysSpec;
        }
        physicalCost(character) {
            let mod = this.baseCost;
            let costPercent = 100;
            if (character.effects.has(EffectType_1.EffectType.IronMan))
                costPercent -= 50;
            mod *= costPercent / 100;
            return mod;
        }
    }
    exports.PlayerPhysicalAction = PlayerPhysicalAction;
});
//# sourceMappingURL=PlayerPhysicalAction.js.map