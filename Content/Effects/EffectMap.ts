import { EffectType } from 'Content/Effects/EffectType';
import { CombatActionType } from 'Engine/Combat/Actions/CombatActionType';
import { IEffectValueMap } from 'Engine/Effects/EffectList';

interface CombatBlocker { blockedTypes?: CombatActionType; }

export interface EffectValueMap extends IEffectValueMap {
    [EffectType.SluttySeduction]: { teaseChance: number } & CombatBlocker;
    [EffectType.ElvenBounty]: { virility: number };
    // [EffectType.AteEgg]: { virility: number };
}
