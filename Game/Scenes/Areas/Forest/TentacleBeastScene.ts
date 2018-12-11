import { Character } from 'Game/Character/Character';
import { Flags } from 'Game/Flags';
import { NextScreenChoices, choiceWrap } from 'Game/ScreenDisplay';
import { CView } from 'Page/ContentView';
import { SpriteName } from 'Page/SpriteName';
import { randInt } from 'Engine/Utilities/SMath';
import { passTime } from 'Game/Menus/InGame/PlayerMenu';
import { EffectType } from 'Game/Effects/EffectType';
import { CombatManager } from 'Game/Combat/CombatManager';
import { TentacleBeast } from './TentacleBeast';
import { describeButthole, describeButt } from 'Game/Descriptors/ButtDescriptor';
import { describeAllBreasts, describeNipple, describeBreastRow } from 'Game/Descriptors/BreastDescriptor';
import { displayStretchVagina } from 'Game/Modifiers/VaginaModifier';
import { describeCock, describeOneOfYourCocks, describeCocksLight } from 'Game/Descriptors/CockDescriptor';
import { gameOverMenu } from 'Game/Menus/InGame/GameOverMenu';
import { Cock, CockType } from 'Game/Character/Body/Cock';
import { describeBalls, describeSack } from 'Game/Descriptors/BallsDescriptor';
import { describeSkin } from 'Game/Descriptors/SkinDescriptor';
import { describeVagina } from 'Game/Descriptors/VaginaDescriptor';
import { BreastRow } from 'Game/Character/Body/BreastRow';
import { boostLactation, growTopBreastRowDownwards } from 'Game/Modifiers/BreastModifier';
import { displayStretchButt } from 'Game/Modifiers/ButtModifier';
import { numToCardinalCapText, numToCardinalText } from 'Game/Utilities/NumToText';
import { VaginaLooseness } from 'Game/Character/Body/Vagina';
import { GiacomoFlags } from '../BeyondCamp/Giacomo';

export const TentacleBeastFlags = Flags.register("Tentacle Beast", {
    UNKNOWN_FLAG_NUMBER_00247: 0,
    BAD_END_COUNTER: 0,
});

// Tentacle Encounter - beware legalese!
/*
 LICENSE

This license grants Fenoxo, creator of this game usage of the works of
Dxasmodeus in this product. Dxasmodeus grants Fenoxo and the coders assigned by him
to this project permission to alter the text to conform with current and new game
functions, only. Dxasmodeus grants exclusive rights to Fenoxo to add upon events to meet with
suggestions made by consumers as to new content. Dxasmodeus retains exclusive rights to alter
or change the core contents of the events and no other developer may alter, change or use the events without
permission from dxasmodeus except where otherwise specified in this license. Fenoxo agrees to
include Dxasmodeus' name in the credits with indications to the specific contribution made to the licensor.
This license must appear either at the beginning or the end of the primary file in the source code and cannot be deleted
by a third party. This license is also retroactive to include all versions of the game code
including events created by dxasmodeus.

DECLARATION OF OWNERSHIP

The following events are the creative works of dxasmodeus and are covered under this license.

Tentacle Plant Event
Giacomo the Travelling Merchant
All item events relating to purchases from Giacomo the Travelling Merchant
Worm Colony Infestation Events

Tentacle Plant Event and Giacomo sub-events are copyright 2010 by Dxasmodeus.
Worm Colony Events are copyright 2011 by dxasmodeus.

THIRD PARTY USAGE

As Fenoxo has made his game code open source, this license DOES NOT transfer to a
third party developer. The events created by Dxasmodeus may not be used in whole or in part
without permission and license from Dxasmodeus. Dxasmodeus reserves the sole and exclusive right to
grant third party licenses of copyrighted scenarios.

For further information and license requests, dxasmodeus may be contacted through private
message at the Futanari Palace. http://www.futanaripalace.com/forum.php.

ENFORCEMENT

This license supercedes all previous licenses and remains in force.
*/

export function encounter(player: Character): NextScreenChoices {
    CView.clear();
    CView.sprite(SpriteName.TentacleBeast); // 100;
    // Tentacle Encounter - beware legalese!
    // Gender hilarity chance.
    if (player.gender === 0 && randInt(3) === 0 && !player.body.legs.isNaga() && !player.body.legs.isTaur() && !player.body.legs.isGoo()) {
        // Warm up for neuters as per the old event:
        CView.text("You see a massive, shambling form emerge from the underbrush. While first appearing to be a large shrub, it shifts its bulbous mass and reveals a collection of thorny tendrils and cephalopodic limbs. Sensing your presence, it lumbers at you, full speed, tentacles outstretched.\n\n");

        if (player.stats.cor > 50 && player.stats.cor <= 75)
            CView.text("You debate the merits of running from such a creature, and realize it's now too late to escape.  ");
        if (player.stats.cor > 75)
            CView.text("You smile and stride forward, welcoming the pleasure you expect from such a monster.  ");
        // HILARIOUS NEUTER EVENT HERE
        if (player.stats.cor < 75)
            CView.text("While you attempt to resist the abomination, its raw muscle mass is too much. ");
        CView.text("It pins you to the ground easily. You feel slimy tentacles run up and down your groin as the creature searches for whatever gonads it expected you to have. When it realizes that you have neither penis nor vagina, it smartly casts you to the ground in apparent disgust.\n\n\"<i>WHAT THE FUCK IS THIS SHIT?!!</i>\" The creature speaks in an unnervingly human voice.\n\n");
        CView.text("Completely confused, all you can do is sit there in shock.\n\n\"<i>Where are your naughty bits, goddammit!</i>\" the creature bellows. \"<i>Us tentacle creatures need to FEED!</i>\"\n\n");
        CView.text("You sheepishly state that you are gender-neutral and have no genitalia.\n\n\"<i>You gotta be shitting me!!</i>\" the monster bellows in contempt. \"<i>Of all the motherfuckers I ambush, it has to be the ONE bastard I can't feed from! What am I supposed to do now, asshole?! I gotta eat!</i>\"");
        CView.text("At a loss for words, you meekly offer the creature some of your food you have packed for your journey. The creature slaps it out of your hand, almost breaking your wrist.\n\n\"<i>I can't eat that shit!</i>\" roars the abomination. \"<i>Do I look like I have a fucking mouth to chew that with?! NOOOOOO! I feed off dicks and wayward women! Cum and tit milk! YOU have NEITHER!!!</i>\"  ");
        CView.text("The beast slaps you squarely on the ass as if to push you along. \"<i>Get the fuck out of here!</i>\" it screams. \"<i>Get lost so I can hunt me a REAL meal!!!</i>\"");
        CView.text("You walk away from the creature, which hides back in the brush. After you trek a bit, you wonder if what happened really DID happen...");
        player.stats.lust += -5;

        return { next: passTime(1) };
    }
    // Combat starter
    CView.text("You see a massive, shambling form emerge from the underbrush.  While it resembles a large shrub, a collection of thorny tendrils and cephalopodic limbs sprout from its bulbous mass.  Sensing your presence, it lumbers at you, full speed, tentacles outstretched.\n\n");
    if (player.stats.cor > 50 && player.stats.cor <= 75)
        CView.text("You debate the merits of running from such a creature.\n\n");
    if (player.stats.cor > 75)
        CView.text("You smile and stride forward, welcoming the pleasure you expect from such a monster.\n\n");
    // Worms get nothing!
    if (player.effects.has(EffectType.Infested)) {
        CView.text("It stops itself completely in a moment and twitches, as if sniffing the air, before turning around and disappearing into the underbrush.");
        return { next: passTime(1) };
    }
    if (player.stats.cor > 50) {
        CView.text("Do you joyfully submit or fight back?\n\n");
        return { choices: [["Fight", startTentacleBeastCombat], ["Submit", choiceWrap(tentacleLossRape)]] };
    }
    return CombatManager.beginBattle(player, new TentacleBeast());
}

function startTentacleBeastCombat(player: Character): NextScreenChoices {
    return CombatManager.beginBattle(player, new TentacleBeast());
}

export function tentacleVictoryRape(player: Character): NextScreenChoices {

    CView.sprite(SpriteName.TentacleBeast); // 100;
    // Male/Herm
    if (player.gender === 1 || player.gender === 3) {
        CView.text("Seizing the opportunity, you rush the monster while it is stopped. You grab the fattest hollow tentacle you can find and summarily shit-kick the beast onto the ground. Holding the creature down with one foot, you take the hollow tentacle and poise it in front of your raging erection.\n\n");
        CView.text("\"<i>You want dick milk, you freak?!</i>\" you bellow in triumph. \"<i>HERE YOU GO!</i>\"\n\n");
        CView.text("You impale the tentacle on your penis and begin humping wildly, treating the creature's armature as your own personal onahole. The creature squirms wildly, trying to escape your lust-driven strength. Replying with a swift kick with your free foot, the creature's resolve to escape wavers.\n\n");
        CView.text("\"<i>Quit fuckin' squirming and take your MEDICINE!</i>\" you thunder as you cheap-shot the beast for good measure.\n\n");
        CView.text("Feeling your peak approach, you allow your muscles into their rhythmic contractions as you unload your cum into the creature like a howitzer attacking a fort. Laughing like a maniac with each shot, you see your jizz leak out as the creature struggles to assimilate your 'donation'.\n\n");
        CView.text("Withdrawing your prick, you cast the beast aside and begin walking away both amused and satisfied. The beast stumbles weakly back into the wood it came from, clearly worse-off from the encounter.");
    }
    // Female:
    else {
        player.slimeFeed();
        // High Corruption
        if (player.stats.cor >= 66) {
            CView.text("Seizing the opportunity, you rush the monster while it is stopped. You grab the fattest phallic tentacle you can find and summarily shit-kick the beast onto the ground. Holding the creature down with one foot, you take the tentacle-cock and poise it in front of your dripping cunt.\n\n");
            CView.text("Laughing like a true psychotic, you stuff the tentacle into your womb.");
            displayStretchVagina(player, 20, true, true, false);
            CView.text("  Your vaginal muscles quickly go to work stroking, squeezing and kneading the appendage. The creature, more intent with escape than hammering your box, begins struggling. You summarily slug the beast as well as any professional pugilist to stop its throes.\n\n");
            CView.text("\"<i>STOP STRUGGLING AND FUCK MY LITTLE PUSSY!</i>\", you screech.\n\n");
            CView.text("The sensation of the beast ejaculating immediately gets your attention. As your womb fills with its warm load, a brutal idea takes you. The beast responded after you hit it. Smirking like a devil, you turn the beast into a punching bag. With each strike, the beast sprays a batch of goo deep inside your body. The sheer force of the spray is working your hole into an ecstatic frenzy. As you orgasm, you slug the creature again, forcing another batch of semen to flush your womanhood. After an hour of this, you reach a multi-orgasmic peak and release. The creature twitches weakly as you pull the limp tentacle from your body. The excess spunk flows out like an overturned bucket, leaving one hell of a mess. You walk away satisfied. It is unclear whether the tentacled horror survived your lust... but who cares. Your satisfaction is all you cared about, anyway.");
        }
        // Rape Win Female-Low Corruption::
        else {
            CView.text("Seizing the opportunity, you rush the monster while it is stopped. You grab the fattest phallic tentacle you can find and summarily push the beast onto the ground. Holding the creature down with your body weight, you take the tentacle-cock and poise it in front of your dripping cunt.\n\n");
            CView.text("You sit on the creature and begin using the tentacle as a living dildo. With your mass atop it, the creature cannot move or struggle, despite its lack of any attempts to do so. You push the limb deeper and deeper until you feel it bottom out against your cervix.");
            displayStretchVagina(player, 20, true, true, false);
            CView.text("\n\nSensing your needs, the tamed beast extends a tendril from the main tentacle that easily pushes past your cervical opening and breeches the deepest parts of your womb. The feeler penetrates past your uterus and lodges itself as deeply as possible. The beast begins rapidly vibrating and undulating its member, stimulating the deepest parts of your sex.\n\n");
            CView.text("You quickly reach a cunt-cramping orgasm, which forces the creature to unload a torrent of hot, musky fluids inside you. You feel bloated and stuffed as the beast reflexively sprays the entire contents of its seminal sacs... or whatever it stores its cum in... inside you. With a quick squeeze, you start expelling the tentacle, which prompts the creature to withdraw its tendril and leave your body. You walk away well satisfied while the abomination is too exhausted to move.");
        }
    }
    player.orgasm();
    return { next: passTime(1) };
}

// Spoiler for Bad End-Tentacle Monster:
// [CONDITIONS: Futa/Herm, Corruption > 50, Lust Defeat Only, Obtained 3 previous Lust Defeats to Tentacle Monster.]
function futaTentacleBadEnd(player: Character): NextScreenChoices {

    CView.sprite(SpriteName.TentacleBeast); // 100;
    CView.text("Having repeatedly been ravaged by the tentacle beast in your travels, you surrender yourself to yet another savage session of forced pleasure. However, the beast lunges forward with its great maw open. Utterly surprised, you do not have time to react before the creature's tentacles seize you and swallow you whole!!!\n\n");
    CView.text("The last rays of light fade as the creature closes its beak, trapping you inside. You begin flailing and fighting in sheer panic at the prospect of being eaten alive. As you struggle, countless tentacles wrap around your arms and legs, essentially binding you inside the creature. A thick tentacle forces its way down your mouth and you feel the familiar sensation of salty lust being emptied into your mouth. Your " + describeCock(player, player.body.cocks.get(0)) + " instantly becomes erect, triggering a tentacle to encapsulate your member completely. As this occurs, another limb buries itself deep within your ass.\n\n");
    CView.text("The beast then begins to milk your dick as fiercely as it ever has been in your entire life. You feel as if your prick will be ripped from your crotch as you immediately climax, dumping load after load of your semen into the horror. Your ejaculations only make the beast milk you harder, prompting an almost constant orgasmic cycle. After awhile, the shock and pain subside as you become utterly drunk off the sensation of the constant stream of cock milk you are producing.\n\n");
    CView.text("In your last moments of lucidity, you realize that you are not being eaten or technically harmed at all. The creature has bonded with you as a living producer of food.  As long as you are healthy and cumming, it has all the food it could ever possibly want... so long as your gonads hold out.\n\n");
    CView.text("You pass out, only to awaken briefly to the constant sensation of semen flowing out of your body.  Were it not for the tentacle force-feeding you, you would weakly moan with pleasure at the feeling of constant orgasm.  You slip in and out of consciousness countless times. When lucid, you can only enjoy the fact you are STILL blowing a load.\n\n");
    CView.text("However, you become lucid once and notice that you are no longer cumming. In fact, you feel a harsh warmth all over your body. Blinding light pierces you despite having your eyes closed. You also notice the absence of the tentacle from both your mouth and your ass. You also hear voices, yet you cannot make them out. A sharp, acrid smell invades your nostrils, rousing you to full wakefullness. You feel terribly weak and the light still prevents you from opening your eyes. However, for the most part, you are awake and cognizant of your environment.");
    // Goto rape #2
    return { next: futaTentacleEpilogue };
}

function futaTentacleEpilogue(player: Character): NextScreenChoices {

    CView.sprite(SpriteName.TentacleBeast); // 100;
    // [Met Giacomo at least once]
    if (GiacomoFlags.MET > 0) {
        CView.text("\"<i>Well, well, well. You aren't a total loss, I see.</i>\", says a sharp, masculine voice.\n\n");
        CView.text("While the fog of your brain has yet to lift completely, you recognize the voice to be the seedy merchant, Giacomo.\n\n");
        CView.text("\"<i>It is a good thing I happened to be out and about today.</i>\", Giacomo says. \"<i>I was testing out a new weapon to sell and I happened to see one of those nasty tentacle beasties. I had no idea they captured prey! Hell, you must have spent a few months inside that thing feeding it!</i>\"\n\n");
        CView.text("You attempt to say something, only to find yourself incapable of speaking. You feel the man's bony hands pick you up and set you down in what feels like his cart.\n\n");
        CView.text("\"<i>Well, I can't be a total bastard all the time.</i>\", Giacomo jingles. \"<i>I guess I can drop you off at the next village I come to so you can recover. Isn't that absolutely nice of me! Even better! I will do this for free!!!</i>\"\n\n");
        CView.text("Giacomo giggles to himself at his cheaply bought humanitarianism. A part of you dreads what is to happen next as nothing about the merchant ever struck you as trustworthy. However, a day or so later, true to his word, he leaves you at the clinic in the first town he comes to. Your recovery takes the better part of the year. The healers and apothecaries purge you of all of your corruptions, save your transgendered status. However, the sheer stress on your body has effectively ended your adventuring lifestyle and you resign yourself to settle down to a comparatively mundane existence, broken by the occasional tryst with a villager curious about your genitalia.");
    }
    // [Never met Giacomo]
    else {
        CView.text("\"<i>Will she live?</i>\", says a soft and feminine voice.\n\n");
        CView.text("\"<i>Yes, doctor. She will live.</i>\", replies a gruff and clearly masculine voice.\n\n");
        CView.text("\"<i>Is the beast dead</i>\", queries the doctor.\n\n");
        CView.text("\"<i>Dead several times over, madam.</i>\", answers the man.\n\n");
        CView.text("\"<i>We cannot leave this unfortunate woman out in the wild like this. Load her onto the wagon. We will take her back to the village. I am certain I can help this woman recover.</i>\", the doctor states flatly.\n\n");
        CView.text("Strong masculine hands easily lift your atrophied body and place you on a wooden slab. You feel the shaking of a cart as its movement assaults your stunted senses. After a while you notice the cart stops as it arrives at its destination. A cacophony of voices talk over one another as you feel a half a dozen people move you to what can only be a clinic. Many of the voices talk constantly as you are examined and various medicines are applied to you exhausted body. Your vision returns in a day or so, revealing that you are in a hospital and laborious effort from the staff allowed for your revival.\n\n");
        CView.text("Your recovery takes the better part of the year. The healers and apothecaries purge you of all of your corruptions, save your transgendered status. However, the sheer stress on your body has effectively ended your adventuring lifestyle and you resign yourself to settle down to a comparatively mundane existence, broken by the occasional tryst with a villager curious about your genitalia, which you are more than happy to display.");
    }
    return gameOverMenu(player);
}

export function tentacleLossRape(player: Character, inCombat?: boolean): NextScreenChoices {
    CView.clear();
    CView.sprite(SpriteName.TentacleBeast); // 100;
    // Genderless madness
    if (player.gender === 0) {
        // Taur madness
        if (player.body.legs.isTaur()) {
            return centaurGenderlessRetardation(player);
        }
        else if (player.body.legs.isNaga()) {
            return genderlessHilarityForNagaKenDolls(player);
        }
        else if (player.body.legs.isGoo()) {
            return tentacularGenderGooTimes(player);
        }
        else {
            if (player.stats.cor < 75) CView.text("While you attempt to resist the abomination, its raw muscle mass is too much. ");
            CView.text("It pins you to the ground easily. You feel slimy tentacles run up and down your groin as the creature searches for whatever gonads it expected you to have. When it realizes that you have neither penis nor vagina, it smartly casts you to the ground in apparent disgust.\n\n\"<i>WHAT THE FUCK IS THIS SHIT?!!</i>\" The creature speaks in an unnervingly human voice.  Completely confused, all you can do is sit there in shock.\n\n");
            CView.text("\"<i>Where are your naughty bits, goddammit!</i>\" the creature bellows. \"<i>Us tentacle creatures need to FEED!</i>\"\n\n");
            CView.text("You sheepishly state that you are gender neutral and have no genitalia.\n\n\"<i>You gotta be shitting me!!</i>\" the monster bellows in contempt. \"<i>Of all the motherfuckers I ambush, it has to be the ONE bastard I can't feed from! What am I supposed to do now, asshole?! I gotta eat!</i>\"");
            CView.text("\n\nAt a loss for words, you meekly offer the creature some of your food. The creature slaps it out of your hand, almost breaking your wrist.\n\n\"<i>I can't eat that shit!</i>\" roars the abomination. \"<i>Do I look like I have a fucking mouth to chew that with?! NOOOOOO! I feed off dicks and wayward women! Futa cum and tit milk! YOU have NEITHER!!!</i>\"");
            CView.text("\n\nThe beast slaps you squarely on the ass as if to push you along. \"<i>Get the fuck out of here!</i>\" it screams.  \"<i>Get lost so I can hunt me a REAL meal!!!</i>\"  ");
            CView.text("You walk away from the creature, which hides back in the brush. After you trek a bit, you wonder if what happened really DID happen...");
            return { next: passTime(1) };
        }
    }
    // Horsecock surprise!
    if (player.body.cocks.filter(Cock.FilterType(CockType.HORSE)).length > 0 && player.body.cocks.get(0)!.length > 15 && player.body.cocks.get(0)!.thickness >= 3) {
        if (player.stats.cor < 75 && player.stats.lust < 100) CView.text("It grabs you before you can get away!\n\nWhile you attempt to resist the abomination, its raw muscle mass is too much. ");
        CView.text("It pins you to the ground easily. You immediately feel a sharp, horrible pain at the base of your cock. You look down to see the end of a thorny tendril impaled in your pelvic region. Fiery pain courses through your veins as you feel the creature inject you with some sort of liquid. As the pain sears through you, your monstrous equine member immediately becomes fully erect and pre-cum flows freely from your flare.\n\n");
        CView.text("You see a large hollow tentacle attempt to descend upon your stiff cock. Much to your surprise and the creature's frustration, it barely opens wide enough to cover the tip of your impressive member. The creature mindlessly continues attempting to entrap your penis. It only succeeds in sending pangs of pleasure down your shaft as the thumping on the end of your cock shoots down to your roots.\n\n");
        CView.text("Amused as well as aroused, you choose to lull the creature into reticence as it keeps trying to suck your horsecock in. Each wave of pleasure makes your prick bob about");
        if (player.body.balls.count > 0) CView.text(", and you feel your " + describeBalls(false, true, player, true) + " rise and drop in unison to the muscular contractions pumping freshly made cum into position for release");
        CView.text(".\n\n");
        CView.text("You bask in the glow of pleasure as the creature still fumbles around your dong, not realizing that you are just too big. An evil thought crosses your mind. Since this thing wants you bad enough, why not oblige it? Not expecting your increased strength due to your equine features, you wrench yourself free of the creature's restraints and summarily grasp the tentacle trying to cover your cock. With a great buck and heave, you force your dick into the tentacle, stretching it immensely. The creature lets out an inhuman howl as it reacts painfully to your newfound zeal.\n\n");
        CView.text("You begin pumping and thrusting like mad, working yourself to an orgasm. The creature tries to pull away, but finds that it is the one that cannot escape. Feeling your ");
        if (player.body.balls.count > 0) CView.text("balls ");
        else CView.text("cock ");
        CView.text("rise up, you thrust as deep as you can go before you begin hosing a massive, steady stream of cum into the creature. For several minutes, you continuously empty yourself into the beast as it flops about, trying to escape. After a few minutes, the creature struggles more and you feel the wet warmth of your own cum around your tip. Cum begins leaking liberally from the tentacle. ");
        if (player.body.balls.count > 0) CView.text("Your balls have overfilled the creature!\n\n");
        else CView.text("Your cum has overfilled the creature!\n\n");
        CView.text("One last jerk from the creature breaks your hold and it pulls itself away from your member, excess cum spilling everywhere and flying through the air as it flops about. Clearly overwhelmed, the beast lumbers clumsily back into the bush. You laugh to yourself as you made the creature taste its own proverbial medicine as its efforts to overwhelm you completely backfired.");
        player.orgasm();
        player.stats.str += 0.5;
        player.stats.spe += -.5;
        player.stats.int += -1;
        player.stats.lib += 5;
        player.stats.sens += 1;
        player.stats.cor += 1;

        if (player.stats.HP === 0) player.stats.HP++;
        return { next: passTime(1) };
    }
    // Bad end + counter here
    if (player.stats.lust > 99) {
        TentacleBeastFlags.BAD_END_COUNTER++;
        // Bad end
        if (TentacleBeastFlags.BAD_END_COUNTER >= 3 && player.stats.cor > 50 && player.gender === 3) {
            return futaTentacleBadEnd(player);
        }
    }
    // Centaur madness!
    else if (player.body.legs.isTaur()) {
        CView.text("Tentacles wrap around your legs before you can stop them.  They continue to coil up your legs, spreading an uncomfortable warmth through your equine half.  Another tentacle wraps around your torso, spreading that same warmth and fuzzing your mind.  You grab one you can reach and attempt to tear it off of you, but two thinner, translucent feelers immobilize your arms, pulling them up behind your head.\n\n");
        player.slimeFeed();
        CView.text("They test your body, slipping about over your form.  A small tentacle finds its way into your mouth, coiling about your tongue and down your throat.  It's careful not to make you choke, seemingly as curious about your innards as it is about your shell.  You're given little time to think though, as a surge of fluid is deposited into your stomach, making your desire to cum grow even more.  The sharp spines coiled about you act similarly, spreading warmth about them wherever they touch your " + describeSkin(player) + ".\n\n");
        // has at least 1 cock, engulfable:
        if (player.body.cocks.length > 0) {
            if (player.body.cocks.sort(Cock.Smallest).get(0)!.area <= 50) {
                CView.text("More aphrodisiac-toxin pours into you, causing " + describeOneOfYourCocks(player) + " to expand.  ");
                if (player.body.cocks.length > 1) CView.text("  The creature seems surprised at first to discover such a large brace of cocks, testing their texture and wrapping around each individually.  Your " + describeCocksLight(player) + " responds by wriggling about and tempting the beast to continue its exploration, but the gesture is futile and they're abandoned, though not for long.");
                CView.text("\n\n");

                CView.text("A peculiar sensation rolls over it as an unseen tentacle engulfs you, rippling and milking your " + describeCock(player, player.body.cocks.get(0)) + ".  Your body naturally tries to drive into it but the tentacle isn't strong enough to provide resistance.  Your wild humping causes it to bump up and down against your underbelly, a surprisingly pleasurable feeling.  The tentacle pays no heed, continuing to ripple and constrict around you;  a suckling noise accompanies the sensation of your pre-cum being suctioned out.\n\n");

            }
            // has cock, not engulfable:
            else {
                CView.text("More aphrodisiac-toxin pours into you, causing " + describeOneOfYourCocks(player) + " to expand. Something bumps up against the tip but can't seem to fit around your " + describeCock(player, player.body.cocks.get(0)) + ".  It continues trying for a while, sending pangs of pleasure down the length.  The tentacle eventually gives up and latches onto the tip, positioned right at the opening to your urethra.  It sucks up your pre-cum as it drips from you, accompanied by a loud suckling noise.");
                // [With testicles:
                if (player.body.balls.count > 0) CView.text("The sucking reaches all the way to your " + describeBalls(true, true, player) + ", a spectacularly strange sensation that nevertheless feels wonderful.");
                CView.text("\n\n");
            }
        }
        // has vagina:
        if (player.body.vaginas.length > 0) {
            CView.text("A squirming tentacle forces its way inside your " + describeVagina(player, player.body.vaginas.get(0)) + ", undulating and squirming as it works its way deeper and deeper.  Your body responds by pumping out more fluid, making the passage of the monstrous thing easier.");
            displayStretchVagina(player, 32, true, true, false);
            if (player.body.cocks.length > 0) {
                if (player.body.cocks.sort(Cock.Smallest).get(0)!.area <= 50) CView.text("  Your humping appears to not affect the creatures continuing efforts, despite the force of your body.");
            }
            CView.text("  You feel the beast bottom out against your uterus and cry out in pleasure, gyrating yourself about as fluid sprays behind you.\n\n");
        }
        // Breasts > Manly, non-lactating:
        if (player.body.chest.sort(BreastRow.Largest).get(0)!.rating >= 1 && player.lactationQ() <= 0) {
            CView.text("Roving tentacles latch onto your " + describeAllBreasts(player) + "; tiny spikes jabbing into each " + describeNipple(player, player.body.chest.get(0)) + " and injecting some sort of hot fluid.");
            if (player.body.chest.reduce(BreastRow.TotalBreasts, 0) === 2) CView.text("  The anus-like tips affix to them.");
            else CView.text("  The anus-like tips attach to one pair as more appear in order to take the others.");
            CView.text("  You feel a gush of liquid leave your body as the translucent lengths of the tentacles turn stark white.  The fluid they inject has caused you to lactate!  They suckle at you incessantly and before long your nipples ache from overuse and your breasts have run completely dry.\n\n");
            boostLactation(player, 1.5);
        }
        // Anus == gaping:
        if (player.body.butt.looseness >= 4) {
            CView.text("Your " + describeButthole(player.body.butt) + " makes an inviting target for the squirming mass and it's quick to capitalize.  A particularly bulbous appendage slides deep inside, roiling about in a way that not even your well-trained hole has been treated to.");
            if (player.body.cocks.length > 0) CView.text("  A series of undulating lumps pass over your prostate, pushing out a splash of pre-cum.");
            CView.text("  You moan into the tentacle in your mouth appreciatevely at the beast's spectacular skill.\n\n");
        }
        // Breasts > Manly, lactating, not enough to overfill:
        if (player.body.chest.sort(BreastRow.Largest).get(0)!.rating >= 1 && player.lactationQ() > 0 && player.lactationQ() < 1000) {
            CView.text("Roving tentacles latch onto your " + describeAllBreasts(player) + ", tiny spikes jabbing into your " + describeNipple(player, player.body.chest.get(0)) + "s and injecting some sort of hot fluid.  The pressure inside grows nearly unbearable as you feel your milk production increase.  To your relief, an anus-like tip attaches to each nipple.  They suckle at you incessantly and before long your nipples ache from overuse and your breasts have run completely dry.\n\n");
            boostLactation(player, 1);
        }
        // Breasts > Manly, lactating, enough to overfill:
        else if (player.body.chest.sort(BreastRow.Largest).get(0)!.rating >= 1 && player.lactationQ() >= 1000) {
            CView.text("Roving tentacles latch onto your " + describeAllBreasts(player) + ", tiny spikes jabbing into your " + describeNipple(player, player.body.chest.get(0)) + " and injecting some sort of hot fluid.  The pressure inside grows nearly unbearable as you feel your milk production increase.  To your relief, an anus-like tip attaches to each nipple.  They suckle at you incessantly and before long your nipples ache from overuse, but your breasts are still prepared to provide more milk!  The suction decreases as the beast before you becomes overfilled and eventually is forced to give up.\n\n");
            if (player.body.cocks.length > 0) {
                CView.text("Your " + describeCock(player, player.body.cocks.get(0)) + " explodes inside the creature, ");
                if (player.cumQ() <= 500) CView.text("pushing the creature to the edge of its fluid-containing abilities.");
                else CView.text("quickly overfilling the tentacle attached to it; it explodes off of you, freeing your spunk to spray from both you and the retreating beast.  ");
            }
            CView.text("The tentacles holding you release, leaking fluids everywhere.  You delight in giving one of the larger ones a hard stomp, as a reminder not to trifle with you.");
            // end (victory)
            player.orgasm();
            player.stats.tou += .5;
            player.stats.spe += -.5;
            player.stats.int += -.5;
            player.stats.lib += 1;
            player.stats.sens += 1;
            player.stats.cor += 1;

            boostLactation(player, .5);
            if (player.stats.HP === 0) player.stats.HP++;
            return { next: passTime(1) };
        }
        // has cock:
        if (player.body.cocks.length > 0) {
            player.body.cumMultiplier += .5;
            CView.text("The creature's desires are soon fulfilled as your " + describeCock(player, player.body.cocks.get(0)) + " starts to swell.  ");
            // [has testicles:
            if (player.body.balls.count > 0) CView.text("Your " + describeBalls(true, true, player) + " tighten up against you in preparation for their inevitable release, ready to spray their boiling load into the beast.  ");
            CView.text("You rear up as a surge of euphoria races through you; your equine strength manages to overpower the tentacles holding your forelegs down for the briefest of moments needed to release your spunk into the suction of the tentacle, and you feel it get whisked out and down toward the writhing mass.\n\n");
        }
        // has vagina:
        if (player.body.vaginas.length > 0) {
            CView.text("Your " + describeVagina(player, player.body.vaginas.get(0)) + " ripples about the coiled intruder as you climax; fem-cum drips down the tentacle and fills the area with your musky scent.  You rear up as a surge of euphoria races through you, managing to overpower the tentacles holding your forelegs down for the briefest of moments.  But even with your forelegs free, the tentacle in your " + describeVagina(player, player.body.vaginas.get(0)) + " remains, rippling with waves of seed that spray inside you in massive, hot globules.  The sticky substance flooding your love canal pushes you over the edge and you orgasm again, spraying more as you cry out in pleasure.\n\n");
        }
        // has cock, normal cum amount, anus < gaping:
        if (player.body.cocks.length > 0 && player.cumQ() < 1500 && player.body.butt.looseness < 4) {
            CView.text("Just as you think it's over, another tentacle rams into your " + describeButthole(player.body.butt) + " and begins roughly massaging your prostate as it swells massively, causing another surge of cum to leave you, and another, and another.");
            displayStretchButt(player, 40, true, true, false);
            CView.text("  It continues to violate your ass until you black out from exhaustion, the number of loads you've released no longer countable.");
            // end (loss)
            player.orgasm();
            player.stats.tou += 1;
            player.stats.int += -.5;
            player.stats.lib += 2;
            player.stats.sens += 1;
            player.stats.cor += .5;

            if (inCombat) return { next: passTime(1) };
            else return { next: passTime(2) };
        }
        // has cock, normal cum amount, anus == gaping:
        if (player.body.cocks.length > 0 && player.cumQ() < 1500 && player.body.butt.looseness >= 0) {
            CView.text("Just as you think it's over, the tentacle inside your " + describeButthole(player.body.butt) + " begins to swell massively, causing another surge of cum to leave you, and another, and another.  It continues to violate your ass until you black out from exhaustion, the number of loads you've released no longer countable.");
            // end (loss)
            player.orgasm();
            player.stats.tou += 1;
            player.stats.int += -.5;
            player.stats.lib += 2;
            player.stats.sens += 1;
            player.stats.cor += .5;

            if (inCombat) return { next: passTime(1) };
            else return { next: passTime(2) };
        }
        // { has vagina, anus < gaping:
        if (player.body.vaginas.length > 0) {
            CView.text("Just as you think it's over, a tentacle rams into your " + describeButthole(player.body.butt) + " and begins to swell massively, causing another surge of girlcum to leave you, and another, and another.");
            displayStretchButt(player, 40, true, true, false);
            CView.text("  It continues to violate your ass until you black out from exhaustion, the number of times you've orgasmed no longer countable.");
            // end (loss)
            player.orgasm();
            player.stats.tou += 1;
            player.stats.int += -.5;
            player.stats.lib += 2;
            player.stats.sens += 1;
            player.stats.cor += .5;

            if (inCombat) return { next: passTime(1) };
            else return { next: passTime(2) };
        }
        // { has cock, huge cum amount:
        if (player.body.cocks.length > 0) {
            CView.text("You continue to pump more and more baby batter into the monster until, much to your surprise, it overwhelms the beast and comes surging back out to coat your ");
            if (player.body.balls.count > 0) CView.text(describeSack(player) + " and ");
            CView.text("hind legs.  When the creature tries to pull away you step forward awkwardly, forelegs still raised, and continue spraying your copious amount of seed directly into the main mass.  It writhes about beneath you, incapable of doing anything as its soggy, heavily-laden tentacles are now no match for your strength.\n\n");

            CView.text("Eventually you");
            if (player.body.balls.count > 0) CView.text("r " + describeBalls(true, true, player));
            CView.text(" empty and you turn around to leave, giving the spunk covered mass a swift kick as a reminder of your superiority.");
            // end (victory)
            player.orgasm();
            player.stats.tou += .5;
            player.stats.spe += -.5;
            player.stats.int += -.5;
            player.stats.lib += 1;
            player.stats.sens += 1;
            player.stats.cor += 1;

            if (player.stats.HP === 0) player.stats.HP++;
            return { next: passTime(1) };
        }
        // end (loss)
        player.orgasm();
        player.stats.tou += 1;
        player.stats.int += -.5;
        player.stats.lib += 2;
        player.stats.sens += 1;
        player.stats.cor += .5;

        if (inCombat) return { next: passTime(1) };
        else return { next: passTime(2) };
    }
    // Milk surprise!
    if (player.body.chest.sort(BreastRow.LactationMost).get(0)!.lactationMultiplier >= 3.5 && player.gender > 0) {
        player.slimeFeed();
        CView.text("Before you can react the creature has wrapped a long, sinewy tendril around each of your legs.  A third tendril quickly circles your waist.  You can feel the creature's strength immediately and wince as it tightens its grip.  The constricting pain is followed by a tingling, almost burning sensation, which you quickly recognize means the beast has injected you with some kind of poison.  A warm sensation floods your body and you realize with a start the poison is actually an aphrodisiac.\n\n");
        player.stats.lib += 2;

        CView.text("You feel light-headed as the drug spreads through your body quickly.  Your ");
        // Just dicks
        if (player.gender === 1) {
            CView.text(describeCocksLight(player));
            if (player.body.cocks.length > 1) CView.text(" begin ");
            else CView.text(" begins ");
        }
        // Pussy
        else {
            // AND dick(s)
            if (player.body.cocks.length > 0) {
                CView.text(describeVagina(player, player.body.vaginas.get(0)) + " and " + describeCocksLight(player));
                CView.text(" begin ");
            }
            // Nope just pussy
            else {
                CView.text(describeVagina(player, player.body.vaginas.get(0)));
                CView.text(" begins ");
            }
        }
        CView.text("to throb urgently.  You are scarcely aware of the creature's approach; the strong tentacles lay you back gently, almost tenderly as your drug-clouded mind attempts to count their number.  It's impossible for an accurate count with them moving so quickly, but you can see there are two kinds.  The thicker, stronger tentacles are covered in dome-like protrusions of varying sizes and each ends with a very anus-like pucker.  The smaller tentacles are smooth and translucent, letting some light pass through them.  They also end in a tight, anus-like orifice.\n\n");
        CView.text("You shudder as your " + describeAllBreasts(player) + " are quickly encircled and molested by the smaller tentacles.  Your swollen mammaries ache as the tentacles attach their orifices to your oozing nipples.  The tentacles begin a distinct milking pattern, alternating which nipple is milked first; you moan in delight and watch as your milk travels through the tentacle shaft and down to the shambling beast's body.\n\n");
        // (Optional Paragraphs)
        if (player.gender === 2) {
            // [Female/Virgin-Tight Cunt]
            if (player.vaginalCapacity() < 30) CView.text("The beast senses your excitement and with beguiling speed swiftly impales your " + describeVagina(player, player.body.vaginas.get(0)) + " with one of its massive, knobbly tentacles.  You squeal in pain and pleasure as you feel every bumpy inch pound into you, your cunt being stretched to unbelievable proportions.  The tentacle quickly bottoms out in your shallow hole, pressing urgently against your cervix as it begins to rhythmically pound your " + describeVagina(player, player.body.vaginas.get(0)) + ".\n");
            // [Female/Loose-Moist Cunt]
            else CView.text("The beast senses your excitement and with beguiling speed swiftly impales your " + describeVagina(player, player.body.vaginas.get(0)) + " with one of its massive, knobbly tentacles.  You moan like a whore as the beast's knobbly cock slides into with ease, every bump sending shivers through your spine as it finally bottoms out deep in your cunt, pressing into your cervix urgently.  The monster begins to pound heartily at your " + describeVagina(player, player.body.vaginas.get(0)) + ", filling the air with lewd squishing sounds.\n");
            if (displayStretchVagina(player, 20, true)) CView.text("\n");
            CView.text("\n");
        }// HERMS
        if (player.gender === 3) {
            // [Herm/Virgin-Tight Cunt]
            if (player.vaginalCapacity() < 30) CView.text("The beast senses your excitement and with beguiling speed swiftly impales your " + describeVagina(player, player.body.vaginas.get(0)) + " with one of its massive, knobbly tentacles.  You wail in excitement and pain, but before you can even digest the invasion, another tentacle impales itself on your " + describeCock(player, player.body.cocks.get(0)) + ".  The anus-like opening gapes to envelope you, slowly devouring your member.  The double assault drives your body wild, and you begin pumping back against the invader and thrusting your " + describeCock(player, player.body.cocks.get(0)) + " deeper into its tight fuck hole.\n\n");
            // [Herm/Loose-Wet Cunt]
            else CView.text("The beast senses your excitement and with beguiling speed swiftly impales your " + describeVagina(player, player.body.vaginas.get(0)) + " with one of its massive, knobbly tentacles but before you can even digest the invasion another tentacle impales itself on your " + describeCock(player, player.body.cocks.get(0)) + ", the anus like opening gaping to envelope you.  The double assault drives your body wild, and you begin pumping back against the invader and thrusting your " + describeCock(player, player.body.cocks.get(0)) + " deeper into its tight fuck hole.\n\n");
            if (displayStretchVagina(player, 20, true)) CView.text("\n");
            CView.text("\n");
        }
        CView.text("You slowly become aware that the beast has slowed its assault on your genitals and soon stops altogether, withdrawing entirely.  The beast lets out an audible gurgle and you smile as you feel the tentacles re-double their assault on your " + describeNipple(player, player.body.chest.get(0)) + "s.  The beast slowly lifts you off the ground with its strong tentacles, suspending you about three feet off the ground before flipping you over.  You hang suspended in the air, your " + describeAllBreasts(player) + " dangling lewdly under you.  Suddenly you feel the desire to \"<i>moo</i>\" as the attack on your aching " + describeNipple(player, player.body.chest.get(0)) + "s continues.  The tentacles continue their assault for what seems like hours, but then you gradually sense the tentacles beginning to slow.  Another gurgling sound confirms your suspicions - the beast wants your milk, but it's obvious you have far too much to offer!  You grin wickedly when the beast's tentacles begin to sag, quickly reaching up to fondle and massage your " + describeBreastRow(player.body.chest.get(0)) + ".  The stimulation causes even more milk to gush down the tentacles length.  After a few moments of the increased assault the beast groans and releases you, the tentacles popping off your nipples audibly, spraying your milk about as they release you.\n\n");
        // [Female/Herm]
        if (player.gender >= 2) CView.text("Your " + describeAllBreasts(player) + " ache, but you can tell immediately they are not depleted.  More milk dribbles as the tentacles try to retreat, and you grin, hardly satisfied with the beast's attack.  You reach between your thighs, seizing the nearest knobbly tentacle.  The beast is so sated it offers no resistance as you begin to pound your " + describeVagina(player, player.body.vaginas.get(0)) + " with the living dildo.  The idea of turning the tables on the raping beast spurs you on to new heights and you cum quickly around the knobbly shaft, your cunt spasming and milking the bumpy tentacle hard.  As you finish with the tentacle the beast gives a final gurgle and retreats into the forest.");
        // [Male]
        else CView.text("You feel your " + describeNipple(player, player.body.chest.get(0)) + "s dribbling milk as the tentacles attempt their retreat.  You realize the beast has nowhere near drained you and you grin eagerly as your " + describeCock(player, player.body.cocks.get(0)) + " throbs mightily.  You reach back and seize the nearest knobby tentacle, the beast offering no resistance as you shove your " + describeCock(player, player.body.cocks.get(0)) + " into the tight, puckered orifice.  You moan in delight, grunting happily as you fuck the tight hole wildly.  The thought of turning the tables on the raping beast drives you closer to the edge; soon you bury all of your cock into the tight fuck tool and unload your massive torrent of cum into the tentacle.  Your hot cum gushes into the beast and you can feel the tentacle throb and squirm in protest as you fill the beast even more.  After your " + describeCock(player, player.body.cocks.get(0)) + " slips free the beast lets out a final gurgle of defeat and slithers away into the forest.");
        player.orgasm();
        player.stats.tou += .5;
        player.stats.spe += -.5;
        player.stats.int += -.5;
        player.stats.lib += 1;
        player.stats.sens += 1;
        player.stats.cor += 1;

        boostLactation(player, .5);
        if (player.stats.HP === 0) player.stats.HP++;
        return { next: passTime(1) };
    }
    if (player.gender === 1) {
        player.stats.str += -1;
        player.stats.int += -1;
        player.stats.lib += 5;
        player.stats.sens += 2;
        player.stats.lust += 25;
        player.stats.cor += 1;

        if (player.stats.cor < 75) CView.text("It grabs you before you can get away!\n\nWhile you attempt to resist the abomination, its raw muscle mass is too much. ");
        CView.text("It pins you to the ground easily. You immediately feel a sharp, horrible pain ");
        if (player.body.cocks.length > 1) CView.text("at the base of your " + describeCocksLight(player) + ".");
        CView.text("  You look down to see the end of a thorny tendril impaled in your pelvic region. Fiery pain courses through your veins as you feel the creature inject you with some sort of liquid. As the pain sears through you, ");
        if (player.body.cocks.length === 1) CView.text("your member immediately becomes fully erect and pre-cum leaks liberally from your tip.");
        else CView.text("your members immediately become fully erect, pre-cum drizzling from the tips.");
        CView.text("\n\nRealizing what is about to happen, you try to struggle. The beast responds by slamming you to the ground a few times, stunning you.  ");
        if (player.body.cocks.length === 1) CView.text("In your daze you see a monstrous, hollow tentacle poised over your furious cock. You scream in shock and protest, but your cries fall upon deaf ears. The tentacle descends upon your penis, now begging for release, and clamps down upon your pubic mound, fully encapsulating your member.");
        else CView.text("In your daze you see " + player.body.cocks.length + " monstrous, hollow tentacles poised over your furious cocks.  You scream in shock and protest, but your cries fall upon deaf ears.  The tentacles descend upon your " + describeCocksLight(player) + ", all begging for release, and clamps down upon your pubic mound, fully encapsulating your dicks.");
    }
    if (player.gender === 2) {
        player.slimeFeed();
        player.stats.spe += -1;
        player.stats.int += -1;
        player.stats.lib += 5;
        player.stats.sens += 3;
        player.stats.lust += 20;
        player.stats.cor += 1;

        if (player.stats.cor < 75) CView.text("It grabs you before you can get away!\n\nWhile you struggle valiantly, the beast's raw might is more than a match for you. ");
        CView.text("Tentacles burst from the mass and bind your arms, legs, and midriff. ");
        if (player.stats.cor < 75) CView.text("You struggle to break free, but the creature only constricts you further, ensuring your immobility. ");
        CView.text("A quick flex of the tentacles securing your legs leaves you spreadeagled before the maw of the horror.  ");
        if (player.stats.cor < 75) CView.text("Fearing for your life, you scream and struggle for help, but only the apathetic sounds of nature respond.");
        CView.text("\n\n" + (player.body.chest.reduce(BreastRow.TotalBreasts, 0) + 1) + " thorny tendrils appear and pierce your breasts and groin. A sharp pain and a burning sensation tear through you, overriding the previous wave of pleasure. You feel fluids being injected into you and a distinctive, agonizing misery flows into your veins.  Your breasts and ");
        if (player.body.vaginas.length === 1) CView.text("clit ");
        else CView.text("clits ");
        CView.text("heat up and begin to swell. The pressure in your breasts is maddening and to your shock, you feel yourself leaking milk.");
    }
    if (player.gender === 3) {
        player.slimeFeed();
        player.stats.spe += -1;
        player.stats.int += -1;
        player.stats.lib += 5;
        player.stats.sens += 4;
        player.stats.lust += 35;
        player.stats.cor += 2;

        if (player.stats.cor < 75) CView.text("While you attempt to resist the abomination, its raw muscle mass is too much. ");
        CView.text("It pins you to the ground easily. You immediately feel a sharp, horrible pain at the base of your ");
        if (player.body.cocks.length > 1) CView.text("cocks");
        else CView.text(describeCock(player, player.body.cocks.get(0)));
        CView.text(".  You look down to see the end of a thorny tendril impaled in your pelvic region. Fiery pain courses through your veins as you feel the creature inject you with some sort of liquid. As the pain sears through you, your ");
        if (player.body.cocks.length > 1) CView.text(describeCocksLight(player) + " immediately become fully erect and leak pre-cum liberally from their tips.  ");
        else CView.text("member immediately becomes fully erect and pre-cum leaks liberally from your tip.  ");
        CView.text("  " + numToCardinalCapText((player.body.chest.reduce(BreastRow.TotalNipples, 0))) + " thorny tentacles pierce your nipples, and you feel as if someone shot acid into your tits, which immediately begin to swell.");
        growTopBreastRowDownwards(player, 1, player.body.chest.length);
        CView.text("\n\nRealizing what is about to happen, you try to struggle. The beast responds by slamming you to the ground a few times, stunning you. In your daze you see a monstrous, hollow tentacle poised over your ");
        if (player.body.cocks.length > 1) CView.text("furious cocks.  ");
        else CView.text("furious cock.  ");
        CView.text("You scream in shock and protest, but your cries fall upon deaf ears. The tentacle descends upon your ");
        if (player.body.cocks.length > 1) CView.text(describeCocksLight(player) + ", now begging for release, and clamps down around your pubic mound, fully encapsulating your members.  ");
        else CView.text(describeCock(player, player.body.cocks.get(0)) + ", now begging for release, and clamps down upon your pubic mound, fully encapsulating your member.");
    }
    // Call page 2!
    return { next: tentacleRapeContinuation };
}

function tentacleRapeContinuation(player: Character): NextScreenChoices {
    player.orgasm();
    player.stats.tou += 1;
    player.stats.int += -.5;
    player.stats.lib += 2;
    player.stats.sens += 1;
    player.stats.cor += .5;

    CView.clear();
    CView.sprite(SpriteName.TentacleBeast); // 100;
    if (player.gender === 1) {
        CView.text("You next feel the wretched sensation of another tentacle pushing its way past your anus and into your rectum. You cry more out of frustration and anger than pain as the foreign body settles a few inches inside your body. With a furious, coordinated rhythm, the monstrosity begins swelling the tentacle in your ass and ");
        if (player.body.cocks.length === 1)
            CView.text("using a sucking-stroking motion on your helpless " + describeCocksLight(player) + ". The swelling of the ass tentacle pressures your prostate in a paradoxically pleasurable and painful manner. You realize, much to your terror, that this beast is MILKING you of your semen!");
        else
            CView.text("using a sucking-stroking motion on your " + describeCocksLight(player) + ".  The swelling of the ass tentacle pressures your prostate in a paradoxical pleasurable and painful manner.  You realize, much to your terror, that this beast is MILKING you of your semen!");
        displayStretchButt(player, 50, true);
        CView.text("\n\nHelpless and overwhelmed by the pleasure of such rough and primal stimulation, all you can do is give the creature what it wants; your hot cum. Your body only responds to the sensations from your ");
        if (player.body.cocks.length === 1)
            CView.text(describeCocksLight(player) + " and ass and in a very short time, your phallus explodes, launching stream upon stream of hot, thick cum into the horror. Your hips and pelvis buck violently with each thrust as the creature masterfully strokes your " + describeCocksLight(player) + "  and milks your prostate of your fluids. You cry with each orgasm, prompting the thing to milk you harder. After an eternity of successive ejaculations, the creature withdraws its unholy arms and leaves you in a bruised, lacerated, overfucked heap on the ground, discarded like a person throws away a corn cob after a meal.");
        else
            CView.text(describeCocksLight(player) + " and ass and in a very short time, your dicks explode, launching stream upon stream upon stream of hot, thick cum into the horror.  Your hips and pelvis buck violently with each thrust as the creature masterfully strokes your " + describeCocksLight(player) + " and milks your prostate of your fluids.  You cry with each orgasm, prompting the thing to milk you harder. After an eternity of successive ejaculations, the creature withdraws its unholy arms and leaves you in a bruised, lacerated, overfucked heap on the ground, discarded like a person throws away a corn cob after a meal.");
    }
    else if (player.gender === 2) {
        CView.text("The beast rears up to reveal a beak-like maw. It opens its massive jaws to reveal ");
        if (player.body.vaginas.length === 1)
            CView.text("a tongue shaped like a large cock while its tongue, like any tentacle, immediately seeks out your defenseless pussy. It prods itself mockingly around your labia as you attempt to contract to keep it from violating you and depriving you of what dignity you have left. The creature flexes its appendage and easily forces its way into your vagina");
        else
            CView.text(player.body.vaginas.length + " tongues shaped like large cocks while its tongues, like any other tentacles, seeks out your defenseless pussies.  It prods itself mockingly around your labias as you attempt to contract to keep them from violating you and depriving you of what dignity you have left.  The creature flexes its appendages and easily forces its way into your " + describeVagina(player, player.body.vaginas.get(0)) + "s");
        if (player.body.vaginas.length > 1)
            CView.text("s");
        CView.text(". As you cry out in shock, another dick-shaped appendage forces its way into your throat. The beast takes care to prevent you from choking on its limb.");
        CView.text("\n\nIn a coordination that can only signify higher intelligence, the monster fucks your " + describeVagina(player, player.body.vaginas.get(0)));
        if (player.body.vaginas.length > 1)
            CView.text("s");
        CView.text(" and mouth and begins milking your swollen breasts and sucks your throbbing ");
        if (player.body.vaginas.length > 1)
            CView.text("clits. ");
        else
            CView.text("clit. ");
        displayStretchVagina(player, player.vaginalCapacity() * .76, true);
        CView.text(" Your body betrays your resistance as pleasure hammers you from crotch to head. After some time, you begin bucking your hips in tandem to the creature's thrusts, drunk with pleasure. As you peak for your orgasm, you feel the creature bottom out inside your womb. Oceans of hot cum flood your " + describeVagina(player, player.body.vaginas.get(0)));
        if (player.body.vaginas.length > 1)
            CView.text("s");
        CView.text(" and your mouth. You are being inseminated by the abomination, but you do not care. The fucking is too good. The hot, musky fluids pour into your mouth. The taste crushes your last bit of resistance and you NEED MORE, not just to swallow, but to devour with your womb. You manage to free one hand, only to grasp the tentacle in your mouth to coax more semen inside you. You feel your stomach distend from the amount of cum you greedily swallow. The beast floods you with more cum than you can handle and proceeds to soak you from head to toe in its fluids as it runs from your overwhelmed orifices.");
        player.slimeFeed();
        // lactate more from the encounter.
        boostLactation(player, .3);
        return { next: tentacleRapeContinuationForFemales };
    }
    else if (player.gender === 3) {
        if (player.body.cocks.length === 1) {
            CView.text("A sharp tug tells you that the creature has sealed itself upon your " + describeCock(player, player.body.cocks.get(0)) + ". You see " + player.body.chest.reduce(BreastRow.TotalBreasts, 0) + " smaller tentacles latch onto your erect nipples. You feel milk begin to leak out as the creature makes a perfect seal around your areola. A thick, phallic tentacle probes underneath your trapped " + describeCock(player, player.body.cocks.get(0)) + " until it finds your vaginal opening. You cry out as the member punches past your opening and bottoms out in your womb. The tentacle swells up until it completely fills your " + describeVagina(player, player.body.vaginas.get(0)) + ".  ");
            displayStretchVagina(player, player.vaginalCapacity() * .76, true, false, true);
            CView.text("With freakish coordination, the beast sucks your " + describeCock(player, player.body.cocks.get(0)) + " and tits while hammering away at your " + describeVagina(player, player.body.vaginas.get(0)) + ". The overwhelming pleasure courses through your body and triggers an immediate orgasm, sending gouts of cum into the tentacle sealed around your " + describeCock(player, player.body.cocks.get(0)) + ". The sensation of your fluids entering the creature prompts it to suck your " + describeCock(player, player.body.cocks.get(0)) + " harder as well as hammer your " + describeVagina(player, player.body.vaginas.get(0)) + " faster, leading to a chain of orgasms.\n\n");
            CView.text("Drunk with pleasure, you revel in the sensation of cumming into the creature while it breast feeds from you. All you can do is drown in the experience of being milked from top to bottom. The creature begins piledriving your box faster and you feel like the creature is going to impale you with its phallic tentacle.\n\n");
            CView.text("The creature's milking tentacles stop moving and you feel the dick-tentacle press sharply against your womb. You feel the thunderous force of hot fluid lance into your body as the creature cums repeatedly inside you, triggering yet another orgasm. The creature cums in surges and shoots repeatedly inside you. Within moments, excess cum spews out of your " + describeVagina(player, player.body.vaginas.get(0)) + " as it cannot hold anymore, but the creature keeps cumming.\n\n");
            CView.text("After a while the creature withdraws its tentacles from you. It poises the tentacle-cock over your face and lets out one last load, covering your face in hot, thick sperm. You reflexively open your mouth and allow loads of the salty juice down your throat. Once spent, the creature shambles off, leaving you well milked and cum-soaked.");
        }
        else {
            CView.text("A sharp tug tells you that the creature has sealed itself upon your " + describeCocksLight(player) + ". You see " + player.body.chest.reduce(BreastRow.TotalBreasts, 0) + " smaller tentacles latch onto your erect nipples. You feel milk begin to leak out as the creature makes a perfect seal around your areola. A thick, phallic tentacle probes underneath your trapped cocks until it finds your vaginal opening. You cry out as the member punches past your opening and bottoms out in your womb. The tentacle swells up until it completely fills your " + describeVagina(player, player.body.vaginas.get(0)) + ".");
            displayStretchVagina(player, player.vaginalCapacity() * .76, true, true, false);
            CView.text("  With freakish coordination, the beast sucks your " + describeCocksLight(player) + " and tits while hammering away at your " + describeVagina(player, player.body.vaginas.get(0)) + ". The overwhelming pleasure courses through your body and triggers an immediate orgasm, sending gouts of cum into the tentacles sealed around your pricks. The sensation of your fluids entering the creature prompts it to suck your throbbing cocks harder as well as hammer your " + describeVagina(player, player.body.vaginas.get(0)) + " faster, leading to a chain of orgasms.\n\n");
            CView.text("Drunk with pleasure, you revel in the sensation of cumming into the creature while it breast feeds from you. All you can do is drown in the experience of being milked from top to bottom. The creature begins piledriving your box faster and you feel like the creature is going to impale you with its phallic tentacle.\n\n");
            CView.text("The creature's milking tentacles stop moving and you feel the dick-tentacle press sharply against your womb. You feel the thunderous force of hot fluid lance into your body as the creature cums repeatedly inside you, triggering yet another orgasm. The creature cums in surges and shoots repeatedly inside you. Within moments, excess cum spews out of your " + describeVagina(player, player.body.vaginas.get(0)) + " as it cannot hold anymore, but the creature keeps cumming.\n\n");
            CView.text("After a while the creature withdraws its tentacles from you. It poises the tentacle-cock over your face and lets out one last load, covering your face in hot, thick sperm. You reflexively open your mouth and allow loads of the salty juice down your throat. Once spent, the creature shambles off, leaving you well milked and cum-soaked.");
        }
        player.slimeFeed();
        // lactate more from the encounter.
        boostLactation(player, .3);
    }
    return { next: passTime(1) };
}

function tentacleRapeContinuationForFemales(player: Character): NextScreenChoices {
    CView.clear();
    CView.sprite(SpriteName.TentacleBeast); // 100;
    if (player.body.vaginas.length === 1) { // single coochie
        CView.text("Satisfied, the creature drops you smartly, withdraws its limbs from you, and lumbers away.  Covered completely in cum, you see that your clitoris has swollen up to ");
        // Big clit girls get huge clits
        if ((player.effects.has(EffectType.BigClit) && player.body.clit.length > 2) || player.body.clit.length > 3)
            CView.text("almost " + numToCardinalText(Math.floor(player.body.clit.length * 1.75)) + " inches in length. ");
        // normal girls get big clits
        else
            CView.text("almost four inches in length.  Bruised and sore, you pass into unconsciousness ");
    }
    else {
        CView.text("Satisfied, the creature drops you smartly and withdraws its limbs from you and lumbers away.  Covered completely in cum, you see that your " + player.body.vaginas.length + " clits have swollen up to almost four inches in length.  Bruised and sore, you pass into unconsciousness, ");
    }
    // Not too corrupt
    if (player.stats.cor < 75)
        CView.text("too intoxicated with lust to fume over your violation. ");
    // Very corrupt
    else CView.text("too intoxicated with lust to continue the pleasure. ");
    // If has big-clit grow to max of 6"
    if (player.body.clit.length < 7 && player.body.clit.length >= 3.5 && player.effects.has(EffectType.BigClit)) {
        player.body.clit.length += .1 + player.stats.cor / 100;
        CView.text("Your massive clitty eventually diminishes, retaining a fair portion of its former glory.  It is now " + Math.floor(player.body.clit.length * 10) / 10 + " inches long when aroused, ");
        if (player.body.clit.length < 5)
            CView.text("like a tiny cock.");
        if (player.body.clit.length >= 5 && player.body.clit.length < 7)
            CView.text("like a slick throbbing cock.");
        if (player.body.clit.length >= 7)
            CView.text("like a big thick cock.");
    }
    // Grow clit if smaller than 3.5"
    else if (player.body.clit.length < 3.5) {
        CView.text("In time your clit returns to a more normal size, but retains a bit of extra volume.");
        player.body.clit.length += .2;
    }
    // Mention that clit doesn't grow if your big enough.
    else CView.text("In time it returns to its normal size, losing all the extra volume.");
    if (player.body.vaginas.get(0)!.looseness === VaginaLooseness.TIGHT)
        player.body.vaginas.get(0)!.looseness = VaginaLooseness.NORMAL;
    player.slimeFeed();
    return { next: passTime(1) };
}

// Centaur v. Tentacle Monster: (display if pc is unsexed centaur)
function centaurGenderlessRetardation(player: Character): NextScreenChoices {

    CView.sprite(SpriteName.TentacleBeast); // 100;
    if (TentacleBeastFlags.UNKNOWN_FLAG_NUMBER_00247 === 0 || player.body.balls.count === 0) {
        TentacleBeastFlags.UNKNOWN_FLAG_NUMBER_00247 = 1;
        CView.text("Tentacles wrap around your legs before you can make a move to stop them, binding you tightly and coiling upwards.  One slides slowly along your underside, making you shiver in ");
        if (player.stats.cor < 50 && player.stats.lust < 70) CView.text("dread");
        else CView.text("anticipation");
        CView.text(", but stops when it reaches your haunches.  Another starts testing the same area, briefly touching your " + describeButthole(player.body.butt) + " but clearly not finding what it's looking for.\n\n");

        CView.text("\"<i>WHAT THE FUCK IS WRONG WITH YOUR BODY?!</i>\" yells out an unnervingly human voice.\n\n");

        CView.text("Startled past horror, your mouth hangs wide open.\n\n");

        CView.text("\"<i>Why the FUCK can't I find your juicy bits?</i>\" the creature shrills.  \"<i>I'm so hungry I could risk stealing spoo from an army of goblins in heat!</i>\"\n\n");

        CView.text("You stammer out something about having no genitals, not thinking clearly enough to dissemble.\n\n");

        CView.text("\"<i>Oh, you think this shit is FUNNY, don't you?</i>\"  The voice has switched to a mocking tone.  \"<i>I know, let's wander into the forest and fuck with the hungry creatures who want some nice, nutritious cum!  Let's make them work for my amusement!  It'll be fucking HILARIOUS!</i>\"\n\n");

        CView.text("A tentacle smacks your " + describeButt(player) + " hard, and the voice returns to normal.\n\n");

        CView.text("\"<i>I just caught a motherfucking HORSE, just to find out you haven't got anything for me to eat!  Do you have any idea how fucking hard it is to catch a horse!?</i>\"\n\n");

        CView.text("Feeling kind of ashamed now, you agree that horses are probably pretty hard to catch, but point out you're not <i>really</i> a horse, you're a centaur.  This is met by a stunned silence, which you, being unable to read the mood of the creature very well, decide to fill with your own voice.  You briefly explain the main differences between horses and centaurs, then mention that you weren't exactly <i>willing</i> prey; the monster certainly never asked you if it would be okay to feed from your genitalia, and that perhaps it should reconsider its strategy.\n\n");
        CView.text("More silence.\n\n");

        CView.text("Out of nowhere a tentacle slaps you in the face.\n\n");

        CView.text("\"<i>FUCK you, you stupid horse!  Why don't you grow a pair?  Literally!</i>\"\n\n");

        CView.text("It raises its tentacles and slams them into you as one, dropping you to the ground, unconscious.  With that, the tentacles retract and the monster shambles off into the forest, mumbling something about burning.");

    }
    // (Followup scene, if pc has seen above at least once, is unsexed centaur and has balls: -Z)
    else {
        CView.text("Tentacles wrap around your legs before you can make a move to stop them, binding you tightly and coiling upwards.  One slides slowly along your underside, making you shiver in ");
        if (player.stats.cor < 50 && player.stats.lust < 70) CView.text("dread");
        else CView.text("anticipation");
        CView.text(", slipping forward to probe between your haunches.  It arrives at and discovers your " + describeSack(player) + " with some little ceremony, stroking and fondling it.\n\n");

        CView.text("\"<i>Now THIS is what I'm talking about!</i>\" the creature's eerie voice sings out.  \"<i>Daddy needs his medicine!</i>\"\n\n");

        CView.text("The tentacle, now joined by a second, hunts around your " + describeBalls(true, true, player) + ", seeking any organs that might serve as a release valve for their contents.  You stare at it as it searches, quite certain you know what's coming next.\n\n");

        CView.text("\"<i>No, no, no. Where the FUCK is it?</i>\" the creature mumbles, frustration spiking the pitch of its voice.\n\n");

        CView.text("You glibly explain that though you do in fact have 'a pair', as requested, you're still very much genderless, without any sexual organs.\n\n");

        CView.text("The tentacles cease movement as their owner digests your words; it begins to shake visibly, shedding leaf-litter as it does.\n\n");

        CView.text("\"<i>You... literal-minded... PRICK!</i>\" it howls, rounding on you with furious venom and making you flinch.  \"<i>First of all, you're not GENDERLESS, you're UNSEXED!  Gender identity rolls up social and behavioral factors like masculine or feminine mannerisms, dress, and domestic roles; the only thing YOU are less is anything remotely USEFUL between your legs!  If you're going to be PEDANTIC, try at least to be right!</i>\"\n\n");

        CView.text("You quail, surprised at misguessing the character of its reaction.\n\n");

        CView.text("\"<i>SECOND of all,</i>\" it continues, \"<i>it occurs to me that, in your misguided zeal, you've forgotten that you, a: have BALLS, and b: have NO WAY to close your legs!  WHICH BRINGS ME TO C: TENTACLE TO THE GROIN!</i>\"\n\n");

        CView.text("Your eyes bulge out as one of the feelers which had been still during your argument pulls away from your " + describeSack(player) + " and then returns with a sharp slap; as your vision pinks over under the wave of nausea, the creature releases your legs and you collapse into what can only be assumed is a centaur fetal position.\n\n");

        CView.text("\"<i>Q.E.D., MOTHERFUCKER!</i>\" it shouts, gesticulating in the air wildly with its tentacles as it turns and clumps back into the dense brush.");
    }
    player.stats.HP -= 5;
    return { next: passTime(1) };
}

// Naga v. Tentacle Monster:
function genderlessHilarityForNagaKenDolls(player: Character): NextScreenChoices {

    CView.sprite(SpriteName.TentacleBeast); // 100;
    CView.text("Out of nowhere tentacles bind your arms and tail, holding you firm in a matter of seconds.  You struggle to free yourself but can do nothing against the strength of the beast holding you in your current state.  More of the appendages start teasing around your body, as if looking for something.  A handful test the entrance to your " + describeButthole(player.body.butt) + " but evidently that's not what they're after.\n\n");

    CView.text("An oddly human voice comes from the undergrowth, catching you off-guard.  \"<i>Look, I'm really sorry about this, but I'm really not all that familiar with, uh, whatever it is you are.  Where do you keep the naughty bits?</i>\"\n\n");

    CView.text("A little stunned by the question, you tell the voice that you don't have any \"<i>naughty bits</i>\".\n\n");

    CView.text("\"<i>I'm sorry, maybe I just worded the question badly.  Um, where do you keep your penis... esss and or vagina... ssss.</i>\"  The words are followed up by prolonged hisses that may or may not represent the usual attempt to transmute one language to another by tacking new suffixes on.\n\n");

    CView.text("Sensing an opportunity to get out of this situation, you respond with your own series of hisses and hand gestures as if to say you have no idea what the beast wants.  It responds with a sigh and you're released from its grip, landing on the ground in a bit of a heap.\n\n");

    CView.text("\"<i>Fucking tourists.</i>\"  It slams its tentacles down in a brutal blow, knocking you out.");
    player.stats.HP -= 15;
    return { next: passTime(1) };
}

// Goo v. Tentacle Monster:
function tentacularGenderGooTimes(player: Character): NextScreenChoices {

    CView.sprite(SpriteName.TentacleBeast); // 100;
    CView.text("All of a sudden, tentacles come whipping out of the undergrowth to grab you.  Though, they're moving a little too fast, and manage to compress your body walls so far together that you're almost squeezed in half.\n\n");

    CView.text("\"<i>SHIT. SHIT. SHIT. SHIT.</i>\"  An oddly human voice is profaning loudly.  \"<i>Are you dead?</i>\"\n\n");

    CView.text("You respond that you are not, you're just mostly liquid and insubstantial.\n\n");

    CView.text("\"<i>Uh huh... that so?  Well, so long as you have some substantial naughty bits, I'll be happy.</i>\"\n\n");

    CView.text("There's an awkward silence.\n\n");

    CView.text("\"<i>You haven't got anything, have you?</i>\"\n\n");

    CView.text("You shake your head.\n\n");

    CView.text("\"<i>Well, fuck.</i>\"  A tentacle pokes you and you'd guess the beast is watching you jiggle as it chuckles.  \"<i>Maybe this isn't a total waste. I wonder, what do you taste like?</i>\"\n\n");

    CView.text("One of the larger tentacles extends and latches onto your base, its anus-like opening sucking gently at your gooey mass.  There follows a brief moment where you're not really afraid of the situation, but are instead mildly curious yourself what you taste like.\n\n");

    CView.text("\"<i>FUCK!</i>\" comes the voice again.  \"<i>You're sour apple!  I fucking HATE sour apple!</i>\"\n\n");

    CView.text("It slams its tentacles down in a brutal blow, knocking you out.");
    return { next: passTime(1) };
}
