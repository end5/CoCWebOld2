import { randInt } from '../../../../../Engine/Utilities/SMath';
import { PerkType } from '../../../../Effects/PerkType';
import { Character } from '../../../Character';
import { LearnedSpellAction } from '../LearnedSpellAction';
import { CView } from '../../../../../Page/ContentView';
import { IActionDamage } from '../../../../Combat/Actions/CombatAction';

export class CleansingPalm extends LearnedSpellAction {
    public name: string = "C.Palm";
    public readonly baseCost: number = 30;

    public isPossible(character: Character): boolean {
        return character.perks.has(PerkType.CleansingPalm) && character.stats.cor < 10;
    }

    public consumeComponents(character: Character, monster: Character): void {
        character.stats.fatigueMagic(this.baseCost);
    }

    public calcDamage(character: Character, monster: Character): void | IActionDamage {
        let corruptionMulti: number = (monster.stats.cor - 20) / 25;
        if (corruptionMulti > 1.5) corruptionMulti = 1.5;

        return { damage:  Math.floor((character.stats.int / 4 + randInt(character.stats.int / 3)) * (character.combat.stats.spellMod() * corruptionMulti)) };
    }

    public applyDamage(character: Character, monster: Character, damage: number, lust: number, crit: boolean): void {
        CView.clear();
        if (damage > 0) {
            CView.text("You thrust your palm forward, causing a blast of pure energy to slam against " + monster.desc.a + monster.desc.short + ", tossing");
            CView.text(" " + monster.desc.objectivePronoun);
            CView.text(" back a few feet.\n\n");

            CView.text(monster.desc.capitalA + monster.desc.short + " takes " + damage + " damage.\n\n");
        }
        else {
            damage = 0;
            CView.text("You thrust your palm forward, causing a blast of pure energy to slam against " + monster.desc.a + monster.desc.short + ", which they ignore. It is probably best you don’t use this technique against the pure.\n\n");
        }
        monster.combat.stats.loseHP(damage);
    }
}
