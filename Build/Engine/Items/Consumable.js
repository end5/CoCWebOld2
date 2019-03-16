define(["require", "exports", "./Item", "./ItemType"], function (require, exports, Item_1, ItemType_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Consumable extends Item_1.Item {
        constructor(name, itemDesc, value) {
            super(name, ItemType_1.ItemType.Consumable, itemDesc, value);
        }
        canUse(_character) {
            return true;
        }
        use(_character) { }
        useText(_character) { }
    }
    exports.Consumable = Consumable;
});
//# sourceMappingURL=Consumable.js.map