define(["require", "exports", "Engine/Items/Consumable", "../ConsumableName", "Engine/Utilities/SMath", "Engine/Body/BreastRow", "Engine/Body/Cock", "Engine/Body/Ears", "Engine/Body/Face", "Engine/Body/Legs", "Engine/Body/Skin", "Engine/Body/Tail", "Content/Effects/EffectType", "Content/Utilities/NumToText", "Engine/Items/ItemDesc", "Content/Descriptors/FaceDescriptor", "Content/Descriptors/CockDescriptor", "Content/Descriptors/VaginaDescriptor", "Content/Descriptors/BreastDescriptor", "Content/Descriptors/LegDescriptor", "Engine/Display/ContentView", "Content/Modifiers/StatModifier", "Content/Modifiers/BodyModifier", "Content/Settings"], function (require, exports, Consumable_1, ConsumableName_1, SMath_1, BreastRow_1, Cock_1, Ears_1, Face_1, Legs_1, Skin_1, Tail_1, EffectType_1, NumToText_1, ItemDesc_1, FaceDescriptor_1, CockDescriptor_1, VaginaDescriptor_1, BreastDescriptor_1, LegDescriptor_1, ContentView_1, StatModifier_1, BodyModifier_1, Settings_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class WhiskerFruit extends Consumable_1.Consumable {
        constructor() {
            super(ConsumableName_1.ConsumableName.WhiskerFruit, new ItemDesc_1.ItemDesc("W.Fruit", "a piece of whisker-fruit", "This small, peach-sized fruit has tiny whisker-like protrusions growing from the sides."));
        }
        use(character) {
            let changes = 0;
            let changeLimit = 1;
            if (SMath_1.randInt(2) === 0)
                changeLimit++;
            if (SMath_1.randInt(2) === 0)
                changeLimit++;
            if (SMath_1.randInt(3) === 0)
                changeLimit++;
            if (character.effects.has(EffectType_1.EffectType.HistoryAlchemist))
                changeLimit++;
            // Text go!
            ContentView_1.CView.clear();
            ContentView_1.CView.text("You take a bite of the fruit and gulp it down. It's thick and juicy and has an almost overpowering sweetness. Nevertheless, it is delicious and you certainly could use a meal.  You devour the fruit, stopping only when the hard, nubby pit is left; which you toss aside.");
            // Speed raises up to 75
            if (character.stats.spe < 75 && SMath_1.randInt(3) === 0 && changes < changeLimit) {
                // low speed
                if (character.stats.spe <= 30) {
                    ContentView_1.CView.text("\n\nYou feel... more balanced, sure of step. You're certain that you've become just a little bit faster.");
                    character.stats.spe += 2;
                }
                // medium speed
                else if (character.stats.spe <= 60) {
                    ContentView_1.CView.text("\n\nYou stumble as you shift position, surprised by how quickly you move. After a moment or two of disorientation, you adjust. You're certain that you can run faster now.");
                    character.stats.spe += 1;
                }
                // high speed
                else {
                    ContentView_1.CView.text("\n\nYou pause mid-step and crouch. Your leg muscles have cramped up like crazy. After a few moments, the pain passes and you feel like you could chase anything down.");
                    character.stats.spe += .5;
                }
                changes++;
            }
            // Strength raises to 40
            if (character.stats.str < 40 && SMath_1.randInt(3) === 0 && changes < changeLimit) {
                if (SMath_1.randInt(2) === 0)
                    ContentView_1.CView.text("\n\nYour muscles feel taut, like a coiled spring, and a bit more on edge.");
                else
                    ContentView_1.CView.text("\n\nYou arch your back as your muscles clench painfully.  The cramp passes swiftly, leaving you feeling like you've gotten a bit stronger.");
                character.stats.str += 1;
                changes++;
            }
            // Strength ALWAYS drops if over 60
            // Does not add to change total
            else if (character.stats.str > 60 && SMath_1.randInt(2) === 0) {
                ContentView_1.CView.text("\n\nShivers run from your head to your toes, leaving you feeling weak.  Looking yourself over, your muscles seemed to have lost some bulk.");
                character.stats.str += -2;
            }
            // Toughness drops if over 50
            // Does not add to change total
            if (character.stats.tou > 50 && SMath_1.randInt(2) === 0) {
                ContentView_1.CView.text("\n\nYour body seems to compress momentarily, becoming leaner and noticeably less tough.");
                character.stats.tou += -2;
            }
            // Intelliloss
            if (SMath_1.randInt(4) === 0 && changes < changeLimit) {
                // low intelligence
                if (character.stats.int < 15)
                    ContentView_1.CView.text("\n\nYou feel like something is slipping away from you but can't figure out exactly what's happening.  You scrunch up your " + FaceDescriptor_1.describeFaceShort(character) + ", trying to understand the situation.  Before you can reach any kind of conclusion, something glitters in the distance, distracting your feeble mind long enough for you to forget the problem entirely.");
                // medium intelligence
                else if (character.stats.int < 50) {
                    ContentView_1.CView.text("\n\nYour mind feels somewhat sluggish, and you wonder if you should just lie down ");
                    if (SMath_1.randInt(2) === 0) {
                        ContentView_1.CView.text("somewhere and ");
                        const chance = SMath_1.randInt(3);
                        if (chance === 0)
                            ContentView_1.CView.text("toss a ball around or something");
                        else if (chance === 1)
                            ContentView_1.CView.text("play with some yarn");
                        else if (chance === 2)
                            ContentView_1.CView.text("take a nap and stop worrying");
                    }
                    else
                        ContentView_1.CView.text("in the sun and let your troubles slip away");
                    ContentView_1.CView.text(".");
                }
                // High intelligence
                else
                    ContentView_1.CView.text("\n\nYou start to feel a bit dizzy, but the sensation quickly passes.  Thinking hard on it, you mentally brush away the fuzziness that seems to permeate your brain and determine that this fruit may have actually made you dumber.  It would be best not to eat too much of it.");
                character.stats.int += -1;
                changes++;
            }
            // Libido gain
            if (character.stats.lib < 80 && changes < changeLimit && SMath_1.randInt(4) === 0) {
                // Cat dicked folks
                const catCock = character.body.cocks.find(Cock_1.Cock.FilterType(Cock_1.CockType.CAT));
                if (catCock) {
                    ContentView_1.CView.text("\n\nYou feel your " + CockDescriptor_1.describeCock(character, catCock) + " growing hard, the barbs becoming more sensitive. You gently run your hands down them and imagine the feeling of raking the insides of a cunt as you pull.  The fantasy continues, and after ejaculating and hearing the female yowl with pleasure, you shake your head and try to drive off the image.  ");
                    if (character.stats.cor < 33)
                        ContentView_1.CView.text("You need to control yourself better.");
                    else if (character.stats.cor < 66)
                        ContentView_1.CView.text("You're not sure how you feel about the fantasy.");
                    else
                        ContentView_1.CView.text("You hope to find a willing partner to make this a reality.");
                }
                // Else �
                else {
                    ContentView_1.CView.text("\n\nA rush of tingling warmth spreads through your body as it digests the fruit.  You can feel your blood pumping through your extremities, making them feel sensitive and surprisingly sensual.  It's going to be hard to resist getting ");
                    if (character.stats.lust > 60)
                        ContentView_1.CView.text("even more ");
                    ContentView_1.CView.text("turned on.");
                }
                character.stats.lib += 1;
                character.stats.sens += .25;
                changes++;
            }
            // Sexual changes would go here if I wasn't a tard.
            // Heat
            if (SMath_1.randInt(4) === 0 && changes < changeLimit) {
                const intensified = character.effects.has(EffectType_1.EffectType.Heat);
                if (character.body.vaginas.length > 0) {
                    if (intensified) {
                        if (SMath_1.randInt(2) === 0)
                            ContentView_1.CView.text("\n\nThe itch inside your " + VaginaDescriptor_1.describeVagina(character, character.body.vaginas.get(0)) + " is growing stronger, and you desperately want to find a nice cock to massage the inside.");
                        else
                            ContentView_1.CView.text("\n\nThe need inside your " + VaginaDescriptor_1.describeVagina(character, character.body.vaginas.get(0)) + " grows even stronger.  You desperately need to find a mate to 'scratch your itch' and fill your womb with kittens.  It's difficult NOT to think about a cock slipping inside your moist fuck-tunnel, and at this point you'll have a hard time resisting ANY male who approaches.");
                    }
                    else {
                        ContentView_1.CView.text("\n\nThe interior of your " + VaginaDescriptor_1.describeVagina(character, character.body.vaginas.get(0)) + " clenches tightly, squeezing with reflexive, aching need.  Your skin flushes hot ");
                        if (character.body.skin.type === Skin_1.SkinType.FUR)
                            ContentView_1.CView.text("underneath your fur ");
                        ContentView_1.CView.text("as images and fantasies ");
                        if (character.stats.cor < 50)
                            ContentView_1.CView.text("assault ");
                        else
                            ContentView_1.CView.text("fill ");
                        ContentView_1.CView.text(" your mind.  Lithe cat-boys with their perfect, spine-covered cocks line up behind you, and you bend over to present your needy pussy to them.  You tremble with the desire to feel the exotic texture of their soft barbs rubbing your inner walls, smearing your " + VaginaDescriptor_1.describeVagina(character, character.body.vaginas.get(0)) + " with their cum as you're impregnated.  Shivering, you recover from the fantasy and pull your fingers from your aroused sex.  <b>It would seem you've gone into heat!</b>");
                    }
                    changes++;
                }
            }
            // Shrink the boobalies down to A for men or C for girls.
            if (character.body.chest.length > 0 && changes < changeLimit && SMath_1.randInt(4) === 0 && !Settings_1.Settings.hyperHappy) {
                let breastShrinkageThreshold = 0;
                let shrinkingHappened = false;
                // Determine if shrinkage is required
                if (character.body.vaginas.length <= 0 && character.body.chest.sort(BreastRow_1.BreastRow.Largest).get(0).rating > 2)
                    breastShrinkageThreshold = 2;
                else if (character.body.chest.sort(BreastRow_1.BreastRow.Largest).get(0).rating > 4)
                    breastShrinkageThreshold = 4;
                // IT IS!
                if (breastShrinkageThreshold > 0) {
                    let selectedBreastRow;
                    for (let index = 0; index < character.body.chest.length; index++) {
                        // If this row is over threshhold
                        selectedBreastRow = character.body.chest.get(index);
                        if (selectedBreastRow.rating > breastShrinkageThreshold) {
                            // Big change
                            if (selectedBreastRow.rating > 10) {
                                selectedBreastRow.rating -= 2 + SMath_1.randInt(3);
                                if (!shrinkingHappened)
                                    ContentView_1.CView.text("\n\nThe " + BreastDescriptor_1.describeBreastRow(selectedBreastRow) + " on your chest wobble for a second, then tighten up, losing several cup-sizes in the process!");
                                else
                                    ContentView_1.CView.text("  The change moves down to your " + NumToText_1.numToOrdinalText(index + 1) + " row of " + BreastDescriptor_1.describeBreastRow(selectedBreastRow) + ". They shrink greatly, losing a couple cup-sizes.");
                            }
                            // Small change
                            else {
                                selectedBreastRow.rating -= 1;
                                if (!shrinkingHappened)
                                    ContentView_1.CView.text("\n\nAll at once, your sense of gravity shifts.  Your back feels a sense of relief, and it takes you a moment to realize your " + BreastDescriptor_1.describeBreastRow(selectedBreastRow) + " have shrunk!");
                                else
                                    ContentView_1.CView.text("  Your " + NumToText_1.numToOrdinalText(index + 1) + " row of " + BreastDescriptor_1.describeBreastRow(selectedBreastRow) + " gives a tiny jiggle as it shrinks, losing some off its mass.");
                            }
                            // Increment changed rows
                            shrinkingHappened = true;
                        }
                    }
                }
                // Count that tits were shrunk
                if (shrinkingHappened)
                    changes++;
            }
            // Cat dangly-doo.
            if (character.body.cocks.length > 0 && character.body.cocks.filter(Cock_1.Cock.FilterType(Cock_1.CockType.CAT)).length < character.body.cocks.length &&
                changes < changeLimit && SMath_1.randInt(4) === 0) {
                // loop through and find a non-cat wang.
                for (const cock of character.body.cocks) {
                    if (cock.type === Cock_1.CockType.CAT) {
                        ContentView_1.CView.text("\n\nYour " + CockDescriptor_1.describeCock(character, cock) + " swells up with near-painful arousal and begins to transform.  It turns pink and begins to narrow until the tip is barely wide enough to accommodate your urethra.  Barbs begin to sprout from its flesh, if you can call the small, fleshy nubs barbs. They start out thick around the base of your " + CockDescriptor_1.nounCock(Cock_1.CockType.HUMAN) + " and shrink towards the tip. The smallest are barely visible. <b>Your new feline dong throbs powerfully</b> and spurts a few droplets of cum.  ");
                        if (!cock.hasSheath()) {
                            ContentView_1.CView.text("Then, it begins to shrink and sucks itself inside your body.  Within a few moments, a fleshy sheath is formed.");
                            if (character.body.balls.count > 0)
                                ContentView_1.CView.text("  Thankfully, your balls appear untouched.");
                        }
                        else
                            ContentView_1.CView.text("Then, it disappears back into your sheath.");
                        cock.type = Cock_1.CockType.CAT;
                        cock.knotMultiplier = 1;
                    }
                }
                changes++;
            }
            // Cat penorz shrink
            if (character.body.cocks.filter(Cock_1.Cock.FilterType(Cock_1.CockType.CAT)).length > 0 && SMath_1.randInt(3) === 0 && changes < changeLimit && !Settings_1.Settings.hyperHappy) {
                // loop through and find a cat wang.
                let changedCock = 0;
                for (const cock of character.body.cocks) {
                    if (cock.type === Cock_1.CockType.CAT && cock.length > 6) {
                        // lose 33% size until under 10, then lose 2" at a time
                        if (cock.length > 16) {
                            if (changedCock === 0)
                                ContentView_1.CView.text("\n\nYour " + CockDescriptor_1.describeCock(character, cock) + " tingles, making your sheath feel a little less tight.  It dwindles in size, losing a full third of its length and a bit of girth before the change finally stops.");
                            cock.length *= .66;
                            changedCock++;
                        }
                        else if (cock.length > 6) {
                            if (changedCock === 0)
                                ContentView_1.CView.text("\n\nYour " + CockDescriptor_1.describeCock(character, cock) + " tingles and withdraws further into your sheath.  If you had to guess, you'd say you've lost about two inches of total length and perhaps some girth.");
                            cock.length -= 2;
                            changedCock++;
                        }
                        if (cock.length / 5 < cock.thickness && cock.thickness > 1.25)
                            cock.thickness = cock.length / 6;
                    }
                }
                // (big sensitivity boost)
                ContentView_1.CView.text("  Although the package is smaller, it feels even more sensitive � as if it retained all sensation of its larger size in its smaller form.");
                character.stats.sens += 5;
                // Make note of other dicks changing
                if (changedCock > 1)
                    ContentView_1.CView.text("  Upon further inspection, all your " + CockDescriptor_1.nounCock(Cock_1.CockType.CAT) + "s have shrunk!");
                changes++;
            }
            // Body type changes.  Teh rarest of the rare.
            // DA EARZ
            if (character.body.ears.type !== Ears_1.EarType.CAT && SMath_1.randInt(5) === 0 && changes < changeLimit) {
                // human to cat:
                if (character.body.ears.type === Ears_1.EarType.HUMAN) {
                    if (SMath_1.randInt(2) === 0)
                        ContentView_1.CView.text("\n\nThe skin on the sides of your face stretches painfully as your ears migrate upwards, towards the top of your head. They shift and elongate a little, fur growing on them as they become feline in nature. <b>You now have cat ears.</b>");
                    else
                        ContentView_1.CView.text("\n\nYour ears begin to tingle. You reach up with one hand and gently rub them. They appear to be growing fur. Within a few moments, they've migrated up to the top of your head and increased in size. The tingling stops and you find yourself hearing noises in a whole new way. <b>You now have cat ears.</b>");
                }
                // non human to cat:
                else {
                    if (SMath_1.randInt(2) === 0)
                        ContentView_1.CView.text("\n\nYour ears change shape, morphing into pointed, feline ears!  They swivel about reflexively as you adjust to them.  <b>You now have cat ears.</b>");
                    else
                        ContentView_1.CView.text("\n\nYour ears tingle and begin to change shape. Within a few moments, they've become long and feline.  Thanks to the new fuzzy organs, you find yourself able to hear things that eluded your notice up until now. <b>You now have cat ears.</b>");
                }
                character.body.ears.type = Ears_1.EarType.CAT;
                changes++;
            }
            // DA TailType (IF ALREADY HAZ URZ)
            if (!character.body.tails.reduce(Tail_1.Tail.HasType(Tail_1.TailType.CAT), false) && character.body.ears.type === Ears_1.EarType.CAT && SMath_1.randInt(5) === 0 && changes < changeLimit) {
                if (character.body.tails.length === 0) {
                    const chance = SMath_1.randInt(3);
                    if (chance === 0)
                        ContentView_1.CView.text("\n\nA pressure builds in your backside. You feel under your " + character.inventory.armor.displayName + " and discover an odd bump that seems to be growing larger by the moment. In seconds it passes between your fingers, bursts out the back of your clothes and grows most of the way to the ground. A thick coat of fur springs up to cover your new tail. You instinctively keep adjusting it to improve your balance. <b>You now have a cat-tail.</b>");
                    if (chance === 1)
                        ContentView_1.CView.text("\n\nYou feel your backside shift and change, flesh molding and displacing into a long, flexible tail! <b>You now have a cat tail.</b>");
                    if (chance === 2)
                        ContentView_1.CView.text("\n\nYou feel an odd tingling in your spine and your tail bone starts to throb and then swell. Within a few moments it begins to grow, adding new bones to your spine. Before you know it, you have a tail. Just before you think it's over, the tail begins to sprout soft, glossy " + character.body.hair.color + " fur. <b>You now have a cat tail.</b>");
                }
                else
                    ContentView_1.CView.text("\n\nYou pause and tilt your head... something feels different.  Ah, that's what it is; you turn around and look down at your tail as it starts to change shape, narrowing and sprouting glossy fur. <b>You now have a cat tail.</b>");
                character.body.tails.clear();
                character.body.tails.add(new Tail_1.Tail(Tail_1.TailType.CAT));
                changes++;
            }
            // Da paws (if already haz ears & tail)
            if (character.body.tails.reduce(Tail_1.Tail.HasType(Tail_1.TailType.CAT), false) && character.body.ears.type === Ears_1.EarType.CAT && SMath_1.randInt(5) === 0 && changes < changeLimit && character.body.legs.type !== Legs_1.LegType.CAT) {
                // hoof to cat:
                if (character.body.legs.type === Legs_1.LegType.HOOFED || character.body.legs.type === Legs_1.LegType.CENTAUR) {
                    ContentView_1.CView.text("\n\nYou feel your hooves suddenly splinter, growing into five unique digits. Their flesh softens as your hooves reshape into furred cat paws. <b>You now have cat paws.</b>");
                    if (character.body.legs.type === Legs_1.LegType.CENTAUR)
                        ContentView_1.CView.text("  You feel woozy and collapse on your side.  When you wake, you're no longer a centaur and your body has returned to a humanoid shape.");
                }
                // Goo to cat
                else if (character.body.legs.type === Legs_1.LegType.GOO) {
                    ContentView_1.CView.text("\n\nYour lower body rushes inward, molding into two leg-like shapes that gradually stiffen up.  In moments they solidify into digitigrade legs, complete with soft, padded cat-paws.  <b>You now have cat-paws!</b>");
                }
                // non hoof to cat:
                else
                    ContentView_1.CView.text("\n\nYou scream in agony as you feel the bones in your " + LegDescriptor_1.describeFeet(character) + " break and begin to rearrange. When the pain fades, you feel surprisingly well-balanced. <b>You now have cat paws.</b>");
                character.body.legs.type = Legs_1.LegType.CAT;
                changes++;
            }
            // TURN INTO A FURRAH!  OH SHIT
            if (character.body.tails.reduce(Tail_1.Tail.HasType(Tail_1.TailType.CAT), false) &&
                character.body.ears.type === Ears_1.EarType.CAT &&
                character.body.legs.type === Legs_1.LegType.CAT &&
                character.body.skin.type !== Skin_1.SkinType.FUR &&
                SMath_1.randInt(5) === 0 && changes < changeLimit) {
                ContentView_1.CView.text("\n\nYour " + character.body.skin.desc + " begins to tingle, then itch. You reach down to scratch your arm absent-mindedly and pull your fingers away to find strands of " + character.body.hair.color + " fur. Wait, fur?  What just happened?! You spend a moment examining yourself and discover that <b>you are now covered in glossy, soft fur.</b>\n\n");
                character.body.skin.type = Skin_1.SkinType.FUR;
                character.body.skin.desc = "fur";
                changes++;
            }
            // CAT-FaceType!  FULL ON FURRY!  RAGE AWAY NEKOZ
            if (character.body.tails.reduce(Tail_1.Tail.HasType(Tail_1.TailType.CAT), false) &&
                character.body.ears.type === Ears_1.EarType.CAT &&
                character.body.legs.type === Legs_1.LegType.CAT &&
                character.body.skin.type === Skin_1.SkinType.FUR &&
                character.body.face.type !== Face_1.FaceType.CAT &&
                SMath_1.randInt(5) === 0 &&
                changes < changeLimit) {
                // Gain cat face, replace old face
                const chance = SMath_1.randInt(3);
                if (chance === 0)
                    ContentView_1.CView.text("\n\nYour face is wracked with pain. You throw back your head and scream in agony as you feel your cheekbones breaking and shifting, reforming into something... different. You find a puddle to view your reflection and discover <b>your face is now a cross between human and feline features.</b>");
                else if (chance === 1)
                    ContentView_1.CView.text("\n\nMind-numbing pain courses through you as you feel your facial bones rearranging.  You clutch at your face in agony as your skin crawls and shifts, your visage reshaping to replace your facial characteristics with those of a feline. <b>You now have an anthropomorphic cat-face.</b>");
                else
                    ContentView_1.CView.text("\n\nYour face is wracked with pain. You throw back your head and scream in agony as you feel your cheekbones breaking and shifting, reforming into something else. <b>Your facial features rearrange to take on many feline aspects.</b>");
                character.body.face.type = Face_1.FaceType.CAT;
                changes++;
            }
            if (SMath_1.randInt(4) === 0 && character.body.neck.gills && changes < changeLimit) {
                ContentView_1.CView.text("\n\nYour chest itches, and as you reach up to scratch it, you realize your gills have withdrawn into your skin.");
                character.body.neck.gills = false;
                changes++;
            }
            // FAILSAFE CHANGE
            if (changes === 0) {
                ContentView_1.CView.text("\n\nInhuman vitality spreads through your body, invigorating you!\n");
                StatModifier_1.displayCharacterHPChange(character, 50);
                character.stats.lust += 3;
            }
            if (changes < changeLimit) {
                if (SMath_1.randInt(2) === 0)
                    ContentView_1.CView.text(BodyModifier_1.displayModThickness(character, 5, 2));
                if (SMath_1.randInt(2) === 0)
                    ContentView_1.CView.text(BodyModifier_1.displayModTone(character, 76, 2));
                if (character.gender < 2)
                    if (SMath_1.randInt(2) === 0)
                        ContentView_1.CView.text(BodyModifier_1.displayModFem(character, 65, 1));
                    else
                        ContentView_1.CView.text(BodyModifier_1.displayModFem(character, 85, 2));
            }
        }
    }
    exports.WhiskerFruit = WhiskerFruit;
});
//# sourceMappingURL=WhiskerFruit.js.map