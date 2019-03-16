define(["require", "exports", "Engine/Items/Consumable", "../ConsumableName", "Engine/Utilities/SMath", "Content/Effects/EffectType", "Engine/Items/ItemDesc", "Engine/Display/ContentView"], function (require, exports, Consumable_1, ConsumableName_1, SMath_1, EffectType_1, ItemDesc_1, ContentView_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class SensitivityDraft extends Consumable_1.Consumable {
        constructor() {
            super(ConsumableName_1.ConsumableName.SensitivityDraft, new ItemDesc_1.ItemDesc("Sens. Draft", "a bottle of sensitivity draft", "This carefully labelled potion is a 'Sensitivity Draft', and if the diagrams are any indication, it will make your body more sensitive."), 15);
        }
        use(character) {
            ContentView_1.CView.clear();
            ContentView_1.CView.text("You pop the cork on this small vial and drink down the clear liquid.  It makes your lips and tongue tingle strangely, letting you feel each globule of spit in your mouth and each breath of air as it slides past your lips.");
            if (character.effects.has(EffectType_1.EffectType.Dysfunction)) {
                ContentView_1.CView.text("\n\nThankfully, the draft invigorates your groin, replacing the numbness with waves of raw sensation.  It seems your crotch is back to normal and <b>you can masturbate again!</b>");
                character.effects.removeByName(EffectType_1.EffectType.Dysfunction);
            }
            if (SMath_1.randInt(4) === 0 && !character.effects.has(EffectType_1.EffectType.LustyTongue)) {
                ContentView_1.CView.text("The constant tingling in your mouth grows and grows, particularly around your lips, until they feel as sensitive as ");
                if (character.body.vaginas.length > 0)
                    ContentView_1.CView.text("your");
                else
                    ContentView_1.CView.text("a woman's");
                ContentView_1.CView.text(" lower lips.  You'll have to be careful not to lick them!");
                // (Lustytongue status)
                character.effects.create(EffectType_1.EffectType.LustyTongue, { combatExpire: 25 });
            }
            ContentView_1.CView.text("\n\nAfter the wave of sensation passes, your " + character.body.skin.desc + " feels a little more receptive to touch.  ");
            if (character.stats.lust > 70 || character.stats.lib > 70) {
                ContentView_1.CView.text("You shiver and think of how much better it'll make sex and masturbation.");
            }
            else
                ContentView_1.CView.text("You worry it'll make it harder to resist the attentions of a demon.");
            character.stats.sens += 10;
            character.stats.lust += 5;
        }
    }
    exports.SensitivityDraft = SensitivityDraft;
});
//# sourceMappingURL=SensitivityDraft.js.map