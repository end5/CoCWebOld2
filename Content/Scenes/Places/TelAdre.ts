import { Flags } from 'Engine/Flags';
import { Character } from 'Engine/Character/Character';
import { NextScreenChoices, ClickFunction, choiceWrap, ScreenChoice } from 'Engine/Display/ScreenDisplay';
import { EffectType } from 'Content/Effects/EffectType';
import { CView } from 'Engine/Display/ContentView';
import { describeFeet, describeLegs, describeLeg } from 'Content/Descriptors/LegDescriptor';
import { passTime } from 'Content/Scenes/PassTime';
import { mf } from 'Content/Descriptors/GenderDescriptor';
import { isValentine, isThanksgiving } from 'Content/Utilities/Dates';
import { randInt } from 'Engine/Utilities/SMath';
import { Time } from 'Engine/Utilities/Time';
import { SpriteName } from 'Content/Display/SpriteName';
import { humanRaceScore } from 'Content/Body/RaceScore';
import { Cock } from 'Engine/Body/Cock';
import { numToCardinalText } from 'Content/Utilities/NumToText';
import { PregnancyType } from 'Content/Body/Pregnancy/PregnancyType';
import { auntNancy } from 'Content/Scenes/Places/TelAdre/AuntNancy';
import { ArmorName } from 'Content/Items/ArmorName';
import { ItemType } from 'Engine/Items/ItemType';
import { ConsumableName } from 'Content/Items/ConsumableName';
import { WeaponName } from 'Content/Items/WeaponName';
import { describeButt } from 'Content/Descriptors/ButtDescriptor';
import { describeHips } from 'Content/Descriptors/HipDescriptor';
import { describeChest } from 'Content/Descriptors/BreastDescriptor';
import { describeCock, describeCockHead } from 'Content/Descriptors/CockDescriptor';
import { BreastRow } from 'Engine/Body/BreastRow';
import { describeBalls } from 'Content/Descriptors/BallsDescriptor';
import { describeVagina, describeClit } from 'Content/Descriptors/VaginaDescriptor';
import { Settings } from 'Content/Settings';
import { JojoFlags } from 'Content/Scenes/NPCs/Jojo';
import { bakeryuuuuuu } from 'Content/Scenes/Places/TelAdre/BakeryScene';
import { visitZeMagesTower } from 'Content/Scenes/Places/TelAdre/Library';
import { enterClinic } from 'Content/Scenes/Places/TelAdre/UmasShop';
import { raphaelLikes, orphanageIntro } from 'Content/Scenes/NPCs/Raphael';
import { arianFollower, visitThePark } from 'Content/Scenes/NPCs/ArianScene';

export const TelAdreFlags = Flags.register("TelAdre", {
    FOUND: 0,
    ALLOWED_IN: 0,
    VALENTINES_EVENT_YEAR: 0,
    NUMBER_OF_TIMES_MET_SCYLLA: 0,
    TIMES_MET_SCYLLA_IN_ADDICTION_GROUP: 0,
    PC_SEEN_URTA_BADASS_FIGHT: 0,
    KATHERINE_UNLOCKED: 0,
    KATHERINE_RANDOM_RECRUITMENT_DISABLED: 0,
    KATHERINE_TRAINING: 0,
    ARIAN_PARK: 0,
    NOT_HELPED_ARIAN_TODAY: 0,
    URTA_PREGNANT_DELIVERY_SCENE: 0,
    UNKNOWN_FLAG_NUMBER_00242: 0,
    RAPHEAL_COUNTDOWN_TIMER: 0,
    LOPPE_PC_MET_UMA: 0,
    LOW_STANDARDS_FOR_ALL: 0,
    HYPER_HAPPY: 0,
    NIEVE_STAGE: 0,
    LOPPE_DISABLED: 0,
    LOPPE_MET: 0,
    AMILY_VISITING_URTA: 0,
    UNKNOWN_FLAG_NUMBER_00150: 0,
    EDRYN_PREGNANT_AND_NOT_TOLD_PC_YET: 0,
    EDRYN_NUMBER_OF_KIDS: 0,
    EDRYN_NEEDS_TO_TALK_ABOUT_KID: 0,
    KATHERINE_LOCATION: 0,
    KATHERINE_URTA_AFFECTION: 0,
    URTA_ANGRY_AT_PC_COUNTDOWN: 0,
    HEL_FOLLOWER_LEVEL: 0,
    HEL_FUCKBUDDY: 0,
    HEL_HARPY_QUEEN_DEFEATED: 0,
    HEL_REDUCED_ENCOUNTER_RATE: 0,
    UNKNOWN_FLAG_NUMBER_00263: 0,
    NIAMH_STATUS: 0,
    MET_NIAMH: 0,
    ROGAR_PHASE: 0,
    ROGAR_DISABLED: 0,
    ROGAR_FUCKED_TODAY: 0,
    UNKNOWN_FLAG_NUMBER_00143: 0,
    URTA_TIME_SINCE_LAST_CAME: 0,
    URTA_INCUBATION_CELEBRATION: 0,
    EDRYN_PREGNAT_AND_NOT_TOLD_PC_YET: 0,
    EDRYN_PREGNANCY_INCUBATION: 0,
    FED_SCYLLA_TODAY: 0,
    URTA_COMFORTABLE_WITH_OWN_BODY: 0,
    TIMES_FUCKED_URTA: 0,
    UNKNOWN_FLAG_NUMBER_00147: 0,
    UNKNOWN_FLAG_NUMBER_00145: 0,
    URTA_INCUBATION: 0,
    PC_IS_A_GOOD_COTTON_DAD: 0,
    PC_IS_A_DEADBEAT_COTTON_DAD: 0,
    PC_FETISH: 0,
    LIFETIME_GYM_MEMBER: 0,
    UNKNOWN_FLAG_NUMBER_00281: 0,
    MET_IFRIS: 0,
    MET_HECKEL: 0,
    COTTON_MET_FUCKED: 0,
    BROOKE_MET: 0,
    YVONNE_FUCK_COUNTER: 0,
});

/**
 * The lovely town of Tel Adre
 * @author:
 */

// const YVONNE_FUCK_COUNTER: number = 437;

/**
 * 3 variables that define bonuses for piercing.
 */
// {region PiercingVariables

// 0) **Clit (+2 sens)
// 1) **Dick (+2 lib) adds the word 'pierced' sometimes to the description
// 2) **Ears
// 3) **Eyebrow (-.5 def)
// 4) **Lip (-.5 def)
// 5) **Nipples (+1 sens, +1 lib)
// 6) **Nose (+.5 attack)
// 7) **Tongue (+1 sens)
// 8) **Vulva (+1 sens)
const piercingLoc: number = 0;

// 1. Amethyst (+1 int, +1 lib)
// 2. Diamond (+2 int, -1 cor)
// 3. Gold (+1 int, +1 sens)
// 4. Emerald (+1 spe)
// 5. Jade (+1 spe, -.5 tou)
// 6. Onyx (+1 tou, -1 spe)
// 7. Ruby (+1 lib, +1 sens)
// 8. Steel (+2 str, -2 int)
const piercingMat: number = 0;

// 1. Stud
// 2. Ring (Called prince albert on dick)
// 3. Jacobs Ladder (dick only)
// 4. Hoop (ears/nipples/clit)
// 5. Chain (nipples only)
const piercingType: number = 0;
// }endregion

export function discoverTelAdre(player: Character): NextScreenChoices {
    if (!TelAdreFlags.FOUND) {
        CView.text("The merciless desert sands grind uncomfortably under your " + describeFeet(player) + " as you walk the dunes, searching the trackless sands to uncover their mysteries.  All of a sudden, you can see the outline of a small city in the distance, ringed in sandstone walls.  Strangely it wasn't there a few moments before.  It's probably just a mirage brought on by the heat.  Then again, you don't have any specific direction you're heading, what could it hurt to go that way?");
        CView.text("\n\nDo you investigate the city in the distance?");
    }
    else {
        CView.text("While out prowling the desert dunes you manage to spy the desert city of Tel'Adre again.  You could hike over to it again, but some part of you fears being rejected for being 'impure' once again.  Do you try?");
    }
    return { yes: encounterTelAdre, no: passTime(1) };
}

// player chose to approach the city in the distance
function encounterTelAdre(player: Character): NextScreenChoices {
    if (!TelAdreFlags.FOUND) {
        CView.text("You slog through the shifting sands for a long time, not really seeming to get that close.  Just when you're about to give up, you crest a large dune and come upon the walls of the city you saw before.  It's definitely NOT a mirage.  There are sandstone walls at least fifty feet tall ringing the entire settlement, and the only entrance you can see is a huge gate with thick wooden doors.  The entrance appears to be guarded by a female gray fox who's more busy sipping on something from a bottle than watching the desert.\n\n");
        CView.text("As if detecting your thoughts, she drops the bottle and pulls out a halberd much longer than she is tall.\n\n");
        CView.text("\"<i>Hold it!</i>\" barks the fox, her dark gray fur bristling in suspicion at your sudden appearance, \"<i>What's your business in the city of Tel'Adre?</i>\"\n\n");
        CView.text("You shrug and explain that you know nothing about this town, and just found it while exploring the desert.  The girl stares at you skeptically for a moment and then blows a shrill whistle.  She orders, \"<i>No sudden moves.</i>\"\n\n");
        CView.text("Deciding you've nothing to lose by complying, you stand there, awaiting whatever reinforcements this cute vulpine-girl has summoned.  Within the minute, a relatively large-chested centauress emerges from a smaller door cut into the gate, holding a massive bow with an arrow already nocked.\n\n");
        CView.text("\"<i>What's the problem, Urta?  A demon make it through the barrier?</i>\" asks the imposing horse-woman.\n\nUrta the fox shakes her head, replying, \"<i>I don't think so, Edryn.  " + mf(player, "He's", "She's") + " something else.  We should use the crystal and see if " + mf(player, "he", "she") + "'s fit to be allowed entry to Tel'Adre.</i>\"\n\n");
        CView.text("You watch the big centaur cautiously as she pulls out a pendant, and approaches you.  \"<i>Hold still,</i>\" she says, \"<i>this will do you no harm.</i>\"\n\n");
        CView.text("She places one hand on your shoulder and holds the crystal in the other.  Her eyes close, but her brow knits as she focuses on something.  ");
        return telAdreCrystal(player);
    }
    else {
        CView.text("Once again you find the gray fox, Urta, guarding the gates.  She nods at you and whistles for her companion, Edryn once again.  The centauress advances cautiously, and you submit herself to her inspection as she once again produces her magical amulet.  ");
        return telAdreCrystal(player);
    }
}

// Alignment crystal goooooo
function telAdreCrystal(player: Character): NextScreenChoices {
    if (!TelAdreFlags.FOUND) TelAdreFlags.FOUND = 1;
    // -70+ corruption, or possessed by exgartuan
    if (player.effects.has(EffectType.Exgartuan) || player.stats.cor >= 70) {
        CView.text("The crystal pendant begins to vibrate in the air, swirling around and glowing dangerously black.  Edryn snatches her hand back and says, \"<i>I'm sorry, but you're too far gone to step foot into our city.  If by some miracle you can shake the corruption within you, return to us.</i>\"\n\n");
        CView.text("You shrug and step back.  You could probably defeat these two, but you know you'd have no hope against however many friends they had beyond the walls.  You turn around and leave, a bit disgruntled at their hospitality.  After walking partway down the dune you spare a glance over your shoulder and discover the city has vanished!  Surprised, you dash back up the dune, flinging sand everywhere, but when you crest the apex, the city is gone.");
        return { next: passTime(1) };
    }
    // -50+ corruption or corrupted Jojo
    else if (player.stats.cor >= 50 || JojoFlags.monk >= 5) {
        CView.text("The crystal pendant shimmers, vibrating in place and glowing a purple hue.  Edryn steps back, watching you warily, \"<i>You've been deeply touched by corruption.  You balance on a razor's edge between falling completely and returning to sanity.  You may enter, but we will watch you closely.</i>\"\n\n");
    }
    // -25+ corruption or corrupted Marae
    else if (player.stats.cor >= 25 || player.effects.has(EffectType.FactoryOverload)) {
        CView.text("The crystal pendant twirls in place, glowing a dull red.  Edryn takes a small step back and murmers, \"<i>You've seen the darkness of this land first hand, but its hold on you is not deep.  You'll find sanctuary here.  The demons cannot find this place yet, and we promise you safe passage within the walls.</i>\"\n\n");
    }
    // -Low corruption/pure characters
    else {
        CView.text("The crystal shines a pale white light.  Edryn steps back and smiles broadly at you and says, \"<i>You've yet to be ruined by the demonic taint that suffuses the land of Mareth.  Come, you may enter our city walls and find safety here, though only so long as the covenant's white magic protects us from the demons' lapdogs.</i>\"\n\n");
    }
    CView.text("The vixen Urta gestures towards the smaller door and asks, \"<i>Would you like a tour of Tel'Adre, newcomer?</i>\"\n\n");
    CView.text("You remember your etiquette and nod, thankful to have a quick introduction to such a new place.  Urta leaves Edryn to watch the gate and leads you inside.  You do notice her gait is a bit odd, and her fluffy fox-tail seems to be permanently wrapped around her right leg.  The door closes behind you easily as you step into the city of Tel'Adre...");
    return { next: telAdreTour };
}

function telAdreTour(player: Character): NextScreenChoices {
    TelAdreFlags.ALLOWED_IN = 1;

    urta.urtaSprite();
    CView.text("Urta leads you into the streets of Tel'Adre, giving you a brief run-down of her and her city, \"<i>You see, about two decades back, the demons were chewing their way through every settlement and civilization in Mareth.  The covenant, a group of powerful magic-users, realized direct confrontation was doomed to fail.  They hid us in the desert with their magic, and the demons can't corrupt what they can't find.  So we're safe, for now.</i>\"\n\n");
    CView.text("The two of you find yourselves in the center of a busy intersection.  Urta explains that this is the main square of the city, and that, although the city is large, a goodly portion of it remains empty.  Much of the population left to assist other settlements in resisting the demons and was lost.  She brushes a lock of stray hair from her eye and guides you down the road, making sure to point out her favorite pub - \"The Wet Bitch\".  You ");
    if (player.stats.cor < 25) CView.text("blush");
    else CView.text("chuckle");
    CView.text(" at the rather suggestive name as Urta turns around and says, \"<i>With how things are, we've all gotten a lot more comfortable with our sexuality.  I hope it doesn't bother you.</i>\"\n\n");
    CView.text("A bit further on, you're shown a piercing parlor, apparently another favorite of Urta's.  A cute human girl with cat-like ears peeks out the front and gives you both a friendly wave.  It's so strange to see so many people together in one place, doing things OTHER than fucking.  The whole thing makes you miss your hometown more than ever.  Tears come to your eyes unbidden, and you wipe them away, glad to at least have this one reminder of normalcy.  Urta politely pretends not to notice, though the tail she keeps wrapped around her leg twitches as she wraps up the tour.\n\n");
    CView.text("She gives you a friendly punch on the shoulder and says, \"<i>Okay, gotta go!  Be good and stay out of trouble, alright?</i>\"\n\n");
    CView.text("Before you can answer, she's taken off back down the street, probably stopping off at 'The Wet Bitch' for a drink.  Strange, her departure was rather sudden...");
    return { next: telAdreMenu };
}

export function telAdreMenu(player: Character): NextScreenChoices {
    if (TelAdreFlags.VALENTINES_EVENT_YEAR < date.fullYear && player.body.balls.count > 0 && player.body.cocks.length > 0 && TelAdreFlags.NUMBER_OF_TIMES_MET_SCYLLA >= 4 && TelAdreFlags.TIMES_MET_SCYLLA_IN_ADDICTION_GROUP > 0 && isValentine()) {
        return crazyVDayShenanigansByVenithil();
    }
    if (!urtaQuest.urtaBusy() && TelAdreFlags.PC_SEEN_URTA_BADASS_FIGHT == 0 && randInt(15) == 0 && Time.hour > 15) {
        return urtaIsABadass(player);
    }
    if (!urtaQuest.urtaBusy() && urta.pregnancy.event > 5 && randInt(30) == 0) {
        return urtaPregs.urtaIsAPregnantCopScene();
    }
    switch (TelAdreFlags.KATHERINE_UNLOCKED) {
        case -1:
        case 0: // Still potentially recruitable
            if (TelAdreFlags.KATHERINE_RANDOM_RECRUITMENT_DISABLED == 0 && player.inventory.gems > 34 && randInt(25) == 0) {
                if (TelAdreFlags.KATHERINE_UNLOCKED == 0)
                    katherine.ambushByVagrantKittyKats();
                else katherine.repeatAmbushKatherineRecruitMent();
                return;
            }
        case 1: // In alley behind Oswald's
        case 2: // You are training her
        case 3: // You and Urta are training her
            break;
        case 4: // Employed
            if (!katherine.isAt(Katherine.KLOC_KATHS_APT) && TelAdreFlags.KATHERINE_TRAINING >= 100) {
                katherineEmployment.katherineGetsEmployed();
                return;
            }
        default: // Has given you a spare key to her apartment
            if (Time.hour < 10 && randInt(12) == 0) { // If employed or housed she can sometimes be encountered while on duty
                katherine.katherineOnDuty();
                return;
            }
    }
    if (TelAdreFlags.ARIAN_PARK == 0 && player.stats.level >= 4 && randInt(10) == 0 && TelAdreFlags.NOT_HELPED_ARIAN_TODAY == 0) {
        arianScene.meetArian();
        return;
    }
    // Display Tel'adre menu options//
    // Special Delivery☼☼☼
    // Has a small-ish chance of playing when the PC enters Tel'Adre.
    // Must have Urta's Key.
    // Urta must be pregnant to trigger this scene.
    // Play this scene upon entering Tel'Adre.
    if (urta.pregnancy.event > 2 && randInt(4) == 0 && TelAdreFlags.URTA_PREGNANT_DELIVERY_SCENE == 0 && player.inventory.keyItems.has("Spare Key to Urta's House")) {
        urtaPregs.urtaSpecialDeliveries();
        return;
    }
    if (TelAdreFlags.UNKNOWN_FLAG_NUMBER_00242 == -1) {
        maddie.runAwayMaddieFollowup();
        return;
    }
    CView.sprite(SpriteName.TelAdre); // -1;
    CView.clear();
    CView.text("Tel'Adre is a massive city, though most of its inhabitants tend to hang around the front few city blocks.  It seems the fall of Mareth did not leave the city of Tel'Adre totally unscathed.  A massive tower rises up in the center of the city, shimmering oddly.  From what you overhear in the streets, the covenant's magic-users slave away in that tower, working to keep the city veiled from outside dangers.  There does not seem to be a way to get into the unused portions of the city, but you'll keep your eyes open.\n\n");
    CView.text("A sign depicting a hermaphroditic centaur covered in piercings hangs in front of one of the sandstone buildings, and bright pink lettering declares it to be the 'Piercing Studio'.  You glance over and see the wooden facade of Urta's favorite bar, 'The Wet Bitch'.  How strange that those would be what she talks about during a tour.  In any event you can also spot some kind of wolf-man banging away on an anvil in a blacksmith's stand, and a foppishly-dressed dog-man with large floppy ears seems to be running some kind of pawnshop in his stand.  Steam boils from the top of a dome-shaped structure near the far end of the street, and simple lettering painted on the dome proclaims it to be a bakery.  Perhaps those shops will be interesting as well.");
    if (TelAdreFlags.RAPHEAL_COUNTDOWN_TIMER == -2 && !raphaelLikes(player)) {
        CView.text("\n\nYou remember Raphael's offer about the Orphanage, but you might want to see about shaping yourself more to his tastes first.  He is a picky fox, after all, and you doubt he would take well to seeing you in your current state.");
    }
    return telAdreMenuShow(player);
}

export function telAdreMenuShow(player: Character): NextScreenChoices { // Just displays the normal Tel'Adre menu options, no special events, no description. Useful if a special event has already played
    let homes: boolean = false;
    if (TelAdreFlags.RAPHEAL_COUNTDOWN_TIMER == -2 && raphaelLikes(player))
        homes = true;
    else if (player.inventory.keyItems.has("Spare Key to Urta's House"))
        homes = true;
    else if (TelAdreFlags.KATHERINE_UNLOCKED >= 5)
        homes = true;
    else if (TelAdreFlags.ARIAN_PARK >= 4 && !arianFollower())
        homes = true;

    const choices: ScreenChoice[] = [];
    choices[0] = ["Shops", armorShops];
    choices[1] = ["Bakery", bakeryuuuuuu];
    choices[2] = ["Bar", enterBarTelAdre];
    choices[3] = ["Gym", gymDesc];
    if (homes) choices[4] = ["Homes", houses];
    if (TelAdreFlags.ARIAN_PARK > 0 && TelAdreFlags.ARIAN_PARK < 4) choices[5] = ["Park", visitThePark];
    choices[6] = ["Pawn", oswaldPawn];
    choices[7] = ["Tower", visitZeMagesTower];
    choices[8] = ["Weapons", weaponShop];
    choices[9] = ["Leave", passTime(1)];

    return { choices };
}

function armorShops(player: Character): NextScreenChoices {

    const choices: ScreenChoice[] = [];
    choices[0] = ["Blacksmith", armorShop];
    choices[1] = ["Piercing", piercingStudio];
    choices[2] = ["Tailor", tailorShoppe];

    if (TelAdreFlags.LOPPE_PC_MET_UMA == 1) {
        choices[3] = ["Clinic", enterClinic];
    }

    choices[4] = ["Back", telAdreMenu];

    return { choices };
}

export function houses(player: Character): NextScreenChoices {
    CView.clear();
    CView.text("Whose home will you visit?");
    let orphanage;
    if (TelAdreFlags.RAPHEAL_COUNTDOWN_TIMER == -2) {
        if (raphaelLikes(player)) {
            orphanage = orphanageIntro;
        }
        else {
            CView.text("\n\nYou remember Raphael's offer about the Orphanage, but you might want to see about shaping yourself more to his tastes first.  He is a picky fox, after all, and you doubt he would take well to seeing you in your current state.");
        }
    }

    const choices: ScreenChoice[] = [];
    if (TelAdreFlags.ARIAN_PARK >= 4 && !arianScene.arianFollower()) choices[0] = ["Arian's", arianScene.visitAriansHouse];
    choices[1] = ["Orphanage", orphanage];
    if (urtaPregs.urtaKids() > 0 && player.inventory.keyItems.has("Spare Key to Urta's House"))
        choices[2] = ["Urta's House", (katherine.isAt(Katherine.KLOC_URTAS_HOME) ? katherine.katherineAtUrtas : urtaPregs.visitTheHouse)];
    if (TelAdreFlags.KATHERINE_UNLOCKED >= 5) choices[3] = ["Kath's Apt", katherine.visitAtHome];
    choices[9] = ["Back", telAdreMenu];

    return { choices };
}

function piercingStudio(player: Character): NextScreenChoices {
    CView.sprite(SpriteName.TelAdre); // 63;
    let about: ClickFunction;
    if (!player.effects.has(EffectType.Yara)) about = aboutYara;

    CView.text("The interior of the piercing studio is earthy, leaving the stone floors and walls uncovered, though the windows are covered with woven blankets, sewn from multicolored threads.  There are a number of cushy chairs facing a wall of mirrors, along with a shelf covered in needles, piercings, and strong alcohols.  A brunette prowls about the place, tidying it up during a lull in business.  You dully notice that unlike everyone else in this town, she's mostly human.  Perhaps she came through a portal as well?  She approaches you, and you see a cat tail waving behind her, and a pair of fuzzy feline ears, both covered in piercings, perched atop her head.  Clearly she's been here long enough to pick up some of the local flavor.\n\n");
    CView.text("She introduces herself, \"<i>Hello there " + mf(player, "sir", "cutie") + ", my name is Yara.  Would you like to get a piercing?</i>\"");
    if (!TelAdreFlags.LOW_STANDARDS_FOR_ALL)
        return { choices: [["Pierce", pierceMenu], ["Remove", piercingRemove], ["About Her", about], ["", undefined], ["Leave", telAdreMenu]] };
    else {

        CView.text("\n\n(Low Standard mode!)\nAlternatively, she might be open to a quick fuck if you ask.");
        return {
            choices: [
                ["Pierce", pierceMenu], ["Remove", piercingRemove], ["", undefined], ["AsFemale", choiceWrap(letsDoYaraSex, true)], ["AsMale", choiceWrap(letsDoYaraSex, false)],
                ["About Her", about], ["", undefined], ["", undefined], ["", undefined], ["Leave", telAdreMenu]
            ]
        };
    }
}
function aboutYara(player: Character): NextScreenChoices {
    CView.sprite(SpriteName.TelAdre); // 63;
    player.effects.create(EffectType.Yara, 0, 0, 0, 0);
    CView.clear();
    CView.text("You introduce yourself and ask Yara about her past, noting that ");
    if (humanRaceScore(player) <= 2) CView.text("you were once a human too.");
    else CView.text("you haven't seen many other humans about.");
    CView.text("\n\nShe blushes a little when she answers, her tail curling about her protectively, \"<i>My home city was built around a portal, and the Baron that ruled it insisted that we send a sacrifice through every year.  We were raised believing that if we didn't sacrifice SOMEONE, the gods would become angry and bring our city to ruin.  Of course the whole thing was a sham, but the families of those sacrificed get compensation.  My father tried to whore me out first, but when that didn't work, the bastard had me drugged and sacrificed.  I woke up next to a lake, ate some weird fruit when I got hungry, and I... well, I changed.  Thankfully I found my way here before I ran into any demons, or who knows what would have happened to me!  Tel'Adre has been good to me, and I'm sure it'll be good to you.  Now, how about getting a piercing?</i>\"");
    player.stats.int += 2;
    player.stats.lust += -5;
    player.stats.cor += -1;

    return { next: piercingStudio };
}
function pierceMenu(player: Character): NextScreenChoices {
    CView.sprite(SpriteName.TelAdre); // 63;

    let clit: ClickFunction;
    if (player.body.vaginas.length > 0) {
        if (player.inventory.piercings.clit.isEquipped() == 0)
            clit = clitPierce;
    }
    let dick: ClickFunction;
    if (player.body.cocks.length > 0) {
        if (player.body.cocks[0].pierced == 0)
            dick = dickPierce;
    }
    let ears: ClickFunction;
    if (player.inventory.piercings.isEquipped() == 0)
        ears = earPierce;
    let eyebrow: ClickFunction;
    if (player.inventory.piercings.eyebrow.isEquipped() == 0)
        eyebrow = eyebrowPierce;
    let lip: ClickFunction;
    if (player.inventory.piercings.lip.isEquiped() == 0)
        lip = lipPierce;
    let nipples: ClickFunction;
    if (player.nipplesPierced == 0)
        nipples = nipplePierce;
    let nose: ClickFunction;
    if (player.inventory.piercings.isEquipped() == 0)
        nose = nosePierce;
    let tongue: ClickFunction;
    if (player.inventory.piercings.tongue.isEquipped() == 0)
        tongue = tonguePierce;
    let vulva: ClickFunction;
    if (player.body.vaginas.length > 0) {
        if (player.inventory.piercings.labia.isEquipped() == 0) vulva = vulvaPierce;
    }
    CView.clear();
    CView.text("Yara asks, \"<i>Ok then, what would you like pierced " + mf(player, "sir", "cutie") + "?  Just keep in mind my piercings are special - they're permanent and CAN'T be removed.</i>\"");
    if (clit != undefined || dick != undefined || ears != undefined || eyebrow != undefined || lip != undefined || nipples != undefined || nose != undefined || tongue != undefined || vulva != undefined)
        return { choices: [["Clit", clit], ["Dick", dick], ["Ears", ears], ["Eyebrow", eyebrow], ["Lip", lip], ["Nipples", nipples], ["Nose", nose], ["Tongue", tongue], ["Labia", vulva], ["Back", piercingStudio]] };
    else {
        CView.text("\n\nYou give yourself a quick once-over and realize there's nowhere left for her to pierce you.  Oh well.");
        return { next: piercingStudio };
    }
}

function dickPierce(player: Character): NextScreenChoices {
    CView.sprite(SpriteName.TelAdre); // 63;
    if (player.body.cocks.length > 0) CView.clear();
    CView.text("\"<i>Ok, this is gonna hurt a LOT, but I've heard good things about it.  What kind of piercing do you want done?</i>\" Yara asks.");
        else {
        CView.clear();
        CView.text("You realize you don't have a dick to pierce.  Whoops!  Better pick something else...");
        return { next: pierceMenu };
        return;
    }
    return { choices: [["Stud", chooseStud], ["Ring", chooseRing], ["Ladder", chooseLadder], ["Back", pierceMenu], ["Nevermind", piercingStudio]] };
    piercingLoc = 1;
}

function clitPierce(player: Character): NextScreenChoices {
    CView.sprite(SpriteName.TelAdre); // 63;
    if (player.body.vaginas.length > 0) CView.clear();
    CView.text("\"<i>Ohhh, that's going to be suckably cute!</i>\" exclaims Yara, blushing more than a little. \"<i>What kind of piercing would you like?</i>");
        else {
        CView.clear();
        CView.text("You realize you don't have a clit to pierce.  Whoops!  Better pick something else...");
        return { next: pierceMenu };
        return;
    }
    piercingLoc = 0;
    return { choices: [["Stud", chooseStud], ["Ring", chooseRing], ["", undefined], ["Back", pierceMenu], ["Nevermind", piercingStudio]] };
}

function earPierce(player: Character): NextScreenChoices {
    CView.sprite(SpriteName.TelAdre); // 63;
    piercingLoc = 2;
    CView.clear();
    CView.text("\"<i>Okay, just let me get my supplies and we can get started.  What kind of jewelry do you want in them?</i>\" asks Yara.");
    return { choices: [["Stud", chooseStud], ["Ring", chooseRing], ["Hoop", chooseHoop], ["Back", pierceMenu], ["Nevermind", piercingStudio]] };
}

function eyebrowPierce(player: Character): NextScreenChoices {
    CView.sprite(SpriteName.TelAdre); // 63;
    piercingLoc = 3;
    CView.clear();
    CView.text("\"<i>Ah, that's a good look!  What do you want there?</i>\" asks Yara.");
    return { choices: [["Stud", chooseStud], ["Ring", chooseRing], ["", undefined], ["Back", pierceMenu], ["Nevermind", piercingStudio]] };
}

function lipPierce(player: Character): NextScreenChoices {
    CView.sprite(SpriteName.TelAdre); // 63;
    piercingLoc = 4;
    CView.clear();
    CView.text("\"<i>Oh my, that'll be HAWT!  What kind of jewelry do you want there?</i>\" asks Yara.");
    return { choices: [["Stud", chooseStud], ["Ring", chooseRing], ["", undefined], ["Back", pierceMenu], ["Nevermind", piercingStudio]] };
}

function nipplePierce(player: Character): NextScreenChoices {
    CView.sprite(SpriteName.TelAdre); // 63;
    piercingLoc = 5;
    CView.clear();
    CView.text("\"<i>Yeah, sure I can do those!  What kind of jewelry do you want there?  I'm partial to nipple-chains myself,</i>\" admits Yara, blushing bright red.");
    return { choices: [["Studs", chooseStud], ["Rings", chooseRing], ["Chain", chooseChain], ["Back", pierceMenu], ["Nevermind", piercingStudio]] };
}

function nosePierce(player: Character): NextScreenChoices {
    CView.sprite(SpriteName.TelAdre); // 63;
    piercingLoc = 6;
    CView.clear();
    CView.text("Yara wrinkles her nose in distaste, \"<i>Really?  Well ok, what do you want there?</i>\"");
    return { choices: [["Stud", chooseStud], ["Ring", chooseRing], ["", undefined], ["Back", pierceMenu], ["Nevermind", piercingStudio]] };
}

function tonguePierce(player: Character): NextScreenChoices {
    CView.sprite(SpriteName.TelAdre); // 63;
    piercingLoc = 7;
    CView.clear();
    CView.text("Yara happily purrs, \"<i>Oh my, I bet that'll be fun!  I'm afraid I can only put a stud there though, ok?</i>\"");
    return { choices: [["Ok", chooseStud], ["", undefined], ["", undefined], ["Back", pierceMenu], ["Nevermind", piercingStudio]] };
}
function vulvaPierce(player: Character): NextScreenChoices {
    CView.sprite(SpriteName.TelAdre); // 63;
    piercingLoc = 8;
    if (player.body.vaginas.length > 0) CView.clear();
    CView.text("Yara explains, \"<i>This is gonna hurt a lot, but I think you'll love how it feels after.  I know I do!  Now what kind of jewelry do you want down-town?</i>\"");
        else {
        CView.clear();
        CView.text("You realize you don't have a pussy to pierce.  Whoops!  Better pick something else...");
        return { next: pierceMenu };
        return;
    }
    return { choices: [["Stud", chooseStud], ["Ring", chooseRing], ["", undefined], ["Back", pierceMenu], ["Nevermind", piercingStudio]] };
}
function chooseStud(player: Character): NextScreenChoices {
    piercingType = 1;
    return chooseMaterials(player);
}
function chooseRing(player: Character): NextScreenChoices {
    piercingType = 2;
    return chooseMaterials(player);
}
function chooseLadder(player: Character): NextScreenChoices {
    piercingType = 3;
    return chooseMaterials(player);
}
function chooseHoop(player: Character): NextScreenChoices {
    piercingType = 4;
    return chooseMaterials(player);
}
function chooseChain(player: Character): NextScreenChoices {
    piercingType = 5;
    return chooseMaterials(player);
}

function chooseMaterials(player: Character): NextScreenChoices {
    CView.sprite(SpriteName.TelAdre); // 63;
    CView.clear();
    CView.text("Yara gathers up her materials and says, \"<i>Ok, now what type of material do you want it made from?  Don't worry about price, none of these are that rare, so the piercing will only be 100 gems.  Though I do have some rarer materials; you'll need 1,000 gems to spend if you want to check them out.</i>\"");
    if (player.inventory.gems < 100) {
        CView.text("\n\nYou realize you don't have enough gems to get a piercing.");
        return { next: piercingStudio };
        return;
    }
    let rare: ClickFunction;
    if (player.inventory.gems >= 1000) rare = chooseAdvancedMaterials;
    return { choices: [["Amethyst", chooseAmethyst], ["Diamond", chooseDiamond], ["Gold", chooseGold], ["Emerald", chooseEmerald], ["Jade", chooseJade], ["Onyx", chooseOnyx], ["Ruby", chooseRuby], ["Steel", chooseSteel], ["Rare Menu", rare], ["Nevermind", piercingStudio]] };
}
function chooseAmethyst(player: Character): NextScreenChoices {
    piercingMat = 1;
    return areYouSure(player);
}
function chooseDiamond(player: Character): NextScreenChoices {
    piercingMat = 2;
    return areYouSure(player);
}
function chooseGold(player: Character): NextScreenChoices {
    piercingMat = 3;
    return areYouSure(player);
}
function chooseEmerald(player: Character): NextScreenChoices {
    piercingMat = 4;
    return areYouSure(player);
}
function chooseJade(player: Character): NextScreenChoices {
    piercingMat = 5;
    return areYouSure(player);
}
function chooseOnyx(player: Character): NextScreenChoices {
    piercingMat = 6;
    return areYouSure(player);
}
function chooseRuby(player: Character): NextScreenChoices {
    piercingMat = 7;
    return areYouSure(player);
}
function chooseSteel(player: Character): NextScreenChoices {
    piercingMat = 8;
    return areYouSure(player);
}
function chooseLethite(player: Character): NextScreenChoices {
    piercingMat = 9;
    return areYouSure(player);
}
function chooseFertite(player: Character): NextScreenChoices {
    piercingMat = 10;
    return areYouSure(player);
}
function chooseFurrite(player: Character): NextScreenChoices {
    piercingMat = 11;
    return areYouSure(player);
}
function chooseCrimstone(player: Character): NextScreenChoices {
    piercingMat = 12;
    return areYouSure(player);
}

function areYouSure(player: Character): NextScreenChoices {
    CView.sprite(SpriteName.TelAdre); // 63;
    CView.clear();
    CView.text("Yara says, \"<i>Ok, last chance to back out, are you sure you want to go ahead with this?  Remember, once I put it in, it's permanent.</i>\"");
    return { yes: normalPierceAssemble, no: piercingStudio };
}
// 9. Lethite (Demon Lure)
// 10. Fertite (Fertility Booster)
// 11. Furrite (Attracts Furries)
// 12. Crimstone - + min lust
function chooseAdvancedMaterials(player: Character): NextScreenChoices {
    CView.sprite(SpriteName.TelAdre); // 63;
    CView.clear();
    CView.text("Yara goes back into the back and comes out with a gilded tray full of exotic materials.  She hands you a brochure and asks, \"<i>Ok, now what am I going to be working with?</i>\"");
    CView.text("\n\nThere's a number of materials listed here:");
    CView.text("\n1. Lethite - Fake lethicite.  While beautiful, it's known to attract demons.");
    CView.text("\n2. Fertite - A green gem sometimes fished up from the bottom of Mareth's great lake, it is said to enhance the fertility of both genders.");
    CView.text("\n3. Furrite - This beautiful purple gem is actually crystalized from materials used in hunting lures.  It is said to enhance the wearer's appeal to beast-people.");
    CView.text("\n4. Crimstone - Crimstone is said to be formed from volcanic fires, and to keep the fires of one's desires burning brightly.");
    CView.text("\n\n<b>DISCLAIMER</b>: Yara's Piercing Studio is not responsible if the piercee's body absorbs any residual magic of these stones, and is not required to resolve any issues if the effects persist beyond removal.</b>");
    return { choices: [["Lethite", chooseLethite], ["Fertite", chooseFertite], ["Furrite", chooseFurrite], ["Crimstone", chooseCrimstone], ["Back", chooseMaterials]] };
}

function normalPierceAssemble(player: Character): NextScreenChoices {
    CView.sprite(SpriteName.TelAdre); // 63;
    CView.clear();
    CView.text("Yara makes you comfortable and has you look away while she uses her piercing tools.  It hurts, but she's skilled and before you know it, your piercing is done!");
    // 1. Amethyst (+1 int, +1 lib)
    // 2. Diamond (+2 int, -1 cor)
    // 3. Gold (+1 int, +1 sens)
    // 4. Emerald (+1 spe)
    // 5. Jade (+1 spe, -.5 tou)
    // 6. Onyx (+1 tou, -1 spe)
    // 7. Ruby (+1 lib, +1 sens)
    // 8. Steel (+2 str, -2 int)
    // 9. Lethite (Demon Lure)
    // 10. Fertite (Fertility Booster)
    // 11. Furrite (Attracts Furries)
    // 12. Crimsonite (+Min Lust)
    // 13.
    // var piercingMat: number = 0;
    let shortP: string = "";
    let longP: string = "";
    player.inventory.gems -= 100;
    if (piercingMat > 8) player.inventory.gems -= 900;

    // set up material description
    switch (piercingMat) {
        case 1:
            shortP += "amethyst ";
            player.stats.int += 1;
            player.stats.lib += 1;

            longP += "Amethyst ";
            break;
        case 2:
            shortP += "diamond ";
            player.stats.int += 2;
            player.stats.cor += -1;

            longP += "Diamond ";
            break;
        case 3:
            shortP += "gold ";
            player.stats.int += 1;
            player.stats.sens += 1;

            longP += "Gold ";
            break;
        case 4:
            shortP += "emerald ";
            player.stats.spe += 1;

            longP += "Emerald ";
            break;
        case 5:
            shortP += "jade ";
            player.stats.tou += -.5;
            player.stats.int += 1;
            player.stats.cor += -1;

            longP += "Jade ";
            break;
        case 6:
            shortP += "onyx ";
            player.stats.tou += 1;
            player.stats.spe += -1;

            longP += "Onyx ";
            break;
        case 7:
            shortP += "ruby ";
            player.stats.lib += 1;
            player.stats.sens += 1;

            longP += "Ruby ";
            break;
        case 8:
            shortP += "steel ";
            player.stats.str += 2;
            player.stats.int += -2;

            longP += "Steel ";
            break;
        case 9:
            shortP += "lethite ";
            if (!player.effects.has(EffectType.PiercedLethite)) player.effects.create(EffectType.PiercedLethite, 0, 0, 0, 0);
            longP += "Lethite ";
            break;
        case 10:
            shortP += "fertite ";
            if (!player.effects.has(EffectType.PiercedFertite)) player.effects.create(EffectType.PiercedFertite, 5, 0, 0, 0);
            else player.effects.getByName(EffectType.PiercedFertite).value1 += 5;
            longP += "Fertite ";
            break;
        case 11:
            shortP += "furrite ";
            if (!player.effects.has(EffectType.PiercedFurrite)) player.effects.create(EffectType.PiercedFurrite, 0, 0, 0, 0);
            longP += "Furrite ";
            break;
        case 12:
            shortP += "crimstone ";
            if (!player.effects.has(EffectType.PiercedCrimstone)) player.effects.create(EffectType.PiercedCrimstone, 5, 0, 0, 0);
            else player.effects.getByName(EffectType.PiercedCrimstone).value1 += 5;
            longP += "Crimstone ";
            break;
    }
    switch (piercingLoc) {
        /*
        0) **Clit (+2 sens)
        1) **Dick (+2 lib) adds the word 'pierced' sometimes to the description
        2) **Ears
        3) **Eyebrow (-.5 def)
        4) **Lip (-.5 def)
        5) **Nipples (+1 sens, +1 lib)
        6) **Nose (+.5 attack)
        7) **Tongue (+1 sens)
        8) **Vulva (+1 sens)*/
        // var piercingLoc: number = 0;
        case 0:
            shortP += "clit-";
            longP += "clit-";
            player.stats.sens += 2;

            break;
        case 1:
            if (piercingType == 3) break;
            shortP += "cock-";
            longP += "cock-";
            player.stats.lib += 2;

            break;
        case 2:
            shortP += "ear";
            longP += "ear";
            break;
        case 3:
            player.stats.tou += -.5;

            shortP += "eyebrow-";
            longP += "eyebrow-";
            break;
        case 4:
            player.stats.tou += -.5;

            shortP += "lip-";
            longP += "lip-";
            break;
        case 5:
            player.stats.lib += 1;
            player.stats.sens += 1;

            shortP += "nipple-";
            longP += "nipple-";
            break;
        case 6:
            player.stats.str += .5;

            shortP += "nose-";
            longP += "nose-";
            break;
        case 7:
            player.stats.sens += 1;

            shortP += "tongue-";
            longP += "tongue-";
            break;
        case 8:
            player.stats.sens += 1;

            shortP += "labia-";
            longP += "labia-";
            break;
    }
    switch (piercingType) {
        // studs
        case 1:
            // multiples
            if (piercingLoc == 2 || piercingLoc == 5 || piercingLoc == 8) {
                shortP += "studs";
                longP += "studs";
            }
            else {
                shortP += "stud";
                longP += "stud";
            }
            break;
        // 2. Ring (Called prince albert on dick)
        case 2:
            // multiples
            if (piercingLoc == 2 || piercingLoc == 5 || piercingLoc == 8) {
                shortP += "rings";
                longP += "rings";
            }
            else {
                shortP += "ring";
                longP += "ring";
            }
            break;
        // 3. Jacobs Ladder (dick only)
        case 3:
            shortP += "jacob's ladder";
            longP += "jacob's ladder";
            break;
        // 4. Hoop (ears/nipples/clit)
        case 4:
            // multiples
            if (piercingLoc == 2 || piercingLoc == 5 || piercingLoc == 8) {
                shortP += "hoops";
                longP += "hoops";
            }
            else {
                shortP += "hoop";
                longP += "hoop";
            }
            break;
        // 5. Chain (nipples only)
        case 5:
            shortP += "chain";
            longP += "chain";
            break;
    }
    // Actually assign values to their real storage locations
    switch (piercingLoc) {
        /*
        0) **Clit (+2 sens)
        1) **Dick (+2 lib) adds the word 'pierced' sometimes to the description
        2) **Ears
        3) **Eyebrow (-.5 def)
        4) **Lip (-.5 def)
        5) **Nipples (+1 sens, +1 lib)
        6) **Nose (+.5 attack)
        7) **Tongue (+1 sens)
        8) **Vulva (+1 sens)*/
        // var piercingLoc: number = 0;
        case 0:
            player.inventory.piercings.clit.isEquipped() = piercingType;
            player.inventory.piercings.clit.item.shortDesc = shortP;
            player.inventory.piercings.clit.item.longDesc = longP;
            break;
        case 1:
            player.body.cocks[0].pierced = piercingType;
            player.inventory.piercings.cocks.get(0).item.shortDesc = shortP;
            player.inventory.piercings.cocks.get(0).item.longDesc = longP;
            break;
        case 2:
            player.inventory.piercings.isEquipped() = piercingType;
            player.inventory.piercings.item.shortDesc = shortP;
            player.inventory.piercings.item.longDesc = longP;
            break;
        case 3:
            player.inventory.piercings.eyebrow.isEquipped() = piercingType;
            player.inventory.piercings.eyebrow.item.shortDesc = shortP;
            player.inventory.piercings.eyebrow.item.longDesc = longP;
            break;
        case 4:
            player.inventory.piercings.lip.isEquiped() = piercingType;
            player.inventory.piercings.lip.item.shortDesc = shortP;
            player.inventory.piercings.lip.item.longDesc = longP;
            break;
        case 5:
            player.nipplesPierced = piercingType;
            player.nipplesPShort = shortP;
            player.nipplesPLong = longP;
            break;
        case 6:
            player.inventory.piercings.isEquipped() = piercingType;
            player.inventory.piercings.item.shortDesc = shortP;
            player.inventory.piercings.item.longDesc = longP;
            break;
        case 7:
            player.inventory.piercings.tongue.isEquipped() = piercingType;
            player.inventory.piercings.tongue.item.shortDesc = shortP;
            player.inventory.piercings.tongue.item.longDesc = longP;
            break;
        case 8:
            player.inventory.piercings.labia.isEquipped() = piercingType;
            player.inventory.piercings.labia.item.shortDesc = shortP;
            player.inventory.piercings.labia.item.longDesc = longP;
            break;
    }
    // Girls
    if (piercingLoc == 8 || piercingLoc == 0) {
        return yaraSex(player);
        return;
    }
    // Dudes
    else if (piercingLoc == 1 && (player.body.cocks.find(Cock.CockThatFits(36)) || TelAdreFlags.HYPER_HAPPY)) {
        return yaraSex(player, false);
        return;
    }
    // Piercing shop main menu
    return { next: piercingStudio };
}

function piercingRemove(player: Character): NextScreenChoices {
    CView.sprite(SpriteName.TelAdre); // 63;

    let clit: ClickFunction;
    if (player.body.vaginas.length > 0) {
        if (player.inventory.piercings.clit.isEquipped() > 0) clit = removeClitPierce;
    }
    let dick: ClickFunction;
    if (player.body.cocks.length > 0) {
        if (player.body.cocks[0].pierced > 0) dick = removeCockPierce;
    }
    let ears: ClickFunction;
    if (player.inventory.piercings.isEquipped() > 0) ears = removeEarsPierce;
    let eyebrow: ClickFunction;
    if (player.inventory.piercings.eyebrow.isEquipped() > 0) eyebrow = removeEyebrowPierce;
    let lip: ClickFunction;
    if (player.inventory.piercings.lip.isEquiped() > 0) lip = removeLipPierce;
    let nipples: ClickFunction;
    if (player.nipplesPierced > 0) nipples = removeNipplesPierce;
    let nose: ClickFunction;
    if (player.inventory.piercings.isEquipped() > 0) nose = removeNosePierce;
    let tongue: ClickFunction;
    if (player.inventory.piercings.tongue.isEquipped() > 0) tongue = removeTonguePierce;
    let vulva: ClickFunction;
    if (player.body.vaginas.length > 0) {
        if (player.inventory.piercings.labia.isEquipped() > 0) vulva = removeVulvaPierce;
    }
    if (clit == undefined && dick == undefined && ears == undefined && eyebrow == undefined && lip == undefined && nipples == undefined && nose == undefined && tongue == undefined && vulva == undefined) {
        CView.clear();
        CView.text("Yara giggles, \"<i>You don't have any piercings, silly!</i>\"");
        return { next: piercingStudio };
        return;
    }
    CView.clear();
    CView.text("\"<i>Really?</i>\" asks Yara, \"<i>I told you those piercings are permanent!  Well, I suppose they CAN be removed, but you're gonna hurt like hell afterwards.  If you really want me to, I can remove something, but it'll cost you 100 gems for the painkillers and labor.</i>\"");
    if (player.inventory.gems < 100) {
        CView.text("\n\n<b>You do not have enough gems.</b>");
        return { next: piercingStudio };
        return;
    }
    if (player.stats.tou <= 5.5) {
        CView.clear();
        CView.text("Yara looks you up and down before refusing you outright, \"<i>You don't look so good " + player.desc.name + ".  I don't think your body could handle it right now.</i>\"");
        return { next: piercingStudio };
        return;
    }
    return { choices: [["Clit", clit], ["Dick", dick], ["Ears", ears], ["Eyebrow", eyebrow], ["Lip", lip], ["Nipples", nipples], ["Nose", nose], ["Tongue", tongue], ["Labia", vulva], ["Back", piercingStudio]] };
}

function removeClitPierce(player: Character): NextScreenChoices {
    CView.sprite(SpriteName.TelAdre); // 63;
    CView.clear();
    CView.text("Yara gives you something to drink and you swiftly black out.  You awake about an hour later, sore and weak, though thankfully not bleeding.");
    player.inventory.piercings.clit.isEquipped() = 0;
    player.inventory.piercings.clit.item.shortDesc = "";
    player.inventory.piercings.clit.item.longDesc = "";
    player.stats.tou += -5;

    player.inventory.gems -= 100;

    return { next: piercingStudio };
}

function removeCockPierce(player: Character): NextScreenChoices {
    CView.sprite(SpriteName.TelAdre); // 63;
    CView.clear();
    CView.text("Yara gives you something to drink and you swiftly black out.  You awake about an hour later, sore and weak, though thankfully not bleeding.");
    player.body.cocks[0].pierced = 0;
    player.inventory.piercings.cocks.get(0).item.shortDesc = "";
    player.inventory.piercings.cocks.get(0).item.longDesc = "";
    player.stats.tou += -5;

    player.inventory.gems -= 100;

    return { next: piercingStudio };
}

function removeEarsPierce(player: Character): NextScreenChoices {
    CView.sprite(SpriteName.TelAdre); // 63;
    CView.clear();
    CView.text("Yara gives you something to drink and you swiftly black out.  You awake about an hour later, sore and weak, though thankfully not bleeding.");
    player.inventory.piercings.isEquipped() = 0;
    player.inventory.piercings.item.shortDesc = "";
    player.inventory.piercings.item.longDesc = "";
    player.stats.tou += -5;

    player.inventory.gems -= 100;

    return { next: piercingStudio };
}

function removeEyebrowPierce(player: Character): NextScreenChoices {
    CView.sprite(SpriteName.TelAdre); // 63;
    CView.clear();
    CView.text("Yara gives you something to drink and you swiftly black out.  You awake about an hour later, sore and weak, though thankfully not bleeding.");
    player.inventory.piercings.eyebrow.isEquipped() = 0;
    player.inventory.piercings.eyebrow.item.shortDesc = "";
    player.inventory.piercings.eyebrow.item.longDesc = "";
    player.stats.tou += -5;

    player.inventory.gems -= 100;

    return { next: piercingStudio };
}

function removeLipPierce(player: Character): NextScreenChoices {
    CView.sprite(SpriteName.TelAdre); // 63;
    CView.clear();
    CView.text("Yara gives you something to drink and you swiftly black out.  You awake about an hour later, sore and weak, though thankfully not bleeding.");
    player.inventory.piercings.lip.isEquiped() = 0;
    player.inventory.piercings.lip.item.shortDesc = "";
    player.inventory.piercings.lip.item.longDesc = "";
    player.stats.tou += -5;

    player.inventory.gems -= 100;

    return { next: piercingStudio };
}

function removeNipplesPierce(player: Character): NextScreenChoices {
    CView.sprite(SpriteName.TelAdre); // 63;
    CView.clear();
    CView.text("Yara gives you something to drink and you swiftly black out.  You awake about an hour later, sore and weak, though thankfully not bleeding.");
    player.nipplesPierced = 0;
    player.nipplesPShort = "";
    player.nipplesPLong = "";
    player.stats.tou += -5;

    player.inventory.gems -= 100;

    return { next: piercingStudio };
}

function removeNosePierce(player: Character): NextScreenChoices {
    CView.sprite(SpriteName.TelAdre); // 63;
    CView.clear();
    CView.text("Yara gives you something to drink and you swiftly black out.  You awake about an hour later, sore and weak, though thankfully not bleeding.");
    player.inventory.piercings.isEquipped() = 0;
    player.inventory.piercings.item.shortDesc = "";
    player.inventory.piercings.item.longDesc = "";
    player.stats.tou += -5;

    player.inventory.gems -= 100;

    return { next: piercingStudio };
}

function removeTonguePierce(player: Character): NextScreenChoices {
    CView.sprite(SpriteName.TelAdre); // 63;
    CView.clear();
    CView.text("Yara gives you something to drink and you swiftly black out.  You awake about an hour later, sore and weak, though thankfully not bleeding.");
    player.inventory.piercings.tongue.isEquipped() = 0;
    player.inventory.piercings.tongue.item.shortDesc = "";
    player.inventory.piercings.tongue.item.longDesc = "";
    player.stats.tou += -5;

    player.inventory.gems -= 100;

    return { next: piercingStudio };
}

function removeVulvaPierce(player: Character): NextScreenChoices {
    CView.sprite(SpriteName.TelAdre); // 63;
    CView.clear();
    CView.text("Yara gives you something to drink and you swiftly black out.  You awake about an hour later, sore and weak, though thankfully not bleeding.");
    player.inventory.piercings.labia.isEquipped() = 0;
    player.inventory.piercings.labia.item.shortDesc = "";
    player.inventory.piercings.labia.item.longDesc = "";
    player.stats.tou += -5;

    player.inventory.gems -= 100;

    return { next: piercingStudio };
}

export function oswaldPawn(player: Character): NextScreenChoices {
    CView.sprite(SpriteName.TelAdre); // 47;

    if (!player.effects.has(EffectType.Oswald)) {
        CView.text("Upon closer inspection, you realize the pawnbroker appears to be some kind of golden retriever.  He doesn't look entirely comfortable and he slouches, but he manages to smile the entire time.  His appearance is otherwise immaculate, including his classy suit-jacket and tie, though he doesn't appear to be wearing any pants.  Surprisingly, his man-bits are retracted.  ");
        if (player.stats.cor < 75) CView.text("Who would've thought that seeing someone NOT aroused would ever shock you?");
        else CView.text("What a shame, but maybe you can give him a reason to stand up straight?");
        CView.text("  His stand is a disheveled mess, in stark contrast to its well-groomed owner.  He doesn't appear to be selling anything at all right now.\n\n");
        CView.text("The dog introduces himself as Oswald and gives his pitch, \"<i>Do you have anything you'd be interested in selling?  The name's Oswald, and I'm the best trader in Tel'Adre.</i>\"\n\n");
        CView.text("(You can sell an item here, but Oswald will not let you buy them back, so be sure of your sales.)");
        player.effects.create(EffectType.Oswald, 0, 0, 0, 0);
    }
    else {
        CView.text("You see Oswald fiddling with a top hat as you approach his stand again.  He looks up and smiles, padding up to you and rubbing his furry hands together.  He asks, \"<i>Have any merchandise for me " + mf(player, "sir", "dear") + "?</i>\"\n\n");
        CView.text("(You can sell an item here, but Oswald will not let you buy them back, so be sure of your sales.)");
    }
    if (!player.inventory.keyItems.has("Carrot") && TelAdreFlags.NIEVE_STAGE == 3) {
        CView.text("\n\nIn passing, you mention that you're looking for a carrot.\n\nOswald's tophat tips precariously as his ears perk up, and he gladly announces, \"<i>I happen to have come across one recently - something of a rarity in these dark times, you see.  I could let it go for 500 gems, if you're interested.</i>\"");
        if (player.inventory.gems < 500) {
            CView.text("\n\n<b>You can't afford that!</b>");
            return oswaldPawnMenu(player); // eventParser(1065);
        }
        else {

            choices[0] = ["Sell", oswaldPawnMenu];
            choices[1] = ["BuyCarrot", buyCarrotFromOswald];
        }
    }
    else return oswaldPawnMenu(player); // eventParser(1065);
}

function buyCarrotFromOswald(player: Character): NextScreenChoices {
    player.inventory.gems -= 500;

    player.inventory.keyItems.add("Carrot", 0, 0, 0, 0);
    CView.clear();
    CView.text("Gems change hands in a flash, and you're now the proud owner of a bright orange carrot!\n\n(<b>Acquired Key Item: Carrot</b>)");

    choices[0] = ["Next", oswaldPawn];
}

function oswaldPawnMenu(player: Character): NextScreenChoices { // Moved here from Inventory.as
    CView.sprite(SpriteName.TelAdre); // 47;
    CView.text("\n\n<b><u>Oswald's Estimates</u></b>");

    let totalItems: number = 0;
    for (let slot: number = 0; slot < 5; slot++) {
        if (player.itemSlots[slot].quantity > 0 && player.itemSlots[slot].itype.value >= 1) {
            CView.text("\n" + int(player.itemSlots[slot].itype.value / 2) + " gems for " + player.itemSlots[slot].itype.longName + ".");
            choices[slot] = [(player.itemSlots[slot].itype.shortName + " x" + player.itemSlots[slot].quantity), oswaldPawnSell, slot];
            totalItems += player.itemSlots[slot].quantity;
        }
    }
    if (totalItems > 1) choices[7] = ["Sell All", oswaldPawnSellAll];
    switch (TelAdreFlags.KATHERINE_UNLOCKED) {
        case 1:
        case 2: choices[5] = ["Kath's Alley", katherine.visitKatherine]; break;
        case 3: choices[5] = ["Safehouse", katherineEmployment.katherineTrainingWithUrta]; break;
        case 4: choices[5] = ["Kath's Alley", katherineEmployment.postTrainingAlleyDescription]; // Appears until Kath gives you her housekeys
        default:
    }
    choices[9] = ["Back", telAdreMenu];
}

function oswaldPawnSell(player: Character, slot: number): NextScreenChoices { // Moved here from Inventory.as
    CView.sprite(SpriteName.TelAdre); // 47;
    const itemValue: number = int(player.itemSlots[slot].itype.value / 2);
    CView.clear();
    if (itemValue == 0)
        CView.text("You hand over " + player.itemSlots[slot].itype.longName + " to Oswald.  He shrugs and says, “<i>Well ok, it isn't worth anything, but I'll take it.</i>”");
    else CView.text("You hand over " + player.itemSlots[slot].itype.longName + " to Oswald.  He nervously pulls out " + numToCardinalText(itemValue) + " gems and drops them into your waiting hand.");
    player.itemSlots[slot].removeOneItem();
    player.inventory.gems += itemValue;

    return { next: oswaldPawn };
}

function oswaldPawnSellAll(player: Character): NextScreenChoices {
    CView.sprite(SpriteName.TelAdre); // 47;
    let itemValue: number = 0;
    CView.clear();
    for (let slot: number = 0; slot < 5; slot++) {
        if (player.itemSlots[slot].quantity > 0 && player.itemSlots[slot].itype.value >= 1) {
            itemValue += player.itemSlots[slot].quantity * int(player.itemSlots[slot].itype.value / 2);
            player.itemSlots[slot].quantity = 0;
        }
    }
    CView.text("You lay out all the items you're carrying on the counter in front of Oswald.  He examines them all and nods.  Nervously, he pulls out " + numToCardinalText(itemValue) + " gems and drops them into your waiting hand.");
    player.inventory.gems += itemValue;

    return { next: oswaldPawn };
}

function anotherButton(button: number, nam: string, func: ClickFunction, arg: * = -9000): number {
    if (button > 8) return 9;
    choices[button] = [nam, func, arg];
    button++;
    return button;
}
function enterBarTelAdre(player: Character): NextScreenChoices {
    if (isThanksgiving()) pigSlutRoastingGreet();
    else return barTelAdre(player);
}

export function barTelAdre(player: Character): NextScreenChoices {
    // Dominka & Edryn both persist their sprites if you back out of doing anything with them -- I
    // I guess this is good a place as any to catch-all the sprite, because I don't think theres ever a case you get a sprite from just entering the bar?
    CView.sprite(SpriteName.TelAdre); // -1;

    let button: number = 0;
    CView.clear();
    if (TelAdreFlags.LOPPE_DISABLED == 0 && TelAdreFlags.LOPPE_MET == 0 && randInt(10) == 0) {
        loppe.loppeFirstMeeting();
        return;
    }
    CView.text("The interior of The Wet Bitch is far different than the mental picture its name implied.  It looks like a normal tavern, complete with a large central hearth, numerous tables and chairs, and a polished dark wood bar.  The patrons all seem to be dressed and interacting like normal people, that is if normal people were mostly centaurs and dog-morphs of various sub-species.  The atmosphere is warm and friendly, and ");
    if (humanRaceScore(player) <= 3) CView.text("despite your altered appearance, ");
    CView.text("you hardly get any odd stares.  There are a number of rooms towards the back, as well as a stairway leading up to an upper level.");

    scylla.scyllaBarSelectAction(); // Done before anything else so that other NPCs can check scylla.action to see what she's doing
    // Thanks to this function and edryn.edrynHeliaThreesomePossible() the bar menu will always display the same possible options until the game time advances.
    // So it's safe to return to this menu, Helia or Urta can't suddenly disappear or appear just from leaving and re-entering the bar.

    // AMILY!
    if (TelAdreFlags.AMILY_VISITING_URTA == 1) {
        button = anotherButton(button, "Ask4Amily", followerInteractions.askAboutAmily);
    }
    // DOMINIKA
    if (Time.hour > 17 && Time.hour < 20 && TelAdreFlags.UNKNOWN_FLAG_NUMBER_00150 != -1) {
        button = anotherButton(button, "Dominika", dominika.fellatrixBarApproach);
    }
    // EDRYN!
    if (edryn.pregnancy.type != PregnancyType.TAOTH) { // Edryn is unavailable while pregnant with Taoth
        if (edryn.edrynBar()) {
            if (edryn.pregnancy.isPregnant) {
                if (TelAdreFlags.EDRYN_PREGNANT_AND_NOT_TOLD_PC_YET == 0) {
                    TelAdreFlags.EDRYN_PREGNANT_AND_NOT_TOLD_PC_YET = 1;
                    if (TelAdreFlags.EDRYN_NUMBER_OF_KIDS == 0) { // Edryn panic appearance! (First time mom)
                        CView.text("\n\nEdryn smiles when she sees you and beckons you towards her.  Fear and some kind of frantic need are painted across her face, imploring you to come immediately.  Whatever the problem is, it doesn't look like it can wait.");
                        return { next: edryn.findOutEdrynIsPregnant };
                        return;
                    }
                    else { // Edryn re-preggers appearance!
                        CView.text("\n\nEdryn smiles at you and yells, \"<i>Guess what " + player.desc.name + "?  I'm pregnant again!</i>\"  There are some hoots and catcalls but things quickly die down.  You wonder if her scent will be as potent as before?");
                    }
                }
                else { // Mid-pregnancy appearance
                    CView.text("\n\nEdryn is seated at her usual table, and chowing down with wild abandon.  A stack of plates is piled up next to her.  Clearly she has been doing her best to feed her unborn child.  She notices you and waves, blushing heavily.");
                }
            }
            // Edryn just had a kid and hasn't talked about it!
            else if (TelAdreFlags.EDRYN_NEEDS_TO_TALK_ABOUT_KID == 1) {
                CView.text("\n\nEdryn the centaur isn't pregnant anymore!  She waves excitedly at you, beckoning you over to see her.  It looks like she's already given birth to your child!");
            }
            // Appearance changes if has had kids
            else if (TelAdreFlags.EDRYN_NUMBER_OF_KIDS > 0) {
                CView.text("\n\nEdryn is seated at her usual place, picking at a plate of greens and sipping a mug of the local mead.  She looks bored until she sees you.  Her expression brightens immediately, and Edryn fiddles with her hair and changes her posture slightly.  You aren't sure if she means to, but her cleavage is prominently displayed in an enticing manner.");
            }
            else if (player.effects.getByName(EffectType.Edryn).value1 < 3) {
                CView.text("\n\nEdryn, the centauress you met at the gate, is here, sitting down at her table alone and sipping on a glass of wine.  You suppose you could go talk to her a bit.");
            }
            else CView.text("\n\nEdryn the centauress is here, sipping wine at a table by herself.  She looks up and spots you, her eyes lighting up with happiness.  She gives you a wink and asks if you'll join her.");
            button = anotherButton(button, "Edryn", edryn.edrynBarTalk);
        }
    }
    if (TelAdreFlags.KATHERINE_LOCATION == Katherine.KLOC_BAR) {
        if (TelAdreFlags.KATHERINE_UNLOCKED == 4) {
            katherine.barFirstEncounter();
            return;
        }
        if (TelAdreFlags.KATHERINE_URTA_AFFECTION == 31 && urta.urtaAtBar() && !urta.urtaDrunk() && TelAdreFlags.URTA_ANGRY_AT_PC_COUNTDOWN == 0) {
            katherine.barKathUrtaLoveAnnounce();
            return;
        }
        katherine.barDescription();
        button = anotherButton(button, "Katherine", katherine.barApproach);
    }
    // trace("HEL FOLLOWER LEVEL: " + TelAdreFlags.HEL_FOLLOWER_LEVEL + " HEL FUCKBUDDY: " + TelAdreFlags.HEL_FUCKBUDDY + " HARPY QUEEN DEFEATED: " + TelAdreFlags.HEL_HARPY_QUEEN_DEFEATED);
    // trace("REDUCED ENCOUNTER RATE (DISPLINED): " + TelAdreFlags.HEL_REDUCED_ENCOUNTER_RATE);
    // HELIA
    // 	if(player.gender > 0 && Time.hour >= 14 && randInt(2) == 0 && Time.hour < 20 && (TelAdreFlags.HEL_FUCKBUDDY != 0 || helFollower.followerHel()) && !(TelAdreFlags.HEL_FOLLOWER_LEVEL == 1 && TelAdreFlags.HEL_HARPY_QUEEN_DEFEATED== 0)) {
    if (edryn.edrynHeliaThreesomePossible()) {
        edryn.helAppearance();
        button = anotherButton(button, "Helia", edryn.approachHelAtZeBitch);
    }
    // NANCY
    if (auntNancy.auntNancy(false)) {
        auntNancy.auntNancy(true);
        if (TelAdreFlags.UNKNOWN_FLAG_NUMBER_00263 > 0) button = anotherButton(button, "Nancy", auntNancy.interactWithAuntNancy);
        else button = anotherButton(button, "Barkeep", auntNancy.interactWithAuntNancy);
    }
    else CView.text("\n\nIt doesn't look like there's a bartender working at the moment.");

    // NIAMH
    if (Time.hour >= 8 && Time.hour <= 16 && TelAdreFlags.NIAMH_STATUS == 0) {
        niamh.telAdreNiamh();
        if (TelAdreFlags.MET_NIAMH == 0) button = anotherButton(button, "Beer Cat", niamh.approachNiamh);
        else button = anotherButton(button, "Niamh", niamh.approachNiamh);
    }
    // ROGAR #1
    if (TelAdreFlags.ROGAR_PHASE == 3 && TelAdreFlags.ROGAR_DISABLED == 0 && TelAdreFlags.ROGAR_FUCKED_TODAY == 0) {
        button = anotherButton(button, "HoodedFig", swamp.rogar.rogarThirdPhase);
        // Wet Bitch screen text when Ro'gar phase = 3:
        CView.text("\n\nYou notice a cloaked figure at the bar, though you're quite unable to discern anything else as its back is turned to you.");
    }
    // ROGAR #2
    else if (TelAdreFlags.ROGAR_PHASE >= 4 && TelAdreFlags.ROGAR_DISABLED == 0 && TelAdreFlags.ROGAR_FUCKED_TODAY == 0) {
        button = anotherButton(button, "Rogar", swamp.rogar.rogarPhaseFour);
        // Wet Bitch bar text when Ro'gar phase = 4:
        CView.text("\n\nRo'gar is here with his back turned to the door, wearing his usual obscuring cloak.");
    }

    switch (scylla.action) { // Scylla - requires dungeon shut down
        case Scylla.SCYLLA_ACTION_FIRST_TALK:
            CView.text("\n\nThere is one nun sitting in a corner booth who catches your eye.  She sits straight-backed against the dark, wood chair, her thin waist accentuating the supple curve of her breasts. She's dressed in a black robe that looks a few sizes too small for her hips and wears a black and white cloth over her head.");
            button = anotherButton(button, "Nun", scylla.talkToScylla);
            break;
        case Scylla.SCYLLA_ACTION_ROUND_TWO:
            scylla.scyllaRoundII();
            return;
        case Scylla.SCYLLA_ACTION_ROUND_THREE:
            scylla.scyllaRoundThreeCUM();
            return;
        case Scylla.SCYLLA_ACTION_ROUND_FOUR:
            scylla.scyllaRoundIVGo();
            return;
        case Scylla.SCYLLA_ACTION_MEET_CATS:
            CView.text("\n\nIt looks like Scylla is here but getting ready to leave.  You could check and see what the misguided nun is up to.");
            button = anotherButton(button, "Scylla", scylla.Scylla6);
            break;
        case Scylla.SCYLLA_ACTION_ADICTS_ANON:
            CView.text("\n\nYou see Scylla's white and black nun's habit poking above the heads of the other patrons.  The tall woman seems unaware of her effect on those around her, but it's clear by the way people are crowding she's acquired a reputation by now.  You're not sure what she's doing, but you could push your way through to find out.");
            button = anotherButton(button, "Scylla", scylla.scyllaAdictsAnonV);
            break;
        case Scylla.SCYLLA_ACTION_FLYING_SOLO:
            CView.text("\n\nIt looks like Scylla is milling around here this morning, praying as she keeps an eye out for someone to 'help'.");
            button = anotherButton(button, "Scylla", scylla.scyllasFlyingSolo);
            break;
        default:
    }
    // Nun cat stuff!
    if (katherine.needIntroductionFromScylla()) {
        katherine.catMorphIntr();
        button = anotherButton(button, "ScyllaCats", katherine.katherineGreeting);
    }
    // URTA
    if (urta.urtaAtBar()) {
        // Scylla & The Furries Foursome
        if (scylla.action == Scylla.SCYLLA_ACTION_FURRY_FOURSOME) {
            trace("SCYLLA ACTION: " + scylla.action);
            CView.text("\n\nScylla’s spot in the bar is noticeably empty. She’s usually around at this time of day, isn’t she? Urta grabs your attention with a whistle and points to a back room with an accompanying wink. Oh... that makes sense. Surely the nun won’t mind a little help with her feeding...");
            button = anotherButton(button, "Back Room", scylla.openTheDoorToFoursomeWivScyllaAndFurries);
        }
        // Urta X Scylla threesome
        if (scylla.action == Scylla.SCYLLA_ACTION_FUCKING_URTA) {
            if (TelAdreFlags.UNKNOWN_FLAG_NUMBER_00143 == 0)
                CView.text("\n\n<b>Though Urta would normally be here getting sloshed, her usual spot is completely vacant.  You ask around but all you get are shrugs and giggles.  Something isn't quite right here.  You see an empty bottle of one of her favorite brands of whiskey still rolling on her table, so she can't have been gone long.  Maybe she had guard business, or had to head to the back rooms for something?</b>");
            else
                CView.text("\n\nUrta's usual place is vacant, though her table still holds a half-drank mug of something potent and alcoholic.  If it's anything like the last time this happened, she's snuck into a back room with Scylla to relieve some pressure.  It might not hurt to join in...");
            TelAdreFlags.URTA_TIME_SINCE_LAST_CAME = 4;
            button = anotherButton(button, "Back Room", urta.scyllaAndUrtaSittingInATree);
        }
        else if (urta.urtaBarDescript()) {
            if (auntNancy.auntNancy(false) && TelAdreFlags.URTA_INCUBATION_CELEBRATION == 0 && urta.pregnancy.type == PregnancyType.PLAYER) {
                urtaPregs.urtaIsHappyAboutPregnancyAtTheBar();
                return;
            }
            button = anotherButton(button, "Urta", urta.urtaBarApproach);
        }
    }
    // VALA
    if (purifiedFaerieBitchBar()) button = anotherButton(button, "Vala", chooseValaInBar);

    choices[9] = ["Leave", telAdreMenu];
}

/*
function oldreturn barTelAdre(player, player: Character): NextScreenChoices {
    ;
    var edryn2: number = 0;
    var urta2: ClickFunction = undefined;
    var misc1: ClickFunction = undefined;
    var misc1Name: string = "";

    if(TelAdreFlags.LOPPE_DISABLED == 0 && TelAdreFlags.LOPPE_MET == 0 && randInt(10) == 0) {
        loppe.loppeFirstMeeting();
        return;
    }
    CView.text("The interior of The Wet Bitch is far different than the mental picture its name implied.  It looks like a normal tavern, complete with a large central hearth, numerous tables and chairs, and a polished dark wood bar.  The patrons all seem to be dressed and interacting like normal people, that is if normal people were mostly centaurs and dog-morphs of various sub-species.  The atmosphere is warm and friendly, and ");
    if(humanRaceScore(player) <= 3) CView.text("despite your altered appearance, ");
    CView.text("you hardly get any odd stares.  There are a number of rooms towards the back, as well as a stairway leading up to an upper level.");
    //Hours of operation decrease after birth
    if(!urtaQuest.urtaBusy()) {
        if(edryn.edrynBar()) {
            //Edryn panic appearance!
            if(TelAdreFlags.EDRYN_PREGNAT_AND_NOT_TOLD_PC_YET == 0 && TelAdreFlags.EDRYN_PREGNANCY_INCUBATION > 0 && TelAdreFlags.EDRYN_NUMBER_OF_KIDS == 0) {
                CView.text("\n\nEdryn smiles when she sees you and beckons you towards her.  Fear and some kind of frantic need are painted across her face, imploring you to come immediately.  Whatever the problem is, it doesn't look like it can wait.");
                return { next: edryn.findOutEdrynIsPregnant };
                TelAdreFlags.EDRYN_PREGNAT_AND_NOT_TOLD_PC_YET++;
                return;
            }
            //Edryn re-preggers appearance!
            if(TelAdreFlags.EDRYN_PREGNAT_AND_NOT_TOLD_PC_YET == 0 && TelAdreFlags.EDRYN_NUMBER_OF_KIDS > 0) {
                TelAdreFlags.EDRYN_PREGNAT_AND_NOT_TOLD_PC_YET++;
                CView.text("\n\nEdryn smiles at you and yells, \"<i>Guess what " + player.desc.name  + "?  I'm pregnant again!</i>\"  There are some hoots and catcalls but things quickly die down.  You wonder if her scent will be as potent as before?");
            }
            //Edryn just had a kid and hasn't talked about it!
            else if(TelAdreFlags.EDRYN_NEEDS_TO_TALK_ABOUT_KID == 1) {
                CView.text("\n\nEdryn the centaur isn't pregnant anymore!  She waves excitedly at you, beckoning you over to see her.  It looks like she's already given birth to your child!");
            }
            //Mid-pregnancy appearance
            else if(TelAdreFlags.EDRYN_PREGNANCY_INCUBATION > 0) {
                CView.text("\n\nEdryn is seated at her usual table, and chowing down with wild abandon.  A stack of plates is piled up next to her.  Clearly she has been doing her best to feed her unborn child.  She notices you and waves, blushing heavily.");
            }
            //Appearance changes if has had kids
            else if(TelAdreFlags.EDRYN_NUMBER_OF_KIDS > 0) {
                CView.text("\n\nEdryn is seated at her usual place, picking at a plate of greens and sipping a mug of the local mead.  She looks bored until she sees you.  Her expression brightens immediately, and Edryn fiddles with her hair and changes her posture slightly.  You aren't sure if she means to, but her cleavage is prominently displayed in an enticing manner.");
            }
            else if(player.effects.getByName(EffectType.Edryn).value1 < 3) {
                CView.text("\n\nEdryn, the centauress you met at the gate, is here, sitting down at her table alone and sipping on a glass of wine.  You suppose you could go talk to her a bit.");
            }
            else CView.text("\n\nEdryn the centauress is here, sipping wine at a table by herself.  She looks up and spots you, her eyes lighting up with happiness.  She gives you a wink and asks if you'll join her.");
            if(edryn2 == 0) edryn2 = 2257;
        }
    }
    //Nun cat stuff!
    if((Time.hour > 8 || Time.hour < 18) && player.inventory.keyItems.has("Silver Kitty-Bell")) {
        misc1Name = "ScyllaCats";
        misc1 = katherine.katherineGreeting;
        katherine.catMorphIntr();
    }
    //Scylla - requires dungeon shut down
    if(player.body.cocks.length > 0 && player.effects.has(EffectType.DungeonShutDown)) {
        //Scylla repeat
        //big dick!
        if(player.body.cocks.sort(Cock.Longest).get(0).length >= 12) {
            if(TelAdreFlags.NUMBER_OF_TIMES_MET_SCYLLA == 0) {
                CView.text("\n\nThere is one nun sitting in a corner booth who catches your eye.  She sits straight-backed against the dark, wood chair, her thin waist accentuating the supple curve of her breasts. She's dressed in a black robe that looks a few sizes too small for her hips and wears a black and white cloth over her head.");
                misc1 = scylla.talkToScylla;
                misc1Name = "Nun";
            }
            else if(TelAdreFlags.NUMBER_OF_TIMES_MET_SCYLLA == 1 && randInt(5) == 0) {

                scylla.scyllaRoundII();
                return;
            }
            else if(TelAdreFlags.NUMBER_OF_TIMES_MET_SCYLLA == 2 && randInt(5) == 0) {

                scylla.scyllaRoundThreeCUM();
                return;
            }
            //Round 4 goes here
            else if(TelAdreFlags.NUMBER_OF_TIMES_MET_SCYLLA == 3 && randInt(5) == 0) {
                scylla.scyllaRoundIVGo();
                return;
            }
            //Round 6 - catscratch!
            else if(TelAdreFlags.NUMBER_OF_TIMES_MET_SCYLLA == 5 && randInt(5) == 0) {
                CView.text("\n\nIt looks like Scylla is here but getting ready to leave.  You could check and see what the misguided nun is up to.");
                misc1Name = "Scylla";
                misc1 = scylla.Scylla6;
            }
            //Round 5 - repeatable!
            else if(TelAdreFlags.NUMBER_OF_TIMES_MET_SCYLLA >= 4 && (Time.hour == 18 || Time.hour == 19)) {
                CView.text("\n\nYou see Scylla's white and black nun's habit poking above the heads of the other patrons. The tall woman seems unaware of her effect on those around her, but it's clear by the way people are crowding she's acquired a reputation by now. You're not sure what she's doing, but you could push your way through to find out.");
                misc1Name = "Scylla";
                misc1 = scylla.scyllaAdictsAnonV;
            }
            //Round 2.5 Repeatable
            else if(TelAdreFlags.NUMBER_OF_TIMES_MET_SCYLLA >= 2 && TelAdreFlags.FED_SCYLLA_TODAY == 0 && Time.hour >= 7 && Time.hour <= 11) {
                CView.text("\n\nIt looks like Scylla is milling around here this morning, praying as she keeps an eye out for someone to 'help'.");
                misc1Name = "Scylla";
                misc1 = scylla.scyllasFlyingSolo;
            }
        }
    }
    if(Time.hour >= 8 && Time.hour <= 16 && (misc1 == undefined || (randInt(2) == 0 && misc1 != scylla.Scylla6)) && TelAdreFlags.NIAMH_STATUS == 0) {
        niamh.telAdreNiamh();
        if(TelAdreFlags.MET_NIAMH == 0) misc1Name = "Beer Cat";
        else misc1Name = "Niamh";
        misc1 = niamh.approachNiamh;
    }
    var hel: ClickFunction = undefined;
    if(player.gender > 0 && Time.hour >= 14 && randInt(2) == 0 && Time.hour < 20 && TelAdreFlags.HEL_FUCKBUDDY == 1 && (!helFollower.followerHel() || TelAdreFlags.HEL_HARPY_QUEEN_DEFEATED == 1)) {
        edryn.helAppearance();
        hel = edryn.approachHelAtZeBitch;
    }
    //Everyone's favorite Vala!
    var vala: number = 0;
    //Backroom urta
    var backroom:* = 0;
    var backroomT: string = "Backrooms";
    if(purifiedFaerieBitchBar()) vala = 2621;
    if(!urtaQuest.urtaBusy() && TelAdreFlags.AMILY_VISITING_URTA != 1 && Time.hour < 15) {
        //Scylla + Urta sitting in a tree
        // SOME COMFORT     FUCKED URTA      NOT PISSED      DRUNK TIME    SCYLLA TO LV4    RANDOM CHANCE  HAS THIS HAPPENED BEFORE? SCYLLA REQS ->
        if(TelAdreFlags.URTA_TIME_SINCE_LAST_CAME == 0 && TelAdreFlags.URTA_COMFORTABLE_WITH_OWN_BODY > 2 && TelAdreFlags.TIMES_FUCKED_URTA > 0 && TelAdreFlags.URTA_ANGRY_AT_PC_COUNTDOWN < 1 && (urta.urtaDrunk() || TelAdreFlags.UNKNOWN_FLAG_NUMBER_00143 > 0) && TelAdreFlags.NUMBER_OF_TIMES_MET_SCYLLA >= 3 && randInt(3) == 0 && (TelAdreFlags.UNKNOWN_FLAG_NUMBER_00143 == 0 || (TelAdreFlags.UNKNOWN_FLAG_NUMBER_00147 == 0 && TelAdreFlags.UNKNOWN_FLAG_NUMBER_00145 > 0)) && ((TelAdreFlags.UNKNOWN_FLAG_NUMBER_00143 > 0 && !urta.urtaDrunk()) || player.body.balls.count > 0) && player.body.cocks.length > 0 && misc1Name != "Scylla") {
            if(TelAdreFlags.UNKNOWN_FLAG_NUMBER_00143 > 0) {
                CView.text("\n\nUrta's usual place is vacant, though her table still holds a half-drank glass of water.  If it's anything like the last time this happened, she's snuck into a back room with Scylla to relieve some pressure.  It might not hurt to join in...");
            }
            else {
                if(TelAdreFlags.UNKNOWN_FLAG_NUMBER_00143 == 0) {
                    CView.text("\n\n<b>Though Urta would normally be here getting sloshed, her usual spot is completely vacant.  You ask around but all you get are shrugs and giggles.  Something isn't quite right here.  You see an empty bottle of one of her favorite brands of whiskey still rolling on her table, so she can't have been gone long.  Maybe she had guard business, or had to head to the back rooms for something?</b>");
                }
                else {
                    CView.text("\n\nUrta's usual place is vacant, though her table still holds a half-drank mug of something potent and alcoholic.  If it's anything like the last time this happened, she's snuck into a back room with Scylla to relieve some pressure.  It might not hurt to join in...");
                }
            }
            TelAdreFlags.URTA_TIME_SINCE_LAST_CAME = 4;
            if(misc1Name == "Scylla") misc1 = undefined;
            urta2 = undefined;
            backroom = urta.scyllaAndUrtaSittingInATree;
            TelAdreFlags.URTA_TIME_SINCE_LAST_CAME = 4;
        }
        else if(urta.urtaBarDescript()) {
            if(TelAdreFlags.URTA_INCUBATION_CELEBRATION == 0 && TelAdreFlags.URTA_INCUBATION > 0) {
                urtaPregs.urtaIsHappyAboutPregnancyAtTheBar();
                return;
            }
            urta2 = urta.urtaBarApproach;
        }
        else urta2 = undefined;
    }
    //Ask about Amily!
    if(TelAdreFlags.AMILY_VISITING_URTA == 1) {
        backroom = 3187;
        backroomT = "Ask4Amily";
    }
    var dominika2: number = 0;
    if(Time.hour > 17 && Time.hour < 20 && TelAdreFlags.UNKNOWN_FLAG_NUMBER_00150 != -1) {
        dominika2 = 2739;
        dominika.fellatrixBarAppearance();
    }

    var nancy: ClickFunction = undefined;
    var nancyText: string = "Barkeep";
    if(auntNancy.auntNancy(false)) {
        auntNancy.auntNancy(true);
        if(TelAdreFlags.UNKNOWN_FLAG_NUMBER_00263 > 0) nancyText = "Nancy";
        nancy = auntNancy.interactWithAuntNancy;
    }
    else CView.text("\n\nIt doesn't look like there's a bartender working at the moment.");

    var rogarB: ClickFunction = undefined;
    var rogarT: string = "HoodedFig";
    if(TelAdreFlags.ROGAR_PHASE == 3 && TelAdreFlags.ROGAR_DISABLED == 0 && TelAdreFlags.ROGAR_FUCKED_TODAY == 0) {
        rogarB = swamp.rogar.rogarThirdPhase;
        //Wet Bitch screen text when Ro'gar phase = 3:
        CView.text("\n\nYou notice a cloaked figure at the bar, though you're quite unable to discern anything else as its back is turned to you.");
    }
    else if(TelAdreFlags.ROGAR_PHASE >= 4 && TelAdreFlags.ROGAR_DISABLED == 0 && TelAdreFlags.ROGAR_FUCKED_TODAY == 0) {
        rogarB = swamp.rogar.rogarPhaseFour;
        rogarT = "Rogar";
        //Wet Bitch bar text when Ro'gar phase = 4:
        CView.text("\n\nRo'gar is here with his back turned to the door, wearing his usual obscuring cloak.");
    }
    var kath: number = 0;
    return { choices: [ ["Dominika", dominika2], ["Edryn", edryn2], ["Hel", hel], [misc1Name, misc1], [nancyText, nancy], [rogarT, rogarB], ["Urta", urta2], ["Vala", vala], ["Backroom", backroom], ["Leave", telAdreMenu] ] };
}
*/

export function tailorShoppe(player: Character): NextScreenChoices {

    CView.sprite(SpriteName.TelAdre); // 61;
    CView.text("The inside of the tailor's shop is far cleaner than anything else you've seen in the city.  The walls are painted muted gray, and the floor is carpeted with a sprawling, royal blue rug.  After glancing around, you realize WHY the walls and floor are so muted – the quiet backdrop makes the merchandise look even more amazing.  There are racks and racks of clothing, but much of it is plain comfortable clothing, and not worth spending much time investigating.  A high-pitched voice pipes up, \"<i>Can I help you?</i>\"\n\n");
    if (!player.effects.has(EffectType.Victoria)) {
        CView.text("You turn around, ");
        if (player.body.tallness > 60) CView.text("looking for the source, eventually looking down and at a short but busty Corgi dog-girl.  ");
        else CView.text("coming face to face with a busty Corgi dog-girl.  ");
        CView.text("She's clearly the tailor judging by her stylish, low-cut clothing and poofy hat.  A monocle perches on her nose, giving her a rather distinguished appearance.  The fashionable wench arches her back, showing off what she's got as she introduces herself, \"<i>Ello love, welcome to my shop.  My name's Victoria, though if you like, you can call me Vicky.  You'll find my clothing to be a cut above the rubbish sold elsewhere.</i>\"");
        // Flag as meeting her
        player.effects.create(EffectType.Victoria, 0, 0, 0, 0);
    }
    else {
        CView.text("You turn around to look ");
        if (player.body.tallness > 60) CView.text("down ");
        CView.text("at Victoria the Corgi Tailor.  As usual, she's dressed in a stylish low-cut dress and sporting her feathery hat.");
    }
    CView.text("\n\n(What do you want to buy?)");
    return { choices: [[SuitClothes.shortName, choiceWrap(buyClothes, SuitClothes)], [ArmorName.RubberFetishClothes.shortName, choiceWrap(buyClothes, ArmorName.RubberFetishClothes)], [GreenClothes.shortName, choiceWrap(buyClothes, GreenClothes)], [ArmorName.TubeTop.shortName, choiceWrap(buyClothes, ArmorName.TubeTop)], [ArmorName.Overalls.shortName, choiceWrap(buyClothes, ArmorName.Overalls)], [LongDress.shortName, choiceWrap(buyClothes, LongDress)], [ArmorName.SemiTransBodysuit.shortName, choiceWrap(buyClothes, ArmorName.SemiTransBodysuit)], [ArmorName.ModestRobes.shortName, choiceWrap(buyClothes, ArmorName.ModestRobes)], [ArmorName.TightLeatherPants.shortName, choiceWrap(buyClothes, ArmorName.TightLeatherPants)], ["Leave", telAdreMenu]] };
}

function buyClothes(player: Character, itype: ItemType): NextScreenChoices {

    CView.sprite(SpriteName.TelAdre); // 61;
    CView.text("Victoria nods and pulls a measuring tape off her shoulder.  She moves around you with practiced ease, taking measurements from every conceivable angle.  Thanks to her small stature, it's quite easy for her to take your inseam measurement, though Vicky manages to ");
    if (player.body.cocks.sort(Cock.Largest).get(0).area > 30 || player.body.cocks.length > 1) CView.text("fondle your bulging package");
    else if (player.body.vaginas.length > 0) CView.text("rub against your outer lips");
    else CView.text("slip a finger along your crotch");
    CView.text(" more than a few times.  You could swear you catch her licking her lips when she stands up, but she quickly turns away, saying, \"<i>I've got one in the back that should fit perfectly!  Be right with you!</i>\"\n\n");
    CView.text("She disappears in the back for a few moments, then returns with " + itype.longName + " that looks as if it were tailor-made for you.\n\n");
    CView.text("\"<i>" + itype.value + " gems and it can be yours,</i>\" she says.  ");
    if (player.inventory.gems < itype.value) {
        CView.text("You count out your gems and realize it's beyond your price range.");
        // Goto shop main menu
        return { next: tailorShoppe };
        return;
    }
    // Go to debit/update function or back to shop window
    if (player.body.cocks.length > 0 && player.stats.lust >= 33)
        return { choices: [["Yes", curry(debitClothes, itype)], ["No", tailorShoppe], ["", undefined], ["", undefined], ["Flirt", curry(flirtWithVictoria, itype)]] };
    else return { yes: curry(debitClothes, itype), no: tailorShoppe };
}

function debitClothes(player: Character, itype: ItemType): NextScreenChoices {
    CView.sprite(SpriteName.TelAdre); // 61;
    player.inventory.gems -= itype.value;

    return player.inventory.items.createAdd(player, itype, tailorShoppe);
}

export function armorShop(player: Character): NextScreenChoices {

    CView.sprite(SpriteName.TelAdre); // 64;
    CView.clear();
    CView.text("The interior of the armory is blisteringly hot, filled with intense heat from the massive forge dominating the far side of the shop.  The bellows are blowing hard as a tall german-shepherd woman works the forge.  Incredibly, she's wearing nothing aside from a ragged leather apron.  It bulges from the front, barely containing her obscene proportions as it protects them from the heat of her forge.  She pulls a piece of metal from the forge and strikes it a few times with a hammer bigger than your head, then tosses it in a bucket filled with water, steam boiling out of it from the hot metal.  At last, the sweating forgemistress notices you and turns around, her breasts jiggling wildly.\n\n");
    // CView.text("\"<i>Vat can Yvonne make for you?  Ze platemail?  Or someting a bit lighter?</i>\" she asks you.");
    CView.text("\"<i>What can I make for you?  Platemail?  Or something that breathes a little easier?</i>\" Yvonne asks, fanning herself.");

    let egg: ClickFunction;
    if (player.inventory.keyItems.has("Dragon Eggshell")) {
        CView.text("\n\nThough the pieces on display have their arguable attractions, none of them really interest you.  Yvonne taps her foot impatiently.  \"<i>Well, I could make you something to order... if you have any decent materials, cutie.  200 gems.</i>\"");
        if (player.inventory.gems < 200) {
            CView.text("\n\nYou can't afford that!");
        }
        else egg = emberScene.getSomeStuff;
    }
    return { choices: [[ChainmailBikini.shortName, choiceWrap(armorBuy, ChainmailBikini)], [FullChainmail.shortName, choiceWrap(armorBuy, FullChainmail)], [FullPlatemail.shortName, choiceWrap(armorBuy, FullPlatemail)], [ArmorName.IndecentSteelArmor.shortName, choiceWrap(armorBuy, ArmorName.IndecentSteelArmor)], [ArmorName.LeatherRobes.shortName, choiceWrap(armorBuy, ArmorName.LeatherRobes)], [ArmorName.Scalemail.shortName, choiceWrap(armorBuy, ArmorName.Scalemail)], ["", undefined], ["Eggshell", egg], ["Flirt", yvonneFlirt], ["Leave", telAdreMenu]] };
}

export function weaponShop(player: Character): NextScreenChoices {

    CView.sprite(SpriteName.TelAdre); // 80;
    CView.text("The high pitched ring of a steel hammer slamming into hot metal assaults your ears as you walk up to the stand.  Sparks are flying with every blow the stand's owner strikes on his current work.  The metal is glowing red hot, and the hammer falls with the relentless, practiced precision of an experienced blacksmith's guiding hand.  Thick gray and white fur ruffles as the blacksmith stands up, revealing the details of his form to you.  He's one of the dog-people that inhabits this city, though his fur and ears remind you of a dog one of your friends had growing up called a husky.  The blacksmith is anything but husky.  He's fairly short, but lean and whip-cord tough.  His right arm is far more thickly muscled than his left thanks to his trade, and he walks with a self-assured gait that can only come with age and experience.\n\n");

    CView.text("His piercing blue eyes meet yours as he notices you, and he barks, \"<i>Buy something or fuck off.</i>\"\n\nWhat do you buy?");

    return { choices: [[ConsumableName.WingStick.shortName, choiceWrap(weaponBuy, ConsumableName.WingStick)], [WeaponName.LargeClaymore.shortName, choiceWrap(weaponBuy, WeaponName.LargeClaymore)], [WeaponName.HugeWarhammer.shortName, choiceWrap(weaponBuy, WeaponName.HugeWarhammer)], [weapons.KATANA.shortName, choiceWrap(weaponBuy, weapons.KATANA)], [weapons.SPEAR.shortName, choiceWrap(weaponBuy, weapons.SPEAR)], [weapons.WHIP.shortName, choiceWrap(weaponBuy, weapons.WHIP)], [WeaponName.WizardsStaff.shortName, choiceWrap(weaponBuy, WeaponName.WizardsStaff)], [WeaponName.SpikedGauntlet.shortName, choiceWrap(weaponBuy, WeaponName.SpikedGauntlet)], ["", undefined], ["Leave", telAdreMenu]] };
}
function weaponBuy(player: Character, itype: ItemType): NextScreenChoices {

    CView.sprite(SpriteName.TelAdre); // 80;
    CView.text("The gruff metal-working husky gives you a slight nod and slams the weapon down on the edge of his stand.  He grunts, \"<i>That'll be " + itype.value + " gems.</i>\"");
    if (player.inventory.gems < itype.value) {
        CView.text("\n\nYou count out your gems and realize it's beyond your price range.");
        // Goto shop main menu
        return { next: weaponShop };
        return;
    }
    else CView.text("\n\nDo you buy it?\n\n");
    // Go to debit/update function or back to shop window
    return { yes: curry(debitWeapon, itype), no: weaponShop };
}
function debitWeapon(player: Character, itype: ItemType): NextScreenChoices {
    CView.sprite(SpriteName.TelAdre); // 80;
    player.inventory.gems -= itype.value;

    return player.inventory.items.createAdd(player, itype, weaponShop);
}
function armorBuy(player: Character, itype: ItemType): NextScreenChoices {
    CView.sprite(SpriteName.TelAdre); // 64;

    CView.text("Yvonne gives you a serious look, then nods.  She pulls the armor off a rack and makes a few adjustments, banging away with her massive hammer to ensure a perfect fit.  The entire time, she's oblivious to the movements of her massive breasts, accidentally exposing her impressive nipples multiple times.\n\n");
    CView.text("She finishes and turns to you, smiling broadly, \"<i>Now, that will be " + itype.value + " gems, unless you want to change your mind?</i>\"");
    if (player.inventory.gems < itype.value) {
        CView.text("\n\nYou count out your gems and realize it's beyond your price range.");
        // Goto shop main menu
        return { next: armorShop };
        return;
    }
    else CView.text("\n\nDo you buy it?");
    // Go to debit/update function or back to shop window
    return { yes: curry(debitArmor, itype), no: armorShop };
}

function debitArmor(player: Character, itype: ItemType): NextScreenChoices {
    CView.sprite(SpriteName.TelAdre); // 64;

    player.inventory.gems -= itype.value;

    return player.inventory.items.createAdd(player, itype, armorShop);
}

function urtaIsABadass(player: Character): NextScreenChoices {
    TelAdreFlags.PC_SEEN_URTA_BADASS_FIGHT = 1;

    CView.text("There's a commotion in the streets of Tel'Adre.  A dense crowd of onlookers has formed around the center of the street, massed together so tightly that you're unable to see much, aside from the backs the other onlookers' heads.  The sound of blows impacting on flesh can be heard over the crowd's murmuring, alerting you of the fight at the gathering's core.");
    return { choices: [["Investigate", watchUrtaBeABadass], ["Who cares?", telAdreMenu], ["", undefined], ["", undefined], ["", undefined]] };
}

// [Invetigate]
function watchUrtaBeABadass(player: Character): NextScreenChoices {

    urta.urtaSprite();
    CView.text("You shoulder past the bulky centaurs, ignore the rough fur of the nearby wolves and hounds as it brushes against you, and press your way through to the center of the crowd.  Eventually the throng parts, revealing the embattled combatants.  A snarling wolf, nearly eight feet tall, towers over Urta.  The comparatively diminutive fox-woman is girded in light leather armor and dripping with sweat.  The larger wolf-man is staggering about, and his dark brown fur is matted with blood.\n\n");

    CView.text("The bigger canid charges, snarling, with his claws extended.  Urta sidesteps and pivots, her momentum carrying her foot around in a vicious kick.  Her foot hits the side of the beast's knee hard enough to buckle it, and the wolf goes down on his knees with an anguished cry.  Urta slips under his arm and twists, turning his slump into a fall.  A cloud of dust rises from the heavy thud of the beast's body as it slams into the cobblestone street.\n\n");

    CView.text("Now that it's immobile, you get can get a better look at the defeated combatant, and you're ");
    if (player.effects.has(EffectType.Infested)) CView.text("aroused");
    else if (player.stats.cor < 50) CView.text("horrified");
    else CView.text("confused");
    CView.text(" by what you see.  A pair of thick, demonic horns curve back over the beast's head, piercing through the bottoms of its wolf-like ears.  Its entire body is covered in rippling muscle, leaving you in no doubt of its strength.  Even with a broken knee, the wolf-man is clearly aroused: protruding from a bloated sheath, his massive dog-dick is fully erect, solid black in color, with an engorged knot.  Small white worms crawl over the surface of his penis, wriggling out of the tip and crawling down the length, leaving trails of slime behind them.\n\n");

    CView.text("Urta kneels down onto the corrupted wolf's throat, cutting off its air as it foams and struggles under her.  With grim determination, she holds the weakening, demonically-tainted wolf underneath her, leaning all of her body-weight into her knee to keep it down.  It struggles for what seems like ages, but eventually the tainted wolf's eyes roll closed.  Urta nods and rises, watching closely as the beast's breathing resumes.\n\n");

    CView.text("She barks, \"<i>Get this one outside the walls before he wakes.  I won't have this corrupted filth in our city, and make sure you get the wards updated.  If he manages to find his way back, you sorry excuses for guards will be going out with him.</i>\"\n\n");
    CView.text("A few dog-morphs in similar armor to Urta approach and lash ropes around the wolf's legs.  They hand a line to a centaur, and together the party begins dragging the unconscious body away.  With the action over, the crowd begins dispersing.  More than a few males nod to Urta respectfully.  She keeps her expression neutral and excuses herself to resume her rounds, wiping her hands off on her armor-studded skirt as she leaves.");
    return { next: telAdreMenu };
}

export function gymDesc(player: Character): NextScreenChoices {
    // PREGGO ALERT!
    if (TelAdreFlags.PC_IS_A_GOOD_COTTON_DAD + TelAdreFlags.PC_IS_A_DEADBEAT_COTTON_DAD == 0 && cotton.pregnancy.isPregnant) {
        cotton.cottonPregnantAlert();
        return;
    }

    CView.text("Even though Ingnam, your hometown, was a large, prosperous village, you never saw a gym before coming to Tel'Adre.  The structure itself has numerous architectural differences from the surrounding buildings: short, waist-high walls, an arched ceiling supported by simple columns, and a sand-covered floor.  Perhaps the only 'normal' rooms inside are the changing stands and bathrooms, which ");
    if (player.stats.cor < 35) CView.text("thankfully ");
    else if (TelAdreFlags.PC_FETISH > 0 || player.stats.cor > 80) CView.text("unfortunately ");
    CView.text("have full sized walls to protect their users' privacy.  A breeze blows by, revealing that the open-air design provides great ventilation.  You note a wall of weights of different sizes and shapes, perfect for building muscle and bulking up.  There are also jogging tracks and even a full-sized, grass-covered track out back for centaurs to run on.  Though some of the equipment seems a bit esoteric in nature, you're sure you can make use of most of this stuff.\n\n");

    CView.text("Though the gym sees heavy use by the city guard and various citizens, it's not too busy at present.");
    // (Add possible character descripts here)
    // (An extraordinarily well-muscled centaur male is by the weights, lifting some huge dumbbells and sweating like crazy.  In true centaur fashion, he's not wearing any clothes, but then again, male centaurs don't have much that regular clothes would hide.)
    // (There's a lizan girl jogging laps on one of the tracks.  She's quite thin, but her muscles have a lean definition to them.  She's wearing a one-piece, spandex leotard that hugs her tight ass and pert, b-cup breasts nicely.)
    CView.text("  There's a centauress in a tank-top just inside the doorway with huge, rounded melons and perky nipples, but she merely coughs to get you to look up and says, \"<i>");
    if (TelAdreFlags.LIFETIME_GYM_MEMBER == 0) CView.text("10 gems an hour to use the facilities here, or 500 for a life-time membership.</i>\"  She has her hands on her hips, and it looks you'll have to pay ten gems to actually get to use any of this stuff.");
    else CView.text("Oh, welcome back " + player.desc.name + ".  Have a nice workout!</i>\"");

    if (player.inventory.gems < 10 && TelAdreFlags.LIFETIME_GYM_MEMBER == 0) {
        CView.text("\n\n<b>You reach into your pockets for the fee and come up empty.  It looks like you don't have enough money to use the equipment or meet anyone.  Damn!</b>");
        // (back to tel'adre streets)
        return { next: telAdreMenu };
        return;
    }
    lottie.lottieAppearance();
    if (TelAdreFlags.LOPPE_MET > 0 && TelAdreFlags.LOPPE_DISABLED == 0) {
        CView.text("\n\nYou spot Loppe the laquine wandering around, towel slung over her shoulder.  When she sees you, she smiles and waves to you and you wave back.");
    }
    if (Time.hour > 9 && Time.hour < 14) heckel.heckelAppearance();
    return gymMenu(player);
}

function gymMenu(player: Character): NextScreenChoices {

    let membership: ClickFunction;
    let cotton2: ClickFunction;
    let cottonB: string = "Horsegirl";
    let hyena: ClickFunction;
    let hyenaB: string = "Hyena";
    let ifris2: ClickFunction;
    let ifrisB: string = "Girl";
    const lottie2: ClickFunction = lottie.lottieAppearance(false);
    let lottieB: string = "Pig-Lady";
    let loppe2: ClickFunction;
    if (TelAdreFlags.UNKNOWN_FLAG_NUMBER_00281 > 0)
        lottieB = "Lottie";
    if (ifris.ifrisIntro())
        ifris2 = ifris.approachIfris;
    if (TelAdreFlags.MET_IFRIS > 0)
        ifrisB = "Ifris";
    if (Time.hour > 9 && Time.hour <= 15) {
        hyena = heckel.greetHeckel;
        if (TelAdreFlags.MET_HECKEL > 0)
            hyenaB = "Heckel";
    }
    if (TelAdreFlags.LIFETIME_GYM_MEMBER == 0 && player.inventory.gems >= 500)
        membership = buyGymLifeTimeMembership;
    if (TelAdreFlags.PC_IS_A_DEADBEAT_COTTON_DAD == 0) {
        if (cotton.cottonsIntro())
            cotton2 = cotton.cottonGreeting;
    }
    if (TelAdreFlags.COTTON_MET_FUCKED > 0)
        cottonB = "Cotton";
    if (TelAdreFlags.LOPPE_MET > 0 && TelAdreFlags.LOPPE_DISABLED == 0)
        loppe2 = loppe.loppeGenericMeetings;

    return { choices: [["ChangeRoom", jasun.changingRoom], [cottonB, cotton2], [hyenaB, hyena], [ifrisB, ifris2], ["Jog", goJogging], ["LiftWeights", weightLifting], ["Life Member", membership], [lottieB, lottie2], ["Loppe", loppe2], ["Leave", telAdreMenu]] };
}

function buyGymLifeTimeMembership(player: Character): NextScreenChoices {

    // [Buy LifeTime Membership]
    CView.text("You fish into your pouches and pull out 500 gems, dumping them into the centaur's hands.  Her eyes widen as she turns and trots towards a counter in the back.  She leans over as she counts, giving you a generous view down her low-cut top at the cleavage she barely bothers to conceal.");
    if (player.body.cocks.length > 0) {
        CView.text("  It brings a flush to your face that has nothing to do with exercise.  Maybe you'll be able to con her into some alone time later?");
        player.stats.lust += (10 + player.stats.lib / 10);

    }
    TelAdreFlags.LIFETIME_GYM_MEMBER = 1;
    player.inventory.gems -= 500;

    // [Bring up gym menu]
    return gymMenu(player);
}

function weightLifting(player: Character): NextScreenChoices {

    // Too tired?  Fuck off.
    if (player.stats.fatigue > 75) {
        CView.text("<b>There's no way you could exercise right now - you're exhausted!</b>  ");
        if (TelAdreFlags.LIFETIME_GYM_MEMBER == 0) CView.text("It'd be better to save your money and come back after you've rested.");
        return { next: telAdreMenu };
        return;
    }
    // Deduct gems if not a full member.
    if (TelAdreFlags.LIFETIME_GYM_MEMBER == 0) {
        player.inventory.gems -= 10;

    }
    // [Lift Weights] +25 fatigue!
    player.stats.fatigue += 25;
    // TEXTS!
    CView.text("You walk up to the weights and begin your workout.  ");
    // (< 25 str)
    if (player.stats.str < 25) CView.text("You have to start out on the smaller weights to the left side of the rack due to your strength, but even so, you manage to work up a good burn and a modest sweat.");
    // (< 40 str)
    else if (player.stats.str < 40) CView.text("You heft a few of the weights and select some of the ones just to the left of the middle.  It doesn't take you long to work up a sweat, but you push on through a variety of exercises that leave your body feeling sore and exhausted.");
    // (< 60 str)
    else if (player.stats.str < 60) CView.text("You smile when you grip a few of the heavier weights on the rack and start to do some lifts.  With a start, you realize you're probably stronger now than Ingnam's master blacksmith, Ben.  Wow!  This realization fuels you to push yourself even harder, and you spend nearly an hour doing various strength-building exercises with the weights.");
    // (<80 str)
    else if (player.stats.str < 80) CView.text("You confidently grab the heaviest dumbbells in the place and heft them.  It doesn't take long for you to work up a lather of sweat and feel the burn thrumming through your slowly tiring form.  The workout takes about an hour, but you feel you made some good progress today.");
    // (<90)
    else if (player.stats.str < 90) CView.text("You grab the heaviest weights they have and launch into an exercise routine that leaves you panting from exertion.  Setting the weights aside, you flex and marvel at yourself – you could probably arm wrestle a minotaur or two and come out victorious!");
    // (else)
    else CView.text("This place barely has anything left to challenge you, but you take the heaviest weights you can get your mitts on and get to it.  By the time an hour has passed, you've worked up a good sweat, but without heavier weights you probably won't get any stronger.");
    // Stat changes HERE!
    if (player.stats.str < 90) player.stats.str += .5;

    if (player.stats.tou < 40) player.stats.tou += .3;

    // Body changes here
    // Muscleness boost!
    CView.text(modTone(player, 85, 5 + randInt(5)));
    CView.text("\n\nDo you want to hit the showers before you head back to camp?");
    if (TelAdreFlags.BROOKE_MET == 1) {

        choices[0] = ["\"Showers\"", sexMachine.exploreShowers];
        choices[1] = ["Showers", brooke.repeatChooseShower];
        choices[4] = ["Leave", passTime(1)];
    }
    else return { yes: sexMachine.exploreShowers, no: passTime(1) };
}

function goJogging(player: Character): NextScreenChoices {

    // Too tired?  Fuck off.
    if (player.stats.fatigue > 70) {
        CView.text("<b>There's no way you could exercise right now - you're exhausted!</b>  ");
        if (TelAdreFlags.LIFETIME_GYM_MEMBER == 0) CView.text("It'd be better to save your money and come back after you've rested.");
        return { next: telAdreMenu };
        return;
    }
    // Deduct gems if not a full member.
    if (TelAdreFlags.LIFETIME_GYM_MEMBER == 0) {
        player.inventory.gems -= 10;

    }
    // [Jogging] +30 fatigue!
    player.stats.fatigue += 30;
    // Text!
    CView.text("You hit the jogging track, ");
    // (<25 tou)
    if (player.stats.tou < 25) CView.text("but you get so winded you have to stop after a few minutes.  Determined to improve, you force yourself to stay at a fast walk until you can run again.");
    // (<40 tou)
    else if (player.stats.tou < 40) CView.text("but your performance isn't that great.  You nearly stop jogging a few times but manage to push through until you're completely exhausted.");
    // (<60 tou)
    else if (player.stats.tou < 60) CView.text("and you do quite well.  You jog around for nearly an hour, working up a healthy lather of sweat.  Even your " + describeLegs(player) + " tingle and burn with exhaustion.");
    // (<80 tou)
    else if (player.stats.tou < 80) CView.text("and it doesn't faze you in the slightest.  You run lap after lap at a decent clip, working yourself until you're soaked with sweat and fairly tired.");
    // (<90 tou)
    else if (player.stats.tou < 90) CView.text("and you have a terrific time.  You can keep yourself just below your sprinting speed for the entire time, though you work up a huge amount of sweat in the process.");
    // else)
    else CView.text("and it barely challenges you.  You run at a sprint half the time and still don't feel like you're improving in the slightest.  Still, you do manage to burn a lot of calories.");
    // Stat changes HERE!
    if (player.stats.spe < 40) player.stats.spe += .3;

    if (player.stats.tou < 90) player.stats.tou += .5;

    // If butt is over 15 guaranteed reduction
    if (player.body.butt.rating >= 15) {
        CView.text("\n\nAll that running must have done some good, because your " + describeButt(player) + " feels a little less bouncy.");
        player.body.butt.rating--;
    }
    else {
        if (player.body.butt.rating >= 10 && randInt(3) == 0) {
            CView.text("\n\nThe jogging really helped trim up your " + describeButt(player) + ".");
            player.body.butt.rating--;
        }
        else if (player.body.butt.rating >= 5 && randInt(3) == 0) {
            CView.text("\n\nYour " + describeButt(player) + " seems to have gotten a little bit more compact from the work out.");
            player.body.butt.rating--;
        }
        else if (player.body.butt.rating > 1 && randInt(4) == 0) {
            CView.text("\n\nYour " + describeButt(player) + " seems to have gotten a little bit more compact from the work out.");
            player.body.butt.rating--;
        }
    }// If hips is over 15 guaranteed reduction
    if (player.body.hips.rating >= 15) {
        CView.text("\n\nIt feels like your " + describeHips(player) + " have shed some pounds and narrowed.");
        player.body.hips.rating--;
    }
    else {
        if (player.body.hips.rating >= 10 && randInt(3) == 0) {
            CView.text("\n\nIt feels like your " + describeHips(player) + " have shed some pounds and narrowed.");
            player.body.hips.rating--;
        }
        else if (player.body.hips.rating >= 5 && randInt(3) == 0) {
            CView.text("\n\nIt feels like your " + describeHips(player) + " have shed some pounds and narrowed.");
            player.body.hips.rating--;
        }
        else if (player.body.hips.rating > 1 && randInt(4) == 0) {
            CView.text("\n\nIt feels like your " + describeHips(player) + " have shed some pounds and narrowed.");
            player.body.hips.rating--;
        }
    }

    // Thickness decrease!
    CView.text(modThickness(player, 1, 5 + randInt(2)));
    // Muscleness boost!
    CView.text(modTone(player, 100, 2 + randInt(4)));
    CView.text("\n\nDo you want to hit the showers before you head back to camp?");
    if (TelAdreFlags.BROOKE_MET == 1) {

        choices[0] = ["\"Showers\"", sexMachine.exploreShowers];
        choices[1] = ["Showers", brooke.repeatChooseShower];
        choices[4] = ["Leave", passTime(1)];
    }
    else return { yes: sexMachine.exploreShowers, no: passTime(1) };
}

function yaraSex(player: Character, girl: boolean = true): NextScreenChoices {
    CView.sprite(SpriteName.TelAdre); // 63;

    CView.text("Yara makes you comfortable and has you look away while she uses her piercing tools.  It hurts, but she's skilled. Before you know it, your piercing is done!  You move to rise, retaining a bit of modesty");
    if (TelAdreFlags.PC_FETISH > 0) CView.text(" despite the guilty thrill");
    CView.text(".  \"<i>Hold it,</i>\" Yara commands softly, pressing her hand against your " + describeChest(player) + " and pushing you back in your chair.  \"<i>Do you think I'll let you get away without some... field testing?</i>\"\n\n");

    CView.text("She seems intent on getting some loving - would you like to turn her down, or will you let nature run its course?");
    // [not at all] [yeah baby]
    if (girl)
        return { choices: [["Turn down", piercingStudio], ["Oh yeah!", choiceWrap(letsDoYaraSex, true)], ["", undefined], ["", undefined], ["", undefined]] };
    else return { choices: [["Turn down", piercingStudio], ["Oh yeah!", choiceWrap(letsDoYaraSex, false)], ["", undefined], ["", undefined], ["", undefined]] };
}

function letsDoYaraSex(player: Character, girl: boolean = true): NextScreenChoices {
    CView.sprite(SpriteName.TelAdre); // 63;

    let x: number = player.body.cocks.find(Cock.CockThatFits(36));
    if (TelAdreFlags.HYPER_HAPPY) {
        x = player.body.cocks.find(Cock.CockThatFits(50000));
    }
    else if ((x == -1) && !girl)  // No cock that fits
    {
        if (player.body.vaginas.length > 0) // But the PC has a vagoo! Swap over to female mode"
        {
            CView.text("\"<i>Oh dear, cutie. There is no way I could take that huge cock of yours!</i>\" she says, looking rather crestfallen at your enormous member. \"<i>Oh well</i>\", she sighs. \"<i>I guess I'll just have to explore your feminine side instead</i>\"\n");
            girl = true;

        }
        else {
            CView.text("\"<i>I'm sorry, cutie. There is no way I could take that huge cock of yours!</i>\" she says, looking rather crestfallen at your enormous member. Maybe come back after you've shrunk it down to a reasonable size?");
            return;
        }
    }
    CView.text("Her eyes widen as you begin to ");
    if (player.stats.lust < 50) CView.text("protest");
    else CView.text("speak");
    CView.text(", neatly silencing you with the lust-filled fires simmering in her eyes.  \"<i>Call it quality testing,</i>\" she purrs.  Her free hand runs up and down your inner thigh, the ticklish teasing nearly making your head spin.  Licking her lips in anticipation, Yara wiggles out of her clothes and clambers onto the chair, kneeling on the armrests.  Due to her awkward posture, you find your gaze drifting to her wide-spread legs.  Nestled there, twinkling with a radiant luster, is a golden ring, looped through her already-throbbing clit.  A blush darkens her cheeks as she notices your stare, but she seems almost empowered by it.\n\n");

    CView.text("Yara's free hand slides down her belly - past the stud in her navel - down to her box.  Using two fingers, she spreads her lips apart, giving you a great view of both her glistening button-piercing and the fleshy recesses past it.  She bites her bottom lip gently");
    if (!girl && player.body.cocks.length > 0) CView.text(" as your " + describeCock(player, x) + " rises to attention, her eyes fixed upon the stiffened tool.  You resist the urge to grab her thin-yet-girlish hips and power into her right then and there, curious enough to allow her teasing.");
    else CView.text(" as a growing puddle of love stains the cushioned chair.  It takes most of your power to not drag her down and force her face into your box.");
    CView.text("\n\n");

    CView.text("She leans forward, planting you with a wet and lingering kiss.  She moves lower, kissing ");
    if (player.body.chest.sort(BreastRow.Largest).get(0).rating < 1) CView.text("your chest");
    else CView.text("your nipples, one at a time");
    CView.text(" and smooching your belly.  Even with her racially characteristic flexibility, however, she's not able to get any lower from that angle.  \"<i>Hold this, dear,</i>\" she says somewhat snarkily, pivoting around and resting her ass against your " + describeChest(player) + ".  In this new posture, Yara can easily have her way with your junk, and by the way her wagging tail keeps bopping you in the face you can tell she's excited.\n\n");

    CView.text("Not content with simple penetration, it seems, the cat girl gets to work.");
    if (player.body.balls.count > 0) CView.text("  Her dexterous fingertips brush against your " + describeBalls(true, true, player) + ", light and fluttery strokes that send shivers coursing through you.  The near-lack of contact is at least as titillating as the less-subtle Marethians you've come across.");
    CView.text("  She scoots forward a bit, dragging her soaking cunt down your chest in an effort to reach your crotch.\n\n");

    // male
    if (!girl && player.body.cocks.length > 0) {
        CView.text("Yara's pursed lips touch down upon your cockhead, her head tilting from side to side as she vexingly and repeatedly kisses your " + describeCock(player, x) + ".  However, she abruptly pauses, glancing sidelong at you expectantly.  When you don't immediately respond, she huffs a sigh - onto your dick - and raises her hips level with your nose.  After momentarily getting lost in the bouncing of her tight-yet-jiggly cheeks, you get the message, leaning forward and giving her puffy sex a long and lingering lick.  You're rewarded with a low-pitched and very satisfied groan.  Though you go in for another taste, the shining ring looped through her joy-buzzer attracts your oral attention like a magnet.  Gently as a newborn kitten, your teeth close down on the clit-embedded trinket.  Yara goes absolutely stiff as you begin to softly tug the piercing around, neatly paralyzed by the sensitivity.  Indistinguishable mewling tumbles from her mouth as she attempts to attune herself to your yanking antics.  Her lithe frame spasms in ecstasy, forcing you to release your grip on her, lest something unfortunate happen to her undercarriage.\n\n");

        CView.text("As soon as you release her from the mind-numbing grasp, she whips her hips forward - spattering your " + player.inventory.armor.displayName + " with her downpour of girlcum in the process - and leaning back, hastily lining herself up with your " + describeCock(player, x) + ".  Only hesitating for a second to leak a bit of lubricant onto your eager shaft, she plummets downwards, not stopping until her ass slams against your pelvis.\n\n");

        CView.text("Yara takes total control, her death-grip on the armrests giving her full coital maneuverability.  Despite the easy entry, you can't believe how well her sopping-wet folds squeeze against you.  For a long while the only sounds heard are the slapping of her cheeks and the studded-up cat girl's halting pants of pleasure.  \"<i>I wanna say... your new piercing... works like a charm,</i>\" she mutters between throaty groans.\n\n");

        CView.text("Before you're even allowed to respond, Yara's pace quickens, her finish line in sight.  More than eager to help spur her on, your hands wrap around her slender waist.  She purrs in appreciation of your assistance.  It's not long before, with a victorious and primal scream, she throws all her weight downwards, splattering the mixture of pre-cum and femspunk and actually stinging you a bit with the force of her descent.\n\n");

        CView.text("The powerful motion is all the motivation your body needs.  Before either of you can even consider the ramifications of an internal ejaculation, your bodies seize up, caught in the familiar grasp of orgasmic bliss.  ");

        // ([cum quantity time, normal L/M/H/S quantities {IT'S A MARVEL REFERENCE} <no new paragraph>]
        // light and medium
        if (player.cumQ() < 500) CView.text("Yara's entire frame spasms as your load paints her private passage with snowy-white seed.  The cat girl writhes happily, arching her spine so far back your eyes nearly meet.\n\nYara dismounts your dick and hops to the ground in one fluid movement.");
        // heavy
        else if (player.cumQ() <= 1500) CView.text("Yara's belly visibly plumps with the quantity of cum you pour into her, the extra weight bending her over to rest heavily against your " + describeLeg(player) + ".  She purrs happily, patting her distended gut even while the tremors of her own orgasm run through her.\n\nYara lifts herself off you, pressing a hand against her tummy as she somewhat ungracefully steps off the chair.");
        // special (super-big)
        else CView.text("Her low-pitched ecstatic moans swiftly escalate to piercing shrieks as her taut belly quickly balloons to roughly beach ball-sized in moments.  With a huge effort, she manages to haul herself off your semen-pumping staff, falling back against you.  Sighing contentedly, Yara nestles herself into your " + describeChest(player) + ", getting comfortable despite the seed drizzling from her overstuffed nethers.  You just sit there for a few minutes, waiting patiently as your ejaculatory rampage ceases.\n\nYara makes a noble attempt to rise that is ultimately thwarted by her huge fluid-filled belly.  Casting a sidelong sheepish grin at you, she giggles nervously.  \"<i>Mind helping me out here, friend?</i>\" she says after a moment's hesitation.  With your assistance, she rises and stands on wobbling feet.  She tries her best to compose herself with your cum still streaming down her thighs, the flow only intensifying as she impatiently presses against the bloated belly.");

        CView.text("\n\n\"<i>Works like a charm,</i>\" she concludes as you both redress");
        if (player.cumQ() > 1500) CView.text(", Yara trying her best to fit her clothes over the bump in her midsection");
        CView.text(".  \"<i>Come back whenever, okay?  I'm sure we can arrange another... appointment!</i>\"");
        // ZA ENDO
    }
    // female
    else {
        CView.text("A duo of errant forefingers run along the perimeter of your feminine fortress, your signal to prepare for a siege.  Yara reaches down off the side of your seat, pushing on a lever that sends the back of the chair down to about a 30º angle.  She grasps for the armrests of the chair next, promptly lifting her body up and going into what looks like a forward somersault.  Before you can complement the feat, her legs fly up either side of your head.   The only things to have made contact were her nimble feet, gently stroking their way up from your belly, past your chest, off of your shoulders and soaring beyond the back of the chair.  The feline acrobat calls for you to lay your hands open at the sides of the chair, an order you fulfill with due haste.  She wastes no time in seizing your upper arms, causing her body to slide forward off of you.  You return the favor by clasping onto her as well in the same manner, stopping her descent.\n\n");

        CView.text("Trying to parse out the scene at play here is a fool's errand.  Yara must have done this before as your two sprawled out bodies have stopped in just the right fashion to make both of your fleshy orifices in plain view of one another's faces.  Air escapes your pursed lips as the \"<i>quality testing</i>\" commences on your " + describeVagina(player, player.body.vaginas.get(0)) + ", your kitty comrade going in tongue first towards your silken fringes.  ");
        if (player.body.vaginas.get(0).wetness >= 3) CView.text("She may as well be licking a melting popsicle with how wet your snatch is.");
        else CView.text("Your relatively dry perimeter makes for an easy target.");
        CView.text("  Not to be outdone, your ambitious tongue moves in as if it has everything to prove, mirroring your partner's efforts. Both of your lapping endeavors are periodically interrupted by moaning or slight gasps, your grasps on one another only growing more tense.\n\n");

        CView.text("Yara looks up - down in her case - at your " + describeClit(player) + ", your feminine fragrance riling her up as if it were catnip. Your work on her box is interrupted as your pleasure buzzer gets the oral shebang of a lifetime, eliciting a knowing laugh from deep within your teammate's throat.  Yara's lucky you redouble your clamp on her arms rather than sending the poor woman sliding to the ground as your body writhes in satisfaction.  But this is war, and you'll be damned if you're weak enough to go straight for the crown jewel as she has. No, you go to town, redefining what it means to eat out a pussy.  Your laborious toil is rewarded as the kitten's assault on your button eases up.  Her hold begins to waver, however, forcing you to yank your prey towards you.  The movement pierces through her contentment, her armlock strengthening as the air fills with the sound of a duo of muffled moans.\n\n");

        CView.text("Judging by the contortionist's wobbly embrace, you decide it's the perfect time to go in for the kill.  Yara stands no chance as you pounce for her pierced clit, your tongue lodging itself between the loop and her love-button.  It takes all of her willpower to maintain the offensive on your nub nexus while standing firm in her grasp on your arms.  Your oral tugging and teasing proves to be the victor, however, marked by the femspunk making its way right onto your face.  The cocktail combined with the orgasmic-enhanced last ditch effort by Yara on your nether regions triggers your own satisfying outburst.  The chain reaction ends in both your couplings faltering, sending the feline sliding headfirst for the floor.\n\n");

        CView.text("Her head stops short, though.  Through your gasping relief, you managed to lock onto her legs.  \"<i>Nice... nice catch,</i>\" is about all Yara manages to share before resuming her purring contentment upside down, limp arms spread across the floor.  After a minute or so, the two of you regain some sort of composure, but the spectacular gymnast from before can only bare to slink around on the ground as she reorients herself.  The most you need to do is fix the back of your chair, lifting it to a more comfortable height.  \"<i>Can you spare one more helping hand here, friend?</i>\" Yara requests, now having at least managed to at least sit up straight.  The two of you exchange a knowing glance as you lift the metal-worker back to her feet.");
    }
    player.orgasm();
    return { next: piercingStudio };
}

// [Flirt]
function yvonneFlirt(player: Character): NextScreenChoices {
    CView.sprite(SpriteName.TelAdre); // 64;
    CView.clear();
    CView.text("You step closer, glancing from her bulging, barely contained tits to her pouting lips and expressive, violet eyes.  A shock of sweat-matted auburn hair obscures part of her face, but the tall, buxom blacksmith nervously brushes it aside as she watches.  Once you're close enough to touch, you quietly and sincerely proclaim, \"<i>You're the most beautiful piece of craftsmanship in this entire store.</i>\"");
    CView.text("\n\nYvonne steps back, and you swear you can see a blush blooming through her fur, a fiery glow of embarrassment that spreads to the upper curve of her immense mammaries.  She folds her arms over her apron, unintentionally smushing those gigantic tits closer together and deepening her cleavage into a canyon. An immense sigh causes the plush plateau to sway pendulously as Yvonne answers, \"<i>");
    player.stats.lust += (10 + player.stats.lib / 10);

    // Brain no want to work out the boolean logic shit here, broken out to ensure it will work as intended.
    if (player.body.cocks.length == 0) {
        CView.text("Sorry, but you don't look like you'd be much fun.");
        CView.text("</i>\"");
        return { next: armorShop };
        return;
    }
    else if (player.body.tallness > 65 && !TelAdreFlags.LOW_STANDARDS_FOR_ALL) {
        CView.text("Sorry, but you don't look like you'd be much fun.");
        CView.text("</i>\"");
        return { next: armorShop };
        return;
    }
    else if (player.body.cocks.find(Cock.CockThatFits(75)) && !TelAdreFlags.LOW_STANDARDS_FOR_ALL) {
        CView.text("Sorry, but you don't look like you'd be much fun.");
        CView.text("</i>\"");
        return { next: armorShop };
        return;
    }

    if (TelAdreFlags.YVONNE_FUCK_COUNTER == 0) CView.text("Well, I could use a quick fuck.  If you meant what you said, go change the sign to say 'out' please.");
    else CView.text("You want to go again, huh?  I do love working up a sweat...");
    CView.text("</i>\"");
    // [Fuck] [Nevermind]
    return { choices: [["Fuck Her", fuckYvonneInZeBlacksmith], ["Nevermind", backOutOfYvonneFuck], ["", undefined], ["", undefined], ["", undefined]] };
}
// [Nevermind]
function backOutOfYvonneFuck(player: Character): NextScreenChoices {
    CView.sprite(SpriteName.TelAdre); // 64;
    CView.clear();
    CView.text("You politely decline, not wanting to interrupt her work.  Yvonne sighs and begins to pump the bellows, muttering, \"<i>Then you'd better be buying something!</i>\"");
    return { next: armorShop };
}
// [Fuck]
function fuckYvonneInZeBlacksmith(player: Character): NextScreenChoices {
    CView.sprite(SpriteName.TelAdre); // 64;
    CView.clear();
    // X = cock that fits!
    let x: number = player.body.cocks.find(Cock.CockThatFits(75));
    if (x < 0) x = 0;
    // Used for the new cock stuff
    const y: number = x + 1;
    CView.text("You walk over to the door and find a sign hanging in front of the window.  The side facing indoors has 'out' on it.  There's also a 'closed' sign hanging to the side of the doorframe.  You take the simple wood plaque in hand and flip it over - can't have anybody walking in on your sexual hijinks, can you?");
    CView.text("\n\nA fuzzy, calloused hand grabs you by the scuff of the neck, lifts you off the ground and pushes you against the wall, slamming you into it forcefully enough that some weapons hanging nearby rattle dangerously.  A hot puff of breath hits your cheek, Yvonne's wet, canine nose bumping against your ear as she pants in your face.  She closes, and you feel her bare, sweat-soaked breasts sliding up and down your back, holding you up as firmly as her iron grip.  Yvonne's long, smooth tongue licks you from collarbone to chin, lapping up the sweat that's already starting to bead, the heat of the simmering forge-fires and your companion's well-warmed, powerful frame long since getting to you.");
    CView.text("\n\nA distinctly feminine scent wafts up to your nostrils, intermingled with the blacksmith's own pungent body-odor, strong enough to make your head swim.  Yvonne's free hand begins removing your [armor], the blacksmith's confident motions suggesting she's had plenty of experience at this.  The aroma of the super-stacked bitch's estrus increases to the point where it nearly overpowers her salty sweat-smell, her nipples pressing hard into your back.  [EachCock] grows hard from the forceful attention, pinned between the wall and your belly.  Finished with your gear, Yvonne nips your neck and says, \"<i>Nice package, ");
    if (x.area < 20) CView.text("runt");
    else if (x.area < 40) CView.text(mf(player, "boy", "girl"));
    else if (x.area < 60) CView.text("big " + mf(player, "boy", "girl"));
    else CView.text(mf(player, "stud", "breeder"));
    CView.text(".</i>\"");
    CView.text("\n\nThe forge-mistress abruptly releases you and steps away, the supporting cushion of her breasts no longer there to help balance you.  After a moment of confused stumbling, you catch yourself and turn around, curious as to just what the buxom bitch is doing.");
    CView.text("\n\nYvonne is on the ground on all fours.  Her tail is sticking nearly straight up, waving back and forth excitedly as she presents her curvy rump to you.  Surprisingly, her ass is much less muscular than her upper body, with a pair of pillowy buttcheeks that nearly conceal her soaked cunny from view.  You aren't sure if it's lubricant from her arousal, or sweat from working the forge all day, but Yvonne's thighs are absolutely drenched with moisture; a veritable slip n' slide of wetness that beckons you to bury your bone in the canine's feminine entrance.  She glances back over her shoulder, a submissive glint in her eyes as she begs, \"<i>Come on, be my alpha.  This bitch needs a hot, wet fuck.  Do it!</i>\"  What an odd dichotomy - one moment she's throwing you around, the next, begging to be mounted.  For all her power, it seems Yvonne still wants to be taken as a meek bitch.");
    CView.text("\n\nYou sidle up to the larger woman and begin aligning [oneCock] with her mammoth buns, the sweltering, pheromone-laced stink pouring from her body making it difficult not to fall on top of her and rut.  Her huge tits are squished against the floor, squeezing out obscenely to either side of the blacksmith's lithe, muscular torso.  When you push inside, her slick wet cunt squeezes your [cock " + y + "] powerfully but affectionately.  Her potent vaginal muscles work your [cock " + y + "] over, tightly embracing your turgid dickflesh as you begin to fuck her properly, plowing her sweat and love-juice soaked folds even while you struggle to reach up for her incredible breasts.");
    CView.text("\n\nYou get a handhold on the soft chest-flesh and begin to massage at what you can find, releasing appreciative moans from your partner.  Unfortunately, her furiously-wagging tail bludgeons you across the nose over and over, and you're forced to block it with one arm so that you can ream her snatch unimpeded by the woman's canine instincts.  She growls, but doesn't stop you.  You can see the muscles in her arms quivering, shaking, struggling to maintain her posture in spite of the overwhelming pleasure your [cock " + y + "] is inflicting upon her poor womanhood.");
    CView.text("\n\nA shiver runs through the dog-morph's entire body, culminating in a cock-wringing contraction that ripples through her cunt, milking you with her slippery twat.  It works, and you lean over her prostrate form as you bottom out inside her, her sweat-matted fur smearing your face with her scent as you cum.  ");
    if (x.hasKnot()) CView.text("Your knot fills, locking you inside her, securely blocking any escape for the jizz you're now filling her depths with.  Yvonne sighs dreamily, \"<i>Just right...</i>\" while spunk slides into her birth canal to infiltrate her womb.[if (cumQuantity > 500) \"  The pearly goop spatters into her womb with egg-inseminating force, filling her beyond her wildest expectations.\"][if (cumQuantity > 1000) \"  The blacksmith cries out in pain and pleasure, her belly rounding with your liquid, taking on a more pregnant, stuffed-silly look.\"][if (cumQuantity > 2000) \"  Thanks to your knot, not a single drop escapes, and soon Yvonne's belly is as fat as her tits, cum-bloated in the extreme, a sloshing auburn tub packed with ivory sperm.\"]");
    else CView.text("Your jizz bubbles out to fill her depths, the spunk surging through her as it moves towards her womb.  Yvone sighs dreamily, \"<i>Ahhhh...</i>\" while you empty your [balls] inside her unprotected womanhood.[if (cumQuantity > 500) \"  The pearly goop spatters into her uterus with egg-inseminating force, filling the bitch beyond her wildest expectations.\"][if (cumQuantity > 1000)   The blacksmith cries out in pain and pleasure, her belly rounding with your liquid, looking positively pregnant.  Her twat begins to dribble sperm, creampied beyond belief.][if (cumQuantity > 2000) \"  Unfortunately, as your virility makes itself known, Yvonne's body hits its limit, and jets of ivory spooge squirt from all sides of her cunny, dribbling into a pearly puddle on the floor.\"]");
    // still no new pg
    CView.text("  With a thoroughly cream-stuffed twat beneath you, you ");
    if (x.hasKnot()) CView.text("pop");
    else CView.text("pull");
    CView.text(" out, accompanied by a exhalation of female pleasure.");
    CView.text("\n\nYvonne staggers up on her footpaws, groaning the whole time, a trail of white dribbling on the floor behind her.  Her tail wags happily, and she grabs you, pulling you into her sweaty bosom as she affectionately squeezes your [butt].  You aren't released until you feel dizzy, half-suffocated by her preponderance of breast-tissues and potent pheromones.");
    CView.text("\n\nYvonne tosses you your gear, and you dress in a daze.  Before you've completely finished, she's pushing you out into the street, covered in sex-stink and stumbling over your own [feet].  She calls out after you, \"<i>Thanks babe, I gotta mop this mess up!</i>\"");
    player.orgasm();
    player.stats.sens += -1;

    TelAdreFlags.YVONNE_FUCK_COUNTER++;
    return { next: passTime(1) };
}

// *Typical buy text goes here. Options are now Yes/No/Flirt*
// [Flirt]
function flirtWithVictoria(player: Character, itype: ItemType): NextScreenChoices {
    CView.clear();
    let x: number = player.body.cocks.find(Cock.CockThatFits(70));
    if (x < 0) x = player.body.cocks.sort(Cock.Smallest).get(0);
    CView.text("You take the clothes from her and give them a look over.  Setting them on the counter, you tell her that they're quite nice, but if she's interested you might have something that could fit her quite nicely as well in the back.");

    if (x < 0) {
        CView.text("\n\nVictoria smirks and answers, \"<i>I measured your inseam, and what you're packing in there won't fit anywhere in a girl like me.  Maybe some other time, " + mf(player, "studmuffin", "sweet thing") + ".  Did you actually want to buy something?</i>\"\n\nDo you still want to buy something?");
        return { yes: curry(debitClothes, itype), no: tailorShoppe };
        return;
    }
    CView.text("\n\nIt takes her a moment to realize just what it is you're suggesting before her face splits into a wide grin.  <i>\"That right?  Well now, you can't say things like that without backin' 'em up, can you?\"</i>  she says with a low chuckle, pressing her curvy body into you.  <i>\"What do you say I close the shop up quick, and you can show me just 'ow nicely you can fit, mm?\"</i>");

    CView.text("\n\nGiving your [butt] a squeeze, she hops off to turn the shop's open sign around and locks the door before closing all of the curtains.  Turning back to you, she pushes her ample cleavage up into ");
    if (player.body.tallness >= 65)
        CView.text("your stomach.");
    else if (player.body.tallness >= 55)
        CView.text("your chest.");
    else
        CView.text("your face.");
    CView.text("  <i>\"Now then,  let's see what you've got!\"</i>  With practiced ease she works the bottom of your [armor] off, revealing [eachCock].  <i>\"Well, well. Looks like I was right about you from the start,\"</i> she says, licking her lips again.  <i>\"Just a taste first, I think...\"</i> Sticking her tongue out once more, she gives your rapidly stiffening dick a long, slow lick from the base up to the tip.  She closes her mouth just around your " + describeCock(player, x) + ", giving it a few rapid licks before pulling off with a pop.");

    CView.text("\n\n<i>\"Oh yes,  I think you'll do rather nicely.  In fact, I think I'm going to give you a special treat.\"</i>  Smirking up at you, the busty dog-girl unbuttons her top just beneath her ample chest.  Before you can puzzle out what it is she's doing, she takes your [cock] and stuffs it into the hole and up through her cleavage");
    if (x.length >= 5)
        CView.text(" until the tip is poking out the top");
    CView.text(".");
    if (x.thickness > 3)
        CView.text("  Her face scrunches up uncomfortably for a moment, your girth straining the seams of her shirt.  With a series of loud pops, her buttons all go flying in different directions, letting her ample, creamy flesh bounce free with a bountiful jiggle.  <i>\"Bloody hell, that was my favorite top...\"</i> she whines for a moment before squeezing her chest back together with her hands.");
    else CView.text("  She presses her arms inward to increase the pressure on your cock even further, and gives you another wide smile.  <i>\"Ready for this, love?\"</i>");

    CView.text("\n\nShe begins to slowly move her disproportionately massive chest up and down your cock, ");
    if (x.length > 5)
        CView.text("making sure to give the " + describeCockHead(x) + " a quick suck every time it breaches her mounds.");
    else
        CView.text("pressing her mouth down into her ample cleavage so as to give your hidden tip a quick lick every time it draws near.");

    CView.text("\n\n<i>\"Hvvng fnn?\"</i>  she asks, pausing her pillowy assault to lick over the end of your pecker once again.  You can only moan in response from the wonderful wet, squishy feeling washing over your sensitive organ.  <i>\"That's what I thought,\"</i> she says, releasing you with a wet pop.");

    CView.text("\n\nVicky continues her marshmallowy assault for what feels like hours, slowing down every time you give even the slightest indication that you're about to cum.  <i>\"You might hate me for this now, love, but trust me.  It'll feel so much better once you finally do cum.\"</i>  She may be right, but it's agony to get so close to orgasm only to back away, and then draw close once more.  She's practically driving you crazy with lust with her tantalizingly slow tit-fuck.  As you feel your cum nearly boiling away in your [balls], only to have her back away once again, something inside of you snaps.");

    CView.text("\n\nYou wrench your dick free of the confines of her pillowy mounds, and grab her around her plush middle.  She gives a surprised yelp as you nearly throw her against the counter and lift her butt up into the air.  <i>\"Ooooh, someone's excited!\"</i>  she nearly cheers, looking over her shoulder and wagging her plush rear up at you as her tail swishes back and forth, showing that she's nearly as consumed with lust as you are.  Flipping her long skirt up over her back, you violently pull her panties aside before you force your " + describeCock(player, x) + " deep within her gushing folds.");

    CView.text("\n\nShe squeals in surprise and pleasure as she's penetrated, thrusting her ample hips back at you as you begin to pound into her.  Her ass jiggles violently with every thrust, sending ripples through her creamy flesh.  You grip her around her soft middle as you slam against her hips, barely noticing every squeak she makes as her thick thighs are pounded into the side of the counter.  <i>\"Ah!  Oh, Marae, that feels incredible!\"</i>  she nearly screams as her monocle finally loses its grip on her face and goes flying, thankfully landing safely on a pile of scrap cloth.  If you were more sound of mind, you'd probably have dreaded the cost of repairing the broken eyepiece.");

    CView.text("\n\nSomehow, miraculously, you're able to hold back long enough to work your hands up her soft body and grip onto her enormous tits, mashing them in your hands as you find her rock-hard nipples.  She seems to be enjoying the rough treatment - quite a bit in fact - as the moment you give her hard nubs a quick tweak you feel her already rather tight pussy clamp down on your cock HARD.  It becomes nearly impossible to move as she cums explosively, screaming incoherently as she sprays your lower body with her liquid pleasure.");

    CView.text("\n\nThe sudden resistance is all it takes to finally bring you over the edge, as with a loud roar of your own, you bury yourself deep inside of her still tightly clutching cunt and release.  [if (cumNormal = true) It would seem that what she said earlier was correct.  Your pent-up need surges up through your dick, firing your fertile seed straight into her unprotected womb.  She lets out a submissive whimper as your spurting dick triggers aftershocks within her exhausted body.  At last, her body relaxes, freeing your softening dick.][if (cumMedium = true) Thick, sticky, ropes of your cream fire deep within her grasping pussy, attempting to extinguish the fire you lit within her with your frantic rutting.  She whimpers beneath you as your ejaculation sends another wave of pleasure through her body, which clamps down even harder onto you than before.  Thankfully, it's not long before she releases you once again, going limp on the counter and breathing raggedly.][if (cumHigh = true) Your urethra distends as it funnels your thick, potent seed into the tightly gripping walls of Victoria's pussy.  She clenches down as the white torrent sends her into yet another orgasm, shuddering beneath you as her already thick stomach begins to distend with its load.  Her pussy continues to milk your dick of its load even as she rides the high of her last orgasm, her body desperate to draw out more of your thick cream.  Finally she releases you, your softening dick forced back out with a thick stream of your jizz, which begins to pool out onto the floor.][if (cumVeryHigh = true) You feel your dick swell as it nearly explodes within her, pouring thick streams of your seed deep into her fertile womb.  She lets out another loud squeal as her body clenches down into yet another orgasm, gripping your dick tighter than you ever thought possible as it tries to milk you for all you have.  Her plush stomach visibly distends with its contents as you dump your load within her, lifting her small body up from the surface of the counter somewhat.  Thankfully, her body soon relaxes, releasing your softening prick, which is followed by a thick, white fountain of jizz that soaks your legs and pools out onto the floor.]");
    if (Settings.silly()) CView.text("[if (cumExtreme = true) You groan loudly as your cock pours gallon after gallon of jizz deep into her spasming pussy.  She screams as another powerful orgasm wracks her body, triggered by the enormous amount of jizz you're shooting into her.  Her belly audibly sloshes with each of her movements as it continues to expand from the enormous amount of fluid you're pumping into her.  She attempts to clutch down on you as tightly as she can, trying to retain your enormous load; but the moment she releases even a little bit, she shoots forward from the enormous pressure of jizz within her, flopping down face-first onto some clothes on the other side of the counter.  Your thick cream continues to shoot up from between her limp legs, almost like a fountain, before gravity pulls it back down and it splatters all over the interior of the store.]");
    else CView.text("[if (cumExtreme = true) You groan loudly as your cock pours gallon after gallon of jizz deep into her spasming pussy.  She screams as another powerful orgasm wracks her body, triggered by the enormous amount of jizz you're shooting into her.  Her belly audibly sloshes with each of her movements as it continues to expand from the enormous amount of fluid you're pumping into her.  Thick streams of your seed shoot out all around your dick as she continues to squeeze down on you, trying to keep as much of it inside her massively pregnant-looking belly as possible before she finally releases, squirting your dick back out of her with a pop, followed by a veritable geyser of white. Your entire lower body is painted white as it gushes out, soaking into your clothes and covering the floor as she visibly deflates.]");

    CView.text("\n\nFinally, your strength gives out and you fall backwards onto the floor, exhausted.  A few seconds later, Vicky slips backward off of the counter and lands on top of you.  Like you, she's completely unable to move, however unlike you it's more because she is completely insensate.  Her eyes have rolled back into her head and her tongue hangs out as she occasionally mutters something incoherent.");

    CView.text("\n\nA few seconds later your body finally gives out completely and you pass out.  You wake up about an hour later, still on the floor with Vicky on the ground near you, leaning up against the counter with her legs splayed, cum still dripping from her used pussy.  <i>\"I uh... s'pose you wanna leave now?\"</i>  She asks, still sounding a bit loopy.  She climbs unsteadily to her feet, and walks, a bit bowlegged to the door, unlocking it before slumping back down the wall.  <i>\"Do come back for a visit, love!\"</i>  You pull your pants back up and crawl back out into the street.  Climbing back to your feet, you notice a few passersby chuckling at you before you close the door.  Before you leave, you think you can make out Victoria muttering, <i>\"Gonna have to clean this place up...\"</i>");

    player.orgasm();
    player.stats.sens += -1;

    return { next: passTime(1) };
}
