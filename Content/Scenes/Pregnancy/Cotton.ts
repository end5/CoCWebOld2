import { Character } from 'Engine/Character/Character';
import { CView } from 'Engine/Display/ContentView';
import { IPregnancyEvent } from 'Engine/Body/Pregnancy/IPregnancyEvent';
import { Womb } from 'Engine/Body/Pregnancy/Womb';
import { PregnancyType } from 'Content/Body/Pregnancy/PregnancyType';
import { BreastRow } from 'Engine/Body/BreastRow';
import { boostLactation, growTopBreastRow } from 'Content/Modifiers/BreastModifier';
import { CottonFlags } from 'Content/Scenes/Places/TelAdre/Cotton';
import { randInt } from 'Engine/Utilities/SMath';
import { Vagina } from 'Engine/Body/Vagina';

class CottonPregnancyEvents implements IPregnancyEvent {
    public incubationDisplay(player: Character, womb: Womb): void {
        // Cotton Pregnancy! - 350 days long
        if (womb.pregnancy && womb.pregnancy.type === PregnancyType.COTTON) {
            if (womb.pregnancy.incubation === 320) {
                CView.text("\n<b>You realize your belly has gotten bigger. Maybe you should cut back on all the strange food.  Though you do have odd cravings for oats and grain.</b>\n");
            }
            else if (womb.pregnancy.incubation === 280) {
                CView.text("\n<b>Your belly is getting more noticeably distended. You are probably pregnant. The strong hankerings for oats and grains give you a very obvious clue as to who the 'father' might be.</b>\n");
            }
            else if (womb.pregnancy.incubation === 225) {
                CView.text("\n<b>The unmistakable bulge of pregnancy is visible in your tummy.  You stroke the orb and wonder with a half-grin if you'll have a daughter who takes after her 'daddy'.</b>\n");
            }
            else if (womb.pregnancy.incubation === 165) {
                CView.text("\n<b>The sudden impact of a tiny kick from inside your womb startles you.  Moments later it happens again, making you gasp.  The baby inside you really must be equine in nature; she's already got quite a wicked kick on her.</b>\n");
            }
            else if (womb.pregnancy.incubation === 105) {
                CView.text("\n<b>You're already as big as any pregnant woman back home. Considering that what you're carrying is technically a foal, you wonder just how much bigger you're going to get...</b>\n");
            }
            else if (womb.pregnancy.incubation === 80) {
                CView.text("\n<b>Your swollen stomach would bring queries about the possibility of twins back in Ingnam.  However, you can only feel one strong heart beating away inside your stretched midriff.  Cotton's foal is definitely growing up healthy...\n\nYou're glad, but a little worried about giving birth.</b>\n");
            }
            else if (womb.pregnancy.incubation === 50) {
                CView.text("\n<b>Your belly is painfully distended and swollen; you feel like you're going to burst before you get much bigger.  You find yourself pacing around restlessly in the night, like the expectant mares back in the village.  You're anxious to finally give birth, as much to get this heavy baby out of you as to finally be able to cuddle your child.</b>\n");
            }
            // Tits
            if (womb.pregnancy.incubation === 32 || womb.pregnancy.incubation === 64 || womb.pregnancy.incubation === 85 || womb.pregnancy.incubation === 150) {
                // Increase lactation!
                if (
                    player.body.chest.sort(BreastRow.Largest).get(0)!.rating >= 3 &&
                    player.body.chest.sort(BreastRow.BreastsPerRowMost).get(0)!.count > 1 &&
                    player.body.chest.sort(BreastRow.LactationMost).get(0)!.lactationMultiplier >= 1 &&
                    player.body.chest.sort(BreastRow.LactationMost).get(0)!.lactationMultiplier < 2
                ) {
                    CView.text("\nYour breasts feel swollen with all the extra milk they're accumulating.  You wonder just what kind of creature they're getting ready to feed.\n");
                    boostLactation(player, .5);
                }
                if (
                    player.body.chest.sort(BreastRow.Largest).get(0)!.rating >= 3 &&
                    player.body.chest.sort(BreastRow.BreastsPerRowMost).get(0)!.count > 1 &&
                    player.body.chest.sort(BreastRow.LactationMost).get(0)!.lactationMultiplier > 0 &&
                    player.body.chest.sort(BreastRow.LactationMost).get(0)!.lactationMultiplier < 1
                ) {
                    CView.text("\nDrops of breastmilk escape your nipples as your body prepares for the coming birth.\n");
                    boostLactation(player, .5);
                }
                // Lactate if large && not lactating
                if (
                    player.body.chest.sort(BreastRow.Largest).get(0)!.rating >= 3 &&
                    player.body.chest.sort(BreastRow.BreastsPerRowMost).get(0)!.count > 1 &&
                    player.body.chest.sort(BreastRow.LactationMost).get(0)!.lactationMultiplier === 0
                ) {
                    CView.text("\n<b>You realize your breasts feel full, and occasionally lactate</b>.  It must be due to the pregnancy.\n");
                    boostLactation(player, 1);
                }
                // Enlarge if too small for lactation
                if (player.body.chest.sort(BreastRow.Largest).get(0)!.rating === 2 && player.body.chest.sort(BreastRow.BreastsPerRowMost).get(0)!.count > 1) {
                    CView.text("\n<b>Your breasts have swollen to C-cups,</b> in light of your coming pregnancy.\n");
                    growTopBreastRow(player, 1, 1);
                }
                // Enlarge if really small!
                if (player.body.chest.sort(BreastRow.Largest).get(0)!.rating === 1 && player.body.chest.sort(BreastRow.BreastsPerRowMost).get(0)!.count > 1) {
                    CView.text("\n<b>Your breasts have grown to B-cups,</b> likely due to the hormonal changes of your pregnancy.\n");
                    growTopBreastRow(player, 1, 1);
                }
            }
        }
    }

    public canBirth(player: Character, womb: Womb): boolean {
        return !!womb.pregnancy && womb.pregnancy.incubation === 1;
    }

    public birthScene(player: Character, womb: Womb): void {
        CView.text("\nYou wake up suddenly to strong pains and pressures in your gut.  As your eyes shoot wide open, you look down to see your belly absurdly full and distended.  ");
        if (player.body.vaginas.length === 0) {
            CView.text("You feel a terrible pressure in your groin... then an incredible pain accompanied by the rending of flesh.  You look down and behold a vagina.  ");
            player.body.vaginas.add(new Vagina());
        }
        CView.text("You can feel movement underneath the skin, and watch as it bulges and shifts as another living being moves independently inside you.");
        CView.text("\n\nOddly, there's no pain as you sit up and spread your [legs] in a birthing stance.  A wave of peace and tranquility descends over you, reminding you of your yoga sessions with Cotton.  You take a deep breath and push as hard as you can, pausing only to take small gasps for air.  You feel a sudden pressure against your cervix as your child begins to push its way through little by little.");
        CView.text("\n\nYou aren't left waiting long, as you see its head emerging from inside you.  Little equine ears top its head, and its face has only the barest hint of a snout.  The torso comes next, more uncomfortable than the head, but still there is no pain.  Finally, with one last push, your child's lower body slips from you in a gush of afterbirth.");
        CView.text("\n\nThe child struggles on the ground for a moment before you pick it up and bring it to your teat.  It quickly latches on, suckling like there's no tomorrow.  You take this opportunity to sit back and examine the fruit of your loins.  Congratulations, it's a ");
        const kid: number = randInt(3) + 1;
        if (kid === 1) CView.text("boy");
        else if (kid === 2) CView.text("girl");
        else CView.text("hermaphrodite");
        CView.text("!  Like ");
        if (kid === 1) CView.text("his");
        else CView.text("her");
        CView.text(" 'father', ");
        if (kid === 1) CView.text("he");
        else CView.text("she");
        CView.text("'s hairless except on ");
        if (kid === 1) CView.text("his");
        else CView.text("her");
        CView.text(" head, where there's a light sprinkling of dark hair.  ");
        if (kid === 1) CView.text("His");
        else CView.text("Her");
        CView.text(" feet end in tiny pristine hooves, and a little brush of a tail extends from ");
        if (kid === 1) CView.text("his");
        else CView.text("her");
        CView.text(" backside.");

        CView.text("\n\nYou gently caress your new child, and to your surprise its tiny little fingers latch on to your finger, making it look enormous by comparison.  Its grip is not strong, of course, but you can't bring yourself to pull your hand away. You spend the next hour or so just sitting like that as your child suckles, until it's finally had enough and drifts off to sleep.");

        CView.text("\n\nLooking around your camp, you know you can't take care of such a child here. Not with how often you're away and with the ever-looming threat of demon invasion.  With this in mind you stand, careful not to wake your new ");
        if (kid === 1) CView.text("son");
        else CView.text("daughter");
        CView.text(", bundle ");
        if (kid === 1) CView.text("him");
        else CView.text("her");
        CView.text(" up good and tight, get dressed, and head off towards Tel'Adre.");

        CView.text("\n\nThe guards at the gate look at you a little oddly at first, but when you show them your little bundle of joy, they \"<i>oooh</i>\" and \"<i>aaah</i>\", crowding around to get a better look.  They speak in whispering babytalk, cautious not to wake ");
        if (kid === 1) CView.text("him");
        else CView.text("her");
        CView.text(".  Eventually they remember you're here and disperse, waving you inside.  As you look back, you see one guard light up a cigar and pass others around.");

        CView.text("You trek through the town, eventually finding Cotton's apartment nuzzled in between a tailor's shop and a deli.  You only have to wait a moment after knocking before seeing the familiar face of your yoga instructor and lover.  At first she looks surprised to see you, then her eyes fall upon the little bundle of joy held in your arms.  Her hazel eyes go wide and she stifles a squee of excitement.");
        // [Instead: If you've dumped Cotton]
        if (CottonFlags.PC_IS_A_DEADBEAT_COTTON_DAD > 0) {
            CView.text("\n\nHer excitement diminishes as she looks up at you, glaring.  \"<i>I suppose you can't take care of this one either?</i>\"  You nod, explaining the dangers of being Champion.  She nods her head, \"<i>Of course I won't turn away my ");
            if (kid === 1) CView.text("son");
            else CView.text("daughter");
            CView.text(".  She takes the child from you, holding ");
            if (kid === 1) CView.text("him");
            else CView.text("her");
            CView.text(" close with practiced grace.");

            CView.text("\n\n\"<i>I don't expect I'll see you again, [name],</i>\" she says.  You're surprised she actually uses your name.  \"<i>I still think you're an asshole but... take care of yourself.</i>\"  She doesn't look you in the eye, her gaze firmly on the child held in her arms.  Cotton simply nods absently to herself, then closes the door on you.");
            CView.text("\n\nWith a sigh, you begin your long walk back to camp.");
        }
        // [First Child with Cotton?]
        else if (CottonFlags.COTTON_KID_COUNT === 0) {
            CottonFlags.COTTON_OLDEST_KID_GENDER = kid;
            CView.text("\n\nAfter pulling you into a quick awkward hug, she ushers you inside and into a large nursery room painted with pastel pinks, blues and purples. You explain you can't keep the child with you, and Cotton nods understandably. \"<i>");
            if (kid === 1) CView.text("He'll");
            else CView.text("She'll");
            CView.text(" be so happy here, pet, I promise you.  I'm an excellent momma, or daddy, as the case may be.  I don't know if I've ever told you, but I had a couple of kids a few years back.  Twins.  Boy they were rambunctious little devils.  Couldn't sit still,</i>\" she smiles wistfully.");

            CView.text("\n\nSo, Cotton's been a parent before? You ask if she was the mother or the father.");

            CView.text("\n\n\"<i>Oh, I was the 'daddy', I guess,</i>\" she laughs a little at the word.  \"<i>Their mother was from my home village.  We moved into Tel'Adre together after the demons came.  One thing led to another, and we had two bundles of joy not long after.</i>\"");

            CView.text("\n\nYou ask what the mother was; another horse-morph like Cotton herself? Maybe a centaur?  Woman, or herm?");

            CView.text("\n\n\"<i>Oh, she was a morph like me, most of my village was. Female, of course. Hermaphrodites like me weren't especially common back then, though I'm proud to say I'm all natural!");
            // if child is Herm:
            if (kid === 3) CView.text("  I guess it runs in the family.");
            CView.text("</i>\"");

            CView.text("\n\nYou nod your head in understanding.  Then, delicately, you comment that Cotton doesn't seem to be in a relationship with her old sweetheart anymore.  Did the relationship simply not work out, or...?");

            CView.text("\n\nCotton thinks about this for a moment, then replies with, \"<i>Let's just say we found ourselves pulling apart, and she moved on to greener pastures.  Left me with the kids, though I wouldn't have had it any other way. I still see her sometimes around Tel'Adre.  There's no real bad blood there, but we won't be getting together for tea any time soon.</i>\"");

            CView.text("\n\nYou thank Cotton for being willing to tell you about things like this.  Then, to change the subject, you ask what happened to her twins - also, what were they, in terms of gender?");

            CView.text("\n\nCotton replies, \"<i>Oh, a boy and a girl. Fraternal twins.  They're out there somewhere.  Left Tel'Adre last year to search for other settlements and try and fight the demons.  I get a letter every now and then, coming in from the odd trader, but I haven't seen them in so long.</i>\"  You see tears forming in her eyes.  She obviously worries about them.");

            CView.text("\n\nShe wipes the tears away and waves a hand, \"<i>But anyway, let's get this little ");
            if (kid === 1) CView.text("guy");
            else CView.text("girl");
            CView.text(" situated.</i>\"  She takes the bundle from you, retrieves a fresh clean blanket, and within seconds has ");
            if (kid === 1) CView.text("him");
            else CView.text("her");
            CView.text(" expertly swaddled.  Cotton sets the child in the crib and stands back to admire her handiwork. You step up beside her and wrap an appreciative arm around her waist, telling her that she's done a wonderful job.");

            CView.text("\n\n\"<i>Oh no, pet,</i>\" she whispers back, \"<i>This baby was all you.</i>\"  You smile at her, call her a flatterer, and then kiss her.  You ask if she needs any more help setting things up.  \"<i>No, don't worry about a thing, everything's been taken care of.  But we can sit here a little longer if you want.</i>\"");

            CView.text("\n\nYou tell her you'd like that, taking a seat nearby with the 'father' of your child and watching as your baby foal sleeps soundly. Eventually, though, you have to leave, and politely excuse yourself to head back to camp.");
        }
        // [Additional Kids]
        else {
            CView.text("\n\nAfter pulling you into a quick, awkward hug, she ushers you inside and into the nursery and its familiar pastel pinks, blues and purples. \"<i>Oh ");
            if (kid === 1) CView.text("he");
            else CView.text("she");
            CView.text("'s so cute, pet.  We sure do make 'em good.  ");
            if (kid === 1) CView.text("He");
            else CView.text("She");
            CView.text("'ll just love it here with ");
            if (kid === 1) CView.text("his");
            else CView.text("her");
            CView.text(" family,</i>\" Cotton declares.  You nod your head, then ask if Cotton will be okay looking after one more child?");

            CView.text("\n\n\"<i>Are you kidding pet?  The more the merrier,</i>\" she laughs quietly.  \"<i>Just get me a few more and we've got ourselves a sports team.</i>\"");

            CView.text("\n\nYou smirk and tap her playfully on the nose, pointing out that if she's not a little more careful, you may just give her that sports team after all.");

            CView.text("\n\n\"<i>Me be careful?  It takes two to tango, how about you stop being such a beautiful piece of ass?</i>\" she jokes, grabbing your [butt] playfully.");

            CView.text("\n\nYou smirk back and grab Cotton's bulge, giving it a gentle squeeze and saying maybe she should stop letting it do the thinking for her... but then again, you'd be missing out too if she did, wouldn't you?");

            CView.text("\n\n\"<i>It does the best thinking for me, I'd say.  It did get us these gorgeous children, didn't it?</i>\" she jokes to you.");

            CView.text("\n\nYes it did, you admit.  You give Cotton a slap on the ass and tell her to take care of herself and your brood, telling her that you need to get back to camp.");

            CView.text("\n\n\"<i>Of course, pet,</i>\" she says, taking the bundle from you.  She quickly swaddles it, and settles it down in the crib before giving your forehead a kiss goodbye.  You give your equine lover one last cuddle, and then set off back to camp. You've another busy day ahead, after all.");
        }
        CView.text("\n");
        CottonFlags.COTTON_KID_COUNT++;
        if (CottonFlags.COTTON_KID_COUNT === 1) CottonFlags.COTTON_OLDEST_KID_AGE = 1;
        // player.body.wombs.find(Womb.NotPregnant).knockUp(undefined, undefined, 0, true); // Clear Pregnancy
    }
}

export const CottonPregEvent = new CottonPregnancyEvents();
