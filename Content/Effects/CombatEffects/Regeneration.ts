import { Character } from 'Engine/Character/Character';
import { Effect } from 'Engine/Effects/Effect';
import { EffectType } from 'Content/Effects/EffectType';
import { ArmorName } from 'Content/Items/ArmorName';
import { displayCharacterHPChange } from 'Content/Modifiers/StatModifier';

export class Regeneration extends Effect {
    public combatTurnStart(character: Character) {
        // Regeneration
        let healingPercent = 0;
        if (character.effects.has(EffectType.Regeneration)) healingPercent += 1;
        if (character.effects.has(EffectType.Regeneration2)) healingPercent += 2;
        if (character.inventory.armor.name === ArmorName.NurseOutfit) healingPercent += 2;
        if (character.inventory.armor.name === ArmorName.GooArmor) healingPercent += 2;
        if (character.effects.has(EffectType.LustyRegeneration)) healingPercent += 1;
        if (healingPercent > 5) healingPercent = 5;
        displayCharacterHPChange(character, Math.round(character.stats.maxHP * healingPercent / 100));
    }
}
