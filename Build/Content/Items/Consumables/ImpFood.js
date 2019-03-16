define(["require", "exports", "Engine/Items/Consumable", "../ConsumableName", "Engine/Utilities/SMath", "Engine/Body/Skin", "Engine/Items/ItemDesc", "Engine/Display/ContentView", "Content/Modifiers/CockModifier", "Content/Modifiers/StatModifier"], function (require, exports, Consumable_1, ConsumableName_1, SMath_1, Skin_1, ItemDesc_1, ContentView_1, CockModifier_1, StatModifier_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class ImpFood extends Consumable_1.Consumable {
        constructor() {
            super(ConsumableName_1.ConsumableName.ImpFood, new ItemDesc_1.ItemDesc("ImpFood", "a parcel of imp food", "This is a small parcel of reddish-brown bread stuffed with some kind of meat.  It smells delicious."));
        }
        use(character) {
            ContentView_1.CView.clear();
            if (character.body.cocks.length > 0) {
                ContentView_1.CView.text("The food tastes strange and corrupt - you can't really think of a better word for it, but it's unclean.");
                if (character.body.cocks.get(0).length < 12) {
                    const growthAmount = CockModifier_1.growCock(character, character.body.cocks.get(0), SMath_1.randInt(2) + 2);
                    ContentView_1.CView.text("\n\n");
                    CockModifier_1.displayLengthChange(character, growthAmount, 1);
                }
                ContentView_1.CView.text("\n\nInhuman vitality spreads through your body, invigorating you!\n");
                StatModifier_1.displayCharacterHPChange(character, 30 + character.stats.tou / 3);
                character.stats.lust += 3;
                character.stats.cor += 1;
                // Shrinkage!
                if (SMath_1.randInt(2) === 0 && character.body.tallness > 42) {
                    ContentView_1.CView.text("\n\nYour skin crawls, making you close your eyes and shiver.  When you open them again the world seems... different.  After a bit of investigation, you realize you've become shorter!\n");
                    character.body.tallness -= 1 + SMath_1.randInt(3);
                }
                // Red skin!
                if (SMath_1.randInt(30) === 0 && character.body.skin.tone !== "red") {
                    if (character.body.skin.type === Skin_1.SkinType.FUR)
                        ContentView_1.CView.text("\n\nUnderneath your fur, your skin ");
                    else
                        ContentView_1.CView.text("\n\nYour " + character.body.skin.desc + " ");
                    if (SMath_1.randInt(2) === 0)
                        character.body.skin.tone = "red";
                    else
                        character.body.skin.tone = "orange";
                    ContentView_1.CView.text("begins to lose its color, fading until you're as white as an albino.  Then, starting at the crown of your head, a reddish hue rolls down your body in a wave, turning you completely " + character.body.skin.tone + ".");
                }
                return;
            }
            else {
                ContentView_1.CView.text("The food tastes... corrupt, for lack of a better word.\n");
                StatModifier_1.displayCharacterHPChange(character, 20 + character.stats.tou / 3);
                character.stats.lust += 3;
                character.stats.cor += 1;
            }
            // Red skin!
            if (SMath_1.randInt(30) === 0 && character.body.skin.tone !== "red") {
                if (character.body.skin.type === Skin_1.SkinType.FUR)
                    ContentView_1.CView.text("\n\nUnderneath your fur, your skin ");
                else
                    ContentView_1.CView.text("\n\nYour " + character.body.skin.desc + " ");
                if (SMath_1.randInt(2) === 0)
                    character.body.skin.tone = "red";
                else
                    character.body.skin.tone = "orange";
                ContentView_1.CView.text("begins to lose its color, fading until you're as white as an albino.  Then, starting at the crown of your head, a reddish hue rolls down your body in a wave, turning you completely " + character.body.skin.tone + ".");
            }
            // Shrinkage!
            if (SMath_1.randInt(2) === 0 && character.body.tallness > 42) {
                ContentView_1.CView.text("\n\nYour skin crawls, making you close your eyes and shiver.  When you open them again the world seems... different.  After a bit of investigation, you realize you've become shorter!");
                character.body.tallness -= 1 + SMath_1.randInt(3);
            }
        }
    }
    exports.ImpFood = ImpFood;
});
//# sourceMappingURL=ImpFood.js.map