define(["require", "exports", "Engine/Items/Consumable", "../ConsumableName", "Engine/Utilities/SMath", "Engine/Items/ItemDesc", "Engine/Display/ContentView"], function (require, exports, Consumable_1, ConsumableName_1, SMath_1, ItemDesc_1, ContentView_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class PrincessPucker extends Consumable_1.Consumable {
        constructor() {
            super(ConsumableName_1.ConsumableName.PrincessPucker, new ItemDesc_1.ItemDesc("PrnsPkr", "a vial of pinkish fluid", "A vial filled with a viscous pink liquid."));
        }
        use(character) {
            ContentView_1.CView.clear();
            ContentView_1.CView.text("You uncork the bottle, and sniff it experimentally.  The fluid is slightly pink, full of flecks of gold, and smelling vaguely of raspberries.  Princess Gwynn said it was drinkable.\n\n");
            ContentView_1.CView.text("You down the bottle, hiccuping a bit at the syrupy-sweet raspberry flavor.  Immediately following the sweet is a bite of sour, like sharp lime.  You pucker your lips, and feel your head clear a bit from the intensity of flavor.  You wonder what Gwynn makes this out of.\n\n");
            ContentView_1.CView.text("Echoing the sensation in your head is an answering tingle in your body.  The sudden shock of citrusy sour has left you slightly less inclined to fuck, a little more focused on your priorities.\n\n");
            if (SMath_1.randInt(2) === 0) {
                character.stats.lust -= 20;
                character.stats.lib -= 2;
            }
            else {
                character.stats.lust -= 20;
                character.stats.sens -= 2;
            }
            if (character.body.hair.color !== "pink") {
                if (SMath_1.randInt(5) === 0) {
                    ContentView_1.CView.text("A slight tingle across your scalp draws your attention to your hair.  It seems your " + character.body.hair.color + " is rapidly gaining a distinctly pink hue, growing in from the roots!\n\n");
                    character.body.hair.color = "pink";
                }
            }
        }
    }
    exports.PrincessPucker = PrincessPucker;
});
//# sourceMappingURL=PrincessPucker.js.map