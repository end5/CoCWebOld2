define(["require", "exports", "Engine/Display/MainScreen", "Engine/Display/ContentView", "./PlayerMenu", "./PerkUpMenu"], function (require, exports, MainScreen_1, ContentView_1, PlayerMenu_1, PerkUpMenu_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function levelUpMenu(character) {
        ContentView_1.CView.clear();
        MainScreen_1.MainScreen.topButtons.hide();
        if (character.canLevelUp()) {
            MainScreen_1.MainScreen.levelupIcon.hide();
            character.stats.level++;
            character.stats.perkPoints++;
            ContentView_1.CView.text("<b>You are now level " + character.stats.level + "!</b>\n\nYou may now apply +5 to one attribute.  Which will you choose?");
            character.stats.XP -= (character.stats.level - 1) * 100;
            return {
                choices: [
                    ["Strength", levelUpStatStrength], ["Toughness", levelUpStatToughness], ["Speed", levelUpStatSpeed], ["Intelligence", levelUpStatIntelligence],
                ]
            };
        }
        else if (character.stats.perkPoints > 0) {
            return PerkUpMenu_1.perkUpMenu(character);
        }
        return { next: PlayerMenu_1.playerMenu };
    }
    exports.levelUpMenu = levelUpMenu;
    function levelUpStatStrength(character) {
        character.stats.str += 5; // Gain +5 Str due to level
        ContentView_1.CView.clear();
        ContentView_1.CView.text("Your muscles feel significantly stronger from your time adventuring.");
        return { next: PerkUpMenu_1.perkUpMenu };
    }
    function levelUpStatToughness(character) {
        character.stats.tou += 5; // Gain +5 Toughness due to level
        ContentView_1.CView.clear();
        ContentView_1.CView.text("You feel tougher from all the fights you have endured.");
        return { next: PerkUpMenu_1.perkUpMenu };
    }
    function levelUpStatSpeed(character) {
        character.stats.spe += 5; // Gain +5 speed due to level
        ContentView_1.CView.clear();
        ContentView_1.CView.text("Your time in combat has driven you to move faster.");
        return { next: PerkUpMenu_1.perkUpMenu };
    }
    function levelUpStatIntelligence(character) {
        character.stats.int += 5; // Gain +5 Intelligence due to level
        ContentView_1.CView.clear();
        ContentView_1.CView.text("Your time spent fighting the creatures of this realm has sharpened your wit.");
        return { next: PerkUpMenu_1.perkUpMenu };
    }
});
//# sourceMappingURL=LevelUpMenu.js.map