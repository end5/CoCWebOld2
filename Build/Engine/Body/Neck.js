define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Neck {
        constructor() {
            this.gills = false;
        }
        serialize() {
            return {
                gills: this.gills,
            };
        }
        deserialize(saveObject) {
            this.gills = saveObject.gills;
        }
    }
    exports.Neck = Neck;
});
//# sourceMappingURL=Neck.js.map