define(["require", "exports", "./Item", "./ItemType", "Engine/Display/ContentView"], function (require, exports, Item_1, ItemType_1, ContentView_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Material extends Item_1.Item {
        constructor(name, desc, useText, value) {
            super(name, ItemType_1.ItemType.Material, desc, value);
            this.useDesc = '';
            if (useText)
                this.useDesc = useText;
        }
        canUse(character) {
            return true;
        }
        use(character) { }
        useText(character) {
            ContentView_1.CView.text(this.useDesc);
        }
    }
    exports.Material = Material;
});
//# sourceMappingURL=Material.js.map