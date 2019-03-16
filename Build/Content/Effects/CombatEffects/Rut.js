define(["require", "exports", "Engine/Utilities/SMath", "Content/Descriptors/CockDescriptor", "Content/Descriptors/VaginaDescriptor", "Engine/Display/ContentView", "Engine/Effects/Effect"], function (require, exports, SMath_1, CockDescriptor_1, VaginaDescriptor_1, ContentView_1, Effect_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Rut extends Effect_1.Effect {
        combatTurnEnd(character, enemy) {
            const enemyVagina = enemy.body.vaginas.get(0);
            if (character.body.cocks.length > 0 && enemyVagina) {
                character.stats.lust += (SMath_1.randInt(character.stats.lib / 5) + 3 + SMath_1.randInt(5));
                let out;
                if (character.body.cocks.length > 1)
                    out = "Each of y";
                else
                    out = "Y";
                if (enemy.desc.plural)
                    out += "our " + CockDescriptor_1.describeCocksLight(character) + " dribbles pre-cum as you think about plowing " + enemy.desc.a + enemy.desc.short + " right here and now, fucking " + enemy.desc.possessivePronoun + " " + VaginaDescriptor_1.describeVagina(enemy, enemyVagina) + "s until they're totally fertilized and pregnant.";
                else
                    out += "our " + CockDescriptor_1.describeCocksLight(character) + " dribbles pre-cum as you think about plowing " + enemy.desc.a + enemy.desc.short + " right here and now, fucking " + enemy.desc.possessivePronoun + " " + VaginaDescriptor_1.describeVagina(enemy, enemyVagina) + " until it's totally fertilized and pregnant.";
                ContentView_1.CView.text(out);
                ContentView_1.CView.text("\n\n");
            }
        }
    }
    exports.Rut = Rut;
});
//# sourceMappingURL=Rut.js.map