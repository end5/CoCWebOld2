define(["require", "exports", "Engine/Items/Consumable", "../ConsumableName", "Engine/Utilities/SMath", "Engine/Items/ItemDesc", "Engine/Display/ContentView", "Content/Settings"], function (require, exports, Consumable_1, ConsumableName_1, SMath_1, ItemDesc_1, ContentView_1, Settings_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class GodsMead extends Consumable_1.Consumable {
        constructor() {
            super(ConsumableName_1.ConsumableName.GodsMead, new ItemDesc_1.ItemDesc("GodMead", "a pint of god's mead"));
        }
        use(character) {
            ContentView_1.CView.clear();
            ContentView_1.CView.text("You take a hearty swig of mead, savoring the honeyed taste on your tongue.  Emboldened by the first drink, you chug the remainder of the horn's contents in no time flat.  You wipe your lips, satisfied, and let off a small belch as you toss the empty horn aside.");
            // Libido: No desc., always increases.
            // Corruption: No desc., always decreases.
            character.stats.lib += 1;
            character.stats.cor -= 1;
            // Health/HP(Large increase; always occurs):
            ContentView_1.CView.text("\n\nYou feel suddenly invigorated by the potent beverage, like you could take on a whole horde of barbarians or giants and come out victorious!");
            character.stats.HP += Math.round(character.stats.maxHP * .33);
            if (SMath_1.randInt(3) === 0) {
                ContentView_1.CView.text("\n\nThe alcohol fills your limbs with vigor, making you feel like you could take on the world with just your fists!");
                if (Settings_1.Settings.sillyMode)
                    ContentView_1.CView.text("  Maybe you should run around shirtless, drink, and fight!  Saxton Hale would be proud.");
                character.stats.str += 1;
            }
            // Tough:
            else {
                ContentView_1.CView.text("\n\nYou thump your chest and grin - your foes will have a harder time taking you down while you're fortified by liquid courage.");
                character.stats.tou += 1;
            }
            // Grow Beard [ONLY if PC has a masculine face & a dick.)( -- Why? Bearded ladies are also a fetish [That's just nasty.] (I want a lady beard)): A sudden tingling runs along your chin. You rub it with your hand, and find a thin layer of bristles covering your lower face. You now sport a fine [character.HairColor] beard!
            // [If character already has beard] A sudden tingling runs along your chin. You stroke your beard proudly as it slowly grows in length and lustre.
            // Grow hair: Your scalp is beset by pins and needles as your hair grows out, stopping after it reaches [medium/long] length.}
        }
    }
    exports.GodsMead = GodsMead;
});
//# sourceMappingURL=GodsMead.js.map