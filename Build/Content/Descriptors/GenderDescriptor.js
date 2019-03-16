define(["require", "exports", "Engine/Body/BreastRow", "Engine/Body/GenderIdentity"], function (require, exports, BreastRow_1, GenderIdentity_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function genderText(gender, male = "man", female = "woman", futa = "herm", eunuch = "eunuch") {
        if (gender === GenderIdentity_1.Gender.HERM)
            return futa;
        else if (gender === GenderIdentity_1.Gender.MALE)
            return male;
        else if (gender === GenderIdentity_1.Gender.FEMALE)
            return female;
        else if (gender === GenderIdentity_1.Gender.NONE)
            return eunuch;
        return '';
    }
    exports.genderText = genderText;
    function mfn(gender, male, female, neuter) {
        if (gender === GenderIdentity_1.Gender.NONE)
            return neuter;
        else if (gender === GenderIdentity_1.Gender.FEMALE)
            return female;
        else if (gender === GenderIdentity_1.Gender.MALE)
            return male;
        return '';
    }
    exports.mfn = mfn;
    function mf(character, male, female) {
        if (character.body.cocks.length > 0) {
            if (character.body.vaginas.length > 0)
                return female;
            else
                return male;
        }
        else {
            if (character.body.vaginas.length > 0)
                return female;
            else {
                if (character.body.chest.find(BreastRow_1.BreastRow.FemaleBreasts))
                    return female;
                else
                    return male;
            }
        }
    }
    exports.mf = mf;
    function manWomanFutaEunuch(gender, caps = false) {
        if (gender === GenderIdentity_1.Gender.HERM) {
            if (caps)
                return "Futa";
            else
                return "futa";
        }
        else if (gender === GenderIdentity_1.Gender.MALE) {
            if (caps)
                return "Man";
            else
                return "man";
        }
        else if (gender === GenderIdentity_1.Gender.FEMALE) {
            if (caps)
                return "Woman";
            else
                return "woman";
        }
        else if (gender === GenderIdentity_1.Gender.NONE) {
            if (caps)
                return "Eunuch";
            else
                return "eunuch";
        }
        return '';
    }
    exports.manWomanFutaEunuch = manWomanFutaEunuch;
    function guyGirl(gender, caps = false) {
        if (gender === GenderIdentity_1.Gender.HERM || gender === GenderIdentity_1.Gender.FEMALE) {
            if (caps)
                return "Girl";
            else
                return "girl";
        }
        else if (gender === GenderIdentity_1.Gender.MALE || gender === GenderIdentity_1.Gender.NONE) {
            if (caps)
                return "Guy";
            else
                return "guy";
        }
        return '';
    }
    exports.guyGirl = guyGirl;
    function boyGirl(gender, caps = false) {
        if (gender === GenderIdentity_1.Gender.HERM || gender === GenderIdentity_1.Gender.FEMALE) {
            if (caps)
                return "Girl";
            else
                return "girl";
        }
        else if (gender === GenderIdentity_1.Gender.MALE || gender === GenderIdentity_1.Gender.NONE) {
            if (caps)
                return "Boy";
            else
                return "boy";
        }
        return '';
    }
    exports.boyGirl = boyGirl;
    function maleFemale(gender, caps = false) {
        if (gender === GenderIdentity_1.Gender.HERM || gender === GenderIdentity_1.Gender.FEMALE) {
            if (caps)
                return "Female";
            else
                return "female";
        }
        else if (gender === GenderIdentity_1.Gender.MALE || gender === GenderIdentity_1.Gender.NONE) {
            if (caps)
                return "Male";
            else
                return "male";
        }
        return '';
    }
    exports.maleFemale = maleFemale;
    function sirMadam(gender, caps = false) {
        if (gender === GenderIdentity_1.Gender.HERM || gender === GenderIdentity_1.Gender.FEMALE) {
            if (caps)
                return "Madam";
            else
                return "madam";
        }
        else if (gender === GenderIdentity_1.Gender.MALE || gender === GenderIdentity_1.Gender.NONE) {
            if (caps)
                return "Sir";
            else
                return "Sir";
        }
        return '';
    }
    exports.sirMadam = sirMadam;
});
//# sourceMappingURL=GenderDescriptor.js.map