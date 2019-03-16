define(["require", "exports", "Engine/Utilities/SMath", "Engine/Body/Legs"], function (require, exports, SMath_1, Legs_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function describeLeg(character) {
        switch (character.body.legs.type) {
            case Legs_1.LegType.HUMAN:
            case Legs_1.LegType.HOOFED:
            case Legs_1.LegType.DOG:
                return "leg";
            case Legs_1.LegType.NAGA:
                return "snake-tail";
            case Legs_1.LegType.CENTAUR:
                return "equine leg";
            case Legs_1.LegType.GOO:
                return "mound of goo";
            case Legs_1.LegType.PONY:
                return "cartoonish pony-leg";
            case Legs_1.LegType.BUNNY:
                return SMath_1.randomChoice("fuzzy, bunny leg", "fur-covered leg", "furry leg", "leg");
            case Legs_1.LegType.HARPY:
                return SMath_1.randomChoice("bird-like leg", "feathered leg", "leg");
            case Legs_1.LegType.FOX:
                return SMath_1.randomChoice("fox-like leg", "leg", "leg", "vulpine leg");
            case Legs_1.LegType.RACCOON:
                return SMath_1.randomChoice("raccoon-like leg", "leg");
            default:
                return "leg";
        }
    }
    exports.describeLeg = describeLeg;
    function describeLegs(character) {
        switch (character.body.legs.type) {
            case Legs_1.LegType.HUMAN:
            case Legs_1.LegType.HOOFED:
            case Legs_1.LegType.DOG:
                return "legs";
            case Legs_1.LegType.NAGA:
                return "snake-like coils";
            case Legs_1.LegType.CENTAUR:
                return "four legs";
            case Legs_1.LegType.GOO:
                return "mounds of goo";
            case Legs_1.LegType.PONY:
                return "cute pony-legs";
            case Legs_1.LegType.BUNNY:
                return SMath_1.randomChoice("fuzzy, bunny legs", "fur-covered legs", "furry legs", "legs");
            case Legs_1.LegType.HARPY:
                return SMath_1.randomChoice("bird-like legs", "feathered legs", "legs");
            case Legs_1.LegType.FOX:
                return SMath_1.randomChoice("fox-like legs", "legs", "legs", "vulpine legs");
            case Legs_1.LegType.RACCOON:
                return SMath_1.randomChoice("raccoon-like legs", "legs");
            default:
                return "legs";
        }
    }
    exports.describeLegs = describeLegs;
    function describeFoot(character) {
        switch (character.body.legs.type) {
            case Legs_1.LegType.HUMAN:
                return "foot";
            case Legs_1.LegType.HOOFED:
            case Legs_1.LegType.CENTAUR:
                return "hoof";
            case Legs_1.LegType.DOG:
                return "paw";
            case Legs_1.LegType.NAGA:
                return "coiled tail";
            case Legs_1.LegType.GOO:
                return "slimey undercarriage";
            case Legs_1.LegType.PONY:
                return "flat pony-foot";
            case Legs_1.LegType.BUNNY:
                return SMath_1.randomChoice("large bunny foot", "rabbit foot", "large foot", "foot");
            case Legs_1.LegType.HARPY:
                return SMath_1.randomChoice("taloned foot", "foot");
            case Legs_1.LegType.KANGAROO:
                return "foot-foot";
            case Legs_1.LegType.FOX:
                return SMath_1.randomChoice("foot", "soft, padded paw", "fox-like foot", "paw");
            case Legs_1.LegType.RACCOON:
                return SMath_1.randomChoice("raccoon-like foot", "long-toed paw", "foot", "paw");
            default:
                return "foot";
        }
    }
    exports.describeFoot = describeFoot;
    function describeFeet(char) {
        switch (char.body.legs.type) {
            case Legs_1.LegType.HUMAN:
                return "feet";
            case Legs_1.LegType.HOOFED:
            case Legs_1.LegType.CENTAUR:
                return "hooves";
            case Legs_1.LegType.DOG:
                return "paws";
            case Legs_1.LegType.NAGA:
                return "coils";
            case Legs_1.LegType.DEMONIC_HIGH_HEELS:
                return "demonic high-heels";
            case Legs_1.LegType.DEMONIC_CLAWS:
                return "demonic foot-claws";
            case Legs_1.LegType.GOO:
                return "slimey cillia";
            case Legs_1.LegType.PONY:
                return "flat pony-feet";
            case Legs_1.LegType.BUNNY:
                return SMath_1.randomChoice("large bunny feet", "rabbit feet", "large feet", "feet");
            case Legs_1.LegType.HARPY:
                return SMath_1.randomChoice("taloned feet", "feet");
            case Legs_1.LegType.KANGAROO:
                return "foot-paws";
            case Legs_1.LegType.FOX:
                return SMath_1.randomChoice("paws", "soft, padded paws", "fox-like feet", "paws");
            case Legs_1.LegType.RACCOON:
                return SMath_1.randomChoice("raccoon-like feet", "long-toed paws", "feet", "paws");
            default:
                return "feet";
        }
    }
    exports.describeFeet = describeFeet;
});
//# sourceMappingURL=LegDescriptor.js.map