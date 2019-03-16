define(["require", "exports", "Engine/Body/GenderIdentity"], function (require, exports, GenderIdentity_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class CharacterDescription {
        constructor(character, article, short, long, plural = false) {
            this.subjective = "";
            this.objective = "";
            this.possessive = "";
            this.secondPerson = false;
            this.char = character;
            this.article = article;
            this.defaultShort = short;
            this.otherShort = "";
            this.longDesc = long;
            this.isPlural = plural;
            this.update();
        }
        set isPlayer(value) {
            this.secondPerson = value;
            this.update();
        }
        update() {
            this.subjective = this.determinePronoun("you", "they", "he", "she", "it");
            this.objective = this.determinePronoun("you", "them", "him", "her", "it");
            this.possessive = this.determinePronoun("your", "their", "his", "her", "its");
            if (this.article === ("a" || "the"))
                this.article = this.plural ? "the" : "a";
        }
        determinePronoun(second, plural, male, female, other) {
            if (this.secondPerson)
                return second;
            if (this.plural)
                return plural;
            if (this.char.genderPref === GenderIdentity_1.Gender.MALE)
                return male;
            if (this.char.genderPref === GenderIdentity_1.Gender.FEMALE)
                return female;
            return other;
        }
        get name() {
            return this.otherShort !== "" ? this.otherShort : this.defaultShort;
        }
        set name(value) {
            this.otherShort = value;
        }
        get short() {
            return this.otherShort !== "" ? this.otherShort : this.defaultShort;
        }
        get long() {
            return this.longDesc;
        }
        set long(value) {
            this.longDesc = value;
        }
        get plural() {
            return this.isPlural;
        }
        /**
         * Returns subjective pronoun. (ie. you/he/she/it/they) - pronoun1
         */
        get subjectivePronoun() {
            return this.subjective;
        }
        /**
         * Returns objective pronoun. (ie. you/him/her/it/them) - pronoun2
         */
        get objectivePronoun() {
            return this.objective;
        }
        /**
         * Returns possessive pronoun. (ie. your/his/her/its/their) - pronoun3
         */
        get possessivePronoun() {
            return this.possessive;
        }
        /**
         * Returns "a" if singular, "the" if plural.
         */
        get a() {
            return this.article;
        }
        /**
         * Returns "A" if singular, "The" if plural.
         */
        get capitalA() {
            if (this.article.length === 0)
                return "";
            return this.article.charAt(0).toUpperCase() + this.article.substr(1);
        }
        serialize() {
            return {
                article: this.article,
                defaultShort: this.short,
                otherShort: this.otherShort,
                longDesc: this.long,
                isPlural: this.plural
            };
        }
        deserialize(saveObject) {
            this.article = saveObject.article;
            this.defaultShort = saveObject.defaultShort;
            this.otherShort = saveObject.otherShort;
            this.longDesc = saveObject.longDesc;
            this.isPlural = saveObject.isPlural;
        }
    }
    exports.CharacterDescription = CharacterDescription;
});
//# sourceMappingURL=CharacterDescription.js.map