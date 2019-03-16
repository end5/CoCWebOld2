import { Effect } from 'Engine/Effects/Effect';
import { EffectDesc } from 'Engine/Effects/EffectDesc';
import { EffectType } from 'Content/Effects/EffectType';

export class ElvenBounty extends EffectDesc {
    public description(effect: Effect): string {
        if (!effect.values.fertility)
            effect.values.fertility = 0;
        if (!effect.values.cumQuantity)
            effect.values.cumQuantity = 0;
        return "Increases fertility by " + effect.values.fertility + "% and cum production by " + effect.values.cumQuantity + "mLs.";
    }

    public constructor() {
        super(EffectType.ElvenBounty, "Elven Bounty",
            "After your encounter with an elf, her magic has left you with increased fertility and virility.");
    }
}
