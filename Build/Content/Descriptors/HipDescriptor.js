define(["require", "exports", "Engine/Utilities/SMath"], function (require, exports, SMath_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function describeHips(character) {
        let description = "";
        if (character.body.hips.rating <= 1) {
            description = SMath_1.randomChoice("tiny ", "narrow ", "boyish ");
        }
        else if (character.body.hips.rating > 1 && character.body.hips.rating < 4) {
            description = SMath_1.randomChoice("slender ", "narrow ", "thin ");
            if (character.body.thickness < 30) {
                if (SMath_1.percentChance(50))
                    description = "slightly-flared ";
                else
                    description = "curved ";
            }
        }
        else if (character.body.hips.rating >= 4 && character.body.hips.rating < 6) {
            description = SMath_1.randomChoice("well-formed ", "pleasant ");
            if (character.body.thickness < 30) {
                if (SMath_1.percentChance(50))
                    description = "flared ";
                else
                    description = "curvy ";
            }
        }
        else if (character.body.hips.rating >= 6 && character.body.hips.rating < 10) {
            description = SMath_1.randomChoice("ample ", "noticeable ", "girly ");
            if (character.body.thickness < 30) {
                if (SMath_1.percentChance(50))
                    description = "flared ";
                else
                    description = "waspish ";
            }
        }
        else if (character.body.hips.rating >= 10 && character.body.hips.rating < 15) {
            description = SMath_1.randomChoice("flared ", "curvy ", "wide ");
            if (character.body.thickness < 30) {
                if (SMath_1.percentChance(50))
                    description = "flared ";
                else
                    description = "waspish ";
            }
        }
        else if (character.body.hips.rating >= 15 && character.body.hips.rating < 20) {
            if (character.body.thickness < 40) {
                if (SMath_1.percentChance(50))
                    description = "flared, ";
                else
                    description = "waspish, ";
            }
            description += SMath_1.randomChoice("fertile ", "child-bearing ", "voluptuous ");
        }
        else if (character.body.hips.rating >= 20) {
            if (character.body.thickness < 40) {
                if (SMath_1.percentChance(50))
                    description = "flaring, ";
                else
                    description = "incredibly waspish, ";
            }
            description += SMath_1.randomChoice("broodmother-sized ", "cow-like ", "inhumanly-wide ");
        }
        // Taurs
        if (character.body.legs.isTaur() && SMath_1.percentChance(33))
            description += "flanks";
        // Nagas have sides, right?
        else if (character.body.legs.isNaga() && SMath_1.percentChance(33))
            description += "sides";
        // Non taurs or taurs who didn't roll flanks
        else {
            description += SMath_1.randomChoice("hips", "thighs");
        }
        return description;
    }
    exports.describeHips = describeHips;
});
//# sourceMappingURL=HipDescriptor.js.map