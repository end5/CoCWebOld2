define(["require", "exports", "Engine/Items/Consumable", "../ConsumableName", "Engine/Utilities/SMath", "Engine/Body/BreastRow", "Engine/Body/Cock", "Engine/Body/Ears", "Engine/Body/Eyes", "Engine/Body/Face", "Engine/Body/Horns", "Engine/Body/Legs", "Engine/Body/Skin", "Engine/Body/Tail", "Content/Effects/EffectType", "Content/Utilities/NumToText", "Engine/Items/ItemDesc", "Content/Descriptors/CockDescriptor", "Content/Descriptors/VaginaDescriptor", "Content/Descriptors/ButtDescriptor", "Content/Descriptors/LegDescriptor", "Engine/Body/GenderIdentity", "Content/Descriptors/BreastDescriptor", "Content/Descriptors/HairDescriptor", "Content/Descriptors/FaceDescriptor", "Engine/Display/ContentView", "Content/Body/RaceScore", "Content/Modifiers/StatModifier", "Engine/Flags"], function (require, exports, Consumable_1, ConsumableName_1, SMath_1, BreastRow_1, Cock_1, Ears_1, Eyes_1, Face_1, Horns_1, Legs_1, Skin_1, Tail_1, EffectType_1, NumToText_1, ItemDesc_1, CockDescriptor_1, VaginaDescriptor_1, ButtDescriptor_1, LegDescriptor_1, GenderIdentity_1, BreastDescriptor_1, HairDescriptor_1, FaceDescriptor_1, ContentView_1, RaceScore_1, StatModifier_1, Flags_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ReptilumFlags = Flags_1.Flags.register("Reptilum", {
        HAIR_GROWTH_STOPPED_BECAUSE_LIZARD: 0,
    });
    class Reptilum extends Consumable_1.Consumable {
        constructor() {
            super(ConsumableName_1.ConsumableName.Reptilum, new ItemDesc_1.ItemDesc("Reptlum", "a vial of Reptilum", "This is a rounded bottle with a small label that reads, \"<i>Reptilum</i>\".  It is likely this potion is tied to reptiles in some way."));
        }
        getFirstNonLizzyCock(character) {
            return character.body.cocks.find((cock) => cock.type !== Cock_1.CockType.LIZARD);
        }
        use(character) {
            // init variables
            let changes = 0;
            let changeLimit = 1;
            // strand choose affects limit
            if (SMath_1.randInt(2) === 0)
                changeLimit++;
            if (SMath_1.randInt(2) === 0)
                changeLimit++;
            if (SMath_1.randInt(4) === 0)
                changeLimit++;
            if (character.effects.has(EffectType_1.EffectType.HistoryAlchemist))
                changeLimit++;
            // clear screen
            ContentView_1.CView.clear();
            ContentView_1.CView.text("You uncork the vial of fluid and drink it down.  The taste is sour, like a dry wine with an aftertaste not entirely dissimilar to alcohol.  Instead of the warmth you'd expect, it leaves your throat feeling cold and a little numb.");
            // Statistical changes:
            // -Reduces speed down to 50.
            if (character.stats.spe > 50 && changes < changeLimit && SMath_1.randInt(4) === 0) {
                ContentView_1.CView.text("\n\nYou start to feel sluggish and cold.  Lying down to bask in the sun might make you feel better.");
                character.stats.spe += -1;
                changes++;
            }
            // -Reduces sensitivity.
            if (character.stats.sens > 20 && changes < changeLimit && SMath_1.randInt(3) === 0) {
                ContentView_1.CView.text("\n\nThe sensation of prickly pins and needles moves over your body, leaving your senses a little dulled in its wake.");
                character.stats.sens += -1;
                changes++;
            }
            // Raises libido greatly to 50, then somewhat to 75, then slowly to 100.
            if (character.stats.lib < 100 && changes < changeLimit && SMath_1.randInt(3) === 0) {
                ContentView_1.CView.text("\n\nA knot of fire in your gut doubles you over but passes after a few moments.  As you straighten you can feel the heat seeping into you, ");
                // (DICK)
                if (character.body.cocks.length > 0 && (character.gender !== 3 || SMath_1.randInt(2) === 0)) {
                    ContentView_1.CView.text("filling ");
                    if (character.body.cocks.length > 1)
                        ContentView_1.CView.text("each of ");
                    ContentView_1.CView.text("your " + CockDescriptor_1.describeCocksLight(character) + " with the desire to breed.  You get a bit hornier when you realize your sex-drive has gotten a boost.");
                }
                // (COOCH)
                else if (character.body.vaginas.length > 0)
                    ContentView_1.CView.text("puddling in your " + VaginaDescriptor_1.describeVagina(character, character.body.vaginas.get(0)) + ".  An instinctive desire to mate and lay eggs spreads through you, increasing your lust and boosting your sex-drive.");
                // (TARDS)
                else
                    ContentView_1.CView.text("puddling in your featureless crotch for a split-second before it slides into your " + ButtDescriptor_1.describeButt(character) + ".  You want to be fucked, filled, and perhaps even gain a proper gender again.  Through the lust you realize your sex-drive has been permanently increased.");
                // +3 lib if less than 50
                if (character.stats.lib < 50)
                    character.stats.lib += 1;
                // +2 lib if less than 75
                if (character.stats.lib < 75)
                    character.stats.lib += 1;
                // +1 if above 75.
                character.stats.lib += 1;
                changes++;
            }
            // -Raises toughness to 70
            // (+3 to 40, +2 to 55, +1 to 70)
            if (character.stats.tou < 70 && changes < changeLimit && SMath_1.randInt(3) === 0) {
                // (+3)
                if (character.stats.tou < 40) {
                    ContentView_1.CView.text("\n\nYour body and skin both thicken noticeably.  You pinch your " + character.body.skin.desc + " experimentally and marvel at how much tougher your hide has gotten.");
                    character.stats.tou += 3;
                }
                // (+2)
                else if (character.stats.tou < 55) {
                    ContentView_1.CView.text("\n\nYou grin as you feel your form getting a little more solid.  It seems like your whole body is toughening up quite nicely, and by the time the sensation goes away, you feel ready to take a hit.");
                    character.stats.tou += 2;
                }
                // (+1)
                else {
                    ContentView_1.CView.text("\n\nYou snarl happily as you feel yourself getting even tougher.  It's a barely discernible difference, but you can feel your " + character.body.skin.desc + " getting tough enough to make you feel invincible.");
                    character.stats.tou += 1;
                }
                changes++;
            }
            // Sexual Changes:
            // -Lizard dick - first one
            if (character.body.cocks.filter(Cock_1.Cock.FilterType(Cock_1.CockType.LIZARD)).length <= 0 && character.body.cocks.length > 0 && changes < changeLimit && SMath_1.randInt(4) === 0) {
                // Find the first non-lizzy dick
                const nonLizzyDick = this.getFirstNonLizzyCock(character);
                ContentView_1.CView.text("\n\nA slow tingle warms your groin.  Before it can progress any further, you yank back your " + character.inventory.armor.displayName + " to investigate.  Your " + CockDescriptor_1.describeCock(character, nonLizzyDick) + " is changing!  It ripples loosely from ");
                if (character.body.cocks.find(Cock_1.Cock.HasSheath))
                    ContentView_1.CView.text("sheath ");
                else
                    ContentView_1.CView.text("base ");
                ContentView_1.CView.text("to tip, undulating and convulsing as its color lightens, darkens, and finally settles on a purplish hue.  Your " + CockDescriptor_1.nounCock(Cock_1.CockType.HUMAN) + " resolves itself into a bulbous form, with a slightly pointed tip.  The 'bulbs' throughout its shape look like they would provide an interesting ride for your sexual partners, but the perverse, alien pecker ");
                if (character.stats.cor < 33)
                    ContentView_1.CView.text("horrifies you.");
                else if (character.stats.cor < 66)
                    ContentView_1.CView.text("is a little strange for your tastes.");
                else {
                    ContentView_1.CView.text("looks like it might be more fun to receive than use on others.  ");
                    if (character.body.vaginas.length > 0)
                        ContentView_1.CView.text("Maybe you could find someone else with one to ride?");
                    else
                        ContentView_1.CView.text("Maybe you should test it out on someone and ask them exactly how it feels?");
                }
                ContentView_1.CView.text("  <b>You now have a bulbous, lizard-like cock.</b>");
                // Actually xform it nau
                if (character.body.cocks.find(Cock_1.Cock.HasSheath)) {
                    nonLizzyDick.type = Cock_1.CockType.LIZARD;
                    if (character.body.cocks.filter(Cock_1.Cock.HasSheath).length <= 0)
                        ContentView_1.CView.text("\n\nYour sheath tightens and starts to smooth out, revealing ever greater amounts of your " + CockDescriptor_1.describeCock(character, nonLizzyDick) + "'s lower portions.  After a few moments <b>your groin is no longer so animalistic - the sheath is gone.</b>");
                }
                else
                    nonLizzyDick.type = Cock_1.CockType.LIZARD;
                changes++;
                character.stats.lib += 3;
                character.stats.lust += 10;
            }
            // (CHANGE OTHER DICK)
            // Requires 1 lizard cock, multiple cocks
            if (character.body.cocks.length > 1 && character.body.cocks.filter(Cock_1.Cock.FilterType(Cock_1.CockType.LIZARD)).length > 0 && character.body.cocks.length > character.body.cocks.filter(Cock_1.Cock.FilterType(Cock_1.CockType.LIZARD)).length && SMath_1.randInt(4) === 0 && changes < changeLimit) {
                ContentView_1.CView.text("\n\nA familiar tingle starts in your crotch, and before you can miss the show, you pull open your " + character.inventory.armor.displayName + ".  As if operating on a cue, ");
                const nonLizzyDick = this.getFirstNonLizzyCock(character);
                if (character.body.cocks.length === 2)
                    ContentView_1.CView.text("your other dick");
                else
                    ContentView_1.CView.text("another one of your dicks");
                ContentView_1.CView.text(" starts to change into the strange reptilian shape you've grown familiar with.  It warps visibly, trembling and radiating pleasurable feelings back to you as the transformation progresses.  ");
                if (character.cumQ() < 50)
                    ContentView_1.CView.text("pre-cum oozes from the tip");
                else if (character.cumQ() < 700)
                    ContentView_1.CView.text("Thick pre-cum rains from the tip");
                else
                    ContentView_1.CView.text("A wave of pre-cum splatters on the ground");
                ContentView_1.CView.text(" from the pleasure of the change.  In moments <b>you have a bulbous, lizard-like cock.</b>");
                // (REMOVE SHEATH IF NECESSARY)
                if (character.body.cocks.find(Cock_1.Cock.HasSheath)) {
                    nonLizzyDick.type = Cock_1.CockType.LIZARD;
                    if (character.body.cocks.filter(Cock_1.Cock.HasSheath).length <= 0)
                        ContentView_1.CView.text("\n\nYour sheath tightens and starts to smooth out, revealing ever greater amounts of your " + CockDescriptor_1.describeCock(character, nonLizzyDick) + "'s lower portions.  After a few moments <b>your groin is no longer so animalistic - the sheath is gone.</b>");
                }
                else
                    nonLizzyDick.type = Cock_1.CockType.LIZARD;
                changes++;
                character.stats.lib += 3;
                character.stats.lust += 10;
            }
            // -Grows second lizard dick if only 1 dick
            if (character.body.cocks.filter(Cock_1.Cock.FilterType(Cock_1.CockType.LIZARD)).length === 1 && character.body.cocks.length === 1 && SMath_1.randInt(4) === 0 && changes < changeLimit) {
                const firstCock = character.body.cocks.get(0);
                ContentView_1.CView.text("\n\nA knot of pressure forms in your groin, forcing you off your " + LegDescriptor_1.describeFeet(character) + " as you try to endure it.  You examine the affected area and see a lump starting to bulge under your " + character.body.skin.desc + ", adjacent to your " + CockDescriptor_1.describeCock(character, firstCock) + ".  The flesh darkens, turning purple");
                if (character.body.skin.type === Skin_1.SkinType.FUR || character.body.skin.type === Skin_1.SkinType.SCALES)
                    ContentView_1.CView.text(" and shedding " + character.body.skin.desc);
                ContentView_1.CView.text(" as the bulge lengthens, pushing out from your body.  Too surprised to react, you can only pant in pain and watch as the fleshy lump starts to take on a penis-like appearance.  <b>You're growing a second lizard-cock!</b>  It doesn't stop growing until it's just as long as its brother and the same shade of shiny purple.  A dribble of cum oozes from its tip, and you feel relief at last.");
                const newCock = new Cock_1.Cock();
                newCock.type = Cock_1.CockType.LIZARD;
                newCock.length = firstCock.length;
                newCock.thickness = firstCock.thickness;
                character.body.cocks.add(newCock);
                changes++;
                character.stats.lib += 3;
                character.stats.lust += 10;
            }
            // --Worms leave if 100% lizard dicks?
            // Require mammals?
            if (character.body.cocks.filter(Cock_1.Cock.FilterType(Cock_1.CockType.LIZARD)).length === character.body.cocks.length && changes < changeLimit && character.effects.has(EffectType_1.EffectType.Infested)) {
                ContentView_1.CView.text("\n\nLike rats from a sinking ship, worms escape from your body in a steady stream.  Surprisingly, the sensation is remarkably pleasant, similar to the pleasure of sexual release in a way.  Though they seem inexhaustible, the tiny, cum-slimed invertebrates slow to a trickle.  The larger worm-kin inside you stirs as if disturbed from a nap, coming loose from whatever moorings it had attached itself to in the interior of your form.  It slowly works its way up your urethra, stretching to an almost painful degree with every lurching motion.  Your dick bloats out around the base, stretched like the ovipositor on a bee-girl in order to handle the parasitic creature, but thankfully, the ordeal is a brief one.");
                if (character.body.balls.count > 1)
                    ContentView_1.CView.text("  The remaining " + NumToText_1.numToCardinalText(character.body.balls.count - 1) + " slither out the pre-stretched holes with ease, though the last one hangs from your tip for a moment before dropping to the ground.");
                ContentView_1.CView.text("  The white creature joins its kin on the ground and slowly slithers away.  Perhaps they prefer mammals? In any event, <b>you are no longer infected with worms</b>.");
                character.effects.removeByName(EffectType_1.EffectType.Infested);
                changes++;
            }
            // -Breasts vanish to 0 rating if male
            if (character.body.chest.sort(BreastRow_1.BreastRow.Largest).get(0).rating >= 1 && character.gender === GenderIdentity_1.Gender.MALE && changes < changeLimit && SMath_1.randInt(3) === 0) {
                // (HUEG)
                if (character.body.chest.sort(BreastRow_1.BreastRow.Largest).get(0).rating > 8) {
                    ContentView_1.CView.text("\n\nThe flesh on your chest tightens up, losing nearly half its mass in the span of a few seconds.  With your center of balance shifted so suddenly, you stagger about trying not to fall on your ass.  You catch yourself and marvel at the massive change in breast size.");
                    // Half tit size
                }
                // (NOT HUEG < 4)
                else
                    ContentView_1.CView.text("\n\nIn an instant, your chest compacts in on itself, consuming every ounce of breast-flesh.  You're left with a  smooth, masculine torso, though your nipples remain.");
                // (BOTH - no new PG)
                ContentView_1.CView.text("  With the change in weight and gravity, you find it's gotten much easier to move about.");
                // Loop through behind the scenes and adjust all tits.
                for (const breastRow of character.body.chest) {
                    if (breastRow.rating > 8)
                        breastRow.rating /= 2;
                    else
                        breastRow.rating = 0;
                }
                // (+2 speed)
                character.stats.lib += 2;
                changes++;
            }
            // -Lactation stoppage.
            if (character.body.chest.sort(BreastRow_1.BreastRow.LactationMost).get(0).lactationMultiplier >= 1 && changes < changeLimit && SMath_1.randInt(4) === 0) {
                if (character.body.chest.reduce(BreastRow_1.BreastRow.TotalNipples, 0) === 2)
                    ContentView_1.CView.text("\n\nBoth of your");
                else
                    ContentView_1.CView.text("\n\nAll of your many");
                ContentView_1.CView.text(" nipples relax.  It's a strange feeling, and you pull back your top to touch one.  It feels fine, though there doesn't seem to be any milk leaking out.  You give it a squeeze and marvel when nothing ");
                if (character.body.chest.find(BreastRow_1.BreastRow.FuckableNipples))
                    ContentView_1.CView.text("but sexual fluid ");
                ContentView_1.CView.text("escapes it.  <b>You are no longer lactating.</b>  That makes sense, only mammals lactate!  Smiling, you muse at how much time this will save you when cleaning your gear.");
                if (character.effects.has(EffectType_1.EffectType.Feeder) || character.effects.has(EffectType_1.EffectType.Feeder)) {
                    ContentView_1.CView.text("\n\n(<b>Feeder perk lost!</b>)");
                    character.effects.removeByName(EffectType_1.EffectType.Feeder);
                    character.effects.removeByName(EffectType_1.EffectType.Feeder);
                }
                changes++;
                // Loop through and reset lactation
                for (const breastRow of character.body.chest) {
                    breastRow.lactationMultiplier = 0;
                }
            }
            // -Nipples reduction to 1 per tit.
            if (character.body.chest.reduce(BreastRow_1.BreastRow.AverageNipplesPerBreast, 0) > 1 && changes < changeLimit && SMath_1.randInt(4) === 0) {
                ContentView_1.CView.text("\n\nA chill runs over your " + BreastDescriptor_1.describeAllBreasts(character) + " and vanishes.  You stick a hand under your " + character.inventory.armor.displayName + " and discover that your extra nipples are missing!  You're down to just one per ");
                if (character.body.chest.sort(BreastRow_1.BreastRow.Largest).get(0).rating < 1)
                    ContentView_1.CView.text("'breast'.");
                else
                    ContentView_1.CView.text("breast.");
                changes++;
                // Loop through and reset nipples
                for (const breastRow of character.body.chest) {
                    breastRow.nipples.count = 1;
                }
            }
            // -VAGs
            if (character.body.vaginas.length > 0 && !character.effects.has(EffectType_1.EffectType.Oviposition) && changes < changeLimit && SMath_1.randInt(5) === 0 && RaceScore_1.lizardRaceScore(character) > 3) {
                ContentView_1.CView.text("\n\nDeep inside yourself there is a change.  It makes you feel a little woozy, but passes quickly.  Beyond that, you aren't sure exactly what just happened, but you are sure it originated from your womb.\n");
                ContentView_1.CView.text("(<b>Perk Gained: Oviposition</b>)");
                character.effects.create(EffectType_1.EffectType.Oviposition);
                changes++;
            }
            // Physical changes:
            // -Existing horns.amount become draconic, max of 4, max length of 1'
            if (character.body.horns.type !== Horns_1.HornType.DRACONIC_X4_12_INCH_LONG && changes < changeLimit && SMath_1.randInt(5) === 0) {
                // No dragon horns.amount yet.
                if (character.body.horns.type !== Horns_1.HornType.DRACONIC_X2) {
                    // Already have horns
                    if (character.body.horns.count > 0) {
                        // High quantity demon horns
                        if (character.body.horns.type === Horns_1.HornType.DEMON && character.body.horns.count > 4) {
                            ContentView_1.CView.text("\n\nYour horns.amount condense, twisting around each other and merging into larger, pointed protrusions.  By the time they finish you have four draconic-looking horns, each about twelve inches long.");
                            character.body.horns.count = 12;
                            character.body.horns.type = Horns_1.HornType.DRACONIC_X4_12_INCH_LONG;
                        }
                        else {
                            ContentView_1.CView.text("\n\nYou feel your horns.amount changing and warping, and reach back to touch them.  They have a slight curve and a gradual taper.  They must look something like the horns.amount the dragons in your village's legends always had.");
                            character.body.horns.type = Horns_1.HornType.DRACONIC_X2;
                            if (character.body.horns.count > 13) {
                                ContentView_1.CView.text("  The change seems to have shrunken the horns, they're about a foot long now.");
                                character.body.horns.count = 12;
                            }
                        }
                        changes++;
                    }
                    // No horns
                    else {
                        // -If no horns, grow a pair
                        ContentView_1.CView.text("\n\nWith painful pressure, the skin on the sides of your forehead splits around two tiny nub-like horns.  They're angled back in such a way as to resemble those you saw on the dragons in your village's legends.  A few inches of horn sprout from your head before stopping.  <b>You have about four inches of dragon-like horn.</b>");
                        character.body.horns.count = 4;
                        character.body.horns.type = Horns_1.HornType.DRACONIC_X2;
                        changes++;
                    }
                }
                // ALREADY DRAGON
                else {
                    if (character.body.horns.type === Horns_1.HornType.DRACONIC_X2) {
                        if (character.body.horns.count < 12) {
                            if (SMath_1.randInt(2) === 0) {
                                ContentView_1.CView.text("\n\nYou get a headache as an inch of fresh horn escapes from your pounding skull.");
                                character.body.horns.count += 1;
                            }
                            else {
                                ContentView_1.CView.text("\n\nYour head aches as your horns.amount grow a few inches longer.  They get even thicker about the base, giving you a menacing appearance.");
                                character.body.horns.count += 2 + SMath_1.randInt(4);
                            }
                            if (character.body.horns.count >= 12)
                                ContentView_1.CView.text("  <b>Your horns.amount settle down quickly, as if they're reached their full size.</b>");
                            changes++;
                        }
                        // maxxed out, new row
                        else {
                            // --Next horn growth adds second row and brings length up to 12\"
                            ContentView_1.CView.text("\n\nA second row of horns.amount erupts under the first, and though they are narrower, they grow nearly as long as your first row before they stop.  A sense of finality settles over you.  <b>You have as many horns.amount as a lizan can grow.</b>");
                            character.body.horns.type = Horns_1.HornType.DRACONIC_X4_12_INCH_LONG;
                            changes++;
                        }
                    }
                }
            }
            // -Hair stops growing!
            if (exports.ReptilumFlags.HAIR_GROWTH_STOPPED_BECAUSE_LIZARD === 0 && changes < changeLimit && SMath_1.randInt(4) === 0) {
                ContentView_1.CView.text("\n\nYour scalp tingles oddly.  In a panic, you reach up to your " + HairDescriptor_1.describeHair(character) + ", but thankfully it appears unchanged.\n\n");
                ContentView_1.CView.text("(<b>Your hair has stopped growing.</b>)");
                changes++;
                exports.ReptilumFlags.HAIR_GROWTH_STOPPED_BECAUSE_LIZARD++;
            }
            // Big physical changes:
            // -Legs - Draconic, clawed feet
            if (character.body.legs.type !== Legs_1.LegType.LIZARD && changes < changeLimit && SMath_1.randInt(5) === 0) {
                // Hooves -
                if (character.body.legs.type === Legs_1.LegType.HOOFED)
                    ContentView_1.CView.text("\n\nYou scream in agony as you feel your hooves crack and break apart, beginning to rearrange.  Your legs change to a digitigrade shape while your feet grow claws and shift to have three toes on the front and a smaller toe on the heel.");
                // TAURS -
                else if (character.body.legs.type === Legs_1.LegType.CENTAUR)
                    ContentView_1.CView.text("\n\nYour lower body is wracked by pain!  Once it passes, you discover that you're standing on digitigrade legs with lizard-like claws.");
                // feet types -
                else if (character.body.legs.type === Legs_1.LegType.HUMAN || character.body.legs.type === Legs_1.LegType.DOG || character.body.legs.type === Legs_1.LegType.DEMONIC_HIGH_HEELS || character.body.legs.type === Legs_1.LegType.DEMONIC_CLAWS || character.body.legs.type === Legs_1.LegType.BEE || character.body.legs.type === Legs_1.LegType.CAT)
                    ContentView_1.CView.text("\n\nYou scream in agony as you feel the bones in your legs break and begin to rearrange. They change to a digitigrade shape while your feet grow claws and shift to have three toes on the front and a smaller toe on the heel.");
                // Else -
                else
                    ContentView_1.CView.text("\n\nPain rips through your " + LegDescriptor_1.describeLegs(character) + ", morphing and twisting them until the bones rearrange into a digitigrade configuration.  The strange legs have three-toed, clawed feet, complete with a small vestigial claw-toe on the back for added grip.");
                ContentView_1.CView.text("  <b>You have reptilian legs and claws!</b>");
                character.body.legs.type = Legs_1.LegType.LIZARD;
                changes++;
            }
            // -Tail - sinuous lizard tail
            if (character.body.tails.reduce(Tail_1.Tail.HasType(Tail_1.TailType.LIZARD), false) && character.body.legs.type === Legs_1.LegType.LIZARD && changes < changeLimit && SMath_1.randInt(5) === 0) {
                // No tail
                if (character.body.tails.length >= 1)
                    ContentView_1.CView.text("\n\nYou drop onto the ground as your spine twists and grows, forcing the flesh above your " + ButtDescriptor_1.describeButt(character) + " to bulge out.  New bones form, one after another, building a tapered, prehensile tail onto the back of your body.  <b>You now have a reptilian tail!</b>");
                // Yes tail
                else
                    ContentView_1.CView.text("\n\nYou drop to the ground as your tail twists and grows, changing its shape in order to gradually taper to a point.  It flicks back and forth, prehensile and totally under your control.  <b>You now have a reptilian tail.</b>");
                character.body.tails.clear();
                character.body.tails.add(new Tail_1.Tail(Tail_1.TailType.LIZARD));
                changes++;
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
            // -Ears become smaller nub-like openings?
            if (character.body.ears.type !== Ears_1.EarType.LIZARD && character.body.tails.reduce(Tail_1.Tail.HasType(Tail_1.TailType.LIZARD), false) && character.body.legs.type === Legs_1.LegType.LIZARD && changes < changeLimit && SMath_1.randInt(5) === 0) {
                ContentView_1.CView.text("\n\nTightness centers on your scalp, pulling your ears down from their normal, fleshy shape into small, scaley bumps with holes in their centers.  <b>You have reptilian ears!</b>");
                character.body.ears.type = Ears_1.EarType.LIZARD;
                changes++;
            }
            // -Scales - color changes to red, green, white, blue, or black.  Rarely: purple or silver.
            if (character.body.skin.type !== Skin_1.SkinType.SCALES && character.body.ears.type === Ears_1.EarType.LIZARD && character.body.tails.reduce(Tail_1.Tail.HasType(Tail_1.TailType.LIZARD), false) && character.body.legs.type === Legs_1.LegType.LIZARD && changes < changeLimit && SMath_1.randInt(5) === 0) {
                // (fur)
                if (character.body.skin.type === Skin_1.SkinType.FUR) {
                    // set new skin.tone
                    if (SMath_1.randInt(10) === 0) {
                        if (SMath_1.randInt(2) === 0)
                            character.body.skin.tone = "purple";
                        else
                            character.body.skin.tone = "silver";
                    }
                    // non rare skin.tone
                    else {
                        const chance = SMath_1.randInt(5);
                        if (chance === 0)
                            character.body.skin.tone = "red";
                        else if (chance === 1)
                            character.body.skin.tone = "green";
                        else if (chance === 2)
                            character.body.skin.tone = "white";
                        else if (chance === 3)
                            character.body.skin.tone = "blue";
                        else
                            character.body.skin.tone = "black";
                    }
                    ContentView_1.CView.text("\n\nYou scratch yourself, and come away with a large clump of " + character.body.hair.color + " fur.  Panicked, you look down and realize that your fur is falling out in huge clumps.  It itches like mad, and you scratch your body relentlessly, shedding the remaining fur with alarming speed.  Underneath the fur your skin feels incredibly smooth, and as more and more of the stuff comes off, you discover a seamless layer of " + character.body.skin.tone + " scales covering most of your body.  The rest of the fur is easy to remove.  <b>You're now covered in scales from head to toe.</b>");
                }
                // (no fur)
                else {
                    ContentView_1.CView.text("\n\nYou idly reach back to scratch yourself and nearly jump out of your " + character.inventory.armor.displayName + " when you hit something hard.  A quick glance down reveals that scales are growing out of your " + character.body.skin.tone + " skin with alarming speed.  As you watch, the surface of your skin is covered in smooth scales.  They interlink together so well that they may as well be seamless.  You peel back your " + character.inventory.armor.displayName + " and the transformation has already finished on the rest of your body.  <b>You're covered from head to toe in shiny ");
                    // set new skin.tone
                    if (SMath_1.randInt(10) === 0) {
                        if (SMath_1.randInt(2) === 0)
                            character.body.skin.tone = "purple";
                        else
                            character.body.skin.tone = "silver";
                    }
                    // non rare skin.tone
                    else {
                        const chance = SMath_1.randInt(5);
                        if (chance === 0)
                            character.body.skin.tone = "red";
                        else if (chance === 1)
                            character.body.skin.tone = "green";
                        else if (chance === 2)
                            character.body.skin.tone = "white";
                        else if (chance === 3)
                            character.body.skin.tone = "blue";
                        else
                            character.body.skin.tone = "black";
                    }
                    ContentView_1.CView.text(character.body.skin.tone + " scales.</b>");
                }
                character.body.skin.type = Skin_1.SkinType.SCALES;
                character.body.skin.desc = "scales";
                changes++;
            }
            // -Lizard-like face.
            if (character.body.face.type !== Face_1.FaceType.LIZARD && character.body.skin.type === Skin_1.SkinType.SCALES && character.body.ears.type === Ears_1.EarType.LIZARD && character.body.tails.reduce(Tail_1.Tail.HasType(Tail_1.TailType.LIZARD), false) && character.body.legs.type === Legs_1.LegType.LIZARD && changes < changeLimit && SMath_1.randInt(5) === 0) {
                ContentView_1.CView.text("\n\nTerrible agony wracks your " + FaceDescriptor_1.describeFaceShort(character) + " as bones crack and shift.  Your jawbone rearranges while your cranium shortens.  The changes seem to last forever; once they've finished, no time seems to have passed.  Your fingers brush against your toothy snout as you get used to your new face.  It seems <b>you have a toothy, reptilian visage now.</b>");
                character.body.face.type = Face_1.FaceType.LIZARD;
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
        }
    }
    exports.Reptilum = Reptilum;
});
//# sourceMappingURL=Reptilum.js.map