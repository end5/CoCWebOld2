import { Character } from 'Engine/Character/Character';
import { EffectType } from 'Content/Effects/EffectType';
import { EquipSlot } from 'Engine/Inventory/EquipSlot';
import { CockSockName } from 'Content/Items/CockSockName';
import { CockSock } from 'Engine/Items/CockSock';

export class CockRing extends CockSock {
    public constructor() {
        super(CockSockName.Cockring);
    }

    public onEquip(character: Character) {
        let pentUp = character.effects.getByName(EffectType.PentUp);
        if (!pentUp) {
            pentUp = character.effects.create(EffectType.PentUp, { minLust: 0 });
        }
        else {
            const numRings = character.inventory.cockSocks.reduce((prev: number, cur: EquipSlot<CockSock>) => {
                if (cur && cur.item && cur.item.name === "Cockring")
                    prev++;
                return prev;
            }, -1);
            pentUp.values.minLust = 5 + (numRings * 5);
        }
    }

    public onUnequip(character: Character) {
        const pentUp = character.effects.getByName(EffectType.PentUp);
        if (pentUp) {
            const numRings = character.inventory.cockSocks.reduce((prev: number, cur: EquipSlot<CockSock>) => {
                if (cur && cur.item && cur.item.name === "Cockring")
                    prev++;
                return prev;
            }, -1);
            if (numRings === 0) {
                character.effects.removeByName(EffectType.PentUp);
            }
            else
                pentUp.values.minLust = 5 + (numRings * 5);
        }
    }
}
