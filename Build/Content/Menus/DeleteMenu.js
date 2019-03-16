define(["require", "exports", "./SaveDisplay", "Engine/Save/SaveManager", "Engine/Display/ContentView", "./DataMenu"], function (require, exports, SaveDisplay_1, SaveManager_1, ContentView_1, DataMenu_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function deleteMenu() {
        ContentView_1.CView.clear();
        ContentView_1.CView.text("Slot,  Race,  Sex,  Game Days Played");
        ContentView_1.CView.text("\n");
        SaveDisplay_1.displaySaves();
        ContentView_1.CView.text("<b>ONCE DELETED, YOUR SAVE IS GONE FOREVER.</b>");
        return SaveDisplay_1.saveSlotChoices(confirmDelete, DataMenu_1.dataMenu);
    }
    exports.deleteMenu = deleteMenu;
    function confirmDelete(slotNumber) {
        return () => {
            ContentView_1.CView.clear();
            ContentView_1.CView.text("You are about to delete the following save: ");
            // CView.text(Flags.list[FlagEnum.TEMP_STORAGE_SAVE_DELETION]).bold();
            ContentView_1.CView.text("Are you sure you want to delete it?");
            return {
                choices: [
                    ["No", deleteMenu],
                    ["Yes", () => {
                            SaveManager_1.SaveManager.delete(slotNumber);
                            return deleteMenu();
                        }]
                ]
            };
        };
    }
});
//# sourceMappingURL=DeleteMenu.js.map