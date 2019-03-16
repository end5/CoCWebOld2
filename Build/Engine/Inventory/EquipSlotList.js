define(["require", "exports", "Engine/Utilities/List"], function (require, exports, List_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class EquipSlotList extends List_1.List {
        remove(index) {
            if (index >= 0 && index < this.list.length && this.list[index])
                this.list[index].unequip();
            super.remove(index);
        }
        clear() {
            for (const equipmentSlot of this.list) {
                if (equipmentSlot)
                    equipmentSlot.unequip();
            }
            super.clear();
        }
    }
    exports.EquipSlotList = EquipSlotList;
});
//# sourceMappingURL=EquipSlotList.js.map