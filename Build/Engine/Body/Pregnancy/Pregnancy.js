define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var PregnancySize;
    (function (PregnancySize) {
        PregnancySize[PregnancySize["NOT_PREGANT"] = 0] = "NOT_PREGANT";
        PregnancySize[PregnancySize["NO_SIGNS_UNKNOWN"] = 1] = "NO_SIGNS_UNKNOWN";
        PregnancySize[PregnancySize["NO_SIGNS_KNOWN"] = 2] = "NO_SIGNS_KNOWN";
        PregnancySize[PregnancySize["START_BULGE"] = 3] = "START_BULGE";
        PregnancySize[PregnancySize["SWOLLEN"] = 4] = "SWOLLEN";
        PregnancySize[PregnancySize["SIZEABLE"] = 5] = "SIZEABLE";
        PregnancySize[PregnancySize["BLATANT"] = 6] = "BLATANT";
        PregnancySize[PregnancySize["FULL_TERM"] = 7] = "FULL_TERM";
        PregnancySize[PregnancySize["OVERDUE"] = 8] = "OVERDUE";
        PregnancySize[PregnancySize["VERY_OVERDUE"] = 9] = "VERY_OVERDUE";
    })(PregnancySize = exports.PregnancySize || (exports.PregnancySize = {}));
    class Pregnancy {
        constructor(type, incubation) {
            this.type = type;
            this.incubation = incubation;
        }
        serialize() {
            return {
                type: this.type,
                incubation: this.incubation
            };
        }
        deserialize(saveObject) {
            this.type = saveObject.type;
            this.incubation = saveObject.incubation;
        }
    }
    Pregnancy.LargestIncubationTime = (first, second) => {
        return second.incubation - first.incubation;
    };
    Pregnancy.SmallestIncubationTime = (first, second) => {
        return first.incubation - second.incubation;
    };
    exports.Pregnancy = Pregnancy;
});
//# sourceMappingURL=Pregnancy.js.map