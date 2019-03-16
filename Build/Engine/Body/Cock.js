define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var CockType;
    (function (CockType) {
        CockType[CockType["HUMAN"] = 0] = "HUMAN";
        CockType[CockType["HORSE"] = 1] = "HORSE";
        CockType[CockType["DOG"] = 2] = "DOG";
        CockType[CockType["DEMON"] = 3] = "DEMON";
        CockType[CockType["TENTACLE"] = 4] = "TENTACLE";
        CockType[CockType["CAT"] = 5] = "CAT";
        CockType[CockType["LIZARD"] = 6] = "LIZARD";
        CockType[CockType["ANEMONE"] = 7] = "ANEMONE";
        CockType[CockType["KANGAROO"] = 8] = "KANGAROO";
        CockType[CockType["DRAGON"] = 9] = "DRAGON";
        CockType[CockType["DISPLACER"] = 10] = "DISPLACER";
        CockType[CockType["FOX"] = 11] = "FOX";
        CockType[CockType["BEE"] = 12] = "BEE";
        CockType[CockType["UNDEFINED"] = 13] = "UNDEFINED";
    })(CockType = exports.CockType || (exports.CockType = {}));
    class Cock {
        constructor(length = 5.5, thickness = 1, type = CockType.HUMAN, knotMultiplier = 1) {
            this.type = type;
            this.length = length;
            this.thickness = thickness;
            this.knotMultiplier = knotMultiplier;
        }
        /**
         * Returns a list of cocks that fit with a least a min. If the min cannot be met, then return a sorted array instead.
         * @param area Area to match
         * @param min The minimum amount of cocks required
         * @param sortOption An optional sort option. If one is not provided, then the array is returned.
         */
        static CocksThatFitOrSort(area, min, sortOption) {
            return (previousValue, currentValue, index, array) => {
                if (Cock.CockThatFits(area)(currentValue, index, array))
                    previousValue.push(currentValue);
                if (index < array.length - 1 || previousValue.length >= min)
                    return previousValue;
                else if (sortOption)
                    return array.slice().sort(sortOption);
                else
                    return array.slice();
            };
        }
        // Note: DogCocks/FoxCocks are functionally identical. They actually change back and forth depending on some
        // of the PC's attributes, and this is recaluculated every hour spent at camp.
        // As such, delineating between the two is kind of silly.
        static FilterType(type) {
            return (a) => {
                return a.type === type && (a.type === CockType.DOG || a.type === CockType.FOX);
            };
        }
        static CocksThatFit(area) {
            return (a) => {
                return a.area <= area;
            };
        }
        static CockThatFits(area) {
            return (a) => {
                return a.area <= area;
            };
        }
        /**
         * Filter selected cock.area >= supplied area.
         * @param area Area
         */
        static LargerThan(area) {
            return (a) => {
                return a.area >= area;
            };
        }
        /**
         * Filter selected cock.length >= supplied length.
         * @param length Length
         */
        static LongerThan(length) {
            return (a) => {
                return a.length >= length;
            };
        }
        /**
         * Filter selected cock.thickness >= supplied thickness.
         * @param length Length
         */
        static ThickerThan(length) {
            return (a) => {
                return a.length >= length;
            };
        }
        get area() {
            return this.thickness * this.length;
        }
        hasSheath() {
            switch (this.type) {
                case CockType.CAT:
                case CockType.DISPLACER:
                case CockType.DOG:
                case CockType.FOX:
                case CockType.HORSE:
                case CockType.KANGAROO:
                    return true;
                default:
                    return false;
            }
        }
        hasKnot() {
            switch (this.type) {
                case CockType.DISPLACER:
                case CockType.DOG:
                case CockType.FOX:
                    return true;
                default:
                    return false;
            }
        }
        canAutoFellate() {
            return this.length >= 20;
        }
        serialize() {
            return {
                length: this.length,
                thickness: this.thickness,
                type: this.type,
                knotMultiplier: this.knotMultiplier
            };
        }
        deserialize(saveObject) {
            this.length = saveObject.length;
            this.thickness = saveObject.thickness;
            this.type = saveObject.type;
            this.knotMultiplier = saveObject.knotMultiplier;
        }
    }
    Cock.Smallest = (a, b) => {
        return a.area - b.area;
    };
    Cock.Largest = (a, b) => {
        return b.area - a.area;
    };
    Cock.Shortest = (a, b) => {
        return a.length - b.length;
    };
    Cock.Longest = (a, b) => {
        return b.length - a.length;
    };
    Cock.Thinnest = (a, b) => {
        return a.thickness - b.thickness;
    };
    Cock.Thickest = (a, b) => {
        return b.thickness - a.thickness;
    };
    Cock.KnotLargest = (a, b) => {
        return a.knotMultiplier - b.knotMultiplier;
    };
    Cock.KnotSmallest = (a, b) => {
        return b.knotMultiplier - a.knotMultiplier;
    };
    Cock.HasSheath = (a) => {
        return a.hasSheath();
    };
    Cock.HasKnot = (a) => {
        return a.hasKnot();
    };
    Cock.CanAutoFellate = (a) => {
        return a.canAutoFellate();
    };
    Cock.TotalThickness = (previousValue, currentValue) => {
        return previousValue + currentValue.thickness;
    };
    Cock.TotalLength = (previousValue, currentValue) => {
        return previousValue + currentValue.thickness;
    };
    Cock.AverageThickness = (previousValue, currentValue, index, array) => {
        if (index >= array.length - 1)
            return previousValue / index;
        return previousValue + currentValue.thickness;
    };
    Cock.AverageLength = (previousValue, currentValue, index, array) => {
        if (index >= array.length - 1)
            return previousValue / index;
        return previousValue + currentValue.length;
    };
    Cock.AverageArea = (previousValue, currentValue, index, array) => {
        if (index >= array.length - 1)
            return previousValue / index;
        return previousValue + currentValue.area;
    };
    Cock.MajorityType = (previousValue, currentValue, _index, array) => {
        return array.filter((cock) => cock.type === previousValue).length >= array.filter((cock) => cock.type === currentValue.type).length ? previousValue : currentValue.type;
    };
    exports.Cock = Cock;
});
//# sourceMappingURL=Cock.js.map