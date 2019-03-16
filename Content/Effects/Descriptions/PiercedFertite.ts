import { Effect } from 'Engine/Effects/Effect';
import { EffectDesc } from 'Engine/Effects/EffectDesc';
import { EffectType } from 'Content/Effects/EffectType';

export class PiercedFertite extends EffectDesc {
    public description(effect: Effect): string {
        if (!effect.values.cumQuantity)
            effect.values.cumQuantity = 0;
        if (!effect.values.fertility)
            effect.values.fertility = 0;
        return "Increases cum production by " + Math.round(2 * effect.values.cumQuantity) + "% and fertility by " + Math.round(effect.values.fertility) + ".";
    }

    public constructor() {
        super(EffectType.PiercedFertite, "Pierced: Fertite",
            "You've been pierced with Fertite and any male or female organs have become more fertile.");
    }
}
