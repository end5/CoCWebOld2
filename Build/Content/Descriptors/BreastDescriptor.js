define(["require", "exports", "Engine/Utilities/SMath", "Engine/Body/BreastRow", "Content/Effects/EffectType", "Content/Items/PiercingName"], function (require, exports, SMath_1, BreastRow_1, EffectType_1, PiercingName_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function describeBreastRow(breastRow) {
        if (!breastRow)
            return "";
        const size = breastRow.rating;
        const lactation = breastRow.lactationMultiplier;
        if (size < 1)
            return "flat breasts";
        // Add a description of the breast size 50% of the time
        let description = (SMath_1.randInt(2) === 0 ? describeBreastSize(size) : "");
        switch (SMath_1.randInt(10)) {
            case 1:
                if (lactation > 2)
                    return description + "milk-udders";
                break;
            case 2:
                if (lactation > 1.5)
                    description += "milky ";
                if (size > 4)
                    return description + "tits";
                break;
            case 4:
            case 5:
            case 6:
                return description + "tits";
            case 7:
                if (lactation >= 2.5)
                    return description + "udders";
                if (lactation >= 1)
                    description += "milk ";
                return description + "jugs";
            case 8:
                if (size > 6)
                    return description + "love-pillows";
                return description + "boobs";
            case 9:
                if (size > 6)
                    return description + "tits";
            default:
        }
        return description + "breasts";
    }
    exports.describeBreastRow = describeBreastRow;
    function describeNipple(character, breastRow) {
        if (!breastRow)
            return "";
        let haveDescription = false;
        let description = "";
        let options = [];
        const breastRowIndex = character.body.chest.indexOf(breastRow);
        const nipplePiercings = character.inventory.piercings.nipples.get(breastRowIndex);
        // Size descriptors 33% chance
        if (SMath_1.randInt(4) === 0) {
            // TINAHHHH
            if (breastRow.nipples.length < .25) {
                options = ["tiny ",
                    "itty-bitty ",
                    "teeny-tiny ",
                    "dainty "];
                description += SMath_1.randomChoice(options);
            }
            // Prominant
            if (breastRow.nipples.length >= .4 && breastRow.nipples.length < 1) {
                options = ["prominent ",
                    "pencil eraser-sized ",
                    "eye-catching ",
                    "pronounced ",
                    "striking "];
                description += SMath_1.randomChoice(options);
            }
            // Big 'uns
            if (breastRow.nipples.length >= 1 && breastRow.nipples.length < 2) {
                options = ["forwards-jutting ",
                    "over-sized ",
                    "fleshy ",
                    "large protruding "];
                description += SMath_1.randomChoice(options);
            }
            // 'Uge
            if (breastRow.nipples.length >= 2 && breastRow.nipples.length < 3.2) {
                options = ["elongated ",
                    "massive ",
                    "awkward ",
                    "lavish ",
                    "hefty "];
                description += SMath_1.randomChoice(options);
            }
            // Massive
            if (breastRow.nipples.length >= 3.2) {
                options = ["bulky ",
                    "ponderous ",
                    "thumb-sized ",
                    "cock-sized ",
                    "cow-like "];
                description += SMath_1.randomChoice(options);
            }
            haveDescription = true;
        }
        // Milkiness/Arousal/Wetness Descriptors 33% of the time
        if (SMath_1.randInt(3) === 0 && !haveDescription) {
            // Fuckable chance first!
            if (breastRow.nipples.fuckable) {
                // Fuckable and lactating?
                if (breastRow.lactationMultiplier > 1) {
                    options = ["milk-lubricated ",
                        "lactating ",
                        "lactating ",
                        "milk-slicked ",
                        "milky "];
                    description += SMath_1.randomChoice(options);
                }
                // Just fuckable
                else {
                    options = ["wet ",
                        "mutated ",
                        "slimy ",
                        "damp ",
                        "moist ",
                        "slippery ",
                        "oozing ",
                        "sloppy ",
                        "dewy "];
                    description += SMath_1.randomChoice(options);
                }
                haveDescription = true;
            }
            // Just lactating!
            else if (breastRow.lactationMultiplier > 0) {
                // Light lactation
                if (breastRow.lactationMultiplier <= 1) {
                    options = ["milk moistened ",
                        "slightly lactating ",
                        "milk-dampened "];
                    description += SMath_1.randomChoice(options);
                }
                // Moderate lactation
                if (breastRow.lactationMultiplier > 1 && breastRow.lactationMultiplier <= 2) {
                    options = ["lactating ",
                        "milky ",
                        "milk-seeping "];
                    description += SMath_1.randomChoice(options);
                }
                // Heavy lactation
                if (breastRow.lactationMultiplier > 2) {
                    options = ["dripping ",
                        "dribbling ",
                        "milk-leaking ",
                        "drooling "];
                    description += SMath_1.randomChoice(options);
                }
                haveDescription = true;
            }
        }
        // Possible arousal descriptors
        else if (SMath_1.randInt(3) === 0 && !haveDescription) {
            if (character.stats.lust > 50 && character.stats.lust < 75) {
                options = ["erect ",
                    "perky ",
                    "erect ",
                    "firm ",
                    "tender "];
                description += SMath_1.randomChoice(options);
                haveDescription = true;
            }
            if (character.stats.lust >= 75) {
                options = ["throbbing ",
                    "trembling ",
                    "needy ",
                    "throbbing "];
                description += SMath_1.randomChoice(options);
                haveDescription = true;
            }
        }
        if (!haveDescription && SMath_1.randInt(2) === 0 && nipplePiercings && nipplePiercings.isEquipped()) {
            if (nipplePiercings.item.name === PiercingName_1.PiercingName.Chain)
                description += "chained ";
            else
                description += "pierced ";
            haveDescription = true;
        }
        if (!haveDescription && character.body.skin.type === 3) {
            options = ["slime-slick ",
                "goopy ",
                "slippery "];
            description += SMath_1.randomChoice(options);
        }
        if (!haveDescription && character.effects.has(EffectType_1.EffectType.BlackNipples)) {
            options = ["black ",
                "ebony ",
                "sable "];
            description += SMath_1.randomChoice(options);
        }
        options = [];
        options.push("nipple");
        if (breastRow.nipples.length < .5)
            options.push("perky nipple");
        else
            options.push("cherry-like nub");
        if (breastRow.nipples.fuckable)
            options.push("fuckable nip", "nipple-hole", "nipple-cunt");
        else if (breastRow.lactationMultiplier >= 1 && breastRow.nipples.length >= 1)
            options.push("teat");
        return description;
    }
    exports.describeNipple = describeNipple;
    exports.BreastCupNames = [
        "flat",
        "A-cup", "B-cup", "C-cup", "D-cup", "DD-cup", "big DD-cup", "E-cup", "big E-cup", "EE-cup",
        "big EE-cup", "F-cup", "big F-cup", "FF-cup", "big FF-cup", "G-cup", "big G-cup", "GG-cup", "big GG-cup", "H-cup",
        "big H-cup", "HH-cup", "big HH-cup", "HHH-cup", "I-cup", "big I-cup", "II-cup", "big II-cup", "J-cup", "big J-cup",
        "JJ-cup", "big JJ-cup", "K-cup", "big K-cup", "KK-cup", "big KK-cup", "L-cup", "big L-cup", "LL-cup", "big LL-cup",
        "M-cup", "big M-cup", "MM-cup", "big MM-cup", "MMM-cup", "large MMM-cup", "N-cup", "large N-cup", "NN-cup", "large NN-cup",
        "O-cup", "large O-cup", "OO-cup", "large OO-cup", "P-cup", "large P-cup", "PP-cup", "large PP-cup", "Q-cup", "large Q-cup",
        "QQ-cup", "large QQ-cup", "R-cup", "large R-cup", "RR-cup", "large RR-cup", "S-cup", "large S-cup", "SS-cup", "large SS-cup",
        "T-cup", "large T-cup", "TT-cup", "large TT-cup", "U-cup", "large U-cup", "UU-cup", "large UU-cup", "V-cup", "large V-cup",
        "VV-cup", "large VV-cup", "W-cup", "large W-cup", "WW-cup", "large WW-cup", "X-cup", "large X-cup", "XX-cup", "large XX-cup",
        "Y-cup", "large Y-cup", "YY-cup", "large YY-cup", "Z-cup", "large Z-cup", "ZZ-cup", "large ZZ-cup", "ZZZ-cup", "large ZZZ-cup" // 90-99
    ];
    function breastCup(size) {
        return exports.BreastCupNames[Math.min(Math.floor(size), exports.BreastCupNames.length - 1)];
    }
    exports.breastCup = breastCup;
    /**
     * Returns breast size from cup name.
     * Acceptable input: "flat","A","B","C","D","DD","DD+",... "ZZZ","ZZZ+" or exact match from BreastCupNames array
     */
    function breastCupInverse(name, defaultValue = 0) {
        if (name.length === 0)
            return defaultValue;
        if (name === "flat")
            return BreastRow_1.BreastCup.FLAT;
        const big = name.charAt(name.length - 1) === "+";
        if (big)
            name = name.substr(0, name.length - 1);
        for (let cup = 0; cup < exports.BreastCupNames.length; cup++) {
            if (name === exports.BreastCupNames[cup])
                return cup;
            if (exports.BreastCupNames[cup].indexOf(name) === 0)
                return cup + (big ? 1 : 0);
        }
        return defaultValue;
    }
    exports.breastCupInverse = breastCupInverse;
    function describeBiggestBreastRow(character) {
        let description = "";
        const biggestBreastRow = character.body.chest.sort(BreastRow_1.BreastRow.Largest).get(0);
        if (biggestBreastRow.rating < 1)
            return "flat breasts";
        // 50% of the time size-descript them
        if (SMath_1.randInt(2) === 0)
            description += describeBreastSize(biggestBreastRow.rating);
        // Nouns!
        const options = [];
        if (biggestBreastRow.rating > 6)
            options.push("love-pillows");
        if (biggestBreastRow.lactationMultiplier > 1.5)
            options.push("milky tits", "milky breasts");
        if (biggestBreastRow.lactationMultiplier > 2)
            options.push("milk-udders");
        if (biggestBreastRow.lactationMultiplier >= 1 && biggestBreastRow.lactationMultiplier < 2.5)
            options.push("milk jugs");
        if (biggestBreastRow.lactationMultiplier >= 2.5)
            options.push("udders");
        if (biggestBreastRow.lactationMultiplier < 1)
            options.push("jugs");
        options.push("boobs", "breasts", "tits");
        description += SMath_1.randomChoice(options);
        return description;
    }
    exports.describeBiggestBreastRow = describeBiggestBreastRow;
    function describeBreastSize(size) {
        let description = "";
        // Catch all for dudes.
        if (size < BreastRow_1.BreastCup.A)
            return "manly ";
        // Small - A->B
        if (size <= BreastRow_1.BreastCup.B) {
            description += SMath_1.randomChoice("palmable ", "tight ", "perky ", "baseball-sized ");
        }
        // C-D
        else if (size <= BreastRow_1.BreastCup.D) {
            description += SMath_1.randomChoice("nice ", "hand-filling ", "well-rounded ", "supple ", "softball-sized ");
        }
        // DD->big EE
        else if (size < BreastRow_1.BreastCup.F) {
            description += SMath_1.randomChoice("big ", "large ", "pillowy ", "jiggly ", "volleyball-sized ");
        }
        // F->big FF
        else if (size < BreastRow_1.BreastCup.G) {
            description += SMath_1.randomChoice("soccerball-sized ", "hand-overflowing ", "generous ", "jiggling ");
        }
        // G -> HHH
        else if (size < BreastRow_1.BreastCup.I) {
            description += SMath_1.randomChoice("basketball-sized ", "whorish ", "cushiony ", "wobbling ");
        }
        // I -> KK
        else if (size < BreastRow_1.BreastCup.KK_BIG) {
            description += SMath_1.randomChoice("massive motherly ", "luscious ", "smothering ", "prodigious ");
        }
        // K- > MMM+
        else {
            description += SMath_1.randomChoice("mountainous ", "monumental ", "back-breaking ", "exercise-ball-sized ", "immense ");
        }
        return description;
    }
    exports.describeBreastSize = describeBreastSize;
    function describeAllBreasts(character) {
        const chest = character.body.chest;
        let desciption = "";
        switch (chest.length / 2) {
            case 0:
                return "unremarkable chest muscles ";
            case 2:
                desciption += "two rows of ";
            case 3:
                desciption += SMath_1.randomChoice("three rows of ", "multi-layered ");
            case 4:
                desciption += SMath_1.randomChoice("four rows of ", "four-tiered ");
            case 5:
                desciption += SMath_1.randomChoice("five rows of ", "five-tiered ");
        }
        desciption += describeBiggestBreastRow(character);
        return desciption;
    }
    exports.describeAllBreasts = describeAllBreasts;
    function describeBreastGrowth(character, amount) {
        let text = "";
        const breastRow = character.body.chest.firstRow;
        const chest = character.body.chest;
        if (amount <= 2) {
            if (chest.length > 1)
                text += "Your rows of " + describeBreastRow(breastRow) + " jiggle with added weight, growing a bit larger.";
            if (chest.length === 1)
                text += "Your " + describeBreastRow(breastRow) + " jiggle with added weight as they expand, growing a bit larger.";
        }
        else if (amount <= 4) {
            if (chest.length > 1)
                text += "You stagger as your chest gets much heavier.  Looking down, you watch with curiosity as your rows of " + describeBreastRow(breastRow) + " expand significantly.";
            if (chest.length === 1)
                text += "You stagger as your chest gets much heavier.  Looking down, you watch with curiosity as your " + describeBreastRow(breastRow) + " expand significantly.";
        }
        else {
            if (chest.length > 1)
                text += "You drop to your knees from a massive change in your body's center of gravity.  Your " + describeBreastRow(breastRow) + " tingle strongly, growing disturbingly large.";
            if (chest.length === 1)
                text += "You drop to your knees from a massive change in your center of gravity.  The tingling in your " + describeBreastRow(breastRow) + " intensifies as they continue to grow at an obscene rate.";
        }
        if (chest.sort(BreastRow_1.BreastRow.Largest).get(0).rating >= 8.5 && chest.sort(BreastRow_1.BreastRow.Largest).get(0).nipples.length < 2) {
            text += "  A tender ratingat your " + describeNipple(character, breastRow) + "s as they grow to match your burgeoning breast-flesh.";
            chest.sort(BreastRow_1.BreastRow.Largest).get(0).nipples.length = 2;
        }
        if (chest.sort(BreastRow_1.BreastRow.Largest).get(0).rating >= 7 && chest.sort(BreastRow_1.BreastRow.Largest).get(0).nipples.length < 1) {
            text += "  A tender ratingat your " + describeNipple(character, breastRow) + "s as they grow to match your burgeoning breast-flesh.";
            chest.sort(BreastRow_1.BreastRow.Largest).get(0).nipples.length = 1;
        }
        if (chest.sort(BreastRow_1.BreastRow.Largest).get(0).rating >= 5 && chest.sort(BreastRow_1.BreastRow.Largest).get(0).nipples.length < .75) {
            text += "  A tender ratingat your " + describeNipple(character, breastRow) + "s as they grow to match your burgeoning breast-flesh.";
            chest.sort(BreastRow_1.BreastRow.Largest).get(0).nipples.length = .75;
        }
        if (chest.sort(BreastRow_1.BreastRow.Largest).get(0).rating >= 3 && chest.sort(BreastRow_1.BreastRow.Largest).get(0).nipples.length < .5) {
            text += "  A tender ratingat your " + describeNipple(character, breastRow) + "s as they grow to match your burgeoning breast-flesh.";
            chest.sort(BreastRow_1.BreastRow.Largest).get(0).nipples.length = .5;
        }
        return text;
    }
    exports.describeBreastGrowth = describeBreastGrowth;
    function describeTopRowBreastGrowth(character, amount) {
        const chest = character.body.chest;
        const topBreastRow = chest.firstRow;
        let text = "";
        if (amount <= 2) {
            if (chest.length > 1)
                text += "Your top row of " + describeBreastRow(topBreastRow) + " jiggles with added weight as it expands, growing a bit larger.";
            if (chest.length === 1)
                text += "Your row of " + describeBreastRow(topBreastRow) + " jiggles with added weight as it expands, growing a bit larger.";
        }
        if (amount > 2 && amount <= 4) {
            if (chest.length > 1)
                text += "You stagger as your chest gets much heavier.  Looking down, you watch with curiosity as your top row of " + describeBreastRow(topBreastRow) + " expand significantly.";
            if (chest.length === 1)
                text += "You stagger as your chest gets much heavier.  Looking down, you watch with curiosity as your " + describeBreastRow(topBreastRow) + " expand significantly.";
        }
        if (amount > 4) {
            if (chest.length > 1)
                text += "You drop to your knees from a massive change in your body's center of gravity.  Your top row of " + describeBreastRow(topBreastRow) + " tingle strongly, growing disturbingly large.";
            if (chest.length === 1)
                text += "You drop to your knees from a massive change in your center of gravity.  The tinglng in your " + describeBreastRow(topBreastRow) + " intensifies as they continue to grow at an obscene rate.";
        }
        if (topBreastRow.rating >= 8.5 && topBreastRow.nipples.length < 2) {
            text += "  A tender ache starts at your " + describeNipple(character, topBreastRow) + "s as they grow to match your burgeoning breast-flesh.";
            topBreastRow.nipples.length = 2;
        }
        if (topBreastRow.rating >= 7 && topBreastRow.nipples.length < 1) {
            text += "  A tender ache starts at your " + describeNipple(character, topBreastRow) + "s as they grow to match your burgeoning breast-flesh.";
            topBreastRow.nipples.length = 1;
        }
        if (topBreastRow.rating >= 5 && topBreastRow.nipples.length < .75) {
            text += "  A tender ache starts at your " + describeNipple(character, topBreastRow) + "s as they grow to match your burgeoning breast-flesh.";
            topBreastRow.nipples.length = .75;
        }
        if (topBreastRow.rating >= 3 && topBreastRow.nipples.length < .5) {
            text += "  A tender ache starts at your " + describeNipple(character, topBreastRow) + "s as they grow to match your burgeoning breast-flesh.";
            topBreastRow.nipples.length = .5;
        }
        return text;
    }
    exports.describeTopRowBreastGrowth = describeTopRowBreastGrowth;
    function describeChest(character) {
        if (character.body.chest.sort(BreastRow_1.BreastRow.Largest).get(0).rating < 1)
            return "chest";
        return describeBiggestBreastRow(character);
    }
    exports.describeChest = describeChest;
    function describeAllChest(character) {
        if (character.body.chest.sort(BreastRow_1.BreastRow.Largest).get(0).rating < 1)
            return "chest";
        return describeAllBreasts(character);
    }
    exports.describeAllChest = describeAllChest;
});
//# sourceMappingURL=BreastDescriptor.js.map