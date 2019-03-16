import { Effect } from 'Engine/Effects/Effect';
import { EffectDesc } from 'Engine/Effects/EffectDesc';
import { EffectType } from 'Content/Effects/EffectType';

export class PentUp extends EffectDesc {
    public description(effect: Effect): string {
        if (!effect.values.minLust)
            effect.values.minLust = 0;
        return "Increases minimum lust by " + Math.round(effect.values.minLust) + " and makes you more vulnerable to seduction.";
    }

    public constructor() {
        super(EffectType.PentUp, "Pent Up", "Increases minimum lust and makes you more vulnerable to seduction");
    }
}
