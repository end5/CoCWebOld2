import { Flags } from 'Engine/Flags';
import { sceneNotImplimented } from 'Content/Scenes/NotImplemented';

export const ShouldraFlags = Flags.register("Shouldra", {
    SHOULDRA_SLEEP_TIMER: 0
});

export function followerShouldra() {
    return false;
}

export function sandWitchGetsGhostly() {
    return sceneNotImplimented();
}
