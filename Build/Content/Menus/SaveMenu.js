define(["require", "exports", "./SaveDisplay", "Engine/Display/Elements/InputElement", "Engine/Save/SaveManager", "Engine/Save/SaveFile", "Engine/Display/ContentView", "./DataMenu", "Engine/Display/MainScreen"], function (require, exports, SaveDisplay_1, InputElement_1, SaveManager_1, SaveFile_1, ContentView_1, DataMenu_1, MainScreen_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function saveMenu() {
        ContentView_1.CView.clear();
        if (SaveManager_1.SaveManager.activeSlot())
            ContentView_1.CView.text("<b>Last saved or loaded from: " + SaveManager_1.SaveManager.activeSlot() + "</b>");
        ContentView_1.CView.text("<b><u>Slot: Sex,  Game Days Played</u></b>");
        SaveDisplay_1.displaySaves();
        ContentView_1.CView.text("<b>Leave the notes box blank if you don't wish to change notes.</b>");
        ContentView_1.CView.text("<b><u>NOTES:</u></b>");
        const notesInputElement = new InputElement_1.InputElement('text', document.createElement('input'));
        MainScreen_1.MainScreen.textElement.appendChild(notesInputElement);
        notesInputElement.style.position = "fixed";
        return SaveDisplay_1.saveSlotChoices(createSaveFuncCallback(SaveFile_1.generateSave(notesInputElement.value)), DataMenu_1.dataMenu);
    }
    exports.saveMenu = saveMenu;
    function createSaveFuncCallback(save) {
        return (index) => {
            return () => {
                if (SaveManager_1.SaveManager.has(index))
                    return confirmOverwrite(index, save);
                else {
                    SaveManager_1.SaveManager.saveToSlot(index, save);
                    return { next: saveMenu };
                }
            };
        };
    }
    function confirmOverwrite(slotNumber, save) {
        ContentView_1.CView.clear();
        ContentView_1.CView.text("You are about to overwrite the following save: <b>");
        // CView.text(Flags.list[FlagEnum.TEMP_STORAGE_SAVE_DELETION]).bold();
        ContentView_1.CView.text("\n\n");
        ContentView_1.CView.text("Are you sure you want to delete it?");
        return {
            choices: [["No", saveMenu], ["Yes", () => {
                        SaveManager_1.SaveManager.saveToSlot(slotNumber, save);
                        return saveMenu();
                    }]]
        };
    }
});
//# sourceMappingURL=SaveMenu.js.map