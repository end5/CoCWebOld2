define(["require", "exports", "Engine/Items/Armor", "../ArmorName", "Engine/Items/ItemDesc", "Content/Descriptors/ButtDescriptor"], function (require, exports, Armor_1, ArmorName_1, ItemDesc_1, ButtDescriptor_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class FurLoincloth extends Armor_1.Armor {
        constructor() {
            super(ArmorName_1.ArmorName.FurLoincloth, new ItemDesc_1.ItemDesc("FurLoin", "a front and back set of loincloths", "A pair of loincloths to cover your crotch and butt.  Typically worn by people named 'Conan'."), "revealing fur loincloths", 0, 100, "Light");
        }
        description(character) {
            return "A pair of loincloths to cover your crotch and " + ButtDescriptor_1.describeButt(character) + ".  Typically worn by people named 'Conan'.";
        }
    }
    exports.FurLoincloth = FurLoincloth;
});
//# sourceMappingURL=FurLoincloth.js.map