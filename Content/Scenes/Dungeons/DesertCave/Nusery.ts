import { CView } from 'Engine/Display/ContentView';
import { Character } from 'Engine/Character/Character';
import { NextScreenChoices, ScreenChoice } from 'Engine/Display/ScreenDisplay';
import { Cock, CockType } from 'Engine/Body/Cock';
import { playerMenu } from 'Content/Menus/InGame/PlayerMenu';
import { describeCock } from 'Content/Descriptors/CockDescriptor';
import { BreastRow } from 'Engine/Body/BreastRow';
import { Womb } from 'Engine/Body/Pregnancy/Womb';

// ~ FUCK EM ALL
export function fuckAllThePregWitches(player: Character): NextScreenChoices {
    CView.clear();
    const hasCockThatFits = player.body.cocks.find(Cock.CockThatFits(50));

    CView.text("The witches crawl forwards with their bellies and double rows of milk filled tits impeding their movements. Despite their glistening tanned bodies and highly toned legs they still amount to little more than lewd piles of fleshy orbs, each one with double pairs of cunts including ones insatiably starving for cum to fill their empty second wombs. Each of their light brown and sweaty bodies looks equally appetizing, and as [eachCock] slowly engorges it becomes clear that if you're going to fuck any of them then you're going have to fuck all of them.  Anything less than knocking up all of the witches simply won't do.  By the time you're done with them, half of the next generation of sand witches will call you 'father'.");

    CView.text("\n\nAs [eachCock] starts rising in to the air, it isn't difficult to make your way behind the slow moving witches and encourage them to raise their dual pussies in to the air.  Each of their torsos are heavily weighted down to the ground, but this aids in their tilting their pelvises to ensure their dripping pussies are properly displayed between their toned thighs.  Two pairs of dark and swollen labia present themselves to you on each witch, and you can easily see how one pair of nether lips are gaping wide from the pressure built up in the womb it leads to.  The other pair is just as swollen but seems to be dripping pussy juices with greater desire as it thirsts to fill its empty womb with seed.  The rivers of pussy juice keep the thighs and undersides of the pregnant bellies on each of these whores incredibly wet and slick.");

    let multi: boolean = false;

    // {if player has a single cock}
    if (player.body.cocks.length === 1 || hasCockThatFits) {
        CView.text("\n\nWasting no time you move forwards to slide the shaft of your [cock] up and down the folds of the nearest witch's labia to lube it up.  She moans in frustrated pleasure, anxious to feel the length of your manhood pushing directly into those folds.  As you feel the crown of your cock head sliding along the lips of her cunt you decide not to tease her for the sake of your own pleasure.  With fingers from each hand you pull her nethers aside and press your cock directly into her entrance, feeling the tight orifice stretch around your man-flesh and swallow your cock as deeply as it can.");
    }
    // else if player has two long cocks}
    else if (hasCockThatFits && player.body.cocks.length < 3) {
        CView.text("\n\nAs you walk forwards you push two of the witches together, side by side, with their asses up in the air and their pairs of pussies facing you as your cocks press up against the nethers leading to their empty wombs.  Their dark cunts part and swallow up your shafts as you press forward, eliciting cries of pleasure from the whorish witches and forcing gobs of girl cum to drip down your cocks from their sexually charged holes.");
        multi = true;
    }
    // {else if player has three long cocks}
    else {
        CView.text("\n\nYou gather three of the bent over witches together with their asses pressed tightly side by side, close enough for their sopping wet cunts to be in reach for three long cocks to fuck at once.  With your stiffening shafts growing harder with each passing moment you begin grabbing your pricks and angling them into the flush dark cunts.  As soon as you feel the entrances of each witch's pussy pressing against your cock heads you begin pressing forwards.  All three of them cry out as your shafts spear their cunts and fill their depths at the same time.  Their inner muscles contract and grip your cocks, almost as if they were trying to suck your bundle of shafts even deeper in to their whorish pregnant bodies.");
        multi = true;
    }

    CView.text("\n\nWith your shaft");
    if (multi) CView.text("s");
    CView.text(" thoroughly swallowed up by the juicy confines of the witch");
    if (multi) CView.text("es");
    CView.text(", you begin rocking your hips to and fro, sliding yourself in and out of ");
    if (!multi) CView.text("her");
    else CView.text("their");
    CView.text(" velvety wet depths.  ");
    if (!multi) CView.text("Her");
    else CView.text("Their");
    CView.text(" blissful cries of pleasure fill the room, joined with a chorus of slurping sounds as you thrust your sensitive shafts ever deeper and harder.  ");
    if (!multi) CView.text("Her");
    else CView.text("Their");
    CView.text(" quadruple breasts jiggle and bounce along the floor and ");
    if (!multi) CView.text("her");
    else CView.text("their");
    CView.text(" pregnant ");
    if (!multi) CView.text("belly sways");
    else CView.text("bellies sway");
    CView.text(" with each ramming motion of your cock");
    if (multi) CView.text("s");
    CView.text(".  The muscles in ");
    if (!multi) CView.text("her");
    else CView.text("their");
    CView.text(" thighs and calves tense with pleasure as you push ");
    if (!multi) CView.text("her body");
    else CView.text("their bodies");
    CView.text(" to the limit.");
    const largestBreasts = player.body.chest.sort(BreastRow.Largest).get(0)!;
    // {if player has non-huge tits}
    if (largestBreasts.rating > 3 && largestBreasts.rating < 10) CView.text("  Your tits bounce as you enthusiastically grind away.");
    // {else if player has huge tits}
    else if (largestBreasts.rating >= 10 && largestBreasts.rating < 20) CView.text("  The heavy weight of your huge tits causes them to sway with every thrust of your hips.");
    // {if player has really huge tits}
    else if (largestBreasts.rating >= 20) CView.text("  The immense swells of your mammaries press down upon the ass of the girl in front of you.");
    // {if player has four non-huge tits}
    if (player.body.chest.length >= 2) {
        if (player.body.chest.get(1)!.rating >= 3) CView.text("  Your second row of breasts slap against the ass cheeks of the girl in front of you.");
    }
    // {if player has six huge but not really huge tits}
    if (player.body.chest.length >= 3) {
        if (player.body.chest.get(2)!.rating >= 3 && player.body.chest.get(2)!.rating < 20) {
            CView.text("  Your lowermost row of breasts become squashed against the witch");
            if (multi) CView.text("s");
            CView.text("'s muscular thighs.");
        }
        else if (player.body.chest.get(2)!.rating >= 20) {
            CView.text("  Your lowermost row of breasts come to rest on the floor as you lean forwards to fuck, and the witch");
            if (multi) CView.text("es");
            CView.text(" can almost support ");
            if (multi) CView.text("their");
            else CView.text("her");
            CView.text(" thighs against your obscene mammaries when they lean back against the constant ramming of your cock.");
        }
    }
    // {if player lactates}
    if (player.lactationQ() >= 200) {
        CView.text("  After only a short while of mindless rutting your tits begin leaking, and in short order your glistening nipples start spraying your milk over ");
        if (!multi) CView.text("the witch's tanned backside");
        else CView.text("the collective tanned bodies you're impaling");
        CView.text(".  A few other witches in the room eagerly step forth to suckle your [nipples] as they await their turn for impregnating.");
    }

    CView.text("\n\nThe cum inside your loins starts to move, filling the base of your shaft");
    if (multi) CView.text("s");
    CView.text(" as you feel your orgasm creep up inside you.  The sucking sensations of the ");
    if (!multi) CView.text("girl's cunt on your cock");
    else CView.text("the girls' cunts on your cocks");
    CView.text(" starts to become overwhelming, and before you realize it you're on the verge of releasing your seed.  The ");
    if (!multi) CView.text("pussy");
    else CView.text("pussies");
    CView.text(" you're pounding seem");
    if (!multi) CView.text("s");
    CView.text(" to sense the imminent release of the sperm ");
    if (!multi) CView.text("it craves");
    else CView.text("they crave");
    CView.text(" and strong contractions begin sucking on your shaft");
    if (multi) CView.text("s");
    CView.text(" even more fervently.  You can't help but give ");
    if (!multi) CView.text("it the load of baby batter it craves");
    else CView.text("them the loads of baby batter they crave");
    CView.text(".");

    CView.text("\n\nThe ");
    if (!multi) CView.text("underside of your shaft swells");
    else CView.text("undersides of your shafts swell");
    CView.text(" as your bounty of man-seed floods your full length and stretches the ");
    if (!multi) CView.text("witch's cunt");
    else CView.text("witches' cunts");
    CView.text(" even wider.  Pressing as far forwards as possible you align the ");
    if (!multi) CView.text("tip of your tool against her abused cervix");
    else CView.text("tips of your tools against their weakened cervixes");
    CView.text(" just as your cum begins erupting out of you.");

    // {if cumNormal-cumHigh}
    if (player.cumQ() < 1000) {
        CView.text("\n\nYou plaster the insides of ");
        if (!multi) CView.text("her pussy");
        else CView.text("their pussies");
        CView.text(" with no small amount squirting directly in to ");
        if (!multi) CView.text("her womb");
        else CView.text("their wombs");
        CView.text(".  When you finally pull out ");
        if (!multi) CView.text("a stream");
        else CView.text("streams");
        CView.text(" of cum are left behind.");
    }
    // {else if cumVeryHigh-cumExtreme]}
    else {
        CView.text("\n\nThe horny ");
        if (!multi) CView.text("witch isn't");
        else CView.text("witches aren't");
        CView.text(" prepared for the deluge that explodes from your genitals.  Liter after liter pours forth, filling up ");
        if (!multi) CView.text("her empty womb like a balloon");
        else CView.text("their empty wombs like a bunch of balloons");
        CView.text(" and causing your eyes to roll back in your head from the sheer pleasured sensation of emptying yourself.  When ");
        if (!multi) CView.text("her belly");
        else CView.text("their bellies");
        CView.text(" swell as large as the neighboring pregnancies and stretch marks start appearing up and down each side you finally pull out and allow your cock");
        if (multi) CView.text("s");
        CView.text(" to finish spraying ");
        if (!multi) CView.text("its");
        else CView.text("their");
        CView.text(" final loads over the ");
        if (!multi) CView.text("whorish witch's back");
        else CView.text("collective grouping of the witches' asses");
        CView.text(".");
    }

    // {all}
    if (!multi) CView.text("\n\nShe falls");
    else CView.text("\n\nThey fall");
    CView.text(" over.  Quickly, the rest of the witches in the room are eagerly raising their cunts in the air, begging for their turn at being impregnated.  Happily you oblige, shoving as much cock as you can into each wet hole that the hormonally overwrought sluts offer to you.  One pussy after another finds itself impaled on you, with you thrusting repeatedly until the massaging muscles within their cunts pull forth the rivers of baby gravy that their empty wombs are starving for.  One by one the witches find themselves filled and fall to the floor still reeling from the sensations, only for another new witch to take their place with a sopping cunt even more cum thirsty than the last.");

    // {if player has two or more cocks}
    if (hasCockThatFits) CView.text("\n\nFor the final witch you choose to shove two cocks inside her empty pussy.  Your double dicked thrusts force a joyous yelp from her with every thrust.  \"<i>Ah! T-t-too much!</i>\" she screams but her vaginal canal refuses to let you go regardless.  When you finally finish the torrent of sperm makes her feel as if she's on the verge of bursting.  The swelling of her womb causes her belly to bloat up enough to push her quad breasts upwards and siginificantly shift her center of gravity.  The orgasm that accompanies the feeling of your sperm flooding forcefully into her uterus and tubes is too much for her to bear and she slides off of your cocks like a well used cock sleeve, oozing gobs of cum from between her dark nether lips.");

    CView.text("\n\nFinally finished, you stand in a pool of your own jizz and stare down at the piles of tits and bellies that allegedly are women but for all intent and purpose have become nothing more than sacks of flesh filled with milk, babies, and cum.  Each of them is covered in a layer of sweat and splooge, and small mewing cries of satisfied delight emanate from somewhere underneath those heavy orbs.  You can't help but wonder how long it'll take for them to give birth so that you can once again knock them up with the broods of children that their bodies are so obviously intended to produce.");

    player.orgasm();
    player.stats.sens += -3;

    return { next: playerMenu };
}

// *Impregnating Pregnant Sand Witches by Xodin (NEEDS EDIT)
export function knockUpSomeDoubleStuffedSandWitches(player: Character): NextScreenChoices {
    CView.clear();
    CView.text("Figuring these horny, pregnant sluts should be more than receptive to a little sex, you shed your [armor].\n\n");
    CView.text("The heavily pregnant sand witches all stare at your [cock biggest] with rapt attention before they begin crawling towards you.  \"<i>Please!</i>\" each of them cry out.  \"<i>Too horny!  Too many hormones!</i>\"  Some of them crawl on their hands and knees with their quadruple breasts and pregnant bellies dragging along the ground.  \"<i>We need more!</i>\"  One cries out.  \"<i>More cock!</i>\" cries another.  \"<i>More children!</i>\" begs a third rubbing her belly.  \"<i>Fill us!</i>\" chants one before the others chime in.  \"<i>Yes; Fill us! Fill us!  Fill us!</i>\"  They paw at your genitals with sexual hunger burning in their eyes.  The smell of wet pussies permeates the air, encouraging your body's own arousal.");
    player.stats.lust += 33;

    // [FUCK ONE] *Requires at least one Cock of appropriate size and enough lust.

    const choices: ScreenChoice[] = [];
    if (player.body.cocks.find(Cock.CockThatFits(50))) CView.text("\n\n<b>You're too damned big to fuck any of them.</b>");
    if (player.body.cocks.length > 0 && player.body.cocks.find(Cock.CockThatFits(50)) && player.stats.lust >= 33) choices[0] = ["Fuck One", fuckOneSandWitch];
    // [TWO AT ONCE] *Requires at least two Cocks of appropriate size and enough lust.
    if (player.body.cocks.find(Cock.CockThatFits(50)) && player.body.cocks.find(Cock.CocksThatFit(50)) && player.stats.lust >= 33) choices[1] = ["Fuck Two", fuckTwoPregWitches];
    // [FUCK EM ALL] *Requires at least one Cock of appropriate size and enough lust.
    if (player.body.cocks.find(Cock.CockThatFits(50)) && player.stats.lust >= 33) choices[2] = ["Fuck'EmAll", fuckAllThePregWitches];
    // [MASS GANGBANG] *Requires lots of cocks of appropriate size and enough lust.
    // [TENTACLE GANGBANG] *Requires lots of tentacle cocks and enough lust.
    choices[9] = ["Back", playerMenu];

    return { choices };
}

// ~ FUCK ONE
export function fuckOneSandWitch(player: Character): NextScreenChoices {
    CView.clear();
    let cockThatFits = player.body.cocks.find(Cock.CockThatFits(50));
    if (!cockThatFits) cockThatFits = player.body.cocks.sort(Cock.Smallest).get(0)!;
    const tentacleCockCount = player.body.cocks.filter(Cock.FilterType(CockType.TENTACLE)).length;
    // {if player does not have a tentacle cock}
    if (tentacleCockCount === 0) CView.text("You grab the tanned shoulders of the closest pregnant witch and flip her over on to her back, trapping her beneath the weight of her belly and breasts while you grab both of her ankles.  Her dirty blonde, sweat-soaked hair lies in waves around her head on the floor as she pants heavily in sexual desperation.");
    // {else if player has a tentacle cock}
    else CView.text("Your tentacle cock lashes outwards, extending as it goes, and wraps around the ankle of the closest girl. It flips her over on to her back, trapping her own torso beneath the weight of her heavy pregnancy and her own four massive leaking breasts.");
    // {if player has two tentacle cocks}
    if (tentacleCockCount > 1) CView.text("  Another tentacle cock reaches out for the girl's other ankle, and together your cocks spread her tanned legs wide, revealing her large double pussy bloated from her pregnancy.");
    else CView.text("  You reach forward with a hand to grab her other ankle and with your cock and arm you spread her tanned legs wide to reveal her large double pussy, bloated from her pregnancy.");

    CView.text("\n\nHer dual set of labia are a darker shade than the rest of her tan flesh and enthusiastically drip with her juices.  One set is gaping wide, clearly under pressure from her womb within.  The other set are swollen but eager to be filled with true cock flesh capable of sowing her second womb full of seed.  \"<i>P-please!</i>\" she begs as if she was a wounded animal.  Her multiple breasts and belly jiggle and sway over the rest of her as she tries to angle her pelvis towards you.  The knob of her belly button traces circles in the air as her hips gyrate.");
    let multi: boolean = false;
    // {if player has two tentacle cocks and at least one other cock that will fit her pussy}
    if (tentacleCockCount >= 2 && player.body.cocks.length >= 3 && cockThatFits.type !== CockType.TENTACLE) {
        CView.text("\n\nYour tentacle cocks release the pregnant witch's ankles and wrap around her thighs instead. You align a third cock at the base of her second pussy with the head gently sliding between her nether's sopping wet lips. With a strong tug your tentacle cocks pull on the girl's tanned thighs and impale her sex upon your manhood.");
        multi = true;
    }
    // else if players without two long tentacle cocks have multiple cocks that fit
    else if (tentacleCockCount >= 2 && cockThatFits.type !== CockType.TENTACLE && player.body.cocks.filter(Cock.CocksThatFit(50)).get(1) && player.body.cocks.length >= 4) {
        CView.text("\n\nReleasing the girl's ankles you align your cocks between the drooling labia of her second pussy.  \"<i>Y-yes!</i>\" she squeals as you start pushing the multiple shafts into her all at once, \"<i>S-so-much c-c-cock!</i>\" she blissfully exclaims as her womanhood is stretched almost painfully beyond what it should be able to take.");
        multi = true;
    }
    // else if player has one non-tentacle cock, or only one cock that fits
    else CView.text("\n\nYour hands slide along the witch's legs and up her thighs until they grasp her hips. You allow the shaft of your " + describeCock(player, cockThatFits) + " to slide up and down the folds of her dripping labia until your cockhead slips in between and presses against her entrance.  \"<i>P-please!  Q-quickly!  I n-n-neeeed it!</i>\"  You're all too eager to service her as you thrust forwards.");
    CView.text("  The witch's moans and grunts of pleasure arouse the other witches in the room as they watch with the utmost jealously.  Some grab their nipples while others try to finger their pussies; whining and getting off on their envious voyeurism as they watch you fuck their sister.");

    // {all}
    CView.text("\n\nYour thrusts become forceful enough to rock the impaled witch's torso up and down along the floor. Her upper breasts repeatedly smack her own face while her lower slap against the swollen sides of her pregnant belly. All four of her heavily milk engorged tits spray streams of her cream into the air. Whimpering moans of orgasmic ecstasy constantly stream from her perfectly plump lips. Her body shakes and trembles with the convulsions of constant climaxes. The sensation of your bare cock flesh sliding against the naked walls of her inner depths with every thrust quickly shuts down the girl's higher brain functions. She becomes a senseless pregnant she-beast lost in the throes of pleasure that your shaft");
    if (multi) CView.text("s constantly pound");
    else CView.text(" constantly pounds");
    CView.text(" into her nethers. Drool escapes her lips and drips down her cheek even as her eyes roll back in her head. Talk about an easy lay.");

    // {if player has large but not extremely massive breasts}
    if (player.body.chest.sort(BreastRow.Largest).get(0)!.rating >= 4 && player.body.chest.sort(BreastRow.Largest).get(0)!.rating < 15) {
        CView.text("\n\nYour breasts bounce up and down as you get in to the groove of fucking your pregnant playtoy.");
        // {if player is largely pregnant and has large breasts.}
        const largestPreg = player.body.wombs.sort(Womb.LargestPregnancy).get(0)!;
        if (largestPreg.pregnancy && largestPreg.pregnancy.incubation > 0 && largestPreg.pregnancy.incubation < 200) CView.text("  Each time it does so your own breasts slap against your swollen midsection.");
        // {if player has four or more large breasts and is not pregnant}
        else if (player.body.chest.length >= 2) CView.text("  Your lower pair of breasts slap against the pregnant girl's belly with each thrust.");
    }
    // else if player has extremely huge breasts
    else if (player.body.chest.sort(BreastRow.Largest).get(0)!.rating >= 15) {
        CView.text("\n\nYour [chest] are massive enough that they jiggle instead of bounce with each thrust.");
        // if player has only one set of massive breasts
        if (player.body.chest.length === 1) CView.text("  Your two heavy milk sacs sway and at times you must rest them on top of the poor witch's belly to keep from prematurely exhausting yourself.");
        else if (player.body.chest.length >= 2) CView.text("  Resting on top of each other and on top of the witch's legs, your giant globes of tit flesh quake each time you hips move.");
        CView.text("  The witches around the room can't help but gawk at how much more endowed your mammaries are than even their own, and how the wrong forwards or backwards movement could result in either you or the witch you're fucking to be suddenly smothered under the weight of your ridiculously engorged tits.");
    }
    CView.text("\n\nIt isn't long before the sensations of naked wet flesh sliding along your ");
    if (multi) CView.text("shafts");
    else CView.text("shaft");
    CView.text(" forces you to reach your own orgasm.");
    if (player.body.balls.count > 0) CView.text("  Your [balls] tense with the anticipation of releasing the fruit of your loins into her waiting womb.");
    CView.text("  With both hands you reach up and grab the fat nipples of the witch's lower breasts, tugging on them like reins as you try to thrust deeper.  \"<i>Ung! Ah!</i>\" The witch bites her lower lip in pleasure and pain as you roughly handle her leaking teats.");
    // {if player has huge or massive breasts}
    if (player.body.chest.sort(BreastRow.Largest).get(0)!.rating >= 15) CView.text("  The weight of your own tits bears heavily against your arms as you try to keep the motion of your hips constant while pulling on your lover's milk knobs.");
    // {if player's tits can lactate}
    else CView.text("  Each of your [nipples] begin spraying milk over the witch as your body begins its crescendo.");

    CView.text("\n\nThe surge begins slowly.  You feel your cum pooling in your lower extremities before rising up within you to fill the base of your shaft");
    if (player.body.cocks.length > 1) CView.text("s");
    CView.text(".  The girl squeals as she feels you thicken within her, on the verge of releasing your torrent.  Her hands claw at the floor as if seeking any foundation to ground her senses, but it is to no avail as your bounty of cum explodes within her.");

    // {if player produces cumNormal or cumMedium}
    if (player.cumQ() < 500) {
        CView.text("\n\nYou feel your shaft");
        if (multi) CView.text("s");
        CView.text(" pressing against the girl's abused cervix, pumping load after load into her empty womb.  Her moans become non-sensical words as she feels your baby gravy pouring into her oven.  Tears of bliss form in the corner of her eyes and roll down her cheeks as confidence fills her that she'll soon be carrying two full wombs.");
    }
    // {else if player produces cumHigh}
    else if (player.cumQ() < 1500) CView.text("\n\n\"<i>I-I-I f-feeel it!</i>\" she cries out loud as a river of sperm fills her.  The tight grip her vaginal walls have on you forces all the cum to stream straight through her cervix and into her womb.  Her belly lightly paunches out as your ample supply of baby gravy fills her like a balloon.  With that much cum it seems doubtful that she won't be carrying a new child soon.");

    // {else if player produces cumVeryHigh}
    else if (player.cumQ() < 5000) CView.text("\n\nTears of joy roll down the cheeks of the heavily hormonal witch as your loins begin blasting forceful loads of sperm deep into her body.  The tight grip of her cunt on your cock forces over a liter of your sperm directly into her empty womb.  \"<i>T-t-too much!</i>\"  She cries out in orgiastic insanity as her already swollen belly grows to even more immense proportions.  With her second womb overfilled with sperm, her abdomen now looks as if she was already pregnant with a second child.  Despite her fearful exclamations her legs attempt to keep you within her in hopes of having her womb swallow even more baby batter.");

    // {else if player produces cumExtreme}
    else CView.text("\n\nHer head shakes back and forth as her brain fails to process the intense pleasure of having a torrential flood of sperm pumped into her.  Her cervix fails utterly to slow the flow as liters of sperm gush like a flood from a broken dam into her.  In seconds her second womb swells to match the size of her already full term first womb.  Stretch marks appear along her belly's side as loads of baby batter continue to fill her. The odd positioning of her wombs forces each one to have its own distinct bulge, as if she was hiding two small boulders in her gut.  She screams in brainless bliss as her body becomes so thoroughly over pumped.");

    // {if player has pussy}
    if (player.body.vaginas.length > 0) {
        CView.text("\n\nYour own vagina tenses in pleasure and you feel your clit throbbing hotly.  It's a shame there isn't a cock to fill you as you pump this horny pregger full of cum.");
        // {if player is a squirter}
        if (player.body.vaginas.get(0)!.wetness >= 4) CView.text("  Gobs of pussy juice splash against yours and the witch's legs as your orgasm forces your cunt to squirt over and over again.");
        if (player.body.balls.count > 0) CView.text("  Your [sack] is soaking wet by the time your pussy finishes cumming.");
    }
    // {if player has cumNormal, Medium, or High}
    if (player.cumQ() < 1500) CView.text("\n\nYou allow your softening loins to slide out of her gash.  A small stream of white juices follow from between her labia.  The poor witch runs her hands over the bulky expanses of her belly and tits as the sexual afterglow sends her through a hazy euphoria.");
    // {else if player has cumVeryHigh or cumExtreme}
    else {
        CView.text("\n\nCarefully you pull out, even as your shaft");
        if (player.body.cocks.length > 1) CView.text("s");
        CView.text(" continue");
        if (player.body.cocks.length === 1) CView.text("s");
        CView.text(" to release loads of cum.  Ropes of your white jizz splash over the witch's bare belly and naked breasts.  With both hands you stroke your " + describeCock(player, cockThatFits) + " until it has soaked the tanned beauty from head to foot in your cum.  The other witches quickly set upon the exhausted girl, licking the cum from her breasts and scooping it out of her various valleys of cleavage to slop against their own pussies in the desperate hope of seeding their own extra wombs.");
    }
    player.orgasm();
    player.stats.sens += -2;

    return { next: playerMenu };
}

// FUCK TWO AT ONCE
export function fuckTwoPregWitches(player: Character): NextScreenChoices {
    CView.clear();
    const firstCockThatFits = player.body.cocks.find(Cock.CockThatFits(50))!;
    const secondCockThatFits = player.body.cocks.filter(Cock.CocksThatFit(50)).get(1)!;
    CView.text("These hormonally overwrought witches are each little more than five huge fleshy orbs of tits and bellies, desperately crawling towards you on hands and knees as their stares fixate on your " + describeCock(player, secondCockThatFits) + ".  ");
    // {if player has two long tentacle cocks}
    if (player.body.cocks.filter(Cock.FilterType(CockType.TENTACLE)).length >= 2) CView.text("Almost of their own accord your tentacle cocks lash out, wrapping around the arms of the two closest girls, lifting them to their knees only to roll them backwards and on to their sides with their backs to each other.  ");
    else CView.text("It takes little effort to grab the closest two witches and pull them up only to push them down again and on to their sides with their backs pressed against each other.  ");
    CView.text("The two witches lay before you with their heaving breasts and bellies jutting out to either side while their asses are mashed against each other.  You grab an ankle from each of them and raise their legs up to expose the dual pairs of pussies that they possess.");

    // {for non-serpent lower body}
    if (!player.body.legs.isNaga()) CView.text("You straddle ");
    else CView.text("You entwine your serpentine tail around ");
    CView.text("their two legs that remain on the floor while allowing their raised legs to ");
    if (player.body.chest.sort(BreastRow.Largest).get(0)!.rating >= 15) CView.text("slide between your cleavage");
    // {for small or non-breasted characters}
    else CView.text("rest against your torso and shoulders");
    CView.text(".");
    const largestPreg = player.body.wombs.sort(Womb.LargestPregnancy).get(0)!;
    if (largestPreg.pregnancy && largestPreg.pregnancy.incubation > 0 && largestPreg.pregnancy.incubation < 200) CView.text("  Each of these raised legs carefully bend at the knee to accomodate your own pregnant belly that looms over their prone figures.");
    CView.text("  As each witch lays on her side both of them begin feeling your stiff cocks slap against their multiple pussies.  They moan as their four pairs of labia bloom in anticipation of the fucking to come.  Each set of nether lips are dark and dripping with gobs of desperation, but on each girl there's one set that looks particularly gaping as if the pressure inside was forcing it open.  It isn't difficult to figure out that those are the ones that lead to their already occupied wombs, while the other sets are the ones eagerly awaiting a fresh deposit of baby batter.");

    CView.text("\n\nYou feel supremely ready to fulfill those cum craving needs and you carefully align your cocks for the purpose.");
    // {if has two horse cocks}
    if (firstCockThatFits.type === CockType.HORSE && secondCockThatFits.type === CockType.HORSE) CView.text("  The wide flaring tips of your equine pricks press flatly against the pair of sweltering nether lips, but they easily part with only a little pressing.  The hot swollen folds eagerly slurp around the wide ridged crowns of your cock heads as you press against their vaginal entrances.  They're looser than most normal pussies, yet around such thick cock heads they nonetheless feel enjoyably tight.  With a slightly harsher shove forwards you easily impale both whorish witches.  Pleasured cries of shock escapes their lips as your horse-dongs bore through their depths.");
    // {else if two dog cocks}
    else if (firstCockThatFits.type === CockType.DOG && secondCockThatFits.type === CockType.DOG) CView.text("  Your canine pricks easily part the obscenely wet folds of the girls' labia.  Each woman's juices drip down your smooth shafts as you begin pressing their pointed heads into their tight entrances, eliciting pleasured and desperate pleas for more from each of them.  A gentle thrust of your pelvis and both pussies become simultaneously impaled upon your doggy dicks, giving you complete control over the hormonal witches.");
    // {else if two tentacle cocks}
    else if (firstCockThatFits.type === CockType.TENTACLE && secondCockThatFits.type === CockType.TENTACLE) CView.text("  Your green tentacle formed cocks stiffen yet weave their ways around the various pussies in front of you.  Their dark fuchsia heads almost seem to have a mind of their own as they trace the outlines of each pussy, teasing the poor hormonal witches into even higher states of sexual desperation. Pussy juice squirts from the anxious cunts with each teasing slide along their labia.  Satisfied with the pleasured taunting your prehensile cocks get down to business, darting into each slutty snatch like snakes striking at prey.  You feel each girl's entrance brutally stretch to accommodate your shafts as they deeply worm a path into each girl's vaginal orifice, causing both to scream in frantic bliss.");
    // {else if two demon dicks}
    else if (firstCockThatFits.type === CockType.DEMON && secondCockThatFits.type === CockType.DEMON) CView.text("\n\nThe big bumps and nodules that line the rims of each of your demonic cockheads feel particularly wonderful as they force their way between the dark, swollen folds of each witch's as yet unseeded pussy.  Both girls whimper and yelp in pleasure as the demonic ridges and soft protrusions along your shafts tease and taunt the erogenous zones of the inner walls of their cunts.  Your blighted cocks seem to swell even larger specifically to ensure the tightest fit possible within these two girls and it isn't long before each girl is leaking copious amounts of pussy juice around each cock as the highly textured shafts double time the twin twats.");
    // {else all other cocks and combinations}
    else CView.text("\n\nYou press a cock-head against each wet pair of swollen labia, separating the dark folds as your pricks seek the entrances within.  A slurping sensation spreads over each head as your dicks achieve their goal; spearing the respective entrances of these hormonally overwrought sluts.  Your shafts effortlessly slide in to the wanton pussies, forcing each whorish witch to blissfully cry out from the pleasure they've been so desperately seeking.  Their inner walls clamp around each of your shafts as the muscles in their bodies tremble from the sensations.");
    // {if player has 4+ cocks}
    if (player.body.cocks.length >= 4) CView.text("  Eyeing their puckered little assholes squashed in between the asses that are already pushed against each other, you align two other cocks, neatly allowing precum to lube their tight holes, and begin pushing your extra dongs into their backdoors.  One girl bites her lip from the tight fit while the other yelps as if she's experienced it before.");

    CView.text("\n\nWith yourself so nicely embedded within the doubly busty pair of pregnant sluts you begin to fuck in earnest.  Easy tilting of your hips allows your shafts to thrust with ease repeatedly into the wet and dripping pair of cunts.  Each girl's juices drip down your shafts and wet your thighs as you fuck them progressively deeper.");
    // {if cocks > 12 inches and < 20 inches}
    if (firstCockThatFits.length < 20 && secondCockThatFits.length < 20) CView.text("\n\nFinally, you penetrate them far enough to feel the thresholds of their wombs pressing back against your throbbing cock heads.  Each girl cries out in exquisite pain as you pound against their cervixes, yet both protest if you pull back.  Giving in to their needs you fuck and thrust away as hard as you can, and it isn't long until your shafts are tingling with the sensations of imminent release.");
    // {if cocks >= 20}
    else CView.text("\n\nWith one thrust at a time you slowly delve inch by strangled inch deeper into the tight tunnels of each girl's womanhood.  You eventually manage to brush up against the deep and tight entrances to each one's womb, and both cry out in pleasured pain as you pound against their inner thresholds.  With plenty of length to spare, your cocks fill each cunt's passage completely, and the witches' begging pleas for more despite the momentary jolts of pain leaves you no choice but to try to ram yourself into their actual wombs.  Leaning forward with their upright legs pressed tightly against your torso, you place more of your body weight behind each cock.  The girls cry out in joyous agony as they each feel their cervixes stretch and both wombs become impaled.  Their bodies suck in more cock than any normal woman ever could, allowing you to use their abdomens as living cock sleeves to fuck.  With such an opportunity you eagerly begin doing just that, thrusting repeatedly into their wombs.  Their cervixes feel like a second pussy within their first, and it isn't long before [eachCock] feels on the verge of climax.");

    CView.text("\n\nThe eight milk-filled breasts of the two preggo sluts wobble lewdly as each witch's body shakes from your thrusting.  Milk spurting nipples plaster the floor with their cream.");
    // {if player lactates}
    if (player.lactationQ() >= 200) CView.text("  Your own breasts begin spraying down the two pregnant sluts with your own dairy fluids.");
    // {if player has large but not huge breasts}
    if (player.body.chest.sort(BreastRow.Largest).get(0)!.rating >= 5 && player.body.chest.sort(BreastRow.Largest).get(0)!.rating < 20) CView.text("  Each thrust in to the eager cunts causes your breasts to bounce up and down.");
    else if (player.body.chest.sort(BreastRow.Largest).get(0)!.rating >= 20) CView.text("  Each thrust in to the eager cunts causes your massive breasts to sway back and forth, slapping against your own sides.");
    // {if player has six huge breasts}
    if (player.body.chest.length >= 3) {
        if (player.body.chest.get(2)!.rating >= 20) CView.text("  Your lower beach ball sized breasts are large enough to rest on the floor to either side as you fuck, and both witches eventually lower the legs they've had raised so as to hook them around your massive mammaries and hug your flesh even closer to their thighs.");
    }
    if (player.body.balls.count > 0) CView.text("  The closer your shafts come to their climax the more tense your balls become, preparing to pump their loads through your cocks.");

    CView.text("\n\nEvery other witch in the room is fingering herself off as they watch you recklessly pound their sisters.  Finally ready, you decide to let them see what they're missing as you plunge your cocks as deep as they'll go, and finally cum your brains out.  Your shafts swell as your seed surges upwards from their bases towards the tips that you've buried so expertly inside the milky whores.");
    // {if cumNormal or Medium}
    if (player.cumQ() < 500) CView.text("  The pair of girls yelp as they feel the hot seed splash forth inside them.  Millions of sperm swim in to their fertile wombs, seeking to turn them into doubly pregnant sluts.");
    // {else if cumHigh}
    else if (player.cumQ() < 1000) CView.text("  The slutty pair of milk bags cry out in sensual surprise as they feel extraordinary amounts of cum pumping directly into their baby makers, knocking them up with the double pregnancy they've desperately wanted. Their bellies bulge with all of the cum you've deposited within them.");
    // {else if cumVeryHigh}
    else if (player.cumQ() < 3000) CView.text("  The two piles of tits and bellies scream in pleasured insanity as their empty wombs are assaulted with a surging torrent of jizz.  You can feel the heavy blasts of cum surging within your shafts as they flood forth in to slutty orifices that have swallowed your manhoods.  Your brain burns with ecstasy as your genitals pump each womb over and over again, forcing them to swell far beyond what they're intended to take from cum alone.  By the time your cocks feel satisfied each witch looks as if she's already full term with a second child, the cum filled womb creating a distinct second orb next to the first pregnancy.");
    // {else if cumExtreme}
    else CView.text("  The eyes of every witch in the room open wide in shock as they watch their sister's bellies swell obscenely.  Your cocks feel as if they're trying to wrest control of your body from you as liters of hot sperm pump forcefully directly in to the extra fertile wombs of each slutty witch.  The two quad-breasted whores convulse in brain damaging pleasure, causing their huge milk filled tits to quake and bounce everywhere. A white flood of ejaculate erupts from their pussies around your cocks as their overfilled wombs fail to contain your bounty of baby batter.");
    // {if player has 4+ cocks ie; did anal}
    if (player.body.cocks.length >= 4) CView.text("  Streams of cum drip from their abused anuses as you finish them off.");

    // {if cumNormal through cumHigh}
    if (player.cumQ() < 1000) {
        // {non-snake body}
        if (!player.body.legs.isNaga()) CView.text("\n\nOn weakened legs ");
        // {serpent body}
        else CView.text("\n\nWith your weakend snake body ");
        CView.text("you push yourself up, allowing your cocks to slide out of the cum thirsty cunts of the pregnant witches.  Spilt jizz plasters their legs and pussies, leaving them looking as if they've just been fucked by several men instead of one.  Their sisters mew with disappointed eyes that it was not their pussies you chose to seed, but there's nothing for it.  Perhaps you'll return soon to tend to their breeding addictions once you've handled more important business.");
    }
    // {if cumVeryHigh through cumExtreme}
    else CView.text("\n\nThe excessive quantities of cum allow you to easily slide your shafts out of the wanton holes.  A pool of your jizz surrounds your [feet] and the legs of the witches.  Several sensitive strokes of your cocks allow you to blast a few more loads across the two piles of tits that call themselves witches.  The splashes of cum thoroughly soak them, and the rest of the pregnant horny sand witches descend upon the two girls, licking and scrapping at the coatings of cum in the desperate hopes that they might be able to scoop some into their own secondary, empty wombs.  The horde of quad-breasted pregger witches proceeds to wrestle with each other in a pile of tits and cum.");
    player.orgasm();
    player.stats.sens += -2;

    return { next: playerMenu };
}
