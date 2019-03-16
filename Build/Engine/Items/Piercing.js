define(["require", "exports", "./EquipableItem", "./ItemType", "./ItemDesc"], function (require, exports, EquipableItem_1, ItemType_1, ItemDesc_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Piercing extends EquipableItem_1.EquipableItem {
        constructor(piercingType, shortDesc = "", longDesc = "") {
            super(piercingType, ItemType_1.ItemType.Misc, new ItemDesc_1.ItemDesc('piercing'));
            this.shortDesc = shortDesc;
            this.longDesc = longDesc;
        }
        onEquip(character) { }
        onUnequip(character) { }
        equipText() { }
        unequipText() { }
        canUse(character) {
            return true;
        }
        use(character) { }
        useText(character) { }
        serialize() {
            return Object.assign({
                short: this.desc.shortName,
                long: this.desc.longName,
            }, super.serialize());
        }
        deserialize(saveObject) {
            this.shortDesc = saveObject.short;
            this.longDesc = saveObject.long;
            super.deserialize(saveObject);
        }
    }
    exports.Piercing = Piercing;
});
//# sourceMappingURL=Piercing.js.map