import { CView } from 'Engine/Display/ContentView';
import { Character } from 'Content/Character/Character';
import { NextScreenChoices } from 'Engine/Display/ScreenDisplay';
import { mf } from 'Content/Descriptors/GenderDescriptor';
import { describeHair } from 'Content/Descriptors/HairDescriptor';
import { skinFurScales, describeSkin } from 'Content/Descriptors/SkinDescriptor';
import { describeCocksLight } from 'Content/Descriptors/CockDescriptor';
import { Cock } from 'Engine/Body/Cock';
import { EffectType } from 'Content/Effects/EffectType';
import { gameOverMenu } from 'Content/Menus/InGame/GameOverMenu';
import { Womb } from 'Engine/Body/Pregnancy/Womb';
import { Vagina } from 'Engine/Body/Vagina';
import { displayStretchVagina } from 'Content/Modifiers/VaginaModifier';

// *Male Loss - Turned Into Cum Pump
export function cumWitchCumPumpBadEnd(player: Character): NextScreenChoices {
    CView.clear();
    CView.text("Laid low by ");
    if (player.stats.HP < 1) CView.text("your wounds");
    else CView.text("by the lust coursing through your veins");
    CView.text(", you slump over against a desk, leaning heavily on it for support while ");
    if (player.stats.HP < 1) CView.text("you struggle to rise");
    else CView.text("you struggle to get your crotch");
    CView.text(".");
    CView.text("\n\n\"<i>Let me help you with that,</i>\" the robed beauty whispers as she deftly removes your [armor], leaving you bare and exposed, naked to her casual caresses and lecherous looks.  \"Such a lovely " + mf(player, "male", "hermaphroditic") + " specimen");
    if (player.cumQ() > 1000) {
        if (player.body.balls.count > 0) CView.text(" and such virile, cum-swollen testes.  An excellent breeder for sure!");
        else CView.text(" and such a virile body!  An excellent breeder for sure!");
    }
    else CView.text("but with such a pathetic virility.");
    CView.text("  A little magic later, and you'll be quite suited to breeding daughters with me.  Perhaps if you do well enough, I'll allow you to seed MY womb.</i>\"");

    CView.text("\n\nWith her slender fingers trailing over your heaving, exhausted form, the cum witch explains, \"<i>Before we get to the fun part, let's see about getting you in the proper mood.</i>\"  You ");
    if (player.stats.HP < 1) CView.text("grunt and strain in response, still trying to fight, even though you know it's hopeless.");
    else CView.text("groan and touch yourself, trying to show her just how 'in the mood' you are.");
    CView.text("  She affectionately ruffles your " + describeHair(player) + " and tuts, \"<i>Now, now, it's cute that you think you still have some agency here, but you really ought to just lay back and let me take worry about it!</i>\"");

    CView.text("\n\nThe cum witch rolls up her sleeves and gesticulates rhythmically.  Trails of phosphorescent fire trail from her nails with each motion, and you're being lifted, raised up into the air on streams of phantasmal force.  You hover like that for a moment, then with a brush of luminous energy, you slide sideways onto a bench, the magic disappointing to rest you gently upon the firm wooden surface.  Exposed as it is, [eachCock] rises powerfully, as if displaying itself for inspection.  Given the circumstances, it very well may be.");

    CView.text("\n\nSnapping her fingers, the black-skinned spellcaster snares glowing bands of force around your chest, wrists, biceps, and [feet], effectively restraining you as efficiently as any torture rack.  You struggle briefly, though you cannot say whether to free or touch yourself.  Does it really matter?  Either way, you're bound, nude, helpless, and aroused.  Gentle touches rub the " + skinFurScales(player) + " of your [chest] as she reassuringly coos, \"<i>Relax, my mighty friend.  You undoubtedly fought hard to get here, but now, all you need to do is relax.</i>\"");

    CView.text("\n\nSoft touches trace across your belly button and around your loins, skirting the sensitive, hard flesh in the middle to trace towards your [legs].  \"<i>Feel how soothing my touches are?  How absolutely relaxing it is to be massaged in such a way?  Your muscles just... go slack, the tension draining out your [feet] to leave you with nothing but comfort.</i>\"  You want to resist, but after fighting your way here and losing, it just feels too damned good.  Heedless of your desires, your [legs] relax and let the tension go.  You sigh in unexpected happiness as she continues.");

    CView.text("\n\nNext, the witch rubs her way back up to your [hips].  She suggests, \"<i>I'm going to work my way up your body, and with every part I rub, you're going to let out more and more of your pent up tension.</i>\"  True to her words, your body is beginning to feel like putty from the waist down - a limp facsimile of its former self.  The softness has even infected your " + describeCocksLight(player) + ", robbing some of the former stiffness.  You sigh and inadvertently let your guard down.  You've already lost, and if this woman wants to give you a massage before she has her way with you, why not enjoy it?");

    CView.text("\n\n\"<i>As a matter of fact, you're getting so relaxed now that you don't even need my touches for that wonderful, soft sensation to climb higher.  You can feel skilled fingers working the tension out of every single part of you, relaxing you to the core,</i>\" instructs your captor, removing her hands from your body.  The words ring true, and your arms gradually deaden, going as limp as the rest of you.  That wonderful relaxation moves into your core, and you exhale happily.");

    CView.text("\n\n\"So very relaxed,</i>\" the witch whispers, \"<i>You've let out so much tension that you're getting tired, so very tired that your eyelids are starting to sag.  They are heavy, aren't they?  Don't try to answer.  Just feel them dragging down, as if iron weights were suspended from them, tugging your eyelids closed.</i>\"");

    CView.text("\n\nYou strain to stay awake, but with the sensation of so many soothing caresses lingering on your " + skinFurScales(player) + " and the heavy weights pulling down... down.  You blink, getting your eyes half open. The next time they close, they stay closed, leaving you to dwell on the imaginary massage.");

    CView.text("\n\nPlacid feelings fill your form as your heartbeat slows, and you wonder when she plans to get to the sex.  \"<i>Now, don't think.  Just relax.  You feel so good like this, and with your eyes closed, you can focus entirely on feeling good and listening to me.  Now you can hear me so clearly that my voice seems to be coming from inside you, seeping into your relaxed body and mind with every statement of fact.  Doesn't it feel nice?  If it does, feel free to sink deeper and let the soothing sound of words flow into you without thought or question.</i>\"");

    CView.text("\n\n...Wait, what?  Your brow furrows as you try to pay more attention to her words and figure out what just happened, but her fingers are on your forehead in an instant, massaging your worry away.  Your face visibly relaxes at her touches, and your breathing evens to a slow, peaceful tempo.  \"<i>Good " + mf(player, "boy", "girl") + ",</i>\" the cum witch says in a honeyed, syrupy-sweet tone, \"<i>Now that you're nice and receptive, let's speed things along a little, shall we?</i>\"");

    CView.text("\n\nSparks of magic glimmer and flicker, bright enough be seen through the darkness of your eyelids.  They move up, circling the sorceress's fingers before following her firm presses into your skull.  To you, the only difference is the disappearance of the light and perhaps an increased sense of tranquility, a soft blanket of bliss that settles over you and snuffs out errant thoughts before they can begin.  You're pliant and receptive, open to feel and listen, but unable to form cogent messages of your own.  \"<i>Perfect.</i>\"");

    CView.text("\n\nA lecture of words, information, and instructions starts, though by the third paragraph you stop paying attention with your conscious mind and allow them to mold you unhindered.  At some point, the massaging fingers withdraw.  It doesn't matter, as per the earlier instructions, you can still feel them on your flesh, smoothing out any worry or disharmony in your mind.  A shrinking part of you continues to act up and resist it, but each time it gets smoothed over and forgotten.  With every overpowered token of resistance, it grows weaker, smaller, and less resilient, taking longer to crop up and fight.");

    // [NEXT]

    player.orgasm();
    player.stats.lib += 100;
    player.stats.sens += 100;

    return { next: beACumPumpPartII };
}

function beACumPumpPartII(player: Character): NextScreenChoices {
    CView.clear();
    CView.text("<b>*SNAP*</b>  You yawn and begin to blink the sleep from your eyes, shielding your gaze from the room's ambient light with your hand.  Your head is muzzy, like you stayed up too late or overindulged in milk again.  A soft hand is massaging your balls, caressing the orbs with the tenderness of a lover. They feel warm... and full.  ");
    if (player.body.balls.count === 0) CView.text("Wait a moment, you don't - didn't - have balls! Turning your accusing stare towards the busty witch, you watch in wonder as the newly grown sack slowly turns taut, stretched by the burgeoning size of your cum-stuffed spunk-factories.  She pats your newly-stuffed nutsack and remarks, \"<i>I had to make sure you were suitably virile...  Besides, I needed to make sure you'd only sire daughters for us.  We don't need that many like you, my loyal " + mf(player, "stud", "cum donor") + ".</i>\"");
    else if (player.cumQ() < 3000) CView.text("The cum witch gives them a gentle shake, smiling as they grow and swell, burgeoning with full, ripe seed.  She remarks, \"<i>Nothing like the virility of a bull and enough seed to father an army of females to make a useless intruder a contributing member of society, eh breeder?</i>\"");
    else CView.text("The cum witch gives them a gentle pat and remarks, \"<i>No sense messing with perfection... at least not beyond necessary.  We wouldn't want you fathering any boys, would we?</i>\"");
    // add balls if necessary
    if (player.body.balls.count < 2) player.body.balls.count = 2;

    CView.text("\n\n\"<i>Perhaps just a little more,</i>\" the lusty woman breathily exhales as she rubs your balls.  Your sack stretches a little tighter, the skin going glossy and smooth, unblemished and perfect.  She massages the swollen orbs with motherly care as they seem to grow denser, fuller.  You swear you can hear them sloshing as she manhandles your jewels, so full of thick seed that it's nearly painful.  Your back arches, lifting your hips as you get into it a little bit, your lust rising in equal pace with your surging erection");
    if (player.body.cocks.length > 1) CView.text("s");
    CView.text(".  Of course, the wicked witch only releases you at this point.  \"<i>Do I look like one of the cum-hungry wenches around here?</i>\"");

    // add lust
    player.stats.raw.lust = 100;

    CView.text("\n\nAt that, a few nagging worries surge up to the forefront of your lust-addled thoughts.  You were hypnotized!  Worse than that, you can barely remember anything, let alone how you got here.  In addition, though less pressing, she's done something to you that'll make you only father females.  You don't remember much, but you know that's not quite right.  You jump up and nearly fall over your own [feet] in your hurry to get away from this woman - alluring and arousing as she is.  Pressing your back flat against the wall, you begin breathing faster and faster as you wrack your consciousness for an explanation.");

    CView.text("\n\nThe dark-skinned woman (who seems INCREDIBLY familiar) calmly approaches you as she apologizes, \"Oh dear, this must be terribly jarring for you.  Come, sit down.  I promise not to bite.</i>\"");

    CView.text("\n\nReluctantly, with wariness coursing through your veins, you sit, your once-erect phallus");
    if (player.body.cocks.length > 1) CView.text("es");
    CView.text(" wilting from the force of your surprise and fear.");

    CView.text("\n\n\"<i>You just completed the cum witch initiation, which appears to have traumatized you greatly.  A decade ago, you were born to assist me in my duty, and today, the culmination of your potential has been fulfilled,</i>\" she explains with hooded mysterious eyes.  You frown at that - you could have sworn you were born somewhere else, with friends of both genders... somewhere happy.");

    CView.text("\n\n\"<i>Naughty pump,</i>\" the witch states when she sees you screwing up your brow in thought.  Immediately, you cry out and cum, hard.  Your eyes roll back from pleasure, and [eachCock] erupts, spewing jism all over your [legs] even in its limp state.  You cum and cum, puddling all over the floor and draining your prodigious balls of every ounce and then some. The bliss blasts through your brain, carrying the thoughts and questions away with them, pumping them straight out onto the floor to wash down the drain.  Only once your questions have been obliterated by bliss are you allowed to stop and sink into a drooling, receptive state.");

    CView.text("\n\nWhen you come to, you smile, and sigh, happy your mistress deigned to let you cum.  You must have done something really good to earn such a spontaneous orgasm!  Now, what were you doi- oh yeah, she was reminding you why you let her fix your balls!  Smiling, you let her know you're all calmed down and ready to continue.");

    CView.text("\n\nThe uncharacteristically blonde sex-bomb clears her throat before she goes on.  \"<i>Right, as I was saying, you were groomed for this, and today, you've started down the road of unlocking your full potential.  You're my apprentice " + mf(player, "wizard", "witch") + ", and with a tool that fine AND magic-enhanced balls, you'll do fine.  Now, since you've already cum, your first task is going to be learning the incantation of virility.  Take this tome and learn the spell, then cast it upon yourself no less than a dozen times.</i>\"");

    CView.text("\n\nYour mistress hands you the book, promising, \"<i>More is better.  When you can take it no longer, I'll bring you a sister to impregnate.</i>\"  Nodding happily, you rise and stumble over to a nearby desk.  The spellbook is new, though the writing is ancient.  You study it eagerly, soaking up the new knowledge like a sponge.  It's comical how easy your brain seems to wick up new information really, almost like whole swathes of it were cleared out and made ready to learn.  You learn the spell within the hour, though your task is made more difficult by the noisy witch your mistress is busy drilling in every hole.");

    CView.text("\n\nWith the first part of your task complete, you set upon the second.  With nervous, shaky hands, you cast the spell, trying hard not to lose your concentration when a fevered \"<i>OH GODS YES!</i>\" is screamed mid-sentence.  You maintain your focus, and the rush of magic washes through you, stiffening [eachCock] to a semi-hard state.  Burbles of pre drip from your cum-slit as your [balls] refill with alarming speed.  With all that happening from just one cast... how will you make it through a dozen?");

    CView.text("\n\nYour teacher pushes a cum-filled witch to the floor, her belly comically distended.  Twin runners of spunk squirt from her well-used twat, matching a similar stream that drizzles from her abused backdoor.  It seems your mistress had little time for personal pleasure beyond the usual insemination.  She saunters over, nude and glistening with sexual juices.  Her voice encourages you, \"<i>Go on.  Do them faster.  If you cannot endure a measly twelve castings for virility, then you are not fit to my apprentice.</i>\"");

    CView.text("\n\nNo!  You close your eyes and chant, blowing through the spell as fast as you can.  Each time it completes, you grit your teeth and start anew.  The lust coursing through you by your fourth incantation makes it difficult to focus - you're fully hard by that point and your balls feel as full as ever, but you tamp down the errant emotion and focus on the task at hand.  Five... six... seven times you've managed to cast it now!  The bench is getting sticky from all your leaking pre, making you fidget nervously as your swollen balls drag through your juices.  The next arcane ritual makes you shiver with need.  You keep your eyes fixed close and try for number nine, knowing if you were to sneak even the barest glimpse at your hermaphrodite mistress that you'd lose control and beg her to fuck you.");

    CView.text("\n\nYou shiver at the thought and nearly cave in just then, your turgid cum-spewing cock constantly leaking at this point.  Your body is so full of the salty cream that it's forced out from you in a steady flow, a lewd imitation of a proper orgasm that only grows stronger when you complete your ninth, tenth, and eleventh casts of the spell.  You shiver in pleasure and aching need, but as you begin speaking the words of the twelfth and final utterance, the witch interrupts.");

    CView.text("\n\n\"<i>Stop!</i>\" she cries, pointing to your throbbing, jizz-belching boner");
    if (player.body.cocks.length > 1) CView.text("s");
    CView.text(", \"<i>I did not think you would get this far.  Your will is truly mighty, [name], but the task I gave you is something I've never been able to do.  Ten is as far as I ever got.  I would not have you damage yourself just yet.</i>  She pulls open the curtain and bellows, \"<i>Next!</i>\"");

    CView.text("\n\nAnother woman, an olive-skinned beauty with breasts so pendulous they seem to weigh her body down, enters, glancing at you hesitantly.  The hermaphrodite smiles and nods, gesturing for her to approach you.  [EachCock] looks like a sperm volcano at this point, shrouded in bubbling flows of alabaster spunk that never seem to end.  Your balls are bloated and visibly churn, stuffed more than full of spunk even as they produce more.  The huge-titted milk-witch frowns, but reluctantly straddles you, sinking down upon your spermy scepter with ease.");
    if (player.body.cocks.sort(Cock.Smallest).get(0)!.area >= 100) CView.text("  The penetration is eased somewhat by your shrinking dick.  You glance at the sand witch in awe, noting her glowing hands.  She gives you a knowing wink and turns, her spell complete, leaving you to enjoy yourself.");

    CView.text("\n\nThe huge tits on the new witch crush into your face, smearing you with squirting milk as she begins to ride your geysering erection.  ");
    if (player.body.cocks.length > 1) CView.text("Her voluminous butt is thoroughly smeared by the goo from the rest of your " + describeCocksLight(player) + ", shining with white from your magical virility.  ");
    CView.text("She rides you with surprising skill for one who seems to be so hesitant about such a healthy jizz output, her four breasts squishing tight against [chest].  Her tight cunny squeezes and ripples around you, rapidly growing soaked with white, thoroughly spunk-lubed and hungry for more.");

    CView.text("\n\nAs turned on as you are, you blow in seconds, arching your back and grabbing hold of her plush butt for stablity.  Your load sprays out in huge torrents, easily filling the witch's first womb with the first explosion and bulging her belly from the force.  She sighs and somehow finds the strength to rise, only to drop back down on you with her second cunt.  You fill that womb in seconds, massive spurts of alabaster turning her once-flat tummy into a gravid jizz-sphere.  She cries out in orgasm and twitches weakly atop you with all the strength of a wet rag.  Soon, she's so full that she slides off you onto the ground, her passage marked by a river of white that bursts free of her loins.  She leans forward to kiss your dick thankfully, earning herself a mask of white, and since she failed at that, she just wraps all four of her tits around it.  Your cock is smothered in slippery tits.  You glaze them all before your magical virility finally wanes, slowly to a pleasured trickle.");

    CView.text("\n\nThe sputtering witch sighs, \"<i>Thanks,</i>\" and turns to the smiling hermaphrodite, \"<i>He'll... he'll do fine I think... gods, I'm full.</i>\"  She nervously wobbles out, giving you a wink and a bit of sexy sway as she goes.  You can't wait to have a chance at her again!");

    // [Next]

    return { next: cumPumpVolumeThree };
}

function cumPumpVolumeThree(player: Character): NextScreenChoices {
    CView.clear();
    CView.text("With the champion brainwashed into a little more than a loyal cum-pump for the sand witches, they grow in number and strength with alarming speed.  In the space of eight years, the desert is transformed into a verdant forest.  For better or for worse, the witches finally rival the demons in power.  They spread their influence wider, eventually ");
    if (player.effects.has(EffectType.FactoryOverload)) CView.text("destroying");
    else CView.text("rescuing");
    CView.text(" Marae.  Their abilities, numbers, and familiarity at dealing with demons lend them great success at battling Lethice's growing hordes, and within the span of another decade, the demons are exterminated.  The witches are hailed as saviors, and young females of all races seek to join them.  You, of course, inseminate all of them.");
    return gameOverMenu(player);
}

// *PC Loss - Female - Become Sand Witch
export function turnIntoASammitch(player: Character, cumWitch: Character): NextScreenChoices {
    CView.clear();
    CView.text("Helplessly, you ");
    if (player.stats.lust > 99) {
        if (player.body.vaginas.length > 0) CView.text("dig your hands into your loins, frigging your hungry cunt so hard your juices splatter the Witch's robe.");
        else CView.text("dig your finger into your [asshole], frigging it like your life depended on it.");
    }
    else CView.text("try to rise, but all you manage to do is slip back down to the ground.");
    CView.text("  The Cum Sorceress smiles and releases her staff.  Instead of clattering to the ground, it dematerializes a piece at a time, fading away in a way that would be mesmerizing were you not otherwise occupied.  She hikes her robes up and pulls off her hat with them, shaking her surprisingly light, blonde hair free.  \"<i>Now, all that got me pretty worked up, and I don't think the girls will mind if I give you your first sampling of cum witchery.  What do you think, hun?</i>\" she asks, glancing back towards the comatose witch behind her.");

    CView.text("\n\n\"<i>i'z fine...</i>\" a quiet voice draws, barely loud enough to be heard.");

    CView.text("\n\nYour captor flashes you a smile and giggles, \"<i>See?  I told you they wouldn't mind.  Now, ");
    if (!player.body.wombs.find(Womb.Pregnant)) CView.text("let's go ahead and get your first daughter inside you, shall we?");
    else CView.text("let's go ahead and have some fun, shall we?  We'll have to wait until you pop out whatever's in your womb before I give you your first witch child.");
    CView.text("  There will be plenty of time to make you one of us while we're waiting.</i>\"");

    if (player.body.vaginas.length <= 0) {
        CView.text("\n\nShe gestures towards you and releases a flow of salmon-hued light in your direction.  As soon as it touches you, you moan out loud and begin to lift your [hips] into the air, humping against an unseen but clearly felt pressure on your loins.  A slowly spreading, vertical slit opens there, glistening with moisture as it parts to reveal a fresh clit.  <b>You've grown a cunt!</b>");
        player.body.vaginas.add(new Vagina());
        player.body.clit.length = .25;
    }

    CView.text("\n\nThe dark-skinned futanari strokes");
    if (cumWitch.stats.lust < 65) CView.text(" herself to full hardness, smiling when thick strings of cum begin to drizzle from her swollen cock-tip.");
    else if (cumWitch.stats.lust < 85) CView.text(" herself until cum begins to drizzle from her swollen cock-tip.");
    else CView.text(" herself, gathering up the constantly-dripping cum and smearing it all over her shaft.");

    CView.text("\n\nHer tongue licks her lips in anticipation as she readies herself, though she stops a moment later when she sees you still have a bit of fight in your eyes");
    if (player.stats.lust > 99) CView.text(", even though your hand is knuckle-deep in your twat");
    CView.text(".");

    CView.text("\n\nKneeling before your helpless form, the mysterious witch sighs and whispers, \"<i>Why can't you just accept it?  You belong with us.  We're going to fix this desert - and Mareth.  The demons can't stop us.  The monsters won't stop us.  They CAN'T.</i>\"  She gently brushes her hand through your hair, smearing you with her sex-juices unthinkingly as she prattles on, \"<i>Just relax, babe.  Here, maybe this will help.</i>\"  The Witch's hands are suddenly holding you by your ears and her lips are moving in nonsensical ways.  Whatever she's saying you can't hear it with how she's holding you.");

    CView.text("\n\nHer spell goes off like a gunshot, at least that's what it seems like to you.  It cracks through your consciousness with a booming ripple that stuns you into unthinking silence, your thought process momentarily short-circuited.  Your mouth lamely opens, your tongue slipping out and drooling as your whole body goes limp, uncontrolled. If it weren't for the Cum Witch's capable hands, you'd have fallen over into some of her fluids, but she kindly keeps you up, even as she begins to remove your [armor].");

    CView.text("\n\n\"<i>There, there hun, isn't that better?</i>\" the sorceress asks, \"<i>It's always better to listen to me.</i>\"  You stare at her, unblinking.  \"<i>Right,</i>\" she giggles, \"<i>That's what I thought!  You're going to love being a Sand Witch, absolutely love it.</i>\"  A dark hand, lighter on the palm than the outside gently touches your cheek and guides your head into a little nod.  She quips, \"<i>That's right, being a Sand Witch is the best!  You'll get to have four big, milky tits to milk whenever you have free time, and two cunts that you can get filled any time you come visit.</i>\"  Each rambling explanation slips into your ears and settles over your dimmed mind, slipping into the thoughtless, crevices before your brain reasserts itself.");

    CView.text("\n\nThe Cum Witch begins moving your hand for you, artlessly toying with your cunt as she whispers into your ear.  She's brainwashing you, and you're too helpless, too vacant to lift a finger.  Besides, it's better to listen to her.  Just listening, it's better.  Yes, that's it.");

    CView.text("\n\n\"<i>Oh, I can just tell you're going to be a great sister!  You'll love being milked almost as much as you'll love having my kids.</i>\" she coos.  You start to nod in agreement before you remember to listen, your thought processes slowly resuming.  \"<i>You'll love having my babies so much that you'll try to keep both your wombs full all the time, once you get your second one, won't you?  You love my cum, and you want it in all of your holes, but mostly your wombs</i>\"  This time you do nod - it's going to be fun!  You can't wait to ");
    if (player.body.chest.length < 2) CView.text("get four big, milky tits");
    else if (player.lactationQ() < 200) CView.text("have your tits made into perfect milkers");
    else CView.text("get your four, big tits milked");
    CView.text(" or to get your first proper administration of witch-cum.");

    CView.text("\n\nGiggling, you agree wholeheartedly and ask her to help you up onto a bench, so you can be properly bred.  Getting one in the oven now will give you a headstart on getting both your wombs pregnant - you just need to get them to give you a second cunt after this.");
    if (player.body.wombs.find(Womb.Pregnant)) CView.text("  It seems you've somehow managed to forget that you're already pregnant, and the Cum Witch doesn't seem keen to remind you.");
    CView.text("  Just thinking about her gets you wet, wetter than you were already, and you were already so hot and moist from earlier.  Your legs spread of their own accord as she lifts you onto a waist-high bench, your cunt-juices drooling down the jizz-polished hardwood, your head swimming from the potent smells of sex that saturate this room.  Wiggling your bottom, you move your [butt] back and forth enticingly, shaking it in front of your partner's leaky tool, your eyes locking onto that messy implement as if it were going to save your life somehow.");

    CView.text("\n\nThe cum witch gives your impertinent bottom a slap to steady it, bursting an exclamation of pain from your mouth at the sudden rough treatment.  'She's so rough,' you mentally whine, but another voice answers, 'But she'll be so good to you!'  Sighing contently, you listen to that second, louder thought and lie there, watching your lover slowly line herself with your entrance.  When her cock's oozing tip first brushes your folds, an electric bolt of raw pleasure runs through your body, drawing out a slippery spurt of lady-spunk just from that touch.  Gods above and below, it's so hot, just touching it seems to make your pussy wetter.  If you didn't know better, you'd swear your pussy was boiling over with lust and frothing with need.");

    CView.text("\n\nTwo huge tits come to rest on your back, pinning you underneath their enormous weight, smooth, sweat-slicked skin sliding across your body like silk as the hard shaft spreads your vulva wide and slides through the curtain of oozing fem-cum. You moan happily at that welcome intrusion, a sensation of amazing fullness - no, rightness - filling you up in the most perfect and womanly way.");
    if (player.body.cocks.length > 0) CView.text("  [EachCock] throbs beneath you, hard as rock and crushed between your belly and the slippery-smooth wood.  It seems unimportant compared to what's going on above it.");
    displayStretchVagina(player, cumWitch.body.cocks.get(0)!.area, true, true, false);
    // Virgin check here!

    CView.text("When the two, wondrously bulging nuts come to rest on your [butt], you realize she's completely and utterly inside you.  That hard, wonderful cock is inside you and pressing up on your cervix, the thick, potent cum oozing directly into you, where it belongs.  You sigh in contentment and work your internal muscles, clenching the dick inside you as if you could milk it, drawing a surprised gasp from the dusky lips of your dark-skinned lover.  Her hard nipples dig harder into your back and an increase in the wet warmth in your [vagina] alerts you to just how much she's enjoying it.");

    CView.text("\n\nThe Cum Witch strokes your hair and promises, \"<i>I'll do this for you every day, every hour if I have to, until you're pregnant... and then I'll come visit you in the wards and give you all the cum you'd ever want.</i>\"  A fat bulge distends your labia as it works its way down the Witch's dick, squirting explosively inside you, proof of her excitement for the idea.  You couldn't be happier!  Not only are you going to be a huge-tittied milk-witch, but your lover is going to keep you so full... warm and packed with spunk and life.  Your [vagina] tingles and quivers at the thought, massaging the woman's thick, black dick happily as she begins to slowly move her hips, gently sliding herself out just enough to release a few bubbles of cum before sheathing herself in your twat once again.");

    CView.text("\n\nYou shiver wildly, now impaled again, just the way you wanted.  That perfect bliss is fleeting, as the Cum Witch begins to fuck you faster and harder, tits wobbling dangerously on top of you as her bottom arches and straightens with each thrust.  You begin moaning with every thrust, a picture of feminine contentment as you're perfectly mounted by another (partial) female.  Smiling knowingly, your blonde-haired lover kisses at your shoulders.  Her moist, soft lips slowly but inexorably travel closer and closer to your spine, until, with an electric thrill, they kiss one of your vertebrae. You shiver, but she isn't done yet.  Her gentle kisses work up to the nape of your neck where they pause, a saliva-slicked tongue smoothly gliding across your body to lick at the corner of your ear.");

    CView.text("\nThroughout the sensual love-making, you feel the spooge bubbling up into your body, a constant, pulsing reminder of the Cum Witch's seemingly endless affection.  Globules of her seed have already begin to slip out of your cunt-lips, hanging from your [clit] for a moment before they drip to the floor.  This constant fluid flow proves surprisingly pleasurable, and if you weren't already moaning like a whore in paradise, you'd start now.  The thick cock inside you seems to find the sensation equally enjoyable, if its twitching and gradually increasing cum-flow is any indication to go by.  With her hips pistoning hard, the hermaphrodite seems to relentless in her attentions, but passionate beyond belief.");

    CView.text("\n\nThen, just when you expect her to go wild and take you both to orgasm, she pulls out and flips you over, turning you up to face her.  Her sky-blue eyes twinkle happily as she admires your cum-pudged belly, but when you reach down and pull your hungry pussy-lips apart, the interlude comes to an end.  With animal savagery, the Cum Witch mounts you, throwing her whole body atop you and crudely pounding your box.  Fat globules of cum squirt from her shaft almost constantly with each push inside your well-juiced nethers.  Still, even though you're quaking and shaking with her, you can tell that she hasn't cum yet.  Her eyes do look a little distant, and thinking to bring about your fertilization that much quicker, you reach up for her huge nipples.");

    CView.text("\n\nThey're as soft as the rest of her, though they have a slightly pebbly texture that makes you wish you could lick and suck on one.  Instead, the huge knockers are threatening to completely envelop your hands, the huge tits smashing flat against your [chest].  The Cum Witch suddenly cries out, and you see her biting down on her lower lip, her eyelids low and her body shaking.  Her hips slam into you one last time, hard, deliciously filling you.  Her balls bounce up and down, and you feel her shaft suddenly thickening from base to tip, expanding to pass the huge torrent of cum she's starting to pump into your womb.  Blessed heat washes through you, and you feel the " + describeSkin(player) + " stretching tight.  You feel so full and taut that you could use your belly like a drum, but the Cum Witch's orgasm is just getting started.  Each pulsing blast of semen is answered by a matching torrent of cum that sprays from your soaked pussy, puddling on the floor.  You twitch beneath her, orgasming from the feel of so much fluid flowing through your box, and closing your eyes as the pleasure overwhelms you.");

    CView.text("\n\nThe two of you stay joined at the hips for an indeterminable amount of time, sweating bodies joined in ecstatic bliss.  Like all good things, it does come to an end, and one of the normal sand witches enters to interrupt you.  The ebon beauty leaves you suddenly empty, a flood of her fluid dripping to the floor as she announces, \"<i>I subdued the interloper, but I convinced her to join us.</i>\"");

    CView.text("\n\nThe other woman looks a little confused at this, but when she sees your wide, excited eyes, she reluctantly nods.  There's a flash of irritation at your presence, but it fades when your lover offers, \"<i>Don't be sour, I saved some for you, hun.  Why don't you take your sister to the mother, and when you come back, I'll make sure to pack all three of your cunts, okay?</i>\"");

    CView.text("\n\nThis seems to placate the four-breasted, three-pussied woman, a wide grin breaking out on her face.  She helps you up and leads you from the room to your new life, the last thing you see as you go a subtle wink from the Cum Witch...");
    player.orgasm();
    player.stats.lib += 100;
    player.stats.sens += 100;

    // Next

    return { next: chicksLoseToSandWitchesBadEndFinale };
}

function chicksLoseToSandWitchesBadEndFinale(player: Character): NextScreenChoices {
    CView.clear();
    CView.text("<b>Some time later...</b>");

    CView.text("\nYou smile and rub your hands across your womb.  True to her word, the Cum Witch got both your wombs pregnant in short order, and you couldn't be happier.  Your sisters have doted on you ever since they discovered your devotion to milk-production and child-incubation.  At first, they were a bit disturbed by your seemingly endless love for the Cum Witch's cum, but as you produced more and more milk (and children) they stopped worrying about making you stay clothed or cleaning her cum from your skin.  Not long after that, you moved in with her as a live-in cum-dump. Life is good.");

    CView.text("\n\nYou swallow a creamy batch of her spunk and cup her heavy balls.  They've grown a little since you moved in, you suppose to keep up with your voracious appetite for her seed, but your black lover doesn't seem to mind.  If anything, she seems quite happy to have you between her knees while she's studying her spells.  You can focus on swallowing her cum until you're full, and she gets the motivation she needs to properly develop her magics.  Why, just last week she learned how to make her jizz taste like chocolate - that was a great week!");

    CView.text("\n\nStill, as you massage her quaking testes and drink down her delicious jism, you have to think, \"<i>Life is good.</i>\"");
    return gameOverMenu(player);
}
