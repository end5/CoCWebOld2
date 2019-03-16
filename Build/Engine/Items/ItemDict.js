define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class ItemDictionary {
        constructor() {
            this.nameSet = {};
            this.typeSet = {};
        }
        add(item) {
            if (this.nameSet[item.name])
                throw new Error("Item " + item.name + " already exists");
            this.nameSet[item.name] = item;
            if (!this.typeSet[item.type])
                this.typeSet[item.type] = [];
            this.typeSet[item.type].push(item);
        }
        getByName(name) {
            if (!this.nameSet[name])
                throw new Error("Item " + name + " does not exists");
            return this.nameSet[name];
        }
        getItemsByType(type) {
            if (!this.typeSet[type])
                throw new Error("Item type " + type + " does not exists");
            return this.typeSet[type].slice();
        }
    }
    exports.ItemDict = new ItemDictionary();
});
//# sourceMappingURL=ItemDict.js.map