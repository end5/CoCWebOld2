import { NextScreenChoices, ScreenChoice, ClickFunction, choiceWrap } from 'Engine/Display/ScreenDisplay';
import { Flags } from 'Engine/Flags';
import { CView } from 'Engine/Display/ContentView';
import { openZeDoorToParadize, leaveBoobsDungeon, pullLever, takeBarrenPills, takeFertilePills, friendlyCumWitchBlessing } from 'Content/Scenes/Dungeons/DesertCave/RoomScene';
import { describeRace } from 'Content/Descriptors/BodyDescriptor';
import { riddleGameGo, fuckItAttack, fuckDatSphinx, SanuraFlags } from 'Content/Scenes/Dungeons/DesertCave/Sanura';
import { numToCardinalText } from 'Content/Utilities/NumToText';
import { randInt } from 'Engine/Utilities/SMath';
import { Settings } from 'Content/Settings';
import { knockUpSomeDoubleStuffedSandWitches } from 'Content/Scenes/Dungeons/DesertCave/Nusery';
import { milkBathsAhoy } from 'Content/Scenes/Dungeons/DesertCave/MilkBath';
import { cumWitchDefeated } from 'Content/Scenes/Areas/Desert/CumWitchScene';
import { sandMotherStuffGOA } from 'Content/Scenes/Dungeons/DesertCave/SandMotherScene';
import { CombatManager } from 'Engine/Combat/CombatManager';
import { Encounter } from 'Content/Combat/Encounter';
import { Character } from 'Content/Character/Character';
import { essyWitchVictory, approachTrappedEssy, EssrayleFlags } from 'Content/Scenes/Areas/Forest/Essrayle';
import { CumWitch } from 'Content/Scenes/Areas/Desert/CumWitch';
import { SandWitchMob } from 'Content/Scenes/Dungeons/DesertCave/SandWitchMob';
import { Area } from 'Content/Area';

export const DesertCaveFlags = Flags.register("Desert Cave", {
    DISCOVERED_WITCH_DUNGEON: 0,
    ENTERED_SANDWITCH_DUNGEON: 0,
    SAND_WITCHES_FRIENDLY: 0,
    SANDWITCH_MOB_DEFEATED: 0,
    CUM_WITCH_DEFEATED: 0,
    SAND_WITCH_LEAVE_ME_ALONE: 0,
    SAND_WITCH_LOOT_TAKEN: 0,
    MET_MILK_SLAVE: 0,
    MILK_NAME: 0,
    SAND_MOTHER_DEFEATED: 0,
    UNKNOWN_FLAG_NUMBER_00283: 0,
    UNKNOWN_FLAG_NUMBER_00282: 0,
    TIMES_TENTACLED_SAND_MOTHER: 0,
    SAND_WITCHES_COWED: 0,
    TIMES_FRIENDLY_FUCKED_SAND_MOTHER: 0,
    MORE_CUM_WITCHES: 0,
    CUM_WITCHES_FIGHTABLE: 0,
    SANDWITCH_THRONE_UNLOCKED: 0,
    BEEN_BLESSED_BY_CUM_WITCH: 0,
});

enum Rooms {
    ENTRANCE_GATEWAY = 'Gateway',
    CAVERNOUS_COMMONS = 'Cavernous Commons',
    WEST_WARRENS_MAIN = 'West Warrens Main',
    CHILDRENS_PLAYROOM = "Children's Playroom",
    PREGNANT_LUST_ROOM = 'Pregnant Lust Room',
    WEST_WARRENS_WEST = 'West Warrens West',
    NURSERY = 'Nursery',
    PHARMACY = 'Pharmacy',
    EAST_WARRENS_MAIN = 'East Warrens Main',
    SLEEPING_CHAMBER = 'Sleeping Chamber',
    BATH_ROOM = 'Bath Room',
    EAST_WARRENS_EAST = 'East Warrens East',
    CUM_WITCH_BEDROOM = 'Cum Witch Bedroom',
    CUM_WITCH_OFFICE = 'Cum Witch Office',
    SACRIFICIAL_ALTAR = 'Sacrifical Altar',
    THRONE_ROOM = 'Throne Room'
}

function registerArea(name: Rooms, neighbors: Rooms[], func: ClickFunction, hidden?: boolean) {
    Area.register({ name, area: 'Sand Witch Cave', neighbors, noSave: true, func, hidden });
}

registerArea(Rooms.ENTRANCE_GATEWAY, [Rooms.CAVERNOUS_COMMONS], DUNGEON_WITCH_ENTRANCE_GATEWAY);
export function DUNGEON_WITCH_ENTRANCE_GATEWAY(player: Character): NextScreenChoices {
    CView.clear();
    CView.text("<b><u>Strange Gateway in the Sands</u></b>\n");
    const choices: ScreenChoice[] = [];
    if (SanuraFlags.SANURA_DISABLED > 0) {
        CView.text("Just ahead, in one of the larger dunes, is a square stone doorway, built into the side of a large, sparkling mountain of sand.  You never would have noticed it if the sun hadn't been at the perfect angle to trace a rectangular shadow down the side of the incline.  As you approach, you notice a familiar obsidian orb embedded into the side of it.  It's obviously the mechanism to open it.");

        choices[0] = ["North", Area.travel(Rooms.CAVERNOUS_COMMONS)];
    }
    else if (SanuraFlags.MET_SANURA === 0) {
        SanuraFlags.MET_SANURA = 1;
        CView.text("Just ahead, in one of the larger dunes, is a square stone doorway, built into the side of a large, sparkling mountain of sand.  You never would have noticed it if the sun hadn't been at the perfect angle to trace a rectangular shadow down the side of the incline.  As you approach, you notice a smooth obsidian orb embedded into the side of it.  Perhaps that's the mechanism to open it?");
        CView.text("\n\nSuddenly, a huge shadow looms over you, and the sound of beating wings echo from on high. You spin around in time to see a huge creature leap from the dune tops and slam into the ground a few feet away.  At first glance, the creature looks like a tall, tanned woman with flowing black hair, adorned in a great wealth of gold and jewels.  A moment later, though, you're able to take in the full view of her form: from the waist down, her shapely human form morphs into the lower body of a great, golden-haired lion, padding on a quartet of powerful legs ending in sharp claws.  From her leonine sides grow a pair of massive wings, easily over a dozen feet across, which quickly furl up against her body.  She's a sphinx!");
        CView.text("\n\nThe sphinx-girl pads over towards you, her arms crossed under her small, palmable breasts. Chestnut-colored eyes examine you, looking you over from your [hair] to your [feet], a playful grin playing across her feminine features.  \"<i>O-ho!  What's this we have here?  A poor, lost " + describeRace(player) + " wandering the desert; or are you something more?  Indeed, I should think so, with your [weapon] so eager for battle, and your [armor] that looks to have seen a thousand blows.  My, my.  Could it be you've come to brave my Mistress's lair?  Ah, if so... you must answer my riddles three, lest I keep from you the key!</i>\" she says, a little tune springing into her voice as she stalks towards you.");
        CView.text("\n\n\"<i>We could even make it interesting...  If you can't guess my riddles, you must surrender your body to my pleasure.  If you win, your pleasure shall be my wish.</i>\"");
        if (DesertCaveFlags.DISCOVERED_WITCH_DUNGEON === 0) {
            CView.text("\n\n(<b>You've discovered a new dungeon, available in the places menu in the future!  Make sure you save before delving too deeply...</b>)");
            DesertCaveFlags.DISCOVERED_WITCH_DUNGEON = 1;
        }
        // (Display Options: [Riddle Game] [Fight] [Leave])
        choices[2] = ["Riddle Game", riddleGameGo];
        choices[3] = ["Uh, FIGHT!", fuckItAttack];
    }
    else {
        if (SanuraFlags.TIMES_SUBMITTED_TO_SANURA + SanuraFlags.TIMES_WINFUCKED_SANURA > 0) {
            CView.text("You approach Sanura the sphinx as she pads around the great stone doorframe.  A playful grin spreads across her thin lips as you approach.  \"<i>O-ho!  Back again, I see.  Mmm, it's been so dull since last you <i>came</i>.  There's no one more fun to play out here in the wastes.  So... care to try your hand at my game once more?");
            if (SanuraFlags.BEATEN_SANURA_COUNT > 0) CView.text("  Or would you rather skip the formalities?  We both know who's got the sharper wit, I should think.");
            CView.text("</i>\"");
        }
        else {
            CView.text("The sphinx, Sanura, is padding around the stone doorframe.  Occasionally she beats her leonine wings or gives a mighty yawn, obviously bored by a present lack of stimulation.  Seeing you standing about, however, Sanura gives you a sultry come-hither look and a seductive wink.  You're not sure if she wants to tempt your mind or your body.");
        }
        choices[2] = ["Riddle Game", riddleGameGo];
        if (SanuraFlags.BEATEN_SANURA_COUNT > 0) {
            choices[0] = ["North", Area.travel(Rooms.CAVERNOUS_COMMONS)];
            choices[3] = ["Fuck", fuckDatSphinx];
        }
    }
    choices[4] = ["Leave", leaveBoobsDungeon];

    return { choices };
}

registerArea(Rooms.CAVERNOUS_COMMONS, [Rooms.SACRIFICIAL_ALTAR, Rooms.EAST_WARRENS_MAIN, Rooms.WEST_WARRENS_MAIN, Rooms.ENTRANCE_GATEWAY], openZeDoorToParadize);
export function DUNGEON_WITCH_CAVERNOUS_COMMONS(player: Character): NextScreenChoices {
    CView.clear();
    CView.text("<b><u>Cavernous Commons</u></b>\n");
    CView.text("Dancing lights swirl around the roof of the cavern, twirling around each other in patterns too intricate to follow.  Whatever they are, they're clearly magical, and they lend this place an otherworldly ambience unmatched by anything you've seen.  This huge room reminds you of your village commons in a way - it's clearly a communal area.  There's a water-pump in the northwest corner and a blazing purple bonfire in the center of the chamber, heating the cool underground air.  The ground is dirt, rather than sand, and hard-packed as any road.  Various chairs and benches are set up for witches to relax in.  ");
    if (DesertCaveFlags.SANDWITCH_MOB_DEFEATED === 0) {
        CView.text("Worst of all, a huge assortment of spellcasters is assembling into a mob, obviously hostile.");
        return CombatManager.beginBattle(new Encounter(player, new SandWitchMob()));
    }
    else CView.text("The women you defeated before have returned to their tasks, casting wary glances your way from time to time but no longer threatening.");
    CView.text("  Cave tunnels lead in to the east and west into more underground chambers.  A path leads south towards the exit.");

    const choices: ScreenChoice[] = [];
    if (DesertCaveFlags.SANDWITCH_THRONE_UNLOCKED === 0) {
        CView.text("\n\nA huge stone doorway blocks the path north.  You cannot see a way to open it.");

    }
    else {
        CView.text("\n\nAn open doorway opens up to the north.  You can faintly see some kind of altar beyond it.");
        choices[0] = ["North", Area.travel(Rooms.SACRIFICIAL_ALTAR)];
    }
    choices[1] = ["East", Area.travel(Rooms.EAST_WARRENS_MAIN)];
    choices[5] = ["West", Area.travel(Rooms.WEST_WARRENS_MAIN)];
    choices[6] = ["South", Area.travel(Rooms.ENTRANCE_GATEWAY)];

    return { choices };
}

registerArea(Rooms.WEST_WARRENS_MAIN, [Rooms.CHILDRENS_PLAYROOM, Rooms.CAVERNOUS_COMMONS, Rooms.WEST_WARRENS_WEST, Rooms.PREGNANT_LUST_ROOM], DUNGEON_WITCH_WEST_WARRENS_MAIN);
export function DUNGEON_WITCH_WEST_WARRENS_MAIN(): NextScreenChoices {
    CView.clear();
    CView.text("<b><u>West Warrens Main Hall</u></b>\n");
    CView.text("The supernatural illumination so prevalent to the east is present here as well, though in smaller quantity and vastly diminished brightness.  Swirls of bluish-white hue slide along the ceiling in slow, measured motions, a stark contrast to the jubilant dancing of the preceding cavern.  The ceiling is almost twelve feet high in places, with the sides of the east-west passage dipping down the lowest.  The floor is sandstone here, as you would expect in a desert cave, though it is liberally obfuscated with an array of woven rugs.  Sand Witches march by on errands, only pausing to give you disinterested glances.  Most of them bear the signs of pregnancy or have young girls in tow.  Whatever the case, there doesn't seem to be any fight in these women.  Along the north and south walls are small, door-sized openings, draped with heavy curtains that easily muffle any noise.  To the west, the tunnel bores on unimpeded.  However, to the east the cave opens up into a much, much larger chamber.");

    const choices: ScreenChoice[] = [];
    choices[0] = ["North", Area.travel(Rooms.CHILDRENS_PLAYROOM)];
    choices[1] = ["East", Area.travel(Rooms.CAVERNOUS_COMMONS)];
    choices[5] = ["West", Area.travel(Rooms.WEST_WARRENS_WEST)];
    choices[6] = ["South", Area.travel(Rooms.PREGNANT_LUST_ROOM)];

    return { choices };
}

registerArea(Rooms.CHILDRENS_PLAYROOM, [Rooms.WEST_WARRENS_MAIN], DUNGEON_WITCH_CHILDRENS_PLAYROOM);
export function DUNGEON_WITCH_CHILDRENS_PLAYROOM(): NextScreenChoices {
    CView.clear();
    CView.text("<b><u>West Warrens Eastern Portion North Side (Children's Play Room)</u></b>\n");
    CView.text("Behind the thick curtain is the last thing you would expect to see.  There's nearly a dozen children and three busty, pregnant sand witches watching them.  Toys have been scattered everywhere by the young blonde children.  Their wardens were busy knitting when you intruded, but they glare at you balefully and make shooing gestures.  Unless you had planned to rob children of their toys and beat up pregnant women, there's nothing to be had here.");

    const choices: ScreenChoice[] = [];
    choices[6] = ["South", Area.travel(Rooms.WEST_WARRENS_MAIN)];

    return { choices };
}

registerArea(Rooms.PREGNANT_LUST_ROOM, [Rooms.WEST_WARRENS_MAIN], DUNGEON_WITCH_PREGNANT_LUST_ROOM);
export function DUNGEON_WITCH_PREGNANT_LUST_ROOM(player: Character): NextScreenChoices {
    CView.clear();
    CView.text("<b><u>West Warrens Eastern Portion South Side (Lust Room)</u></b>\n");
    CView.text("This room is surprisingly large - big enough to hold the " + numToCardinalText(randInt(6) + 5) + " heavily pregnant women inside plus perhaps a dozen more.  Like the outer tunnel, this room is lit by magic, though its contents are equally mundane, if a great deal more... interesting.  There's female sex-toys of every variety on almost every surface.  They sit in piles on the floor, they hang from the walls, and there are even some mounted on the wall, to be fucked in place.  Many such toys have multiple shafts and come in shapes from standard to canine to obscenely equine.  All of the witches are presently engaged in coitus with each other or their 'marital aids', but once you enter, they glance at you with hungry, lust-filled eyes.");
    if (Settings.sillyMode) CView.text("  Clearly, if you wanted to, you could put some extra meat in a sand witch.");

    const choices: ScreenChoice[] = [];
    choices[1] = ["North", Area.travel(Rooms.WEST_WARRENS_MAIN)];
    if (player.body.cocks.length > 0 && player.stats.lust >= 33) {
        choices[2] = ["FuckWitches", knockUpSomeDoubleStuffedSandWitches];
    }

    return { choices };
}

registerArea(Rooms.WEST_WARRENS_WEST, [Rooms.NURSERY, Rooms.WEST_WARRENS_MAIN, Rooms.PHARMACY], DUNGEON_WITCH_WEST_WARRENS_WEST);
export function DUNGEON_WITCH_WEST_WARRENS_WEST(): NextScreenChoices {
    CView.clear();
    CView.text("<b><u>West Warrens Main Hall (Western Portion)</u></b>\n");
    CView.text("The smooth tunnel comes to an end here, blocked by the omnipresent sandstone.  The sapphire light plays beautifully across the rough-hewn stone as you watch, but you don't take the time to give it much thought.  To the east, the arching hallway leads back towards a large common area of a cave.  Along the north and south walls are door-sized openings, blocked with rugs of fine make and thick fabric.  They don't leave enough of a gap for any light or sound to bleed into the hall.  You'll have to take a peek if you want to see what's going on.");
    const choices: ScreenChoice[] = [];
    if (EssrayleFlags.ESSRAYLE_ESCAPED_DUNGEON === 0 && EssrayleFlags.MET_ESSY > 0) {
        EssrayleFlags.ESSY_MET_IN_DUNGEON = 1;
        if (EssrayleFlags.TOLD_MOTHER_TO_RELEASE_ESSY > 0) {
            CView.text("\n\n<b>Your attention is immediately drawn to Essrayle...</b>");
            EssrayleFlags.ESSRAYLE_ESCAPED_DUNGEON = 1;

            return { next: essyWitchVictory };
        }
        CView.text("\n\nQuite an unusual sight awaits you in this chamber.  Sitting in an oversized pot is what looks to be the overly busty, plant girl you encountered earlier, Essrayle.  She's changed quite a bit since you last saw her, however.  While her inhumanly smooth, elfin face seems to be unchanged, the rest of her verdant body seems to have been warped into a hyper-sexual parody of a fertility idol, with features that echo the nomadic sand witch tribe.");

        choices[2] = ["Essrayle", approachTrappedEssy];
    }

    choices[0] = ["North", Area.travel(Rooms.NURSERY)];
    choices[1] = ["East", Area.travel(Rooms.WEST_WARRENS_MAIN)];
    choices[6] = ["South", Area.travel(Rooms.PHARMACY)];

    return { choices };
}

registerArea(Rooms.NURSERY, [Rooms.WEST_WARRENS_WEST], DUNGEON_WITCH_NURSERY);
export function DUNGEON_WITCH_NURSERY(): NextScreenChoices {
    CView.clear();
    CView.text("<b><u>West Warrens Western Portion North Side (Nursery)</u></b>\n");
    CView.text("As soon as you clear the curtain, you realize there's nothing of interest to you here.  The room is lit with rose pink globes, and the furniture in the room is filled with sleeping mothers, nursing infants, or older children taking naps.  The room is packed with bodies, and while it smells strongly of femininity, there's nothing worth looking into present here.");

    const choices: ScreenChoice[] = [];
    choices[6] = ["South", Area.travel(Rooms.WEST_WARRENS_WEST)];

    return { choices };
}

registerArea(Rooms.PHARMACY, [Rooms.WEST_WARRENS_WEST], DUNGEON_WITCH_PHARMACY);
export function DUNGEON_WITCH_PHARMACY(): NextScreenChoices {
    CView.clear();
    CView.text("<b><u>West Warrens Western Portion South Side (Pharmacy)</u></b>\n");
    CView.text("This room is so tiny it can barely get away with being called that.  If anything, it's more of a small, cozy nook.  There isn't anyone else here, though the room is illuminated by the same omnipresent magics found elsewhere in this little cave of wonders.  Standing silent vigil on the southern wall, a large chest looms over you, stretching most of the way to the ceiling.  It is completely, almost impossibly neat, with every drawer fully and completely closed.  Spurred on by this strangeness, you pop a few of them open.  One drawer has pink pills, another brown.  Searching drawer by drawer until you discover that every single compartment houses the same dual medicines.  You glance about the room and spy a faded parchment on the wall.  It reads \"<i>Tnangerp rof knip, nerrab rof nworb.</i>\"  There is an opening in the wall to the north.");
    const choices: ScreenChoice[] = [];
    if (DesertCaveFlags.SANDWITCH_THRONE_UNLOCKED === 0) {
        CView.text("\n\nThere is also a lever on the floor.  Looking closely at it, it appears that it connects with machinery that leads to the east...");

        choices[1] = ["Pull Lever", pullLever];
    }

    choices[0] = ["North", Area.travel(Rooms.WEST_WARRENS_WEST)];
    choices[2] = ["Brown Pill", takeBarrenPills];
    choices[3] = ["Pink Pill", takeFertilePills];

    return { choices };
}

registerArea(Rooms.EAST_WARRENS_MAIN, [Rooms.SLEEPING_CHAMBER, Rooms.EAST_WARRENS_EAST, Rooms.CAVERNOUS_COMMONS], DUNGEON_WITCH_EAST_WARRENS_MAIN);
export function DUNGEON_WITCH_EAST_WARRENS_MAIN(): NextScreenChoices {
    CView.clear();
    CView.text("<b><u>Eastern Warrens Main Hall (Western Portion)</u></b>\n");
    CView.text("This smooth, sandstone tunnel proceeds in a perfectly straight line from east to west, as if aligned to some titanic, invisible compass buried below the floor.  Flickering white plumes of illumination undulate through the air along the arched ceiling, trailing streamers of pearl incandescence that light the entire chamber with ghostly brightness.  You are at the entrance to the eastern warrens - the commons are still clearly visible to the west, and the pathway to the east goes on a-ways.  Hand woven tapestries adorn the walls, telling the history of this enclave in pictographic form, from its inception to present day.  Further east, you can see a few empty places, ready to be covered with more cloth, once the next chapter of history is ready to be told.  To the north, there is a small opening in the wall, blocked off by plain white curtains.");

    const choices: ScreenChoice[] = [];
    choices[0] = ["North", Area.travel(Rooms.SLEEPING_CHAMBER)];
    choices[1] = ["East", Area.travel(Rooms.EAST_WARRENS_EAST)];
    choices[5] = ["West", Area.travel(Rooms.CAVERNOUS_COMMONS)];

    return { choices };
}

registerArea(Rooms.SLEEPING_CHAMBER, [Rooms.BATH_ROOM, Rooms.EAST_WARRENS_MAIN], DUNGEON_WITCH_SLEEPING_CHAMBER);
export function DUNGEON_WITCH_SLEEPING_CHAMBER(): NextScreenChoices {
    CView.clear();
    CView.text("<b><u>Eastern Warrens West Portion North Side (Sleeping Chamber)</u></b>\n");
    CView.text("Inside this expansive but cosy chamber are a few dozen beds, arranged in neat patterns marred only by a few cots that dare to be positioned adjacent to one another.  Clearly this is the tribe's primary sleeping area.  The floor is obscured by heavy, hand-woven rugs that ruffle oh so softly against your [feet].  Instead of the usual ghostly lights you've grown to expect, the interior of this dwelling is lit by glass-paneled constructs resembling lanterns.  There is no fuel or wick of course, only flicking phantasmal illumination trapped as if it were a flame.  Shutters allow the lanterns to be dimmed, but as you are alone in here for now, there's no reason to make it harder to see.  There is a door to the east and a curtained off opening to the south.");

    const choices: ScreenChoice[] = [];
    choices[1] = ["East", Area.travel(Rooms.BATH_ROOM)];
    choices[6] = ["South", Area.travel(Rooms.EAST_WARRENS_MAIN)];

    return { choices };
}

registerArea(Rooms.BATH_ROOM, [Rooms.SLEEPING_CHAMBER], DUNGEON_WITCH_BATH_ROOM);
export function DUNGEON_WITCH_BATH_ROOM(): NextScreenChoices {
    CView.clear();
    CView.text("<b><u>Eastern Warrens East Portion North Side (Bath Room)</u></b>\n");
    CView.text("As soon as you step in, you can smell a sweet, dairy-like scent in the air, but as your eyes adjust to the dimmer lighting, you realize you've stumbled into the sand witches' bathroom!  Fluffy towels hang from the wall, ready for use.  There's one giant tub in the center of the room, recessed deep into the floor.  It has a number of seats carved into the side with a small, open hole in the bottom.  Hanging from the ceiling, a long chain dangles down, topped with a plug.");
    DesertCaveFlags.MET_MILK_SLAVE = 1;
    const choices: ScreenChoice[] = [];
    if (typeof DesertCaveFlags.MILK_NAME === 'number') {
        CView.text("  There are no faucets or water sources that you can see, but your unasked questions are answered when a heavy, liquid sloshing sound emanates from the corner.  The source of the noise reveals itself to be a tit-encumbered, black-skinned human girl.  She drags her milk-swollen mammaries up to the edge of the tub and asks in a breathy, excited voice, \"<i>Bath time?</i>\"  Whoever she was, the witches seem to have broken her utterly - she's interested in nothing but being milked or lounging in her corner.  The way out lies west.");

        choices[2] = ["Bath Time", milkBathsAhoy];
    }

    choices[5] = ["West", Area.travel(Rooms.SLEEPING_CHAMBER)];

    return { choices };
}

registerArea(Rooms.EAST_WARRENS_EAST, [Rooms.EAST_WARRENS_MAIN, Rooms.CUM_WITCH_BEDROOM], DUNGEON_WITCH_EAST_WARRENS_EAST);
export function DUNGEON_WITCH_EAST_WARRENS_EAST(): NextScreenChoices {
    CView.clear();
    CView.text("<b><u>Eastern Warrens Main Hall (Eastern Portion)</u></b>\n");
    CView.text("Coming to an end here, the eastern warrens' main hall ends in little more than a bare, flat stone wall.  The area is well illuminated by the familiar magical lights, giving you a good view of the historical tapestries and blank spaces yet to be filled in.  You can't help but wonder if the Witches will simply stop recording their history once this area is full, or if they will expand in order to give themselves more room.  Looking over the events depicted here, it's clear that this enclave is one of the oldest, roughly two decades old.  There are pictures of a blond haired woman in fluttering, golden robes leaving a town of demons behind and journeying towards the desert.  Could that be how the sand witches began?  You shake your head and look over the rest of the room.  There's a curtained off doorway to the south, and of course, the tunnel leads back to the west.");

    const choices: ScreenChoice[] = [];
    choices[5] = ["West", Area.travel(Rooms.EAST_WARRENS_MAIN)];
    choices[6] = ["South", Area.travel(Rooms.CUM_WITCH_BEDROOM)];

    return { choices };
}

registerArea(Rooms.CUM_WITCH_BEDROOM, [Rooms.EAST_WARRENS_MAIN, Rooms.CUM_WITCH_OFFICE], DUNGEON_WITCH_CUM_WITCH_BEDROOM);
export function DUNGEON_WITCH_CUM_WITCH_BEDROOM(): NextScreenChoices {
    CView.clear();
    CView.text("<b><u>Eastern Warrens East Portion South Side (Cum Witch's Bedroom)</u></b>\n");
    CView.text("As soon as you brush back the curtain, you're assaulted by a pungent, salty smell.  It almost reminds you of tepid ocean water... or cum.  Regardless, you force your way in and take a look around.  This area has all the furnishings of a small domicile and comes complete with a solid oak bed and mattress.  The mattress and sheets seem to be cared for with immaculate precision, perhaps magically aided.  There is a simple dresser here, and though it looks to have been fashioned by crude tools, the wood looks sturdy and serviceable.  All of the drawers are closed, of course.  A few books sit on a nearby table, but it's obvious they're written in a language beyond your comprehension.  Whoever wrote them either did so in a different tongue or a magical language that would take years to decipher.  A thick curtain walls this chamber off from the eastern warrens' main hall, to the north.  To the west, there is a thinner, gauzy sheet hanging from an opening in the rock - likely leading to a similar room.");

    const choices: ScreenChoice[] = [];
    choices[0] = ["North", Area.travel(Rooms.EAST_WARRENS_EAST)];
    choices[5] = ["West", Area.travel(Rooms.CUM_WITCH_OFFICE)];

    return { choices };
}

registerArea(Rooms.CUM_WITCH_OFFICE, [Rooms.CUM_WITCH_BEDROOM], DUNGEON_WITCH_CUM_WITCH_OFFICE);
export function DUNGEON_WITCH_CUM_WITCH_OFFICE(player: Character): NextScreenChoices {
    CView.clear();
    CView.text("<b><u>Eastern Warrens West Portion South Side (Cum Witch's Office)</u></b>\n");
    const choices: ScreenChoice[] = [];
    if (DesertCaveFlags.SAND_WITCHES_FRIENDLY > 0) {
        // {SAND WITCHES NOW FRIENDLY}
        CView.text("The cum witch is here, pounding away at one of her sister's cunts, like usual.  She seems to CONSTANTLY excrete her jism into her partner's many cunt-folds, but as her passion and speed rises, the flow thickens, eventually filling the poor milk-witch's wombs entirely.  They go at it like animals for a few seconds more, then separate after a climactic orgasm that leaves a puddle of spooge inches deep on part of the uneven floor.  The cum-witch moves her insensate sister to rest on a nearby bench before putting on her hat and robes.  She winks at you and offers, \"<i>Well, I hope you enjoyed the show, interloper.  Did you come here for some of my gift, or something else?</i>\"");
        // {VOLUNTEER FOR SERVICE: BAD-END, BLESSING: +CUM PRODUCTION}
        if (DesertCaveFlags.BEEN_BLESSED_BY_CUM_WITCH === 0) {
            // 				text3 = "Blessing";
            // 				choice3 = friendlyCumWitchBlessing;
            choices[2] = ["Blessing", friendlyCumWitchBlessing];
        }
    }
    else {
        // {CUM WITCH UNDEFEATED}
        if (DesertCaveFlags.CUM_WITCH_DEFEATED === 0) {
            CView.text("The curtain pulls to the side easily, and as soon as you enter, you're greeted by the sound of flesh slapping on flesh from somewhere to your left.  Briefly, you note a number of desks as you turn towards the sexual audio, but what really catches your eyes are the two girls locked in coitus.  One, a normal-looking sand witch, is bent over a bench and taking quite the fucking.  Milk drips in huge beads from her four fat teats while fresh rivulets of cum run down past the dried-cum on her thighs.  Above her is something else entirely, a taller woman with a single pair of obscenely large breasts.  She's so dark skinned that at first you have difficulty picking out her features in the dim lighting.  Glittering sweat runs down her form, dripping from her pendulous breasts as she throws back her head and moans, \"<i>Gonna... just... take it!  Take my gift!</i>\"");
            CView.text("\n\nBeneath the ebony woman, you see the sand witch begin to quiver and moan, thick gouts of semen back-flooding from her packed cunny as her belly rounds with delicious fecundity.  Her muscles lock, then twitch feebly for a few seconds before she slides off into the new-born cum-puddle, slipping along the floor in an insensate pile of orgasmic bliss.  You're so enraptured by the sight, that you don't even try to hide when the ebony futanari turns to face you, putting on a pointed, wide-brimmed hat and black robe.  For the slightest second you see a pair of orange-sized balls and one thick, cum-lubed member, but those quickly disappear into the voluminous robes.");
            CView.text("\n\n\"<i>Well now, surely you aren't one of the witches here to receive my seed,</i>\" the odd witch muses, \"<i>I'm afraid you must be an interloper then.  Pity, ");
            if (player.body.vaginas.length > 0) CView.text("but then, maybe you can come to serve us as a mother.  Our tribe is not wasteful.");
            else if (player.body.cocks.length > 0) CView.text("but perhaps, once you have been disabused of your notions of freedom, you could serve as my loyal cum-pump.  It does get so tiring inseminating all these girls alone.");
            else CView.text("but then, perhaps you could be made to serve in other ways.");
            CView.text("</i>\"");

            CView.text("\n\nThe soot-skinned futanari delicately opens one of her palms and murmurs an unintelligible word. Before your eyes, flickers of light flash into existence and align themselves vertically, slowly sliding together like pieces of a flawless crystal jigsaw puzzle.  The glimmering phantasmal luminance slowly fades as all the pieces come together, leaving a flawless ivory staff in the woman's hand.  She slams the base into the ground, sending ripples of magical force through the many pools of cum scattered around the room.  <b>It looks like you'll have to fight her!</b>");
            // {START CUM WITCH FIGHT}
            return CombatManager.beginBattle(new Encounter(player, new CumWitch()));
        }
        // {CUM WITCH BEATEN}
        else {
            CView.text("This room is absolutely, unequivocally inundated with the scent of spunk.  Sure, you note there's a few grates built into the floor to drain off most of it, but it hasn't stopped a number of huge puddles from building up all over this room, likely the result of the two semi-conscious women in this room.  One, a recently-bred sand witch got the fucking of her life from the other, a cum witch.  Both are front-down in jizz, their abused bodies quivering and weak.  The cum witch had tried to fight you, but she was no match for your superior technique.");
            // Lust:
            if (player.stats.lust >= 33) {
                CView.text("\n\nYou could probably pull the cum witch up and sate yourself on her, if you wanted.  She doesn't seem in any shape to resist.");
                // lust win menu.
                choices[2] = ["Sex", choiceWrap(cumWitchDefeated, new CumWitch())];
            }
        }
    }
    choices[1] = ["East", Area.travel(Rooms.CUM_WITCH_BEDROOM)];

    return { choices };
}

registerArea(Rooms.SACRIFICIAL_ALTAR, [Rooms.THRONE_ROOM, Rooms.CAVERNOUS_COMMONS], DUNGEON_WITCH_SACRIFICIAL_ALTAR, true);
export function DUNGEON_WITCH_SACRIFICIAL_ALTAR(): NextScreenChoices {
    CView.clear();
    CView.text("<b><u>Sacrificial Altar</u></b>\n");
    CView.text("This chamber clearly holds some kind of important significance to the witch coven.  The floor and walls are covered in shining white, reflective tiles, and a large number of carved jugs ring the outer edge of the room.  The entire place smells faintly of milk.  Sniffing, you close in on the source of the aroma.  It's emanating from what looks like a golden well, positioned dead-center before you.  The various containers also smell faintly of the alabaster treat, and oddly, you can't catch even a single whiff of spoilage; it all smells fresh.  There must be some magic at work.  Peeping over the edge of the well, you can barely make out what seems like a sea of milk stored below: white-capped ivory waves sloshing around in a chamber so large you can't see the walls of it.  It must be preserved through magic.\n\nThere is a doorway to the south and one on the north wall.");

    const choices: ScreenChoice[] = [];
    choices[0] = ["North", Area.travel(Rooms.THRONE_ROOM)];
    choices[6] = ["South", Area.travel(Rooms.CAVERNOUS_COMMONS)];

    return { choices };
}

registerArea(Rooms.THRONE_ROOM, [Rooms.SACRIFICIAL_ALTAR], DUNGEON_WITCH_THRONE_ROOM);
export function DUNGEON_WITCH_THRONE_ROOM(): NextScreenChoices {
    CView.clear();
    CView.text("<b><u>Sand Mother's Throne</u></b>\n");
    CView.text("This chamber is lit by swirling vortexes of magical colors, each hue dancing around another in coordinated motions.  The walls are made of hewn sandstone inlaid with ivory engravings that appear to depict what must be flowing milk.  Ahead there is a huge, white throne, also made from ivory.  It is a magnificent piece of craftsmanship.  Clearly, you have found the leader's throne room.  There is a robed figure atop it.");

    const choices: ScreenChoice[] = [];
    choices[2] = ["Approach", sandMotherStuffGOA];
    choices[6] = ["South", Area.travel(Rooms.SACRIFICIAL_ALTAR)];

    return { choices };
}
