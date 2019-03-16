define(["require", "exports", "Engine/Items/Armor", "../ArmorName", "Engine/Items/ItemDesc"], function (require, exports, Armor_1, ArmorName_1, ItemDesc_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class ComfortableClothes extends Armor_1.Armor {
        constructor() {
            super(ArmorName_1.ArmorName.ComfortClothes, new ItemDesc_1.ItemDesc("C.Cloth", "a set of comfortable clothes", "These loose fitting and comfortable clothes allow you to move freely while protecting you from the elements."), "comfortable clothes", 0, 0, "Light", true);
        }
        supportsBulge(character) {
            return character.inventory.armorDescMod !== "crotch-hugging clothes";
        }
    }
    exports.ComfortableClothes = ComfortableClothes;
});
//# sourceMappingURL=ComfortableClothes.js.map