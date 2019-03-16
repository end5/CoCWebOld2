define(["require", "exports", "Engine/Items/Weapon", "../WeaponName", "Content/Items/WeaponPerks", "Engine/Items/ItemDesc", "Engine/Display/ContentView", "Engine/CharDict"], function (require, exports, Weapon_1, WeaponName_1, WeaponPerks_1, ItemDesc_1, ContentView_1, CharDict_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class BeautifulSword extends Weapon_1.Weapon {
        constructor() {
            super(WeaponName_1.WeaponName.BeautifulSword, new ItemDesc_1.ItemDesc("B.Sword", "a beautiful shining sword", "This beautiful sword shines brilliantly in the light, showing the flawless craftsmanship of its blade.  The pommel and guard are heavily decorated in gold and brass.  Some craftsman clearly poured his heart and soul into this blade."), "beautiful sword", "slash", 7, 400, [WeaponPerks_1.WeaponPerkType.HolySword]);
        }
        get attack() {
            return 7 + Math.floor(10 - CharDict_1.CharDict.player.stats.cor / 3);
        }
        canUse(character) {
            if (character.stats.cor < 35)
                return true;
            ContentView_1.CView.text("You grab hold of the handle of the sword only to have it grow burning hot.  You're forced to let it go lest you burn yourself.  Something within the sword must be displeased.  ");
            return false;
        }
    }
    exports.BeautifulSword = BeautifulSword;
});
//# sourceMappingURL=BeautifulSword.js.map