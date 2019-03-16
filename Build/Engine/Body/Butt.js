define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var ButtWetness;
    (function (ButtWetness) {
        ButtWetness[ButtWetness["DRY"] = 0] = "DRY";
        ButtWetness[ButtWetness["NORMAL"] = 1] = "NORMAL";
        ButtWetness[ButtWetness["MOIST"] = 2] = "MOIST";
        ButtWetness[ButtWetness["SLIMY"] = 3] = "SLIMY";
        ButtWetness[ButtWetness["DROOLING"] = 4] = "DROOLING";
        ButtWetness[ButtWetness["SLIME_DROOLING"] = 5] = "SLIME_DROOLING";
    })(ButtWetness = exports.ButtWetness || (exports.ButtWetness = {}));
    var ButtLooseness;
    (function (ButtLooseness) {
        ButtLooseness[ButtLooseness["VIRGIN"] = 0] = "VIRGIN";
        ButtLooseness[ButtLooseness["TIGHT"] = 1] = "TIGHT";
        ButtLooseness[ButtLooseness["NORMAL"] = 2] = "NORMAL";
        ButtLooseness[ButtLooseness["LOOSE"] = 3] = "LOOSE";
        ButtLooseness[ButtLooseness["STRETCHED"] = 4] = "STRETCHED";
        ButtLooseness[ButtLooseness["GAPING"] = 5] = "GAPING";
    })(ButtLooseness = exports.ButtLooseness || (exports.ButtLooseness = {}));
    var ButtRating;
    (function (ButtRating) {
        ButtRating[ButtRating["BUTTLESS"] = 0] = "BUTTLESS";
        ButtRating[ButtRating["TIGHT"] = 2] = "TIGHT";
        ButtRating[ButtRating["AVERAGE"] = 4] = "AVERAGE";
        ButtRating[ButtRating["NOTICEABLE"] = 6] = "NOTICEABLE";
        ButtRating[ButtRating["LARGE"] = 8] = "LARGE";
        ButtRating[ButtRating["JIGGLY"] = 10] = "JIGGLY";
        ButtRating[ButtRating["EXPANSIVE"] = 13] = "EXPANSIVE";
        ButtRating[ButtRating["HUGE"] = 16] = "HUGE";
        ButtRating[ButtRating["INCONCEIVABLY_BIG"] = 20] = "INCONCEIVABLY_BIG";
    })(ButtRating = exports.ButtRating || (exports.ButtRating = {}));
    class Butt {
        constructor() {
            this.rating = ButtRating.BUTTLESS;
            this.wetness = ButtWetness.DRY;
            this.looseness = ButtLooseness.VIRGIN;
        }
        serialize() {
            return {
                rating: this.rating,
                wetness: this.wetness,
                looseness: this.looseness,
            };
        }
        deserialize(saveObject) {
            this.rating = saveObject.rating;
            this.wetness = saveObject.wetness;
            this.looseness = saveObject.looseness;
        }
    }
    exports.Butt = Butt;
});
//# sourceMappingURL=Butt.js.map