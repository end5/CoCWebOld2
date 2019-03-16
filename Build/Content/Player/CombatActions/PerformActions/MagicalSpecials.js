define(["require", "exports", "Engine/Combat/Actions/CombatActionType", "Content/Combat/Actions/SubAction"], function (require, exports, CombatActionType_1, SubAction_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    // import { Berserk } from '../MagicalAttacks/Berserk';
    // import { DragonBreath } from '../MagicalAttacks/DragonBreath';
    // import { Fireball } from '../MagicalAttacks/Fireball';
    // import { CorruptedFoxFire } from '../MagicalAttacks/CorruptedFoxFire';
    // import { KitsuneTerror } from '../MagicalAttacks/KitsuneTerror';
    // import { FoxFire } from '../MagicalAttacks/FoxFire';
    class MagicalSpecials extends SubAction_1.SubAction {
        constructor() {
            super(...arguments);
            this.name = "M. Specials";
            this.type = CombatActionType_1.CombatActionType.MagicSpec;
            this.subActions = [
            // new Berserk(),
            // new DragonBreath(),
            // new Fireball(),
            // new CorruptedFoxFire(),
            // new KitsuneTerror(),
            // new FoxFire(),
            // new KitsuneTerror(),
            ];
        }
    }
    exports.MagicalSpecials = MagicalSpecials;
});
//# sourceMappingURL=MagicalSpecials.js.map