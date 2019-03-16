define(["require", "exports", "Content/Scenes/ItemsOnFloor", "Engine/Effects/Effect"], function (require, exports, ItemsOnFloor_1, Effect_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Disarmed extends Effect_1.Effect {
        combatTurnEnd(character) {
            if (character.inventory.weapon !== character.inventory.unarmedWeaponSlot.item) {
                const droppedWeapon = character.inventory.equippedWeaponSlot.unequip();
                if (droppedWeapon)
                    ItemsOnFloor_1.ItemsOnFloor.add(droppedWeapon);
            }
        }
    }
    exports.Disarmed = Disarmed;
});
//# sourceMappingURL=Disarmed.js.map