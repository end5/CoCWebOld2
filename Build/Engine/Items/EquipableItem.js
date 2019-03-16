define(["require", "exports", "./Item", "Engine/Effects/EffectList"], function (require, exports, Item_1, EffectList_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class EquipableItem extends Item_1.Item {
        constructor() {
            super(...arguments);
            this.effects = new EffectList_1.EffectList();
        }
    }
    exports.EquipableItem = EquipableItem;
});
//# sourceMappingURL=EquipableItem.js.map