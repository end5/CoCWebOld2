define(["require", "exports", "Engine/Utilities/List", "Engine/Items/ItemDict"], function (require, exports, List_1, ItemDict_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class EquipSlot {
        constructor(character) {
            this.character = character;
            this.slotEffects = new List_1.List();
        }
        static FilterName(name) {
            return (a) => {
                return !!a.item && a.item.name === name;
            };
        }
        get item() {
            return this.equippedItem;
        }
        isEquipped() {
            return !!this.equippedItem;
        }
        equip(item) {
            if (item) {
                let unequippedItem;
                if (this.isEquipped())
                    unequippedItem = this.unequip();
                const itemToEquip = item.onEquip(this.character);
                for (const effect of item.effects)
                    this.character.effects.add(effect);
                for (const effect of this.slotEffects)
                    this.character.effects.add(effect);
                if (itemToEquip)
                    this.equippedItem = itemToEquip;
                else
                    this.equippedItem = item;
                if (unequippedItem)
                    return unequippedItem;
            }
            return;
        }
        unequip() {
            if (!this.equippedItem)
                return;
            const unequippedItem = this.equippedItem;
            this.equippedItem.onUnequip(this.character);
            this.equippedItem = undefined;
            for (const effect of unequippedItem.effects)
                this.character.effects.removeEntry(effect);
            for (const effect of this.slotEffects)
                this.character.effects.removeEntry(effect);
            return unequippedItem;
        }
        serialize() {
            if (this.equippedItem)
                return { item: this.equippedItem.serialize() };
        }
        deserialize(saveObject) {
            if (saveObject && saveObject.item) {
                this.equip(ItemDict_1.ItemDict.getByName(saveObject.item.name));
            }
        }
    }
    exports.EquipSlot = EquipSlot;
});
//# sourceMappingURL=EquipSlot.js.map