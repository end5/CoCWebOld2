define(["require", "exports", "Engine/Utilities/SMath", "Content/Effects/EffectType"], function (require, exports, SMath_1, EffectType_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    // ballsDescriptLight(forcedSize, true, this)
    /**
     * Describe creatures balls.
     * @param    forceDisplaySize    Force a description of the size of the balls
     * @param    plural        Show plural forms
     * @param    creature        Monster, Player or NonPlayer
     * @param    withArticle    Show description with article in front
     * @return    Full description of balls
     */
    function describeBalls(forceDisplaySize, plural, character, withArticle = false) {
        if (character.body.balls.count === 0)
            return "prostate";
        let description = "";
        let options = [];
        if (plural && (!character.effects.has(EffectType_1.EffectType.Uniball))) {
            if (character.body.balls.count === 1) {
                if (withArticle) {
                    options = ["a single",
                        "a solitary",
                        "a lone",
                        "an individual"];
                }
                else {
                    options = ["single",
                        "solitary",
                        "lone",
                        "individual"];
                }
                description += SMath_1.randomChoice(options);
            }
            else if (character.body.balls.count === 2) {
                if (withArticle) {
                    options = ["a pair of",
                        "two",
                        "a duo of"];
                }
                else {
                    options = ["pair of",
                        "two",
                        "duo of"];
                }
                description += SMath_1.randomChoice(options);
            }
            else if (character.body.balls.count === 3) {
                options = ["three",
                    "triple"];
                (withArticle) ? options.push("a trio of") : options.push("trio of");
                description += SMath_1.randomChoice(options);
            }
            else if (character.body.balls.count === 4) {
                options = ["four",
                    "quadruple"];
                (withArticle) ? options.push("a quartette of") : options.push("quartette of");
                description += SMath_1.randomChoice(options);
            }
            else {
                if (withArticle) {
                    options = ["a multitude of",
                        "many",
                        "a large handful of"];
                }
                else {
                    options = ["multitude of",
                        "many",
                        "large handful of"];
                }
                description += SMath_1.randomChoice(options);
            }
        }
        // size!
        if (character.body.balls.size > 1 && (SMath_1.randInt(3) <= 1 || forceDisplaySize)) {
            if (description)
                description += " ";
            if (character.body.balls.size >= 18)
                description += "hideously swollen and oversized";
            else if (character.body.balls.size >= 15)
                description += "beachball-sized";
            else if (character.body.balls.size >= 12)
                description += "watermelon-sized";
            else if (character.body.balls.size >= 9)
                description += "basketball-sized";
            else if (character.body.balls.size >= 7)
                description += "soccerball-sized";
            else if (character.body.balls.size >= 5)
                description += "cantaloupe-sized";
            else if (character.body.balls.size >= 4)
                description += "grapefruit-sized";
            else if (character.body.balls.size >= 3)
                description += "apple-sized";
            else if (character.body.balls.size >= 2)
                description += "baseball-sized";
            else if (character.body.balls.size > 1)
                description += "large";
        }
        // UNIBALL
        if (character.effects.has(EffectType_1.EffectType.Uniball)) {
            if (description)
                description += " ";
            options = ["tightly-compressed",
                "snug",
                "cute",
                "pleasantly squeezed",
                "compressed-together"];
            description += SMath_1.randomChoice(options);
        }
        // Descriptive
        if (character.hoursSinceCum >= 48 && SMath_1.randInt(2) === 0 && !forceDisplaySize) {
            if (description)
                description += " ";
            options = ["overflowing",
                "swollen",
                "cum-engorged"];
            description += SMath_1.randomChoice(options);
        }
        // lusty
        if (character.stats.lust > 90 && (description === "") && SMath_1.randInt(2) === 0 && !forceDisplaySize) {
            options = ["eager",
                "full",
                "needy",
                "desperate",
                "throbbing",
                "heated",
                "trembling",
                "quivering",
                "quaking"];
            description += SMath_1.randomChoice(options);
        }
        // Slimy skin
        if (character.body.skin.type === 3) {
            if (description)
                description += " ";
            options = ["goopey",
                "gooey",
                "slimy"];
            description += SMath_1.randomChoice(options);
        }
        if (description)
            description += " ";
        options = ["nut",
            "gonad",
            "teste",
            "testicle",
            "testicle",
            "ball",
            "ball",
            "ball"];
        // I don't know how this was ever supposed to work.
        // if (i_creature.balls == 4 && i_plural) options.push("quads", "quads", "quads");
        description += SMath_1.randomChoice(options);
        if (plural)
            description += "s";
        if (character.effects.has(EffectType_1.EffectType.Uniball) && SMath_1.randInt(2) === 0) {
            if (SMath_1.randInt(3) === 0)
                description += " merged into a cute, spherical package";
            else if (SMath_1.randInt(2) === 0)
                description += " combined into a round, girlish shape";
            else
                description += " squeezed together into a perky, rounded form";
        }
        return description;
    }
    exports.describeBalls = describeBalls;
    function describeBallsShort(character, forceDisplaySize = true) {
        return describeBalls(forceDisplaySize, true, character);
    }
    exports.describeBallsShort = describeBallsShort;
    // Returns random description of scrotum
    function describeSack(character) {
        if (character.body.balls.count === 0)
            return "prostate";
        let options = [];
        let description = "";
        options = ["scrotum",
            "sack",
            "nutsack",
            "ballsack",
            "beanbag",
            "pouch"];
        description += SMath_1.randomChoice(options);
        return description;
    }
    exports.describeSack = describeSack;
});
//# sourceMappingURL=BallsDescriptor.js.map