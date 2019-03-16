define(["require", "exports", "Content/Effects/EffectType", "Content/Items/CockSockName", "Engine/Items/CockSock"], function (require, exports, EffectType_1, CockSockName_1, CockSock_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class CockRing extends CockSock_1.CockSock {
        constructor() {
            super(CockSockName_1.CockSockName.Cockring);
        }
        onEquip(character) {
            let pentUp = character.effects.getByName(EffectType_1.EffectType.PentUp);
            if (!pentUp) {
                pentUp = character.effects.create(EffectType_1.EffectType.PentUp, { minLust: 0 });
            }
            else {
                const numRings = character.inventory.cockSocks.reduce((prev, cur) => {
                    if (cur && cur.item && cur.item.name === "Cockring")
                        prev++;
                    return prev;
                }, -1);
                pentUp.values.minLust = 5 + (numRings * 5);
            }
        }
        onUnequip(character) {
            const pentUp = character.effects.getByName(EffectType_1.EffectType.PentUp);
            if (pentUp) {
                const numRings = character.inventory.cockSocks.reduce((prev, cur) => {
                    if (cur && cur.item && cur.item.name === "Cockring")
                        prev++;
                    return prev;
                }, -1);
                if (numRings === 0) {
                    character.effects.removeByName(EffectType_1.EffectType.PentUp);
                }
                else
                    pentUp.values.minLust = 5 + (numRings * 5);
            }
        }
    }
    exports.CockRing = CockRing;
});
//# sourceMappingURL=CockRing.js.map