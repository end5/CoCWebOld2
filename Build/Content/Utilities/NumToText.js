define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.NUMBER_WORDS_CARDINAL = ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten"];
    exports.NUMBER_WORDS_CARDINAL_CAPITAL = ["Zero", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten"];
    exports.NUMBER_WORDS_ORDINAL = ["zeroth", "first", "second", "third", "fourth", "fifth", "sixth", "seventh", "eighth", "ninth", "tenth"];
    /**
     * Converts a number to cardinal words. (eg. zero, one, two ...)
     * @param num
     */
    function numToCardinalText(num) {
        if (num >= 0 && num <= 10)
            return exports.NUMBER_WORDS_CARDINAL[num];
        return num.toString();
    }
    exports.numToCardinalText = numToCardinalText;
    /**
     * Converts a number to ordinal words. (eg. first, second, third ...)
     * @param num
     */
    function numToOrdinalText(num) {
        if (num < 0)
            return num.toString(); // Can't really have the -10th of something
        if (num <= 10)
            return exports.NUMBER_WORDS_ORDINAL[num];
        switch (num % 10) {
            case 1: return num.toString() + "st";
            case 2: return num.toString() + "nd";
            case 3: return num.toString() + "rd";
            default:
        }
        return num.toString() + "th";
    }
    exports.numToOrdinalText = numToOrdinalText;
    function numToCardinalCapText(num) {
        if (num >= 0 && num <= 10)
            return exports.NUMBER_WORDS_CARDINAL_CAPITAL[num];
        return num.toString();
    }
    exports.numToCardinalCapText = numToCardinalCapText;
    function capFirstLetter(str) {
        if (str.length === 0)
            return "";
        return str.charAt(0).toUpperCase() + str.substr(1);
    }
    exports.capFirstLetter = capFirstLetter;
});
//# sourceMappingURL=NumToText.js.map