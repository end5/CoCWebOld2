import { Character } from 'Content/Character/Character';
import { CView } from 'Engine/Display/ContentView';
import { BreastRow } from 'Engine/Body/BreastRow';
import { boostLactation } from 'Content/Modifiers/BreastModifier';
import { Vagina } from 'Engine/Body/Vagina';
import { IPregnancyEvent } from 'Engine/Body/Pregnancy/IPregnancyEvent';
import { Womb } from 'Engine/Body/Pregnancy/Womb';
import { PregnancyType } from 'Content/Body/Pregnancy/PregnancyType';

/*336 == bigger belly
280 == prolly pregger
216 == unmistakable bulge
180 == obvious pregnancy
120 == impossible to conceal
72 == painfully distended
48 == bulges with unclean spawn..blahblahblah*/

class SandWitchPregnancyEvents implements IPregnancyEvent {
    public incubationDisplay(player: Character, womb: Womb): void {
        if (womb.pregnancy && womb.pregnancy.type === PregnancyType.SAND_WITCH) {
            // 1:
            if (womb.pregnancy.incubation === 336) {
                CView.text("\nYour breasts have felt unusually heavy recently, and a strange pulsing sensation occasionally emanates from them.  Your appetite is a little off; you could really go for some milk...\n");
            }
            // 2:
            if (womb.pregnancy.incubation === 280) {
                CView.text("\nYou've been having strange dreams recently, about seeds growing before your eyes into beautiful flowers; what's really weird is the sense of pride and maternal contentment that seeing them bloom makes you feel.  Your breasts are definitely heavier than normal, and sometimes you wake up to find them damp; are you ");
                if (player.body.chest.sort(BreastRow.LactationMost).get(0)!.lactationMultiplier < 1) CView.text("starting to lactate");
                else CView.text("lactating more");
                CView.text("?  Your belly is even bulging a little bit more than food can explain.\n");
                while (player.body.chest.sort(BreastRow.LactationMost).get(0)!.lactationMultiplier < 1.5) {
                    boostLactation(player, .5);
                }
            }
            // 3:
            if (womb.pregnancy.incubation === 216) {
                CView.text("\nYour breasts have definitely grown bigger, and they occasionally trickle milk.  More importantly than that, your stomach is bulging out in a small but unquestionable pot belly.  You're definitely pregnant.\n");
                while (player.body.chest.sort(BreastRow.LactationMost).get(0)!.lactationMultiplier < 1.5) {
                    boostLactation(player, .5);
                }
            }
            // 4:
            if (womb.pregnancy.incubation === 180) {
                CView.text("\nYour belly continues to grow, the hormones triggering your milk's production to kick it up a notch.  Your breasts are so heavy and sensitive, aching to be used to feed life-giving milk to something.\n");
                while (player.body.chest.sort(BreastRow.LactationMost).get(0)!.lactationMultiplier < 2) {
                    boostLactation(player, .5);
                }
            }
            // 5:
            if (womb.pregnancy.incubation === 120) {
                CView.text("\nYou sometimes catch yourself humming to your unborn child, stroking your belly like a contented mother.  At other times, you catch yourself proudly stroking your swollen breasts, admiring the way it makes the milk spurt and flow.");
                while (player.body.chest.sort(BreastRow.LactationMost).get(0)!.lactationMultiplier < 3) {
                    boostLactation(player, .5);
                }
            }
            // 6:
            if (womb.pregnancy.incubation === 72) {
                CView.text("\nMilk dribbles constantly out of your nipples now, in many ways being harder to deal with than the ever-increasing swell of your midriff.  The scent of milk hangs in the air around you constantly, giving you a craving to suckle almost as bad as your breasts' need to be suckled from.\n");
                while (player.body.chest.sort(BreastRow.LactationMost).get(0)!.lactationMultiplier < 4.5) {
                    boostLactation(player, .5);
                }
            }
            // 7:
            if (womb.pregnancy.incubation === 48) {
                CView.text("\nYour stomach hangs out, heavy and round as any full-term mother's back in Ingnam, your breasts feeling almost as taut and swollen, as if jealous of the life nearly grown inside your womb.  At morning, you find yourself milking your breasts until the cascading fluid ends up glazing your engorged stomach in a beautiful liquid white sheen, not that it seems to make much difference to your production.  You can only hope whatever's growing inside you will be hungry enough to keep up with all the food you'll have for it...");
                while (player.body.chest.sort(BreastRow.LactationMost).get(0)!.lactationMultiplier < 5.5) {
                    boostLactation(player, .5);
                }
            }
        }
    }

    public canBirth(player: Character, womb: Womb): boolean {
        return !!womb.pregnancy && womb.pregnancy.incubation === 1;
    }

    public birthScene(player: Character, womb: Womb): void {
        CView.text("\n<b><u>Something amazing happens...</u></b>\n");
        if (player.body.vaginas.length === 0) {
            CView.text("You feel a terrible pressure in your groin... then an incredible discomfort accompanied by the rending of flesh.  You look down and behold a vagina.  ");
            player.body.vaginas.add(new Vagina());
        }
        CView.text("You moan in pain as a sudden sharp spike ripples through your distended midriff.  You clumsily haul yourself upright and waddle out into camp, collapsing as you hear your water break, soaking the dry earth of the wasteland below you.  Placing yourself in the most comfortable position you can manage, you grit your teeth and start to push...");
        CView.text("\n\nYour world fades away to the demands of your body; the cycle of painful pushing and exhausted relaxation.  Time ceases to exist, but, finally, inevitably, your body thrusts its squalling intruder into the outside world.  You collapse, heaving in lungfuls of air, as the pain in your body fades away to a dull throbbing ache.  When you feel like you can move without breaking, you pick yourself up and investigate your howling, healthy offspring.");

        CView.text("\n\nLying on the dusty ground, still slick with the fluids of the womb, is a healthy, beautiful baby girl, with sandy blonde fuzz on her head and olive-colored skin.  The twin sets of tiny little nipples on her chest and the two pussies are the only signs that she isn't strictly human.");
        // Cum Witch: Lying on the dusty ground, still slick with the fluids of the womb, is a dark-skinned, healthy, beautiful-looking baby, human in virtually every detail.  At first, you wonder if you've given birth to a son, but looking closer reveals the pussy under her little cock and balls.)
        CView.text("\n\nSmiling with a sudden sense of maternal pride, you scoop the baby witch up and hold her to your breast.  She fusses and wriggles some, but soon calms down, cooing as she snuggles against your [chest].   Milk begins to leak from your [nipples], and like iron to a magnet your baby's lips are drawn to the sweet, creamy fluid.  Sparks of pleasure tingle through your breasts as your child nurses, and you can't resist a smile.  Gently you hold her, rocking her back and forth as she noisily suckles from you.");

        CView.text("\n\nWhen she's finally done, you're surprised to see she hasn't grown at all - unless you count the big, round belly she contentedly strokes, a result of the sheer amount of milk the greedy little girl drank.  She starts to squirm and fuss as her greediness catches up to her, and you sling her over your shoulder and gently burp her, the sound echoing out over the wasteland.  As the baby settles in your arms and starts to fall asleep, you carefully gather some scrap cloth, to form a blanket for her, gather your things, and head off to the desert.");

        CView.text("\n\nYou soon find your way to the hidden caves of the Sand Witches, where you present your new daughter to the nursery.  The sand witches there aren't too happy about the idea of looking after her themselves, insisting you should stay here with them and rear her yourself, but you are insistent that you cannot stay here and it's not safe to keep your daughter with you.  Finally, they give in and start fussing over your daughter, giving you the opportunity to quietly slip out and head back home.\n");
        player.stats.fatigue += 40;
    }
}

export const SandWitchPregEvent = new SandWitchPregnancyEvents();
