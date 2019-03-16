define(["require", "exports", "Content/Body/Pregnancy/PregnancyType", "Engine/Display/ContentView", "Engine/Body/Vagina", "Content/Descriptors/VaginaDescriptor", "Content/Modifiers/VaginaModifier", "Content/Effects/EffectType", "Content/Utilities/NumToText", "Content/Items/Consumables/Eggs"], function (require, exports, PregnancyType_1, ContentView_1, Vagina_1, VaginaDescriptor_1, VaginaModifier_1, EffectType_1, NumToText_1, Eggs_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class OvielixirPregnancyEvents {
        incubationDisplay(player, womb) {
            if (womb.pregnancy && womb.pregnancy.type === PregnancyType_1.PregnancyType.OVIELIXIR_EGGS) {
                if (player.body.vaginas.length === 0) {
                    ContentView_1.CView.text("\n<b>Your pregnant belly suddenly begins shrinking, until it disappears.</b>\n");
                    womb.clear(); // Clear Pregnancy
                }
                // Birth scenes
            }
        }
        canBirth(player, womb) {
            return womb.pregnancy.incubation === 1;
        }
        birthScene(player, womb) {
            if (womb.pregnancy && womb.pregnancy.incubation === 1) {
                const eggPreg = womb.pregnancy;
                ContentView_1.CView.text("\n");
                if (player.body.vaginas.length === 0) {
                    ContentView_1.CView.text("You feel a terrible pressure in your groin... then an incredible pain accompanied by the rending of flesh.  <b>You look down and behold a new vagina</b>.\n\n");
                    player.body.vaginas.add(new Vagina_1.Vagina());
                }
                // Small egg scenes
                if (!eggPreg.large) {
                    // light quantity
                    if (eggPreg.amount < 10) {
                        ContentView_1.CView.text("You are interrupted as you find yourself overtaken by an uncontrollable urge to undress and squat.   You berate yourself for giving in to the urge for a moment before feeling something shift.  You hear the splash of fluid on the ground and look down to see a thick greenish fluid puddling underneath you.  There is no time to ponder this development as a rounded object passes down your birth canal, spreading your feminine lips apart and forcing a blush to your cheeks.  It plops into the puddle with a splash, and you find yourself feeling visibly delighted to be laying such healthy eggs.   Another egg works its way down and you realize the process is turning you on more and more.   In total you lay ");
                        ContentView_1.CView.text(eggDescript(eggPreg));
                        ContentView_1.CView.text(", driving yourself to the very edge of orgasm.");
                        player.stats.raw.lust = 100;
                    }
                    // High quantity
                    else {
                        ContentView_1.CView.text("A strange desire overwhelms your sensibilities, forcing you to shed your " + player.inventory.armor.displayName + " and drop to your hands and knees.   You manage to roll over and prop yourself up against a smooth rock, looking down over your pregnant-looking belly as green fluids leak from you, soaking into the ground.   A powerful contraction rips through you and your legs spread instinctively, opening your " + VaginaDescriptor_1.describeVagina(player, player.body.vaginas.get(0)) + " to better deposit your precious cargo.   You see the rounded surface of an egg peek through your lips, mottled with strange colors.   You push hard and it drops free with an abrupt violent motion.  The friction and slimy fluids begin to arouse you, flooding your groin with heat as you feel the second egg pushing down.  It slips free with greater ease than the first, arousing you further as you bleat out a moan from the unexpected pleasure.  Before it stops rolling on the ground, you feel the next egg sliding down your slime-slicked passage, rubbing you perfectly as it slides free.  You lose count of the eggs and begin to masturbate, ");
                        if (player.body.clit.length > 5)
                            ContentView_1.CView.text("jerking on your huge clitty as if it were a cock, moaning and panting as each egg slides free of your diminishing belly.  You lubricate it with a mix of your juices and the slime until ");
                        if (player.body.clit.length > 2 && player.body.clit.length <= 5)
                            ContentView_1.CView.text("playing with your over-large clit as if it were a small cock, moaning and panting as the eggs slide free of your diminishing belly.  You spread the slime and cunt juice over it as you tease and stroke until ");
                        if (player.body.clit.length <= 2)
                            ContentView_1.CView.text("pulling your folds wide and playing with your clit as another egg pops free from your diminishing belly.  You make wet 'schlick'ing sounds as you spread the slime around, vigorously frigging yourself until ");
                        ContentView_1.CView.text("you quiver in orgasm, popping out the last of your eggs as your body twitches nervelessly on the ground.   In total you lay " + eggDescript(eggPreg) + ".");
                        player.orgasm();
                    }
                }
                // Large egg scene
                else {
                    ContentView_1.CView.text("A sudden shift in the weight of your pregnant belly staggers you, dropping you to your knees.  You realize something is about to be birthed, and you shed your " + player.inventory.armor.displayName + " before it can be ruined by what's coming.  A contraction pushes violently through your midsection, ");
                    if (player.body.vaginas.get(0).looseness < Vagina_1.VaginaLooseness.LOOSE)
                        ContentView_1.CView.text("stretching your tight cunt painfully, the lips opening wide ");
                    if (player.body.vaginas.get(0).looseness >= Vagina_1.VaginaLooseness.LOOSE && player.body.vaginas.get(0).looseness <= Vagina_1.VaginaLooseness.GAPING_WIDE)
                        ContentView_1.CView.text("temporarily stretching your cunt-lips wide-open ");
                    if (player.body.vaginas.get(0).looseness > Vagina_1.VaginaLooseness.GAPING_WIDE)
                        ContentView_1.CView.text("parting your already gaping lips wide ");
                    ContentView_1.CView.text("as something begins sliding down your passage.  A burst of green slime soaks the ground below as the birthing begins in earnest, and the rounded surface of a strangely colored egg peaks between your lips.  You push hard and the large egg pops free at last, making you sigh with relief as it drops into the pool of slime.  The experience definitely turns you on, and you feel your clit growing free of its hood as another big egg starts working its way down your birth canal, rubbing your sensitive vaginal walls pleasurably.   You pant and moan as the contractions stretch you tightly around the next, slowly forcing it out between your nether-lips.  The sound of a gasp startles you as it pops free, until you realize it was your own voice responding to the sudden pressure and pleasure.  Aroused beyond reasonable measure, you begin to masturbate ");
                    if (player.body.clit.length > 5)
                        ContentView_1.CView.text("your massive cock-like clit, jacking it off with the slimy birthing fluids as lube.   It pulses and twitches in time with your heartbeats, its sensitive surface overloading your fragile mind with pleasure.  ");
                    if (player.body.clit.length > 2 && player.body.clit.length <= 5)
                        ContentView_1.CView.text("your large clit like a tiny cock, stroking it up and down between your slime-lubed thumb and fore-finger.  It twitches and pulses with your heartbeats, the incredible sensitivity of it overloading your fragile mind with waves of pleasure.  ");
                    if (player.body.clit.length <= 2)
                        ContentView_1.CView.text("your " + VaginaDescriptor_1.describeVagina(player, player.body.vaginas.get(0)) + " by pulling your folds wide and playing with your clit.  Another egg pops free from your diminishing belly, accompanied by an audible burst of relief.  You make wet 'schlick'ing sounds as you spread the slime around, vigorously frigging yourself.  ");
                    ContentView_1.CView.text("You cum hard, the big eggs each making your cunt gape wide just before popping free.  You slump down, exhausted and barely conscious from the force of the orgasm.  ");
                    if (eggPreg.amount >= 11)
                        ContentView_1.CView.text("Your swollen belly doesn't seem to be done with you, as yet another egg pushes its way to freedom.   The stimulation so soon after orgasm pushes you into a pleasure-stupor.  If anyone or anything discovered you now, they would see you collapsed next to a pile of eggs, your fingers tracing the outline of your " + VaginaDescriptor_1.describeVagina(player, player.body.vaginas.get(0)) + " as more and more eggs pop free.  In time your wits return, leaving you with the realization that you are no longer pregnant.  ");
                    ContentView_1.CView.text("\n\nYou gaze down at the mess, counting " + eggDescript(eggPreg) + ".");
                    player.orgasm();
                }
                ContentView_1.CView.text("\n\n<b>You feel compelled to leave the eggs behind, ");
                if (player.effects.has(EffectType_1.EffectType.AteEgg))
                    ContentView_1.CView.text("but you remember the effects of the last one you ate.\n</b>");
                else
                    ContentView_1.CView.text("but your body's intuition reminds you they shouldn't be fertile, and your belly rumbles with barely contained hunger.\n</b>");
                VaginaModifier_1.displayStretchVagina(player, 20, true);
                player.effects.create(EffectType_1.EffectType.LootEgg);
                womb.clear(); // Clear Pregnancy
            }
        }
    }
    exports.OvielixirPregEvent = new OvielixirPregnancyEvents();
    function eggDescript(eggPreg, plural = true) {
        let descript = "";
        descript += NumToText_1.numToCardinalText(eggPreg.amount) + " ";
        // size descriptor
        if (eggPreg.large)
            descript += "large ";
        /*color descriptor
        0 - brown - ass expansion
        1 - purple - hip expansion
        2 - blue - vaginal removal and/or growth of existing maleness
        3 - pink - dick removal and/or fertility increase.
        4 - white - breast growth.  If lactating increases lactation.
        5 - rubbery black -
        */
        if (eggPreg.eggType === Eggs_1.EggType.Brown)
            descript += "brown ";
        if (eggPreg.eggType === Eggs_1.EggType.Purple)
            descript += "purple ";
        if (eggPreg.eggType === Eggs_1.EggType.Blue)
            descript += "blue ";
        if (eggPreg.eggType === Eggs_1.EggType.Pink)
            descript += "pink ";
        if (eggPreg.eggType === Eggs_1.EggType.White)
            descript += "white ";
        if (eggPreg.eggType === Eggs_1.EggType.Black)
            descript += "rubbery black ";
        // EGGS
        if (plural)
            descript += "eggs";
        else
            descript += "egg";
        return descript;
    }
});
//# sourceMappingURL=Ovielixir.js.map