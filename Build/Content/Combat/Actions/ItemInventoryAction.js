define(["require", "exports", "Engine/Combat/Actions/CombatAction", "Engine/Combat/Actions/CombatActionType", "Content/Menus/InGame/PlayerInventoryMenu", "Content/Combat/Actions/UseItemAction"], function (require, exports, CombatAction_1, CombatActionType_1, PlayerInventoryMenu_1, UseItemAction_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class ItemInventoryAction extends CombatAction_1.CombatAction {
        constructor(char) {
            super();
            this.name = "Items";
            this.type = CombatActionType_1.CombatActionType.Items;
            this.char = char;
        }
        get subActions() {
            return this.char.inventory.items.filter((itemStack) => !!itemStack.item).map((itemStack) => new UseItemAction_1.UseItemAction(itemStack)).toArray();
        }
        set subActions(values) { }
        use(char, enemy) {
            PlayerInventoryMenu_1.displayInventory(char);
            super.use(char, enemy);
        }
    }
    exports.ItemInventoryAction = ItemInventoryAction;
});
//# sourceMappingURL=ItemInventoryAction.js.map