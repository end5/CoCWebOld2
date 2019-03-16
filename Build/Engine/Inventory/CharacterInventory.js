define(["require", "exports", "./Inventory", "./EquipSlot", "./PiercingInventory", "./EquipSlotList", "./ItemStack"], function (require, exports, Inventory_1, EquipSlot_1, PiercingInventory_1, EquipSlotList_1, ItemStack_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class CharacterInventory {
        constructor(character, unarmedWeapon, noArmor) {
            this.cockSocks = new EquipSlotList_1.EquipSlotList();
            this.char = character;
            this.items = new Inventory_1.Inventory();
            this.gems = 0;
            this.unarmedWeaponSlot = new EquipSlot_1.EquipSlot(character);
            this.unarmedWeaponSlot.equip(unarmedWeapon);
            this.equippedWeaponSlot = new EquipSlot_1.EquipSlot(character);
            this.noArmorSlot = new EquipSlot_1.EquipSlot(character);
            this.noArmorSlot.equip(noArmor);
            this.equippedArmorSlot = new EquipSlot_1.EquipSlot(character);
            this.piercings = new PiercingInventory_1.PiercingInventory(character);
            this.armorDescMod = "";
            character.body.cocks.forEach(() => this.cockSocks.add(new EquipSlot_1.EquipSlot(character)));
            character.body.cocks.on('add', () => {
                this.cockSocks.add(new EquipSlot_1.EquipSlot(character));
            }, false);
            character.body.cocks.on('remove', (cock, index) => {
                this.cockSocks.remove(index);
            }, false);
        }
        get weapon() {
            return this.equippedWeaponSlot.item ? this.equippedWeaponSlot.item : this.unarmedWeaponSlot.item;
        }
        get armor() {
            return this.equippedArmorSlot.item ? this.equippedArmorSlot.item : this.noArmorSlot.item;
        }
        serialize() {
            const saveObj = {
                gems: this.gems,
                items: this.items.serialize(),
                piercings: this.piercings.serialize(),
                cockSocks: this.cockSocks.serialize(),
                armorDescMod: this.armorDescMod
            };
            const weapon = this.equippedWeaponSlot.serialize();
            const armor = this.equippedWeaponSlot.serialize();
            if (weapon)
                saveObj.weapon = weapon;
            if (armor)
                saveObj.armor = armor;
            return saveObj;
        }
        deserialize(saveObject) {
            this.gems = saveObject.gems;
            this.items.deserialize(saveObject.items, ItemStack_1.ItemStack);
            if (saveObject.weapon)
                this.equippedWeaponSlot.deserialize(saveObject.weapon);
            if (saveObject.armor)
                this.equippedArmorSlot.deserialize(saveObject.armor);
            this.piercings.deserialize(saveObject.piercings);
            this.cockSocks.deserialize(saveObject.cockSocks, EquipSlot_1.EquipSlot, this.char);
            while (this.cockSocks.length < this.char.body.cocks.length) {
                this.cockSocks.add(new EquipSlot_1.EquipSlot(this.char));
            }
            while (this.cockSocks.length > this.char.body.cocks.length) {
                this.cockSocks.remove(this.cockSocks.length - 1);
            }
            this.armorDescMod = saveObject.armorDescMod;
        }
    }
    exports.CharacterInventory = CharacterInventory;
});
//# sourceMappingURL=CharacterInventory.js.map