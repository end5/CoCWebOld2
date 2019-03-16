define(["require", "exports", "Engine/Items/Weapon", "../WeaponName", "Content/Items/WeaponPerks", "Engine/Items/ItemDesc", "Engine/Display/ContentView"], function (require, exports, Weapon_1, WeaponName_1, WeaponPerks_1, ItemDesc_1, ContentView_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class LargeHammer extends Weapon_1.Weapon {
        constructor() {
            super(WeaponName_1.WeaponName.LargeHammer, new ItemDesc_1.ItemDesc("L.Hammr", "Marble's large hammer", "This two-handed warhammer looks pretty devastating.  You took it from Marble after she refused your advances."), "large hammer", "smash", 16, 90, [WeaponPerks_1.WeaponPerkType.Large]);
        }
        canUse(character) {
            if (character.body.tallness >= 60)
                return true;
            ContentView_1.CView.text("This hammer is too large for you to wield effectively.  ");
            return false;
        }
    }
    exports.LargeHammer = LargeHammer;
});
//# sourceMappingURL=LargeHammer.js.map