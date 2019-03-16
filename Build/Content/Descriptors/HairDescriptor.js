define(["require", "exports", "Engine/Utilities/SMath", "Engine/Body/Hair", "Engine/Body/Skin"], function (require, exports, SMath_1, Hair_1, Skin_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function hairOrFur(character) {
        if (character.body.skin.type === Skin_1.SkinType.FUR)
            return "fur";
        else
            return "hair";
    }
    exports.hairOrFur = hairOrFur;
    function describeHair(character) {
        let description = "";
        if (character.body.hair.length === 0) {
            return SMath_1.randomChoice("shaved", "bald", "smooth", "hairless", "glabrous") + " head";
        }
        else if (character.body.hair.length < 1) {
            description += SMath_1.randomChoice("close-cropped, ", "trim, ", "very short, ");
        }
        else if (character.body.hair.length >= 1 && character.body.hair.length < 3)
            description += "short, ";
        else if (character.body.hair.length >= 3 && character.body.hair.length < 6)
            description += "shaggy, ";
        else if (character.body.hair.length >= 6 && character.body.hair.length < 10)
            description += "moderately long, ";
        else if (character.body.hair.length >= 10 && character.body.hair.length < 16) {
            if (SMath_1.percentChance(50))
                description += "long, ";
            else
                description += "shoulder-length, ";
        }
        else if (character.body.hair.length >= 16 && character.body.hair.length < 26) {
            if (SMath_1.percentChance(50))
                description += "very long, ";
            else
                description += "flowing locks of ";
        }
        else if (character.body.hair.length >= 26 && character.body.hair.length < 40)
            description += "ass-length, ";
        else if (character.body.hair.length >= 40 && character.body.hair.length < character.body.tallness)
            description += "obscenely long, ";
        else if (character.body.hair.length >= character.body.tallness) {
            if (SMath_1.percentChance(50))
                description += "floor-length, ";
            else
                description += "floor-dragging, ";
        }
        description += character.body.hair.color + " ";
        switch (character.body.hair.type) {
            case Hair_1.HairType.FEATHER:
                description += "feather-";
                break;
            case Hair_1.HairType.GHOST:
                description += "transparent ";
                break;
            case Hair_1.HairType.GOO:
                description += "goo-";
                break;
            case Hair_1.HairType.ANEMONE:
                description += "tentacle-";
                break;
        }
        // if medium length refer to as locks sometimes
        // CUT - locks is plural and screws up tense.
        /*if(head.hair.length >= 3 && head.hair.length < 16 && randInt(2) == 0) {
            descript += "locks of hair";
            return descript;
            }*/
        // If furry and longish hair sometimes call it a mane (50%)
        if (character.body.skin.type === Skin_1.SkinType.FUR && character.body.hair.length > 3 && SMath_1.percentChance(50))
            description += "mane";
        else
            description += "hair";
        return description;
    }
    exports.describeHair = describeHair;
});
//# sourceMappingURL=HairDescriptor.js.map