define(["require", "exports", "Engine/Items/Weapon", "../WeaponName", "Content/Items/WeaponPerks", "Engine/Items/ItemDesc", "Content/Scenes/NPCs/Raphael"], function (require, exports, Weapon_1, WeaponName_1, WeaponPerks_1, ItemDesc_1, Raphael_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class JeweledRapier extends Weapon_1.Weapon {
        constructor() {
            super(WeaponName_1.WeaponName.JeweledRapier, new ItemDesc_1.ItemDesc("JRapier", "a jeweled rapier", "This jeweled rapier is ancient but untarnished.  The hilt is wonderfully made, and fits your hand like a tailored glove.  The blade is shiny and perfectly designed for stabbing."), "jeweled rapier", "slash", 13, 1400, [WeaponPerks_1.WeaponPerkType.Penetrate]);
        }
        get attack() {
            return (13 + Raphael_1.RaphaelFlags.RAPHAEL_RAPIER_TRANING * 2);
        }
    }
    exports.JeweledRapier = JeweledRapier;
});
//# sourceMappingURL=JeweledRapier.js.map