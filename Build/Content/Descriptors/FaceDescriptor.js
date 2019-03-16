define(["require", "exports", "Engine/Utilities/SMath", "Engine/Body/Face", "Engine/Body/Tongue"], function (require, exports, SMath_1, Face_1, Tongue_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * Describe tongue. Monsters don't have tongues, apparently.
     * @param    character Either Player or NonPlayer
     * @return    A beautiful description of a tongue.
     */
    function describeTongue(tongueType) {
        switch (tongueType) {
            case Tongue_1.TongueType.SNAKE:
                return "serpentine tongue";
            case Tongue_1.TongueType.DEMONIC:
                return "demonic tongue";
            case Tongue_1.TongueType.DRACONIC:
                return "draconic tongue";
            default:
                return "tongue";
        }
    }
    exports.describeTongue = describeTongue;
    function describeFaceShort(character) {
        let stringo = "";
        const face = character.body.face;
        const faceType = face.type;
        if (faceType === Face_1.FaceType.HUMAN)
            return "face";
        if (face.hasMuzzle()) {
            if (SMath_1.randInt(2) === 0)
                return "muzzle";
            if (SMath_1.randInt(3) === 0 && faceType === Face_1.FaceType.HORSE)
                stringo = "long ";
            if (SMath_1.randInt(3) === 0 && faceType === Face_1.FaceType.CAT)
                stringo = "feline ";
            return stringo + "face";
        }
        if (faceType === Face_1.FaceType.COW_MINOTAUR) {
            if (SMath_1.randInt(4) === 0)
                stringo = "bovine ";
            if (SMath_1.randInt(2) === 0)
                return "muzzle";
            return stringo + "face";
        }
        if (faceType === Face_1.FaceType.SHARK_TEETH) {
            if (SMath_1.randInt(4) === 0)
                stringo = "angular ";
            return stringo + "face";
        }
        if (faceType === Face_1.FaceType.LIZARD || faceType === Face_1.FaceType.DRAGON) {
            if (SMath_1.randInt(4) === 0)
                stringo = "reptilian ";
            if (SMath_1.randInt(4) === 0)
                return stringo + "muzzle";
            if (SMath_1.randInt(4) === 0)
                return stringo + "snout";
            return stringo + "face";
        }
        return "face";
    }
    exports.describeFaceShort = describeFaceShort;
    /**
     * prev faceDesc from Character
     * @param character
     */
    function describeFace(character) {
        let description = "";
        if (character.body.femininity < 10) {
            description = "a square chin";
            // beard doesn't exist
            //
            // if (!body.hasBeard())
            description += " and chiseled jawline";
            // else
            //    description += ", chiseled jawline, and " + body.beard();
        }
        else if (character.body.femininity < 20) {
            description = "a rugged looking " + describeFaceShort(character) + " ";
            // beard doesn't exist
            //
            // if (body.hasBeard())
            //    description += "and " + body.beard();
            description += "that's surely handsome";
        }
        else if (character.body.femininity < 28)
            description = "a well-defined jawline and a fairly masculine profile";
        else if (character.body.femininity < 35)
            description = "a somewhat masculine, angular jawline";
        else if (character.body.femininity < 45)
            description = "the barest hint of masculinity on its features";
        else if (character.body.femininity <= 55)
            description = "an androgynous set of features that would look normal on a male or female";
        else if (character.body.femininity <= 65)
            description = "a tiny touch of femininity to it, with gentle curves";
        else if (character.body.femininity <= 72)
            description = "a nice set of cheekbones and lips that have the barest hint of pout";
        else if (character.body.femininity <= 80)
            description = "a beautiful, feminine shapeliness that's sure to draw the attention of males";
        else if (character.body.femininity <= 90)
            description = "a gorgeous profile with full lips, a button nose, and noticeable eyelashes";
        else
            description = "a jaw-droppingly feminine shape with full, pouting lips, an adorable nose, and long, beautiful eyelashes";
        return description;
    }
    exports.describeFace = describeFace;
    function describeBeard(character) {
        if (character.body.beard.hasBeard())
            return "beard";
        else {
            // CoC_User.settings.error("");
            return "ERROR: NO BEARD! <b>YOU ARE NOT A VIKING AND SHOULD TELL FEN IMMEDIATELY.</b>";
        }
    }
    exports.describeBeard = describeBeard;
});
//# sourceMappingURL=FaceDescriptor.js.map