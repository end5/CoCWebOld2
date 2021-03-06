import { Weapon } from 'Engine/Items/Weapon';
import { WeaponName } from '../WeaponName';
import { WeaponPerkType } from 'Content/Items/WeaponPerks';
import { ItemDesc } from 'Engine/Items/ItemDesc';
import { RaphaelFlags } from 'Content/Scenes/NPCs/Raphael';

export class JeweledRapier extends Weapon {
    public constructor() {
        super(WeaponName.JeweledRapier, new ItemDesc("JRapier", "a jeweled rapier", "This jeweled rapier is ancient but untarnished.  The hilt is wonderfully made, and fits your hand like a tailored glove.  The blade is shiny and perfectly designed for stabbing."), "jeweled rapier", "slash", 13, 1400, [WeaponPerkType.Penetrate]);
    }

    public get attack(): number {
        return (13 + RaphaelFlags.RAPHAEL_RAPIER_TRANING * 2);
    }
}
