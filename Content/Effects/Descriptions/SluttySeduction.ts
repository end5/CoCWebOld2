import { Effect } from 'Engine/Effects/Effect';
import { EffectDesc } from 'Engine/Effects/EffectDesc';
import { EffectType } from 'Content/Effects/EffectType';

export class SluttySeduction extends EffectDesc {
    public description(effect: Effect): string {
        if (!effect.values.teaseDamage)
            effect.values.teaseDamage = 0;
        return "Increases odds of successfully teasing and lust damage of successful teases by " + effect.values.teaseDamage + " points.";
    }

    public constructor() {
        super(EffectType.SluttySeduction, "Slutty Seduction",
            "Your armor allows you access to 'Seduce', an improved form of 'Tease'.");
    }
}
