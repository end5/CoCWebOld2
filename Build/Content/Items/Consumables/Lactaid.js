define(["require", "exports", "Engine/Items/Consumable", "../ConsumableName", "Engine/Utilities/SMath", "Engine/Body/BreastRow", "Engine/Items/ItemDesc", "Content/Descriptors/BreastDescriptor", "Engine/Display/ContentView", "Content/Modifiers/BreastModifier", "Content/Modifiers/BodyModifier"], function (require, exports, Consumable_1, ConsumableName_1, SMath_1, BreastRow_1, ItemDesc_1, BreastDescriptor_1, ContentView_1, BreastModifier_1, BodyModifier_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Lactaid extends Consumable_1.Consumable {
        constructor() {
            super(ConsumableName_1.ConsumableName.Lactaid, new ItemDesc_1.ItemDesc("Lactaid", "a pink bottle labelled \"Lactaid\"", "Judging by the name printed on this bottle, 'Lactaid' probably has an effect on the ability to lactate, and you doubt that effect is a reduction."));
        }
        use(character) {
            ContentView_1.CView.clear();
            ContentView_1.CView.text("You gulp down the bottle of lactaid, easily swallowing the creamy liquid.");
            // Bump up size!
            if (character.body.chest.reduce(BreastRow_1.BreastRow.AverageSize, 0) < 8) {
                ContentView_1.CView.text("\n\n");
                if (character.body.chest.length === 1) {
                    const amount = 1 + SMath_1.randInt(5);
                    BreastModifier_1.growSmallestBreastRow(character, amount, 1);
                    ContentView_1.CView.text(BreastDescriptor_1.describeBreastGrowth(character, amount));
                }
                else {
                    const amount = 1 + SMath_1.randInt(2);
                    BreastModifier_1.growSmallestBreastRow(character, amount, character.body.chest.length);
                    ContentView_1.CView.text(BreastDescriptor_1.describeBreastGrowth(character, amount));
                }
            }
            // Character doesn't lactate
            if (character.body.chest.sort(BreastRow_1.BreastRow.LactationMost).get(0).lactationMultiplier < 1) {
                ContentView_1.CView.text("\n\n");
                ContentView_1.CView.text("You feel your " + BreastDescriptor_1.describeNipple(character, character.body.chest.firstRow) + "s become tight and engorged.  A single droplet of milk escapes each, rolling down the curves of your breasts.  <b>You are now lactating!</b>");
                for (const breastRow of character.body.chest) {
                    breastRow.lactationMultiplier += 2;
                }
            }
            // Boost lactation
            else {
                ContentView_1.CView.text("\n\n");
                ContentView_1.CView.text("Milk leaks from your " + BreastDescriptor_1.describeNipple(character, character.body.chest.firstRow) + "s in thick streams.  You're lactating even more!");
                for (const breastRow of character.body.chest) {
                    breastRow.lactationMultiplier += 1 + SMath_1.randInt(10) / 10;
                }
            }
            character.stats.lust += 10;
            if (SMath_1.randInt(3) === 0) {
                ContentView_1.CView.text(BodyModifier_1.displayModFem(character, 95, 1));
            }
        }
    }
    exports.Lactaid = Lactaid;
});
//# sourceMappingURL=Lactaid.js.map