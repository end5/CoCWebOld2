define(["require", "exports", "Engine/Items/Consumable", "../ConsumableName", "Engine/Items/ItemDesc", "Engine/Display/ContentView", "Content/Modifiers/BodyModifier"], function (require, exports, Consumable_1, ConsumableName_1, ItemDesc_1, ContentView_1, BodyModifier_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class GiantChocolateCupcake extends Consumable_1.Consumable {
        constructor() {
            super(ConsumableName_1.ConsumableName.GiantChocolateCupcake, new ItemDesc_1.ItemDesc("CCupcak", "a gigantic, chocolate cupcake"), 250);
        }
        use(character) {
            ContentView_1.CView.clear();
            ContentView_1.CView.text("You look down at the massive chocolate cupcake and wonder just how you can possibly eat it all.  It fills the over-sized wrapper and bulges out over the top, somehow looking obscene even though it's merely a baked treat.  There is a single candle positioned atop its summit, and it bursts into flame as if by magic.  Eight red gumdrops ring the outer edge of the cupcake, illuminated by the flame.\n\n");
            ContentView_1.CView.text("You hesitantly take a bite.  It's sweet, as you'd expect, but there's also a slightly salty, chocolaty undercurrent of flavor.  Even knowing what the minotaur put in Maddie's mix, you find yourself grateful that this new creation doesn't seem to have any of his 'special seasonings'.  It wouldn't do to be getting drugged up while you're slowly devouring the massive, muffin-molded masterpiece. Before you know it, most of the cupcake is gone and you polish off the last chocolaty bites before licking your fingers clean.\n\n");
            ContentView_1.CView.text("Gods, you feel heavy!  You waddle slightly as your body begins thickening, swelling until you feel as wide as a house.  Lethargy spreads through your limbs, and you're forced to sit still a little while until you let out a lazy burp.\n\n");
            ContentView_1.CView.text("As you relax in your sugar-coma, you realize your muscle definition is fading away, disappearing until your " + character.body.skin.desc + " looks nearly as soft and spongy as Maddie's own.  You caress the soft, pudgy mass and shiver in delight, dimly wondering if this is how the cupcake-girl must feel all the time.");
            ContentView_1.CView.text(BodyModifier_1.displayModTone(character, 0, 100));
            ContentView_1.CView.text(BodyModifier_1.displayModThickness(character, 100, 100));
        }
    }
    exports.GiantChocolateCupcake = GiantChocolateCupcake;
});
//# sourceMappingURL=GiantChocolateCupcake.js.map