define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Nipples {
        constructor() {
            this.count = 1;
            this.length = 0.25;
            this.fuckable = false;
        }
        serialize() {
            return {
                count: this.count,
                fuckable: this.fuckable,
                length: this.length,
            };
        }
        deserialize(saveObject) {
            this.count = saveObject.count;
            this.length = saveObject.length;
            this.fuckable = saveObject.fuckable;
        }
    }
    exports.Nipples = Nipples;
});
//# sourceMappingURL=Nipples.js.map