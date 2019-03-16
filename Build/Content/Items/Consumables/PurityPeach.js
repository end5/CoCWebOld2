define(["require", "exports", "Engine/Items/Consumable", "../ConsumableName", "Engine/Items/ItemDesc", "Engine/Display/ContentView"], function (require, exports, Consumable_1, ConsumableName_1, ItemDesc_1, ContentView_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class PurityPeach extends Consumable_1.Consumable {
        constructor() {
            super(ConsumableName_1.ConsumableName.PurityPeach, new ItemDesc_1.ItemDesc("PurPeac", "a pure peach", "This is a peach from Minerva's spring, yellowy-orange with red stripes all over it."), 10);
        }
        use(character) {
            ContentView_1.CView.clear();
            ContentView_1.CView.text("You bite into the sweet, juicy peach, feeling a sensation of energy sweeping through your limbs and your mind.  You feel revitalized, refreshed, and somehow cleansed.");
            character.stats.fatigue -= 15;
            character.stats.HP += Math.round(character.stats.maxHP * 0.25);
        }
    }
    exports.PurityPeach = PurityPeach;
});
//# sourceMappingURL=PurityPeach.js.map