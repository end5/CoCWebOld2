define(["require", "exports", "Engine/Utilities/SMath", "Engine/Body/Butt", "Content/Effects/EffectType", "Content/Descriptors/ButtDescriptor", "Engine/Display/ContentView"], function (require, exports, SMath_1, Butt_1, EffectType_1, ButtDescriptor_1, ContentView_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function stretchButt(character, buttArea) {
        let stretched = false;
        // cArea > capacity = autostreeeeetch half the time.
        if (buttArea >= character.analCapacity() && SMath_1.randInt(2) === 0) {
            if (character.body.butt.looseness < Butt_1.ButtLooseness.GAPING)
                character.body.butt.looseness++;
            stretched = true;
            // Reset butt stretchin recovery time
            const buttStretched = character.effects.getByName(EffectType_1.EffectType.ButtStretched);
            if (buttStretched)
                buttStretched.values.hoursSince = 0;
        }
        // If within top 10% of capacity, 25% stretch
        if (buttArea < character.analCapacity() && buttArea >= .9 * character.analCapacity() && SMath_1.randInt(4) === 0) {
            character.body.butt.looseness++;
            stretched = true;
        }
        // if within 75th to 90th percentile, 10% stretch
        if (buttArea < .9 * character.analCapacity() && buttArea >= .75 * character.analCapacity() && SMath_1.randInt(10) === 0) {
            character.body.butt.looseness++;
            stretched = true;
        }
        // Anti-virgin
        if (character.body.butt.looseness === Butt_1.ButtLooseness.VIRGIN) {
            character.body.butt.looseness++;
            stretched = true;
        }
        // Delay un-stretching
        if (buttArea >= .5 * character.analCapacity()) {
            // Butt Stretched used to determine how long since last enlargement
            const buttStretched = character.effects.getByName(EffectType_1.EffectType.ButtStretched);
            if (!buttStretched)
                character.effects.create(EffectType_1.EffectType.ButtStretched, { hoursSince: 0 });
            // Reset the timer on it to 0 when restretched.
            else
                buttStretched.values.hoursSince = 0;
        }
        if (stretched) {
            console.trace("BUTT STRETCHED TO " + (character.body.butt.looseness) + ".");
        }
        return stretched;
    }
    exports.stretchButt = stretchButt;
    function displayStretchButt(character, cArea, display, spacingsF = true, spacingsB = true) {
        const stretched = stretchButt(character, cArea);
        // STRETCH SUCCESSFUL - begin flavor text if outputting it!
        if (stretched && display) {
            if (spacingsF)
                ContentView_1.CView.text("  ");
            if (character.body.butt.looseness === 5)
                ContentView_1.CView.text("<b>Your " + ButtDescriptor_1.describeButthole(character.body.butt) + " is stretched even wider, capable of taking even the largest of demons and beasts.</b>");
            if (character.body.butt.looseness === 4)
                ContentView_1.CView.text("<b>Your " + ButtDescriptor_1.describeButthole(character.body.butt) + " becomes so stretched that it gapes continually.</b>");
            if (character.body.butt.looseness === 3)
                ContentView_1.CView.text("<b>Your " + ButtDescriptor_1.describeButthole(character.body.butt) + " is now very loose.</b>");
            if (character.body.butt.looseness === 2)
                ContentView_1.CView.text("<b>Your " + ButtDescriptor_1.describeButthole(character.body.butt) + " is now a little loose.</b>");
            if (character.body.butt.looseness === 1)
                ContentView_1.CView.text("<b>You have lost your anal virginity.</b>");
            if (spacingsB)
                ContentView_1.CView.text("  ");
        }
        return stretched;
    }
    exports.displayStretchButt = displayStretchButt;
});
//# sourceMappingURL=ButtModifier.js.map