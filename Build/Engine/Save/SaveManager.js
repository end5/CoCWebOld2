define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class SaveManager {
        constructor() {
            this.activatedSlot = -1;
            this.saveSlots = [];
            this.saveSlots.length = 20;
            this.autoSave = true;
            this.readSlots();
        }
        writeSlots() {
            localStorage.setItem("CoCWeb", JSON.stringify(this.saveSlots));
        }
        readSlots() {
            try {
                if (localStorage.getItem("CoCWeb"))
                    this.saveSlots = JSON.parse(localStorage.getItem("CoCWeb"));
            }
            catch (e) {
                console.error(e);
            }
        }
        activeSlot() {
            return this.activatedSlot;
        }
        has(slot) {
            return !!this.saveSlots[slot];
        }
        get(slot) {
            return this.saveSlots[slot];
        }
        delete(slot) {
            this.saveSlots[slot] = undefined;
            this.writeSlots();
        }
        saveSlotCount() {
            return this.saveSlots.length;
        }
        autosaveToggle() {
            this.autoSave = !this.autoSave;
        }
        loadFromSlot(slotNumber) {
            this.readSlots();
            return this.saveSlots[slotNumber];
        }
        loadFromFile(blob, callback) {
            const fileReader = new FileReader();
            fileReader.readAsBinaryString(blob);
            fileReader.addEventListener("loadend", () => {
                if (typeof fileReader.result === 'string')
                    callback(JSON.parse(fileReader.result));
            });
        }
        saveToSlot(slotNumber, save) {
            this.saveSlots[slotNumber] = save;
            this.writeSlots();
        }
    }
    const saveManager = new SaveManager();
    exports.SaveManager = saveManager;
});
//# sourceMappingURL=SaveManager.js.map