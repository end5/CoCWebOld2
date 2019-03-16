define(["require", "exports", "./CombatActionType"], function (require, exports, CombatActionType_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
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
    class CombatAction {
        constructor() {
            this.type = CombatActionType_1.CombatActionType.None;
            this.subActions = [];
        }
        isPossible(character) { return true; }
        canUse(character, target) { return { canUse: true }; }
        use(char, enemy) {
            const reaction = enemy.combat.reactions.get(this.name);
            let miss = false;
            if (reaction && reaction.beforeConsumeComponents)
                if (!reaction.beforeConsumeComponents(enemy, char))
                    return;
            if (this.consumeComponents)
                this.consumeComponents(char, enemy);
            if (reaction && reaction.beforeUseAction)
                if (!reaction.beforeUseAction(enemy, char))
                    return;
            if (this.useAction)
                this.useAction(char, enemy);
            if (this.checkMiss)
                miss = this.checkMiss(char, enemy);
            if (miss) {
                if (reaction && reaction.beforeMissed)
                    if (!reaction.beforeMissed(enemy, char))
                        return;
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
                    if (modifiedDamage && !modifiedDamage.continue)
                        return;
                    if (this.applyDamage) {
                        const damage = modifiedDamage && modifiedDamage.damage !== undefined ? modifiedDamage.damage : (initialDamage && initialDamage.damage !== undefined ? initialDamage.damage : 0);
                        const lust = modifiedDamage && modifiedDamage.lust !== undefined ? modifiedDamage.lust : (initialDamage && initialDamage.lust !== undefined ? initialDamage.lust : 0);
                        const crit = modifiedDamage && modifiedDamage.crit !== undefined ? modifiedDamage.crit : (initialDamage && initialDamage.crit !== undefined ? initialDamage.crit : false);
                        this.applyDamage(char, enemy, damage, lust, crit);
                    }
                }
            }
        }
    }
    exports.CombatAction = CombatAction;
});
//# sourceMappingURL=CombatAction.js.map