define(["require", "exports", "Engine/Items/Consumable", "../ConsumableName", "Engine/Utilities/SMath", "Engine/Body/BreastRow", "Engine/Body/Cock", "Engine/Body/Ears", "Engine/Body/Eyes", "Engine/Body/Face", "Engine/Body/Hair", "Engine/Body/Legs", "Engine/Body/Skin", "Engine/Body/Tail", "Engine/Items/ItemDesc", "Content/Descriptors/CockDescriptor", "./Reptilum", "Engine/Display/ContentView", "Content/Body/RaceScore", "Content/Modifiers/BodyModifier", "Engine/Flags", "Content/Settings", "Content/Menus/InGame/GameOverMenu"], function (require, exports, Consumable_1, ConsumableName_1, SMath_1, BreastRow_1, Cock_1, Ears_1, Eyes_1, Face_1, Hair_1, Legs_1, Skin_1, Tail_1, ItemDesc_1, CockDescriptor_1, Reptilum_1, ContentView_1, RaceScore_1, BodyModifier_1, Flags_1, Settings_1, GameOverMenu_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ferretFruitFlags = Flags_1.Flags.register("Ferret Fruit", {
        FERRET_BAD_END_WARNING: 0,
    });
    class FerretFruit extends Consumable_1.Consumable {
        constructor() {
            super(ConsumableName_1.ConsumableName.FerretFruit, new ItemDesc_1.ItemDesc("Frrtfrt", "a ferret fruit", "This fruit is curved oddly, just like the tree it came from.  The skin is fuzzy and brown, like the skin of a peach."));
        }
        use(character) {
            // CoC Ferret TF (Ferret Fruit)
            // Finding Ferret Fruit
            // - Ferret Fruit may be strand found while exploring the plains.
            // - Upon finding Ferret Fruit: 'While searching the plains, you find an odd little tree with a curved trunk. The shape of its fruit appears to mimic that of the tree. A few of the fruits seem to have fallen off. You brush the dirt off of one of the fruits before placing in in your (x) pouch. (if there is no room in your inventory, you get the generic option to use now or abandon)
            // - If you hover over the fruit in your inventory, this is its description:  'This fruit is curved oddly, just like the tree it came from.  The skin is fuzzy and brown, like the skin of a peach.'
            // -Upon eating the fruit:
            ContentView_1.CView.clear();
            ContentView_1.CView.text("Feeling parched, you gobble down the fruit without much hesitation. Despite the skin being fuzzy like a peach, the inside is relatively hard, and its taste reminds you of that of an apple.  It even has a core like an apple. Finished, you toss the core aside.");
            const chest = character.body.chest;
            const cocks = character.body.cocks;
            // BAD END:
            if (RaceScore_1.ferretRaceScore(character) >= 6) {
                // Get warned!
                if (exports.ferretFruitFlags.FERRET_BAD_END_WARNING === 0) {
                    ContentView_1.CView.text("\n\nYou find yourself staring off into the distance, dreaming idly of chasing rabbits through a warren.  You shake your head, returning to reality.  <b>Perhaps you should cut back on all the Ferret Fruit?</b>");
                    character.stats.int -= 5 + SMath_1.randInt(3);
                    if (character.stats.int < 5)
                        character.stats.int = 5;
                    exports.ferretFruitFlags.FERRET_BAD_END_WARNING = 1;
                }
                // BEEN WARNED! BAD END! DUN DUN DUN
                else if (SMath_1.randInt(3) === 0) {
                    // -If you fail to heed the warning, it's game over:
                    ContentView_1.CView.text("\n\nAs you down the fruit, you begin to feel all warm and fuzzy inside.  You flop over on your back, eagerly removing your clothes.  You laugh giddily, wanting nothing more than to roll about happily in the grass.  Finally finished, you attempt to get up, but something feels...  different.  Try as you may, you find yourself completely unable to stand upright for a long period of time.  You only manage to move about comfortably on all fours.  Your body now resembles that of a regular ferret.  That can't be good!  As you attempt to comprehend your situation, you find yourself less and less able to focus on the problem.  Your attention eventually drifts to a rabbit in the distance.  You lick your lips. Nevermind that, you have warrens to raid!");
                    return { next: GameOverMenu_1.gameOverMenu };
                }
            }
            // Reset the warning if ferret score drops.
            else {
                exports.ferretFruitFlags.FERRET_BAD_END_WARNING = 0;
            }
            let changes = 0;
            let changeLimit = 1;
            if (SMath_1.randInt(2) === 0)
                changeLimit++;
            if (SMath_1.randInt(2) === 0)
                changeLimit++;
            if (SMath_1.randInt(3) === 0)
                changeLimit++;
            // Ferret Fruit Effects
            // - + Thin:
            if (character.body.thickness > 15 && changes < changeLimit && SMath_1.randInt(3) === 0) {
                ContentView_1.CView.text("\n\nEach movement feels a tiny bit easier than the last.  Did you just lose a little weight!? (+2 thin)");
                character.body.thickness -= 2;
                changes++;
            }
            // - If speed is > 80, increase speed:
            if (character.stats.spe < 80 && SMath_1.randInt(3) === 0 && changes < changeLimit) {
                ContentView_1.CView.text("\n\nYour muscles begin to twitch rapidly, but the feeling is not entirely unpleasant.  In fact, you feel like running.");
                character.stats.spe += 1;
                changes++;
            }
            // - If male with a hip rating >4 or a female/herm with a hip rating >6:
            if (((cocks.length <= 0 && character.body.hips.rating > 6) || (cocks.length > 0 && character.body.hips.rating > 4)) && SMath_1.randInt(3) === 0 && changes < changeLimit) {
                ContentView_1.CView.text("\n\nA warm, tingling sensation arises in your [hips].  Immediately, you reach down to them, concerned.  You can feel a small portion of your [hips] dwindling away under your hands.");
                character.body.hips.rating--;
                if (character.body.hips.rating > 10)
                    character.body.hips.rating--;
                if (character.body.hips.rating > 15)
                    character.body.hips.rating--;
                if (character.body.hips.rating > 20)
                    character.body.hips.rating--;
                if (character.body.hips.rating > 23)
                    character.body.hips.rating--;
                changes++;
            }
            // - If butt rating is greater than 'petite':
            if (character.body.butt.rating >= 8 && SMath_1.randInt(3) === 0 && changes < changeLimit) {
                ContentView_1.CView.text("\n\nYou cringe as your [butt] begins to feel uncomfortably tight.  Once the sensation passes, you look over your shoulder, inspecting yourself.  It would appear that your ass has become smaller!");
                character.body.butt.rating--;
                if (character.body.butt.rating > 10)
                    character.body.butt.rating--;
                if (character.body.butt.rating > 15)
                    character.body.butt.rating--;
                if (character.body.butt.rating > 20)
                    character.body.butt.rating--;
                if (character.body.butt.rating > 23)
                    character.body.butt.rating--;
                changes++;
            }
            // -If male with breasts or female/herm with breasts > B cup:
            if (!Settings_1.Settings.hyperHappy && (chest.sort(BreastRow_1.BreastRow.Largest).get(0).rating > 2 || (cocks.length > 0 && chest.sort(BreastRow_1.BreastRow.Largest).get(0).rating >= 1)) && SMath_1.randInt(2) === 0 && changes < changeLimit) {
                ContentView_1.CView.text("\n\nYou cup your tits as they begin to tingle strangely.  You can actually feel them getting smaller in your hands!");
                for (const breastRow of chest)
                    if (breastRow.rating > 2 || (cocks.length > 0 && breastRow.rating >= 1))
                        breastRow.rating--;
                changes++;
                // (this will occur incrementally until they become flat, manly breasts for males, or until they are A or B cups for females/herms)
            }
            // -If penis size is > 6 inches:
            if (cocks.length > 0) {
                // Find longest cock
                const longestCock = cocks.sort(Cock_1.Cock.Longest).get(0);
                if (SMath_1.randInt(2) === 0 && changes < changeLimit) {
                    if (longestCock.length > 6 && !Settings_1.Settings.hyperHappy) {
                        ContentView_1.CView.text("\n\nA pinching sensation racks the entire length of your " + CockDescriptor_1.describeCock(character, longestCock) + ".  Within moments, the sensation is gone, but it appears to have become smaller.");
                        longestCock.length--;
                        if (SMath_1.randInt(2) === 0)
                            longestCock.length--;
                        if (longestCock.length >= 9)
                            longestCock.length -= SMath_1.randInt(3) + 1;
                        if (longestCock.length / 6 >= longestCock.thickness)
                            ContentView_1.CView.text("  Luckily, it doen't seem to have lost its previous thickness.");
                        else
                            longestCock.thickness = longestCock.length / 6;
                        changes++;
                    }
                }
            }
            // -If the PC has quad nipples:
            if (chest.reduce(BreastRow_1.BreastRow.AverageNipplesPerBreast, 0) > 1 && SMath_1.randInt(4) === 0 && changes < changeLimit) {
                ContentView_1.CView.text("\n\nA tightness arises in your nipples as three out of four on each breast recede completely, the leftover nipples migrating to the middle of your breasts.  <b>You are left with only one nipple on each breast.</b>");
                for (const breastRow of chest) {
                    breastRow.nipples.count = 1;
                }
                changes++;
            }
            // If the PC has gills:
            if (character.body.neck.gills && SMath_1.randInt(4) === 0 && changes < changeLimit) {
                ContentView_1.CView.text("\n\nYou grit your teeth as a stinging sensation arises in your gills.  Within moments, the sensation passes, and <b>your gills are gone!</b>");
                character.body.neck.gills = false;
                changes++;
            }
            // If the PC has tentacle hair:
            if (character.body.hair.type === Hair_1.HairType.ANEMONE && SMath_1.randInt(4) === 0 && changes < changeLimit) {
                ContentView_1.CView.text("\n\nYour head feels strange as the tentacles you have for hair begin to recede back into your scalp, eventually leaving you with a bald head.  Your head is not left bald for long, though.  Within moments, a full head of hair sprouts from the skin of your scalp.  <b>Your hair is normal again!</b>");
                // Turn hair growth on.
                Reptilum_1.ReptilumFlags.HAIR_GROWTH_STOPPED_BECAUSE_LIZARD = 0;
                character.body.hair.type = 0;
                changes++;
            }
            // If the PC has goo hair:
            if (character.body.hair.type === Hair_1.HairType.GOO && SMath_1.randInt(3) === 0 && changes < changeLimit) {
                ContentView_1.CView.text("\n\nYour gooey hair begins to fall out in globs, eventually leaving you with a bald head.  Your head is not left bald for long, though.  Within moments, a full head of hair sprouts from the skin of your scalp.  <b>Your hair is normal again!</b>");
                // Turn hair growth on.
                Reptilum_1.ReptilumFlags.HAIR_GROWTH_STOPPED_BECAUSE_LIZARD = 0;
                character.body.hair.type = 0;
                changes++;
            }
            // If the PC has four eyes:
            if (character.body.eyes.type === Eyes_1.EyeType.FOUR_SPIDER_EYES && SMath_1.randInt(3) === 0 && changes < changeLimit) {
                ContentView_1.CView.text("\n\nYour two forehead eyes start throbbing painfully, your sight in them eventually going dark.  You touch your forehead to inspect your eyes, only to find out that they have disappeared.  <b>You only have two eyes now!</b>");
                character.body.eyes.type = 0;
                changes++;
            }
            // Go into heat
            if (SMath_1.randInt(3) === 0 && changes < changeLimit) {
                if (character.canGoIntoHeat()) {
                    BodyModifier_1.displayGoIntoHeat(character);
                    changes++;
                }
            }
            // Turn ferret mask to full furface.
            if (character.body.face.type === Face_1.FaceType.FERRET_MASK && character.body.skin.type === Skin_1.SkinType.FUR && character.body.ears.type === Ears_1.EarType.FERRET && character.body.tails.reduce(Tail_1.Tail.HasType(Tail_1.TailType.FERRET), false) && character.body.legs.type === Legs_1.LegType.FERRET && SMath_1.randInt(4) === 0 && changes < changeLimit) {
                ContentView_1.CView.text("\n\nYou cry out in pain as the bones in your face begin to break and rearrange.  You rub your face furiously in an attempt to ease the pain, but to no avail.  As the sensations pass, you examine your face in a nearby puddle.  <b>You nearly gasp in shock at the sight of your new ferret face!</b>");
                character.body.face.type = Face_1.FaceType.FERRET;
                changes++;
            }
            // If face is human:
            if (character.body.face.type === 0 && SMath_1.randInt(3) === 0 && changes < changeLimit) {
                ContentView_1.CView.text("\n\nA horrible itching begins to encompass the area around your eyes.  You grunt annoyedly, rubbing furiously at the afflicted area.  Once the feeling passes, you make your way to the nearest reflective surface to see if anything has changed.  Your suspicions are confirmed.  The [skinFurScales] around your eyes has darkened.  <b>You now have a ferret mask!</b>");
                character.body.face.type = Face_1.FaceType.FERRET_MASK;
                changes++;
            }
            // If face is not ferret, has ferret ears, tail, and legs:
            if (character.body.face.type !== Face_1.FaceType.HUMAN && character.body.face.type !== Face_1.FaceType.FERRET_MASK && character.body.face.type !== Face_1.FaceType.FERRET && SMath_1.randInt(3) === 0 && changes < changeLimit) {
                ContentView_1.CView.text("\n\nYou groan uncomfortably as the bones in your [face] begin to rearrange.  You grab your head with both hands, rubbing at your temples in an attempt to ease the pain.  As the shifting stops, you frantically feel at your face.  The familiar feeling is unmistakable.  <b>Your face is human again!</b>");
                character.body.face.type = 0;
                changes++;
            }
            // No fur, has ferret ears, tail, and legs:
            if (character.body.skin.type !== Skin_1.SkinType.FUR && character.body.ears.type === Ears_1.EarType.FERRET && character.body.tails.reduce(Tail_1.Tail.HasType(Tail_1.TailType.FERRET), false) && character.body.legs.type === Legs_1.LegType.FERRET && SMath_1.randInt(4) === 0 && changes < changeLimit) {
                ContentView_1.CView.text("\n\nYour skin starts to itch like crazy as a thick coat of fur sprouts out of your skin.");
                // If hair was not sandy brown, silver, white, or brown
                if (character.body.hair.color !== "sandy brown" && character.body.hair.color !== "silver" && character.body.hair.color !== "white" && character.body.hair.color !== "brown") {
                    ContentView_1.CView.text("\n\nOdder still, all of your hair changes to ");
                    if (SMath_1.randInt(4) === 0)
                        character.body.hair.color = "sandy brown";
                    else if (SMath_1.randInt(3) === 0)
                        character.body.hair.color = "silver";
                    else if (SMath_1.randInt(2) === 0)
                        character.body.hair.color = "white";
                    else
                        character.body.hair.color = "brown";
                    ContentView_1.CView.text(".");
                }
                ContentView_1.CView.text("  <b>You now have " + character.body.hair.color + " fur!</b>");
                character.body.skin.type = Skin_1.SkinType.FUR;
                changes++;
            }
            // Tail TFs!
            if (!character.body.tails.reduce(Tail_1.Tail.HasType(Tail_1.TailType.FERRET), false) && character.body.ears.type === Ears_1.EarType.FERRET && SMath_1.randInt(3) === 0 && changes < changeLimit) {
                // If ears are ferret, no tail:
                if (character.body.tails.length === 0) {
                    ContentView_1.CView.text("\n\nYou slump to the ground as you feel your spine lengthening and twisting, sprouting fur as it finishes growing.  Luckily the new growth does not seem to have ruined your [armor].  <b>You now have a ferret tail!</b>");
                }
                // Placeholder for any future TFs that will need to be made compatible with this one
                // centaur, has ferret ears:
                else if (character.body.tails.reduce(Tail_1.Tail.HasType(Tail_1.TailType.HORSE), false) && character.body.legs.isTaur())
                    ContentView_1.CView.text("\n\nYou shiver as the wind gets to your tail, all of its shiny bristles having fallen out.  Your tail then begins to lengthen, warming back up as it sprouts a new, shaggier coat of fur.  This new, mismatched tail looks a bit odd on your horse lower body.  <b>You now have a ferret tail!</b>");
                // If tail is harpy, has ferret ears:
                else if (character.body.tails.reduce(Tail_1.Tail.HasType(Tail_1.TailType.HARPY), false))
                    ContentView_1.CView.text("\n\nYou feel a soft tingle as your tail feathers fall out one by one.  The little stump that once held the feathers down begins to twist and lengthen before sprouting soft, fluffy fur.  <b>You now have a ferret tail!</b>");
                // If tail is bunny, has ferret ears:
                else if (character.body.tails.reduce(Tail_1.Tail.HasType(Tail_1.TailType.BUNNY), false))
                    ContentView_1.CView.text("\n\nYou feel a pressure at the base of your tiny, poofy bunny tail as it begins to lengthen, gaining at least another foot in length.  <b>You now have a ferret tail!</b>");
                // If tail is reptilian/draconic, has ferret ears:
                else if (character.body.tails.reduce(Tail_1.Tail.HasType(Tail_1.TailType.DRACONIC), false) || character.body.tails.reduce(Tail_1.Tail.HasType(Tail_1.TailType.LIZARD), false))
                    ContentView_1.CView.text("\n\nYou reach a hand behind yourself to rub at your backside as your tail begins to twist and warp, becoming much thinner than before.  It then sprouts a thick coat of fur.  <b>You now have a ferret tail!</b>");
                // If tail is cow, has ferret ears:
                else if (character.body.tails.reduce(Tail_1.Tail.HasType(Tail_1.TailType.COW), false))
                    ContentView_1.CView.text("\n\nYour tail begins to itch slightly as the poof at the end of your tail begins to spread across its entire surface, making all of its fur much more dense than it was before. It also loses a tiny bit of its former length. <b>You now have a ferret tail!</b>");
                // If tail is cat, has ferret ears:
                else if (character.body.tails.reduce(Tail_1.Tail.HasType(Tail_1.TailType.CAT), false))
                    ContentView_1.CView.text("\n\nYour tail begins to itch as its fur becomes much denser than it was before.  It also loses a tiny bit of its former length.  <b>You now have a ferret tail!</b>");
                // If tail is dog, has ferret ears:
                else if (character.body.tails.reduce(Tail_1.Tail.HasType(Tail_1.TailType.DOG), false))
                    ContentView_1.CView.text("\n\nSomething about your tail feels... different.  You reach behind yourself, feeling it.  It feels a bit floppier than it was before, and the fur seems to have become a little more dense.  <b>You now have a ferret tail!</b>");
                // If tail is kangaroo, has ferret ears:
                else if (character.body.tails.reduce(Tail_1.Tail.HasType(Tail_1.TailType.KANGAROO), false))
                    ContentView_1.CView.text("\n\nYour tail becomes uncomfortably tight as the entirety of its length begins to lose a lot of its former thickness.  The general shape remains tapered, but its fur has become much more dense and shaggy.  <b>You now have a ferret tail!</b>");
                // If tail is fox, has ferret ears:
                else if (character.body.tails.reduce(Tail_1.Tail.HasType(Tail_1.TailType.FOX), false))
                    ContentView_1.CView.text("\n\nYour tail begins to itch as its fur loses a lot of its former density.  It also appears to have lost a bit of length.  <b>You now have a ferret tail!</b>");
                // If tail is raccoon, has ferret ears:
                else if (character.body.tails.reduce(Tail_1.Tail.HasType(Tail_1.TailType.RACCOON), false))
                    ContentView_1.CView.text("\n\nYour tail begins to itch as its fur loses a lot of its former density, losing its trademark ring pattern as well.  It also appears to have lost a bit of length.  <b>You now have a ferret tail!</b>");
                // If tail is horse, has ferret ears:
                else if (character.body.tails.reduce(Tail_1.Tail.HasType(Tail_1.TailType.HORSE), false))
                    ContentView_1.CView.text("\n\nYou shiver as the wind gets to your tail, all of its shiny bristles having fallen out.  Your tail then begins to lengthen, warming back up as it sprouts a new, shaggier coat of fur.  <b>You now have a ferret tail!</b>");
                // If tail is mouse, has ferret ears:
                else if (character.body.tails.reduce(Tail_1.Tail.HasType(Tail_1.TailType.MOUSE), false))
                    ContentView_1.CView.text("\n\nYour tail begins to itch as its bald surface begins to sprout a thick layer of fur.  It also appears to have lost a bit of its former length.  <b>You now have a ferret tail!</b>");
                else
                    ContentView_1.CView.text("\n\nYour tail begins to itch a moment before it starts writhing, your back muscles spasming as it changes shape. Before you know it, <b>your tail has reformed into a narrow, ferret's tail.</b>");
                character.body.tails.clear();
                const newTail = new Tail_1.Tail();
                newTail.type = Tail_1.TailType.FERRET;
                character.body.tails.add(newTail);
                changes++;
            }
            // If naga, has ferret ears:
            // (NOTE: this is the only exception to the legs coming after the tail, as the ferret tail will only go away right after it appears because of your snake lower half)
            else if (character.body.legs.isNaga() && character.body.ears.type === Ears_1.EarType.FERRET && SMath_1.randInt(4) === 0 && changes < changeLimit) {
                ContentView_1.CView.text("\n\nYou scream in agony as a horrible pain racks the entire length of your snake-like coils.  Unable to take it anymore, you pass out.  When you wake up, you're shocked to find that you no longer have the lower body of a snake.  Instead, you have soft, furry legs that resemble that of a ferret's.  <b>You now have ferret legs!</b>");
                changes++;
                character.body.legs.type = Legs_1.LegType.FERRET;
            }
            // If legs are not ferret, has ferret ears and tail
            if (character.body.legs.type !== Legs_1.LegType.FERRET && character.body.ears.type === Ears_1.EarType.FERRET && character.body.tails.reduce(Tail_1.Tail.HasType(Tail_1.TailType.FERRET), false) && SMath_1.randInt(4) === 0 && changes < changeLimit) {
                // -If centaur, has ferret ears and tail:
                if (character.body.legs.isTaur())
                    ContentView_1.CView.text("\n\nYou scream in agony as a horrible pain racks your entire horse lower half.  Unable to take it anymore, you pass out.  When you wake up, you're shocked to find that you no longer have the lower body of a horse.  Instead, you have soft, furry legs that resemble that of a ferret's.  <b>You now have ferret legs!</b>");
                ContentView_1.CView.text("\n\nYou scream in agony as the bones in your legs begin to break and rearrange.  Even as the pain passes, an uncomfortable combination of heat and throbbing continues even after the transformation is over.  You rest for a moment, allowing the sensations to subside.  Now feeling more comfortable, <b>you stand up, ready to try out your new ferret legs!</b>");
                changes++;
                character.body.legs.type = Legs_1.LegType.FERRET;
            }
            // If ears are not ferret:
            if (character.body.ears.type !== Ears_1.EarType.FERRET && SMath_1.randInt(4) === 0 && changes < changeLimit && SMath_1.randInt(2.5) === 0 && changes < changeLimit) {
                ContentView_1.CView.text("\n\nYou squint as you feel a change in your ears.  Inspecting your reflection in a nearby puddle you find that <b>your ears have become small, fuzzy, and rounded, just like a ferret's!</b>");
                character.body.ears.type = Ears_1.EarType.FERRET;
                changes++;
            }
            // If no other effect occurred, fatigue decreases:
            if (changes === 0) {
                ContentView_1.CView.text("\n\nYour eyes widen.  With the consumption of the fruit, you feel much more energetic.  You're wide awake now!");
                changes++;
                character.stats.fatigue -= 10;
            }
        }
    }
    exports.FerretFruit = FerretFruit;
});
//# sourceMappingURL=FerretFruit.js.map