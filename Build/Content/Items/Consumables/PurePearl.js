define(["require", "exports", "Engine/Items/Consumable", "../ConsumableName", "Content/Effects/EffectType", "Engine/Items/ItemDesc", "Engine/Display/ContentView"], function (require, exports, Consumable_1, ConsumableName_1, EffectType_1, ItemDesc_1, ContentView_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class PurePearl extends Consumable_1.Consumable {
        constructor() {
            super(ConsumableName_1.ConsumableName.PurePearl, new ItemDesc_1.ItemDesc("P.Pearl", "a pure pearl"), 1000);
        }
        use(character) {
            ContentView_1.CView.clear();
            ContentView_1.CView.text("You cram the pearl in your mouth and swallow it like a giant pill with some difficulty.  Surprisingly there is no discomfort, only a cool calming sensation that springs up from your core.");
            character.stats.lib += -5;
            character.stats.lust += -25;
            character.stats.cor += -10;
            if (!character.effects.has(EffectType_1.EffectType.PurityBlessing))
                character.effects.create(EffectType_1.EffectType.PurityBlessing);
        }
    }
    exports.PurePearl = PurePearl;
});
//# sourceMappingURL=PurePearl.js.map