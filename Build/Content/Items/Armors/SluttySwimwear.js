define(["require", "exports", "../ArmorName", "Engine/Items/Armor", "Engine/Body/BreastRow", "Engine/Body/Cock", "Content/Effects/EffectType", "Engine/Items/ItemDesc", "Content/Descriptors/BallsDescriptor", "Content/Descriptors/CockDescriptor", "Engine/Display/ContentView"], function (require, exports, ArmorName_1, Armor_1, BreastRow_1, Cock_1, EffectType_1, ItemDesc_1, BallsDescriptor_1, CockDescriptor_1, ContentView_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class SluttySwimwear extends Armor_1.Armor {
        constructor() {
            super(ArmorName_1.ArmorName.SluttySwimwear, new ItemDesc_1.ItemDesc("S.Swmwr", "a skimpy black bikini", "An impossibly skimpy black bikini. You feel dirty just looking at it... and a little aroused, actually."), "slutty swimwear", 0, 6, "Light", true);
            this.effects.create(EffectType_1.EffectType.SluttySeduction, { teaseDamage: 6 });
        }
        useText(character) {
            character.stats.lust += 5;
            if (character.body.chest.sort(BreastRow_1.BreastRow.Largest).get(0).rating < 1)
                ContentView_1.CView.text("You feel rather stupid putting the top part on like this, but you're willing to bear with it. It could certainly be good for distracting.  ");
            else {
                ContentView_1.CView.text("The bikini top clings tightly to your bustline, sending a shiver of pleasure through your body. It serves to turn you on quite nicely.  ");
                character.stats.lust += 5;
            }
            if (character.body.cocks.length <= 0) {
                ContentView_1.CView.text("The thong moves over your smooth groin, clinging onto your buttocks nicely.  ");
                if (character.body.balls.count > 0) {
                    if (character.body.balls.size > 5)
                        ContentView_1.CView.text("You do your best to put the thong on, and while the material is very stretchy, it simply can't even begin to cover everything, and your " + BallsDescriptor_1.describeBalls(true, true, character) + " hang on the sides, exposed.  Maybe if you shrunk your male parts down a little...");
                    else
                        ContentView_1.CView.text("However, your testicles do serve as an area of discomfort, stretching the material and bulging out the sides slightly.  ");
                }
            }
            else {
                if (character.body.cocks.length === 1) {
                    ContentView_1.CView.text("You grunt in discomfort, your " + CockDescriptor_1.describeCock(character, character.body.cocks.get(0)) + " flopping free from the thong's confines. The tight material rubbing against your dick does manage to turn you on slightly.  ");
                }
                else {
                    ContentView_1.CView.text("You grunt in discomfort, your " + CockDescriptor_1.describeCocksLight(character) + " flopping free from the thong's confines. The tight material rubbing against your dicks does manage to turn you on slightly.  ");
                }
                character.stats.lust += 5;
                if (character.body.cocks.sort(Cock_1.Cock.Largest).get(0).area >= 20)
                    ContentView_1.CView.text("You do your best to put the thong on, and while the material is very stretchy, it simply can't even begin to cover everything, and your " + CockDescriptor_1.describeCock(character, character.body.cocks.sort(Cock_1.Cock.Largest).get(0)) + " has popped out of the top, completely exposed.  Maybe if you shrunk your male parts down a little...");
                // If dick is 7+ inches OR balls are apple-sized]
                else if (character.body.balls.size > 5)
                    ContentView_1.CView.text("You do your best to put the thong on, and while the material is very stretchy, it simply can't even begin to cover everything, and your " + BallsDescriptor_1.describeBalls(true, true, character) + " hang on the sides, exposed.  Maybe if you shrunk your male parts down a little...");
            }
            ContentView_1.CView.text("\n\n");
        }
    }
    exports.SluttySwimwear = SluttySwimwear;
});
//# sourceMappingURL=SluttySwimwear.js.map