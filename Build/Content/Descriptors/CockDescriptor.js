define(["require", "exports", "Engine/Utilities/SMath", "Engine/Body/Cock", "Engine/Body/Skin"], function (require, exports, SMath_1, Cock_1, Skin_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function describeCock(character, cock) {
        if (character.body.cocks.length <= 0 || !cock)
            return "<b>ERROR: CockDescript Called But No Cock Present</b>";
        // Only describe as pierced or sock covered if the creature has just one cock
        const isGooey = (character.body.skin.type === Skin_1.SkinType.GOO);
        if (SMath_1.percentChance(50)) {
            if (cock.type === Cock_1.CockType.HUMAN)
                return adjectiveCock(character, cock, character.stats.lust, character.cumQ(), isGooey) + " " + nounCock(cock.type);
            else
                return adjectiveCock(character, cock, character.stats.lust, character.cumQ(), isGooey) + ", " + nounCock(cock.type);
        }
        return nounCock(cock.type);
    }
    exports.describeCock = describeCock;
    function nounCock(cockType) {
        if (cockType === Cock_1.CockType.HUMAN) {
            // Yeah, this is kind of messy
            // there is no other easy way to preserve the weighting fenoxo did
            return SMath_1.randomChoice("cock", "cock", "cock", "cock", "cock", "prick", "prick", "pecker", "shaft", "shaft", "shaft");
        }
        else if (cockType === Cock_1.CockType.BEE) {
            return SMath_1.randomChoice("bee prick", "bee prick", "bee prick", "bee prick", "insectoid cock", "insectoid cock", "furred monster");
        }
        else if (cockType === Cock_1.CockType.DOG) {
            return SMath_1.randomChoice("dog-shaped dong", "canine shaft", "pointed prick", "knotty dog-shaft", "bestial cock", "animalistic puppy-pecker", "pointed dog-dick", "pointed shaft", "canine member", "canine cock", "knotted dog-cock");
        }
        else if (cockType === Cock_1.CockType.FOX) {
            return SMath_1.randomChoice("fox-shaped dong", "vulpine shaft", "pointed prick", "knotty fox-shaft", "bestial cock", "animalistic vixen-pricker", "pointed fox-dick", "pointed shaft", "vulpine member", "vulpine cock", "knotted fox-cock");
        }
        else if (cockType === Cock_1.CockType.HORSE) {
            return SMath_1.randomChoice("flared horse-cock", "equine prick", "bestial horse-shaft", "flat-tipped horse-member", "animalistic stallion-prick", "equine dong", "beast cock", "flared stallion-cock");
        }
        else if (cockType === Cock_1.CockType.DEMON) {
            return SMath_1.randomChoice("nub-covered demon-dick", "nubby shaft", "corrupted cock", "perverse pecker", "bumpy demon-dick", "demonic cock", "demonic dong", "cursed cock", "infernal prick", "unholy cock", "blighted cock");
        }
        else if (cockType === Cock_1.CockType.TENTACLE) {
            return SMath_1.randomChoice("twisting tentacle-prick", "wriggling plant-shaft", "sinuous tentacle-cock", "squirming cock-tendril", "writhing tentacle-pecker", "wriggling plant-prick", "penile flora", "smooth shaft", "undulating tentacle-dick", "slithering vine-prick", "vine-shaped cock");
        }
        else if (cockType === Cock_1.CockType.CAT) {
            return SMath_1.randomChoice("feline dick", "spined cat-cock", "pink kitty-cock", "spiny prick", "animalistic kitty-prick", "oddly-textured cat-penis", "feline member", "spined shaft", "feline shaft", "barbed dick", "nubby kitten-prick");
        }
        else if (cockType === Cock_1.CockType.LIZARD) {
            return SMath_1.randomChoice("reptilian dick", "purple cock", "inhuman cock", "reptilian prick", "purple prick", "purple member", "serpentine member", "serpentine shaft", "reptilian shaft", "bulbous snake-shaft", "bulging snake-dick");
        }
        else if (cockType === Cock_1.CockType.ANEMONE) {
            return SMath_1.randomChoice("anemone dick", "tentacle-ringed cock", "blue member", "stinger-laden shaft", "pulsating prick", "anemone prick", "stinger-coated member", "blue cock", "tentacle-ringed dick", "near-transparent shaft", "squirming shaft");
        }
        else if (cockType === Cock_1.CockType.KANGAROO) {
            return SMath_1.randomChoice("kangaroo-like dick", "pointed cock", "marsupial member", "tapered shaft", "curved pecker", "pointed prick", "squirming kangaroo-cock", "marsupial cock", "tapered kangaroo-dick", "curved kangaroo-cock", "squirming shaft");
        }
        else if (cockType === Cock_1.CockType.DRAGON) {
            return SMath_1.randomChoice("dragon-like dick", "segmented shaft", "pointed prick", "knotted dragon-cock", "mythical mast", "segmented tool", "draconic dick", "draconic cock", "tapered dick", "unusual endowment", "scaly shaft");
        }
        else if (cockType === Cock_1.CockType.DISPLACER) {
            return SMath_1.randomChoice("coerl cock", "tentacle-tipped phallus", "starfish-tipped shaft", "alien member", "almost-canine dick", "bizarre prick", "beastly cock", "cthulhu-tier cock", "coerl cock", "animal dong", "star-capped tool", "knotted erection");
        }
        return SMath_1.randomChoice("cock", "prick", "pecker", "shaft");
    }
    exports.nounCock = nounCock;
    // New cock adjectives.  The old one sucked dicks
    // This function handles all cockAdjectives. Previously there were separate functions for the player, monsters and NPCs.
    function adjectiveCock(character, cock, lust = 50, cumQ = 10, isGooey = false) {
        if (!cock)
            return "";
        const cockIndex = character.body.cocks.indexOf(cock);
        const cockPiercings = character.inventory.piercings.cocks;
        const cockSocks = character.inventory.cockSocks;
        const isPierced = cockIndex !== -1 && !!cockPiercings.get(cockIndex) && cockPiercings.get(cockIndex).isEquipped();
        const hasSock = cockIndex !== -1 && !!cockSocks.get(cockIndex) && cockSocks.get(cockIndex).isEquipped();
        // First, the three possible special cases
        if (isPierced && SMath_1.percentChance(20))
            return "pierced";
        if (hasSock && SMath_1.percentChance(20))
            return SMath_1.randomChoice("sock-sheathed", "garment-wrapped", "smartly dressed", "cloth-shrouded", "fabric swaddled", "covered");
        if (isGooey && SMath_1.percentChance(25))
            return SMath_1.randomChoice("goopey", "gooey", "slimy");
        // Length 1/3 chance
        if (SMath_1.percentChance(33)) {
            if (length < 3)
                return SMath_1.randomChoice("little", "toy-sized", "mini", "budding", "tiny");
            else if (length < 5)
                return SMath_1.randomChoice("short", "small");
            else if (length < 7)
                return SMath_1.randomChoice("fair-sized", "nice");
            else if (length < 9) {
                if (cock.type === Cock_1.CockType.HORSE)
                    return SMath_1.randomChoice("sizable", "pony-sized", "colt-like");
                return SMath_1.randomChoice("sizable", "long", "lengthy");
            }
            else if (length < 13) {
                if (cock.type === Cock_1.CockType.DOG)
                    return SMath_1.randomChoice("huge", "foot-long", "mastiff-like");
                return SMath_1.randomChoice("huge", "foot-long", "cucumber-length");
            }
            else if (length < 18)
                return SMath_1.randomChoice("massive", "knee-length", "forearm-length");
            else if (length < 30)
                return SMath_1.randomChoice("enormous", "giant", "arm-like");
            else if (cock.type === Cock_1.CockType.TENTACLE && SMath_1.percentChance(50))
                return "coiled";
            else
                return SMath_1.randomChoice("towering", "freakish", "monstrous", "massive");
        }
        // Hornyness 1/2
        else if (lust > 75 && SMath_1.percentChance(50)) {
            if (lust > 90) { // Uber horny like a baws!
                if (cumQ < 50)
                    return SMath_1.randomChoice("throbbing", "pulsating"); // Weak as shit cum
                else if (cumQ < 200)
                    return SMath_1.randomChoice("dribbling", "leaking", "drooling"); // lots of cum? drippy.
                else
                    return SMath_1.randomChoice("very drippy", "pre-gushing", "cum-bubbling", "pre-slicked", "pre-drooling"); // Tons of cum
            }
            else { // A little less lusty, but still lusty.
                if (cumQ < 50)
                    return SMath_1.randomChoice("turgid", "blood-engorged", "rock-hard", "stiff", "eager"); // Weak as shit cum
                else if (cumQ < 200)
                    return SMath_1.randomChoice("turgid", "blood-engorged", "rock-hard", "stiff", "eager", "fluid-beading", "slowly-oozing"); // A little drippy
                else
                    return SMath_1.randomChoice("dribbling", "drooling", "fluid-leaking", "leaking"); // uber drippy
            }
        }
        // Girth - fallback
        if (cock.thickness <= 0.75)
            return SMath_1.randomChoice("thin", "slender", "narrow");
        else if (cock.thickness <= 1.2)
            return "ample";
        else if (cock.thickness <= 1.4)
            return SMath_1.randomChoice("ample", "big");
        else if (cock.thickness <= 2)
            return SMath_1.randomChoice("broad", "meaty", "girthy");
        else if (cock.thickness <= 3.5)
            return SMath_1.randomChoice("fat", "distended", "wide");
        else
            return SMath_1.randomChoice("inhumanly distended", "monstrously thick", "bloated");
    }
    exports.adjectiveCock = adjectiveCock;
    // Cock adjectives for single cock
    function adjectivesCock(cock, character) {
        if (!cock)
            return "";
        let description = "";
        // length or thickness, usually length.
        if (SMath_1.percentChance(25)) {
            if (cock.length < 3) {
                description = SMath_1.randomChoice("little", "toy-sized", "tiny");
            }
            else if (cock.length < 5) {
                description = SMath_1.randomChoice("short", "small");
            }
            else if (cock.length < 7) {
                description = SMath_1.randomChoice("fair-sized", "nice");
            }
            else if (cock.length < 9) {
                description = SMath_1.randomChoice("long", "lengthy", "sizable");
            }
            else if (cock.length < 13) {
                description = SMath_1.randomChoice("huge", "foot-long");
            }
            else if (cock.length < 18) {
                description = SMath_1.randomChoice("massive", "forearm-length");
            }
            else if (cock.length < 30) {
                description = SMath_1.randomChoice("enormous", "monster-length");
            }
            else {
                description = SMath_1.randomChoice("towering", "freakish", "massive");
            }
        }
        // thickness go!
        else if (SMath_1.percentChance(25)) {
            if (cock.thickness <= .75)
                description += "narrow";
            else if (cock.thickness <= 1.1)
                description += "nice";
            else if (cock.thickness <= 1.4)
                description += SMath_1.randomChoice("ample", "big");
            else if (cock.thickness <= 2)
                description += SMath_1.randomChoice("broad", "girthy");
            else if (cock.thickness <= 3.5)
                description += SMath_1.randomChoice("fat", "distended");
            else
                description += SMath_1.randomChoice("inhumanly distended", "monstrously thick");
        }
        // Length/Thickness done.  Moving on to special animal characters/lust stuff.
        /*Animal Fillers - turned off due to duplication in noun segment
            else if(type == 1 && descripts == 0 && randInt(2) == 0) {
            if(randInt(2) == 0) descript += "flared ";
            else descript += "musky ";
            }
            else if(type == 2 && descripts == 0 && randInt(2) == 0) {
            descript += "musky ";
            }*/
        // FINAL FALLBACKS - lust descriptors
        // Lust stuff
        else if (character.stats.lust > 90) {
            // lots of cum? drippy.
            if (character.cumQ() > 50 && character.cumQ() < 200 && SMath_1.percentChance(50)) {
                switch (cock.type) {
                    case Cock_1.CockType.HUMAN:
                    case Cock_1.CockType.HORSE:
                    case Cock_1.CockType.DOG:
                    case Cock_1.CockType.CAT:
                    case Cock_1.CockType.KANGAROO:
                    case Cock_1.CockType.FOX:
                        description += "animal-pre leaking";
                        break;
                    default:
                        description += "pre-slickened";
                        break;
                }
            }
            // Tons of cum
            else if (character.cumQ() >= 200 && SMath_1.percentChance(50)) {
                switch (cock.type) {
                    case Cock_1.CockType.HUMAN:
                    case Cock_1.CockType.HORSE:
                    case Cock_1.CockType.DOG:
                    case Cock_1.CockType.CAT:
                    case Cock_1.CockType.KANGAROO:
                    case Cock_1.CockType.FOX:
                        description += "animal-spunk dripping";
                        break;
                    default:
                        description += "cum-drooling";
                        break;
                }
            }
            // Not descripted? Pulsing and twitching
            else
                description += SMath_1.randomChoice("throbbing", "pulsating");
        }
        // A little less lusty, but still lusty.
        else if (character.stats.lust > 75) {
            if (character.cumQ() > 50 && character.cumQ() < 200 && SMath_1.percentChance(50))
                description += "pre-leaking";
            else if (character.cumQ() >= 200 && SMath_1.percentChance(50))
                description += "pre-cum dripping";
            else
                description += SMath_1.randomChoice("rock-hard", "eager");
        }
        // Not lusty at all, fallback adjective
        else if (character.stats.lust > 50)
            description += "hard";
        else
            description += "ready";
        return description;
    }
    exports.adjectivesCock = adjectivesCock;
    function nounCocks(cockType) {
        if (cockType === Cock_1.CockType.HUMAN)
            return SMath_1.randomChoice("cock", "cock", "cock", "cock", "cock", "prick", "prick", "pecker", "shaft", "shaft", "shaft");
        else if (cockType === Cock_1.CockType.BEE)
            return SMath_1.randomChoice("bee prick", "bee prick", "bee prick", "bee prick", "insectoid cock", "insectoid cock", "furred monster");
        else if (cockType === Cock_1.CockType.DOG)
            return SMath_1.randomChoice("doggie dong", "canine shaft", "pointed prick", "dog-shaft", "dog-cock", "puppy-pecker", "dog-dick", "pointed shaft", "canine cock", "canine cock", "dog cock");
        else if (cockType === Cock_1.CockType.HORSE)
            return SMath_1.randomChoice("horsecock", "equine prick", "horse-shaft", "horse-prick", "stallion-prick", "equine dong");
        else if (cockType === Cock_1.CockType.DEMON)
            return SMath_1.randomChoice("demon-dick", "nubby shaft", "corrupted cock", "perverse pecker", "bumpy demon-dick", "demonic cock", "demonic dong", "cursed cock", "infernal prick", "unholy cock", "blighted cock");
        else if (cockType === Cock_1.CockType.TENTACLE)
            return SMath_1.randomChoice("tentacle prick", "plant-like shaft", "tentacle cock", "cock-tendril", "tentacle pecker", "plant prick", "penile flora", "smooth inhuman shaft", "tentacle dick", "vine prick", "vine-like cock");
        else if (cockType === Cock_1.CockType.CAT)
            return SMath_1.randomChoice("feline dick", "cat-cock", "kitty-cock", "spiny prick", "pussy-prick", "cat-penis", "feline member", "spined shaft", "feline shaft", "'barbed' dick", "kitten-prick");
        else if (cockType === Cock_1.CockType.LIZARD)
            return SMath_1.randomChoice("reptile-dick", "purple cock", "inhuman cock", "reptilian prick", "purple prick", "purple member", "serpentine member", "serpentine shaft", "reptilian shaft", "snake-shaft", "snake dick");
        return SMath_1.randomChoice("cock", "prick", "pecker", "shaft");
    }
    exports.nounCocks = nounCocks;
    /**
     * Previously sMultiCockDesc and SMultiCockDesc
     * @param character
     * @param caps
     */
    function describeOneOfYourCocks(character, caps) {
        if (caps)
            return (character.body.cocks.length > 1 ? "One of your " : "Your ") + cockMultiLDescriptionShort(character);
        else
            return (character.body.cocks.length > 1 ? "one of your " : "your ") + cockMultiLDescriptionShort(character);
    }
    exports.describeOneOfYourCocks = describeOneOfYourCocks;
    /**
     * Previously oMultiCockDesc and OMultiCockDesc
     * @param character
     * @param caps
     */
    function describeEachOfYourCocks(character, caps) {
        if (caps)
            return (character.body.cocks.length > 1 ? "Each of your " : "Your ") + cockMultiLDescriptionShort(character);
        else
            return (character.body.cocks.length > 1 ? "each of your " : "your ") + cockMultiLDescriptionShort(character);
    }
    exports.describeEachOfYourCocks = describeEachOfYourCocks;
    function cockMultiLDescriptionShort(character) {
        const cocks = character.body.cocks;
        if (cocks.length >= 1) {
            const firstCock = cocks.get(0);
            if (cocks.length === 1) { // For a single cock return the default description
                return describeCock(character, firstCock);
            }
            if (firstCock.type === Cock_1.CockType.DOG || firstCock.type === Cock_1.CockType.FOX) {
                return nounCock(Cock_1.CockType.DOG) + "s";
            }
            return nounCock(firstCock.type) + "s";
        }
        return nounCock(Cock_1.CockType.HUMAN) + "s";
    }
    function describeCockHead(cock) {
        if (!cock)
            return "";
        switch (cock.type) {
            case Cock_1.CockType.CAT:
                return SMath_1.randomChoice("ponumber", "narrow tip");
            case Cock_1.CockType.DEMON:
                return SMath_1.randomChoice("tanumbered crown", "nub-ringed tip");
            case Cock_1.CockType.DISPLACER:
                return SMath_1.randomChoice("star tip", "blooming cock-head", "open crown", "alien tip", "bizarre head");
            case Cock_1.CockType.DOG:
            case Cock_1.CockType.FOX:
                return SMath_1.randomChoice("ponumbered tip", "narrow tip");
            case Cock_1.CockType.HORSE:
                return SMath_1.randomChoice("flare", "flat tip");
            case Cock_1.CockType.KANGAROO:
                return SMath_1.randomChoice("tip", "ponumber");
            case Cock_1.CockType.LIZARD:
                return SMath_1.randomChoice("crown", "head");
            case Cock_1.CockType.TENTACLE:
                return SMath_1.randomChoice("mushroom-like tip", "wide plant-like crown");
            default:
                return SMath_1.randomChoice("crown", "head", "cock-head");
        }
    }
    exports.describeCockHead = describeCockHead;
    function describeCockSheath(cock) {
        if (!cock)
            return "";
        return cock.hasSheath() ? "sheath" : "base";
    }
    exports.describeCockSheath = describeCockSheath;
    // Short cock description. Describes length or girth. Supports multiple cocks.
    function describeCockShort(cock) {
        if (!cock)
            return "";
        let description = "";
        // Discuss length one in 3 times
        if (SMath_1.percentChance(33)) {
            if (cock.length >= 30)
                description = "towering ";
            else if (cock.length >= 18)
                description = "enormous ";
            else if (cock.length >= 13)
                description = "massive ";
            else if (cock.length >= 10)
                description = "huge ";
            else if (cock.length >= 7)
                description = "long ";
            else if (cock.length >= 5)
                description = "average ";
            else
                description = "short ";
        }
        else if (SMath_1.percentChance(50)) { // Discuss girth one in 2 times if not already talked about length.
            // narrow, thin, ample, broad, distended, voluminous
            if (cock.thickness <= .75)
                description = "narrow ";
            else if (cock.thickness > 1 && cock.thickness <= 1.4)
                description = "ample ";
            else if (cock.thickness > 1.4 && cock.thickness <= 2)
                description = "broad ";
            else if (cock.thickness > 2 && cock.thickness <= 3.5)
                description = "fat ";
            else if (cock.thickness > 3.5)
                description = "distended ";
        }
        // Seems to work better without this comma:			if (descripted && cock.cockType != CockType.HUMAN) description += ", ";
        description += nounCock(cock.type);
        return description;
    }
    exports.describeCockShort = describeCockShort;
    function describeCocksLight(character) {
        if (character.body.cocks.length <= 0)
            return "";
        let description = "";
        const cocks = character.body.cocks;
        const cockCount = cocks.length;
        const firstCock = cocks.get(0);
        const cocksSameType = cockCount === cocks.filter(Cock_1.Cock.FilterType(firstCock.type)).length;
        if (cockCount === 1)
            return describeCock(character, firstCock);
        if (cockCount === 2) {
            if (cocksSameType)
                description += SMath_1.randomChoice("pair of ", "two ", "brace of ", "matching ", "twin ");
            else
                description += SMath_1.randomChoice("pair of ", "two ", "brace of ");
        }
        else if (cockCount === 3) {
            if (cocksSameType)
                description += SMath_1.randomChoice("three ", "group of ", "<i>ménage à trois</i> of ", "triad of ", "triumvirate of ");
            else
                description += SMath_1.randomChoice("three ", "group of ");
        }
        else if (cockCount > 3)
            description += SMath_1.randomChoice("bundle of ", "obscene group of ", "cluster of ", "wriggling bunch of ");
        description += adjectiveCock(character, cocks.sort(Cock_1.Cock.Largest).get(0), character.stats.lust, character.cumQ(), character.body.skin.type === Skin_1.SkinType.GOO);
        if (cocksSameType)
            description += ", " + nounCock(firstCock.type) + "s";
        else
            description += SMath_1.randomChoice("mutated cocks", "mutated dicks", "mixed cocks", "mismatched dicks");
        return description;
    }
    exports.describeCocksLight = describeCocksLight;
    function describeCocks(character) {
        if (character.body.cocks.length <= 0)
            return "";
        let description = "";
        const cocks = character.body.cocks;
        const cockCount = cocks.length;
        const firstCock = cocks.get(0);
        const cocksSameType = cockCount === cocks.filter(Cock_1.Cock.FilterType(firstCock.type)).length;
        if (cockCount === 1)
            return describeCock(character, firstCock);
        if (cockCount === 2) {
            if (cocksSameType)
                description += SMath_1.randomChoice("a pair of ", "two ", "a brace of ", "matching ", "twin ");
            else
                description += SMath_1.randomChoice("a pair of ", "two ", "a brace of ");
        }
        else if (cockCount === 3) {
            if (cocksSameType)
                description += SMath_1.randomChoice("three ", "a group of ", "a <i>ménage à trois</i> of ", "a triad of ", "a triumvirate of ");
            else
                description += SMath_1.randomChoice("three ", "a group of ");
        }
        else if (cockCount > 3)
            description += SMath_1.randomChoice("a bundle of ", "an obscene group of ", "a cluster of ", "a wriggling group of ");
        description += adjectiveCock(character, cocks.sort(Cock_1.Cock.Largest).get(0), character.stats.lust, character.cumQ(), character.body.skin.type === Skin_1.SkinType.GOO);
        if (cocksSameType)
            description += ", " + nounCock(firstCock.type) + "s";
        else
            description += SMath_1.randomChoice("mutated cocks", "mutated dicks", "mixed cocks", "mismatched dicks");
        return description;
    }
    exports.describeCocks = describeCocks;
});
//# sourceMappingURL=CockDescriptor.js.map