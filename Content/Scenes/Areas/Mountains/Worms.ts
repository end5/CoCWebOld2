import { NextScreenChoices } from 'Engine/Display/ScreenDisplay';
import { playerMenu } from 'Content/Menus/InGame/PlayerMenu';
import { Character } from 'Content/Character/Character';

export function infestOrgasm(player: Character): NextScreenChoices {
    return { next: playerMenu };
}
