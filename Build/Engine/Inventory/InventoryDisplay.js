define(["require", "exports", "Engine/Display/ContentView"], function (require, exports, ContentView_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * Displays character's item inventory.
     * @param character A character.
     * @param postItemUse The menu that will be displayed after using an item.
     * @param persistantChoices A list of perisistant choices.
     */
    function displayCharInventory(character, postItemUse, persistantChoices) {
        const choices = [];
        const inventory = character.inventory.items;
        for (let index = 0; index < inventory.length; index++) {
            const itemSlot = inventory.get(index);
            if (itemSlot.item) {
                choices.push([
                    itemSlot.item.desc.shortName + " x" + itemSlot.quantity,
                    () => {
                        if (itemSlot.item) {
                            itemSlot.quantity--;
                            itemSlot.item.use(character);
                            itemSlot.item.useText(character);
                        }
                        return { next: postItemUse };
                    }
                ]);
            }
        }
        return { choices, persistantChoices };
    }
    exports.displayCharInventory = displayCharInventory;
    /**
     * Inspect an inventory and take items from it.
     * @param inventory The inventory to inspect.
     * @param character The character inspecting the inventory.
     * @param prevMenu The menu to return to by pressing Back.
     */
    function displayInventoryTake(inventory, character, prevMenu) {
        const choices = [];
        const invTakingFrom = inventory;
        const invAddingTo = character.inventory.items;
        for (let index = 0; index < invTakingFrom.length; index++) {
            const itemSlot = invTakingFrom.get(index);
            if (itemSlot.item) {
                choices.push([
                    itemSlot.item.desc.shortName + " x" + itemSlot.quantity,
                    () => {
                        const pickedUpItem = itemSlot.split(1);
                        const itemsCannotAdd = invAddingTo.addItems([pickedUpItem]);
                        if (itemsCannotAdd.length > 0) {
                            const request = {
                                character,
                                itemList: itemsCannotAdd,
                                menuToDisplayUponFinish: () => displayInventoryTake(invTakingFrom, character, prevMenu),
                                otherInventory: invTakingFrom,
                                reverseActionFunc: createReverseAction(itemSlot, pickedUpItem)
                            };
                            return invFull(request);
                        }
                        return { next: prevMenu };
                    }
                ]);
            }
        }
        return { choices, persistantChoices: [["Put", () => inventoryPut(inventory, character, prevMenu)], ["Back", prevMenu]] };
    }
    exports.displayInventoryTake = displayInventoryTake;
    function inventoryPut(inventory, character, prevMenu) {
        const choices = [];
        const invTakingFrom = character.inventory.items;
        const invAddingTo = inventory;
        for (let index = 0; index < invTakingFrom.length; index++) {
            const itemSlot = invTakingFrom.get(index);
            if (itemSlot.item) {
                choices.push([
                    itemSlot.item.desc.shortName + " x" + itemSlot.quantity,
                    () => {
                        const pickedUpItem = itemSlot.split(1);
                        const itemsCannotAdd = invAddingTo.addItems([pickedUpItem]);
                        if (itemsCannotAdd.length > 0) {
                            const request = {
                                character,
                                itemList: itemsCannotAdd,
                                menuToDisplayUponFinish: () => displayInventoryTake(invTakingFrom, character, prevMenu),
                                otherInventory: invTakingFrom,
                                reverseActionFunc: createReverseAction(itemSlot, pickedUpItem)
                            };
                            invFull(request);
                        }
                        return { next: prevMenu };
                    }
                ]);
            }
        }
        return { choices, persistantChoices: [["Take", () => displayInventoryTake(inventory, character, prevMenu)], ["Back", prevMenu]] };
    }
    function createReverseAction(itemSlot, pickedUpItem) {
        return () => {
            if (itemSlot.quantity === 0) {
                itemSlot.item = pickedUpItem.item;
                itemSlot.quantity += pickedUpItem.quantity;
            }
            else
                itemSlot.quantity += pickedUpItem.quantity;
        };
    }
    /**
     * The characters inventory is full and the user must decide what to do with the items.
     * @param character The character that has no room in its inventory.
     * @param itemsToAdd The items that cannot be added to the characters inventory.
     * @param nextMenu The menu to go to once the decision is made.
     */
    function displayCharInventoryFull(character, itemsToAdd, nextMenu) {
        if (itemsToAdd.length > 0) {
            const request = {
                character,
                itemList: itemsToAdd,
                menuToDisplayUponFinish: nextMenu,
                nextMenu,
                otherInventory: character.inventory.items
            };
            return invFull(request);
        }
        else {
            return { next: nextMenu };
        }
    }
    exports.displayCharInventoryFull = displayCharInventoryFull;
    function invFull(request) {
        const choices = [];
        const inventory = request.character.inventory.items;
        const itemToAdd = request.itemList[0];
        for (let index = 0; index < inventory.length; index++) {
            const itemSlot = inventory.get(index);
            if (itemSlot.item) {
                choices.push([
                    itemSlot.item.desc.shortName + " x" + itemSlot.quantity,
                    discardFromInventory(request, itemSlot, itemToAdd)
                ]);
            }
        }
        if (itemToAdd && itemToAdd.item) {
            ContentView_1.CView.text("There is no room for " + itemToAdd.item.desc.longName + " in your inventory.  You may replace the contents of a pouch with " + itemToAdd.item.desc.longName + " or abandon it.");
            const persistantChoices = [["Back", request.menuToDisplayUponFinish]];
            if (request.reverseActionFunc) {
                persistantChoices.push(["Put Back", putBack(request)]);
            }
            persistantChoices.push(["Use Now", useNow(request)]);
            persistantChoices.push(["Abandon", abandon(request)]);
            return { choices, persistantChoices };
        }
        else {
            return { next: request.menuToDisplayUponFinish };
        }
    }
    function discardFromInventory(request, slotInInv, itemToAdd) {
        return () => {
            if (itemToAdd.item && slotInInv.item) {
                if (slotInInv.item === itemToAdd.item)
                    ContentView_1.CView.text("You discard " + itemToAdd.item.desc.longName + " from the stack to make room for the new one.");
                else if (slotInInv.quantity === 1)
                    ContentView_1.CView.text("You throw away " + slotInInv.item.desc.longName + " and replace it with " + itemToAdd.item.desc.longName + ".");
                else
                    ContentView_1.CView.text("You throw away " + slotInInv.item.desc.longName + "(x" + slotInInv.quantity + ") and replace it with " + itemToAdd.item.desc.longName + ".");
                slotInInv.item = itemToAdd.item;
                slotInInv.quantity = itemToAdd.quantity;
                request.itemList.shift();
            }
            return { next: () => invFull(request) };
        };
    }
    function putBack(request) {
        return () => {
            if (request.reverseActionFunc) {
                request.reverseActionFunc();
                request.reverseActionFunc = undefined;
            }
            if (request.otherInventory)
                return displayInventoryTake(request.otherInventory, request.character, request.menuToDisplayUponFinish);
            return { next: request.menuToDisplayUponFinish };
        };
    }
    function useNow(request) {
        return () => {
            const itemToAdd = request.itemList[0];
            if (itemToAdd && itemToAdd.item && itemToAdd.item.canUse(request.character)) {
                itemToAdd.item.use(request.character);
                itemToAdd.item.useText(request.character);
                request.reverseActionFunc = undefined;
                return destroyItem(request);
            }
            return { next: request.menuToDisplayUponFinish };
        };
    }
    function abandon(request) {
        return () => {
            return destroyItem(request);
        };
    }
    function destroyItem(request) {
        const itemToDestroy = request.itemList[0];
        itemToDestroy.quantity--;
        if (itemToDestroy.quantity <= 0)
            request.itemList.shift();
        if (request.itemList.length > 0)
            return invFull(request);
        else
            return { next: request.menuToDisplayUponFinish };
    }
});
//# sourceMappingURL=InventoryDisplay.js.map