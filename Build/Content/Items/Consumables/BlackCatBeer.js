define(["require", "exports", "Engine/Items/Consumable", "../ConsumableName", "Engine/Items/ItemDesc", "Content/Scenes/Places/TelAdre/Niamh"], function (require, exports, Consumable_1, ConsumableName_1, ItemDesc_1, Niamh_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class BlackCatBeer extends Consumable_1.Consumable {
        constructor() {
            super(ConsumableName_1.ConsumableName.BlackCatBeer, new ItemDesc_1.ItemDesc("BC Beer", "a mug of Black Cat Beer", "A capped mug containing an alcoholic drink secreted from the breasts of Niamh.  It smells tasty."), 1);
        }
        use(character) {
            Niamh_1.blackCatBeerEffects(character);
        }
    }
    exports.BlackCatBeer = BlackCatBeer;
});
//# sourceMappingURL=BlackCatBeer.js.map