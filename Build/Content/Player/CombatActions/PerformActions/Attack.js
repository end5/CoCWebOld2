define(["require", "exports", "Engine/Utilities/SMath", "Content/Combat/CombatUtils", "Content/Effects/EffectType", "Engine/Combat/Actions/CombatAction", "Content/Player/PlayerFlags", "Engine/Display/ContentView", "Engine/Combat/Actions/CombatActionType"], function (require, exports, SMath_1, CombatUtils_1, EffectType_1, CombatAction_1, PlayerFlags_1, ContentView_1, CombatActionType_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Attack extends CombatAction_1.CombatAction {
        constructor() {
            super(...arguments);
            this.name = "Attack";
            this.type = CombatActionType_1.CombatActionType.Attack;
        }
        consumeComponents(character, monster) {
            if (!character.effects.has(EffectType_1.EffectType.FirstAttack)) {
                ContentView_1.CView.clear();
                CombatUtils_1.fatigueRecovery(character);
            }
        }
        useAction(character, target) {
            if (character.effects.has(EffectType_1.EffectType.DoubleAttack) && character.stats.spe >= 50 && PlayerFlags_1.PlayerFlags.DOUBLE_ATTACK_STYLE < 2) {
                if (character.effects.has(EffectType_1.EffectType.FirstAttack))
                    character.effects.removeByName(EffectType_1.EffectType.FirstAttack);
                else {
                    // Always!
                    if (PlayerFlags_1.PlayerFlags.DOUBLE_ATTACK_STYLE === 0)
                        character.effects.create(EffectType_1.EffectType.FirstAttack);
                    // Alternate!
                    else if (character.stats.str < 61 && PlayerFlags_1.PlayerFlags.DOUBLE_ATTACK_STYLE === 1)
                        character.effects.create(EffectType_1.EffectType.FirstAttack);
                }
            }
        }
        checkMiss(character, monster) {
            return character.effects.has(EffectType_1.EffectType.Blind);
        }
        missed(character, monster) {
            if (character.effects.has(EffectType_1.EffectType.Blind))
                ContentView_1.CView.text("You attempt to attack, but as blinded as you are right now, you doubt you'll have much luck!  ");
            if (character.effects.has(EffectType_1.EffectType.FirstAttack)) {
                this.use(character, monster);
            }
            else
                ContentView_1.CView.text("\n");
        }
        calcDamage(character, monster) {
            const crit = canCrit(character);
            let damage = determineDamage(character, monster, crit);
            if (character.effects.has(EffectType_1.EffectType.HistoryFighter))
                damage *= 1.1;
            return { damage, crit };
        }
        applyDamage(character, monster, damage, lust, crit) {
            ContentView_1.CView.text("You hit " + monster.desc.a + monster.desc.short + "! (" + damage + ")");
            if (crit)
                ContentView_1.CView.text(" <b>*CRIT*</b>");
            monster.combat.loseHP(damage);
            if (character.effects.has(EffectType_1.EffectType.FirstAttack)) {
                this.use(character, monster);
            }
            else
                ContentView_1.CView.text("\n");
        }
    }
    exports.Attack = Attack;
    function canCrit(character) {
        return SMath_1.randInt(100) <= 4 || (character.effects.has(EffectType_1.EffectType.Tactician) && character.stats.int >= 50 && (character.stats.int - 50) / 5 > SMath_1.randInt(100));
    }
    function determineDamage(character, enemy, crit) {
        let damage = 0;
        // Double Attack Hybrid Reductions
        if (character.effects.has(EffectType_1.EffectType.DoubleAttack) &&
            character.stats.spe >= 50 &&
            character.stats.str > 61 &&
            PlayerFlags_1.PlayerFlags.DOUBLE_ATTACK_STYLE === 0) {
            damage = 60.5;
        }
        else
            damage = character.stats.str;
        // Weapon addition!
        damage += character.inventory.weapon.attack;
        // Determine if critical hit!
        if (crit) {
            damage *= 1.75;
        }
        // Thunderous Strikes
        if (character.effects.has(EffectType_1.EffectType.ThunderousStrikes) && character.stats.str >= 80)
            damage *= 1.2;
        damage = Math.round(damage);
        return damage;
    }
});
//# sourceMappingURL=Attack.js.map