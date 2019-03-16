define(["require", "exports", "Content/Menus/InGame/PlayerMenu", "Content/Scenes/PassTime", "Engine/Display/ScreenDisplay", "Engine/Display/ContentView", "Content/Utilities/NumToText", "Content/Effects/EffectType", "Engine/Utilities/Time", "./NPCs/Exgartuan", "Content/Modifiers/StatModifier", "Content/Items/Consumables/MinotaurCum", "./Exploration", "./Masturbate", "Content/Menus/InGame/PlayerInventoryMenu"], function (require, exports, PlayerMenu_1, PassTime_1, ScreenDisplay_1, ContentView_1, NumToText_1, EffectType_1, Time_1, Exgartuan_1, StatModifier_1, MinotaurCum_1, Exploration_1, Masturbate_1, PlayerInventoryMenu_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    //  SLEEP_WITH: number = 701;
    function camp(player) {
        // Build explore menus
        let placesEvent;
        let followers;
        let lovers;
        let slaves;
        const storage = undefined;
        // Build main menu
        let exploreEvent = Exploration_1.doExplore;
        const masturbate = (player.stats.lust > 30 ? Masturbate_1.masturbateMenu : undefined);
        ContentView_1.CView.clear();
        ContentView_1.CView.image("camping");
        if (Time_1.Time.day < 10)
            ContentView_1.CView.text("Your campsite is fairly simple at the moment.  Your tent and bedroll are set in front of the rocks that lead to the portal.  You have a small fire pit as well.");
        else if (Time_1.Time.day < 20)
            ContentView_1.CView.text("Your campsite is starting to get a very 'lived-in' look.  The fire-pit is well defined with some rocks you've arranged around it, and your bedroll and tent have been set up in the area most sheltered by rocks.");
        else
            ContentView_1.CView.text("Your new home is as comfy as a camp site can be.  The fire-pit and tent are both set up perfectly, and in good repair, and you've even managed to carve some artwork into the rocks around the camp's perimeter.");
        // Traps
        if (player.effects.has(EffectType_1.EffectType.DefenseCanopy)) {
            ContentView_1.CView.text("  A thorny tree has sprouted near the center of the camp, growing a protective canopy of spiky vines around the portal and your camp.");
        }
        else
            ContentView_1.CView.text("  You have a number of traps surrounding your makeshift home, but they are fairly simple and may not do much to deter a demon.");
        ContentView_1.CView.text("  The portal shimmers in the background as it always does, looking menacing and reminding you of why you came.\n\n");
        // The uber horny
        if (player.stats.lust >= 100) {
            ContentView_1.CView.text("<b>You are debilitatingly aroused, and can think of doing nothing other than masturbating.</b>\n\n");
            exploreEvent = undefined;
            placesEvent = undefined;
        }
        let baitText = "Masturbate";
        if (((player.effects.has(EffectType_1.EffectType.HistoryReligious) && player.stats.cor <= 66) ||
            (player.effects.has(EffectType_1.EffectType.Enlightened) && player.stats.cor < 10)) &&
            !(Exgartuan_1.ExgartuanFlags.LOCATION === 0 && Exgartuan_1.ExgartuanFlags.SLEEP_COUNTER === 0))
            baitText = "Meditate";
        // Initialize companions/followers
        if (Time_1.Time.hour > 4 && Time_1.Time.hour < 23) {
            if (followersCount() > 0)
                followers = campFollowers;
            if (slavesCount() > 0)
                slaves = campSlavesMenu;
            if (loversCount() > 0)
                lovers = campLoversMenu;
        }
        let restEvent = ScreenDisplay_1.choiceWrap(doWait);
        let restName = "Wait";
        // Night
        if (Time_1.Time.hour < 6 || Time_1.Time.hour > 20) {
            ContentView_1.CView.text("It is dark out, made worse by the lack of stars in the sky.  A blood-red moon hangs in the sky, seeming to watch you, but providing little light.  It's far too dark to leave camp.\n");
            restName = "Sleep";
            restEvent = ScreenDisplay_1.choiceWrap(doSleep);
            exploreEvent = undefined;
            placesEvent = undefined;
        }
        // Day Time!
        else {
            ContentView_1.CView.text("It's light outside, a good time to explore and forage for supplies with which to fortify your camp.\n");
            if (player.stats.fatigue > 40 || player.stats.HP / player.stats.maxHP <= .9) {
                restName = "Rest";
                restEvent = ScreenDisplay_1.choiceWrap(rest);
            }
        }
        return {
            choices: [
                ["Explore", exploreEvent],
                ["Places", placesEvent],
                ["Inventory", PlayerInventoryMenu_1.inventoryMenu],
                ["Stash", storage],
                ["Followers", followers],
                ["Lovers", lovers],
                ["Slaves", slaves],
                ["", undefined],
                [baitText, masturbate],
                [restName, restEvent]
            ]
        };
    }
    exports.camp = camp;
    function hasCompanions() {
        return companionsCount() > 0;
    }
    exports.hasCompanions = hasCompanions;
    function companionsCount() {
        return followersCount() + slavesCount() + loversCount();
    }
    exports.companionsCount = companionsCount;
    function followersCount() {
        const counter = 0;
        return counter;
    }
    exports.followersCount = followersCount;
    function slavesCount() {
        const counter = 0;
        return counter;
    }
    exports.slavesCount = slavesCount;
    function loversCount() {
        const counter = 0;
        return counter;
    }
    exports.loversCount = loversCount;
    function campLoversMenu(player) {
        ContentView_1.CView.clear();
        const choices = [];
        choices[9] = ["Back", PlayerMenu_1.playerMenu];
        return { choices };
    }
    exports.campLoversMenu = campLoversMenu;
    function campSlavesMenu(player) {
        ContentView_1.CView.clear();
        const choices = [];
        choices[9] = ["Back", PlayerMenu_1.playerMenu];
        return { choices };
    }
    exports.campSlavesMenu = campSlavesMenu;
    function campFollowers(player) {
        ContentView_1.CView.clear();
        const choices = [];
        choices[9] = ["Back", PlayerMenu_1.playerMenu];
        return { choices };
    }
    exports.campFollowers = campFollowers;
    function rest(player, hours = 0) {
        if (hours === 0) {
            ContentView_1.CView.clear().text("You lie down to rest for four hours.\n");
            hours = 4;
            // REGULAR HP/FATIGUE RECOVERY
            StatModifier_1.displayCharacterHPChange(player, hours * 10);
            // fatigue
            player.stats.fatigue += -4 * hours;
            if (player.effects.has(EffectType_1.EffectType.SpeedyRecovery))
                player.stats.fatigue += -2 * hours;
        }
        else {
            if (hours !== 1)
                ContentView_1.CView.clear().text("You continue to rest for " + NumToText_1.numToCardinalText(hours) + " more hours.\n");
            else
                ContentView_1.CView.clear().text("You continue to rest for another hour.\n");
        }
        return { next: PassTime_1.passTime(hours) };
    }
    function doWait(player, hours = 0) {
        if (hours === 0) {
            ContentView_1.CView.text("You wait four hours...\n");
            hours = 4;
            // REGULAR HP/FATIGUE RECOVERY
            // fatigue
            player.stats.fatigue += -2 * hours;
            if (player.effects.has(EffectType_1.EffectType.SpeedyRecovery))
                player.stats.fatigue += -1 * hours;
        }
        else {
            if (hours !== 1)
                ContentView_1.CView.text("You continue to wait for " + NumToText_1.numToCardinalText(hours) + " more hours.\n");
            else
                ContentView_1.CView.text("You continue to wait for another hour.\n");
        }
        return { next: PassTime_1.passTime(hours) };
    }
    function doSleep(player, hours = 0) {
        if (hours === 0) {
            if (Time_1.Time.hour === 21)
                hours = 9;
            if (Time_1.Time.hour === 22)
                hours = 8;
            if (Time_1.Time.hour >= 23)
                hours = 7;
            if (Time_1.Time.hour === 0)
                hours = 6;
            if (Time_1.Time.hour === 1)
                hours = 5;
            if (Time_1.Time.hour === 2)
                hours = 4;
            if (Time_1.Time.hour === 3)
                hours = 3;
            if (Time_1.Time.hour === 4)
                hours = 2;
            if (Time_1.Time.hour === 5)
                hours = 1;
            sleepRecovery(player, hours, true);
        }
        else {
            if (hours !== 1)
                ContentView_1.CView.clear().text("You lie down to resume sleeping for the remaining " + NumToText_1.numToCardinalText(hours) + " hours.\n");
            else
                ContentView_1.CView.clear().text("You lie down to resume sleeping for the remaining hour.\n");
        }
        return { next: PassTime_1.passTime(hours) };
    }
    exports.doSleep = doSleep;
    // For shit that breaks normal sleep processing.
    function sleepWrapper(player, hours) {
        if (Time_1.Time.hour === 16)
            hours = 14;
        if (Time_1.Time.hour === 17)
            hours = 13;
        if (Time_1.Time.hour === 18)
            hours = 12;
        if (Time_1.Time.hour === 19)
            hours = 11;
        if (Time_1.Time.hour === 20)
            hours = 10;
        if (Time_1.Time.hour === 21)
            hours = 9;
        if (Time_1.Time.hour === 22)
            hours = 8;
        if (Time_1.Time.hour >= 23)
            hours = 7;
        if (Time_1.Time.hour === 0)
            hours = 6;
        if (Time_1.Time.hour === 1)
            hours = 5;
        if (Time_1.Time.hour === 2)
            hours = 4;
        if (Time_1.Time.hour === 3)
            hours = 3;
        if (Time_1.Time.hour === 4)
            hours = 2;
        if (Time_1.Time.hour === 5)
            hours = 1;
        ContentView_1.CView.clear();
        if (hours !== 1)
            ContentView_1.CView.clear().text("You lie down to resume sleeping for the remaining " + NumToText_1.numToCardinalText(hours) + " hours.\n");
        else
            ContentView_1.CView.clear().text("You lie down to resume sleeping for the remaining hour.\n");
        sleepRecovery(player, hours, true);
        return { next: PassTime_1.passTime(hours) };
    }
    exports.sleepWrapper = sleepWrapper;
    function sleepRecovery(player, hours, display = false) {
        // Mino withdrawal
        if (MinotaurCum_1.MinotaurCumFlags.MINOTAUR_CUM_ADDICTION_STATE === 3) {
            if (display)
                ContentView_1.CView.text("\nYou spend much of the night tossing and turning, aching for a taste of minotaur cum.\n");
            StatModifier_1.displayCharacterHPChange(player, hours * 15);
            player.stats.fatigue += -Math.floor(player.stats.fatigue / 2);
            if (player.effects.has(EffectType_1.EffectType.SpeedyRecovery))
                player.stats.fatigue += -Math.floor(player.stats.fatigue / 4);
        }
        // REGULAR HP/FATIGUE RECOVERY
        else {
            StatModifier_1.displayCharacterHPChange(player, hours * 20);
            // fatigue
            player.stats.fatigue += -player.stats.fatigue;
        }
    }
    exports.sleepRecovery = sleepRecovery;
});
//# sourceMappingURL=Camp.js.map