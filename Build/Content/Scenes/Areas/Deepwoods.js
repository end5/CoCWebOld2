define(["require", "exports", "Engine/Flags", "./Forest/TamaniScene", "Engine/Utilities/SMath", "./Forest/TamanisDaughtersScene", "./Forest/ErlKingScene", "./Forest/Faerie", "./Forest/TentacleBeastScene", "./BeyondCamp/Giacomo", "Engine/Display/ContentView", "../PassTime", "./Forest/CorruptedGlade", "./Forest/AkbalScenes", "./Forest/KitsuneScene"], function (require, exports, Flags_1, TamaniScene_1, SMath_1, TamanisDaughtersScene_1, ErlKingScene_1, Faerie_1, TentacleBeastScene_1, Giacomo_1, ContentView_1, PassTime_1, CorruptedGlade_1, AkbalScenes_1, KitsuneScene_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.DeepwoodsFlags = Flags_1.Flags.register("Deepwoods", {
        TIMES_EXPLORED: 0,
    });
    function exploreDeepwoods(player) {
        exports.DeepwoodsFlags.TIMES_EXPLORED++;
        // $> Commented out for testing
        // // Every tenth exploration finds a pumpkin if eligible!
        // if (ForestFlags.DEEPWOODS_EXPLORED % 10 === 0 && isHalloween()) {
        //     // If Fera isn't free yet...
        //     if (!player.perks.has(PerkType.FerasBoonBreedingBitch) && !player.perks.has(PerkType.FerasBoonAlpha)) {
        //         if (date.fullYear > ForestFlags.PUMPKIN_FUCK_YEAR_DONE) {
        //             return pumpkinFuckEncounter();
        //         }
        //     }
        //     // Fera is free!
        //     else {
        //         if (ForestFlags.FERAS_TRAP_SPRUNG_YEAR === 0) {
        //             if (date.fullYear > ForestFlags.FERAS_GLADE_EXPLORED_YEAR) {
        //                 return feraSceneTwoIntroduction();
        //             }
        //         }
        //     }
        // }
        // // Hel jumps you for sex.
        // if (ForestFlags.PC_PROMISED_HEL_MONOGAMY_FUCKS === 1 && ForestFlags.HEL_RAPED_TODAY === 0 && randInt(10) === 0 && player.gender > 0 && !followerHel()) {
        //     return helSexualAmbush();
        // }
        // // Every 5th exploration encounters d2 if hasnt been met yet and factory done
        // if (ForestFlags.DISCOVERED_DUNGEON_2_ZETAZ === 0 && ForestFlags.DEEPWOODS_EXPLORED % 5 === 0 && player.effects.has(StatusEffectType.DungeonShutDown)) {
        //     CView.clear().text("While you explore the deepwoods, you do your best to forge into new, unexplored locations.  While you're pushing away vegetation and slapping at plant-life, you spot a half-overgrown orifice buried in the side of a ravine.  There's a large number of imp-tracks around the cavern's darkened entryway.  Perhaps this is where the imp, Zetaz, makes his lair?  In any event, it's past time you checked back on the portal.  You make a mental note of the cave's location so that you can return when you're ready.");
        //     CView.text("\n\n<b>You've discovered the location of Zetaz's lair!</b>");
        //     ForestFlags.DISCOVERED_DUNGEON_2_ZETAZ++;
        //     return { choices: [["Enter", enterZetazsLair], ["", undefined], ["", undefined], ["", undefined], ["Leave", passTime(1)]] };
        // }
        // Tamani 20% encounter rate
        if (TamaniScene_1.TamaniFlags.TAMANI_TIME_OUT === 0 && SMath_1.randInt(5) === 0 && player.gender > 0 && (player.body.cocks.length > 0 || !TamaniScene_1.TamaniFlags.DELUXE_DILDO)) {
            if (player.body.cocks.length > 0 && TamanisDaughtersScene_1.TamanisDaughtersFlags.TAMANI_DAUGHTER_PREGGO_COUNTDOWN === 0 && TamaniScene_1.TamaniFlags.TAMANI_NUMBER_OF_DAUGHTERS >= 24) {
                return TamanisDaughtersScene_1.encounterTamanisDaughters(player);
            }
            else
                return TamaniScene_1.encounterTamani(player);
        }
        if (ErlKingScene_1.ErlKingFlags.ERLKING_DISABLED === 0 && ErlKingScene_1.ErlKingFlags.ERLKING_ENCOUNTER_COUNTER === 4) {
            ErlKingScene_1.ErlKingFlags.ERLKING_ENCOUNTER_COUNTER = 0;
            return ErlKingScene_1.encounterWildHunt(player);
        }
        else {
            ErlKingScene_1.ErlKingFlags.ERLKING_ENCOUNTER_COUNTER++;
        }
        const chooser = SMath_1.randInt(5);
        // Faerie
        if (chooser === 0) {
            return Faerie_1.encounterFaerie(player);
        }
        // Tentacle monster
        if (chooser === 1) {
            // Reset hilarious shit
            if (player.gender > 0)
                TentacleBeastScene_1.TentacleBeastFlags.UNKNOWN_FLAG_NUMBER_00247 = 0;
            // Tentacle avoidance chance due to dangerous plants
            if (Giacomo_1.GiacomoFlags.DangerousPlants && player.stats.int / 2 > SMath_1.randInt(50)) {
                ContentView_1.CView.clear().text("Using the knowledge contained in your 'Dangerous Plants' book, you determine a tentacle beast's lair is nearby, do you continue?  If not you could return to camp.\n\n");
                return { choices: [["Continue", TentacleBeastScene_1.encounter], ["", undefined], ["", undefined], ["", undefined], ["Leave", PassTime_1.passTime(1)]] };
            }
            else {
                return TentacleBeastScene_1.encounter(player);
            }
        }
        // Corrupted Glade
        if (chooser === 2) {
            // $> Implement later
            // if (randInt(4) === 0) {
            //     return trappedSatyr(player);
            // }
            return CorruptedGlade_1.intro(player);
        }
        if (chooser === 3) {
            return AkbalScenes_1.supahAkabalEdition(player);
        }
        else {
            if (SMath_1.randInt(3) === 0)
                return KitsuneScene_1.kitsuneShrine(player);
            else
                return KitsuneScene_1.enterTheTrickster(player);
        }
    }
    exports.exploreDeepwoods = exploreDeepwoods;
});
//# sourceMappingURL=Deepwoods.js.map