define(["require", "exports", "Engine/Display/MainScreen", "Engine/Display/ScreenDisplay", "Content/Utilities/Dates", "Engine/Display/ContentView", "Engine/CharDict", "Content/Settings", "./InGame/StatsMenu", "./InGame/PerkUpMenu", "./InGame/PerksMenu", "./InGame/PlayerMenu", "./DataMenu", "./SettingsMenu", "./InGame/CharCreationMenu"], function (require, exports, MainScreen_1, ScreenDisplay_1, Dates_1, ContentView_1, CharDict_1, Settings_1, StatsMenu_1, PerkUpMenu_1, PerksMenu_1, PlayerMenu_1, DataMenu_1, SettingsMenu_1, CharCreationMenu_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function mainMenu() {
        if (!CharDict_1.CharDict.player)
            MainScreen_1.MainScreen.statsPanel.hide();
        MainScreen_1.MainScreen.topButtons.stats.modify("Stats", ScreenDisplay_1.clickFuncWrapper(StatsMenu_1.statsMenu));
        MainScreen_1.MainScreen.topButtons.levelUp.modify("Perk Up", ScreenDisplay_1.clickFuncWrapper(PerkUpMenu_1.perkUpMenu));
        MainScreen_1.MainScreen.topButtons.perks.modify("Perks", ScreenDisplay_1.clickFuncWrapper(PerksMenu_1.perksMenu));
        MainScreen_1.MainScreen.topButtons.appearance.modify("Appearance", undefined);
        MainScreen_1.MainScreen.topButtons.hide();
        MainScreen_1.MainScreen.topButtons.mainMenu.modify("New Game", ScreenDisplay_1.clickFuncWrapper(CharCreationMenu_1.charCreationMenu));
        MainScreen_1.MainScreen.topButtons.data.modify("Data", ScreenDisplay_1.clickFuncWrapper(DataMenu_1.dataMenu));
        MainScreen_1.MainScreen.levelupIcon.hide();
        ContentView_1.CView.clear();
        ContentView_1.CView.text("<b>Corruption of Champions Web Edition Framework Test</b>\n");
        if (Settings_1.Settings.debug)
            ContentView_1.CView.text("\n\n<b>DEBUG MODE ENABLED:  ITEMS WILL NOT BE CONSUMED BY USE.</b>");
        if (Settings_1.Settings.showSprites)
            ContentView_1.CView.text("\n\n<b>Sprites disabled.</b>");
        if (Settings_1.Settings.easyMode)
            ContentView_1.CView.text("\n\n<b>Easy Mode On:  Bad-ends can be ignored.</b>");
        if (Settings_1.Settings.sillyMode)
            ContentView_1.CView.text("\n\n<b>SILLY MODE ENGAGED: Crazy, nonsensical, and possibly hilarious things may occur.</b>");
        if (Dates_1.isEaster())
            ContentView_1.CView.text("\n\n<b>It's Easter!  Enjoy the eggs!</b>");
        if (Dates_1.isValentine())
            ContentView_1.CView.text("\n\n<b>It's Valentine's!</b>");
        return {
            choices: [
                ["Settings", SettingsMenu_1.settingsMenu], ["Resume", CharDict_1.CharDict.player ? PlayerMenu_1.playerMenu : undefined]
            ]
        };
    }
    exports.mainMenu = mainMenu;
});
//# sourceMappingURL=MainMenu.js.map