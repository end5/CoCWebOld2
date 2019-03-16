define(["require", "exports", "Engine/Items/Consumable", "../ConsumableName", "Engine/Utilities/SMath", "Engine/Items/ItemDesc", "Content/Descriptors/CockDescriptor", "Content/Descriptors/VaginaDescriptor", "Engine/Body/GenderIdentity", "Engine/Display/ContentView", "Content/Modifiers/BodyModifier", "Engine/Combat/CombatManager"], function (require, exports, Consumable_1, ConsumableName_1, SMath_1, ItemDesc_1, CockDescriptor_1, VaginaDescriptor_1, GenderIdentity_1, ContentView_1, BodyModifier_1, CombatManager_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class LustDraft extends Consumable_1.Consumable {
        constructor(enhanced) {
            if (enhanced)
                super(ConsumableName_1.ConsumableName.LustDraftEnhanced, new ItemDesc_1.ItemDesc("F.Draft", "a vial of roiling red fluid labeled \"Fuck Draft\"", "This vial of red fluid bubbles constantly inside the glass, as if eager to escape.  It smells very strongly, though its odor is difficult to identify.  The word \"Fuck\" is inscribed on the side of the vial."));
            else
                super(ConsumableName_1.ConsumableName.LustDraft, new ItemDesc_1.ItemDesc("LustDraft", "a vial of roiling bubble-gum pink fluid", "This vial of bright pink fluid bubbles constantly inside the glass, as if eager to escape.  It smells very sweet, and has \"Lust\" inscribed on the side of the vial."), 20);
            this.enhanced = enhanced;
        }
        use(character) {
            ContentView_1.CView.clear();
            ContentView_1.CView.text("You drink the ");
            if (this.enhanced)
                ContentView_1.CView.text("red");
            else
                ContentView_1.CView.text("pink");
            ContentView_1.CView.text(" potion, and its unnatural warmth immediately flows to your groin.");
            character.stats.raw.lust += 30 + SMath_1.randInt(character.stats.lib / 10);
            // Heat/Rut for those that can have them if "fuck draft"
            if (this.enhanced) {
                // Try to go into intense heat.
                BodyModifier_1.displayGoIntoHeat(character, 2);
                // Males go into rut
                BodyModifier_1.displayGoIntoRut(character);
            }
            // ORGAZMO
            if (character.stats.lust >= 100 && !CombatManager_1.CombatManager.inCombat) {
                ContentView_1.CView.text("\n\nThe arousal from the potion overwhelms your senses and causes you to spontaneously orgasm.  You rip off your " + character.inventory.armor.displayName + " and look down as your ");
                if (character.body.cocks.length > 0) {
                    ContentView_1.CView.text(CockDescriptor_1.describeCocksLight(character) + " erupts in front of you, liberally spraying the ground around you.  ");
                }
                if (character.body.cocks.length > 0 && character.body.vaginas.length > 0) {
                    ContentView_1.CView.text("At the same time your ");
                }
                if (character.body.vaginas.length > 0) {
                    ContentView_1.CView.text(VaginaDescriptor_1.describeVagina(character, character.body.vaginas.get(0)) + " soaks your thighs.  ");
                }
                if (character.gender === GenderIdentity_1.Gender.NONE)
                    ContentView_1.CView.text("body begins to quiver with orgasmic bliss.  ");
                ContentView_1.CView.text("Once you've had a chance to calm down, you notice that the explosion of pleasure you just experienced has rocked you to your core.  You are a little hornier than you were before.");
                // increase character libido, and maybe sensitivity too?
                character.orgasm();
                character.stats.lib += 2;
                character.stats.sens += 1;
            }
            if (character.stats.lust > 100)
                character.stats.lust = 100;
            ContentView_1.CView.text("\n\n");
        }
    }
    exports.LustDraft = LustDraft;
});
//# sourceMappingURL=LustDraft.js.map