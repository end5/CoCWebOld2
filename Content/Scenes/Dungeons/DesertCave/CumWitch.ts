import { Character } from 'Content/Character/Character';
import { NextScreenChoices } from 'Engine/Display/ScreenDisplay';
import { randInt } from 'Engine/Utilities/SMath';
import { EndScenes } from 'Engine/Combat/EndScenes';
import { DefeatType } from 'Engine/Combat/DefeatEvent';
import { CumWitch } from 'Content/Scenes/Areas/Desert/CumWitch';
import { cumWitchDefeated } from 'Content/Scenes/Areas/Desert/CumWitchScene';
import { turnIntoASammitch, cumWitchCumPumpBadEnd } from 'Content/Scenes/Dungeons/DesertCave/CumWitchScene';

class DungeonCumWitchEndScenes extends EndScenes {
    protected victoryScene?(howYouWon: DefeatType, enemy: Character): NextScreenChoices {
        // Dudally-diddly.
        if (enemy.body.cocks.length > 0 && (enemy.gender === 1 || randInt(2) === 0)) return cumWitchCumPumpBadEnd(enemy);
        // Ladies and Genderless
        else return turnIntoASammitch(enemy, this.char);
    }

    protected defeatScene?(howYouLost: DefeatType, enemy: Character): NextScreenChoices {
        return cumWitchDefeated(enemy, this.char, true);
    }
}

export class DungeonCumWitch extends CumWitch {
    public constructor() {
        super();
        this.combatContainer.endScenes = new DungeonCumWitchEndScenes(this);
    }
}
