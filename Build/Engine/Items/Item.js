define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Item {
        constructor(name, type, desc, value = Item.DefaultValue) {
            this.name = name;
            this.type = type;
            this.value = value;
            this.desc = desc;
        }
        describe() {
            return this.desc.description + " (Cost: " + this.value + ")";
        }
        serialize() {
            return {
                name: this.name,
                type: this.type
            };
        }
        deserialize(saveObject) { }
    }
    Item.DefaultValue = 6;
    exports.Item = Item;
});
//# sourceMappingURL=Item.js.map