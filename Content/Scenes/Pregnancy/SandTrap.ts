import { Character } from 'Content/Character/Character';
import { CView } from 'Engine/Display/ContentView';
import { IPregnancyEvent } from 'Engine/Body/Pregnancy/IPregnancyEvent';
import { Womb } from 'Engine/Body/Pregnancy/Womb';
import { PregnancyType } from 'Content/Body/Pregnancy/PregnancyType';
import { describeButthole } from 'Content/Descriptors/ButtDescriptor';
import { displayStretchButt } from 'Content/Modifiers/ButtModifier';
import { SpriteName } from 'Content/Display/SpriteName';
import { describeNipple } from 'Content/Descriptors/BreastDescriptor';
import { Cock } from 'Engine/Body/Cock';
import { describeVagina, describeClit } from 'Content/Descriptors/VaginaDescriptor';

class SandTrapPregnancyEvents implements IPregnancyEvent {
    public incubationDisplay(player: Character, womb: Womb): void {
        // Sand Tarps in butt pregnancy
        if (womb.pregnancy && (womb.pregnancy.type === PregnancyType.SANDTRAP || womb.pregnancy.type === PregnancyType.SANDTRAP_FERTILE)) {
            if (womb.pregnancy.incubation === 36) {
                // (Eggs take 2-3 days to lay)
                CView.text("<b>\nYour bowels make a strange gurgling noise and shift uneasily.  You feel ");
                if (womb.pregnancy.type === PregnancyType.SANDTRAP_FERTILE) CView.text(" bloated and full; the sensation isn't entirely unpleasant.");
                else {
                    CView.text("increasingly empty, as though some obstructions inside you were being broken down.");
                    womb.clear(); // Clear Butt Pregnancy
                }
                CView.text("</b>\n");
            }
            if (womb.pregnancy.incubation === 20) {
                // end eggpreg here if unfertilized
                CView.text("\nSomething oily drips from your sphincter, staining the ground.  You suppose you should feel worried about this, but the overriding emotion which simmers in your gut is one of sensual, yielding calm.  The pressure in your bowels which has been building over the last few days feels right somehow, and the fact that your back passage is dribbling lubricant makes you incredibly, perversely hot.  As you stand there and savor the wet, soothing sensation a fantasy pushes itself into your mind, one of being on your hands and knees and letting any number of beings use your ass, of being bred over and over by beautiful, irrepressible insect creatures.  With some effort you suppress these alien emotions and carry on, trying to ignore the oil which occasionally beads out of your " + describeButthole(player.body.butt) + " and stains your [armor].\n");
                player.stats.int -= 0.5;
                player.stats.lust += 500;
            }
        }
    }

    public canBirth(player: Character, womb: Womb): boolean {
        return !!womb.pregnancy && womb.pregnancy.incubation === 1;
    }

    public birthScene(player: Character, womb: Womb): void {
        CView.sprite(SpriteName.SandTrap); // 97;
        CView.text("\nYour eyes widen as a gout of oil suddenly gushes from your ass.  Before panic can set in, an incredible light-headedness overtakes you.  Dreamily, you discard your [armor] and squat.  More oil oozes out of you, and in your hazy euphoria, you scoop some of it up and rub it dreamily into your " + describeNipple(player, player.body.chest.get(0)) + "s.  Part of you is disgusted at yourself, questioning what you are doing, but that is one voice in a million-strong chorus crooning you into total relaxation... the oil clings to your skin and seems to radiate warmth and softness.  Something round stretches your rectum wide, but in your state the sensation is practically orgasmic.");
        // [Male:
        if (player.gender === 1) {
            CView.text("  You roll your eyes to the sky and moan, [eachCock] growing hard as you push out the egg.");
            // [(mans and qualified horses only)]
            if (!player.body.legs.isTaur() || (player.body.tallness * (5 / 6) < player.body.cocks.sort(Cock.Longest).get(0)!.length)) CView.text("  Your oily hands descend upon your cock, and you massage your shaft as you feel the pressure in your bowels intensify again.");
        }
        // Female:
        else if (player.gender === 2) {
            CView.text("  You roll your eyes to the sky and moan, your " + describeVagina(player, player.body.vaginas.get(0)) + " moistening as you push out the egg.");
            // [(no fukken horses from here)]
            if (!player.body.legs.isTaur()) CView.text("  Your oily hands push softly into your cleft, fingering your needy " + describeClit(player) + " as you feel the pressure in your bowels intensify again.");
        }
        // Herm:
        else if (player.gender === 3) {
            CView.text("  You roll your eyes to the sky and moan, [eachCock] growing hard and your [vagina] moistening as you push out the egg.");
            // [(no horses)]
            if (!player.body.legs.isTaur()) CView.text("  Your oily hands descend upon your genitals and you begin to slowly pump your shaft and finger your needy " + describeClit(player) + " as you feel the pressure in your bowels intensify again.");
        }
        CView.text("\n\nYou nearly cum as egg number two squeezes out.  You DO cum when egg number three stretches you wide, blowing your mind into the empty sky.  Each egg seems to come out closer on the heels of the one before, and each time your conscious mind loses more of its ability to do anything but wallow in oil and pleasure.");

        CView.text("\n\nYou are brought to your senses by something flitting past your eyes.  You wearily brush your face and pick yourself up.  Behind you, leaking and lying in a translucent ooze, is a multitude of black, oily eggshells.  Of more note are the pale blurs which keep zipping past your head.  They look rather like the fairies which inhabit the forest, except they have six black eyes, are flat-chested and are male... no, female...?  No, male... you can't tell.  They are lithe and beautiful and have tiny, undeveloped insect abdomens hanging above their trim butts and below their dragonfly wings.  They whirr in place for a moment before keeling around and about each other excitedly like hoverflies, chattering to each other in a tongue so fast it is beyond your comprehension.");

        // Libido <30:
        if (player.stats.lib < 33) CView.text("\n\nYou pick yourself up wearily, flap the flytraps you have birthed away and make your way back to camp.  This whole experience has been deeply unnerving, and you vow to make sure you don't have to repeat it.");
        // Libido 30-65:
        else if (player.stats.lib < 66) CView.text("\n\nYou spend a moment enjoying your post-natal haze, then haul yourself out of it, flap the flytraps you have birthed away, and make your way back to camp.  Though this experience has been deeply unnerving, you can't help but acknowledge it has also been incredibly erotic.");
        // Libido >65:
        else CView.text("\n\nYou smile lazily, then lie back and glory in the sensual haze the oil has left you in.  After you have spent many minutes lying listening to the happy twittering of your flytrap children above you, you reluctantly get up.  You only hope that you get to experience the unearthly wonder of birthing these strange creatures again, and again, and again.");
        displayStretchButt(player, 25, true, true, false);
        CView.text("\n");
        player.orgasm();
        player.stats.lib += 1;
        player.stats.sens += 4;
    }
}

export const SandTrapPregEvent = new SandTrapPregnancyEvents();
