import { EffectType } from 'Content/Effects/EffectType';
import { IEffectValue } from 'Engine/Effects/Effect';
import { CombatActionType } from 'Engine/Combat/Actions/CombatActionType';

export interface EffectValueMap {
    [EffectType.SluttySeduction]: { teaseDamage: number } & IEffectValue;
    [EffectType.ElvenBounty]: { virility: number };
    [EffectType.WizardsEndurance]: { spellCost: number };
    [EffectType.PentUp]: { minLust: number };
    [EffectType.BonusACapacity]: { analCapacity: number };
    [EffectType.BonusVCapacity]: { vaginalCapacity: number };
    [EffectType.Contraceptives]: { combatExpire: number };
    [EffectType.CuntStretched]: { hoursSince: number };
    [EffectType.LustStickApplied]: { hourExpire: number };
    [EffectType.Dysfunction]: { hourExpire: number };
    [EffectType.PhoukaWhiskeyAffect]: {
        hourExpire: number,
        lib: number,
        sens: number,
        spe: number,
        int: number,
        drinksSoFar: number,
    };
    [EffectType.LustyTongue]: { combatExpire: number };
    [EffectType.SlimeCraving]: { duration: number };
    [EffectType.WizardsFocus]: { spellCost: number };
    [EffectType.Strong]: { str: number };
    [EffectType.Tough]: { tou: number };
    [EffectType.Fast]: { spe: number };
    [EffectType.Smart]: { int: number };
    [EffectType.Lusty]: { lib: number };
    [EffectType.Sensitive]: { sens: number };
    [EffectType.Heat]: {
        fertility: number,
        lib: number,
        hourExpire: number
    };
    [EffectType.ButtStretched]: { hoursSince: number };
    [EffectType.SpellcastingAffinity]: { spellCost: number };
    [EffectType.NagaVenom]: { spe: number };
    [EffectType.Level]: { level: number };
    [EffectType.AkbalSpeed]: { spe: number };
    [EffectType.ParalyzeVenom]: { str: number, spe: number };
    [EffectType.PCTailTangle]: { counter: number };
    [EffectType.Illusion]: { spe: number };
    [EffectType.Sealed]: { combatExpire: number, blockedTypes: CombatActionType };
    [EffectType.Gigafire]: { counter: number };
    [EffectType.LustStones]: { lust: number };
    [EffectType.UmasMassage]: { type: number, bonusValue: number, duration: number };
    [EffectType.BirthedImps]: { amount: number };
    [EffectType.Blind]: { combatExpire: number };
}
