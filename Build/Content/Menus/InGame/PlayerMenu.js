define(["require", "exports", "Engine/Display/MainScreen", "Engine/Combat/CombatManager", "Engine/Display/ScreenDisplay", "../MainMenu", "./LevelUpMenu", "./PerkUpMenu", "Content/Scenes/ItemsOnFloor", "Content/Scenes/Camp"], function (require, exports, MainScreen_1, CombatManager_1, ScreenDisplay_1, MainMenu_1, LevelUpMenu_1, PerkUpMenu_1, ItemsOnFloor_1, Camp_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function playerMenu(character) {
        // Safe guard against combat breaking
        if (CombatManager_1.CombatManager.inCombat && CombatManager_1.CombatManager.encounter && CombatManager_1.CombatManager.encounter.performTurnEnd) {
            return CombatManager_1.CombatManager.encounter.performTurnEnd();
        }
        MainScreen_1.MainScreen.topButtons.mainMenu.modify("Main Menu", ScreenDisplay_1.clickFuncWrapper(MainMenu_1.mainMenu));
        MainScreen_1.MainScreen.topButtons.show();
        if (character.canLevelUp())
            MainScreen_1.MainScreen.topButtons.levelUp.modify("Level Up", ScreenDisplay_1.clickFuncWrapper(LevelUpMenu_1.levelUpMenu));
        else
            MainScreen_1.MainScreen.topButtons.levelUp.modify("Perk Up", ScreenDisplay_1.clickFuncWrapper(PerkUpMenu_1.perkUpMenu));
        for (const item of ItemsOnFloor_1.ItemsOnFloor)
            character.inventory.items.addItem(character, item, playerMenu);
        return Camp_1.camp(character);
    }
    exports.playerMenu = playerMenu;
});
//# sourceMappingURL=PlayerMenu.js.map