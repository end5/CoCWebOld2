import { Character } from 'Engine/Character/Character';
import { Flags } from 'Engine/Flags';
import { Time } from 'Engine/Utilities/Time';
import { CView } from 'Engine/Display/ContentView';
import { NextScreenChoices } from 'Engine/Display/ScreenDisplay';
import { describeFeet } from 'Content/Descriptors/LegDescriptor';
import { passTime } from 'Content/Scenes/PassTime';
import { humanRaceScore } from 'Content/Body/RaceScore';
import { randInt } from 'Engine/Utilities/SMath';
import { BreastRow } from 'Engine/Body/BreastRow';
import { describeAllBreasts, describeChest, describeNipple } from 'Content/Descriptors/BreastDescriptor';
import { describeButt, describeButthole } from 'Content/Descriptors/ButtDescriptor';
import { describeBalls } from 'Content/Descriptors/BallsDescriptor';
import { describeVagina } from 'Content/Descriptors/VaginaDescriptor';
import { describeCocksLight, describeCock, describeEachOfYourCocks, describeOneOfYourCocks } from 'Content/Descriptors/CockDescriptor';
import { Cock } from 'Engine/Body/Cock';
import { describeHair } from 'Content/Descriptors/HairDescriptor';
import { skinFurScales } from 'Content/Descriptors/SkinDescriptor';
import { barTelAdre } from 'Content/Scenes/Places/TelAdre';

export const AuntNancyFlags = Flags.register("AuntNancy", {
    UNKNOWN_FLAG_NUMBER_00263: 0,
    UNKNOWN_FLAG_NUMBER_00264: 0,
    UNKNOWN_FLAG_NUMBER_00266: 0,
    UNKNOWN_FLAG_NUMBER_00265: 0,
});

// NECESSARY FLAGS:
// 263 - Met nancy
// 264 - Nancy relationship level
// 265 - Talk Nancy
// 266 - Times boned

// [Introduction Blurb:
// (appears in the Wet Bitch between 6:00 and 14:00)]
export function auntNancy(display: boolean = true): boolean {
    if (Time.hour >= 6 && Time.hour <= 14) {
        if (display) {
            CView.text("\n\nYou see a rather buxom woman with short, white hair in a neck- and sleeve-less black dress cleaning glasses with her bar towel.  She makes the task look simple, moreso because she has two pairs of arms, wrapped in what look like shiny black gloves.");
            // [If MetNancy = 0]
            if (AuntNancyFlags.UNKNOWN_FLAG_NUMBER_00263 === 0) CView.text("  She");
            else CView.text("  Aunt Nancy");
            CView.text(" glances up at you and smiles as you enter");
            // [(if unmet)
            if (AuntNancyFlags.UNKNOWN_FLAG_NUMBER_00263 === 0) CView.text(", and you see that she has additional red eyes spread across her forehead");
            CView.text(".");
        }
        return true;
    }
    else return false;
}

export function interactWithAuntNancy(player: Character): NextScreenChoices {

    // [Interaction 2]
    // [If Time = 1400, Relationship with Aunt Nancy >= 30, and PillowTalk= 0]
    if (AuntNancyFlags.UNKNOWN_FLAG_NUMBER_00264 >= 30 && Time.hour === 14 && AuntNancyFlags.UNKNOWN_FLAG_NUMBER_00266 === 0) {
        CView.text("As you enter the bar, looking forward to spending some time with Aunt Nancy, you see that she is cleaning up and getting ready to leave.  She spots you with one of her eyes and smiles, waving you closer with a single hand as the other three set glasses under the bar.\n\n");

        CView.text("\"<i>Afternoon, friend!</i>\" she says, cheerily.  \"<i>You've certainly been coming in a lot, and I can't say I don't appreciate your company.</i>\"  Aunt Nancy looks you over a little, smiling a little more wistfully and melancholically now.  \"<i>You remind me a little of my husband,</i>\" she admits, finishing up and skittering out from behind the bar on her many legs as the afternoon shift bartender takes her place.  \"<i>It's... nothing I can put my finger on.  Just, you have a certain... <b>quality</b> to you.</i>\"\n\n");

        CView.text("Aunt Nancy sighs.  \"<i>Sorry. I don't mean to bore you with an old woman's rambling.  I... I just miss him, so much, and I get a little... lonely, sometimes.</i>\"  She looks at you, with a strange, half-hungry, half-desperate look in her eyes.  \"<i>Would you mind... coming home with me?  You seem a little tense, and I'd like to give you a massage.</i>\"\n\n");
        // [Gain 20 Lust.] (I remain steadfastly unaroused; maudlin self-pity isn't sexy.  -Z)
        player.stats.lust += 10;

        return { choices: [["Agree", timeForAuntNancySpiderCooch], ["Decline", declineAuntNancyMassage]] };
    }
    // [If Time >= 1400 - (100*(Relationship with Aunt Nancy/30), Relationship with Aunt Nancy >= 30, and PillowTalk= 1]
    else if (AuntNancyFlags.UNKNOWN_FLAG_NUMBER_00264 >= 30 && Time.hour >= (14 - (AuntNancyFlags.UNKNOWN_FLAG_NUMBER_00264 / 30)) && AuntNancyFlags.UNKNOWN_FLAG_NUMBER_00266 > 0) {
        CView.text("Aunt Nancy looks up as you walk over to her, and her eyes light up.  Happily, she greets you with a prim little hand atop yours, a bit of evidence of the intimacy you've shared.\n\n");

        CView.text("\"<i>Couldn't stay away, could you friend?</i>\" she asks, quietly, a sexy smile on her lovely face.  \"<i>What'll it be? Do you want a drink...</i>\"  The spider-lady leans her white-haired head next to your ear conspiratorially, and whispers, \"<i>Or, do you want me to get off early and give you a little... massage?</i>\"  You shiver at her words.\n\n");
        // [Choice: Strong, Light, Agree, Decline]
        return { choices: [["Strong", strongStuff], ["Light", lightStuff], ["Agree", timeForAuntNancySpiderCooch], ["", undefined], ["Back", declineAuntNancyMassage]] };
    }
    // [Interaction 1]
    // If Relationship with Nancy < 30
    else {
        CView.text("You decide to talk with the bartender, and walk right up to the bar.  She sees you coming, and folds her towel up with her first pair of hands, while putting the glass she was polishing away with the other.\n\n");

        CView.text("\"<i>Welcome to the Wet Bitch.  My name's Aunt Nancy, and I'll be your server this morning.</i>\"  She smiles.  \"<i>Well, what'll it be, friend?</i>\" the bartender asks, her voice rich and velvety rather than cute as she leans on the bar, giving you a good look at her cleavage.  \"<i>Bit early in the day for the strong stuff, I reckon.</i>\"\n\n");
        // [If MetNancy < 1, MetNancy += 1]
        if (AuntNancyFlags.UNKNOWN_FLAG_NUMBER_00263 < 1) AuntNancyFlags.UNKNOWN_FLAG_NUMBER_00263 = 1;
        // [Choice: Strong, Light]
        return { choices: [["Strong", strongStuff], ["Light", lightStuff], ["", undefined], ["", undefined], ["Leave", barTelAdre]] };
    }
}

// [Strong:]
function strongStuff(player: Character): NextScreenChoices {

    // [Lose 5 Gems.]
    if (player.inventory.gems < 5) {
        CView.text("You start to ask for a strong drink and then remember you can't afford it.");
        // Do next
        return { next: interactWithAuntNancy };
    }
    player.stats.tou += 1;
    player.stats.int += -1;
    player.stats.lust += 15;

    player.inventory.gems -= 5;

    CView.text("You ask for a strong drink anyway, and Aunt Nancy nods.  Easily, she picks up a glass with one hand, reaches out with another two, and fills it with something greenish.\n\n");

    CView.text("The bartender sees your gaze and smiles.  \"<i>Heavy mead,</i>\" she explains, hefting it.  \"<i>We make it from honeybee honey.  Have a taste, friend.</i>\"\n\n");

    CView.text("You pay a few gems and take a sip.  The alcohol burns a bit, but it tastes deliciously, achingly sweet, and before you know it the glass is empty.\n\n");

    // [(If Toughness is >= 30)]
    if (player.stats.tou >= 30) {
        CView.text("It was good, but it seems to have gone straight to your head with surprising speed, giving you a pleasant buzz after only one glass. It might be a prudent idea to walk it off before you get another.  You thank Aunt Nancy for the drink, before climbing to your " + describeFeet(player) + " and leaving.  She eyes you respectfully as you go.");
        // [+10 Relationship with Aunt Nancy]
        AuntNancyFlags.UNKNOWN_FLAG_NUMBER_00264 += 10;
    }
    // [Else]
    else {
        CView.text("Wow, that one took it out of you.  You're pretty sure you don't want to try to have another.  Feeling a little wobbly, you thank the bartender for the drink, and unsteadily stagger out of the shop.  As you leave, you hear Aunt Nancy giggling, and out of the corner of your eye, you see her bunched up, one hand over her mouth as she chuckles, amused at your inability to hold your liquor.");
        // [+5 Relationship with Aunt Nancy]
        AuntNancyFlags.UNKNOWN_FLAG_NUMBER_00264 += 5;
    }
    return { next: passTime(1) };
}

// [Light:]
function lightStuff(player: Character): NextScreenChoices {

    // [Lose 5 Gems.]
    if (player.inventory.gems < 5) {
        CView.text("You start to ask for a light drink and then remember you can't afford it.");
        // Do next
        return { next: interactWithAuntNancy };
    }
    player.inventory.gems -= 5;
    player.stats.tou += .5;
    player.stats.int += -.5;
    player.stats.lust += 7;

    CView.text("You don't feel like throwing back a really heavy drink this early, come to think, and instead ask for something light.  Aunt Nancy nods and pours you something thin and bright yellow from out of a barrel behind her, giving you a good look at her from behind.  Her lower half seems to stick out behind her in a long stretch of black chitin, with several long, thick legs supporting it.");
    // [If Intelligence >= 20]
    if (player.stats.int >= 20) CView.text("  You realize that what look like almost-shoulder-length gloves over her hands must actually be shell-like portions of this exoskeleton.");
    CView.text("\n\n");

    CView.text("Once she gives you the drink, you take a tentative sip, and find it very sweet and refreshing, without seeming very strong or alcoholic.  It's very good, and you quickly have another.");

    // [If FirstTalkNancy = 0]
    if (AuntNancyFlags.UNKNOWN_FLAG_NUMBER_00265 === 0) {
        AuntNancyFlags.UNKNOWN_FLAG_NUMBER_00265++;
        CView.text("\"<i>So,</i>\" she says, settling one set of arms on the bar and supporting her head with the other, \"<i>what's your story, friend?  You have a certain...</i>\" Aunt Nancy waves with a hand. \"<i>look about you.  Like my late husband, Marae send him to his reward.  You're an... adventurer, I take it?  You live off the land, fighting monsters for gems, scavenging all your equipment off what you can find or put together yourself?</i>\"\n\n");

        CView.text("You nod, hesitantly, remembering that here, at least, you're in no danger from demons.\n\n");

        CView.text("\"<i>Wonderful!</i>\" she says enthusiastically, spreading her upper set of arms. \"<i>I reckon that means that you've got quite a few stories on you, friend. Feel like sharing?</i>\" The drink, despite its low alcohol content, has still left you feeling a little chatty, and you eagerly tell her about your adventures.\n\n");
        /*[If Corruption < 30]
        You tell Aunt Nancy about a too-close experience you had once fighting with the tentacle beast in the woods. It swung at you with powerful blows and tried to snatch you up with its mighty tendrils, but you kept out of its reach and wore it down until it was almost too exhausted to keep fighting, knocking off a tentacle or two whenever it faltered. In the end, you managed to lure it into a trap, where it got stuck, and peppered it with arrows until it collapsed and began to fade to yellow, then brown, in death. You howled in victory, and tore the creature open to scavenge valuable gems from its, taken from its previous, less lucky victims.

        [If Corruption is 75 >= 30]
        You tell Aunt Nancy about a past run-in with a sand witch, how the creature and you started by trading blows before she stuck... something up your ass, something oddly pleasant that filled your body with need and sapped your will. In a rage, you fought back, throwing yourself against her defenses with all your might, until, on the very cusp of orgasm, you knocked her flat with a right hook to her head. As she lay on the ground, you, on fire with lust, simply took her. She fought for a bit, but, soon, she started really getting into it, before, finally, you both came, explosively, and you staggered off, helping yourself to her gear in the process.

        [If Corruption is >=75]
        You tell Aunt Nancy about a fight you once got into with a minotaur in the mountains. The beast was much stronger and better-armed than you, carrying a massive battle axe, but it was also sexually ravenous, and barely able to conceal its gigantic member and swollen testicles. You tempted the poor creature with flashes of your own most intimate places and flirty stares, inflaming its already overstimulated sexual instincts without even touching it, and always keeping just out of reach of its grasping hands and deadly axe. Ultimately, the minotaur simply collapsed, desperately trying and failing to vent the unthinkable pressure building in its swollen nuts, and you left it there, cruelly, with a smirk of evil satisfaction.

        (it would be better to limit these to things to things the PC is guaranteed to have encountered (the entrance to T'A if pure, Zetaz's intro if middling, or some tawdry flirting if corrupt), or else make up urbane shit about his reflections on the world. Failing that, I'd say cut them to avoid space-time paradox and internet bitchery, not last in line will be my own. -Z)
        */

        CView.text("You tell her of some of your recent exploits in the demon realm.  Like most stories in this strange land, it ends up focusing on the strange, perverted sexuality of the monsters that dwell here, but she doesn't seem to mind.\n\n");

        CView.text("The bartender listens, entranced, and reacts on all the right beats, her bosom bouncing on the particularly shocking ones.  When you're done, she smiles at you, and says, \"<i>Well, that was quite a tale.  Let me tell you one...</i>\"\n\n");

        CView.text("Aunt Nancy pours herself a glass of the same drink you're having, and gulps down a long pull.\n\n");

        CView.text("\"<i>Well,</i>\" she begins, \"<i>I wasn't always a bartender.  I grew up in a cave, after all.  My people used to get prey to wander into our webs so we could eat them, or you know,</i>\" the bartender smiles lustfully, \"<i>indulge ourselves, if they were cute.  That was how I met him.  He was one of the folk from another world, ");
        // [If PC is human:]
        if (humanRaceScore(player) >= 4) CView.text("like you,");
        else CView.text("like poor little Yara at the earring shop,");
        CView.text(" and, well, one thing led to another, and I ended up chasing him out into the wider world.</i>\"\n\n");

        CView.text("Aunt Nancy sighs, dreamily.  \"<i>Oh, the adventures we had together, friend!  We'd wrestle over ancient treasures, fight midst old ruins, argue over who actually finished off that omnibus, fuck like rabbits and then insist that the other one came first.</i>\"  She seems to be staring off into midair, a wistful smile on her face.  \"<i>Marae on earth, how I miss him.  It's been almost a decade now, since I last saw him.  Somedays, I still think he'll just... walk in here, with that cocky smile on his face and that shiny old magic sword over his shoulder and make a pun.</i>\"\n\n");

        CView.text("She takes another drink, melancholically, before shaking her head to clear it.  \"<i>Well, thank you for sharing some time with an old widow like me.</i>\"  She flutters her still-beautiful eyelashes at you once or twice, then chuckles.  \"<i>Come back some time.</i>\"\n\n");

        // [50% chance to gain 1-2 Intelligence, +20 Relationship with Aunt Nancy, FirstTalkNancy += 1]
        if (randInt(2) === 0) player.stats.int += 1 + randInt(2);

        AuntNancyFlags.UNKNOWN_FLAG_NUMBER_00264 += 20;
    }
    // [Else:]
    else {
        CView.text("As you sip your drink, you and Nancy swap adventuring stories for a while, enjoying one another's company in the fairly quiet bar.  The older spider-lady is a good conversationalist, and you feel a little closer for having shared some time with her.");
        // [50% chance to gain 1-2 Intelligence, +10 Relationship with Aunt Nancy]
        if (randInt(2) === 0) player.stats.int += 1 + randInt(2);

        AuntNancyFlags.UNKNOWN_FLAG_NUMBER_00264 += 20;
    }
    return { next: passTime(1) };
}

// [If Decline]
function declineAuntNancyMassage(player: Character): NextScreenChoices {

    CView.text("Aunt Nancy listens as you politely turn her down, and nods her head, the hungry look fading from her eyes.  \"<i>I understand completely.  Sorry to have bothered you.</i>\"  She starts to walk out of the bar, stops, and turns back to size you up again.  \"<i>Of course,</i>\" she says, \"<i>if you ever change your mind... just come by whenever my shift's over.</i>\"\n\n");

    CView.text("Aunt Nancy raises one of her black-covered hands in front of her mouth, and blows you a kiss before scuttling away.");
    // [Gain 20 Lust.]
    return { next: passTime(1) };
}

// [If Agree]
function timeForAuntNancySpiderCooch(player: Character): NextScreenChoices {

    CView.text("You look the still-beautiful spider-lady in the eye, and, half-mesmerized, nod in agreement.  She smiles broadly (and, you can't help but notice, quite lewdly) and puts one of her lower arms through one of yours, while putting the upper one on your shoulder.  \"<i>Well then,</i>\" Aunt Nancy says, \"<i>I suppose we should be off.</i>\"\n\n");

    CView.text("She leads you through the streets of Tel'Adre, weaving through crowds and back alleys, before you finally end up just outside a modest little adobe building tucked away in a side street.  Slowly, she wraps all four of her arms around you, giving you a gentle hug");
    if (player.body.chest.sort(BreastRow.Largest).get(0)!.rating >= 1)
        CView.text(" and taking the opportunity to grope your " + describeAllBreasts(player) + " right through your " + player.inventory.armor.displayName);
    CView.text(".\n\n");

    CView.text("\"<i>Come into my parlor,</i>\" she whispers into your ear, licking it gently before sticking the tip of her long tongue into the hole before pressing her soft lips against the lobe of it.\n\n");

    CView.text("Then, she lets go of you and skitters easily up to her door, opening it and slipping inside.");
    // [Gain 30 Lust, New Page]
    player.stats.lust += 29;
    player.stats.lust += 1;

    return { next: auntNancyPoonPartII };
}
function auntNancyPoonPartII(player: Character): NextScreenChoices {

    CView.text("Slowly, you follow Aunt Nancy into her home. Inside, the building is fairly dark and gloomy, even in the middle of the day, with thick curtains of unidentifiable white matter keeping most of the sun outside. Blinded, your vision still attuned to the bright desert, you can discern little of the house's insides before you hear a sudden skittering sound behind you and, as you turn to face it, are pushed further into the gloom. Your heel is caught by a thick strand of what feels like rope, and you fall flat onto your back, arms and legs splayed out to either side of you, as you land on some sort of taut net.\n\n");

    CView.text("You try to climb back up, only to find that your flesh and " + player.inventory.armor.displayName + " alike are caught fast against the adhesive matter of the net, which, you suddenly realize, is actually a thick web, spread across the house's floor. You feel a surge of panic and begin to pull and struggle, when suddenly you feel a smooth, cool hand on your face. Your night vision is beginning to recover, and you make out Aunt Nancy's face, her pale skin seeming to glow in the gloom, as she leans over you, staring into your eyes with hers, one finger trailing across your face before covering your lips in a gesture for quiet.\n\n");

    CView.text("With her other three hands, the spider-lady lights a match and ignites a little lantern, which she raises to hang from the wall.  In the little area it illuminates, you can see that Aunt Nancy has removed her neck-less black dress, letting her impressive bosom bounce modestly as she works, and catch a glimpse of her unusual genitals before she turns to face you again.\n\n");

    // [If PillowTalk = 0]
    if (AuntNancyFlags.UNKNOWN_FLAG_NUMBER_00266 === 0) CView.text("\"<i>It's... been a long, long time,</i>\" murmurs Aunt Nancy, her throaty voice washing over you, as two of her hands rest on your " + describeChest(player) + " and the other two wrap carefully around your shoulders and neck, gently rubbing you in the promised massage.  She's crawling along the web, her many feet easily avoiding the sticky parts, and her face is mere inches from yours.  You can smell her sweet, slightly alcohol-scented breath as her many eyes look down at you.  \"<i>I haven't... been with anyone since I lost my husband, and... well... I... I need this.  Will you please be with me, if only for a little while?</i>\"\n\n");
    else CView.text("\"<i>Are you ready for me, friend?</i>\" murmurs Aunt Nancy, her throaty voice washing over you, as two of her hands rest on your " + describeChest(player) + " and the other two wrap carefully around your neck and shoulders, gently rubbing you in the promised massage. She's crawling along the web, her many feet easily avoiding the sticky parts, and her face is mere inches from yours. You can smell her sweet, slightly alcohol-scented breath as her many eyes look down at you.  \"<i>I certainly am, little fly.</i>\"\n\n");

    CView.text("Quietly, mesmerized by her needy red eyes, you nod.  Aunt Nancy smiles demurely.  \"<i>Good,</i>\" she purrs, and lowers her lips to yours.  You weren't quite sure what to expect, but her lips are soft and gentle as she presses them on you.  Her tongue gently snakes into your mouth, wrapping around yours with ease, and her sweet-tasting saliva is soon sliding down your throat.  Instantly, you feel your body loosening up, and ");
    // [Intelligence > 40]
    if (player.stats.int > 40) CView.text("realize that the spit must contain some kind of chemical originally meant to still prey");
    else CView.text("question whether or not the spider-lady's kiss is responsible");
    CView.text(".\n\n");

    CView.text("As you unwind at her touch, her many arms are working to strip away your " + player.inventory.armor.displayName + ", gently peeling them away with care until you are naked and needy in the spider-lady's web.\n\n");

    CView.text("You are soon hanging in utter relaxation, idly wondering whether the ongoing massage Aunt Nancy's many hands are still performing all over your " + describeChest(player) + ", " + describeButt(player) + ", back, and neck, or the loving, strange kiss of her lips and long, curling tongue is more responsible.  Ultimately, however, she pulls her white-haired head away from yours, and removes her many hands from your trunk.  Smiling at your sudden unhappy look, Aunt Nancy begins to kiss her way down your body, first along the curve of your neck, sliding her long, moist tongue against your chest as you shiver in pleasure at the sensation and pressing her soft lips against your " + describeNipple(player, player.body.chest.get(0)) + "s and nibbling gently on them to enjoy your moans of delight, before moving her head down your belly");
    if (player.body.tails.length > 0) CView.text(" to the top of your tail");
    CView.text(".\n\n");

    // [If a naga]
    if (player.body.legs.isNaga()) CView.text("Gently, she peels away the fold of skin that disguises your genitals, now moist-and-dripping with anticipation.  ");
    CView.text("Aunt Nancy licks her lips, a hungry look in her many eyes as she look down at you, clearly quite pleased by what she sees.\n\n");

    // [If you have balls:]
    if (player.body.balls.count > 0) {
        CView.text("She smiles at the sight of your " + describeBalls(true, true, player) + ", gently raising two of her hands to fondle and squeeze them as her soft lips press against them, ");
        // [If BallSize allows]
        if (player.body.balls.size < 15) {
            if (player.body.balls.size > 5 && player.body.balls.size < 15) CView.text("taking one");
            else CView.text("both of them");
            CView.text(" into her mouth to soak in her saliva as she wraps and caresses ");
            if (player.body.balls.size <= 5) CView.text("them");
            else CView.text("it");
            CView.text(" with her long, dextrous tongue.\n\n");
        }
        else CView.text("kissing and licking at them with those moist, relaxing lips.\n\n");
    }

    // [If you have a vagina:]
    if (player.body.vaginas.length > 0) {
        CView.text("The spider lady ");
        if (player.body.balls.count > 0 && player.body.cocks.length > 0) CView.text("lifts away your other \"<i>equipment</i>\" and ");
        CView.text("examines the folds of your " + describeVagina(player, player.body.vaginas.get(0)) + ".  You shiver at the sensation of one of her smooth, cold hands rubbing against your folds, the tips of her fingers sliding into you.  Aunt Nancy smiles up at you, enjoying your reaction.  \"<i>Did you like that?</i>\" she asks with her deliciously throaty voice, and you nod enthusiastically.  \"<i>Good...</i>\" she purrs, before slipping her long, slippery tongue inside of you.  You cry out in sudden surprise at the sudden feeling of it moving inside of you, exploring your shape, before she pulls it out as you squirm.  \"<i>Mmmmmm...</i>\" Aunt Nancy murmurs.  \"<i>You taste goood, friend.</i>\"\n\n");
    }
    // [If you have a penis:]
    if (player.body.cocks.length > 0) {
        CView.text("Aunt Nancy gently caresses your " + describeCocksLight(player) + " with her smooth black hands, enjoying your moans of delight, before lowering her head to kiss the head of your " + describeCock(player, player.body.cocks.get(0)) + ".  Her tongue snakes around it, and the spider-lady sucks a little, drinking up the little stream of pre-cum now leaking out, before raising her head up to look at you, a gentle smile on her face as her many hands continue to rub and explore your " + describeCocksLight(player) + ".  \"<i>Not as good as my husband's,</i>\" she whispers, \"<i>but quite a piece, certainly.</i>\"\n\n");
    }
    // [If you have no genitals at all:]
    if (player.gender === 0) CView.text("\"<i>Well, well, well,</i>\" murmurs Aunt Nancy, intrigued by what she sees.  \"<i>Very unorthodox, but we'll see what we can do.</i>\"  She pauses to lick the fleshy expanse where your genitals used to be.\n\n");

    // [All:]
    CView.text("Two of her hands suddenly wrap themselves around the cheeks of your " + describeButt(player) + ", and squeeze gently.  \"<i>Very nice,</i>\" the spider-lady whispers, and then her long tongue spools out to slide over the surface of your " + describeButt(player) + ".  The tip of it even slips inside, gently, and you feel her saliva coating the inside of your bum.  It feels sensitive, and much more relaxed now than a minute ago.\n\n");

    const shortestCock = player.body.cocks.sort(Cock.Shortest).get(0);
    if (shortestCock) CView.text("Aunt Nancy rises up above you, still smiling with gentle sensuality, and reaches out.  ");
    // [If you have at least one dick, she always takes the smallest so as to avoid missing out on another scene later:]
    if (shortestCock) {
        CView.text("Gently, she picks " + describeEachOfYourCocks(player) + ", and brings it up to her pussy. You see its entrance, two parted shell-plates dripping wet fluid, and would almost panic at the unfamiliar sight if you weren't so very relaxed.  With loving guidance, Aunt Nancy slides the full length of your " + describeCock(player, shortestCock) + " deep inside of her.  Both of you moan in delight as your dick rubs and stimulates her in a way she's clearly been missing for a long, long while; her exotic insides, smooth and silky and deep, squeeze and caress your " + describeCock(player, shortestCock) + " like a velvet glove.  Little feelers inside of her begin to massage your cock, and the wet, dripping fluids inside of her are just as relaxing as her saliva.\n\n");

        CView.text("\"<i>Oooooh,</i>\" she sighs dreamily, her eyes temporarily distant and unfocused.  \"<i>Marae on earth, that hits the spot.</i>\"\n\n");
        const longestCock = player.body.cocks.sort(Cock.Longest).get(0);
        let titFucked: boolean = false;
        // [If your longest dick is of at least auto-titfucking size:]
        if (longestCock && longestCock !== shortestCock) {
            if (longestCock.length >= 22) {
                titFucked = true;
                CView.text("As Aunt Nancy rides you enthusiastically, the spider-lady lifts ");
                if (player.body.cocks.length > 2) CView.text("another one of ");
                CView.text("your ");
                if (player.body.cocks.length === 2) CView.text("other cock ");
                else CView.text("cocks ");
                CView.text("up to her heaving bosom, and slips it between her soft, lovely breasts.  \"<i>Want something else nice?</i>\" asks the spider-lady, eyes twinkling.\n\n");

                CView.text("Still rising and falling atop your body as she rides you, Aunt Nancy grips her breasts with two of her black-shelled hands and begins to slide them up and down on either side of your tall, dripping " + describeCock(player, longestCock) + ", ");
                if (longestCock.length >= 30) CView.text("letting its head slip into her mouth, where she sucks and licks at it hungrily, ");
                else CView.text("letting her long, dexterous tongue dangle down from her mouth to wrap around the head of her dick, occasionally licking at her own impressive bosom as well, ");
                CView.text("all the while staring down into your eyes.\n\n");

                CView.text("The sensation, both of her soft, pillowy bosom wrapped around your " + describeCock(player, longestCock) + " and of her skillful tongue");
                // [If CockDescript (Longest Cock) is long enough for auto-fellatio]
                if (longestCock.length >= 30) CView.text(" and mouth");
                CView.text(", is incredible.  Aunt Nancy coos happily, clearly enjoying the taste.\n\n");
            }
            // [If there are still dicks left over:]
            if (player.body.cocks.length > 2) {
                if (player.body.cocks.length === 3) CView.text("Another of her hands wraps itself around your other cock");
                else CView.text("Her other hands wrap themselves around more of your cocks");
                CView.text(", milking and stroking the ");
                CView.text("pulsating prick");
                if (player.body.cocks.length > 3) CView.text("s");
                CView.text(" for all ");
                if (player.body.cocks.length === 3) CView.text("it's");
                else CView.text("they're");
                CView.text(" worth.\n\n");
            }
        }

        // [If PC is lactating, and there are no dicks of autotitfucking size available:]
        if (!titFucked && player.body.chest.sort(BreastRow.LactationMost).get(0)!.lactationMultiplier >= 1) {
            CView.text("As milk leaks slowly from your " + describeNipple(player, player.body.chest.get(0)) + "s, the spider-lady notices.  She lowers her head and wraps her soft, lovely lips around the tip of one of your " + describeAllBreasts(player) + ", sucking gently and frantically flicking her tongue against your " + describeNipple(player, player.body.chest.get(0)) + ".  You moan and lie back into the web, the multitude of sexual pleasures assaulting your senses almost more than you can bear as Aunt Nancy begins swallowing up your milk.\n\n");
        }
        // [If no cocks are of titfucking size and # Cocks <= 4 or if there are cocks of titfucking size and # Cocks <= 3 (If Nancy still has free hands)]
        if (!titFucked || (titFucked && player.body.cocks.length <= 2)) {
            CView.text("Her remaining hands gently work their way across your body, alternating between rubbing and squeezing your " + describeButt(player) + ", even sometimes slipping fingers inside to probe the insides, ");
            // [If the player has balls]
            if (player.body.balls.count > 0) CView.text("gently kneading and caressing your " + describeBalls(true, true, player) + " as the cum inside churns and boils and ");
            // [If the player has a vagina]
            else if (player.body.vaginas.length > 0) CView.text("exploring the folds and creases of your " + describeVagina(player, player.body.vaginas.get(0)) + " and ");
            CView.text("massaging your " + describeChest(player) + ".  Occasionally, they stroke through your " + describeHair(player) + ".\n\n");
        }
    }
    // [If player has vagina but no dicks: (Nancy prefers dicks and will always choose them over lesbian sex)]
    else if (player.body.vaginas.length > 0) {
        CView.text("Gently, Aunt Nancy leans down to stroke your face as two of her other hands reach out and begin caressing your chest, while a fourth explores the outer folds of your " + describeVagina(player, player.body.vaginas.get(0)) + ".  \"<i>Such a pretty little fly,</i>\" the spider-lady whispers as she stares at your face, her bright red eyes full of longing.   She presses her face against the side of your head, and you gently turn it to allow her access to your ear, which she quickly slips her tongue into again, enjoying the feeling as you quiver and yelp beneath her.\n\n");

        CView.text("With your face turned, you suddenly spot a once-well-made dildo lying on the floor beneath the web.  You see that it has been worn down as smooth as an apple rind and probably much thinner than it was before, and you suddenly wonder just how pent up the widow's sexual desires really are.\n\n");

        CView.text("Such thoughts are interrupted when you suddenly feel Aunt Nancy's fingers on the lower half of your body again, caressing your ");
        if (player.body.tails.length > 0) CView.text("tail before rising to your ");
        CView.text(describeVagina(player, player.body.vaginas.get(0)) + " and " + describeButt(player) + ".  Aunt Nancy turns your head to face hers, and rises up onto her legs again as her fingers begin to sink deep into your " + describeVagina(player, player.body.vaginas.get(0)) + " and your " + describeButthole(player.body.butt) + ".  You moan, loudly and long at the sensation, and Aunt Nancy smiles lewdly, her other hands still exploring and squeezing your " + describeChest(player) + ", rubbing and kneading them softly and occasionally pinching and pulling at your " + describeNipple(player, player.body.chest.get(0)) + "s.\n\n");

        CView.text("Suddenly, you realize that your left hand is now free, courtesy of one of Aunt Nancy's smooth, gentle arms.  She whispers, quietly, \"<i>A little for me too, please.</i>\"  Realizing exactly what she means, you press the " + skinFurScales(player) + " of your hand against her pussy.  Its entrance, two parted shell-plates dripping wet fluid, would almost be scary if you weren't so very relaxed.  Gently, your press your fingers into her body, and hear her moan, loudly, feel her own hands scrabbling inside of your " + describeVagina(player, player.body.vaginas.get(0)) + " and " + describeButthole(player.body.butt) + ", pawing your chest and " + describeButt(player) + ", trailing through your " + describeHair(player) + ".\n\n");

        CView.text("It feels wonderful.  You lie back and moan, enjoying the smooth, silky insides of her pussy, feeling tiny feelers occasionally caress and pull at your fingers inside of her.\n\n");
        // [If PC is lactating:]
        if (player.body.chest.sort(BreastRow.LactationMost).get(0)!.lactationMultiplier >= 1) CView.text("As milk leaks slowly from your " + describeNipple(player, player.body.chest.get(0)) + "s, the spider-lady notices. She lowers her head and wraps her soft, lovely lips around the tip of one of your " + describeAllBreasts(player) + ", sucking gently and frantically flicking her tongue against your " + describeNipple(player, player.body.chest.get(0)) + ".  You moan and lie back into the web, the multitude of sexual pleasures assaulting your senses almost more than you can bear as Aunt Nancy begins swallowing up your milk.\n\n");
    }
    // [If the PC has no genitals at all:]
    else {
        CView.text("Gently, Aunt Nancy leans down to stroke your face as two of her other hands reach out and begin stroking your " + describeChest(player) + " while a fourth explores the smooth, fleshless expanse where your genitals once were.  \"<i>Such a pretty little fly,</i>\" the spider-lady whispers as she stares at your face, her bright red eyes full of longing.  She presses her face against the side of your head, and you gently turn it to allow her access to your ear, which she quickly slips her tongue into again, enjoying the feeling as you quiver and yelp beneath her.\n\n");

        CView.text("With your face turned, you suddenly spot a once-well-made dildo lying on the floor beneath the web.  You see that it has been worn down as smooth as an apple rind and probably much thinner than it was before, and you suddenly wonder just how pent up the widow's sexual desires really are.\n\n");

        CView.text("Such thoughts are interrupted when you suddenly feel Aunt Nancy's fingers on the lower half of your body, caressing your " + describeButt(player) + " before rising again to your lack of genitals.\n\n");

        CView.text("Smiling at the puzzle before her, Aunt Nancy gently runs her hands over your " + describeNipple(player, player.body.chest.get(0)) + "s and " + describeHair(player) + " as she thinks over how best to make love to you.  Gently, her white-haired head returns to your " + describeButt(player) + ", and her long tongue snakes out again, sliding between its lobes.  As you relax, it slips inside of you, just far enough for you to moan at the nigh-sexual pleasure of total relaxation.  The spider-lady removes her tongue from your anus, much to your dissatisfaction, and carefully wipes it off on a nearby bit of cloth before returning it to her mouth, then, smiling up at your petulant expression, slips a few of her fingers into your now-loose and sensitive " + describeButthole(player.body.butt) + ".\n\n");

        CView.text("Aunt Nancy climbs back atop you as you moan at the welcome new sensation, licking at your chest as she does.  \"<i>Bet you didn't think I could do it,</i>\" she purrs to you, as you enjoy the many, many sensations working at you.\n\n");

        CView.text("Suddenly, you realize that your left hand is now free, courtesy of one of Aunt Nancy's smooth, gentle arm.  She whispers, quietly, \"<i>A little for me too, please.</i>\"  Realizing exactly what she means, you press the " + skinFurScales(player) + " of your hand against her pussy.  Its entrance, two parted shell-plates dripping wet fluid, would almost be scary if you weren't so very relaxed.  Gently, your press your ingers into her body, and hear her moan, loudly, feel her own hands scrabbling inside of your " + describeButthole(player.body.butt) + ", pawing your chest and " + describeButt(player) + ", trailing through your " + describeHair(player) + ".\n\n");

        CView.text("It feels wonderful.  You lie back and moan, enjoying the smooth, silky insides of her pussy, feeling tiny feelers occasionally caress and pull at your fingers inside of her.\n\n");

        // [If PC is lactating:]
        if (player.body.chest.sort(BreastRow.LactationMost).get(0)!.lactationMultiplier >= 1) CView.text("As milk leaks slowly from your " + describeNipple(player, player.body.chest.get(0)) + "s, the spider-lady notices. She lowers her head and wraps her soft, lovely lips around the tip of one of your " + describeAllBreasts(player) + ", sucking gently and frantically flicking her tongue against your " + describeNipple(player, player.body.chest.get(0)) + ".  You moan and lie back into the web, the multitude of sexual pleasures assaulting your senses almost more than you can bear as Aunt Nancy begins swallowing up your milk.\n\n");
    }
    return { next: auntNancyPoonPartIII };
}

function auntNancyPoonPartIII(player: Character): NextScreenChoices {
    const shortestCock = player.body.cocks.sort(Cock.Shortest).get(0);
    const longestCock = player.body.cocks.sort(Cock.Longest).get(0);
    // [If PC has a cock]
    if (shortestCock) {
        CView.text("You can feel it when the spider-lady's pussy begins to quiver in delight. Aunt Nancy soon moans, then cries out in incredible pleasure.  The lower half of her eyes all close, while the others all roll up into her head in ecstasy.  \"<i>Yes!  YEEEEESSSSSSS!</i>\" she hisses with throaty, feminine indulgence.  The tiny feelers in her otherwise silky-smooth vagina suddenly begin to squeeze and pull at your " + describeCock(player, shortestCock) + ", and you let out a bellow of pleasure of your own as you feel your ");
        // [If PC has balls]
        if (player.body.balls.count > 0) CView.text(describeBalls(true, true, player) + " tense, churning and tightening.");
        // Else:]
        else CView.text("body tensing in preparation for letting out your seed.");
        CView.text("\n\n");

        CView.text("You cum, and cum hard.  Thick wet jets of sticky semen pour into Aunt Nancy's seemingly-bottomless pussy, whose feelers and soft, smooth interior continue to rub at and stroke your " + describeCock(player, shortestCock) + " even as it vents the immense pressure in your " + describeBalls(true, true, player) + ". If anything, the constant powerful surges seem to be extending and intensifying the spider-lady's orgasm.");
        // [If PC has cum multiplier of at least 2]
        if (player.cumQ() >= 750) CView.text("  Sooner or later though, even her marvelous body can simply contain no more of your jizz, and she slips her swollen cunt up off of your organ, letting it continue squirting your thick, plentiful cum all over her as it swings free.");
        CView.text("\n\n");

        // [If PC has another dick of at least auto-titfucking size:]
        if (longestCock && shortestCock !== longestCock && longestCock.length >= 22) {
            CView.text("Aunt Nancy unwraps her tongue from your " + describeCock(player, longestCock) + " to cry out in delight, even as her hands let go of her lovely breasts to grab at your trunk.  Nonetheless, her big, pillowy boobs are more than firm enough to keep the shaft of your " + describeCock(player, longestCock) + " snugly inside as she bucks and shrieks atop you, and they more than contribute to your own sexual pleasure.\n\n");

            CView.text("It too spasms, spitting gooey ropes of cum all over both of you");
            // [If PC has cum multiplier of at least 2]
            if (player.cumQ() >= 750) CView.text(", some even reaching to the ceiling to fall into her short, pretty white hair and splattering over her trailing abdomen");
            CView.text(".\n\n");
        }
        // [If there are still dicks left over:]
        if (player.body.cocks.length > 2) {
            // [If no cocks are of titfucking size and # Cocks = 2 or if there are cocks of titfucking size and # Cocks = 3]
            if (longestCock && shortestCock !== longestCock) {
                if ((longestCock.length < 22 && player.body.cocks.length === 2) || (longestCock.length >= 22 && player.body.cocks.length === 2))
                    CView.text("Your other dick fires off too, her smooth, shell-covered hands still wrapped around it, and it makes even more of a mess, splattering over both of you.\n\n");
                // [Else]
                else if ((longestCock.length < 22 && player.body.cocks.length > 2) || (longestCock.length >= 22 && player.body.cocks.length > 2))
                    CView.text("The rest of your " + describeCocksLight(player) + " fire off too, her smooth, shell-covered hands still wrapped around them, and they make even more of a mess, splattering over both of you.\n\n");
            }
        }
        // [If you also have a vagina:]
        if (player.body.vaginas.length > 0) {
            CView.text("Your " + describeVagina(player, player.body.vaginas.get(0)) + " clenches, tightly, ");
            if (player.body.balls.count === 0 && longestCock && (longestCock.length < 22 || (longestCock.length >= 22 && player.body.cocks.length <= 2)))
                CView.text("squeezing the fingers on Aunt Nancy's hand still tickling your insides");
            else CView.text("making you long for something inside of it");
            CView.text(", as " + describeOneOfYourCocks(player) + " spasms in ecstacy.\n\n");
        }
        // [All w/ penis:]
        CView.text("Eventually, both your orgasms end.  You feel worn out, like you just ran a long mile, even though Aunt Nancy was doing most of the work.  However, she seems fine, smiling down at you with a big, happy grin.");
        // [If the PC has multiple dicks or a cum multiplier of at least 2]
        if (player.body.cocks.length >= 2 && player.cumQ() >= 700) CView.text("  Her lower body's a mess of smeary dollops of cum, right up to the bottom halves of her impressive boobs, and her face and upper body haven't fared much better. Behind her you can see where stray shots that sprayed over her have painted streaks of her abdomen white.");
        CView.text("\n\n");

        // [If the PC has multiple dicks or a cum multiplier of at least 2]
        if (player.body.cocks.length >= 2 && player.cumQ() >= 700)
            CView.text("Aunt Nancy runs one hand up her milky-pale body, digging a wide furrow in the thick layer of gooey cum as it moves up her belly and up the curve of her breast, before she peels it away and lifts it in front of her mouth.");
        else
            CView.text("Aunt Nancy puts one hand beneath her dripping pussy and squeezes some powerful internal muscle.  A thick dollop of gooey cum falls onto it from inside of her, and she lifts it in front of her mouth.");
        CView.text("  Snaking her long tongue around her fluid-smeared hand, the spider-lady licks up a thick load of the contents of your ");
        if (player.body.balls.count > 0) CView.text(describeBalls(true, true, player));
        else CView.text("body");
        CView.text(", and throws back her head to let it slide into her mouth.\n\n");

        CView.text("\"<i>Mmmmm...</i>\" she purrs.  Aunt Nancy notices the look on your face and smiles sexily.  \"<i>What? A lady needs her protein, friend.  Do you think I can spin my webs out of nothing?</i>\"\n\n");
    }
    // [Else:]
    else {
        CView.text("You can feel it when the spider-lady's pussy begins to quiver in delight.  Aunt Nancy soon moans, then cries out in incredible pleasure.  The lower half of her eyes all close, while the others all roll up into her head in ecstasy.  \"<i>Yes!  YEEEEESSSSSSS!</i>\" she hisses with throaty, feminine indulgence.  The tiny feelers in her otherwise silky-smooth vagina suddenly begin to squeeze and pull at your fingers, and her own fingers are soon touching sensitive places of their own inside of your ");
        // [If PC has a vagina:]
        if (player.body.vaginas.length > 0) CView.text(describeVagina(player, player.body.vaginas.get(0)) + " and ");
        CView.text(describeButthole(player.body.butt) + ".\n\n");

        CView.text("You howl in pleasure, feeling the orgasm coursing through you like hot metal up and down your spine.  You let out a exclamation of pleasure of your own, as you feel her hands tighten on your " + describeChest(player) + ", and soon you too are luxuriating in the feeling of her body against yours, inside of you, pressing all your most vulnerable places.");
        // [If PC has a vagina and is a squirter and/or is lactating:]
        if (player.body.vaginas.get(0)!.wetness >= 5 || player.body.chest.sort(BreastRow.LactationMost).get(0)!.lactationMultiplier >= 1)
            CView.text("  Her hands are soon drenched in your body's wonderful secretions, just as your");
        else CView.text("  Your");
        CView.text(" fingers are soon soaked in the lovely, sweet-smelling juices of her pussy.\n\n");

        CView.text("Eventually, the sensation subsides, and she gently slides her fingers from your ");
        // [If PC has a vagina:]
        if (player.body.vaginas.length > 0) CView.text(describeVagina(player, player.body.vaginas.get(0)) + " and ");
        CView.text(describeButthole(player.body.butt) + ".  You feel worn out, like you just ran a long mile, even though Aunt Nancy was doing most of the work, and you let your arm fall back down against the sticky surface of her web.  However, she seems fine, smiling down at you with a big, happy grin.");
        // [If PC has a vagina:]
        if (player.body.vaginas.length > 0) CView.text("  Lifting the smooth, soaked hand that has only just been soaked in the juices of your " + describeVagina(player, player.body.vaginas.get(0)) + " in front of her mouth, Aunt Nancy smiles at you.  Snaking her long tongue around her fluid-smeared hand, the spider-lady licks up the fluid with every sign of enjoyment.  \"<i>Mmmmm...</i>\" she purrs.  \"<i>You DO taste good.</i>\"\n\n");
    }
    // [All]
    CView.text("Aunt Nancy leans down and presses her soft lips against yours again, wrapping your web-bound body up in a hug with all four of her arms, and again you feel much more relaxed and (now that you think of it) aroused than you had a minute ago.  However, this particular sex session has taken an awful lot out of you, and you look longingly at the door over her shoulder as the kiss ends.  Unfortunately, the spider-lady sees you doing so and smiles wickedly.\n\n");

    CView.text("\"<i>Not a chance on Marae's green earth, friend,</i>\" she purrs, her voice like hoarse velvet as she rubs the surface of her still-needy pussy against your belly.  \"<i>I haven't had a lover in my bed in more than ten years, and you're not going anywhere until I say you can.</i>\"  That last part was punctuated with a wicked squeeze of your " + describeButt(player) + ", and Aunt Nancy presses her lips to yours again, much less gently and more passionately this time.  You moan into her mouth, feeling her aphrodisiacal bodily fluids seeping in, and, as she soon frees your upper body and presses your head into her soft, silky pussy, you know she's right.\n\n");

    CView.text("\"<i>And I'll be damned if I do all the work this time,</i>\" Aunt Nancy adds, before letting out a satisfied groan at the touch of your lips.");

    // [Next Page, Time += 200]
    return { next: auntNancyPoonPartIV };
}

function auntNancyPoonPartIV(player: Character): NextScreenChoices {

    CView.text("<b>Two passionate, sticky hours pass...</b>\n\n");

    // [70 % for Toughness, Strength to increase 2-6 points]
    player.orgasm();
    player.stats.str += .3;
    player.stats.tou += .3;

    // [+35 Fatigue]
    player.stats.fatigue += 35;
    // [+20 Relationship with Aunt Nancy, PillowTalk += 1]
    AuntNancyFlags.UNKNOWN_FLAG_NUMBER_00264 += 20;

    // [Next Page, If PillowTalk = 0]
    if (AuntNancyFlags.UNKNOWN_FLAG_NUMBER_00266 === 0) {
        CView.text("You awaken on Aunt Nancy's \"<i>bed,</i>\" an unbelievably comfortable pile of discarded, non-sticky webbing, your head still resting on her comfortable, pillowy bosom.  Slowly, you manage to sit up, tenderly massaging your aching body, especially your ");
        if (player.gender > 0) CView.text("genitals");
        else CView.text("jaw");
        CView.text(".  The last hour or so is just a blur to you at the moment, a haze of sex and passion and stickiness.  You can still taste Aunt Nancy's scent in your mouth and smell it in the air.  The widow had been insatiable, always coming back for more no matter how often you got her off... and skilled enough to make sure you could too.  Privately, you wonder exactly what killed her husband.\n\n");

        CView.text("Suddenly, you start at the feeling of Aunt Nancy's soft breasts squishing into your back, and her four arms sleepily embracing you, wrapping around the front of your chest.  You aren't sure whether to shiver in anticipation or tremble in fear, but you feel her lips gently kissing your ear, and hear the spider-lady's deliciously throaty, sexy voice whispering,  \"<i>Don't worry, friend.  You've satisfied me... for now.</i>\"  Gently, you feel her body rocking against your back, humming happily.\n\n");

        CView.text("\"<i>Thank you,</i>\" she murmurs into your ear.  \"<i>I... I needed that. I appreciate you being willing to meet this dirty old widow woman's needs.  It was... kind.</i>\"  She pauses, then sighs.  \"<i>I won't ask you to stay any longer.  You have... a great and terrible destiny ahead of you.  No need to try to hide it.  Ol' Aunt Nancy can see these things.  Like my husband did...</i>\"\n\n");

        CView.text("You can feel Aunt Nancy's hot tears on your back, and you place a comforting hand onto one of hers.  You can all but feel her smile through her tears, and she presses another kiss into your ear.  \"<i>I know, I know,</i>\" the widow whispers. \"<i>I won't try to stop you.  Just... come back some time, if you please? Every now and again?  I'd... appreciate that.</i>\"\n\n");

        CView.text("The spider-lady pulls her head back, releasing your body with her four arms, and says, rather loudly, \"<i>Now, friend, get on out of here!  Go out there and get to the adventuring and world-saving!</i>\"  Suddenly, mischeviously, she pinches you rather hard on the " + describeButt(player) + ".  You jump, yelping in pain, and turn indignantly to face her as she doubles over, chuckling, tears still streaming down her face.  \"<i>Let these old exoskeletal chitins rest awhile, friend,</i>\" Aunt Nancy laughs, lying back onto the soft mound of webbing.  She smiles lazily up at you.  \"<i>There's water next to the foyer if you want to clean off, and your " + player.inventory.armor.displayName + " in the parlor.  And... please do keep in touch.</i>\"\n\n");

        CView.text("Tentatively, you smile back, before getting cleaned up, getting dressed, and walking out into the suddenly-blinding sun of Tel'Adre.\n\n");
    }
    // [Else]
    else {
        CView.text("Worn out and sticky, you awaken in the spider-lady's arms in her bed.  You share a kiss and tender moment with the widow, before leaving Aunt Nancy to rest as you go to get cleaned up and leave, tired and worn out but also feeling stronger from your exercise.  As you leave, she tells you to come by when next you can...");
    }
    // Increment times boned!
    AuntNancyFlags.UNKNOWN_FLAG_NUMBER_00266 += 1;
    return { next: passTime(2) };
}
