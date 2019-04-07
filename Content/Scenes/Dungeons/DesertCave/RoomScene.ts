import { Character } from 'Content/Character/Character';
import { NextScreenChoices, ScreenChoice, choiceWrap } from 'Engine/Display/ScreenDisplay';
import { CView } from 'Engine/Display/ContentView';
import { passTime } from 'Content/Scenes/PassTime';
import { CombatManager } from 'Engine/Combat/CombatManager';
import { Encounter } from 'Content/Combat/Encounter';
import { CumWitch } from 'Content/Scenes/Areas/Desert/CumWitch';
import { EffectType } from 'Content/Effects/EffectType';
import { describeHair } from 'Content/Descriptors/HairDescriptor';
import { playerMenu } from 'Content/Menus/InGame/PlayerMenu';
import { TongueType } from 'Engine/Body/Tongue';
import { Womb } from 'Engine/Body/Pregnancy/Womb';
import { DUNGEON_WITCH_CAVERNOUS_COMMONS, DUNGEON_WITCH_ENTRANCE_GATEWAY, DesertCaveFlags } from 'Content/Scenes/Dungeons/DesertCave/Rooms';
import { Area } from 'Content/Area';

export function enterBoobsDungeon(player: Character): NextScreenChoices {
    return DUNGEON_WITCH_ENTRANCE_GATEWAY(player);
}

export function leaveBoobsDungeon(player: Character): NextScreenChoices {
    CView.clear();
    CView.text("You leave the door behind and take off through the desert back towards camp.");
    Area.transistion('Overworld', 'Camp');
    return { next: passTime(1) };
}

export function fightCumWitch(player: Character): NextScreenChoices {
    CView.clear();
    CView.text("A robed witch crests one of the dunes, her sable skin glistening with moisture in the unforgiving desert sun.  She spies you, and her dusky lips curl up in a smile while a white staff materializes in her hands.  Playfully, the woman calls, \"<i>I'm going to cast a spell on you...</i>\"");
    return CombatManager.beginBattle(new Encounter(player, new CumWitch()));
}

export function openZeDoorToParadize(player: Character): NextScreenChoices {
    CView.clear();
    // Touch Sphere to Open:
    if (DesertCaveFlags.ENTERED_SANDWITCH_DUNGEON === 0) {
        CView.text("You hesitantly touch the dark sphere, admiring its smooth, glossy finish.  Almost as soon as you come in contact with it, it recedes into the wall.  The doorway rumbles, a giant slab vanishing into the sandy depths, opening a portal to the inside.  Meticulous carvings inlaid with pearl depict large breasted witches in great quantity, and though the specific means of the glyphs are foreign to you, it's clear this place is some kind of sanctuary for sand witches.");
        DesertCaveFlags.ENTERED_SANDWITCH_DUNGEON = 1;
    }
    // Repeat
    else {
        CView.text("Just ahead is the familiar sight of the sand witches' coven.  It's hewn from a sandstone archway buried in the side of a dune.  Pearl-inlays of big-breasted, lactating witches decorate the way inside, making it clear what you can expect to find inside.");
    }
    return DUNGEON_WITCH_CAVERNOUS_COMMONS(player);
}

export function pullLever(player: Character): NextScreenChoices {
    CView.clear();
    CView.text("There is a loud rumbling from the direction of the cavernous commons...");
    DesertCaveFlags.SANDWITCH_THRONE_UNLOCKED = 1;
    return { next: playerMenu };
}

// *Take Fertile Pills ✓Kirbu
export function takeFertilePills(player: Character): NextScreenChoices {
    CView.clear();
    if (!player.effects.has(EffectType.Contraceptives)) CView.text("You aren't under the effects of a contraceptive, so taking a pink pill would do nothing.");
    // {Contraceptives}
    else {
        CView.text("It doesn't take you long to figure out that the pink pill should cancel the effects of your contraceptives.  You pop it into your mouth and swallow, feeling a tingle near your crotch after a moment.  You should be capable of bearing children again");
        if (player.body.vaginas.length <= 0) CView.text(", should you ever grow a vagina");
        CView.text(".");
        player.effects.removeByName(EffectType.Contraceptives);
    }
    return { next: playerMenu };
}
// *Take Barren Pills✓Kirbu
export function takeBarrenPills(player: Character): NextScreenChoices {
    CView.clear();
    // {Already contraceptive'ed}
    if (player.effects.has(EffectType.Contraceptives)) CView.text("You're already under the effects of contraceptives.  Taking one of the brown pills wouldn't do anything.");
    // {TAKE DAT SHIT YO}
    else {
        CView.text("You figure one of these brown pills should render you barren, and you pop it into your mouth, not wanting to be impregnated.");
        if (player.body.wombs.find(Womb.Pregnant)) CView.text("  Of course, you're already pregnant, and this doesn't seem to be doing anything about THAT.");
        CView.text("  You do feel an emptiness in your midsection, reassuring you that the pill did its job.");
        if (player.body.vaginas.length <= 0) CView.text("  Now if you ever re-grow a vagina, you should be fine.");
        player.effects.create(EffectType.Contraceptives);
    }
    return { next: playerMenu };
}
// *Friendly Cum Witch Blessing
// ✓Kirbu
export function friendlyCumWitchBlessing(player: Character): NextScreenChoices {
    CView.clear();
    CView.text("You ask the Cum Witch if she could use her magic to gift you with some kind of blessing since she has such an affinity for sexualized magics and fertility.  ");
    if (player.stats.cor < 33) CView.text("Blushing, ");
    else if (player.stats.cor < 66) CView.text("Nervously, ");
    else CView.text("Boldly, ");
    CView.text("you remove your armor, figuring whatever blessing she's going to give is going to be at least a little bit sexual.");

    CView.text("\n\n\"<i>Oh my, you are eager, aren't you?</i>\"  The dusky sorceress circles you as she takes off her hat, shaking her almost platinum-white tresses sensually as she frees them from constriction.  \"<i>Well, I could give you my blessing, but you have to truly want it.  My 'magic wand' will need to be charged up before it can gift you with its power.</i>\" She sheds her robes, exposing her long, ebony phallus, already beading with pre.  It doesn't look like it would need much encouragement to 'bless' you, but perhaps this woman's unceasing sexual conquests have given her stamina beyond your expectations.");

    // {M:}
    if (player.gender === 1) CView.text("\n\nThe cum witch says, \"<i>Since you're being so nice about this, I can bless you with enhanced volume and virility.  All you have to do is help me release some of mine onto you...</i>\"");
    // {F:}
    else if (player.body.vaginas.length > 0) CView.text("\n\nThe cum witch says, \"<i>Since you're being so nice about this, I can bless you with superhuman fertility.  Just a little seed inside you and you'll be swelling with babies.  Doesn't that sound nice?</i>\"");
    else if (player.gender === 3) CView.text("\n\nThe cum witch says, \"<i>Ohhh, a fellow hermaphrodite.  Tell me, would you rather I gift you with unceasing virility or the fertility of a slut in heat?  I can only give you one.</i>\"");
    else CView.text("\n\nThe cum witch says, \"<i>Oh, you lack a gender.  Why don't you pick up some sexual equipment and come back for some real fun.</i>\"");
    // [Virility] [Fertility] [Nevermind]

    const choices: ScreenChoice[] = [];
    if (player.body.cocks.length > 0) choices[0] = ["Virility", choiceWrap(cumWitchBlessed, true)];
    if (player.body.vaginas.length > 0) choices[1] = ["Fertility", choiceWrap(cumWitchBlessed, false)];
    choices[4] = ["Nevermind", changeMindAboutBlessings];

    return { choices };
}
// *Nevermind ✓Kirbu
export function changeMindAboutBlessings(player: Character): NextScreenChoices {
    CView.clear();
    CView.text("Thinking better of it, you grab your [armor] and get dressed, telling the jizz-obsessed enchantress that you don't need her gifts for now.");
    CView.text("\n\n\"<i>Awww, and I thought we were going to have some fun,</i>\" the sable seductress purrs.  \"<i>Perhaps you'll see the error of your ways and come back for a proper blessing soon.</i>\"  She pumps her fat cock until thick dribbles of sperm-tinted pre-cum slobbers out of her drooling dick-tip once more.  \"<i>Don't be a stranger.</i>\"");
    return { next: playerMenu };
}

// *Virility/Fertility
export function cumWitchBlessed(player: Character, virility: boolean = true): NextScreenChoices {
    CView.clear();
    CView.text("Your choice made, you lower yourself until you are seated on your [legs], your face aligned at the perfect height to fellate her drippy, onyx dong.  You can still smell the scent of freshly-fucked pussy hanging around her shaft like some kind of sexual haze.  She saunters up, wide ebony hips swaying hypnotically as her male-half sways pendulously, closer and closer.  Her hands come to rest on your head and run through your " + describeHair(player) + " with slow strokes as she nudges her crown against your upper lip, letting it smear her juices under your nose and across your cheek.  The eleven inches throb pleasantly against the side of your face, the veins standing out in stark relief as you glance down to her orange-sized cum-factories, held in a tight, smooth pouch just below.");
    CView.text("\n\nUnthinkingly, you reach out to fondle the heavy package, your fingers curling around the woman's soft sack and rolling the swollen testes back and forth.  The black beauty grabs her shaft and lays it across your nose, up between your eyes, and onto your forehead, forcing you to go cross-eyed as you admire it.  An electric tingle runs through her fingers and into your scalp, short-circuiting your thoughts for a second.");

    CView.text("\n\n...Her cock is gorgeous.  Your mouth waters just looking at it.  You lick your lips before hesitantly extending your tongue out, lapping at the bottommost portions of her divine dick.  The taste of her sweat and caked-on girl-cum is so strong that it makes you shiver.  Another jolt of power slips into you.  It tastes <b>soo good</b>!  You slobber all over it, trying to gather up every taste of her old, spent seed onto your tongue, your eyes fixated on the erection as it dribbles a trail of liquid need down the bridge of your nose.  It likes you!  A ecstatic thrill shivers through your spine at the knowledge that you've pleased it so excellently, and you gingerly grab hold of it, pulling back so that you can plunge the entire thing straight into your mouth.");

    CView.text("\n\nAs it plunges through your lips, across your wiggling tongue, and into the back of your throat, you stop caring about whether or not you get a blessing out of the deal.  You've got her perfect prick in your mouth where it belongs, and you let out a hum of pure, divine excitement.  Bobbing back and forth, you admire the way your spit froths and shines her glorious rod while you fellate it.  A couple times, you nearly gag on it, but while you're coughing around her meat, the cum witch's hands massage her familiar tingles into you, tamping down any such worry.  The next time you go forward, you let her the entire way into your throat, and it feels oh so good to let her fuck your throat.");

    CView.text("\n\nWrenching your eyes from her thickness, you look up at her innocently, still squeezing her slowly filling sack - those nuts are each big enough to fill a hand at this point.  The sorceress of seed gives you a lascivious smile and begins to rock her hips, fucking your mouth.  You let her have control and purse your lips into a tightly-sealed 'o'.  Fucking your mouth faster and harder, the cum witch sighs and says, \"<i>Oh, your mouth is nice and wet.  Such a tight little fuck-hole you've got there - you'll have my blessing in no time slut.  Doesn't that make you happy?</i>\"");

    CView.text("\n\nGiving a hum of assent, you let the corners of your mouth crinkle upward in a smile as you're used.  It's starting to feel really good, like your throat really is a cunt, a horny, cock-hungry twat that needs to be plowed deep, long, and hard by her thick ebony dong.  It's dripping long ropes of wasted pre-seed into your belly, and it tingles with the pleasant promise of spooge to come.  You waggle your tongue around as best you can to enhance the sensation, getting hotter and hornier with each passing moment.");
    if (player.body.tongue.type > TongueType.HUMAN) CView.text("  Your inhuman tongue slides further and further out, following the witch's bulging, pre-cum filled urethra towards her balls where it can curl around them, embracing them with slick, slippery saliva.  You can taste her unique flavor on her skin, and it makes you shudder with arousal.");

    CView.text("\n\n\"<i>Fuck, I hope you're ready for a blessing,</i>\" the groaning futanari announces as she pulls out.  One of her hands stays on her delicious, spit-and-cum soaked dick, pumping through the frothy mix as she looks at your whorish, pursed lips.  The other stays in your hair, tingling almost constantly as you ready yourself for her anointment, the perfect gift you've been craving.  Your lust has risen to unbearable levels, making ");
    if (virility) CView.text("[eachCock] drip and drool your own seed onto the floor.  The heat inside you is so hot that you can't keep your ardor penned up, and it's slowly boiling out of your [balls] in a pleasure-filled orgasm that provides everything but relief.  You're sure that touching yourself would give you a proper orgasm, but you keep your hands where they belong - on her balls.");
    else {
        CView.text("your [vagina] ");
        if (player.body.vaginas.get(0)!.wetness < 3) CView.text("drip");
        else if (player.body.vaginas.get(0)!.wetness < 4) CView.text("drool");
        else if (player.body.vaginas.get(0)!.wetness < 5) CView.text("leak");
        else CView.text("spray");
        CView.text(" your juicy secretions onto the ground below.  Your lust has risen to such unbearable levels that you're clenching and dripping in orgasmic delight without any release.  You're sure just a touch on your clit would have you cumming your brains out, but you keep your hands on her balls.");
    }
    CView.text("\n\nHer perfect, glossy tip suddenly opens up, and her holy fluid comes out.  You open up to try and catch it on your tongue, to taste her perfect flavor, but it slaps wetly across your forehead instead.  The next blob smears across your cheek, so voluminous that it's dripping from your chin already.  Everywhere her blessed goo touches lights up with pleasure, and soon you ARE cumming, shuddering and shaking with an orgasm of indescribable pleasure.  Your eyes roll back as fat dollops of seed splatter across your [chest] and belly, even your [legs].  You're painted with the stuff, and when you manage to catch some in your mouth?  Your tongue itself cums, spasming and slapping around your mouth, sloshing the tasty stuff around before you convulsively swallow it.");

    CView.text("\n\nYou flop onto your back as she continues to hose you down with her unholy virility, giving you a full-body-gasm of incredible potency.  When you blink the ropes of jism from your eyes and look up with a dopey expression, you see the cum witch banging a sand witch on the other side of the room, already filling the twat with her oozing precum.  A pang of jealousy runs through you before you realize how she made you lust for her juices artificially, but there is a certain fullness in your ");
    if (!virility) CView.text("womb");
    else CView.text("[balls]");
    CView.text(" that reminds you that you got exactly you asked for, even if she made you like it a little bit more than you would have liked...");
    CView.text("<b>");
    if (virility) {
        CView.text("\n\n(Perk Unlocked: Magical Virility - 200 mLs more cum per orgasm and enhanced virility.)");
        player.effects.create(EffectType.MagicalVirility);
    }
    else {
        CView.text("\n\n(Perk Unlocked: Magical Fertility - 10% higher chance of pregnancy and increased pregnancy speed.)");
        player.effects.create(EffectType.MagicalFertility);
    }
    DesertCaveFlags.BEEN_BLESSED_BY_CUM_WITCH = 1;
    player.orgasm();
    player.stats.lib += 1;
    player.stats.sens += -5;

    CView.text("</b>");
    return { next: playerMenu };
}
