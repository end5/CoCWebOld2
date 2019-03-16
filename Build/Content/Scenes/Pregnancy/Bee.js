define(["require", "exports", "Content/Body/Pregnancy/PregnancyType", "Engine/Display/ContentView", "Content/Descriptors/CockDescriptor", "Engine/Body/Cock", "Content/Descriptors/VaginaDescriptor", "Engine/Body/BreastRow", "Content/Descriptors/BreastDescriptor", "Content/Modifiers/ButtModifier", "Content/Descriptors/ButtDescriptor", "Engine/Utilities/SMath"], function (require, exports, PregnancyType_1, ContentView_1, CockDescriptor_1, Cock_1, VaginaDescriptor_1, BreastRow_1, BreastDescriptor_1, ButtModifier_1, ButtDescriptor_1, SMath_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class BeeButtPregnancyEvent {
        incubationDisplay(player, womb) {
            if (womb.pregnancy.type === PregnancyType_1.PregnancyType.BEE_EGGS) {
                if (womb.pregnancy.incubation === 36) {
                    ContentView_1.CView.text("<b>\nYou feel bloated, your bowels shifting uncomfortably from time to time.</b>\n");
                }
                if (womb.pregnancy.incubation === 20) {
                    ContentView_1.CView.text("<b>\nA honey-scented fluid drips from your rectum.</b>  At first it worries you, but as the smell fills the air around you, you realize anything with such a beautiful scent must be good.  ");
                    if (player.body.cocks.length > 0)
                        ContentView_1.CView.text("The aroma seems to permeate your very being, slowly congregating in your ");
                    if (player.body.cocks.length === 1) {
                        ContentView_1.CView.text(CockDescriptor_1.describeCock(player, player.body.cocks.get(0)));
                        if (player.body.cocks.filter(Cock_1.Cock.FilterType(Cock_1.CockType.HORSE)).length === 1)
                            ContentView_1.CView.text(", each inhalation making it bigger, harder, and firmer.  You suck in huge lungfuls of air, until your " + CockDescriptor_1.describeCock(player, player.body.cocks.get(0)) + " is twitching and dripping, the flare swollen and purple.  ");
                        if (player.body.cocks.filter(Cock_1.Cock.FilterType(Cock_1.CockType.DOG)).length === 1)
                            ContentView_1.CView.text(", each inhalation making it thicker, harder, and firmer.  You suck in huge lungfuls of air, desperate for more, until your " + CockDescriptor_1.describeCock(player, player.body.cocks.get(0)) + " is twitching and dripping, its knot swollen to the max.  ");
                        if (player.body.cocks.filter(Cock_1.Cock.FilterType(Cock_1.CockType.HUMAN)).length === 1)
                            ContentView_1.CView.text(", each inhalation making it bigger, harder, and firmer.  You suck in huge lungfuls of air, until your " + CockDescriptor_1.describeCock(player, player.body.cocks.get(0)) + " is twitching and dripping, the head swollen and purple.  ");
                        // FAILSAFE FOR NEW COCKS
                        if (player.body.cocks.filter(Cock_1.Cock.FilterType(Cock_1.CockType.HUMAN)).length === 0 && player.body.cocks.filter(Cock_1.Cock.FilterType(Cock_1.CockType.DOG)).length === 0 && player.body.cocks.filter(Cock_1.Cock.FilterType(Cock_1.CockType.HORSE)).length === 0)
                            ContentView_1.CView.text(", each inhalation making it bigger, harder, and firmer.  You suck in huge lungfuls of air until your " + CockDescriptor_1.describeCock(player, player.body.cocks.get(0)) + " is twitching and dripping.  ");
                    }
                    if (player.body.cocks.length > 1)
                        ContentView_1.CView.text("groin.  Your " + CockDescriptor_1.describeCocksLight(player) + " fill and grow with every lungful of the stuff you breathe in.  You suck in great lungfuls of the tainted air, desperate for more, your cocks twitching and dripping with need.  ");
                    ContentView_1.CView.text("You smile knowing you couldn't stop from masturbating if you wanted to.\n");
                    player.stats.int += -.5;
                    player.stats.lust += 500;
                }
            }
        }
        canBirth(player, womb) {
            return womb.pregnancy.incubation === 1;
        }
        birthScene(player, womb) {
            // Give birth (if it's time) to beeeeeeez
            if (womb.pregnancy.incubation === 1 && womb.pregnancy.type === PregnancyType_1.PregnancyType.BEE_EGGS) {
                ContentView_1.CView.text("\n");
                ContentView_1.CView.text("There is a sudden gush of honey-colored fluids from your ass.  Before panic can set in, a wonderful scent overtakes you, making everything ok.  ");
                if (player.body.cocks.length > 0)
                    ContentView_1.CView.text("The muzzy feeling that fills your head seems to seep downwards, making your equipment hard and tight.  ");
                if (player.body.vaginas.length > 0)
                    ContentView_1.CView.text("Your " + VaginaDescriptor_1.describeVagina(player, player.body.vaginas.get(0)) + " becomes engorged and sensitive.  ");
                ContentView_1.CView.text("Your hand darts down to the amber, scooping up a handful of the sticky stuff.  You wonder what your hand is doing as it brings it up to your mouth, which instinctively opens.  You shudder in revulsion as you swallow the sweet-tasting stuff, your mind briefly wondering why it would do that.  The stuff seems to radiate warmth, quickly pushing those nagging thoughts away as you scoop up more.\n\n");
                ContentView_1.CView.text("A sudden slip from below surprises you; a white sphere escapes from your anus along with another squirt of honey.  Your drugged brain tries to understand what's happening, but it gives up, your hands idly slathering honey over your loins.  The next orb pops out moments later, forcing a startled moan from your mouth.  That felt GOOD.  You begin masturbating to the thought of laying more eggs... yes, that's what those are.  You nearly cum as egg number three squeezes out.  ");
                if (player.body.chest.reduce(BreastRow_1.BreastRow.AverageLactation, 0) >= 1 && player.body.chest.sort(BreastRow_1.BreastRow.Largest).get(0).rating > 2)
                    ContentView_1.CView.text("Seeking even greater sensation, your hands gather the honey and massage it into your " + BreastDescriptor_1.describeBreastRow(player.body.chest.get(0)) + ", slowly working up to your nipples.  Milk immediately begins pouring out from the attention, flooding your chest with warmth.  ");
                ContentView_1.CView.text("Each egg seems to come out closer on the heels of the one before, and each time your conscious mind loses more of its ability to do anything but masturbate and wallow in honey.\n\n");
                ContentView_1.CView.text("Some time later, your mind begins to return, brought to wakefulness by an incredibly loud buzzing...  You sit up and see a pile of dozens of eggs resting in a puddle of sticky honey.  Most are empty, but a few have hundreds of honey-bees emptying from them, joining the massive swarms above you.  ");
                if (player.stats.cor < 35)
                    ContentView_1.CView.text("You are disgusted, but glad you were not stung during the ordeal.  You stagger away and find a brook to wash out your mouth with.");
                if (player.stats.cor >= 35 && player.stats.cor < 65)
                    ContentView_1.CView.text("You are amazed you could lay so many eggs, and while the act was strange there was something definitely arousing about it.");
                if (player.stats.cor >= 65 && player.stats.cor < 90)
                    ContentView_1.CView.text("You stretch languidly, noting that most of the drugged honey is gone.  Maybe you can find the Bee again and remember to bottle it next time.");
                if (player.stats.cor >= 90)
                    ContentView_1.CView.text("You lick your lips, savoring the honeyed residue on them as you admire your thousands of children.  If only every night could be like this...\n");
                womb.clear(); // Clear Butt Pregnancy
                player.orgasm();
                player.stats.int += 1;
                player.stats.lib += 4;
                player.stats.sens += 3;
                if (ButtModifier_1.displayStretchButt(player, 20, true))
                    ContentView_1.CView.text("\n");
                if (player.body.butt.rating < 17) {
                    // Guaranteed increase up to level 10
                    if (player.body.butt.rating < 13) {
                        player.body.butt.rating++;
                        ContentView_1.CView.text("\nYou notice your " + ButtDescriptor_1.describeButt(player) + " feeling larger and plumper after the ordeal.");
                    }
                    // Big butts only increase 50% of the time.
                    else if (SMath_1.randInt(2) === 0) {
                        player.body.butt.rating++;
                        ContentView_1.CView.text("\nYou notice your " + ButtDescriptor_1.describeButt(player) + " feeling larger and plumper after the ordeal.");
                    }
                }
                ContentView_1.CView.text("\n");
            }
        }
    }
    exports.BeeButtPregEvent = new BeeButtPregnancyEvent();
});
//# sourceMappingURL=Bee.js.map