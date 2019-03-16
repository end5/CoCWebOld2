define(["require", "exports", "Engine/Flags", "Engine/Utilities/SMath", "Content/Effects/EffectType", "Engine/Display/ContentView", "Content/Scenes/PassTime", "Engine/Body/Cock", "Engine/Combat/CombatManager", "Content/Descriptors/GenderDescriptor", "Content/Descriptors/LegDescriptor", "Content/Descriptors/CockDescriptor", "Content/Descriptors/VaginaDescriptor", "Content/Items/MaterialName", "Content/Utilities/NumToText", "Content/Descriptors/HipDescriptor", "Engine/Body/BreastRow", "Content/Descriptors/BreastDescriptor", "Content/Descriptors/BallsDescriptor", "Content/Descriptors/ButtDescriptor", "Engine/Body/Vagina", "Engine/Body/Legs", "./Forest/TamanisDaughtersScene", "./Forest/TamaniScene", "./Forest/TentacleBeastScene", "./Forest/CorruptedGlade", "./Forest/BeeGirlScene", "./Forest/Essrayle", "./BeyondCamp/ImpLordScene", "./BeyondCamp/Imp", "./BeyondCamp/Goblin", "./BeyondCamp/Giacomo", "./Deepwoods", "Content/Scenes/NotImplemented", "Content/Combat/Encounter"], function (require, exports, Flags_1, SMath_1, EffectType_1, ContentView_1, PassTime_1, Cock_1, CombatManager_1, GenderDescriptor_1, LegDescriptor_1, CockDescriptor_1, VaginaDescriptor_1, MaterialName_1, NumToText_1, HipDescriptor_1, BreastRow_1, BreastDescriptor_1, BallsDescriptor_1, ButtDescriptor_1, Vagina_1, Legs_1, TamanisDaughtersScene_1, TamaniScene_1, TentacleBeastScene_1, CorruptedGlade_1, BeeGirlScene_1, Essrayle_1, ImpLordScene_1, Imp_1, Goblin_1, Giacomo_1, Deepwoods_1, NotImplemented_1, Encounter_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    // $> Reimplement this later
    exports.ForestFlags = Flags_1.Flags.register("Forest", {
        TIMES_EXPLORED: 0,
    });
    /**
     * Created by aimozg on 06.01.14.
     */
    // Explore forest
    function exploreForest(player) {
        exports.ForestFlags.TIMES_EXPLORED++;
        let chooser = SMath_1.randInt(4);
        let dickDragChance = 0;
        // Cut bee encounter rate 50%
        if (chooser === 3 && SMath_1.randInt(2))
            chooser = SMath_1.randInt(3);
        // Chance to discover deepwoods
        if ((exports.ForestFlags.TIMES_EXPLORED >= 20) && Deepwoods_1.DeepwoodsFlags.TIMES_EXPLORED === 0) {
            Deepwoods_1.DeepwoodsFlags.TIMES_EXPLORED++;
            ContentView_1.CView.clear().text("After exploring the forest so many times, you decide to really push it, and plunge deeper and deeper into the woods.  The further you go the darker it gets, but you courageously press on.  The plant-life changes too, and you spot more and more lichens and fungi, many of which are luminescent.  Finally, a wall of tree-trunks as wide as houses blocks your progress.  There is a knot-hole like opening in the center, and a small sign marking it as the entrance to the 'Deepwoods'.  You don't press on for now, but you could easily find your way back to explore the Deepwoods.\n\n<b>Deepwoods exploration unlocked!</b>");
            return { next: PassTime_1.passTime(1) };
        }
        // Essy every 20 explores or so
        if ((SMath_1.randInt(100) <= 1) && player.gender > 0 && (Essrayle_1.EssrayleFlags.ESSY_MET_IN_DUNGEON === 0 || Essrayle_1.EssrayleFlags.TOLD_MOTHER_TO_RELEASE_ESSY === 1)) {
            return Essrayle_1.essrayleMeetingI(player);
        }
        // Chance of dick-dragging! 10% + 10% per two foot up to 30%
        dickDragChance = 10 + (player.body.cocks.sort(Cock_1.Cock.Longest).get(0).length - player.body.tallness) / 24 * 10;
        if (dickDragChance > 30)
            dickDragChance = 30;
        if (dickDragChance > SMath_1.randInt(100) && player.body.cocks.sort(Cock_1.Cock.Longest).get(0).length >= player.body.tallness && player.body.cocks.reduce(Cock_1.Cock.TotalThickness, 0) >= 12) {
            return bigJunkForestScene(player);
        }
        if (chooser === 0) {
            // Determines likelyhood of imp/goblins
            // Below - goblin, Equal and up - imp
            let impGob = 5;
            // Dicks + lots of cum boosts goblin probability
            // Vags + Fertility boosts imp probability
            if (player.body.cocks.length > 0)
                impGob--;
            if (player.body.vaginas.length > 0)
                impGob++;
            if (player.totalFertility() >= 30)
                impGob++;
            if (player.cumQ() >= 200)
                impGob--;
            if (player.effects.has(EffectType_1.EffectType.PiercedLethite)) {
                if (impGob <= 3)
                    impGob += 2;
                else if (impGob < 7)
                    impGob = 7;
            }
            // Imptacular Encounter
            if (SMath_1.randInt(10) < impGob) {
                if (player.stats.level >= 8 && SMath_1.randInt(2) === 0) {
                    return ImpLordScene_1.impLordEncounter(player);
                }
                else {
                    ContentView_1.CView.clear().text("An imp leaps out of the bushes and attacks!");
                    return CombatManager_1.CombatManager.beginBattle(new Encounter_1.Encounter(player, new Imp_1.Imp()));
                }
            }
            // Encounter Gobbalin!
            else {
                // Tamani 25% of all goblin encounters encounter rate
                if (SMath_1.randInt(4) <= 0 && TamaniScene_1.TamaniFlags.TAMANI_TIME_OUT === 0 && player.gender > 0 && (player.body.cocks.length > 0 || !TamaniScene_1.TamaniFlags.DELUXE_DILDO)) {
                    if (player.body.cocks.length > 0 && TamanisDaughtersScene_1.TamanisDaughtersFlags.TAMANI_DAUGHTER_PREGGO_COUNTDOWN === 0 && TamaniScene_1.TamaniFlags.TAMANI_NUMBER_OF_DAUGHTERS >= 24) {
                        return TamanisDaughtersScene_1.encounterTamanisDaughters(player);
                    }
                    else
                        return TamaniScene_1.encounterTamani(player);
                }
                if (player.gender > 0) {
                    ContentView_1.CView.clear().text("A goblin saunters out of the bushes with a dangerous glint in her eyes.\n\nShe says, \"<i>Time to get fucked, " + GenderDescriptor_1.mf(player, "stud", "slut"));
                    ContentView_1.CView.text(".</i>\"");
                    return CombatManager_1.CombatManager.beginBattle(new Encounter_1.Encounter(player, new Goblin_1.Goblin()));
                }
                else {
                    ContentView_1.CView.clear().text("A goblin saunters out of the bushes with a dangerous glint in her eyes.\n\nShe says, \"<i>Time to get fuc-oh shit, you don't even have anything to play with!  This is for wasting my time!");
                    ContentView_1.CView.text("</i>\"");
                    return CombatManager_1.CombatManager.beginBattle(new Encounter_1.Encounter(player, new Goblin_1.Goblin()));
                }
            }
        }
        if (chooser === 1) {
            return NotImplemented_1.sceneNotImplimented();
        }
        // Tentacles 25% of the time...
        if (chooser === 2) {
            dickDragChance = SMath_1.randInt(5);
            // Oh noes, tentacles!
            if (dickDragChance === 0) {
                // Tentacle avoidance chance due to dangerous plants
                if (Giacomo_1.GiacomoFlags.DangerousPlants && player.stats.int / 2 > SMath_1.randInt(50)) {
                    ContentView_1.CView.text("Using the knowledge contained in your 'Dangerous Plants' book, you determine a tentacle beast's lair is nearby, do you continue?  If not you could return to camp.\n\n");
                    return { choices: [["Continue", TentacleBeastScene_1.encounter], ["", undefined], ["", undefined], ["", undefined], ["Leave", PassTime_1.passTime(1)]] };
                }
                else {
                    return TentacleBeastScene_1.encounter(player);
                }
            }
            if (dickDragChance === 1) {
                if (player.stats.cor < 80) {
                    ContentView_1.CView.text("You enjoy a peaceful walk in the woods, it gives you time to think.");
                    player.stats.tou += .5;
                    player.stats.int += 1;
                }
                else {
                    ContentView_1.CView.text("As you wander in the forest, you keep ");
                    if (player.gender === 1)
                        ContentView_1.CView.text("stroking your half-erect " + CockDescriptor_1.describeCocksLight(player) + " as you daydream about fucking all kinds of women, from weeping tight virgins to lustful succubi with gaping, drooling fuck-holes.");
                    if (player.gender === 2)
                        ContentView_1.CView.text("idly toying with your " + VaginaDescriptor_1.describeVagina(player, player.body.vaginas.get(0)) + " as you daydream about getting fucked by all kinds of monstrous cocks, from minotaurs' thick, smelly dongs to demons' towering, bumpy pleasure-rods.");
                    if (player.gender === 3)
                        ContentView_1.CView.text("stroking alternatively your " + CockDescriptor_1.describeCocksLight(player) + " and your " + VaginaDescriptor_1.describeVagina(player, player.body.vaginas.get(0)) + " as you daydream about fucking all kinds of women, from weeping tight virgins to lustful succubi with gaping, drooling fuck-holes, before, or while, getting fucked by various monstrous cocks, from minotaurs' thick, smelly dongs to demons' towering, bumpy pleasure-rods.");
                    if (player.gender === 0)
                        ContentView_1.CView.text("daydreaming about sex-demons with huge sexual attributes, and how you could please them.");
                    player.stats.tou += .5;
                    player.stats.lib += .25;
                    player.stats.lust += player.stats.lib / 5;
                }
                return { next: PassTime_1.passTime(1) };
            }
            // CORRUPTED GLADE
            if (dickDragChance === 2 || dickDragChance >= 4) {
                return CorruptedGlade_1.intro(player);
            }
            // Trip on a root!
            if (dickDragChance === 3) {
                ContentView_1.CView.text("You trip on an exposed root, scraping yourself somewhat, but otherwise the hour is uneventful.");
                player.stats.HP -= 10;
                return { next: PassTime_1.passTime(1) };
            }
        }
        // Bee-girl encounter
        if (chooser === 3) {
            if (SMath_1.randInt(10) === 0) {
                ContentView_1.CView.clear().text("You find a large piece of insectile carapace obscured in the ferns to your left.  It's mostly black with a thin border of bright yellow along the outer edge.  There's still a fair portion of yellow fuzz clinging to the chitinous shard.  It feels strong and flexible - maybe someone can make something of it.  ");
                return player.inventory.items.createAdd(player, MaterialName_1.MaterialName.BlackChitin, PassTime_1.passTime(1));
            }
            return BeeGirlScene_1.beeEncounter(player);
        }
        throw new Error("Error: Couldn't find scene to display");
    }
    exports.exploreForest = exploreForest;
    // [FOREST]
    // [RANDOM SCENE IF CHARACTER HAS AT LEAST ONE COCK LARGER THAN THEIR HEIGHT, AND THE TOTAL COMBINED WIDTH OF ALL THEIR COCKS IS TWELVE INCHES OR GREATER]
    function bigJunkForestScene(player, lake = false) {
        const firstCock = player.body.cocks.sort(Cock_1.Cock.Longest).get(0);
        // PARAGRAPH 1
        ContentView_1.CView.text("Walking along the ");
        if (lake)
            ContentView_1.CView.text("grassy and muddy shores of the lake");
        else
            ContentView_1.CView.text("various paths of the forest");
        ContentView_1.CView.text(", you find yourself increasingly impeded by the bulk of your " + CockDescriptor_1.describeCock(player, firstCock) + " dragging along the ");
        if (lake)
            ContentView_1.CView.text("wet ground behind you.");
        else
            ContentView_1.CView.text("earth behind you.");
        if (player.body.cocks.length === 1) {
            if (lake)
                ContentView_1.CView.text("  As it drags through the lakeside mud, the sensation forces you to imagine the velvety folds of a monstrous pussy sliding along the head of your " + CockDescriptor_1.nounCock(firstCock.type) + ", gently attempting to suck it off.");
            else
                ContentView_1.CView.text("  As it drags across the grass, twigs, and exposed tree roots, the sensation forces you to imagine the fingers of a giant hand sliding along the head of your " + CockDescriptor_1.nounCock(firstCock.type) + ", gently jerking it off.");
        }
        else if (player.body.cocks.length >= 2) {
            if (lake)
                ContentView_1.CView.text("  With all of your " + CockDescriptor_1.describeCocksLight(player) + " dragging through the mud, they begin feeling as if the lips of " + NumToText_1.numToCardinalText(player.body.cocks.length) + " different cunts were slobbering over each one.");
            else
                ContentView_1.CView.text("  With all of your " + CockDescriptor_1.describeCocksLight(player) + " dragging across the grass, twigs, and exposed tree roots, they begin feeling as if the rough fingers of " + NumToText_1.numToCardinalText(player.body.cocks.length) + " different monstrous hands were sliding over each shaft, gently jerking them off.");
        }
        ContentView_1.CView.text("\n\n");
        // PARAGRAPH 2
        // FOR NON-CENTAURS]
        if (!player.body.legs.isTaur()) {
            ContentView_1.CView.text("The impending erection can't seem to be stopped.  Your sexual frustration forces stiffness into your " + CockDescriptor_1.describeCocksLight(player) + ", which forces your torso to the ground.  Normally your erection would merely raise itself skyward, but your genitals have grown too large and heavy for your " + HipDescriptor_1.describeHips(player) + " to hold them aloft.  Instead, you feel your body forcibly pivoting at the hips until your torso is compelled to rest face down atop your " + CockDescriptor_1.describeCocksLight(player) + ".");
            // IF CHARACTER HAS GIANT BREASTS ADD SENTENCE
            if (player.body.chest.sort(BreastRow_1.BreastRow.Largest).get(0).rating >= 35) {
                if (lake)
                    ContentView_1.CView.text("  Your " + BreastDescriptor_1.describeChest(player) + " hang lewdly off your torso to rest in the lakeside mud, covering much of the ground to either side of you.  Their immense weight anchors your body, further preventing your torso from lifting itself up.  Mud cakes against their undersides and coats your " + BreastDescriptor_1.describeNipple(player, player.body.chest.get(0)) + "s.");
                else
                    ContentView_1.CView.text("  Your " + BreastDescriptor_1.describeChest(player) + " hang lewdly off your torso to rest on the twings and dirt, covering up much of the ground to either side of you.  Their immense weight anchors your body, further preventing your torso from lifting itself up.  The rough texture of the bark on various tree roots teases your " + BreastDescriptor_1.describeNipple(player, player.body.chest.get(0)) + "s mercilessly.");
            }
            // IF CHARACTER HAS A BALLS ADD SENTENCE
            if (player.body.balls.count > 0) {
                ContentView_1.CView.text("  Your " + player.body.skin.tone + " " + BallsDescriptor_1.describeSack(player) + " rests beneath your raised " + ButtDescriptor_1.describeButt(player) + ".  Your " + BallsDescriptor_1.describeBalls(true, true, player) + " pulse with the need to release their sperm through your " + CockDescriptor_1.describeCocksLight(player) + " and ");
                if (lake)
                    ContentView_1.CView.text("into the waters of the nearby lake.");
                else
                    ContentView_1.CView.text("onto the fertile soil of the forest.");
            }
            // IF CHARACTER HAS A VAGINA ADD SENTENCE
            if (player.body.vaginas.length >= 1) {
                ContentView_1.CView.text("  Your " + VaginaDescriptor_1.describeVagina(player, player.body.vaginas.get(0)) + " and " + VaginaDescriptor_1.describeClit(player) + " are thoroughly squashed between the bulky flesh where your male genitals protrude from between your hips and the " + ButtDescriptor_1.describeButt(player) + " above.");
                // IF CHARACTER HAS A DROOLING PUSSY ADD SENTENCE
                if (player.body.vaginas.get(0).wetness >= Vagina_1.VaginaWetness.DROOLING) {
                    ContentView_1.CView.text("  Juices stream from your womanhood and begin pooling on the dirt and twigs beneath you.  ");
                    if (lake)
                        ContentView_1.CView.text("The drooling fem-spunk only makes the ground more muddy.");
                    else
                        ContentView_1.CView.text("The sticky fem-spunk immediately soaks down into the rich soil.");
                }
            }
        }
        // FOR CENTAURS
        else if (player.body.legs.type === Legs_1.LegType.CENTAUR) {
            ContentView_1.CView.text("  The impending erection can't seem to be stopped.  Your sexual frustration forces stiffness into your " + CockDescriptor_1.describeCocksLight(player) + ", which forces the barrel of your horse-like torso to the ground.  Normally your erection would merely hover above the ground in between your centaurian legs, but your genitals have grown too large and heavy for your " + HipDescriptor_1.describeHips(player) + " to hold them aloft.  Instead, you feel your body being forcibly pulled down at your hind legs until your equine body is resting on top of your " + CockDescriptor_1.describeCocksLight(player) + ".");
            // IF CHARACTER HAS GIANT BREASTS ADD SENTENCE
            if (player.body.chest.sort(BreastRow_1.BreastRow.Largest).get(0).rating >= 35) {
                if (lake)
                    ContentView_1.CView.text("  Your " + BreastDescriptor_1.describeChest(player) + " pull your human torso forward until it also is forced to face the ground, obscured as it is in boob-flesh.  Your tits rest on the wet earth to either side of you.  Their immense weight anchors you, further preventing any part of your equine body from lifting itself up.  Mud cakes their undersides and coats your " + BreastDescriptor_1.describeNipple(player, player.body.chest.get(0)) + "s.");
                else
                    ContentView_1.CView.text("  Your " + BreastDescriptor_1.describeChest(player) + " pull your human torso forward until it also is forced to face the ground, obscured as it is in boob-flesh.  Your tits rest on the dirt and twigs to either side of you.  Their immense weight anchors you, further preventing any part of your equine body from lifting itself up.  The rough texture of the bark on various tree roots teases your " + BreastDescriptor_1.describeNipple(player, player.body.chest.get(0)) + "s mercilessly.");
            }
            // IF CHARACTER HAS A BALLS ADD SENTENCE
            if (player.body.balls.count > 0) {
                ContentView_1.CView.text("  Your " + player.body.skin.tone + BallsDescriptor_1.describeSack(player) + " rests beneath your raised " + ButtDescriptor_1.describeButt(player) + ".  Your " + BallsDescriptor_1.describeBalls(true, true, player) + " pulse with the need to release their sperm through your " + CockDescriptor_1.describeCocksLight(player) + " and ");
                if (lake)
                    ContentView_1.CView.text("into the waters of the nearby lake.");
                else
                    ContentView_1.CView.text("onto the fertile soil of the forest floor.");
            }
            // IF CHARACTER HAS A VAGINA ADD SENTENCE
            if (player.body.vaginas.length >= 1) {
                ContentView_1.CView.text("  Your " + VaginaDescriptor_1.describeVagina(player, player.body.vaginas.get(0)) + " and " + VaginaDescriptor_1.describeClit(player) + " are thoroughly squashed between the bulky flesh where your male genitals protrude from between your hips and the " + ButtDescriptor_1.describeButt(player) + " above.");
                // IF CHARACTER HAS A DROOLING PUSSY ADD SENTENCE
                if (player.body.vaginas.get(0).wetness >= Vagina_1.VaginaWetness.DROOLING) {
                    if (lake)
                        ContentView_1.CView.text("  A leaf falls from a tree and lands on the wet lips of your cunt, its light touch teasing your sensitive skin.  Like a mare or cow in heat, your juices stream from your womanhood and pool in the mud beneath you.  The sloppy fem-spunk only makes the ground more muddy.");
                    else
                        ContentView_1.CView.text("  A leaf falls from a tree and lands on the wet lips of your cunt, its light touch teasing your sensitive skin.  Like a mare or cow in heat, your juices stream from your womanhood and pool in the dirt and twigs beneath you.");
                }
            }
        }
        ContentView_1.CView.text("\n\n");
        // PARAGRAPH 3
        ContentView_1.CView.text("You realize you are effectively trapped here by your own body.");
        // CORRUPTION BASED CHARACTER'S VIEW OF SITUATION
        if (player.stats.cor < 33)
            ContentView_1.CView.text("  Panic slips into your heart as you realize that if any dangerous predator were to find you in this state, you'd be completely defenseless.  You must find a way to regain your mobility immediately!");
        else if (player.stats.cor < 66)
            ContentView_1.CView.text("  You realize that if any dangerous predator were to find you in this state, you'd be completely defenseless!  You must find a way to regain your mobility... yet there is a certain appeal to imagining how pleasurable it would be for a sexual predator to take advantage of your obscene body.");
        else
            ContentView_1.CView.text("  Your endowments have rendered you completely helpless should any predators find you.  Somewhere in your heart, you find this prospect almost exhilarating.  The idea of being a helpless fucktoy for a wandering beast is unusually inviting to you.  Were it not for the thought that you might starve to death, you'd be incredibly tempted to remain right where you are.");
        if (lake) {
            // SCENE END = IF CHARACTER HAS FULL WINGS ADD SENTENCE
            if (player.canFly())
                ContentView_1.CView.text("  You extend your wings and flap as hard as you can until at last, you manage to lighten the bulk of your body.  It helps just enough to let you drag your genitals out of the mud and back to camp.  The ordeal takes nearly an hour for you to return and deal with.");
            // Taurs
            else if (player.body.legs.type === Legs_1.LegType.CENTAUR)
                ContentView_1.CView.text("  You struggle and work your equine legs against the wet ground.  Your " + LegDescriptor_1.describeFeet(player) + " have consistent trouble finding footing as the mud fails to provide enough leverage to lift your bulk.  You breath in deeply and lean side to side, trying to find some easier vertical leverage beneath your feet.  Eventually, with a crude crawl, your centaur legs manages to push the bulk of your body onto more solid ground.  With great difficulty, you spend the next hour shuffling your genitals back to camp.");
            // SCENE END = FOR ALL OTHER CHARACTERS
            else
                ContentView_1.CView.text("  You struggle and push with your " + LegDescriptor_1.describeLegs(player) + " as hard as you can, but it's no use.  You do the only thing you can and begin stroking your " + CockDescriptor_1.describeCocksLight(player) + " with as much vigor as you can muster.  Eventually, your body tenses and a light load of jizz erupts from your body, but the orgasm is truly mild compared to what you need.  You're far too weary from struggling to give yourself the masturbation you truly need, but you continue to try.  Nearly an hour later, " + CockDescriptor_1.describeOneOfYourCocks(player) + " has softened enough to allow you to stand again, and you make your way back to camp, still dragging your genitals through the mud.");
        }
        else {
            // SCENE END = IF CHARACTER HAS FULL WINGS ADD SENTENCE
            if (player.canFly())
                ContentView_1.CView.text("  You extend your wings and flap as hard as you can, until at last, you manage to lighten the bulk of your body.  It helps just enough to let you drag your genitals out of the forest and back to camp.  The ordeal takes nearly an hour for you to return and deal with.");
            // SCENE END IF CHARACTER HAS CENTAUR BODY
            else if (player.body.legs.type === Legs_1.LegType.CENTAUR)
                ContentView_1.CView.text("  You struggle and work your equine legs against the soft dirt.  Your " + LegDescriptor_1.describeFeet(player) + " have consistent trouble finding footing as the ground fails to provide enough leverage to lift your bulk.  You breath in deeply and lean side to side, until eventually, your feet brace against the various roots of the trees around you.  With a crude crawl, your centaur legs manage to shuffle your body and genitals out of the forest and back to camp.");
            // SCENE END = FOR ALL OTHER CHARACTERS
            else
                ContentView_1.CView.text("  You struggle and push with your " + LegDescriptor_1.describeLegs(player) + " as hard as you can, but it's no use.  You do the only thing you can and begin stroking your " + CockDescriptor_1.describeCocksLight(player) + " with as much vigor as you can muster.  Eventually, your body tenses and a light load of jizz erupts from your loins, but the orgasm is truly mild compared to what you need.  You're far too weary from struggling to give yourself the masturbation you truly need, but you continue to try.  Nearly an hour later, " + CockDescriptor_1.describeOneOfYourCocks(player) + " has softened enough to allow you to stand again, and you make your way back to camp, still dragging your genitals across the forest floor.");
        }
        player.stats.raw.lust += 25 + SMath_1.randInt(player.stats.cor / 5);
        player.stats.fatigue += 5;
        return { next: PassTime_1.passTime(1) };
    }
});
//# sourceMappingURL=Forest.js.map