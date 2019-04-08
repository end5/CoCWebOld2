import { Character } from 'Engine/Character/Character';
import { Flags } from 'Engine/Flags';
import { Time } from 'Engine/Utilities/Time';
import { PregnancyType } from 'Content/Body/Pregnancy/PregnancyType';
import { NextScreenChoices, ScreenChoice } from 'Engine/Display/ScreenDisplay';
import { CView } from 'Engine/Display/ContentView';
import { SpriteName } from 'Content/Display/SpriteName';
import { Cock, CockType } from 'Engine/Body/Cock';
import { randInt } from 'Engine/Utilities/SMath';
import { numToCardinalText, numToCardinalCapText } from 'Content/Utilities/NumToText';
import { describeCocksLight, describeCock, describeCockHead, nounCock } from 'Content/Descriptors/CockDescriptor';
import { ConsumableName } from 'Content/Items/ConsumableName';
import { passTime } from 'Content/Scenes/PassTime';
import { LegType } from 'Engine/Body/Legs';
import { mf } from 'Content/Descriptors/GenderDescriptor';
import { BreastRow } from 'Engine/Body/BreastRow';
import { describeFaceShort } from 'Content/Descriptors/FaceDescriptor';
import { describeBalls } from 'Content/Descriptors/BallsDescriptor';
import { describeLegs, describeFeet, describeFoot } from 'Content/Descriptors/LegDescriptor';
import { describeHips } from 'Content/Descriptors/HipDescriptor';
import { describeVagina } from 'Content/Descriptors/VaginaDescriptor';
import { VaginaWetness } from 'Engine/Body/Vagina';
import { IncubationTime } from 'Content/Body/Pregnancy/IncubationTime';
import { TongueType } from 'Engine/Body/Tongue';
import { FlagWomb } from 'Content/Body/Pregnancy/FlagWomb';
import { TimeEvents } from 'Engine/TimeEvents';
import { barTelAdre } from 'Content/Scenes/Places/TelAdre';

export const EdrynFlags = Flags.register("Edryn", {
    EDRYN_PREGNANT_AND_NOT_TOLD_PC_YET: 0,
    EDRYN_PREGNANCY_INCUBATION: 0,
    URTA_FERTILE: 0,
    URTA_PREG_EVERYBODY: 0,
    EDRYN_NUMBER_OF_KIDS: 0,
    EDRYN_NEEDS_TO_TALK_ABOUT_KID: 0,
    EDRYN_GIFT_COUNTER: 0,
    LOW_STANDARDS_FOR_ALL: 0,
    EDRYN_NEVER_SEE_AGAIN: 0,
    HEL_FUCKBUDDY: 0,
    HEL_FOLLOWER_LEVEL: 0,
    HEL_HARPY_QUEEN_DEFEATED: 0,
    HEL_EDRYN_OFFER: 0,
    EDRYN_TIMES_HEL_THREESOMED: 0,
    TIMES_EATEN_EDRYN_PUSSY_RUT: 0,
    WOMB: new FlagWomb(),
    TIMES_PC_SEXED: 0
});

// VARS
// EdrynFlags.TIMES_PC_SEXED >= 4 = FREE SEX
// EDRYN_TIMES_HEL_THREESOMED: number = 404;
// HEL_EDRYN_OFFER: number = 405;
// EDRYN_PREGNANCY_INCUBATION: number = 68;
// TIMES_EATEN_EDRYN_PUSSY_RUT: number = 776;
TimeEvents.register("Edryn", (player: Character): void | boolean => {
    EdrynFlags.WOMB.update();
    // trace("\nEdryn time change: Time is " + Time.hour + ", incubation: " + pregnancy.incubation + ", event: " + pregnancy.event);
    if (EdrynFlags.WOMB.pregnancy && EdrynFlags.EDRYN_PREGNANT_AND_NOT_TOLD_PC_YET === 0 && EdrynFlags.WOMB.pregnancy.type !== PregnancyType.TAOTH) {
        EdrynFlags.EDRYN_PREGNANCY_INCUBATION++; // Pregnancy on hold until the PC discovers it
    }

    if (EdrynFlags.WOMB.pregnancy && EdrynFlags.WOMB.pregnancy.incubation === 0) {
        if (EdrynFlags.WOMB.pregnancy.type === PregnancyType.TAOTH) {
            urtaQuest.urtaAndEdrynGodChildEpilogue();
            // Since these flag can't be in use prior to Taoth's arrival I abused them to store Edryn's previous pregnancy type and incubation
            // Did it so that if Edryn is someday made able to carry someone else's baby this will still work properly
            EdrynFlags.WOMB.knockUp(EdrynFlags.URTA_FERTILE, EdrynFlags.URTA_PREG_EVERYBODY);
            EdrynFlags.URTA_FERTILE = 0;
            EdrynFlags.URTA_PREG_EVERYBODY = 0;
            return true;
        }
        else if (EdrynFlags.WOMB.pregnancy.type === PregnancyType.PLAYER) {
            EdrynFlags.EDRYN_NUMBER_OF_KIDS++; // Add one kid
            EdrynFlags.EDRYN_NEEDS_TO_TALK_ABOUT_KID = 1; // Set 'needs to talk to edryn about da kid
            EdrynFlags.WOMB.clear();
        }
    }
});

export function edrynBarTalk(player: Character): NextScreenChoices {
    CView.sprite(SpriteName.Edryn); // 14;

    CView.image("edryn-bar-chat");

    // Used for finding what cock to use!
    let cockThatFits = player.body.cocks.find(Cock.CockThatFits(300));
    // If no cocks fit, set to primary
    if (!cockThatFits) cockThatFits = player.body.cocks.get(0);

    if (telAdre.katherineEmployment.canTalkToEdryn()) { // Katherine training discussion
        return telAdre.katherineEmployment.talkToEdryn();
    }
    // Talk about latest birth
    if (EdrynFlags.EDRYN_NEEDS_TO_TALK_ABOUT_KID === 1) {
        let kidGender: number = randInt(2);
        if (randInt(10) < 2) kidGender = 3;
        CView.text("Edryn cracks into a beautiful smile and gushes, \"<i>We had a ");
        if (kidGender === 0) CView.text("son");
        else if (kidGender === 1) CView.text("daughter");
        else CView.text("herm");
        CView.text("!  You weren't in town, but the birth was easy, so don't worry about it.  Labor only lasted like, an hour tops.  You should've seen your ");
        if (kidGender === 0) CView.text("son");
        else CView.text("daughter");
        CView.text(" trying to stand up for the first time.  It was incredible!  ");
        if (EdrynFlags.EDRYN_NUMBER_OF_KIDS === 1) {
            CView.text("I'm going to have to spend less time around here so I can raise ");
            if (kidGender === 0) CView.text("him");
            else CView.text("her");
            CView.text(" right, but I'd be more than happy to 'help' you with your needs if you can catch me during a free moment.");
        }
        else {
            CView.text("I can't believe we've had " + numToCardinalText(EdrynFlags.EDRYN_NUMBER_OF_KIDS) + " kids together!  You better come see me later on - ");
            if (EdrynFlags.EDRYN_NUMBER_OF_KIDS < 3) CView.text("I miss the way you fill me");
            else CView.text("I want you to make me pregnant again");
        }
        CView.text(".</i>\"\n\n");

        CView.text("You stay with her and chat, learning more about your newborn child and otherwise having a pleasant time with your quadruped lover.");
        cheatTime(1);
        EdrynFlags.EDRYN_NEEDS_TO_TALK_ABOUT_KID = 0;
        return { next: barTelAdre };
    }
    // Mid-pregnancy talk
    else if (EdrynFlags.WOMB.pregnancy) {
        CView.text("Edryn smiles pleasantly as you approach, ");
        CView.text("offering you a spot at the table across from her.  She pushes aside the piled-up dishes and shifts uncomfortably on her pregnant bulk.  You smile at her and enjoy a light chat for a while, until Edryn runs out of food.  She excuses herself, and rises to go to the restroom.\n\n");
        // Edryn pregnant offer
        return { next: pregdrynOffer };
    }
    // Post kids talk
    else if (EdrynFlags.EDRYN_NUMBER_OF_KIDS > 0) {
        CView.text("Edryn gestures for you to take a seat, and motions for a waitress to bring you a drink.  You sit with the busty centaur and chat her up for a little bit, recounting your latest adventures and sexual exploits.  She laughs at some, blushes at others, and comforts you at times, but by the time you've finished her child-birth-enlarged nipples are like two hard bullets under her tunic and her face is flushed.  Edryn picks at her food for a moment and excuses herself, \"<i>Sorry dear, but I'm feeling a little flushed.  I'm going to head back to my room and lie down a while...</i>\"\n\n");

        // (NO WANGUUU)
        if (player.body.cocks.length === 0 || !cockThatFits) {
            CView.text("She looks down, eyes fixing on your crotch for a moment before she sighs, \"<i>Why did you get rid of your dick?  I like you a lot, but I don't really want to have sex with you like you are now.</i>\"\n\nIt looks like you won't get to have any fun with her right now.");
            cheatTime(1);
            return { next: barTelAdre };
        }
        // (WANG FITS)
        if (cockThatFits.area < 300 && cockThatFits.area > 24) {
            CView.text("She winks at you as she gets up and trots off, giving her butt a sensual sway to draw your eyes.  Her potent scent hangs in the air, and your body reacts immediately and intensely, flooding you with arousal.  ");
            CView.text("You look down at your " + describeCocksLight(player) + " and curse, irritated at how easily she can affect you.  There's no way you'll be turning her down this time.  You get up and follow her back to her room, intent on taking care of the need between your legs.\n\n");
            // Sex
            return { next: pregdrynOffer };
        }
        // (Too small)
        else if (cockThatFits.area <= 24) {
            CView.text("She looks down, eyes fixating on your crotch for a moment.  Edryn asks, \"<i>When did you get so small?  We can't fuck like this!  ");
            // (Chance of equinum,gro+(twice only),minotaur blood, or purified incubus draft)
            let itype;
            if (EdrynFlags.EDRYN_GIFT_COUNTER < 2) {
                CView.text("Here, take some of this stuff.  We confiscated it off one of the miscreants we kicked out the other day, and I KNOW it'll get you to be big enough for me.  Just don't go too nuts with it, okay?</i>\"\n\n");
                itype = ConsumableName.GroPlus;
                EdrynFlags.EDRYN_GIFT_COUNTER++;
            }
            else if (EdrynFlags.EDRYN_GIFT_COUNTER < 5) {
                CView.text("Here, take some of this stuff.  We confiscated it off one of the miscreants we kicked out the other day, and I KNOW it'll get you to be big enough for me.  Just don't go too nuts with it, okay?</i>\"\n\n");
                EdrynFlags.EDRYN_GIFT_COUNTER++;
                if (randInt(2) === 0) itype = ConsumableName.MinotaurBlood;
                else itype = ConsumableName.IncubusDraft;
            }
            else {
                CView.text("I'd love to help you, but I don't have any supplies for you.  I'm sure you'll find a way.</i>\"\n\n");
                cheatTime(1);
                return { next: barTelAdre };
            }
            return player.inventory.items.createAdd(player, itype, passTime(1));
        }
        // (Too big)
        else {
            CView.text("She looks down and gasps, \"<i>Holy shit!  Why do you have a monster like that!?  When a centaur is shocked by how big you are it's time to go easy on the dick enlargement pills, dear.</i>\"\n\n");
            if (EdrynFlags.EDRYN_GIFT_COUNTER < 2) {
                CView.text("Her eyes light up and she suggests, \"<i>Take some of this; it ought to take down some of that swelling.</i>\"\n\n");
                EdrynFlags.EDRYN_GIFT_COUNTER++;
                return player.inventory.items.createAdd(player, ConsumableName.Reducto, passTime(1));
            }
            // (ALT)
            else {
                CView.text("She says, \"<i>You should find some Reducto or something to shrink that down.  I haven't come across any more so you'll have to get it yourself.</i>\"\n\n");
                cheatTime(1);
                return { next: barTelAdre };
            }
        }
    }
    CView.text("Edryn smiles pleasantly as you approach, ");
    if (player.body.legs.type === LegType.CENTAUR) CView.text("offering you a spot at the table across from her.  You realize your companion isn't on any kind of seat at all, and is instead 'sitting' on her lower half.  You do the same, settling down across from her, thankful this bar was made to accommodate centaurs.");
    else CView.text("gesturing to a nearby stool.  You grab the seat and realize that your centaur companion isn't sitting still at all, but is instead 'sitting' on her lower half, which currently lies on the floor.");
    CView.text("  Despite the oddity of the situation, you stay and enjoy a light conversation with her.  You find the conversation to be interesting, and the pair of you stay there to munch on a light meal of breads, cheeses, and a glass of wine.  While you find the time pleasant, you have a feeling that something is 'off'.\n\n");
    // New PG
    CView.text("You take a close look at your dinner companion, trying to puzzle out what you're picking up on, but you just can't place it.  Edryn burps quietly, apologizing for her rudeness, and excuses herself to the girl's room.  As she turns away to leave, you get a good look at her backside.  Her horse-like sex is huge and puffy, and glistening with moisture.  The gentle flicking of her tail from side to side pushes her musky scent into you like a wave, ");
    if (player.body.legs.type === LegType.CENTAUR && player.body.cocks.length > 0) {
        CView.text("and the potent female scent works its way into your blood, making you dizzy as your " + describeCock(player, player.body.cocks.get(0)) + " ");
        if (player.body.cocks.get(0)!.type === CockType.HORSE) CView.text("pours out of its sheath");
        else CView.text("fills near instantaneously");
        CView.text(", now rock-hard.  You breathe deeply, your mind subsumed in a sea of equine instincts.  The hard floor squeezes your " + describeCock(player, player.body.cocks.get(0)) + " painfully underneath you, forcing you to rise up onto your hooves.  You can feel more than a few curious gazes sliding along your now fully exposed maleness, and it twitches as if it were happy for the attention.\n\n");
        CView.text("Swaying back and forth, alternatively snorting and breathing deeply of the female's scent, your gaze immediately locks onto the returning mare.  Your " + describeCock(player, player.body.cocks.get(0)) + " jumps and bounces underneath you, painfully hard and swollen.  A thick dollop of pre beads on your " + describeCockHead(player.body.cocks.get(0)) + ", as if the bar needed your display to be any more overtly sexual.  Edryn looks you over, walking alongside you she talks, \"<i>My my, someone liked what they saw.  Or was it smelled?  I can never tell what it is that gets you " + mf(player, "studs", "hotties") + " so worked up about me.</i>\"\n\n");
        CView.text("A soft hand slides under your belly, hefting your " + describeCock(player, player.body.cocks.get(0)) + " and smearing the bead of pre over it with long slick strokes.  She coos, \"<i>");
        player.stats.lust += 70;

        return edrynOffer(player);
    }
    else if (player.body.cocks.length > 0) {
        if (player.body.cocks.filter(Cock.FilterType(CockType.HORSE)).length > 0) {
            CView.text("and the potent female scent makes you feel a bit dizzy and dazed.  ");
            if (player.body.cocks.get(0)!.length > 16) CView.text("You barely register the thump of your hardening " + nounCock(CockType.HORSE) + " as it smacks into the underside of the table.\n\n");
            else CView.text("You squirm uncomfortably, feeling constrained by your " + player.inventory.armor.displayName + " as you surge to erectness.\n\n");
            CView.text("Swaying back and forth in a scent induced haze, you fail to notice Edryn's return.  She coughs noisily, drawing you back to the real world and pushing away the memory of her glistening snatch.  You start to fumble for words until you realize she's smiling knowingly at you.  Unexpectedly, caresses slide against your groin, hefting and measuring you through your " + player.inventory.armor.displayName + ".\n\n");
            player.stats.lust += 60;

            return edrynOffer(player);
        }
        // Non horsedick
        else {
            CView.text("but the potent musky scent only reminds you of how different things are here.");
            if (player.stats.cor > 50 || EdrynFlags.TIMES_PC_SEXED > 0 || EdrynFlags.LOW_STANDARDS_FOR_ALL) {
                CView.text("  Unbidden, your mind wonders what her juicy horse-snatch would feel like, and your " + describeCock(player, player.body.cocks.get(0)) + " responds immediately, thickening with readiness.  You squirm uncomfortably from how constricting your " + player.inventory.armor.displayName + " feels.\n\n");
                CView.text("You give the rapidly dissipating scent a sniff and note that it isn't unpleasant, just strong, and once again you find yourself imagining standing ");
                if (player.body.tallness < 60) CView.text("on a stool ");
                CView.text("behind her, fucking her like the beast-woman she is.  Lost in your thoughts, you fail to notice Edryn's return.  She coughs noisily, rousing you from the impromptu fantasy as she gives you a knowing smile.  An unexpected caress slides against you groin, rubbing and hefting you carefully.");
                if (player.body.cocks.get(0)!.type === CockType.TENTACLE) CView.text("  She smiles coyly when your " + describeCock(player, player.body.cocks.get(0)) + " wriggles, wrapping around her arm.");
                CView.text("\n\n");
                player.stats.lust += 40;

                return edrynOffer(player);
            }
            else {
                CView.text("\n\nYou wait until she returns, wishing for once that things could be normal.  Though the remaining conversation is pleasant, you have a hard time enjoying yourself, and eventually bid the pretty centaur farewell.");
                cheatTime(1);
                return { next: barTelAdre };
            }
        }
    }
    // Catch all
    else {
        // Turned on chicks can hit on her
        if (player.body.vaginas.length > 0 && player.stats.lust > 70) {
            CView.text("and as wet as you are right now, you find her scent to be intriguing.  Some part of you is curious what it would taste like.  When the centauress returns you compliment her on her shapely backside, but she only smiles politely and informs you that she \"<i>doesn't swing for your team,</i>\" whatever that means.  The rest of the conversation is quite pleasant, but all good things must come to an end.");
            cheatTime(1);
            return { next: barTelAdre };
        }
        // Everybody else is all "BLEH"
        else {
            CView.text("but the potent musky scent only reminds you of how different things are here.");
            CView.text("\n\nYou wait until she returns, wishing for once that things could be normal.  Though the remaining conversation is pleasant, you have a hard time enjoying yourself, and eventually bid the pretty centaur farewell.");
            cheatTime(1);
            return { next: barTelAdre };
        }
    }
}

function edrynOffer(player: Character): NextScreenChoices {
    CView.sprite(SpriteName.Edryn); // 14;
    let cost: number = 0;
    switch (EdrynFlags.TIMES_PC_SEXED) {
        case 0:
            cost = 200;
            break;
        case 1:
            cost = 100;
            break;
        case 2:
            cost = 50;
            break;
        case 3:
            cost = 25;
            break;
        case 4:
            cost = 0;
            break;
        default:
            cost = 0;
            break;
    }
    // Pick most appropriate cock
    let cockThatFits = player.body.cocks.find(Cock.CockThatFits(300));
    // If no cocks fit, set to main.
    if (!cockThatFits) cockThatFits = player.body.cocks.get(0)!;

    // (cont centaur)
    if (player.body.legs.type === LegType.CENTAUR && player.body.cocks.length > 0) {
        // Too small
        if (cockThatFits.area < 24) {
            CView.text("Oh my, you're a little bit small for my tastes love.  Maybe you should try some of the local delicacies and trot back here so I can help you out, ok?</i>\"\n\n");
            CView.text("You're a bit disappointed with the outcome. It doesn't look like you'll be getting any centaur tail tonight.");
            cheatTime(1);
            return { next: barTelAdre };
        }
        // Too big
        if (cockThatFits.area > 300) {
            CView.text("Oh wow, you're a little bit too big for me to handle, love.  Maybe you should try to find something to shrink that down a little, not too much, and trot back here so I can help you out, ok?</i>\"\n\n");
            CView.text("You're a bit disappointed with the outcome. It doesn't look like you'll be getting any centaur tail tonight.");
            cheatTime(1);
            return { next: barTelAdre };
        }
        // Big enough
        CView.text("Oh my, you're hot to trot aren't you?  I can feel just how tight and full it is, practically ready to explode. Well I've got good news for you " + mf(player, "stud", "Miss Hot-And-Bulgy") + ", I'm the best kind of mercenary – one that does ANYTHING for money, even satisfying horny equine " + mf(player, "studs", "breeders") + ".</i>\"\n\n");
        CView.text("You groan, more turned on than ever by being fondled openly in public.  The centaur whore winks at you and offers, \"<i>So what do you say, is a roll in the hay with me worth ");
        if (cost > 0) CView.text(numToCardinalText(cost) + " gems?");
        else CView.text("an hour of your time?");
        CView.text("</i>\"\n\n");
        CView.text("She releases your " + describeCock(player, cockThatFits) + " and looks expectantly at you.  Your body is ready to do anything for a chance to breed her.  What will you do?\n\n");
        if (cost > 0) CView.text("(Do you pay " + numToCardinalText(cost) + " gems to fuck her?)");
        else CView.text("(Do you fuck her?)");
        return { yes: edrynSexSelecter, no: barTelAdre };
    }
    else if (player.body.cocks.length > 0) {
        // (HORSE CONT)
        if (player.body.cocks.filter(Cock.FilterType(CockType.HORSE)).length > 0) {
            // Too bigsies
            if (cockThatFits.area > 300) {
                CView.text("\"<i>Wow, that's huge!  Sweetheart, you'll need to be a bit smaller if you want to play with me.  Why not go out and find something to shrink it down to something a horse like me can handle, then maybe we can play, ok?</i>\"\n\n");
                CView.text("You're a bit disappointed with the outcome. It doesn't look like you'll be getting any centaur tail tonight.");
                cheatTime(1);
                return { next: barTelAdre };
            }
            if (cockThatFits.area >= 24) {
                CView.text("\"<i>Mmmhmm, just as I thought.  You were daydreaming about my cunt, weren't you?</i>\" she asks.  Instinctively, you try to shake your head negatively, but she doesn't seem fooled.  Edryn releases your crotch and scolds you, \"<i>Don't lie, you got a whiff of my juicy cunt and all your reserve and fortitude melted into a puddle of fuck and breed.  Believe me, I've seen it happen before.</i>\"\n\n");
                CView.text("She doesn't seem irritated, instead she seems quite... turned on.  Edryn explains, \"<i>" + mf(player, "Mr.", "Miss") + " thick and juicy, I'm more than muscle for hire.  I do a little 'wetwork' on the side, and I've yet to meet a horse-cock that doesn't jump at my scent.  Lucky for you, I think you're cute, and I'm feeling randy.  So, how about ");
                if (cost > 0) CView.text(numToCardinalText(cost) + " gems, ");
                else CView.text("an hour of your time, ");
                CView.text("and I'll let you get nice and personal with my juicy snatch?</i>\"\n\n");
                CView.text("She stands up, and the scent returns, making your ");
                if (player.body.balls.count > 0) CView.text("balls tight and your ");
                CView.text(describeCock(player, cockThatFits) + " twitch.  Will you accept her proposition and give her what she wants?\n\n");
                if (cost > 0) CView.text("(Do you pay " + numToCardinalText(cost) + " gems to fuck her?)");
                else CView.text("(Do you fuck her?)");
                return { yes: edrynSexSelecter, no: barTelAdre };
            }
            // (HORSE TOO SMALL)
            else {
                CView.text("\"<i>Ouch, is that all?  Sweetheart, you'll need to be a bit bigger if you want to play with me.  Why not go out and try some of the local delicacies, then maybe we can play, ok?</i>\"\n\n");
                CView.text("You're a bit disappointed with the outcome. It doesn't look like you'll be getting any centaur tail tonight.");
                cheatTime(1);
                return { next: barTelAdre };
            }
        }
        // Normal Wingdangdoodle
        else {
            // Too bigsies
            if (cockThatFits.area > 300) {
                CView.text("\"<i>Wow, that's huge!  Sweetheart, you'll need to be a bit smaller if you want to play with me.  Why not go out and find something to shrink it down to something a horse like me can handle, then maybe we can play, ok?</i>\"\n\n");
                CView.text("You're a bit disappointed with the outcome. It doesn't look like you'll be getting any centaur tail tonight.");
                cheatTime(1);
                return { next: barTelAdre };
            }
            // (cont Normal)
            if (cockThatFits.area >= 24) {
                CView.text("\"<i>Was the sight of my backside that entrancing to you?</i>\" she teases, \"<i>Normally only the horsey-boys get this hard for me, but you... you want to take a ride on the wild side, don't you?</i>\"\n\n");
                CView.text("Her words ring true, and a quick fuck to tamp down your rising lust wouldn't hurt would it?\n\n");
                CView.text("Edryn keeps talking, \"<i>I do ALL kinds of mercenary work, even the sloppy wet kind, and lucky for you, I'm more than wet enough to let you satisfy your " + describeCock(player, player.body.cocks.get(0)) + " in me.  ");
                if (cost > 0) CView.text(numToCardinalCapText(cost) + " gems ");
                else CView.text("An hour of your time ");
                CView.text("gets you the ride of a lifetime.  So what do you say " + player.desc.name + "?  Do you want to be my sex-toy?</i>\"\n\n");
                CView.text("She stands up and turns, exposing her exotic hind-end to you.  A drop of fluid slips from her folds and splatters under the table, reminding you just how wet this trick would be.  Do you really want to do her?");
                if (cost > 0) CView.text("\n\n(Do you pay " + numToCardinalText(cost) + " gems to fuck her?)");
                return { yes: edrynSexSelecter, no: barTelAdre };
            }
            // (rejected)
            else {
                CView.text("\"<i>Wow, that's it?  I'm sorry but you'll have to be a bit bigger before you can play with me.  Why not try some of the local specialties and come back when you're a bit bigger?</i>\"\n\n");
                CView.text("You're a bit disappointed with the outcome. It doesn't look like you'll be getting any centaur tail tonight.");
                cheatTime(1);
                return { next: barTelAdre };
            }
        }
    }
}

export function edrynSexSelecter(player: Character): NextScreenChoices {
    CView.sprite(SpriteName.Edryn); // 14;
    let cost: number = 0;
    switch (EdrynFlags.TIMES_PC_SEXED) {
        case 0:
            cost = 200;
            break;
        case 1:
            cost = 100;
            break;
        case 2:
            cost = 50;
            break;
        case 3:
            cost = 25;
            break;
        case 4:
            cost = 0;
            break;
        default:
            cost = 0;
            break;
    }
    if (cost > player.inventory.gems) {
        CView.clear();
        CView.text("You realize you can't afford to stay with the sexy centaur, and leave full of disappointment and arousal.");
        cheatTime(1);
        return { next: barTelAdre };
    }
    // Pay gems and update sidebar
    player.inventory.gems -= cost;

    // Increment sex count
    EdrynFlags.TIMES_PC_SEXED += 1;
    // Actually choose the sex scene
    return edrynFucktroduction(player);
}
function fuckEdrynTaur(player: Character): NextScreenChoices {
    CView.sprite(SpriteName.Edryn); // 14;

    CView.image("edryn-fuck-as-taur");
    let cockThatFits = player.body.cocks.find(Cock.CockThatFits(300));
    if (!cockThatFits) cockThatFits = player.body.cocks.get(0);
    CView.text("Your equine body lurches forwards on its own, rearing up on your hind legs and lunging forwards.  Edryn whinnies as she is violently penetrated and forced to support most of your weight.  Her equine pussy is a wonder, able to stretch to a degree that would shame the raunchiest of human and demon sluts.  The velvet walls of her massive equine cunny clench tightly around you, trapping you completely inside her juicy depths.  She wiggles slightly, bending her body, teasing your " + describeCock(player, cockThatFits) + " inside her.\n\n");

    CView.text("Edryn looks over her shoulder at you and winks as she relaxes her internal muscles.  Unprepared for the sudden release, you slide a few inches out of her before your hind-legs can steady you.  The centauress teases, \"<i>Are you sure you can handle fucking this way?  Like a rutting beast?  You look like you're about to fall over.  Here, grab onto the rings hanging from the ceiling and steady yourself.  You'll need all the leverage you can get to satisfy a horny girl like me.</i>\"\n\n");

    CView.text("The rings aren't too high overhead, and you're able to stretch to reach them without much issue.  Grabbing them is easy, and the difference is immediate.  With more of your frontal weight being supported by your arms, controlling your body's motions should be much less difficult.  You heave backwards, sliding a bit further out, then thrust forwards with your hind legs, pulling hard with your arms to bury your " + describeCock(player, cockThatFits) + " to the hilt with a wet smack.\n\n");

    CView.text("Edryn moans lewdly, rocking against you as you pull back for another mighty thrust.  You begin pounding in earnest, grunting with the effort of heaving your animal-body into the centaur's oozing black-lipped sex.  You marvel at the strange texture and inhuman warmth it gives off, and your body builds up a fine sheen of sweat as do your best to breed the mare underneath you.  ");
    if (player.stats.cor < 75) CView.text("You recoil for a second, scolding yourself for the strange thoughts, but you don't slow down the fucking in the slightest.");
    else CView.text("You smile, realizing you hadn't meant to think of her as a mare and you as her stud, but that's exactly what you are right now.  Your thrusts speed up as you renew your determination to fill this cunt full of fillies.");

    CView.text("\n\nShe twists around to look you in the eye as you work her drooling horse-cunt over.  You can hear her copious fluids splattering the floor and feel them dripping down your hind legs as she moans, leaning back into you and planting a sloppy kiss on your lips.  One of her hands ");
    if (player.body.chest.sort(BreastRow.Largest).get(0)!.rating <= 1) CView.text("strokes your chest");
    else CView.text("caresses a breast");
    CView.text(" while she caresses the side of your " + describeFaceShort(player) + " with the other.  Your body pumps away while your tongues entwine, tracing saliva over each other's lips.  She pulls back and moans out again, trailing off into a whinny as she orgasms underneath you.\n\n");

    CView.text("Her cunt locks tightly around you once again, clamping down in a series of rings from the base all the way to your " + describeCockHead(cockThatFits) + ".  At once, they start sliding from the base towards the tip, new ones forming along the bottom of the shaft as her pussy milks your " + describeCock(player, cockThatFits) + " hard.  Trapped inside her, all you can do is groan and cum in response to her climax.  You throw back your head as you feel the warmth of your release building in your ");
    if (player.body.balls.count > 0) CView.text(describeBalls(true, true, player));
    else CView.text("loins");
    CView.text(".\n\n");

    CView.text("The rippling and squeezing of Edryn's cunt throws you past the point of no return.  Your eyes roll back as you unload into her musky tunnel, nearly losing your grip as your body gives up wave after wave of seed.  The contractions don't let up");
    if (player.cumQ() < 100) CView.text(" even after you've finished.");
    else {
        CView.text(", squeezing more and more cum into her horse-sized womb.  ");
        if (player.cumQ() > 250) CView.text("Her body gurgles noisily from the massive fluid injection it's just taken, and her belly expands noticeably.  ");
        if (player.cumQ() > 500) CView.text("It keeps going as your body spends the last of its massive reserves, bloating her to the point that she'll have trouble walking.  ");
        CView.text("Her cunt keeps milking you even after.");
    }

    if (EdrynFlags.TIMES_PC_SEXED <= 1) CView.text("\n\nYou pull out with a wet pop, and watch the mixed centaur-cum pour from her puffy lips in a waterfall.  It splatters onto the floor wetly as Edryn at last relaxes, dropping herself heavily onto a pile of pillows.  She shakes her head and puts her palms on the floor alongside her body, steadying herself as she attempts to regain her balance.  Edryn gives you a tired smile and says, \"<i>Ohhhh that was nice.  Most of my customers can't get me off like that.  Don't worry about filling me full of fillies either, I take some herbs to prevent that.  You should come back sometime, okay?</i>\"");
    else if (EdrynFlags.TIMES_PC_SEXED <= 3) CView.text("\n\nShe sighs happily and looks down at you, \"<i>Ooh " + player.desc.name + ", you're the best.  We should do this again soon.  Oh goddess, I can feel my juices starting just thinking about it.</i>\"");
    else if (EdrynFlags.TIMES_PC_SEXED === 4) CView.text("\n\nShe sighs happily and says, \"<i>Oh baby, you know what?  I'm never charging you again.  Just keep getting me off like that and we can do it anytime.</i>\"");
    else CView.text("\n\nShe sighs contentedly and says, \"<i>Mmm, never stop visiting, okay?</i>\"");
    CView.text("\n\nThe two of you wipe up as best you can, redress, and head back out to the bar.  You're consciously aware of how strongly your groin reeks of centaur-slut.  Your body, happy with the scent and scrutiny of the bar's patrons, refuses to go soft, providing a wonderful view of your cum-slicked member.  Giggles and laughter break out around you as you leave, though more than a few of those taking notice have hard nipples or tents of their own.");
    if (EdrynFlags.TIMES_PC_SEXED >= 4) edrynPregChance(player);
    player.orgasm();
    player.stats.sens += -3;

    if (player.stats.lust < 30) player.stats.lust = 30;
    return { next: passTime(1) };
}

function fuckEdrynNonTaur(player: Character): NextScreenChoices {
    CView.sprite(SpriteName.Edryn); // 14;

    CView.image("edryn-fuck-as-non-taur");
    let cockThatFits = player.body.cocks.find(Cock.CockThatFits(300));
    if (!cockThatFits) cockThatFits = player.body.cocks.get(0)!;
    CView.text("She wiggles her more than ample backside towards you, squelching wetly against your ");
    if (player.body.tallness < 48) CView.text("face");
    else CView.text("body");
    CView.text(".  She looks over her shoulder and says, \"<i>If you don't want your gear to smell like a horny centaur, you ought to shed it and get me warmed up with your tongue.</i>\"  You hastily remove it");
    if (player.body.tallness > 72) CView.text(" and drop down to your knees to better level yourself with her");
    CView.text(", pressing your " + describeFaceShort(player) + " into her slick folds and tasting her flavor.  Your nose easily slips into her gash as your tongue explores it, testing and tasting thick, liquid centaur lust.  It's tangy and sweet, surprisingly unlike the scent it gives off.  You easily find her large clit and suckle on it, listening to the wet squelches and whinnies of pleasure.\n\n");

    CView.text("With a gasp you pull back, a thin coating of female slime clinging wetly to your face.  She leans over her hindquarters, her human-half rosy with the heat of her arousal as she hands you a towel.  You wipe off, and listen to the 'splat-splat-splat' of her animalistic pussy-juice as it drips to the floor.  She's completely soaked in a way that you doubt even a succubus could replicate.  She crooks a finger and waggles back and forth, making her puffy, black cunt-lips jiggle ever-so-slightly.  You don't need any more encouragement.\n\n"); if (player.body.tallness < 60) CView.text("You grab a stool so you'll be tall enough to fuck her properly and climb onto it.  ");
    CView.text("Supporting your");
    if (cockThatFits.area > 200) CView.text(" hefty package with both hands");
    else CView.text("self with your hand");
    CView.text(", you guide your " + describeCock(player, cockThatFits) + " towards the shining, black horse-cunt in front of you.  It parts easily, like a velvet curtain.  You slowly slide forward into Edryn's welcoming nethers, enjoying not having to fight to get your large " + nounCock(CockType.HUMAN) + " in for a change.  She trembles as you pass the halfway point, ");
    if (cockThatFits.type === CockType.HORSE) CView.text("feeling your ring of prepuce slipping between her lips.  ");
    else CView.text("squirting a little bit of fluid on the floor.  ");
    CView.text("The further you push inside, the more aware of her warmth you become.  Her body temperature is higher than a human's, and it feels almost good enough to make you melt.\n\n");

    CView.text("She whinnies and pushes back against you, forcing your entire " + describeCock(player, cockThatFits) + " to slip up her well-lubed passage.  You slap her ass, watching the furred flanks jiggle slightly.  Edryn looks over her shoulder again to and gives you a sultry look.  Before you can puzzle out what she's trying to tell you, her entire cunt contracts tightly, like a silken vise.  It wrings your " + describeCock(player, cockThatFits) + " tightly, immobilizing you inside the powerful centauress and making your " + describeLegs(player) + " feel wobbly and weak.\n\n");

    CView.text("Edryn relaxes slightly, enough to allow you movement, and you happily begin fucking her hindquarters, grabbing her tail for leverage as you pound against her.  Her entire body sways with your motions, even jiggling her breasts.  She matches you, pushing back with equal fervor until her copious cunt-juice is all over your belly and thighs as every thrust is announced with a loud SLAP.  She whinnies happily, fucking harder and harder until you're struggling not to be knocked over by the overenthusiastic woman.\n\n");

    CView.text("She moans and whinnies while her animal cunt noisily slurps up your " + describeCock(player, cockThatFits) + ", rising to a feverish pitch.  Everything suddenly shifts and you're knocked off balance. Clutching tightly to her tail, you hang on for dear life as she bears you down onto the floor.  Hundreds of soft pillows cushion the fall, and ensure that you're not crushed by Edryn's hindquarters, but you are completely pinned under her.\n\n");

    CView.text("You feel like you should be doing something, but there's nothing you can do.  She never misses a beat, lifting up her back end until you're about to pop free, and then slamming back down, occasionally swatting your face with her uncontrolled tail.  Helpless underneath hundreds of pounds of horse-flesh, you're forced to lie there and take it, fucked like a sex toy for who knows how long.\n\n");

    CView.text("When she finally cums, you're battered and sore, and she doesn't seem to care a bit.  She whinnies and pushes down HARD, making it difficult for you to breathe.  Her pussy spasms and begins milking your dick.  It tightly contracts in a ring around your base that slides up to the tip, but the muscular contractions happen so quickly there are more rings of pleasure squeezing you than you can count.  Your heart beats madly in your chest while you try to breathe and orgasm simultaneously, but your cock is the only one having any luck.\n\n");

    CView.text("Your eyes roll back as you unload into Edryn's musky tunnel, giving up on breathing as your body gives up wave after wave of seed.  The contractions don't let up, ");
    if (player.cumQ() < 100) CView.text("even after you've finished.\n\n");
    else {
        CView.text("squeezing more and more cum into her horse-sized womb.  ");
        if (player.cumQ() >= 250) CView.text("Her body gurgles noisily from the massive fluid injection it's just taken, and her belly expands noticeably. ");
        if (player.cumQ() >= 500) CView.text("It keeps going as your body spends the last of its massive reserves, bloating her to the point that she'll have trouble walking.  ");
        CView.text("Her cunt keeps milking you even after you've finished.\n\n");
    }
    CView.text("As the edges of your vision start blacking out, Edryn ");
    if (cockThatFits.hasKnot()) CView.text("tries to rise, lifting up enough for you to get a few good breaths in, but your knot keeps her locked to you, and the two of you are tied together for another minute or two while it deflates, emptying the very last dregs of your spunk into her.  You pop free, ");
    else CView.text("slowly rises up off of you, ");
    CView.text("and like a dam being broken, a wave of mixed sexual fluids dumps from her puffy lips onto you.  Edryn sighs happily, and you realize her tongue is hanging from her mouth with her eyes slightly rolled back.  You realize that though she endeavors to act restrained, her body is determined to be a wanton slut.\n\n");

    if (EdrynFlags.TIMES_PC_SEXED <= 1) CView.text("She sighs happily and looks down at you, \"<i>Ohhhh that was nice.  Most of my customers can't get me off like that.  I hope you're ok!  Don't worry about me getting pregnant either, I take some herbs to prevent that sort of thing until I'm ready for it.</i>\"\n\n");
    else if (EdrynFlags.TIMES_PC_SEXED <= 3) CView.text("She sighs happily and looks down at you, \"<i>Ooh " + player.desc.name + ", you're the best.  We should do this again soon.  Oh goddess, I can feel my juices starting just thinking about it.</i>\"\n\n");
    else if (EdrynFlags.TIMES_PC_SEXED === 4) CView.text("She sighs happily and says, \"<i>Oh baby, you know what?  I'm never charging you again.  Just keep getting me off like that and we can do it anytime.</i>\"\n\n");
    else CView.text("She sighs contentedly and says, \"<i>Mmm, never stop visiting ok?</i>\"\n\n");
    CView.text("The two of you clean up as best you can, redress, and head back out to the bar.  You're consciously aware of how strongly you reek of centaur-slut.  Your body, happy with the scent and the scrutiny of the bar's patrons, refuses to go soft, providing a more-than-ample tent.  Giggles and laughter break out around you as you leave, though more than a few of those taking notice have hard nipples or tents of their own.");
    if (EdrynFlags.TIMES_PC_SEXED >= 4) edrynPregChance(player);
    player.orgasm();
    player.stats.sens += -3;

    if (player.stats.lust < 30) player.stats.lust = 30;
    return { next: passTime(1) };
}

export function edrynBar(): boolean {
    return EdrynFlags.EDRYN_NEVER_SEE_AGAIN === 0 && Time.hour >= 14 && Time.hour <= 19 && (Time.hour < 17 || EdrynFlags.EDRYN_NUMBER_OF_KIDS === 0);
}
// Hel x Edryn Threesome
/*Sahvin
Requirements:
-Hel is in Fuckbuddy or Follower mode
-Edryn is giving herself for free
-PC has a cock that fits Edryn's standards
-PC must be tall enough so their head is over Edryn's ass -- (ie, 4ft + ?)

Scene proc's the first time the PC visits the Wet Bitch after all requirements are met, during Edryn's normal hours. Hel can be found in the Wet Bitch every third day from then on -- this does not disrupt her other functions or appearances.
*/

// Introduction -- Hel x Edryn -- Wet Bitch Entrance
// (PC goes to the Wet Bitch during Edryn's hours)

const edrynHeliaLastThreesomeCheck: number;

export function edrynHeliaThreesomePossible(): boolean {
    if (model.time.totalTime === edrynHeliaLastThreesomeCheck || model.time.totalTime === -edrynHeliaLastThreesomeCheck) // Only choose action once per visit to the bar
        return edrynHeliaLastThreesomeCheck > 0;
    edrynHeliaLastThreesomeCheck = model.time.totalTime;
    if (player.gender === 0 || Time.hour < 14 || Time.hour >= 20 || randInt(2) === 0 || (EdrynFlags.HEL_FUCKBUDDY === 0 && !helFollower.followerHel())
        || (EdrynFlags.HEL_FOLLOWER_LEVEL === 1 && EdrynFlags.HEL_HARPY_QUEEN_DEFEATED === 0)) {
        edrynHeliaLastThreesomeCheck = -edrynHeliaLastThreesomeCheck; // Make the saved time negative to indicate Helia is not at the bar right now
        return false;
    }
    return true;
}

export function helAppearance(player: Character) {
    CView.text("\n\nTo your surprise, you see Hel the salamander sitting in a corner table, a pair of foxy fox-morph girls sitting on her lap.  When she sees you enter, the pretty reptile lifts her tankard and shouts, \"<i>Hey! " + player.desc.name + "! Over here!</i>\" over the loud noises of the bar.");
    // (\"<i>Hel</i>\" button added to the Wet Bitch menu)
}

// \"<i>Hel</i>\" in Wet Bitch Menu (First Time)
export function approachHelAtZeBitch(player: Character): NextScreenChoices {

    CView.image("hel-chat-at-bar");
    let edryn;
    if (edrynBar() && player.body.cocks.find(Cock.CockThatFits(300)) && EdrynFlags.TIMES_PC_SEXED >= 4)
        edryn = helEdrynThreeSomeStartYerEngines;

    if (edryn && EdrynFlags.HEL_EDRYN_OFFER === 0) {
        CView.text("\"<i>Hey there, lover mine,</i>\" Helia says with a coy grin as you take a seat across from her.  The two fox-girls giggle drunkenly, prompting Hel to give them each a playful slap on the ass and send them on their way.  \"<i>Well, fancy meeting you here, ");
        if (player.body.femininity < 49) CView.text("handsome");
        else CView.text("beautiful");
        CView.text(".  In town for business... or pleasure?</i>\" she purrs with a little wink.\n\n");

        CView.text("You spend a few minutes talking with the salamander, brushing off her question to ask her what she's doing in Tel'Adre.  With a little laugh, she says \"<i>Just found the place a couple of days ago.  How the hell did I not know there was an entire town of people out here?  Anyway, so I get here and this smoking hot centauress starts waving this gem all over me, and--</i>\"\n\n");

        CView.text("\"<i>Centauress? You mean Edryn?</i>\"\n\n");

        CView.text("\"<i>Yeah!  That's the one!  Oh man, I'd pay a pretty gem to stick my tail up her flanks!</i>\" she laughs, snaking her tail under the table to tickle your thighs.  You give her prehensile extremity a little slap until it comes to rest in your lap, snuggling up around your " + describeHips(player) + " as Hel nonchalantly chugs down the rest of her ale.\n\n");

        CView.text("Sitting with the salamander, you notice across the crowded bar that Edryn is sitting at her table, sipping a little glass of wine.  Catching your eye, the centauress gives you a sultry wink.  An idea forms in your mind: you could easily introduce the two girls.  Do you?");
        EdrynFlags.HEL_EDRYN_OFFER++;
    }
    else {
        CView.text("\"<i>Hey there, lover mine,</i>\" Helia says with a coy grin as you take a seat across from her.  The two fox-girls giggle drunkenly, prompting Hel to give them each a playful slap on the ass and send them on their way before swinging over and taking her place on your lap.  \"<i>Well, fancy meeting you here, ");
        if (player.body.femininity < 49) CView.text("handsome");
        else CView.text("beautiful");
        CView.text(".  In town for business... or pleasure?</i>\" she purrs with a little wink.\n\n");

        CView.text("You spend a few minutes talking with the salamander, joking and laughing with your inebriated lover.  ");
        // Eventually, though, Hel gives a nod toward Edryn, sitting a ways away from you, and asks if you'd be up for a little threesome time.  Are you?\n\n", false);
        CView.text("  Eventually, though, Hel gives you a sultry look and asks if you're up for a little group activity.  Are you?\n\n");
    }
    // (Display Options: [Threesome] [Leave]
    return { choices: [["Edryn3Some", edryn], ["Fox Girls", helScene.heliaPlusFoxyFluffs], ["", undefined], ["", undefined], ["Leave", leaveHelInZeBitch]] };
}

// First Time - Leave
function leaveHelInZeBitch(player: Character): NextScreenChoices {

    if (EdrynFlags.HEL_EDRYN_OFFER === 1) {
        CView.text("You decide against trying to set something up between the girls -- you like your lovers separate for now.  You spend the rest of the hour quietly chatting with Helia before giving her a friendly kiss goodbye and stepping away.");
    }
    else {
        CView.text("You brush Helia's request off, saying you aren't much interested in a group right now.  She sighs dejectedly, but quickly recovers and gives you a knowing wink.  \"<i>Well, maybe later.  I know you like some group play as much as I do.</i>\"\n\n");

        CView.text("You spend the rest of the hour quietly chatting with Helia before giving her a friendly kiss goodbye and stepping away.");
    }
    return { next: barTelAdre };
}

// First Time -- Threesome
export function helEdrynThreeSomeStartYerEngines(player: Character): NextScreenChoices {

    if (EdrynFlags.EDRYN_TIMES_HEL_THREESOMED === 0) {
        CView.text("Suddenly, an idea forms in your mind.  You ask Hel if she'd like to meet Edryn.\n\n");

        CView.text("\"<i>Wh-- Really?</i>\" she gasps, eyebrows arching.  Her tail starts wagging excitedly in your lap until you stand, taking Hel's hand in yours and leading her over to Edryn's table.  The centauress waves amicably as your approach, though she cocks her head to the side as she notices the other girl on your arm.\n\n");

        CView.text("\"<i>Hey, " + player.desc.name + ",</i>\" Edryn says with a half-smile. \"<i>Who's your friend?</i>\"\n\n");

        CView.text("You introduce the girls, and with a nod from Edryn, you both sit at the centauress's table.  You spend a few minutes chatting amicably, and are gratified to see how wonderfully Hel and Edryn are getting on.  Within minutes they're comparing stories of Edryn's guard duty against Hel's adventures as a wandering berzerker.  You let them talk for a little while, but eventually you bring up your reason for bringing Hel over to meet the centauress.\n\n");

        CView.text("Surprisingly for the salamander, Hel blushes brightly when you mention her little crush on Edryn.  The centauress gives a girlish giggle at the sight of Hel turning bright red, but quickly waves it off.  \"<i>Don't worry about it, cutie,</i>\" Edryn says, taking Helia's hand in hers.  \"<i>Looks like " + player.desc.name + " forgot to mention: I do a little 'wet work' on the side.  " + mf(player, "He", "She") + " and I have a little understanding, and since I'm horny and you're cute... What do you say we make your wish come true?</i>\"\n\n");

        CView.text("Hel just about squeals with delight.  She nods her head emphatically, making both you and Edryn laugh.  With a knowing look, Edryn takes you and Hel by the hand and leads you into her private room.");
    }
    // Repeat -- Threesome
    else {
        CView.text("You take Hel's hand and lead her over to Edryn's table.  The centauress smiles wide as you approach and invites you to sit.  You spend a few minutes in pleasant conversation before Hel eagerly asks if Edryn's in the mood for a little group fun.\n\n");

        CView.text("\"<i>Well, normally I'm a twosome sort of girl, but... For you two, I can make an exception.</i>\"\n\n");

        CView.text("Grinning, the three of you make your way up to Edryn's private chambers.");
    }
    return { next: threesomeEdrynAndHel };
}

// THREESOME SEX
function threesomeEdrynAndHel(player: Character): NextScreenChoices {

    CView.image("edryn-hel-threesome");
    const cockThatFits = player.body.cocks.find(Cock.CockThatFits(300));
    EdrynFlags.EDRYN_TIMES_HEL_THREESOMED++;
    CView.text("You arrive in Edryn's private room, a small dark alcove in the bar with a healthy layer of pillows covering the floor.  You start to disrobe, watching as Hel is nearly crushed up against a wall by a sudden butt-bump from Edryn: \"<i>You better start warming me up with that long lizard tongue, cutie,</i>\" she says, herself yanking off her loose shirt.\n\n");

    CView.text("Hel gets to work without further prompting, grabbing Edryn's wide flanks and burying her face into the centauress's horse-cunt. You grab your " + describeCock(player, cockThatFits) + ", stroking yourself off to the show unfolding before you.  Edryn whinnies happily, wiggling her hips into Hel's face, crushing the salamander further and further into the wall.\n\n");

    CView.text("Alright, alright.  You break the girls up before Edryn cums just from the oral assault.  It takes a moment of thought to figure out how to make this threeway work with Edryn's massive horse body.  You give Hel a leg up, getting her mounted on Edryn's back, and take up position behind the centauress.\n\n");

    CView.text("Hel rolls over on her back, using her legs to steady on Edryn's back as you rub your " + describeCock(player, cockThatFits) + " against Edryn's gaping horsecunt, making the centauress shudder.  The shudder nearly throws Hel off her back, causing the salamander to dig her claws painfully into Edryn's sides.  She bucks back in surprise, impaling herself right on your " + describeCock(player, player.body.cocks.get(0)) + ".\n\n");

    CView.text("Edryn clops back, forcing you to stumble until Edryn has taken your cock up to the hilt inside her.  Your back slams against the wall and your hips buck into the centauress's slick fuckhole.  The horse-girl's cunt contracts around your shaft like a hot, silken vice, already starting to milk you.  You start to pump into her, withdrawing until your cock's only just parting her vaginal lips before thrusting hard up to the hilt");
    if (player.body.balls.count > 0) CView.text(", your sack slapping wetly against the bottom of her cunny");
    CView.text(".\n\n");

    CView.text("Atop the centaur, Hel scrambles back until her ample ass is level with Edryn's.  Her tail snakes out, wrapping around your waist before its hot, narrow tip pokes up against Edryn's tight backdoor.  Now with Helia's meaty tail wrapped tight around you, you're restricted to shorter thrusts into the centaur, which you make up for by increasing your speed, slamming into her tight depths with enough force to badly bruise any human.  At the height of one of your thrusts, Hel finally gets the tip of her tail through Edryn's tight asshole, pushing in just an inch and already making her mount scream in ecstasy.\n\n");

    CView.text("You decide to pull double-duty, and lean forward to bury your face between Hel's sexy thighs.  The salamander gasps as your tongue slides out, teasing her outer lips, flicking gently across her little clit before slipping into her boiling-hot slit.  You start to piston your hips and face in and out, picking up an unsteady rhythm as you fuck the centaur and salamander at once, assaulting their gaping cunts to the beat of Hel's slithering tail working in and out of Edryn's ass.\n\n");

    CView.text("It seems the double-attack is too much for poor Edryn to handle, however, and you grin ear to ear as she grabs her tits and bucks her hips, her forelegs collapsing as pleasure overtakes her.  Hel yelps and tumbles back, right out of your reach until her back slams into Edryn's human half.  Not willing to let the salamander go without release, you leap onto Edryn's hefty ass and slide down after her, hefting up your " + describeCock(player, cockThatFits) + " like a spear and ramming it right into Hel's waiting cunt.  She screams with pleasure and pain as your shaft rams up into her cervix, leaving your face smooshed between her tits.  You're about to start fucking her in earnest, but before you can, your ass is suddenly penetrated by Hel's long tail.  You yell aloud, suddenly entrapped by the salamander's burning cunt and sudden tail-fuck.\n\n");

    CView.text("You cum a moment later, grabbing Hel by the shoulders and thrusting as deep into her as you can.  You unleash the beast, spraying your cum into her womb with your last mighty blow.  Hel's head lolls back with the sensation of your cum filling her, and is soon moaning as she cums around you, milking the last of the cum out of your now-sore dick.\n\n");

    CView.text("The three of you lay in a heap, all panting and gasping, engulfed in pleasure and exhaustion.  You lean over to check on the centauress you just used as a bed, and are gratified to see that Edryn looks to have been fucked silly, her eyes crossed and tongue hanging lewdly from her mouth.  Leaning against her back, Hel's own mouth is agape as she breathes heavily, slowly fingering a bit of your cum from her stuffed snatch.  You withdraw from her and clamber down from the pile to stick your cock in Edryn's open mouth, using her to clean your shaft.\n\n");

    CView.text("When you're satisfied, you stumble and collapse against her horsebody, barely fighting off an intense urge to sleep.  The centauress moans contentedly, \"<i>Mmm, we should do this again sometime. You two were amazing.</i>\"\n\n");

    CView.text("\"<i>Oh yeah. We... We gotta go again sometime,</i>\" Hel agrees, nearly falling off Edryn's back.  You give each of the girls a long kiss before collecting your " + player.inventory.armor.displayName + " and walking off back to camp.\n\n");
    player.orgasm();
    helAffection(5);
    return { next: passTime(1) };
}

// Pregdryn:
export function findOutEdrynIsPregnant(player: Character): NextScreenChoices {
    CView.sprite(SpriteName.Edryn); // 14;

    CView.text("Edryn is lying down at her table, pensively circling a finger around a glass of water and poking listlessly at her plate of greens.  Her eyes keep glancing down or to the side every time you meet her gaze.  You've never seen the shameless centaur bothered like this, and you grab her by the shoulders to ask, \"<i>What's wrong?</i>\"\n\n");

    CView.text("She finally looks up at you, her large brown eyes wet with moisture, and explains, \"<i>I-I'm pregnant.  I saw the covenant about it and had them check with their magic.  You're the father.</i>\"\n\n");

    CView.text("The centaur blushes fiercely, blurting everything out in a rush now that she's started to talk, \"<i>I don't know how it happened!  I've been taking herbs to prevent this kind of thing, and I've NEVER heard of someone getting pregnant while they're on these.</i>\"  She gives her flank a gentle pat as she keeps speaking, \"<i>There's just something about your cum I guess!  Our child will be a centaur, just like her mom, and I intend to keep her.</i>\"\n\n");

    CView.text("<b>How do you react?</b>");

    let aroused;
    if (player.body.cocks.length > 0)
        aroused = arousedByPregdryn;
    // [Shocked] [Pleased] [Aroused (Requires Wang)]
    return { choices: [["Shocked", shockedByEdrynsPregnancy], ["Pleased", pleasedbyPregdryn], ["Aroused", aroused]] };
}

// Shocked
function shockedByEdrynsPregnancy(player: Character): NextScreenChoices {
    CView.sprite(SpriteName.Edryn); // 14;

    CView.text("You stammer for an answer, unsure of what to say in light of this startling revelation.  Edryn looks on the verge of tears and all you can do is struggle for words.  She grips the table, her knuckles turning white while her eyes flick from side to side in a panic.");

    CView.text("\n\n<b>What do you do?</b>");
    // [Accept it] [Reject it]
    return { choices: [["Accept It", shockedByPregdrynThenAccept], ["Reject It", beAnAssholeToPregdryn]] };
}
// Accept it
function shockedByPregdrynThenAccept(player: Character): NextScreenChoices {
    CView.sprite(SpriteName.Edryn); // 14;

    CView.text("Leaning forward, you grab hold of Edryn's hands and cradle them in your grip.  She looks back up at your eyes and reads your expression, breaking into a smile as she reads the feelings on your face.\n\n");

    CView.text("\"<i>Thank you!  You had me really going for a moment there, you know that?  Wow, that is a weight off my chest,</i>\" exhales Edryn.  She climbs up onto her hooves and whispers, \"<i>I've got to use the little ponies' room, I'll be right back lover,</i>\" before she departs.\n\n");

    // [To Pregnant Offer]
    return { next: pregdrynOffer };
}

// Reject it
function beAnAssholeToPregdryn(player: Character): NextScreenChoices {
    CView.sprite(SpriteName.Edryn); // 14;

    CView.text("You look the panicked centauress dead in the eye and explain that what she does with her body is her business, and you want nothing to do with it.  She stares dumbfounded for a split-second before her face colors red with rage.  Edryn screams, \"<i>GET THE FUCK AWAY FROM ME THEN!</i>\"\n\n");

    CView.text("Everyone in the bar turns to watch the commotion, and with an angry, hormonal centaur and this many eyes on you, it would be best to depart.\n\n");

    CView.text("<b>(Edryn will no longer speak with you.)</b>");
    EdrynFlags.EDRYN_NEVER_SEE_AGAIN = 1;
    // Use the 1 hour cheat thinger
    return { next: barTelAdre };
}

// Pleased
function pleasedbyPregdryn(player: Character): NextScreenChoices {
    CView.sprite(SpriteName.Edryn); // 14;

    CView.text("You crack into a smile and congratulate the lusty centaur.  She giggles with relief at your words and wipes a bead of sweat from her brow as you finish.  Edryn exclaims, \"<i>I'm so glad you're happy about this!  I don't expect you to drop your quest and move in with me or anything like that, but it'll be wonderful to hear the clipper-clopper of little hooves in this town.</i>\"\n\n");

    CView.text("Edryn pulls back from the table and stretches, her muscles visibly loosening as the tension oozes out of her imposing frame.  She whispers, \"<i>Be right back lover, I've got to make a stop at the little ponies' room,</i>\" before she departs.\n\n");

    // [To Pregger Offer]
    return { next: pregdrynOffer };
}

// Aroused
export function arousedByPregdryn(player: Character): NextScreenChoices {
    CView.sprite(SpriteName.Edryn); // 14;

    CView.text("You break into a grin bordering on lecherousness and congratulate the lusty centaur.  Her eyes widen for a moment, shocked from your expression, then narrow into a sultry expression.  Edryn teases, \"<i>I think someone has a bit of a pregnancy fetish, hrmm?  Is it the thought of my tits getting swollen with milk or the idea of me being jiggly and randy all the time that does it for you?</i>\"  She shivers, the outlines of her prominent nipples straining against her already-tightly-stretched tunic.  Edryn's eyes drop down and a rueful smile works its way across her face as she admits, \"<i>Great, now I'm turned on too!  Let me go use the little ponies' room. Then, MAYBE, we can help take care of each other.</i>\"\n\n");

    // [To Pregger Offer]
    return { next: pregdrynOffer };
}

// Pregger Offer
function pregdrynOffer(player: Character): NextScreenChoices {
    CView.sprite(SpriteName.Edryn); // 14;
    // Used to call post birthing sexings.
    if (!EdrynFlags.WOMB.pregnancy) {
        // Actually choose the sex scene
        return edrynSexSelecter(player);
    }
    // VERY Pregnant Offer
    if (EdrynFlags.WOMB.pregnancy.incubation < 250) {
        CView.text("Edryn struggles to move, practically waddling thanks to her swollen, pregnant belly.  As usual, the glistening black lips of her sex are on display, and with the hormones pouring through her, she's leaking a steady trail of slime.  The scent coming off her is unreal!  It's like it's reaching right into your brain and cranking the 'fuck' dial up to maximum.  ");
        if (player.body.cocks.length > 1) CView.text("All of your " + describeCocksLight(player) + " fill in seconds, growing rock hard and actually aching with their need.  ");
        else if (player.body.cocks.length === 1) CView.text("Your " + describeCock(player, player.body.cocks.get(0)) + " fills in seconds, growing rock hard and actually aching with need.  ");
        CView.text("You're totally dazed by the massive spike in arousal, and ");
        if (player.stats.cor + player.stats.lib < 100 || player.body.cocks.length < 1) CView.text("you struggle not to reach into your " + player.inventory.armor.displayName + " to touch yourself.");
        else {
            CView.text("you can't stop yourself from grabbing ");
            if (player.body.cocks.length === 1) CView.text("your ");
            else CView.text("a ");
            CView.text(describeCock(player, player.body.cocks.get(0)) + " and stroking it under the table.");
        }
        CView.text("\n\n");

        CView.text("You wouldn't notice her return if it wasn't for the increase in potent centaur pheromones hitting your nostrils.  It takes a hand slipping under the table to play with your ");
        if (player.body.balls.count > 0) CView.text(describeBalls(true, true, player));
        else if (player.body.cocks.find(Cock.HasSheath)) CView.text("sheath");
        else if (player.body.cocks.length > 0) CView.text(describeCock(player, player.body.cocks.get(0)));
        else CView.text("crotch");
        CView.text(" to rouse you from the incredible sexual haze.  ");
    }
    // Mildly pregnant offer
    else {
        CView.text("As usual, when Edryn pivots to leave, she gives you a perfect view of her unusual vagina.  The glistening black lips of her sex practically ooze moisture, and the scent coming off her seems even more potent than usual, making your head swim.  ");
        if (player.body.cocks.length > 1) CView.text("All of your " + describeCocksLight(player) + " fill in seconds, growing rock hard and actually aching with their need.  ");
        else if (player.body.cocks.length === 1) CView.text("Your " + describeCock(player, player.body.cocks.get(0)) + " fills in seconds, growing rock hard and actually aching with need.  ");
        CView.text("You're a little bit dazed by the sudden spike in arousal, and ");
        if (player.stats.cor + player.stats.lib < 100 || player.body.cocks.length < 1) CView.text("you struggle not to reach into your " + player.inventory.armor.displayName + " to touch yourself.");
        else {
            CView.text("you can't stop yourself from grabbing ");
            if (player.body.cocks.length === 1) CView.text("your ");
            CView.text("a ");
            CView.text(describeCock(player, player.body.cocks.get(0)) + " and stroking it under the table.");
        }
        CView.text("\n\n");

        CView.text("As usual, you're barely cognizant of her return.  It isn't until a hand sneaks under the table to surreptitiously fondle your ");
        if (player.body.balls.count > 0) CView.text(describeBalls(true, true, player));
        else if (player.body.cocks.find(Cock.HasSheath)) CView.text("sheath");
        else if (player.body.cocks.length > 0) CView.text(describeCock(player, player.body.cocks.get(0)));
        else CView.text("crotch");
        CView.text(" that you come out of your daze.  ");
    }
    // (NO WANGUUU)
    if (player.body.cocks.length === 0) {
        CView.text("She looks down, eyes fixing on your crotch for a moment before she sighs, \"<i>Why did you get rid of your dick?  I like you a lot, but I don't really want to have sex with you like you are now.</i>\"\n\nEdryn leaves looking a little depressed.");
        // Bar menu?
        cheatTime(1);
        return { next: barTelAdre };
    }
    // (MEETS SIZE REQUIREMENTS)
    let cockThatFits = player.body.cocks.find(Cock.CockThatFits(300));
    // -1 = none fit.  Set x to 0 for big boys.
    if (!cockThatFits) cockThatFits = player.body.cocks.get(0)!;
    if (cockThatFits.area >= 24 && cockThatFits.area < 300) {
        CView.text("Edryn is smiling radiantly as she continues to caress you under the table.  She asks, \"<i>");
        if (EdrynFlags.EDRYN_NUMBER_OF_KIDS === 0) CView.text("Does my scent have an even stronger effect on you now");
        else CView.text("Are you going to cum just from sniffing at my cunt");
        CView.text("?</i>\"  You try to deny it, but she pumps at your shaft and continues, \"<i>Don't lie dear, I can feel how hard you are now, and I DEFINITELY saw how dazed you were when I came back out.  Let's go back to my room so you can get another whiff, okay?</i>\"\n\n");

        CView.text("The centaur doesn't wait for a reply, and takes off at a trot towards her quarters.  A few drips have splattered across the floor, leaving a trail for you to follow.  You get up, dazed with arousal and leaking pre-cum, and stagger through the bar to her room, practically lust-drunk.");
        player.stats.lust += 50;

        // TO SEX!
        // return { next: fuckPregEdryn };
        CView.text("\n\nHow do you want to handle this?  ");

        CView.text("You could have some great, pregnant taur sex.");
        const choices: ScreenChoice[] = [];
        choices[0] = ["Preg. Fuck", fuckPregEdryn];
        if (player.body.cocks.sort(Cock.Largest).get(0)!.area >= 300) {
            CView.text("  Since at least part of you isn't acceptable to her, you could eat her out until you get off from her pheromones alone.");
            choices[1] = ["NoFitEating", jizzFromEatingPregdrynOut];
        }
        CView.text("  Or, you could go down on her until you're in a frenzy, then fuck her wildly.");
        choices[2] = ["Eat,Rut,Fuck", eatEdrynPussyLikeABawss];

        return { choices };
    }
    // (PC TOO BIG)
    else if (cockThatFits.area > 300) {
        CView.text("Edryn brushes her hand over ALL of your " + describeCock(player, player.body.cocks.get(0)) + " then jerks it back, startled.  She sighs, \"<i>Dear, that thing is a BEAST.  I mean, there's no doubt I'd love to get it inside me, but I promise it won't fit me.</i>\"\n\n");

        CView.text("She looks at you pleadingly and practically begs, \"<i>Please, find a way to fit me.</i>\"  Edryn grabs you by the shoulders and whispers in your ear, \"<i>Being pregnant makes me so turned on ALL THE TIME.  I need you inside me.</i>\"\n\n");

        CView.text("A thoughtful look crosses the centaur's face as she continues to pant in your ear, \"<i>Come on, lets go back to my room.  I'll find a way to tend to that monster if you'll eat me out.  Maybe the pheromones wafting off my cunt will get you off without me even touching you?  I've seen it happen before with some of my clients, and with how strong my scent is now...</i>\"\n\n");

        CView.text("Edryn releases you and climbs up on all fours, making her way towards her room in the back of the establishment.  The smell of her need hangs heavy in the air, and you follow it like a lost puppy.  Of course, puppies don't have their massive, rock-hard maleness visible to everyone around them.  Thankfully, you reach her door quickly, and bolt inside.");
        // Go to 'too big or too small eat out'
        player.stats.lust += 50;
        return { next: jizzFromEatingPregdrynOut };
    }
    // (PC TOO SMALL)
    else {
        CView.text("Edryn giggles, \"<i>When did you get this small?  I've seen ponies with bigger kits!</i>\" but her hand continues to stroke you.  You squirm in her grasp, about ready to burst.  The pregnant centaur teases, \"<i>Dear, I don't think I'd notice something that small if you stuck it inside me.</i>\"\n\n");

        CView.text("She laughs at the expression on your face and continues, \"<i>Oh don't be like that.  The truth is the truth.  You're still the father of my child.  Why don't we go back to my room?  You can eat me out till the centaur pheromones overpower your little dick and make it squirt, okay?</i>\"\n\n");

        CView.text("The centaur doesn't wait for a reply, and takes off at a trot towards her quarters.  A few drips have splattered across the floor, leaving a trail for you to follow.  You get up, dazed with arousal and leaking pre-cum, and stagger through the bar to her room, practically drunk on lust.");
        // Go to 'too big or too small eat out'
        player.stats.lust += 50;
        return { next: jizzFromEatingPregdrynOut };
    }
}

// Fucking
export function fuckPregEdryn(player: Character): NextScreenChoices {
    CView.clear();
    CView.sprite(SpriteName.Edryn); // 14;
    CView.image("edryn-preggo-fuck");
    let cockThatFits = player.body.cocks.find(Cock.CockThatFits(300));
    if (!cockThatFits) cockThatFits = player.body.cocks.get(0);

    // NONTAUR
    if (player.body.legs.type !== LegType.CENTAUR) {
        CView.text("Edryn lurches forwards as soon as the door closes behind you, slamming her powerful frame into you with enough force to propel you several feet back onto a large pile of pillows in the corner.  The feeling of her massive, milk-drooling teats ");
        if (player.body.tallness < 60) CView.text("bouncing against the top of your head");
        else if (player.body.tallness < 84) CView.text("battering your face");
        else CView.text("crushed against your chest");
        CView.text(" was totally worth the bruise-inducing impact.  Edryn pivots about, her hooves clattering noisily against the room's floorboards until she's presenting her hind end to you.  Her tail lifts of its own accord and displays the swollen, black lips of her sex.  A potent glaze of centaur-fluid drips from the gash in a steady trickle, splattering over your " + describeFeet(player) + " as your equine lover closes in.\n\n");

        CView.text("You tear off your " + player.inventory.armor.displayName + " in a flash, fully exposing your ");
        if (player.body.cocks.length > 1) CView.text("chosen ");
        CView.text(describeCock(player, cockThatFits) + ".  It drips with anticipation, leaking drops of pre-cum with each inhalation of your mate's over-sexualized slit's scent.  Edryn looks over her shoulder to gauge the distance, but when she sees your state her face breaks into a happy smile.  She says, \"<i>Steady now, we wouldn't want you to miss your target, would we?</i>\" as her backside slowly descends, splattering hot sexual fluids over your length.\n\n");

        CView.text("The centaur's gash devours your " + describeCock(player, cockThatFits) + " with a long, wet slurping noise.  Her body-heat is much warmer than your own, wrapping slippery heat around every sensitive inch of your fuck-pole.  The flesh around you squeezes and massages instinctively.  It feels so good that it seems as if your " + describeCock(player, cockThatFits) + " is going to melt under the onslaught of pleasure.  Edryn moans loudly and begins to pump her hips atop you, \"<i>Oooh yes, thats perfeeeect...</i>\"\n\n");

        CView.text("Heavy thuds echo as hundreds of pounds of pregnancy-enhanced centaur backside are slammed into you over and over.  Were it not for the pillows absorbing some of the force, your pelvis would have been crushed with Edryn's first movement.  Her juices splatter with each rough fuck, soak your chest, and squirt up to your face.  You lie under her and moan, pumping back against her, but she doesn't even notice!  Her motions are backed up with more weight than your entire body, and her rough, pumping fuck only gets more and more intense.\n\n");

        CView.text("You grab hold of her tail and pull yourself against her with all of your strength, slamming your body into her cunt as brutally as possible.  Your own orgasm is just a moment away, and Edryn's pleasured moans and whinnies reach an ecstatic crescendo.  Her cunt squeezes you tightly, the hot vice milking you hard, and forcing your climax on the spot.  It squeezes tightly at the base, then ripples pressure to the tip, drawing explosive bursts of cum from your sexually brutalized member.\n\n");

        CView.text("Edryn sinks down, her whole body shaking and shuddering while milk fountains from her swollen breasts.  Her hands reach up to grab her nipples and tug on the milk-spouts.  They look longer now than before her pregnancy.  Her bloated milk-spouts are at least an inch or two long!  ");

        if (player.cumQ() < 100) {
            CView.text("Your " + describeCock(player, cockThatFits) + " dumps the last of its seed into her hungry cunt and softens slightly.  Her warm cunt's constant milking motions continue, still pleasurable, but they prevent you from going soft until the centaur's orgasm has concluded.");
        }
        else if (player.cumQ() < 500) {
            CView.text("Your " + describeCock(player, cockThatFits) + " spurts thick flows of seed into her hungry cunt, flooding her snatch with an abnormally large load of semen.  Her warm cunt's constant milking motions continue, forcing more and more of your spunk inside her until her own orgasm has concluded.");
        }
        else {
            CView.text("Your " + describeCock(player, cockThatFits) + " erupts, pouring a thick wave of seed into the centaur's hungry cunt.  The constant milking motions don't let up while Edryn's orgasm continues, helping you flood her with even more spooge.  Even after your pregnant lover's orgasm has concluded, your " + describeCock(player, cockThatFits) + " keeps dumping more cum into her until it's soaking and dripping from her huge, furry ass.");
        }

        CView.text("\n\n");
        CView.text("You give her over-sized ass a gentle squeeze, massaging it lightly while Edryn comes back down from the wonderful sex.  She looks back at you and pants, \"<i>By Marae I needed that.</i>\"\n\n");

        CView.text("The centaur raises her back half up with a long wet 'schliiiiick'.  You pop free with a gasp and are given a perfect view of your work.  Her pussy's lips are slightly parted and glazed with a coating of white fluid.  The black-lipped cunt continues to drool sticky, sexual slime, but the color has gotten a bit more opaque thanks to your contributions.  The smell of sex fills the room, making your " + describeCock(player, cockThatFits) + " stiffen again.\n\n");

        CView.text("Edryn leans against the wall, panting and looking back at you.  She gives an exhausted smirk but doesn't look like she could handle another round.  You start to shiver; without the warmth of her love-tunnel wrapped around you, the room seems that much colder.  Glancing over, you find your equipment and put it on.  It's difficult to dress with an audience's rapt attention, but you manage to pull it off.\n\n");

        CView.text("After gathering your pouches, Edryn looks to have recovered.  She advances on you and wraps her arms around you, smashing your face squarely between her milk-filled tits.  You can smell the liquid dripping from her nipples.  It makes you happy to know your daughter will have such a bounty to feed on as she grows.  Edryn thanks you, \"<i>That was wonderful dear.  I'll probably be horny and soaked again in a few minutes, so please, come back soon.  I'm going to be a sopping wet mess until our child is born.</i>\"");
    }
    // TAURZILLA
    else {
        CView.text("Edryn smiles at you as you close the door behind you.  She stretches and lays out on a large batch of pillows, using them to help support the added weight of her pregnancy.  Her hindquarters are facing towards you, and she twists back to give you a 'come-hither' gesture.  You hesitantly climb down into the soft, padded mass with her and align your body behind hers.  Her position is perfect, and you wrap your arms around her 'human' waist to drag your horse-half into position.  Edryn grabs your face and pulls you into a kiss, her archery-strengthened arms easily maintaining their grip as the two of you get settled into place.\n\n");

        CView.text("You break the kiss and suck the bottom of her earlobe into your mouth, straining to keep your mouth steady as you pull your " + describeCock(player, cockThatFits) + " into position with her needy sex.  The " + describeCockHead(cockThatFits) + " slips into the hot folds, forcing a gasp from your lips that lets Edryn's earlobe escape its oral prison.  She smirks, then nibbles at your shoulder while you slide the rest of the way into her large, slippery channel.  It's a near perfect fit thanks to your similar body types, and the both of you sigh out whinnies of pleasure.\n\n");

        CView.text("Edryn bites down harder, sending a jolt of pain through your shoulder.  Her hips wiggle against yours, and she begins rhythmically clenching and relaxing her entrance, squeezing you tightly ");
        if (!player.body.cocks.find(Cock.HasSheath)) CView.text("by the base");
        else CView.text("just above your sheath");
        CView.text(".  The horse half of your body arches, pulling your " + describeCock(player, cockThatFits) + " partway out, then lurches back forward to bury it deep inside her.  The impact jiggles her flesh from her ass to her shoulders, and you feel it underneath you as an instinctual, barely thought sign of sexual dominance.\n\n");

        CView.text("The centauress pulls back and moans, \"<i>Oh gods yes, it feels so much better pregnant!  My pu-pu-ahhhh-ussy is so much WETTER.  It's like I've got a faucet back there!  And I'm soo-ohhhh sensitive!  Ung fuck " + mf(player, "stud", "dear") + " don't stop.  Please don't stop!</i>\"\n\n");

        CView.text("You grunt from the force of your exertions and begin to fuck her a little more roughly.  Your arms squeeze tightly around her midsection with a mixture of affection and need as you fulfill her request.  You pound her swollen, dripping cunt with hard strokes that make your intertwined forms shiver, dislodging a few pillows.  Scrabbling noise fills the air.  Your hooves are scrambling for purchase, but there's no traction.  Lying sideways in the pillows with your pregnant lover prevents you from fucking quite as hard as your body would like.\n\n");

        CView.text("Her slippery, silken tunnel feels wonderful as it contracts and squeezes your maleness with vice-like tightness.  Edryn's mouth hangs open, and as her eyes start to cross, you can feel the passage intensifying its muscular twitches.  She's on the brink of orgasm, but you aren't too far behind her.  You pull one arm up to her head and kiss her, running your tongue over her lips before sliding it inside to tangle with hers.  She undulates underneath you, convulsing as she reaches her peak.  Her juices erupt, splattering over your thighs");
        if (player.body.balls.count > 0) CView.text(" and " + describeBalls(true, true, player));
        CView.text(".  Her twat clutches you so tightly that you're immobilized for fear of hurting yourself, and the tight seal of her entrance acts as a cock-ring, actually bloating your " + describeCock(player, cockThatFits) + " inside her.\n\n");

        CView.text("Your " + describeCock(player, cockThatFits) + " is milked from ");
        if (!player.body.cocks.find(Cock.HasSheath)) CView.text("base");
        else CView.text("sheath");
        CView.text(" to " + describeCockHead(cockThatFits) + ", culminating in a tight squeeze at the tip. Then it releases and starts all over again.  Instinctively, you whinny and explode inside the warm, soaking wet tunnel.  The french-kiss turns into a feverish slobber-fest while the two of you mate, lost to orgasm.");
        if (player.cumQ() < 300) { }
        else if (player.cumQ() < 1000) CView.text("Your prodigious jism output soaks her sloppy tunnel and drips from the entrance with the centauress' girlcum.");
        else {
            CView.text("Your body's cum-production easily fills her channel to capacity.  Each successive spurt blasts a wave of fluid out from her overstuffed cunt, soaking the pillows, Edryn's ass, and your crotch.");
            if (player.cumQ() >= 4000) CView.text("  By the time you calm down you've soaked all the pillows and spooge is puddling underneath.");
        }
        CView.text("\n\n");

        CView.text("Edryn breaks the kiss with a strand of spit hanging in the middle.  She giggles euphorically, \"<i>Wow.  Ummm, wow!  That was nice!  Now get off me you ");
        if (player.body.tallness > 74) CView.text("big ");
        CView.text("lug!</i>\"  She playfully pushes you back and tries to drag herself out from under you.  You laugh with her and pull back, letting your softening " + nounCock(CockType.HUMAN) + " pull free from her cum-glazed twat.  It escapes with a wet squish, releasing a torrent of centaur cum from the unplugged opening.\n\n");

        CView.text("After you both get a chance to stagger up to your feet and get dressed, Edryn thanks you, \"<i>That was wonderful dear.  I'll probably be horny and dripping again in a few minutes, so please come back soon.  I think I'm going to be a sopping wet mess until our child is born.</i>\"\n\n");
    }
    player.orgasm();
    player.stats.sens += -.5;

    return { next: passTime(1) };
}

// EAT THE BITCH'S CUNT OUT
function jizzFromEatingPregdrynOut(player: Character): NextScreenChoices {
    CView.sprite(SpriteName.Edryn); // 14;

    let cockThatFits = player.body.cocks.find(Cock.CockThatFits(300));
    if (!cockThatFits) cockThatFits = player.body.cocks.get(0)!;

    CView.text("You shut the door behind you and rub your eyes, trying to adjust to the darkness in the room.  All the lights are out, save for a single candle on the far wall.  You peer about uselessly for a few seconds until inspiration strikes.  Her potent scent will lead you to her!  You lean down and start turning from side to side, sniffing about.  You hear a feminine giggle, though with the unfamiliar room you can't tell where it's originating from.  It's fairly easy to scent out your 'prey', and you've already determined from the strength of pussy-musk which corner of the room Edryn's in.\n\n");

    CView.text("The smell is potent, sexual, and thoroughly inhuman.  You take a step closer and continue taking little sniffs, barely noticing as your ");
    if (cockThatFits.area < 24) CView.text("small dick begins to twitch and leak.");
    else CView.text("mammoth cock drags the ground, leaking pre-cum.");
    CView.text("  The urge to find the juicy, potent pussy at the center of the musk-cloud overrides your thoughts.  Stalking forwards in a haze of desire, you take deeper and deeper breaths, inhaling ever-greater quantities of Edryn's heavenly scent.  You know you're almost there – you can hear her quiet breathing.\n\n");

    CView.text("You're so lost in desperate need that your hurried steps get you in trouble.  Your " + describeFoot(player) + " catches on something, and you fall inexorably forwards.  In a panic, you windmill your arms.  One slaps into fur-covered flesh with a loud 'SLAP', the other disappears into a mass of soft, yielding fabrics.  The pillows catch you, absorbing the fall, but your face splats directly into something warm, wet and aroused.  Edryn gasps and exclaims, \"<i>No need to be so rough about it!  I thought you might like some hide and seek... your dick seemed to like it, and I needed a moment to catch my breath.  It's not easy carrying your child around!</i>\"\n\n");

    CView.text("Her words fall on deaf ears.  You push yourself up onto your elbows and lean forward, feeling strands of female lubricant hanging from your face as you inhale deep lungfuls of her scent.  ");
    if (player.body.cocks.length > 1) CView.text("Each of y");
    else CView.text("Y");
    CView.text("our " + describeCocksLight(player) + " ");
    if (player.cumQ() < 100) CView.text("drips pre-cum onto the pillows.");
    else if (player.cumQ() < 500) CView.text("leaks pre-cum in a steady stream, quickly soaking a few pillows.");
    else CView.text("pours out enough pre-cum to soak a pillow, and in no time your overenthusiastic dick is doing its damnedest to dribble over everything.");
    CView.text("  It's a powerful smell.  The centaur's heady musk already has you on the edge, and you haven't even tasted her slit yet!  Your heart beats hard, as you grab onto her flanks with each hand and prepare to service your pregnant lover.\n\n");

    CView.text("After being in the dark room for so long, your eyes have adjusted to the dim light.  Mere inches in front of you is Edryn's massive slit.  Its black folds are coated in a thick layer of slime that trails down to her bulbous clit, collecting before dripping off.  You lean forward, take a long, deep breath, and then smash your face into the gash.  Your tongue darts out, practically of its own accord, lapping at her inner folds and tasting the sweet, tangy nectar she drips.  The warmth is palpable, and the air is practically steaming with the heat of Edryn's desire as  you rub your face up and down the slit.  You lick and slurp at the slippery sweetness of her desire, but it never seems to be enough for you or your drooling " + describeCocksLight(player) + ".\n\n");

    CView.text("Squirming and writhing, Edryn moans, \"<i>Yessssss... right-ahhh-there.  Mmmm... I think you're hooked on my cunt, aren't you?</i>\"  She stretches back to pat your head and coos, \"<i>Yes that's a good " + mf(player, "boy", "girl") + ", lap it allll up.  Oh my, you're dripping like a sieve just from eating me out!  Oooh yeah, lower, lick my cliiiiit-yes yes-ooooh... Mmm I bet the smell is just overwhelming you isn't it?  Why don't you suckle my clit and take a quick breather.  I bet you'll be spurting helplessly in no time.</i>\"\n\n");

    CView.text("You tremble as you pull away, licking her lust from your lips and gasping for air as you shift to lick at her clit.");
    if (player.body.legs.type === LegType.CENTAUR) {
        CView.text("  Your hooves twitch weekly on the floor, forgetten about as you focus entirely on your hands, mouth, and pulsating " + nounCock(CockType.HUMAN));
        if (player.body.cocks.length > 1) CView.text("s");
        CView.text(".");
    }
    CView.text("  Her button, like her pussy, is many sizes larger than a human's, and it's as big around as a golfball and several inches long.  You suck it into your lips and plunge a hand inside her slippery channel, fisting her while you suckle and bob on her clit.  Edryn whinnies and clenches around the invading fist.  Her cunt erupts and splatters your face with fluid, soaking you with her fragrant scent.\n\n");

    CView.text("Startled from your sexual fog, you jerk back and gasp.  The smell – it's like sex distilled into orgasm and fired straight into your brain.  Your " + describeHips(player) + " shake uncontrollably, spasming wildly as your scent-addled mind sets off a full-body orgasm.  ");
    if (player.body.vaginas.length > 0) {
        CView.text("Your " + describeVagina(player, player.body.vaginas.get(0)) + " contracts and spasms with the rest of you, ");
        if (player.body.vaginas.get(0)!.wetness === VaginaWetness.SLAVERING) CView.text("squirting");
        else CView.text("leaking");
        CView.text(" in a pale imitation of Edryn's box.  ");
    }

    CView.text("Cum begins to ooze from ");
    if (player.body.cocks.length > 1) CView.text("each of ");
    CView.text("your " + describeCocksLight(player) + " in a steady stream.  Your urethra bulges and flexes, forcing you to waste your seed all over Edryn's pillows.");
    if (player.cumQ() < 1000) {
        CView.text("  The flow gets thicker and thicker.  Edryn even remarks, \"<i>Oh my, my baby's daddy is just full of cum!  Let it all out for me dear, you did such a good job on my clit that you deserve release.</i>\" You squirt and dribble, breathing airborne orgasm and squirting ");
        if (player.cumQ() < 3000) CView.text("out the last of your liquid pleasure.");
        else CView.text("ever greater amounts of liquid peasure.  Jism drips through the floorboards as you create a puddle a few inches deep.");
    }
    CView.text("\n\n");

    CView.text("Edryn laughs and hauls you up to embrace a tight hug.  She whispers in your ear, \"<i>Thank you for being so understanding.  I'm not normally this... sensitive, or potent.  You can keep doing this while I'm pregnant, but you'll need to fit me if you want any more sex after our child is born.</i>\"\n\n");

    CView.text("You nod and give her milk-dripping teat a squeeze.  A squirt of the white stuff escapes before Edryn pushes you away.  You chuckle and get dressed while she does the same, but before you can escape her room, she lifts her shirt, squeezes a teat, and catches you in the face with her milk.\n\n");

    CView.text("\"<i>Turn-about is fair play!</i>\" she exclaims. You leave, unable to dispute the logic.");
    player.orgasm();
    player.stats.lib += 1;
    player.stats.sens += 2;

    return { next: passTime(1) };
}

function edrynPregChance(player: Character) {
    // Get out if already pregged.
    if (EdrynFlags.WOMB.pregnancy) return;

    // See if any of the scenarios get her preg
    let preg: boolean = false;
    /*
    //25% chance if 'stud'
    if(player.hasPerk("Marae's Gift - Stud") >= 0 && randInt(4) == 0) {
        preg = true;
    }
    //10% chance if elf xmas
    if(player.hasPerk("Elven Bounty") >= 0 && randInt(10) == 0) {
        preg = true;
    }*/
    // 1% chance per 500mLs of cum, max 5%
    let temp = player.cumQ() / 500;
    if (temp > 5) temp = 5;
    temp += player.virilityQ() * 200;

    // trace("Edryn Preg Check Virility Score: " + temp);
    if (player.cumQ() > 250 && temp >= randInt(100)) {
        preg = true;
        // trace("Edryn knocked up!");
    }
    // else trace("Edryn not knocked up!");
    if (preg) {
        EdrynFlags.WOMB.knockUp(PregnancyType.PLAYER, IncubationTime.CENTAUR + 80);
        EdrynFlags.EDRYN_PREGNANT_AND_NOT_TOLD_PC_YET = 0;
    }
}

// Male PC + Edryn, preferred at camp with preggo variance + bonus if some BJ, scent-induced rut
// have the Scene taking place in Tel'Adre instead of the PC's Camp.
// Cunt tastes tangy and sweat.
// Cunt is warmer than human
// Strong pussy that can squeeze tight enough to hold you still.
// During orgasm contracts into cock-milking rings that happen so fast and so frequently you can't even track them
// Intro:
function edrynFucktroduction(player: Character): NextScreenChoices {
    CView.clear();
    CView.sprite(SpriteName.Edryn); // 14;

    let cockThatFits = player.body.cocks.find(Cock.CockThatFits(300));
    if (!cockThatFits) cockThatFits = player.body.cocks.get(0);
    let cost: number = 0;
    switch (EdrynFlags.TIMES_PC_SEXED) {
        case 0:
            cost = 200;
            break;
        case 1:
            cost = 100;
            break;
        case 2:
            cost = 50;
            break;
        case 3:
            cost = 25;
            break;
        case 4:
            cost = 0;
            break;
        default:
            cost = 0;
            break;
    }
    if (!player.body.legs.isTaur()) {
        if (cost > 0) CView.text("Coins exchange hands and her arm finds its way back inside your " + player.inventory.armor.displayName + ", pulling you towards a back room.  A round of chuckles chases you through the bar room until they're silenced by the heavy thud of a door closing behind you.  You're pushed against the wall hard enough to make your teeth click.  The stars gradually clear from your view, revealing a massive gash, drooling with clear feminine slime.  The scent assails you, ");
        else if (EdrynFlags.EDRYN_NUMBER_OF_KIDS === 0) CView.text("Her arm finds its way back inside your " + player.inventory.armor.displayName + ", pulling you towards a back room.  A round of chuckles chases you through the bar room until they're silenced by the heavy thud of a door closing behind you.  You're pushed against the wall hard enough to make your teeth click.  The stars gradually clear from your view, revealing a massive gash, drooling with clear feminine slime.  The scent assails you, ");
        else CView.text("A round of chuckles chases you through the bar room until they're silenced by the heavy thud of a door closing behind you.  You're pushed against the wall hard enough to make your teeth click.  The stars gradually clear from your view, revealing a massive gash, drooling with clear feminine slime.  The scent assails you, ");
        if (player.body.cocks.get(0)!.type === CockType.HORSE) CView.text("making your " + describeCock(player, cockThatFits) + " twitch and ache.  It floods your body with animalistic desires, overpowering any sense of propriety you might have once had.");
        else CView.text("overpowering you with strange lust.  As turned on as you are, it's difficult not to enjoy this.");
    }
    // TAUR
    else {
        if (cost > 0) CView.text("Coins exchange hands and she grabs you, pulling you back towards a darkened doorway in the rear of the bar.  A round of chuckles chases you through the bar room until they're silenced by the heavy thud of a door closing behind you.  Edryn turns away from you, exposing her massive gash, drooling with clear feminine slime.  The scent assails you, ");
        else CView.text("She grabs you, pulling you back towards a darkened doorway in the rear of the bar.  A round of chuckles chases you through the bar room until they're silenced by the heavy thud of a door closing behind you.  Edryn turns away from you, exposing her massive gash, drooling with clear feminine slime.  The scent assails you, ");
        if (player.body.cocks.get(0)!.type === CockType.HORSE) CView.text("making your " + describeCock(player, cockThatFits) + " twitch and ache.  It floods your body with animalistic desires, overpowering any sense of propriety you might have once had.");
        else CView.text("overpowering you with strange lust.  As turned on as you are, it's difficult not to enjoy this.");
    }
    // NEW
    CView.text("\n\nHow will you have her?  You could fuck her.  Or, you could eat her out until you're going crazy with sexual need and completely lose control.");
    // [Fuck] [Eat Her Out]

    const choices: ScreenChoice[] = [];
    choices[1] = ["Eat Her Out", eatEdrynPussyLikeABawss];
    if (player.body.legs.isTaur()) choices[0] = ["Fuck", fuckEdrynTaur];
    else choices[0] = ["Fuck", fuckEdrynNonTaur];

    return { choices };
}

// Eat Her Out Till Shit Goes Crazy
export function eatEdrynPussyLikeABawss(player: Character): NextScreenChoices {
    CView.clear();
    CView.image("edryn-eat-her-out");
    let cockThatFits = player.body.cocks.find(Cock.CockThatFits(300));
    if (!cockThatFits) cockThatFits = player.body.cocks.sort(Cock.Smallest).get(0);
    const secondCockThatFits = player.body.cocks.filter(Cock.CocksThatFit(300)).get(1);
    CView.text("Edryn starts to say something, but you strip out of your [armor] before she gets more than a half-dozen words out, your " + describeCocksLight(player) + " jutting proud and erect, leaking clear streams of pre-cum down ");
    if (player.body.cocks.length === 1) CView.text("its underside");
    else CView.text("their underside");
    CView.text(".  You smile mirthfully when you realize Edryn is actually blushing, and beet red at that!  Her hindlegs prance nervously around as she studies you over her shoulder, and her tail won't stop the steady back-and-forth swish that sends more of the boner-fueling musk towards your nose.");
    if (EdrynFlags.WOMB.pregnancy) CView.text("  You can tell that since she's gotten pregnant her pheromones have become more potent, but that's little more than a dim note on a forgotten chalkboard to your brain.  It's impossible to think about measuring the potency of anything that isn't your own tool in such a swelteringly hot atmosphere.");
    else CView.text("  You note that the smell seems more powerful in an enclosed space, but that's little more than a dim note on a forgotten chalkboard to your brain.  It's nigh-impossible to think about anything but plunging yourself [sheath] deep inside her when exposed to her scent this strongly.");

    CView.text("\n\n\"<i>Are you going to fuck me, or just stare at my pussy all day?</i>\" the blushing centaur teases as she takes mincing steps towards you, back end first.  \"<i>I'm okay with either, provided you let me grind it on you until I'm satisfied.</i>\"");

    CView.text("\n\nSmirking, you tell her that while you do intend to bury yourself in her massive, swollen gash, you don't intend to be a spectator in these sexual proceedings.  Her pussy better be ready for a thick creampie, because you're going to drink in her aroma until you can't help but pound her raw.  The slutty centauress raises an eyebrow at that suggestion, but you can see a ");
    if (EdrynFlags.TIMES_EATEN_EDRYN_PUSSY_RUT === 0) CView.text("smile tugging at the corners of her mouth at your bravado");
    else CView.text("lecherous grin spreading across her face as she remembers the last time you did this");
    CView.text(".");

    CView.text("\n\nEdryn trots closer and says, \"<i>Then you'd best eat up hon, 'cause I got you a four course meal.</i>\"  Her swollen pussy is just inches away from you now.  The black lips part slightly before you, winking slowly as moisture begins to run from the bestial entrance, visibly fogging the air before you.  A web of girlish goo hangs across the slightly-spread entrance, and after one last inhalation of her almost sweet scent, you dive on in.  Your nose is the first casualty of your aggressive war on centaur-cunt, slurped down by the hungry folds as soon as you're pushing up against them.  You keep pushing until your mouth has slipped through the moist, sticky veil that hangs across her vagina, kissing her fat-lipped horse-pussy with gusto while you let your tongue slither out to play.");

    CView.text("\n\nAt the first lick, Edryn gets palpably wetter.  Sloppy juice washes out from inside her, covering your cheeks and chin before dripping off onto your [chest], leaving you marked with her feminine odor.  ");
    if (player.body.tongue.type > TongueType.HUMAN) CView.text("She's not even begun to taste the fruits of your talents, and you let your long, long tongue spool out inside her, pressing hard on her walls and tenderly flicking across each sensitive fold inside her.  ");
    CView.text("The busty, animalistic woman moans unashamedly, hands going to her breasts to squeeze them, her clit filling up to its full size.  You can feel the sensitive nodule plump up against the top of your mouth, so you open wide enough to give it a quick suck before returning to polishing her innards.  After that the equine pleasure-buzzer gets rock-hard and continues to bulge meaningfully against you, pulsing hotly in your mouth.");
    CView.text("\n\nYou sway dizzily on your [feet] as you try to focus on just basking in her pussy's delicious... potent... sexy aroma.  [EachCock] is lifting needily with every passing second.  ");
    if (player.body.cocks.length === 1) CView.text("It's");
    else CView.text("They're");
    CView.text(" so full that your hardness becomes almost painful, and each twitch of your girthy length makes you wish that you could just nestle it inside her - anything to assuage the hurtful levels of desire that have arisen within you.  Breathlessly, you pull back for a gulp of air.  It's so full of Edryn's scent that it's almost choking in strength, so sweet and wet... and utterly feminine.  You put a hand against the wall as you try to stay upright, whimpering with animalistic desire, so perfectly rigid and ready for a cunt.");

    CView.text("\n\nSmashing right back into her sweet puss, you pull her rubbery horse-lips apart and begin a fresh assault on her pussy.  You're munching on her box like a wild" + mf(player, "man", "woman") + ", utterly without concern for anything beyond your own rapacious and half-forgotten desire to lick her again and again.  She's a wet, ready mare, and you're a male");
    if (player.gender !== 1) CView.text(", or close enough to it");
    CView.text(".  A red, lusty haze has started to cling to the edges of your vision even when your eyes are closed, and you swear you can see the outline of her immense, onyx twat through your eyelids.");
    CView.text("\n\nEdryn abruptly whinnies, and her cunt spasms on your tongue, clenching down with incredible, muscular tightness.  Rings of convulsing muscle run all over it, pulling from her entrance towards what can only be her womb, and as she splatters your face with her musky juices, all you can think about is how wonderful it would feel to have it doing that to your " + describeCock(player, cockThatFits) + ".  You lap at the tangy fruit of your labor as a wave of it is washed over your head, drinking as much of her lady-spunk as your throat will allow, so fixated on cunt your brain can do nothing but dumbly force you harder against it, even though it isn't your dick doing the penetrating.  You've fallen into a thought-crushing rut, one that's steadily erasing every other concern from your consciousness.");

    CView.text("\n\nEdryn trots away on wobbly legs after her long, wet cum finally finishes, saying, \"<i>Mmm, that WAS a good cum, but I thought you were going to-URK!</i>\"  She grunts as you slam your " + describeCock(player, cockThatFits) + " straight into her cunt");
    if (secondCockThatFits) CView.text(" and your " + describeCock(player, secondCockThatFits) + " into her asshole");
    CView.text(".  Her ");
    if (EdrynFlags.WOMB.pregnancy) CView.text("milky tits, swollen from her pregnancy,");
    else CView.text("big tits");
    CView.text(" bounce around ludicrously, their owner too insensate from your forceful insertion to attempt to restrain them");
    if (EdrynFlags.WOMB.pregnancy) CView.text(" as they drip milk everywhere");
    CView.text(".  You grab hold of her gigantic, equine ass with one hand and her exotic tail with the other and push harder against her until her slick, welcoming moisture is wrapped around you on all sides");
    if (secondCockThatFits) CView.text(" and clenching tightness is wreathing your other erection");
    CView.text(".  You growl savagely as you feel her inhuman warmth squeezing from all sides.  Flexing tightly, the myriad strong muscles that make up the girl's horse-like hindquarters all compress around you at once, utterly immobilizing you.");

    CView.text("\n\nYou whine piteously - the need to fuck and breed her is overwhelming, but to move now only invites pain.  Edryn chuckles, \"<i>Baby, you can't surprise a girl like that.  Now, don't go too crazy, and I'll let you go, okay?</i>\"  You lean across her furry back, soaking up her warmth as you nod into her muscular animal-half.  Yes, anything... anything to fuck her again.  \"<i>Okay then.</i>\"");

    CView.text("\n\nLike magic, the crushing pressure is gone, and you're free to plumb her depths with wanton abandon.  You groan throatily as you begin to hump her again, this time taking it slow enough not to rouse her ire, your hands wrapping halfway around her ");
    if (EdrynFlags.WOMB.pregnancy) CView.text("baby-filled ");
    CView.text("middle for support, [legs] dangling slightly above the ground as you twist to ram your [cocks]");
    CView.text(" inside.  Slurps and squishes echo through the small room while you work Edryn's gushing, well-lubed gash.  Moaning excitedly, the horse-girl is starting to get into it, and you gradually pick up your tempo until your [hips] are clapping wetly against her soaked haunches.  She whickers and glances back over her shoulder, blushing so red you briefly wonder if you're fucking a demoness.");

    CView.text("\n\nWithout warning, her cunt abruptly squeezes down again, not as hard as before, but enough to cause you a modicum of pain as you saw through her drizzling nethers.  The 'splat-splat-splat' of her lusty moisture falling grows ever louder as you plow through her glittering gates.  She's getting wetter and wetter, soaked with girl-cum.  Her secretions combine with the increased tightness to overwhelm your endurance, and with her high body temperature, it feels like your dick is little more than a wax candle, melting into a puddle of white, orgasmic goo.");

    CView.text("\n\nArching your back, you allow the palpable relief to wash through you, bubbling lust pumping out from your [balls] to flood the poor centaur's slippery, equine slit.  You ejaculate with forceful lurches of your [hips], matching each rope of creamy jism by burying your " + describeCock(player, cockThatFits));
    if (secondCockThatFits) CView.text(" and " + describeCock(player, secondCockThatFits));
    CView.text(" to the");
    if (secondCockThatFits) CView.text("ir");
    CView.text(" hilt");
    if (secondCockThatFits) CView.text("s");
    CView.text(".  The blissful relief that washes through you obliterates conscious thought and replaces it with creamy, placid warmth, causing your eyelids to droop heavily and your tongue to hang limply from your mouth while you pump the squirming centaur full of sperm.  You feel like a happy, bottomless well of semen, with immense, untapped reserves still left to dispense.  Clearly, your rutting body has gone into overdrive, and before long Edryn's ebony cunt is drizzling white cream onto the ground.");
    if (!EdrynFlags.WOMB.pregnancy) {
        CView.text("  Her empty womb takes in the spermy deposits with aplomb, though you start to worry when you feel her sides bulge out thanks to her stretching middle.  Edryn's legs give out, and her pussy starts to constrict tighter, squeezing into concentric rings that move from her entrance towards her cervix, squeezing hot loads straight into that well-creamed womb.  You keep bouncing on her ass as best you can, too pleasured to care, not stopping until your dick goes dry and the jism is soaking Edryn's entire back half.");
        if (secondCockThatFits) CView.text("  Her ass is in a similar state.  It's so pressurized with jizz that it squirts out of her with each contraction.");
    }
    else {
        CView.text("  With her womb plugged with your offspring, the spermy deposits have nowhere to go.  Even when Edryn's cunt squeezes down into a series of concentric rings, all tugging your cum towards her cervix, there's nowhere for it to go, and it washes out around you, wasted.  The horse-girl's ass-half is soaked with the stuff, alabaster with cum and musky horse-jizz.");
        if (secondCockThatFits) CView.text("  Her butthole gets a similar treatment, filled enough that it's squirting your jizz back out with each contraction the centauress makes.");
        CView.text("  Even after all that, she milks you until you're completely dry, and then some.");
    }
    CView.text("\n\nYou slump down upon her fuzzy back as Edryn rolls sideways onto some nearby cushions, lewdly moaning as her eyes flutter closed, drifting into an exhausted slumber.  Dipping down into closure, your eyelids decide that you should join her.  Her pheromones are still heavy in the air, however, and even in slumber, you feel your [balls] refill and your [hips] begin to pump your cock through that slippery channel once more.");
    CView.text("\n\n'<b>Squish-squish-squish-squish-</b>' can be heard for several hours by anyone lucky enough to hold their ear to the door.");
    // [Next]

    player.orgasm();
    player.stats.lib += .25;
    player.stats.sens += -3;

    return { next: postEdrynEatOutRut };
}

function postEdrynEatOutRut(player: Character): NextScreenChoices {
    CView.clear();
    CView.text("When Edryn and you wake, your genitals are so sore and sensitive that getting cleaned up is almost painful.  The centauress even goes so far as to comment that she'll have to pay someone to mop up the mess, but there's a proud twinkle in her eye.  Somehow, your [armor] got splattered with vaginal juices during the sexcapade, and as you put them back on, [eachCock] regains its familiar hardness.  You chew on your lower lip as you slip out after saying goodbye, rock-hard and smelling totally of Edryn's lust.  A limited applause goes up at your departure, mixed with hooting and catcalls.  What a fuck!");

    player.stats.lust += 20 + player.stats.lib / 5;

    edrynPregChance(player);
    edrynPregChance(player);
    edrynPregChance(player);
    EdrynFlags.TIMES_EATEN_EDRYN_PUSSY_RUT++;
    return { next: passTime(4) };
}
