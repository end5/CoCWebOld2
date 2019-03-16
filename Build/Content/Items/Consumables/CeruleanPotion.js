define(["require", "exports", "Engine/Items/Consumable", "../ConsumableName", "Engine/Body/GenderIdentity", "Content/Effects/EffectType", "Engine/Items/ItemDesc", "Engine/Display/ContentView", "Engine/Flags"], function (require, exports, Consumable_1, ConsumableName_1, GenderIdentity_1, EffectType_1, ItemDesc_1, ContentView_1, Flags_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.CeruleanPotionFlags = Flags_1.Flags.register("Cerulean Potion", {
        CERULEAN_POTION_NEUTER_ATTEMPTED: 0,
        CERULEAN_POTION_HERM_USED: 0,
        TIMES_DRANK: 0,
    });
    class CeruleanPotion extends Consumable_1.Consumable {
        constructor() {
            super(ConsumableName_1.ConsumableName.CeruleanPotion, new ItemDesc_1.ItemDesc("Cerulean P.", "a cerulean-tinted potion", "This is a mysterious bottle filled with a sky-blue liquid that sloshes gently inside.  Supposedly it will make you irresistible, though to what or who you cannot say."));
        }
        use(character) {
            character.slimeFeed();
            // Repeat genderless encounters
            ContentView_1.CView.clear();
            if (character.gender === GenderIdentity_1.Gender.NONE && exports.CeruleanPotionFlags.CERULEAN_POTION_NEUTER_ATTEMPTED > 0) {
                ContentView_1.CView.text("You take another sip of the Cerulean Potion.  You find it soothing and become very excited about the possibility of another visit from the succubus.");
            }
            else if (character.gender === GenderIdentity_1.Gender.HERM && exports.CeruleanPotionFlags.CERULEAN_POTION_HERM_USED > 0) {
                ContentView_1.CView.text("With anticipation, you chug down another bottle of the Cerulean Potion. A warm sensation radiates out from your stomach as you feel the potion course through your body.");
            }
            // All else
            else {
                ContentView_1.CView.text("The liquid tastes rather bland and goes down easily. ");
                // Special repeat texts
                if (character.effects.has(EffectType_1.EffectType.RepeatSuccubi))
                    ContentView_1.CView.text("You look forwards to tonight's encounter.");
                // First timer huh?
                else
                    ContentView_1.CView.text("You do not notice any real effects.  Did the merchant con you?");
            }
            if (exports.CeruleanPotionFlags.TIMES_DRANK < 3)
                exports.CeruleanPotionFlags.TIMES_DRANK++;
        }
    }
    exports.CeruleanPotion = CeruleanPotion;
});
//# sourceMappingURL=CeruleanPotion.js.map