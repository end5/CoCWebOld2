import { Character } from 'Engine/Character/Character';
import { CombatActionType } from './CombatActionType';

export interface IActionDamage {
    damage?: number;
    lust?: number;
    crit?: boolean;
}

export interface CanUseResult {
    canUse: boolean;
    reasonCannotUse?: string;
}

/*
</> = can break order

call use
</> enemy reaction - usually instant counter
consume required components
</> enemy reaction - usually instant counter
use action
</> enemy reaction - usually instant counter
if miss
    </> enemy reaction to miss
    apply miss
else hit
    calc damage
    </> enemy reaction
    apply damage
*/
export abstract class CombatAction {
    public abstract name: string;
    public type = CombatActionType.None;
    public subActions: CombatAction[] = [];
    public isPossible(character: Character): boolean { return true; }
    public canUse(character: Character, target: Character): CanUseResult { return { canUse: true }; }

    protected consumeComponents?(char: Character, enemy: Character): void;
    protected useAction?(char: Character, enemy: Character): void;
    protected checkMiss?(char: Character, enemy: Character): boolean;
    protected missed?(char: Character, enemy: Character): void;
    protected calcDamage?(char: Character, enemy: Character): undefined | IActionDamage;
    protected applyDamage?(char: Character, enemy: Character, damage: number, lust: number, crit: boolean): void;
    public use(char: Character, enemy: Character): void {
        const reaction = enemy.combat.reactions.get(this.name);
        let miss = false;
        if (reaction && reaction.beforeConsumeComponents)
            if (!reaction.beforeConsumeComponents(enemy, char)) return;

        if (this.consumeComponents)
            this.consumeComponents(char, enemy);

        if (reaction && reaction.beforeUseAction)
            if (!reaction.beforeUseAction(enemy, char)) return;

        if (this.useAction)
            this.useAction(char, enemy);
        if (this.checkMiss)
            miss = this.checkMiss(char, enemy);

        if (miss) {
            if (reaction && reaction.beforeMissed)
                if (!reaction.beforeMissed(enemy, char)) return;

            if (this.missed)
                this.missed(char, enemy);
        }
        else {
            if (this.calcDamage) {
                const initialDamage = this.calcDamage(char, enemy);

                let modifiedDamage;
                if (reaction && reaction.beforeApplyDamage) {
                    modifiedDamage = reaction.beforeApplyDamage(enemy, char, initialDamage);
                }

                if (modifiedDamage && !modifiedDamage.continue) return;

                if (this.applyDamage) {
                    let damage = 0;
                    if (modifiedDamage && modifiedDamage.damage)
                        damage = modifiedDamage.damage;
                    else if (initialDamage && initialDamage.damage)
                        damage = initialDamage.damage;

                    let lust = 0;
                    if (modifiedDamage && modifiedDamage.lust)
                        lust = modifiedDamage.lust;
                    else if (initialDamage && initialDamage.lust)
                        lust = initialDamage.lust;

                    let crit = false;
                    if (modifiedDamage && modifiedDamage.crit)
                        crit = modifiedDamage.crit;
                    else if (initialDamage && initialDamage.crit)
                        crit = initialDamage.crit;

                    this.applyDamage(char, enemy, damage, lust, crit);
                }
            }
        }
    }
}
