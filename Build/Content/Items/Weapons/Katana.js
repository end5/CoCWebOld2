define(["require", "exports", "Engine/Items/Weapon", "../WeaponName", "Content/Items/WeaponPerks", "Engine/Items/ItemDesc"], function (require, exports, Weapon_1, WeaponName_1, WeaponPerks_1, ItemDesc_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Katana extends Weapon_1.Weapon {
        constructor() {
            super(WeaponName_1.WeaponName.Katana, new ItemDesc_1.ItemDesc("Katana", "a katana", "A curved bladed weapon that cuts through flesh with the greatest of ease."), "katana", "keen cut", 10, 500);
            // Take 5 off enemy armor for katana
            this.perks.set(WeaponPerks_1.WeaponPerkType.Penetrate, (self, target) => {
                return 5;
            });
        }
    }
    exports.Katana = Katana;
});
//# sourceMappingURL=Katana.js.map