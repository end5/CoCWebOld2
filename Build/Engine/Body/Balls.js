define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Balls {
        constructor() {
            this.count = 0;
            this.size = 0;
        }
        serialize() {
            return {
                count: this.count,
                size: this.size
            };
        }
        deserialize(saveObject) {
            this.count = saveObject.count;
            this.size = saveObject.size;
        }
    }
    exports.Balls = Balls;
});
//# sourceMappingURL=Balls.js.map