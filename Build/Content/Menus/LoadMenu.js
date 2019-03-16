define(["require", "exports", "./SaveDisplay", "Engine/Save/SaveManager", "Engine/Save/SaveFile", "Engine/Display/ContentView", "./InGame/PlayerMenu", "./DataMenu"], function (require, exports, SaveDisplay_1, SaveManager_1, SaveFile_1, ContentView_1, PlayerMenu_1, DataMenu_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function loadMenu() {
        ContentView_1.CView.clear();
        if (SaveManager_1.SaveManager.activeSlot())
            ContentView_1.CView.text("<b>Last saved or loaded from: " + SaveManager_1.SaveManager.activeSlot() + "</b>\r\r");
        ContentView_1.CView.text("<b><u>Slot: Sex,  Game Days Played</u></b>\r");
        SaveDisplay_1.displaySaves();
        return SaveDisplay_1.saveSlotChoices((index) => {
            return () => {
                SaveFile_1.loadFromSave(SaveManager_1.SaveManager.loadFromSlot(index));
                return loaded();
            };
        }, DataMenu_1.dataMenu);
    }
    exports.loadMenu = loadMenu;
    function loaded() {
        ContentView_1.CView.clear();
        ContentView_1.CView.text("Load Successful.");
        return { next: PlayerMenu_1.playerMenu };
    }
});
//# sourceMappingURL=LoadMenu.js.map