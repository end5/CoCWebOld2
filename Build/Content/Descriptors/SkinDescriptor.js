define(["require", "exports", "Engine/Body/Skin"], function (require, exports, Skin_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function skinFurScales(character) {
        let skinzilla = "";
        // Adjectives first!
        if (character.body.skin.adj !== "")
            skinzilla += character.body.skin.adj + ", ";
        // Fur handled a little differently since it uses
        // haircolor
        skinzilla += character.body.skin.type === Skin_1.SkinType.FUR ? character.body.hair.color + " " : character.body.skin.tone + " ";
        skinzilla += character.body.skin.desc;
        return skinzilla;
    }
    exports.skinFurScales = skinFurScales;
    function describeSkin(character, noAdj = false, noTone = false) {
        let skinzilla = "";
        // Only show stuff other than skin.desc if justSkin is false
        if (!noAdj) {
            // Adjectives first!
            if (character.body.skin.adj !== "" && !noTone && character.body.skin.tone !== "rough gray") {
                skinzilla += character.body.skin.adj;
                if (noTone)
                    skinzilla += " ";
                else
                    skinzilla += ", ";
            }
        }
        if (!noTone)
            skinzilla += character.body.skin.tone + " ";
        // Fur handled a little differently since it uses
        // haircolor
        if (character.body.skin.type === 1)
            skinzilla += "skin";
        else
            skinzilla += character.body.skin.desc;
        return skinzilla;
    }
    exports.describeSkin = describeSkin;
});
//# sourceMappingURL=SkinDescriptor.js.map