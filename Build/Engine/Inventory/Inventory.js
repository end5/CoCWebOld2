define(["require", "exports", "./ItemStack", "Engine/Utilities/List", "Engine/Inventory/InventoryDisplay", "Engine/Items/ItemDict"], function (require, exports, ItemStack_1, List_1, InventoryDisplay_1, ItemDict_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Inventory extends List_1.List {
        unlock(amount = 1) {
            while (amount > 0) {
                this.add(new ItemStack_1.ItemStack());
                amount--;
            }
        }
        lock(amount = 1) {
            while (amount > 0) {
                this.remove(this.list.length - 1);
                amount--;
            }
        }
        has(itemName) {
            return !!this.list.find(ItemStack_1.ItemStack.FilterName(itemName));
        }
        /**
         * Adds items to the inventory. If their are items that cannot be added, it goes to the full inventory/select what to do screen.
         * Once finished, it displays nextMenu.
         * @param characterAddingItems The character adding items to the inventory.
         * @param itemsToAdd List of ItemStack to be added.
         * @param nextMenu The menu that will display after the items are added.
         */
        addList(characterAddingItems, itemsToAdd, nextMenu) {
            return InventoryDisplay_1.displayCharInventoryFull(characterAddingItems, this.addItems(itemsToAdd), nextMenu);
        }
        /**
         * Constructs one item and adds it to the inventory. If their are items that cannot be added, it goes to the full inventory/select what to do screen.
         * Once finished, it displays nextMenu.
         * @param characterAddingItems The character adding items to the inventory.
         * @param itemType The item type.
         * @param itemName The item name.
         * @param nextMenu The menu that will display after the items are added.
         */
        createAdd(characterAddingItems, itemName, nextMenu) {
            return this.addList(characterAddingItems, [new ItemStack_1.ItemStack(ItemDict_1.ItemDict.getByName(itemName), 1)], nextMenu);
        }
        addItem(characterAddingItems, item, nextMenu) {
            return this.addList(characterAddingItems, [new ItemStack_1.ItemStack(item, 1)], nextMenu);
        }
        /**
         * Adds items to inventory and return the items that cannot be added.
         * @param itemsToAdd A list of the items to add.
         */
        addItems(itemsToAdd) {
            const returnList = [];
            while (itemsToAdd.length > 0) {
                const itemToAdd = itemsToAdd.shift();
                if (itemToAdd.item) {
                    const filteredInventory = this.filter(ItemStack_1.ItemStack.FilterName(itemToAdd.item.name)).filter(ItemStack_1.ItemStack.NotMaxStack).sort(ItemStack_1.ItemStack.HighestQuantity).concat(this.filter(ItemStack_1.ItemStack.EmptySlot));
                    while (filteredInventory.length > 0 && itemToAdd.quantity > 0) {
                        const item = filteredInventory.toArray().shift();
                        if (item.quantity + itemToAdd.quantity > item.maxQuantity) {
                            const difference = item.maxQuantity - item.quantity;
                            item.quantity = item.maxQuantity;
                            itemToAdd.quantity -= difference;
                        }
                        else {
                            item.quantity = item.maxQuantity;
                            itemToAdd.quantity = 0;
                        }
                    }
                    if (itemToAdd.quantity > 0) {
                        returnList.push(itemToAdd);
                    }
                }
            }
            return returnList;
        }
        consumeItem(itemName, amount = 1) {
            if (this.filter(ItemStack_1.ItemStack.FilterName(itemName)).length >= amount) {
                const lowestItemStacks = this.filter(ItemStack_1.ItemStack.FilterName(itemName)).sort(ItemStack_1.ItemStack.LowestQuantity);
                for (const itemStack of lowestItemStacks) {
                    if (itemStack.quantity === 0)
                        continue;
                    if (amount === 0)
                        break;
                    if (amount > itemStack.quantity) {
                        amount -= itemStack.quantity;
                        itemStack.quantity = 0;
                    }
                    else {
                        itemStack.quantity -= amount;
                        amount = 0;
                    }
                }
            }
        }
    }
    exports.Inventory = Inventory;
});
//# sourceMappingURL=Inventory.js.map