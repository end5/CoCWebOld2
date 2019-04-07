import { Character } from 'Content/Character/Character';
import { NextScreenChoices, choiceWrap } from 'Engine/Display/ScreenDisplay';
import { CView } from 'Engine/Display/ContentView';
import { SpriteName } from 'Content/Display/SpriteName';
import { CombatManager } from 'Engine/Combat/CombatManager';
import { Encounter } from 'Content/Combat/Encounter';
import { Gnoll } from 'Content/Scenes/Areas/Plains/Gnoll';
import { ConsumableName } from 'Content/Items/ConsumableName';
import { describeCocksLight, describeCock, nounCock, describeOneOfYourCocks } from 'Content/Descriptors/CockDescriptor';
import { describeVagina, describeClit } from 'Content/Descriptors/VaginaDescriptor';
import { displayStretchVagina } from 'Content/Modifiers/VaginaModifier';
import { Cock, CockType } from 'Engine/Body/Cock';
import { BreastRow } from 'Engine/Body/BreastRow';
import { describeAllBreasts, describeNipple } from 'Content/Descriptors/BreastDescriptor';
import { describeSack, describeBalls } from 'Content/Descriptors/BallsDescriptor';
import { passTime } from 'Content/Scenes/PassTime';
import { randInt } from 'Engine/Utilities/SMath';
import { describeHips } from 'Content/Descriptors/HipDescriptor';
import { describeButt, describeButthole } from 'Content/Descriptors/ButtDescriptor';
import { displayStretchButt } from 'Content/Modifiers/ButtModifier';
import { skinFurScales } from 'Content/Descriptors/SkinDescriptor';
import { Time } from 'Engine/Utilities/Time';

/**
 * Created by aimozg on 03.01.14.
 */

// Gnoll Entrance
export function gnollEncounter(player: Character): NextScreenChoices {
    CView.sprite(SpriteName.Gnoll); // 11;

    CView.text("The sound of distant laughter comes across the plains, then seems to die off suddenly.  A moment later, a gnoll comes bounding from the nearest scrap of cover and barrels into you.  The monstrous thing giggles as it bounces back and forth before you, looking for an opening to exploit.");
    return CombatManager.beginBattle(new Encounter(player, new Gnoll()));
}

// Gnoll Rape
export function getRapedByGnoll(player: Character): NextScreenChoices {
    // Oh shit get anal raped.
    if (player.inventory.items.has(ConsumableName.SuccubisDream)) {
        return yoDawgIHeardULiekGNollBallzzzdahdakjldh(player);
    }

    CView.text("The sound of the gnoll's mocking laughter grates in your ears as you collapse down on your knees before her.  She circles you with the last scrap of her wariness and then surges forward to knock you over, exposing your ");
    if (player.body.cocks.length > 0) {
        CView.text(describeCocksLight(player));
        if (player.body.vaginas.length > 0) CView.text(" and ");
    }
    if (player.body.vaginas.length > 0) CView.text(describeVagina(player, player.body.vaginas.get(0)));
    if (player.gender > 0) CView.text(".  ");
    else CView.text("flat, featureless groin.  ");
    //  (if cockTotal=0 AND vaginas=1)
    if (player.body.cocks.length <= 0) {
        if (player.body.vaginas.length > 0) {
            CView.text("The gnoll looks a little disappointed at the void between your legs.  \"<i>Aw, I was hoping for something substantial,</i>\" she titters.  That doesn't stop her from hefting her engorged clit-dick and slapping its tip onto the entrance of your " + describeVagina(player, player.body.vaginas.get(0)) + ".  With one jittery lurch forward, she shoves her clit up inside you, her pubic mound mashing up against your " + describeClit(player) + ".");
            displayStretchVagina(player, 9, true, true, false);
            CView.text("\n\n");
        }
        // (if cockTotal=0 AND vaginas=0)
        else CView.text("The gnoll actually stops laughing for a moment when she takes in your featureless crotch.  \"<i>Well.  That's a new one,</i>\" she mutters.  She then takes two bobbing steps up the length of your body and rudely shoves her thumb into your mouth.  Her other hand guides her giant clitoris in after it, and you are in no position to stop her.\n\n");
    }
    // (if cockTotal>0 AND
    if (player.body.cocks.length > 0) {
        // thickestCock()>2")
        if (player.body.cocks.sort(Cock.Thickest).get(0)!.thickness > 2) {
            // (if cockTotal>1)
            if (player.body.cocks.length > 1) CView.text("The gnoll fishes into your " + describeCocksLight(player) + " and quickly snaps up the thickest one.  ");
            // (if cockTotal=1)
            else CView.text("The gnoll's hands dart down to your crotch and grabs " + describeCock(player, player.body.cocks.get(0)) + ".  ");
            CView.text("\"<i>Yes, this will do nicely,</i>\" she says with relish, pumping your " + nounCock(player.body.cocks.sort(Cock.Thickest).get(0)!.type) + " until it plumps up, filling with blood.  She cantilevers her body over yours, knees bent sharply, and brings the tip of her massive clitoris up against the head of your dick.  The moment a dollop of pre forms at your urethra, her hips surge forward, sinking her giant clit down the length of your " + nounCock(player.body.cocks.sort(Cock.Thickest).get(0)!.type) + ".  ");
            CView.text("You gasp at the feeling of her hot skin rippling down the interior of your dick, and all she can do is laugh as she plunges it deeper and deeper into you.\n\n");
        }
        // (if cockTotal>0 AND thickestCock()<2")
        else {
            // (if cockTotal>1)
            if (player.body.cocks.length > 1) CView.text("\"<i>This will have to do,</i>\" she says with the barest trace of disappointment as she grabs your thickest cock.  ");
            // (if cockTotal=1)
            else CView.text("\"<i>This will have to do,</i>\" she says as she grabs your cock.  ");
            CView.text("She runs her rough hand up and down its length until it begins to plump up.  She cantilevers her body over yours, knees bent sharply, and brings the tip of her massive clitoris up against the head of your dick.  The moment a dollop of pre forms at your urethra, her hips surge forward, sinking her giant clit down the length of your " + nounCock(player.body.cocks.sort(Cock.Thickest).get(0)!.type) + ".  ");
            CView.text("You scream in pain as she forces her bizarre pseudo-penis down the length of your dick.  In horror, you watch as the bulge of her anatomy's invasion of yours slowly descends towards your ");
            if (player.body.balls.count > 0) CView.text("balls");
            else CView.text("groin");
            CView.text(".  All she can do is laugh as she plunges it deeper and deeper into you.\n\n");
            // (increase thickness of thickestCock())
            player.body.cocks.sort(Cock.Thickest).get(0)!.thickness += .25;
        }
    }
    CView.text("In no time whatsoever she falls into an easy rhythm, pistoning her obscene girl-dick in and out of you.  At first, you can do little more than gurgle and squirm under the assault, but all too soon you feel the telltale signs of your own arousal building.  You find yourself moving in sympathy with her thrusts, at least as best you can given the circumstances.");
    // (if breastRating>C)
    if (player.body.chest.sort(BreastRow.Largest).get(0)!.rating >= 3) CView.text("  Your " + describeAllBreasts(player) + " bounce up and down as the gnoll grinds her anatomy into yours, slick with sweat under the hot sun.  Your " + describeNipple(player, player.body.chest.get(0)) + "s tighten and flush as your whole body submits to the rough fuck administered by the hyena girl.");
    // (if cockTotal>0)
    if (player.body.cocks.length > 0) {
        CView.text("  Your hips begin to buck as your orgasm builds, but the gnoll slams her hands down on your sides, pinning you to the hardscrabble ground.  \"<i>Best if you don't move too much, lover,</i>\" she laughs, even as she quickens her pace.  Immediately your ");
        if (player.body.balls.count > 0) CView.text(describeSack(player));
        else CView.text("body");
        CView.text(" seizes tighter and you can feel your cum churning inside you.\n\n");

        CView.text("When you finally explode, the effect is strange but not uncomfortable.  You feel your hot seed surging up out of you, but then it seems to disappear just at the base of your dick.  Blearily you look down at your crotch and see that where your sensation ends is where the tip of her clitoris has penetrated.  You are pumping cum directly into her pseudo-penis.\n\n\"<i>That's it!</i>\" she giggles, bouncing up and down atop you.  \"<i>Give it to momma!  I'll suck the cum right out of you!</i>\"  Finally, just as your own orgasm is fading, the gnoll screams up at the empty sky, her giant clitoris lurching within the confines of your dick.\n\n");
    }
    // (if cockTotal<0)
    else {
        CView.text("  You squirm in the dirt as your orgasm builds and the gnoll simply giggles.  Heat seems to flash across the length of your body, and then every muscle spasms and twitches all at once.  At the same time, the gnoll screams up at the empty sky, her giant clitoris lurching inside you.\n\n");
    }
    CView.text("The hyena girl slumps against your body, but only for a moment.  Then she's suddenly up again, sliding her bizarre member out of you with an obscene slurp.  She leans down to pat your cheek and giggles, \"<i>Thanks, lover.</i>\"   Then she sprints off towards the horizon.");
    CView.text("  A whimper bubbles up your throat and comes out as a half-giggle as you slump down unconscious.");
    player.orgasm();
    return { next: passTime(1) };
}

export function defeatHyena(player: Character, monster: Character): NextScreenChoices {

    let dickDownClit;
    // Gnoll Defeat (HP)
    if (monster.stats.HP < 1) CView.text("The hyena girl collapses backwards onto the dusty ground, unable to continue the fight.");
    // Gnoll Defeat (Lust)
    else CView.text("The hyena girl heaves a giant breath and takes a single step backwards.  Her club thumps to the ground and her hands fall to her shaft, stroking along its rough length.");

    // Do You Rape The Gnoll?
    if (player.stats.lust >= 33) {
        // (if cockTotal>0 AND vaginas=0)
        if (player.gender === 1) {
            if (player.body.cocks.find(Cock.CockThatFits(monster.vaginalCapacity()))) dickDownClit = dickDownGnollClit;
            CView.text("  The gnoll is at your mercy.  What will you do with her?");
            // [DickDownClit] [DickInAss] [SuckHerClit] [Leave]
            return { choices: [["DickDownClit", dickDownClit], ["DickInAss", choiceWrap(dickInGnollAss, monster)], ["SuckHerClit", suckGnollClit], ["", undefined], ["Leave", passTime(1)]] };
        }
        // (if cockTotal>0 AND vaginas=1)
        else if (player.gender === 3) {
            if (player.body.cocks.find(Cock.CockThatFits(monster.vaginalCapacity()))) dickDownClit = dickDownGnollClit;
            CView.text("  The gnoll is at your mercy.  What will you do with her?");
            // [DickDownClit] [DickInAss] [SuckHerClit] [TakeHerClit] [Leave]
            return { choices: [["DickDownClit", dickDownClit], ["DickInAss", choiceWrap(dickInGnollAss, monster)], ["SuckHerClit", suckGnollClit], ["TakeHerClit", takeGnollClit], ["Leave", passTime(1)]] };
        }
        // (if cockTotal=0 AND vaginas=1)
        else if (player.gender === 2) {
            CView.text("  The gnoll is at your mercy.  What will you do with her?");
            // [SuckHerClit] [TakeHerClit] [Leave]
            return { choices: [["SuckHerClit", suckGnollClit], ["TakeHerClit", takeGnollClit], ["", undefined], ["", undefined], ["Leave", passTime(1)]] };
        }
        // (if cockTotal=0 AND vaginas=0)
        else {
            CView.text("  The gnoll is at your mercy.  What will you do with her?");
            // [SuckHerClit] [Leave]
            return { choices: [["SuckHerClit", suckGnollClit], ["", undefined], ["", undefined], ["", undefined], ["Leave", passTime(1)]] };
        }
    }
    else return { next: passTime(1) };
}

// DickDownClit
function dickDownGnollClit(player: Character): NextScreenChoices {

    CView.text("This is not an opportunity you can pass up.  You roughly roll her onto her back and pull her long clit up to a vertical position.  She moans softly, and the rough skin beneath your fingers pulses as her arousal brings it harder and taller.  The end bloats larger, fuller, until finally it looks nearly wide enough.  You don't wait any further; you position the head of your dick against the end of hers and jam it inside.\n\n");
    CView.text("Inch by inch, you sink your dick down into the warm tunnel of her monstrous clitoris.  The interior, you are happy to find, is not as rough as the exterior, and in fact is just slick enough to make your invasion possible.  After a few thrusts, you find it easiest to adopt a sort of reverse-cowgirl position, facing her feet as you roll your hips forward and shove more and more of your dick inside her.   Beneath you, the gnoll is clutching at the ground and making little submissive whimpers.\n\n");
    const longestCock = player.body.cocks.sort(Cock.Longest).get(0)!;
    // (if biggestCockLength()>9)
    if (longestCock.length > 9) CView.text("Finally you can feel your cockhead push free into a deeper, wetter place.  You look down at her strange anatomy, the entire length of her tube bulging thicker to accommodate your " + describeCock(player, longestCock) + ".  You've made it all the way to her vagina!\n\n");
    else CView.text("Soon you feel the end of her clitoral tunnel butting up against your crotch.  You are as far in as you'll get.  You look down the length of her strange anatomy, the tube bulging thicker to accomodate your " + describeCock(player, longestCock) + ".  There are still inches between your cockhead and the end of her clit-dick.\n\n");

    CView.text("Now you begin to roll your hips in a steady rhythm, running your dick up and down her long clitoral tunnel.  It's like the deepest, tightest cunt you've ever had, gripping every inch of you.");
    // (if balls>0)
    if (player.body.balls.count > 0) CView.text("  It doesn't take long before your " + describeBalls(true, true, player) + " begin twitching, pumping cum down the length of your encased cock.");
    CView.text("  Your orgasm is quick and hard.  Your entire body seems to tremble under the hot sun and your thrusting doubles and then redoubles, stuffing your dick down hers like mad.\n\n");

    // (if cumQ()<25)
    if (player.cumQ() < 25) CView.text("Your " + describeCock(player, longestCock) + " convulses, pumping down the length of her clitoris.  She squirms and howls beneath you, hissing for more.");
    // (if cumQ()>25 AND cumQ()<500)
    else if (player.cumQ() < 500) CView.text("Your " + describeCock(player, longestCock) + " convulses, pumping cum into her.  Her clitoris bulges even more as the jism backs up.  The warm, wet, sticky insides swirl around your dick.");
    // (if cumQ()>500)
    else CView.text("Your " + describeCock(player, longestCock) + " convulses, pouring cum into her.  Her clitoris bulges even more as the jism backs up, the skin pulling tight and shiny as the pressure builds.  Finally gouts of cum begin spurting back out the tip of her clitoris, splashing against your crotch.");
    CView.text("  With a lusty groan, you pull out with a long, slippery sound, and leave the gnoll panting on the dusty ground.");
    player.orgasm();
    return { next: passTime(1) };
}

// DickInAss
function dickInGnollAss(player: Character, monster: Character): NextScreenChoices {

    let cockThatFits = player.body.cocks.find(Cock.CockThatFits(monster.analCapacity()));
    if (!cockThatFits) cockThatFits = player.body.cocks.get(0)!;
    const secondCockThatFits = player.body.cocks.filter(Cock.CocksThatFit(monster.analCapacity())).get(1);
    if (randInt(2) === 0) {
        CView.text("The gnoll must be taught a lesson, but you're staying the hell away from her freaky anatomy.  You roughly roll her onto her belly and pull her lean ass up into the air.  You line up your " + describeCock(player, cockThatFits) + " and ram it home into her tiny puckered entrance, eliciting a half-conscious gasp from the hyena girl.\n\n");
        // (if cockTotal>1)
        if (player.body.cocks.length > 1 && cockThatFits.area < monster.analCapacity() && secondCockThatFits) {
            CView.text("With a smirk, you pound away for a few minutes to get her loosened up.  Then you reach down and slap another " + nounCock(CockType.HUMAN) + " alongside the first.  With a grunt and a thrust, you shove both of them inside.");
            // (if cockTotal>2)
            if (player.body.cocks.length > 2 && cockThatFits.area + secondCockThatFits.area < monster.analCapacity()) CView.text("  A few thrusts more, and you slow again.  As you gather up your third cock, the gnoll whimpers quietly, fearing what she knows will come next.  You slowly push forward, sinking your rigid meat into her ass.  When all three are in, it's very slow going, but you don't let up.");
            // (if cockTotal>3)
            if (player.body.cocks.length > 3 && player.body.cocks.reduce((sum, cock, index) => index <= 3 ? sum + cock.area : sum, 0) < monster.analCapacity()) CView.text("  From there it's some time before her anus is stretched wide enough for more.  By now you can feel your orgasm on the horizon, so you're less careful with your fourth " + describeCock(player, secondCockThatFits) + ".  You slap it into the bundle of dicks and then ram it home.");
            // (if cockTotal>4)
            if (player.body.cocks.length > 4 && player.body.cocks.reduce((sum, cock, index) => index <= 4 ? sum + cock.area : sum, 0) < monster.analCapacity()) CView.text("  And then the next.");
            // (if cockTotal>5)
            if (player.body.cocks.length > 5 && player.body.cocks.reduce((sum, cock, index) => index <= 5 ? sum + cock.area : sum, 0) < monster.analCapacity()) CView.text("  And the next.");
            // (if cockTotal>6)
            if (player.body.cocks.length > 6 && player.body.cocks.reduce((sum, cock, index) => index <= 6 ? sum + cock.area : sum, 0) < monster.analCapacity()) CView.text("  And the next, until all of your " + describeCocksLight(player) + " are inside her wide-spread ass.");
            CView.text("\n\n");
        }

        CView.text("\"<i>So how do you like it?</i>\" you grunt, \"<i>when a little too much is shoved up a hole that's a little too small?</i>\"  You pound away, hard and rough, until her cries turn into squeals and then into moans.  Finally, she simply passes out.  You slap your hips against her bony ass for a few more thrusts and cum, long and hard, into her rectum.\n\n");

        CView.text("You let her slump to the ground, leaking your cum into the sun-caked ground, and head home.");
    }
    else {
        CView.text("Your mind is made up; this gnoll needs to learn her place.  You eye her freakish pseudo-phallus for a moment, then shake your head, roughly grabbing her by the bony hips and flopping her onto her belly.  She lets out a little barking whine when you firmly smack her bony rear, lowering her chin to the ground and raising her hips submissively in recognition of your dominance.\n\n");

        CView.text("You stroke your " + describeCock(player, cockThatFits) + " eagerly, bringing yourself to full mast and squeezing out a few drops of pre to pool against her puckered anus, leaning over and adding a little bit of saliva for good measure.  Sliding your shaft between her flat ass cheeks, you make sure to get the tip nice and lubed up, then you drop her hips down and ram yourself home in one go.\n\n");

        CView.text("The gnoll lets out a squeal that sounds halfway like a maniacal laugh, sliding forward in the dirt a little.  Your " + describeCock(player, cockThatFits) + " throbs wonderfully, fully engulfed by the tight passage of the gnoll's anus");
        if (player.body.cocks.length > 1) CView.text(" while the remainder of your endowments slide along her bare buttocks");
        CView.text(", and you begin to thrust forward and back, digging your fingers into her hips.\n\n");

        CView.text("As the defeated gnoll resigns herself fully to her role as your willing cum dump, you decide to really take her for a ride, pulling yourself back until you are almost free of the tightness of her rectum, then dropping forward again until you impact her ass with your hips.  You pull yourself back and ram home again and again, feeling the gnoll's tight asshole loosen a little bit with each thrust.  The force with which you are pounding the poor savannah girl's rear has her odd endowments slapping up against her stomach with each thrust, and from the cackling moans issuing from her throat, you can only guess that she enjoys being dominated in some capacity.\n\n");

        CView.text("Your hands slide further down her sides, and you bear down on her as you feel your climax building.  Increasing momentum, you piston into her ass with a desperate vigor, moaning your animalistic pleasure into her ear");
        if (player.cumQ() >= 500) CView.text(" as your voluminous pre-cum turns her innards into a sloppy fuckhole");
        CView.text(".\n\n");

        // (Low cumQ):
        if (player.cumQ() <= 250) {
            CView.text("Pressing your fingertips into her sides, you let out a moan into the open air, spurting cum deep and hard into her warm rectum");
            if (player.body.cocks.length > 1) {
                CView.text(" while your other endowment");
                if (player.body.cocks.length > 2) CView.text("s soak");
                else CView.text(" soaks");
                CView.text(" her back and rear with a few sticky streams");
            }
            CView.text(".  You pull out with an audible *schlick!*, and the gnoll slumps forward to the ground, panting a bit as she begins to shamelessly play with herself.\n\n");
        }
        // Med CumQ):
        else if (player.cumQ() <= 500) {
            CView.text("Gripping her sides tightly, you let out a bellowing moan that echos through the grasslands, " + describeOneOfYourCocks(player) + " swelling noticeably as you pump thick ribbons of spunk into the gnoll's innards");
            if (player.body.cocks.length > 1) CView.text(", unleashing a torrent of semen that mats down the short fur on her back and rear as");
            CView.text(".  The muscular ring of her anus bears down on your " + describeCock(player, cockThatFits) + " as you pull out, making an audible *schlick!*, and the gnoll drops to the ground in exhaustion, shamelessly playing with herself in an effort to get off.\n\n");
        }
        // (High CumQ):
        else {
            CView.text("You bear down on the limber hyena girl with all your force, groaning through clenched teeth as " + describeOneOfYourCocks(player) + " distends with the pressure of your virile load.  Her puckered anus stretches around the swell of your seed, and she lets out a shuddering, laughing moan as her belly begins to distend with your thick jism.  The involuntary spasms of her rectum milk your " + describeCock(player, cockThatFits) + " for every drop, clenching your member tightly");
            if (player.body.cocks.length > 1) {
                if (player.body.cocks.length > 2) CView.text(" while your remaining endowments soak her back thoroughly, covering her in a thick blanket of spunk");
                else CView.text(" while your remaining endowment soaks her back thoroughly, covering her in a thick blanket of spunk");
            }
            CView.text(".  Her anus makes an audible *schlick!* as you pull back, and the gnoll rolls off your member, cradling her gravid, cum-filled belly as she begins to shamelessly finger herself.\n\n");
        }
        CView.text("Satisfied, you leave the gnoll to her pleasures, gather your " + player.inventory.armor.displayName + ", and head back to camp.");
    }
    player.orgasm();
    return { next: passTime(1) };
}

// SuckHerClit
function suckGnollClit(player: Character): NextScreenChoices {

    CView.text("Since you first saw this strange anatomy, you knew it needed to be inside you.  You roughly roll her onto her back and pull her long clit up to a vertical position.  She moans softly, and the rough skin beneath your fingers pulses as her arousal brings it harder and taller.  The end bloats larger and fuller, until it might be too wide for your purposes.  Without losing any more time, you lean forward and stuff the clit's end into your mouth.\n\n");
    CView.text("The gnoll yelps in surprise and then moans appreciatively as your mouth and tongue roam across her sensitive skin.  Her hips squirm against the hard-baked dirt, tentatively pushing her clit deeper into your mouth.\n\n");
    CView.text("You're only too happy to oblige her, slowly and carefully swallowing the strange member down your throat.  Inch by inch you draw it deeper into yourself, eliciting increasing groans from the hyena girl.  Finally your nose buries itself in the rough, curly hair of her crotch, your chin rubbing up against the fake scrotum formed out of her distorted labia.\n\n");
    CView.text("Her legs twitch around your ears as you continue to swallow, even though there is no more to go.  The muscles in your throat gently massage the length of the monstrous clitoris, which plumps even further as more blood rushes into it.  You can feel its tumescent bulk all down your throat and halfway into your chest.\n\n");
    CView.text("The massive clit-dick then begins to flutter and twitch as the gnoll starts to cum.  Her feet stamp the ground to either side of you and she abruptly screams into the sky.  Her warbling cry then seems to collapse inward, and her entire body slumps to the ground, unconscious.\n\n");
    CView.text("You leave her there on the sun-caked ground and head back to camp.");
    player.stats.lust = 100;

    return { next: passTime(1) };
}

// TakeHerClit
function takeGnollClit(player: Character): NextScreenChoices {

    CView.text("You roughly roll her onto her back and pull her long clit up to a vertical position.  She moans softly, and the rough skin beneath your fingers pulses as her arousal brings it harder and taller.  The end bloats larger, fuller, until it might be too wide for your purposes.  You line up your " + describeVagina(player, player.body.vaginas.get(0)) + " and lower yourself onto the long, narrow faux-cock.");
    displayStretchVagina(player, 9, true, true, false);
    CView.text("\n\n");
    CView.text("It slithers up your love canal with alacrity, and you quickly find yourself sitting on the gnoll's haunches.  You pump your hips up and down, relishing the feel of the thin spike slipping around within you.  This was not, however, what her anatomy was designed to do, and you can feel her monstrous clitoris flagging within you, collapsing down and denying you your well-deserved fucking.\n\n");
    CView.text("\"<i>Hey!</i>\" you shout, and reach forward to slap the gnoll across the face.  Abruptly the clit-dick hardens inside you, even as the girl's face registers little response.  With a smirk, you try it again.  A second hard slap brings the hyena's pseudocock ramrod straight up inside you, and you roll your hips atop her appreciatively.\n\n");
    CView.text("Every few strokes, the fake dick starts to fail you and you reach forward to slap her again.  Pump pump slap.  Thrust thrust smack.  Grunt grunt slap.  By the time your body rises up to the quivering summit of orgasm, the gnoll's face is purple with bruises.  You scream your orgasm to the sky, bearing down hard on her hollow clitoris, and come hard enough that you see stars.\n\n");
    CView.text("When you can get your feet under yourself again, you stand up, letting the now-shrunken clitoris fall out of your " + describeVagina(player, player.body.vaginas.get(0)) + " with a wet plop.  You leave her there on the sun-caked ground and head back to camp.");
    player.orgasm();
    return { next: passTime(1) };
}

function yoDawgIHeardULiekGNollBallzzzdahdakjldh(player: Character): NextScreenChoices {

    player.inventory.items.consumeItem(ConsumableName.SuccubisDream);
    // [either Gnoll loss, if the player has a succubi's dream in inventory]

    CView.text("A rolling, harsh laughter surrounds you as you sink to ground, no longer strong enough to remain upright.  The gnoll's mocking bark fills the air as she disposes of your " + player.inventory.armor.displayName);
    if (player.inventory.weapon.name !== "fists") CView.text(" and " + player.inventory.weapon.displayName);
    CView.text(" with rough motions, the soft pads of her paw-like hands coarsely grasping your " + describeHips(player) + " as much to grope as to strip you.  As she knocks your belongings aside, a small, bulbous bottle rolls out of your pouches, the lurid white fluid sloshing inside like an alabaster stain against the dull browns and greens of the plains.  The hyena-girl pauses in her eagerness to taste the spoils of victory, regarding the stray vial doubtfully.  Her lips curl into a sneer that approaches a smile and she stoops down to retrieve the creamy flask.  Through the panting haze obscuring your vision, you can make out the murky whorls of curious thickness in the cum-colored elixir and you realize that the amazon has found your Succubi's Dream.\n\n");

    CView.text("You try to protest the theft, but she casually snaps her leg into a kick that jerks your chin up and the ground rushes to meet the back of your head, white pain exploding before your eyes.  \"<i>All that you have and all that you are belongs to me,</i>\" the hyena-woman snarls.  \"<i>I will take what tribute I see fit.</i>\"  Laughing again, she flicks the cork from your potion and sniffs the concoction with renewed interest.  Her nostrils crinkle at the scent, but she locks her gaze to yours and, in an aggressive, unblinking gesture, throws her head back to swallow the curiously thick ivory fluid.  Discarding the empty glass, she licks her lips as if the refreshingly cool cream merely inflamed a different sort of thirst.\n\n");

    CView.text("The amazon takes another step toward you before jerking back with a choking gasp.  Her stance drooping, knees clenched together, the hyena-girl wraps her hands between the inside of her trembling thighs.  The tattered loincloth hanging from her hips pokes outward, rising as it is gradually pushed aside by the monster beneath.  She flicks the rough leather aside with a spotted paw to expose the engorged onyx pillar throbbing between her legs.  Rising from a thin sheath, the 15 inch clit stands atop her molted pussy like a crown-less cock, bulging veins marring its obsidian-smooth surface as it pulses with the girl's quickening heartbeat.  She sways, seemingly weakened by the lascivious lust boiling inside her, bringing a deep purple hue to her cheeks as she flushes half with embarrassment and half with need.\n\n");

    CView.text("\"<i>What... what have you poisoned me with?</i>\" she gasps, staggering to her knees.  Catching herself, the gnoll pulls her hands away from her crotch, revealing the effects of the Succubi's Dream.  A pair of huge, apple-sized testicles sway under her throbbing pussy lips, covered in a fine chocolate fuzz that glistens from the honey that leaks from her over-stimulated cunt.  The hyena's balls hang heavily from her groin, achingly filled with seed that she has no way of emptying.  \"<i>What is this?</i>\" she demands, her voice frantic with seething, unfamiliar urges.  \"<i>I don't... I can't...</i>\" She stumbles to all fours, her hips impotently bucking at the air, as her eyes cloud over, mouth hanging open in the primal need to mate.\n\n");
    // [NEXT]
    return { next: yoDawgHyenaBallz2 };
}

function yoDawgHyenaBallz2(player: Character): NextScreenChoices {

    CView.text("Using the distraction, you roll onto your belly, crawling towards your " + player.inventory.armor.displayName + ", hoping to use the distraction to make an escape.  Baring your " + describeButt(player) + ", however, proves to be a mistake, as the gnoll fixates on the wobbling orbs, lunging desperately.  She lands atop you, her paws pinning your head and shoulders to the ground as the warmth of her impatient shaft slides between your cheeks, her new scrotum slapping wetly against ");
    if (player.body.balls.count > 0) CView.text("your own " + describeBalls(true, true, player));
    else CView.text("your sweat-slick thighs");
    CView.text(".  The amazon wastes no time, guiding her monstrous clit to your " + describeButthole(player.body.butt) + " with gasping pleasure, thrusting the barrel-like pseudo-cock deeply inside your nethers, drawing a cry of penetration from your lips.  The plush interior of your anus parts before her energized clitoris, her cunt flowing with warm lubrication so heavily that its deluge inundates your bowels like a flood of pre-cum.");
    displayStretchButt(player, 30, true, true, false);
    CView.text("\n\n");

    CView.text("Roughly, she bucks against your hips, pushing your face against the grass and dirt, moving with relentless speed as she fucks you with every ounce of strength in her well-toned body.  She snarls and cries out, even laughing with a mad desperation, as she plunges her rock-hard joy buzzer into your loins trying to achieve release.  Your struggles are useless against the rutting passion of the hyena-girl, who uses you like a beast in heat.  In mere minutes, her body seizes, muscles straining with the blissful throes of imminent orgasm and you whisper a prayer that she'll be done shortly.  Gnashing her teeth, she hooks both spotted paws around your shoulders and drives her jet-black member into the velvet folds of your clenching asshole, her sweltering cunny gushing with her girl-cum.\n\n");

    CView.text("Her bucking pauses for a split-second and you can feel her fuzzy balls throbbing against your " + describeButt(player) + ", the stimulation of her fucking filling them with fresh loads, eager to spill into your violated hole.  But, without a passage to let loose the torrent of her sperm with, the gnoll's balls merely swell with unspent passion, lewdly quivering against");
    if (player.body.balls.count > 0) CView.text(" your distended sac, ballooning with the fatigued flood of the prostate-milking the girl is giving you");
    else CView.text(" your sore loins, soaked with the slimy river of the girl's excitement");
    CView.text(".  \"<i>N-no! I can't... quite... arg!</i>\" She trembles, unable to cum, before mindlessly starting anew, pistoning into your " + describeButthole(player.body.butt) + " with renewed vigor.  \"<i>I just! Have to! Fucking! Cum!</i>\" she grunts from between clenched teeth as she slams into you, the waterfall of lubrication from her pussy soaking your " + skinFurScales(player) + " as she wetly slaps her hips into yours in her increasingly desperate assault.\n\n");

    CView.text("Again and again, she rushes toward a release, and every time, her balls slosh with overflowing lust, unable to climax yet urging her to greater depravity until even words are too difficult to manage.  Your ravaged body aches under the endless rape.  It's all you can do to work your hands under your hips to masturbate in the blissful pauses while the gnoll's muscles clench in near orgasm, before she slams you back to the dirt for another round.  You lose track of time as your world narrows to the endlessly thrusting shaft of the hyena-girl's massive clitoris and the merciless weight of her ball-slapping, spunk-swollen pouch. Every time you climax, it fuels her mad frenzy until you silently beg your body to shut out the overwhelming sensations, to no avail.  Day fades into night and night into day as the amazon fucks your spasming, shuddering pucker without thought, or pity, or release.\n\n");
    // [NEXT]
    return { next: yoDawgHyenaBallz3 };
    Time.hour = 7;
    Time.day++;

}

function yoDawgHyenaBallz3(player: Character): NextScreenChoices {

    CView.text("Finally, you feel the gnoll's clit slide out of your anus as the overly-endowed girl collapses at your side.  Broken utterly, she pants with depraved exhaustion, no strength left to continue pounding your body into the dirt.  Even now, she strokes her massive clit with one spotted paw as the other helplessly massages the basketball-sized testicles that audibly churn with gallons of the girl's jizz.  Finding a reserve of strength you didn't know you had, you rise tenderly and gather your belongings, creeping away before the hyena-girl can get her second wind.");
    // [24 hours pass, player asshole size increased, sensitivity significantly lowered, toughness lowered temporarily, fatigue maxed, remove one succubi's dream]
    player.orgasm();
    player.stats.lib += 2;
    player.stats.sens += -10;

    return { next: passTime(1) };
}

/*
 --------------------

 Hyena Spot Long Description
 A patch of what appears to be hyena fur, with a large black spot in its center.  There's no hide backing to the fur; there's no discernable reason the clump of fur stays together at all.

 Hyena Spot Consume
 You fumble with the patch of fur for a moment, then rub it across your skin.  It flakes and sheds as you go, until finally it dissolves away into nothing.  Beneath your skin it feels as if the hot sun has baked into your flesh.

 Hyena Spot Effect #1
 (if clitLength>0)
 The spot's heat seems to focus on your crotch.  Your scalding clit seems to spill out of your vulva, lengthening at least half an inch.
 (increase clitLength)

 Hyena Spot Effect #2
 (if hipRating>0)
 You cry out as your pelvis suddenly cave inward, crumpling narrower at the top of your legs to form " + describeHips(player)
 (decrease hipRating)

 Hyena Spot Effect #3
 (if buttRating>0)
 You seem to bounce on your feet as you drop a few pounds in your rear.  With your new, light " + describeButt(player) + ", you feel like you can fly across the plains.
 (decrease buttRating)

 Hyena Spot Effect #4
 Your muscles seem to quiver underneath your " + skinDescript() + ", growing leaner and quicker.
 (increase Speed)

 Hyena Spot Effect #5
 (if skin =/= spotted fur)
 The warmth rippling under your skin seems to erupt back outwards, pushing out a pelt of rough, tawny fur.  Black spots blossom across your shoulders and back.  You have hyena fur!
 (set skin to hyena fur)

 Hyena Spot Effect #6
 (if Tone<90)
 The warm swirls around inside your body, seeming to melt away fat deposits wherever they lie.  Your body takes on a much leaner, toned appearance.
 (increase Tone)*/
