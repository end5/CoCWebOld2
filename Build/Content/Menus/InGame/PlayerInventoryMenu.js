define(["require", "exports", "Engine/Inventory/InventoryDisplay", "Engine/Display/MainScreen", "Engine/Display/ContentView", "./PlayerMenu"], function (require, exports, InventoryDisplay_1, MainScreen_1, ContentView_1, PlayerMenu_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function inventoryMenu(player) {
        MainScreen_1.MainScreen.topButtons.hide();
        displayInventory(player);
        const choices = [];
        if (player.inventory.equippedWeaponSlot.isEquipped()) {
            choices[0] = ["Unequip", () => player.inventory.items.addItem(player, player.inventory.equippedWeaponSlot.unequip(), inventoryMenu)];
        }
        ContentView_1.CView.text("\nWhich item will you use?");
        choices[choices.length] = ["Back", PlayerMenu_1.playerMenu];
        // Removes empty buttons for more inventory buttons
        return InventoryDisplay_1.displayCharInventory(player, PlayerMenu_1.playerMenu, choices);
    }
    exports.inventoryMenu = inventoryMenu;
    function displayInventory(player) {
        ContentView_1.CView.clear();
        ContentView_1.CView.text("<b><u>Equipment:</u></b>\n");
        ContentView_1.CView.text("<b>Weapon</b>: " + player.inventory.weapon.displayName + " (Attack - " + player.inventory.weapon.attack + ")\n");
        ContentView_1.CView.text("<b>Armor : </b>" + player.inventory.armor.displayName + " (Defense - " + player.inventory.armor.defense + ")\n");
        // if (player.inventory.keyItems.keys().length > 0)
        //     CView.text("<b><u>\nKey Items:</u></b>\n");
        // for (const keyItem of player.inventory.keyItems.keys())
        //     CView.text(keyItem + "\n");
    }
    exports.displayInventory = displayInventory;
});
//# sourceMappingURL=PlayerInventoryMenu.js.map