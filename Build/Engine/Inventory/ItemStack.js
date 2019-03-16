define(["require", "exports", "Engine/Items/ItemDict"], function (require, exports, ItemDict_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class ItemStack {
        constructor(item, quantity = 0, maxQuantity = 5) {
            this.item = item;
            this.amount = quantity;
            this.maxAmount = maxQuantity;
        }
        static FilterName(name) {
            return (itemStack) => {
                return itemStack.quantity > 0 && !!itemStack.item && itemStack.item.name === name;
            };
        }
        static TotalQuantityOf(name) {
            return (prev, curr) => {
                if (curr.item && curr.item.name === name)
                    return prev + curr.quantity;
                return prev;
            };
        }
        get quantity() {
            return this.amount;
        }
        set quantity(value) {
            if (this.item && value >= 0) {
                this.amount = value <= this.maxAmount ? value : this.maxAmount;
                if (value === 0) {
                    this.item = undefined;
                }
            }
        }
        get maxQuantity() {
            return this.maxAmount;
        }
        set(itemStack) {
            this.item = itemStack.item;
            this.amount = itemStack.amount;
            this.maxAmount = itemStack.maxAmount;
        }
        split(amount) {
            if (amount > 0) {
                const quantity = this.quantity - amount > 0 ? this.quantity - amount : 0;
                const returnItemStack = new ItemStack(this.item, quantity);
                this.quantity -= quantity;
                return returnItemStack;
            }
            return new ItemStack();
        }
        serialize() {
            if (this.item)
                return {
                    item: this.item.serialize(),
                    amount: this.amount,
                    maxAmount: this.maxAmount
                };
        }
        deserialize(saveObject) {
            if (saveObject) {
                if (saveObject.item)
                    this.item = ItemDict_1.ItemDict.getByName(saveObject.item.name);
                this.amount = saveObject.amount;
                this.maxAmount = saveObject.maxAmount;
            }
        }
    }
    ItemStack.TotalQuantity = (previousValue, currentValue) => {
        return previousValue + currentValue.quantity;
    };
    ItemStack.EmptySlot = (a) => {
        return a.quantity === 0;
    };
    ItemStack.NotMaxStack = (a) => {
        return a.quantity < a.maxQuantity;
    };
    ItemStack.HighestQuantity = (a, b) => {
        return a.quantity - b.quantity;
    };
    ItemStack.LowestQuantity = (a, b) => {
        return b.quantity - a.quantity;
    };
    exports.ItemStack = ItemStack;
});
//# sourceMappingURL=ItemStack.js.map