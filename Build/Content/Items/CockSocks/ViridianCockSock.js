define(["require", "exports", "Content/Effects/EffectType", "Engine/Items/CockSock", "Content/Items/CockSockName"], function (require, exports, EffectType_1, CockSock_1, CockSockName_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Viridian extends CockSock_1.CockSock {
        constructor() {
            super(CockSockName_1.CockSockName.Viridian);
        }
        onEquip(character) {
            if (!character.effects.has(EffectType_1.EffectType.LustyRegeneration)) {
                character.effects.create(EffectType_1.EffectType.LustyRegeneration);
            }
        }
        onUnequip(character) {
            if (character.effects.has(EffectType_1.EffectType.LustyRegeneration)) {
                character.effects.removeByName(EffectType_1.EffectType.LustyRegeneration);
            }
        }
    }
    exports.Viridian = Viridian;
});
//# sourceMappingURL=ViridianCockSock.js.map