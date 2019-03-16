define(["require", "exports", "Engine/Items/Consumable", "../ConsumableName", "Engine/Utilities/SMath", "Engine/Body/Arms", "Engine/Body/BreastRow", "Engine/Body/Cock", "Engine/Body/Ears", "Engine/Body/Face", "Engine/Body/Horns", "Engine/Body/Legs", "Engine/Body/Skin", "Engine/Body/Tail", "Engine/Body/Vagina", "Content/Effects/EffectType", "Engine/Items/ItemDesc", "Content/Descriptors/BallsDescriptor", "Content/Descriptors/LegDescriptor", "Content/Descriptors/VaginaDescriptor", "Content/Descriptors/BreastDescriptor", "Content/Descriptors/CockDescriptor", "Content/Descriptors/ButtDescriptor", "Engine/Display/ContentView", "Content/Modifiers/CockModifier", "Content/Modifiers/BodyModifier", "Content/Modifiers/StatModifier", "Content/Settings"], function (require, exports, Consumable_1, ConsumableName_1, SMath_1, Arms_1, BreastRow_1, Cock_1, Ears_1, Face_1, Horns_1, Legs_1, Skin_1, Tail_1, Vagina_1, EffectType_1, ItemDesc_1, BallsDescriptor_1, LegDescriptor_1, VaginaDescriptor_1, BreastDescriptor_1, CockDescriptor_1, ButtDescriptor_1, ContentView_1, CockModifier_1, BodyModifier_1, StatModifier_1, Settings_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class MinotaurBlood extends Consumable_1.Consumable {
        constructor() {
            super(ConsumableName_1.ConsumableName.MinotaurBlood, new ItemDesc_1.ItemDesc("MinoBlo", "a vial of Minotaur blood", "You've got a scratched up looking vial full of bright red minotaur blood.  Any time you move it around it seems to froth up, as if eager to escape."));
        }
        use(character) {
            const chest = character.body.chest;
            const vaginas = character.body.vaginas;
            const cocks = character.body.cocks;
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
            if (changeLimit === 1)
                changeLimit = 2;
            // Set up output
            ContentView_1.CView.clear();
            ContentView_1.CView.text("You drink the bubbling red fluid, tasting the tangy iron after-taste.");
            // STATS
            // Strength h
            if (SMath_1.randInt(3) === 0 && changes < changeLimit) {
                // weaker characters gain more
                if (character.stats.str <= 50) {
                    ContentView_1.CView.text("\n\nPainful aches ripple through your body, flooding you with pain as your muscles flex and bulge, growing much stronger and more well-defined.");
                    // very weak characters gain more
                    if (character.stats.str <= 20)
                        character.stats.str += 3;
                    else
                        character.stats.str += 2;
                }
                // stronger characters gain less
                else {
                    // small growth if over 75
                    if (character.stats.str >= 75)
                        character.stats.str += .5;
                    // faster from 50-75
                    else
                        character.stats.str += 1;
                    ContentView_1.CView.text("\n\nYour muscles grow tighter, bulging outwards powerfully as you get even stronger!");
                }
                // Chance of speed drop
                if (SMath_1.randInt(2) === 0 && character.stats.str > 50) {
                    ContentView_1.CView.text("\n\nYou begin to feel that the size of your muscles is starting to slow you down.");
                    character.stats.spe += -1;
                }
                changes++;
            }
            // Toughness (chance of - sensitivity)
            if (SMath_1.randInt(3) === 0 && changes < changeLimit) {
                // weaker characters gain more
                if (character.stats.tou <= 50) {
                    ContentView_1.CView.text("\n\nYour hide... skin... whatever... you can feel it getting tougher as it thickens perceptibly.");
                    // very weak characters gain more
                    if (character.stats.tou <= 20)
                        character.stats.tou += 3;
                    else
                        character.stats.tou += 2;
                }
                // stronger characters gain less
                else {
                    // small growth if over 75
                    if (character.stats.tou >= 75)
                        character.stats.tou += .5;
                    // faster from 50-75
                    else
                        character.stats.tou += 1;
                    ContentView_1.CView.text("\n\nYour tough hide grows slightly thicker.");
                }
                // chance of less sensitivity
                if (SMath_1.randInt(2) === 0 && character.stats.sens > 10) {
                    if (character.stats.tou > 75) {
                        ContentView_1.CView.text("\n\nIt becomes much harder to feel anything through your leathery skin.");
                        character.stats.sens += -3;
                    }
                    if (character.stats.tou <= 75 && character.stats.tou > 50) {
                        ContentView_1.CView.text("\n\nThe level of sensation from your skin diminishes noticeably.");
                        character.stats.sens += -2;
                    }
                    if (character.stats.tou <= 50) {
                        ContentView_1.CView.text("\n\nYour sense of touch diminishes due to your tougher hide.");
                        character.stats.sens += -3;
                    }
                }
                changes++;
            }
            // SEXUAL
            // Boosts ball size MORE than equinum :D:D:D:D:D:D:
            if (changes < changeLimit && SMath_1.randInt(2) === 0 && character.body.balls.size <= 5 && cocks.filter(Cock_1.Cock.FilterType(Cock_1.CockType.HORSE)).length > 0) {
                // Chance of ball growth if not 3" yet
                if (character.body.balls.count === 0) {
                    character.body.balls.count = 2;
                    character.body.balls.size = 1;
                    ContentView_1.CView.text("\n\nA nauseating pressure forms just under the base of your maleness.  With agonizing pain the flesh bulges and distends, pushing out a rounded lump of flesh that you recognize as a testicle!  A moment later relief overwhelms you as the second drops into your newly formed sack.");
                    character.stats.lib += 2;
                    character.stats.lust += 5;
                }
                else {
                    character.body.balls.size++;
                    if (character.body.balls.size <= 2)
                        ContentView_1.CView.text("\n\nA flash of warmth passes through you and a sudden weight develops in your groin.  You pause to examine the changes and your roving fingers discover your " + BallsDescriptor_1.describeBalls(false, true, character) + " have grown larger than a human's.");
                    if (character.body.balls.size > 2)
                        ContentView_1.CView.text("\n\nA sudden onset of heat envelops your groin, focusing on your " + BallsDescriptor_1.describeSack(character) + ".  Walking becomes difficult as you discover your " + BallsDescriptor_1.describeBalls(false, true, character) + " have enlarged again.");
                    character.stats.lib += 1;
                    character.stats.lust += 3;
                }
                changes++;
            }
            // -Remove feather-arms (copy this for goblin ale, mino blood, equinum, canine pepps, demon items)
            if (changes < changeLimit && character.body.arms.type === Arms_1.ArmType.HARPY && SMath_1.randInt(4) === 0) {
                ContentView_1.CView.text("\n\nYou scratch at your biceps absentmindedly, but no matter how much you scratch, it isn't getting rid of the itch.  Glancing down in irritation, you discover that your feathery arms are shedding their feathery coating.  The wing-like shape your arms once had is gone in a matter of moments, leaving " + character.body.skin.desc + " behind.");
                character.body.arms.type = Arms_1.ArmType.HUMAN;
                changes++;
            }
            // -Remove chitin-arms (copy this for goblin ale, mino blood, equinum, canine pepps, demon items)
            if (changes < changeLimit && character.body.arms.type === Arms_1.ArmType.SPIDER && SMath_1.randInt(4) === 0) {
                ContentView_1.CView.text("\n\nYou scratch at your biceps absentmindedly, but no matter how much you scratch, it isn't getting rid of the itch.  Glancing down in irritation, you discover that your arms' chitinous covering is flaking away.  The glossy black coating is soon gone, leaving " + character.body.skin.desc + " behind.");
                character.body.arms.type = Arms_1.ArmType.HUMAN;
                changes++;
            }
            // +hooves
            if (character.body.legs.type !== Legs_1.LegType.HOOFED && character.body.legs.type !== Legs_1.LegType.CENTAUR) {
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
                    if (character.body.skin.type !== Skin_1.SkinType.FUR)
                        ContentView_1.CView.text("  A fine coat of fur grows out below your waist, itching briefly as it fills in.");
                    ContentView_1.CView.text("<b>  You now have hooves in place of your feet!</b>");
                    character.body.legs.type = Legs_1.LegType.HOOFED;
                    character.stats.spe += 1;
                    changes++;
                }
            }
            if (!Settings_1.Settings.hyperHappy) {
                // Kills vagina size (and eventually the whole vagina)
                if (vaginas.length > 0) {
                    const topVagina = vaginas.get(0);
                    if (topVagina.looseness > Vagina_1.VaginaLooseness.TIGHT) {
                        // tighten that bitch up!
                        ContentView_1.CView.text("\n\nYour " + VaginaDescriptor_1.describeVagina(character, vaginas.get(0)) + " clenches up painfully as it tightens up, becoming smaller and tighter.");
                        topVagina.looseness--;
                    }
                    else {
                        ContentView_1.CView.text("\n\nA tightness in your groin is the only warning you get before your <b>" + VaginaDescriptor_1.describeVagina(character, topVagina) + " disappears forever</b>!");
                        // Goodbye womanhood!
                        vaginas.remove(0);
                        if (cocks.length === 0) {
                            ContentView_1.CView.text("  Strangely, your clit seems to have resisted the change, and is growing larger by the moment... shifting into the shape of a small ribbed minotaur-like penis!  <b>You now have a horse-cock!</b>");
                            const newCock = new Cock_1.Cock();
                            newCock.length = character.body.clit.length + 2;
                            newCock.thickness = 1;
                            newCock.type = Cock_1.CockType.HORSE;
                            cocks.add(newCock);
                        }
                    }
                    changes++;
                }
                // -Remove extra breast rows
                if (changes < changeLimit && character.body.chest.length > 1 && SMath_1.randInt(3) === 0) {
                    const lastBreastRow = chest.get(chest.length - 1);
                    changes++;
                    ContentView_1.CView.text("\n\nYou stumble back when your center of balance shifts, and though you adjust before you can fall over, you're left to watch in awe as your bottom-most " + BreastDescriptor_1.describeBreastRow(lastBreastRow) + " shrink down, disappearing completely into your ");
                    if (character.body.chest.length >= 3)
                        ContentView_1.CView.text("abdomen");
                    else
                        ContentView_1.CView.text("chest");
                    ContentView_1.CView.text(". The " + BreastDescriptor_1.describeNipple(character, lastBreastRow) + "s even fade until nothing but ");
                    if (character.body.skin.type === Skin_1.SkinType.FUR)
                        ContentView_1.CView.text(character.body.hair.color + " " + character.body.skin.desc);
                    else
                        ContentView_1.CView.text(character.body.skin.tone + " " + character.body.skin.desc);
                    ContentView_1.CView.text(" remains. <b>You've lost a row of breasts!</b>");
                    character.stats.sens += -5;
                    chest.remove(chest.length - 1);
                }
                // Shrink boobages till they are normal
                else if (SMath_1.randInt(2) === 0 && changes < changeLimit && chest.length > 0) {
                    // Single row
                    if (chest.length === 1) {
                        // Shrink if bigger than B cups
                        if (chest.firstRow.rating >= 1) {
                            let superShrink = false;
                            chest.firstRow.rating--;
                            // Shrink again if huuuuge
                            if (chest.firstRow.rating > 8) {
                                superShrink = true;
                                chest.firstRow.rating--;
                            }
                            // Talk about shrinkage
                            if (!superShrink)
                                ContentView_1.CView.text("\n\nYou feel a weight lifted from you, and realize your " + BreastDescriptor_1.describeBreastRow(chest.firstRow) + " have shrunk to " + BreastDescriptor_1.breastCup(chest.firstRow.rating) + "s.");
                            else
                                ContentView_1.CView.text("\n\nYou feel significantly lighter.  Looking down, you realize your breasts are MUCH smaller, down to " + BreastDescriptor_1.breastCup(chest.firstRow.rating) + "s.");
                            changes++;
                        }
                    }
                    // multiple
                    else {
                        let growthAmount = 0;
                        if (chest.sort(BreastRow_1.BreastRow.Largest).get(0).rating >= 1)
                            ContentView_1.CView.text("\n");
                        for (const breastRow of chest) {
                            if (breastRow.rating >= 1) {
                                breastRow.rating--;
                                growthAmount++;
                                ContentView_1.CView.text("\n");
                                // If this isn't the first change...
                                if (growthAmount > 1)
                                    ContentView_1.CView.text("...and y");
                                else
                                    ContentView_1.CView.text("Y");
                                ContentView_1.CView.text("our " + BreastDescriptor_1.describeBreastRow(breastRow) + " shrink, dropping to " + BreastDescriptor_1.breastCup(breastRow.rating) + "s.");
                            }
                        }
                        if (growthAmount === 2)
                            ContentView_1.CView.text("\nYou feel so much lighter after the change.");
                        if (growthAmount === 3)
                            ContentView_1.CView.text("\nWithout the extra weight you feel particularly limber.");
                        if (growthAmount >= 4)
                            ContentView_1.CView.text("\nIt feels as if the weight of the world has been lifted from your shoulders, or in this case, your chest.");
                        if (growthAmount > 0)
                            changes++;
                    }
                }
            }
            // Boosts cock size up to 36"x5".
            if (changes < changeLimit && SMath_1.randInt(2) === 0 && cocks.length > 0) {
                const selectedCock = cocks.find((cock) => cock.type === Cock_1.CockType.HORSE && (cock.length < 36 || cock.thickness < 5));
                // Length first
                if (selectedCock) {
                    // Thickness too if small enough
                    if (selectedCock.thickness < 5) {
                        // Increase by 2 + randInt(8), and store the actual amount in temp
                        let growthAmount = CockModifier_1.growCock(character, selectedCock, 2 + SMath_1.randInt(8));
                        growthAmount += CockModifier_1.thickenCock(selectedCock, 1);
                        // Comment on length changes
                        if (growthAmount > 6)
                            ContentView_1.CView.text("\n\nGasping in sudden pleasure, your " + CockDescriptor_1.describeCock(character, selectedCock) + " surges free of its sheath, emerging with over half a foot of new dick-flesh.");
                        if (growthAmount <= 6 && growthAmount >= 3)
                            ContentView_1.CView.text("\n\nYou pant in delight as a few inches of " + CockDescriptor_1.describeCock(character, selectedCock) + " pop free from your sheath, the thick new horse-flesh still slick and sensitive.");
                        if (growthAmount < 3)
                            ContentView_1.CView.text("\n\nGroaning softly, you feel a pleasurable change in your groin.  Looking down, you see [oneCock] grow slightly longer.");
                        // Add a blurb about thickness...
                        ContentView_1.CView.text("  To your delight and surprise, you discover it has grown slightly thicker as well!");
                    }
                    // Just length...
                    else {
                        // Increase by 2 + randInt(8), and store the actual amount in temp
                        const growthAmount = CockModifier_1.growCock(character, selectedCock, 2 + SMath_1.randInt(8));
                        // Comment on length changes
                        if (growthAmount > 6)
                            ContentView_1.CView.text("\n\nGasping in sudden pleasure, your " + CockDescriptor_1.describeCock(character, selectedCock) + " surges free of its sheath, emerging with over half a foot of new dick-flesh.");
                        if (growthAmount <= 6 && growthAmount >= 3)
                            ContentView_1.CView.text("\n\nYou pant in delight as a few inches of " + CockDescriptor_1.describeCock(character, selectedCock) + " pop free from your sheath, the thick new horse-flesh still slick and sensitive.");
                        if (growthAmount < 3)
                            ContentView_1.CView.text("\n\nGroaning softly, you feel a pleasurable change in your groin.  Looking down, you see [oneCock] grow slightly longer.");
                    }
                    changes++;
                }
            }
            // Morph dick to horsediiiiick
            if (cocks.length > 0 && SMath_1.randInt(2) === 0 && changes < changeLimit) {
                const selectedCock = cocks.find((cock) => cock.type !== Cock_1.CockType.HORSE);
                if (selectedCock) {
                    // Text for humandicks or others
                    if (selectedCock.type === Cock_1.CockType.HUMAN || selectedCock.type > 2)
                        ContentView_1.CView.text("\n\nYour " + CockDescriptor_1.describeCock(character, selectedCock) + " begins to feel strange... you pull down your pants to take a look and see it darkening as you feel a tightness near the base where your skin seems to be bunching up.  A sheath begins forming around your cock's base, tightening and pulling your cock inside its depths.  A hot feeling envelops your member as it suddenly grows into a horse penis, dwarfing its old size.  The skin is mottled brown and black and feels more sensitive than normal.  Your hands are irresistibly drawn to it, and you jerk yourself off, splattering cum with intense force.");
                    // Text for dogdicks
                    if (selectedCock.type === Cock_1.CockType.DOG)
                        ContentView_1.CView.text("\n\nYour " + CockDescriptor_1.nounCock(Cock_1.CockType.DOG) + " begins to feel odd...  You pull down your clothes to take a look and see it darkening.  You feel a growing tightness in the tip of your " + CockDescriptor_1.nounCock(Cock_1.CockType.DOG) + " as it flattens, flaring outwards.  Your cock pushes out of your sheath, inch after inch of animal-flesh growing beyond its traditional size.  You notice your knot vanishing, the extra flesh pushing more fresh horsecock out from your sheath.  <b>Your hands are drawn to the strange new " + CockDescriptor_1.nounCock(Cock_1.CockType.HORSE) + "</b>, and you jerk yourself off, splattering thick ropes of cum with intense force.");
                    selectedCock.type = Cock_1.CockType.HORSE;
                    CockModifier_1.growCock(character, selectedCock, 4);
                    character.stats.lib += 5;
                    character.stats.sens += 4;
                    character.stats.lust += 35;
                    ContentView_1.CView.text("<b>  You now have a");
                    if (cocks.filter(Cock_1.Cock.FilterType(Cock_1.CockType.HORSE)).length > 1)
                        ContentView_1.CView.text("nother");
                    ContentView_1.CView.text(" horse-penis.</b>");
                    changes++;
                }
            }
            // Males go into rut
            if (SMath_1.randInt(4) === 0) {
                BodyModifier_1.displayGoIntoRut(character);
            }
            // Anti-masturbation status
            if (SMath_1.randInt(4) === 0 && changes < changeLimit && !character.effects.has(EffectType_1.EffectType.Dysfunction)) {
                if (cocks.length > 0)
                    ContentView_1.CView.text("\n\nYour " + CockDescriptor_1.describeCock(character, cocks.get(0)) + " tingles abruptly, then stops.  Worried, you reach down to check it, only to discover that it feels... numb.  It will be very hard to masturbate like this.");
                else if (vaginas.length > 0)
                    ContentView_1.CView.text("\n\nYour " + VaginaDescriptor_1.describeVagina(character, vaginas.get(0)) + " tingles abruptly, then stops.  Worried, you reach down to check it, only to discover that it feels... numb.  It will be very hard to masturbate like this.");
                if (cocks.length > 0 || vaginas.length > 0) {
                    character.effects.create(EffectType_1.EffectType.Dysfunction, { hourExpire: 96 });
                    changes++;
                }
            }
            // Appearance shit:
            // Tail, Ears, Hooves, Horns, Height (no prereq), Face
            // +height up to 9 foot
            if (changes < changeLimit && SMath_1.randInt(1.7) === 0 && character.body.tallness < 108) {
                let heightGrown = SMath_1.randInt(5) + 3;
                // Slow rate of growth near ceiling
                if (character.body.tallness > 90)
                    heightGrown = Math.floor(heightGrown / 2);
                // Never 0
                if (heightGrown === 0)
                    heightGrown = 1;
                // Flavor texts.  Flavored like 1950's cigarettes. Yum.
                if (heightGrown < 5)
                    ContentView_1.CView.text("\n\nYou shift uncomfortably as you realize you feel off balance.  Gazing down, you realize you have grown SLIGHTLY taller.");
                if (heightGrown >= 5 && heightGrown < 7)
                    ContentView_1.CView.text("\n\nYou feel dizzy and slightly off, but quickly realize it's due to a sudden increase in height.");
                if (heightGrown === 7)
                    ContentView_1.CView.text("\n\nStaggering forwards, you clutch at your head dizzily.  You spend a moment getting your balance, and stand up, feeling noticeably taller.");
                character.body.tallness += heightGrown;
                changes++;
            }
            // Face change, requires Ears + Height + Hooves
            if (character.body.ears.type === Ears_1.EarType.COW && character.body.legs.type === Legs_1.LegType.HOOFED && character.body.tallness >= 90
                && changes < changeLimit && SMath_1.randInt(3) === 0) {
                if (character.body.face.type !== Face_1.FaceType.COW_MINOTAUR) {
                    ContentView_1.CView.text("\n\nBones shift and twist painfully as your visage twists and morphs to resemble that of the beast whose blood you now drink.  <b>You now have a minotaur-like face.</b>");
                    changes++;
                    character.body.face.type = Face_1.FaceType.COW_MINOTAUR;
                }
            }
            // +mino horns.amount require ears/tail
            if (changes < changeLimit && SMath_1.randInt(3) === 0 && character.body.ears.type === Ears_1.EarType.COW && character.body.tails.reduce(Tail_1.Tail.HasType(Tail_1.TailType.COW), false)) {
                // New horns.amount or expanding mino horns
                if (character.body.horns.type === Horns_1.HornType.COW_MINOTAUR || character.body.horns.type === Horns_1.HornType.NONE) {
                    // Get bigger if character has horns
                    if (character.body.horns.type === Horns_1.HornType.COW_MINOTAUR) {
                        // Fems horns.amount don't get bigger.
                        if (vaginas.length > 0) {
                            if (character.body.horns.count > 4) {
                                ContentView_1.CView.text("\n\nYou feel a pressure in your head around your horns, but they don't grow any larger.  ");
                                ContentView_1.CView.text("Your headache clears as lust washes through you unnaturally.  You feel as if you haven't cum in months.");
                                character.hoursSinceCum += 200;
                                character.stats.lust += 20;
                            }
                            else {
                                ContentView_1.CView.text("\n\nYour small horns.amount get a bit bigger, stopping as medium sized nubs.");
                                character.body.horns.count += 3;
                            }
                            changes++;
                        }
                        // Males horns.amount get 'uge.
                        else {
                            const hornGrowth = 1 + SMath_1.randInt(3);
                            character.body.horns.count += hornGrowth;
                            if (hornGrowth === 0)
                                changes--;
                            if (hornGrowth === 1)
                                ContentView_1.CView.text("\n\nAn aching pressure builds in your temples as you feel your horns.amount push another inch of length from your skull.  ");
                            if (hornGrowth === 2)
                                ContentView_1.CView.text("\n\nA powerful headache momentarily doubles you over.  With painful slowness, you feel your horns.amount push another two inches of length out from your brow, gradually thickening as they grow.  ");
                            if (hornGrowth === 3)
                                ContentView_1.CView.text("\n\nAgony overwhelms you as a headache of terrifying intensity sweeps through your skull.  You squeeze your eyes shut from the pain, but it does little to help.  The torture intensifies before finally diminishing as you feel an inch or two of new horn force its way out of your forehead.  The headache remains despite this, and desperate for relief, you grab hold of your horns.amount and tug, pulling another inch of new horn free.  At last the pain fades, leaving you with significantly enhanced head-spikes.  ");
                            if (character.body.horns.count < 3)
                                ContentView_1.CView.text("They are the size of tiny nubs.");
                            if (character.body.horns.count >= 3 && character.body.horns.count < 6)
                                ContentView_1.CView.text("They are similar to what you would see on a young bull.");
                            if (character.body.horns.count >= 6 && character.body.horns.count < 12)
                                ContentView_1.CView.text("They look like the horns.amount on a grown bull, big enough and dangerous enough to do some damage.");
                            if (character.body.horns.count >= 12 && character.body.horns.count < 20)
                                ContentView_1.CView.text("They are large and wicked looking.");
                            if (character.body.horns.count >= 20)
                                ContentView_1.CView.text("They are huge, heavy, and tipped with dangerous points.");
                            // boys get a cum refill sometimes
                            if (SMath_1.randInt(2) === 0 && changes < changeLimit) {
                                ContentView_1.CView.text("  Your headache clears as lust washes through you unnaturally.  You feel as if you haven't cum in months.");
                                character.hoursSinceCum += 200;
                                character.stats.lust += 20;
                            }
                            changes++;
                        }
                    }
                    // If no horns.amount yet..
                    else {
                        ContentView_1.CView.text("\n\nWith painful pressure, the skin on your forehead splits around two tiny nub-like horns, similar to those you would see on the cattle back in your homeland.");
                        character.body.horns.type = Horns_1.HornType.COW_MINOTAUR;
                        character.body.horns.count = 2;
                        changes++;
                    }
                }
                // Not mino horns, change to cow-horns
                if (character.body.horns.type === Horns_1.HornType.DEMON || character.body.horns.type > Horns_1.HornType.COW_MINOTAUR) {
                    ContentView_1.CView.text("\n\nYour horns.amount vibrate and shift as if made of clay, reforming into two horns.amount with a bovine-like shape.");
                    character.body.horns.type = Horns_1.HornType.COW_MINOTAUR;
                    changes++;
                }
            }
            // +cow ears	- requires tail
            if (character.body.ears.type !== Ears_1.EarType.COW && changes < changeLimit && character.body.tails.reduce(Tail_1.Tail.HasType(Tail_1.TailType.COW), false) && SMath_1.randInt(2) === 0) {
                ContentView_1.CView.text("\n\nYou feel your ears tug on your scalp as they twist shape, becoming oblong and cow-like.  <b>You now have cow ears.</b>");
                character.body.ears.type = Ears_1.EarType.COW;
                changes++;
            }
            // +cow tail
            if (changes < changeLimit && SMath_1.randInt(2) === 0 && !character.body.tails.reduce(Tail_1.Tail.HasType(Tail_1.TailType.COW), false)) {
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
            if (SMath_1.randInt(4) === 0 && character.body.neck.gills && changes < changeLimit) {
                ContentView_1.CView.text("\n\nYour chest itches, and as you reach up to scratch it, you realize your gills have withdrawn into your skin.");
                character.body.neck.gills = false;
                changes++;
            }
            if (changes < changeLimit && SMath_1.randInt(4) === 0 && ((character.body.butt.wetness > 0 && !character.effects.has(EffectType_1.EffectType.MaraesGiftButtslut)) || character.body.butt.wetness > 1)) {
                ContentView_1.CView.text("\n\nYou feel a tightening up in your colon and your [asshole] sucks into itself.  You feel sharp pain at first but that thankfully fades.  Your ass seems to have dried and tightened up.");
                character.body.butt.wetness--;
                if (character.body.butt.looseness > 1)
                    character.body.butt.looseness--;
                changes++;
            }
            // Give you that mino build!
            if (SMath_1.randInt(4) === 0)
                ContentView_1.CView.text(BodyModifier_1.displayModFem(character, 5, 10));
            if (SMath_1.randInt(4) === 0)
                ContentView_1.CView.text(BodyModifier_1.displayModTone(character, 85, 3));
            if (SMath_1.randInt(4) === 0)
                ContentView_1.CView.text(BodyModifier_1.displayModThickness(character, 70, 4));
            // Default
            if (changes === 0) {
                ContentView_1.CView.text("\n\nMinotaur-like vitality surges through your body, invigorating and arousing you!\n");
                if (character.body.balls.count > 0) {
                    ContentView_1.CView.text("Your balls feel as if they've grown heavier with the weight of more sperm.\n");
                    character.hoursSinceCum += 200;
                }
                StatModifier_1.displayCharacterHPChange(character, 50);
                character.stats.lust += 50;
            }
        }
    }
    exports.MinotaurBlood = MinotaurBlood;
});
//# sourceMappingURL=MinotaurBlood.js.map