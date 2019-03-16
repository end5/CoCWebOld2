define(["require", "exports", "Engine/Items/Weapon", "../WeaponName", "Content/Items/WeaponPerks", "Engine/Items/ItemDesc", "Engine/Display/ContentView"], function (require, exports, Weapon_1, WeaponName_1, WeaponPerks_1, ItemDesc_1, ContentView_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class HugeWarhammer extends Weapon_1.Weapon {
        constructor() {
            super(WeaponName_1.WeaponName.HugeWarhammer, new ItemDesc_1.ItemDesc("Warhammer", "a huge warhammer", "A huge war-hammer made almost entirely of steel that only the strongest warriors could use.  Requires 80 strength to use.  Getting hit with this might stun the victim."), "huge warhammer", "smash", 15, 1600, [WeaponPerks_1.WeaponPerkType.Large]);
        }
        canUse(character) {
            if (character.stats.str >= 80)
                return true;
            ContentView_1.CView.text("You aren't strong enough to handle such a heavy weapon!  ");
            return false;
        }
    }
    exports.HugeWarhammer = HugeWarhammer;
});
//# sourceMappingURL=HugeWarhammer.js.map