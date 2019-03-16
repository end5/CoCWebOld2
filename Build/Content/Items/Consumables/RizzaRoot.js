define(["require", "exports", "Engine/Items/Consumable", "../ConsumableName", "Engine/Utilities/SMath", "Content/Effects/EffectType", "Engine/Items/ItemDesc", "Content/Descriptors/HairDescriptor", "Engine/Display/ContentView"], function (require, exports, Consumable_1, ConsumableName_1, SMath_1, EffectType_1, ItemDesc_1, HairDescriptor_1, ContentView_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class RizzaRoot extends Consumable_1.Consumable {
        constructor() {
            super(ConsumableName_1.ConsumableName.RizzaRoot, new ItemDesc_1.ItemDesc("Rizza Root", "a tube of rizza root strands", "A small ceramic tube full of fine red root strands.  They smell something like citrus fruit."), 10);
        }
        canUse(character) {
            return true;
        }
        use(character) {
            ContentView_1.CView.clear();
            let changes = 0;
            let changeLimit = 1;
            if (SMath_1.randInt(2) === 0)
                changeLimit++;
            if (SMath_1.randInt(3) === 0)
                changeLimit++;
            if (SMath_1.randInt(4) === 0)
                changeLimit++;
            if (character.effects.has(EffectType_1.EffectType.HistoryAlchemist))
                changeLimit++;
            ContentView_1.CView.text("You chew on the thin red roots.  They have a rubbery texture and the taste is something like lemons and oranges mixed together.  The roots dry out your mouth as you chew them but at the same time they cause a cooling and numbing sensation that’s rather pleasant.");
            if ((changes < changeLimit) && (character.body.skin.type !== 0) && (SMath_1.randInt(6) === 0)) {
                if (character.body.skin.type === 1)
                    ContentView_1.CView.text("\n\nYour fur itches incessantly, so you start scratching it.  It starts coming off in big clumps before the whole mess begins sloughing off your body.  In seconds, your skin is hairless, or nearly so. <b>You've lost your fur!</b>");
                else if (character.body.skin.type === 2)
                    ContentView_1.CView.text("\n\nYour scales itch incessantly, so you scratch at them.  They start falling off wholesale, leaving you standing in a pile of scales after only a few moments. <b>You've lost your scales!</b>");
                else if (character.body.skin.type > 2)
                    ContentView_1.CView.text("\n\nYour " + character.body.skin.desc + " itches incessantly, and as you scratch it shifts and changes, becoming normal human-like skin. <b>Your skin is once again normal!</b>");
                character.body.skin.desc = "skin";
                character.body.skin.type = 0;
                changes += 2;
            }
            if ((changes < changeLimit) && (character.body.ears.type !== 4) && (SMath_1.randInt(4) === 0)) {
                character.body.ears.type = 4;
                changes++;
                ContentView_1.CView.text("\n\nA weird tingling runs through your scalp as your " + HairDescriptor_1.describeHair(character) + " shifts slightly.  You reach up and your hand bumps against <b>your new pointed elfin ears</b>.  You bet they look cute!");
            }
            if ((changes < changeLimit) && (character.body.tallness < 108)) {
                character.body.tallness += changeLimit - changes + SMath_1.randInt(2); // Add remaining changes as additional height
                if (character.body.tallness > 108)
                    character.body.tallness = 108;
                ContentView_1.CView.text("\n\nA shiver runs down your spine.  You realize that it, along with the rest of your frame, is now a bit taller.");
            }
            else if (character.body.tallness >= 108) {
                ContentView_1.CView.text("\n\nYou don’t feel anything happening along your spine.  Perhaps this is as tall as the rizza root can make you.");
            }
        }
    }
    exports.RizzaRoot = RizzaRoot;
});
//# sourceMappingURL=RizzaRoot.js.map