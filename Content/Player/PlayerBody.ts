import { Body } from 'Engine/Body/Body';
import { Player } from 'Content/Player/Player';
import { EffectType } from 'Content/Effects/EffectType';
import { MASSAGE_MODELLING_BONUS } from 'Content/Scenes/Places/TelAdre/UmasShop';

export class PlayerBody extends Body {
    public constructor(private player: Player) { super(); }

    public get femininity(): number {
        return this.femStat;
    }

    public set femininity(value: number) {
        const umasMassage = this.player.effects.getByName(EffectType.UmasMassage);

        if (umasMassage && umasMassage.values.type && umasMassage.values.type === MASSAGE_MODELLING_BONUS && umasMassage.values.bonusValue)
            this.femStat += umasMassage.values.bonusValue;

        super.femininity = value;
    }
}
