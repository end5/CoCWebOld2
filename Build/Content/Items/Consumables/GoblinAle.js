define(["require", "exports", "Engine/Items/Consumable", "../ConsumableName", "Engine/Utilities/SMath", "Engine/Body/Arms", "Engine/Body/Ears", "Engine/Body/Eyes", "Engine/Body/Face", "Engine/Body/Antennae", "Engine/Body/Skin", "Engine/Body/Vagina", "Engine/Body/Wings", "Content/Effects/EffectType", "Engine/Items/ItemDesc", "Content/Descriptors/VaginaDescriptor", "Content/Descriptors/HairDescriptor", "Content/Descriptors/LegDescriptor", "Content/Descriptors/BreastDescriptor", "Engine/Display/ContentView", "Content/Modifiers/CockModifier", "Content/Modifiers/BodyModifier", "Content/Settings"], function (require, exports, Consumable_1, ConsumableName_1, SMath_1, Arms_1, Ears_1, Eyes_1, Face_1, Antennae_1, Skin_1, Vagina_1, Wings_1, EffectType_1, ItemDesc_1, VaginaDescriptor_1, HairDescriptor_1, LegDescriptor_1, BreastDescriptor_1, ContentView_1, CockModifier_1, BodyModifier_1, Settings_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class GoblinAle extends Consumable_1.Consumable {
        constructor() {
            super(ConsumableName_1.ConsumableName.GoblinAle, new ItemDesc_1.ItemDesc("Gob.Ale", "a flagon of potent goblin ale", "This sealed flagon of 'Goblin Ale' sloshes noisily with alcoholic brew.  Judging by the markings on the flagon, it's a VERY strong drink, and not to be trifled with."));
        }
        use(character) {
            let changes = 0;
            let changeLimit = 1;
            if (SMath_1.randInt(2) === 0)
                changeLimit++;
            if (SMath_1.randInt(3) === 0)
                changeLimit++;
            if (SMath_1.randInt(4) === 0)
                changeLimit++;
            if (SMath_1.randInt(5) === 0)
                changeLimit++;
            if (character.effects.has(EffectType_1.EffectType.HistoryAlchemist))
                changeLimit++;
            ContentView_1.CView.clear();
            ContentView_1.CView.text("You drink the ale, finding it to have a remarkably smooth yet potent taste.  You lick your lips and sneeze, feeling slightly tipsy.");
            character.stats.lust += 15;
            // Stronger
            if (character.stats.str > 50) {
                character.stats.str += -1;
                if (character.stats.str > 70)
                    character.stats.str += -1;
                if (character.stats.str > 90)
                    character.stats.str += -2;
                ContentView_1.CView.text("\n\nYou feel a little weaker, but maybe it's just the alcohol.");
            }
            // Less tough
            if (character.stats.tou > 50) {
                ContentView_1.CView.text("\n\nGiggling, you poke yourself, which only makes you giggle harder when you realize how much softer you feel.");
                character.stats.tou += -1;
                if (character.stats.tou > 70)
                    character.stats.tou += -1;
                if (character.stats.tou > 90)
                    character.stats.tou += -2;
            }
            // antianemone corollary:
            if (changes < changeLimit && character.body.hair.type === 4 && SMath_1.randInt(2) === 0) {
                // -insert anemone hair removal into them under whatever criteria you like, though hair removal should precede abdomen growth; here's some sample text:
                ContentView_1.CView.text("\n\nAs you down the potent ale, your head begins to feel heavier - and not just from the alcohol!  Reaching up, you notice your tentacles becoming soft and somewhat fibrous.  Pulling one down reveals that it feels smooth, silky, and fibrous; you watch as it dissolves into many thin, hair-like strands.  <b>Your hair is now back to normal!</b>");
                character.body.hair.type = 0;
                changes++;
            }
            // Shrink
            if (SMath_1.randInt(2) === 0 && character.body.tallness > 48) {
                changes++;
                ContentView_1.CView.text("\n\nThe world spins, and not just from the strength of the drink!  Your viewpoint is closer to the ground.  How fun!");
                character.body.tallness -= (1 + SMath_1.randInt(5));
            }
            // Speed boost
            if (SMath_1.randInt(3) === 0 && character.stats.spe < 50 && changes < changeLimit) {
                character.stats.spe += 1 + SMath_1.randInt(2);
                ContentView_1.CView.text("\n\nYou feel like dancing, and stumble as your legs react more quickly than you'd think.  Is the alcohol slowing you down or are you really faster?  You take a step and nearly faceplant as you go off balance.  It's definitely both.");
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
            // SEXYTIEMS
            // Multidick killa!
            if (character.body.cocks.length > 1 && SMath_1.randInt(3) === 0 && changes < changeLimit) {
                ContentView_1.CView.text("\n\n");
                CockModifier_1.displayKillCocks(character, 1);
                changes++;
            }
            // Boost vaginal capacity without gaping
            const bonusVCap = character.effects.getByName(EffectType_1.EffectType.BonusVCapacity);
            if (changes < changeLimit && SMath_1.randInt(3) === 0 &&
                character.body.vaginas.length > 0 &&
                bonusVCap && bonusVCap.values.vaginalCapacity && bonusVCap.values.vaginalCapacity < 40) {
                if (!character.effects.has(EffectType_1.EffectType.BonusVCapacity))
                    character.effects.create(EffectType_1.EffectType.BonusVCapacity, { vaginalCapacity: 0 });
                bonusVCap.values.vaginalCapacity = 5;
                ContentView_1.CView.text("\n\nThere is a sudden... emptiness within your " + VaginaDescriptor_1.describeVagina(character, character.body.vaginas.get(0)) + ".  Somehow you know you could accommodate even larger... insertions.");
                changes++;
            }
            // Boost fertility
            if (changes < changeLimit && SMath_1.randInt(4) === 0 && character.body.fertility < 40 && character.body.vaginas.length > 0) {
                character.body.fertility += 2 + SMath_1.randInt(5);
                changes++;
                ContentView_1.CView.text("\n\nYou feel strange.  Fertile... somehow.  You don't know how else to think of it, but you're ready to be a mother.");
            }
            // Shrink primary dick to no longer than 12 inches
            else if (character.body.cocks.length === 1 && SMath_1.randInt(2) === 0 && changes < changeLimit && !Settings_1.Settings.hyperHappy) {
                if (character.body.cocks.get(0).length > 12) {
                    changes++;
                    let temp3 = 0;
                    ContentView_1.CView.text("\n\n");
                    // Shrink said cock
                    if (character.body.cocks.get(0).length < 6 && character.body.cocks.get(0).length >= 2.9) {
                        character.body.cocks.get(0).length -= .5;
                        temp3 -= .5;
                    }
                    temp3 += CockModifier_1.growCock(character, character.body.cocks.get(0), (SMath_1.randInt(3) + 1) * -1);
                    CockModifier_1.displayLengthChange(character, temp3, 1);
                }
            }
            // GENERAL APPEARANCE STUFF BELOW
            // REMOVAL STUFF
            // Removes wings and antennaes!
            if ((character.body.wings.type === Wings_1.WingType.BEE_LIKE_SMALL || character.body.wings.type === Wings_1.WingType.BEE_LIKE_LARGE || character.body.wings.type >= Wings_1.WingType.HARPY) && changes < changeLimit && SMath_1.randInt(4) === 0) {
                if (character.body.wings.type === Wings_1.WingType.SHARK_FIN)
                    ContentView_1.CView.text("\n\nYour back tingles, feeling lighter.  Something lands behind you with a 'thump', and when you turn to look, you see your fin has fallen off.  This might be the best (and worst) booze you've ever had!  <b>You no longer have a fin!</b>");
                else
                    ContentView_1.CView.text("\n\nYour shoulders tingle, feeling lighter.  Something lands behind you with a 'thump', and when you turn to look you see your wings have fallen off.  This might be the best (and worst) booze you've ever had!  <b>You no longer have wings!</b>");
                character.body.wings.type = Wings_1.WingType.NONE;
                changes++;
            }
            // Removes wings and antennaes!
            if (character.body.antennae.type > Antennae_1.AntennaeType.NONE && changes < changeLimit && SMath_1.randInt(3) === 0) {
                ContentView_1.CView.text("\n\nYour " + HairDescriptor_1.describeHair(character) + " itches so you give it a scratch, only to have your antennae fall to the ground.  What a relief.  <b>You've lost your antennae!</b>");
                changes++;
                character.body.antennae.type = Antennae_1.AntennaeType.NONE;
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
            // -Remove extra breast rows
            if (changes < changeLimit && character.body.chest.length > 1 && SMath_1.randInt(3) === 0) {
                changes++;
                const lastRow = character.body.chest.get(character.body.chest.length - 1);
                ContentView_1.CView.text("\n\nYou stumble back when your center of balance shifts, and though you adjust before you can fall over, you're left to watch in awe as your bottom-most " + BreastDescriptor_1.describeBreastRow(lastRow) + " shrink down, disappearing completely into your ");
                if (character.body.chest.length >= 3)
                    ContentView_1.CView.text("abdomen");
                else
                    ContentView_1.CView.text("chest");
                ContentView_1.CView.text(". The " + BreastDescriptor_1.describeNipple(character, lastRow) + "s even fade until nothing but ");
                if (character.body.skin.type === Skin_1.SkinType.FUR)
                    ContentView_1.CView.text(character.body.hair.color + " " + character.body.skin.desc);
                else
                    ContentView_1.CView.text(character.body.skin.tone + " " + character.body.skin.desc);
                ContentView_1.CView.text(" remains. <b>You've lost a row of breasts!</b>");
                character.stats.sens += -5;
                character.body.chest.remove(character.body.chest.length - 1);
            }
            // Skin/fur
            if (character.body.skin.type !== Skin_1.SkinType.PLAIN && changes < changeLimit && SMath_1.randInt(4) === 0 && character.body.face.type === Face_1.FaceType.HUMAN) {
                if (character.body.skin.type === Skin_1.SkinType.FUR)
                    ContentView_1.CView.text("\n\nYour fur itches incessantly, so you start scratching it.  It starts coming off in big clumps before the whole mess begins sloughing off your body.  In seconds, your skin is nude.  <b>You've lost your fur!</b>");
                if (character.body.skin.type === Skin_1.SkinType.SCALES)
                    ContentView_1.CView.text("\n\nYour scales itch incessantly, so you scratch at them.  They start falling off wholesale, leaving you standing in a pile of scales after only a few moments.  <b>You've lost your scales!</b>");
                if (character.body.skin.type > Skin_1.SkinType.SCALES)
                    ContentView_1.CView.text("\n\nYour " + character.body.skin.desc + " itches incessantly, and as you scratch it shifts and changes, becoming normal human-like skin.  <b>Your skin is once again normal!</b>");
                character.body.skin.adj = "";
                character.body.skin.desc = "skin";
                character.body.skin.type = Skin_1.SkinType.PLAIN;
                changes++;
            }
            // skin.tone
            if (character.body.skin.tone !== "green" && character.body.skin.tone !== "grayish-blue" && character.body.skin.tone !== "dark green" && character.body.skin.tone !== "pale yellow" && changes < changeLimit && SMath_1.randInt(2) === 0) {
                if (SMath_1.randInt(10) !== 0)
                    character.body.skin.tone = "dark green";
                else {
                    if (SMath_1.randInt(2) === 0)
                        character.body.skin.tone = "pale yellow";
                    else
                        character.body.skin.tone = "grayish-blue";
                }
                changes++;
                ContentView_1.CView.text("\n\nWhoah, that was weird.  You just hallucinated that your ");
                if (character.body.skin.type === Skin_1.SkinType.FUR)
                    ContentView_1.CView.text("skin");
                else
                    ContentView_1.CView.text(character.body.skin.desc);
                ContentView_1.CView.text(" turned " + character.body.skin.tone + ".  No way!  It's staying, it really changed color!");
            }
            // Face!
            if (character.body.face.type !== Face_1.FaceType.HUMAN && changes < changeLimit && SMath_1.randInt(4) === 0 && character.body.ears.type === Ears_1.EarType.ELFIN) {
                changes++;
                character.body.face.type = Face_1.FaceType.HUMAN;
                ContentView_1.CView.text("\n\nAnother violent sneeze escapes you.  It hurt!  You feel your nose and discover your face has changed back into a more normal look.  <b>You have a human looking face again!</b>");
            }
            // Ears!
            if (character.body.ears.type !== Ears_1.EarType.ELFIN && changes < changeLimit && SMath_1.randInt(3) === 0) {
                ContentView_1.CView.text("\n\nA weird tingling runs through your scalp as your " + HairDescriptor_1.describeHair(character) + " shifts slightly.  You reach up to touch and bump <b>your new pointed elfin ears</b>.  You bet they look cute!");
                changes++;
                character.body.ears.type = Ears_1.EarType.ELFIN;
            }
            if (SMath_1.randInt(4) === 0 && character.body.neck.gills && changes < changeLimit) {
                ContentView_1.CView.text("\n\nYour chest itches, and as you reach up to scratch it, you realize your gills have withdrawn into your skin.");
                character.body.neck.gills = false;
                changes++;
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
            if (changes < changeLimit && SMath_1.randInt(4) === 0 && ((character.body.butt.wetness > 0 && !character.effects.has(EffectType_1.EffectType.MaraesGiftButtslut)) || character.body.butt.wetness > 1)) {
                ContentView_1.CView.text("\n\nYou feel a tightening up in your colon and your [asshole] sucks into itself.  You feel sharp pain at first but that thankfully fades.  Your ass seems to have dried and tightened up.");
                character.body.butt.wetness--;
                if (character.body.butt.looseness > 1)
                    character.body.butt.looseness--;
                changes++;
            }
            if (changes < changeLimit && SMath_1.randInt(3) === 0) {
                if (SMath_1.randInt(2) === 0)
                    BodyModifier_1.displayModFem(character, 85, 3);
                if (SMath_1.randInt(2) === 0)
                    BodyModifier_1.displayModThickness(character, 20, 3);
                if (SMath_1.randInt(2) === 0)
                    BodyModifier_1.displayModTone(character, 15, 5);
            }
        }
    }
    exports.GoblinAle = GoblinAle;
});
//# sourceMappingURL=GoblinAle.js.map