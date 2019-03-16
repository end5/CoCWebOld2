define(["require", "exports", "Engine/Display/ContentView", "./PlayerMenu", "Content/Player/PlayerFlags", "Content/Scenes/Areas/Forest/TamaniScene", "Content/Effects/EffectType", "Engine/Body/Cock", "Content/Items/Consumables/MinotaurCum"], function (require, exports, ContentView_1, PlayerMenu_1, PlayerFlags_1, TamaniScene_1, EffectType_1, Cock_1, MinotaurCum_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function statsMenu(player) {
        // return stats(player);
        return displayStats(player);
    }
    exports.statsMenu = statsMenu;
    // function menuChoices(player: Character, screen: (player: Character) => NextScreenChoices): NextScreenChoices {
    //     const choices: ScreenChoice[] = [
    //         ["Stats", stats],
    //         ["Effects", effects],
    //         ["Combat Stats", combatStats],
    //     ].filter((choice) => choice[1] !== screen) as ScreenChoice[];
    //     choices[choices.length - 1] = ["Back", playerMenu];
    //     return { choices };
    // }
    // function combatStats(player: Character): NextScreenChoices {
    //     CView.clear();
    //     CView.text('<b><u>Combat Stats: </u></b>');
    //     CView.text('Attack: ' + player.combat.attack());
    //     CView.text('Defense: ' + player.combat.defense());
    //     return menuChoices(player, combatStats);
    // }
    // function effects(player: Character): NextScreenChoices {
    //     CView.clear();
    //     CView.text('<b><u>Effects: </u></b>\n');
    //     for (const effect of player.effects) {
    //         CView.text('<b>' + effect.type + ' - ' + effect.desc.longDesc + '</b>: ');
    //         CView.text(displayEffectValues(effect.values) + '\n');
    //     }
    //     return menuChoices(player, effects);
    // }
    // function displayEffectValues(values: EffectValues) {
    //     return JSON.stringify(values)
    //         .replace(/"multi":1,/g, "")
    //         .replace(/"flat":0/g, "")
    //         .replace(/"\w+":{},?/g, "")
    //         .replace(/"\w+":{},?/g, "")
    //         .replace(/"\w+":{},?/g, "")
    //         .replace(/"\w+":0,?/g, "")
    //         .replace(/:/g, ": ")
    //         .replace(/,/g, "\n")
    //         .replace(/{/g, "\n\t")
    //         .replace(/}/g, "")
    //         .replace(/"/g, "");
    // }
    // function stats(player: Character): NextScreenChoices {
    //     CView.clear();
    //     CView.text('<b><u>Stats: </u></b>');
    //     CView.text("\nStrength: " + displayRangedStat(player.stats.base.str));
    //     CView.text("\nToughness: " + displayRangedStat(player.stats.base.tou));
    //     CView.text("\nSpeed: " + displayRangedStat(player.stats.base.spe));
    //     CView.text("\nIntelligence: " + displayRangedStat(player.stats.base.int));
    //     CView.text("\nLibido: " + displayRangedStat(player.stats.base.lib));
    //     CView.text("\nSense: " + displayRangedStat(player.stats.base.sens));
    //     CView.text("\nCorruption: " + displayRangedStat(player.stats.base.cor));
    //     CView.text("\nFatigue: " + displayRangedStat(player.stats.base.fatigue));
    //     CView.text("\nHP: " + displayRangedStat(player.stats.base.HP));
    //     CView.text("\nLust: " + displayRangedStat(player.stats.base.lust));
    //     CView.text("\nLust Vulnerability: " + player.stats.base.lustVuln);
    //     CView.text("\nXP: " + displayStat(player.stats.base.XP));
    //     CView.text("\nLevel: " + displayStat(player.stats.base.level));
    //     CView.text("\nPerk Points: " + player.stats.base.perkPoints);
    //     CView.text("\nTease XP: " + displayStat(player.stats.base.XP));
    //     CView.text("\nTease Level: " + displayStat(player.stats.base.level));
    //     return menuChoices(player, stats);
    // }
    // function displayStat(stat: Stat) {
    //     return stat.raw + displayStatEffects(stat);
    // }
    // function displayStatEffects(stat: Stat) {
    //     let out = '';
    //     const multiEffects = stat.effects.filter((effect) => !!effect.multi && effect.multi !== 1).map((effect) => effect.multi);
    //     if (multiEffects.length > 0) {
    //         out += " * (" + multiEffects.toArray().join(" * ") + ")";
    //     }
    //     const flatEffects = stat.effects.filter((effect) => !!effect.flat && effect.flat !== 0).map((effect) => effect.flat);
    //     if (flatEffects.length > 0) {
    //         out += " + (" + flatEffects.toArray().join(" + ") + ")";
    //     }
    //     return out;
    // }
    // function surround(str: string) {
    //     return str.indexOf(" ") !== -1 ? "(" + str + ")" : str;
    // }
    // function displayRangedStat(stat: RangedStat) {
    //     return stat.value + "\n\t" +
    //         surround(displayStat(stat.)) +
    //         " < " +
    //         surround(
    //             surround(displayStat(stat.base)) +
    //             " + " +
    //             surround(displayStat(stat.delta)) +
    //             displayStatEffects(stat.total)
    //         ) +
    //         " < " +
    //         surround(displayStat(stat.max));
    // }
    function displayStats(player) {
        ContentView_1.CView.clear();
        // Begin Combat Stats
        let combatStats = "";
        combatStats += "<b>Lust Resistance:</b> " + (100 - Math.round(player.stats.lustPercent())) + "% (Higher is better.)\n";
        combatStats += "<b>Spell Effect Multiplier:</b> " + (100 * player.combat.spellMod()) + "%\n";
        // $> Figure out what to do with spellCost
        // combatStats += "<b>Spell Cost:</b> " + player.combat.spellCost(100) + "%\n";
        combatStats += "<b>Tease Skill (Out of 5):</b>  " + player.stats.teaseLevel + "\n";
        if (combatStats !== "")
            ContentView_1.CView.text("<b><u>Combat Stats</u></b>\n" + combatStats);
        // End Combat Stats
        // Begin Children Stats
        let childStats = "";
        if (PlayerFlags_1.PlayerFlags.TIMES_GIVEN_BIRTH > 0)
            childStats += "<b>Times Given Birth:</b> " + PlayerFlags_1.PlayerFlags.TIMES_GIVEN_BIRTH + "\n";
        if (TamaniScene_1.TamaniFlags.TAMANI_NUMBER_OF_DAUGHTERS > 0)
            childStats += "<b>Children With Tamani:</b> " + TamaniScene_1.TamaniFlags.TAMANI_NUMBER_OF_DAUGHTERS + " (after all forms of natural selection)\n";
        if (childStats !== "")
            ContentView_1.CView.text("\n<b><u>Children</u></b>\n" + childStats);
        // End Children Stats
        // Begin Body Stats
        let bodyStats = "";
        bodyStats += "<b>Anal Capacity:</b> " + Math.round(player.analCapacity()) + "\n";
        bodyStats += "<b>Anal Looseness:</b> " + Math.round(player.body.butt.looseness) + "\n";
        bodyStats += "<b>Fertility (Base) Rating:</b> " + Math.round(player.body.fertility) + "\n";
        bodyStats += "<b>Fertility (With Bonuses) Rating:</b> " + Math.round(player.totalFertility()) + "\n";
        if (player.cumQ() > 0)
            bodyStats += "<b>Cum Production:</b> " + Math.round(player.cumQ()) + "mL\n";
        if (player.lactationQ() > 0)
            bodyStats += "<b>Milk Production:</b> " + Math.round(player.lactationQ()) + "mL\n";
        bodyStats += "<b>Pregnancy Speed Multiplier:</b> ";
        let preg = 1;
        if (player.effects.has(EffectType_1.EffectType.Diapause))
            bodyStats += "? (Variable due to Diapause)\n";
        else {
            if (player.effects.has(EffectType_1.EffectType.MaraesGiftFertility))
                preg++;
            if (player.effects.has(EffectType_1.EffectType.BroodMother))
                preg++;
            if (player.effects.has(EffectType_1.EffectType.FerasBoonBreedingBitch))
                preg++;
            if (player.effects.has(EffectType_1.EffectType.MagicalFertility))
                preg++;
            if (player.effects.has(EffectType_1.EffectType.FerasBoonWideOpen) || player.effects.has(EffectType_1.EffectType.FerasBoonMilkingTwat))
                preg++;
            bodyStats += preg + "\n";
        }
        if (player.body.cocks.length > 0) {
            bodyStats += "<b>Total Cocks:</b> " + player.body.cocks.length + "\n";
            bodyStats += "<b>Total Cock Length:</b> " + Math.round(player.body.cocks.reduce(Cock_1.Cock.TotalLength, 0)) + " inches\n";
            bodyStats += "<b>Total Cock Girth:</b> " + Math.round(player.body.cocks.reduce(Cock_1.Cock.TotalThickness, 0)) + " inches\n";
        }
        if (player.body.vaginas.length > 0)
            bodyStats += "<b>Vaginal Capacity:</b> " + Math.round(player.vaginalCapacity()) + "\n" + "<b>Vaginal Looseness:</b> " + Math.round(player.body.vaginas.get(0).looseness) + "\n";
        if (player.effects.has(EffectType_1.EffectType.SpiderOvipositor) || player.effects.has(EffectType_1.EffectType.BeeOvipositor))
            bodyStats += "<b>Ovipositor Total Egg Count: " + player.body.ovipositor.eggs + "\nOvipositor Fertilized Egg Count: " + player.body.ovipositor.fertilizedEggs + "</b>\n";
        if (bodyStats !== "")
            ContentView_1.CView.text("\n<b><u>Body Stats</u></b>\n" + bodyStats);
        // End Body Stats
        // Begin Misc Stats
        let miscStats = "";
        if (PlayerFlags_1.PlayerFlags.SPELLS_CAST > 0)
            miscStats += "<b>Spells Cast:</b> " + PlayerFlags_1.PlayerFlags.SPELLS_CAST + "\n";
        if (miscStats !== "")
            ContentView_1.CView.text("\n<b><u>Miscellaneous Stats</u></b>\n" + miscStats);
        // End Misc Stats
        // Begin Addition Stats
        let addictStats = "";
        // Mino Cum Addiction
        if (MinotaurCum_1.MinotaurCumFlags.MINOTAUR_CUM_ADDICTION_STATE > 0 || MinotaurCum_1.MinotaurCumFlags.MINOTAUR_CUM_ADDICTION_TRACKER > 0 || player.effects.has(EffectType_1.EffectType.MinotaurCumAddict)) {
            if (!player.effects.has(EffectType_1.EffectType.MinotaurCumAddict))
                addictStats += "<b>Minotaur Cum:</b> " + Math.round(MinotaurCum_1.MinotaurCumFlags.MINOTAUR_CUM_ADDICTION_TRACKER * 10) / 10 + "%\n";
            else
                addictStats += "<b>Minotaur Cum:</b> 100+%\n";
        }
        if (addictStats !== "")
            ContentView_1.CView.text("\n<b><u>Addictions</u></b>\n" + addictStats);
        // End Addition Stats
        // Begin Ongoing Stat Effects
        let statEffects = "";
        const heat = player.effects.getByName(EffectType_1.EffectType.Heat);
        if (heat && heat.values.hourExpire)
            statEffects += "Heat - " + Math.round(heat.values.hourExpire) + " hours remaining\n";
        const rut = player.effects.getByName(EffectType_1.EffectType.Rut);
        if (rut && rut.values.hourExpire)
            statEffects += "Rut - " + Math.round(rut.values.hourExpire) + " hours remaining\n";
        const lustStick = player.effects.getByName(EffectType_1.EffectType.LustStick);
        if (lustStick && lustStick.values.hourExpire)
            statEffects += "Luststick - " + Math.round(lustStick.values.hourExpire) + " hours remaining\n";
        const blackCatBeer = player.effects.getByName(EffectType_1.EffectType.BlackCatBeer);
        if (blackCatBeer && blackCatBeer.values.hourExpire)
            statEffects += "Black Cat Beer - " + blackCatBeer.values.hourExpire + " hours remaining (Lust resistance 20% lower, physical resistance 25% higher.)\n";
        if (statEffects !== "")
            ContentView_1.CView.text("\n<b><u>Ongoing Status Effects</u></b>\n" + statEffects);
        // End Ongoing Stat Effects
        return { next: PlayerMenu_1.playerMenu };
    }
});
//# sourceMappingURL=StatsMenu.js.map