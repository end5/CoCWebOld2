define(["require", "exports", "Engine/Items/Consumable", "../ConsumableName", "Engine/Utilities/SMath", "Engine/Body/BreastRow", "Engine/Body/Cock", "Engine/Body/Ears", "Engine/Body/Face", "Engine/Body/Legs", "Engine/Body/Skin", "Engine/Body/Tail", "Engine/Body/Vagina", "Content/Effects/EffectType", "Content/Utilities/NumToText", "Engine/Items/ItemDesc", "Content/Descriptors/CockDescriptor", "Content/Descriptors/BallsDescriptor", "Content/Descriptors/BreastDescriptor", "Content/Descriptors/SkinDescriptor", "Engine/Display/ContentView", "Content/Modifiers/BodyModifier", "Engine/Flags", "Content/Settings", "Content/Menus/InGame/GameOverMenu"], function (require, exports, Consumable_1, ConsumableName_1, SMath_1, BreastRow_1, Cock_1, Ears_1, Face_1, Legs_1, Skin_1, Tail_1, Vagina_1, EffectType_1, NumToText_1, ItemDesc_1, CockDescriptor_1, BallsDescriptor_1, BreastDescriptor_1, SkinDescriptor_1, ContentView_1, BodyModifier_1, Flags_1, Settings_1, GameOverMenu_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.FoxBerryFlags = Flags_1.Flags.register("Fox Berry", {
        FOX_BAD_END_WARNING: 0,
    });
    class FoxBerry extends Consumable_1.Consumable {
        constructor(enhanced) {
            if (!enhanced)
                super(ConsumableName_1.ConsumableName.FoxBerry, new ItemDesc_1.ItemDesc("Fox Berry", "a fox berry", "This large orange berry is heavy in your hands.  It may have gotten its name from its bright orange coloration.  You're certain it is no mere fruit."));
            else
                super(ConsumableName_1.ConsumableName.FoxBerryEnhanced, new ItemDesc_1.ItemDesc("VixVigr", "a bottle labelled \"Vixen's Vigor\"", "This small medicine bottle contains something called \"Vixen's Vigor\", supposedly distilled from common fox-berries.  It is supposed to be a great deal more potent, and a small warning label warns of \"extra boobs\", whatever that means."), 30);
            this.enhanced = enhanced;
        }
        use(character) {
            ContentView_1.CView.clear();
            if (!this.enhanced)
                ContentView_1.CView.text("You examine the berry a bit, rolling the orangish-red fruit in your hand for a moment before you decide to take the plunge and chow down.  It's tart and sweet at the same time, and the flavors seem to burst across your tongue with potent strength.  Juice runs from the corners of your lips as you finish the tasty snack.");
            else
                ContentView_1.CView.text("You pop the cap on the enhanced \"Vixen's Vigor\" and decide to take a swig of it.  Perhaps it will make you as cunning as the crude fox Lumi drew on the front?");
            let changes = 0;
            let changeLimit = 1;
            if (this.enhanced)
                changeLimit += 2;
            if (SMath_1.randInt(2) === 0)
                changeLimit++;
            if (SMath_1.randInt(2) === 0)
                changeLimit++;
            if (character.body.face.type === Face_1.FaceType.FOX &&
                character.body.tails.find(Tail_1.Tail.FilterType(Tail_1.TailType.FOX)) &&
                character.body.ears.type === Ears_1.EarType.FOX &&
                character.body.legs.type === Legs_1.LegType.FOX &&
                character.body.skin.type === Skin_1.SkinType.FUR && SMath_1.randInt(3) === 0) {
                if (exports.FoxBerryFlags.FOX_BAD_END_WARNING === 0) {
                    ContentView_1.CView.text("\n\nYou get a massive headache and a craving to raid a henhouse.  Thankfully, both pass in seconds, but <b>maybe you should cut back on the vulpine items...</b>");
                    exports.FoxBerryFlags.FOX_BAD_END_WARNING = 1;
                }
                else {
                    ContentView_1.CView.text("\n\nYou scarf down the ");
                    if (this.enhanced)
                        ContentView_1.CView.text("fluid ");
                    else
                        ContentView_1.CView.text("berries ");
                    ContentView_1.CView.text("with an uncommonly voracious appetite, taking particular enjoyment in the succulent, tart flavor.  As you carefully suck the last drops of ochre juice from your fingers, you note that it tastes so much more vibrant than you remember.  Your train of thought is violently interrupted by the sound of bones snapping, and you cry out in pain, doubling over as a flaming heat boils through your ribs.");
                    ContentView_1.CView.text("\n\nWrithing on the ground, you clutch your hand to your chest, looking on in horror through tear-streaked eyes as the bones in your fingers pop and fuse, rearranging themselves into a dainty paw covered in coarse black fur, fading to a ruddy orange further up.  You desperately try to call out to someone - anyone - for help, but all that comes out is a high-pitched, ear-splitting yap.");
                    if (character.body.tails.filter(Tail_1.Tail.FilterType(Tail_1.TailType.FOX)).get(0).venom > 1)
                        ContentView_1.CView.text("  Your tails thrash around violently as they begin to fuse painfully back into one, the fur bristling back out with a flourish.");
                    ContentView_1.CView.text("\n\nA sharp spark of pain jolts through your spinal column as the bones shift themselves around, the joints in your hips migrating forward.  You continue to howl in agony even as you feel your intelligence slipping away.  In a way, it's a blessing - as your thoughts grow muddied, the pain is dulled, until you are finally left staring blankly at the sky above, tilting your head curiously.");
                    ContentView_1.CView.text("\n\nYou roll over and crawl free of the " + character.inventory.armor.displayName + " covering you, pawing the ground for a few moments before a pang of hunger rumbles through your stomach.  Sniffing the wind, you bound off into the wilderness, following the telltale scent of a farm toward the certain bounty of a chicken coop.");
                    return { next: GameOverMenu_1.gameOverMenu };
                }
            }
            // [increase Intelligence, Libido and Sensitivity]
            if (changes < changeLimit && SMath_1.randInt(3) === 0 && (character.stats.lib < 80 || character.stats.int < 80 || character.stats.sens < 80)) {
                ContentView_1.CView.text("\n\nYou close your eyes, smirking to yourself mischievously as you suddenly think of several new tricks to try on your opponents; you feel quite a bit more cunning.  The mental picture of them helpless before your cleverness makes you shudder a bit, and you lick your lips and stroke yourself as you feel your skin tingling from an involuntary arousal.");
                if (character.stats.int < 80)
                    character.stats.int += 4;
                if (character.stats.lib < 80)
                    character.stats.lib += 1;
                if (character.stats.sens < 80)
                    character.stats.sens += 1;
                // gain small lust also
                character.stats.lust += 10;
                changes++;
            }
            // [decrease Strength] (to some floor) // I figured 15 was fair, but you're in a better position to judge that than I am.
            if (changes < changeLimit && SMath_1.randInt(3) === 0 && character.stats.str > 40) {
                ContentView_1.CView.text("\n\nYou can feel your muscles softening as they slowly relax, becoming a tad weaker than before.  Who needs physical strength when you can outwit your foes with trickery and mischief?  You tilt your head a bit, wondering where that thought came from.");
                character.stats.str += -1;
                if (character.stats.str > 60)
                    character.stats.str += -1;
                if (character.stats.str > 80)
                    character.stats.str += -1;
                if (character.stats.str > 90)
                    character.stats.str += -1;
                changes++;
            }
            // [decrease Toughness] (to some floor) // 20 or so was my thought here
            if (changes < changeLimit && SMath_1.randInt(3) === 0 && character.stats.tou > 30) {
                if (character.stats.tou < 60)
                    ContentView_1.CView.text("\n\nYou feel your skin becoming noticeably softer.  A gentle exploratory pinch on your arm confirms it - your supple skin isn't going to offer you much protection.");
                else
                    ContentView_1.CView.text("\n\nYou feel your skin becoming noticeably softer.  A gentle exploratory pinch on your arm confirms it - your hide isn't quite as tough as it used to be.");
                character.stats.tou += -1;
                if (character.stats.str > 60)
                    character.stats.tou += -1;
                if (character.stats.str > 80)
                    character.stats.tou += -1;
                if (character.stats.str > 90)
                    character.stats.tou += -1;
                changes++;
            }
            // [Change Hair Color: Golden-blonde or Reddish-orange]
            if (character.body.hair.color !== "golden-blonde" && character.body.hair.color !== "reddish-orange" && character.body.hair.color !== "silver" && character.body.hair.color !== "white" && character.body.hair.color !== "red" && character.body.hair.color !== "black" && changes < changeLimit && SMath_1.randInt(4) === 0) {
                const hairTemp = SMath_1.randInt(10);
                if (hairTemp < 5)
                    character.body.hair.color = "reddish-orange";
                else if (hairTemp < 7)
                    character.body.hair.color = "red";
                else if (hairTemp < 8)
                    character.body.hair.color = "golden-blonde";
                else if (hairTemp < 9)
                    character.body.hair.color = "silver";
                else
                    character.body.hair.color = "black";
                ContentView_1.CView.text("\n\nYour scalp begins to tingle, and you gently grasp a strand( of hair, pulling it out to check it.  Your hair has become " + character.body.hair.color + "!");
            }
            // [Adjust hips toward 10 � wide/curvy/flared]
            if (changes < changeLimit && SMath_1.randInt(3) === 0 && character.body.hips.rating !== 10) {
                // from narrow to wide
                if (character.body.hips.rating < 10) {
                    ContentView_1.CView.text("\n\nYou stumble a bit as the bones in your pelvis rearrange themselves painfully.  Your waistline has widened into [hips]!");
                    character.body.hips.rating++;
                    if (character.body.hips.rating < 7)
                        character.body.hips.rating++;
                }
                // from wide to narrower
                else {
                    ContentView_1.CView.text("\n\nYou stumble a bit as the bones in your pelvis rearrange themselves painfully.  Your waistline has narrowed, becoming [hips].");
                    character.body.hips.rating--;
                    if (character.body.hips.rating > 15)
                        character.body.hips.rating--;
                }
                changes++;
            }
            // [Remove tentacle hair]
            // required if the hair length change below is triggered
            if (changes < changeLimit && character.body.hair.type === 4 && SMath_1.randInt(3) === 0) {
                // -insert anemone hair removal into them under whatever criteria you like, though hair removal should precede abdomen growth; here's some sample text:
                ContentView_1.CView.text("\n\nEerie flames of the jewel migrate up your body to your head, where they cover your [hair].  Though they burned nowhere else in their lazy orbit, your head begins to heat up as they congregate.  Fearful, you raise your hands to it just as the temperature peaks, but as you touch your hair, the searing heat is suddenly gone - along with your tentacles!  <b>Your hair is normal again!</b>");
                character.body.hair.type = 0;
                changes++;
            }
            // [Adjust hair length toward range of 16-26 � very long to ass-length]
            if (character.body.hair.type !== 4 && (character.body.hair.length > 26 || character.body.hair.length < 16) && changes < changeLimit && SMath_1.randInt(4) === 0) {
                if (character.body.hair.length < 16) {
                    character.body.hair.length += 1 + SMath_1.randInt(4);
                    ContentView_1.CView.text("\n\nYou experience a tingling sensation in your scalp.  Feeling a bit off-balance, you discover your hair has lengthened, becoming " + NumToText_1.numToCardinalText(Math.round(character.body.hair.length)) + " inches long.");
                }
                else {
                    character.body.hair.length -= 1 + SMath_1.randInt(4);
                    ContentView_1.CView.text("\n\nYou experience a tingling sensation in your scalp.  Feeling a bit off-balance, you discover your hair has shed a bit of its length, becoming " + NumToText_1.numToCardinalText(Math.round(character.body.hair.length)) + " inches long.");
                }
                changes++;
            }
            if (changes < changeLimit && SMath_1.randInt(10) === 0) {
                ContentView_1.CView.text("\n\nYou sigh as the exotic flavor washes through you, and unbidden, you begin to daydream.  Sprinting through the thicket, you can feel the corners of your muzzle curling up into a mischievous grin.  You smell the scent of demons, and not far away either.  With your belly full and throat watered, now is the perfect time for a little bit of trickery.   As the odor intensifies, you slow your playful gait and begin to creep a bit more carefully.");
                ContentView_1.CView.text("\n\nSuddenly, you are there, at a demonic camp, and you spy the forms of an incubus and a succubus, their bodies locked together at the hips and slowly undulating, even in sleep.  You carefully prance around their slumbering forms and find their supplies.  With the utmost care, you put your razor-sharp teeth to work, and slowly, meticulously rip through their packs - not with the intention of theft, but with mischief.  You make sure to leave small holes in the bottom of each, and after making sure your stealth remains unbroken, you urinate on their hooves.");
                ContentView_1.CView.text("\n\nThey don't even notice, so lost in the subconscious copulation as they are.  Satisfied at your petty tricks, you scurry off into the night, a red blur amidst the foliage.");
                changes++;
                character.stats.fatigue -= 10;
            }
            // dog cocks!
            if (changes < changeLimit && SMath_1.randInt(3) === 0 && character.body.cocks.filter(Cock_1.Cock.FilterType(Cock_1.CockType.DOG)).length < character.body.cocks.length) {
                const cockChoices = character.body.cocks.filter(Cock_1.Cock.FilterType(Cock_1.CockType.DOG));
                if (cockChoices.length !== 0) {
                    const selectedCock = cockChoices.random();
                    if (selectedCock.type === Cock_1.CockType.HUMAN) {
                        ContentView_1.CView.text("\n\nYour " + CockDescriptor_1.describeCock(character, selectedCock) + " clenches painfully, becoming achingly, throbbingly erect.  A tightness seems to squeeze around the base, and you wince as you see your skin and flesh shifting forwards into a canine-looking sheath.  You shudder as the crown of your " + CockDescriptor_1.describeCock(character, selectedCock) + " reshapes into a point, the sensations nearly too much for you.  You throw back your head as the transformation completes, your " + CockDescriptor_1.nounCock(Cock_1.CockType.DOG) + " much thicker than it ever was before.  <b>You now have a dog-cock.</b>");
                        selectedCock.thickness += .3;
                        character.stats.sens += 10;
                        character.stats.lust += 5;
                    }
                    // Horse
                    else if (selectedCock.type === Cock_1.CockType.HORSE) {
                        ContentView_1.CView.text("\n\nYour " + CockDescriptor_1.nounCock(Cock_1.CockType.HORSE) + " shrinks, the extra equine length seeming to shift into girth.  The flared tip vanishes into a more pointed form, a thick knotted bulge forming just above your sheath.  <b>You now have a dog-cock.</b>");
                        // Tweak length/thickness.
                        if (selectedCock.length > 6)
                            selectedCock.length -= 2;
                        else
                            selectedCock.length -= .5;
                        selectedCock.thickness += .5;
                        character.stats.sens += 4;
                        character.stats.lust += 5;
                    }
                    // Tentacular Tuesday!
                    else if (selectedCock.type === Cock_1.CockType.TENTACLE) {
                        ContentView_1.CView.text("\n\nYour " + CockDescriptor_1.describeCock(character, selectedCock) + " coils in on itself, reshaping and losing its plant-like coloration as thickens near the base, bulging out in a very canine-looking knot.  Your skin bunches painfully around the base, forming into a sheath.  <b>You now have a dog-cock.</b>");
                        character.stats.sens += 4;
                        character.stats.lust += 10;
                    }
                    // Misc
                    else {
                        ContentView_1.CView.text("\n\nYour " + CockDescriptor_1.describeCock(character, selectedCock) + " trembles, reshaping itself into a shiny red doggie-dick with a fat knot at the base.  <b>You now have a dog-cock.</b>");
                        character.stats.sens += 4;
                        character.stats.lust += 10;
                    }
                    selectedCock.type = Cock_1.CockType.DOG;
                    selectedCock.knotMultiplier = 1.25;
                    changes++;
                }
            }
            // Cum Multiplier Xform
            if (character.cumQ() < 5000 && SMath_1.randInt(3) === 0 && changes < changeLimit && character.body.cocks.length > 0) {
                let cumMultiplierChange = 2 + SMath_1.randInt(4);
                // Lots of cum raises cum multiplier cap to 2 instead of 1.5
                if (character.effects.has(EffectType_1.EffectType.MessyOrgasms))
                    cumMultiplierChange += SMath_1.randInt(10);
                character.body.cumMultiplier += cumMultiplierChange;
                // Flavor text
                if (character.body.balls.count === 0)
                    ContentView_1.CView.text("\n\nYou feel a churning inside your gut as something inside you changes.");
                if (character.body.balls.count > 0)
                    ContentView_1.CView.text("\n\nYou feel a churning in your " + BallsDescriptor_1.describeBalls(true, true, character) + ".  It quickly settles, leaving them feeling somewhat more dense.");
                ContentView_1.CView.text("  A bit of milky pre dribbles from your " + CockDescriptor_1.describeCocksLight(character) + ", pushed out by the change.");
                changes++;
            }
            if (changes < changeLimit && character.body.balls.count > 0 && character.body.balls.size > 4 && SMath_1.randInt(3) === 0) {
                ContentView_1.CView.text("\n\nYour [sack] gets lighter and lighter, the skin pulling tight around your shrinking balls until you can't help but check yourself.");
                if (character.body.balls.size > 10)
                    character.body.balls.size -= 5;
                if (character.body.balls.size > 20)
                    character.body.balls.size -= 4;
                if (character.body.balls.size > 30)
                    character.body.balls.size -= 4;
                if (character.body.balls.size > 40)
                    character.body.balls.size -= 4;
                if (character.body.balls.size > 50)
                    character.body.balls.size -= 8;
                if (character.body.balls.size > 60)
                    character.body.balls.size -= 8;
                if (character.body.balls.size <= 10)
                    character.body.balls.size--;
                changes++;
                ContentView_1.CView.text("  You now have a [balls].");
            }
            // Sprouting more!
            if (changes < changeLimit && this.enhanced && character.body.chest.length < 4 && character.body.chest.get(character.body.chest.length - 1).rating > 1) {
                const bottomBreastRow = character.body.chest.get(character.body.chest.length - 1);
                ContentView_1.CView.text("\n\nYour belly rumbles unpleasantly for a second as the ");
                if (!this.enhanced)
                    ContentView_1.CView.text("berry ");
                else
                    ContentView_1.CView.text("drink ");
                ContentView_1.CView.text("settles deeper inside you.  A second later, the unpleasant gut-gurgle passes, and you let out a tiny burp of relief.  Before you finish taking a few breaths, there's an itching below your " + BreastDescriptor_1.describeAllBreasts(character) + ".  You idly scratch at it, but gods be damned, it hurts!  You peel off part of your " + character.inventory.armor.displayName + " to inspect the unwholesome itch, ");
                if (character.body.chest.sort(BreastRow_1.BreastRow.Largest).get(0).rating >= 8)
                    ContentView_1.CView.text("it's difficult to see past the wall of tits obscuring your view.");
                else
                    ContentView_1.CView.text("it's hard to get a good look at.");
                ContentView_1.CView.text("  A few gentle prods draw a pleasant gasp from your lips, and you realize that you didn't have an itch - you were growing new nipples!");
                ContentView_1.CView.text("\n\nA closer examination reveals your new nipples to be just like the ones above in size and shape");
                if (bottomBreastRow.nipples.count > 1)
                    ContentView_1.CView.text(", not to mention number");
                else if (bottomBreastRow.nipples.fuckable)
                    ContentView_1.CView.text(", not to mention penetrability");
                ContentView_1.CView.text(".  While you continue to explore your body's newest addition, a strange heat builds behind the new nubs. Soft, jiggly breastflesh begins to fill your cupped hands.  Radiant warmth spreads through you, eliciting a moan of pleasure from your lips as your new breasts catch up to the pair above.  They stop at " + BreastDescriptor_1.breastCup(bottomBreastRow.rating) + "s.  <b>You have " + NumToText_1.numToCardinalText(character.body.chest.length + 1) + " rows of breasts!</b>");
                const newBreastRow = new BreastRow_1.BreastRow();
                newBreastRow.rating = bottomBreastRow.rating;
                newBreastRow.lactationMultiplier = bottomBreastRow.lactationMultiplier;
                newBreastRow.nipples.count = bottomBreastRow.nipples.count;
                newBreastRow.nipples.fuckable = bottomBreastRow.nipples.fuckable;
                newBreastRow.nipples.length = bottomBreastRow.nipples.length;
                character.body.chest.add(newBreastRow);
                character.stats.sens += 2;
                character.stats.lust += 30;
                changes++;
            }
            if (character.body.chest.length > 1) {
                let tits = false;
                let currentRow;
                let rowAboveCurrentRow;
                let chance;
                for (let indexReverseChestCompare = character.body.chest.length - 1; indexReverseChestCompare > 1; indexReverseChestCompare--) {
                    currentRow = character.body.chest.get(indexReverseChestCompare);
                    rowAboveCurrentRow = character.body.chest.get(indexReverseChestCompare - 1);
                    if (currentRow.rating <= rowAboveCurrentRow.rating - 1 && changes < changeLimit && SMath_1.randInt(2) === 0) {
                        if (tits)
                            ContentView_1.CView.text("\n\nThey aren't the only pair to go through a change!  Another row of growing bosom goes through the process with its sisters, getting larger.");
                        else {
                            chance = SMath_1.randInt(3);
                            if (chance === 1)
                                ContentView_1.CView.text("\n\nA faint warmth buzzes to the surface of your " + BreastDescriptor_1.describeBreastRow(currentRow) + ", the fluttering tingles seeming to vibrate faster and faster just underneath your " + SkinDescriptor_1.describeSkin(character) + ".  Soon, the heat becomes uncomfortable, and that row of chest-flesh begins to feel tight, almost thrumming like a newly-stretched drum.  You " + BreastDescriptor_1.describeNipple(character, currentRow) + "s go rock hard, and though the discomforting feeling of being stretched fades, the pleasant, warm buzz remains.  It isn't until you cup your tingly tits that you realize they've grown larger, almost in envy of the pair above.");
                            else if (chance === 2)
                                ContentView_1.CView.text("\n\nA faintly muffled gurgle emanates from your " + BreastDescriptor_1.describeBreastRow(currentRow) + " for a split-second, just before your flesh shudders and shakes, stretching your " + SkinDescriptor_1.skinFurScales(character) + " outward with newly grown breast.  Idly, you cup your hands to your swelling bosom, and though it stops soon, you realize that your breasts have grown closer in size to the pair above.");
                            else {
                                ContentView_1.CView.text("\n\nAn uncomfortable stretching sensation spreads its way across the curves of your " + BreastDescriptor_1.describeBreastRow(currentRow) + ", threads of heat tingling through your flesh.  It feels as though your heartbeat has been magnified tenfold within the expanding mounds, your " + SkinDescriptor_1.describeSkin(character) + " growing flushed with arousal and your " + BreastDescriptor_1.describeNipple(character, currentRow) + " filling with warmth.  As the tingling heat gradually fades, a few more inches worth of jiggling breast spill forth.  Cupping them experimentally, you confirm that they have indeed grown to be a bit more in line with the size of the pair above.");
                            }
                        }
                        // Bigger change!
                        if (currentRow.rating <= rowAboveCurrentRow.rating - 3)
                            currentRow.rating += 2 + SMath_1.randInt(2);
                        // Smallish change.
                        else
                            currentRow.rating++;
                        ContentView_1.CView.text("  You do a quick measurement and determine that your " + NumToText_1.numToOrdinalText(indexReverseChestCompare + 1) + " row of breasts are now " + BreastDescriptor_1.breastCup(currentRow.rating) + "s.");
                        if (!tits) {
                            tits = true;
                            changes++;
                        }
                        character.stats.sens += 2;
                        character.stats.lust += 10;
                    }
                }
            }
            // HEAT!
            const heat = character.effects.getByName(EffectType_1.EffectType.Heat);
            if (heat && heat.values.lib && heat.values.lib < 30 && SMath_1.randInt(6) === 0 && changes < changeLimit) {
                if (character.canGoIntoHeat()) {
                    BodyModifier_1.displayGoIntoHeat(character);
                    changes++;
                }
            }
            // [Grow Fur]
            // FOURTH
            if ((this.enhanced || character.body.legs.type === Legs_1.LegType.FOX) && character.body.skin.type !== Skin_1.SkinType.FUR && changes < changeLimit && SMath_1.randInt(4) === 0) {
                // from scales
                if (character.body.skin.type === Skin_1.SkinType.SCALES)
                    ContentView_1.CView.text("\n\nYour skin shifts and every scale stands on end, sending you into a mild panic.  No matter how you tense, you can't seem to flatten them again.  The uncomfortable sensation continues for some minutes until, as one, every scale falls from your body and a fine coat of fur pushes out.  You briefly consider collecting them, but when you pick one up, it's already as dry and brittle as if it were hundreds of years old.  <b>Oh well; at least you won't need to sun yourself as much with your new fur.</b>");
                // from skin
                else
                    ContentView_1.CView.text("\n\nYour skin itches all over, the sudden intensity and uniformity making you too paranoid to scratch.  As you hold still through an agony of tiny tingles and pinches, fine, luxuriant fur sprouts from every bare inch of your skin!  <b>You'll have to get used to being furry...</b>");
                character.body.skin.type = Skin_1.SkinType.FUR;
                character.body.skin.adj = "";
                character.body.skin.desc = "fur";
                changes++;
            }
            // [Grow Fox Legs]
            // THIRD
            if ((this.enhanced || character.body.ears.type === Ears_1.EarType.FOX) && character.body.legs.type !== Legs_1.LegType.FOX && changes < changeLimit && SMath_1.randInt(5) === 0) {
                // 4 legs good, 2 legs better
                if (character.body.legs.isTaur())
                    ContentView_1.CView.text("\n\nYou shiver as the strength drains from your back legs.  Shaken, you sit on your haunches, forelegs braced wide to stop you from tipping over;  their hooves scrape the dirt as your lower body shrinks, dragging them backward until you can feel the upper surfaces of your hindlegs with their undersides.  A wave of nausea and vertigo overtakes you, and you close your eyes to shut out the sensations.  When they reopen, what greets them are not four legs, but only two... and those roughly in the shape of your old hindleg, except for the furry toes where your hooves used to be.  <b>You now have fox legs!</b>");
                // n*ga please
                else if (character.body.legs.isNaga())
                    ContentView_1.CView.text("\n\nYour scales split at the waistline and begin to peel, shedding like old snakeskin.  If that weren't curious enough, the flesh - not scales - underneath is pink and new, and the legs it covers crooked into the hocks and elongated feet of a field animal.  As the scaly coating falls and you step out of it, walking of necessity on your toes, a fine powder blows from the dry skin.  Within minutes, it crumbles completely and is taken by the ever-moving wind.  <b>Your legs are now those of a fox!</b>");
                // other digitigrade
                else if (character.body.legs.type === Legs_1.LegType.HOOFED || character.body.legs.type === Legs_1.LegType.DOG || character.body.legs.type === Legs_1.LegType.CAT || character.body.legs.type === Legs_1.LegType.BUNNY || character.body.legs.type === Legs_1.LegType.KANGAROO)
                    ContentView_1.CView.text("\n\nYour legs twitch and quiver, forcing you to your seat.  As you watch, the ends shape themselves into furry, padded toes.  <b>You now have fox feet!</b>  Rather cute ones, actually.");
                // red drider bb gone
                else if (character.body.legs.type === Legs_1.LegType.DRIDER_LOWER_BODY)
                    ContentView_1.CView.text("\n\nYour legs buckle under you and you fall, smashing your abdomen on the ground.  Though your control deserts and you cannot see behind you, still you feel the disgusting sensation of chitin loosening and sloughing off your body, and the dry breeze on your exposed nerves.  Reflexively, your legs cling together to protect as much of their now-sensitive surface as possible.  When you try to part them, you find you cannot.  Several minutes pass uncomforably until you can again bend your legs, and when you do, you find that all the legs of a side bend together - <b>in the shape of a fox's leg!</b>");
                // goo home and goo to bed
                else if (character.body.legs.isGoo())
                    ContentView_1.CView.text("\n\nIt takes a while before you notice that your gooey mounds have something more defined in them.  As you crane your body and shift them around to look, you can just make out a semi-solid mass in the shape of a crooked, animalistic leg.  You don't think much of it until, a few minutes later, you step right out of your swishing gooey undercarriage and onto the new foot.  The goo covering it quickly dries up, as does the part you left behind, <b>revealing a pair of dog-like fox legs!</b>");
                // reg legs, not digitigrade
                else {
                    ContentView_1.CView.text("\n\nYour hamstrings tense painfully and begin to pull, sending you onto your face.  As you writhe on the ground, you can feel your thighs shortening and your feet stretching");
                    if (character.body.legs.type === Legs_1.LegType.BEE)
                        ContentView_1.CView.text(", while a hideous cracking fills the air");
                    ContentView_1.CView.text(".  When the spasms subside and you can once again stand, <b>you find that your legs have been changed to those of a fox!</b>");
                }
                character.body.legs.type = Legs_1.LegType.FOX;
                changes++;
            }
            // Grow Fox Ears]
            // SECOND
            if ((this.enhanced || character.body.tails.reduce(Tail_1.Tail.HasType(Tail_1.TailType.FOX), false)) && character.body.ears.type !== Ears_1.EarType.FOX && changes < changeLimit && SMath_1.randInt(4) === 0) {
                // from human/gob/liz ears
                if (character.body.ears.type === Ears_1.EarType.HUMAN || character.body.ears.type === Ears_1.EarType.ELFIN || character.body.ears.type === Ears_1.EarType.LIZARD) {
                    ContentView_1.CView.text("\n\nThe sides of your face painfully stretch as your ears elongate and begin to push past your hairline, toward the top of your head.  They elongate, becoming large vulpine triangles covered in bushy fur.  <b>You now have fox ears.</b>");
                }
                // from dog/cat/roo ears
                else {
                    ContentView_1.CView.text("\n\nYour ears change, shifting from their current shape to become vulpine in nature.  <b>You now have fox ears.</b>");
                }
                character.body.ears.type = Ears_1.EarType.FOX;
                changes++;
            }
            // [Grow Fox Tail](fairly common)
            // FIRST
            if (!character.body.tails.reduce(Tail_1.Tail.HasType(Tail_1.TailType.FOX), false) && changes < changeLimit && SMath_1.randInt(4) === 0) {
                // from no tail
                if (character.body.tails.length === 0)
                    ContentView_1.CView.text("\n\nA pressure builds on your backside.  You feel under your [armor] and discover a strange nodule growing there that seems to be getting larger by the second.  With a sudden flourish of movement, it bursts out into a long and bushy tail that sways hypnotically, as if it had a mind of its own.  <b>You now have a fox's tail!</b>");
                // from another type of tail
                else
                    ContentView_1.CView.text("\n\nPain lances through your lower back as your tail shifts violently.  With one final aberrant twitch, it fluffs out into a long, bushy fox tail that whips around in an almost hypnotic fashion.  <b>You now have a fox's tail!</b>");
                const newTail = new Tail_1.Tail();
                newTail.type = Tail_1.TailType.FOX;
                newTail.venom = 1;
                character.body.tails.add(newTail);
                changes++;
            }
            // [Grow Fox Face]
            // LAST - muzzlygoodness
            // should work from any face, including other muzzles
            if (character.body.skin.type === Skin_1.SkinType.FUR && character.body.face.type !== Face_1.FaceType.FOX && changes < changeLimit && SMath_1.randInt(5) === 0) {
                ContentView_1.CView.text("\n\nYour face pinches and you clap your hands to it.  Within seconds, your nose is poking through those hands, pushing them slightly to the side as new flesh and bone build and shift behind it, until it stops in a clearly defined, tapered, and familiar point you can see even without the aid of a mirror.  <b>Looks like you now have a fox's face.</b>");
                if (Settings_1.Settings.sillyMode)
                    ContentView_1.CView.text("  And they called you crazy...");
                changes++;
                character.body.face.type = Face_1.FaceType.FOX;
            }
            if (character.body.tone > 40 && changes < changeLimit && SMath_1.randInt(2) === 0) {
                ContentView_1.CView.text("\n\nMoving brings with it a little more jiggle than you're used to.  You don't seem to have gained weight, but your muscles seem less visible, and various parts of you are pleasantly softer.");
                character.body.tone -= 4;
            }
            // Nipples Turn Back:
            if (character.effects.has(EffectType_1.EffectType.BlackNipples) && changes < changeLimit && SMath_1.randInt(3) === 0) {
                ContentView_1.CView.text("\n\nSomething invisible brushes against your " + BreastDescriptor_1.describeNipple(character, character.body.chest.firstRow) + ", making you twitch.  Undoing your clothes, you take a look at your chest and find that your nipples have turned back to their natural flesh colour.");
                changes++;
                character.effects.removeByName(EffectType_1.EffectType.BlackNipples);
            }
            // Debugcunt
            if (changes < changeLimit && SMath_1.randInt(3) === 0 && character.body.vaginas.length > 0 && character.body.vaginas.get(0).type !== Vagina_1.VaginaType.HUMAN) {
                ContentView_1.CView.text("\n\nSomething invisible brushes against your sex, making you twinge.  Undoing your clothes, you take a look at your vagina and find that it has turned back to its natural flesh colour.");
                character.body.vaginas.get(0).type = Vagina_1.VaginaType.HUMAN;
                changes++;
            }
            if (changes === 0) {
                ContentView_1.CView.text("\n\nWell that didn't do much, but you do feel a little refreshed!");
                character.stats.fatigue -= 5;
            }
        }
    }
    exports.FoxBerry = FoxBerry;
});
//# sourceMappingURL=FoxBerry.js.map