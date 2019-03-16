import { Character } from 'Engine/Character/Character';
import { Effect } from 'Engine/Effects/Effect';
import { EffectDesc } from 'Engine/Effects/EffectDesc';
import { EffectType } from 'Content/Effects/EffectType';

export class ControlledBreath extends EffectDesc {
    public description(effect: Effect, character: Character): string {
        if (character.stats.cor >= 30)
            return "<b>DISABLED</b> - Corruption too high!";
        else
            return super.description();
    }

    public constructor() {
        super(EffectType.ControlledBreath, "Controlled Breath", "Jojo’s training allows you to recover more quickly. Increases rate of fatigue regeneration by 10%");
    }
}
