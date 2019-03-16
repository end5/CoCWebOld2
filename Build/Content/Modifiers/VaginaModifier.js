define(["require", "exports", "Engine/Utilities/SMath", "Engine/Body/Vagina", "Content/Effects/EffectType", "Content/Descriptors/VaginaDescriptor", "Engine/Display/ContentView", "Engine/Body/Pregnancy/Pregnancy", "Engine/Body/Pregnancy/Womb"], function (require, exports, SMath_1, Vagina_1, EffectType_1, VaginaDescriptor_1, ContentView_1, Pregnancy_1, Womb_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function stretchVagina(character, vaginaArea) {
        if (character.body.vaginas.length <= 0)
            return false;
        let stretched = false;
        const loosestVagina = character.body.vaginas.sort(Vagina_1.Vagina.LoosenessMost).get(0);
        if (character.effects.has(EffectType_1.EffectType.FerasBoonMilkingTwat) || loosestVagina.looseness <= Vagina_1.VaginaLooseness.NORMAL) {
            // cArea > capacity = autostreeeeetch.
            if (vaginaArea >= character.vaginalCapacity()) {
                if (loosestVagina.looseness >= Vagina_1.VaginaLooseness.LEVEL_CLOWN_CAR)
                    loosestVagina.looseness++;
                stretched = true;
            }
            // If within top 10% of capacity, 50% stretch
            else if (vaginaArea >= .9 * character.vaginalCapacity() && SMath_1.randInt(2) === 0) {
                loosestVagina.looseness++;
                stretched = true;
            }
            // if within 75th to 90th percentile, 25% stretch
            else if (vaginaArea >= .75 * character.vaginalCapacity() && SMath_1.randInt(4) === 0) {
                loosestVagina.looseness++;
                stretched = true;
            }
        }
        // If virgin
        const virginVaginas = character.body.vaginas.filter(Vagina_1.Vagina.Virgin);
        if (virginVaginas.length > 0) {
            virginVaginas.get(0).virgin = false;
        }
        // Delay anti-stretching
        if (vaginaArea >= .5 * character.vaginalCapacity()) {
            // Cunt Stretched used to determine how long since last enlargement
            const effect = character.effects.getByName(EffectType_1.EffectType.CuntStretched);
            if (!effect)
                character.effects.create(EffectType_1.EffectType.CuntStretched, { hoursSince: 0 });
            // Reset the timer on it to 0 when restretched.
            else
                effect.values.hoursSince = 0;
        }
        return stretched;
    }
    exports.stretchVagina = stretchVagina;
    /**
     * Was cuntChange on Player
     * @param character
     * @param cArea
     * @param display
     * @param spacingsF
     * @param spacingsB
     */
    function displayStretchVagina(character, cArea, display, spacingsF = false, spacingsB = true) {
        if (character.body.vaginas.length <= 0)
            return false;
        const firstVagina = character.body.vaginas.get(0);
        const wasVirgin = firstVagina.virgin;
        const stretched = stretchVagina(character, cArea);
        const devirgined = wasVirgin && !firstVagina.virgin;
        if (devirgined) {
            if (spacingsF)
                ContentView_1.CView.text("  ");
            ContentView_1.CView.text("<b>Your hymen is torn, robbing you of your virginity.</b>");
            if (spacingsB)
                ContentView_1.CView.text("  ");
        }
        // STRETCH SUCCESSFUL - begin flavor text if outputting it!
        if (display && stretched) {
            // Virgins get different formatting
            if (devirgined) {
                // If no spaces after virgin loss
                if (!spacingsB)
                    ContentView_1.CView.text("  ");
            }
            // Non virgins as usual
            else if (spacingsF)
                ContentView_1.CView.text("  ");
            if (firstVagina.looseness === Vagina_1.VaginaLooseness.LEVEL_CLOWN_CAR)
                ContentView_1.CView.text("<b>Your " + VaginaDescriptor_1.describeVagina(character, firstVagina) + " is stretched painfully wide, large enough to accomodate most beasts and demons.</b>");
            if (firstVagina.looseness === Vagina_1.VaginaLooseness.GAPING_WIDE)
                ContentView_1.CView.text("<b>Your " + VaginaDescriptor_1.describeVagina(character, firstVagina) + " is stretched so wide that it gapes continually.</b>");
            if (firstVagina.looseness === Vagina_1.VaginaLooseness.GAPING)
                ContentView_1.CView.text("<b>Your " + VaginaDescriptor_1.describeVagina(character, firstVagina) + " painfully stretches, the lips now wide enough to gape slightly.</b>");
            if (firstVagina.looseness === Vagina_1.VaginaLooseness.LOOSE)
                ContentView_1.CView.text("<b>Your " + VaginaDescriptor_1.describeVagina(character, firstVagina) + " is now very loose.</b>");
            if (firstVagina.looseness === Vagina_1.VaginaLooseness.NORMAL)
                ContentView_1.CView.text("<b>Your " + VaginaDescriptor_1.describeVagina(character, firstVagina) + " is now a little loose.</b>");
            if (firstVagina.looseness === Vagina_1.VaginaLooseness.TIGHT)
                ContentView_1.CView.text("<b>Your " + VaginaDescriptor_1.describeVagina(character, firstVagina) + " is stretched out to a more normal size.</b>");
            if (spacingsB)
                ContentView_1.CView.text("  ");
        }
        return stretched;
    }
    exports.displayStretchVagina = displayStretchVagina;
    /**
     *  $> Note: Imp, Ovielixer and Anemone pregnancy types should not fertilize eggs.
     * @param char
     * @param type
     * @param time
     * @param event
     * @param virility
     */
    function attemptKnockUp(char, type, time, event, virility = 100) {
        const notPregWomb = char.body.wombs.find(Womb_1.Womb.NotPregnant);
        if (notPregWomb)
            notPregWomb.knockUp(new Pregnancy_1.Pregnancy(type, time), event, virility);
        if (char.body.fertility > SMath_1.randInt(virility))
            char.body.ovipositor.fertilizeEggs();
    }
    exports.attemptKnockUp = attemptKnockUp;
    function attemptKnockUpNoEggs(char, type, time, event, virility = 100) {
        const notPregWomb = char.body.wombs.find(Womb_1.Womb.NotPregnant);
        if (notPregWomb)
            notPregWomb.knockUp(new Pregnancy_1.Pregnancy(type, time), event, virility);
    }
    exports.attemptKnockUpNoEggs = attemptKnockUpNoEggs;
});
//# sourceMappingURL=VaginaModifier.js.map