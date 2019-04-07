import { Flags } from 'Engine/Flags';
import { Character } from 'Content/Character/Character';
import { NextScreenChoices } from 'Engine/Display/ScreenDisplay';
import { sceneNotImplimented } from 'Content/Scenes/NotImplemented';

export const HighMountainFlags = Flags.register("High Mountain", {
    TIMES_EXPLORED: 0,
});

export function exploreHighMountain(player: Character): NextScreenChoices {
    return sceneNotImplimented();
}
