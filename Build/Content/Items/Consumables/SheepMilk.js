define(["require", "exports", "Engine/Items/Consumable", "../ConsumableName", "Engine/Items/ItemDesc", "Engine/Display/ContentView"], function (require, exports, Consumable_1, ConsumableName_1, ItemDesc_1, ContentView_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class SheepMilk extends Consumable_1.Consumable {
        constructor() {
            super(ConsumableName_1.ConsumableName.SheepMilk, new ItemDesc_1.ItemDesc("SheepMk", "a bottle of sheep milk", "This bottle of sheep milk is said to have corruption-fighting properties.  It may be useful."));
        }
        use(character) {
            ContentView_1.CView.clear();
            ContentView_1.CView.text("You gulp the bottle's contents, and its sweet taste immediately invigorates you, making you feel calm and concentrated");
            // -30 fatigue, -2 libido, -10 lust]
            character.stats.fatigue -= 30;
            character.stats.lib += -.25;
            character.stats.lust += -10;
            character.stats.cor += -0.5;
        }
    }
    exports.SheepMilk = SheepMilk;
});
//# sourceMappingURL=SheepMilk.js.map