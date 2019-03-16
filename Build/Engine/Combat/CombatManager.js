define(["require", "exports", "Engine/Utilities/List"], function (require, exports, List_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class CombatManager {
        constructor() {
            this.itemsOnFloor = new List_1.List();
        }
        beginBattle(encounter) {
            // this.encounter = new Encounter(combatMenu, mainCharacter, PartyDict.getMembers(mainCharacter), enemies);
            this.encounter = encounter;
            return this.encounter.performRound();
        }
        get inCombat() {
            return !!this.encounter && !!this.encounter.performTurnEnd;
        }
    }
    const combatManager = new CombatManager();
    exports.CombatManager = combatManager;
});
//# sourceMappingURL=CombatManager.js.map