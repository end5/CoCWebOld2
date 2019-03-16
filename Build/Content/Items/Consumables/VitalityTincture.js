define(["require", "exports", "Engine/Items/Consumable", "../ConsumableName", "Engine/Utilities/SMath", "Engine/Items/ItemDesc", "Engine/Display/ContentView", "Content/Modifiers/BodyModifier"], function (require, exports, Consumable_1, ConsumableName_1, SMath_1, ItemDesc_1, ContentView_1, BodyModifier_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class VitalityTincture extends Consumable_1.Consumable {
        constructor() {
            super(ConsumableName_1.ConsumableName.VitalityTincture, new ItemDesc_1.ItemDesc("Vitality T.", "a vitality tincture", "This potent tea is supposedly good for strengthening the body."));
        }
        use(character) {
            ContentView_1.CView.clear();
            ContentView_1.CView.text("You down the contents of the bottle. The liquid is thick and tastes remarkably like cherries. Within moments, you feel much more fit and healthy.");
            // str change
            let strChange = SMath_1.randInt(3);
            character.stats.str = strChange;
            // Garunteed toughness if no str
            if (strChange === 0) {
                strChange = SMath_1.randInt(3);
                if (strChange === 0)
                    strChange = 1;
            }
            else
                strChange = SMath_1.randInt(3);
            // tou change
            character.stats.tou = strChange;
            // Chance of fitness change
            if (character.stats.HP + 50 !== character.stats.maxHP) {
                character.stats.HP += 50;
                ContentView_1.CView.text("  Any aches, pains and bruises you have suffered no longer hurt and you feel much better.");
            }
            if (SMath_1.randInt(3) === 0)
                ContentView_1.CView.text(BodyModifier_1.displayModTone(character, 95, 3));
        }
    }
    exports.VitalityTincture = VitalityTincture;
});
//# sourceMappingURL=VitalityTincture.js.map