define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class ItemDesc {
        constructor(shortName, longName, detailedDesc) {
            this.shortName = shortName;
            this.longName = longName || this.shortName;
            this.detailedDesc = detailedDesc || this.longName;
        }
        description(character) {
            return this.detailedDesc;
        }
    }
    exports.ItemDesc = ItemDesc;
});
//# sourceMappingURL=ItemDesc.js.map