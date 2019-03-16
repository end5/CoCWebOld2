define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Clit {
        constructor() {
            this.length = 0.25;
        }
        serialize() {
            return {
                length: this.length
            };
        }
        deserialize(saveObject) {
            this.length = saveObject.length;
        }
    }
    exports.Clit = Clit;
});
//# sourceMappingURL=Clit.js.map