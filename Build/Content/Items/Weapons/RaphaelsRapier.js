define(["require", "exports", "Engine/Items/Weapon", "../WeaponName", "Engine/Items/ItemDesc", "Content/Scenes/NPCs/Raphael"], function (require, exports, Weapon_1, WeaponName_1, ItemDesc_1, Raphael_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class RaphaelsRapier extends Weapon_1.Weapon {
        constructor() {
            super(WeaponName_1.WeaponName.RaphaelsRapier, new ItemDesc_1.ItemDesc("RRapier", "Raphael's vulpine rapier", "He's bound it with his red sash around the length like a ribbon, as though he has now gifted it to you.  Perhaps it is his way of congratulating you."), "vulpine rapier", "slash", 8, 1000);
        }
        get attack() {
            return 8 + Raphael_1.RaphaelFlags.RAPHAEL_RAPIER_TRANING * 2;
        }
    }
    exports.RaphaelsRapier = RaphaelsRapier;
});
//# sourceMappingURL=RaphaelsRapier.js.map