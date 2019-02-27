import { Weapon } from 'Engine/Items/Weapon';
import { WeaponName } from '../WeaponName';
import { WeaponPerkType } from 'Content/Items/WeaponPerks';
import { Character } from 'Engine/Character/Character';
import { EffectType } from 'Content/Effects/EffectType';
import { ItemDesc } from 'Engine/Items/ItemDesc';

export class Spellblade extends Weapon {
    public constructor() {
        super(WeaponName.Spellblade, new ItemDesc("S.Blade", "a spellblade", "Forged not by a swordsmith but a sorceress, this arcane-infused blade amplifies your magic.  Unlike the wizard staves it is based on, this weapon also has a sharp edge, a technological innovation which has proven historically useful in battle."), "inscribed spellblade", "slash", 8, 500, [WeaponPerkType.WizardsFocus]);
    }

    public onEquip(character: Character): void {
        while (character.effects.has(EffectType.WizardsFocus))
            character.effects.removeByName(EffectType.WizardsFocus);
        character.effects.create(EffectType.WizardsFocus, { spellCost: 0.5 });
    }

    public onUnequip(character: Character): void {
        while (character.effects.has(EffectType.WizardsFocus))
            character.effects.removeByName(EffectType.WizardsFocus);
    }
}
