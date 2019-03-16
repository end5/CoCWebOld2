define(["require", "exports", "./WeaponPerkLib", "Engine/Utilities/Dictionary", "./EquipableItem", "./ItemType", "Engine/Display/ContentView"], function (require, exports, WeaponPerkLib_1, Dictionary_1, EquipableItem_1, ItemType_1, ContentView_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Weapon extends EquipableItem_1.EquipableItem {
        constructor(name, desc, displayname, verb, attack, value, perks) {
            super(name, ItemType_1.ItemType.Weapon, desc, value);
            this.displayName = displayname;
            this.verb = verb;
            this.attackValue = attack;
            this.perks = new Dictionary_1.Dictionary();
            if (perks)
                for (const perk of perks)
                    if (WeaponPerkLib_1.WeaponPerkLib.has(perk))
                        this.perks.set(perk, WeaponPerkLib_1.WeaponPerkLib.get(perk));
        }
        get attack() {
            return this.attackValue;
        }
        use(character) { }
        canUse(character) {
            return true;
        }
        useText(character) {
            ContentView_1.CView.text("You equip " + this.desc.longName + ".  ");
        }
        describe() {
            return super.describe() + " (ATK: +" + this.attack + ")";
        }
        onEquip(character) { }
        onUnequip(character) { }
        equipText() { }
        unequipText() { }
    }
    exports.Weapon = Weapon;
});
//# sourceMappingURL=Weapon.js.map