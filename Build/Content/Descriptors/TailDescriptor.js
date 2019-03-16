define(["require", "exports", "Engine/Body/Tail"], function (require, exports, Tail_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.TailNameTable = [
        [Tail_1.TailType.HORSE, "horse"],
        [Tail_1.TailType.DOG, "dog"],
        [Tail_1.TailType.DEMONIC, "demonic"],
        [Tail_1.TailType.COW, "cow"],
        [Tail_1.TailType.SPIDER_ABDOMEN, "spider abdomen"],
        [Tail_1.TailType.BEE_ABDOMEN, "bee abdomen"],
        [Tail_1.TailType.SHARK, "shark"],
        [Tail_1.TailType.CAT, "cat"],
        [Tail_1.TailType.LIZARD, "lizard"],
        [Tail_1.TailType.BUNNY, "rabbit"],
        [Tail_1.TailType.HARPY, "harpy"],
        [Tail_1.TailType.KANGAROO, "kangaroo"],
        [Tail_1.TailType.FOX, "fox"],
        [Tail_1.TailType.DRACONIC, "draconic"],
        [Tail_1.TailType.RACCOON, "raccoon"],
        [Tail_1.TailType.MOUSE, "mouse"]
    ];
    function describeTail(character) {
        let description = "";
        if (character.body.tails.length > 0) {
            const kitsuneTailCount = character.body.tails.filter(Tail_1.Tail.FilterType(Tail_1.TailType.FOX)).length;
            if (kitsuneTailCount > 0) {
                if (kitsuneTailCount > 1) {
                    if (kitsuneTailCount === 2)
                        description += "pair ";
                    else if (kitsuneTailCount === 3)
                        description += "trio ";
                    else if (kitsuneTailCount === 4)
                        description += "quartet ";
                    else if (kitsuneTailCount === 5)
                        description += "quintet ";
                    else if (kitsuneTailCount > 5)
                        description += "bundle ";
                    description += "of kitsune tails";
                }
                else
                    description += "kitsune tail";
            }
            else {
                description += exports.TailNameTable[character.body.tails.get(0).type];
                description += " tail";
            }
        }
        return description;
    }
    exports.describeTail = describeTail;
    function describeOneTail(character) {
        let description = "";
        if (character.body.tails.length > 0) {
            const kitsuneTailCount = character.body.tails.filter(Tail_1.Tail.FilterType(Tail_1.TailType.FOX)).length;
            if (kitsuneTailCount === 1) {
                description += "your kitsune tail";
            }
            else if (kitsuneTailCount > 1) {
                description += "one of your kitsune tails";
            }
            else {
                description += "your " + exports.TailNameTable[character.body.tails.get(0).type] + " tail";
            }
        }
        return description;
    }
    exports.describeOneTail = describeOneTail;
});
//# sourceMappingURL=TailDescriptor.js.map