define(["require", "exports", "Content/Character/CharacterType", "Engine/Display/ContentView", "Engine/Effects/Effect"], function (require, exports, CharacterType_1, ContentView_1, Effect_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Stunned extends Effect_1.Effect {
        combatTurnStart(character) {
            if (character.charType !== CharacterType_1.CharacterType.Player) {
                ContentView_1.CView.text("<b>" + character.desc.capitalA + character.desc.short + " is still stunned!</b>");
                ContentView_1.CView.text("\n\n");
            }
        }
    }
    exports.Stunned = Stunned;
});
//# sourceMappingURL=Stunned.js.map