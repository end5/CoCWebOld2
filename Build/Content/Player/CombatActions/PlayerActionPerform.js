define(["require", "exports", "Engine/Combat/Actions/CombatAction", "Engine/Combat/Actions/CombatActionType", "./PerformActions/StandardAction", "./PerformActions/Tease", "./PerformActions/Spells", "Content/Combat/Actions/ItemInventoryAction", "./PerformActions/MoveAway", "./PerformActions/PhysicalSpecials", "./PerformActions/MagicalSpecials", "./PerformActions/Wait", "./PerformActions/Fantasize", "Engine/Utilities/SMath"], function (require, exports, CombatAction_1, CombatActionType_1, StandardAction_1, Tease_1, Spells_1, ItemInventoryAction_1, MoveAway_1, PhysicalSpecials_1, MagicalSpecials_1, Wait_1, Fantasize_1, SMath_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /*
        Old Menu Choice Locations
        0 - Approach, Recover, Struggle, Squeeze, Attack
        1 - Tease
        2 - Spells
        3 - Items
        4 - Run, Release
        5 - Bow, Wait, P. Specials
        6 - M. Specials
        7 - Climb, Wait
        8 - Fantasize
        9 - Inspect
    */
    /*
        New Menu Choice Locations
        0 - Main Action
        1 - Tease
        2 - Spells
        3 - Items
        4 - Move Away - Climb, Run, Release
        5 - P. Specials - Bow here
        6 - M. Specials
        7 - Wait
        8 - Fantasize
        9 - Inspect
    */
    class PlayerAction extends CombatAction_1.CombatAction {
        constructor(player) {
            super();
            this.name = 'Player Action';
            this.type = CombatActionType_1.CombatActionType.None;
            this.subActions = [
                new StandardAction_1.StandardAction(),
                new Tease_1.Tease(),
                new Spells_1.Spells(),
                new ItemInventoryAction_1.ItemInventoryAction(player),
                new MoveAway_1.MoveAway(),
                new PhysicalSpecials_1.PhysicalSpecials(),
                new MagicalSpecials_1.MagicalSpecials(),
                new Wait_1.Wait(),
                new Fantasize_1.Fantasize(),
            ];
        }
        use(character, target) {
            SMath_1.randomChoice(this.subActions).use(character, target);
        }
    }
    exports.PlayerAction = PlayerAction;
});
//# sourceMappingURL=PlayerActionPerform.js.map