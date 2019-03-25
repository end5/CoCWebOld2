import { NextScreenChoices } from 'Engine/Display/ScreenDisplay';
import { sceneNotImplimented } from 'Content/Scenes/NotImplemented';
import { Flags } from 'Engine/Flags';

export const HelFlags = Flags.register("Hel", {
    PC_PROMISED_HEL_MONOGAMY_FUCKS: 0,
    HEL_RAPED_TODAY: 0,
});

export function helSexualAmbush(): NextScreenChoices {
    return sceneNotImplimented();
}

export function followerHel() {
    return false;
}
