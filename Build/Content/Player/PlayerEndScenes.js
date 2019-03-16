define(["require", "exports", "Engine/Utilities/SMath", "Engine/Combat/DefeatEvent", "Engine/Combat/EndScenes", "Engine/Display/ContentView", "Content/Scenes/PassTime"], function (require, exports, SMath_1, DefeatEvent_1, EndScenes_1, ContentView_1, PassTime_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class PlayerEndScenes extends EndScenes_1.EndScenes {
        hasEscaped(enemy) {
            return false;
        }
        hasDefeated(enemy) {
            return false;
        }
        claimsVictory(howYouWon, enemy) {
            if (howYouWon === DefeatEvent_1.DefeatType.HP) {
                ContentView_1.CView.clear();
                ContentView_1.CView.text("You defeat " + enemy.desc.a + enemy.desc.short + ".\n");
            }
            else if (howYouWon === DefeatEvent_1.DefeatType.Lust) {
                ContentView_1.CView.clear();
                ContentView_1.CView.text("You smile as " + enemy.desc.a + enemy.desc.short + " collapses and begins masturbating feverishly.");
            }
        }
        criesInDefeat(howYouLost, enemy) {
            if (howYouLost === DefeatEvent_1.DefeatType.HP) {
                ContentView_1.CView.clear();
                ContentView_1.CView.text("Your wounds are too great to bear, and you fall unconscious.");
            }
            else if (howYouLost === DefeatEvent_1.DefeatType.Lust) {
                ContentView_1.CView.clear();
                ContentView_1.CView.text("Your desire reaches uncontrollable levels, and you end up openly masturbating.\n\nThe lust and pleasure cause you to black out for hours on end.");
            }
        }
        victoryScene(howYouWon, enemy) {
            return { next: PassTime_1.passTime(1) };
        }
        defeatScene(howYouLost, enemy) {
            let lostGems = SMath_1.randInt(10) + 1;
            if (lostGems > this.char.inventory.gems)
                lostGems = this.char.inventory.gems;
            ContentView_1.CView.text("\n\nYou'll probably wake up in eight hours or so, missing " + lostGems + " gems.");
            this.char.inventory.gems -= lostGems;
            let temp = SMath_1.randInt(10) + 1 + Math.round(enemy.stats.level / 2);
            if (temp > this.char.inventory.gems)
                temp = this.char.inventory.gems;
            const gemsLost = SMath_1.randInt(20);
            ContentView_1.CView.text("\n\nYou'll probably come to your senses in eight hours or so");
            if (this.char.inventory.gems > 1)
                ContentView_1.CView.text(", missing " + gemsLost + " gems.");
            else if (this.char.inventory.gems === 1)
                ContentView_1.CView.text(", missing your only gem.");
            else
                ContentView_1.CView.text(".");
            this.char.inventory.gems -= temp;
            return { next: PassTime_1.passTime(8) };
        }
    }
    exports.PlayerEndScenes = PlayerEndScenes;
});
//# sourceMappingURL=PlayerEndScenes.js.map