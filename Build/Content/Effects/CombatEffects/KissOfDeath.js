define(["require", "exports", "Engine/Display/ContentView", "Engine/Effects/Effect"], function (require, exports, ContentView_1, Effect_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class KissOfDeath extends Effect_1.Effect {
        combatTurnStart(character) {
            character.stats.lust += 5;
            character.combat.loseHP(15);
            ContentView_1.CView.text("Your lips burn with an unexpected flash of heat.  They sting and burn with unholy energies as a puff of ectoplasmic gas escapes your lips.  That puff must be a part of your soul!  It darts through the air to the succubus, who slurps it down like a delicious snack.  You feel feverishly hot and exhausted...");
            ContentView_1.CView.text("\n\n");
        }
    }
    exports.KissOfDeath = KissOfDeath;
});
//# sourceMappingURL=KissOfDeath.js.map