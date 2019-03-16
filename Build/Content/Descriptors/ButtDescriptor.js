define(["require", "exports", "Engine/Utilities/SMath", "Engine/Body/Butt"], function (require, exports, SMath_1, Butt_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * Gives a full description of a Character's butt.
     * Be aware that it only supports Characters, not all Creatures.
     * @param    character
     * @return    A full description of a Character's butt.
     */
    function describeButt(character) {
        let description = "";
        const butt = character.body.butt;
        if (butt.rating < Butt_1.ButtRating.TIGHT) {
            if (character.body.tone >= 60)
                description += "incredibly tight, perky ";
            else {
                description = SMath_1.randomChoice("tiny", "very small", "dainty");
                // Soft PC's buns!
                if (character.body.tone <= 30 && SMath_1.percentChance(33))
                    description += " yet soft";
                description += " ";
            }
        }
        else if (butt.rating >= Butt_1.ButtRating.TIGHT && butt.rating < Butt_1.ButtRating.AVERAGE) {
            if (character.body.tone >= 65) {
                description = SMath_1.randomChoice("perky, muscular ", "tight, toned ", "compact, muscular ", "tight ", "muscular, toned ");
            }
            // Nondescript
            else if (character.body.tone >= 30) {
                description = SMath_1.randomChoice("tight ", "firm ", "compact ", "petite ");
            }
            // FLABBAH
            else {
                description = SMath_1.randomChoice("small, heart-shaped ", "soft, compact ", "soft, heart-shaped ", "small, cushy ", "small ", "petite ", "snug ");
            }
        }
        else if (butt.rating >= Butt_1.ButtRating.AVERAGE && butt.rating < Butt_1.ButtRating.NOTICEABLE) {
            // TOIGHT LIKE A TIGER
            if (character.body.tone >= 65) {
                description = SMath_1.randomChoice("nicely muscled ", "nice, toned ", "muscly ", "nice toned ", "toned ", "fair ");
            }
            // Nondescript
            else if (character.body.tone >= 30) {
                description = SMath_1.randomChoice("nice ", "fair ");
            }
            // FLABBAH
            else {
                description = SMath_1.randomChoice("nice, cushiony ", "soft ", "nicely-rounded, heart-shaped ", "cushy ", "soft, squeezable ");
            }
        }
        else if (butt.rating >= Butt_1.ButtRating.NOTICEABLE && butt.rating < Butt_1.ButtRating.LARGE) {
            // TOIGHT LIKE A TIGER
            if (character.body.tone >= 65) {
                description = SMath_1.randomChoice("full, toned ", "muscly handful of ", "shapely, toned ", "muscular, hand-filling ", "shapely, chiseled ", "full ", "chiseled ");
            }
            // Nondescript
            else if (character.body.tone >= 30) {
                description = SMath_1.randomChoice("handful of ", "full ", "shapely ", "hand-filling ");
            }
            // FLABBAH
            else {
                if (SMath_1.percentChance(12))
                    return "supple, handful of ass";
                description = SMath_1.randomChoice("somewhat jiggly ", "soft, hand-filling ", "cushiony, full ", "plush, shapely ", "full ", "soft, shapely ", "rounded, spongy ");
            }
        }
        else if (butt.rating >= Butt_1.ButtRating.LARGE && butt.rating < Butt_1.ButtRating.JIGGLY) {
            // TOIGHT LIKE A TIGER
            if (character.body.tone >= 65) {
                description = SMath_1.randomChoice("large, muscular ", "substantial, toned ", "big-but-tight ", "squeezable, toned ", "large, brawny ", "big-but-fit ", "powerful, squeezable ", "large ");
            }
            // Nondescript
            else if (character.body.tone >= 30) {
                description = SMath_1.randomChoice("squeezable ", "large ", "substantial ");
            }
            // FLABBAH
            else {
                description = SMath_1.randomChoice("large, bouncy ", "soft, eye-catching ", "big, slappable ", "soft, pinchable ", "large, plush ", "squeezable ", "cushiony ", "plush ", "pleasantly plump ");
            }
        }
        else if (butt.rating >= Butt_1.ButtRating.JIGGLY && butt.rating < Butt_1.ButtRating.EXPANSIVE) {
            // TOIGHT LIKE A TIGER
            if (character.body.tone >= 65) {
                description = SMath_1.randomChoice("thick, muscular ", "big, burly ", "heavy, powerful ", "spacious, muscular ", "toned, cloth-straining ", "thick ", "thick, strong ");
            }
            // Nondescript
            else if (character.body.tone >= 30) {
                description = SMath_1.randomChoice("jiggling ", "spacious ", "heavy ", "cloth-straining ");
            }
            // FLABBAH
            else {
                description = SMath_1.randomChoice("super-soft, jiggling ", "spacious, cushy ", "plush, cloth-straining ", "squeezable, over-sized ", "spacious ", "heavy, cushiony ", "slappable, thick ", "jiggling ", "spacious ", "soft, plump ");
            }
        }
        else if (butt.rating >= Butt_1.ButtRating.EXPANSIVE && butt.rating < Butt_1.ButtRating.HUGE) {
            // TOIGHT LIKE A TIGER
            if (character.body.tone >= 65) {
                description = SMath_1.randomChoice("expansive, muscled ", "voluminous, rippling ", "generous, powerful ", "big, burly ", "well-built, voluminous ", "powerful ", "muscular ", "powerful, expansive ");
            }
            // Nondescript
            else if (character.body.tone >= 30) {
                description = SMath_1.randomChoice("expansive ", "generous ", "voluminous ", "wide ");
            }
            // FLABBAH
            else {
                description = SMath_1.randomChoice("pillow-like ", "generous, cushiony ", "wide, plush ", "soft, generous ", "expansive, squeezable ", "slappable ", "thickly-padded ", "wide, jiggling ", "wide ", "voluminous ", "soft, padded ");
            }
        }
        else if (butt.rating >= Butt_1.ButtRating.HUGE && butt.rating < Butt_1.ButtRating.INCONCEIVABLY_BIG) {
            if (character.body.tone >= 65) {
                description = SMath_1.randomChoice("huge, toned ", "vast, muscular ", "vast, well-built ", "huge, muscular ", "strong, immense ", "muscle-bound ");
            }
            // Nondescript
            else if (character.body.tone >= 30) {
                if (SMath_1.percentChance(20))
                    return "jiggling expanse of ass";
                if (SMath_1.percentChance(20))
                    return "copious ass-flesh";
                description = SMath_1.randomChoice("huge ", "vast ", "giant ");
            }
            // FLABBAH
            else {
                description = SMath_1.randomChoice("vast, cushiony ", "huge, plump ", "expansive, jiggling ", "huge, cushiony ", "huge, slappable ", "seam-bursting ", "plush, vast ", "giant, slappable ", "giant ", "huge ", "swollen, pillow-like ");
            }
        }
        else if (butt.rating >= Butt_1.ButtRating.INCONCEIVABLY_BIG) {
            if (character.body.tone >= 65) {
                if (SMath_1.percentChance(14))
                    return "colossal, muscly ass";
                description = SMath_1.randomChoice("ginormous, muscle-bound ", "colossal yet toned ", "strong, tremdously large ", "tremendous, muscled ", "ginormous, toned ", "colossal, well-defined ");
            }
            // Nondescript
            else if (character.body.tone >= 30) {
                description = SMath_1.randomChoice("ginormous ", "colossal ", "tremendous ", "gigantic ");
            }
            // FLABBAH
            else {
                description = SMath_1.randomChoice("ginormous, jiggly ", "plush, ginormous ", "seam-destroying ", "tremendous, rounded ", "bouncy, colossal ", "thong-devouring ", "tremendous, thickly padded ", "ginormous, slappable ", "gigantic, rippling ", "gigantic ", "ginormous ", "colossal ", "tremendous ");
            }
        }
        description += SMath_1.randomChoice("butt", "butt", "butt", "butt", "ass", "ass", "ass", "ass", "backside", "backside", "derriere", "rump", "bottom");
        // if(rando == 2) desc += "cheeks";
        return description;
    }
    exports.describeButt = describeButt;
    /**
     * Gives a short description of a creature's butt.
     * Different from buttDescription in that it supports all creatures, not just characters.
     * Warning, very judgemental.
     * @param rating Butt Rating
     * @return Short description of a butt.
     */
    function describeButtShort(rating) {
        let description = "";
        if (rating < Butt_1.ButtRating.TIGHT) {
            description = SMath_1.randomChoice("insignificant ", "very small ");
        }
        else if (rating >= Butt_1.ButtRating.TIGHT && rating < Butt_1.ButtRating.AVERAGE) {
            description = SMath_1.randomChoice("tight ", "firm ", "compact ");
        }
        else if (rating >= Butt_1.ButtRating.AVERAGE && rating < Butt_1.ButtRating.NOTICEABLE) {
            description = SMath_1.randomChoice("regular ", "unremarkable ");
        }
        else if (rating >= Butt_1.ButtRating.NOTICEABLE && rating < Butt_1.ButtRating.LARGE) {
            if (SMath_1.percentChance(33))
                return "handful of ass";
            description = SMath_1.randomChoice("full ", "shapely ");
        }
        else if (rating >= Butt_1.ButtRating.LARGE && rating < Butt_1.ButtRating.JIGGLY) {
            description = SMath_1.randomChoice("squeezable ", "large ", "substantial ");
        }
        else if (rating >= Butt_1.ButtRating.JIGGLY && rating < Butt_1.ButtRating.EXPANSIVE) {
            description = SMath_1.randomChoice("jiggling ", "spacious ", "heavy ");
        }
        else if (rating >= Butt_1.ButtRating.EXPANSIVE && rating < Butt_1.ButtRating.HUGE) {
            if (SMath_1.percentChance(33))
                return "generous amount of ass";
            description = SMath_1.randomChoice("expansive ", "voluminous ");
        }
        else if (rating >= Butt_1.ButtRating.HUGE && rating < Butt_1.ButtRating.INCONCEIVABLY_BIG) {
            if (SMath_1.percentChance(66))
                return "jiggling expanse of ass";
            description = SMath_1.randomChoice("huge ", "vast ");
        }
        else if (rating >= Butt_1.ButtRating.INCONCEIVABLY_BIG) {
            description = SMath_1.randomChoice("ginormous ", "colossal ", "tremendous ");
        }
        description += SMath_1.randomChoice("butt ", "ass ");
        if (SMath_1.percentChance(50))
            description += "cheeks";
        return description;
    }
    exports.describeButtShort = describeButtShort;
    function describeButthole(butt) {
        let description = "";
        if (SMath_1.percentChance(33)) {
            if (butt.wetness === Butt_1.ButtWetness.DRY)
                description += "";
            else if (butt.wetness === Butt_1.ButtWetness.NORMAL)
                description += "";
            else if (butt.wetness === Butt_1.ButtWetness.MOIST)
                description += "moist ";
            else if (butt.wetness === Butt_1.ButtWetness.SLIMY)
                description += "slimy ";
            else if (butt.wetness === Butt_1.ButtWetness.DROOLING)
                description += "drooling ";
            else if (butt.wetness === Butt_1.ButtWetness.SLIME_DROOLING)
                description += "slime-drooling ";
        }
        // 25% tightness description
        if (SMath_1.percentChance(25) || (butt.looseness <= Butt_1.ButtLooseness.TIGHT && SMath_1.percentChance(50))) {
            if (butt.looseness === Butt_1.ButtLooseness.VIRGIN)
                description += "virgin ";
            else if (butt.looseness === Butt_1.ButtLooseness.TIGHT)
                description += "tight ";
            else if (butt.looseness === Butt_1.ButtLooseness.NORMAL)
                description += "loose ";
            else if (butt.looseness === Butt_1.ButtLooseness.LOOSE)
                description += "roomy ";
            else if (butt.looseness === Butt_1.ButtLooseness.STRETCHED)
                description += "stretched ";
            else if (butt.looseness === Butt_1.ButtLooseness.GAPING)
                description += "gaping ";
        }
        // asshole descriptor
        description += SMath_1.randomChoice("ass", "anus", "pucker", "backdoor", "asshole", "butthole");
        return description;
    }
    exports.describeButthole = describeButthole;
});
//# sourceMappingURL=ButtDescriptor.js.map