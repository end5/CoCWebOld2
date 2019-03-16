define(["require", "exports", "Engine/Items/Consumable", "../ConsumableName", "Engine/Utilities/SMath", "Engine/Body/BreastRow", "Engine/Body/Cock", "Engine/Body/Ears", "Engine/Body/Face", "Engine/Body/Horns", "Engine/Body/Legs", "Engine/Body/Skin", "Engine/Body/Tail", "Engine/Body/Vagina", "Content/Effects/EffectType", "Content/Utilities/NumToText", "Engine/Items/ItemDesc", "Content/Descriptors/CockDescriptor", "Content/Descriptors/BallsDescriptor", "Content/Descriptors/VaginaDescriptor", "Content/Descriptors/BreastDescriptor", "Content/Descriptors/ButtDescriptor", "Content/Descriptors/LegDescriptor", "Engine/Display/ContentView", "Content/Modifiers/CockModifier", "Content/Modifiers/BreastModifier", "Content/Modifiers/BodyModifier", "Content/Settings"], function (require, exports, Consumable_1, ConsumableName_1, SMath_1, BreastRow_1, Cock_1, Ears_1, Face_1, Horns_1, Legs_1, Skin_1, Tail_1, Vagina_1, EffectType_1, NumToText_1, ItemDesc_1, CockDescriptor_1, BallsDescriptor_1, VaginaDescriptor_1, BreastDescriptor_1, ButtDescriptor_1, LegDescriptor_1, ContentView_1, CockModifier_1, BreastModifier_1, BodyModifier_1, Settings_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class LaBova extends Consumable_1.Consumable {
        constructor(enhanced, tainted) {
            if (enhanced)
                super(ConsumableName_1.ConsumableName.LaBovaEnhanced, new ItemDesc_1.ItemDesc("ProBova", "a bottle containing a misty fluid labeled \"ProBova\"", "This cloudy potion has been enhanced by the alchemist Lumi to imbue its drinker with cow-like attributes."));
            else if (tainted)
                super(ConsumableName_1.ConsumableName.LaBova, new ItemDesc_1.ItemDesc("La Bova", "a bottle containing a misty fluid labeled \"LaBova\"", "A bottle containing a misty fluid with a grainy texture, it has a long neck and a ball-like base.  The label has a stylized picture of a well endowed cowgirl nursing two guys while they jerk themselves off."));
            else
                super(ConsumableName_1.ConsumableName.LaBovaPure, new ItemDesc_1.ItemDesc("P.LBova", "a bottle containing a white fluid labeled \"Pure LaBova\"", "A bottle containing a misty fluid with a grainy texture); it has a long neck and a ball-like base.  The label has a stylized picture of a well-endowed cow-girl nursing two guys while they jerk themselves off. It has been purified by Rathazul."));
            this.enhanced = enhanced;
            this.tainted = tainted;
        }
        use(character) {
            // Changes done
            let changes = 0;
            // Change limit
            let changeLimit = 1;
            if (SMath_1.randInt(2) === 0)
                changeLimit++;
            if (SMath_1.randInt(3) === 0)
                changeLimit++;
            if (SMath_1.randInt(3) === 0)
                changeLimit++;
            if (character.effects.has(EffectType_1.EffectType.HistoryAlchemist))
                changeLimit++;
            if (this.enhanced)
                changeLimit += 2;
            // LaBova:
            // ItemDesc: "A bottle containing a misty fluid with a grainy texture, it has a long neck and a ball-like base.  The label has a stylized picture of a well endowed cowgirl nursing two guys while they jerk themselves off.  "
            // ItemUseText:
            ContentView_1.CView.clear();
            ContentView_1.CView.text("You drink the ");
            if (this.enhanced)
                ContentView_1.CView.text("Pro Bova");
            else
                ContentView_1.CView.text("La Bova");
            ContentView_1.CView.text(".  The drink has an odd texture, but is very sweet.  It has a slight aftertaste of milk.");
            // Possible Item Effects:
            // STATS
            // Increase character str:
            if (changes < changeLimit && SMath_1.randInt(3) === 0) {
                let strengthGain = 60 - character.stats.str;
                if (strengthGain <= 0)
                    strengthGain = 0;
                else {
                    if (SMath_1.randInt(2) === 0)
                        ContentView_1.CView.text("\n\nThere is a slight pain as you feel your muscles shift somewhat.  Their appearance does not change much, but you feel much stronger.");
                    else
                        ContentView_1.CView.text("\n\nYou feel your muscles tighten and clench as they become slightly more pronounced.");
                    character.stats.str += strengthGain / 10;
                    changes++;
                }
            }
            // Increase character.stats.tou:
            if (changes < changeLimit && SMath_1.randInt(3) === 0) {
                let toughGain = 60 - character.stats.tou;
                if (toughGain <= 0)
                    toughGain = 0;
                else {
                    if (SMath_1.randInt(2) === 0)
                        ContentView_1.CView.text("\n\nYou feel your insides toughening up; it feels like you could stand up to almost any blow.");
                    else
                        ContentView_1.CView.text("\n\nYour bones and joints feel sore for a moment, and before long you realize they've gotten more durable.");
                    character.stats.tou += toughGain / 10;
                    changes++;
                }
            }
            // Decrease character spd if it is over 30:
            if (changes < changeLimit && SMath_1.randInt(3) === 0) {
                if (character.stats.spe > 30) {
                    ContentView_1.CView.text("\n\nThe body mass you've gained is making your movements more sluggish.");
                    changes++;
                    character.stats.spe += -((character.stats.spe - 30) / 10);
                }
            }
            // Increase Corr, up to a max of 50.
            if (this.tainted) {
                let corruptionGain = 50 - character.stats.cor;
                if (corruptionGain < 0)
                    corruptionGain = 0;
                character.stats.cor += corruptionGain / 10;
            }
            // Sex bits - Duderiffic
            if (character.body.cocks.length > 0 && SMath_1.randInt(2) === 0 && !Settings_1.Settings.hyperHappy) {
                // If the character has at least one dick, decrease the size of each slightly,
                ContentView_1.CView.text("\n\n");
                const biggestCock = character.body.cocks.sort(Cock_1.Cock.Largest).get(0);
                let cockGrowth = 0;
                // Shrink said cock
                if (biggestCock.length < 6 && biggestCock.length >= 2.9) {
                    biggestCock.length -= .5;
                    cockGrowth -= .5;
                }
                cockGrowth += CockModifier_1.growCock(character, biggestCock, (SMath_1.randInt(3) + 1) * -1);
                CockModifier_1.displayLengthChange(character, cockGrowth, 1);
                if (biggestCock.length < 2) {
                    ContentView_1.CView.text("  ");
                    if (character.body.cocks.length === 1 && character.body.vaginas.length <= 0) {
                        ContentView_1.CView.text("Your " + CockDescriptor_1.describeCock(character, biggestCock) + " suddenly starts tingling.  It's a familiar feeling, similar to an orgasm.  However, this one seems to start from the top down, instead of gushing up from your loins.  You spend a few seconds frozen to the odd sensation, when it suddenly feels as though your own body starts sucking on the base of your shaft.  Almost instantly, your cock sinks into your crotch with a wet slurp.  The tip gets stuck on the front of your body on the way down, but your glans soon loses all volume to turn into a shiny new clit.");
                        if (character.body.balls.count > 0)
                            ContentView_1.CView.text("  At the same time, your " + BallsDescriptor_1.describeBallsShort(character) + " fall victim to the same sensation; eagerly swallowed whole by your crotch.");
                        ContentView_1.CView.text("  Curious, you touch around down there, to find you don't have any exterior organs left.  All of it got swallowed into the gash you now have running between two fleshy folds, like sensitive lips.  It suddenly occurs to you; <b>you now have a vagina!</b>");
                        character.body.balls.count = 0;
                        character.body.balls.size = 1;
                        character.body.vaginas.add(new Vagina_1.Vagina());
                        character.body.cocks.remove(character.body.cocks.indexOf(biggestCock));
                    }
                    else {
                        CockModifier_1.displayKillCocks(character, 1);
                    }
                }
                // if the last of the character's dicks are eliminated this way, they gain a virgin vagina;
                if (character.body.cocks.length === 0 && character.body.vaginas.length <= 0) {
                    const newVagina = new Vagina_1.Vagina();
                    newVagina.looseness = Vagina_1.VaginaLooseness.TIGHT;
                    newVagina.wetness = Vagina_1.VaginaWetness.NORMAL;
                    newVagina.virgin = true;
                    character.body.vaginas.add(newVagina);
                    ContentView_1.CView.text("\n\nAn itching starts in your crotch and spreads vertically.  You reach down and discover an opening.  You have grown a <b>new " + VaginaDescriptor_1.describeVagina(character, character.body.vaginas.get(0)) + "</b>!");
                    changes++;
                    character.stats.lust += 10;
                }
            }
            // Sex bits - girly
            let boobsGrew = false;
            // Increase character's breast size, if they are HH or bigger
            // do not increase size, but do the other actions:
            if (((this.tainted && character.body.chest.sort(BreastRow_1.BreastRow.Largest).get(0).rating <= 11) ||
                (!this.tainted && character.body.chest.sort(BreastRow_1.BreastRow.Largest).get(0).rating <= 5)) &&
                changes < changeLimit &&
                (SMath_1.randInt(3) === 0 || this.enhanced)) {
                if (SMath_1.randInt(2) === 0)
                    ContentView_1.CView.text("\n\nYour " + BreastDescriptor_1.describeBreastRow(character.body.chest.firstRow) + " tingle for a moment before becoming larger.");
                else
                    ContentView_1.CView.text("\n\nYou feel a little weight added to your chest as your " + BreastDescriptor_1.describeBreastRow(character.body.chest.firstRow) + " seem to inflate and settle in a larger size.");
                BreastModifier_1.growTopBreastRow(character, 1 + SMath_1.randInt(3), 1);
                changes++;
                character.stats.sens += .5;
                boobsGrew = true;
            }
            // -Remove feathery hair (copy for equinum, canine peppers, Labova)
            if (changes < changeLimit && character.body.hair.type === 1 && SMath_1.randInt(4) === 0) {
                // (long):
                if (character.body.hair.length >= 6)
                    ContentView_1.CView.text("\n\nA lock of your downy-soft feather-hair droops over your eye.  Before you can blow the offending down away, you realize the feather is collapsing in on itself.  It continues to curl inward until all that remains is a normal strand of hair.  <b>Your hair is no longer feathery!</b>");
                // (short)
                else
                    ContentView_1.CView.text("\n\nYou run your fingers through your downy-soft feather-hair while you await the effects of the item you just ingested.  While your hand is up there, it detects a change in the texture of your feathers.  They're completely disappearing, merging down into strands of regular hair.  <b>Your hair is no longer feathery!</b>");
                changes++;
                character.body.hair.type = 0;
            }
            // If breasts are D or bigger and are not lactating, they also start lactating:
            if (character.body.chest.sort(BreastRow_1.BreastRow.Largest).get(0).rating >= 4 && character.body.chest.firstRow.lactationMultiplier < 1 && changes < changeLimit && (SMath_1.randInt(3) === 0 || boobsGrew || this.enhanced)) {
                ContentView_1.CView.text("\n\nYou gasp as your " + BreastDescriptor_1.describeBreastRow(character.body.chest.firstRow) + " feel like they are filling up with something.  Within moments, a drop of milk leaks from your " + BreastDescriptor_1.describeBreastRow(character.body.chest.firstRow) + "; <b> you are now lactating</b>.");
                character.body.chest.firstRow.lactationMultiplier = 1.25;
                changes++;
                character.stats.sens += .5;
            }
            // Quad nipples and other 'special enhanced things.
            if (this.enhanced) {
                // QUAD DAMAGE!
                if (character.body.chest.firstRow.nipples.count === 1) {
                    changes++;
                    character.body.chest.firstRow.nipples.count = 4;
                    ContentView_1.CView.text("\n\nYour " + BreastDescriptor_1.describeNipple(character, character.body.chest.firstRow) + "s tingle and itch.  You pull back your " + character.inventory.armor.displayName + " and watch in shock as they split into four distinct nipples!  <b>You now have four nipples on each side of your chest!</b>");
                    if (character.body.chest.length >= 2 && character.body.chest.get(1).nipples.count === 1) {
                        ContentView_1.CView.text("A moment later your second row of " + BreastDescriptor_1.describeBreastRow(character.body.chest.get(1)) + " does the same.  <b>You have sixteen nipples now!</b>");
                        character.body.chest.get(1).nipples.count = 4;
                    }
                    if (character.body.chest.length >= 3 && character.body.chest.get(2).nipples.count === 1) {
                        ContentView_1.CView.text("Finally, your ");
                        if (character.body.chest.length === 3)
                            ContentView_1.CView.text("third row of " + BreastDescriptor_1.describeBreastRow(character.body.chest.get(2)) + " mutates along with its sisters, sprouting into a wonderland of nipples.");
                        else if (character.body.chest.length >= 4) {
                            ContentView_1.CView.text("everything from the third row down mutates, sprouting into a wonderland of nipples.");
                            character.body.chest.get(3).nipples.count = 4;
                            if (character.body.chest.length >= 5)
                                character.body.chest.get(4).nipples.count = 4;
                            if (character.body.chest.length >= 6)
                                character.body.chest.get(5).nipples.count = 4;
                            if (character.body.chest.length >= 7)
                                character.body.chest.get(6).nipples.count = 4;
                            if (character.body.chest.length >= 8)
                                character.body.chest.get(7).nipples.count = 4;
                            if (character.body.chest.length >= 9)
                                character.body.chest.get(8).nipples.count = 4;
                        }
                        character.body.chest.get(2).nipples.count = 4;
                        ContentView_1.CView.text("  <b>You have a total of " + NumToText_1.numToCardinalText(character.body.chest.reduce(BreastRow_1.BreastRow.TotalNipples, 0)) + " nipples.</b>");
                    }
                }
                // QUAD DAMAGE IF WEIRD SHIT BROKE BEFORE
                else if (character.body.chest.length > 1 && character.body.chest.get(1).nipples.count === 1) {
                    if (character.body.chest.get(1).nipples.count === 1) {
                        ContentView_1.CView.text("\n\nYour second row of " + BreastDescriptor_1.describeBreastRow(character.body.chest.get(1)) + " tingle and itch.  You pull back your " + character.inventory.armor.displayName + " and watch in shock as your " + BreastDescriptor_1.describeNipple(character, character.body.chest.get(1)) + " split into four distinct nipples!  <b>You now have four nipples on each breast in your second row of breasts</b>.");
                        character.body.chest.get(1).nipples.count = 4;
                    }
                }
                else if (character.body.chest.length > 2 && character.body.chest.get(2).nipples.count === 1) {
                    if (character.body.chest.get(2).nipples.count === 1) {
                        ContentView_1.CView.text("\n\nYour third row of " + BreastDescriptor_1.describeBreastRow(character.body.chest.get(2)) + " tingle and itch.  You pull back your " + character.inventory.armor.displayName + " and watch in shock as your " + BreastDescriptor_1.describeNipple(character, character.body.chest.get(2)) + " split into four distinct nipples!  <b>You now have four nipples on each breast in your third row of breasts</b>.");
                        character.body.chest.get(2).nipples.count = 4;
                    }
                }
                else if (character.body.chest.length > 3 && character.body.chest.get(3).nipples.count === 1) {
                    if (character.body.chest.get(3).nipples.count === 1) {
                        ContentView_1.CView.text("\n\nYour fourth row of " + BreastDescriptor_1.describeBreastRow(character.body.chest.get(3)) + " tingle and itch.  You pull back your " + character.inventory.armor.displayName + " and watch in shock as your " + BreastDescriptor_1.describeNipple(character, character.body.chest.get(3)) + " split into four distinct nipples!  <b>You now have four nipples on each breast in your fourth row of breasts</b>.");
                        character.body.chest.get(3).nipples.count = 4;
                    }
                }
                else if (character.body.chest.sort(BreastRow_1.BreastRow.LactationMost).get(0).lactationMultiplier > 1) {
                    if (SMath_1.randInt(2) === 0)
                        ContentView_1.CView.text("\n\nA wave of pleasure passes through your chest as your " + BreastDescriptor_1.describeBreastRow(character.body.chest.firstRow) + " start leaking milk from a massive jump in production.");
                    else
                        ContentView_1.CView.text("\n\nSomething shifts inside your " + BreastDescriptor_1.describeBreastRow(character.body.chest.firstRow) + " and they feel MUCH fuller and riper.  You know that you've started producing much more milk.");
                    BreastModifier_1.boostLactation(character, 2.5);
                    if ((character.body.chest.sort(BreastRow_1.BreastRow.Largest).get(0).nipples.length < 1.5 && this.tainted) || (!this.tainted && character.body.chest.sort(BreastRow_1.BreastRow.Largest).get(0).nipples.length < 1)) {
                        ContentView_1.CView.text("  Your " + BreastDescriptor_1.describeNipple(character, character.body.chest.firstRow) + "s swell up, growing larger to accommodate your increased milk flow.");
                        character.body.chest.sort(BreastRow_1.BreastRow.Largest).get(0).nipples.length += .25;
                        character.stats.sens += .5;
                    }
                    changes++;
                }
            }
            // If breasts are already lactating and the character is not lactating beyond a reasonable level, they start lactating more:
            else {
                if (this.tainted && character.body.chest.firstRow.lactationMultiplier > 1 && character.body.chest.firstRow.lactationMultiplier < 5 && changes < changeLimit && (SMath_1.randInt(3) === 0 || this.enhanced)) {
                    if (SMath_1.randInt(2) === 0)
                        ContentView_1.CView.text("\n\nA wave of pleasure passes through your chest as your " + BreastDescriptor_1.describeBreastRow(character.body.chest.firstRow) + " start producing more milk.");
                    else
                        ContentView_1.CView.text("\n\nSomething shifts inside your " + BreastDescriptor_1.describeBreastRow(character.body.chest.firstRow) + " and they feel fuller and riper.  You know that you've started producing more milk.");
                    BreastModifier_1.boostLactation(character, 0.75);
                    if ((character.body.chest.sort(BreastRow_1.BreastRow.Largest).get(0).nipples.length < 1.5 && this.tainted) || (!this.tainted && character.body.chest.sort(BreastRow_1.BreastRow.Largest).get(0).nipples.length < 1)) {
                        ContentView_1.CView.text("  Your " + BreastDescriptor_1.describeNipple(character, character.body.chest.firstRow) + "s swell up, growing larger to accommodate your increased milk flow.");
                        character.body.chest.sort(BreastRow_1.BreastRow.Largest).get(0).nipples.length += .25;
                        character.stats.sens += .5;
                    }
                    changes++;
                }
                if (!this.tainted) {
                    if (character.body.chest.firstRow.lactationMultiplier > 1 && character.body.chest.firstRow.lactationMultiplier < 3.2 && changes < changeLimit && SMath_1.randInt(3) === 0) {
                        if (SMath_1.randInt(2) === 0)
                            ContentView_1.CView.text("\n\nA wave of pleasure passes through your chest as your " + BreastDescriptor_1.describeBreastRow(character.body.chest.firstRow) + " start producing more milk.");
                        else
                            ContentView_1.CView.text("\n\nSomething shifts inside your " + BreastDescriptor_1.describeBreastRow(character.body.chest.firstRow) + " and they feel fuller and riper.  You know that you've started producing more milk.");
                        BreastModifier_1.boostLactation(character, 0.75);
                        if ((character.body.chest.sort(BreastRow_1.BreastRow.Largest).get(0).nipples.length < 1.5 && this.tainted) || (!this.tainted && character.body.chest.sort(BreastRow_1.BreastRow.Largest).get(0).nipples.length < 1)) {
                            ContentView_1.CView.text("  Your " + BreastDescriptor_1.describeNipple(character, character.body.chest.firstRow) + "s swell up, growing larger to accommodate your increased milk flow.");
                            character.body.chest.sort(BreastRow_1.BreastRow.Largest).get(0).nipples.length += .25;
                            character.stats.sens += .5;
                        }
                        changes++;
                    }
                    if ((character.body.chest.firstRow.lactationMultiplier > 2 && character.effects.has(EffectType_1.EffectType.Feeder)) || character.body.chest.firstRow.lactationMultiplier > 5) {
                        if (SMath_1.randInt(2) === 0)
                            ContentView_1.CView.text("\n\nYour breasts suddenly feel less full, it seems you aren't lactating at quite the level you were.");
                        else
                            ContentView_1.CView.text("\n\nThe insides of your breasts suddenly feel bloated.  There is a spray of milk from them, and they settle closer to a more natural level of lactation.");
                        changes++;
                        character.stats.sens += .5;
                        BreastModifier_1.boostLactation(character, -1);
                    }
                }
            }
            // If breasts are lactating at a fair level
            // and the character has not received this status,
            // apply an effect where the character really wants
            // to give their milk to other creatures
            // (capable of getting them addicted):
            if (!character.effects.has(EffectType_1.EffectType.Feeder) && character.body.chest.sort(BreastRow_1.BreastRow.LactationMost).get(0).lactationMultiplier >= 3 && SMath_1.randInt(2) === 0 && character.body.chest.sort(BreastRow_1.BreastRow.Largest).get(0).rating >= 5 && character.stats.cor >= 35) {
                ContentView_1.CView.text("\n\nYou start to feel a strange desire to give your milk to other creatures.  For some reason, you know it will be very satisfying.\n\n<b>(You have gained the 'Feeder' perk!)</b>");
                character.effects.create(EffectType_1.EffectType.Feeder);
                changes++;
            }
            // UNFINISHED
            // If character has addictive quality and drinks pure version, removes addictive quality.
            // if the character has a vagina and it is tight, it loosens.
            if (character.body.vaginas.length > 0) {
                if (character.body.vaginas.get(0).looseness < Vagina_1.VaginaLooseness.LOOSE && changes < changeLimit && SMath_1.randInt(2) === 0) {
                    ContentView_1.CView.text("\n\nYou feel a relaxing sensation in your groin.  On further inspection you discover your " + VaginaDescriptor_1.describeVagina(character, character.body.vaginas.get(0)) + " has somehow relaxed, permanently loosening.");
                    character.body.vaginas.get(0).looseness++;
                    // Cunt Stretched used to determine how long since last enlargement
                    let cuntStretched = character.effects.getByName(EffectType_1.EffectType.CuntStretched);
                    if (!cuntStretched)
                        cuntStretched = character.effects.create(EffectType_1.EffectType.CuntStretched, { hoursSince: 0 });
                    // Reset the timer on it to 0 when restretched.
                    else
                        cuntStretched.values.hoursSince = 0;
                    character.body.vaginas.get(0).looseness++;
                    changes++;
                    character.stats.lust += 10;
                }
            }
            // General Appearance (Tail -> Ears -> Paws(fur stripper) -> Face -> Horns
            // Give the character a bovine tail, same as the minotaur
            if (this.tainted && !character.body.tails.reduce(Tail_1.Tail.HasType(Tail_1.TailType.COW), false) && changes < changeLimit && SMath_1.randInt(3) === 0) {
                if (character.body.tails.length === 0)
                    ContentView_1.CView.text("\n\nYou feel the flesh above your " + ButtDescriptor_1.describeButt(character) + " knotting and growing.  It twists and writhes around itself before flopping straight down, now shaped into a distinctly bovine form.  You have a <b>cow tail</b>.");
                else {
                    if (character.body.tails.length > 0) {
                        ContentView_1.CView.text("\n\nYour tail bunches uncomfortably, twisting and writhing around itself before flopping straight down, now shaped into a distinctly bovine form.  You have a <b>cow tail</b>.");
                    }
                    // insect
                    if (character.body.tails.reduce(Tail_1.Tail.HasType(Tail_1.TailType.SPIDER_ABDOMEN), false) || character.body.tails.reduce(Tail_1.Tail.HasType(Tail_1.TailType.BEE_ABDOMEN), false)) {
                        ContentView_1.CView.text("\n\nYour insect-like abdomen tingles pleasantly as it begins shrinking and softening, chitin morphing and reshaping until it looks exactly like a <b>cow tail</b>.");
                    }
                }
                character.body.tails.clear();
                const newTail = new Tail_1.Tail();
                newTail.type = Tail_1.TailType.COW;
                character.body.tails.add(newTail);
                changes++;
            }
            // Give the character bovine ears, same as the minotaur
            if (this.tainted && character.body.ears.type !== Ears_1.EarType.COW && changes < changeLimit && SMath_1.randInt(4) === 0 && character.body.tails.reduce(Tail_1.Tail.HasType(Tail_1.TailType.COW), false)) {
                ContentView_1.CView.text("\n\nYou feel your ears tug on your scalp as they twist shape, becoming oblong and cow-like.  <b>You now have cow ears.</b>");
                character.body.ears.type = Ears_1.EarType.COW;
                changes++;
            }
            // If the character is under 7 feet in height, increase their height, similar to the minotaur
            if (((this.enhanced && character.body.tallness < 96) || character.body.tallness < 84) && changes < changeLimit && SMath_1.randInt(2) === 0) {
                let heightGain = SMath_1.randInt(5) + 3;
                // Slow rate of growth near ceiling
                if (character.body.tallness > 74)
                    heightGain = Math.floor(heightGain / 2);
                // Never 0
                if (heightGain === 0)
                    heightGain = 1;
                // Flavor texts.  Flavored like 1950's cigarettes. Yum.
                if (heightGain < 5)
                    ContentView_1.CView.text("\n\nYou shift uncomfortably as you realize you feel off balance.  Gazing down, you realize you have grown SLIGHTLY taller.");
                if (heightGain >= 5 && heightGain < 7)
                    ContentView_1.CView.text("\n\nYou feel dizzy and slightly off, but quickly realize it's due to a sudden increase in height.");
                if (heightGain === 7)
                    ContentView_1.CView.text("\n\nStaggering forwards, you clutch at your head dizzily.  You spend a moment getting your balance, and stand up, feeling noticeably taller.");
                character.body.tallness += heightGain;
                changes++;
            }
            // Give the character hoofs, if the character already has hoofs STRIP FUR
            if (this.tainted && character.body.legs.type !== Legs_1.LegType.HOOFED && character.body.ears.type === Ears_1.EarType.COW) {
                if (changes < changeLimit && SMath_1.randInt(3) === 0) {
                    changes++;
                    if (character.body.legs.type === Legs_1.LegType.HUMAN)
                        ContentView_1.CView.text("\n\nYou stagger as your feet change, curling up into painful angry lumps of flesh.  They get tighter and tighter, harder and harder, until at last they solidify into hooves!");
                    if (character.body.legs.type === Legs_1.LegType.DOG)
                        ContentView_1.CView.text("\n\nYou stagger as your paws change, curling up into painful angry lumps of flesh.  They get tighter and tighter, harder and harder, until at last they solidify into hooves!");
                    if (character.body.legs.type === Legs_1.LegType.NAGA)
                        ContentView_1.CView.text("\n\nYou collapse as your sinuous snake-tail tears in half, shifting into legs.  The pain is immense, particularly in your new feet as they curl inward and transform into hooves!");
                    // Catch-all
                    if (character.body.legs.type > Legs_1.LegType.NAGA)
                        ContentView_1.CView.text("\n\nYou stagger as your " + LegDescriptor_1.describeFeet(character) + " change, curling up into painful angry lumps of flesh.  They get tighter and tighter, harder and harder, until at last they solidify into hooves!");
                    ContentView_1.CView.text("  A coat of beastial fur springs up below your waist, itching as it fills in.<b>  You now have hooves in place of your feet!</b>");
                    character.body.legs.type = Legs_1.LegType.HOOFED;
                    character.stats.cor += 0;
                    changes++;
                }
            }
            // If the character's face is non-human, they gain a human face
            if (!this.enhanced && character.body.legs.type === Legs_1.LegType.HOOFED && character.body.face.type !== Face_1.FaceType.HUMAN && changes < changeLimit && SMath_1.randInt(4) === 0) {
                // Remove face before fur!
                ContentView_1.CView.text("\n\nYour visage twists painfully, returning to a normal human shape.  <b>Your face is human again!</b>");
                character.body.face.type = Face_1.FaceType.HUMAN;
                changes++;
            }
            // enhanced get shitty fur
            if (this.enhanced && (character.body.skin.desc !== "fur" || character.body.hair.color !== "black and white spotted")) {
                if (character.body.skin.desc !== "fur")
                    ContentView_1.CView.text("\n\nYour " + character.body.skin.desc + " itches intensely.  You scratch and scratch, but it doesn't bring any relief.  Fur erupts between your fingers, and you watch open-mouthed as it fills in over your whole body.  The fur is patterned in black and white, like that of a cow.  The color of it even spreads to your hair!  <b>You have cow fur!</b>");
                else
                    ContentView_1.CView.text("\n\nA ripple spreads through your fur as some patches darken and others lighten.  After a few moments you're left with a black and white spotted pattern that goes the whole way up to the hair on your head!  <b>You've got cow fur!</b>");
                character.body.skin.desc = "fur";
                character.body.skin.adj = "";
                character.body.skin.type = Skin_1.SkinType.FUR;
                character.body.hair.color = "black and white spotted";
            }
            // if enhanced to probova give a shitty cow face
            else if (this.enhanced && character.body.face.type !== Face_1.FaceType.COW_MINOTAUR) {
                ContentView_1.CView.text("\n\nYour visage twists painfully, warping and crackling as your bones are molded into a new shape.  Once it finishes, you reach up to touch it, and you discover that <b>your face is like that of a cow!</b>");
                character.body.face.type = Face_1.FaceType.COW_MINOTAUR;
                changes++;
            }
            // Give the character bovine horns, or increase their size, same as the minotaur
            // New horns.amount or expanding mino horns
            if (this.tainted && changes < changeLimit && SMath_1.randInt(3) === 0 && character.body.face.type === Face_1.FaceType.HUMAN) {
                // Get bigger or change horns
                if (character.body.horns.type === Horns_1.HornType.COW_MINOTAUR || character.body.horns.type === Horns_1.HornType.NONE) {
                    // Get bigger if character has horns
                    if (character.body.horns.type === Horns_1.HornType.COW_MINOTAUR) {
                        if (character.body.horns.count < 5) {
                            // Fems horns.amount don't get bigger.
                            ContentView_1.CView.text("\n\nYour small horns.amount get a bit bigger, stopping as medium sized nubs.");
                            character.body.horns.count += 1 + SMath_1.randInt(2);
                            changes++;
                        }
                    }
                    // If no horns.amount yet..
                    if (character.body.horns.type === Horns_1.HornType.NONE || character.body.horns.count === 0) {
                        ContentView_1.CView.text("\n\nWith painful pressure, the skin on your forehead splits around two tiny nub-like horns, similar to those you would see on the cattle back in your homeland.");
                        character.body.horns.type = Horns_1.HornType.COW_MINOTAUR;
                        character.body.horns.count = 1;
                        changes++;
                    }
                    /* Never reached
                    //TF other horns
                    if (character.torso.neck.head.horns.type != HornType.NONE && character.torso.neck.head.horns.type != HornType.COW_MINOTAUR && character.torso.neck.head.horns.amount > 0) {
                        CView.text("\n\nYour horns.amount twist, filling your skull with agonizing pain for a moment as they transform into cow-horns.");
                        character.torso.neck.head.horns.type = HornType.COW_MINOTAUR;
                    }*/
                }
                // Not mino horns, change to cow-horns
                if (character.body.horns.type === Horns_1.HornType.DEMON || character.body.horns.type > Horns_1.HornType.COW_MINOTAUR) {
                    ContentView_1.CView.text("\n\nYour horns.amount vibrate and shift as if made of clay, reforming into two small bovine nubs.");
                    character.body.horns.type = Horns_1.HornType.COW_MINOTAUR;
                    character.body.horns.count = 2;
                    changes++;
                }
            }
            // Increase the size of the character's hips, if they are not already childbearing or larger
            if (SMath_1.randInt(2) === 0 && character.body.hips.rating < 15 && changes < changeLimit) {
                if (!this.tainted && character.body.hips.rating < 8 || this.tainted) {
                    ContentView_1.CView.text("\n\nYou stumble as you feel the bones in your hips grinding, expanding your hips noticeably.");
                    character.body.hips.rating += 1 + SMath_1.randInt(4);
                    changes++;
                }
            }
            if (SMath_1.randInt(4) === 0 && character.body.neck.gills && changes < changeLimit) {
                ContentView_1.CView.text("\n\nYour chest itches, and as you reach up to scratch it, you realize your gills have withdrawn into your skin.");
                character.body.neck.gills = false;
                changes++;
            }
            // Increase the size of the character's ass (less likely then hips), if it is not already somewhat big
            if (SMath_1.randInt(2) === 0 && character.body.butt.rating < 13 && changes < changeLimit) {
                if (!this.tainted && character.body.butt.rating < 8 || this.tainted) {
                    ContentView_1.CView.text("\n\nA sensation of being unbalanced makes it difficult to walk.  You pause, paying careful attention to your new center of gravity before understanding dawns on you - your ass has grown!");
                    character.body.butt.rating += 1 + SMath_1.randInt(2);
                    changes++;
                }
            }
            // Nipples Turn Back:
            if (character.effects.has(EffectType_1.EffectType.BlackNipples) && changes < changeLimit && SMath_1.randInt(3) === 0) {
                ContentView_1.CView.text("\n\nSomething invisible brushes against your " + BreastDescriptor_1.describeNipple(character, character.body.chest.firstRow) + ", making you twitch.  Undoing your clothes, you take a look at your chest and find that your nipples have turned back to their natural flesh colour.");
                changes++;
                character.effects.removeByName(EffectType_1.EffectType.BlackNipples);
            }
            // Debugcunt
            if (changes < changeLimit && SMath_1.randInt(3) === 0 && character.body.vaginas.get(0).type === 5 && character.body.vaginas.length > 0) {
                ContentView_1.CView.text("\n\nSomething invisible brushes against your sex, making you twinge.  Undoing your clothes, you take a look at your vagina and find that it has turned back to its natural flesh colour.");
                character.body.vaginas.get(0).type = 0;
                changes++;
            }
            if (SMath_1.randInt(3) === 0)
                ContentView_1.CView.text(BodyModifier_1.displayModFem(character, 79, 3));
            if (SMath_1.randInt(3) === 0)
                ContentView_1.CView.text(BodyModifier_1.displayModThickness(character, 70, 4));
            if (SMath_1.randInt(5) === 0)
                ContentView_1.CView.text(BodyModifier_1.displayModTone(character, 10, 5));
        }
    }
    exports.LaBova = LaBova;
});
//# sourceMappingURL=LaBova.js.map