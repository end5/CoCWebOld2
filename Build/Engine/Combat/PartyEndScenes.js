define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class PartyEndScenes {
        constructor(character) {
            this.char = character;
        }
        victory(defeatedParty, victoriousParty) {
            this.beforeVictoriousPartyScene(defeatedParty, victoriousParty);
            return this.victoryScene(defeatedParty, victoriousParty);
        }
    }
    /**
     * The default number of hours that pass when losing a fight.
     */
    PartyEndScenes.defaultLostFightHours = 8;
    exports.PartyEndScenes = PartyEndScenes;
});
//# sourceMappingURL=PartyEndScenes.js.map