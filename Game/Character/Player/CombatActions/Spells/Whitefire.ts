import { WhiteMagic } from './WhiteMagic';
import { randInt } from '../../../../../Engine/Utilities/SMath';
import { StatusEffectType } from '../../../../Effects/StatusEffectType';
import { Character } from '../../../Character';
import { CView } from '../../../../../Page/ContentView';
import { IActionDamage } from '../../../../Combat/Actions/CombatAction';

export class Whitefire extends WhiteMagic {
    public name: string = "Whitefire";
    public readonly baseCost: number = 30;

    public isPossible(character: Character): boolean {
        return character.effects.has(StatusEffectType.KnowsWhitefire);
    }

    public consumeComponents(character: Character, monster: Character): void {
        character.stats.fatigueMagic(this.baseCost);
    }

    public useAction(character: Character, monster: Character): void {
        CView.clear();
        CView.text("You narrow your eyes, focusing your mind with deadly intent.  You snap your fingers and " + monster.desc.a + monster.desc.short + " is enveloped in a flash of white flames!\n");
    }

    public calcDamage(character: Character, monster: Character): void | IActionDamage {
        return { damage: Math.floor(10 + (character.stats.int / 3 + randInt(character.stats.int / 2)) * character.combat.stats.spellMod()) };
    }

    public applyDamage(character: Character, monster: Character, damage: number, lust: number, crit: boolean): void {
        CView.text(monster.desc.capitalA + monster.desc.short + " takes " + damage + " damage.");
        CView.text("\n\n");
        monster.combat.stats.loseHP(damage);
    }
}
