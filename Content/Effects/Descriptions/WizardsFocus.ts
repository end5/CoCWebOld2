import { Effect } from 'Engine/Effects/Effect';
import { EffectDesc } from 'Engine/Effects/EffectDesc';
import { EffectType } from 'Content/Effects/EffectType';

export class WizardsFocus extends EffectDesc {
    public description(effect: Effect): string {
        if (!effect.values.spellCost)
            effect.values.spellCost = 0;
        return "Increases your spell effect modifier by " + effect.values.spellCost * 100 + "%.";
    }

    public constructor() {
        super(EffectType.WizardsFocus, "Wizard's Focus",
            "Your wizard's staff grants you additional focus, reducing the use of fatigue for spells.");
    }
}
