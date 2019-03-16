define(["require", "exports", "Engine/Items/Consumable", "../ConsumableName", "Engine/Utilities/SMath", "Content/Effects/EffectType", "Engine/Items/ItemDesc", "Content/Descriptors/BallsDescriptor", "Content/Descriptors/CockDescriptor", "Engine/Display/ContentView", "Content/Modifiers/BodyModifier"], function (require, exports, Consumable_1, ConsumableName_1, SMath_1, EffectType_1, ItemDesc_1, BallsDescriptor_1, CockDescriptor_1, ContentView_1, BodyModifier_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class SuccubisDream extends Consumable_1.Consumable {
        constructor() {
            super(ConsumableName_1.ConsumableName.SuccubisDream, new ItemDesc_1.ItemDesc("S.Dream", "a bottle of 'Succubus' Dream'", "This precious fluid is often given to men a succubus intends to play with for a long time, though this batch has been enhanced by Lumi to have even greater potency."));
        }
        use(character) {
            let changes = 0;
            let crit = 1;
            // Determine crit multiplier (x2 or x3)
            crit += SMath_1.randInt(2) + 1;
            let changeLimit = 1;
            // Chances to up the max number of changes
            if (SMath_1.randInt(2) === 0)
                changeLimit++;
            if (SMath_1.randInt(2) === 0)
                changeLimit++;
            if (character.effects.has(EffectType_1.EffectType.HistoryAlchemist))
                changeLimit++;
            // Generic drinking text
            ContentView_1.CView.clear();
            ContentView_1.CView.text("You uncork the bottle and drink down the strange substance, struggling to down the thick liquid.");
            // low corruption thoughts
            if (character.stats.cor < 33)
                ContentView_1.CView.text("  This stuff is gross, why are you drinking it?");
            // high corruption
            if (character.stats.cor >= 66)
                ContentView_1.CView.text("  You lick your lips, marvelling at how thick and sticky it is.");
            // Corruption increase
            if (character.stats.cor < 50 || SMath_1.randInt(2)) {
                ContentView_1.CView.text("\n\nThe drink makes you feel... dirty.");
                let corruptionChange = 1;
                // Corrupts the uncorrupted faster
                if (character.stats.cor < 50)
                    corruptionChange++;
                if (character.stats.cor < 40)
                    corruptionChange++;
                if (character.stats.cor < 30)
                    corruptionChange++;
                // Corrupts the very corrupt slower
                if (character.stats.cor >= 90)
                    corruptionChange = .5;
                character.stats.cor += corruptionChange + 2;
                changes++;
            }
            // NEW BALLZ
            if (character.body.balls.count < 4) {
                if (character.body.balls.count > 0) {
                    character.body.balls.count = 4;
                    ContentView_1.CView.text("\n\nIncredible pain scythes through your crotch, doubling you over.  You stagger around, struggling to pull open your " + character.inventory.armor.displayName + ".  In shock, you barely register the sight before your eyes: <b>You have four balls.</b>");
                }
                if (character.body.balls.count === 0) {
                    character.body.balls.count = 2;
                    ContentView_1.CView.text("\n\nIncredible pain scythes through your crotch, doubling you over.  You stagger around, struggling to pull open your " + character.inventory.armor.displayName + ".  In shock, you barely register the sight before your eyes: <b>You have balls!</b>");
                    character.body.balls.size = 1;
                }
                changes++;
            }
            // Makes your balls biggah! (Or cummultiplier higher if futa!)
            if (SMath_1.randInt(1.5) === 0 && changes < changeLimit && character.body.balls.count > 0 && character.body.cocks.length > 0) {
                character.body.balls.size++;
                // They grow slower as they get bigger...
                if (character.body.balls.size > 10)
                    character.body.balls.size -= .5;
                // Texts
                if (character.body.balls.size <= 2)
                    ContentView_1.CView.text("\n\nA flash of warmth passes through you and a sudden weight develops in your groin.  You pause to examine the changes and your roving fingers discover your " + BallsDescriptor_1.describeBalls(false, true, character) + " have grown larger than a human's.");
                if (character.body.balls.size > 2)
                    ContentView_1.CView.text("\n\nA sudden onset of heat envelops your groin, focusing on your " + BallsDescriptor_1.describeSack(character) + ".  Walking becomes difficult as you discover your " + BallsDescriptor_1.describeBalls(false, true, character) + " have enlarged again.");
                character.stats.lib += 1;
                character.stats.lust += 3;
            }
            // Boost cum multiplier
            if (changes < changeLimit && SMath_1.randInt(2) === 0 && character.body.cocks.length > 0) {
                if (character.body.cumMultiplier < 6 && SMath_1.randInt(2) === 0 && changes < changeLimit) {
                    // Temp is the max it can be raised to
                    let maxCumMultiplier = 3;
                    // Lots of cum raises cum multiplier cap to 6 instead of 3
                    if (character.effects.has(EffectType_1.EffectType.MessyOrgasms))
                        maxCumMultiplier = 6;
                    if (maxCumMultiplier < character.body.cumMultiplier + .4 * crit) {
                        changes--;
                    }
                    else {
                        character.body.cumMultiplier += .4 * crit;
                        // Flavor text
                        if (character.body.balls.count === 0)
                            ContentView_1.CView.text("\n\nYou feel a churning inside your body as something inside you changes.");
                        if (character.body.balls.count > 0)
                            ContentView_1.CView.text("\n\nYou feel a churning in your " + BallsDescriptor_1.describeBalls(true, true, character) + ".  It quickly settles, leaving them feeling somewhat more dense.");
                        if (crit > 1)
                            ContentView_1.CView.text("  A bit of milky pre dribbles from your " + CockDescriptor_1.describeCocksLight(character) + ", pushed out by the change.");
                        character.stats.lib += 1;
                    }
                    changes++;
                }
            }
            // Fail-safe
            if (changes === 0) {
                ContentView_1.CView.text("\n\nYour groin tingles, making it feel as if you haven't cum in a long time.");
                character.hoursSinceCum += 100;
                changes++;
            }
            if (character.body.balls.count > 0 && SMath_1.randInt(3) === 0) {
                ContentView_1.CView.text(BodyModifier_1.displayModFem(character, 12, 5));
            }
        }
    }
    exports.SuccubisDream = SuccubisDream;
});
//# sourceMappingURL=SuccubisDream.js.map