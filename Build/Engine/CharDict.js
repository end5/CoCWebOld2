define(["require", "exports", "Engine/Utilities/Dictionary"], function (require, exports, Dictionary_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class CharacterDict extends Dictionary_1.Dictionary {
        add(char) {
            this.dictionary[char.uuid] = char;
        }
    }
    exports.CharDict = new CharacterDict();
});
//# sourceMappingURL=CharDict.js.map