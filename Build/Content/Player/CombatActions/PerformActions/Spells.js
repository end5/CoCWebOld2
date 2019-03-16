define(["require", "exports", "Engine/Combat/Actions/CombatActionType", "Content/Combat/Actions/SubAction"], function (require, exports, CombatActionType_1, SubAction_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    // import { Arouse } from '../Spells/Arouse';
    // import { Blind } from '../Spells/Blind';
    // import { ChargeWeapon } from '../Spells/ChargeWeapon';
    // import { CleansingPalm } from '../Spells/CleansingPalm';
    // import { Heal } from '../Spells/Heal';
    // import { Might } from '../Spells/Might';
    // import { Whitefire } from '../Spells/Whitefire';
    class Spells extends SubAction_1.SubAction {
        constructor() {
            super(...arguments);
            this.name = "Spells";
            this.type = CombatActionType_1.CombatActionType.Spells;
            this.subActions = [
            // new Arouse(),
            // new Blind(),
            // new ChargeWeapon(),
            // new CleansingPalm(),
            // new Heal(),
            // new Might(),
            // new Whitefire(),
            ];
        }
    }
    exports.Spells = Spells;
});
//# sourceMappingURL=Spells.js.map