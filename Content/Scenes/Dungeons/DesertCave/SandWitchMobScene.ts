import { Character } from 'Engine/Character/Character';
import { NextScreenChoices, ScreenChoice, choiceWrap } from 'Engine/Display/ScreenDisplay';
import { Cock } from 'Engine/Body/Cock';
import { CView } from 'Engine/Display/ContentView';
import { mf } from 'Content/Descriptors/GenderDescriptor';
import { passTime } from 'Content/Scenes/PassTime';
import { gameOverMenu } from 'Content/Menus/InGame/GameOverMenu';
import { Vagina } from 'Engine/Body/Vagina';
import { BreastRow } from 'Engine/Body/BreastRow';
import { skinFurScales, describeSkin } from 'Content/Descriptors/SkinDescriptor';
import { displayStretchVagina } from 'Content/Modifiers/VaginaModifier';
import { describeCocksLight, describeCock } from 'Content/Descriptors/CockDescriptor';
import { DesertCaveFlags } from 'Content/Scenes/Dungeons/DesertCave/Rooms';

/*Sand Witch Mob
Very high hit points, not much stronger than a regular sand witch
{Standard Descript} You are surrounded by a veritable tribe of sand witches. Having cast off their protective, concealing robes in the safety of their den they stand before you almost completely naked, little more than double-bikinis and loincloths protecting their modesty.  They glower at you hatefully, outraged that you would invade their home, and ready themselves to drag you down with sheer numbers.
{Bonus Lust Descripts}
(40) You are surrounded by myriad flushed faces and erect nipples as your licentious temptations begin working their way through the rage of the sand witches.
(60) Loincloths are soaked all around and milk trickles from quadruplet breasts almost in sympathy. A number of the sand witches seem more interested in their sisters than in facing you, but there's still plenty of them with their mind on your defeat.
(80) There's not much fight left in these sand witches now; they have other things on their mind. Maybe a third of them are starting to openly jill themselves off or make out with their fellows, distracting those who are still trying to fight with their licentious acts. You doubt it will take much more to drive them all over the edge...
*/

// *Females & Small-DIcked Males Lose:
// https://docs.google.com/document/d/1UnXTFRvGS7TJF8KqMo2XSRo9qSpG8JM2aHc9c5RwPP8/edit#
// PC Loses
export function loseToSammitchMob(player: Character): NextScreenChoices {
    if (player.body.cocks.length > 0 && player.body.cocks.sort(Cock.Largest).get(0)!.area >= 6) {
        return memeberedFolksFindTrueWuv(player);
    }
    CView.clear();
    // [If defeated by HP loss]
    if (player.stats.HP < 1) CView.text("You fall to the dirt floor, beaten and bruised, no longer having the will to keep fighting.  The sand witches all gather around you, snickering on how weak you are.  Your vision is blurry as you look up at the dark figures towering over your prone form, you can only wonder what they'll do to you.");
    // [If defeated by Lust gain]
    else CView.text("Your frustration is too much to bear and you fall over, using your [weapon] to support yourself.  Your vision is blurry and your loins ache to be touched as all of the sand-witches gather around you.  One of them walks up to your panting form and kicks your [weapon] out from under you, making you fall flat on your face, producing a few laughs and giggles out of these girls.  You turn onto your back and look up at the figures looming over you.");

    CView.text("\n\nThey rip off every piece of your [armor] and throw it ");
    if (DesertCaveFlags.SAND_WITCHES_FRIENDLY === 0) CView.text("into the fire like it was trash");
    else CView.text("off to the side");
    CView.text(", leaving you naked and exposed before these ravishing women.");

    if (player.body.cocks.length > 0) return getMockedForSmallDongBySammitchMob(player);
    else return femaleGirlsLoseToSammitches(player);
}

// Loss Orgies
// Male
// -Small cock, they all mock your size and each takes a turn making the PC cum
export function getMockedForSmallDongBySammitchMob(player: Character): NextScreenChoices {
    CView.text("\n\nOne witch yells out \"<i>Look how small " + mf(player, "his", "her") + " cock is!</i>\"  All their eyes are directed to your crotch and grins of mockery crack their faces.  \"<i>It could fit in the palm of my hand.</i>\" \"<i>My nipples are bigger than that!</i>\" \"<i>Do we have a magnifying glass, I can't see it.</i>\"  They keep on this teasing of you until one kneels down and squeezes your [cock smallest] between her middle and index finger.  \"<i>Let's see if this tiny dick can even cum at all...</i>\"");

    CView.text("\n\nShe starts massaging your cock, not really a stroke, more like flicking her wrist so her fingers can go down your small shaft.  All the other sand-witches look on, amused as your tiny hardness tries to look big and intimidating.  They even make cute kissy faces at your itsy-bitsy [cock smallest], the kind of expression you give to small animals.");

    CView.text("\n\nLittle drops of pre-cum bead up on your [cockHead smallest] and spill over, lubing your tormentor's fingers as she continues to degrade you, saying how you'll cum like a virgin bitch and how you can only dream of a proper fuck with this equipment.");

    CView.text("\n\nYou try not to give these sand-witches the satisfaction of seeing you cum but you're completely at their mercy, what little they have.");
    if (player.cumQ() < 250) CView.text("  A little squirt of spooge dirties the witch's two fingers, creating a small web of spunk between them.  \"<i>Heh, knew it</i>\" the witch smugly says, giving you a pathetic look.");
    else if (player.cumQ() < 500) CView.text("  Spurts of sweet release shoot from your [cock smallest], glopping the bitch-witch's hand.  \"<i>Nothing too impressive</i>\" she snidely remarks as she rubs your spunk off on the dirt floor.");
    else CView.text("  Your [cock smallest] shoots out a barrage of cum onto the bitch's face, caking her disbelieving features into a thick layer of slimy goop as her fellow sisters laugh, pointing at her spunk-covered face.");

    CView.text("\n\n\"<i>Oh look, it's getting even smaller</i>\" one slut witch says, pointing out your receding cock.  You're kinda glad it's happening.  Their abuse of you is over!  They look a bit sad that their fun is softening until one chimes up, reaches into her cleavage with one hand and pulls a bottle out of her top.  All the witches start giving you impish smiles.");

    CView.text("\n\nThey hold your head down, pinch your nose shut, and force your mouth open as the one with the bottle pours the concoction down your throat.  You try your best not to swallow the stuff, but they force your mouth closed and massage your throat to make the vile fluid go down.  Your reflexes betray you, and you swallow all of it.  Satisfied, the witches let you breathe again and watch excitedly for what happens next.");

    CView.text("\n\nIt starts with a warm feeling in the pit of your stomach, traveling to your micro cock and immediately stiffening it to be as hard as it was moments ago.  Your torturous pleasure  isn't over yet.  Another witch places her dirty foot on your chemically hardened member.  Claiming how pathetic it is for her dainty feet to cover the entire length of your [cock smallest], she lightly steps on your sensitive meat, your weak little cock trying to push against her soft, bare sole as she crushes you with it.  Then, her soft stepping turns to rubs, and you feel the smooth creases of her foot rub against your small length.");

    CView.text("\n\nThe drug they gave you must have made your body very sensitive as you already feel a new orgasm pulsing through your cock.  You grit your teeth and try to hold it back.  The sand-witches all laugh at your poor attempt at defiance.  This only encourages the witch stepping on you, and she pushes down harder as she strokes and flicks your [cock smallest] with her toes.");

    CView.text("\n\nYou try to deny her advances, but her fun isn't going to stop until you cum.  You grit your teeth and try to hold it back, but she's too good for you.  You cum a few pathetic drops onto her sole.");
    if (player.body.balls.count > 0) CView.text("  Your [balls] didn't have enough time to make another full batch.");
    CView.text("  It's very watery, dripping down between her toes. Your cock has a dirty smudge of where her foot was.");

    CView.text("\n\nShe holds her foot up to your face and orders you to lick.  In your weak state of mind, you follow her orders,sticking out your tongue to taste the mix of dirt and thin cum off her foot.  You lick every little drip of spunk, and she lets you keep licking long after all the cum is gone. Now you're just licking the crud off her foot.");

    CView.text("\n\nYou keep on licking until the sole of her foot has turned back to the light tan color it once was.  Then she steps on the dirt floor with it, undoing all your tongue work.");

    CView.text("\n\nYour cock is still hard and wanting, and the next sand-witch kneels down ");
    if (player.body.legs.isBiped()) CView.text("between your legs");
    else CView.text("to your side");
    CView.text(".  She takes your dirty cock in her hand.  She must have been dared to do something.  Looking at her peers with pleading eyes, she says, \"<i>Are you sure about this?</i>\"  A small group of witches egg her on, telling her to \"<i>do it.</i>\"");

    CView.text("\n\nThe witch huffs out like she's in a pickle and takes in a deep breath.  She forces your entire cock in her mouth and begins rolling it around with her tongue.  Cleaning up the dirty mess the last witch left behind, she pleases you out of peer-pressure.");

    CView.text("\n\nShe huffs and puffs her hot breath on you, her tongue pleasing the entire length of your cock.  The few witches that encouraged her, look on in shock and humor, not believing their fellow witch is doing this; you would feel insulted if you cared, but this witch is really good at it.");
    // If balls:
    // [If balls & pussy:]
    if (player.body.balls.count > 0 && player.body.vaginas.length > 0) CView.text("  She even cups your [balls] but moves to touch your [vagina] when she feels its wetness dripping off the testes.");
    else if (player.body.balls.count > 0) CView.text("  She even cups your tender [balls] and lightly massages them.");
    else if (player.body.vaginas.length > 0) CView.text("  She even lightly caresses the lips of your pussy.");

    CView.text("\n\nYou cum a hot shot down the sand-witch's throat.  She swallows the seed and opens her mouth, but not to show you how good of a slut she is.  No, she does it to show her \"<i>friends</i>\" she did their dare.  The girls cheer at the cock sucking whore as she stands with the smell of cum on her breath and joins them in spectating.");

    CView.text("\n\nThe sand witches keep taking turns humiliating you by making your little cock shoot and leak out cum, draining of you of all your seed until you finally black-out from dehydration.");

    // [if for fun]
    if (DesertCaveFlags.SAND_WITCHES_FRIENDLY > 0) {
        CView.text("\n\nYou wake up hours later outside the dungeon with all your belongs and surprisingly not missing any gems.");
        player.orgasm();
        player.stats.lib += 1;
        player.stats.sens += -1;

        return { next: passTime(1) };
    }
    // [Bad end for small cocks]
    CView.text("\n\nYou spend the rest of your life being a bitch to the sand witches.  Kept naked and hard all the time, you're chained-up like an animal in the chamber with your hands tied behind your back, making sure you don't play with yourself.  The witches do mess with you from time to time, but mostly they just let you drown in your lust.  Many nights you yearn to feel the touch of your mistresses. You want them to humiliate you if it means they'll pleasure your little cock.  Sometimes, when a group of witches walk by, you try to look as wanting as possible.  They just walk by, saying how desperate and sad you look, leave you alone with that raging hard-on.");

    CView.text("\n\nYour only saving grace are the new witches who came of age throughout the years and join the rest of their sisters in the fun.  A lot of them seem to like you, and sometimes they use you to practice spells.  Your hair has been sandy blond for a long time now, and your chest has been leaking milk too.  Besides the spells, they like to practice fucking with you.  They are nice and gentle at first but become more demanding and demeaning as time goes on, up until they forget about you.");

    // [END]
    player.orgasm();
    player.stats.lib += 1;
    player.stats.sens += -1;

    player.stats.HP = player.stats.maxHP;
    return gameOverMenu(player);
}

// Female
// Lesbian gang-bang
export function femaleGirlsLoseToSammitches(player: Character): NextScreenChoices {
    // Lesbian gang-bang, some leave and come back with sex toys.
    CView.text("\n\nTwo witches spread your [legs] and hold them apart.  You're about to yell out in protest, but one witch plants her two cunts over your face and begins riding your [face], quickly muffling you before you can make a peep.");
    if (player.body.face.hasMuzzle()) CView.text("  She fucks your muzzle like a cock as it goes into one cunt while she plays with the other one.");
    else CView.text("  She grinds her dampening pussies against your lips while her clits are pressed up against your nose.");

    CView.text("\n\nYou try to thrash your arms, but two more witches sit on them, grinding their slut-holes onto your arms in a perverted way to restrain you.  The witches on your [legs] see how creative their sisters are being and follow their example, spreading your [legs] farther apart turning them into their pleasure toys as their wet pussies start to rock back and forth.");

    CView.text("\n\nTwo witches leave the room while the other ones wait in line for a spot on the new slut.  The four girls getting off on your limbs are moaning in delight as they play with their milky rows, squeezing some out onto your body.  ");
    if (player.body.vaginas.length <= 0) {
        CView.text("Amazingly, as the oil spreads over your crotch, the flesh splits, revealing a small, wet entrance with a little clit.");
        player.body.vaginas.add(new Vagina());
        player.body.clit.length = 0.25;
    }
    CView.text("Their warm streams run all over your form: down your [chest], off your [hips] and teasingly around your [vagina].  At this point, you want it so badly that you squeeze your chest, pinch your nipples and stroke your [clit].");

    CView.text("\n\nHowever these girls hold you from that pleasure, leaking their juices all over your limbs, as they moan with the bliss you so want to feel right now.  The other witches, how you envy them, are able to feed their wanting with light strokes and gropes as they watch their sisters in action.  Some even lend a helping hand to the more lusty witches, fingering their wet pussies and groping their milk-filled teats as the horny whore holds onto them in her lust filled daze.  If only you were so lucky.");

    CView.text("\n\nYour [vagina] is so hungry to feel the touch of anything right now, \"<i>They're doing this to you on purpose,</i>\" you think as your [vagina] trembles with cock-milking clutches.  Your eyes are dazed in agonizing lust, and you see the two witches who left have came back through an archway into the chamber, carrying bundles of something in their arms.  The other witches all look glad to see those two girls.");

    CView.text("\n\n\"<i>Sorry it took so long, the pregnant slut wanted to do some role-playing,</i>\" one sand-witch says as she drops her bundle to reveal that she's fully naked and wearing a huge dragon cock strap-on.  The dropped bundle is a variety of attachable sex-toys.  Many have multiple shafts and come in shapes from standard to canine to obscenely equine.");

    CView.text("\n\nAll the spectating witches go over to the pile of sex toys while casually discarding their clothing to the side, leaving you alone with the slut ");
    if (!player.body.face.hasMuzzle()) CView.text("grinding on your face");
    else CView.text("fucking your muzzle while she plays with herself");
    CView.text(" and the four others whining out their enjoyment, making your own pussy feel neglected and needing something to fill it.");

    CView.text("\n\nThe witches by the fake dick pile are kneeling down, each selecting their equipment in their own unique way.  Some just hold a cock in their grip, look at it, and just throw it back into the pile.  Others measure theirs by sucking on it like a real cock, shoving the monstrous toys down their throats.  It's amazing how much they can take.  Finally, the other few take a test ride on the pricks they pick.  All of the riding witches take more than one of the obscene toys into their bodies, their stomachs becoming deformed as two phallic shapes push up against their flesh.  These girls make some of the loudest moans you've ever heard as they pound and slam their cunts on the toys, spraying out large rivers of girl-cum onto their sisters and the others toys as they make climatic moans.");

    CView.text("\n\nYour attention is brought back to the sand-witches on your body as the one on your face cums directly into your mouth, making you flinch.  The warm flood of cum spill over your arms and [legs] as well.  The witches on you are pushing their cunts as hard as possible, and they hold onto your body, making one last booming moan.  Grinding their cum-sloobering pussies in the afterglow, they pant out in exhaustion.  Once they finally devour every little bit of pleasure they can get from you, they get up and join their sisters in the sex toy display, leaving you alone, covered in milk and cum, eyes practically glued shut with caked-on lady-cum.");

    CView.text("\n\nWho cares-your hands are finally free.  You shoot one down to your sex, happily fingering the soaked hole and stroking the [clit].  One witch who already picked her strap-on, a hard cat cock with soft rubbery barbs, sees you having fun and runs over to stop you.  There's a quaint struggle, but she holds your hands up and saddles herself on your stomach, her kitty cock resting ");
    if (player.body.chest.sort(BreastRow.Largest).get(0)!.rating >= 1) CView.text("between");
    else CView.text("on");
    CView.text(" your [chest].");

    CView.text("\n\n\"<i>Hey girls, hurry up and pick a cock already!  The ");
    if (DesertCaveFlags.SAND_WITCHES_FRIENDLY > 0) CView.text("slut");
    else CView.text("initiate");
    CView.text(" is getting a bit randy!</i>\"");

    if (DesertCaveFlags.SAND_WITCHES_FRIENDLY > 0) CView.text("\n\nYou would think more on that word, but you're too focused on the cock toy on your chest. You look at it with lust in your eyes and beg its owner to fuck you with it, make you cum with it, to make you her bitch.");

    CView.text("\n\nAll the other witches gather a great variety of fake cocks to surround you.  The witch sitting on top of you gets off and sits you up on your knees, keeping your hands behind your back and whispering in your ear that they'll all give you all the \"<i>cock</i>\" you want, but you have to show them you have the skills.  She throws you onto your hands, and three witches stand before you. Their fake animal cocks all point at your face as they smirk at you.");

    CView.text("\n\nYou reach out and grip the cocks to your left and right while your mouth sucks on the one in the middle.  The sand-witches smile like fiends as you try your best to serve them, though the only pleasure they'll get is seeing how desperate you look.  You're so willing to please them in hopes that they will fuck you.  The witch with the cock is groping your [chest], playing with and pitching your [nipples] as she slides the barded-covered cock between the lips of your [vagina].  The small little nubs scratch at your cunt and tease your clit, as the toy rapidly grows lubricated with your own juices.  She murmurs in your ear.  \"<i>Good little cock sucker.  Do you want your rewards?</i>\"  With a toy-prick still in your mouth, you smile and shake your head 'yes'.  The kitty-witch pulls you off the cocks you're pleasing and turns you around, making you sit on her crossed [legs], her kitten dick pushing against your [vagina] and stomach like it was alive.");

    CView.text("\n\nYou bend your knees up and hover your drooling pussy over the cat-cock and slam down onto it with no hesitation.  You feel so full and blissed as splashes of your fuck-lube squirt from how hard you're pounding yourself onto the sand-witch's \"<i>cock</i>\".  You ride her like a crazed slut, moaning and screaming as your fucking shakes the witch's body, jiggling her milky mounds.  Other witches present their faux erections to you, and you happily take one, suckling on anything you can while the other ones rub them on your " + skinFurScales(player) + ".  They can't feel the sensations like proper penies but they're getting off on the very act of rubbing phallic objects over every inch of such a whorish individual.  These girls proceed to kiss and lick each other as they massage their strap-ons all over your body.");
    displayStretchVagina(player, 30, true, true, false);

    CView.text("\n\nYou're already messily cumming on the crotch of the cat-cocked witch.  Not taking one moment to stop for your climax, you continue to fuck the artificial erection you so desperately wanted.  The witch grabs your [butt] and lifts you up as she stands, even though you're still thrusting your [hips] towards her cooch.  She spreads your asscheeks and announces, \"<i>Which one of you other sluts wants this ass?</i>\"");

    CView.text("\n\nThe witch with the rigid draconic cock steps up and helps her sister support you as she directs her toy tool towards your [asshole].  Your cheeks clench around the dragon-toy as you feel it push against the hole.  You ignore it, much to the witch's frustration as she tries to penetrate you.  The only thing you care about is stuffing your pussy right now. The dragon-endowed witch has to memorize your thrusting and waits for the right moment.");

    CView.text("\n\nWith a well-timed thrust, she impales her entire plastic pecker into your [asshole], making you freeze in surprise.  You would have fallen butt naked to the ground if you weren't being held up by these witches and their \"<i>cocks</i>\".   At least they have the courtesy to keep giving you pleasure while you're stopped.  Both of  their unique cocks are inside you, the barbed cock pleasingly scratching your pussy walls while the ridged cock pushes and pulls through your ass.  You can feel them rubbing against each other from within their respective fuck-holes.  All the sensation you were craving is now being given to you.  Your mind is hazy as you look at the witch's black glossed lips, your own parted in your daze.");

    CView.text("\n\nThe witch licks her lips as she sees how interested you are in them; she pouts her lips for a moment, giving an invitation for you to go for it.  You move in close and dreamily kiss her, your tongues dancing with one another as both your [asshole] and [vagina] keep getting fucked with artificial cocks.");

    CView.text("\n\nYou cum, seemingly without any build-up, and then it happens again, and again... It just comes and keeps coming.");

    CView.text("\n\nThe next few hours are a blur.  You remember being on your knees then sucking a cock while your pussy is licked, stroking three cocks with your hands and [feet] and even being completely upside down at one point.  Then things gradually fade to black...");
    player.orgasm();
    player.stats.lib += 1;

    // [Next]

    if (DesertCaveFlags.SAND_WITCHES_FRIENDLY > 0)
        return { next: sandWitchMobNotBadEnd };
    else
        return { next: sandWitchMobBadEnd };
}

// [if for fun]
export function sandWitchMobNotBadEnd(player: Character): NextScreenChoices {
    CView.clear();
    CView.text("You wake up hours later outside the dungeon with all your belongings, surprisingly not missing any gems.");
    player.orgasm();
    player.stats.lib += 1;
    player.stats.sens += -1;

    return { next: passTime(1) };
}

// [Sand-witch mob Bad end for Females]
export function sandWitchMobBadEnd(player: Character): NextScreenChoices {
    CView.clear();
    CView.text("When your mind finally starts straightening things out, you wake up on a bed with your ass, cunt, and more sore than you can remember.  You rub the achy bits as you notice a cloaked figured with a wide-brimmed pointy hat sitting by your bedside, reading a white book.  When the figure sees you've awaken from your slumber, she places a bookmark in the volume and sets it on the nearby nightstand.");
    CView.text("\n\n\"<i>Good morning sister, did you have a nice nap?</i>\"");

    CView.text("\n\nSister? You're not related to this girl... are you?");

    CView.text("\n\n\"<i>Looks like you stumbled into the commons again. You know you're not supposed to go there until you've learned all your spells. Those girls will fuck you raw... which they did.</i>\"");

    CView.text("\n\nOh yes, how could you forget something like that? You've been told hundreds of times before to avoid that place.  Well, you won't forget that anytime soon with how sore and tender your holes are.");

    CView.text("\n\nThe cloaked girl stands up and pulls the blanket off your naked body.  You have bronzed skin, sandy blonde hair, two sore pussies and three rows of decently sized, milk-leaking breasts.  The cloaked girl hands you a mirror for you to look at yourself with.  Yep, you have a normal feminine, human face like you've had your whole life... right?");

    CView.text("\n\nShe helps you out of the bed, and you get a better look at her face, which is almost as dark as the cloak and hat she wears.  The ebony girl reminds you that you can't leave the sanctuary until you've learned your spells and then, pulls you in close, explaining that you'll never get to experience a proper fucking or taste her cum until then.  You look down at the crotch of her robes and see she's pitching a very big cock-tent.  You promise the well-endowed herm that you'll try to do your best, and she gives you a nice pat and grab on your [butt] as you run back to start studying.");

    CView.text("\n\n<b>A few months later...</b>\n");
    CView.text("After weeks of studying hard, you've finally learned everything there is to know about being a sand-witch. You've been given your desert-colored robes and are allowed to join the other witches in the commons, and can even leave the sanctuary.  After your first appointment with the Cum-Witch, you take a nice walk outside with cum drooling from both your cunts, travelling down your legs and leaving a soaked trail to follow. It feels a bit like deja vu as you take your first steps into the world.  You just shake it off.");
    CView.text("\n\nYou wander around the desert for a while, muttering an introduction of who you are and what you want to do.  Then, you see a figure walking along the dunes. Okay, time to show them your stuff.  Getting to the figure, you announce yourself:");
    CView.text("\n\n\"<i>Excuse me, I'm a sand witch, may I cast a spell on you?</i>\"");
    player.stats.HP = player.stats.maxHP;
    return gameOverMenu(player);
}

// *Membered Folks Get Milked
export function memeberedFolksFindTrueWuv(player: Character): NextScreenChoices {
    CView.clear();
    // HP
    if (player.stats.HP < 1) {
        CView.text("Slumping down under the weight of your myriad injuries, you fitfilly struggle to hold yourself upright.  The struggle proves to be in vain when your [legs] fold and the ground rushes up, filling your view with hard-packed earth for the split-second before you impact.  Stars and blackness fill your vision as you lie there dazed, too hurt to even make an attempt at rising.  High-pitched, feminine titters of laugher irritate your ears as the girls react to your state.  Well, you'll show them.  You use every ounce of your willpower to force your arms into action, and with all the speed of a wallowing pig, you roll yourself over.  The effect is less than impressive, but at least you can see the crowd of woman looming over you.  The shadows from their numerous, milky bosoms cast you into darkness as the enormity of your defeat sets in.");
        CView.text("\n\nA short witch shoulders through her sisters to appraise you.  Her sisters part before her confident strides with a suprising degree of deference, even though this woman is at least a foot shorter than most of them.  She doesn't even have huge breasts!  They might be double-D's or E's if she's lucky.  Obscuring a great deal of the right half of her face, a swirling tattoo with patterns intricate enough to make your vision swim clearly differentiates her from her cohorts.");
        CView.text("\n\n\"<i>An interloper, huh?  Well, now that you've found us, we can't exactly let you go free, can we, sisters?</i>\" the diminutive enchantress says with an icy undercurrent of dark promise.  A murmured but incomprehensive babble of assent is voiced by the crowd.  Shit, you're in deep here.  The tattooed tramp casually hovers her palm over your face and begins to chant nonsensical words.  Any second now, there'll be an explosion of flame, or a clap of sandstone, and you'll be burned or pulped into the next world...  You close your eyes and breathe deep, savoring what's sure to be your last breath of cool, fresh air.");
        CView.text("\n\nYour pain fades under a numbing explosion of warmth, leaving you feeling whole and hale.  Is this... death?  The pleasant heat slowly circulates through your extremities before nestling in your chest.  Your heart beats faster, pounded on by an overexcited drummer somewhere inside you.  Wait, dead people don't have heartbeats.  You open your eyes and look up into the witch's smiling face, illuminated by her glowing tattoos as the rest of your injuries vanish.  Rolling her wrist to make her hand and fingers twirl above you, she stokes the artificial calefaction hotter.  A twitch within your [armor] alerts you to a new feeling that's spreading through you - lust.  The hotter it gets, the faster your heart beats and the harder [eachCock] grows.  You whimper as the ardor savages your restraint, causing you to whimper and paw at your tenting, twitching bulge.  Scraping against the insides of your gear, your [nipples] are in no better shape.  They faintly ache to be touched");
        if (player.body.chest.find(BreastRow.FuckableNipples)) CView.text(", fondled, and fucked");
        else CView.text(" and fondled");
        CView.text(".");
        if (player.body.vaginas.length > 0) CView.text("  Your [vagina] even gets in on the action, converting your undergarments into a swampy mess of female pheromones and dripping lubricant.");
    }
    // Lust
    else {
        CView.text("How... how can you resist any longer?  The witches step closer, their heaving chests just out of arms' reach, tented by hard nipples, some moist with milk while others are barely lifting the fabric.  Maybe some of those puffy areolas are hiding some cute, little inverted nipples?  Gasping at how hard [eachCock] has become, you sink down on your [butt] and start to grope yourself through your [armor].  Fuck, you hope these hot babes are going to have their way with you...");
        CView.text("\n\nOne of them, a shorter girl with a mass of interlocking arcane tattoos emerges from the crowd.  She's got a tight body with two surprisingly modest sets of DD-cup tits.  If she weren't nearly a foot taller than the rest, those boobs would look tiny by comparison, but they're perfectly proportional for her frame.  The other girls give her plenty of room as she closes in on you, perhaps out of respect or fear.  She eyes you while you lewdly grope yourself, eventually speaking.");
        CView.text("\n\n\"<i>Interloper, you have found our coven.  Regretfully, we cannot allow you to leave with this knowledge.  From this moment forward, you are dead to the outside world.</i>\"");
        CView.text("\n\n...What!?  The thought is enough to stay your hands and aching genitals.  Are they going to... kill you?  The panicked look must be showing on your face, because the spellcaster suddenly starts laughing.");
    }
    // MERGE
    CView.text("\n\n\"<i>You didn't think we were going to kill you, did you?</i>\" purrs the petite witch.  \"<i>Just because we can't let you leave doesn't mean you have to die.</i>\"  Slowly caressing your chin, she admits, \"<i>You can serve us in other ways.</i>\"  Her hand slips through your [armor] to affectionately squeeze [oneCock].  You groan as your fingers dig into the dirt and your back arches to lift your [hips] firmly into the palm of her hands.  A whisper of excitement runs through the crowd at your intense reaction.  Slowly starting to stroke it, she purrs, \"<i>Girls, I don't think the Sand Mother will object if we claim this one as the coven's newest toy.  Let's take " + mf(player, "him", "her") + " back and have some fun.</i>\"");
    CView.text("\n\nWhen the palm removes itself from your stiff protrusion, you cry out in disappointment, pleading with her to continue.  Your need is almost supernatural at this point - if you don't get some friction on [oneCock] soon, you're sure you'll go insane!");
    CView.text("\n\n\"<i>Now now, patience, pet.  We'll have you comfortable soon enough,</i>\" the leader promises with an undercurrent of... is that compassion?   She pets your head as her sisters cluster around you, dozens of breasts pressing in on you from all sides as you're lifted up by a crowd of lustful arms.  More than one hand finds a nipple to tweak, a butt-cheek to squeeze, or orifice to play with, and as you're carried down the tunnels your [armor] vanishes, bit by bit, pulled away by the crowd's kleptomaniacal grip.");

    CView.text("\n\nA hand discovers [oneCock]");
    if (player.body.cocks.length === 2) CView.text(" while another grabs your other one");
    else if (player.body.cocks.length > 2) CView.text(" while others latch onto the rest");
    CView.text(", and the stroking starts up again with an immediacy that's too much for your overstimulated body.  [EachCock] belches out a stream of white liquid love, straight into the crowd of giggling women, but they don't seem to mind you stickying their hands, robes, and skin with your spermy deposits.  It's an intriguing new experience for them - it must have been some time since they've had the chance to dominate a penis so completely.  Moaning, you bounce along in an orgasmic haze, spurting the whole way into your new home, not registering your own arrival until the splooge-slicked palms release your " + describeCocksLight(player) + " and leave you to blurt a small rope onto your own belly.");

    CView.text("\n\n\"<i>Oh, that won't do,</i>\" the short witch coyly proclaims, \"<i>We're going to have to work on your stamina if you're going to be a good toy for us.  Lucky for you, we have just the thing for that!  Bernice, bring our other captive over here!</i>\"");
    CView.text("\n\nAnother robed woman, who must be Bernice, comes out dragging a wheeled cart.  A shiny cage covered in seals and scrolls sits on top of it.  The papery coverings rustle ominously as it comes closer, barely allowing you a peek at coils of purple skin within, their moist, rubbery texture glinting through the bars.  Bernice bows before the tattooed boss-woman and says, \"<i>Here she is, Dara, but why can't we play with the new toy first?</i>\"");
    CView.text("\n\nDara, the one who's been in charge this whole time answers, both to her subordinate and you at the same time, \"<i>The new pet already blew " + mf(player, "his", "her") + " load all over us, remember?</i>\"  She licks some of your salty issue from her thumb.  \"<i>We'll let her train our drained arrival until " + mf(player, "he", "she") + "'s up for playing whenever we are.</i>\"  This seems to satisfy Bernice, but you're dealing with equal parts fear and confusion.  What the fuck is this thing, and if it's a tentacle monster, why is it a 'her'?");
    CView.text("\n\nDara shoos her compatriots towards the exit and approaches the cage.  Tearing off one of the seals, she holds her palm in front of the gap, looking at you expectantly.  A purple-hued tendril emerges from the opening, placing itself obediently into Dara's sperm-slicked palm.  At the salty contact, the phallic-looking tip folds back on itself, exposing a pinkish maw that drips clear strings of lubricant.  It mashes itself against the nutritious moisture while its hundreds of cilia stretch out to lick every bit of goo, only stopping when the tattooed caster's hand is cleaned of sperm and soaked with lubricant.");

    CView.text("\n\n\"<i>She wandered in from the desert.  A few of the girls found her dying in the dunes, a wilted, pathetic little thing.  It was awful!  We brought her back and nursed her back to health with milk and what cum the Cum Witch would spare for us.  The Mother didn't approve, but we kept it contained, and we've been purifying it ever since.  You see, these beasts aren't demons, though they are corrupt.  That means they can be purified, and this one has been... mostly.  We-we're still working on it.</i>\"  Dara rubs her hands together a little nervously, inadvertently smearing the creature's juices around and shuddering.  \"<i>Uh...  anyway, she's been a real trooper through it all, and she doesn't talk much, but she's very attentive, and in a few months she might even be able to go around on her own.  Of course, she'll still need milk and cum to live, so you two are a natural fit!</i>\"");

    CView.text("\n\nDara releases the probing vine-cunt and steps back to you, taking ");
    if (player.body.cocks.length > 1) CView.text("a ");
    else CView.text("your ");
    CView.text("flaccid penis in her hand and beginning to smear it with the tentacle-creature's leavings.  You begin to flush with heat immediately, going rock-hard in her grip with three hard hammers of your heart.  Your tanned captor smirks as she releases your tumescent shaft, stepping back towards the throng of smiling girls at the doorway.  She's blushing quite a bit, but her voice is steady as tempered steal as she says, \"<i>By the way, its lubricant is an aphrodisiac.  We'll check back on you in a week or so.</i>\"  One side of the cage opens, and the witches leave, sealing the door behind them.");
    CView.text("\n\nThe female tentacle beast, if that's what it is, doesn't look much like what you would expect.  Most of its bulk seems to be comprised of wiggly, wet protrusions, each long and prehensile, stacked up so that the creature's resting posture reminds you of a plate of spaghetti with a big purple meatball on top of it.  That central bulb, for lack of a better term, is smooth, mottled purple and green, and wet with glossy moisture.  You can't see eyes or a mouth, but it pivots upon its limbs to regard you all the same.  It locomotes out of its cave in a flailing crowd of wiggling limbs, stretching out to fill the bulk of the room with phallic, vermillion protrusions.  A few of them have already opened up to expose their textured, contoured interiors.  Some have long fibrous cilia thin enough to appear like pink lace inside them.  Others have coarse nubs.  Some gape wide at their entrance, moulded to accommodate obscene, canine swelling.  This creature seems made to please penises, but it hasn't forced itself upon you just yet...");
    CView.text("\n\n\"<i>Hi,</i>\" the creature suddenly intones, its voice sounding a set of quadruplets speaking in perfect harmony.  \"<i>I hope, uh, you don't mind me... um... ooooh!</i>\"  She interrupts herself when one of the floral pussies darts forward, latching onto [oneCock] with unquenchable hunger.  The slimy interior isn't as warm as you would have thought, but it is filled with tiny, vibrating nubs, large enough to press on your sensitive nerves while her lubricants seep into your skin, bringing with them even more unnatural excitement.  [EachCock] puffs up with unspent need, swelling to a full, aching hardness");
    if (player.body.balls.count > 0) CView.text(" while your [balls] start to work, clenching and relaxing as they brew a thick load of fuckbatter thanks to the chemical jump-start.");
    else CView.text(" while your body starts to work, clenching and relaxing as it rushes to brew a thick load of fuckbatter thanks to the chemical jump-start.");
    CView.text("\n\n\"<i>Whoops!</i>\" the creature says, \"<i>It's so hard not to...  Mmm... that feels good...</i>\"  Its rounded surface blushes a darker purple.  \"<i>Right!  I don't get much cum, and having someone like you here is pretty great for me.  Bernice said I can.... ugh... yeah...</i>\"  The purplish, prehensile pussy bottoms out around your [sheath] and the lumps begin to vibrate faster and faster.");
    if (player.body.cocks.length > 1) {
        CView.text("  Similarly textured cunnies playfully snake around your other phallus");
        if (player.body.cocks.length > 2) CView.text("es");
        CView.text(", gleefully slurping up your twitching hardness inside ");
        if (player.body.cocks.length === 2) CView.text("itself");
        else CView.text("themselves");
        CView.text(".");
    }
    CView.text("Slurping noisily, the cunt");
    if (player.body.cocks.length > 1) CView.text("s piston");
    else CView.text(" piston");
    CView.text(" and bob, splattering ");
    if (player.body.cocks.length > 1) CView.text("their");
    else CView.text("its");
    CView.text(" dripping saliva all over your exposed crotch.  Your [hips] lurch up to meet the hungry tentacles.  Feeding the creature's cum-lust is something your body seems driven to do at this point, and you gurgle in wordless delight at her ministrations.");

    CView.text("\n\nThe creature darkens, its central core wobbling in a decidedly jello-like fashion as it breathily says, \"<i>Wow, you taste good!  Mmmm, we'll be good friends, right?</i>\"");

    CView.text("\n\nYou grunt and cum to the sound of her melodious voices.  Offering up a torrent of sordid semen, [eachCock] packs its tubular mate with a big, thick load.  The surface of the cock-stuffed tendril distends from the weight of your sensual deposit, forming a bulb that is slowly pulled towards the core just in time to make room for your next ejaculation.  A pleasant yet painful ache develops in your [balls] by the time you finish and flop nervelessly onto your back.");
    CView.text("\n\n\"<i>Oh no!  Here, drink some of this!  It'll make you all better!</i>\" the monstrous female offers, pressing a pouty pussy to your mouth.  You're too drained to fight and too thirsty not to drink.  Besides, the way her aphrodisiacs are affecting you, having a mouth full of cunny seems kind of good.  You weakly grab hold of the tubular organ and begin to explore it with your tongue, moaning when a gush of fresh, fruity fem-jism explodes into your throat.  It's... it's... delicious!  You swallow the nectar with gusto, chugging the stuff, oblivious to the way it makes your " + describeSkin(player) + " burn with heat or how cum has begun flooding and bubbling in your [balls].");

    CView.text("\n\nA slobbery cunt trails its moist juices on your cheek tenderly, and her voices proudly say, \"<i>You must really like me!  Wow, what a relief.  You seem pretty busy, and ummm... that feels really, REALLY good, so I think I'll just- unghhhhh...</i>\"  She pants a few times.  \"<i>...uh, feed you while you feed me!  My juices are supposed to make you cummy and horny enough to keep up with me.  Isn't that great?</i>\"");
    CView.text("\n\nYou nod into her pussy as the immense, swelling load inside you grows larger yet.  Feeding her is going to be lots of fun...");
    player.orgasm();
    player.stats.lib += 5;

    // [Nest]

    return { next: memeberedFolksFindTrueWuv2 };
}
export function memeberedFolksFindTrueWuv2(player: Character): NextScreenChoices {
    CView.clear();
    CView.text("<b><u>One week later...</u></b>\n");
    CView.text("The door cracks open, shedding light on the sordid, coiled scene that you've spend the past few days languishing in.  At some point, you learned that your companion had been named Ophelia by the sisters, and as your cum-spurting, pussy-licking, cock-milking orgy continued, you were drawn closer and closer to her.  Sure, the first night you slept alone (or as alone as you can be with a bundle of tentacles ");
    if (player.body.cocks.length === 1) CView.text("fighting over your cock");
    else CView.text("milking your cocks");
    CView.text(", forcing you to wet dream after wet dream), but she was always kind to you, even if you didn't get a choice in how often you'd be brought to orgasm.  The second night you slept in her coils.  The third night, you had begun to genuinely like her.  The fourth, she showed you her primary vagina, and you slept beneath her, letting her ride you through the night.");

    CView.text("\n\nNow, you're cum-drunk on love and the tender affections of your aphrodisiac-drugging lover.  You've fed on nothing but her juices this whole time, but she has LOTS of juices, all of varying flavors and consistencies.  You've sampled every one of her tentacles orally and phallically, and you still haven't picked a favorite.  Well, her primary cunt, on the bottom of her bulb is a maestro that can direct a sexual symphony around [oneCock], but it doesn't taste as great as some of the others.  Your waist is pinned in there right now, though you're sitting up and hugging her smooth, moist mass, grinning dopily at the doorway as Dara smells the scent of a week of solid sex.");
    CView.text("\n\nJuice gushes out between her thighs as her nostrils flare, drinking down days of distilled pheromones.  Her skin flushes red and her knees quake.  Grabbing hold of the doorway for support, she meekly gurgles, \"<i>Oh gods,</i>\" before cumming again, splattering her juices all over the floor.  With her tongue lolling out, she maintains the strength of mind to advance through the fuck-mist and grab you around the shoulders.  Ophelia plucks a number of bottles from Dara's waist with her limbs, but otherwise, she doesn't resist.  Her voice bubbles happily even as you're pulled out of her cunt, \"<i>I'll see you soon, love.  I'm sure our owners have some more things to teach us both before we meet again!</i>\"");
    CView.text("\n\nDara slams the door and collapses onto you, both bodies tumbling to the floor.  Her face lands on your hips, just close enough that her lips and nose rub along [oneCock].  The tanned, tattooed beauty moans out loud, shivering with untapped need while her dual cunts drool like sieves.  She climbs atop you with a second thought, taking you in the middle of the hall while her sisters watch, many of them already jilling off after catching a hint of the sealed-off breeding aroma.  \"<i>Fuckfuckfuckfuckohgodsitssogooooood....</i>\" Dara cries.  Her sexual utterances are muffled by a second pair of curvy hips when Bernice sits on your face, rubbing your nose against her stiff clit while her juices gush down your throat.");
    CView.text("\n\nYour body is well trained by its time in captivity, and you immediately and messily orgasm for your feminine overlords.  Your hands are stuffed up waiting, well-stretched pussies as you thrash in sensual ecstasy.  Bliss and conditioning take over, forcing you to slurp and lick, to please the pussy before you while cumming for another.  The Sand Witches seemed to have expected something like this, but not to such a powerful degree.  They make the most of the situation by fucking you, one after another.  Sometimes they fist their creamed-cunts on you or make out with you while you're breeding their sisters.  Other times, you're only dealing with fresh, unfucked pussies.");
    player.orgasm();
    player.stats.lib += 5;

    // [Next]

    return { next: memeberedFolksFindTrueWuv3 };
}

export function memeberedFolksFindTrueWuv3(player: Character): NextScreenChoices {
    CView.clear();
    CView.text("You wake from your stupor in a room full of sex toys, some of them being used by the busty witches.  It doesn't take long for one of them to see your state, offer you food and a drink, and present her sopping cunts to you.  You note that these women are both pregnant, but their libidos have obviously gone through the roof.  Thrusting inside her immediately, you gorge yourself on the proffered nourishment and do your duty as a captive love-slave, pleasing their holes again and again until they're so full of your cum that it slops from their lips in lewd waves with every virile ejaculation.");
    CView.text("\n\nSometimes, when you seem unhappy, they let you spend the night with Ophelia.  She's as attentive and caring as when you first met, even if she has grown larger and more powerful.  Her sweet personality shines through despite her inhuman appearance, and she'll tenderly milk you all night long while the two of you share stories of your lives.");
    CView.text("\n\nEventually, she's deemed purified enough to traverse the caves on her own, and though Ophelia does not lactate, the sisters make great use of her fluids.  Your monstrous lover spends most of her time with you, however.  Your adventure ended, but you found a love who genuinely treasures you and ensures that you get to experience dozens of orgasms an hour for days at a time...");
    player.orgasm();
    player.stats.lib += 5;

    return gameOverMenu(player);
}

// PC Wins
export function yoYouBeatUpSomeSandWitchesYOUMONSTER(player: Character, sandWitches: Character): NextScreenChoices {
    CView.clear();
    DesertCaveFlags.SANDWITCH_MOB_DEFEATED = 1;
    CView.text("The sand witches all collapse to the floor in a vast puddle of milk and pussy juice, ");
    if (sandWitches.stats.HP < 1) CView.text("nursing their wounds");
    else CView.text("frantically making out with each other, huddling into a squirming orgy on the floor");
    CView.text(".  You stand alone, the sole victor, triumphant against your enemies; you can easily continue deeper into the caves, now.");
    // PC has sufficient lust:

    const choices: ScreenChoice[] = [];
    if (player.stats.lust >= 33) {
        CView.text("\n\nThen again, given you've now proven your superiority over these witches, maybe it's time to blow off a little steam, hmm?");
        if (player.body.cocks.length > 0) choices[0] = ["Fuck One", choiceWrap(dicksHaveSexWithAWitch, sandWitches)];
        if (player.body.vaginas.length > 0) choices[1] = ["Forced Lick", forceCunnilingusRimjobClitAndNipple];
    }
    // Present PC with Leave and Orgy options
    choices[9] = ["Leave", passTime(1)];

    return { choices };
}

// Dicked Win Sex
export function dicksHaveSexWithAWitch(player: Character, sandWitches: Character): NextScreenChoices {
    CView.clear();
    CView.text("Looking over the ");
    if (sandWitches.stats.HP < 1) CView.text("painfully ");
    CView.text("writhing pile of female flesh, you place your hands on your [hips] and survey the pile for the prettiest of the litter.  They're all gorgeously tanned with lustrous, blonde hair, but there's enough variety in facial features, hair style, breast size, and hips for you to narrow down which one you'd like to take the most.  She's a true beauty in the classical sense, at least facially.  She has a small, button nose, ripe lips, and hair that's tied back in a waist-length ponytail.  Her four breasts are well-rounded E-cups, big and round enough for your fingers to sink into but just barely pert enough not to show any sag.");

    CView.text("\n\nBig, brown eyes look up at you with obvious fear as you approach.  Well, that won't do.  You hold your hand out to her calmly, putting as welcoming a smile as you can for your fallen foe.  She looks around her ");
    if (sandWitches.stats.lust > 99) CView.text("masturbating companions");
    else CView.text("groaning companions");
    CView.text(" for advice but finds none, and with no other choice, she takes your hand and allows you to separate her from her kin.  You put a hand to her cheek and tell her that you won't hurt her.  She and her kind have incited a great deal of lust in you, and while you intend to vent it on her, you don't see why it has to be unpleasant for her.");
    if (sandWitches.stats.lust > 99) CView.text("  Judging by the omnipresent flush on her cheeks and the scent of female honey inundating the air, she's more than ready to help you with your problem.");
    else CView.text("  Her cheekbones slowly color at the thought, turning almost entirely beet-red.  At the same time, her nipples seem to tighten beneath her robes, signalling her body's acceptance of your intent.");

    CView.text("\n\nThe beautiful sand witch shudders and shrugs out of her robes, allowing her four, sweat-glossed breasts to sway free just inches away.  You immediately grasp one in your hand and grope it - not too forcefully, just enough to admire her curvy bosom properly.  She flinches at the contact, but when your exploratory thumb caresses the side of her areola, she tilts her head back and sighs.  A single drop of milk escapes her lusty teat onto your finger, and you lift it to your lips to taste.  Creamy, sweet flavor tickles your tongue.  You hum in unexpected delight, how marvellous!");

    CView.text("\n\nCircling behind the lactating spellcaster, you undress one-handed while you fondle her.  Her perky, hard nipple drips faster and faster as her breast is squeezed and fondled with increasing vigor, your touches spurred on by the burgeoning heat in your " + describeCocksLight(player) + ".  Discarding your [armor], you kiss her delicate shoulders and neck, lingering at the edge of her jaw before you suckle her earlobe briefly.  She shivers against you but doesn't pull away.  In fact, her back arches to press her more firmly against you.  The sorceress practically melts into your arms when you bring your other hand to bear on the other side of her chest.");
    CView.text("\n\n[EachCock] rises up ");
    if (player.body.tallness < 60) CView.text("through her buttcheeks");
    else CView.text("along her arched spine");
    CView.text(", fully engorged and ready for action.  For now, you're content to continue to molest your chosen fuck-toy, dipping a pair of fingers into her ");
    if (sandWitches.stats.lust > 99) CView.text("well-soaked");
    else CView.text("rapidly-moistening");
    CView.text(" cunts in order to make sure she's prepared.  The witch bites her lip to stifle a lewd moan, so you drag the pads of your fingers across each of her clits simultaneously.  This shatters whatever restraint she was showing into a little more than slick cunt-juice.  Even now, it's dripping down her inner thighs.  She's properly moaning with your strokes now, and you judge she's ready.");

    // DAT SHIT FITS
    if (player.body.cocks.sort(Cock.Smallest).get(0)!.area <= sandWitches.vaginalCapacity()) {
        const firstCockThatFits = player.body.cocks.find(Cock.CockThatFits(sandWitches.vaginalCapacity()));
        const secondCockThatFits = player.body.cocks.filter(Cock.CocksThatFit(sandWitches.vaginalCapacity())).get(1);
        CView.text("\n\nPutting her down on all fours, you admire the curve of her bouncy bottom and the glossy moisture that's beading on her numerous, plump cunt-lips.  The witch's pussy is tinged red with her feverish lust and totally engorged.  You can see her twin clits peeking out of her their hoods, just begging to be touched.  Who are you to deny them?  Reaching around her hip, you start to circle a finger around one of the lucky buzzers while you get your " + describeCock(player, firstCockThatFits) + " lined up with one of her cunts");
        if (secondCockThatFits) CView.text(" and your " + describeCock(player, secondCockThatFits) + " aimed at her other one");
        CView.text(".  Her knees buckle, but you're ready for it, and she slides straight onto your supporting shaft");
        if (secondCockThatFits) CView.text("s");
        CView.text(", impaling herself to the hilt.");
        CView.text("\n\n\"<i>Oooohhhh...</i>\" the sorceress sighs as she settles into place.  You cradle her body in your arms, squeezing her four breasts together, enjoying the warmth of her dribbling milk as her ");
        if (!secondCockThatFits) CView.text("pussy clings tight to you");
        else CView.text("pussies cling tightly to you");
        CView.text(".  Supported entirely by your body, the sand witch's muscles go slack (aside from the ones hugging your dick");
        if (secondCockThatFits) CView.text("s");
        CView.text(").  She's breathing nice and heavy as you lift her and swing your hips back, pulling most of your " + describeCock(player, firstCockThatFits));
        if (secondCockThatFits) CView.text(" and " + describeCock(player, secondCockThatFits));
        CView.text(" out before reversing the motion nigh-instantly, slamming yourself in to the hilt.  The once proud enchantress is reduced to a quivering puddle of fuck by your jackhammering thrusts, so taken by the sensations in her quim");
        if (secondCockThatFits) CView.text("s");
        CView.text(" that her brains are practically drooling out of her cunts.");
        CView.text("\n\nYou continue to fuck the pretty, big-breasted sand witch faster and faster, enjoying the way her tits bounce and dribble in your palms, her sisters forced to watch the lascivious way you take her.  They're no strangers to lust, and many of them are openly jilling themselves off to the show in between sucking on the closest girl's teats.  You take one hand back to your partner's mons and press your index and middle fingers onto her clits.  The whimpering sex-puddle in your arms gasps.");
        CView.text("\n\nCircling her buttons as you plow her, you watch with almost detached curiosity as she creams herself around your ");
        if (!secondCockThatFits) CView.text(describeCock(player, firstCockThatFits));
        else CView.text("double dongs");
        CView.text(".  Waves of rippling contractions sheath you in shimmering, ephemeral ecstasy.  Like something clicking into place in your brain, a biological prerogative asserts itself, unleashing a heat that boils up out of your core like lava from a volcano.  [EachCock] spasms and releases a flow of salty jism.  The witch must feel it, because as soon as your seed makes contact with her juicy cunt");
        if (secondCockThatFits) CView.text("s");
        CView.text(", her clingy lips seem to tighten around your girth to seal it in.");
        if (player.cumQ() >= 400) {
            CView.text("  That fails to contain the totality of your virile offshoots, and ribbons of the stuff squirt out the sides of her lips.");
            if (player.cumQ() < 2000) CView.text("  You do manage to gift her with a nice little cum-paunch for her efforts, though.");
            else CView.text("  You're cumming so fast that that venting doesn't help her much.  Slowly, her belly begins to bulge outward.  It stretches and wobbles as it fills with spunk, not stopping until she looks months pregnant.  The liquid way that it jiggles with every movement will reveal the contents of her middle to any who dares look at her.");
        }
        CView.text("\n\nSetting her down in front of her sisters, you let her slide off your ");
        if (secondCockThatFits) CView.text("twin cocks");
        else CView.text(describeCock(player, firstCockThatFits));
        CView.text(" onto the floor as an example of just what you're capable of.  You can beat the best they have and fuck them into a twitching puddle in the dirt.  Though the mob seems cowed by your display of authority, they're still fucking themselves to the sight of what you've done to their sister.  You make the rest of them take turns licking your spent spunk and caked-on cunt-juice from your phallus");
        if (secondCockThatFits) CView.text("es");
        CView.text(" before getting dressed and getting back to business.");
    }
    // Too Big For Fucks
    else {
        CView.text("\n\nYou spin her around without a single word of warning, gently bearing her to the ground.  She groans in disappointment when your fingers leave her silky slits, but when you climb on top of her, her attitude changes.  Your [cock biggest] drops down onto her chest, nudging aside her four pillowy boobs.  Once you're in position, you take her arms and press them down towards her juicy clefts, positioning her forearms on both sides of her busts so that her soft flesh is cushioned and squeezed around your length.  Of course, the extra pressure releases four trickles of milk that dribble onto your [cock biggest] from all sides and turn the witch's chest into a four-piece cock-sleeve for your dick to traverse.");
        CView.text("\n\nThe pretty girl goes knuckle-deep in her multiple vaginas.  Parting in a wordless sigh of pleasure, her lips slowly open, just in time to receive your cock when you make your first thrust.  Your [cockHead biggest] butts past those very same lips, pushing just far enough to bump her teeth before you saw your [hips] back for the next push.  The blonde's legs twitch whenever she hits a particularly sensitive spot.  Grabbing hold of her leaky teats, you start to fuck her quartette of jiggly breasts faster and faster, watching the big boobs jiggle from the fierce tit-fucking you're dishing out, twisting the nipples slightly until she whimpers and groans, all four of her udders fountaining milk.");
        CView.text("\n\nThe splattering boob geysers provide even more lubrication for your furious tit-fucking.  You groan as the hot moisture wicks into your skin and hers alike, revelling in the hot, wet, sloppy tit-fuck.  Dripping with pre-cum, your [cockHead biggest] smashes into her pursed lips again and again, and the witch seems to love it, because she has her tongue swirl in circles around you every time you get within range of her gasping, moaning lips.  The simmering warmth just behind your package incites you to go faster and faster.  You move so quickly that you've broken out in a fresh sheen of sweat, and the heat grows hotter, accompanied by a telltale clenching a surging heat that indicate you're about to crest over the edge of orgasm and cum this girl's pretty face white.");
        CView.text("\n\nMoaning and leaning up, the masturbating witch gratefully takes as much of your [cock biggest] in to her mouth as she can.  It's just in time for her to taste the first ejaculation for a split-second before ");
        if (player.cumQ() >= 500) CView.text("struggling to swallow it");
        else CView.text("swallowing it");
        CView.text(".  She squeezes her arms together, which pushes her boobs tighter around your orgasmically pulsating length.  It feels so good that it feels like a whole new orgasm kicks off in your [balls], even though you've already started to cum!  ");
        if (player.cumQ() < 250) CView.text("The cute woman swallows every single drop.  She even gives up a satisfied moan when she finishes.");
        else if (player.cumQ() < 1000) CView.text("The cute woman's cheeks balloon as she tries to contain it all.  She swallows admirably in spite of your heavy jizz-flow, only losing a few white trickles out the corners of her stretched mouth.");
        else CView.text("The cute woman's cheeks flood with your obscene cum-flow.  She tries to swallow it down, but no matter how fast her fevered gulps are, the stuff still floods in with such force that it squirts from the corners of her mouth.  She just gives up after a few moments and lets it run down her chin in a waterfall.  Most of the jism puddles on the floor below her, soaking into her ponytail and matting it with salty spunk.");

        CView.text("\n\nFinishing up, you pull yourself out of her tits wipe up with her robes, tossing the musky robes on her face as she begins to sluttily keen in an orgasm of her own.  Now to explore the rest of this desert rat cellar.");
    }
    player.orgasm();
    player.stats.sens += -1;

    return { next: passTime(1) };
}

// *Sapphic Win Sex
// Forced cunnlingus, rimjob, and clit-and-nipple sucking.
export function forceCunnilingusRimjobClitAndNipple(player: Character): NextScreenChoices {
    CView.clear();
    CView.text("You eye the defeated mob");
    if (player.stats.HP < 1) CView.text(" through their torn-up robes, noting many large, dripping breasts and more than a few pairs of supple cunt-lips");
    else CView.text(" through their squirming, orgiastic motions, noting their many large, dripping breasts and gushing multi-cunts");
    CView.text(".  They may ");
    if (player.stats.cor < 33) CView.text("be misguided in fighting you");
    else if (player.stats.cor < 66) CView.text("be a little over-zealous in defending their home");
    else CView.text("be crappy fighters");
    CView.text(", but feeling a stirring in your nethers, you can think of at least one good use for them.  You start to strip out of your [armor], groping your butt with one hand; maybe there's a second purpose they can serve...");
    CView.text("\n\n\"<i>Oi, milk bitches!  Get over here!</i>\" you call.  The defeated women morosely respond, though there's more than one gaze simmering with lust as it takes in your nude form.  You ");
    if (player.body.legs.isNaga()) CView.text("slither");
    else if (player.body.legs.isTaur()) CView.text("clop");
    else if (player.body.legs.isGoo()) CView.text("ooze");
    else if (player.body.legs.isDrider()) CView.text("clatter");
    else CView.text("stride");
    CView.text(" up to the nearest one and grab her amber tresses in your hand, pulling her face into your [vagina], her nose squishing partway into your cleft as you grind on her pretty, young mouth.  Oh, that's the stuff.  Her tongue flutters out almost immediately to lap at your moisture.  You'd swear she absolutely loved it if it wasn't for the angry cast of her eyebrows.  No matter.");
    CView.text("\n\nLike the director of a play, you begin to direct the rest of the girls.  First, you want this bitch to enjoy herself like a proper sapphic slave, so you command two of her sisters to eat her out.  They seem reluctant, but they dig into the moist quims all the same.  Oh gods, the difference is night and day.  The tanned sorceress's eyes drift closed, lulled into complacency by the lapping licks her sisters are giving her.  Boldly stroking across your folds, her tongue is eagerly attending to your needs, stirring your body to secrete more of your sticky love-juice, a treat she consumes with gusto.  You pat her head as she settles into a rhythm and try your best to focus on standing upright.");
    CView.text("\n\nThere's still quite a few of them left, so you spread them around in similar fashion - two mouths per witch crotch in an ever-widening pyramid of cunnilingual ecstasy.  You save the lustiest of the pack for last; they're turned on enough to savage their own aching boxes with their fingers while they munch on clam, no stimulation necessary.  Two of them make the twat-centric pyramid look off-balance, so you call them back to you.");
    CView.text("\n\nThe shortest one is going to get the most humiliating job today.  Putting your hands on your [butt], you pull your cheeks apart and command, \"<i>Lick it.</i>\"");
    CView.text("\n\nShuddering, the witch plaintively asks, \"<i>Do I have to?</i>\"");
    CView.text("\n\n\"<i>Yes.</i>\"");

    CView.text("\n\nDropping to her knees, the tanned milk-dispenser slowly extends her tongue towards your [asshole], her four tits smushing up against the back of your [legs] as you shudder in anticipation.  Contact.  You lean on the slit-licker in front of you for support when you nearly collapse, moaning in delight at the feeling of her warm oral organ tickling your nerves as it slithers over your butthole.  Yes, that's nice...  You slowly undulate your [hips] back and forth as your holes are licked and lapped exquisitely.  The heat in your loins is growing hotter, and you know just what you need to cool down the roaring, vaginal fire.");

    CView.text("\n\nGrabbing the taller of the two, you pull her down towards your [clit], hedonistically chasing the seemingly unquenchable lust within.  ");
    // Normal/biggish clit
    if (player.body.clit.length < 3) CView.text("She slurps it right into her mouth with aplomb.  Dancing across the incredibly sensitive surface of your feminine organ, her salacious salivations have an extraordinary level of skill behind them.  You'd be surprised if this was her first time engaging in such an act.  The way she's slobbering at you is making her spit froth, and you smile when her lips meet her quim-bound sisters.  They exchange a happy slurp and muffled moan, half on your [vagina] and half on the other's mouth before returning to their respective tasks.  A pleased hum shivers through your most tender place, and you realize that you're going to cream yourself all over these exotic women.");
    // cock-sized clitty
    else if (player.body.clit.length < 12) CView.text("She slurps it right into her mouth with aplomb, even though it's big and thick enough to give most male's cocks a run for their money.  The way that she salaciously salivates across the surface of your none-too-feminine female organ hints at some practice with someone a little less than female, but you doubt any of these ladies could have given her such training.  Taking it all the way to your cooch, she lets her lips meet her quim-bound sister's, and they share a tender kiss whilst half-engaged with your anatomy.  The pleased hums vibrate all the way through your swollen she-cock, making you realize that you're going to cream yourself all over these exotic women.");
    // big ol clitty
    else CView.text("She dives down onto it as best she can, even though it's a gigantic, throbbing button so large that most men would be shamed to lay eyes on it.  The way she's salaciously salavating over your 'crown' indicates she's no stranger to sucking cocks, but you're sure she couldn't have gotten such practice with these other sluts.  Regardless, she plunges down on your sensitive clit-cock, taking as much of the immense nerve-bundle into her mouth as she can.  Her head bobs tenderly along the length while her hand pumps it fast enough to make her drooling spit froth.  Idly, you realize that you're going to cream yourself all over her and her sister.");

    CView.text("\n\nA thunderclap of cunt-squeezing pleasure explodes through your body from head to [feet], forcing your [hips] to jackhammer against one witch's face.  The girl at your [butt] stays determinately attached to your [asshole] as you cum");
    if (player.body.vaginas.get(0)!.wetness >= 4) CView.text(", spraying your musky girl-goo across the pretty faces at your groin, soaking them all the way to their first rows of tits.  Your juices mix with the milk dripping from their nipples into a sticky alabaster treat that makes you lick your lips and shudder in delight. The seductress on your [vagina] gurgles and sighs as she tries to keep up with your copious lady-spunk, but the way you squirt, she seems doomed to failure.");
    else if (player.body.vaginas.get(0)!.wetness >= 2) CView.text(", sluicing secretions down the lips of your would-be pussy-slave, forcing her to work her throat in order to try and keep up with it.  You're so goddamned wet, and the way your channel is clenching and undulating around her tongue just forces out more of your juice.");
    else CView.text(", dribbling your slippery girl-cum straight into your would-be pussy-slave, forcing her to swallow your tangy flavor.  It's hard not to turn into a dripping mess with the way her tongue works your spasming pussy, but neither of you seems to mind.");
    if (player.body.cocks.length > 0) {
        CView.text("  Above, [eachCock] fires lances of proper, virile spunk onto the girls' exposed backs to properly mark them.");
        if (player.cumQ() >= 500) {
            CView.text("  It turns their bronzed skin into a soupy white, then dangles to the ground in thick ropes");
            if (player.cumQ() >= 1500) CView.text(", each of which begins pooling into a puddle");
            if (player.cumQ() >= 2500) CView.text(".  Those puddles combine to form a lake of jism beneath these lusty slaves bodies, putting their combined milky tits to shame");
            CView.text(".");
        }
    }
    CView.text("\n\nYou flop onto your back, pulling the closest bronzed bodies down with you.  This sets off a domino effect of collapsing witches, all of them falling as the wet honey-pots that they had been leaning into are rudely yanked away.  Lips find your [nipples], and you let them");
    if (player.lactationQ() >= 200) CView.text(" drink their fill");
    if (player.lactationQ() >= 1000) CView.text(", or at least as much as they can handle of your lactic capacity,");
    else if (player.lactationQ() < 200) CView.text(" slowly suckle you");
    CView.text(" while you come down from your high.  Why couldn't they have just done this to start?");
    CView.text("\n\nAfter that morale boost, you climb out of the writhing orgy of fem-flesh and dust yourself off, ready to explore further inside this den of inequity.");
    player.orgasm();
    player.stats.sens += -1;

    return { next: passTime(1) };
}
