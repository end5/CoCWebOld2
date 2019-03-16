import { ICombatRewards } from './ICombatRewards';
import { EndScenes } from './EndScenes';
import { Character } from 'Engine/Character/Character';
import { Dictionary } from 'Engine/Utilities/Dictionary';
import { IReaction } from './Actions/IReaction';
import { CombatAction } from './Actions/CombatAction';
import { randInt } from 'Engine/Utilities/SMath';
import { CView } from 'Engine/Display/ContentView';

export class CombatContainer {
    public useAI: boolean = true;
    public readonly action: CombatAction;
    public endScenes: EndScenes;
    public readonly rewards: ICombatRewards;
    public readonly reactions: Dictionary<string, IReaction>;

    private char: Character;

    public constructor(character: Character, values: { mainAction: CombatAction, endScenes: EndScenes, rewards: ICombatRewards, reactions?: Dictionary<string, IReaction> }) {
        this.char = character;

        this.action = values.mainAction;

        if (values.reactions)
            this.reactions = values.reactions;
        else
            this.reactions = new Dictionary();

        this.endScenes = values.endScenes;
        this.rewards = values.rewards;
    }

    public hasSpells(): boolean {
        return this.spellCount() > 0;
    }

    public spellCount(): number {
        return []
            .filter((name: string) => {
                return this.char.effects.has(name);
            })
            .length;
    }

    public HP(): number {
        return this.char.stats.HP;
    }

    public HPRatio(): number {
        return this.char.stats.HP / this.char.stats.maxHP;
    }

    public gainHP(value: number): number {
        const oldHP = this.char.stats.HP;
        this.char.stats.HP += value;
        return oldHP - this.char.stats.HP;
    }

    public loseHP(value: number): number {
        const oldHP = this.char.stats.HP;
        this.char.stats.HP -= value;
        return oldHP - this.char.stats.HP;
    }

    /**
     * @return 0: did not avoid; 1-3: avoid with varying difference between
     * speeds (1: narrowly avoid, 3: deftly avoid)
     */
    public speedDodge(enemy: Character): number {
        const diff: number = this.char.stats.spe - enemy.stats.spe;
        const rnd: number = randInt((diff / 4) + 80);
        if (rnd <= 80) return 0;
        else if (diff < 8) return 1;
        else if (diff < 20) return 2;
        else return 3;
    }

    public defense(): number {
        return this.char.inventory.armor.defense;
    }

    public attack(): number {
        return this.char.inventory.weapon.attack;
    }

    public spellMod(): number {
        return 1;
    }

    public teaseXP(XP: number = 0) {
        while (XP > 0) {
            XP--;
            this.char.stats.teaseXP++;
            // Level dat shit up!
            if (this.char.stats.teaseLevel < 5 && this.char.stats.teaseXP >= 10 + (this.char.stats.teaseLevel + 1) * 5 * (this.char.stats.teaseLevel + 1)) {
                CView.text("\n<b>Tease skill leveled up to " + (this.char.stats.teaseLevel + 1) + "!</b>");
                this.char.stats.teaseLevel++;
                this.char.stats.teaseXP = 0;
            }
        }
    }
}
