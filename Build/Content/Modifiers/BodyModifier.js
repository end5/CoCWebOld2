define(["require", "exports", "Engine/Body/GenderIdentity", "Content/Effects/EffectType", "Content/Descriptors/VaginaDescriptor", "Content/Descriptors/CockDescriptor", "Content/Descriptors/FaceDescriptor"], function (require, exports, GenderIdentity_1, EffectType_1, VaginaDescriptor_1, CockDescriptor_1, FaceDescriptor_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function displayModThickness(character, goal, strength = 1) {
        if (goal === character.body.thickness)
            return "";
        // Lose weight fatty!
        if (goal < character.body.thickness && goal < 50) {
            character.body.thickness -= strength;
            // YOUVE GONE TOO FAR! TURN BACK!
            if (character.body.thickness < goal)
                character.body.thickness = goal;
        }
        // Sup tubby!
        if (goal > character.body.thickness && goal > 50) {
            character.body.thickness += strength;
            // YOUVE GONE TOO FAR! TURN BACK!
            if (character.body.thickness > goal)
                character.body.thickness = goal;
        }
        // DIsplay 'U GOT FAT'
        if (goal >= character.body.thickness && goal >= 50)
            return "\n\nYour center of balance changes a little bit as your body noticeably widens. (+" + strength + " body thickness)";
        // GET THIN BITCH
        else if (goal <= character.body.thickness && goal <= 50)
            return "\n\nEach movement feels a tiny bit easier than the last.  Did you just lose a little weight!? (+" + strength + " thin)";
        return "";
    }
    exports.displayModThickness = displayModThickness;
    function displayModTone(character, goal, strength = 1) {
        if (goal === character.body.tone)
            return "";
        // Lose muscle visibility!
        if (goal < character.body.tone && goal < 50) {
            character.body.tone -= strength;
            // YOUVE GONE TOO FAR! TURN BACK!
            if (character.body.tone < goal) {
                character.body.tone = goal;
                return "\n\nYou've lost some tone, but can't lose any more creature way. (-" + strength + " muscle tone)";
            }
        }
        // MOAR hulkness
        if (goal > character.body.tone && goal > 50) {
            character.body.tone += strength;
            // YOUVE GONE TOO FAR! TURN BACK!
            if (character.body.tone > goal) {
                character.body.tone = goal;
                return "\n\nYou've gained some muscle tone, but can't gain any more creature way. (+" + strength + " muscle tone)";
            }
        }
        // DIsplay BITCH I WORK OUT
        if (goal >= character.body.tone && goal > 50)
            return "\n\nYour body feels a little more solid as you move, and your muscles look slightly more visible. (+" + strength + " muscle tone)";
        // Display DERP I HAVE GIRL MUSCLES
        else if (goal <= character.body.tone && goal < 50)
            return "\n\nMoving brings with it a little more jiggle than you're used to.  You don't seem to have gained weight, but your muscles look less visible. (-" + strength + " muscle tone)";
        return "";
    }
    exports.displayModTone = displayModTone;
    // Modify this.femininity!
    function displayModFem(character, goal, strength = 1) {
        let output = "";
        const old = FaceDescriptor_1.describeFaceShort(character);
        const oldN = character.body.femininity;
        let Changed = false;
        // If already perfect!
        if (goal === character.body.femininity)
            return "";
        // If turning MANLYMAN
        if (goal < character.body.femininity && goal <= 50) {
            character.body.femininity -= strength;
            // YOUVE GONE TOO FAR! TURN BACK!
            if (character.body.femininity < goal)
                character.body.femininity = goal;
            Changed = true;
        }
        // if turning GIRLGIRLY, like duh!
        if (goal > character.body.femininity && goal >= 50) {
            character.body.femininity += strength;
            // YOUVE GONE TOO FAR! TURN BACK!
            if (character.body.femininity > goal)
                character.body.femininity = goal;
            Changed = true;
        }
        // Fix if it went out of bounds!
        if (!character.effects.has(EffectType_1.EffectType.Androgyny))
            displayFixFemininity(character);
        // Abort if nothing changed!
        if (!Changed)
            return "";
        // See if a change happened!
        if (old !== FaceDescriptor_1.describeFaceShort(character)) {
            // Gain fem?
            if (goal > oldN)
                output = "\n\n<b>Your facial features soften as your body becomes more feminine. (+" + strength + ")</b>";
            if (goal < oldN)
                output = "\n\n<b>Your facial features harden as your body becomes more masculine. (+" + strength + ")</b>";
        }
        // Barely noticable change!
        else {
            if (goal > oldN)
                output = "\n\nThere's a tingling in your " + FaceDescriptor_1.describeFaceShort(character) + " as it changes imperceptibly towards being more feminine. (+" + strength + ")";
            else if (goal < oldN)
                output = "\n\nThere's a tingling in your " + FaceDescriptor_1.describeFaceShort(character) + " as it changes imperciptibly towards being more masculine. (+" + strength + ")";
        }
        return output;
    }
    exports.displayModFem = displayModFem;
    // Run creature every hour to 'fix' creature.femininity.
    function displayFixFemininity(character) {
        let output = "";
        // Genderless/herms share the same bounds
        if (character.gender === GenderIdentity_1.Gender.NONE || character.gender === GenderIdentity_1.Gender.HERM) {
            if (character.body.femininity < 20) {
                output += "\n<b>Your incredibly masculine, chiseled features become a little bit softer from your body's changing hormones.";
                if (character.body.beard.hasBeard()) {
                    output += "  As if that wasn't bad enough, your " + FaceDescriptor_1.describeBeard(character) + " falls out too!";
                    character.body.beard.length = 0;
                    character.body.beard.style = "";
                }
                output += "</b>\n";
                character.body.femininity = 20;
            }
            else if (character.body.femininity > 85) {
                output += "\n<b>You find your overly feminine face loses a little bit of its former female beauty due to your body's changing hormones.</b>\n";
                character.body.femininity = 85;
            }
        }
        // GURLS!
        else if (character.gender === GenderIdentity_1.Gender.FEMALE) {
            if (character.body.femininity < 30) {
                output += "\n<b>Your incredibly masculine, chiseled features become a little bit softer from your body's changing hormones.";
                if (character.body.beard.hasBeard()) {
                    output += "  As if that wasn't bad enough, your " + FaceDescriptor_1.describeBeard(character) + " falls out too!";
                    character.body.beard.length = 0;
                    character.body.beard.style = "";
                }
                output += "</b>\n";
                character.body.femininity = 30;
            }
        }
        // BOIZ!
        else if (character.gender === GenderIdentity_1.Gender.MALE) {
            if (character.body.femininity > 70) {
                output += "\n<b>You find your overly feminine face loses a little bit of its former female beauty due to your body's changing hormones.</b>\n";
                character.body.femininity = 70;
            }
            if (character.body.femininity > 40 && character.body.beard.hasBeard()) {
                output += "\n<b>Your beard falls out, leaving you with " + FaceDescriptor_1.describeFaceShort(character) + ".</b>\n";
                character.body.beard.length = 0;
                character.body.beard.style = "";
            }
        }
        if (character.gender !== 1 && character.body.beard.hasBeard()) {
            output += "\n<b>Your beard falls out, leaving you with " + FaceDescriptor_1.describeFaceShort(character) + ".</b>\n";
            character.body.beard.length = 0;
            character.body.beard.style = "";
        }
        return output;
    }
    exports.displayFixFemininity = displayFixFemininity;
    // Attempts to put the player in heat (or deeper in heat).
    // Returns true if successful, false if not.
    // The player cannot go into heat if she is already pregnant or is a he.
    //
    // First parameter: boolean indicating if should output standard text.
    // Second parameter: intensity, an integer multiplier that can increase the
    // duration and intensity. Defaults to 1.
    function displayGoIntoHeat(character, intensity = 1) {
        // Already in heat, intensify further.
        const heat = character.effects.getByName(EffectType_1.EffectType.Heat);
        if (heat) {
            if (heat.values.fertility) {
                heat.values.fertility += 5 * intensity;
            }
            if (heat.values.lib) {
                heat.values.lib += 5 * intensity;
            }
            if (heat.values.hourExpire) {
                heat.values.hourExpire += 48 * intensity;
            }
            character.stats.raw.lib += 5 * intensity;
            return "\n\nYour mind clouds as your " + VaginaDescriptor_1.describeVagina(character, character.body.vaginas.get(0)) + " moistens.  Despite already being in heat, the desire to copulate constantly grows even larger.";
        }
        // Go into heat.  Heats v1 is bonus fertility, v2 is bonus libido, v3 is hours till it's gone
        else {
            character.effects.create(EffectType_1.EffectType.Heat, {
                fertility: 10 * intensity,
                lib: 15 * intensity,
                hourExpire: 48 * intensity
            });
            character.stats.raw.lib += 15 * intensity;
            return "\n\nYour mind clouds as your " + VaginaDescriptor_1.describeVagina(character, character.body.vaginas.get(0)) + " moistens.  Your hands begin stroking your body from top to bottom, your sensitive skin burning with desire.  Fantasies about bending over and presenting your needy pussy to a male overwhelm you as <b>you realize you have gone into heat!</b>";
        }
    }
    exports.displayGoIntoHeat = displayGoIntoHeat;
    // Attempts to put the player in rut (or deeper in heat).
    // Returns true if successful, false if not.
    // The player cannot go into heat if he is a she.
    //
    // First parameter: boolean indicating if should output standard text.
    // Second parameter: intensity, an integer multiplier that can increase the
    // duration and intensity. Defaults to 1.
    function displayGoIntoRut(character, intensity = 1) {
        // Has rut, intensify it!
        const rut = character.effects.getByName(EffectType_1.EffectType.Rut);
        if (rut) {
            if (rut.values.cumQuantity) {
                rut.values.cumQuantity += 100 * intensity;
            }
            if (rut.values.lib) {
                rut.values.lib += 5 * intensity;
            }
            if (rut.values.hourExpire) {
                rut.values.hourExpire += 48 * intensity;
            }
            character.stats.raw.lib += 5 * intensity;
            return "\n\nYour " + CockDescriptor_1.describeCock(character, character.body.cocks.get(0)) + " throbs and dribbles as your desire to mate intensifies.  You know that <b>you've sunken deeper into rut</b>, but all that really matters is unloading into a cum-hungry cunt.";
        }
        else {
            // v1 - bonus cum production
            // v2 - bonus libido
            // v3 - time remaining!
            character.effects.create(EffectType_1.EffectType.Rut, {
                cumQuantity: 150 * intensity,
                lib: 5 * intensity,
                hourExpire: 100 * intensity
            });
            character.stats.raw.lib += 5 * intensity;
            return "\n\nYou stand up a bit straighter and look around, sniffing the air and searching for a mate.  Wait, what!?  It's hard to shake the thought from your head - you really could use a nice fertile hole to impregnate.  You slap your forehead and realize <b>you've gone into rut</b>!";
        }
    }
    exports.displayGoIntoRut = displayGoIntoRut;
});
//# sourceMappingURL=BodyModifier.js.map