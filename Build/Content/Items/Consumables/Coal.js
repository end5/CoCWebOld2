define(["require", "exports", "Engine/Items/Consumable", "../ConsumableName", "Content/Effects/EffectType", "Engine/Items/ItemDesc", "Content/Descriptors/ButtDescriptor", "Engine/Display/ContentView", "Content/Modifiers/BodyModifier"], function (require, exports, Consumable_1, ConsumableName_1, EffectType_1, ItemDesc_1, ButtDescriptor_1, ContentView_1, BodyModifier_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Coal extends Consumable_1.Consumable {
        constructor() {
            super(ConsumableName_1.ConsumableName.Coal, new ItemDesc_1.ItemDesc("Coal", "two pieces of coal"));
        }
        use(character) {
            // let changes: number = 0;
            ContentView_1.CView.clear();
            ContentView_1.CView.text("You handle the coal rocks experimentally and they crumble to dust in your hands!  You cough as you breathe in the cloud, sputtering and wheezing.  After a minute of terrible coughing, you recover and realize there's no remaining trace of the rocks, not even a sooty stain on your hands!");
            // Try to go into intense heat
            if (character.canGoIntoHeat()) {
                BodyModifier_1.displayGoIntoHeat(character, 2);
                // changes++;
            }
            // Males go into rut
            else if (character.canGoIntoRut()) {
                BodyModifier_1.displayGoIntoRut(character);
                // changes++;
            }
            else {
                // Boost anal capacity without gaping
                let bonusACapacity = character.effects.getByName(EffectType_1.EffectType.BonusACapacity);
                if (!bonusACapacity)
                    bonusACapacity = character.effects.create(EffectType_1.EffectType.BonusACapacity, { analCapacity: 0 });
                if (bonusACapacity.values.analCapacity && bonusACapacity.values.analCapacity < 80) {
                    bonusACapacity.values.analCapacity += 5;
                    ContentView_1.CView.text("\n\nYou feel... more accommodating somehow.  Your " + ButtDescriptor_1.describeButthole(character.body.butt) + " is tingling a bit, and though it doesn't seem to have loosened, it has grown more elastic.");
                    // changes++;
                }
                else {
                    ContentView_1.CView.text("\n\nYour whole body tingles for a moment but it passes.  It doesn't look like the coal can do anything to you at this point.");
                }
            }
        }
    }
    exports.Coal = Coal;
});
//# sourceMappingURL=Coal.js.map