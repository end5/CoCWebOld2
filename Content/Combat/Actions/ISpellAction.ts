import { Character } from 'Content/Character/Character';

export interface ISpellAction {
    readonly baseCost: number;
    spellCost(character: Character): number;
}
