define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var FaceType;
    (function (FaceType) {
        FaceType[FaceType["HUMAN"] = 0] = "HUMAN";
        FaceType[FaceType["HORSE"] = 1] = "HORSE";
        FaceType[FaceType["DOG"] = 2] = "DOG";
        FaceType[FaceType["COW_MINOTAUR"] = 3] = "COW_MINOTAUR";
        FaceType[FaceType["SHARK_TEETH"] = 4] = "SHARK_TEETH";
        FaceType[FaceType["SNAKE_FANGS"] = 5] = "SNAKE_FANGS";
        FaceType[FaceType["CAT"] = 6] = "CAT";
        FaceType[FaceType["LIZARD"] = 7] = "LIZARD";
        FaceType[FaceType["BUNNY"] = 8] = "BUNNY";
        FaceType[FaceType["KANGAROO"] = 9] = "KANGAROO";
        FaceType[FaceType["SPIDER_FANGS"] = 10] = "SPIDER_FANGS";
        FaceType[FaceType["FOX"] = 11] = "FOX";
        FaceType[FaceType["DRAGON"] = 12] = "DRAGON";
        FaceType[FaceType["RACCOON_MASK"] = 13] = "RACCOON_MASK";
        FaceType[FaceType["RACCOON"] = 14] = "RACCOON";
        FaceType[FaceType["BUCKTEETH"] = 15] = "BUCKTEETH";
        FaceType[FaceType["MOUSE"] = 16] = "MOUSE";
        FaceType[FaceType["FERRET_MASK"] = 17] = "FERRET_MASK";
        FaceType[FaceType["FERRET"] = 18] = "FERRET";
    })(FaceType = exports.FaceType || (exports.FaceType = {}));
    class Face {
        constructor() {
            this.type = FaceType.HUMAN;
        }
        hasMuzzle() {
            switch (this.type) {
                case FaceType.HORSE:
                case FaceType.DOG:
                case FaceType.CAT:
                case FaceType.LIZARD:
                case FaceType.KANGAROO:
                case FaceType.FOX:
                case FaceType.DRAGON:
                    return true;
                default:
                    return false;
            }
        }
        serialize() {
            return {
                type: this.type,
            };
        }
        deserialize(saveObject) {
            this.type = saveObject.type;
        }
    }
    exports.Face = Face;
});
//# sourceMappingURL=Face.js.map