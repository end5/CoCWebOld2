define(["require", "exports", "Engine/Utilities/SMath", "Engine/Body/Skin", "Engine/Body/Vagina"], function (require, exports, SMath_1, Skin_1, Vagina_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function describeVagina(character, vagina) {
        let description = "";
        if (!vagina)
            return "";
        // tightness descript - 40% display rate
        if (SMath_1.percentChance(40)) {
            if (vagina.looseness === Vagina_1.VaginaLooseness.TIGHT)
                description += vagina.virgin ? "virgin" : "tight";
            else if (vagina.looseness === Vagina_1.VaginaLooseness.LOOSE)
                description += "loose";
            else if (vagina.looseness === Vagina_1.VaginaLooseness.GAPING)
                description += "very loose";
            else if (vagina.looseness === Vagina_1.VaginaLooseness.GAPING_WIDE)
                description += "gaping";
            else if (vagina.looseness === Vagina_1.VaginaLooseness.LEVEL_CLOWN_CAR)
                description += "gaping-wide";
        }
        // wetness descript - 30% display rate
        if (SMath_1.percentChance(30)) {
            if (description.length > 0)
                description += ", ";
            if (vagina.wetness === Vagina_1.VaginaWetness.DRY)
                description += "dry";
            if (vagina.wetness === Vagina_1.VaginaWetness.NORMAL)
                description += "moist";
            if (vagina.wetness === Vagina_1.VaginaWetness.WET)
                description += "wet";
            if (vagina.wetness === Vagina_1.VaginaWetness.SLICK)
                description += "slick";
            if (vagina.wetness === Vagina_1.VaginaWetness.DROOLING)
                description += "drooling";
            if (vagina.wetness === Vagina_1.VaginaWetness.SLAVERING)
                description += "slavering";
        }
        if (character.inventory.piercings.labia.isEquipped() && SMath_1.percentChance(33)) {
            if (description.length > 0)
                description += ", ";
            description += "pierced";
        }
        if (description === "" && character.body.skin.type === Skin_1.SkinType.GOO) {
            if (description.length > 0)
                description += ", ";
            description += SMath_1.randomChoice("gooey", "slimy");
        }
        if (vagina.type === Vagina_1.VaginaType.BLACK_SAND_TRAP && SMath_1.percentChance(50)) {
            if (description.length > 0)
                description += ", ";
            description += SMath_1.randomChoice("black", "onyx", "ebony", "dusky", "sable", "obsidian", "midnight-hued", "jet black");
        }
        if (description.length > 0)
            description += " ";
        description += SMath_1.randomChoice("vagina", "pussy", "cooter", "twat", "cunt", "snatch", "fuck-hole", "muff");
        // Something that would be nice to have but needs a variable in Creature or Character.
        // if(i_creature.bunnyScore() >= 3) description += "rabbit hole";
        return description;
    }
    exports.describeVagina = describeVagina;
    function describeAllVagina(character) {
        if (character.body.vaginas.length === 1)
            return describeVagina(character, character.body.vaginas.get(SMath_1.randInt(character.body.vaginas.length - 1)));
        if (character.body.vaginas.length > 1)
            return describeVagina(character, character.body.vaginas.get(SMath_1.randInt(character.body.vaginas.length - 1))) + "s";
        return '';
    }
    exports.describeAllVagina = describeAllVagina;
    function describeClit(character) {
        let description = "";
        const clit = character.body.clit;
        // Length Adjective - 50% chance
        if (SMath_1.percentChance(50)) {
            // small clits!
            if (clit.length <= .5) {
                description += SMath_1.randomChoice("tiny ", "little ", "petite ", "diminutive ", "miniature ");
            }
            // "average".
            if (clit.length > .5 && clit.length < 1.5) {
                // no size comment
            }
            // Biggies!
            if (clit.length >= 1.5 && clit.length < 4) {
                description += SMath_1.randomChoice("large ", "large ", "substantial ", "substantial ", "considerable ");
            }
            // 'Uge
            if (clit.length >= 4) {
                description += SMath_1.randomChoice("monster ", "tremendous ", "colossal ", "enormous ", "bulky ");
            }
        }
        // Descriptive descriptions - 50% chance of being called
        if (SMath_1.percentChance(50)) {
            // Doggie descriptors - 50%
            if (character.body.skin.type === Skin_1.SkinType.FUR && SMath_1.percentChance(50)) {
                description += "bitch-";
            }
            /*Horse descriptors - 50%
                if(creature.skin.type == SkinType.FUR && !descripted && chance(50)) {
                descripted = true;
                descript += "mare-";
                }*/
            // Horny descriptors - 75% chance
            else if (character.stats.lust > 70 && SMath_1.percentChance(75)) {
                description += SMath_1.randomChoice("throbbing ", "pulsating ", "hard ");
            }
            // High libido - always use if no other descript
            else if (character.stats.lib > 50 && SMath_1.percentChance(50)) {
                description += SMath_1.randomChoice("insatiable ", "greedy ", "demanding ", "rapacious");
            }
        }
        else if (character.inventory.piercings.clit.isEquipped()) {
            description += "pierced ";
        }
        // Clit nouns
        description += SMath_1.randomChoice("clit", "clitty", "button", "pleasure-buzzer", "clit", "clitty", "button", "clit", "clit", "button");
        return description;
    }
    exports.describeClit = describeClit;
});
//# sourceMappingURL=VaginaDescriptor.js.map