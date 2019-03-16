define(["require", "exports", "Engine/CharDict", "Engine/Display/MainScreen", "Engine/Utilities/Time", "Engine/Display/ScreenDisplay"], function (require, exports, CharDict_1, MainScreen_1, Time_1, ScreenDisplay_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    ScreenDisplay_1.DisplayUpdateEvents.push(updateTime);
    ScreenDisplay_1.DisplayUpdateEvents.push(updateMainPlayer);
    function updateTime() {
        MainScreen_1.MainScreen.timeDayElement.clear();
        MainScreen_1.MainScreen.timeDayElement.text(Time_1.Time.day.toString());
        MainScreen_1.MainScreen.timeHourElement.clear();
        MainScreen_1.MainScreen.timeHourElement.text(Time_1.Time.hour.toString());
    }
    function updateMainPlayer() {
        const char = CharDict_1.CharDict.player;
        if (char) {
            MainScreen_1.MainScreen.statsPanel.str.value = Math.floor(char.stats.str);
            MainScreen_1.MainScreen.statsPanel.str.min = 0;
            MainScreen_1.MainScreen.statsPanel.str.max = 100;
            MainScreen_1.MainScreen.statsPanel.tou.value = Math.floor(char.stats.tou);
            MainScreen_1.MainScreen.statsPanel.tou.min = 0;
            MainScreen_1.MainScreen.statsPanel.tou.max = 100;
            MainScreen_1.MainScreen.statsPanel.spe.value = Math.floor(char.stats.spe);
            MainScreen_1.MainScreen.statsPanel.spe.min = 0;
            MainScreen_1.MainScreen.statsPanel.spe.max = 100;
            MainScreen_1.MainScreen.statsPanel.int.value = Math.floor(char.stats.int);
            MainScreen_1.MainScreen.statsPanel.int.min = 0;
            MainScreen_1.MainScreen.statsPanel.int.max = 100;
            MainScreen_1.MainScreen.statsPanel.lib.value = Math.floor(char.stats.lib);
            MainScreen_1.MainScreen.statsPanel.lib.min = 0;
            MainScreen_1.MainScreen.statsPanel.lib.max = 100;
            MainScreen_1.MainScreen.statsPanel.sens.value = Math.floor(char.stats.sens);
            MainScreen_1.MainScreen.statsPanel.sens.min = 0;
            MainScreen_1.MainScreen.statsPanel.sens.max = 100;
            MainScreen_1.MainScreen.statsPanel.cor.value = Math.floor(char.stats.cor);
            MainScreen_1.MainScreen.statsPanel.cor.min = 0;
            MainScreen_1.MainScreen.statsPanel.cor.max = 100;
            MainScreen_1.MainScreen.statsPanel.hp.value = Math.floor(char.stats.HP);
            MainScreen_1.MainScreen.statsPanel.hp.min = 0;
            MainScreen_1.MainScreen.statsPanel.hp.max = Math.floor(char.stats.maxHP);
            MainScreen_1.MainScreen.statsPanel.lust.value = Math.floor(char.stats.lust);
            MainScreen_1.MainScreen.statsPanel.lust.min = Math.floor(char.stats.minLust());
            MainScreen_1.MainScreen.statsPanel.lust.max = 100;
            MainScreen_1.MainScreen.statsPanel.fatigue.value = Math.floor(char.stats.fatigue);
            MainScreen_1.MainScreen.statsPanel.fatigue.min = 0;
            MainScreen_1.MainScreen.statsPanel.fatigue.max = 100;
            MainScreen_1.MainScreen.statsPanel.level.value = Math.floor(char.stats.level);
            MainScreen_1.MainScreen.statsPanel.xp.value = char.roundXPToLevel();
            if (char.canLevelUp())
                MainScreen_1.MainScreen.levelupIcon.show();
            MainScreen_1.MainScreen.statsPanel.gems.value = char.inventory.gems;
        }
    }
});
//# sourceMappingURL=DisplayUpdateEvents.js.map