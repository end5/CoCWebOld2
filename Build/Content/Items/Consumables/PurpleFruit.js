define(["require", "exports", "Engine/Items/Consumable", "../ConsumableName", "Engine/Body/BreastRow", "Engine/Items/ItemDesc", "Engine/Display/ContentView", "Content/Modifiers/BreastModifier"], function (require, exports, Consumable_1, ConsumableName_1, BreastRow_1, ItemDesc_1, ContentView_1, BreastModifier_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class PurpleFruit extends Consumable_1.Consumable {
        constructor() {
            super(ConsumableName_1.ConsumableName.PurpleFruit, new ItemDesc_1.ItemDesc("PrFruit", "a purple fruit", "This sweet-smelling produce looks like an eggplant, but feels almost squishy, and rubbery to the touch. Holding it to your ear, you think you can hear some fluid sloshing around inside."));
        }
        use(character) {
            ContentView_1.CView.clear();
            ContentView_1.CView.text("You bite into the fruit Essrayle gave you with little hesitation.  It's amazingly sweet, with a texture that's rather gummy.  The juice is a candied grape syrup that fills your cheeks and flows down your throat with far more fluid than the size of the plant should allow.  You hastily devour the entire thing, unable to stop yourself once you've started.");
            ContentView_1.CView.text("\n\nA tingling warmth shifts to a roaring inferno in your veins, your heart-rate spiking abruptly.  The intensity of it almost makes your body feel molten!  But, as quickly as it came, the sensation fades into merely a pleasing warmth that settles in your chest.");
            if (character.body.chest.reduce(BreastRow_1.BreastRow.AverageNipplesPerBreast, 0) < 4) {
                ContentView_1.CView.text("  At first you think nothing has changed, but a second look confirms that your breasts now sport the same quartet of cow-like nipples the bovine plant-girl bears.");
                if (character.body.chest.sort(BreastRow_1.BreastRow.Largest).get(0).nipples.length < 4)
                    character.body.chest.sort(BreastRow_1.BreastRow.Largest).get(0).nipples.length = 4;
                for (const breastRow of character.body.chest)
                    breastRow.nipples.count = 4;
            }
            // [Character gains quad nipples, milk production and libido way up]
            character.stats.lib += 5;
            BreastModifier_1.boostLactation(character, 3 * character.body.chest.length);
        }
    }
    exports.PurpleFruit = PurpleFruit;
});
//# sourceMappingURL=PurpleFruit.js.map