define(["require", "exports", "Engine/Items/Consumable", "../ConsumableName", "Engine/Utilities/SMath", "Content/Body/Pregnancy/PregnancyType", "Engine/Items/ItemDesc", "Engine/Display/ContentView", "Engine/Body/Pregnancy/Womb", "./Eggs", "Content/Body/Pregnancy/EggPregnancy", "Content/Scenes/Pregnancy/Ovielixir"], function (require, exports, Consumable_1, ConsumableName_1, SMath_1, PregnancyType_1, ItemDesc_1, ContentView_1, Womb_1, Eggs_1, EggPregnancy_1, Ovielixir_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class OvipositionElixir extends Consumable_1.Consumable {
        constructor() {
            super(ConsumableName_1.ConsumableName.OvipositionElixir, new ItemDesc_1.ItemDesc("Ovi Elixir", "a hexagonal crystal bottle tagged with an image of an egg", "This hexagonal crystal bottle is filled with a strange green fluid.  A tag with a picture of an egg is tied to the neck of the bottle, indicating it is somehow connected to egg-laying."), 30);
        }
        canUse(character) {
            if (character.body.vaginas.length > 0)
                return true;
            ContentView_1.CView.text("You pop the cork and prepare to drink the stuff, but the smell nearly makes you gag.  You cork it hastily.\n\n");
            return false;
        }
        // Oviposition Elixer!
        /* Notes on StatusAffects.Eggs
         v1 = egg type.
         v2 = size - 0 for normal, 1 for large
         v3 = quantity
         EGG TYPES-
         0 - brown - ass expansion
         1 - purple - hip expansion
         2 - blue - vaginal removal and/or growth of existing maleness
         3 - pink - dick removal and/or fertility increase.
         4 - white - breast growth.  If lactating increases lactation.
         5 - rubbery black
         */
        use(character) {
            character.slimeFeed();
            ContentView_1.CView.text("You pop the cork and gulp down the thick greenish fluid.  The taste is unusual and unlike anything you've tasted before.");
            if (character.body.wombs.find(Womb_1.Womb.PregnantWithType(PregnancyType_1.PregnancyType.GOO_STUFFED))) {
                ContentView_1.CView.text("\n\nFor a moment you feel even more bloated than you already are.  That feeling is soon replaced by a dull throbbing pain.  It seems that with Valeria's goo filling your womb the ovielixir is unable to work its magic on you.");
                return;
            }
            if (character.body.wombs.find(Womb_1.Womb.PregnantWithType(PregnancyType_1.PregnancyType.WORM_STUFFED))) {
                ContentView_1.CView.text("\n\nFor a moment you feel even more bloated than you already are.  That feeling is soon replaced by a dull throbbing pain.  It seems that with the worms filling your womb the ovielixir is unable to work its magic on you.");
                return;
            }
            if (character.body.wombs.find(Womb_1.Womb.NotPregnant)) { // If the character is not pregnant, get preggers with eggs!
                ContentView_1.CView.text("\n\nThe elixir has an immediate effect on your belly, causing it to swell out slightly as if pregnant.  You guess you'll be laying eggs sometime soon!");
                character.body.wombs.find(Womb_1.Womb.NotPregnant).knockUp(new EggPregnancy_1.EggPregnancy(Eggs_1.randEggType(), false, SMath_1.randInt(3) + 5), Ovielixir_1.OvielixirPregEvent, 1, true);
                return;
            }
            let changeOccurred = false;
            const wombPregWithEggs = character.body.wombs.find(Womb_1.Womb.PregnantWithType(PregnancyType_1.PregnancyType.OVIELIXIR_EGGS));
            if (wombPregWithEggs) { // If character already has eggs, chance of size increase!
                const eggPreg = wombPregWithEggs.pregnancy;
                if (eggPreg) {
                    // If eggs are small, chance of increase!
                    if (!wombPregWithEggs.pregnancy) {
                        // 1 in 2 chance!
                        if (SMath_1.randInt(3) === 0) {
                            eggPreg.large = true;
                            ContentView_1.CView.text("\n\nYour pregnant belly suddenly feels heavier and more bloated than before.  You wonder what the elixir just did.");
                            changeOccurred = true;
                        }
                    }
                    // Chance of quantity increase!
                    if (SMath_1.randInt(2) === 0) {
                        ContentView_1.CView.text("\n\nA rumble radiates from your uterus as it shifts uncomfortably and your belly gets a bit larger.");
                        eggPreg.amount = SMath_1.randInt(4 + 1);
                        changeOccurred = true;
                    }
                }
            }
            // If no changes, speed up all pregnancies.
            const pregnantWomb = character.body.wombs.find((womb) => womb.isPregnant() && womb.pregnancy.type !== PregnancyType_1.PregnancyType.BUNNY);
            if (!changeOccurred && pregnantWomb && pregnantWomb.pregnancy && pregnantWomb.pregnancy.incubation > 20) {
                ContentView_1.CView.text("\n\nYou gasp as your pregnancy suddenly leaps forwards, your belly bulging outward a few inches as it gets closer to time for birthing.");
                let newIncubation = pregnantWomb.pregnancy.incubation - Math.floor(pregnantWomb.pregnancy.incubation * 0.3 + 10);
                if (newIncubation < 2)
                    newIncubation = 2;
                pregnantWomb.pregnancy.incubation = newIncubation;
                // console.trace("Pregger Count New total:" + pregnancy.incubation);
            }
        }
    }
    exports.OvipositionElixir = OvipositionElixir;
});
//# sourceMappingURL=OvipositionElixir.js.map