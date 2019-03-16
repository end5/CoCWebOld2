define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Beard {
        constructor() {
            this.style = "";
            this.length = 0;
        }
        hasBeard() {
            return this.length > 0;
        }
        serialize() {
            return {
                style: this.style,
                length: this.length
            };
        }
        deserialize(saveObject) {
            this.style = saveObject.style;
            this.length = saveObject.length;
        }
    }
    exports.Beard = Beard;
});
//# sourceMappingURL=Beard.js.map