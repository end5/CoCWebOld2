define(["require", "exports", "./EquipableItem", "./ItemType", "Engine/Display/ContentView"], function (require, exports, EquipableItem_1, ItemType_1, ContentView_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Armor extends EquipableItem_1.EquipableItem {
        constructor(name, desc, displayname, defense, value, armorClass = "Light", supportsBulge = false) {
            super(name, ItemType_1.ItemType.Armor, desc, value);
            this.displayName = displayname;
            this.defenseValue = defense;
            this.armorClass = armorClass;
            this.canBulge = supportsBulge;
        }
        get defense() {
            return this.defenseValue;
        }
        supportsBulge(character) { return this.canBulge && character.inventory.armorDescMod === ""; }
        // For most clothes if the armorDescMod is set then it's Exgartuan's doing. The comfortable clothes are the exception, they override this function.
        canUse(_character) {
            return true;
        }
        useText(_character) {
            ContentView_1.CView.text("You equip " + this.desc.longName + ".  ");
        }
        describe() {
            return super.describe() + " (DEF: +" + this.defenseValue + ")";
        }
        use(_character) { }
        equipText() { }
        unequipText() { }
        onEquip(_character) { }
        /**
         * This item is being unequiped by the character. Remove any perks, etc. - This should only handle mechanics, not text output
         * @param character
         */
        onUnequip(character) {
            if (character.inventory.armorDescMod.length > 0)
                character.inventory.armorDescMod = "";
        }
    }
    exports.Armor = Armor;
});
//# sourceMappingURL=Armor.js.map