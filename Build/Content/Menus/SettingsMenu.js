define(["require", "exports", "Engine/Display/MainScreen", "Engine/Display/ContentView", "Content/Settings", "./ControlsMenu", "./MainMenu"], function (require, exports, MainScreen_1, ContentView_1, Settings_1, ControlsMenu_1, MainMenu_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function settingsMenu() {
        MainScreen_1.MainScreen.topButtons.mainMenu.show();
        MainScreen_1.MainScreen.topButtons.data.show();
        ContentView_1.CView.clear();
        ContentView_1.CView.text("<b>Settings toggles:</b>\n");
        if (Settings_1.Settings.debug)
            ContentView_1.CView.text("Debug mode enabled: <b>Yes</b>\n	Items will not be consumed by use, fleeing always succeeds, and bad-ends can be ignored.");
        else
            ContentView_1.CView.text("Debug mode enabled: <b>No</b>\n	Items consumption will occur as normal.");
        ContentView_1.CView.text("\n\n");
        if (Settings_1.Settings.showSprites)
            ContentView_1.CView.text("Sprites enabled: <b>Yes</b>.\n	You like to look at pretty pictures.");
        else
            ContentView_1.CView.text("Sprites enabled: <b>No</b>.\n	There are only words. Nothing else.");
        ContentView_1.CView.text("\n\n");
        if (Settings_1.Settings.easyMode)
            ContentView_1.CView.text("Easy Mode <b>On</b>\n	Bad-ends can be ignored and combat is easier.");
        else
            ContentView_1.CView.text("Easy Mode <b>Off</b>\n	Bad-ends can ruin your game and combat is challenging.");
        ContentView_1.CView.text("\n\n");
        if (Settings_1.Settings.sillyMode)
            ContentView_1.CView.text("Silly Mode <b>On</b>\n	Crazy, nonsensical, and possibly hilarious things may occur.");
        else
            ContentView_1.CView.text("Silly Mode <b>Off</b>\n	You're an incorrigable stick-in-the-mud with no sense of humor.");
        ContentView_1.CView.text("\n\n");
        ContentView_1.CView.text("<b>The following flags are not fully implemented yet (e.g. they don't apply in <i>all</i> cases where they could be relevant).</b>\n");
        ContentView_1.CView.text("Additional note: You <b>must</b> be <i>in a game session</i> (e.g. load your save, hit \"Main Menu\", change the flag settings, and then hit \"Resume\") to change these flags. They're saved into the saveGame file, so if you load a save, it will clear them to the state in that save.");
        ContentView_1.CView.text("\n\n");
        if (Settings_1.Settings.lowStandards) {
            ContentView_1.CView.text("Low standards Mode <b>On</b>\n	NPCs ignore body type preferences.");
            ContentView_1.CView.text("\n	(Not gender preferences though. You still need the right hole.)");
        }
        else
            ContentView_1.CView.text("Low standards Mode <b>Off</b>\n	NPCs have body-type preferences.");
        ContentView_1.CView.text("\n\n");
        if (Settings_1.Settings.hyperHappy) {
            ContentView_1.CView.text("Hyper Happy mode <b>On</b>\n	Only reducto and humus shrink endowments.");
            ContentView_1.CView.text("\n	Incubus draft doesn't affect breasts, and succubi milk doesn't affect cocks.");
        }
        else
            ContentView_1.CView.text("Hyper Happy mode <b>Off</b>\n	Male enhancement potions shrink female endowments, and vice versa.");
        return {
            choices: [
                ["Toggle Debug", toggleDebug],
                ["Sprite Toggle", toggleSpritesFlag],
                ["EZ Mode", toggleEasyModeFlag],
                ["Larger Font", incFontSize],
                ["Controls", ControlsMenu_1.controlsMenu],
                ["Hyper Happy", toggleHyperHappy],
                ["Low Standards", toggleStandards],
                ["Silly Toggle", toggleSillyFlag],
                ["Smaller Font", decFontSize],
            ],
            persistantChoices: [
                ["Back", MainMenu_1.mainMenu]
            ]
        };
    }
    exports.settingsMenu = settingsMenu;
    function incFontSize() {
        Settings_1.Settings.customFontSize += 0.1;
        MainScreen_1.MainScreen.textElement.style.fontSize = Settings_1.Settings.customFontSize + "em";
        return settingsMenu();
    }
    function decFontSize() {
        Settings_1.Settings.customFontSize -= 0.1;
        MainScreen_1.MainScreen.textElement.style.fontSize = Settings_1.Settings.customFontSize + "em";
        return settingsMenu();
    }
    function toggleStandards() {
        Settings_1.Settings.lowStandards = !Settings_1.Settings.lowStandards;
        return settingsMenu();
    }
    function toggleHyperHappy() {
        Settings_1.Settings.hyperHappy = !Settings_1.Settings.hyperHappy;
        return settingsMenu();
    }
    function toggleDebug() {
        Settings_1.Settings.debug = !Settings_1.Settings.debug;
        return settingsMenu();
    }
    function toggleEasyModeFlag() {
        Settings_1.Settings.easyMode = !Settings_1.Settings.easyMode;
        return settingsMenu();
    }
    function toggleSpritesFlag() {
        Settings_1.Settings.showSprites = !Settings_1.Settings.showSprites;
        return settingsMenu();
    }
    function toggleSillyFlag() {
        Settings_1.Settings.sillyMode = !Settings_1.Settings.sillyMode;
        return settingsMenu();
    }
});
//# sourceMappingURL=SettingsMenu.js.map