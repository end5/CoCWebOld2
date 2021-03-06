import { Character } from 'Engine/Character/Character';
import { EffectType } from 'Content/Effects/EffectType';
import { Effect } from 'Engine/Effects/Effect';
import { EffectDesc } from 'Engine/Effects/EffectDesc';

export class LungingAttacks extends EffectDesc {
    public description(effect: Effect, character: Character): string {
        if (character.stats.spe >= 75)
            return "Grants 50% armor penetration for standard attacks.";
        else
            return "<b>You are too slow to benefit from this perk.</b>";
    }

    public constructor() {
        super(EffectType.LungingAttacks, "Lunging Attacks", "", "You choose the 'Lunging Attacks' perk, granting 50% armor penetration for standard attacks.");
    }
}
