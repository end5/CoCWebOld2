define(["require", "exports", "Engine/Items/Consumable", "../ConsumableName", "Content/Effects/EffectType", "Engine/Items/ItemDesc", "Engine/Display/ContentView"], function (require, exports, Consumable_1, ConsumableName_1, EffectType_1, ItemDesc_1, ContentView_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class DeBimbo extends Consumable_1.Consumable {
        constructor() {
            super(ConsumableName_1.ConsumableName.DeBimbo, new ItemDesc_1.ItemDesc("Debimbo", "a bottle marked as 'Debimbo'"), 250);
        }
        description(character) {
            if (character.effects.has(EffectType_1.EffectType.BimboBrains) || character.effects.has(EffectType_1.EffectType.FutaFaculties))
                return "This should totally like, fix your brain and stuff.  You don't really think anything is wrong with your head - it feels all pink and giggly all the time.";
            else
                return "This draft is concocted from five scholar's teas and who knows what else.  Supposedly it will correct the stupifying effects of Bimbo Liqueur.";
        }
        canUse(character) {
            if (character.effects.has(EffectType_1.EffectType.BimboBrains) || character.effects.has(EffectType_1.EffectType.FutaFaculties))
                return true;
            ContentView_1.CView.text("You can't use this right now, and it's too expensive to waste!\n\n");
            return false;
        }
        use(character) {
            if (character.effects.has(EffectType_1.EffectType.BimboBrains)) {
                ContentView_1.CView.text("\n\n(<b>Perk Removed:  Bimbo Brains - Your intelligence and speech patterns are no longer limited to that of a bimbo.</b>)");
                character.effects.removeByName(EffectType_1.EffectType.BimboBrains);
            }
            else if (character.effects.has(EffectType_1.EffectType.FutaFaculties)) {
                ContentView_1.CView.text("\n\n(<b>Perk Removed:  Futa Faculties - Your intelligence and speech patterns are no longer limited to that of a futanari bimbo.</b>)");
                character.effects.removeByName(EffectType_1.EffectType.FutaFaculties);
            }
        }
        useText() {
            ContentView_1.CView.text("Well, time to see what this smelly, old rat was on about!  You pinch your nose and swallow the foul-tasting mixture with a grimace.  Oh, that's just <i>nasty!</i>  You drop the vial, which shatters on the ground, clutching at your head as a wave of nausea rolls over you.  Stumbling back against a rock for support, you close your eyes.  A constant, pounding ache throbs just behind your temples, and for once, you find yourself speechless.  A pained groan slips through your lips as thoughts and memories come rushing back.  One after another, threads of cognizant thought plow through the simple matrices of your bimbo mind, shredding and replacing them.");
            ContentView_1.CView.text("\n\nYou... you were an air-headed ditz!  A vacuous, idiot-girl with nothing between her ears but hunger for dick and pleasure!  You shudder as your faculties return, the pain diminishing with each passing moment.");
        }
    }
    exports.DeBimbo = DeBimbo;
});
//# sourceMappingURL=DeBimbo.js.map