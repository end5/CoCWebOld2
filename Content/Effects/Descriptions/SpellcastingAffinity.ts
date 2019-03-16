import { Effect } from 'Engine/Effects/Effect';
import { EffectDesc } from 'Engine/Effects/EffectDesc';
import { EffectType } from 'Content/Effects/EffectType';

export class SpellcastingAffinity extends EffectDesc {
    public description(effect: Effect): string {
        if (!effect.values.spellCost)
            effect.values.spellCost = 0;
        return "Reduces spell costs by " + effect.values.spellCost + "%.";
    }

    public constructor() {
        super(EffectType.SpellcastingAffinity, "Spellcasting Affinity", "Reduces spell costs.");
    }
}
