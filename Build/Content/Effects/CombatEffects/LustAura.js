define(["require", "exports", "Engine/Utilities/SMath", "Content/Character/CharacterType", "Engine/Display/ContentView", "Engine/Effects/Effect"], function (require, exports, SMath_1, CharacterType_1, ContentView_1, Effect_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class LustAura extends Effect_1.Effect {
        combatTurnStart(character, enemy) {
            if (enemy.charType === CharacterType_1.CharacterType.Player) {
                // [LUST GAINED PER ROUND] - Omnibus
                enemy.stats.lust += 3 + Math.floor(enemy.stats.lib / 20 + enemy.stats.cor / 30);
                let out = "";
                if (enemy.stats.lust < 33)
                    out += "Your groin tingles warmly.  The demon's aura is starting to get to you.";
                if (enemy.stats.lust >= 33 && enemy.stats.lust < 66)
                    out += "You blush as the demon's aura seeps into you, arousing you more and more.";
                if (enemy.stats.lust >= 66) {
                    out += "You flush bright red with desire as the lust in the air worms its way inside you.  ";
                    const randomNumber = SMath_1.randInt(4);
                    if (randomNumber === 0)
                        out += "You have a hard time not dropping to your knees to service her right now.";
                    if (randomNumber === 2)
                        out += "The urge to bury your face in her breasts and suckle her pink nipples nearly overwhelms you.";
                    if (randomNumber === 1)
                        out += "You swoon and lick your lips, tasting the scent of the demon's pussy in the air.";
                    if (randomNumber === 3)
                        out += "She winks at you and licks her lips, and you can't help but imagine her tongue sliding all over your body.  You regain composure moments before throwing yourself at her.  That was close.";
                }
                ContentView_1.CView.text(out);
                ContentView_1.CView.text("\n\n");
            }
        }
    }
    exports.LustAura = LustAura;
});
//# sourceMappingURL=LustAura.js.map