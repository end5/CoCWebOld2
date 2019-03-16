define(["require", "exports", "Engine/Flags", "Engine/Display/ContentView", "Content/Menus/InGame/PlayerMenu", "Engine/Utilities/SMath", "./PassTime", "Engine/Body/Legs", "Content/Display/SpriteName", "Engine/Combat/CombatManager", "./Areas/BeyondCamp/Imp", "Content/Descriptors/GenderDescriptor", "./Areas/BeyondCamp/Goblin", "./Areas/Forest", "./Areas/Desert", "./Areas/Lake", "./Areas/Plains", "./Areas/Mountains", "./Areas/HighMountain", "./Areas/Bog", "./Areas/Swamp", "./Areas/BeyondCamp/ImpLordScene", "./Areas/Deepwoods", "Content/Combat/Encounter"], function (require, exports, Flags_1, ContentView_1, PlayerMenu_1, SMath_1, PassTime_1, Legs_1, SpriteName_1, CombatManager_1, Imp_1, GenderDescriptor_1, Goblin_1, Forest_1, Desert_1, Lake_1, Plains_1, Mountains_1, HighMountain_1, Bog_1, Swamp_1, ImpLordScene_1, Deepwoods_1, Encounter_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ExplorationFlags = Flags_1.Flags.register("Exploration", {
        BEYOND_CAMP: 0
    });
    /**
     * Created by aimozg on 05.01.14.
     */
    // const MET_OTTERGIRL: number = 777;
    // const HAS_SEEN_MINO_AND_COWGIRL: number = 892;
    // const EXPLORATION_PAGE: number = 1015;
    // const BOG_EXPLORED: number = 1016;
    function doExplore(player) {
        ContentView_1.CView.clear();
        if (exports.ExplorationFlags.BEYOND_CAMP === 0) {
            ContentView_1.CView.text("You tentatively step away from your campsite, alert and scanning the ground and sky for danger.  You walk for the better part of an hour, marking the rocks you pass for a return trip to your camp.  It worries you that the portal has an opening on this side, and it was totally unguarded...\n\n...Wait a second, why is your campsite in front of you? The portal's glow is clearly visible from inside the tall rock formation.   Looking carefully you see your footprints leaving the opposite side of your camp, then disappearing.  You look back the way you came and see your markings vanish before your eyes.  The implications boggle your mind as you do your best to mull over them.  Distance, direction, and geography seem to have little meaning here, yet your campsite remains exactly as you left it.  A few things click into place as you realize you found your way back just as you were mentally picturing the portal!  Perhaps memory influences travel here, just like time, distance, and speed would in the real world!\n\nThis won't help at all with finding new places, but at least you can get back to camp quickly.  You are determined to stay focused the next time you explore and learn how to traverse this gods-forsaken realm.");
            exports.ExplorationFlags.BEYOND_CAMP++;
            return { next: PassTime_1.passTime(1) };
        }
        else if (exports.ExplorationFlags.BEYOND_CAMP === 1) {
            ContentView_1.CView.text("You walk for quite some time, roaming the hard-packed and pink-tinged earth of the demon-realm.  Rust-red rocks speckle the wasteland, as barren and lifeless as anywhere else you've been.  A cool breeze suddenly brushes against your face, as if gracing you with its presence.  You turn towards it and are confronted by the lush foliage of a very old looking forest.  You smile as the plants look fairly familiar and non-threatening.  Unbidden, you remember your decision to test the properties of this place, and think of your campsite as you walk forward.  Reality seems to shift and blur, making you dizzy, but after a few minutes you're back, and sure you'll be able to return to the forest with similar speed.\n\n<b>You have discovered the Forest!</b>");
            exports.ExplorationFlags.BEYOND_CAMP++;
            Forest_1.ForestFlags.TIMES_EXPLORED++;
            return { next: PassTime_1.passTime(1) };
        }
        else if (exports.ExplorationFlags.BEYOND_CAMP > 1)
            ContentView_1.CView.text("You can continue to search for new locations, or explore your previously discovered locations.");
        const choices = [];
        choices.push(["Explore", tryDiscover]);
        if (Desert_1.DesertFlags.TIMES_EXPLORED > 0)
            choices.push(["Desert", Desert_1.exploreDesert]);
        if (Forest_1.ForestFlags.TIMES_EXPLORED > 0)
            choices.push(["Forest", Forest_1.exploreForest]);
        if (Lake_1.LakeFlags.TIMES_EXPLORED > 0)
            choices.push(["Lake", Lake_1.exploreLake]);
        if (Plains_1.PlainsFlags.TIMES_EXPLORED > 0)
            choices.push(["Plains", Plains_1.explorePlains]);
        if (Swamp_1.SwampFlags.TIMES_EXPLORED > 0)
            choices.push(["Swamp", Swamp_1.exploreSwamp]);
        if (Deepwoods_1.DeepwoodsFlags.TIMES_EXPLORED)
            choices.push(["Deepwoods", Deepwoods_1.exploreDeepwoods]);
        if (Mountains_1.MountainsFlags.TIMES_EXPLORED > 0)
            choices.push(["Mountain", Mountains_1.exploreMountain]);
        if (HighMountain_1.HighMountainFlags.TIMES_EXPLORED > 0)
            choices.push(["High Mountain", HighMountain_1.exploreHighMountain]);
        if (Bog_1.BogFlags.TIMES_EXPLORED > 0)
            choices.push(["Bog", Bog_1.exploreBog]);
        return { choices, persistantChoices: [["Back", PlayerMenu_1.playerMenu]] };
    }
    exports.doExplore = doExplore;
    // Try to find a new location - called from doExplore once the first location is found
    function tryDiscover(player) {
        if (Lake_1.LakeFlags.TIMES_EXPLORED === 0) {
            ContentView_1.CView.text("Your wanderings take you far and wide across the barren wasteland that surrounds the portal, until the smell of humidity and fresh water alerts you to the nearby lake.  With a few quick strides you find a lake so massive the distant shore cannot be seen.  Grass and a few sparse trees grow all around it.\n\n<b>You have discovered the Lake!</b>");
            Lake_1.LakeFlags.TIMES_EXPLORED = 1;
            exports.ExplorationFlags.BEYOND_CAMP++;
            return { next: PassTime_1.passTime(1) };
        }
        if (Lake_1.LakeFlags.TIMES_EXPLORED >= 1 && SMath_1.randInt(3) === 0 && Desert_1.DesertFlags.TIMES_EXPLORED === 0) {
            ContentView_1.CView.text("You stumble as the ground shifts a bit underneath you.  Groaning in frustration, you straighten up and discover the rough feeling of sand ");
            if (player.body.legs.type === Legs_1.LegType.HUMAN)
                ContentView_1.CView.text("inside your footwear, between your toes");
            if (player.body.legs.type === Legs_1.LegType.HOOFED)
                ContentView_1.CView.text("in your hooves");
            if (player.body.legs.type === Legs_1.LegType.DOG)
                ContentView_1.CView.text("in your paws");
            if (player.body.legs.type === Legs_1.LegType.NAGA)
                ContentView_1.CView.text("in your scales");
            ContentView_1.CView.text(".\n\n<b>You've discovered the Desert!</b>");
            Desert_1.DesertFlags.TIMES_EXPLORED = 1;
            exports.ExplorationFlags.BEYOND_CAMP++;
            return { next: PassTime_1.passTime(1) };
        }
        if (Desert_1.DesertFlags.TIMES_EXPLORED >= 1 && SMath_1.randInt(3) === 0 && Mountains_1.MountainsFlags.TIMES_EXPLORED === 0) {
            ContentView_1.CView.text("Thunder booms overhead, shaking you out of your thoughts.  High above, dark clouds encircle a distant mountain peak.  You get an ominous feeling in your gut as you gaze up at it.\n\n<b>You have discovered the mountain!</b>");
            exports.ExplorationFlags.BEYOND_CAMP++;
            Mountains_1.MountainsFlags.TIMES_EXPLORED = 1;
            return { next: PassTime_1.passTime(1) };
        }
        if (Mountains_1.MountainsFlags.TIMES_EXPLORED >= 1 && SMath_1.randInt(3) === 0 && Plains_1.PlainsFlags.TIMES_EXPLORED === 0) {
            Plains_1.PlainsFlags.TIMES_EXPLORED = 1;
            exports.ExplorationFlags.BEYOND_CAMP++;
            ContentView_1.CView.text("You find yourself standing in knee-high grass, surrounded by flat plains on all sides.  Though the mountain, forest, and lake are all visible from here, they seem quite distant.\n\n<b>You've discovered the plains!</b>");
            return { next: PassTime_1.passTime(1) };
        }
        // EXPLOOOOOOORE
        if (Swamp_1.SwampFlags.TIMES_EXPLORED === 0 && Plains_1.PlainsFlags.TIMES_EXPLORED > 0 && SMath_1.randInt(3) === 0) {
            Swamp_1.SwampFlags.TIMES_EXPLORED = 1;
            exports.ExplorationFlags.BEYOND_CAMP++;
            ContentView_1.CView.text("All things considered, you decide you wouldn't mind a change of scenery.  Gathering up your belongings, you begin a journey into the wasteland.  The journey begins in high spirits, and you whistle a little traveling tune to pass the time.  After an hour of wandering, however, your wanderlust begins to whittle away.  Another half-hour ticks by.  Fed up with the fruitless exploration, you're nearly about to head back to camp when a faint light flits across your vision.  Startled, you whirl about to take in three luminous will-o'-the-wisps, swirling around each other whimsically.  As you watch, the three ghostly lights begin to move off, and though the thought of a trap crosses your mind, you decide to follow.\n\n");
            ContentView_1.CView.text("Before long, you start to detect traces of change in the environment.  The most immediate difference is the increasingly sweltering heat.  A few minutes pass, then the will-o'-the-wisps plunge into the boundaries of a dark, murky, stagnant swamp; after a steadying breath you follow them into the bog.  Once within, however, the gaseous balls float off in different directions, causing you to lose track of them.  You sigh resignedly and retrace your steps, satisfied with your discovery.  Further exploration can wait.  For now, your camp is waiting.\n\n");
            ContentView_1.CView.text("<b>You've discovered the swamp!</b>");
            return { next: PassTime_1.passTime(2) };
        }
        exports.ExplorationFlags.BEYOND_CAMP++;
        // Used for chosing 'repeat' encounters.
        if (SMath_1.randInt(2) === 0) {
            const impGob = 5;
            // Imptacular Encounter
            if (SMath_1.randInt(10) < impGob) {
                if (player.stats.level >= 8 && SMath_1.randInt(2) === 0) {
                    return ImpLordScene_1.impLordEncounter(player);
                }
                else {
                    ContentView_1.CView.text("An imp wings out of the sky and attacks!");
                    ContentView_1.CView.sprite(SpriteName_1.SpriteName.Imp); // 29;
                    return CombatManager_1.CombatManager.beginBattle(new Encounter_1.Encounter(player, new Imp_1.Imp()));
                }
            }
            // Encounter Gobbalin!
            else {
                if (player.gender > 0) {
                    ContentView_1.CView.text("A goblin saunters out of the bushes with a dangerous glint in her eyes.\n\nShe says, \"<i>Time to get fucked, " + GenderDescriptor_1.mf(player, "stud", "slut"));
                    ContentView_1.CView.text(".</i>\"");
                    ContentView_1.CView.sprite(SpriteName_1.SpriteName.Goblin); // 24;
                    return CombatManager_1.CombatManager.beginBattle(new Encounter_1.Encounter(player, new Goblin_1.Goblin()));
                }
                else {
                    ContentView_1.CView.text("A goblin saunters out of the bushes with a dangerous glint in her eyes.\n\nShe says, \"<i>Time to get fuc-oh shit, you don't even have anything to play with!  This is for wasting my time!");
                    ContentView_1.CView.text("</i>\"");
                    ContentView_1.CView.sprite(SpriteName_1.SpriteName.Goblin); // 24;
                    return CombatManager_1.CombatManager.beginBattle(new Encounter_1.Encounter(player, new Goblin_1.Goblin()));
                }
            }
        }
        else {
            ContentView_1.CView.text("You wander around, fruitlessly searching for new places.");
            return { next: PassTime_1.passTime(1) };
        }
    }
    exports.tryDiscover = tryDiscover;
});
//# sourceMappingURL=Exploration.js.map