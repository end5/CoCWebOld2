define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var HipRating;
    (function (HipRating) {
        HipRating[HipRating["BOYISH"] = 0] = "BOYISH";
        HipRating[HipRating["SLENDER"] = 1] = "SLENDER";
        HipRating[HipRating["AVERAGE"] = 2] = "AVERAGE";
        HipRating[HipRating["AMPLE"] = 3] = "AMPLE";
        HipRating[HipRating["CURVY"] = 4] = "CURVY";
        HipRating[HipRating["FERTILE"] = 5] = "FERTILE";
        HipRating[HipRating["INHUMANLY_WIDE"] = 6] = "INHUMANLY_WIDE";
    })(HipRating = exports.HipRating || (exports.HipRating = {}));
    class Hips {
        constructor() {
            this.rating = HipRating.BOYISH;
        }
        serialize() {
            return {
                rating: this.rating,
            };
        }
        deserialize(saveObject) {
            this.rating = saveObject.rating;
        }
    }
    exports.Hips = Hips;
});
//# sourceMappingURL=Hips.js.map