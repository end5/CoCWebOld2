define(["require", "exports", "Engine/Utilities/SMath", "Content/Descriptors/VaginaDescriptor", "Engine/Display/ContentView", "Engine/Effects/Effect"], function (require, exports, SMath_1, VaginaDescriptor_1, ContentView_1, Effect_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Heat extends Effect_1.Effect {
        combatTurnStart(character, enemy) {
            const selVagina = character.body.vaginas.get(0);
            if (selVagina && enemy.body.cocks.length > 0) {
                character.stats.lust += (SMath_1.randInt(character.stats.lib / 5) + 3 + SMath_1.randInt(5));
                ContentView_1.CView.text("Your " + VaginaDescriptor_1.describeVagina(character, selVagina) + " clenches with an instinctual desire to be touched and filled.  If you don't end this quickly you'll give in to your heat.");
                ContentView_1.CView.text("\n\n");
            }
        }
    }
    exports.Heat = Heat;
});
//# sourceMappingURL=Heat.js.map