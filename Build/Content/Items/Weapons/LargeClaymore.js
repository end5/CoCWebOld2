define(["require", "exports", "Engine/Items/Weapon", "../WeaponName", "Content/Items/WeaponPerks", "Engine/Items/ItemDesc", "Engine/Display/ContentView"], function (require, exports, Weapon_1, WeaponName_1, WeaponPerks_1, ItemDesc_1, ContentView_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class LargeClaymore extends Weapon_1.Weapon {
        constructor() {
            super(WeaponName_1.WeaponName.LargeClaymore, new ItemDesc_1.ItemDesc("L.Claymore", "a large claymore", "A massive sword that a very strong warrior might use.  Requires 40 strength to use."), "large claymore", "cleaving sword-slash", 15, 1000, [WeaponPerks_1.WeaponPerkType.Large]);
        }
        canUse(character) {
            if (character.stats.str >= 40)
                return true;
            ContentView_1.CView.text("You aren't strong enough to handle such a heavy weapon!  ");
            return false;
        }
    }
    exports.LargeClaymore = LargeClaymore;
});
//# sourceMappingURL=LargeClaymore.js.map