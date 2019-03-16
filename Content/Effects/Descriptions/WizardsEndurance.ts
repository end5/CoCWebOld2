import { Effect } from 'Engine/Effects/Effect';
import { EffectDesc } from 'Engine/Effects/EffectDesc';
import { EffectType } from 'Content/Effects/EffectType';

export class WizardsEndurance extends EffectDesc {
    public description(effect: Effect): string {
        if (!effect.values.spellCost)
            effect.values.spellCost = 0;
        return "Reduces fatigue cost of spells by " + effect.values.spellCost + "%.";
    }

    public constructor() {
        super(EffectType.WizardsEndurance, "Wizard's Endurance",
            "Your spellcasting equipment makes it harder for spell-casting to fatigue you!");
    }
}
