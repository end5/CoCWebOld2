define(["require", "exports", "Engine/Items/Armor", "../ArmorName", "Engine/Items/ItemDesc", "Engine/Display/ContentView"], function (require, exports, Armor_1, ArmorName_1, ItemDesc_1, ContentView_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class LeatherArmorSegments extends Armor_1.Armor {
        constructor() {
            super(ArmorName_1.ArmorName.LeatherArmorSegments, new ItemDesc_1.ItemDesc("UrtaLta", "leather armor segments"), "leather armor segments", 5, 76, "Light", true);
        }
        unequipText() {
            ContentView_1.CView.text("You have your old set of " + this.desc.longName + " left over.  ");
        }
        onUnequip(character) {
            // return Game.libraries.armor.get("LeathrA");
            super.onUnequip(character);
        }
    }
    exports.LeatherArmorSegments = LeatherArmorSegments;
});
//# sourceMappingURL=LeatherArmorSegments.js.map