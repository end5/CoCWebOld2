define(["require", "exports", "Engine/Items/Consumable", "../ConsumableName", "Engine/Items/ItemDesc", "Engine/Display/ContentView"], function (require, exports, Consumable_1, ConsumableName_1, ItemDesc_1, ContentView_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class IsabellaMilk extends Consumable_1.Consumable {
        constructor() {
            super(ConsumableName_1.ConsumableName.IsabellaMilk, new ItemDesc_1.ItemDesc("IzyMilk", "a bottle of Isabella's milk", "This is a bottle of Isabella's milk.  Isabella seems fairly certain it will invigorate you."));
        }
        use(character) {
            ContentView_1.CView.clear();
            ContentView_1.CView.text("You swallow down the bottle of Isabella's milk.");
            if (character.stats.fatigue > 0)
                ContentView_1.CView.text("  You feel much less tired! (-33 fatigue)");
            character.stats.fatigue -= 33;
        }
    }
    exports.IsabellaMilk = IsabellaMilk;
});
//# sourceMappingURL=IsabellaMilk.js.map