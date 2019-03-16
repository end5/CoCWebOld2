define(["require", "exports", "Engine/Items/Consumable", "../ConsumableName", "Engine/Utilities/SMath", "Engine/Body/Arms", "Engine/Body/BreastRow", "Engine/Body/Cock", "Engine/Body/Ears", "Engine/Body/Eyes", "Engine/Body/Face", "Engine/Body/GenderIdentity", "Engine/Body/Legs", "Engine/Body/Skin", "Engine/Body/Tail", "Engine/Body/Vagina", "Content/Effects/EffectType", "Engine/Items/ItemDesc", "Content/Descriptors/CockDescriptor", "Content/Descriptors/BallsDescriptor", "Content/Descriptors/VaginaDescriptor", "Content/Descriptors/BreastDescriptor", "Content/Descriptors/LegDescriptor", "Content/Descriptors/ButtDescriptor", "Engine/Display/ContentView", "Content/Modifiers/CockModifier", "Content/Modifiers/BodyModifier", "Content/Modifiers/StatModifier", "Content/Settings", "Content/Menus/InGame/GameOverMenu", "Engine/Flags"], function (require, exports, Consumable_1, ConsumableName_1, SMath_1, Arms_1, BreastRow_1, Cock_1, Ears_1, Eyes_1, Face_1, GenderIdentity_1, Legs_1, Skin_1, Tail_1, Vagina_1, EffectType_1, ItemDesc_1, CockDescriptor_1, BallsDescriptor_1, VaginaDescriptor_1, BreastDescriptor_1, LegDescriptor_1, ButtDescriptor_1, ContentView_1, CockModifier_1, BodyModifier_1, StatModifier_1, Settings_1, GameOverMenu_1, Flags_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.EquinumFlags = Flags_1.Flags.register("Equinum", {
        WARNED: false,
        BAD_END_COUNTER: 0,
    });
    class Equinum extends Consumable_1.Consumable {
        constructor() {
            super(ConsumableName_1.ConsumableName.Equinum, new ItemDesc_1.ItemDesc("Equinum", "a vial of Equinum", "This is a long flared vial with a small label that reads, \"<i>Equinum</i>\".  It is likely this potion is tied to horses in some way."));
        }
        warning(character) {
            if (character.body.skin.type === Skin_1.SkinType.FUR && character.body.face.type === Face_1.FaceType.HORSE && character.body.tails.reduce(Tail_1.Tail.HasType(Tail_1.TailType.HORSE), false) && (character.body.legs.type !== Legs_1.LegType.HOOFED)) {
                // WARNINGS
                // Repeat warnings
                if (exports.EquinumFlags.WARNED && SMath_1.randInt(3) === 0) {
                    if (exports.EquinumFlags.BAD_END_COUNTER === 0)
                        ContentView_1.CView.text("<b>\n\nYou feel a creeping chill down your back as your entire body shivers, as if rejecting something foreign.  Maybe you ought to cut back on the horse potions.</b>");
                    if (exports.EquinumFlags.BAD_END_COUNTER > 0)
                        ContentView_1.CView.text("<b>\n\nYou wonder how many more of these you can drink before you become a horse...</b>");
                    exports.EquinumFlags.BAD_END_COUNTER = 1;
                }
                // First warning
                if (!exports.EquinumFlags.WARNED) {
                    ContentView_1.CView.text("<b>\n\nWhile you drink the tasty potion, you realize how horse-like you already are, and wonder what else the potion could possibly change...</b>");
                    exports.EquinumFlags.WARNED = true;
                }
                // Bad End
                if (SMath_1.randInt(4) === 0 && exports.EquinumFlags.WARNED) {
                    // Must have been warned first...
                    if (exports.EquinumFlags.BAD_END_COUNTER > 0) {
                        // If character has dicks check for horsedicks
                        if (character.body.cocks.length > 0) {
                            // If character has horsedicks
                            if (character.body.cocks.filter(Cock_1.Cock.FilterType(Cock_1.CockType.HORSE)).length > 0) {
                                ContentView_1.CView.text("\n\nSoon after you drink the Equinum, a burning sensation fills your chest. You have consumed too much of the potion, and the overdose starts to provoke dramatic changes in your body.  You collapse suddenly, twitching in pain as all the bones and muscles in your body break and reform. Eventually, you pass out from the strain you are put through.\n\nYou wake up after a few minutes. Once you get up on your legs, doubt fills your mind. You rush to a nearby pond and look down, nearly jumping when the reflection of a ");
                                if (character.gender === GenderIdentity_1.Gender.NONE || character.gender === GenderIdentity_1.Gender.HERM)
                                    ContentView_1.CView.text("horse ");
                                if (character.gender === GenderIdentity_1.Gender.MALE)
                                    ContentView_1.CView.text("stallion ");
                                if (character.gender === GenderIdentity_1.Gender.FEMALE)
                                    ContentView_1.CView.text("mare ");
                                ContentView_1.CView.text(" with beautiful " + character.body.hair.color + " " + character.body.skin.desc + " covering its body gazes back up at you.  That's you, and yet the doubt in your mind remains. Strange images fill your mind, and you feel as if you have not always been a horse, but some kind of funny fur-less creature standing on two legs. Your equine mind rapidly dismisses that doubt as a daydream however, and you trot away, oblivious to who you once were.\n\n");
                                ContentView_1.CView.text("<b>One year later...</b>\n\nAs you graze upon the small plants that coat the open plains of your home, you hear a noise on your right side. As you raise your head to check where the noise comes from, preparing to run from a potential predator, you see a strange creature. It stands on its two feet, its furless pink skin appearing beneath its clothes.  With a start, you realize you can identify the strange creatures gender.  ");
                                if (character.gender === GenderIdentity_1.Gender.NONE || character.gender === GenderIdentity_1.Gender.MALE)
                                    ContentView_1.CView.text("He is clearly a male, but you are somewhat confused as you can see not one but three bulges where his manhood would be.\n\n");
                                if (character.gender === GenderIdentity_1.Gender.FEMALE)
                                    ContentView_1.CView.text("She is clearly a female, as you can see her six breasts jiggle as she walks towards you, small stains appearing on her shirt where her nipples are.\n\n");
                                if (character.gender === GenderIdentity_1.Gender.HERM)
                                    ContentView_1.CView.text("You are somewhat confused as you can see a bulge near her thighs but also huge boobs jiggling as she walks, and you can't say if she's a male or female.\n\n");
                                ContentView_1.CView.text("As soon as you lay eyes on the creature, a wave of nostalgia overtakes you. Somehow, looking at that creature makes you sad, as if you forgot something important.\n\n\"<i>How strange to see a horse here all alone,</i>\" the creature muses, \"<i>In any case, you're still the least bizarre creature I've met here.  Not to mention the only one that hasn't tried to rape me,</i>\" it says with a sigh.\n\nYou answer with an interrogative whinny.\n\n\"<i>Hey, I've got an idea. I'll take you back to the camp. I'll feed you and in return you can help me complete my quest. What do you say?</i>\"\n\nInstinctively, you utter a happy and approving whinny.\n\nYou failed in your quest, losing your focus and more importantly, losing yourself.  But, even so, you found a new meaning to your life, and have a new chance to succeed where you once failed.");
                                return { next: GameOverMenu_1.gameOverMenu };
                            }
                        }
                        // If character has no cocks
                        else {
                            ContentView_1.CView.text("\n\nSoon after you drink the Equinum, a burning sensation fills your chest. You have consumed too much of the drink, and the overdose starts to provoke dramatic changes in your body.  You collapse suddenly, twitching in pain as all the bones and all the muscles in your body break and reform. Eventually, you pass out from the strain you are put through.\n\nYou wake up after a few minutes. Once you get up on your legs, doubt fills your mind. You rush to a nearby pond and look down, nearly jumping when the reflection of a ");
                            if (character.gender === GenderIdentity_1.Gender.NONE || character.gender === GenderIdentity_1.Gender.HERM)
                                ContentView_1.CView.text("horse ");
                            if (character.gender === GenderIdentity_1.Gender.MALE)
                                ContentView_1.CView.text("stallion ");
                            if (character.gender === GenderIdentity_1.Gender.FEMALE)
                                ContentView_1.CView.text("mare ");
                            ContentView_1.CView.text("with beautiful " + character.body.hair.color + " " + character.body.skin.desc + " covering its body looks back at you.  That's you, and yet the doubt in your mind remains. Strange mental images fill your mind.  You feel as if you have not always been a horse, but some kind of funny fur-less creature standing on two legs. But your equine mind rapidly dismisses that doubt as a daydream, and you trot away, oblivious to who you once were.\n\n");
                            ContentView_1.CView.text("<b>One year after...</b>\n\nAs you graze small plants in the open plains that became your home, you hear a noise on your right side. As you raise your head to check where the noise comes from, preparing to run from a potential predator, you see a strange creature. It stands on two feet, its furless pink skin appearing beneath its clothes.  ");
                            if (character.gender === GenderIdentity_1.Gender.NONE || character.gender === GenderIdentity_1.Gender.MALE)
                                ContentView_1.CView.text("He is clearly a male, but you are somewhat confused as you can see not one but three bulges where his manhood would be.\n\n");
                            if (character.gender === GenderIdentity_1.Gender.FEMALE)
                                ContentView_1.CView.text("She is clearly a female, as you can see her six breasts jiggle as she walks towards you, small stains appearing on her shirt where her nipples are.\n\n");
                            if (character.gender === GenderIdentity_1.Gender.HERM)
                                ContentView_1.CView.text("You are somewhat confused as you can see a bulge near her thighs but also huge boobs jiggling as she walks, and you can't say if she's a male or female.\n\n");
                            ContentView_1.CView.text("As soon as you lay eyes on the creature, a wave of nostalgia overtakes you. Somehow, looking at that creature makes you sad, as if you forgot something important.\n\n\"<i>How strange to see a horse here all alone,</i>\" the creature muses, \"<i>In any case, you're still the least bizarre creature I've met here.  Not to mention the only one that hasn't tried to rape me,</i>\" it says with a sigh.\n\nYou answer with an interrogative whinny.\n\n\"<i>Hey, I've got an idea. I'll take you back to the camp. I'll feed you and in return you can help me to complete my quest. What do you say?</i>\"\n\nInstictively, you utter a happy and approving whinny.\n\nYou failed in your quest, losing you focus and more importantly, losing yourself.  But, even so, you found a new meaning to your life, and have a new chance to achieve what you once failed.");
                            return { next: GameOverMenu_1.gameOverMenu };
                        }
                    }
                }
            }
        }
        use(character) {
            const cocks = character.body.cocks;
            const vaginas = character.body.vaginas;
            const chest = character.body.chest;
            // Changes done
            let changes = 0;
            // Change limit
            let changeLimit = 1;
            // Chance to raise limit
            if (SMath_1.randInt(2) === 0)
                changeLimit++;
            if (SMath_1.randInt(3) === 0)
                changeLimit++;
            if (character.effects.has(EffectType_1.EffectType.HistoryAlchemist))
                changeLimit++;
            // Used for randIntom chances
            // Set up output
            ContentView_1.CView.clear();
            ContentView_1.CView.text("You down the potion, grimacing at the strong taste.");
            // CHANCE OF BAD END - 20% if face/tail/skin/cock are appropriate.
            // If hooved bad end doesn't appear till centaured
            this.warning(character);
            // Stat changes first
            // STRENGTH
            if (SMath_1.randInt(2) === 0) {
                // Maxxed
                if (character.stats.str >= 60) {
                    ContentView_1.CView.text("\n\nYou feel strong enough to single-handedly pull a fully-loaded wagon.");
                }
                // NOT MAXXED
                else {
                    character.stats.str += 1;
                    ContentView_1.CView.text("\n\nYour muscles clench and surge, making you feel as strong as a horse.");
                    changes++;
                }
            }
            // TOUGHNESS
            if (SMath_1.randInt(2) === 0) {
                // MAXXED ALREADY
                if (character.stats.tou >= 75) {
                    ContentView_1.CView.text("\n\nYour body is as tough and solid as a ");
                    if (character.gender === GenderIdentity_1.Gender.MALE || character.gender === GenderIdentity_1.Gender.HERM)
                        ContentView_1.CView.text("stallion's.");
                    else
                        ContentView_1.CView.text("mare's.");
                }
                // NOT MAXXED
                else {
                    character.stats.tou += 1.25;
                    ContentView_1.CView.text("\n\nYour body suddenly feels tougher and more resilient.");
                    changes++;
                }
            }
            // INTELLECT
            if (SMath_1.randInt(3) === 0) {
                if (character.stats.int <= 5) {
                    ContentView_1.CView.text("\n\nYou let out a throaty \"Neiiiigh\" as your animalistic instincts take over.");
                }
                if (character.stats.int < 10 && character.stats.int > 5) {
                    character.stats.int += -1;
                    ContentView_1.CView.text("\n\nYou smile vacantly as you drink the potion, knowing you're just a big dumb animal who loves to fuck.");
                    changes++;
                }
                if (character.stats.int <= 20 && character.stats.int >= 10) {
                    character.stats.int += -2;
                    ContentView_1.CView.text("\n\nYou find yourself looking down at the empty bottle in your hand and realize you haven't thought ANYTHING since your first sip.");
                    changes++;
                }
                if (character.stats.int <= 30 && character.stats.int > 20) {
                    character.stats.int += -3;
                    ContentView_1.CView.text("\n\nYou smile broadly as your cares seem to melt away.  A small part of you worries that you're getting dumber.");
                    changes++;
                }
                if (character.stats.int <= 50 && character.stats.int > 30) {
                    character.stats.int += -4;
                    ContentView_1.CView.text("\n\nIt becomes harder to keep your mind focused as your intellect diminishes.");
                    changes++;
                }
                if (character.stats.int > 50) {
                    character.stats.int += -5;
                    ContentView_1.CView.text("\n\nYour usually intelligent mind feels much more sluggish.");
                    changes++;
                }
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
            //
            // SEXUAL CHARACTERISTICS
            //
            // MALENESS.
            if ((character.gender === GenderIdentity_1.Gender.MALE || character.gender === GenderIdentity_1.Gender.HERM) && SMath_1.randInt(1.5) === 0 && changes < changeLimit) {
                // If cocks that aren't horsified!
                if ((cocks.filter(Cock_1.Cock.FilterType(Cock_1.CockType.HORSE)).length + cocks.filter(Cock_1.Cock.FilterType(Cock_1.CockType.DEMON)).length) < cocks.length) {
                    // Transform a cock and store it's index value to talk about it.
                    // Single cock
                    let selectedCock = cocks.get(0);
                    if (cocks.length === 1) {
                        let cockTF = false;
                        if (selectedCock.type === Cock_1.CockType.HUMAN) {
                            ContentView_1.CView.text("\n\nYour " + CockDescriptor_1.describeCock(character, selectedCock) + " begins to feel strange... you pull down your pants to take a look and see it darkening as you feel a tightness near the base where your skin seems to be bunching up.  A sheath begins forming around your cock's base, tightening and pulling your cock inside its depths.  A hot feeling envelops your member as it suddenly grows into a horse penis, dwarfing its old size.  The skin is mottled brown and black and feels more sensitive than normal.  Your hands are irresistibly drawn to it, and you jerk yourself off, splattering cum with intense force.");
                            selectedCock.type = Cock_1.CockType.HORSE;
                            CockModifier_1.growCock(character, selectedCock, SMath_1.randInt(4) + 4);
                            cockTF = true;
                            character.stats.lib += 5;
                            character.stats.sens += 4;
                            character.stats.lust += 35;
                        }
                        else if (selectedCock.type === Cock_1.CockType.DOG) {
                            ContentView_1.CView.text("\n\nYour " + CockDescriptor_1.nounCock(Cock_1.CockType.DOG) + " begins to feel odd... you pull down your clothes to take a look and see it darkening.  You feel a growing tightness in the tip of your " + CockDescriptor_1.nounCock(Cock_1.CockType.DOG) + " as it flattens, flaring outwards.  Your cock pushes out of your sheath, inch after inch of animal-flesh growing beyond it's traditional size.  You notice your knot vanishing, the extra flesh pushing more horsecock out from your sheath.  Your hands are drawn to the strange new " + CockDescriptor_1.nounCock(Cock_1.CockType.HORSE) + ", and you jerk yourself off, splattering thick ropes of cum with intense force.");
                            selectedCock.type = Cock_1.CockType.HORSE;
                            CockModifier_1.growCock(character, selectedCock, SMath_1.randInt(4) + 4);
                            cockTF = true;
                            character.stats.lib += 5;
                            character.stats.sens += 4;
                            character.stats.lust += 35;
                        }
                        else if (selectedCock.type === Cock_1.CockType.TENTACLE) {
                            ContentView_1.CView.text("\n\nYour " + CockDescriptor_1.describeCock(character, selectedCock) + " begins to feel odd... you pull down your clothes to take a look and see it darkening.  You feel a growing tightness in the tip of your " + CockDescriptor_1.describeCock(character, selectedCock) + " as it flattens, flaring outwards.  Your skin folds and bunches around the base, forming an animalistic sheath.  The slick inhuman texture you recently had fades, taking on a more leathery texture.  Your hands are drawn to the strange new " + CockDescriptor_1.nounCock(Cock_1.CockType.HORSE) + ", and you jerk yourself off, splattering thick ropes of cum with intense force.");
                            selectedCock.type = Cock_1.CockType.HORSE;
                            CockModifier_1.growCock(character, selectedCock, SMath_1.randInt(4) + 4);
                            cockTF = true;
                            character.stats.lib += 5;
                            character.stats.sens += 4;
                            character.stats.lust += 35;
                        }
                        else if (selectedCock.type !== Cock_1.CockType.HORSE && selectedCock.type !== Cock_1.CockType.DEMON) {
                            ContentView_1.CView.text("\n\nYour " + CockDescriptor_1.describeCock(character, selectedCock) + " begins to feel odd... you pull down your clothes to take a look and see it darkening.  You feel a growing tightness in the tip of your " + CockDescriptor_1.describeCock(character, selectedCock) + " as it flattens, flaring outwards.  Your skin folds and bunches around the base, forming an animalistic sheath.  The slick inhuman texture you recently had fades, taking on a more leathery texture.  Your hands are drawn to the strange new " + CockDescriptor_1.nounCock(Cock_1.CockType.HORSE) + ", and you jerk yourself off, splattering thick ropes of cum with intense force.");
                            selectedCock.type = Cock_1.CockType.HORSE;
                            CockModifier_1.growCock(character, selectedCock, SMath_1.randInt(4) + 4);
                            cockTF = true;
                            character.stats.lib += 5;
                            character.stats.sens += 4;
                            character.stats.lust += 35;
                        }
                        if (cockTF)
                            ContentView_1.CView.text("  <b>Your penis has transformed into a horse's!</b>");
                    }
                    // MULTICOCK
                    else {
                        character.stats.lib += 5;
                        character.stats.sens += 4;
                        character.stats.lust += 35;
                        // Find first non horse cock
                        selectedCock = cocks.find((cock) => cock.type !== Cock_1.CockType.HORSE && cock.type !== Cock_1.CockType.DEMON);
                        selectedCock.type = Cock_1.CockType.HORSE;
                        ContentView_1.CView.text("\n\nOne of your penises begins to feel strange.  You pull down your clothes to take a look and see the skin of your " + CockDescriptor_1.describeCock(character, selectedCock) + " darkening to a mottled brown and black pattern.");
                        // Already have a sheath
                        if (cocks.filter(Cock_1.Cock.FilterType(Cock_1.CockType.HORSE)).length > 1 || cocks.filter(Cock_1.Cock.FilterType(Cock_1.CockType.DOG)).length > 0)
                            ContentView_1.CView.text("  Your sheath tingles and begins growing larger as the cock's base shifts to lie inside it.");
                        else
                            ContentView_1.CView.text("  You feel a tightness near the base where your skin seems to be bunching up.  A sheath begins forming around your " + CockDescriptor_1.describeCock(character, selectedCock) + "'s root, tightening and pulling your " + CockDescriptor_1.describeCock(character, selectedCock) + " inside its depths.");
                        CockModifier_1.growCock(character, selectedCock, SMath_1.randInt(4) + 4);
                        ContentView_1.CView.text("  The shaft suddenly explodes with movement, growing longer and developing a thick flared head leaking steady stream of animal-cum.");
                        ContentView_1.CView.text("  <b>You now have a horse-cock.</b>");
                    }
                    // Make cock thicker if not thick already!
                    if (selectedCock.thickness <= 2)
                        CockModifier_1.thickenCock(selectedCock, 1);
                    changes++;
                }
                // Characters cocks are all horse-type - increase size!
                else {
                    let growthAmount = 0;
                    // single cock
                    let selectedCock;
                    if (cocks.length === 1) {
                        selectedCock = cocks.get(0);
                        growthAmount = CockModifier_1.growCock(character, selectedCock, SMath_1.randInt(3) + 1);
                        character.stats.sens += 1;
                        character.stats.lust += 10;
                    }
                    // Multicock
                    else {
                        // Grow smallest cock!
                        selectedCock = cocks.sort(Cock_1.Cock.Smallest).get(0);
                        growthAmount = CockModifier_1.growCock(character, selectedCock, SMath_1.randInt(4) + 1);
                        character.stats.sens += 1;
                        character.stats.lust += 10;
                    }
                    ContentView_1.CView.text("\n\n");
                    if (growthAmount > 2)
                        ContentView_1.CView.text("Your " + CockDescriptor_1.describeCock(character, selectedCock) + " tightens painfully, inches of taut horse-flesh pouring out from your sheath as it grows longer.  Thick animal-pre forms at the flared tip, drawn out from the pleasure of the change.");
                    if (growthAmount > 1 && growthAmount <= 2)
                        ContentView_1.CView.text("Aching pressure builds within your sheath, suddenly releasing as an inch or more of extra dick flesh spills out.  A dollop of pre beads on the head of your enlarged " + CockDescriptor_1.describeCock(character, selectedCock) + " from the pleasure of the growth.");
                    if (growthAmount <= 1)
                        ContentView_1.CView.text("A slight pressure builds and releases as your " + CockDescriptor_1.describeCock(character, selectedCock) + " pushes a bit further out of your sheath.");
                    changes++;
                }
                // Chance of thickness + daydream
                if (SMath_1.randInt(2) === 0 && changes < changeLimit && cocks.filter(Cock_1.Cock.FilterType(Cock_1.CockType.HORSE)).length > 0) {
                    const selectedCock = cocks.sort(Cock_1.Cock.Thinnest).get(0);
                    CockModifier_1.thickenCock(selectedCock, 0.5);
                    ContentView_1.CView.text("\n\nYour " + CockDescriptor_1.nounCock(Cock_1.CockType.HORSE) + " thickens inside its sheath, growing larger and fatter as your veins thicken, becoming more noticeable.  It feels right");
                    if (character.stats.cor + character.stats.lib < 50)
                        ContentView_1.CView.text(" to have such a splendid tool.  You idly daydream about cunts and pussies, your " + CockDescriptor_1.nounCock(Cock_1.CockType.HORSE) + " plowing them relentlessly, stuffing them pregnant with cum");
                    if (character.stats.cor + character.stats.lib >= 50 && character.stats.cor + character.stats.lib < 80)
                        ContentView_1.CView.text(" to be this way... You breath the powerful animalistic scent and fantasize about fucking centaurs night and day until their bellies slosh with your cum");
                    if (character.stats.cor + character.stats.lib >= 75 && character.stats.cor + character.stats.lib <= 125)
                        ContentView_1.CView.text(" to be a rutting stud.  You ache to find a mare or centaur to breed with.  Longing to spend your evenings plunging a " + CockDescriptor_1.nounCock(Cock_1.CockType.HORSE) + " deep into their musky passages, dumping load after load of your thick animal-cum into them.  You'd be happy just fucking horsecunts morning, noon, and night.  Maybe somewhere there is a farm needing a breeder..");
                    if (character.stats.cor + character.stats.lib > 125)
                        ContentView_1.CView.text(" to whinny loudly like a rutting stallion.  Your " + CockDescriptor_1.nounCock(Cock_1.CockType.HORSE) + " is perfect for fucking centaurs and mares.  You imagine the feel of plowing an equine pussy deeply, bottoming out and unloading sticky jets of horse-jizz into its fertile womb.  Your hand strokes your horsecock of its own accord, musky pre dripping from the flared tip with each stroke.  Your mind wanders to the thought of you with a harem of pregnant centaurs.");
                    ContentView_1.CView.text(".");
                    if (character.stats.cor < 30)
                        ContentView_1.CView.text("  You shudder in revulsion at the strange thoughts and vow to control yourself better.");
                    if (character.stats.cor >= 30 && character.stats.cor < 60)
                        ContentView_1.CView.text("  You wonder why you thought such odd things, but they have a certain appeal.");
                    if (character.stats.cor >= 60 && character.stats.cor < 90)
                        ContentView_1.CView.text("  You relish your twisted fantasies, hoping to dream of them again.");
                    if (character.stats.cor >= 90)
                        ContentView_1.CView.text("  You flush hotly and give a twisted smile, resolving to find a fitting subject to rape and relive your fantasies.");
                    character.stats.lib += 0.5;
                    character.stats.lust += 10;
                }
                // Chance of ball growth if not 3" yet
                if (SMath_1.randInt(2) === 0 && changes < changeLimit && character.body.balls.size <= 3 && cocks.filter(Cock_1.Cock.FilterType(Cock_1.CockType.HORSE)).length > 0) {
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
            }
            // FEMALE
            if (character.gender === GenderIdentity_1.Gender.FEMALE || character.gender === GenderIdentity_1.Gender.HERM) {
                // Single vag
                if (vaginas.length === 1) {
                    if (vaginas.get(0).looseness <= Vagina_1.VaginaLooseness.GAPING && changes < changeLimit && SMath_1.randInt(2) === 0) {
                        ContentView_1.CView.text("\n\nYou grip your gut in pain as you feel your organs shift slightly.  When the pressure passes, you realize your " + VaginaDescriptor_1.describeVagina(character, vaginas.get(0)) + " has grown larger, in depth AND size.");
                        vaginas.get(0).looseness++;
                        changes++;
                    }
                    if (vaginas.get(0).wetness <= Vagina_1.VaginaWetness.NORMAL && changes < changeLimit && SMath_1.randInt(2) === 0) {
                        ContentView_1.CView.text("\n\nYour " + VaginaDescriptor_1.describeVagina(character, vaginas.get(0)) + " moistens perceptably, giving off an animalistic scent.");
                        vaginas.get(0).wetness++;
                        changes++;
                    }
                }
                // Multicooch
                else {
                    // determine least wet
                    const leastWet = vaginas.sort(Vagina_1.Vagina.WetnessLeast).get(0);
                    if (leastWet.wetness <= Vagina_1.VaginaWetness.NORMAL && changes < changeLimit && SMath_1.randInt(2) === 0) {
                        ContentView_1.CView.text("\n\nOne of your " + VaginaDescriptor_1.describeVagina(character, leastWet) + " moistens perceptably, giving off an animalistic scent.");
                        leastWet.wetness++;
                        changes++;
                    }
                    // determine smallest
                    const smallest = vaginas.sort(Vagina_1.Vagina.LoosenessLeast).get(0);
                    if (smallest.looseness <= Vagina_1.VaginaLooseness.GAPING && changes < changeLimit && SMath_1.randInt(2) === 0) {
                        ContentView_1.CView.text("\n\nYou grip your gut in pain as you feel your organs shift slightly.  When the pressure passes, you realize one of your " + VaginaDescriptor_1.describeVagina(character, smallest) + " has grown larger, in depth AND size.");
                        smallest.looseness++;
                        changes++;
                    }
                }
                const heat = character.effects.getByName(EffectType_1.EffectType.Heat);
                if (heat && heat.values.lib && heat.values.lib < 30 && SMath_1.randInt(2) === 0 && changes < changeLimit) {
                    if (character.canGoIntoHeat()) {
                        BodyModifier_1.displayGoIntoHeat(character);
                        changes++;
                    }
                }
                if (!Settings_1.Settings.hyperHappy) {
                    if (SMath_1.randInt(2) === 0 && changes < changeLimit) {
                        // Shrink B's!
                        // Single row
                        const selectedBreastRow = chest.firstRow;
                        if (chest.length === 1) {
                            let majorShrinkage = false;
                            // Shrink if bigger than B cups
                            if (selectedBreastRow.rating > 3) {
                                selectedBreastRow.rating--;
                                // Shrink again if huuuuge
                                if (selectedBreastRow.rating > 8) {
                                    majorShrinkage = true;
                                    selectedBreastRow.rating--;
                                }
                                // Talk about shrinkage
                                if (!majorShrinkage)
                                    ContentView_1.CView.text("\n\nYou feel a weight lifted from you, and realize your " + BreastDescriptor_1.describeBreastRow(selectedBreastRow) + " have shrunk to a " + BreastDescriptor_1.breastCup(selectedBreastRow.rating) + ".");
                                else
                                    ContentView_1.CView.text("\n\nYou feel significantly lighter.  Looking down, you realize your breasts are MUCH smaller, down to " + BreastDescriptor_1.breastCup(selectedBreastRow.rating) + "s.");
                                changes++;
                            }
                        }
                        // multiple
                        else {
                            let shrinkAmount = 0;
                            if (chest.sort(BreastRow_1.BreastRow.Largest).get(0).rating > 3)
                                ContentView_1.CView.text("\n");
                            for (let index = 0; index < chest.length; index++) {
                                if (chest.get(index).rating > 3) {
                                    chest.get(index).rating--;
                                    shrinkAmount++;
                                    ContentView_1.CView.text("\n");
                                    if (index < chest.length)
                                        ContentView_1.CView.text("...and y");
                                    else
                                        ContentView_1.CView.text("Y");
                                    ContentView_1.CView.text("our " + BreastDescriptor_1.describeBreastRow(chest.get(index)) + " shrink, dropping to " + BreastDescriptor_1.breastCup(chest.get(index).rating) + "s.");
                                }
                            }
                            if (shrinkAmount === 2)
                                ContentView_1.CView.text("\nYou feel so much lighter after the change.");
                            if (shrinkAmount === 3)
                                ContentView_1.CView.text("\nWithout the extra weight you feel particularly limber.");
                            if (shrinkAmount >= 4)
                                ContentView_1.CView.text("\nIt feels as if the weight of the world has been lifted from your shoulders, or in this case, your chest.");
                            if (shrinkAmount > 0)
                                changes++;
                        }
                    }
                }
            }
            // NON - GENDER SPECIFIC CHANGES
            // Tail -> Ears -> Fur -> Face
            // Centaur if hooved
            if (changes < changeLimit && SMath_1.randInt(6) === 0 && character.body.legs.type === Legs_1.LegType.HOOFED) {
                changes++;
                ContentView_1.CView.text("\n\nImmense pain overtakes you as you feel your backbone snap.  The agony doesn't stop, blacking you out as your spine lengthens, growing with new flesh from your backside as the bones of your legs flex and twist.  Muscle groups shift and rearrange themselves as the change completes, the pain dying away as your consciousness returns.  <b>You now have the lower body of a centaur</b>.");
                if (character.gender > 0) {
                    ContentView_1.CView.text("  After taking a moment to get used to your new body, you notice that your genitals now reside between the back legs on your centaur body.");
                }
                character.stats.spe += 3;
                character.body.legs.type = Legs_1.LegType.CENTAUR;
            }
            // Remove odd eyes
            if (changes < changeLimit && SMath_1.randInt(5) === 0 && character.body.eyes.type > Eyes_1.EyeType.HUMAN) {
                if (character.body.eyes.type === Eyes_1.EyeType.BLACK_EYES_SAND_TRAP) {
                    ContentView_1.CView.text("\n\nYou feel a twinge in your eyes and you blink.  It feels like black cataracts have just fallen away from you, and you know without needing to see your reflection that your eyes have gone back to looking human.");
                }
                else {
                    ContentView_1.CView.text("\n\nYou blink and stumble, a wave of vertigo threatening to pull your " + LegDescriptor_1.describeFeet(character) + " from under you.  As you steady and open your eyes, you realize something seems different.  Your vision is changed somehow.");
                    if (character.body.eyes.type === Eyes_1.EyeType.FOUR_SPIDER_EYES)
                        ContentView_1.CView.text("  Your multiple, arachnid eyes are gone!</b>");
                    ContentView_1.CView.text("  <b>You have normal, humanoid eyes again.</b>");
                }
                character.body.eyes.type = Eyes_1.EyeType.HUMAN;
                changes++;
            }
            // HorseFace - Req's Fur && Ears
            if (character.body.face.type !== Face_1.FaceType.HORSE && character.body.skin.type === Skin_1.SkinType.FUR && changes < changeLimit &&
                SMath_1.randInt(5) === 0 && character.body.ears.type === Ears_1.EarType.HORSE) {
                if (character.body.face.type === Face_1.FaceType.DOG)
                    ContentView_1.CView.text("\n\nMind-numbing pain shatters through you as you feel your facial bones rearranging.  You clutch at your face in agony as your skin crawls and shifts, your visage reshaping to replace your dog-like characteristics with those of a horse.  <b>You now have a horse's face.</b>");
                else
                    ContentView_1.CView.text("\n\nMind-numbing pain shatters through you as you feel your facial bones breaking and shifting.  You clutch at yourself in agony as you feel your skin crawl and elongate under your fingers.  Eventually the pain subsides, leaving you with a face that seamlessly blends human and equine features.  <b>You have a very equine-looking face.</b>");
                changes++;
                character.body.face.type = Face_1.FaceType.HORSE;
            }
            // Fur - if has horsetail && ears and not at changelimit
            if (character.body.skin.type !== Skin_1.SkinType.FUR && changes < changeLimit &&
                SMath_1.randInt(4) === 0 && character.body.tails.reduce(Tail_1.Tail.HasType(Tail_1.TailType.HORSE), false)) {
                if (character.body.skin.type === Skin_1.SkinType.PLAIN)
                    ContentView_1.CView.text("\n\nAn itchy feeling springs up over every inch of your skin.  As you scratch yourself madly, you feel fur grow out of your skin until <b>you have a fine coat of " + character.body.hair.color + "-colored fur.</b>");
                if (character.body.skin.type === Skin_1.SkinType.SCALES) {
                    character.body.skin.desc = "fur";
                    ContentView_1.CView.text("\n\nYour " + character.body.skin.tone + " scales begin to itch insufferably.  You reflexively scratch yourself, setting off an avalanche of discarded scales.  The itching intensifies as you madly scratch and tear at yourself, revealing a coat of " + character.body.hair.color + " " + character.body.skin.desc + ".  At last the itching stops as <b>you brush a few more loose scales from your new coat of fur.</b>");
                }
                changes++;
                character.body.skin.type = Skin_1.SkinType.FUR;
                character.body.skin.desc = "fur";
            }
            // Ears - requires tail
            if (character.body.ears.type !== Ears_1.EarType.HORSE && character.body.tails.reduce(Tail_1.Tail.HasType(Tail_1.TailType.HORSE), false) && changes < changeLimit &&
                SMath_1.randInt(3) === 0) {
                if (character.body.ears.type === -1)
                    ContentView_1.CView.text("\n\nTwo painful lumps sprout on the top of your head, forming into tear-drop shaped ears, covered with short fur.  ");
                if (character.body.ears.type === Ears_1.EarType.HUMAN)
                    ContentView_1.CView.text("\n\nYour ears tug painfully on your face as they begin shifting, moving upwards to the top of your head and transforming into a upright animalistic ears.  ");
                if (character.body.ears.type === Ears_1.EarType.DOG)
                    ContentView_1.CView.text("\n\nYour ears change shape, morphing into from their doglike shape into equine-like ears!  ");
                if (character.body.ears.type > Ears_1.EarType.DOG)
                    ContentView_1.CView.text("\n\nYour ears change shape, morphing into teardrop-shaped horse ears!  ");
                character.body.ears.type = Ears_1.EarType.HORSE;
                ContentView_1.CView.text("<b>You now have horse ears.</b>");
                changes++;
            }
            // Tail - no-prereq
            if (character.body.tails.filter(Tail_1.Tail.FilterType(Tail_1.TailType.HORSE)).length < 0 && SMath_1.randInt(2) === 0 && changes < changeLimit) {
                // no tail
                if (character.body.tails.length === 0) {
                    ContentView_1.CView.text("\n\nThere is a sudden tickling on your ass, and you notice you have sprouted a long shiny horsetail of the same " + character.body.hair.color + " color as your hair.");
                }
                else {
                    const firstTail = character.body.tails.get(0);
                    // if other animal tail
                    if (firstTail.type > Tail_1.TailType.HORSE && firstTail.type <= Tail_1.TailType.COW) {
                        ContentView_1.CView.text("\n\nPain lances up your " + ButtDescriptor_1.describeButthole(character.body.butt) + " as your tail shifts and morphs disgustingly.  With one last wave of pain, it splits into hundreds of tiny filaments, transforming into a horsetail.");
                    }
                    // if bee/spider-butt.
                    if ((firstTail.type > Tail_1.TailType.COW && firstTail.type < Tail_1.TailType.SHARK)) {
                        ContentView_1.CView.text("\n\nYour insect-like abdomen bunches up as it begins shrinking, exoskeleton flaking off like a snake sheds its skin.  It bunches up until it is as small as a tennis ball, then explodes outwards, growing into an animalistic tail shape.  Moments later, it explodes into filaments of pain, dividing into hundreds of strands and turning into a shiny horsetail.");
                    }
                    if (firstTail.type >= Tail_1.TailType.SHARK) {
                        ContentView_1.CView.text("\n\nPain lances up your " + ButtDescriptor_1.describeButthole(character.body.butt) + " as your tail shifts and morphs disgustingly.  With one last wave of pain, it splits into hundreds of tiny filaments, transforming into a horsetail.");
                    }
                }
                ContentView_1.CView.text("  <b>You now have a horse-tail.</b>");
                character.body.tails.clear();
                const newTail = new Tail_1.Tail(Tail_1.TailType.HORSE);
                character.body.tails.add(newTail);
                changes++;
            }
            if (SMath_1.randInt(4) === 0 && character.body.neck.gills && changes < changeLimit) {
                ContentView_1.CView.text("\n\nYour chest itches, and as you reach up to scratch it, you realize your gills have withdrawn into your skin.");
                character.body.neck.gills = false;
                changes++;
            }
            if (SMath_1.randInt(3) === 0)
                ContentView_1.CView.text(BodyModifier_1.displayModTone(character, 60, 1));
            // FAILSAFE CHANGE
            if (changes === 0) {
                ContentView_1.CView.text("\n\nInhuman vitality spreads through your body, invigorating you!\n");
                StatModifier_1.displayCharacterHPChange(character, 20);
                character.stats.lust += 3;
            }
        }
    }
    exports.Equinum = Equinum;
});
//# sourceMappingURL=Equinum.js.map