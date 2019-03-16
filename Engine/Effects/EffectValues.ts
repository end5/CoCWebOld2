import { CombatActionType } from 'Engine/Combat/Actions/CombatActionType';

export interface IEffectValues {
    combatExpire?: number;
    hourExpire?: number;
    attack?: number;
    weapon?: number;
    spell?: number;
    spellCost?: number;
    defense?: number;
    teaseChance?: number;
    teaseDamage?: number;
    str?: number;
    tou?: number;
    spe?: number;
    int?: number;
    lib?: number;
    sens?: number;
    cor?: number;
    fatigue?: number;
    hp?: number;
    lust?: number;
    minLust?: number;
    femininity?: number;
    fertility?: number;
    cumQuantity?: number;
    cumMultiplier?: number;
    virility?: number;
    vaginalCapacity?: number;
    analCapacity?: number;
    blockedTypes?: CombatActionType;
    [x: string]: number | undefined;
}
