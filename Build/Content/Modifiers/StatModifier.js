define(["require", "exports", "Engine/Display/ContentView"], function (require, exports, ContentView_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function displayCharacterHPChange(character, changeAmount) {
        if (changeAmount > 0 && character.stats.HP === character.stats.maxHP) {
            ContentView_1.CView.text("You're as healthy as you can be.\n");
            return;
        }
        const oldHP = character.stats.HP;
        character.stats.HP += changeAmount;
        const diff = character.stats.HP - oldHP;
        if (diff > 0) {
            if (character.stats.HP === character.stats.maxHP)
                ContentView_1.CView.text("Your HP maxes out at " + character.stats.maxHP + ".\n");
            else
                ContentView_1.CView.text("You gain " + diff + " HP.\n");
        }
        // Negative HP
        else if (diff < 0) {
            if (character.stats.HP === 0)
                ContentView_1.CView.text("You take " + diff + " damage, dropping your HP to 0.\n");
            else
                ContentView_1.CView.text("You take " + diff + " damage.\n");
        }
    }
    exports.displayCharacterHPChange = displayCharacterHPChange;
});
//# sourceMappingURL=StatModifier.js.map