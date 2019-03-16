define(["require", "exports", "Content/Descriptors/HairDescriptor", "Engine/Display/ContentView"], function (require, exports, HairDescriptor_1, ContentView_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function displayGrowHair(character, amount = .1) {
        // Grow hair!
        const hairLength = character.body.hair.length;
        character.body.hair.length += amount;
        if (hairLength > 0 && hairLength === 0) {
            ContentView_1.CView.text("\n<b>You are no longer bald.  You now have " + HairDescriptor_1.describeHair(character) + " coating your head.\n</b>");
            return true;
        }
        else if (hairLength >= 1 && hairLength < 1) {
            ContentView_1.CView.text("\n<b>Your hair's growth has reached a new threshhold, giving you " + HairDescriptor_1.describeHair(character) + ".\n</b>");
            return true;
        }
        else if (hairLength >= 3 && hairLength < 3) {
            ContentView_1.CView.text("\n<b>Your hair's growth has reached a new threshhold, giving you " + HairDescriptor_1.describeHair(character) + ".\n</b>");
            return true;
        }
        else if (hairLength >= 6 && hairLength < 6) {
            ContentView_1.CView.text("\n<b>Your hair's growth has reached a new threshhold, giving you " + HairDescriptor_1.describeHair(character) + ".\n</b>");
            return true;
        }
        else if (hairLength >= 10 && hairLength < 10) {
            ContentView_1.CView.text("\n<b>Your hair's growth has reached a new threshhold, giving you " + HairDescriptor_1.describeHair(character) + ".\n</b>");
            return true;
        }
        else if (hairLength >= 16 && hairLength < 16) {
            ContentView_1.CView.text("\n<b>Your hair's growth has reached a new threshhold, giving you " + HairDescriptor_1.describeHair(character) + ".\n</b>");
            return true;
        }
        else if (hairLength >= 26 && hairLength < 26) {
            ContentView_1.CView.text("\n<b>Your hair's growth has reached a new threshhold, giving you " + HairDescriptor_1.describeHair(character) + ".\n</b>");
            return true;
        }
        else if (hairLength >= 40 && hairLength < 40) {
            ContentView_1.CView.text("\n<b>Your hair's growth has reached a new threshhold, giving you " + HairDescriptor_1.describeHair(character) + ".\n</b>");
            return true;
        }
        else if (hairLength >= 40 && hairLength >= character.body.tallness && hairLength < character.body.tallness) {
            ContentView_1.CView.text("\n<b>Your hair's growth has reached a new threshhold, giving you " + HairDescriptor_1.describeHair(character) + ".\n</b>");
            return true;
        }
        return false;
    }
    exports.displayGrowHair = displayGrowHair;
});
//# sourceMappingURL=HairModifier.js.map