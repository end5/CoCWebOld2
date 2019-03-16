define(["require", "exports", "./EquipableItem", "./ItemType", "./ItemDesc"], function (require, exports, EquipableItem_1, ItemType_1, ItemDesc_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class CockSock extends EquipableItem_1.EquipableItem {
        constructor(name) {
            super(name, ItemType_1.ItemType.Misc, new ItemDesc_1.ItemDesc(name + 'cock sock'));
        }
        equipText() { }
        unequipText() { }
        canUse(character) {
            return true;
        }
        use(character) { }
        useText(character) { }
        onEquip(character) { }
        onUnequip(character) { }
    }
    exports.CockSock = CockSock;
});
//# sourceMappingURL=CockSock.js.map