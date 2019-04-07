import { Flags } from 'Engine/Flags';
import { Character } from 'Content/Character/Character';
import { NextScreenChoices } from 'Engine/Display/ScreenDisplay';
import { CView } from 'Engine/Display/ContentView';
import { passTime } from '../PassTime';
import { Cock } from 'Engine/Body/Cock';
import { describeCock, nounCock, describeCocksLight, describeOneOfYourCocks } from 'Content/Descriptors/CockDescriptor';
import { numToCardinalText } from 'Content/Utilities/NumToText';
import { describeHips } from 'Content/Descriptors/HipDescriptor';
import { BreastRow } from 'Engine/Body/BreastRow';
import { describeAllBreasts, describeNipple } from 'Content/Descriptors/BreastDescriptor';
import { describeSack, describeBalls } from 'Content/Descriptors/BallsDescriptor';
import { describeButt } from 'Content/Descriptors/ButtDescriptor';
import { describeVagina, describeClit } from 'Content/Descriptors/VaginaDescriptor';
import { VaginaWetness } from 'Engine/Body/Vagina';
import { describeFeet, describeLegs } from 'Content/Descriptors/LegDescriptor';
import { randInt, randomChoice } from 'Engine/Utilities/SMath';
import { enterBoobsDungeon, fightCumWitch } from 'Content/Scenes/Dungeons/DesertCave/RoomScene';
import { EffectType } from 'Content/Effects/EffectType';
import { PregnancyType } from 'Content/Body/Pregnancy/PregnancyType';
import { WeaponName } from 'Content/Items/WeaponName';
import { helSexualAmbush, HelFlags, followerHel } from 'Content/Scenes/NPCs/Hel';
import { DesertCaveFlags } from 'Content/Scenes/Dungeons/DesertCave/Rooms';
import { fountainEncounter } from 'Content/Scenes/NPCs/Exgartuan';
import { discoverTelAdre, TelAdreFlags } from 'Content/Scenes/Places/TelAdre';
import { SandWitchFlags, sammitchBirthsDriders, witchBirfsSomeBees, encounter } from 'Content/Scenes/Areas/Desert/SandWitchScene';
import { PhyllaFlags, antColonyEncounter } from 'Content/Scenes/Areas/Desert/PhyllaScenes';
import { CampFlags } from 'Content/Scenes/Camp';
import { wandererRouter } from 'Content/Scenes/Areas/Desert/Wanderer';
import { oasisEncounter } from 'Content/Scenes/Areas/Desert/Oasis';
import { nagaEncounter } from 'Content/Scenes/Areas/Desert/NagaScene';
import { encounterASandTarp } from 'Content/Scenes/Areas/Desert/SandTrapScene';

export const DesertFlags = Flags.register("Desert", {
    TIMES_EXPLORED: 0,
    FOUND_WIZARD_STAFF: 0,
});

/**
 * Created by aimozg on 06.01.14.
 */

// Explore desert
export function exploreDesert(player: Character): NextScreenChoices {
    DesertFlags.TIMES_EXPLORED++;
    if (player.stats.level >= 4 && DesertFlags.TIMES_EXPLORED % 15 === 0 && DesertCaveFlags.DISCOVERED_WITCH_DUNGEON === 0) {
        return enterBoobsDungeon(player);
    }
    if (randInt(40) === 0) {
        return fountainEncounter();
    }
    // Helia monogamy fucks
    if (HelFlags.PC_PROMISED_HEL_MONOGAMY_FUCKS === 1 && HelFlags.HEL_RAPED_TODAY === 0 && randInt(10) === 0 && player.gender > 0 && !followerHel()) {
        return helSexualAmbush();
    }
    if ((DesertFlags.TIMES_EXPLORED === 20 && !player.effects.has(EffectType.TelAdre)) || (randInt(20) === 0 && TelAdreFlags.Value1 === 0)) {
        return discoverTelAdre();
    }
    if (SandWitchFlags.WOMB.pregnancy && SandWitchFlags.WOMB.event === 2 && randInt(4) === 0) {
        if (SandWitchFlags.WOMB.pregnancy.type === PregnancyType.DRIDER_EGGS) return sammitchBirthsDriders(player);
        else return witchBirfsSomeBees(player);
    }
    // Ant colony debug chances
    if (player.stats.level >= 5 && PhyllaFlags.ANT_WAIFU === 0 && (DesertFlags.TIMES_EXPLORED % 8 === 0) && PhyllaFlags.ANTS_PC_FAILED_PHYLLA === 0 && PhyllaFlags.ANT_COLONY_KEPT_HIDDEN === 0) {
        return antColonyEncounter(player);
    }
    // int over 50?  Chance of alice encounter!
    if (randInt(4) === 0 && player.stats.int > 50 && DesertFlags.FOUND_WIZARD_STAFF === 0) {

        CView.text("While exploring the desert, you see a plume of smoke rising in the distance.  You change direction and approach the soot-cloud carefully.  It takes a few moments, but after cresting your fourth dune, you locate the source.  You lie low, so as not to be seen, and crawl closer for a better look.\n\n");
        CView.text("A library is burning up, sending flames dozens of feet into the air.  It doesn't look like any of the books will survive, and most of the structure has already been consumed by the hungry flames.  The source of the inferno is curled up next to it.  It's a naga!  She's tall for a naga, at least seven feet if she stands at her full height.  Her purplish-blue skin looks quite exotic, and she wears a flower in her hair.  The naga is holding a stick with a potato on the end, trying to roast the spud on the library-fire.  It doesn't seem to be going well, and the potato quickly lights up from the intense heat.\n\n");
        CView.text("The snake-woman tosses the burnt potato away and cries, \"<i>Hora hora.</i>\"  She suddenly turns and looks directly at you.  Her gaze is piercing and intent, but she vanishes before you can react.  The only reminder she was ever there is a burning potato in the sand.   Your curiosity overcomes your caution, and you approach the fiery inferno.  There isn't even a trail in the sand, and the library is going to be an unsalvageable wreck in short order.   Perhaps the only item worth considering is the stick with the burning potato.  It's quite oddly shaped, and when you reach down to touch it you can feel a resonant tingle.  Perhaps it was some kind of wizard's staff?\n\n");
        DesertFlags.FOUND_WIZARD_STAFF++;
        return player.inventory.items.createAdd(player, WeaponName.WizardsStaff, passTime(1));
    }
    // Possible chance of boosting camp space!
    if (CampFlags.CHEST === 0 && (randInt(100) < 10)) {
        CView.clear();
        CView.text("While wandering the trackless sands of the desert, you break the silent monotony with a loud 'thunk'.  You look down and realize you're standing on the lid of an old chest, somehow intact and buried in the sand.  Overcome with curiosity, you dig it out, only to discover that it's empty.  It would make a nice addition to your campsite.\n\nYou decide to bring it back to your campsite.  <b>You now have six storage item slots at camp.</b>");
        CampFlags.CHEST = 1;
        return { next: passTime(1) };
    }
    if (player.body.cocks.length > 0) {
        // Chance of dick-dragging! 10% + 10% per two foot up to 30%
        let dickDragChance = 10 + (player.body.cocks.sort(Cock.Longest).get(0)!.length - player.body.tallness) / 24 * 10;
        if (dickDragChance > 30) dickDragChance = 30;
        if (dickDragChance > randInt(100) && player.body.cocks.sort(Cock.Longest).get(0)!.length >= player.body.tallness && player.body.cocks.reduce(Cock.TotalThickness, 0) >= 12) {
            return bigJunkDesertScene(player);
        }
    }
    const choices = [];

    // Encounter Sandwitch
    if (DesertCaveFlags.SAND_WITCH_LEAVE_ME_ALONE === 0) {
        choices.push(encounter);
    }
    if (DesertCaveFlags.CUM_WITCHES_FIGHTABLE > 0) {
        choices.push(fightCumWitch);
    }
    // Encounter Marcus
    choices.push(wandererRouter);
    choices.push(walkingDesertStatBoost);
    if (randInt(2) === 0 && player.stats.level >= 2) {
        if (randInt(2) === 0) {
            choices.push(mirageDesert);
        }
        else {
            choices.push(oasisEncounter);
        }
    }
    choices.push(nagaEncounter);
    if (randInt(2) === 0) {
        choices.push(encounterASandTarp);
    }
    return randomChoice(choices)(player);
}

function mirageDesert(player: Character): NextScreenChoices {
    CView.clear();
    CView.clear();
    CView.text("While exploring the desert, you see a shimmering tower in the distance.  As you rush towards it, it vanishes completely.  It was a mirage!   You sigh, depressed at wasting your time.");
    player.stats.lust += -15;

    return { next: passTime(1) };
}

function walkingDesertStatBoost(player: Character): NextScreenChoices {
    CView.clear();
    CView.clear();
    CView.text("You walk through the shifting sands for an hour, finding nothing.\n\n");
    // Chance of boost == 50%
    if (randInt(2) === 0) {
        // 50/50 strength/toughness
        if (randInt(2) === 0 && player.stats.str < 50) {
            CView.text("The effort of struggling with the uncertain footing has made you stronger.");
            player.stats.str += .5;

        }
        // Toughness
        else if (player.stats.tou < 50) {
            CView.text("The effort of struggling with the uncertain footing has made you tougher.");
            player.stats.tou += .5;

        }
    }
    return { next: passTime(1) };
}

// Massive bodyparts scene
// [DESERT]
// [RANDOM SCENE IF CHARACTER HAS AT LEAST ONE COCK LARGER THAN THEIR HEIGHT,
// AND THE TOTAL COMBINED WIDTH OF ALL THEIR COCKS IS TWELVE INCHES OR GREATER]
export function bigJunkDesertScene(player: Character): NextScreenChoices {

    const longestCock = player.body.cocks.sort(Cock.Longest).get(0)!;
    // PARAGRAPH 1
    CView.text("Walking along the sandy dunes of the desert you find yourself increasingly impeded by the bulk of your " + describeCock(player, longestCock) + " dragging along the sandscape behind you.  The incredibly hot surface of the desert causes your loins to sweat heavily and fills them with relentless heat.");

    if (player.body.cocks.length === 1) CView.text("  As it drags along the dunes, the sensation forces you to imagine the rough textured tongue of a monstrous animal sliding along the head of your " + nounCock(longestCock.type) + ".");
    else if (player.body.cocks.length >= 2) CView.text("  With all of your " + describeCocksLight(player) + " dragging through the sands they begin feeling as if the rough textured tongues of " + numToCardinalText(player.body.cocks.length) + " different monstrous animals were slobbering over each one.");
    CView.text("\n\n");

    // PARAGRAPH 2

    // FOR NON-CENTAURS]
    if (!player.body.legs.isTaur()) {
        CView.text("The impending erection can't seem to be stopped.  Your sexual frustration forces stiffness into your " + describeCocksLight(player) + ", which forces your torso to the ground.  Normally your erection would merely raise itself skyward but your genitals have grown too large and heavy for your " + describeHips(player) + " to hold them aloft.  Instead you feel your body forcibly pivoting at the hips until your torso is compelled to rest face down on top of your obscene " + describeCocksLight(player) + ".");

        // IF CHARACTER HAS GIANT BREASTS ADD SENTENCE
        if (player.body.chest.sort(BreastRow.Largest).get(0)!.rating >= 35) CView.text("  Your " + describeAllBreasts(player) + " hang lewdly off your torso to rest on the desert sands, seeming to bury the dunes on either side of you.  Their immense weight anchors your body, further preventing your torso from lifting itself up.  The burning heat of the desert teases your " + describeNipple(player, player.body.chest.get(0)) + "s mercilessly as they grind in the sand.");
        // IF CHARACTER HAS A BALLS ADD SENTENCE
        if (player.body.balls.count > 0) CView.text("  Your " + player.body.skin.tone + describeSack(player) + " rests beneath your raised " + describeButt(player) + ".  The fiery warmth of the desert caresses it, causing your " + describeBalls(true, true, player) + " to pulse with the need to release their sperm through your " + describeCocksLight(player) + ".");
        // IF CHARACTER HAS A VAGINA ADD SENTENCE
        if (player.body.vaginas.length >= 1) {
            CView.text("  Your " + describeVagina(player, player.body.vaginas.get(0)) + " and " + describeClit(player) + " are thoroughly squashed between the bulky flesh where your male genitals protrude from between your hips and the " + describeButt(player) + " above.");
            // IF CHARACTER HAS A DROOLING PUSSY ADD SENTENCE
            if (player.body.vaginas.get(0)!.wetness >= VaginaWetness.DROOLING) CView.text("  Juices stream from your womanhood and begin pooling on the hot sand beneath you.  Wisps of steam rise up into the air only to tease your genitals further.  ");
        }
    }
    // FOR CENTAURS
    else {
        CView.text("The impending erection can't seem to be stopped.  Your sexual frustration forces stiffness into your " + describeCocksLight(player) + ", which forces the barrel of your horse-like torso to the ground.  Normally your erection would merely hover above the ground in between your centaurian legs, but your genitals have grown too large and heavy for your " + describeHips(player) + " to hold them aloft.  Instead, you feel your body being forcibly pulled down at your hindquarters until you rest atop your " + describeCocksLight(player) + ".");
        // IF CHARACTER HAS GIANT BREASTS ADD SENTENCE
        if (player.body.chest.sort(BreastRow.Largest).get(0)!.rating >= 35) CView.text("  Your " + describeAllBreasts(player) + " pull your human torso forward until it also is forced to rest facedown, just like your horse half.  Your tits rest, pinned on the desert sand to either side of you.  Their immense weight anchors you, further preventing any part of your equine body from lifting itself up.  The burning heat of the desert teases your " + describeNipple(player, player.body.chest.get(0)) + "s incessantly.");
        // IF CHARACTER HAS A BALLS ADD SENTENCE
        if (player.body.balls.count > 0) CView.text("  Your " + player.body.skin.tone + describeSack(player) + " rests beneath your raised " + describeButt(player) + ".  The airy warmth of the desert teases it, causing your " + describeBalls(true, true, player) + " pulse with the need to release their sperm through your " + describeCocksLight(player) + ".");
        // IF CHARACTER HAS A VAGINA ADD SENTENCE
        if (player.body.vaginas.length >= 1) {
            CView.text("  Your " + describeVagina(player, player.body.vaginas.get(0)) + " and " + describeClit(player) + " are thoroughly squashed between the bulky flesh where your male genitals protrude from between your hips and the " + describeButt(player) + " above.");
            // IF CHARACTER HAS A DROOLING PUSSY ADD SENTENCE
            if (player.body.vaginas.get(0)!.wetness >= VaginaWetness.DROOLING) CView.text("  The desert sun beats down on your body, its fiery heat inflaming the senses of your vaginal lips.  Juices stream from your womanhood and begin pooling on the hot sand beneath you.");
        }
    }
    CView.text("\n\n");
    // PARAGRAPH 3
    CView.text("You realize you are effectively trapped here by your own body.");
    // CORRUPTION BASED CHARACTER'S VIEW OF SITUATION
    if (player.stats.cor < 33) CView.text("  Panic slips into your heart as you realize that if any dangerous predator were to find you in this state, you'd be completely defenseless.  You must find a way to regain your mobility immediately!");
    else if (player.stats.cor < 66) CView.text("  You realize that if any dangerous predator were to find you in this state you'd be completely defenseless.  You must find a way to regain your mobility... yet there is a certain appeal to imagining how pleasurable it would be for a sexual predator to take advantage of your obscene body.");
    else CView.text("  Your endowments have rendered you completely helpless should any predators find you.  Somewhere in your heart, you're exhilarated at the prospect.  The idea of being a helpless fucktoy for a wandering beast is unusually inviting to you.  Were it not for the thought that you might die of thirst in the desert, you'd be incredibly tempted to remain right where you are.");

    // SCENE END = IF CHARACTER HAS FULL WINGS ADD SENTENCE
    if (player.canFly()) CView.text("  You extend your wings and flap as hard as you can, until at last you manage to lighten the bulk of your body somewhat - enough to allow yourself to drag your genitals across the hot sands and back to camp.  The ordeal takes nearly an hour.");
    // SCENE END IF CHARACTER HAS CENTAUR BODY
    else if (player.body.legs.isTaur()) CView.text("  You struggle and work your equine legs against the surface of the dune you are trapped on.  Your " + describeFeet(player) + " have consistent trouble finding footing, the soft sand failing to provide enough leverage to lift your bulk.  You breath in deeply and lean from side to side, trying to find some easier vertical leverage.  Eventually, with a crude crawl, your legs manage to push the bulk of your body onto more solid ground.  With great difficulty, you spend the next hour shuffling your genitals across the sandscape and back to camp.");
    // SCENE END = FOR ALL OTHER CHARACTERS
    else CView.text("  You struggle and push with your " + describeLegs(player) + " as hard as you can, but it's no use.  You do the only thing you can and begin stroking your " + describeCocksLight(player) + " with as much vigor as you can muster.  Eventually your body tenses and a light load of jizz erupts from your body, but the orgasm is truly mild compared to what you need.  You're simply too weary from struggling to give yourself the masturbation you truly need, but you continue to try.  Nearly an hour later " + describeOneOfYourCocks(player) + " softens enough to allow you to stand again, and you make your way back to camp, still dragging your genitals across the warm sand.");
    player.stats.raw.lust += 25 + randInt(player.stats.cor / 5);

    player.stats.fatigue += 5;
    return { next: passTime(1) };
}
