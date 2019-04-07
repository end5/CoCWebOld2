import { CombatAction, CanUseResult } from 'Engine/Combat/Actions/CombatAction';
import { Character } from 'Content/Character/Character';
import { randomChoice } from 'Engine/Utilities/SMath';

export abstract class SubAction extends CombatAction {
    public canUse(character: Character, target: Character): CanUseResult {
        return { canUse: !!this.subActions.find((action) => action.canUse(character, target).canUse) };
    }

    public use(character: Character, target: Character): void {
        randomChoice(this.subActions).use(character, target);
    }
}
