define(["require", "exports", "Engine/Items/Consumable", "../ConsumableName", "Engine/Utilities/SMath", "Engine/Items/ItemDesc", "Engine/Display/ContentView", "Content/Modifiers/BodyModifier"], function (require, exports, Consumable_1, ConsumableName_1, SMath_1, ItemDesc_1, ContentView_1, BodyModifier_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class ScholarsTea extends Consumable_1.Consumable {
        constructor() {
            super(ConsumableName_1.ConsumableName.ScholarsTea, new ItemDesc_1.ItemDesc("Scholars T.", "a cup of scholar's tea", "This powerful brew supposedly has mind-strengthening effects."), 0);
        }
        use(character) {
            ContentView_1.CView.clear();
            ContentView_1.CView.text("Following the merchant's instructions, you steep and drink the tea. Its sharp taste fires up your palate and in moments, you find yourself more alert and insightful. As your mind wanders, a creative, if somewhat sordid, story comes to mind. It is a shame that you do not have writing implements as you feel you could make a coin or two off what you have conceived. The strange seller was not lying about the power of the tea.");
            if (SMath_1.randInt(3) === 0)
                ContentView_1.CView.text(BodyModifier_1.displayModTone(character, 15, 1));
            character.stats.int = 2.5 + SMath_1.randInt(5);
        }
    }
    exports.ScholarsTea = ScholarsTea;
});
//# sourceMappingURL=ScholarsTea.js.map