import { Flags } from 'Engine/Flags';
import { ClickFunction, NextScreenChoices, choiceWrap } from 'Engine/Display/ScreenDisplay';
import { EffectType } from 'Content/Effects/EffectType';
import { Time } from 'Engine/Utilities/Time';
import { CView } from 'Engine/Display/ContentView';
import { randInt } from 'Engine/Utilities/SMath';
import { Settings } from 'Content/Settings';
import { Character } from 'Engine/Character/Character';
import { SpriteName } from 'Content/Display/SpriteName';
import { passTime } from 'Content/Scenes/PassTime';
import { mf } from 'Content/Descriptors/GenderDescriptor';
import { Cock, CockType } from 'Engine/Body/Cock';
import { describeCock, describeOneOfYourCocks, describeEachOfYourCocks, describeCocksLight } from 'Content/Descriptors/CockDescriptor';
import { describeSack, describeBalls } from 'Content/Descriptors/BallsDescriptor';
import { skinFurScales } from 'Content/Descriptors/SkinDescriptor';
import { BreastRow } from 'Engine/Body/BreastRow';
import { describeBiggestBreastRow } from 'Content/Descriptors/BreastDescriptor';
import { describeButt } from 'Content/Descriptors/ButtDescriptor';
import { ConsumableName } from 'Content/Items/ConsumableName';
import { describeLegs } from 'Content/Descriptors/LegDescriptor';
import { gymDesc } from 'Content/Scenes/Places/TelAdre';
import { displayModTone, displayModThickness } from 'Content/Modifiers/BodyModifier';
import { urtaLove } from 'Content/Scenes/NPCs/Urta';

export const LottieFlags = Flags.register("Lottie", {
    UNKNOWN_FLAG_NUMBER_00281: 0,
    UNKNOWN_FLAG_NUMBER_00280: 0,
    UNKNOWN_FLAG_NUMBER_00279: 0,
    UNKNOWN_FLAG_NUMBER_00310: 0,
    UNKNOWN_FLAG_NUMBER_00311: 0,
    UNKNOWN_FLAG_NUMBER_00312: 0,
    UNKNOWN_FLAG_NUMBER_00313: 0,
    UNKNOWN_FLAG_NUMBER_00314: 0,
    UNKNOWN_FLAG_NUMBER_00315: 0,
    UNKNOWN_FLAG_NUMBER_00316: 0,
    UNKNOWN_FLAG_NUMBER_00317: 0,
    UNKNOWN_FLAG_NUMBER_00318: 0,
    UNKNOWN_FLAG_NUMBER_00319: 0,
    UNKNOWN_FLAG_NUMBER_00320: 0,
    UNKNOWN_FLAG_NUMBER_00298: 0,
    LIFETIME_GYM_MEMBER: 0,
    UNKNOWN_FLAG_NUMBER_00300: 0,
    UNKNOWN_FLAG_NUMBER_00308: 0,
    UNKNOWN_FLAG_NUMBER_00297: 0,
    UNKNOWN_FLAG_NUMBER_00299: 0,
    UNKNOWN_FLAG_NUMBER_00301: 0,
    UNKNOWN_FLAG_NUMBER_00302: 0,
    UNKNOWN_FLAG_NUMBER_00303: 0,
    UNKNOWN_FLAG_NUMBER_00304: 0,
    UNKNOWN_FLAG_NUMBER_00278: 0,
    TIMES_HAD_YOGA: 0,
    UNKNOWN_FLAG_NUMBER_00307: 0,
    UNKNOWN_FLAG_NUMBER_00306: 0,
    UNKNOWN_FLAG_NUMBER_00309: 0,
    TIMES_FUCKED_IFRIS_BLOWJOB: 0,
    UNKNOWN_FLAG_NUMBER_00321: 0,
    UNKNOWN_FLAG_NUMBER_00322: 0,
    UNKNOWN_FLAG_NUMBER_00323: 0,
    UNKNOWN_FLAG_NUMBER_00324: 0,
});

// CView.sprite(SpriteName.Lottie); // 36;
// 9999 - PUT IN SPRITES
// FLAGS
// 278 - LOTTIE OFF - NEVER ENCOUNTER PIG BITCH AGAIN
// 279 - LOTTIES FIGURE - HIGHER = LIGHTER
// 280 - Encouragement Value - higher = happier
// 281 - times met lottie
// 297 - lottie love her body?
// 298 - times porked lottie
// 299 - lottie's trainer (1 = yes)
// 300 - Last encouragement state

// [INITIAL INTRO – Requires Male/Herm, visits at 5pm – 7pm]
export function lottieAppearance(player: Character, display: boolean = true): ClickFunction | undefined | void {
    if (player.body.cocks.length <= 0) return;
    if (!player.effects.has(EffectType.MetMarae)) return;
    if (Time.hour >= 15 && Time.hour <= 23) {
        if (LottieFlags.UNKNOWN_FLAG_NUMBER_00281 === 0) {
            if (display) CView.text("\n\nA pale-skinned pig lady emerges from the pool nearby. Her small ears flop aimlessly on top of her pink-gray curls as she shakes any remaining water off of her pale, bikini-clad body - unintentionally jiggling her E-cup breasts and chubby ass in the process.");
            return encounterLottieCharge;
        }
        else {
            if (display) {
                // [RANDOM INTROS]
                // [Encouragement 0 – 30]
                if (LottieFlags.UNKNOWN_FLAG_NUMBER_00280 < 30 && randInt(6) === 0) {
                    CView.text("\n\nYou find Lottie crying in the sauna. She often comes here alone, wondering what went wrong with her weight loss. Every time you catch her, she begs for you not to leave her like everyone else. You tell her you won't, as long as she keeps doing as you instruct. She thanks you over and over again, crawling over to your legs and sobbing, squishing her luscious tits against you. You watch as she slowly lumbers her way to the cafe, waiting expectantly for you.");
                    if (Settings.sillyMode) CView.text("  What can you say? You love making bacon.");
                }
                // [Encouragement 0 – 30]
                else if (LottieFlags.UNKNOWN_FLAG_NUMBER_00280 < 30 && randInt(5) === 0) {
                    CView.text("\n\nYou find Lottie crying at the cafe. She often comes here to wait for you, wondering what went wrong with her weight loss. Every time you approach her, she begs for you not to leave her like everyone else. You tell her you won't, as long as she keeps doing as you instruct. She thanks you over and over again, crawling over to your legs and sobbing, squishing her luscious tits against you. You watch as she slowly tears herself away from you and sits back at her seat, waiting expectantly.");
                    if (Settings.sillyMode) CView.text("  What can you say? Her pork buns are the best.");
                }
                // [REPEAT INTROS]
                else if (randInt(2) === 0) {
                    CView.text("\n\nYou see Lottie exiting the yoga room nearby, her session finished. You can't help but notice the tight blue tank top and dark booty shorts she's wearing today. The ");
                    if (LottieFlags.UNKNOWN_FLAG_NUMBER_00279 <= 33) CView.text("voluptuous");
                    else if (LottieFlags.UNKNOWN_FLAG_NUMBER_00279 <= 66) CView.text("plump");
                    else CView.text("curvy");
                    CView.text(" pig girl jogs on the spot to wake herself up - unintentionally jiggling her " + lottieCup() + "-cup breasts and soft ass in the process. She walks over to the nearby cafe and sits down on her ");
                    if (LottieFlags.UNKNOWN_FLAG_NUMBER_00279 <= 33) CView.text("bountiful");
                    else if (LottieFlags.UNKNOWN_FLAG_NUMBER_00279 <= 66) CView.text("chubby");
                    else CView.text("cute");
                    CView.text(" rump.");
                }
                else {
                    CView.text("\n\nYou see Lottie walking out of the weight room, glistening with sweat from her recent workout. It seems to have taken a lot out of her, her movements more stiff than usual. The perky pink girl takes a few short stretches to loosen up - unintentionally jiggling her " + lottieCup() + "-cup breasts and soft ass in the process. She walks over to the nearby cafe and sits down on her ");
                    if (LottieFlags.UNKNOWN_FLAG_NUMBER_00279 <= 33) CView.text("voluminous");
                    else if (LottieFlags.UNKNOWN_FLAG_NUMBER_00279 <= 66) CView.text("chubby");
                    else CView.text("cute");
                    CView.text(" rump.");
                }
            }
            return encounterLottieCharge;
        }
    }
}

// return cupsize!
// 279 - LOTTIES FIGURE - HIGHER = LIGHTER
function lottieCup(): string {
    // (d/e/f/g)
    if (LottieFlags.UNKNOWN_FLAG_NUMBER_00279 >= 75) return "D";
    else if (LottieFlags.UNKNOWN_FLAG_NUMBER_00279 >= 50) return "E";
    else if (LottieFlags.UNKNOWN_FLAG_NUMBER_00279 >= 25) return "F";
    else return "G";
}

function encounterLottieCharge(player: Character): NextScreenChoices { return encounterLottie(player, true); }

export function encounterLottie(player: Character, charge: boolean = false): NextScreenChoices {
    CView.sprite(SpriteName.Lottie); // 36;
    let comedy1;

    // Choice menu vars
    // [Appearance][Talk][Exercise][Give Item][Sex][Hug]
    const item = giveLottieAnItem;
    let sex;
    const hug = hugTheShitOutOfYourHam;

    if (LottieFlags.UNKNOWN_FLAG_NUMBER_00310 + LottieFlags.UNKNOWN_FLAG_NUMBER_00311 + LottieFlags.UNKNOWN_FLAG_NUMBER_00312 + LottieFlags.UNKNOWN_FLAG_NUMBER_00313 + LottieFlags.UNKNOWN_FLAG_NUMBER_00314 + LottieFlags.UNKNOWN_FLAG_NUMBER_00315 + LottieFlags.UNKNOWN_FLAG_NUMBER_00316 + LottieFlags.UNKNOWN_FLAG_NUMBER_00317 + LottieFlags.UNKNOWN_FLAG_NUMBER_00318 + LottieFlags.UNKNOWN_FLAG_NUMBER_00319 + LottieFlags.UNKNOWN_FLAG_NUMBER_00320 + LottieFlags.UNKNOWN_FLAG_NUMBER_00298 > 0 && player.stats.lust >= 33) sex = lottieFuck;

    CView.clear();
    CView.image("lottie-encounter");
    if (charge) {
        if (LottieFlags.LIFETIME_GYM_MEMBER === 0) {
            CView.text("The centauress working the door walks up to collect her fee, and you drop 10 gems for an hour at the gym into her hand.\n\n");
            player.inventory.gems -= 10;

        }
    }
    LottieFlags.UNKNOWN_FLAG_NUMBER_00281++;
    // [INITIAL ENCOUNTER]
    if (LottieFlags.UNKNOWN_FLAG_NUMBER_00281 === 1) {
        LottieFlags.UNKNOWN_FLAG_NUMBER_00279 = 50;
        LottieFlags.UNKNOWN_FLAG_NUMBER_00280 = 50;
        LottieFlags.UNKNOWN_FLAG_NUMBER_00300 = 50;
        LottieFlags.UNKNOWN_FLAG_NUMBER_00308 = 50;
        CView.text("You approach the pig girl as she tightly wraps a towel around herself, accentuating her plump figure. Eyes darting around and searching for anyone that may have been watching, the girl spots you walking toward her and squeals, clearly embarrassed by her body in front of someone as fit as yourself.  Quickly moving her attention elsewhere, the flustered lady starts walking briskly in the opposite direction only to end up face to face with a wall. She turns around and walks toward you, her cheeks noticeably redder than before.\n\n");

        CView.text("\"<i>Ah! Hello, I didn't quite see you there! Ohoho!</i>\" She blurts out as she awkwardly stretches out her arm for what appears to be a handshake. You mentally congratulate her less-than-subtle attempt to bury the past few seconds into the ground and return the gesture, much to her relief. You're certain she would've died of embarrassment if you hadn't. She sighs deeply and meets your gaze with a smile. You deduce that it's more than likely her first time here, hence the nervousness.  \"<i>I guess you've caught me in the act, huh? I've tried losing weight for years, but I've always lost the motivation.</i>\" The girl explains. \"<i>You know what they say – the first few steps are always the hardest.</i>\"  You nod in agreement as you both walk out of the pool area.\n\n");

        CView.text("The pig girl begins to ramble on about her past attempts at dropping pounds, from eating strange pills to eating primarily eggs - most of them involved eating. You ask if she's ever exercised before. She looks visibly hurt at the sudden inquiry, but continues to talk. \"<i>To tell you the truth, I've never actually gone to a gym - I'd always stop at the front. I used to get away with eating what I liked because of my fast metabolism, but now it's caught up with me. I'm pretty porky now!</i>\"  She chuckles at her own joke, though obviously saddened by the realisation. You tell her she still looks great, for what it's worth.\n\n");

        // [If Meet Full Requirements]
        if (!player.body.legs.isNaga() && !player.body.legs.isTaur() && player.body.tone >= 50) {
            CView.text("\"<i>R-really? Y'think so?</i>\"  She blushes and looks down towards her feet.  \"<i>Y'know, I can't help but feel pretty confident when I'm around you – it might have something to do with those big muscles o' yours!</i>\"  She playfully pokes at your bicep.  \"<i>Hey, I was thinkin'... do you like, wanna be gym partners? I need to lose weight badly, and I think – I know I can do it if I'm with someone like you.</i>\"\n\n");
            // [Accept][Decline]
            return { yes: acceptBeingLottiesHamSandwich, no: declineBeingLottiesGymHamsandwich };
        }
        // [If Don't Meet Full Requirements]
        else {
            CView.text("\"<i>Oh, uh... thanks! Hey, listen – I gotta go start my yoga class now, but it was pretty great letting it all out with you. We should run into each other again sometime!</i>\"  The girl flashes a grin and jogs towards the showers.  \"<i>My name's Lottie, by the way!</i>\"\n\n");

            CView.text("You aren't really doing much else here, so you decide to return home.");
            return { next: passTime(1) };
        }
    }
    // 278 - LOTTIE OFF - NEVER ENCOUNTER PIG BITCH AGAIN
    // 279 - LOTTIES FIGURE - HIGHER = LIGHTER
    // 280 - Encouragement Value - higher = happier
    // 281 - times met lottie
    // 297 - lottie love her body?
    // 298 - times porked lottie
    // [REPEAT ENCOUNTER]
    else {
        CView.text("You approach the pig girl ");
        if (LottieFlags.UNKNOWN_FLAG_NUMBER_00280 >= 50) CView.text("relaxing");
        else CView.text("sitting timidly");
        CView.text(" at a table, wearing her low-cut top and booty shorts that accentuate her ");
        if (LottieFlags.UNKNOWN_FLAG_NUMBER_00279 <= 50) CView.text("plump");
        else CView.text("curvy");
        CView.text(" figure.  ");
        if (LottieFlags.UNKNOWN_FLAG_NUMBER_00297 === 0) CView.text("Lightly sipping");
        else CView.text("Slurping down");
        CView.text(" what appears to be ");
        if (LottieFlags.UNKNOWN_FLAG_NUMBER_00297 === 0) CView.text("some juice");
        else CView.text("a milkshake");
        CView.text(", her eyes wander over the room when she spots you and waves");
        if (LottieFlags.UNKNOWN_FLAG_NUMBER_00280 >= 70) CView.text(" excitedly");
        CView.text(".  You walk over to her and sit down, listening to Lottie update you on her progress.\n\n");

        // [Repeat If didn't meet requirements]
        if (LottieFlags.UNKNOWN_FLAG_NUMBER_00299 === 0 && (player.body.legs.isNaga() || player.body.legs.isTaur() || player.body.tone < 50)) {
            CView.text("\"<i>Hey, " + player.desc.name + "! I...I'm really glad I talked about myself with you, you're a really great friend, y'know. I really think I can achieve something this time, if I work hard!</i>\" You smile and tell her how glad you are that she's doing this. Lottie responds with a delighted expression, and continues to talk. \"<i>Anyway, I've been trying to look for a personal trainer, but it's kinda difficult, heh. I mean... I'm sure there's lots of trainers here and all, but I – I'd prefer someone I know personally, right?</i>\" She looks up at you expectantly, but then looks back towards the floor. </i>\"But I guess we can't always have what we want.</i>\"\n\n");
            // (Note: No options but 'leave' are available until you meet requirements.)
            return { choices: [["", undefined], ["", undefined], ["", undefined], ["", undefined], ["Leave", gymDesc]] };
        }
        // [Normal Encounter, If became met requirements]
        else if (LottieFlags.UNKNOWN_FLAG_NUMBER_00299 === 0) {
            CView.text("\"<i>Hey, " + player.desc.name + "! I was just... I...</i>\"Lottie seems to be at a loss of words, gaping at your new, chiselled physique. You smile and tell her how glad you are that she's doing this, thought it's a shame she hasn't found a personal trainer yet. Lottie responds with a hazy expression and an open mouth. \"<i>Y-yeah... it's a shame...</i>\" She begins, until snapping out of her daze and looking up excitedly at you. \"<i>I- Y'know, I don't know what you've been doing to yourself lately, but... you look a... you're really amazing right now, " + mf(player, "big guy", "babe") + "!</i>\" She squeals as you flex at her, giggling at your blatant attempts at showing off. You never really took her as one to appreciate muscles, but you figure her obsession towards the perfect body might extend to other people as well. You take one stern look at the chubby porcine in front of you and grin, asking if she wants you to be her personal trainer. She seems shocked at your proposal. </i>\"Are... are you serious?</i>\"\n\n");
            CView.text("Well, are you?");
            // [Yes][No][God No]
            if (Settings.sillyMode && player.stats.cor >= 80) comedy1 = gotInShapeComedyDeclineLottie;
            return { choices: [["Yes", gotInShapeAcceptTrainingOffer], ["No", gotInShapeButTurnedDownLottie], ["God No", comedy1]] };
        }
        // [Second Encounter, If fucked Lottie]
        else if (LottieFlags.UNKNOWN_FLAG_NUMBER_00281 === 2 && LottieFlags.UNKNOWN_FLAG_NUMBER_00298 > 0) {
            CView.text("\"<i>Hey, " + player.desc.name + "! I...I really enjoyed what we did. God, if that's what it takes to get healthy I wouldn't mind! I think I'm falling in love with you already, haha!</i>\" She forces a giggle at her last sentence, albeit rather nervously. You raise an eyebrow, but decide not to push the issue further.");
        }
        // [Second Encounter, If didn't fuck Lottie]
        else if (LottieFlags.UNKNOWN_FLAG_NUMBER_00281 === 2) {
            CView.text("\"<i>Hey, " + player.desc.name + "! I...I'm really glad we're doing this, y'know? I really think I can achieve something this time, if I work hard – and if you work hard with me!</i>\" You smile and tell her how glad you are that she's doing this. Lottie responds with a delighted expression as you both return to normal conversation.");
            // (Note: 'Give Item' and 'Sex' options aren't available until she brings up the subject of sex on your fourth encounter with her.)
        }
        // [Fourth Encounter, If didn't take Lust Draft]
        else if (LottieFlags.UNKNOWN_FLAG_NUMBER_00281 === 4 && LottieFlags.UNKNOWN_FLAG_NUMBER_00298 === 0) {
            CView.text("\"<i>Hey, " + player.desc.name + ", it's nice to see you again. Um, I... I have this thing I gotta ask you, if you don't mind.</i>\" You look up at Lottie, your curiosity piqued. \"<i>Well, uh! I was at the bar last night, and this lady told me, uh... y'see, there's this, um, this technique. There's a technique. A technique for sex.</i>\" You smile at her obvious embarrassment while her face turns a brighter pink than usual. You're not denying that a girl like Lottie might've had some experience in the sex department, but she's clearly uncomfortable with the issue. Still, she presses on. \"<i>I just heard that, well, this sex technique, it helps you lose weight, y'know? And I was thinkin', what with all the exercise we're doing... what about sex?</i>\" Lottie leans forward, crushing her breasts against the table while she tries to stare an answer out of you. Her awkward forwardness is cute, if anything. Do you take her up on the offer, or is it easier just to be exercise buddies?");
            // [Sex][Buddies]
            return { choices: [["Sex", fourthMeetingChooseSexWithLottie], ["Buddies", stayLottieBuds4Evah]] };
        }
        // [Encouragement moved from 31 to 30, first time]
        else if (LottieFlags.UNKNOWN_FLAG_NUMBER_00301 === 0 && LottieFlags.UNKNOWN_FLAG_NUMBER_00300 > 30 && LottieFlags.UNKNOWN_FLAG_NUMBER_00280 <= 30) {
            CView.text("\"<i>Hey, " + player.desc.name + ", I... I really don't know w-what's gotten into you lately. Please, please stop being so m-mean, ba- I mean, " + mf(player, "sir", "ma'am") + ". P-please don't be like this.</i>\" She forces a smile at her last sentence, though you can tell she's incredibly nervous. You raise an eyebrow, but decide not to push the issue further.");
            LottieFlags.UNKNOWN_FLAG_NUMBER_00301 = 1;
            LottieFlags.UNKNOWN_FLAG_NUMBER_00300 = LottieFlags.UNKNOWN_FLAG_NUMBER_00280;
        }
        // [Encouragement moved from 31 to 30, regular]
        else if (LottieFlags.UNKNOWN_FLAG_NUMBER_00301 > 0 && LottieFlags.UNKNOWN_FLAG_NUMBER_00300 > 30 && LottieFlags.UNKNOWN_FLAG_NUMBER_00280 <= 30) {
            CView.text("\"<i>H-hi " + player.desc.name + "... I noticed that you're... y-you're acting like you do when I do something wrong. Did I do something? P-please, I really don't like seeing you so m-mean. Please don't be like this.</i>\" She forces a smile at her last sentence, though you can tell she's incredibly nervous. You raise an eyebrow, but decide not to push the issue further.");
            LottieFlags.UNKNOWN_FLAG_NUMBER_00300 = LottieFlags.UNKNOWN_FLAG_NUMBER_00280;
        }
        // [Encouragement moved from 30 to 31
        else if (LottieFlags.UNKNOWN_FLAG_NUMBER_00300 <= 30 && LottieFlags.UNKNOWN_FLAG_NUMBER_00280 > 30) {
            LottieFlags.UNKNOWN_FLAG_NUMBER_00300 = LottieFlags.UNKNOWN_FLAG_NUMBER_00280;
            // first time
            if (LottieFlags.UNKNOWN_FLAG_NUMBER_00302 === 0) {
                CView.text("\"<i>H-hiya, " + player.desc.name + "! I'm... I'm really glad you're being nice again. To be honest, when you're angry, it – I get really scared, y'know? But I'm glad even if we're just like this.</i>\" She throws you a genuine smile, she's confident that you won't mistreat her again. You smile back, silently assuring her that you won't, today.");
                LottieFlags.UNKNOWN_FLAG_NUMBER_00302 = 1;
            }
            // [Encouragement moved from 30 to 31, regular]
            else {
                CView.text("\"<i>H-hiya, " + player.desc.name + ".  Th-thanks for b-brightening up a bit, you were... I was getting really afraid for a while. I know you have my best interest in heart, but sometimes... well, it's all in the past now, haha!</i>\" She throws you a genuine smile, she's confident that you won't mistreat her again. You smile back, silently assuring her that you won't, today.");
            }
        }
        // [Encouragement moved from 80 to 79
        else if (LottieFlags.UNKNOWN_FLAG_NUMBER_00300 > 80 && LottieFlags.UNKNOWN_FLAG_NUMBER_00280 <= 80) {
            LottieFlags.UNKNOWN_FLAG_NUMBER_00300 = LottieFlags.UNKNOWN_FLAG_NUMBER_00280;
            // , first time]
            if (LottieFlags.UNKNOWN_FLAG_NUMBER_00303 === 0) {
                LottieFlags.UNKNOWN_FLAG_NUMBER_00303 = 1;
                CView.text("\"<i>Hey there, " + player.desc.name + "... is there something wrong? Is it... does it have something to do with me? I know I say a lot of dumb things sometimes, but seeing you act this cruel... I... I don't know. I just thought maybe we were closer. I-I guess I was wrong, haha.</i>\" She smiles weakly, unsure of what to make of your recent actions. You sit blankly, unresponsive to her accusations, which only causes her to grow more uncomfortable. A heavy silence fills the air.");
            }
            // [Encouragement moved from 80 to 79, regular]
            else {
                CView.text("\"<i>Hey, " + player.desc.name + ". I don't know what the big idea is, but... you really have to stop acting the way you are now, y'know? I... I don't know if this is my fault or not, but it doesn't mean we can't talk about it. It definitely doesn't give you an excuse to be a jerk and toy with... with my feelings. Well, whatever.</i>\" She frowns, unsure of what to make of your recent actions. You sit blankly, unresponsive to her accusations, which only causes her to grow more uncomfortable. A heavy silence fills the air.");
            }
        }
        // [Encouragement moved from 79 to 80, first time]
        else if (LottieFlags.UNKNOWN_FLAG_NUMBER_00300 <= 80 && LottieFlags.UNKNOWN_FLAG_NUMBER_00280 > 80) {
            LottieFlags.UNKNOWN_FLAG_NUMBER_00300 = LottieFlags.UNKNOWN_FLAG_NUMBER_00280;
            // , first time]
            if (LottieFlags.UNKNOWN_FLAG_NUMBER_00304 === 0) {
                LottieFlags.UNKNOWN_FLAG_NUMBER_00304 = 1;
                CView.text("Lottie seems a lot more nervous than usual, curling her hair around her finger and fidgeting with the cup of tea in her hand. \"<i>H-hi... hi " + player.desc.name + ".</i>\" she squeaks, unable to form sentences under the immense amount of pressure she's put herself under. You place your hand on hers to relieve her own stress, but this seems to make her more nervous. \"<i>Oh! I... gosh, " + player.desc.name + ", I don't know what to say!</i>\" Lottie shakes her head several times, muttering a 'pull yourself together, Charlotte!' before starting again. \"<i>I like you! I really, really like you, " + player.desc.name + "!</i>\" She squeals at the top of her lungs, jumping up in excitement before immediately clapping her hands over her mouth at the realisation that she's caught the attention of the entire cafe. You silently walk over to her, placing her hands back down before pulling her into a warm embrace. \"<i>I... I...</i>\" Looking down, you brush the hair out of her eyes and place a small kiss on her forehead, calming her down considerably. \"<i>Do you like me too?</i>\" She asks. You smile, and hug her tighter than before, the scent of black cherries and roses lingering in the air. Her voice rings through your head while you embrace the girl.  Do you like me too?\n\n");
                CView.text("You don't know the answer.");
            }
            // [Encouragement moved from 79 to 80, regular]
            else {
                CView.text("\"<i>Hey, " + player.desc.name + ".Thanks for being... nicer, again. Sometimes I really worry about you, but... well; I'm fine with putting that behind us. I'm glad, y'know?</i>\" She throws you a smile, confident that you won't mistreat her again. You smile back, silently assuring her that you won't, today.");
            }
        }
        // [Normal Encounter, Encouragement 60 - 100]
        else if (LottieFlags.UNKNOWN_FLAG_NUMBER_00280 >= 60) {
            // [Figure 0 – 20]
            if (LottieFlags.UNKNOWN_FLAG_NUMBER_00279 <= 20 && LottieFlags.UNKNOWN_FLAG_NUMBER_00297 === 0) CView.text("\"<i>Oh, " + player.desc.name + "! Let's do our best today, I really wanna lose those pounds! I know I can do my best when I'm with you!</i>\" Lottie beams, her massive tits pushed against the table. She seems to be excited for what you've got in store today.");
            // [Figure 0 - 20, convinced her to accept body]
            else if (LottieFlags.UNKNOWN_FLAG_NUMBER_00279 <= 20) CView.text("\"<i>Hey, " + mf(player, "stud", "cutie") + "! You shouldn't keep a big girl like me waiting; unless you wanna get crushed by these!</i>\" Lottie grins and grabs her luscious breasts firmly, giggling when she notices you're at full attention now. She seems to be excited for what you've got in store today.");
            // Figure 20 - 40, haven't convinced her to accept body]
            else if (LottieFlags.UNKNOWN_FLAG_NUMBER_00279 <= 40 && LottieFlags.UNKNOWN_FLAG_NUMBER_00297 === 0) CView.text("\"<i>Ah, " + player.desc.name + "! We should probably get started soon; I'm gonna push myself to the limit today!</i>\" Lottie's arms are folded over her chest, subconsciously trying to hide her nervousness, though squishing her pillowy tits in the process. She seems to be excited for what you've got in store today.");
            // [Figure 20 - 40, convinced her to accept body]
            else if (LottieFlags.UNKNOWN_FLAG_NUMBER_00279 <= 40) CView.text("\"<i>Hey, " + mf(player, "stud", "cutie") + "! You shouldn't keep me waiting; the only thing I'm losing right now is my patience!</i>\" Lottie grins and punches your arm playfully, squealing when you try to get her back. She seems to be excited for what you've got in store today.");
            // [Figure 40 - 60]
            else if (LottieFlags.UNKNOWN_FLAG_NUMBER_00279 <= 60) CView.text("\"<i>Hey! I was looking for you earlier, y'know? I can't wait to get started.</i>\" She looks happy that you've arrived. Lottie leans over to grab her beverage, giving you an excellent view of her supple mounds. She seems to be excited for what you've got in store today.");
            // [Figure 60 - 80]
            else if (LottieFlags.UNKNOWN_FLAG_NUMBER_00279 <= 80) CView.text("\"<i>Yo, " + mf(player, "big guy", "babe") + "! I've been waiting for you, so you better be pumped! Ready to get started?</i>\" Lottie leans over, her creamy tits pushed against the table. She seems to be excited for what you've got in store today.");
            // [Figure 80 - 100]
            else CView.text("\"<i>Hey, " + mf(player, "stud", "cutie") + "! You shouldn't keep me waiting, or I'll put you through the burn twice as hard! You ready?</i>\" Lottie winks at you and punches your arm playfully. She seems to be excited for what you've got in store today.");
        }
        // [Normal Encounter, Encouragement 30 - 60]
        else if (LottieFlags.UNKNOWN_FLAG_NUMBER_00280 >= 30) {
            // [Figure 0 - 20]
            if (LottieFlags.UNKNOWN_FLAG_NUMBER_00279 <= 20) CView.text("\"<i>Oh, " + player.desc.name + ", hey. I think we should try and get into it today. I don't think I tried hard enough last time, y'know?</i>\" Lottie leans over to grab her beverage, her massive tits pushed against the table. She seems to be intent on trying her best today.");
            // [Figure 20 - 40]
            else if (LottieFlags.UNKNOWN_FLAG_NUMBER_00279 <= 40) CView.text("\"<i>A-ah, " + player.desc.name + "! We should probably get started soon; I... I want to push myself to the limit today!</i>\" Lottie's arms are folded over her chest, subconsciously trying to hide her nervousness, though squishing her pillowy tits in the process. She seems curious as to what you both plan to do today.");
            // [Figure 40 - 60]
            else if (LottieFlags.UNKNOWN_FLAG_NUMBER_00279 <= 60) CView.text("\"<i>H-hey! I was looking for you earlier, y'know? I can't wait to get started.</i>\" She looks at ease now that you've arrived. Lottie leans over to grab her beverage, giving you an excellent view of her supple mounds. She seems curious as to what you both plan to do today.");
            // [Figure 60 - 80]
            else CView.text("\"<i>Hello " + player.desc.name + "! I've... I've been waiting for you, so you better be ready, hey! Don't hold back!</i>\" Lottie leans over, her creamy tits pushed against the table. She seems to be excited for what you've got in store today.");
        }
        // [Normal Encounter, Encouragement 0 - 30]
        else {
            // [Normal Encounter, Figure 0 – 70]
            if (LottieFlags.UNKNOWN_FLAG_NUMBER_00279 <= 70) CView.text("\"<i>Oh, " + player.desc.name + "... I know I haven't been trying the way you want me to. I – I punished myself extra hard last night! Please, let me try again today!</i>\" Lottie leans over and looks at you desperately, her creamy tits pushed against the table. You can see they're redder than before. Has she been trying to slap her fat away? You turn away, not giving her the pleasure of looking at your face. You agree to help her – but don't expect to be looked at by the only person who can stand you if this goes on. Lottie squeals and manages to blurt out a 'th-thank you!' in response.");
            // [Normal Encounter, Figure 70 - 100]
            else CView.text("\"<i>" + player.desc.name + "! I know you don't like looking at me, but I... I lost some more weight for you today!</i>\" Lottie removes her top and exposes her curvaceous body, plump tits in full view. You stare her down, and she smiles weakly, grateful for your patience. She waits for your response, but you turn away and tell her to cover up her disgusting body. \"<i>But I – oh god, I'm sorry, I'm so sorry, I'll try extra hard today, I'll try so so hard...</i>\" She babbles on while you go to the counter and order some food for yourself.");
        }
    }
    // [Appearance][Talk][Exercise][Give Item][Sex][Hug]
    LottieFlags.UNKNOWN_FLAG_NUMBER_00300 = lottieMorale();
    if (LottieFlags.UNKNOWN_FLAG_NUMBER_00308 === 0) LottieFlags.UNKNOWN_FLAG_NUMBER_00308 = lottieTone();
    return {
        choices: [
            ["Appearance", lotteryAppearance], ["Talk", talkToPigSlut], ["Exercise", lottieExercise], ["Give Item", item], ["Sex", sex],
            ["Hug", hug], ["", undefined], ["", undefined], ["", undefined], ["Leave", gymDesc]
        ]
    };
}

function cockThatFitsLottie(player: Character) {
    let cockThatFits = player.body.cocks.find(Cock.CockThatFits(40));
    if (!cockThatFits) cockThatFits = player.body.cocks.get(0);
    return cockThatFits;
}

// [Sex]
function fourthMeetingChooseSexWithLottie(player: Character): NextScreenChoices {
    CView.sprite(SpriteName.Lottie); // 36;

    LottieFlags.UNKNOWN_FLAG_NUMBER_00298++;
    const cockThatFits = cockThatFitsLottie(player);
    CView.text("You tell her that you're fine with the idea, as long as she's willing to follow your lead. \"<i>W-wow, you really wanna... and with me? Okay, sure, lemme just uh, hang on...</i>\" She fumbles with her clothing, clearly trying to get undressed in public before you decide to stop her – there are far better places for this. Taking her by the hand, you lead her into one of the empty saunas, your erection stirring in your pants as you grow more and more eager to take her. \"<i>" + player.desc.name + "... I'm – I really don't know where to start, h-hey.</i>\" She throws an uneasy glance at you, her intent for you to take the lead apparent in her heavy breathing and wanting eyes. Not one to disappoint, you grab her by the hips and lean her against the wall, ripping off her clothes and revealing her velvety skin underneath. Reaching down, you grab a handful of her luxurious ass, squeezing and slapping it lightly. Lottie moans into your shoulder and reaches towards your groin, removing your " + player.inventory.armor.displayName + ". She begins stroking your " + describeCock(player, cockThatFits) + " lightly, picking up the pace as you continue to work on her pert rump. You can't help but lust over her full figure, using one of your hands to firmly grope her pillowy jugs and reaching your other towards her glistening pussy. You move your hand over her cushiony rack before burying your head into her bosom and eagerly sucking on one of her nipples, fondling the other between your thumb and forefinger. Your other hand is already fast at work, fingering her hot cunt. You can feel her legs about to buckle beneath their own weight. Lottie moans in between short, hot breaths, \"<i>Y-you're... really amazing, " + mf(player, "guy", "lady") + ".</i>\" You give her chubby ass a hard slap in agreement.  Lottie squeals with  glee, jerking your " + describeCock(player, cockThatFits) + " as it pokes into her soft stomach. The sensation of your tip rubbing against her velvety skin drives you wild.\n\n");
    CView.text("You tell Lottie you've decided you're going to take her for a vigorous work out. She can only pant with anticipation.\n\n");
    // [Oral][Anal] – [After scenes, options for 'sex' and 'give item' are opened up.]
    // Use same as other first time sex I presume
    return { choices: [["Oral", getSuckedOffByAHamSandwich], ["Anal", analLottieMilkshake]] };
}

// [Buddies]
function stayLottieBuds4Evah(player: Character): NextScreenChoices {
    CView.sprite(SpriteName.Lottie); // 36;

    CView.text("You tell her you're more comfortable with staying buddies, and that turning the relationship into a sexual one would probably be more trouble than it's worth. Lottie nods, understanding but also showing slight disappointment at your decision. \"<i>I see... you're totally right! You're absolutely – that's the correct-est thing I've heard all day, y'know?</i>\" She chuckles half-heartedly, but you can only frown at her attempt to avoid the situation. You tell her that you're sorry, but there's no reason that you both can't be gym buddies anymore. The more you continue to shut her down, the more despondent Lottie appears. Eventually, she seems to be on the verge of crying. \"<i>I... I'm sorry, I just...I thought...</i>\" Grabbing her glass of water, you take Lottie outside of the gym and into the grassy track to sit down. It's empty at the moment, so the silence of the night calms her down. You tell her to relax, that you're flattered, and that you think she's still beautiful – anything that'd make her feel better right now. You didn't think she'd take such a strong reaction to being turned down for something like sex, but that's Lottie for you – she's as sensitive as a peach. Maybe this was an important thing to her? You mull it over for a while, Lottie sitting next to you, tired already. You take one last look at her before wrapping your arm around her shoulders and pulling her closer to you, commenting on how brave she was for even asking you in the first place – not many people can be so forward. The girl remains quiet, but moves closer to rest on her head on your chest. It's a bad idea to keep her this close, but you know she needs it right now. You continue talking, the vibrations of your voice lulling Lottie into a deep sleep.\n\n");
    CView.text("A while later and you both sit at the entrance to the gym, Lottie having calmed down a considerable amount. \"<i>Thanks, " + player.desc.name + ", I know I'm just overreacting, but...</i>\" she sighs. \"<i>I don't know. I don't know what I'd do without you, " + mf(player, "big guy", "babe") + ".</i>\" You give her one last hug before parting ways. She'll be fine in the morning.");
    return { next: passTime(1) };
}

// [If Decline]
function declineBeingLottiesGymHamsandwich(player: Character): NextScreenChoices {
    CView.sprite(SpriteName.Lottie); // 36;

    CView.text("\"<i>O-oh, um... okay. I understand! You're probably busy what with all that lifting you're getting up to, haha!</i>\" The pig girl chuckles nervously, shifting her towel to cover more of her soft cleavage.  \"<i>I'll uh – I'll go get outta your hair then. I've got some stuff to do at home.</i>\"  You watch as she jogs off through the door and out into Tel'Adre, towel and all.  You decide you better return home too, and head back towards the camp.");
    // [PC no longer encounters Lottie.]
    LottieFlags.UNKNOWN_FLAG_NUMBER_00278 = 1;
    return { next: passTime(1) };
}

// [If Accept]
function acceptBeingLottiesHamSandwich(player: Character): NextScreenChoices {
    CView.sprite(SpriteName.Lottie); // 36;

    LottieFlags.UNKNOWN_FLAG_NUMBER_00299 = 1;
    CView.text("\"<i>A-ah, really? Y'mean it? This isn't some trick or something, right? You ain't about to go ahead and flake out on me, are you?</i>\" You assure her you're serious if she is, though you make a mental note that she's more likely to flake out than you are, given her history. \"<i>Eeee! Thanks, " + mf(player, "big guy", "babe") + " – I can't wait to get started! For the record, my name's Lottie. What about yourself?</i>\"  You tell her your name, and remark on her enthusiasm. \"<i>" + player.desc.name + ", huh? Well " + player.desc.name + ", I'm excited because I think the two of us are about to become super close! Do you feel it? Do ya?</i>\"  Lottie wiggles in excitement, loosening the already skimpy towel and revealing one of her perky nipples. You definitely feel something, that's for sure. She follows your eyes down to her breasts and reddens as she quickly covers herself up as best as she can - only succeeding in making her pillowy breasts push up against the towel, enhancing her cleavage.\n\n");

    CView.text("You take this opportunity to get a good look at Lottie. She stands at around 4'8</i>\", considerably shorter than average, ");
    if (player.body.tallness > 60) CView.text("and shorter than you");
    else if (player.body.tallness > 53) CView.text("but you can't judge, being roughly the same height");
    else CView.text("taller than you");
    CView.text(". Physique-wise, Lottie is definitely a bit chubbier than most girls, though you couldn't call her fat - of the few pig people you have seen around Tel'Adre, she's definitely the 'thinnest'. The majority of her weight is focused in her cushiony breasts, ample thighs and large ass, though her stomach is rounded nicely. Her heart-shaped face is complimented by her button nose and soft lips, framed by her pink-gray hair, which ends in small curls. A small, coiled tail rests above her rump, unknowingly lifting the towel high enough to leave her pale thighs in full view. She turns around to catch you staring at her butt. \"<i>A-anyway, before we start anything I gotta go hit the showers, okay? I'll see you in a bit!</i>\" She turns around to head for the bathrooms, your eyes hypnotized by her jiggling bottom.\n\n");
    CView.text("<b>...</b>\n");
    CView.text("An hour later, both you and Lottie are running along the track. She's clearly focused on matching your speed, but after a few minutes she tires herself out and begins to lightly jog. You pull back and wait for her to catch up to you and then power walk with her for the next lap or so, making light conversation when possible. After another lap, you both decide to take a break, Lottie bouncing happily at her progress today. You sit down on the bench and reach over to one of the cups of water you poured out for yourself and Lottie, when you spy another cup filled with a pink, bubbly liquid. The color itself isn't all that enticing, but your curiosity is piqued nonetheless. Is it an energy drink? You pick the cup with your free hand and smell its contents. It has a sweet, intoxicating scent similar to strawberries, or bubblegum. Immediately you begin to feel dizzy. You know this isn't any ordinary protein shake. You look back at your water. You're really thirsty... do you play it safe with the water, or take the enticingly peculiar shake?");
    // [Water][Shake]
    return { choices: [["Water", drinkWaterWithYourHamhock], ["Shake", drinkLustWithYourHamhock]] };
}

// Followups to this: CView.text("\"<i>Hey, " + player.desc.name  + "! I was just... I...</i>\"Lottie seems to be at a loss of words, gaping at your new, chiselled physique. You smile and tell her how glad you are that she's doing this, thought it's a shame she hasn't found a personal trainer yet. Lottie responds with a hazy expression and an open mouth. \"<i>Y-yeah... it's a shame...</i>\" She begins, until snapping out of her daze and looking up excitedly at you. \"<i>I- Y'know, I don't know what you've been doing to yourself lately, but... you look a... you're really amazing right now, " + mf(player, "big guy", "babe") + "!</i>\" She squeals as you flex at her, giggling at your blatant attempts at showing off. You never really took her as one to appreciate muscles, but you figure her obsession towards the perfect body might extend to other people as well. You take one stern look at the chubby porcine in front of you and grin, asking if she wants you to be her personal trainer. She seems shocked at your proposal. </i>\"Are... are you serious?</i>\"\n\n");
// If No]
function gotInShapeButTurnedDownLottie(player: Character): NextScreenChoices {
    CView.sprite(SpriteName.Lottie); // 36;
    CView.text("\"<i>O-oh, um... okay. I understand! You're probably busy what with all that lifting you're getting up to, haha!</i>\" The pig girl chuckles nervously, shifting her towel to cover more of her soft cleavage. \"<i>I'll uh – I'll go get outta your hair then. I've got some stuff to do at home.</i>\" You watch as she jogs off through the door and out into Tel'Adre, towel and all. You decide you'd better return home too, and head back towards the camp.");
    // [PC no longer encounters Lottie.]
    LottieFlags.UNKNOWN_FLAG_NUMBER_00278 = 1;
    return { next: passTime(1) };
}

// [If God No]
export function gotInShapeComedyDeclineLottie(player: Character): NextScreenChoices {
    CView.sprite(SpriteName.Lottie); // 36;

    CView.text("Haha, of course you fucking aren't, why would you be? Lottie stares at you, tears welling in her eyes. Oh, whoops – you must've said that out loud. Proceeding to not give two shits about the bawling pig-slut in front of you, you take a good squeeze of her cushiony tits before whipping your " + describeCock(player, player.body.cocks.sort(Cock.Largest).get(0)) + " out and slapping her in the face with it.  \"<i>W-w-why... why are you... *sniff* p-please...!</i>\" The pig girl chokes in between sobs. It almost gives you a hard on - almost. You take one final step backwards, before announcing quite loudly to the other cafe-goers that you're going for a home run. Lottie squeaks before you take your " + describeCock(player, player.body.cocks.sort(Cock.Largest).get(0)) + " and swing at her face, hitting dead on and managing to leave a bit of pre-cum on her newly-christened cheek. You stand triumphantly at your latest work of art, though Lottie seems to have other ideas, running out the door in complete misery, pre-cum and all. You decide you'd better return home too, and head back towards the camp – but not before spending the next hour or so chasing after Lottie and taking grabs at her plush ass.");
    // [PC no longer encounters Lottie.]
    LottieFlags.UNKNOWN_FLAG_NUMBER_00278 = 1;
    return { next: passTime(1) };
}

// [If Yes]
function gotInShapeAcceptTrainingOffer(player: Character): NextScreenChoices {
    CView.sprite(SpriteName.Lottie); // 36;
    LottieFlags.UNKNOWN_FLAG_NUMBER_00299 = 1;

    CView.text("\"<i>A-ah, really? Y'mean it? This isn't some trick or something, right? You ain't about to go ahead and flake out on me, are you?</i>\" You assure her you're serious if she is, though you make a mental note that she's more likely to flake out than you are, given her history. \"<i>Eeee! Thanks, " + mf(player, "big guy", "babe") + " – I can't wait to get started!</i>\" You chuckle, remarking on her enthusiasm. \"<i>Well " + player.desc.name + ", I'm excited because I think the two of us are about to become super close! Do you feel it? Do ya?</i>\" Lottie wiggles in excitement, loosening the already skimpy towel and revealing one of her perky nipples. You definitely feel something, that's for sure. She follows your eyes down to her breasts and reddens as she quickly covers herself up as best as she can - only succeeding in making her pillowy breasts push up against the towel, increasing her cleavage.\n\n");

    CView.text("You take this opportunity to get a good look at Lottie. She stands at around 4'8</i>\", considerably short on average, ");
    if (player.body.tallness > 60) CView.text("and shorter than you");
    else if (player.body.tallness > 53) CView.text("but you can't judge, being roughly the same height");
    else CView.text("taller than you");
    CView.text(". Physique-wise, Lottie is definitely a bit chubbier than most girls, though you couldn't call her fat - of the few pig people you have seen around Tel'Adre, she's definitely the 'thinnest'. The majority of her weight is focused in her cushiony breasts, ample thighs and large ass, though her stomach is rounded nicely to support the weight of her upper body. Her heart-shaped face is complimented by her button nose and soft lips, framed by her pink-gray hair, which ends in small curls. A small, coiled tail rests above her rump, unknowingly lifting the towel high enough to leave her pale thighs in full view. She turns around to catch you staring at her butt. \"<i>A-anyway, before we start anything I gotta go hit the showers, okay? I'll see you in a bit!</i>\" She turns around to head for the bathrooms, your eyes hypnotized by her jiggling bottom.\n\n");
    CView.text("...\n\n");
    CView.text("A half-hour later, both you and Lottie are running along the track. She's clearly focused on matching your speed, but after a few minutes she tires herself out and begins to jog. You pull back and wait for her to catch up to you and then power walk with her for the next lap or so, making light conversation when possible. After another lap, you both decide to take a break, Lottie bouncing happily at her progress today. You sit down on the bench and reach over to one of the cups of water you poured out for yourself and Lottie when you spot another cup filled with a pink, bubbly liquid. The color itself isn't all that enticing, but your curiosity is piqued nonetheless. Is it an energy drink? You pick the cup up with your free hand and smell its contents. It has a sweet, intoxicating scent similar to strawberries, or bubblegum. You immediately begin to feel dizzy. You know this isn't any ordinary protein shake. You look back at your water. You're really thirsty... do you play it safe with the water, or take the enticingly peculiar shake?");
    // [Water][Shake]
    return { choices: [["Water", drinkWaterWithYourHamhock], ["Shake", drinkLustWithYourHamhock]] };
    // [Both options are the same as the initial encounter ones]
}

// [Water]
function drinkWaterWithYourHamhock(player: Character): NextScreenChoices {
    CView.sprite(SpriteName.Lottie); // 36;

    CView.text("You decide that drinking the mysterious, bubbling concoction wouldn't exactly be the best of ideas – there's more than enough proof in Mareth to suggest at least that much.  Playing it safe, you take the water and drink, your thirst quenched by the cool liquid trickling down your throat. You turn to Lottie, who smiles back as she starts stretching for another round at jogging.  \"<i>Ready to go again?</i>\" she asks, bending over to massage her feet and unintentionally presenting her lush booty. Jumping up, you run back to the track, reminding yourself to jerk off to the image of Lottie's ass later.\n\n");
    CView.text("<b>...</b>\n");
    CView.text("Both you and Lottie sit back and relax, choosing to hang at the gym's cafe for a while, exhausted from the good workout. The pig-girl chatters on about her figure, listing off areas of her body she would change in a heartbeat if she had the chance – for a girl who's spent most of the day talking about how self-conscious she is of her body, she certainly loves to bring up the subject. You snap out of your train of thought and look over to Lottie, realizing she's leaned over to stare directly at you, both of her heavy breasts squished between her arms to show off her impressive cleavage. \"<i>Um, " + player.desc.name + "? I asked if they were any good...</i>\" She stammers, embarrassed by her question. It's a great rack, you respond nonchalantly, telling the porcine girl that she should be very proud of them – though by the deep, flushed red her face is turning, it's immediately obvious that wasn't the question. \"<i>Th-that wasn't the question!</i>\" she reiterates, covering her chest with her hands. \"<i>I j-just wanted to know if the yoga classes here were any good!</i>\" You laugh quietly to yourself at the mistake, though judging by Lottie's embarrassed stare she doesn't find the situation quite as funny.  ");
    if (LottieFlags.TIMES_HAD_YOGA === 0) CView.text("You've never had any experience with the yoga classes first hand, but you tell ");
    else CView.text("You've had experience with the yoga classes, so you tell ");
    CView.text("Lottie it's a great way to meet new people.\n\n");

    CView.text("She seems to loosen up around the response, and eventually goes back to her friendly, albeit incredibly naive, demeanor. You both leave through the front of the gym a short time later – it's pretty dark at this point. Before you turn back home though, Lottie stops you. \"<i>Hey, y'know, I... I really had a lot of fun. I had no idea that gyms could be this great!</i>\" she beams, punching you in the shoulder before retracting her hand in slight pain. You decide to give her a thumbs up and a cheesy grin before walking away into the night, happy with the new friendship you've made.");
    return { next: passTime(1) };
}

// [Shake]
function drinkLustWithYourHamhock(player: Character): NextScreenChoices {
    CView.sprite(SpriteName.Lottie); // 36;

    CView.text("You decide to down the cup of pink liquid, savoring the sweet taste as it pours down your throat. Your thirst quenched, you start to walk back towards the track when you're suddenly overcome with a warm feeling that stretches down to your groin. " + describeOneOfYourCocks(player, true) + " stirs from beneath your " + player.inventory.armor.displayName + " – you need to fuck something, and fast.  \"<i>Uh, is something wrong?</i>\" Lottie glances over to you, noticing the bulge in your pants as it strains against your " + player.inventory.armor.displayName + ". She looks up at your face, concerned about your well being. You grin and tell her you've had enough running.  Confused, Lottie asks what you mean.  You explain that you know a far more effective way to lose weight and stay in shape – in fact, it's how you got to be the way you are now.  You can see Lottie's eyes widen at the idea of such a technique, especially considering your own well-muscled physique.  \"<i>I'm all ears! What is it?</i>\"  She asks.  Clearly not getting the picture, you grab her hand and put it on your crotch.  Lottie quietly squeals and looks around to see if anyone noticed before looking back at you.  \"<i>Oh, um, I don't- I don't know about that, " + player.desc.name + "...</i>\" She mumbles, her hand still remaining on your growing hard-on.  It's perfectly fine - you've trained like this with hundreds of people, you lie.  Lottie swallows and looks down at the sound of 'hundreds'.  Not being one to question your methods, she begins to stroke your hardening length through your " + player.inventory.armor.displayName + ", using her palm to massage your shaft");
    // [if balls]
    if (player.body.balls.count > 0) CView.text(" while her fingers nervously trace around your balls");
    CView.text(". You stop her for now, though not before softly squeezing her hand as it caresses your girth. You know where you two can go 'work out', you tell her. She nods, her eyes glued to your erection.\n\n");

    CView.text("You take her by the hand and lead her into one of the empty saunas. \"<i>" + player.desc.name + "...</i>\" You grab her by the hips and lean her against the wall, throwing off her towel and revealing her velvety skin underneath. Reaching down, you grab a handful of her luxurious ass, squeezing and slapping it lightly. Lottie moans into your shoulder and reaches towards your groin, removing your " + player.inventory.armor.displayName + ". She begins stroking " + describeEachOfYourCocks(player) + " lightly, picking up the pace as you continue to work on her pert rump. You can't help but lust over her full figure, using one of your hands to firmly grope her pillowy jugs and reaching your other towards her glistening pussy. You move your hand over her cushiony rack, before burying your head into her bosom and eagerly sucking on one of her nipples, fondling the other between your thumb and forefinger. Your other hand is already fast at work, fingering her hot cunt. You can feel her legs about to buckle beneath their own weight. Lottie moans in between short, hot breaths, \"<i>Y-you're... really amazing, " + mf(player, "guy", "lady") + ".</i>\"  You give her chubby ass a hard slap in agreement.  Lottie squeals in glee, jerking your " + describeCock(player, player.body.cocks.get(0)) + " as it pokes into her soft stomach. The sensation of your tip rubbing against her velvety skin drives you wild.\n\n");

    CView.text("You tell Lottie you've decided you're going to take her for a vigorous work out. She can only pant with anticipation.");
    player.stats.lust += 99;

    LottieFlags.UNKNOWN_FLAG_NUMBER_00298++;
    // [Oral][Anal]
    return { choices: [["Oral", getSuckedOffByAHamSandwich], ["Anal", analLottieMilkshake]] };
}

// [If Anal]
export function analLottieMilkshake(player: Character): NextScreenChoices {
    CView.sprite(SpriteName.Lottie); // 36;

    CView.image("lottie-fuck-her-in-teh-butzor");
    const cockThatFits = cockThatFitsLottie(player);
    CView.text("You brush her grip off of " + describeEachOfYourCocks(player) + ", only to turn her around and fit your girth between her large cheeks");
    if (player.body.cocks.length === 2) CView.text(", managing to squeeze in your other cock along with it");
    else if (player.body.cocks.length > 2) CView.text(", the rest of your dicks poking and prodding against her soft flesh");
    CView.text(".  \"<i>You sure do like my butt, huh?</i>\"  She giggles softly, satisfied that at least some of her fat is being put to use.  You groan as she starts to move her ample hips, massaging your " + describeCock(player, cockThatFits) + " within her jiggling buttocks.  Your tip brushes against her asshole, smearing pre-cum all over the hot entrance.  Lottie starts to push back towards your cock, clearly overcome with lust.  You wait a few seconds as she aimlessly grinds against you before you spread her cheeks and plunge your " + describeCock(player, cockThatFits) + " into her tight backdoor. Lottie squeals against the wall in delight as you fill her stomach and begin pounding away at her relentlessly, her large tits bouncing rhythmically. She continues to drive herself into you, her tight, fiery insides squeezing your length whilst you watch her heavy butt ripple with every thrust.\n\n");

    CView.text("Lottie is a complete mess, gasping and convulsing underneath you as you plunge into her depths. Her mouth hangs wide open as she holds on to one of her plush tits, using her free hand to pleasure herself. You take hold of her lavish buttcheeks and force your length in deep, bottoming out inside her hot ass. You remain inside her and begin gyrating your hips, rubbing against the tight walls of her interior. Her legs collapse underneath you and you wrap one hand around her pot belly to hold her in place, resuming your thrusting.\n\n");

    CView.text("\"<i>A-aa-ah, I-I... AHH!</i>\" Lottie oinks noisily, her eyes rolling to the back of her head and her large thighs slapping against your own, pulling your " + describeCock(player, cockThatFits) + " further in. She shudders in orgasm");
    if (player.body.balls.count > 0) CView.text(", her soaked pussy rubbing against your balls");
    CView.text(".\n\n");

    // [If Multi]
    if (player.body.cocks.length > 1) {
        CView.text("Deciding you aren't done with her bouncy rear, you take ");
        if (player.body.cocks.length === 2) CView.text("your other cock");
        else CView.text("one of your cocks");
        CView.text(" and push it against her puckered hole. \"<i>H-hey, wait a mome- OHH!</i>\" You ease yourself back into her, with ");
        if (player.body.cocks.length === 2) CView.text("your two ");
        else CView.text("two of your ");
        CView.text(" throbbing cocks buried deep in her rectum. The pressure against your hot rods is immense, though you continue to slowly push and pull her sweaty ass against you, enjoying the feeling of her meaty fuckpillows as they massage your cock");
        if (player.body.cocks.length > 1) CView.text("s");
        CView.text(".\n\n");
    }
    if (player.body.balls.count > 0) CView.text("Your " + describeSack(player) + " begins to swell");
    else CView.text("You feel yourself about to explode");
    CView.text(" with the large amount of cum you've prepared to paint her inner walls with.  Your unrelenting fucking picks up the pace as you feel yourself coming to a climax.  Lottie's soft flesh starts to quiver, signaling her second orgasm.  You lift Lottie's plump body up straight and against yours as you groan loudly and thrust hard, the noisy broad ");
    if (player.cumQ() >= 1000) CView.text("overflowing");
    else if (player.cumQ() >= 500) CView.text("dripping");
    else CView.text("filled");
    CView.text(" with your hot, thick spunk. She squeals again as you bring her to orgasm, ramming herself into you to collect as much of your cum as possible. You continue to pound her bouncy buttocks as you release the rest of your seed inside of her");
    // [If large cum production]
    if (player.cumQ() >= 500) CView.text(", a heavy amount leaking from her ass");
    CView.text(".  Pulling yourself free, you wipe yourself against her plush butt and give it one final slap before walking out of the sauna.  \"<i>I-I'll see you again, hey?</i>\" Lottie asks, collapsed onto the floor in a mess of sweat and drool. You give her a thumbs up before turning around and heading out of the gym, making sure to grab a ");
    if (Settings.sillyMode) CView.text("bacon ");
    CView.text("shake on the way out.");
    // LOTTIE FIGURE +1, MUSCLE TONE +1, DRAINS PC'S LUST.
    lottieTone(1);
    if (LottieFlags.UNKNOWN_FLAG_NUMBER_00307 === 0) LottieFlags.UNKNOWN_FLAG_NUMBER_00307 = 1;
    CView.text(displayModTone(player, 100, 1));
    player.orgasm();
    return { next: passTime(1) };
}

// [If Oral]
export function getSuckedOffByAHamSandwich(player: Character): NextScreenChoices {
    CView.sprite(SpriteName.Lottie); // 36;

    CView.image("lottie-gives-you-a-blowjob");
    const largestCock = player.body.cocks.sort(Cock.Largest).get(0)!;

    CView.text("You grab Lottie's shoulders and firmly move her down towards your crotch. She kneels down, face to face with your " + describeCock(player, largestCock) + ".  Feeling her hot breath against your " + skinFurScales(player) + ", you tell her to suck it.\n\n");

    // [If player cock is at or below 4']
    if (largestCock.length <= 4) {
        CView.text("She stares at your " + describeCock(player, largestCock) + " and then up at you. \"<i>I... oh, well I guess this is okay.</i>\" She lazily slurps your member into her mouth, and moans at the taste of your " + describeCock(player, largestCock) + ". Her agile tongue moves over your entire length, licking gently over your sensitive head and along your shaft. Your " + describeCock(player, largestCock) + " sits comfortably inside her warm hole, covered in her saliva");
        if (player.body.cocks.length > 1) {
            CView.text(" while your other cock");
            if (player.body.cocks.length === 2) CView.text(" pokes");
            else CView.text("s poke");
            CView.text(" against her chin");
        }
        CView.text(".\n\n");
    }
    // [If the player has a cock between 5' – 12']
    else if (largestCock.length <= 12) {
        CView.text("She stares intently at your " + describeCock(player, largestCock) + " with hunger in her eyes. A small amount of drool escapes her luscious lips as she moves forward, kissing your ");
        if (player.body.cocks.length > 1) CView.text(" biggest head lightly");
        else CView.text(" head lightly");
        CView.text(".  Her saliva leaks onto your " + describeCock(player, largestCock) + ", though she is quick to lick it up while she works her tongue around the rest of your shaft");
        if (player.body.cocks.length > 1) CView.text(", jerking off your " + describeCock(player, player.body.cocks.sort(Cock.Largest).get(1)) + " with both hands");
        CView.text(".  She places small licks on the tip of your head, and then hungrily devours the rest of your length in one fell swoop.\n\n");
    }
    // [If the player has a cock equal to or over 13']
    else {
        CView.text("She gasps as you lift your " + describeCock(player, largestCock) + " and slap her face. \"<i>It's... wow, " + player.desc.name + "!</i>\" You grin before poking her pudgy cheek with the tip of your ");
        if (player.body.cocks.length > 1) CView.text("biggest erection");
        else CView.text("erection");
        CView.text(".  A small amount of drool escapes her luscious lips as she moves forward, kissing your head lightly. Her saliva leaks onto your " + describeCock(player, largestCock) + ", though she is quick to lick it up while she works her tongue around the rest of your lengthy shaft");
        if (player.body.cocks.length > 1) CView.text(" - using her hands to massage your leftover " + describeCock(player, player.body.cocks.sort(Cock.Largest).get(1)));
        CView.text(". She places small licks on the tip of your head, and without warning stuffs as much of your thick girth as she can into her mouth, coughing around your " + describeCock(player, largestCock) + ".\n\n");
    }

    CView.text("She begins fellating your cock at an incredible rate, throatfucking herself on your " + describeCock(player, largestCock));
    if (player.body.balls.count > 0) CView.text(", your sack slapping against her chin ");
    else if (player.body.chest.sort(BreastRow.Largest).get(0)!.rating > 2) CView.text(" while you play with your " + describeBiggestBreastRow(player));
    CView.text(". You remark on what a hungry little piggy she must be, and the chubby girl moans in response, the vibrations massaging your member. Relishing the feeling of your " + describeCock(player, largestCock) + " in between her hungry lips, you start to thrust into her warm mouth hole, grabbing onto her head as you pound her face against your groin.");
    if (player.body.cocks.length > 1) {
        if (player.body.cocks.length === 2) CView.text("  Your extra cock flails wildly, slapping against her cheeks.");
        else if (player.body.cocks.length > 2) CView.text("  Your extra cocks flail wildly, slapping against her cheeks.");
    }
    CView.text("  Lottie's slick tongue desperately wraps itself around your length as you drive in and out of her fuckhole relentlessly, drool beginning to leak from her mouth. She");
    // [if Multi]
    if (player.body.cocks.length > 1) CView.text(" stops rubbing your " + describeCock(player, largestCock) + " to ");
    // (Otherwise)
    else CView.text(" reaches down towards her dripping pussy; plunging two fingers into her wetness while using the other hand to ");
    // If Balls]
    if (player.body.balls.count > 0) CView.text("knead your " + describeBalls(true, true, player));
    else CView.text("reach around and squeeze your " + describeButt(player));
    CView.text(".  You grab the back of her head and pull her in further, bobbing her head while she slurps and sucks at your meatstick. The stimulation almost causes you to explode right then and there, but her bouncing tits give you an idea.\n\n");

    CView.text("You slowly take your " + describeCock(player, largestCock) + " out of her hot mouth, a small *pop* breaking the silence as it escapes her plump, puckered lips. Grabbing one of her hefty tits in your hands, you rub your cockhead against her erect nipple, eliciting a small moan from the sweaty slut. You slap your " + describeCock(player, largestCock) + " against her sweaty chest a few times before burying it in between her cleavage, ");
    // [If the player has a cock equal to or over 13']
    if (largestCock.length > 12) CView.text("your sensitive tip brushing against her eager mouth");
    // Otherwise]
    else CView.text("resting comfortably in between her cushiony fuckpillows");
    CView.text(". Lottie wraps her tits around your length and begins working at pleasuring your every inch.\n\n");

    // [If the player has a cock equal to or over 13']
    if (largestCock.length > 12) CView.text("Licking at your cockhead, Lottie squishes her breasts against the rest of your member, making sure to lap up the stray beads of pre-cum squirting from your tip. Relishing the taste of your " + describeCock(player, largestCock) + " in her mouth she begins to suck at your head, flicking her tongue around your urethra and pressing her full lips against it, creating a vacuum of pleasure around your manhood.\n\n");

    // [If Multi]
    if (player.body.cocks.length > 1) {
        CView.text("You decide to make use of ");
        if (player.body.cocks.length === 2) CView.text("your");
        else CView.text("an");
        CView.text(" extra cock as you push it between her pouty lips, her face brushing against it while she tries to titfuck your main member. Looking up at you, Lottie descends on you and begins fellating your " + describeCock(player, player.body.cocks.sort(Cock.Largest).get(1)) + ", not forgetting to knead her fat tits into your " + describeCock(player, largestCock) + ".\n\n");
    }

    CView.text("Raising her body up and down, you watch as the pig-slut massages her rack tightly around your rod whilst you plunge between her cleavage, thrusting slightly to match her movements. \"<i>" + player.desc.name + ", p-please cum on me, god- I need this!</i>\" she moans, her saliva lubing her chest while she pumps your dick in between her melons");
    if (player.body.cocks.length > 1) CView.text(" and chokes on your meat");
    CView.text(".  You throb against her hot flesh, feeling your spunk bubbling up inside you.  Throwing your head back, you give one final thrust before pulling back and exploding all over your squishy slut, ");
    if (player.cumQ() < 500) CView.text("thick ropes of cum splattering all over her face and pooling in between her tits");
    else CView.text("massive globules of cum splattering all over her face and painting her tits");
    CView.text(".  She continues to move up and down against the thick shaft between her breasts, determined to drain you of your seed. She pulls you out of her bosom and plunges your member back into her mouth, suckling on it for any stray milk left. After a while, you groan as she pops you back out, collecting the ");
    if (player.cumQ() > 500) CView.text("incredible amounts of ");
    CView.text("cum you've painted on her flesh and gulping it all down. \"<i>Thanks for the load, " + mf(player, "big guy", "babe") + ",</i>\" she remarks, sucking gently on her fingers. \"<i>I'll... I'll see you again, hey!</i>\" You pat her on the head and begin to make your way out of the gym, making sure to grab a ");
    if (Settings.sillyMode) CView.text("bacon ");
    CView.text("shake on the way out.");
    // LOTTIE FIGURE -1, MUSCLE TONE +1, DRAINS PC'S LUST.
    lottieTone(-1);
    if (LottieFlags.UNKNOWN_FLAG_NUMBER_00306 === 0) LottieFlags.UNKNOWN_FLAG_NUMBER_00306 = 1;
    CView.text(displayModTone(player, 100, 1));
    player.orgasm();
    return { next: passTime(1) };
}
// [Appearance]
function lotteryAppearance(player: Character): NextScreenChoices {
    CView.sprite(SpriteName.Lottie); // 36;

    CView.image("lottie-examine-appearance");
    // [If Figure between 0 – 20]
    if (lottieTone() <= 20) {
        CView.text("She stands at around 4'8</i>\", considerably short on average, ");
        if (player.body.tallness > 60) CView.text("and shorter than you");
        else if (player.body.tallness > 53) CView.text("but you can't judge, being roughly the same height");
        else CView.text("taller than you");
        CView.text(". Physique-wise, Lottie is very chubby, and at first glance, most people would consider her fat, or at least quite portly. Your hard work has definitely paid off. Of the few pig people you have seen around Tel'Adre, she would definitely fit in. The majority of her weight is focused on her voluptuous g-cups, child-bearing hips and vast butt, and her game-breaking pot-belly is also quite round to support the weight of her upper body. Her heart-shaped face is complimented by her button nose and soft lips, framed by her pink-gray hair, which ends in small curls. A small, coiled tail rests above her rump.");
    }
    // [If Figure between 20 - 40]
    else if (lottieTone() <= 40) {
        CView.text("She stands at around 4'8</i>\", considerably short on average, ");
        if (player.body.tallness > 60) CView.text("and shorter than you");
        else if (player.body.tallness > 53) CView.text("but you can't judge, being roughly the same height");
        else CView.text("taller than you");
        CView.text(". Physique-wise, Lottie is definitely chubby, though you wouldn't call her fat. Your work is definitely yielding results. Of the few pig people you have seen around Tel'Adre, she's definitely thinner than most. The majority of her weight is focused on her pillowy f-cups, voluminous thighs and tubby ass, though her stomach is rounded nicely to support the weight of her upper body. Her heart-shaped face is complimented by her button nose and soft lips, framed by her shoulder-length pink-gray hair, which ends in small curls. A small, coiled tail rests above her rump.");
    }
    // [If Figure between 40 - 60]
    else if (lottieTone() <= 60) {
        CView.text("She stands at around 4'8</i>\", short on average, ");
        if (player.body.tallness > 60) CView.text("and shorter than you");
        else if (player.body.tallness > 53) CView.text("but you can't judge, being roughly the same height");
        else CView.text("taller than you");
        CView.text(". Physique-wise, Lottie is definitely a bit chubbier than most girls, though you couldn't call her fat - of the few pig people you have seen around Tel'Adre, she's definitely the 'thinnest'. The majority of her weight is focused in her cushiony breasts, ample thighs and large ass, though her stomach is rounded nicely to support the weight of her upper body. Her heart-shaped face is complimented by her button nose and soft lips, framed by her pink-gray hair, which ends in small curls. A small, coiled tail rests above her rump.");
    }
    // [If Figure between 60 - 80]
    else if (lottieTone() <= 80) {
        CView.text("She stands at around 4'8</i>\", considerably short on average, ");
        if (player.body.tallness > 60) CView.text("and shorter than you");
        else if (player.body.tallness > 53) CView.text("but you can't judge, being roughly the same height");
        else CView.text("taller than you");
        CView.text(". Physique-wise, Lottie has a bit of chub around her, but otherwise she's in pretty good shape. Her hard work is definitely yielding results. You couldn't call her fat - of the few pig people you have seen around Tel'Adre, she's definitely the thinnest. The majority of her weight is focused in her cushiony breasts, thick thighs and shapely ass, though her stomach is rounded nicely to support the weight of her upper body. Her heart-shaped face is complimented by her button nose and soft lips, framed by her pink-gray hair, which ends in small curls. A small, coiled tail rests above her rump.");
    }
    // [If Figure between 80 - 100]
    else {
        CView.text("She stands at around 4'8</i>\", considerably short on average, ");
        if (player.body.tallness > 60) CView.text("and shorter than you");
        else if (player.body.tallness > 53) CView.text("but you can't judge, being roughly the same height");
        else CView.text("taller than you");
        CView.text(". Physique-wise, Lottie is in excellent shape, her curvy figure drawing the eyes of many males in the vicinity. Her hard work has definitely paid off. Of the few pig people you have seen around Tel'Adre, she is definitely the most conventionally attractive by far. What fat she does have is focused on her perky d-cups, girly thighs and cute ass, her flat stomach showcasing her shapely abdominal muscles that are more than capable of supporting the weight of her upper body. Her heart-shaped face is complimented by her button nose and soft lips, framed by her pink-gray hair, which ends in small curls. A small, coiled tail rests above her rump.");
    }
    // Back to lottery menu
    return { next: choiceWrap(encounterLottie) };
}

export function lottieTone(dif: number = 0): number {
    if (dif === 0) return LottieFlags.UNKNOWN_FLAG_NUMBER_00279;
    // if (debug) CView.text("\n<b>(DEBUG: Lottie Tone changed by " + dif + "!)</b>\n");
    LottieFlags.UNKNOWN_FLAG_NUMBER_00279 += dif;
    if (LottieFlags.UNKNOWN_FLAG_NUMBER_00279 > 100) LottieFlags.UNKNOWN_FLAG_NUMBER_00279 = 100;
    else if (LottieFlags.UNKNOWN_FLAG_NUMBER_00279 < 0) LottieFlags.UNKNOWN_FLAG_NUMBER_00279 = 0;
    // Clear blowjob/anal change talk flags in case tone is getting out of whack.
    if (LottieFlags.UNKNOWN_FLAG_NUMBER_00306 === 1) LottieFlags.UNKNOWN_FLAG_NUMBER_00306 = 0;
    if (LottieFlags.UNKNOWN_FLAG_NUMBER_00307 === 1) LottieFlags.UNKNOWN_FLAG_NUMBER_00307 = 0;
    return LottieFlags.UNKNOWN_FLAG_NUMBER_00279;
}
export function lottieMorale(dif: number = 0): number {
    if (dif === 0) return LottieFlags.UNKNOWN_FLAG_NUMBER_00280;
    // if (debug) CView.text("\n<b>(DEBUG: Lottie Morale changed by " + dif + "!)</b>\n");
    LottieFlags.UNKNOWN_FLAG_NUMBER_00280 += dif;
    if (LottieFlags.UNKNOWN_FLAG_NUMBER_00280 > 100) LottieFlags.UNKNOWN_FLAG_NUMBER_00280 = 100;
    else if (LottieFlags.UNKNOWN_FLAG_NUMBER_00280 < 0) LottieFlags.UNKNOWN_FLAG_NUMBER_00280 = 0;
    return LottieFlags.UNKNOWN_FLAG_NUMBER_00280;
}

// [Talk]
function talkToPigSlut(player: Character): NextScreenChoices {
    CView.sprite(SpriteName.Lottie); // 36;
    CView.clear();
    let comedy1;
    LottieFlags.UNKNOWN_FLAG_NUMBER_00308 = lottieTone();
    // FIRST TIMER SHIT
    // [If 1st Time Oral]
    if (LottieFlags.UNKNOWN_FLAG_NUMBER_00306 === 1) {
        LottieFlags.UNKNOWN_FLAG_NUMBER_00306 = 2;
        CView.text("Her ears perk up at your eagerness to talk, but you can tell she's otherwise gloomy. You ask her what's wrong. \"<i>That obvious, huh?</i>\" Lottie looks down onto the table.  \"<i>Y'see, " + mf(player, "big guy", "babe") + ", ever since I... you know, I've actually - I've gained weight!</i>\"  She stands up, her chubby cheeks puffed out in frustration. \"<i>I mean, i-it's not like I didn't enjoy it or anything, but... it seems to be having the opposite effect of what I want!</i>\" She's clearly annoyed, but you place your hand on her shoulder. Do you encourage her, or is it her own fault?");
        // [Encourage][Abuse]
        return { choices: [["Encourage", firstOralReactionChooseEncourage], ["Abuse", firstOralReactionChooseAbuse]] };
    }
    // [If 1st Time Anal]
    else if (LottieFlags.UNKNOWN_FLAG_NUMBER_00307 === 1) {
        LottieFlags.UNKNOWN_FLAG_NUMBER_00307 = 2;
        CView.text("Her ears perk up at your eagerness to talk, she seems to be pretty excited about something. You ask her what's on her mind. \"<i>That obvious, huh?</i>\" Lottie looks up at you and grins.  \"<i>Y'see, " + mf(player, "big guy", "babe") + ", ever since we... you know, I've actually – I've lost weight!</i>\" She stands up, pumping her fist in the air and wiggling her plump ass. \"<i>I mean, I know it's not a big difference, but it's still a result! This is amazing!</i>\" She's clearly pleased with herself. You place a hand on her shoulder, and she beams at you. Do you encourage her, or break the bad news?");
        // [Encourage][Abuse]
        return { choices: [["Encourage", firstAnalReactionChooseEncourage], ["Abuse", firstAnalReactionChooseAbuse]] };
    }
    // FATNESS
    // [If Gained Weight since Last Encounter, Encouragement 0 - 30]
    else if (lottieMorale() <= 30 && LottieFlags.UNKNOWN_FLAG_NUMBER_00308 - 5 > lottieTone()) {
        CView.text("You tell her you want to talk, though the girl only winces in response, shying away from your stern gaze. The nervous pig-slut knows from experience how most of your 'talks' usually end – with a sobbing, miserable little piggy.  In the sweetest voice you can muster, you ask her how your favorite girl is doing. Lottie hesitates before facing you again – you know she hates it when you use that voice, and she definitely seems to be hiding something now. You tell her to spill what's on her mind.  \"<i>W-well, you see...</i>\" Lottie squeaks, fumbling her fingers as she gathers the courage to speak up.  \"<i>Y'see, " + mf(player, "sir", "ma'am") + ", since we last m-met, I've actually – I've actually...</i>\" She mumbles the rest of the sentence, but you demand her to repeat it. \"<i>... I've gained w-weight.</i>\" The girl immediately flinches, expecting a backlash from you at any moment. Before long, she slowly raises her head to find you staring. You grab her by the chin, the girl moaning at your touch. Do you congratulate her, or break the bad news?");
        // [Encourage][Abuse]
        return { choices: [["Encourage", lottieLowMoraleWeightGainEncourage], ["Abuse", lottieLowMorealeWeightGainAbuse]] };
    }
    // [If Gained Weight since Last Encounter, Encouragement 30 - 70]
    else if (lottieMorale() <= 70 && LottieFlags.UNKNOWN_FLAG_NUMBER_00308 - 5 > lottieTone()) {
        CView.text("Her ears perk up at your eagerness to talk, but you can tell she's otherwise gloomy. You ask her what's wrong. \"<i>That obvious, huh?</i>\" Lottie looks down onto the table.  \"<i>Y'see, " + mf(player, "big guy", "babe") + ", ever since we last met, I've actually - I've gained weight!</i>\" She stands up, her chubby cheeks puffed out in frustration. \"<i>I mean, i-it's not like I'm angry at you or anything, but... I'm just a little frustrated, that's all.</i>\" She's clearly more than a little frustrated, but you place your hand on her shoulder. Do you encourage her, or is it her own fault?");
        // [Encourage][Abuse]
        return { choices: [["Encourage", lottieMediumMoraleWeightGainEncourage], ["Abuse", lottieMediumMorealeWeightGainAbuse]] };
    }
    // [If Gained Weight since Last Encounter, Encouragement 70 – 100, convinced 'Bigger is Better']
    else if (LottieFlags.UNKNOWN_FLAG_NUMBER_00308 - 5 > lottieTone() && LottieFlags.UNKNOWN_FLAG_NUMBER_00297 === 1) {
        CView.text("Her ears perk up at your eagerness to talk, though she seems rather distracted by something. You ask her what's wrong. \"<i>Oh babe, it's really nothing...</i>\" Lottie looks up and smiles, but your questioning gaze earns another answer. \"<i>Dang, y'see " + mf(player, "big guy", "babe") + ", ever since we last met, I've gone ahead and gained a bit more weight...</i>\" She remains in her chair, resting her face between her arms, though her chubby cheeks remain puffed out in frustration. \"<i>I mean, I love my body and I love you, but... it gets to me sometimes, y'know?</i>\" She's clearly more than a little frustrated, but you place your hand on her shoulder, rubbing it gently. Do you encourage her, or is it her own fault?");
        // [Encourage][Abuse]
        return { choices: [["Encourage", lottieHighMoraleWeightGainFATTYLOVESIT], ["Abuse", lottieHighMoraleWeightGainFATTYLOVESABUSE]] };
    }
    // [If Gained Weight since Last Encounter, Encouragement 70 - 100]
    else if (LottieFlags.UNKNOWN_FLAG_NUMBER_00308 - 5 > lottieTone()) {
        CView.text("Her ears perk up at your eagerness to talk, though she seems rather distracted by something. You ask her what's wrong. \"<i>Oh babe, it's really nothing...</i>\" Lottie looks up and smiles, but your questioning gaze earns another answer. \"<i>Dang, well, y'see " + mf(player, "big guy", "babe") + ", ever since we last met, I've gone ahead and gained weight!</i>\" She stands up, her chubby cheeks puffed out in frustration. \"<i>I mean, i-it's not like I'm angry at you or anything, but... I'm just a little frustrated, that's all.</i>\" She's clearly more than a little frustrated, but you place your hand on her shoulder. Do you encourage her, or is it her own fault?");
        // [Encourage][Abuse]
        return { choices: [["Encourage", lottieHighMoraleWeightGainEncourage], ["Abuse", lottieHighMoraleWeightGainAbuse]] };
    }
    // DEFATNESS
    // [If Lost Weight since Last Encounter, Encouragement 0 - 30]
    else if (lottieMorale() <= 30 && LottieFlags.UNKNOWN_FLAG_NUMBER_00308 < lottieTone() - 5) {
        CView.text("You tell her you want to talk, though the girl only winces in response, shying away from your stern gaze. The nervous pig-slut knows from experience how most of your 'talks' usually end – with a sobbing, miserable little piggy.  In the sweetest voice you can muster you ask her how your favorite girl is doing. Lottie hesitates before facing you again – you know she hates it when you use that voice, but she also seems to be vaguely excited about something. You tell her to spill what's on her mind. \"<i>W-well, you see...</i>\" Lottie looks up at you and manages the tiniest smile. \"<i>Y'see, " + mf(player, "sir", "ma'am") + ", since we last m-met, I've actually – I've lost weight!</i>\" Her minute expression turns into a full blown grin, though immediately fades as soon as she realizes what she's done. \"<i>No, I'm – I'm sorry, I didn't... I got ahead of myself again, I was being stupid, I was-</i>\"  You cut her off by placing a finger to her lips. She moans at your touch, though squeals at your intention. Do you congratulate her, or break the bad news?");
        // [Encourage][Abuse]
        return { choices: [["Encourage", lottieLowMoraleWeightLossEncourage], ["Abuse", lottieLowMoraleWeightLossAbuse]] };
    }
    // [If Lost Weight since Last Encounter, Encouragement 30 - 70]
    else if (lottieMorale() <= 70 && LottieFlags.UNKNOWN_FLAG_NUMBER_00308 < lottieTone() - 5) {
        CView.text("Her ears perk up at your eagerness to talk; she seems to be pretty excited about something. You ask her what's on her mind.  \"<i>That obvious, huh?</i>\" Lottie looks up at you and grins. \"<i>Y'see babe, since the last time we met, I've actually – I've lost weight!</i>\" She stands up, pumping her fist in the air and wiggling her plump ass. \"<i>I mean, I know it's not a big difference, but it's still a result! This is amazing!</i>\" She's clearly pleased with herself. You place a hand on her shoulder, and she beams at you. Do you encourage her, or break the bad news?\n\n");
        // [Encourage][Abuse]
        return { choices: [["Encourage", lottieMediumMoraleWeightLossEncourage], ["Abuse", lottieMediumMoraleWeightLossAbuse]] };
    }
    // [If Lost Weight since Last Encounter, Encouragement 70 – 100, convinced 'Bigger is Better']
    else if (LottieFlags.UNKNOWN_FLAG_NUMBER_00308 < lottieTone() - 5 && LottieFlags.UNKNOWN_FLAG_NUMBER_00297 === 1) {
        CView.text("Her ears perk up at your eagerness to talk; she seems to be pretty concerned about something. You ask her what's on her mind. \"<i>Haha, that obvious, babe?</i>\" Lottie looks up at you and smiles politely. \"<i>Y'see babe, since the last time we met, I've actually – I've lost weight.</i>\" She sits, curling a strand of hair through her finger. \"<i>I mean, I like my body how it is, and... and I don't want to change it, y'know? Especially if it means losing you.</i>\" She's clearly concerned about your reaction. You place a hand on her shoulder, and she sighs. Do you mind, or do you decide to break the bad news?");
        return { choices: [["Encourage", lottieHighMoraleWeightLossFATTYLOVESIT], ["Abuse", lottieHighMoraleWeightLossFATTYLOVESABUSE]] };
    }
    // [If Lost Weight since Last Encounter, Encouragement 70 - 100]
    else if (LottieFlags.UNKNOWN_FLAG_NUMBER_00308 < lottieTone() - 5) {
        CView.text("Her ears perk up at your eagerness to talk; she seems to be pretty excited about something. You ask her what's on her mind.  \"<i>That obvious, huh?</i>\" Lottie looks up at you and grins. \"<i>Y'see babe, since the last time we met, I've actually – I've lost weight!</i>\" She stands up, pumping her fist in the air and wiggling her plump ass. \"<i>I mean, I know it's not a big difference, but it's still a result! This is amazing!</i>\" She's clearly pleased with herself. You place a hand on her shoulder, and she beams at you. Do you encourage her, or break the bad news?\n\n");
        return { choices: [["Encourage", lottieHighMoraleWeightLossEncourage], ["Abuse", lottieHighMoraleWeightLossAbuse]] };
    }
    // [If Encouragement = 0, Figure = 0, first time]
    else if (lottieMorale() === 0 && lottieTone() === 0 && LottieFlags.UNKNOWN_FLAG_NUMBER_00309 === 0) {
        LottieFlags.UNKNOWN_FLAG_NUMBER_00309 = 1;
        CView.text("You tell Lottie that you want to talk, though the girl seems to be incredibly impatient to explain what's on her mind as well. She seems to be on the verge of tears, and it isn't until you ask her what's on her mind that she finally breaks down, sobbing. \"<i>I'm... *hic* I'm so sorry, " + player.desc.name + "! I just don't know what went wrong!</i>\" she cries, her face buried in her hands. A few of the cafe-goers seem to look your way, but quietly ignore what obviously isn't their business. \"<i>I've wasted your time, I-I've wasted my time, and... oh god, please, please forgive me for being like this!</i>\" The girl looks up at you, her tear-stricken face in complete anguish. You take one look at your pigslut before calmly telling her that you don't see the point in trying anymore. In fact, why should you be here now? You might as well go, seeing as she can't possibly get any worse. \"<i>I'LL DO ANYTHING!</i>\" she blurts out desperately, clinging to your arm as you try to take your leave. \"<i>I'll... I'll do anything you want.</i>\" You smile at her enthusiasm. There's so many things that you want, though. But what do you want... from her?");
        // [To Fuck][To Humiliate][To Leave]
        comedy1 = undefined;
        if (Settings.sillyMode) comedy1 = lottieFatLoserCulminationLeaveComedyChoice;
        return { choices: [["To Fuck", lottieFatLoserCulminationFuckChoice], ["To Humiliate", lottieFatLoserCulminationHumiliationChoice], ["To Leave", comedy1]] };
    }
    // [If Encouragement =100, Figure =0, first time]
    else if (lottieMorale() === 100 && lottieTone() === 0 && LottieFlags.UNKNOWN_FLAG_NUMBER_00312 === 0) {
        LottieFlags.UNKNOWN_FLAG_NUMBER_00312 = 1;
        CView.text("Her ears perk up at your eagerness to talk, though she seems incredibly distracted by something – worried, even. You tell her about your concern before asking her if there's anything you could do. \"<i>Oh babe, it's really... I don't know. Maybe it's nothing.</i>\" Lottie looks up and smiles, but her distant gaze seems to imply that her thoughts are being occupied by something much larger than nothing. Not taking that as an acceptable answer, you push her further.  \"<i>I guess nothing's gonna get past you, huh?</i>\" She frowns – you might've stepped on a landmine here. Still, you're worried at the prospect that something's upsetting her, so you figure that pushing a few buttons might be necessary. Lottie scrunches up her face in frustration before taking a deep breath and sighing audibly. \"<i>" + player.desc.name + ". I'm grateful for everything you've done for me.</i>\" She begins. \"<i>In fact, I'm grateful that you're even still here after all this time. I haven't been losing weight, even under your guidance. In fact, I know I've gained much more than before. I just... I don't feel pretty any more. I can't. Not like this.</i>\"  The girl stares at you with deep emerald eyes, tears starting to form at the corners. \"<i>I don't know what to do. I don't want to lose you – not as a friend, or as... more. But I know inside that I – that I could never deserve someone as amazing as you.</i>\" You're visibly surprised at her confession. You're entirely aware of her feelings for you – in fact; you're certain that by now everyone in the cafe knows about it. Still, you remain confused. She... doesn't deserve you?  You know full well that Lottie's never been quite comfortable with how she looks, but it seems to you that her opinion of her body seems to rely on yours. You take her hand into your own, looking Lottie in the eyes before telling her how you feel.\n\n");
        // [Love Yourself][You'll Get There][Ew Lottie No]
        comedy1 = undefined;
        if (Settings.sillyMode) comedy1 = ewLottieNo;
        return { choices: [["Love Self", lottieHighMoraleFatLoveSelfOneTimeEvent], ["StickWithIt", lottieHighMoraleFatYoullGetThereOneTimeEvent], ["EwLottieNo", comedy1]] };
    }
    // [If Encouragement = 0, Figure = 100, first time]
    else if (lottieMorale() === 0 && lottieTone() === 100 && LottieFlags.UNKNOWN_FLAG_NUMBER_00315 === 0) {
        LottieFlags.UNKNOWN_FLAG_NUMBER_00315 = 1;
        CView.text("You tell Lottie that you want to talk, though the girl seems to be fidgeting – something important seems to have occupied her mind. She's broken out into a sweat, her nervousness getting the better of her before she decides to spill her thoughts. \"<i>I didn't want you to leave me!</i>\" she cries, loud enough to attract the attention of several cafe-goers who look your way, but quietly ignore what obviously isn't their business. \"<i>I've spent so much of my time... so much of your time to look like this, a-and I thought things would be better once I looked better, but...!</i>\" The girl looks up at you, on the verge of tearing up in frustration. You tell her you don't quite follow, when she quickly pulls you out of your seat and runs towards the yoga rooms. Inside, a girl sits alone on a mat, stretching her legs quite aimlessly when she spots the both of you and waves shyly. \"<i>" + player.desc.name + "... this is Elle. She's... she's my friend.</i>\" You stand quietly, staring at the tanned beauty in front of you. She's naturally more athletic-looking than Lottie, having a thinner build and a smaller bust – though her wide hips certainly aren't something to laugh at. You're more intent on staring at her most glaring features, however. The bronze girl sports four arms, each of which ends in carapace-covered hands, giving off the impression of black wrist-gloves. Two spider-like arms are visibly poking from her back, though they seem more aesthetic than functional. Her neat, pale-blonde hair is tied in a side pony-tail which frames her soft face. Two black dots mark either side of her eyes, though you aren't sure if they're used for enhanced vision or decoration.\n\n");

        CView.text("The spider-girl notices your curious gaze and smiles politely. You wonder why she hasn't introduced herself until she uses two of her hands to quickly and efficiently spin a small web between them, forming a visible sentence. 'Hi!' it reads. \"<i>Elle's a mute, so she spins sentences with her webs.</i>\" Lottie explains. You chuckle to yourself as you realize why such an attractive person would be able to make friends with the timid pig-girl. She seems to be at ease in the company of her arachnid-friend, so you decide to question her frustration earlier. Lottie looks up at you before taking another glance at Elle, who nods and stands up, advancing towards the both of you. \"<i>I... I thought you'd l-leave me once you were done with me.</i>\" Lottie slowly removes her top, her pillowy tits bouncing out of the fabric. \"<i>I want to be worth something to y-you, so... I'm making myself worth it.</i>\" She jumps out of her tight shorts, while you turn to look at the spider-girl, her bronze, slim body already undressed. She's quick, you think to yourself. \"<i>A-at first, Elle didn't want to do it. She doesn't know you at all, and... and it would've been weird to share me with someone else.</i>\" The sentence plays back in your head. It would've been weird to share... Lottie? What's going on? \"<i>B-but eventually I convinced her... because she's in love with me, like I am with you.</i>\" And then it clicks. Someone had fallen for your pig-slut, who took advantage of her feelings to convince her to fuck you. Just so you wouldn't leave her.\n\n");

        CView.text("You might as well embrace the new member of your group.");
        // [Threesome][Elle][Oh I Get It]
        comedy1 = undefined;
        if (Settings.sillyMode) comedy1 = charlottesWebComedyBullshit;
        return { choices: [["Threesome", lottieElleThreesomeFirstTime], ["Just Elle", fuckElleInsteadOfThatFatSlutFirstTime], ["Oh,IGetIt!", comedy1]] };
    }
    // [If Encouragement = 100, Figure = 100, first time]
    else if (lottieMorale() === 100 && lottieTone() === 100 && LottieFlags.UNKNOWN_FLAG_NUMBER_00318 === 0) {
        LottieFlags.UNKNOWN_FLAG_NUMBER_00318 = 1;
        CView.text("You tell Lottie that you want to talk, though the girl seems too distracted by something else. She looks up at you, and judging by her excited jittering and giant smile, the girl appears to be on the verge of exploding in happiness. You grin and ask cautiously if she has anything on her mind. \"<i>Oh, babe!</i>\" she cries out, jumping out of her seat to hug-tackle you onto the ground, planting kisses all over your face. A few of the cafe-goers seem to look your way, chuckling at Lottie's embarrassing outburst. \"<i>Back when I first met you, I made myself an invisible goal to achieve while you were here.</i>\" She smiles, straddling you on the floor while you nod helplessly. \"<i>I just weighed myself this morning and... and I...</i>\" The pig-girl looks up at you, before smooching you directly on the lips. You ask if something good happened, to which she laughs heartily. \"<i>Oh babe, something amazing happened! I've blown past my goal! It's wonderful, I just... I never would've been able to do this without you.</i>\" You reassure her that with enough time she would, but you're glad she feels that way. \"<i>In fact,</i>\" Lottie smiles slyly, removing herself from you while you pick yourself up off the floor. \"<i>I want to thank you properly.</i>\" Reaching down, Lottie cups " + describeEachOfYourCocks(player) + " and squeezes gently, stirring the beast within. \"<i>Meet me in the yoga room,</i>\" she purrs before walking out of the cafe.");
        // [Yoga Room][Leave]
        return { choices: [["Yoga Room", lottieSuccessOneShot], ["Leave", leaveLottieInsteadOfYogaSex]] };
    }
    // If Neither, Encouragement 0 - 30]
    else if (lottieMorale() <= 30) {
        CView.text("You tell her you want to talk, though the girl only winces in response, shying away from your stern gaze. The nervous pig-slut knows from experience how most of your 'talks' usually end – with a sobbing, miserable little piggy.  In the sweetest voice you can muster you ask her how your favorite girl is doing. Lottie hesitates before facing you again – you know she hates it when you use that voice, but she doesn't seem to have anything important to say. Regardless, you tell her to spill what's on her mind. \"<i>W-well, you see...</i>\" Lottie looks up at you and manages the tiniest smile. \"<i>Y'see, " + mf(player, "sir", "ma'am") + ", nothing's really happened since we last met...</i>\" She seems apologetic over the lack of news, babbling about how she'll do her best today.\n\nWithout much to go on, you can't really comment on her progress.");
        return { next: passTime(1) };
    }
    // [If Neither, Encouragement 30 - 70]
    else if (lottieMorale() <= 70) {
        CView.text("Her ears perk up at your eagerness to talk, though she doesn't seem to have much on her mind. Regardless, you ask how she's been doing. \"<i>Haha, a bit curious, are we?</i>\" Lottie looks up at you and grins. \"<i>Well, I'm afraid nothing's really happened since we last met y'know? Maybe today we can get some results!</i>\" she stands up, pumping her fist in the air and wiggling her plump ass. \"<i>And if you want... we could go do some yoga, eheh...</i>\" She's clearly quite antsy. You chuckle at her comment, though you feel a familiar sensation stirring in your groin.");
        player.stats.lust += 2;

        CView.text("Without much to go on, you can't really comment on her progress.");
        return { next: passTime(1) };
    }
    // [If Neither, Encouragement 70 - 100]
    else if (lottieMorale() <= 100000) {
        CView.text("Her ears perk up at your eagerness to talk, though she doesn't seem to have much on her mind. Regardless, you ask how she's been doing. \"<i>Haha, you really that interested in me, babe?</i>\" Lottie looks up at you and grins. \"<i>Well, I'm afraid nothing's really happened since we last met y'know? I don't mind, but hey – you get what you get!</i>\" she stands up, grinning slyly before turning around and wiggling her plump ass at you. \"<i>And if you want... we could go do some yoga, eheh...</i>\" She's clearly quite antsy. You reach over and slap her bouncing butt, Lottie squealing in return. You both chuckle at her comment, though you feel a familiar sensation stirring in your groin.\n\n");
        player.stats.lust += 2;

        CView.text("Without much to go on, you can't really comment on her progress.");
        return { next: passTime(1) };
    }
    else {
        CView.text("<b>SHIT BUGGED OUT SON.</b>");
        return { next: passTime(1) };
    }
}

// [If Encourage]
function firstOralReactionChooseEncourage(player: Character): NextScreenChoices {
    CView.sprite(SpriteName.Lottie); // 36;

    CView.text("You tell her it isn't her fault; results don't magically appear in the first few weeks. Her weight is bound to fluctuate now and then, it's completely natural. She looks up at you, her eyes welling up slightly. \"<i>Is that true? It's completely natural?</i>\" You nod your head. \"<i>I'm glad. I'm so glad.</i>\" She sniffs, wiping away her tears and taking a deep breath. You rub her shoulder as she places her hand upon yours. Lottie continues to talk about her day for a few more minutes before you both decide to hit the track.\n\n");
    CView.text("<b>...</b>\nAfter a good workout, you decide to return back to camp, exhausted.");
    // ENCOURAGEMENT +2
    lottieMorale(3);
    player.stats.fatigue += 10;
    return { next: passTime(1) };
}

// [If Abuse]
function firstOralReactionChooseAbuse(player: Character): NextScreenChoices {
    CView.sprite(SpriteName.Lottie); // 36;

    CView.text("You tell Lottie your methods never fail, and if something happened that wasn't supposed to, it's her that's at fault. She looks up at you, shocked at your outburst. Lost for words, her eyes begin to well up. \"<i>I... god, I'm so stupid! Of course it was me! It's always me!</i>\" She cries softly to herself, pushing your hand off her shoulder and burying her head in her arms. \"<i>I wasted your time! I'm... I'm...</i>\" Before she finishes her sentence, you walk away from the cafe, content with what you've done. You don't stop hearing her whimpering voice until you leave the gym, returning back to camp – strangely satisfied.");
    // ENCOURAGEMENT -2
    lottieMorale(-10);
    return { next: passTime(1) };
}

// [If Encourage]
function firstAnalReactionChooseEncourage(player: Character): NextScreenChoices {
    CView.sprite(SpriteName.Lottie); // 36;

    CView.text("You congratulate her on her success; you're quite proud that she's deciding to stick this through. Lottie beams at you, clearly excited that she's with you again. You ask her if she wants to meet you in the sauna for some 'stretches' – emphasising the last word heavily whilst making exaggerated quotation marks with your fingers. \"<i>Haha, I'm sorry " + player.desc.name + ", but to tell you the truth, my butt still hurts from the last time we stretched.  Would it be okay if we, erm, did some regular exercises for now?</i>\" You both chuckle, despite the fact that you were completely serious about boning her in the sauna. Regardless, you decide to give it a rest and tell her you're going to go hit the track, if she's willing to join you.\n\n");
    CView.text("<b>...</b>\nAfter a good workout, you decide to return back to camp, exhausted.");
    // ENCOURAGEMENT +2
    lottieMorale(3);
    player.stats.fatigue += 10;
    return { next: passTime(1) };
}

// [If Abuse]
function firstAnalReactionChooseAbuse(player: Character): NextScreenChoices {
    CView.sprite(SpriteName.Lottie); // 36;

    CView.text("You sneer at Lottie, sternly reminding her that she's nowhere near her goal the way she is now – and a few pounds isn't going to change anything. In fact, she probably just measured herself in the morning, and it's likely she hasn't lost any weight at all, being the pig she is. Lottie doesn't seem to have anything to say. She stares at you, wondering where this all came from. After a few seconds of silence, she breaks into sobs, pushing herself out of her chair and running away from the gym. You know she'll come back, though. Deciding you're done here, you return back to camp – strangely satisfied.");
    // ENCOURAGEMENT -2
    lottieMorale(-10);
    return { next: passTime(1) };
}

// [If Encourage]
function lottieLowMoraleWeightGainEncourage(player: Character): NextScreenChoices {
    CView.sprite(SpriteName.Lottie); // 36;

    CView.text("You tell her that she shouldn't cry, or worry – sometimes, these things happen; results don't magically appear in the first few weeks, right? Her weight is bound to fluctuate now and then, it's completely natural. She looks up at you, confused at your tone of voice, but relieved at the same time. \"<i>I... okay. Th-thank you, " + player.desc.name + ".</i>\" You nod and smile, waving it off as nothing. She sniffs, wiping away her tears and taking a deep breath. You relinquish your grip on her chin, and she relaxes considerably. Lottie continues to stay at ease for a few more minutes before you both decide to hit the track.\n\n");
    CView.text("<b>...</b>After a good workout, you decide to return back to camp, exhausted.");
    // ENCOURAGEMENT +2
    lottieMorale(3);
    player.stats.fatigue += 10;
    return { next: passTime(1) };
}

// [If Abuse]
function lottieLowMorealeWeightGainAbuse(player: Character): NextScreenChoices {
    CView.sprite(SpriteName.Lottie); // 36;

    CView.text("You increase your grip on Lottie's face, pulling her towards you as you growl. She squeals, apologizing over and over again for her uselessness – but that's not enough. It's never enough. You take your hand off her chin, and she recoils, trying to rub the pain away. You look around for anyone curious enough to watch you but, as far as you know, the only person in the entire cafe at this time is the clerk who's thankfully taken a break for now. Without anyone to bear witness, you remove yourself from the seat and walk towards Lottie, who quickly jumps out of hers, backing away from you. You growl for her to come to you, but she winces in response. You dash quickly to her side, grabbing her arm. She could yell at any time, but you know she won't – she's weak, dependent. You're the only one who can save her from her body. And now you're about to tell her what happens when you're denied. Thwack! The sound of you backhanding your pig-slut rings through the entire cafe, though not a single soul is there to watch as Lottie crumples to the ground in a sobbing heap. You growl at her to stand up, and she complies. You've got some exercise to catch up on.\n\n");
    CView.text("<b>...</b>\nAfter a good workout, you decide to return back to camp, exhausted.");
    lottieMorale(-10);
    player.stats.fatigue += 10;
    return { next: passTime(1) };
}

// [If Encourage]
function lottieMediumMoraleWeightGainEncourage(player: Character): NextScreenChoices {
    CView.sprite(SpriteName.Lottie); // 36;

    CView.text("You tell her it isn't her fault; these things happen all the time for a variety of reasons. Her weight is bound to fluctuate now and then, it's completely natural. She looks up at you, her eyes welling up slightly. \"<i>Is that true? It's completely natural?</i>\" You nod your head. \"<i>I'm glad. I'm so glad.</i>\" She sniffs, wiping away her tears and taking a deep breath. You rub her shoulder as she places her hand upon yours. Lottie continues to talk about her day for a few more minutes before you both decide to hit the track.\n\n");
    CView.text("<b>...</b>\nAfter a good workout, you decide to return back to camp, exhausted.");
    // ENCOURAGEMENT +2
    lottieMorale(3);
    player.stats.fatigue += 10;
    return { next: passTime(1) };
}
// If Abuse]
function lottieMediumMorealeWeightGainAbuse(player: Character): NextScreenChoices {
    CView.sprite(SpriteName.Lottie); // 36;

    CView.text("You tell Lottie your methods never fail, and if something happened that wasn't supposed to, it's her that's at fault. She looks up at you, shocked at your outburst. Lost for words, her eyes begin to well up. \"<i>I... god, I'm so stupid! Of course it was me! It's always me!</i>\" She cries softly to herself, pushing your hand off her shoulder and burying her head in her arms. \"<i>I wasted your time! I'm... I'm...</i>\" Before she finishes her sentence, you walk away from the cafe, content with what you've done. You don't stop hearing her whimpering voice until you leave the gym, returning back to camp – strangely satisfied.");
    lottieMorale(-10);
    return { next: passTime(1) };
}

// [If Encourage]
function lottieHighMoraleWeightGainEncourage(player: Character): NextScreenChoices {
    CView.sprite(SpriteName.Lottie); // 36;

    CView.text("You tell her it's never her fault for something like that; and it's perfectly fine to be frustrated – as long as it doesn't detract from her main goal. Her weight is bound to fluctuate now and then, it's completely natural. She looks up at you, beaming at your kind words. \"<i>" + player.desc.name + ", you really do know how to make people feel better, y'know?</i>\" You nod your head in agreement – you know. \"<i>I'm glad. I'm so glad.</i>\" She sighs, taking a deep breath. You rub her shoulder as she places her hand upon yours. Lottie continues to talk about her day for a few more minutes before you both decide to hit the track.\n\n");
    CView.text("<b>...</b>\nAfter a good workout, you decide to return back to camp, exhausted.");
    // ENCOURAGEMENT +2
    lottieMorale(3);
    player.stats.fatigue += 10;
    return { next: passTime(1) };
}

// [If Abuse]
function lottieHighMoraleWeightGainAbuse(player: Character): NextScreenChoices {
    CView.sprite(SpriteName.Lottie); // 36;

    CView.text("You frown, tightening your grip on her shoulder. \"<i>H-hey, what's the big idea?</i>\" she asks, brushing your grip away and standing up to face you. \"<i>I know you're probably just as annoyed as I am, but there's no reason to start being a jerk, y'know?</i>\" But you do know, you tell her, gritting your teeth at her outburst. You know that without proper discipline, there's only one road this is going to lead to. She swallows hard, wondering what direction you're planning on taking the conversation. But you don't plan on talking any further. In one swift movement, you lurch forward, punching Lottie directly in the stomach, winding her and causing the pig-girl to crumple onto the floor, writhing in pain. You tell her not to gain weight anymore, if she knows what's good for her. She sobs quietly back at you.\n\n");
    CView.text("Deciding you're done here, you return back to camp – strangely satisfied.");
    lottieMorale(-10);
    return { next: passTime(1) };
}

// [If Encourage]
function lottieHighMoraleWeightGainFATTYLOVESIT(player: Character): NextScreenChoices {
    CView.sprite(SpriteName.Lottie); // 36;

    CView.text("You tell her it's never her fault for something like that; and even though it's fine to feel frustrated once in a while, letting things get to her will only cause more problems than solve them. Her weight should never be an issue – and even if it does move about, so what? You love her all the same. She looks up at you, blushing as you mention the word 'love'. \"<i>" + player.desc.name + ", I... I love you too, babe!</i>\" She cries, leaping up and embracing you, placing a large smooch on your lips. You laugh and nod your head in agreement, though you're rather embarrassed. \"<i>I'm glad. I'm so glad.</i>\" She sighs, taking a deep breath. You share the hug for a few more seconds before taking your seats. Lottie continues to talk about her day for a few more minutes before you both decide to hit the track.\n\n");
    CView.text("<b>...</b>\nAfter a good workout, you decide to return back to camp, exhausted.");
    // ENCOURAGEMENT +2
    lottieMorale(3);
    player.stats.fatigue += 10;
    return { next: passTime(1) };
}
// [If Abuse]
function lottieHighMoraleWeightGainFATTYLOVESABUSE(player: Character): NextScreenChoices {
    CView.sprite(SpriteName.Lottie); // 36;

    CView.text("You frown, tightening your grip on her shoulder. \"<i>H-hey, what's the big idea?</i>\" she asks, brushing your grip away and standing up to face you. \"<i>I know you're probably just as annoyed as I am, but there's no reason to start being a jerk, y'know?</i>\" But you do know, you tell her, gritting your teeth at her outburst. You know that without proper discipline, there's only one road this is going to lead. She swallows hard, wondering what direction you're planning on taking the conversation. But you don't plan on talking any further. In one swift movement, you lurch forward, punching Lottie directly in the stomach, winding her and causing the pig-girl to crumple onto the floor, writhing in pain. You tell her that you love to fuck her juicy pig fat, but if she knows what's good for her, she'll stop gaining more weight. She sobs quietly back at you.\n\n");
    CView.text("Deciding you're done here, you return back to camp – strangely satisfied.");
    lottieMorale(-10);
    return { next: passTime(1) };
}

// [If Encourage]
function lottieLowMoraleWeightLossEncourage(player: Character): NextScreenChoices {
    CView.sprite(SpriteName.Lottie); // 36;

    CView.text("You congratulate her on her success, in fact – you could almost say you are quite happy with her results. Lottie is visibly confused, not expecting you to react this way. Regardless, she takes the compliment for what it's worth and squeals happily, popping your finger into her warm mouth and suckling gently. Pulling your hand away, you pat her softly on the head. \"<i>Th-thank you... thanks, " + player.desc.name + ".</i>\"  You both share a smile, Lottie at ease with your unnaturally welcoming nature. You stand up, telling her you're going to go hit the track, if she's willing to join you – and of course, Lottie eagerly follows.\n\n");
    CView.text("<b>...</b>\nAfter a good workout, you decide to return back to camp, exhausted.");
    // ENCOURAGEMENT +2
    lottieMorale(3);
    player.stats.fatigue += 10;
    return { next: passTime(1) };
}

// [If Abuse]f
function lottieLowMoraleWeightLossAbuse(player: Character): NextScreenChoices {
    CView.sprite(SpriteName.Lottie); // 36;

    CView.text("You sneer at Lottie, reminding her that being excited over a bit of weight loss is a terrible idea – it'll make her lazy. You hate lazy people. Lottie's face scrunches up in angst, beating herself up and moaning useless apologies to you. But that's simply not enough, you tell her. Deciding to put matters into your own hands, you walk over, Lottie, already anticipating what's coming next, wraps herself into a ball in her seat. You quickly grab her head and twist it in your direction, causing Lottie to yell helplessly in response - though you cease her noise immediately with a kiss on the lips. She stares, surprised at your actions, giving you enough time to backhand her out of your seat. She sobs loudly as you walk out of the cafe to return back to camp – strangely satisfied.");
    lottieMorale(-10);
    return { next: passTime(1) };
}

// [If Encourage]
function lottieMediumMoraleWeightLossEncourage(player: Character): NextScreenChoices {
    CView.sprite(SpriteName.Lottie); // 36;

    CView.text("You congratulate her on her success, you're quite proud that she's getting results so quickly. Lottie beams at you, clearly just as excited with the news. You ask her if she wants to meet you in the sauna for some 'stretches' – emphasising the last word heavily whilst making exaggerated quotation marks with your fingers. \"<i>Haha, I'm sorry " + player.desc.name + ", but to tell you the truth, my butt still hurts from the last time we stretched. Would it be okay if we, erm, did some regular exercises for now?</i>\" You both chuckle, despite the fact you were completely serious about boning her in the sauna. Regardless, you decide to give it a rest and tell her you're going to go hit the track, if she's willing to join you.\n\n");
    CView.text("<b>...</b>\nAfter a good workout, you decide to return back to camp, exhausted.");
    lottieMorale(4);
    player.stats.fatigue += 10;
    return { next: passTime(1) };
}

// [If Abuse]
function lottieMediumMoraleWeightLossAbuse(player: Character): NextScreenChoices {
    CView.sprite(SpriteName.Lottie); // 36;

    CView.text("You sneer at Lottie, sternly reminding her that she's nowhere near her goal the way she is now – and a few pounds isn't going to change anything. In fact, she probably just measured herself in the morning, and it's likely she hasn't lost any weight at all, being the pig she is. Lottie doesn't seem to have anything to say. She stares at you, wondering where this all came from. After a few seconds of silence, she breaks into sobs, pushing herself out of her chair and running away from the gym. You know she'll come back, though. Deciding you're done here, you return back to camp – strangely satisfied.\n\n");
    lottieMorale(-10);
    return { next: passTime(1) };
}

// [If Encourage]
function lottieHighMoraleWeightLossEncourage(player: Character): NextScreenChoices {
    CView.sprite(SpriteName.Lottie); // 36;

    CView.text("You congratulate her on her success, you're quite proud that she's really getting used to the consistent workout. Lottie beams at you, clearly just as excited with the news. You ask her if she wants to meet you in the sauna for some 'stretches' – emphasising the last word heavily whilst making exaggerated quotation marks with your fingers. \"<i>Haha, I'm sorry " + player.desc.name + ", but to tell you the truth, my butt still hurts from the last time we stretched. Would it be okay if we, erm, did some regular exercises for now?</i>\" You both chuckle, despite the fact you were completely serious about boning her in the sauna. Regardless, you decide to give it a rest and tell her you're going to go hit the track, if she's willing to join you.\n\n");
    CView.text("<b>...</b>After a good workout, you decide to return back to camp, exhausted.");
    lottieMorale(4);
    player.stats.fatigue += 10;
    return { next: passTime(1) };
}

// [If Abuse]
function lottieHighMoraleWeightLossAbuse(player: Character): NextScreenChoices {
    CView.sprite(SpriteName.Lottie); // 36;

    CView.text("You frown at Lottie, clearly uncomfortable with her eager reaction to her results. You tighten your grip on her shoulder, before she flinches and brushes you off. \"<i>Is... is something wrong, " + player.desc.name + "?</i>\" she asks, standing up to face you. Her brow wrinkles in concern – shouldn't you be happy? But you simply aren't. You tell her that being at ease with her results only leads in one direction – laziness. And you hate laziness. Despite this, Lottie continues to defend her position. \"<i>Look, I don't know what's gotten into you, but... but I'm happy with this. And if you aren't, then that's – it's too bad for you!</i>\" Too bad, you think, while you deck Lottie in the stomach, causing her to reel over in pain. You tell her that feelings get in the way of progress, and if she can't control her emotions – then that's just too bad for her.\n\n");
    CView.text("Deciding you're done here, you return back to camp – strangely satisfied.");
    lottieMorale(-10);
    return { next: passTime(1) };
}

// [If Encourage]
function lottieHighMoraleWeightLossFATTYLOVESIT(player: Character): NextScreenChoices {
    CView.sprite(SpriteName.Lottie); // 36;

    CView.text("You rub her shoulder, telling her she shouldn't feel ashamed of her body – whether she gains or loses weight, you'll still love her for who she is, as should she. Lottie chuckles before placing her hand on yours. \"<i>Y'know, you really know how to make a girl feel better about themselves, " + player.desc.name + ". Even if it's just a sentence or two, I- it really helps. Thanks.</i>\" You nod in agreement before giving her a peck on the forehead and leading her out on the tracks. You figure a little working out would help clear her mind.\n\n");
    CView.text("<b>...</b>\nAfter a good workout, you decide to return back to camp, exhausted.");
    lottieMorale(4);
    player.stats.fatigue += 10;
    return { next: passTime(1) };
}

// [If Abuse]
function lottieHighMoraleWeightLossFATTYLOVESABUSE(player: Character): NextScreenChoices {
    CView.sprite(SpriteName.Lottie); // 36;

    CView.text("You frown at Lottie, clearly uncomfortable with her sudden weight loss. You tighten your grip on her shoulder, before she flinches and brushes you off. \"<i>Is... is something wrong, " + player.desc.name + "?</i>\" she asks, standing up to face you. Her brow wrinkles in concern – she's obviously told you this for some support, but it's just not something you can forgive. You tell her it's taken time to love her for what she is now, and if she's suddenly deciding to change her body, then you aren't sure what she wants. Lottie looks shocked, but suddenly snaps back in response. \"<i>Look, I didn't - I just want you to accept me for who I am... and for who I might be. Nothing else – and if you're not happy with who I am, then... then...</i>\" You stop her, only to grab her ear and pull her close enough to hear you whisper. If you're not happy with who she is, you tell her, then you aren't sure what you're going to do. She sinks into her chair before you bark that you need to get some exercise done.\n\n");
    CView.text("<b>...</b>\nAfter a good workout, you decide to return back to camp, exhausted.");
    lottieMorale(-10);
    return { next: passTime(1) };
}

// [To Fuck]
function lottieFatLoserCulminationFuckChoice(player: Character): NextScreenChoices {
    CView.sprite(SpriteName.Lottie); // 36;

    const cockThatFits = cockThatFitsLottie(player);
    CView.text("You've decided that Lottie's only worth one purpose now. A few minutes later and you've taken your whore to the washrooms. Mirrors line the sides of the walls to allow members to observe their physiques. It's entirely empty for the night, though you make sure to lock the door just in case. You turn around to see Lottie cowering in the corner. She knows what you want – and you swear on Mareth's giant tree titties you'll get it. Walking over, you bark at Lottie to strip down and get on all fours. She whimpers at your command, but knows full well what you'll do if she doesn't. Slowly, but surely, she pulls down her tank top, revealing her creamy tits as they bounce out of her clothing. It's not like you haven't seen them before, but her reluctance as she desperately tries to pull off her top while covering her tits at the same time stirs a primal reaction within you. The girl tries to remove her shorts as quickly as possible, but you growl at her to turn around and bend over, giving you a good view of her luscious ass as it juts out towards you. She peels her tight shorts off her hips slowly, revealing her pink, moist lips – the little slut's getting turned on, you laugh to yourself. With her naked body on full display, Lottie quietly moves down to the ground, positioning herself on all fours with her butt facing towards you. She looks behind herself to see your erect " + describeCock(player, cockThatFits) + " on full display, quickly squealing and looking away. You grin as you stroke yourself into fullness, walking over and placing yourself behind Lottie's full derriere. \"<i>" + player.desc.name + "?</i>\" she gently sobs, \"<i>P-please don't do this.</i>\" With that, you grab her ample thighs and thrust forward, driving your " + describeCock(player, cockThatFits) + " straight into her trembling wetness.\n\n");

    CView.text("You groan as you feel her tight walls surrounding your length, Lottie screaming as she feels you invade her private area.  You continue your relentless advance, pounding your whore while you grunt in pleasure, calling her a worthless, fat piggy and slapping her ass while she squeals and moans. You watch your slut while she desperately tries to close her eyes and escape the reality occurring to her, but every push and pull of your " + describeCock(player, cockThatFits) + " inside her warm depths reminds her of where she is. Lottie cries desperately, at first for you to stop, but then for help. Fortunately for you, the walls of the washroom are curiously soundproofed, and any knocks at the door are gone as soon as they arrive. As you pork your prize, you bend over and press your body against the chubby girl, reaching around and squeezing her cushiony rack with one hand and supporting your weight on the other. Lottie unwillingly moans as you plunge your " + describeCock(player, cockThatFits) + " into her, feeling your hardness move along her inner walls. She keeps her head lowered towards the floor, the sight of her heavy breasts being squeezed and pulled by your hands in her peripheral vision. Lottie's cries and yelps grow quieter as you fuck her harder, her juices lubricating your hungry member. Eventually, you get bored of keeping her on all fours and with one slick flip you turn her over onto her back, revealing her pale figure to you. The pig-girl squeals and covers her face with her hands, not wanting to witness you pounding at her soaked cunt. You're not one to complain, instead focusing on suckling upon one of her breasts, your hand kneading the other.\n\n");

    CView.text("You feel a familiar sensation as you drive faster into Lottie's pussy, sucking harder as you bring yourself closer to the edge. With one final thrust into her womb you lean back and release your hot spunk inside while she thrashes and yells in defiance. In your ecstasy you grab Lottie by the shoulders and pull her on top of you, your " + describeCock(player, cockThatFits) + " still spurting your cum inside. You both lay there, Lottie broken while you grab her jiggling asscheeks and hump into her for several more minutes of pure bliss.\n\n");
    CView.text("When you finally give in to exhaustion, you leave Lottie on the floor, your seed leaking out of her while she lays drooling and inattentive to her surroundings. You pat her on the butt and begin to make your way out of the gym, making sure to grab a ");
    if (Settings.sillyMode) CView.text("bacon ");
    CView.text("shake on the way out.");
    if (Settings.sillyMode) CView.text("  You fucking love bacon shakes.");
    CView.text("\n\n(<i>Doggy-style unlocked from Lottie's sex menu.</i>)");
    player.orgasm();
    player.stats.sens += -3;
    player.stats.cor += 3;

    LottieFlags.UNKNOWN_FLAG_NUMBER_00310 = 1;
    LottieFlags.UNKNOWN_FLAG_NUMBER_00298++;
    return { next: passTime(1) };
}

// [To Humiliate] – (Corruption must be >40)
function lottieFatLoserCulminationHumiliationChoice(player: Character): NextScreenChoices {
    CView.sprite(SpriteName.Lottie); // 36;

    const cockThatFits = cockThatFitsLottie(player);
    CView.text("A few minutes later and you've taken your whore outside of the gym and around to the back, where an equipment shed lies in waiting. You make quick work of the lock, busting it open with a nearby metal pole. The two of you walk slowly inside, Lottie pausing behind you to gaze at the tools and exercise apparatuses littering the walls. Soon, you find what you're looking for. You've never been one to judge a person for their fetishes, but you make a mental note to thank the person who couldn't control theirs. A single leather collar attached to a leash dangles silently upon a hook attached to the walls of the shed. Grinning, you take it down, adjusting the length of the rope before handing it to Lottie. \"<i>W-what's this for, " + mf(player, "sir", "ma'am") + "?</i>\" she mumbles, but you pay no attention to her questioning as you loosen the collar and push it down on the girl's neck, tightening it before she can protest. \"<i>N-no! What are yo-!</i>\" Slap! You pelt your hand against her soft cheek, causing her to jerk on the rope and fall to the floor, miserable and in pain. Your slut slowly looks up at you with watering eyes, a hand to her face to quell the stinging sensation. \"<i>I... I understand.</i>\" She mutters quietly, picking up the leash and placing it in your hands, before standing on her knees and adopting a begging position in front of you. You grunt as the girl pulls out her small tongue, reluctantly licking at your groin to satisfy the beast behind your clothes. Just like a whore to assume that's what you're here for. You walk away from her attempts to fellate you, pulling on the leash and yanking your girl forwards. She gets up and starts walking behind you and out into the sunlight, before you stop her once more. No, you tell her – she has to strip down before she's presentable to the public. You want the world to know how well you've trained your fat little piggy.\n\n");

    CView.text("Lottie timidly removes her top, letting her plump breasts fall out while she bends over to pull down her tight shorts, her juicy ass squishing out of the fabric. While she undresses, you look back to the shed to see if there's anything you might be missing. Weights, large poles, a whip, some ro- wait, a whip? You smile devilishly as you walk over to pick it up, but you find it firmly glued to the shelves. Weird. Upon closer inspection, you spy a peculiar-looking device next to it. It appears to be a strap attached to a metal ring – and it gives you an idea. 'Where there's a whip, there's a way', you chuckle to yourself as you take the strap and bring it over to Lottie. Your pig slut is naked and ready, waiting on your command as you pull out the ring-shaped device and stretch the strap over her head, placing the metal ring inside her mouth and forcing the pale slut to make a permanent 'O'-shape with her lips. You tighten the gag, causing Lottie to cough uncomfortably as drool forms at the base of her mouth. Taking the leash, you drag Lottie away from the shed, her large ass jiggling as she tries to catch up to you. You figure you'll take her to the backstreets of Tel'Adre – you want people to see your work of art, but you know only the scum of the city will truly appreciate her for what she is. You pull the leash, leading Lottie through an alleyway and into a smaller, dirtier part of the desert city, an enclosed area with several food stalls littered around.  A majority of the lower-class citizens wander these parts, shuffling about as they haggle, argue and steal – as is usual in the slums. Most people notice your pig-girl trotting behind you, though few offer a second glance. The majority stand and stare as you present your trophy – a few of the more courageous ones openly masturbate to the site, whereas the braver still walk up and slap your pig on the ass, eliciting a squeal or a moan. You decide to up the ante while you walk through the commons, placing a hand between Lottie's pale thighs and thrusting two fingers into her pussy, the heat enveloping your digits as you shamelessly fingerfuck the poor girl.\n\n");

    CView.text("On your walk, you find yourself in a familiar location – the back alleyway of the Wet Bitch. Figuring it wouldn't hurt to take your slut inside; you jerk your hand forward, forcing Lottie to walk towards the door – when you recognize the face of a furiously masturbating fox herm.  Urta looks at you while she pumps her thick horsecock relentlessly, winking at the pig-slut you've currently got on a leash. She doesn't seem to recognize you in the slightest, which could either mean she's somehow contracted serious amnesia, or she's a lot drunker than usual. \"<i>");
    if (Settings.sillyMode) CView.text("BACON BACON BACON BACON BACON BACON! GOTTA HAVE BACON!");
    else CView.text("Heyyy *hic* buddy, is she like your *hic* shex-slave or sumthin?");
    CView.text("</i>\" You decide that she's right. Pulling your slick fingers out of her cunt, you push Lottie towards the gray fox-woman, tugging on the leash to jerk her backwards onto the floor. As she tries to get up, the girl squeals as Urta's large equine member slaps Lottie on the nose. You take out your own " + describeCock(player, cockThatFits) + ", barking at her to keep on all fours – as long as you own the backside, you couldn't care less what the fox-herm does to her face. Urta starts by rubbing the flat head of her length on the full lips of your slut, the scent of her intoxicating pre-cum enticing Lottie to place small licks along the wet tip. Not wanting to be left out, you forcefully grab her hips, gliding your " + describeCock(player, cockThatFits) + " straight into the slut's warm hole, groaning as you feel her walls tighten around you. You jerk as her hips suddenly thrust backwards, and you glance over to find Urta burying as much of her thick cock into the girl's mouth as she can. You both glance at each other, sharing a nod before you both plunge your lengths into the sobbing pig-whore, rocking back and forth. Urta moans while she holds onto the back of Lottie's head with one hand, fondling her own tits with the other. On the other end of your slave, you fuck relentlessly as you hold onto her fat asscheeks, panting heavily from the pleasure of them slapping against your groin. The fox-herm lets out a loud moan before pushing as much of Lottie's face into her groin as she can, her balls growing as she prepares to fill the slut's throat. You feel yourself about to explode as well, taking longer, and deeper thrusts into the girl before finally pushing forward and filling her with your spunk, the fox-woman on the opposite end forcing her twitching, animalistic member into Lottie's throat and doing the same. The both of you slowly remove yourselves from your trophy, the pale, sweating girl now on the floor, thick seed leaking from both ends. With one more grunt, you unload the rest on her ample butt, Urta painting her face.\n\n");

    CView.text("You decide to leave Lottie there while Urta jerks off for another round at her mouth, heading back to the gym to grab a ");
    if (Settings.sillyMode) CView.text("bacon ");
    CView.text("shake. You sure do love spit roasting a pig, but nothing can beat a ");
    if (Settings.sillyMode) CView.text("bacon ");
    CView.text("shake.");
    // [Unlocks Walkies]
    LottieFlags.UNKNOWN_FLAG_NUMBER_00311 = 1;
    LottieFlags.UNKNOWN_FLAG_NUMBER_00298++;
    CView.text("\n\n(<i>'Walkies' unlocked from Lottie's sex menu.</i>)");
    player.orgasm();
    player.stats.sens += -1;
    player.stats.cor += 5;

    return { next: passTime(1) };
}

// [To Leave]
export function lottieFatLoserCulminationLeaveComedyChoice(player: Character): NextScreenChoices {
    CView.sprite(SpriteName.Lottie); // 36;

    CView.text("You take one look at her before making your request. You tell her you want the pigslut to leave the gym, and never return. She stares, speechless, but immediately begins bawling at your feet. You're fine with staying here – but you never want to see her face again. For what it's worth, the girl is surprisingly light when you pick her up off her feet and carry her outside the gym. She's shivering, terrified of a life without you – so you'll give her something to remember you by. By now Lottie's stood up, walking pathetically away in tears, but you've already caught up to her, removing your pants and waddling in her direction while your " + describeCock(player, player.body.cocks.get(0)) + " swings to and fro. Before she notices, you've already thrust your entire package into her, fitting as much as you can inside before humping relentlessly. She screams, attracting the attention of a nearby guard on night watch – but you're not done yet. You take your moist member out and aim towards the advancing guard. Your brow furrows as you yell your final resolution. \"<i>TAKE THIS – MY LOVE, MY ANGER, AND ALL OF MY SORROW! CUUUUM CANNON!</i>\" With a hearty thrust, you plunge your junk forward, spurting an impossible amount of gooey spunk in the man's general direction, blasting him into the air and out of Tel'Adre's walls. \"<i>GO! GO! GO!</i>\" you shout, pumping jets of your seed at the enemy until he finally bursts into gory treats like a bloody fireworks display. You turn back to see Lottie cowering on the floor. You grin and take one final dip into her cunt, squirting a tiny amount of incredibly potent seed before walking away, leaving her abused and broken as you salute an imaginary American flag. You shed a single tear.\n\n");

    CView.text("You discover much later that she's pregnant and miserable with your child.");
    CView.text("\n\n(<i>Lottie is no longer encounterable</i>.)");
    LottieFlags.UNKNOWN_FLAG_NUMBER_00278 = 1;
    player.orgasm();
    player.stats.cor += 10;

    player.body.cumMultiplier += 100;
    return { next: passTime(1) };
}

// [Love Yourself]
function lottieHighMoraleFatLoveSelfOneTimeEvent(player: Character): NextScreenChoices {
    CView.sprite(SpriteName.Lottie); // 36;

    const cockThatFits = cockThatFitsLottie(player)!;
    CView.text("You begin to talk about your story, how you came to be in Mareth and how you got to be where you are now. You've encountered nasty things, and you've seen people become nasty things themselves. You also know that you've changed since then. You've become someone you didn't expect yourself to become in a million years – and whether it was for better or for worse was up to you to decide. You know you've been through hard times, but you've never once regretted the decisions you've made – because they led to her. To Lottie. The girl begins to tear up at your confession. \"<i>Oh, " + player.desc.name + ", I...</i>\" But you continue your story. You tell her that no matter what she looks like, no matter what happens – you'll always love her for who she is. But the most important thing, the absolute most important thing she needs to remember, is that she needs to love herself - because you'll never stop loving her as long as she does. At this point, Lottie bursts into tears of happiness, beaming through her tear-stricken face. \"<i>You idiot! You big, dumb, idiot!</i>\" she laughs, running out of her seat to plant a kiss on your lips and to pull you in for a hug. \"<i>I love you too,</i>\" she purrs, cuddling up to you in a warm embrace that lasts for what seems like an hour. You're not sure you've helped get over her self-consciousness entirely, but judging by her reaction you seem to have lifted her mood an incredible amount. The both of you chat away at the cafe for a while before deciding to hit the yoga rooms to stretch out – you've placed a mat down while you wait for Lottie to change, when the girl walks in and surprises you.\n\n");

    CView.text("Your rosy lover bounces into the empty, dim lit room, her ample thighs squishing out of a pair of super tight shorts, while her breasts fill over a sports bra. You're immediately turned on by the incredibly erotic display, Lottie catching scent of your increasingly hardening member and giggling while she crushes her boobs together in front of you. \"<i>I'm guessing you like what you see?</i>\" she purrs, walking over to you and pushing you down upon the gym mat. Lottie makes quick work of your lower clothes, your " + describeCock(player, cockThatFits) + " bouncing out and at attention, which she grabs hastily as she begins to jerk you off. The pig-girl presses your member against her moist slit, grinding it back and forth while her moans fill the empty room. You grunt in pleasure, jerking your hips slightly to help the process along, to which she replies by bending down to press her overflowing tits against your chest. You take your hands and slap them upon her ass, groping and squeezing while she moans into you. The girl shudders in bliss as the grinding sends her into an early orgasm. \"<i>I... I've got something better for you, babe...</i>\" she pants as she pulls apart the opening in her shorts to reveal her blushing pussy. Keeping a firm grip on your " + describeCock(player, cockThatFits) + ", Lottie lifts herself up and slowly lowers her body upon it, your tip parting her folds and entering her hot insides. You grunt at the sensation of her inner walls squeezing tightly against your member, ");
    if (cockThatFits.area <= 40) CView.text("her ample cheeks resting on your groin as you bottom out in her");
    else CView.text("though you only reach so far before you've filled her up entirely with your length");
    CView.text(". You decide to take matters into your own hands as you grab her thick hips and drive upwards, Lottie squealing as you begin to pump in and out of her. The pig-girl's creamy breasts pop out of her bra and jump to your thrusts, her fat legs hugging either side while she bounces upon you. \"<i>God, I-I love you! Unh, I feel so hot, babe!</i>\" She yells as you pork your lover enthusiastically. The slaps of her full buttcheeks hitting your groin pervade the air, your grunts accompanied by Lottie's orgasmic moaning.\n\n");

    CView.text("As you feel yourself about to explode, you keep a tight grip on her hips before thrusting forward, filling her insides with your hot spunk. Lottie trembles in orgasm, the feeling of your cum inside of her sending her over the edge.");
    if (player.body.cocks.length > 1) {
        CView.text("  Your other cock");
        if (player.body.cocks.length === 2) CView.text(" does");
        else CView.text("s do");
        CView.text(" not disappoint, spurting your essence all over the pig-girl.");
    }
    CView.text("  You both lay on the mat, panting in ecstasy while your " + describeCock(player, cockThatFits) + " continues to ejaculate inside her.\n\n");

    CView.text("A while later, you've both said your goodbyes for the night.");
    if (Settings.sillyMode) CView.text(" Before you leave, you make sure to head out to the cafe to buy yourself a bacon shake. You love bacon shakes.\n\n");
    else CView.text("\n\n");

    // [Unlocks Cowgirl]
    CView.text("(<i>'Cowgirl' unlocked from Lottie's sex menu.</i>)");
    player.orgasm();
    player.stats.sens += -3;
    player.stats.cor += -1;

    LottieFlags.UNKNOWN_FLAG_NUMBER_00313 = 1;
    LottieFlags.UNKNOWN_FLAG_NUMBER_00298++;
    return { next: passTime(1) };
}

// [You'll get there]
function lottieHighMoraleFatYoullGetThereOneTimeEvent(player: Character): NextScreenChoices {
    CView.sprite(SpriteName.Lottie); // 36;

    const cockThatFits = cockThatFitsLottie(player);
    CView.text("You tell Lottie that the way she looks right now shouldn't affect how she feels about herself as a person – her value isn't determined by her weight, and never will be. You pat her hand before giving her a thumbs up. You believe in her and you believe in her goal, whether it leads to a better appreciation for herself or her body. She's reassured by your words, stroking your hand gently. You make clear to the girl that you aren't going to leave her because of how she looks, because she's beautiful where it counts. Lottie melts, blushing hard at your compliments. \"<i>Oh, " + player.desc.name + ", sometimes I wish I could be as brave as you, y'know?</i>\" she exclaims, sighing politely. Continuing your rant, you explain how all she needs is a little self confidence to get her going – she can't be afraid to take leaps into the deep end to get what she wants, right? She giggles at your enthusiasm, though takes your words into consideration. \"<i>Self confidence, huh?</i>\" Lottie mutters to herself. \"<i>" + player.desc.name + "... could you come with me for a moment?</i>\"\n\n");

    CView.text("You follow Lottie out into the pool area, waiting as she walks into the dressing room to get changed. When she comes out however, you're surprised to find that she hasn't changed into anything – in fact, she's removed all her clothes entirely!\n\n");

    CView.text("The nude pig-girl stands in front of you, turning red at your hungry gaze. \"<i>I'm not comfortable with my body, but... if self confidence is the key to getting what I want, then... will you fuck me, " + player.desc.name + "?</i>\"\n\n");

    CView.text("In only seconds flat you remove your clothes to jump the piggy, whipping out your " + describeCock(player, cockThatFits) + " and pushing it against Lottie's wet slit, the pig-girl lying on her back while her legs rest upon your shoulders. With a hearty thrust you drive yourself into her, eliciting a loud moan while you pork her insides with your meat. Her thick thighs slap against you as you bend over to take a lustful grab at her melons, sucking at her nipple and pinching the other, her sweet taste enveloping your mouth. Lottie buries you in her cleavage, yelping as you piledrive her tight pussy into submission – but you've got more in store. Flipping her over, Lottie lies face down with her soft butt jutting up in the air, your persistent fucking driving her wild. You continue gripping onto her tits as you pound her flesh, every thrust accompanied by her pleasured grunts. Back and forth you mount her until the familiar sensation in your loins signal your release. You increase your pace, pounding her pussy until you pull your head back and ejaculate inside her inner walls, slamming in harder every few seconds with each burst.");
    if (player.body.cocks.length > 1) {
        CView.text("Your other cock");
        if (player.body.cocks.length === 2) CView.text(" twitches ");
        else CView.text("s twitch ");
        CView.text("in ecstasy, releasing all over her plump butt.");
    }
    CView.text("\n\n");

    CView.text("Sweaty and panting, Lottie lies on the floor, exhausted and full of your spunk. You slap her jiggling ass before walking out of the pool area, making sure to grab a ");
    if (Settings.sillyMode) CView.text("bacon ");
    CView.text("shake on the way out.");
    if (Settings.sillyMode) CView.text("  They're fucking delicious.");
    CView.text("\n\n");
    // [Unlocks Quickie]
    CView.text("(<i>'Quickie' has been unlocked from Lottie's sex menu.</i>)");
    LottieFlags.UNKNOWN_FLAG_NUMBER_00314 = 1;
    LottieFlags.UNKNOWN_FLAG_NUMBER_00298++;
    player.orgasm();
    player.stats.sens += -3;
    player.stats.cor += -1;

    return { next: passTime(1) };
}

// [Ew Lottie No]
export function ewLottieNo(player: Character): NextScreenChoices {
    CView.sprite(SpriteName.Lottie); // 36;

    CView.text("You begin to talk about your story, about how you came to be in Mareth and how you got to be where you are now. You've encountered nasty things, and you've seen people become nasty things themselves. You also know that you've changed since then. You've become someone you didn't expect yourself to become in a million years – and whether it was for better or for worse was up to you to decide. You know you've been through hard times, but you've never once regretted the decisions you've made – because they led to her. To Lottie. The girl begins to tear up at your confession. \"<i>Oh, " + player.desc.name + ", I...</i>\" But then you laugh. You laugh harder than you ever have since you came into this hellhole. In fact, you'd be willing to bet it was the first time you've ever laughed in Mareth. Lottie's face immediately scrunches up as she begins to bawl, but you could give less of a fuck as you stand up and point at the pig-slut as cafe-goers look at you both in curiosity. \"<i>ATTENTION FURRY ASSHOLES</i>\" you yell, much to the disgust of the anthropomorphic animal-people staring in your direction. \"<i>THIS SLUT – \"<i>you point to Lottie. \"<i>- WON'T EAT MY HAM SANDWICHES.</i>\" An audible gasp is heard from the growing crowd. Lottie's buried her head in her hands but your tirade continues. Walking to the counter, you take one look at the fuzzy clerk before he nods and hands you the aforementioned sandwich. Weird, you don't remember him being fuzzy – you really need to find a pair of fucking glasses in this sand pit. Regardless, you stomp over to the pig-girl, pulling her out of her seat and forcefully shoving the meaty meal down her throat. She gags for a second before unwillingly swallowing her own species. You grab her cheeks and pull her face several inches towards yours. \"<i>You disgust me.</i>\" You tell her, before whipping your " + describeCock(player, player.body.cocks.get(0)) + " out and fucking her ham and bread-filled mouth. </i>\"Here comes the mayonnaise train!</i>\" You yell, ejaculating straight down her gullet and into her flabby abyss.\n\n");

    CView.text("For hours, people take turns pumping their seed into Lottie while you dance naked around her, chanting obscenities at the blurry people around you.\n\n");

    CView.text("You really need glasses.");
    // [Note: Lottie will no longer be encountered at the gym.]
    LottieFlags.UNKNOWN_FLAG_NUMBER_00278 = 1;
    player.orgasm();
    player.stats.cor += 10;

    return { next: passTime(1) };
}

// Threesome]
function lottieElleThreesomeFirstTime(player: Character): NextScreenChoices {
    CView.sprite(SpriteName.Lottie); // 36;

    const cockThatFits = cockThatFitsLottie(player);
    CView.text("You chuckle devilishly as you undress in front of your naked and wanting harem. Both of the girls blush nervously as they stare at your " + describeCock(player, cockThatFits) + " – though the hunger in their eyes suggests anything but anxiety. You lay down on your back, gesturing for the girls to come over to you. Lottie enthusiastically trots towards you, lying down in front of " + describeOneOfYourCocks(player) + " and popping the tip ");
    if (player.body.cocks.length > 1) CView.text("of one ");
    CView.text(" into her full lips, circling around it with her eager tongue. The spider-girl grows more enthusiastic, hopping back to lie next to Lottie, placing her hot mouth at the base of your shaft and licking softly. She runs her tongue along your length while Lottie sucks hungrily on your head, slurping beads of pre-cum and stopping every so often to plant her lips on her spider-friend, swapping saliva along with the taste of your cock. As you let the girls work on your slick member, the spider-slut removes herself before straddling your face, her wet pussy inches from your hungry maw. Lottie begins to work around your length while Elle leans forward and plunges it into her mouth, sucking hard and fast. She releases your tip with a wet pop, moaning as you dig your tongue inside her hot cunt, tasting her juices and sucking gently on her hard clit. Lottie moves herself above your length, lowering herself slowly until you buck upwards, slamming your " + describeCock(player, cockThatFits) + " directly inside of her. Both of the girls squeal and moan from either end, Elle's thick thighs on either side of your head while she tries to pull you deeper inside. Lottie's pillowy breasts heave as she bounces on top of you, leaning over to the spider-girl as they share a deep kiss. Elle's extra hands knead Lottie's breasts while her main two hold onto her own hips, grinding along your face while you sip at her sweet nectar. Your techniques seem to work, as the spider-girl shudders in orgasm, her sweaty thighs clamping down on you while she shakes in ecstasy. Lottie climaxes soon after, holding on to Elle's head as the girl sucks gently on her soft nipple flesh, her inner walls tightening against you. As you feel your own release coming, you order your sluts to take themselves off of you, to which they comply. In moments you've grabbed the spider-girl and forced her to spread her legs wide open, plunging your " + describeCock(player, cockThatFits) + " inside and squirting your hot spunk. Lottie positions herself on top of the girl, placing their pussies against each other and grinding in pleasure. Once you finish filling your spider-slut, you drive into the pig-girl, ropes of your cum splattering her inner walls. You continue thrusting in and out of the both of them for several minutes, before finishing up by letting each girl suckle at your cock. \"<i>Satisfactory.</i>\" You mumble, putting your clothes back on and heading out the door, making sure to grab a ");
    if (Settings.sillyMode) CView.text("bacon ");
    CView.text("shake on the way out.");
    if (Settings.sillyMode) CView.text("  You only need one of those to satisfy you.");
    player.orgasm();
    player.stats.sens += -2;

    // [Unlocks Threesome]
    CView.text("\n\n(<i>'Threesome' unlocked from Lottie's sex menu.</i>)");
    LottieFlags.UNKNOWN_FLAG_NUMBER_00316 = 1;
    LottieFlags.UNKNOWN_FLAG_NUMBER_00298++;
    return { next: passTime(1) };
}

// [Elle] – (Corruption must be >40)
function fuckElleInsteadOfThatFatSlutFirstTime(player: Character): NextScreenChoices {
    CView.sprite(SpriteName.Lottie); // 36;

    const cockThatFits = cockThatFitsLottie(player);
    CView.text("You chuckle devilishly as you undress in front of your naked and wanting harem – but you only have eyes for one girl. You point at the spider-girl, informing the both of them that you only plan to fuck her. Lottie may have thought she could win you over with another slut, but you feel as if you should teach her a lesson about being too presumptuous about what you want. Elle walks towards you, her child-bearing hips swaying hypnotically as she ");
    if (player.body.cocks.length === 1) {
        CView.text("begins to caress your " + describeCock(player, cockThatFits) + " with two of her hands, while the other sets to work on ");
        if (player.body.balls.count > 0) CView.text("massaging your balls");
        else if (player.body.vaginas.length > 0) CView.text("massaging your pussy");
        else CView.text("massaging your ass");
    }
    else CView.text("uses all four of her hands to handle your " + describeCocksLight(player) + ", jerking each one with ease");
    CView.text(". Lottie stands next to the both of you, sobbing quietly as she fingers herself to the erotic display. You decide to tease Lottie further, reaching around the arachne-girl to enjoy her slick cunt with your digits, and pressing your own lips against hers while she jerks you off. You pick up the spider-girl and, with one swift movement, impale her upon your " + describeCock(player, cockThatFits) + ", holding onto her womanly thighs and pumping her with your meat. Four of her arms hug you tightly as you let loose on the athletic woman, the spinnerets on her shoulders dangling idly, yet erect with throbbing need. Could they be...? You quickly erase the thought, continuing your barbaric display of lust as you probe the girl's mouth with your tongue, glancing every so often at Lottie to make sure she witnesses every single thrust. The pig-girl lies shamelessly spread-eagled on the floor, moaning and masturbating furiously to her best friend getting endlessly ploughed by her lover. Lottie clenches her sweaty thighs together and yelps, shuddering in orgasm. Defeated, she lays upon the ground, miserable. It gives you an idea. You hug Elle close to your body as you walk towards the pig-slut, positioning yourself on top of her while her best friend bounces upon your cock. Lottie opens her eyes to see the bronze beauty's taut ass slapping against your groin, your combined juices leaking out of her abused hole. \"<i>W-why...</i>\" the pig-girl chokes between sobs, but you only increase your pace as you feel your own release building. You continue to pound effortlessly into your new whore, cum bubbling in your groin until you take one final step and thrust deep into her insides. Ropes of your cum splatter her inner walls, leaking out and painting the helpless pig-girl below you.");
    if (player.body.cocks.length > 1) {
        CView.text("  Your extra cock");
        if (player.body.cocks.length === 2) CView.text(" throbs, spilling out its essence along the floor and onto Lottie.");
        else CView.text("s throb, spilling out their essence along the floor and onto Lottie.");
    }
    CView.text("  Elle follows suit, groaning in pleasure as she reaches her own peak, her hole tightening around your length and trapping the rest of your spunk inside. The spinnerets upon her shoulder pulse in orgasm, spurting sticky globs of what appears to be thread up into the air and back down onto the pig, spunk pooling around her cleavage. You both relax, letting the spider-girl down off of you to collapse on the floor. You bend down, looking at Lottie before shoving your " + describeCock(player, cockThatFits) + " inside of her and letting one final spurt of your seed fill her up. \"<i>Satisfactory,</i>\" you mumble, redressing and heading out the door");
    if (Settings.sillyMode) CView.text(", making sure to grab a bacon shake on the way out. You only need one of those to satisfy you");
    CView.text(".");
    // [Unlocks Netorare]
    CView.text("\n\n(<i>'Elle' unlocked in Lottie's sex menu.</i>)");
    LottieFlags.UNKNOWN_FLAG_NUMBER_00317 = 1;
    LottieFlags.UNKNOWN_FLAG_NUMBER_00298++;
    player.orgasm();
    player.stats.sens += 2;
    player.stats.cor += 10;

    return { next: passTime(1) };
}

// [Oh I Get It]
export function charlottesWebComedyBullshit(player: Character): NextScreenChoices {
    CView.sprite(SpriteName.Lottie); // 36;

    const cockThatFits = cockThatFitsLottie(player);
    CView.text("You slap your " + describeCock(player, cockThatFits) + " gleefully as you point at the two girls in front of you. \"<i>OOOH, NOW I GET IT.</i>\" You yell triumphantly, your knowledge of fictional stories about farm animals finally coming to good use. \"<i>YOU ASSHOLES ARE JUST LIKE CHARLOTTE'S WEB.</i>\" They both tilt their heads to the side quizzically, unsure of the excellent referential joke you just made – but you continue anyway. \"<i>No, cause like – there's a spider called Charlotte and a pig called Wilbur and the spider talks by spinning webs and... ugh, forget it.</i>\" You decide the slutty animorphs aren't worth your time, stomping off in frustration. \"<i>W-wait! " + player.desc.name + ", don't leave me!</i>\" Lottie yells as she runs towards you, but it's too late. You're fucking done – until you bump into an elderly white mouse. \"<i>BIMBO MARBLE'S NON-EXISTANT TITTIES, IF IT ISN'T E.B. WHITE!</i>\" you yell, ejaculating in your pants as your mind overloads from the referential humour. He smiles, asking politely if you want to go on a journey through space.  You eagerly agree as you follow the old man down into a dark alleyway, excited to go on the adventure of a lifetime.\n\n");
    CView.text("<b>...</b>\nYou wake up hours later, missing a few gems. Your asshole is now a Little Stuart.\n\n");
    LottieFlags.UNKNOWN_FLAG_NUMBER_00278 = 1;
    player.orgasm();
    player.stats.cor += 10;

    return { next: passTime(1) };
}

// [If Not Fat]
function lottieSuccessOneShot(player: Character): NextScreenChoices {
    CView.sprite(SpriteName.Lottie); // 36;

    const cockThatFits = cockThatFitsLottie(player);
    if (player.body.tone > 30 || player.body.thickness < 70) {
        CView.text("You walk into the yoga area and are met with the smell of sweat and flowers pervading the room. You look over to the middle of the bare area to find Lottie bending over, her ass squished in tight booty shorts thrust in your direction. At the sound of your entrance she jerks up, looking over to you – you notice she's already removed her top. \"<i>Like what you see, babe?</i>\" she grins, cupping one of her heavy breasts in her palm. \"<i>I've been spending some time in the yoga room practicing some... positions. I thought you might like to try them out.</i>\" The pig-girl slides down to the floor, attempting the splits as her legs move apart in different directions. This girl is flexible as hell, you think to yourself.\n\n");

        CView.text("Lottie gently asks for you to lie down on your back, to which you comply quite easily. You're comfortable, folding your arms behind your head to give you leverage as you watch your lover walk slowly to you, removing her shorts. Lottie turns around, her thick thighs straddling you as she sits down on your groin with her back facing your direction, giving you a perfect view of her curvy body and plump ass. Your " + describeCock(player, cockThatFits) + " nestles gently between her rosy cheeks, pulsing with lustful intent as the girl grabs her hips and begins to pleasure you through her ass. The silence of the room breaks at your fevered pants and grunts as Lottie's skillful assjob sends you through fits of ecstasy, every curve of her bottom jiggling against the heat of your member. Her pace picks up while she bounces upon you, squeezing and squashing her perfect ass until one final lift in the air is met with her plunging your length up into her hot interior. The feeling of your molten cock inside her immediately sends Lottie into fits of orgasmic bliss, the intense heat filling the pig-girl with pleasure. Her attempts to continue are thwarted by your " + describeCock(player, cockThatFits) + " scraping against her inner walls, her thick thighs clenched together while she slowly moves up and down upon you. Deciding to take things into your own hands, you thrust upwards, almost pushing the girl off with your strength and causing Lottie to squeal as you begin pounding her irresistible hole. Her lush buttcheeks jiggle with every movement you make, the rising and falling of her body moving in accordance to your own will. You pump in and out, keeping a steady rhythm inside the hot and bothered woman.\n\n");

        CView.text("Inevitably, you can feel your release approaching, and with one final push you grab a hold of the pig-girl's tight ass, slamming against her and pumping your spunk directly into her clenched pussy, your " + describeCock(player, cockThatFits) + " twitching as ropes of cum coat her insides. Lottie yelps, collapsing on the floor and full of your hot seed. You wipe your cock along her ass cleavage, leaving her as a sweaty, cum-filled mess on the floor. Walking out, you make sure to grab a ");
        if (Settings.sillyMode) CView.text("bacon ");
        CView.text("shake from the cafe. They're fantastic.\n\n");
        // [Unlocks Reverse Cowgirl]
        LottieFlags.UNKNOWN_FLAG_NUMBER_00320 = 1;
        LottieFlags.UNKNOWN_FLAG_NUMBER_00298++;
        CView.text("(<i>'Reverse Cowgirl'</i> unlocked in Lottie's sex menu</i>)");
    }
    // [Otherwise]
    else {
        CView.text("You walk into the yoga area and are met with the smell of sweat and flowers pervading the room. You look around, unable to find your lover until –THUNK! A heavy weight is brought down upon your head, pulling you down to the ground and away from consciousness as everything fades to black.\n\n");
        CView.text("You wake up dazed, your forehead throbbing – you're also completely naked, but unharmed otherwise. When you try to move, however, you find yourself unable to shift from your position – you seem to be tied to a chair, your hands behind your back while your legs are bound to those of the seat. You observe your surroundings, noticing the recognizable brick walls and stocked shelves of the gym's equipment shed. The familiarity of the location leaves you somewhat relieved – at least you know where you are. A quick slap to the face brings your attention to the lean pig-girl in front of you. Her figure is somewhat obscured by the lack of sunlight inside the room, though you can tell she's mostly nude other than a small black g-string obscuring her nether regions. She also appears to be sporting black thigh-high boots, along with similarly colored gloves that reach her armpits. Her expression is one of immense desire, smiling wryly as she examines your form. \"<i>You've gotten bigger.</i>\" She smiles, leaning on top of you and letting her heavy breasts smother your face. You take a lick at one of her nipples before she jerks back and hits you again. \"<i>Hahaha, not today, pig. All this extra weight is because you can't keep your mouth closed.</i>\" She spits, grabbing at the soft flesh of your ");
        if (player.body.chest.sort(BreastRow.Largest).get(0)!.rating >= 2) CView.text("tits");
        else CView.text("belly");
        CView.text(" and squeezing, as if she was playing with putty. \"<i>I've reached my goal, but it seems you need a bit of help reaching yours. If you don't mind, I think I'll be your personal trainer for today.</i>\" The horny pig-slut grabs a hold of your " + describeCock(player, cockThatFits) + ", keeping a firm grip on your member as she effortlessly jerks you off. \"<i>I think I'll release all of that thick, sticky spunk you've got hidden inside of your fat cock.</i>\" The velvet of her gloved hands sends small bouts of pleasure through your body, her technique clumsy but efficient. Lottie begins playing with her juicy nipples, twisting and rubbing them while she toys with your length. You shudder, looking down to find her mouth only inches away from your " + describeCock(player, cockThatFits) + ", her hot breath surrounding your tip. She takes one lick of your cockhead, and already you feel a tingling sensation as you start to orgasm – did she take something to cause this? Regardless, you pump mindlessly through her hands, looking for release, when Lottie grabs hard at your cock, plugging your cum and causing you to grunt in denial.\n\n");

        // [If Cum Production Average]
        if (player.cumQ() < 500) {
            CView.text("\"<i>Hm. Your dick here seems to be twitching. Were you... were you going to cum for me?</i>\" you nod feverishly, anything to get her to release her grip. \"<i>No. Not here. In me.</i>\" She straddles you, plunging your " + describeCock(player, cockThatFits) + " into her depths and bouncing to a steady rhythm, her ample butt slapping against your groin. \"<i>Unh... do you like me fucking your fat ass, pig?</i>\" she yelps, holding onto your large body as you lay there, being serviced. \"<i>F-fuck! Fill me up, babe!</i>\" You grunt, the vice-like grip of her walls tightening against your member. With one steady push you explode inside of her, filling her up with your thick spunk. \"<i>Oh god, give me all your cum!</i>\" she yelps, her belly full of your molten liquid. Lottie lifts herself up, your " + describeCock(player, cockThatFits) + " dripping out and leaving a puddle underneath you. \"<i>H-hah, y-you're such a pig!</i>\" she stutters, obviously flustered from the sex but still attempting to keep up a dominant facade. You easily untie yourself from the binds and walk over to her, planting a kiss on her cheek before leaving through the shed door. \"<i>You... you could've escaped the whole time?</i>\" she squeaks, your only response a thumbs up as you walk away. On your way out, a milkshake vendor waves over to you – it's the guy from the cafe.");
            if (Settings.sillyMode) CView.text(" You buy a bacon shake before deciding to head home. You fucking love bacon shakes.\n\n");
            else CView.text("\n\n");
        }
        // [If Cum Production High]
        else CView.text("Unfortunately for her, you have far too much built up to stop now. With another thrust, your " + describeCock(player, cockThatFits) + " pulses in delight, exploding in orgasm as ropes of spunk splatter upon Lottie's face and tits. The girl gasps, the sheer amount of your seed painting her white. \"<i>N-no, stop! Oh god!</i>\" she yelps, before her mouth is filled with your hot essence. She forces herself to swallow, coughing as you grin at the defeated slut. \"<i>O-okay, y-you win, " + player.desc.name + ".</i>\" she looks up at you and smiles, before untying your binds and setting you free. \"<i>But you have to admit, this was pretty fun, right?</i>\" You give her a thumbs up before walking out the door, leaving her to clean your thick mess. On the way out, a milkshake vendor waves over to you – it's the guy from the cafe. You buy a ");
        if (Settings.sillyMode) CView.text("bacon ");
        CView.text("shake before deciding to head home.");
        if (Settings.sillyMode) CView.text("  You fucking love bacon shakes.");
        // [Unlocks FemDom]
        LottieFlags.UNKNOWN_FLAG_NUMBER_00319 = 1;
        LottieFlags.UNKNOWN_FLAG_NUMBER_00298++;
        CView.text("(<i>'FemDom'</i> unlocked in Lottie's sex menu</i>)");
    }
    player.orgasm();
    player.stats.sens += -2;

    return { next: passTime(1) };
}

// [Leave]
function leaveLottieInsteadOfYogaSex(player: Character): NextScreenChoices {
    CView.sprite(SpriteName.Lottie); // 36;

    CView.text("As excited as you are, your mind is telling you to leave. In blissful ignorance, you walk out the door of the cafe, through the pool area, into the main gym and out the main entrance. Once outside, you figure it's as good a time as any to take a friendly stroll back to the camp.\n\n");
    CView.text("As you head home, you have the strangest feeling you've missed out on incredibly sexy sex.");
    return { next: passTime(1) };
}

// [Exercise]
function lottieExercise(player: Character): NextScreenChoices {
    CView.sprite(SpriteName.Lottie); // 36;

    CView.text("You tell Lottie it's time to hit the gym, and she responds ");
    if (lottieMorale() >= 66) CView.text("with an enthusiastic nod");
    else if (lottieMorale() >= 33) CView.text("with a nod in agreement");
    else CView.text("by slowly looking up at you and nodding her head");
    CView.text(". \"<i>Where do you wanna go today, " + mf(player, "guy", "ma'am") + "?</i>\" She responds, as you both walk through the cafe's entranceway leading to the rest of the gym. A wall of various weights stands proud amongst the different citizens that make use of it. You spot several jogging tracks, and outside, a large, grassy field mostly occupied by centaurs looking for a nightly run - though other, bipedal gym members try to jog along with them without much success. A large, hidden door hides the entrance to the indoor pool and sauna area, along with the door to the candlelit yoga room. Where do you wish to work out?");
    // [Weights][Jogging][Yoga][Pool]
    // Pool only available when morale is high
    return { choices: [["Weights", lottieWeights], ["Jogging", goJoggingWithLottie], ["Yoga", lottieYoga], ["Pool", lottiePool]] };
}

// [Weights]
function lottieWeights(player: Character): NextScreenChoices {
    CView.sprite(SpriteName.Lottie); // 36;

    let NTR;
    if (lottieMorale() <= 30 && LottieFlags.TIMES_FUCKED_IFRIS_BLOWJOB > 0 && player.stats.str >= 75 && player.body.tone >= 60 && player.cumQ() >= 1000)
        NTR = ifrisAndLottieGetsNTRedLiftingWeights;
    // [If Figure 0 – 70]
    if (lottieTone() <= 70) {
        CView.text("Lottie looks at you nervously as you tell her you've decided on doing a little lifting today. Obviously not having that in mind, she takes your advice regardless and trots over to the weights, met with the gaze of several other, far more muscular members. Nervously walking along the wall of equipment, she picks up one of the smallest weights and begins lifting as hard as she can, audibly grunting as she manages a few reps. Not wanting to be outdone, you follow her and walk over to the weight gear – many of the other lifters are already snickering as you stand near the smaller weights. Lottie looks over to you nervously, not wanting to embarrass herself. You'd prefer not to be embarrassed either. Should you pick one of the larger weights and show off your skills, or ignore the lifters and train with Lottie?");
        // [Boast][Train]
        return { choices: [["Boast", boastAtLottie], ["Train", trainWithLottie], ["NTR Lift", NTR]] };
    }
    // [If Figure 70 - 100]
    else {
        CView.text("Lottie pumps her fist in the air at your suggestion to do a bit of lifting today. Although she isn't quite at your level, she's skilled enough to not embarrass herself around the other, more skilled gym members hanging around the equipment wall. Walking around the weights, Lottie takes note of the sizes before choosing one suitable to her level, and lifting it at a slow pace, making sure to pace her breaths. Not wanting to be outdone, you follow her and walk over to the weight gear – many of the other lifters are already snickering as you stand near the smaller weights. Lottie looks over to you nervously, not wanting to embarrass herself. You'd prefer not to be embarrassed either. Should you pick one of the larger weights and show off your skills, or ignore the lifters and train with Lottie?");
        // [Boast][Train]
        return { choices: [["Boast", boastAtFitLottie], ["Train", trainWithFitLottie]] };
    }
}

// [Boast]
function boastAtLottie(player: Character): NextScreenChoices {
    CView.sprite(SpriteName.Lottie); // 36;

    CView.text("You laugh as you pick up one of the larger ones and pump mercilessly, looking at her expectantly as if she had been failing out of laziness. She tries harder to pull the heavy object over her head, but eventually she begins to shake and drops it, landing in the sand with a ");
    if (Settings.sillyMode) CView.text("large *pomf =3*");
    else CView.text("loud clonk");
    CView.text(". She looks up at you and sniffles, but you just grunt in response, disappointed with her efforts. She sighs and tries her best to do it again.\n\n");

    CView.text("After a few more attempts at the weights, she eventually buckles under the pressure and gives up, walking home by herself. You snort and continue a few more well-earned reps before dropping down and recharging for the night.");
    player.stats.fatigue += 10;
    player.stats.str += .25;

    lottieMorale(-3);
    return { next: passTime(1) };
}

// [Train]
function trainWithLottie(player: Character): NextScreenChoices {
    CView.sprite(SpriteName.Lottie); // 36;

    CView.text("You chuckle at her pathetic attempt and pick up one of the small ones next to hers, much to the surprise of both Lottie and the other members watching. She smiles at you and tries her best to lift, despite not being very good at it. You blow through several reps before tiring yourself out, though Lottie, determined to beat your score, continues. Eventually, she gets close enough to rival your attempts before dropping the weight to the ground wearily.\n\n");
    CView.text("After a few more attempts at the weights, you both decide you've had enough, going your separate ways and waving as you leave the gym.");
    player.stats.str += .1;

    lottieMorale(2);
    lottieTone(2);
    player.stats.fatigue += 10;
    return { next: passTime(1) };
}

// [Boast]
function boastAtFitLottie(player: Character): NextScreenChoices {
    CView.sprite(SpriteName.Lottie); // 36;

    CView.text("You laugh as you pick up one of the larger ones and pump mercilessly, looking at her expectantly as if she should be pushing herself to the limit. She drops the weight she's using and picks up one around your size, trying to match your speed and strength but inevitably failing. She looks up at you and sniffles, but you just grunt in response, disappointed with her efforts. She sighs and tries her best to do it again.\n\n");

    CView.text("After a few more attempts at the weights, she eventually buckles under the pressure and gives up, walking home by herself. You snort and continue a few more well-earned reps before dropping down and recharging for the night.");
    player.stats.str += .25;

    lottieMorale(-3);
    player.stats.fatigue += 10;
    return { next: passTime(1) };
}

// [Train]
function trainWithFitLottie(player: Character): NextScreenChoices {
    CView.sprite(SpriteName.Lottie); // 36;

    CView.text("You smile at her hard work, and pull up a weight around your level. You both share a glance at each other's sizes and chuckle at the noticeable difference. You both unanimously decide to hold a competition over who can score the most reps at one time, though obviously the larger weight has the bigger disadvantage. You try and blow through several reps before tiring yourself out, though Lottie, determined to beat your score, continues. Eventually, she gets close enough to rival your attempts, before dropping the weight to the ground wearily.\n\n");

    CView.text("After a few more attempts at the weights, you both decide you've had enough, going your separate ways and waving as you leave the gym.");
    player.stats.str += .1;

    lottieMorale(2);
    lottieTone(2);
    player.stats.fatigue += 10;
    return { next: passTime(1) };
}

// [Jogging]
function goJoggingWithLottie(player: Character): NextScreenChoices {
    CView.sprite(SpriteName.Lottie); // 36;

    // [If Figure 0 – 70]
    if (lottieTone() <= 70) {
        CView.text("You tell Lottie you've decided on jogging, and she nods – running has never been her strong suit, but it's still something she can achieve with enough effort. You head out to the track, taking note of the few people running along. A cheetah-morph sprints around the trail with considerable ease, whilst a short, pug-like man simply jogs along quite contently. Once on the track you decide to start off with a brisk walk, Lottie following close behind, her cute body jiggling slightly with each movement. You note that she's having no trouble keeping up, so you figure you should pick up the pace. You know it'd be best for her if you kept it to a light jog, but your own fitness would suffer as a result. Would a more forceful work out benefit the both of you, or is it better to take it easy?\n\n");
        // [Sprint][Jog]
        return { choices: [["Sprint", sprintAndLeaveLottieBehind], ["Jog", jogWithLottie]] };
    }
    // [If Figure 70 - 100]
    else {
        CView.text("You tell Lottie you've decided on jogging, and she happily agrees – she's perfectly content with running nowadays, not tiring out as much as she used to. You head out to the tracks, taking note of the few people running along. A cheetah-morph sprints around the trail with considerable ease, whilst a short, pug-like man simply jogs along quite contently. Once on the track you decide to start off with a brisk walk, Lottie following close behind. You note that she's having no trouble keeping up, so you figure you should pick up the pace. You know she'd be fine with a quick run, but your own fitness might suffer as a result. Is it easier to concentrate on your physique with a hard sprint, or would it be better to help Lottie with hers?");
        // [Sprint][Run]
        return { choices: [["Sprint", sprintAndLeaveFitLottieBehind], ["Jog", jogWithFitLottie]] };
    }
}
// [Sprint]
function sprintAndLeaveLottieBehind(player: Character): NextScreenChoices {
    CView.sprite(SpriteName.Lottie); // 36;

    CView.text("You don't want to lose the groove you've built up so far, so you decide to go all out and tear through the track, leaving Lottie in your dust. \"<i>Wha- hey! Wait; don't leave me behind, please!</i>\" She yells, running as fast as her chubby legs are willing to go. By the time you reach the end of the track, Lottie's already given up, waiting for you to finish at the gym entrance. You give her a thumbs up before proceeding to run another lap.\n\n");
    CView.text("A few rounds later, you've exhausted yourself so you decide to return home. You notice that Lottie's nowhere in sight, but it's her loss - not yours.");
    player.stats.tou += .2;
    player.stats.spe += .25;

    lottieMorale(-3);
    player.stats.fatigue += 10;
    return { next: passTime(1) };
}

// [Jog]
function jogWithLottie(player: Character): NextScreenChoices {
    CView.sprite(SpriteName.Lottie); // 36;

    CView.text("You decide that sprinting wouldn't really get either of you anywhere, though taking things a little faster wouldn't be any harm. You take the power walking to the next level with a quick jog, before reminding Lottie to take this as leisurely as possible - it isn't a race. Lottie quickly picks up the idea and starts to push herself further, trying her best to keep up with you, whilst maintaining a steady rhythm on the track. You both spend the good part of the evening jogging a fair distance, before deciding to retire for the night. You're both tired, but satisfied with today's efforts.\n\n");
    player.stats.tou += .1;
    player.stats.spe += .1;

    lottieMorale(2);
    lottieTone(2);
    player.stats.fatigue += 10;
    return { next: passTime(1) };
}
// [Sprint]
function sprintAndLeaveFitLottieBehind(player: Character): NextScreenChoices {
    CView.sprite(SpriteName.Lottie); // 36;

    CView.text("You don't want to lose the groove you've built up so far, so you decide to go all out and tear through the track, leaving Lottie in your dust. \"<i>Wha- hey! What's the big idea?!</i>\" She yells, trying to catch up to you. By the time you reach the end of the track, Lottie's already far behind though you can see her still trying to catch up. You give her a thumbs up before proceeding to run another lap.\n\n");
    CView.text("A few rounds later and you've exhausted yourself, so you decide to return home. You notice that Lottie's nowhere in sight, but it's her loss - not yours.");
    player.stats.tou += .2;
    player.stats.spe += .25;

    lottieMorale(-3);
    player.stats.fatigue += 10;
    return { next: passTime(1) };
}
// [Jog]
function jogWithFitLottie(player: Character): NextScreenChoices {
    CView.sprite(SpriteName.Lottie); // 36;

    CView.text("You decide that sprinting would be a waste of time and effort, though taking things faster wouldn't be any harm. You scrap the power walking and head off on a light run, poking your tongue playfully at Lottie – signalling the start of a race. She quickly picks up the idea and starts to chase after you, her perky tits bouncing away whilst she tries to overtake you. You both spend the good part of the evening running a fair distance, before deciding to retire for the night. You're both tired, but satisfied with today's efforts.\n\n");
    lottieMorale(2);
    lottieTone(2);
    player.stats.fatigue += 10;
    return { next: passTime(1) };
}

// [Yoga]
function lottieYoga(player: Character): NextScreenChoices {
    CView.sprite(SpriteName.Lottie); // 36;

    // [If Figure 0 – 100]
    CView.text("You know that Lottie has an affinity for yoga, so you decide to enter the dimly lit room at the end of the pool. She gladly follows, bouncing along with you as you take two of the mats out. A class has already started, and you can see many people gathering around a tanned, four-armed woman performing warm-up exercises. Knowing you both have a little time before they break out into the more complicated stretches; you scan around the room for optimal places to sit down without blocking your view of the tetra-armed instructor. By the time you've searched the room, a few more people had already blocked off most of the available spots. You look over to see Lottie already spread out and lying on her stomach – she looks over to you and giggles before patting the vacant area next to her. Throwing a quick smile, you also notice a small unused area right next to the teacher – you'd be able to take it if you went by yourself. Should you go at it alone, or stretch with Lottie?");
    // [Alone] [Together]
    return { choices: [["Alone", lottieYogaAlone], ["Together", togetherLottieYoga]] };
}

// [Alone]
function lottieYogaAlone(player: Character): NextScreenChoices {
    CView.sprite(SpriteName.Lottie); // 36;

    CView.text("Taking your mat, you walk over towards the four-armed yoga trainer, sitting down only a meter or two away from her tanned, muscular body. In the corner of your eye, you can see Lottie visibly disheartened as she watches you gazing at the fit, caramel-colored woman in front of you. As you take your position, the intense smell of coffee and desert flowers hits you as the instructor lays on her back and pulls both of her legs up, giving you a clear view of her large thighs and puffy mound. You swear you can see her smiling as the other surrounding members begin to imitate her position. Not wanting to disappoint, you lie on your rear and tilt your head backwards, confronted by another pair of legs lifted into the air. You can see Lottie attempting the same position, only to lean to her right and fall over, earning an annoyed stare from the person next to her.\n\n");
    CView.text("You continue to take on the vaguely sexual positions of the athletic yoga teacher, the class ending before you know it. Your head strangely dizzy from the smell of sweat and pheromones, you walk home by yourself, completely forgetting about Lottie.");
    CView.text(displayModThickness(player, 30, 1));
    CView.text(displayModTone(player, 60, 1));
    lottieMorale(-2);
    player.stats.fatigue += 5;
    return { next: passTime(1) };
}

// [Together]
function togetherLottieYoga(player: Character): NextScreenChoices {
    CView.sprite(SpriteName.Lottie); // 36;

    CView.text("Taking your mat, you walk over towards the smiling pig-girl, sitting down next to her and beginning your stretches. Lottie lies flat on her soft belly, pulling up her legs from behind her and stretching her back, jutting out her heavy breasts as they squish underneath her sweaty clothing. Her eyes clearly affixed onto the instructor in the middle of the class, you take the opportunity to gaze at her flushed body, running your eyes along her defined back to her lush ass and her rosy thighs. Realising you've been sitting awkwardly the entire time, you stretch your arms and lay on your back, replicating the pose of the yoga trainer along with the rest of the class. It isn't until you look over to Lottie that you awkwardly discover her staring at your crotch – your discreet staring has earned you a pent-up orgasm waiting to happen. You laugh nervously as Lottie continues ogling your strained boner");
    if (player.body.cocks.length > 1) CView.text("s");
    CView.text(", while you secretly relish in the fact that you're at the back of the class. \"<i>Was... was that because of me?</i>\" Lottie whispers, tactlessly pointing directly at your " + describeCocksLight(player) + ". You nod in response, Lottie giggling at your aroused reaction to her body. She playfully slaps your stiff length, and returns to her stretches. You groan and move towards an easier, less-exposed position.\n\n");

    CView.text("The class ends a while later, Lottie continuing to tease you as you walk out of the gym. You note in your head that you'll get her back later, but for now you're exhausted.");
    lottieMorale(4);
    lottieTone(1);
    player.stats.fatigue += 5;
    player.stats.lust += 80;

    return { next: passTime(1) };
}

// [Pool – only available at high encouragement]
function lottiePool(player: Character): NextScreenChoices {
    CView.sprite(SpriteName.Lottie); // 36;

    CView.text("You often find Lottie near the pool, so it's only natural to assume she might have a knack for it. You mention swimming to the pig-girl, her ears perking up at the idea of going in the water. \"<i>S-sure! I'll go get ready!</i>\"  Wondering what she might've meant, you wait by the side of the pool, your legs dipping into the cool, blue water. Soon after, Lottie runs out into the area, wearing the daring, black bikini she wore the first time you had met. Her jiggling breasts squish past the fabric, while her chubby butt and thighs hug tightly against the bottom piece. Feeling a familiar stretching in your groin, you look down to find your " + describeCocksLight(player) + " at full attention, hardly subtle against your " + player.inventory.armor.displayName + ". A thought passes your mind to cover up, but before you can begin to reflect on the idea the bouncing girl sits her plump ass next to you. You wonder if it's easier to jump straight into the pool or to wait it out – hell, she might even be flattered by your reaction.");
    // [Jump][Wait]
    return { choices: [["Jump", jumpInPoolBeforeLottieSeesYourWingWang], ["Wait", waitAndShowLottieYourPoolBoner]] };
}

// [Jump]
function jumpInPoolBeforeLottieSeesYourWingWang(player: Character): NextScreenChoices {
    CView.sprite(SpriteName.Lottie); // 36;

    CView.text("You can't risk it, so you decide to take a plunge into the water – it's freezing at first, but you quickly warm up. Lottie takes your avoidance to heart and looks visibly discouraged, though you wonder what her reaction would've been if your cockrocket");
    if (player.body.cocks.length > 1) CView.text("s");
    CView.text(" decided to say hello. Needless to say, you decide it'd be better if you swam alone – nothing's wrong with the occasional chubby-assed slut wandering now and then, but it's a pain to not be distracted. Lottie wades at the other end of the pool, doing the occasional stretch before breaking into laps. You take a page from her book and begin to work back and forth from either end, making sure not to stare at Lottie's massive chest as it bounces into the air every so often after a stroke. After a considerable amount of time, you both finish considerably more exhausted than before. She seems to have lightened up since your initial reaction to her body, so you shrug it off and head home.");
    // ENCOURAGEMENT -1, FIGURE +2, MUSCLE TONE +2, LUST +9001
    CView.text(displayModTone(player, 100, 2));
    player.stats.lust += 40;

    lottieTone(2);
    lottieMorale(-1);
    player.stats.fatigue += 5;
    return { next: passTime(1) };
}
// [Wait]
function waitAndShowLottieYourPoolBoner(player: Character): NextScreenChoices {
    CView.sprite(SpriteName.Lottie); // 36;

    CView.text("You figure it can't do much harm to let " + describeOneOfYourCocks(player) + " fly, so you decide to leave it be, even leaning back so as to accentuate the hardening length. It doesn't take long for Lottie to notice, letting out a little gasp as she observes your ");
    if (player.body.cocks.sort(Cock.Largest).get(0)!.area >= 15) CView.text("pride and joy");
    else if (player.body.cocks.sort(Cock.Largest).get(0)!.area < 5) CView.text("secret shame");
    else CView.text("painfully average prick");
    CView.text(". You almost experience a tinge of regret from the now incredibly awkward silence, but it's thrown out the window as soon as you feel a soft hand grab your throbbing member. Looking up, Lottie's face has reddened considerably, but her curiosity overrides her shame as she begins to slowly massage you to full mast. \"<i>I... I did this?</i>\" she asks, facing you with large, wondering eyes. You grin and nod, taking her hand and helping her stroke it further, only to be met with a slap on your wrist as she removes her grip. You look up, frowning as Lottie laughs at the situation. \"<i>I'm – it's nice to know that someone likes me.</i>\" She stutters, smiling timidly. \"<i>But, um, we're here to exercise, " + mf(player, "big guy", "babe") + ". We should do that.</i>\" You groan at the sudden cockblock, but you can't really argue. She takes your hand and leads you into the water, but not before you playfully grab a handful of her plush ass.\n\n");

    CView.text("A while later and you've both finished off several laps of the pool, exhausted from your progress. Lottie flashes you a large smile before you part ways, leaving you still somewhat aroused from the experience.");
    CView.text(displayModTone(player, 100, 2));
    player.stats.lust += 80;

    lottieTone(2);
    lottieMorale(2);
    player.stats.fatigue += 5;
    return { next: passTime(1) };
}

// [Give Item – First Time] [Only Available with High INT]
export function giveLottieAnItem(player: Character): NextScreenChoices {
    CView.sprite(SpriteName.Lottie); // 36;
    CView.clear();
    let bova;
    let gro;
    let reducto;
    if (player.inventory.items.has(ConsumableName.LaBova)) bova = feedLottieLaBova;
    if (player.inventory.items.has(ConsumableName.GroPlus) && player.effects.has(EffectType.DungeonShutDown)) gro = giveLottieGroPlus;
    if (player.inventory.items.has(ConsumableName.Reducto)) reducto = giveLottieReducto;
    if (LottieFlags.UNKNOWN_FLAG_NUMBER_00321 === 0) {
        CView.text("You tell Lottie you've been doing a little research on weight loss aids, discovering several items that could possibly have an effect on her figure if she's willing to try. Lottie nods, albeit rather hesitantly – she's mentioned her unsuccessful attempts at weight loss methods involving diets before, so you can't really blame her. However, you push the idea forward – it couldn't hurt to try some of them, and heck, she could be skinny before she knows it! Lottie easily falls for your flattery, and eagerly agrees to the idea. You look into your inventory – one of these things must have an effect, right?");
        LottieFlags.UNKNOWN_FLAG_NUMBER_00321++;
        // [LaBova][Gro+][Reducto]
        return { choices: [["LaBova", bova], ["Gro Plus", gro], ["Reducto", reducto], ["", undefined], ["Back", choiceWrap(encounterLottie)]] };
    }
    // [Give Item – Repeat Encounter]
    else {
        CView.text("You tell Lottie you might have a few other items that'll have an effect on her figure, if she's willing to try. The pork-girl nods, albeit rather hesitantly – the last time you gave her something to try out, it certainly changed her figure – but whether or not it was for the better is still up for debate in Lottie's head. However, you push the idea forward – it couldn't hurt to try some of them, and heck, any one of them could give her the perfect body! Again, Lottie easily melts under your slick tongue, eagerly agreeing to the idea. You look into your inventory – one of these things must have an effect, right?");
        // [Cafe][LaBova][Gro+][Reducto][Ham Sandwich]
        let sammich;
        if (Settings.sillyMode) sammich = hamSammitchTimeBIATCH;
        return {
            choices: [
                ["Cafe", feedLottieAWholeCafe], ["LaBova", bova], ["Gro Plus", gro], ["Reducto", reducto], ["HamSandwich", sammich],
                ["", undefined], ["", undefined], ["", undefined], ["", undefined], ["Leave", choiceWrap(encounterLottie)]
            ]
        };
    }
}
// [If Cafe]
function feedLottieAWholeCafe(player: Character): NextScreenChoices {
    CView.sprite(SpriteName.Lottie); // 36;

    CView.text("You decide that you're better off finding something at the cafe to feed the girl, though you know Lottie won't be too keen on eating something she'll know will make her bigger. Regardless, you tell her that you've skipped on breakfast, and you've been starving all day. Concerned, Lottie suggests you buy something to eat, but you tell her you wouldn't feel right doing so if Lottie had to stay and watch. She doesn't mind, but you push it further. Eventually, she gives in and tells you that she'll buy something to eat if you do. Smiling, you wander to the cafe, asking the clerk if they have anything available in stock from the bakery. He smiles before handing you some kind of puff pastry, while you pay the appropriate gems for the item as well as a random sandwich from the glass display. Sitting back down, you hand Lottie the treat while you eagerly munch down on your own meal. \"<i>Is... is this okay to eat?</i>\" she asks, examining the chocolate covered delicacy you've bought for her. Without waiting for your answer, Lottie bites into the chocolate and squeals as the fluffy cream insides squirt out. \"<i>Th-this is delicious! Ohmigosh!</i>\" In no time at all the chocolaty confection is erotically devoured by the greedy pig-girl, before she looks up at you in guilt. \"<i>I hope that wasn't bad for me or anything...</i>\" she sighs. You shrug, telling her that it probably won't affect her weight in the slightest.\n\n");
    CView.text("You secretly know it will.");
    lottieTone(-5);

    return { next: passTime(1) };
}

// [If LaBova]
export function feedLottieLaBova(player: Character): NextScreenChoices {
    CView.sprite(SpriteName.Lottie); // 36;

    if (LottieFlags.UNKNOWN_FLAG_NUMBER_00322 === 0) {
        CView.text("You pick up the bottle of LaBova, making sure to secretly remove the label of the busty cowgirl before handing it over to Lottie. \"<i>This'll help me lose weight? Are you sure?</i>\" She says, observing the misty fluid as it swirls around the glass. You nod fervently, mentioning you've seen it trim waists and tone thighs. \"<i>Oh! Well... if you say so,</i>\" Lottie remarks, convinced by the assurance of a slimmer body.  \"<i>Here goes nothing!</i>\" The pig-girl exclaims before downing the grainy mixture in one fell swoop, complementing its sweet, milky taste. She looks down at her body, keen to observe the instantaneous change expected to occur. \"<i>Huh? I... I feel kinda funny, babe,</i>\"Lottie mutters, quickly looking towards you before squealing and turning down just in time to watch her breasts and hips grow slightly larger than before. \"<i>H-huh?! What's going on? What did you give me, " + player.desc.name + "? Why would... w-wh...</i>\" Speechless, the now chubbier girl drops to the floor, unable to comprehend your actions. You smile at her new figure, crouching down and giving her milky tits a good squeeze. \"<i>I-I don't understand...</i>\" she whimpers, flinching at your touch. It might be a while before she accepts anything else from you, but you can't help feeling like you've done some good. She'll understand, in due time.");

    }
    // [If LaBova – Repeat Encounter]
    else {
        CView.text("You pick up the bottle of LaBova, secretly pouring its contents into an opaque container before handing it over to Lottie, obscuring its milky contents. \"<i>W-what's this going to do? Do you know?</i>\" She asks, attempting to peak into the bottle without much success – it's far too dark to notice the misty elixir it contains. You tell her you're uncertain of its exact effects, but it definitely did mention something about changing your bust and thickness. \"<i>Oh! Well... if you say so,</i>\" Lottie remarks, convinced by the apparent assurance of a slimmer body. \"<i>Here goes nothing!</i>\" The pig-girl exclaims before downing the grainy mixture in one fell swoop, stopping to examine its familiar, sweet taste. She looks down at her body, keen to observe the instantaneous change expected to occur. \"<i>Hey babe, I'm... I'm getting that feeling again.</i>\" Lottie mutters, quickly looking towards you before squealing and turning down just in time to watch her breasts and hips grow slightly larger than before. \"<i>H-huh?! But I thought- what did you give me, " + player.desc.name + "? Why would... w-wh...</i>\" Speechless, the now-chubbier girl drops to the floor, unable to comprehend your actions. You smile at her new figure, crouching down and giving her milky tits a good squeeze. \"<i>I-I don't understand...</i>\" she whimpers, flinching at your touch. It might be a while before she accepts anything else from you, but you can't help feeling like you've done some good. She'll understand, in due time.");
    }
    player.inventory.items.consumeItem(ConsumableName.LaBova);
    lottieTone(-10);
    LottieFlags.UNKNOWN_FLAG_NUMBER_00322 = 40;
    return { next: passTime(1) };
}
// [If Gro+]
export function giveLottieGroPlus(player: Character): NextScreenChoices {
    CView.sprite(SpriteName.Lottie); // 36;

    CView.text("You take out the needle filled with Gro+, taking care to flick it to remove any air bubbles that might have remained in the odd blue liquid. Lottie pales at the sight of the pointed object, and shakes her head several times before backing away. \"<i>Nuh-uh,</i>\" she begins, \"<i>there's no way I'm going to stick that thing anywhere, y'hear?</i>\" You figure it's going to take a lot of convincing to get her to take the needle.\n\n");
    // [If Very High INT]
    if (player.stats.int >= 80) {
        CView.text("You take Lottie by the hand, surprising her with your suave movements. Spending a few minutes of her time, you reflect on the many situations you've found yourself caught in and how none of them seemed to have rewarded you well – until you took on the demonic factory. The porcine lady is glued to your every word as you describe the details of your adventure, distressed when you mention the enslaved humans and impressed by your (slightly exaggerated) recounting of your run-in with the omnibus. You hold up the now sacriligous needle in front of her, to clinch your epic tale. This, you tell her, was your reward. Without a second glance, Lottie seizes the needle and pokes it into the soft flesh of her breasts, ignorant of both the pain and the fact that you didn't mention the actual effects of the syringe. She waits with excited fervour for the reaction to begin, only to be surprised when her chest grows larger than before. Dropping the needle, she looks to you with tears beginning to well in her eyes and runs out of the cafe. If only she could see the glint in yours, she might be able to understand your intentions.");
        lottieTone(-20);
        lottieMorale(-1);
        player.inventory.items.consumeItem(ConsumableName.GroPlus);
    }
    // [Otherwise]
    else {
        CView.text("You grab Lottie's shoulder, surprising her with your sudden movements. She quickly brushes you off, and looks sternly into your eyes. \"<i>I'm sorry, but I'm really not comfortable with taking needles, okay?</i>\" the girl looks far more serious than usual – perhaps she's encountered needles in her weight loss schemes before? Regardless, you tell her that a single needle wouldn't make much difference to her figure – in fact, you're not even sure it might work! You smirk, but Lottie continues to stare. \"<i>Then why are you giving it to me?</i>\" She swipes the needle from your hand before walking over to throw it in the trash. Your face twists into a grimace – that needle was one of a kind. Standing up, you walk over to the pig-slut and grab her firmly by the arm. She turns quickly in annoyance but immediately pales at the sight of your anger. You raise your hand high and tell her you're going to teach her a lesson about the worth of things. How that needle was worth a billion of her. Her eyes widen, her free arm trying to pull you off in desperation. You swing down and she flinches – but you stop. Lottie's eyes slowly open to see your hand hovering only a few inches above her face. She squeals and falls to the floor as you relinquish your grip, leaving a small bruise on her otherwise smooth arm. You walk away to the sound of her sobbing quietly, making sure to take the needle of Gro+ on your way out. It's completely unharmed – though you can't say the same about the snivelling whore behind you.");
        lottieMorale(-5);
    }
    player.stats.cor += 1;

    return { next: passTime(1) };
}
// [If Reducto]
export function giveLottieReducto(player: Character): NextScreenChoices {
    CView.sprite(SpriteName.Lottie); // 36;

    if (LottieFlags.UNKNOWN_FLAG_NUMBER_00323 === 0) {
        LottieFlags.UNKNOWN_FLAG_NUMBER_00323++;
        CView.text("You take the medicinal tube out and give it to Lottie, who notices the word 'Reducto' marked upon the side. \"<i>Are you sure this is okay, " + player.desc.name + "?</i>\" she asks, clearly having doubts about leaving her weight loss to a small cylinder of weird paste. You're quite unsure yourself, considering the effects of the salve itself are quite strong, potentially decreasing anything she rubs it on to half its original size. Explaining your thoughts about its effectiveness, what was left of Lottie's enthusiasm has now lessened further. You still put your support behind the idea, though advising her to take precaution on the amount of paste to be used. She mumbles incoherently before opening the salve to reveal a small amount of the light concoction leaking from the tip. Lottie sighs. \"<i>Well... here goes nothing.</i>\" Taking the ointment, she places a small dab on her finger and rubs it around her rosy breasts, making sure to rub the cool mixture into her pale skin. She uses the remaining paste on her chubby stomach and soft thighs, massaging it in. In a matter of moments, all three areas shrink – but to the relief of both yourself and Lottie, the effects are noticeable, but slight. It appears as if she's lost a bit of weight.\n\n");

        CView.text("Lottie sits still, unsure about the convenience of the results, but glad that you've helped.");
    }
    // [If Reducto, Repeat Encounter]
    else {
        CView.text("You take the medicinal tube out and give it to Lottie, who recognises the word 'Reducto' marked upon the side and looks up at you. \"<i>Are you sure this is okay, " + player.desc.name + "?</i>\" she asks, clearly having doubts about leaving her weight loss to a small cylinder of weird paste. You've been quite unsure yourself, considering the effects of the salve itself are quite strong, potentially decreasing anything she rubs it on to half its original size. Explaining your thoughts about its effectiveness, what was left of Lottie's enthusiasm has now lessened further. You still put your support behind the idea since it hasn't backfired so far, though you advise her to take precaution on the amount of paste to be used. She mumbles incoherently before opening the salve to reveal a small amount of the light concoction leaking from the tip. Lottie sighs. \"<i>Well... here goes nothing.</i>\" Taking the ointment, she places a small dab on her finger and rubs it around her rosy breasts, making sure to rub the cool mixture into her pale skin. She uses the remaining paste on her chubby stomach and soft thighs, massaging it in. In a matter of moments, all three areas shrink – but to the relief of both yourself and Lottie, the effects are noticeable, but slight. It appears as if she's lost a bit of weight.\n\n");

        CView.text("Lottie sits still, unsure about the convenience of the results. but glad that you've helped.");
    }
    lottieTone(10);
    player.inventory.items.consumeItem(ConsumableName.Reducto);
    return { next: passTime(1) };
}

// [If Ham Sandwich]
export function hamSammitchTimeBIATCH(player: Character): NextScreenChoices {
    CView.sprite(SpriteName.Lottie); // 36;

    if (LottieFlags.UNKNOWN_FLAG_NUMBER_00324 === 0) {
        LottieFlags.UNKNOWN_FLAG_NUMBER_00324++;
        CView.text("You walk over to the cafe, Lottie watching as you order a sandwich from their menu. In a matter of seconds the collie-like clerk pulls one up from the glass display and hands it over to you");
        if (Settings.sillyMode) CView.text(", mumbling something about lifetime members receiving free pig-related food items");
        CView.text(". You exchange a smile before walking back to the table and handing Lottie the moist meal, explaining that you saw the ham sandwich the other day, figuring she might enjoy it. Lottie throws it on the floor. \"<i>What the heck is wrong with you?</i>\"\n\n");

        CView.text("You reach for a high five that never comes.");
    }
    // [If Ham Sandwich, Repeat Encounter, High Corruption]
    else if (player.stats.cor >= 75) {
        CView.text("You walk over to the cafe, Lottie watching as you order a sandwich from their menu. In a matter of seconds the collie-like clerk pulls one up from the glass display and hands it over to you, mumbling something about giving a pig-girl a ham sandwich being a stupid fucking idea. You exchange a smile before quickly walking out of the cafe and into the currently empty pool area. You hastily remove your " + player.inventory.armor.displayName + " and take out your " + describeCock(player, player.body.cocks.get(0)) + ", jamming it straight into the sandwich and fucking it relentlessly. In moments you cum between the velvety slices of ham, leaving a large puddle inside and leaving the rest of your spunk leaking out the back and pooling onto the floor. You dress yourself before walking back to the table and handing Lottie the incredibly moist meal, explaining that you saw the ham sandwich the other day, figuring she might enjoy it – and that you've taken care into adding your own 'special mayonnaise'. Lottie throws it on the floor. \"<i>Don't cum inside ham sandwiches, asshole!</i>\"\n\n");
        CView.text("You reach for a high five that never comes.");
        player.orgasm();
    }
    // [If Ham Sandwich, Repeat Encounter]
    else {
        CView.text("You walk over to the cafe, Lottie watching as you order a sandwich from their menu. In a matter of seconds the collie-like clerk pulls one up from the glass display and hands it over to you, mumbling something about giving a pig-girl a ham sandwich being a stupid fucking idea. You exchange a smile before walking back to the table and handing Lottie the moist meal, explaining that you saw the ham sandwich the other day, figuring she might enjoy it. Lottie throws it on the floor. \"<i>Stop giving me ham sandwiches, asshole!</i>\"\n\n");
        CView.text("You reach for a high five that never comes.");
    }
    player.stats.cor += 1;

    return { next: passTime(1) };
}
// LOTTIE SEX STARTS HERE
// [Sex]
// LOTTIE SEX STARTS HERE

export function lottieFuck(player: Character): NextScreenChoices {
    CView.sprite(SpriteName.Lottie); // 36;
    let tentacle;
    let thirtyMinute;
    if (Settings.sillyMode && player.body.cocks.length > 0) thirtyMinute = lottiesThirtyMinutePigGasm;
    if (player.body.cocks.filter(Cock.FilterType(CockType.TENTACLE)).length > 0 && LottieFlags.UNKNOWN_FLAG_NUMBER_00306 === 2) tentacle = tentaDickLottieButtFuckbuttFuckButtFUCKBUTTFUCKBUTTFUCK;
    const cockThatFits = cockThatFitsLottie(player);
    player.stats.lust += 50;

    // [If Encouragement 0 – 30]
    if (lottieMorale() <= 40) {
        CView.text("You take Lottie's hand in your own, though the girl seems to flinch at your touch. \"<i>D-did I do something?</i>\" she asks, slowly recoiling into her seat. You choose not to answer, though the both of you know what's coming next. Silently, you increase your grip on Lottie, leading her out of her seat and into the pool area, checking for any bystanders before taking her inside one of the empty saunas. Lottie grows more and more anxious as you undress yourself in front of her, taking out " + describeEachOfYourCocks(player) + " and stroking gently. She seems to shrink when you turn to her and ask her to do the same. \"<i>P-please, " + player.desc.name + "... I... I like what we're doing, but,</i>\" she turns away from your wanting gaze before muttering, \"<i>I want to do this with someone special.</i>\" You scowl – it looks like you're going to have to take things into your own hands again. Walking towards the pig-slut, you grab the hem of her top and pull down, ripping it off to reveal her lovepillows which are covered hastily by her arms. \"<i>N-no! I... please, please don't do this...</i>\" Grabbing your " + describeCock(player, cockThatFits) + ", you step close enough for her to feel your hot breath against her skin. You rub the tip of your " + describeCock(player, cockThatFits) + " against her soft flesh, pre-cum leaking against her stomach as you thrust slowly. Your natural musk fills Lottie's button nose, and her increasingly shorter breaths give you the signal that she's ready to give up against your raging lust. \"<i>But " + player.desc.name + ", I... I love...</i>\" A loud slap is heard as you press and play with her bottom, grinding your length in between her creamy thighs. \"<i>I... love...</i>\" Slap!  You wail on her ass and thrust hard between her legs. \"<i>F-fuck! I love you so much!</i>\" the pink whore cries, pulling off her shorts and turning around, grabbing your " + describeCock(player, cockThatFits) + " and rubbing it against the entrance to her wetness. You grin at your success, but you're not going to satiate her needs yet. You continue to fuck her thighs, slapping her luscious butt every so often and earning a squeal in response. You lean over and grab one of her heaving breasts, groping it roughly to the sound of your pelvis slapping against her fat legs. The feeling of your " + describeCock(player, cockThatFits) + " being squeezed against Lottie's thighs almost sends you to climax, before you get a better idea.\n\n");

        CView.text("You turn Lottie around to face you, telling her you've decided you're going to take her for a vigorous work out. She only pants with anticipation.");
        // [Anal][Oral] – [Doggystyle][Walkies][Threesome][Netorare]
        let dog;
        let walk;
        let three;
        let neatrares;
        if (LottieFlags.UNKNOWN_FLAG_NUMBER_00310 > 0) dog = lottieRepeatDoggieStyle;
        if (LottieFlags.UNKNOWN_FLAG_NUMBER_00311 > 0) walk = lottieRepeatWalkies;
        if (LottieFlags.UNKNOWN_FLAG_NUMBER_00316 > 0) three = lottieRepeatThreesome;
        if (LottieFlags.UNKNOWN_FLAG_NUMBER_00317 > 0) neatrares = lottieRepeatSUPERNEATORARES;

        return {
            choices: [
                ["Anal", analLottieMilkshake], ["Oral", getSuckedOffByAHamSandwich], ["Tentacle", tentacle], ["", undefined], ["", undefined],
                ["Doggystyle", dog], ["Walkies", walk], ["Threesome", three], ["Netorare", neatrares], ["30Minute", thirtyMinute]
            ]
        };
    }
    // [If Encouragement 30 – 60]
    else if (lottieMorale() <= 60) {
        CView.text("You ask Lottie if she's keen for a little 'extracurricular workout', earning a giggle and a tilt of the head from the pig-girl. \"<i>What do you mean, " + mf(player, "big guy", "babe") + "?</i>\" she asks. You sigh and stand up, revealing your hardening member");
        if (player.body.cocks.length > 1) CView.text("s");
        CView.text(". \"<i>I... oh.</i>\" Taking Lottie's hand, you quickly lead her out of the cafe and into the pool area, looking for an empty sauna to sneak into. Considering that the gym's pool is only used by a few semi-aquatic humanoids and the odd ");
        if (Settings.sillyMode) CView.text("street ");
        CView.text("shark, your search isn't that difficult. Hopping into the toasty room, you quickly undress, Lottie still standing by the doorway. \"<i>H-hey, y'know, I didn't actually agree on this or a-anything...</i>\" she stutters, nervously fiddling with her top. Without missing a beat, you walk towards her and plant a kiss on her full lips, tasting her sweetness as you probe her mouth with your eager tongue. The girl melts underneath your touch, passionately returning your erotic display while you take the chance to slip Lottie out of her top, reaching into her shorts to feel between her creamy hips. She moans as you slowly push two fingers inside her moist wetness, simultaneously pulling out your " + describeCock(player, cockThatFits) + " and pushing her back against the wall. Lottie begins to jerk you off slowly, massaging the length of your " + describeCock(player, cockThatFits) + " with one hand while the other takes care at gently caressing your tip. You start to thrust into her hands on reflex while you claim her mouth, the feel of her sugary tongue wrapped around yours sending you both into fits of needy lust. You use your hands to reach around and squeeze her chubby derriere, lightly slapping it whilst a stray hand heads towards her source of hot desire. You slick your hand against her wetness, Lottie moaning in your mouth while you work towards bringing her to an early climax. However, the sudden roughness of your hands against her mound only causes a quick jerk to your " + describeCock(player, cockThatFits) + ", her soft hands tightening against your shaft. You groan in response, removing yourself from the lips of her mouth and instead placing your own against her erect nipple, sucking forcefully. The pig-slut grabs your head and pushes you towards her heaving chest, relinquishing her grip on your member to hug you closer.\n\n");

        CView.text("Not wanting to be left unsatisfied, you tell her you've decided you're going to take her for a vigorous work out. She can only pant with anticipation.");
        // [Anal][Oral]
        return { choices: [["Anal", analLottieMilkshake], ["Oral", getSuckedOffByAHamSandwich], ["Tentacle", tentacle], ["", undefined], ["30Minute", thirtyMinute]] };
    }
    // [If Encouragement 60 – 100]
    else {
        CView.text("You take Lottie's hand in your own, causing a small blush from her in response. \"<i>" + player.desc.name + "?</i>\" she begins, only to be cut off by a small peck to the lips. Lottie reddens, giggling slightly and gazing around for any onlookers. \"<i>What's brought this on, babe?</i>\" She beams, twirling and caressing your fingers among her own. You tell her that you thought she just needed a little more 'special exercise' to help get the blood flowing – making sure to emphasise \"<i>special exercise</i>\" with exaggerated air quotes. She playfully pushes away your idiotic gesture and takes you out of your seat, leading the way into the pool area and into one of the empty saunas. Locking the door behind you, she turns around to face you and your hardening crotch. \"<i>I think you're getting a little over excited, babe,</i>\" she purrs, her confidence getting the better of you as she takes a step closer, but you're the one in charge. Grabbing Lottie by the hips, you twirl her around to face the wall, grinding your hardening length");
        if (player.body.cocks.length > 1) CView.text("s");
        CView.text(" against her plump asscheeks. \"<i>W-woah! I... well, okay...</i>\" she moans, reaching back to stroke your " + describeCock(player, cockThatFits) + " through your clothing while you grab a handful of her rosy ass, slapping and squishing it against your palm. You continue to hump relentlessly against Lottie's tight shorts, occasionally reaching around to feel her hot mound, causing the odd squeal or moan to emanate from her pouting lips. Eventually deciding clothes are the only thing between Lottie's lewd figure and your own " + describeCock(player, cockThatFits) + ", you simultaneously remove your outfit while ripping off her sweaty top, causing her breasts to spill out into your eager, groping hand. Despite your sudden stripping, Lottie immediately gets back into position, placing your cock in between her pillow-like asscheeks and moaning while you flick and tease her swollen nipples, rocking back and forth against you.\n\n");

        CView.text("Lottie whimpers in between short, hot breaths, \"<i>You're driving me crazy here, babe...</i>\" You give her chubby ass a hard slap in agreement. Lottie squeals in glee, jerking your " + describeCock(player, cockThatFits) + " as it pokes up through her ass. The sensation of your tip rubbing against her velvety skin drives you wild.\n\n");

        CView.text("You turn Lottie around to face you, telling her you've decided you're going to take her for a vigorous work out. \"<i>I'll work you out, babe,</i>\" she moans in response.");
        // [Anal][Oral] – [Quickie][Cowgirl][ReverseCowgirl][FemDom]
        let quickie;
        let cowgirl;
        let rcowgirl;
        let femdom;
        if (LottieFlags.UNKNOWN_FLAG_NUMBER_00314 > 0) quickie = lottieRepeatQuickie;
        if (LottieFlags.UNKNOWN_FLAG_NUMBER_00313 > 0) cowgirl = lottieRepeatCowGirl;
        if (LottieFlags.UNKNOWN_FLAG_NUMBER_00320 > 0) rcowgirl = lottieRepeatBackwardsAssCowgirl;
        if (LottieFlags.UNKNOWN_FLAG_NUMBER_00319 > 0) femdom = lottieRepeatFEMDOMFEMFDOM;

        return {
            choices: [
                ["Anal", analLottieMilkshake], ["Oral", getSuckedOffByAHamSandwich], ["Tentacle", tentacle], ["", undefined], ["", undefined],
                ["Quickie", quickie], ["Cowgirl", cowgirl], ["R.Cowgirl", rcowgirl], ["Femdom", femdom], ["30Minute", thirtyMinute]
            ]
        };
    }

}

// [Doggystyle]
export function lottieRepeatDoggieStyle(player: Character): NextScreenChoices {
    CView.sprite(SpriteName.Lottie); // 36;

    CView.image("lottie-fuck-her-doggie-style-repeat");
    const cockThatFits = cockThatFitsLottie(player);
    CView.text("A few minutes later and you've taken your whore to the washrooms. Mirrors line the sides of the walls to allow members to observe how far they've gone and how far they still need to go. It's entirely empty for the night, though you make sure to lock the door just in case. You turn around to see Lottie cowering in the corner. She knows what you want – and you swear on Mareth's giant tree titties you'll get it. With her naked body on full display, Lottie quietly moves down to the ground, positioning herself on all fours with her butt facing towards you. She looks behind herself to see your erect " + describeCock(player, cockThatFits) + " on full display, quickly squealing and looking away. You grin as you stroke yourself into fullness, walking over and placing yourself behind Lottie's full derriere. \"<i>" + player.desc.name + "?</i>\" she gently sobs, \"<i>P-please don't do this.</i>\" With that, you grab her ample thighs and thrust forward, driving your " + describeCock(player, cockThatFits) + " straight into her tense wetness.\n\n");

    CView.text("You groan as you feel her tight walls surrounding your length, Lottie screaming as she feels you invade her private area.  You continue your relentless advance, pounding your whore while you grunt in pleasure, calling her a worthless fat piggy and slapping her ass while she squeals and moans. You watch your slut while she desperately tries to close her eyes and escape the reality occurring to her, but every push and pull of your " + describeCock(player, cockThatFits) + " inside her warm depths reminds her where she is. Lottie cries desperately, at first for you to stop, but then for help. Fortunately for you, the walls of the washroom are curiously soundproofed, and any knocks at the door are gone as soon as they arrive. As you pork your prize, you bend over and press your body against the chubby girl, reaching around and squeezing her cushiony rack with one hand and supporting your weight on the other. Lottie unwillingly moans as you plunge your " + describeCock(player, cockThatFits) + " into her, feeling your hardness move along her inner walls. She keeps her head lowered towards the floor, the sight of her heavy breasts being squeezed and pulled by your hands in her peripheral vision. Lottie's cries and yelps grow quieter as you fuck her harder, her juices lubricating your hungry member. Eventually, you get bored of keeping her on all fours, and with one slick flip you turn her over onto her back, revealing her pale figure to you. The pig-girl squeals and covers her face with her hands, not wanting to witness you pounding at her soaked cunt. You're not one to complain, instead focusing on suckling upon one of her breasts, your hand kneading the other.\n\n");

    CView.text("You feel a familiar sensation as you drive faster into Lottie's pussy, sucking harder as you bring yourself closer to the edge. With one final thrust into her womb, you lean back and release your hot spunk inside while she thrashes and yells in defiance. In your ecstasy you grab Lottie by the shoulders and pull her on top of you, your " + describeCock(player, cockThatFits) + " still spurting your cum inside. You both lay there, Lottie broken while you grab her jiggling asscheeks and hump into her for several more minutes of pure bliss.\n\n");

    CView.text("When you finally give in to exhaustion, you leave Lottie on the floor, your seed leaking out of her while she lays drooling and inattentive to her surroundings. You pat her on the butt and begin to make your way out of the gym, making sure to grab a ");
    if (Settings.sillyMode) CView.text("bacon ");
    CView.text("shake on the way out.");
    if (Settings.sillyMode) CView.text("  You fucking love bacon shakes.");
    player.orgasm();
    player.stats.sens += -2;

    return { next: passTime(1) };
}

// [Walkies]
export function lottieRepeatWalkies(player: Character): NextScreenChoices {
    CView.sprite(SpriteName.Lottie); // 36;

    CView.image("lottie-fuck-her-in-public-repeat");
    const cockThatFits = cockThatFitsLottie(player);
    CView.text("A few minutes later and you've taken your whore outside of the gym and around to the back, where an equipment shed lies waiting. You make quick work of the lock, busting it open with a nearby metal pole. The two of you walk slowly inside, Lottie pausing behind you to gaze at the tools and exercise apparatuses littering the walls. Soon, you find what you're looking for. You've never been one to judge a person for their fetishes, but you make a mental note to thank the person who couldn't control theirs. A single leather collar attached to a leash dangles silently upon a hook attached to the walls of the shed. Grinning, you take it down, adjusting the length of the rope before handing it to Lottie. \"<i>W-what's this for, " + mf(player, "sir", "ma'am") + "?</i>\" she mumbles, but you pay no attention to her questioning as you loosen the collar and push it down on the girl's neck, tightening it before she can protest. \"<i>N-no! What are yo-!</i>\" Slap! You pelt your hand against her soft cheek, causing her to jerk on the rope and fall to the floor, miserable and in pain. Your slut slowly looks up at you with watering eyes, a hand to her face to quell the stinging sensation. \"<i>I... I understand.</i>\" She mutters quietly, picking up the leash and placing it in your hands, before standing on her knees and adopting a begging position in front of you. You grunt as the girl pulls out her small tongue, reluctantly licking at your groin to satisfy the beast behind your clothes. Just like a whore to assume that's what you're here for. You walk away from her attempts to fellate you, pulling on the leash and yanking your girl forward. She gets up and starts walking behind you and out into the sunlight - you want the world to know how well you've trained your fat little piggy.\n\n");

    CView.text("You look back to the shed to see if there's anything you might be missing. Weights, large poles, a whip, some rope, and – ah yes, the steel ring gag. 'Where there's a whip, there's a way', you chuckle to yourself as you take the strap and bring it over to Lottie. Your pig slut is naked and ready, waiting on your command as you pull out the ring-shaped device and stretch the strap over her head, placing the metal ring inside her mouth and forcing the pale slut to make a permanent 'O'-shape with her lips. You tighten the gag, causing Lottie to cough uncomfortably as drool forms at the base of her mouth. Taking the leash, you drag Lottie away from the shed, her large ass jiggling as she tries to catch up to you. You figure you'll take her to the backstreets of Tel'Adre – you want people to see your work of art, but you know only the scum of the city will truly appreciate her for what she is. You pull the leash, leading Lottie through an alleyway and into a smaller, dirtier part of the desert city, an enclosed area with several food stalls littered around.  A majority of the lower-class citizens wander these parts, shuffling about as they haggle, argue and steal – as is usual in the slums. Most people notice your pig-girl trotting behind you, though few offer a second glance. The majority stand and stare as you present your trophy – a few of the more courageous ones openly masturbate to the site, whereas the braver still walk up and slap your pig on the ass, eliciting a squeal or a moan. You decide to up the ante while you walk through the commons, placing a hand between Lottie's pale thighs and thrusting two fingers into her pussy, the heat enveloping your digits as you shamelessly fingerfuck the poor girl.\n\n");

    CView.text("On your walk, you find yourself in a familiar location – the back alleyway of the Wet Bitch. Figuring it wouldn't hurt to take your slut inside; you jerk your hand forward, forcing Lottie to walk towards the door – when you recognize the face of a furiously masturbating fox herm.  Urta looks at you while she pumps her thick horsecock relentlessly, winking at the pig-slut you've currently got on a leash. She doesn't seem to recognize you again, which could either mean she's somehow contracted serious amnesia, or she's a lot drunker than usual. \"<i>");
    if (!Settings.sillyMode) CView.text("Heyyy, is she like *hic* your shex slave er shumthin?");
    else CView.text("Heyyy, do I shmell bacon?  I fucking love bacon!  BACON BACON BACON!");
    CView.text("</i>\" You decide to give the drunk vixen a treat. Pulling your slick fingers out of her cunt, you push Lottie towards the gray fox-woman, tugging on the leash to jerk her backwards onto the floor. As she tries to get up, the girl squeals as Urta's large equine member slaps Lottie on the nose. You take out your own " + describeCock(player, cockThatFits) + ", barking at her to keep on all fours – as long as you own the backside, you couldn't care less what the fox-herm does to her face. Urta starts by rubbing the flat head of her length on the full lips of your slut, the scent of her intoxicating pre-cum enticing Lottie to place small licks along the wet tip. Not wanting to be left out, you forcefully grab her hips, gliding your " + describeCock(player, cockThatFits) + " straight into the slut's warm hole, groaning as you feel her walls tighten around you. You jerk as her hips suddenly thrust backwards, and you glance over to find Urta burying as much of her thick cock into the girl's mouth as she can. You both glance at each other, sharing a nod before you both plunge your lengths into the sobbing pig-whore, rocking back and forth. Urta moans while she holds onto the back of Lottie's head with one hand, fondling her own tits with the other. On the other end of your slave, you fuck relentlessly as you hold onto her fat asscheeks, panting heavily from the pleasure of them slapping against your groin. The fox-herm lets out a loud moan before pushing as much of Lottie's face into her groin as she can, her balls growing as she prepares to fill the slut's throat. You feel yourself about to explode as well, taking longer, and deeper thrusts into the girl before finally pushing forwards and filling her with your spunk, the fox-woman on the opposite end forcing her twitching, animalistic member into Lottie's throat and doing the same. The both of you slowly remove yourselves from your trophy, the pale, sweating girl now on the floor, thick seed leaking from both ends. With one more grunt you unload the rest on her ample butt, Urta painting her face.\n\n");

    CView.text("You decide to leave Lottie there while Urta jerks off for another round at her mouth, heading back to the gym to grab a ");
    if (Settings.sillyMode) CView.text("bacon ");
    CView.text("shake.");
    if (Settings.sillyMode) CView.text("  You sure do love spit roasting a pig, but nothing can beat a bacon shake.");
    player.orgasm();
    player.stats.sens += -2;
    player.stats.cor += 1;

    return { next: passTime(1) };
}

// [Cowgirl]
export function lottieRepeatCowGirl(player: Character): NextScreenChoices {
    CView.sprite(SpriteName.Lottie); // 36;

    CView.image("lottie-fuck-her-cowgirl-repeat");
    const cockThatFits = cockThatFitsLottie(player)!;
    CView.text("A few minutes later and you've both gone to the yoga rooms – you've already placed a mat down while you wait for Lottie to change. Your rosy lover bounces into the empty, dim lit room, her ample thighs squishing out of a pair of super tight shorts, while her breasts fill over a sports bra. You're immediately turned on by the incredibly erotic display, Lottie catching scent of your increasingly hardening member and giggling while she crushes her boobs together in front of you. \"<i>I'm guessing you like what you see?</i>\" she purrs, walking over to you and pushing you down upon the gym mat. Lottie makes quick work of your lower clothes, your " + describeCock(player, cockThatFits) + " bouncing out and at attention, which she grabs hastily as she begins to jerk you off. The pig-girl presses your member against her moist slit, grinding it back and forth while her moans fill the empty room. You grunt in pleasure, jerking your hips slightly to help the process along, to which she replies by bending down to press her overflowing tits against your chest. You take your hands and slap them upon her ass, groping and squeezing while she moans into you. The girl shudders in bliss as the grinding sends her into an early orgasm. \"<i>I... I've got something better for you, babe...</i>\" she pants as she pulls apart the opening in her shorts to reveal her blushing pussy. Keeping a firm grip on your " + describeCock(player, cockThatFits) + ", Lottie lifts herself up and slowly lowers her body upon it, your tip parting her folds and entering her hot insides. You grunt at the sensation of her inner walls squeezing tightly against your member, ");
    if (cockThatFits.area <= 40) CView.text("her ample cheeks resting on your groin as you bottom out in her");
    else CView.text("though you only reach so far before you've filled her up entirely with your length");
    CView.text(". You decide to take matters into your own hands as you grab her thick hips and drive upwards, Lottie squealing as you begin to pump in and out of her. The pig-girl's creamy breasts pop out of her bra and jump to your thrusts, her fat legs hugging either side while she bounces upon you. \"<i>God, I-I love you! Unh, I feel so hot, babe!</i>\" She yells as you pork your lover enthusiastically. The slaps of her full buttcheeks hitting your groin pervade the air, your grunts accompanied by Lottie's orgasmic moaning.\n\n");

    CView.text("As you feel yourself about to explode, you keep a tight grip on her hips before thrusting forward, filling her insides with your hot spunk. Lottie trembles in orgasm, the feeling of your cum inside of her sending her over the edge.");
    if (player.body.cocks.length > 1) {
        CView.text("  Your other cock");
        if (player.body.cocks.length === 2) CView.text(" does");
        else CView.text("s do");
        CView.text(" not disappoint, spurting your essence all over the pig-girl.");
    }
    CView.text("  You both lay on the mat, panting in ecstasy while your " + describeCock(player, cockThatFits) + " continues to ejaculate inside her.\n\n");

    CView.text("A while later, you've both said your goodbyes for the night. Before you leave, you make sure to head out to the cafe to buy yourself a ");
    if (Settings.sillyMode) CView.text("bacon ");
    CView.text("shake.");
    if (Settings.sillyMode) CView.text("  You love bacon shakes.");
    player.orgasm();
    player.stats.sens += -2;

    return { next: passTime(1) };
}

// [Quickie]
export function lottieRepeatQuickie(player: Character): NextScreenChoices {
    CView.sprite(SpriteName.Lottie); // 36;

    const cockThatFits = cockThatFitsLottie(player);

    CView.text("You follow Lottie out into the pool area, waiting as she walks into the dressing room to get changed. When she comes out however, you're surprised to find that she hasn't changed into anything – in fact, she's removed all her clothes entirely!\n\n");

    CView.text("The nude pig-girl stands in front of you, turning red at your hungry gaze. \"<i>Will you f-fuck my pussy, " + player.desc.name + "?</i>\"\n\n");

    CView.text("In moments flat you remove your clothes to jump the piggy, whipping out your " + describeCock(player, cockThatFits) + " and pushing it against Lottie's wet slit, the pig-girl lying on her back while her legs rest upon your shoulders. With a hearty thrust you drive yourself into her, eliciting a loud moan while you pork her insides with your meat. Her thick thighs slap against you as you bend over to take a lustful grab at her melons, sucking at her nipple and pinching the other, her sweet taste enveloping your mouth. Lottie buries you in her cleavage, yelping as you piledrive her tight pussy into submission – but you've got more in store. Flipping her over, Lottie lies face down with her soft butt jutting up in the air, your persistent fucking driving her wild. You continue gripping onto her tits as you pound her flesh, every thrust accompanied by her pleasured grunts. Back and forth you mount her until the familiar sensation in your loins signal your release. You increase your pace, pounding her pussy until you pull your head back and ejaculate inside her inner walls, slamming in harder every few seconds with each burst.");
    if (player.body.cocks.length > 1) {
        CView.text("  Your other cock");
        if (player.body.cocks.length === 2) CView.text(" twitches ");
        else CView.text("s twitch ");
        CView.text("in ecstasy, releasing all over her plump butt.");
    }
    CView.text("\n\n");

    CView.text("Sweaty and panting, Lottie lies on the floor, exhausted and full of your spunk. You slap her jiggling ass before walking out of the pool area, making sure to grab a ");
    if (Settings.sillyMode) CView.text("bacon ");
    CView.text("shake on the way out.");
    if (Settings.sillyMode) CView.text("  They're fucking delicious.");
    player.orgasm();
    player.stats.sens += -2;

    return { next: passTime(1) };
}

// [Threesome]
export function lottieRepeatThreesome(player: Character): NextScreenChoices {
    CView.sprite(SpriteName.Lottie); // 36;

    CView.image("lottie-fuck-her-threesome-repeat");
    const cockThatFits = cockThatFitsLottie(player);
    CView.text("You both walk to the yoga rooms, to find Elle stretching in the empty area. She spots the both of you, waving hello -  but you all have other, dirtier intentions in mind. Elle strips down, her perky tits bouncing loose. You chuckle devilishly as you undress in front of your naked and wanting harem. Both of the girls blush nervously as they stare at your " + describeCock(player, cockThatFits) + " – though the hunger in their eyes suggests anything but anxiety. You lay down on your back, gesturing for the girls to come over to you. Lottie enthusiastically trots towards you, lying down in front of your member and popping the tip into her full lips, circling around with her agile tongue. The spider-girl grows more enthusiastic, hopping behind to lie next to Lottie, placing her hot mouth at the base of your shaft and licking softly. She runs her tongue along your length while Lottie sucks hungrily on your head, slurping beads of pre-cum and stopping every so often to plant her lips on her spider-friend, swapping saliva along with the taste of your cock. As you let the girls work on your slick member, the spider-slut removes herself before straddling your face, her wet pussy inches from your hungry maw. Lottie begins to work around your length while Elle leans forward and plunges it into her mouth, sucking hard and fast. She releases your tip with a wet pop, moaning as you dig your tongue inside her hot cunt, tasting her juices and sucking gently on her hard clit. Lottie moves herself above your length, lowering herself slowly until you buck upwards, slamming your " + describeCock(player, cockThatFits) + " directly inside of her. Both of the girls squeal and moan from either ends, Elle's thick thighs on either side of your head while she tries to pull you in deeper inside. Lottie's pillowy breasts heave as she bounces on top of you, leaning over to the spider-girl as they share a deep kiss. Elle's extra hands knead Lottie's breasts, while her main two hold onto her own hips, grinding along your face while you sip at her sweet nectar. Your techniques seem to work, as the spider-girl shudders in orgasm, her sweaty thighs clamping down on you while she shakes in ecstasy. Lottie climaxes soon after, holding on to Elle's head as the girl sucks gently on her soft nipple flesh, her inner walls tightening against you. As you feel your own release coming, you order your sluts to take themselves off of you, to which they comply. In seconds you've grabbed the spider-girl and forced her to spread her legs wide open, plunging your " + describeCock(player, cockThatFits) + " inside and squirting your hot spunk. Lottie positions herself on top of the girl, placing their pussies against each other and grinding in lust. Once you finish filling your spider-slut, you drive into the pig-girl, ropes of your cum splattering her inner walls. You continue thrusting in and out of the both of them for several minutes, before finishing up by letting each girl suckle at your cock. \"<i>Satisfactory,</i>\" you mumble, redressing and heading out the door, making sure to grab a ");
    if (Settings.sillyMode) CView.text("bacon ");
    CView.text("shake on the way out.");
    if (Settings.sillyMode) CView.text("  You only need one of those to satisfy you.");
    player.orgasm();
    player.stats.sens += -2;

    return { next: passTime(1) };
}

// [Netorare]
export function lottieRepeatSUPERNEATORARES(player: Character): NextScreenChoices {
    CView.sprite(SpriteName.Lottie); // 36;

    const cockThatFits = cockThatFitsLottie(player);
    CView.text("You both walk to the yoga rooms, to find Elle stretching in the empty area. She spots the both of you, waving hello -  but you all have other, dirtier intentions in mind. Elle strips down, her perky tits letting loose. You chuckle devilishly as you undress in front of your naked and wanting harem – but you only have eyes for one girl. You point at the spider-girl, informing the both of them that you only plan to fuck her. Lottie may have thought she could win you over with another slut, but you feel as if you should teach her a lesson about being too presumptuous about what you want. Elle walks towards you, her child-bearing hips swaying hypnotically as she ");
    if (player.body.cocks.length === 1) {
        CView.text("begins to caress your " + describeCock(player, cockThatFits) + " with two of her hands, while the other sets to work on massaging your ");
        if (player.body.balls.count > 0) CView.text("balls");
        else if (player.body.vaginas.length > 0) CView.text("pussy");
        else CView.text("ass");
    }
    else CView.text("uses all four of her hands to handle " + describeOneOfYourCocks(player) + ", jerking each one with ease");
    CView.text(". Lottie stands next to the both of you, sobbing quietly as she fingers herself to the erotic display. You decide to tease Lottie further, reaching around the arachne-girl to enjoy her slick cunt with your digits, and pressing your own lips against hers while she jerks you off. You pick up the spider-girl, and with one swift movement impale her upon your " + describeCock(player, cockThatFits) + ", holding onto her womanly thighs and pumping her with your meat. Four of her arms hug you tightly as you let loose on the athletic woman, the spinnerets on her shoulders dangling idly, yet erect with throbbing need. Could they be...? You quickly erase the thought, continuing your barbaric display of lust as you probe the girl's mouth with your tongue, glancing every so often at Lottie to make sure she witnesses every single thrust. The pig-girl lies shamelessly spread-eagled on the floor, moaning and masturbating furiously to her best friend getting endlessly ploughed by her lover. Lottie clenches her sweaty thighs together and yelps, shuddering in orgasm. Defeated, she lays upon the ground, miserable. It gives you an idea. You hug Elle close to your body as you walk towards the pig-slut, positioning yourself on top of her while her best friend bounces upon your cock. Lottie opens her eyes to see the bronze beauty's taut ass slapping against your groin, your combined juices leaking out of her abused hole. \"<i>W-why...</i>\" the pig-girl chokes between sobs, but you only increase your pace as you feel your own release building up. You continue to pound effortlessly into your new whore, cum bubbling in your groin until you take one final step and thrust deep into her insides. Ropes of your cum splatter her inner walls, leaking out and painting the helpless pig-girl below you.");
    if (player.body.cocks.length > 1) {
        CView.text("  Your extra cock");
        if (player.body.cocks.length === 2) CView.text(" throbs, spilling out its essence along the floor and onto Lottie.");
        else CView.text("s throb, spilling out their essence along the floor and onto Lottie.");
    }
    CView.text("  Elle follows suit, groaning in pleasure as she reaches her own peak, her hole tightening around your length and trapping the rest of your spunk inside. The spinnerets upon her shoulder pulse in orgasm, spurting sticky globs of what appears to be thread up into the air and back down onto the pig, spunk pooling around her cleavage. You both relax, letting the spider-girl down off of you to collapse on the floor. You bend down, looking at Lottie before shoving your " + describeCock(player, cockThatFits) + " inside of her and letting one final spurt of your seed fill her up. \"<i>Satisfactory.</i>\" You mumble, redressing and heading out the door, making sure to grab a ");
    if (Settings.sillyMode) CView.text("bacon ");
    CView.text("shake on the way out.");
    if (Settings.sillyMode) CView.text("  You only need one of those to satisfy you.");
    player.orgasm();
    player.stats.sens += -2;
    player.stats.cor += 2;

    return { next: passTime(1) };
}

// [Reverse Cowgirl]
export function lottieRepeatBackwardsAssCowgirl(player: Character): NextScreenChoices {
    CView.sprite(SpriteName.Lottie); // 36;

    const cockThatFits = cockThatFitsLottie(player);
    CView.text("You both walk into the yoga area, met with the smell of sweat and flowers pervading the room. Lottie gently asks for you to lie down on your back, to which you comply quite easily. You're comfortable, folding your arms behind your head to give you leverage as you watch your lover walk slowly to you. Lottie turns around, her thick thighs straddling you as she sits down on your groin with her back facing your direction, giving you  a perfect view of her curvy body and plump ass. Your " + describeCock(player, cockThatFits) + " nestles gently between her rosy cheeks, pulsing with lustful intent as the girl grabs her hips and begins to pleasure you through her ass. The silence of the room breaks at your fevered pants and grunts as Lottie's skillful assjob sends you through fits of ecstasy, every curve of her bottom jiggling against the heat of your member. Her pace picks up while she bounces upon you, squeezing and squashing her perfect ass until one final lift in the air is met with her plunging your length up into her hot interior. The feeling of your molten cock inside her immediately sends Lottie into fits of orgasmic bliss, the intense heat filling the pig-girl with pleasure. Her attempts to continue are thwarted by your " + describeCock(player, cockThatFits) + " scraping against her inner walls, her thick thighs clenched together while she slowly moves up and down upon you. Deciding to take things into your own hands, you thrust upwards, almost pushing the girl off with your strength and causing Lottie to squeal as you begin pounding her irresistible hole. Her lush buttcheeks jiggle with every movement you make, the rising and falling of her body moving in accordance to your own will. You pump in and out, keeping a steady rhythm inside the hot and bothered woman.\n\n");

    CView.text("Inevitably, you can feel your release approaching, and with one final push you grab a hold of the pig-girl's tight ass, slamming against her and pumping your spunk directly into her clenched pussy, your " + describeCock(player, cockThatFits) + " twitching as ropes of cum coat her insides. Lottie yelps, collapsing on the floor and full of your hot seed. You wipe your cock along her ass cleavage, leaving her as a sweaty, cum-filled mess on the floor. Walking out, you make sure to grab a ");
    if (Settings.sillyMode) CView.text("bacon ");
    CView.text("shake from the cafe. They're fantastic.");
    player.orgasm();
    player.stats.sens += -2;

    return { next: passTime(1) };
}

// [FemDom]
export function lottieRepeatFEMDOMFEMFDOM(player: Character): NextScreenChoices {
    CView.sprite(SpriteName.Lottie); // 36;

    const cockThatFits = cockThatFitsLottie(player);
    CView.text("You both walk into the yoga area and are met with the smell of sweat and flowers pervading the room. You look around, unable to find your lover until –THUNK! A heavy weight is brought down upon your head, pulling you down to the ground and away from consciousness as everything fades to black.\n\n");

    CView.text("You wake up dazed, your forehead throbbing – you're also completely naked, but unharmed otherwise. When you try to move, however, you find yourself unable to shift from your position – you seem to be tied to a chair, your hands behind your back while your legs are bound to those of the seat. You observe your surroundings, noticing the recognizable brick walls and stocked shelves of the gym's equipment shed. The familiarity of the location leaves you somewhat relieved – at least you know where you are. A quick slap to the face brings your attention to the lean pig-girl in front of you. Her figure is somewhat obscured by the lack of sunlight inside the room, though you can tell she's mostly nude, other than a small black g-string obscuring her nether regions. She also appears to be sporting black thigh-high boots, along with similarly colored gloves that reach her arm pits. Her expression is one of immense desire, smiling wryly as she examines your form. \"<i>You've gotten bigger.</i>\" She smiles, leaning on top of you and letting her heavy breasts smother your face. You take a lick at one of her nipples before she jerks back and hits you again. \"<i>Hahaha, not today, pig. All this extra weight is because you can't keep your mouth closed.</i>\" She spits, grabbing at the soft flesh of your ");
    if (player.body.chest.sort(BreastRow.Largest).get(0)!.rating >= 2) CView.text("tits");
    else CView.text("belly");
    CView.text(" and squeezing, as if she was playing with putty. \"<i>I've reached my goal, but it seems you need a bit of help reaching yours. If you don't mind, I think I'll be your personal trainer for today.</i>\" The horny pig-slut grabs a hold of your " + describeCock(player, cockThatFits) + ", keeping a firm grip on your member as she effortlessly jerks you off. \"<i>I think I'll release all of that thick, sticky spunk you've got hidden inside of your fat cock.</i>\" The velvet of her gloved hands sends small bouts of pleasure through your body, her technique clumsy but efficient. Lottie begins playing with her juicy nipples, twisting and rubbing them while she toys with your length. You shudder, looking down to find her mouth only inches away from your " + describeCock(player, cockThatFits) + ", her hot breath surrounding your tip. She takes one lick of your cockhead, and already you feel a tingling sensation as you start to orgasm – did she take something to cause this? Regardless, you pump mindlessly through her hands, looking for release, when Lottie grabs hard at your cock, plugging your cum and causing you to grunt in denial.\n\n");

    // [If Cum Production Average]
    if (player.cumQ() <= 500) {
        CView.text("\"<i>Hm. Your dick here seems to be twitching. Were you... were you going to cum for me?</i>\" you nod feverishly, anything to get her to release her grip. \"<i>No. Not here. In me.</i>\" She straddles you, plunging your " + describeCock(player, cockThatFits) + " into her depths and bouncing to a steady rhythm, her ample butt slapping against your groin. \"<i>Unh... do you like me fucking your fat ass, pig?</i>\" she yelps, holding onto your large body as you lay there, being serviced. \"<i>F-fuck! Fill me up, babe!</i>\" You grunt, the vice-like grip of her walls tightening against your member. With one steady push you explode inside of her, filling her up with your thick spunk. \"<i>Oh god, give me all your cum!</i>\" she yelps, her belly full of your molten liquid. Lottie lifts herself up, your " + describeCock(player, cockThatFits) + " dripping out and leaving a puddle underneath you. \"<i>H-hah, y-you're such a pig!</i>\" she stutters, obviously flustered from the sex but still attempting to keep up a dominant facade. You easily untie yourself from the binds and walk over to her, planting a kiss on her cheek before leaving through the shed door. \"<i>You... you could've escaped the whole time?</i>\" she squeaks, your only response a thumbs up as you walk away. On your way out, a milkshake vendor waves over to you – it's the guy from the cafe. You buy a ");
        if (Settings.sillyMode) CView.text("bacon ");
        CView.text("shake before deciding to head home.");
        if (Settings.sillyMode) CView.text("  You fucking love bacon shakes.");
    }
    // [If Cum Production High]
    else {
        CView.text("Unfortunately for her, you have far too much built up to stop now. With another thrust, your " + describeCock(player, cockThatFits) + " pulses in delight, exploding in orgasm as ropes of spunk splatter upon Lottie's face and tits. The girl gasps, the sheer amount of your seed painting her white. \"<i>N-no, stop! Oh god!</i>\" she yelps, before her mouth is filled with your hot essence. She forces herself to swallow, coughing as you grin at the defeated slut. \"<i>O-okay, y-you win, " + player.desc.name + ".</i>\" she looks up at you and smiles, before untying your binds and setting you free. \"<i>But you have to admit, this was pretty fun, right?</i>\" You give her a thumbs up before walking out the door, leaving her to clean your thick mess. On the way out, a milkshake vendor waves over to you – it's the guy from the cafe. You buy a ");
        if (Settings.sillyMode) CView.text("bacon ");
        CView.text("shake before deciding to head home.");
        if (Settings.sillyMode) CView.text("  You fucking love bacon shakes.");
    }
    player.orgasm();
    player.stats.sens += -2;

    return { next: passTime(1) };
}
// [Hug]
export function hugTheShitOutOfYourHam(player: Character): NextScreenChoices {
    CView.sprite(SpriteName.Lottie); // 36;

    CView.text("You stand up, telling Lottie to come over to you. She hesitates, unsure as to what you have in mind, but follows accordingly. Soon, the rosy pig-girl stands in front of you, looking curiously with grey-green eyes. You suddenly reach out towards her, Lottie flinching and instinctively attempting to move out of the way – but it's too late. \"<i>BIG OL' BEAR HUG!</i>\" you scream, wrapping your arms around the short, shrieking pork-woman. \"<i>GRR GRR, ALL HUGS ARE GO!</i>\" You start shaking about, bringing Lottie with you as you try to hug her with all the cuddliness of a grizzly. At this point, Lottie's screams have turned into giggles, laughing and shaking while faux-attempting to escape from your grasp. \"<i>S-stop it, babe! Nooo!</i>\" she cries, flailing helplessly. You both laugh as you put her down, Lottie pretending to punch your gut while you pretend to reel in pain. It's no question that your bear hugs are simply the best.\n\n");
    if (lottieMorale() < 70) lottieMorale(1);
    // [If Encouragement 0 – 30]
    if (lottieMorale() <= 30 && player.stats.cor >= 75) {
        CView.text("You tell Lottie to wake up, slapping her face into consciousness. She yelps at the pain, a strand of drool flying as she jerks awake from her fantasy. She sniffs quietly, keeping her thoughts to herself. \"<i>What kind of useless slut daydreams?</i>\" You smirk.\n\n");
        CView.text("The kind that wishes for the day that her life will change, Lottie thinks back.");
        lottieMorale(-4);
    }
    return { next: passTime(1) };
}

// END OF EVENTS FUCKIN FINALLY
// (Note1: [Anal] and [Oral] are the exact same as their first encounter counterparts.)
// (Note2: Once Encouragement and Figure hit an extreme (either 0 or 100), they permanently lock, to avoid repeating 'talk' options that suggest first time encounters.)
// (Note3: If this is undesirable, an alternative is allowing the Encouragement and Figure to continue being mouldable, though 'unlocked' scenes will relock once past a specific point – ie. 0 encouragement, 0 figure scenes relock once either is past 30, and returning to 0 only unlocks the scenes, rather than triggering the 'talk' option again to avoid repetition.)

// iii-i. Tentacle Scene
// Requires: Tentacle dicks. Obviously. Must have unlocked at least one other
// vaginal sex scene.
export function tentaDickLottieButtFuckbuttFuckButtFUCKBUTTFUCKBUTTFUCK(player: Character): NextScreenChoices {

    CView.image("lottie-fuck-her-with-tentacle-dick");
    const tentacleCocks = player.body.cocks.filter(Cock.FilterType(CockType.TENTACLE)).toArray();

    CView.text("It isn't long before you've taken Lottie out to the shed behind the gym - due to the amount of visitors regularly coming in and out of the gym itself, the equipment seems to have been mostly removed - leaving bare shelves and a large concrete floor covered in spare gym mats.\n\n");

    CView.text("The porcine girl takes the initiative as soon as you enter the room, stripping down and planting her cushiony ass upon the pile of mats in front of you.  \"<i>What're we gonna do in here, babe?</i>\" she asks, turning over onto her soft belly and rolling around, covering herself in an assortment of old, thin mattresses.  \"<i>Heh, I'm a pig in a blanket,</i>\" she squeaks, unaware of you slowly pacing towards her, your hand firmly stroking your " + describeCocksLight(player) + ".  There's a time for games, you think, and a time for unleashing your myriad of undulating vine-beasts upon your curious pink slut.\n\n");
    CView.text("Removing your " + player.inventory.armor.displayName + ", you let your " + describeCocksLight(player) + " hang loose, a single vine stretching outwards and slapping Lottie upon the ass to remind you of why you're here.  She squeals, trapped underneath the heap of mattresses and doing little to help the situation she's found herself in.  \"<i>H-hey, uh, I've kinda found myself in a little pickle, " + mf(player, "big guy", "hon") + " - could you give me a hand?</i>\" Lottie chuckles, squirming around in an attempt to loosen herself from the pile, but inevitably failing.  You walk closer towards her, shifting away a few mattresses here and there to free her limbs.  She smiles apologetically as you lift up the last mattress, crawling back out of the pile only to squeak when you bring down the smallest - albeit, heaviest - mat onto her back, preventing her from moving any further and causing her face to be buried against the mattress below her, the girl's plump ass stretched directly up into the air.  The awkward position restricts the movement of anything outside of her forearms and neck, and the majority of the weight upon her back pushes her chest into her knees, disallowing her from stretching outwards.  Lottie turns her head to the side, giving her time to breathe and assess the situation.  She notices you're stark naked, her eyes drawn down to the " + describeCocksLight(player) + " laid before her.");
    if (lottieMorale() <= 30) CView.text("  She gives you a gloomy stare, before turning her head back down and plunging it into the mattress, already accepting her defeat");
    else CView.text("  She raises an eyebrow, though doesn't probe any further");
    CView.text(".\n\n");

    CView.text("You grasp the base of your " + describeCock(player, tentacleCocks[0]) + " as it stretches forward, gently caressing Lottie's face before exploring the rest of her body, idly stroking the smooth curves of her hips or brushing against her hardening nipples.  The pig-girl moans quietly from the light petting while the feeling of her soft skin excites your hardening length, reminding you of your true intentions.  You walk behind her, obscuring yourself from Lottie's peripheral vision and crouching down to inspect the view of her perfectly rounded ass pointed conveniently into the air.  " + describeOneOfYourCocks(player, true) + " twitches in agitation, eager to plow the chubby slut trapped in front of you - and you aren't about to disappoint.\n\n");

    // [if a single, lonely tentapenis]
    CView.text("You firmly squeeze your ");
    if (player.body.cocks.filter(Cock.FilterType(CockType.TENTACLE)).length > 1) CView.text("first ");
    CView.text("writhing member as it stretches out, snaking towards Lottie's genitals and probing her moistened lips.  The tip of your vine-like length wriggles vertically along her eager hole, vibrating against her hardening clit and causing the sweating pig-whore to oink in pleasure.  She struggles to move her arms towards her aching need, desperate to relieve herself from the thick, stretching snake pushing against her slick cunt.  Without a word of warning, the hardened tentacle presses the side of its slick length firmly against her entrance, before whipping itself backwards and plunging into her heated hole.\n\n");

    CView.text("Lottie groans from pleasure while your thickened, snake-like cock lies pulsing inside her, trapped within the tightening walls of her womb.  You force the bestial length to curl back outwards, before pumping back with incredible force - plowing your girl with fevered abandon as the insatiable vine pushes her face into the mattress soaked with her saliva.\n\n");

    // [if extra cock] //this is to be added to the standard text
    if (tentacleCocks[1]) {
        CView.text("Seeing that you have extra junk left to be used, and she has some vacant holes, you quickly remedy this problematic situation; guiding your " + describeCock(player, tentacleCocks[1]) + " toward her moist butthole, you press the tip of your tree-like beast against her plush buttocks, literally stabbing her flesh with your penile flora.  The butt-slut doesn't seem to care: if anything, she squirms all the more, visibly aroused.  Her ass seems to stretch on its own as it braces itself for the imminent butt-devastation.  You welcome Lottie's efforts to comply to your anal needs and with a single thrust, you push ");
        if (tentacleCocks[1].area <= 80) CView.text("the entirety of your " + describeCock(player, tentacleCocks[1]));
        else CView.text("as many inches of your " + describeCock(player, tentacleCocks[1]));
        CView.text(" as you can, tearing her insides as your mammoth makes room for itself.  The piggy girl squeals, the intense and rough friction proving too much for her sensitive anal receptors.  You push further, making sure her colon is completely stuffed with vine-like cock.  You rest there for a while, letting Lottie thrash wildly as she futilely tries to accommodate to the beast filling her interior.  It feels good, but you rapidly lose patience and start sliding your rubbery dong in and out of her butthole, smearing her anal entrance with your own pre-cum, making further thrusts easier and faster.  You butt-fuck the pig-girl until her anal walls feel numb from the raw violation, and you butt-fuck her a little more.\n\n");

        // [if another extra cock]//this is to be added to the standard text
        if (tentacleCocks[2]) {
            CView.text("Her constant moaning and screaming reminds you that one of her holes at least isn't being put to use.  Her eyes widen in awe as she sees your " + describeCock(player, tentacleCocks[2]) + " inexorably moving to her waiting mouth, her lips forming a wide O as if to greet your tentacle pecker.  Without a word, you plunge your beast in her mouth, burying your prick until she's about to choke.  Fortunately she's used to blowjobs, and you have no trouble fitting a decent amount of inches down her throat.  You can see her neck bulge from the obscene intrusion, and the tip of your " + describeCock(player, tentacleCocks[2]) + " swells until her windpipe looks ready to explode.  She can't say anything, but the way her eyes are staring at you tell you more than anything about how she feels.");
            if (lottieMorale() < 40) CView.text("  This pig slut really loves to be used like that!");
            else CView.text("  Your pig lover really loves what you're doing to her!");
            CView.text("  A bunch of tight fuck-holes, each taking care of your tentacle pricks in its own way, all different but all so wonderful!  A horny girl begging to be rammed with cock in her every hole... You almost feel bad for using her like a broken fuck-toy, but she is clearly asking for it.  She keeps twisting in every direction as you savagely triple-penetrate her, her silent moans of pleasure being muffled by the beast lodging in her mouth.\n\n");
            // [if another extra cock]//to be added to standard text
            if (tentacleCocks[3]) {
                CView.text("Surely her twat must have some room left for more cock?  Before you even think of it, your free tentacle prick is already squirming its way to the piggy's love-tunnel, trying to fit as its companion ruthlessly rams her fuckhole.  You feel her whole body clench as you press the tip of your " + describeCock(player, tentacleCocks[3]) + " between her netherlips, stretching them beyond their normal capacity as you keep pushing forward.  If her mouth wasn't so full of dick, you'd be sure she would scream like a harpy in heat.  Once the tip manages to get through her tight vaginal entrance, the rest easily follows, and you effortlessly slide your dickflesh down her now-gaping cunt.  You synchronize your pricks penetrating her cuntwardly, literally ravaging her pussy as you pork her insides with your genitals.\n\n");
                // [if another extra cock]//to be added to standard text
                if (tentacleCocks[4]) {
                    CView.text("Since her dripping twat has been able to take some extra dick, why not try her backside?  Your " + describeCock(player, tentacleCocks[4]) + " wriggles joyfully as it wraps around Lottie's plump rump, ready to test her anal capacity.  Fortunately, its rubbery texture allows it to be compressed as it grinds against your " + describeCock(player, tentacleCocks[1]) + ", sliding toward the pig-girl's wet anus.  Your plant-like dong bounces back against her entrance numerous times, but you know she is being stretched wider at every attempt.  You don't know how many times you poke her pucker with the erect tip of your " + describeCock(player, tentacleCocks[4]) + ", and you can't imagine how the teasing stimulation feels for the poor prisoner of your tentacle embrace.  At last, with a brutal thrust, your flexible dong somehow manages to clear a path for additional butt-penetration.  Your twin erect pricks are incredibly squeezed against her tight anal walls and her body is about to be torn in half from all the rods impaling her from many directions at once.  That doesn't prevent you from thrusting back and forth very carefully through her colon, never completely pulling out.\n\n");
                    // [if another extra cock]//to be added to standard text
                    if (tentacleCocks[5]) {
                        CView.text("No matter how hard you try, you can't fit any more cock in her toy-like body. Your " + describeCock(player, tentacleCocks[5]) + " is quivering in frustration, until you notice her fleshy orbs bouncing up and down repeatedly on her chest as you ruthlessly pound her from every hole.  This might be the right occasion to get a good titfuck: your " + describeCock(player, tentacleCocks[5]) + " slowly slithers along her sweaty body and slides between her sizable fuckpillows; although the sensation isn't as hot and amazingly rough as the sharp tingles of pleasure received from the dongs pounding her ass, your rod is being subtly tickled and teased by her supple flesh.  Already aroused from the thorough multi-penetration, you start dripping pre-cum all over her torso, smearing her whole body with your sap.  This makes her breasts all the more slick and slippery, and needless to say, the sensation isn't lost on your " + describeCock(player, tentacleCocks[5]) + "; it seems to grow even bigger and becomes pinkish, the sudden color change betraying its arousal. You keep fucking her boobs until they are literally glistening from all the juices you've spilled on them.\n\n");

                        // [if another extra cock]//to be added to standard text
                        if (tentacleCocks[6]) {
                            CView.text("As you idly pump Lottie's body with all your junk, you mentally count all the extra ways her body could be used, since you have some tentacle dong left.  Mouth, cunt, ass, tits... wait!  Her hands are still free!  By the way they are twitching convulsively, you can clearly tell they are aching for some dick to handle.  You graciously comply to her cocky needs and shove your " + describeCock(player, tentacleCocks[6]) + " against her palm, coating it with your pre-cum.  She instinctively clings to your rod of flesh as if her life depended on it and starts jerking you off, ferociously rubbing your dickflesh and using a mix of her sweat and your pre-cum as lube.");
                            // [if another extra cock]
                            if (tentacleCocks[7]) CView.text("  Seeing the effect your junk had on her, you move your " + describeCock(player, tentacleCocks[7]) + " to her remaining hand and she grips it likewise.");
                            CView.text("  She keeps stroking you in a compulsive way, her hands clearly acting under the effect of her tremendous lust.");
                            CView.text("\n\n");
                            // [if another extra cock]//to be added to standard text
                            if (tentacleCocks[8]) {
                                CView.text("With another cock left unsatisfied, you place your thick, tentacled member against the soft flesh of Lottie's ass, driving it to and fro as the sensation of her chubby flesh drives you wild.\n\n");
                                // [if yet another extra fucking cock jesus tittyshitting christ]
                            }
                        }
                    }
                }
            }
        }
    }
    // generic
    CView.text("You continue to shove your junk into the broken slut in front of you, her sweaty curves jiggling with the intense force of your thrusts.  Lottie twists and turns in immense arousal, unable to handle the feeling of you inside of her.  Before long, the desperate pig-girl shudders and collapses against the weight of the mattress, stretching out and twitching in deep orgasm while you remain pumping in and out of her with intense motion.  Stretching back, you drive yourself deeper inside while you walk forward, Lottie's eyes rolling back while her tongue hangs idly outside of her mouth, unable to control the wild sensation of you pervading her inner self.  Inevitably, you increase your thrusts, beginning to feel yourself building towards an intensified climax.  Your dickflesh thickens, squeezing against Lottie's walls and causing your deep thrusts to shove Lottie further across the room.  In moments your tentacled meat explodes in orgasm, pumping the pork-slut's insides with your white, creamy liqueur as beads of spunk pool out onto the mattress below.\n\n");

    // [if cum production in metric fuck tons]
    if (player.cumQ() >= 1500) CView.text("The warm flood of cum erupting from your body continues to build up, beginning to plug up Lottie's orifices with the scent of your thick liquid.  The relentless advance of your ejaculate doesn't seem to be stopping, while the pig-girl snaps back into consciousness as her insides churn with your seed.  She squeaks desperately, unsure of the sudden feeling of fullness while her stomach begins to expand with your spunk.  Lottie wastes effort in attempting to squeeze out the flow of man-milk filling her insides, clenching in her soft belly and trying to push out while at the same time buckling under the pressure of your meat still inside of her.  With a final blast, you knock her back unconscious as your cock cream blasts a final wave inside of her, whipping out and releasing jets of hot semen onto her back and ample ass.  A steady flow of your spunk pours outside, eventually returning Lottie to her original weight.\n\n");
    // generic
    else CView.text("You stand exhausted, trembling slightly from the after-effects of your climax while your tree-like junk slows its movements.  Retracting your " + describeCock(player, tentacleCocks[0]) + ", you slowly change back into your " + player.inventory.armor.displayName + " while Lottie comes to.  She hazily opens her eyes, the smell of hot semen in the air while she lifts herself upwards, remembering the sequence of events leading to where she is now. \"<i>H-huh? " + player.desc.name + "...</i>\" the girl mumbles, struggling to move out only to find she's still underneath the small weighted mattress.  \"<i>H-hey! I'm still stuck!</i>\"\n\n");
    // [if enc. 100]
    if (lottieMorale() >= 99) {
        CView.text("You laugh at your lover as she tries to move around, before lifting off the weight to help Lottie onto to her feet.  She gently massages her cushiony breasts, having leaned against them through the entire ordeal.  You ask if she wants to go another round, and she responds by puffing her cheeks up and pushing you into the mat.  Together, you walk outside of the shed, waving to the bewildered spider-morph running the small food cart nearby.");
        if (Settings.sillyMode) CView.text("  Before you leave, you make sure to grab a bacon shake from the clerk, high-fiving her as you backflip back to camp.");
        CView.text("\n\n");
    }
    // [if enc. 0]
    else {
        CView.text("You turn to see your slut as she tries to move around, before snorting and walking outside of the shed towards the direction of your camp.  A familiar-looking spider-morph running the stand nearby notices you out alone, walking towards the direction of the shed.  You're long gone before she can catch up to you, though.");
        if (Settings.sillyMode) CView.text("  Unfortunately for the spider-clerk, you've raided her cart of bacon shakes on the way out.  You try to backflip back to camp before accidentally dropping the majority of your shakes onto the floor, ultimately deciding to walk back normally - the last beverage you could save gripped firmly in your hands.");
    }
    player.orgasm();
    player.stats.sens += -2;

    return { next: passTime(1) };
}

// [Weights]
export function ifrisAndLottieGetsNTRedLiftingWeights(player: Character): NextScreenChoices {

    CView.image("lottie-ifris-threesome");
    CView.text("\"<i>We're gonna burn that flab away, Ms. Porky,</i>\" you reply.  Swaggering over to the weights, determined to humiliate your work-out partner again, you see a flash of familiar crimson on your way.  It's Ifris!  The muscle aficionado's body is perfectly accentuated with all the right firmness, none of the fatty buildup heaped onto Lottie.  Ifris gives one of her signature claps as you settle down at the bench, gripping the heaviest set of weights.  With a wicked idea in mind, you beckon to the fit seductress and she happily complies.\n\n");

    CView.text("While Ifris sways over to you and assumes her usual position hovering over your head,  Lottie takes notice.  When she realizes what's going on, she whimpers, \"<i>I-I thought </i>we<i> were gonna work out together, Champion.</i>\"  Ifris lets out a delightful little giggle and places a hand on Lottie's pink shoulder.\n\n");

    CView.text("\"<i>He's a bit out of your league, don't you think?</i>\"  The trim red woman returns her gaze from Lottie to you and lovingly leans against your firm chest.  Her arms wrap around your body and she slowly starts undressing you.  Once your torso is bared, Ifris purrs, \"<i>Such a fine specimen; " + mf(player, "he", "she") + " really deserves some special attention.</i>\"  Ifris lowers her head to just above the waistline and pulls the bottoms of your " + player.inventory.armor.displayName + " down a couple of inches.  To supply the devil with plenty of motivation, you begin lifting.  Her first kiss is planted directly below your belly button, and her tongue traces around the navel.  Each one of your rigid abdominal muscles is given a wet smooch.  She lingers right below your sternum and lifts her eyes up to yours.  Knowing that her next destination is higher up, you raise the weights until your arms straighten out, showing off as much as possible.  Her eyes brighten and she continues her journey.  The burden above your head takes up considerably less of your attention as Ifris breathes in deeply and nuzzles into your broad, sculpted trunk.  She listens to your heart, feeling the pumping in your chest.  Lottie's signature sniffle cuts into your bliss.  Laughing to yourself, you boast,  \"<i>Damn, it feels good to have someone so lovely show such respect.  It's relieving not to be disgusted when a woman gets close to me.</i>\"  You don't even bother to look at the pig; her incoherent babbles are satisfying enough.  Whether Ifris's devotion or Lottie's humiliation, something causes your prick to surge with life; your bottoms bulge considerably and threaten to rip open.\n\n");

    CView.text("You start pumping the weights swiftly to clear your head and to spur your devil lover on.  Ifris sits her chin upon your bulky chest, looking up at you as she snakes her ebony tongue across her plush breasts.  Eyes glazed over with lust, she starts sliding a hand over to your bulge.\n\n");

    CView.text("You ask her to stop, quickly adding, \"<i>I've got someone to handle that; you just keep me company until it's out.</i>\"  You lower the weights onto the rack and tear your gaze from Ifris to Lottie.  As expected, she has tears in her eyes but is rooted in place.  Abandoning the tenderness you showed to Ifris, you command the pig to remove your pants.  She nods and haltingly steps towards you, then removes the prison around your member.\n\n");

    CView.text("Finally escaping its restraints, " + describeOneOfYourCocks(player) + " triumphantly lifts straight into the air.  You let out a sigh of relief, close your eyes and resume your workout.  Almost as an afterthought, you add, \"<i>Ifris, honey, go ahead.  Tubby, you stay out of this.  We know what happens when your greedy face wraps itself around my dick.</i>\"  A rather loud sob forces you to open one eye and regard Lottie with a cold stare.  Her face is a volatile mix of jealousy, anger and shame, tears sliding from her green eyes.  Your only reply is a dismissive snort.\n\n");

    CView.text("Ifris is apparently very worked up after giving your body so much attention.  Her eyes are half-lidded and she starts panting as her mouth hovers over your sensitive tip.  Quieting her breathing, she shuts her mouth.  For quite a few gut-wrenching seconds she simply keeps her head tilted downwards, her midnight lips sealed tight and hot wisps from her nostrils washing over your crotch.  A growing unease builds up in your chest and you glance over to Lottie, who also stares at Ifris in confusion, blinking away tears.  Luckily the situation takes a turn.  Ifris parts her lips and lets out a torrential shower of saliva onto your still-rigid pecker.  Your mind reels as the warm substance washes over every inch of your dick, soaking it in a wonderful feeling.  While your penis surges with even more life, she bats her long eyelashes at you briefly, those red eyes of hers drunk on passion.  Ifris opens her mouth as wide as possible, juts her tongue out and pulls back a bit before ramming herself down onto your cock.\n\n");

    CView.text("Her earlier lubrication lets you glide effortlessly all the way to the base of her throat, not a single murmur of resistance coming from your willing receptacle.  Things change abruptly when she clamps down, applying pressure with her lips and tongue, squeezing your shaft.  Mindless groans escape from you as that black tongue and matching lips slurps along the bulk of your dick.  As she drags her tight mouth to your tip, every inch of skin she passes is pulsing with pleasure.  Gradually you run out of meat and Ifris now suckles your sensitive tip.  Bolts of excruciating bliss run through your nerves every time she pulls at your throbbing glans with her suction.  You imagine the squelching sounds as those of her tongue running across your cumslit, a wet, desperate noise that echoes through your head.\n\n");

    CView.text("The sound actually speeds up and... girlish high pitched moans fill your ears?  Glancing at Ifris, it's apparent that her mouth is fixated on servicing you.  Not to mention her voice doesn't match the softer squealing sound.  A certain word tumbles through your head.  Squealing.  You don't want to be bothered with getting up, but you're determined to find the naughty sow causing a ruckus.  Turning your head to the side you locate the source of all the noise.  Lottie has crawled extremely close to you, only about a foot away from your head. She's on her knees with one hand buried deep into her gym shorts, explaining the shlicking sound.  Her other hand encompasses her heavy jugs, the thick flesh spilling out of her palm.  Noticing your gaze, Lottie quickly grabs a nipple and tugs earnestly.  Her plump breast stretches out and her hand works harder into her pussy.  She tries to show off for you with her constant tweaking, moaning as she pulls harder.  Apparently hitting an extra sensitive spot deep inside, Lottie gasps and releases the nipple, unleashing an enticing cascade of jiggling, bouncing breast.  The free hand joins its opposite in her groin, and very soon a pool of slutty juices forms around her pudgy bottom.\n\n");

    CView.text("With such a needy subject watching, you decide to finish up this exercise.  Ifris is still bobbing up and down the length of your dick.  You patiently await her trip to the top, and grab her cute little head.  Sliding your fingers through the rich locks of hair you almost feel a hint of shame about what you plan on doing next... almost.\n\n");

    CView.text("You stand up and off the bench, holding Ifris so that her mouth is still around the tip of your prick.  Casually tossing your head towards Lottie, you attract her attention and demand, \"<i>Stop shoving your fingers in that fat pussy of yours and pay attention.</i>\"\n\n");

    CView.text("She obeys, blushing red.  \"<i>Now just look at that!</i>\" you continue, \"<i>You've been such a good girl during our training session.  I think you deserve a reward.</i>\"  Your mocking smile disappears, replaced with a snarl.  Both of your powerful hands tightly grip Ifris's head, causing her eyes to go wide.  Mustering all the strength you have left, you hold back the bubbling climax threatening to explode out of your balls.  You slam Ifris down to the very base of your cock, burying her head in your groin, then immediately afterwards, rocket your hips forward to send it flying up the length of your dick.\n\n");

    CView.text("Ifris gags noisily, sometimes allowing small shrieks of pleasure to escape her lips.  Her head is slapped back and forth like a volleyball. Hands with veins bulging visibly smash her head into your pelvis.  Bucking hips of iron crash into her skull and sending it flying upwards again.  All your energy and focus is set on facefucking this devil like she's your personal slave.");
    if (player.body.balls.count > 0) CView.text("  Your pace doesn't slow, even when your swollen balls smack loudly against her chin.");
    CView.text("  You let out a deranged chuckle at the sight of Ifris being thrown about");
    if (player.body.balls.count > 0) CView.text(", sweaty gonads colliding into her");
    CView.text(".  Lottie is crying out in ecstasy next to you.  She pleads with you to let her have the next turn as your fuck-toy.  The pressure building up in your sack has finally reached its peak.  You abandon all delusions of control, giving in to the primal desire that has arisen.\n\n");

    CView.text("Your " + describeLegs(player) + " go weak and your arms feel like slime as you push Ifris all the way down one more time.  The first geyser of cum overloads the pretty red gym-goer. She's nearly pushed off of your dick by the force of your first shot.  With no strength left, you let go of her silky hair and let her collapse onto the floor.  Her throat bulges and spunk dribbles out of her mouth.  The second wave overcomes you and you coat the floor with cum.  You barely register grabbing Lottie by the arm and hauling her over to Ifris.  Both women are still fingering their dripping pussies while you prepare one ultimate burst.  Darkness creeps into your vision as you angle your cock above both sluts.  Your urethra dilates and unleashes a barrage of seed; Ifris and Lottie coated in thick ropes of it.  They embrace under the rain of cream, mashing each other's drenched bodies together.\n\n");

    CView.text("Only swaying for a handful of seconds before collapsing into the two women, you black out.");
    player.orgasm();
    player.stats.lib += 1;
    player.stats.cor += 5;

    return { next: lottieAndIfrisNTREpilogue };
    // --next--
}

function lottieAndIfrisNTREpilogue(player: Character): NextScreenChoices {

    CView.text("A dry wind across your face rouses you from your peaceful sleep.  It seems you're outside the walls of Tel'Adre.  All your equipment is sitting to the right of you, and when you gather the pile of your gear you find a note underneath.\n\n");

    CView.text("\"<i>Dear " + player.desc.name + ",\n\nSleep well?  I hope so, considering I found you snoring on top of two luscious babes.  Don't worry about getting in trouble at the gym.  Most of the staff and customers were too busy getting themselves off to be angry or offended, though I have to admit I'm a bit jealous.  The little piggy and that tight piece of red ass are both safe in their homes.  ");
    if (!urtaLove()) {
        CView.text("Of course, I had to fine you for public indecency - you really ought to watch how you behave, lest someone take you for a demon agent.  Next time, try and keep it in your pants.\n\n-Urta, Captain of the Guard");
        if (player.inventory.gems > 0) {
            player.inventory.gems -= 200;
            if (player.inventory.gems < 0) player.inventory.gems = 0;
        }
    }
    else CView.text("I had to make a show of fining you for public indecency, but you'll note your money is all still there.  Pay me back sometime, okay, hun?\n\n-Always up for you, Urta");
    CView.text("</i>\"\n\n");

    CView.text("Satisfied, you get dressed and strut off towards camp.");
    if (Settings.sillyMode) CView.text("  You'll make damn sure to buy Urta a bacon shake tomorrow.");
    return { next: passTime(1) };
}

export function lottiesThirtyMinutePigGasm(player: Character): NextScreenChoices {

    const largestCock = player.body.cocks.sort(Cock.Largest).get(0);
    CView.text("\"<i>Hey, babe!</i>\"  Lottie greets you in her usual, cheerful fashion.  Though her smile is booming with assumed confidence, the look in her eyes tells a different story.  She has sad, dependent eyes.  She looks up to you!  Then again, why shouldn't she?  You are her personal trainer after all.\n\n");

    CView.text("Smiling back, you give her a warm greeting.  After the pleasantries are dealt with, you instruct her that it is time for some pre-workout stretches.  Ever eager to please you, Lottie begins.  She spreads her legs as far as she can and then leans down in an attempt to touch her toes.  As she bends over, you get a glimpse of her spacious ass.  Baby got back!  While she fights to touch her toes, her chubby ass wiggles and jiggles; it's the very definition of the term \"<i>more cushion for the pushin'.</i>\"  The more you watch, the more blood rushes to your " + describeCock(player, largestCock) + ".  You bite your lip as sweat beads on your skin; you NEED to tame that ass!\n\n");

    CView.text("Lottie is completely oblivious to that fact that you are ogling her plump rump.  Her face wrenches in frustration as she strains.  Then... victory!  She managed to touch her toes!  A relieved smile crosses her face until... SMACK!  Lottie recoils in pain from the sudden stinging slap to her rear.  She tries to unbend, but your forceful left hand keeps her in place.  Glancing back as much as she can, she notices first your missing " + player.inventory.armor.displayName + " and then your erect, throbbing cock.  Trembling a little in apprehension, she tries to form a question, but only incoherent stammering comes out of her mouth.\n\n");

    CView.text("\"<i>Time to pork this bitch!</i>\" you exclaim in triumph.  You forcibly yank down the skimpy bottoms that barely contained her bodacious booty.  Smiling lecherously, you flop " + describeEachOfYourCocks(player) + " between her pink cheeks.  Now firmly holding her hips, you stroke your manhood between them.  Lottie doesn't so much as put up a fight.  Instead, she trembles and oinks like the pig she is.\n\n");

    CView.text("Looking down at her with a look most wicked, you immediately stop stroking your length between her chunky cheeks.  Giving her no warning at all, you promptly slam your " + describeCock(player, largestCock) + " into her piggy depths, forcibly parting her labia.  Lottie squeals from the sudden impact as her cunt muscles tense around you, giving you unbridled pleasure.  Panting heavily, she just stands there and takes it.  Her face is flustered, blushing rosily as her tongue just hangs out of her mouth, but it matters little to you that she enjoys herself.  FUCK!  Her cunt is a natural born cock milker.  It churns and squeezes your " + describeCock(player, largestCock) + ", encouraging you to pound her, and you happily oblige.  Grasping her hips for leverage, you pummel her porky pussy for several minutes until your loins unleash a thick jet of jism, completely coating her insides white.\n\n");

    CView.text("Standing victorious, you attempt to pull out, but you can't.  Her pussy has clamped down on you so hard that you can't withdraw.  You are in no rush, however. Your cock is still hard and her body is plenty warm.  Smirking, you just stand and enjoy the feeling of her womb.  Then suddenly, Lottie cries at the top of her lungs.  Your attempt to pull out seems to have triggered her orgasm.  A cataract of womanly juices cascades out of her cunt.  She gushes, and gushes, and gushes... after five minutes, her orgasm still hasn't ceased!  The ground where you two stand looks like a small puddle thanks to her constant stream of femspray.  At ten minutes, she still hasn't stopped!  When will the end be?  Why all this pig glee?  Yo man, what happened?  Lottie's breathing heavily and oinking as loudly as possible.  Tired and frustrated, you just stand there while her orgasm continues unabated.  After about twenty minutes more, Lottie's chubby cunt finally releases you and she falls forward onto her face in the puddle of pork drippings, eyes rolled into her head and a smile splitting her face.\n\n");

    CView.text("DAMN!  Did this pig bitch really just have a half-hour orgasm?  You're a little jealous.");
    player.orgasm();
    return { next: passTime(1) };
}
