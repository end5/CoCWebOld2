import { Character } from 'Game/Character/Character';
import { Effect } from '../Effect';
import { EffectDesc } from '../EffectDesc';

export class Enlightened extends EffectDesc {
    public description(effect: Effect, character: Character): string {
        if (character.stats.cor >= 10)
            return "<b>DISABLED</b> - Corruption too high!";
        else
            return super.description();
    }

    public constructor() {
        super("Enlightened", "Enlightened", "Jojo’s tutelage has given you a master’s focus and you can feel the universe in all its glory spread out before you. You’ve finally surpassed your teacher.");
    }
}