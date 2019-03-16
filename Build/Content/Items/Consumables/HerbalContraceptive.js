define(["require", "exports", "Engine/Items/Consumable", "../ConsumableName", "Content/Effects/EffectType", "Engine/Items/ItemDesc", "Engine/Display/ContentView"], function (require, exports, Consumable_1, ConsumableName_1, EffectType_1, ItemDesc_1, ContentView_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class HerbalContraceptive extends Consumable_1.Consumable {
        constructor() {
            super(ConsumableName_1.ConsumableName.HerbalContraceptive, new ItemDesc_1.ItemDesc("HrblCnt", "a bundle of verdant green leaves", "A small bundle of verdant green leaves."));
        }
        use(character) {
            ContentView_1.CView.clear();
            // Placeholder, sue me
            ContentView_1.CView.text("You chew on the frankly awfully bitter leaves as quickly as possible before swallowing them down.");
            character.effects.create(EffectType_1.EffectType.Contraceptives, { combatExpire: 48 });
        }
    }
    exports.HerbalContraceptive = HerbalContraceptive;
});
//# sourceMappingURL=HerbalContraceptive.js.map