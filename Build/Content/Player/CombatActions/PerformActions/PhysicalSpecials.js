define(["require", "exports", "Content/Combat/Actions/SubAction", "Engine/Combat/Actions/CombatActionType"], function (require, exports, SubAction_1, CombatActionType_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    // import { AnemoneSting } from '../PhysicalAttacks/AnemoneSting';
    // import { Bite } from '../PhysicalAttacks/Bite';
    // import { Constrict } from '../PhysicalAttacks/Constrict';
    // import { Kick } from '../PhysicalAttacks/Kick';
    // import { Gore } from '../PhysicalAttacks/Gore';
    class PhysicalSpecials extends SubAction_1.SubAction {
        constructor() {
            super(...arguments);
            this.name = "P. Special";
            this.type = CombatActionType_1.CombatActionType.PhysSpec;
            this.subActions = [
            // new AnemoneSting(),
            // new Bite(),
            // new Constrict(),
            // new Kick(),
            // new Gore(),
            ];
        }
    }
    exports.PhysicalSpecials = PhysicalSpecials;
});
//# sourceMappingURL=PhysicalSpecials.js.map