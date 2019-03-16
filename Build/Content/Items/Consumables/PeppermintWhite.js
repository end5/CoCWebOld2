define(["require", "exports", "Engine/Items/Consumable", "../ConsumableName", "Engine/Items/ItemDesc", "Engine/Display/ContentView", "Content/Modifiers/StatModifier"], function (require, exports, Consumable_1, ConsumableName_1, ItemDesc_1, ContentView_1, StatModifier_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class PeppermintWhite extends Consumable_1.Consumable {
        constructor() {
            super(ConsumableName_1.ConsumableName.PeppermintWhite, new ItemDesc_1.ItemDesc("PeppWht", "a vial of peppermint white", "This tightly corked glass bottle gives off a pepperminty smell and reminds you of the winter holidays.  How odd."), 120);
        }
        use(character) {
            ContentView_1.CView.clear();
            ContentView_1.CView.text("You pull the cork off the gift from the mysterious stranger.  The scent of alluring mint fills your nose once again.  You bring the head of the bottle to your lips and tip it back, the creamy white fluid hits your tongue and slips down your throat.  The liquid is surprisingly refreshing, the creamy mint flavor clings to your tongue and mouth, and makes your breath feel cool as you exhale over your lips.  You can feel the liquid drip down to your stomach and fill you with a pleasant warmth and holiday cheer.\n\n");
            // Recovers health and fatigue, adds five to max health, and one to libido.
            StatModifier_1.displayCharacterHPChange(character, character.stats.maxHP);
            character.stats.fatigue -= 100;
        }
    }
    exports.PeppermintWhite = PeppermintWhite;
});
//# sourceMappingURL=PeppermintWhite.js.map