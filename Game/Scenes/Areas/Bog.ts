import { Flags } from 'Game/Flags';
import { Character } from 'Game/Character/Character';
import { NextScreenChoices } from 'Game/ScreenDisplay';
import { sceneNotImplimented } from 'Game/Scenes/NotImplemented';

export const BogFlags = Flags.register("Bog", {
    TIMES_EXPLORED: 0,
});

export function exploreBog(player: Character): NextScreenChoices {
    return sceneNotImplimented();
}
