define(["require", "exports", "Engine/Display/Elements/UnorderedListElement", "Engine/Save/SaveManager", "Engine/Body/GenderIdentity", "Engine/Display/MainScreen", "Engine/Display/Elements/TextElement"], function (require, exports, UnorderedListElement_1, SaveManager_1, GenderIdentity_1, MainScreen_1, TextElement_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function saveSlotChoices(saveSlotCallback, prevMenu) {
        const choices = [];
        for (let index = 0; index < SaveManager_1.SaveManager.saveSlotCount(); index++) {
            choices.push(["Slot " + index.toString(), saveSlotCallback(index)]);
        }
        return { choices, persistantChoices: [["Back", prevMenu]] };
    }
    exports.saveSlotChoices = saveSlotChoices;
    function displaySaves() {
        const saveListElement = new UnorderedListElement_1.UnorderedListElement(document.createElement('ul'));
        MainScreen_1.MainScreen.textElement.appendChild(saveListElement);
        for (let index = 0; index < SaveManager_1.SaveManager.saveSlotCount(); index++) {
            const saveElement = new TextElement_1.TextElement(document.createElement('li'));
            saveListElement.appendChild(saveElement);
            saveInfo(SaveManager_1.SaveManager.get(index), (index + 1).toString(), saveElement);
        }
    }
    exports.displaySaves = displaySaves;
    function saveInfo(saveFile, slotName, element) {
        element.text(slotName + ":  ");
        if (saveFile) {
            element.text("<b>" + saveFile.name + "</b>");
            element.text(" - ");
            if (saveFile.notes)
                element.text("<i>" + saveFile.notes + "</i>");
            else
                element.text("No notes available.");
            element.text("\n");
            element.text("Days - " + saveFile.days + "\n");
            element.text("  Gender - ");
            if (saveFile.gender === GenderIdentity_1.Gender.NONE)
                element.text("U");
            if (saveFile.gender === GenderIdentity_1.Gender.MALE)
                element.text("M");
            if (saveFile.gender === GenderIdentity_1.Gender.FEMALE)
                element.text("F");
            if (saveFile.gender === GenderIdentity_1.Gender.HERM)
                element.text("H");
            element.text("\n");
        }
        else {
            element.text("<b>EMPTY</b>");
            element.text("\n\n");
        }
    }
    exports.saveInfo = saveInfo;
});
//# sourceMappingURL=SaveDisplay.js.map