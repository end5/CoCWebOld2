import { Effect } from 'Engine/Effects/Effect';
import { EffectDesc } from 'Engine/Effects/EffectDesc';
import { EffectType } from 'Content/Effects/EffectType';

export class PiercedCrimstone extends EffectDesc {
    public description(effect: Effect): string {
        if (!effect.values.minLust)
            effect.values.minLust = 0;
        return "Increases minimum lust by " + Math.round(effect.values.minLust) + ".";
    }

    public constructor() {
        super(EffectType.PiercedCrimstone, "Pierced: Crimstone",
            "You've been pierced with Crimstone and your lust seems to stay a bit higher than before.");
    }
}
