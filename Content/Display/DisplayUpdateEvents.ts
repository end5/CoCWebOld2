import { CharDict } from 'Engine/CharDict';
import { MainScreen } from 'Engine/Display/MainScreen';
import { Time } from 'Engine/Utilities/Time';
import { DisplayUpdateEvents } from 'Engine/Display/ScreenDisplay';

DisplayUpdateEvents.push(updateTime);
DisplayUpdateEvents.push(updateMainPlayer);

function updateTime() {
    MainScreen.timeDayElement.clear();
    MainScreen.timeDayElement.text(Time.day.toString());
    MainScreen.timeHourElement.clear();
    MainScreen.timeHourElement.text(Time.hour.toString());
}

function updateMainPlayer() {
    const char = CharDict.player;
    if (char) {
        MainScreen.statsPanel.str.value = Math.floor(char.stats.str);
        MainScreen.statsPanel.str.min = 0;
        MainScreen.statsPanel.str.max = 100;

        MainScreen.statsPanel.tou.value = Math.floor(char.stats.tou);
        MainScreen.statsPanel.tou.min = 0;
        MainScreen.statsPanel.tou.max = 100;

        MainScreen.statsPanel.spe.value = Math.floor(char.stats.spe);
        MainScreen.statsPanel.spe.min = 0;
        MainScreen.statsPanel.spe.max = 100;

        MainScreen.statsPanel.int.value = Math.floor(char.stats.int);
        MainScreen.statsPanel.int.min = 0;
        MainScreen.statsPanel.int.max = 100;

        MainScreen.statsPanel.lib.value = Math.floor(char.stats.lib);
        MainScreen.statsPanel.lib.min = 0;
        MainScreen.statsPanel.lib.max = 100;

        MainScreen.statsPanel.sens.value = Math.floor(char.stats.sens);
        MainScreen.statsPanel.sens.min = 0;
        MainScreen.statsPanel.sens.max = 100;

        MainScreen.statsPanel.cor.value = Math.floor(char.stats.cor);
        MainScreen.statsPanel.cor.min = 0;
        MainScreen.statsPanel.cor.max = 100;

        MainScreen.statsPanel.hp.value = Math.floor(char.stats.HP);
        MainScreen.statsPanel.hp.min = 0;
        MainScreen.statsPanel.hp.max = Math.floor(char.stats.maxHP);

        MainScreen.statsPanel.lust.value = Math.floor(char.stats.lust);
        MainScreen.statsPanel.lust.min = Math.floor(char.stats.minLust());
        MainScreen.statsPanel.lust.max = 100;

        MainScreen.statsPanel.fatigue.value = Math.floor(char.stats.fatigue);
        MainScreen.statsPanel.fatigue.min = 0;
        MainScreen.statsPanel.fatigue.max = 100;

        MainScreen.statsPanel.level.value = Math.floor(char.stats.level);

        MainScreen.statsPanel.xp.value = char.roundXPToLevel();
        if (char.canLevelUp())
            MainScreen.levelupIcon.show();

        MainScreen.statsPanel.gems.value = char.inventory.gems;

    }
}
