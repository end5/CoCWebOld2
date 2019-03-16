define(["require", "exports", "Engine/Display/ContentView", "Content/Body/Pregnancy/PregnancyType", "Content/Effects/EffectType", "Engine/Body/Vagina", "Engine/Utilities/SMath", "Engine/Body/BreastRow", "Content/Modifiers/BreastModifier", "Content/Descriptors/ButtDescriptor", "Content/Descriptors/HipDescriptor"], function (require, exports, ContentView_1, PregnancyType_1, EffectType_1, Vagina_1, SMath_1, BreastRow_1, BreastModifier_1, ButtDescriptor_1, HipDescriptor_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class ImpPregnancyEvents {
        incubationDisplay(player, womb) {
            if (womb.pregnancy.type === PregnancyType_1.PregnancyType.IMP) {
                if (womb.pregnancy.incubation === 336) {
                    ContentView_1.CView.text("\n<b>You realize your belly has gotten slightly larger.  Maybe you need to cut back on the strange food.</b>\n");
                }
                if (womb.pregnancy.incubation === 280) {
                    ContentView_1.CView.text("\n<b>Your belly is getting more noticably distended.   You are probably pregnant.</b>\n");
                }
                if (womb.pregnancy.incubation === 216) {
                    ContentView_1.CView.text("\n<b>The unmistakable bulge of pregnancy is visible in your tummy.  ");
                    if (player.stats.cor < 40)
                        ContentView_1.CView.text("You are distressed by your unwanted pregnancy, and your inability to force this thing out of you.</b>");
                    if (player.stats.cor >= 40 && player.stats.cor < 75)
                        ContentView_1.CView.text("Considering the size of the creatures you've fucked, you hope it doesn't hurt when it comes out.</b>");
                    if (player.stats.cor >= 75)
                        ContentView_1.CView.text("You think dreamily about the monstrous cocks that have recently been fucking you, and hope that your offspring inherit such a pleasure tool.</b>");
                    player.stats.spe += -1;
                    player.stats.lib += 1;
                    player.stats.sens += 1;
                    player.stats.lust += 2;
                    ContentView_1.CView.text("\n");
                }
                if (womb.pregnancy.incubation === 180) {
                    ContentView_1.CView.text("\n<b>The sudden impact of a kick from inside your womb startles you.</b>\n");
                }
                if (womb.pregnancy.incubation === 120) {
                    ContentView_1.CView.text("\n<b>Your ever-growing belly makes your pregnancy obvious for those around you.</b>\n");
                }
                if (womb.pregnancy.incubation === 72) {
                    ContentView_1.CView.text("\n<b>Your belly is painfully distended, ");
                    if (player.stats.cor < 40)
                        ContentView_1.CView.text("making it difficult to function.</b>");
                    if (player.stats.cor >= 40 && player.stats.cor < 75)
                        ContentView_1.CView.text("and you wonder how much longer you have to wait.</b>");
                    if (player.stats.cor >= 75)
                        ContentView_1.CView.text("and you're eager to give birth, so you can get impregnated again by corrupted or monstrous cum filling out your eager womb.</b>");
                    ContentView_1.CView.text("\n");
                    player.stats.spe += -3;
                    player.stats.lib += 1;
                    player.stats.sens += 1;
                    player.stats.lust += 4;
                }
                if (womb.pregnancy.incubation === 48) {
                    ContentView_1.CView.text("\n<b>You rub your hands over your bulging belly, lost in the sensations of motherhood.  ");
                    if (player.stats.cor < 40)
                        ContentView_1.CView.text("Afterwards you feel somewhat disgusted with yourself.</b>\n");
                    if (player.stats.cor >= 40 && player.stats.cor < 75)
                        ContentView_1.CView.text("You estimate you'll give birth in the next few days.</b>\n");
                    if (player.stats.cor >= 75)
                        ContentView_1.CView.text("You find yourself daydreaming about birthing demons repeatedly, each time being re-impregnated by your hordes of lusty adolescent children.</b>\n");
                }
            }
        }
        canBirth(player, womb) {
            return womb.pregnancy.incubation === 1;
        }
        birthScene(player, womb) {
            ContentView_1.CView.text("\n");
            // Add imp birth status - used to control frequency of night imp gangbag
            const birthedImps = player.effects.getByName(EffectType_1.EffectType.BirthedImps);
            if (birthedImps && birthedImps.values.amount)
                birthedImps.values.amount++;
            else
                player.effects.create(EffectType_1.EffectType.BirthedImps, { amount: 0 });
            if (player.body.vaginas.length === 0) {
                ContentView_1.CView.text("You feel a terrible pressure in your groin... then an incredible pain accompanied by the rending of flesh.  You look down and behold a vagina.  ");
                player.body.vaginas.add(new Vagina_1.Vagina());
            }
            ContentView_1.CView.text("A sudden gush of fluids erupts from your vagina - your water just broke.  You grunt painfully as you feel wriggling and squirming inside your belly, muscle contractions forcing it downwards.  ");
            if (player.stats.cor < 50)
                ContentView_1.CView.text("You rue the day you encountered that hateful imp.  ");
            ContentView_1.CView.text("The pain begins to subside as your delivery continues... replaced with a building sensation of pleasure.  Arousal spikes through you as the contractions intensify, and as you feel something pass you have a tiny orgasm.\n\nYet you feel more within you, and the contractions spike again, pushing you to orgasm as you pass something else.  It repeats, over and over, nearly a dozen times you birth and orgasm.  After an eternity of procreation and pleasure, you sense your ordeal is over and collapse, unconscious.");
            const firstVagina = player.body.vaginas.get(0);
            if (firstVagina.looseness === Vagina_1.VaginaLooseness.TIGHT)
                firstVagina.looseness++;
            // 50% chance
            if (firstVagina.looseness < Vagina_1.VaginaLooseness.GAPING_WIDE && SMath_1.randInt(2) === 0) {
                firstVagina.looseness++;
                ContentView_1.CView.text("\n\n<b>Your cunt is painfully stretched from the ordeal, permanently enlarged.</b>");
            }
            womb.clear(); // Clear Pregnancy
            ContentView_1.CView.text("\n\nWhen you wake you find a large number of tiny imp tracks... and a spattering of cum on your clothes and body.  They must be born fully-formed.");
            if (player.body.chest.reduce(BreastRow_1.BreastRow.AverageLactation, 0) > 0 && player.body.chest.reduce(BreastRow_1.BreastRow.AverageLactation, 0) < 5) {
                ContentView_1.CView.text("  Your breasts won't seem to stop dribbling milk, lactating more heavily than before.");
                BreastModifier_1.boostLactation(player, .5);
            }
            // Lactate if large && not lactating
            if (player.body.chest.sort(BreastRow_1.BreastRow.Largest).get(0).rating >= 3 && player.body.chest.sort(BreastRow_1.BreastRow.BreastsPerRowMost).get(0).count > 1 && player.body.chest.reduce(BreastRow_1.BreastRow.AverageLactation, 0) === 0) {
                ContentView_1.CView.text("  As you ponder the implications, <b>you realize your breasts have been slowly lactating</b>.  You wonder how much longer it will be before they stop.");
                BreastModifier_1.boostLactation(player, 1);
            }
            BreastModifier_1.boostLactation(player, .01);
            // Enlarge if too small for lactation
            if (player.body.chest.sort(BreastRow_1.BreastRow.Largest).get(0).rating === 2 && player.body.chest.sort(BreastRow_1.BreastRow.BreastsPerRowMost).get(0).count > 1) {
                ContentView_1.CView.text("  <b>Your breasts have grown to C-cups!</b>");
                BreastModifier_1.growTopBreastRow(player, 1, 1);
            }
            // Enlarge if really small!
            if (player.body.chest.sort(BreastRow_1.BreastRow.Largest).get(0).rating === 1 && player.body.chest.sort(BreastRow_1.BreastRow.BreastsPerRowMost).get(0).count > 1) {
                ContentView_1.CView.text("  <b>Your breasts have grown to B-cups!</b>");
                BreastModifier_1.growTopBreastRow(player, 1, 1);
            }
            if (firstVagina.wetness === Vagina_1.VaginaWetness.DRY)
                firstVagina.wetness++;
            player.orgasm();
            player.stats.tou += -2;
            player.stats.spe += 2;
            player.stats.lib += 1;
            player.stats.sens += .5;
            player.stats.cor += 7;
            if (player.body.butt.rating < 10 && SMath_1.randInt(2) === 0) {
                player.body.butt.rating++;
                ContentView_1.CView.text("\n\nYou notice your " + ButtDescriptor_1.describeButt(player) + " feeling larger and plumper after the ordeal.");
            }
            else if (player.body.hips.rating < 10) {
                player.body.hips.rating++;
                ContentView_1.CView.text("\n\nAfter the birth your " + player.inventory.armor.displayName + " fits a bit more snugly about your " + HipDescriptor_1.describeHips(player) + ".");
            }
            ContentView_1.CView.text("\n");
        }
    }
    exports.ImpPregEvent = new ImpPregnancyEvents();
});
//# sourceMappingURL=Imp.js.map