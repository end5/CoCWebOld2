define(["require", "exports", "Engine/Combat/Actions/CombatAction"], function (require, exports, CombatAction_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class UseItemAction extends CombatAction_1.CombatAction {
        constructor(itemStack) {
            super();
            this.name = "";
            this.itemStack = itemStack;
        }
        canUse(character, target) {
            return { canUse: !!this.itemStack.item && this.itemStack.item.canUse(character, target) };
        }
        useAction(char, enemy) {
            if (this.itemStack.item) {
                this.itemStack.item.use(char, enemy);
                this.itemStack.item.useText(char, enemy);
                this.itemStack.quantity--;
            }
        }
    }
    exports.UseItemAction = UseItemAction;
});
//# sourceMappingURL=UseItemAction.js.map