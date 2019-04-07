import { Character } from 'Content/Character/Character';
import { ClickFunction } from 'Engine/Display/ScreenDisplay';
import { Time } from 'Engine/Utilities/Time';
import { TimeEvents } from 'Engine/TimeEvents';
import { playerMenu } from 'Content/Menus/InGame/PlayerMenu';
import { CView } from 'Engine/Display/ContentView';
import { numToCardinalCapText } from 'Content/Utilities/NumToText';
import { Area } from 'Content/Area';

export function passTime(num: number): ClickFunction {
    return function passHour(char: Character) {
        CView.clear();
        if (num === 1)
            CView.text("An hour passes...\n");
        else CView.text(numToCardinalCapText(num) + " hours pass...\n");

        Time.hour += num;
        return TimeEvents.update(num, backToCamp(char));
    };
}

function backToCamp(player: Character) {
    return () => {
        Area.transistion('Overworld', 'Camp');

        return playerMenu(player);
    };
}
