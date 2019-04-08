import { Flags } from 'Engine/Flags';
import { Character } from 'Engine/Character/Character';
import { NextScreenChoices } from 'Engine/Display/ScreenDisplay';
import { CView } from 'Engine/Display/ContentView';
import { EffectType } from 'Content/Effects/EffectType';
import { ConsumableName } from 'Content/Items/ConsumableName';
import { passTime } from 'Content/Scenes/PassTime';
import { SpriteName } from 'Content/Display/SpriteName';
import { describeLegs } from 'Content/Descriptors/LegDescriptor';
import { Cock } from 'Engine/Body/Cock';
import { describeCocksLight, describeCock } from 'Content/Descriptors/CockDescriptor';
import { numToCardinalText } from 'Content/Utilities/NumToText';
import { describeHips } from 'Content/Descriptors/HipDescriptor';
import { describeBalls } from 'Content/Descriptors/BallsDescriptor';
import { mf } from 'Content/Descriptors/GenderDescriptor';
import { describeButt } from 'Content/Descriptors/ButtDescriptor';
import { bakeryuuuuuu } from 'Content/Scenes/Places/TelAdre/BakeryScene';
import { telAdreMenu } from 'Content/Scenes/Places/TelAdre';
import { displayModThickness, displayModTone } from 'Content/Modifiers/BodyModifier';

export const MaddieFlags = Flags.register("Maddie", {
    UNKNOWN_FLAG_NUMBER_00240: 0,
    UNKNOWN_FLAG_NUMBER_00241: 0,
    UNKNOWN_FLAG_NUMBER_00242: 0,
});

// VARS
// 240- first time meeting procced? 1 yes
// 241- mino explained what he needs yet?
// 242- baking happaned?  1 = yes, -1 = snuck out, -2 = seen her escorted out
// , 3 =stayed, 4 = epilogue'ed

// [Bakery One Off – Madeleine's Creation]
export function procMaddieOneIntro(player: Character): NextScreenChoices {

    if (MaddieFlags.UNKNOWN_FLAG_NUMBER_00240 === 0) {
        CView.text("You enter the bakery, savoring the sweet smells of sugar and baked goods.  A burly, hairy figure steps up beside you and places a strong hand on your shoulder.   The gravelly voice of the stranger says, \"<i>You ain't from around here.  Come.  I need your help.  Show you something.</i>\"  You turn to look, and are quite surprised when you see the horned visage of a minotaur ");
        if (player.body.tallness < 72) CView.text("looking down at");
        else if (player.body.tallness < 100) CView.text("staring levelly at");
        else CView.text("glaring up at");
        CView.text(" you. It releases your shoulder and starts walking towards an 'employees only' door.  Do you follow?\n\n");
        MaddieFlags.UNKNOWN_FLAG_NUMBER_00240 = 1;
    }
    // (REPEAT)
    else {
        CView.text("You walk into the bakery and a burly, hair-covered arm grabs your shoulder.  The familiar voice of a minotaur barks, \"<i>You.  You can help.  Come.</i>\"  You turn, but he's already walking towards an 'employees only' door.  Do you follow?");
    }
    return { yes: followMinotaurIntoBackroom, no: bakeryuuuuuu };
}
// [Follow]
function followMinotaurIntoBackroom(player: Character): NextScreenChoices {

    // 	(Not yet explained)
    if (MaddieFlags.UNKNOWN_FLAG_NUMBER_00241 === 0) {
        CView.text("You follow the burly beast through the door, turning several times as he leads you through the blisteringly hot ovens.  The minotaur is sweating heavily by the time you reach his destination, and for that matter so are you.  With all the musk boiling off of him, you find yourself wondering if he was just setting up an elaborate ruse to lure you into a sexual situation.  He grabs a white, fluffy hat and drops it on his head, firmly dispelling that notion as he tries to explain in as few words as possible, \"<i>I am cook.  I make great éclairs, but making masterpiece now.  Need special ingredients.  You get to leave city.  Bring me lust draft and honey.  Not pure stuff, too strong. Go.</i>\"\n\n");
        CView.text("You get a chance to look over his work station, noting the many bowls of batter, hundreds of massive eclairs, and the largest onahole you've ever seen.  ");
        if (player.effects.has(EffectType.MinotaurCumAddict)) CView.text("You lick your lips when you realize you're meeting the source of the 'special' éclairs.");
        else CView.text("You blush when you realize what he must be using for cream filling.");
        MaddieFlags.UNKNOWN_FLAG_NUMBER_00241 = 1;
        // [Give Them] [Leave]
        if (player.inventory.items.has(ConsumableName.BeeHoney) && player.inventory.items.has(ConsumableName.LustDraft))
            return { choices: [["Give Them", handOverIngredientsItBeBakingTimeYo], ["", undefined], ["", undefined], ["", undefined], ["Leave", nopeAintGotNoneODemSpeculIngredimathings]] };
        else return { choices: [["", undefined], ["", undefined], ["", undefined], ["", undefined], ["Leave", passTime(1)]] };
    }
    // (Explained)
    else {
        CView.text("You follow the burly chef through the door, winding through the familiar ovens.  By the time you reach his work area, you're both covered in a fine sheen of sweat and you find yourself responding to the minotaur musk unconsciously.  The strange chef turns to ask, \"<i>You have special ingredients now, yes?</i>\"");
        // [Yes] [Lie – No/Not Yet]
        if (player.inventory.items.has(ConsumableName.BeeHoney) && player.inventory.items.has(ConsumableName.LustDraft))
            return { choices: [["Yes", handOverIngredientsItBeBakingTimeYo], ["Lie - No", nopeAintGotNoneODemSpeculIngredimathings]] };
        else return { choices: [["No", nopeAintGotNoneODemSpeculIngredimathings]] };
    }
}

// [Not Yet/No]
export function nopeAintGotNoneODemSpeculIngredimathings(player: Character): NextScreenChoices {

    CView.text("The chef sighs and slams a fist into the counter hard enough to dent the metal and throw the bowls full of dough inches into the air.  A number of empty éclairs bounce and roll everywhere.  The minotaur looks back at you and snorts, \"<i>Best you go.  Don't come without ingredients.</i>\"\n\n");

    CView.text("Well, no point in ");
    if (player.stats.cor > 50) CView.text("starting a fight inside Tel'Adre");
    else CView.text("overstaying your welcome");
    CView.text(" – you depart.");
    return { next: bakeryuuuuuu };
}
// [Yes – baking]
export function handOverIngredientsItBeBakingTimeYo(player: Character): NextScreenChoices {

    player.inventory.items.consumeItem(ConsumableName.BeeHoney);
    player.inventory.items.consumeItem(ConsumableName.LustDraft);
    CView.text("You hand the lust draft and bottled honey to the minotaur, doing your best to ignore his potent, lust-inducing pheromones as you watch him work.  He grabs the batch of dough he had been kneading and pours in the lust draft, snorting aggressively once the bubbling drug's smell reaches his bovine nostrils.  Next, the bull-like chef reaches over to grab a bottle marked 'P.S.M.', uncorking and pouring it in one practiced motion.   The white fluid froths dangerously on contact with the pink lust draft, and a second later the honey is in there too.  Finally, he flips up his loincloth and reaches for the onahole.\n\n");

    CView.text("The sex-toy drips with lubricant and twists in the minotaur's hands, indicating magical enhancement or goblin manufacture.  He slides in, sighing as his four, basketball-sized testes pull close to his body, twitching.  Two quick pumps later, he's howling, hips twitching as spurts of white leak from the onahole into the bowl.  With remarkable restraint, he stops himself after adding a cup of spunk, even though his balls are still huge and quivering.");
    if (player.effects.has(EffectType.MinotaurCumAddict)) CView.text("  You lurch forward involuntarily, craving the rest of his jism, but he pushes you into the wall and grunts, \"<i>No,</i>\" in a tone that brooks no disagreement.  It actually shocks you out of your addicted haze.");
    CView.text("\n\n");

    CView.text("Grabbing a whisk, the bull-man starts stirring the sex-filled dough with vigor, mixing the thickening blend hard enough to make his biceps ripple.  A moment later, he lifts the bowl one-handed and pulls out a giant, novelty cupcake mold from the counter. After filling the mold, the chef throws it onto his burly shoulder and grabs a sack of actual icing.  A terse grunt instructs, \"<i>Wait at tables.  You can try some when done.</i>\"  ");
    if (player.effects.has(EffectType.MinotaurCumAddict)) CView.text("  Your mouth salivates at the thought.");
    else CView.text("You aren't sure you want to.");
    CView.text("\n\n");
    if (player.effects.has(EffectType.MinotaurCumAddict)) return { next: waitForSlutCake };
    // [Wait] [Sneak Out]
    else return { choices: [["Wait", waitForSlutCake], ["Sneak Out", sneakAwayFromMaddie]] };
}

// [Sneak Out]
function sneakAwayFromMaddie(player: Character): NextScreenChoices {

    CView.text("You get out before he can find you again.  Whatever he's making is nothing you ever want to taste.");
    // (No more mino chef)
    MaddieFlags.UNKNOWN_FLAG_NUMBER_00242 = -2;
    return { next: passTime(1) };
}

// [Wait/Next]
function waitForSlutCake(player: Character): NextScreenChoices {
    CView.sprite(SpriteName.Maddie); // 39;

    CView.text("You walk back into the bakery proper, feeling more than a little ");
    if (player.stats.cor < 33) CView.text("antsy");
    else if (player.stats.cor < 66) CView.text("nervous about this whole thing");
    else CView.text("intrigued by this whole thing");
    CView.text(".  One of the waitresses brings you a glass of milk, and ");
    if (player.stats.cor < 50) CView.text("it smells normal enough, so you go ahead and sip on it");
    else CView.text("you sip on it while you wait");
    CView.text(".  After what feels like an eternity, you get sick of waiting and push through the door into the bakery's backrooms to see what the hold-up is.  The minotaur isn't at his usual workstation, and doesn't look to have been there in quite some time.\n\n");

    CView.text("Where could he have gone?  You backtrack through the ovens, looking down side-paths and searching through the labyrinthine storage rooms.  Just when you're about to give up, you hear an airy, light-headed giggle from the next room.  You peek around the corner and gasp in absolute shock.  The minotaur is pinned to the wall, his wrists stuck in place by what looks like hardened, white icing.   On top of him is the strangest - no, ONLY, cupcake-woman you've ever seen.\n\n");

    CView.text("She's taller than the imprisoned minotaur, and wider too.  The pastry-girl's skin is slightly porous, colored light chocolate and gleaming in the dim light where it isn't covered by shining, blue-iced 'clothes'.  Her hair is white as whipped cream, and tied back with a cinnamon bun.  Her curvaceous form turns, jiggling ever so slightly as she takes you in with her green, gum-drop eyes and revealing her whipped-cream bra.  The novelty cup-cake mold is balanced atop her head, worn like a comparatively tiny fez.\n\n");

    CView.text("The minotaur chef is still wearing his poofy hat, but he's pinned completely and irrevocably under this baked behemoth as she bounces and grinds on his convulsing member.  While you watch, his balls shrink smaller and smaller, emptying their pent up, steamy cargo directly into the cupcake's soft, cushiony center.  She grows larger from the sudden intake of fresh jism, giggling as she drains every drop from her creator.  \"<i>Tee-hee!  Mmm, you're like, delicious and stuff, creat- cr... dad!  So sticky and yummy, just like me!</i>\" exclaims the fluffy slut-cake.\n\n");

    CView.text("Utterly shocked and drained, the chef-o-taur's eyes roll back in his sockets.  He slumps weakly under his creation as she bounces a few last times, futilely trying to squeeze more cum from the slumping minotaur-dick.  The cupcake-girl rises at last, not with yeast, but with a new-found purpose.  The reflective, alien surface of her eyes locks against your groin as she takes one lumbering step after another in your direction.  Her massive, spongy tits wobble dangerously close to you, nearly entrancing you with their beautiful, unnatural curves.\n\n");

    CView.text("Running seems like a very good idea.  Who knows what she has planned for you?");
    // [RUN] [TRY TO TALK]
    return { choices: [["Run Away", runAwayFromMaddiiiieee], ["TryToTalk", talkToMaddie]] };
}

// [RUN DAFUQ AWAY]
function runAwayFromMaddiiiieee(player: Character): NextScreenChoices {
    CView.sprite(SpriteName.Maddie); // 39;

    CView.text("You turn tail to run, evacuating the room before that culinary catastrophe can have her way with you.  A high-pitched whine chases you away as the cupcake-girl cries, \"<i>Nooooo... come back!  I'm making so much filling for you!</i>\"  Her words lend you even greater speed, and you vacate the city in record time.\n\n");
    MaddieFlags.UNKNOWN_FLAG_NUMBER_00242 = -1;
    return { next: passTime(1) };
}

// [Followup to run away]
export function runAwayMaddieFollowup(player: Character): NextScreenChoices {
    CView.sprite(SpriteName.Maddie); // 39;

    MaddieFlags.UNKNOWN_FLAG_NUMBER_00242 = -2;
    CView.text("You return to a strange sight indeed.  Urta and Edryn are leading a procession of over thirty city guards, arranged in a loose circle around the cupcake-girl.  Her comparatively tiny, tin-foil fez is gone, along with most of her blue-iced 'armor'.  She looks weak, pathetic, and beaten as she's prodded with spears and escorted from the city, never to return again.  Vanilla-scented tears stain the pavement behind her, leaving a trail the whole way back to the bakery.\n\n");
    return { next: telAdreMenu };
}

// [TRY TO TALK]
function talkToMaddie(player: Character): NextScreenChoices {
    CView.sprite(SpriteName.Maddie); // 39;

    CView.text("You try to speak as calmly as you can in the face of a giant, jiggling sex-pastry, but she ignores your demands to 'wait', 'listen', or 'stop'.  Sponge-cake-soft fists envelop your arms, lifting you from the ground to pin you against some flour sacks.   The cherries covering the cupcake-girl's whipped-cream bra drop off, pushed away by two candy-pink nipples the size of water bottles.  As one, they discharge thick splorts of thick, gooey icing to splatter over the length of your exposed arms.  It hardens nigh-instantaneously in the comparatively cool air, and you're helpless to do anything but squirm as she applies the same treatment to your " + describeLegs(player) + ", immobilizing you completely.\n\n");
    CView.text("The cock-crazed confection looks down at you and nods, a satisfied smile spreading over glistening, pale blue lips.  She breathlessly exclaims, \"<i>My creat- cr... Dad ");
    if (player.body.cocks.length > 0) CView.text("is like, all out of icing mix!  So I'm going to borrow a few cups from you, 'kay?");
    else CView.text("gave me so much icing mix, and you like, would look soooo much better with some vanil- van... yummy frosting!");
    CView.text("</i>\"  She's... what!?\n\n");
    // (FORK BETWEEN MALE/NONMALE)
    // (MALE)
    let cockThatFits = player.body.cocks.find(Cock.CockThatFits(60));
    if (!cockThatFits) cockThatFits = player.body.cocks.get(0);
    if (cockThatFits) {
        CView.text("\"<i>Dad said my name is Madeleine, but that's no fun.  Just call me Maddie.  You've got lots of icing like Dad, right?  I-I... need more icing.  It's in my recipe,</i>\" says Maddie.  The baked broad strips your " + player.inventory.armor.displayName + " to expose your " + describeCocksLight(player) + ".  Cooing with excitement, she examines your ");
        if (player.stats.lust >= 75) CView.text("rock-hard");
        else CView.text("hardening");
        CView.text(" shaft");
        if (player.body.cocks.length > 1) CView.text("s");
        CView.text(", running a sponge-soft hand over the love-muscle.  You rock your hips, trying to squirm away.  Maddie laughs, breathily chortling while her well-rounded breasts slide to either side of you and pin you to the wall.\n\n");

        CView.text("\"<i>So is this like, where the icing spouts out right?</i>\" asks the confectionery cutey, squeezing you softly.  \"<i>Awww, how sad – yours is stuck, just like Daddy's!  I'll have to squeeze and rub it until it'll let out the icing.</i>\"\n\n");

        if (player.stats.cor < 33) CView.text("You muster as much authority as you can in such a compromising position and explain to Maddie that what comes out of there is NOT icing.");
        else if (player.stats.cor < 66) CView.text("You offhandedly mention that you don't actually make icing.");
        else CView.text("You smirk and mention that what you squirt isn't quite icing.");
        CView.text("  \"<i>Liar!  If that wasn't icing, then why would Daddy have put his in all those eclairs and me?</i>\" retorts the busty cupcake, continuing on to say, \"<i>I know, I can suck it out!</i>\"  She purses her jelly-like lips and plunges forward, slurping all " + numToCardinalText(Math.floor(cockThatFits.length)) + " inches into her oven-warmed esophagus.  Your protests are cut off by the tightness squeezing around your " + describeCock(player, cockThatFits) + ".  It milks you in rippling motions, buttery-slick and pulsing hungrily.\n\n");

        CView.text("A half-melted tongue ");
        if (!player.body.cocks.find(Cock.HasSheath)) CView.text("encircles the base");
        else CView.text("pokes and prods into your sheath");
        CView.text(", leaving a syrupy residue trailing over your " + describeCock(player, cockThatFits) + ".  You groan, sagging into the sugary suspension.  The strength is completely gone from your limbs, stolen by the pastry's prick-devouring maw.  Her shining eyes look up to gloat once she realizes how completely you've submitted to her ministrations, and in no time, her cake-soft hands catch and squeeze your " + describeCock(player, cockThatFits) + " into the gargantuan swell of her spongy breasts.  A smile crosses your face as you get pleasured by the motherly mounds and the familiar, sweet smell that Maddie exudes.\n\n");

        CView.text("Suction starts, hollowing the cupcake-girl's plush cheeks into a concave, cock-slurping form.  The constant squeezing of your " + describeCock(player, cockThatFits) + " combines with the sucking to make you swell larger inside Maddie's gullet while she kisses your groin.  The confection's oral charms show no signs of stopping as she noisily slurps away at her treat, and her pillowy breasts are so spongy-soft and calming that you're happy to let her sample your 'icing' if it means you can feel like this.  Your " + describeHips(player) + " push back into the baby blue lips, pumping and thrusting as your instinct to fuck and breed takes over, working your " + describeCock(player, cockThatFits) + " in and out of the pastry's puckered mouth.\n\n");

        CView.text("Maddie pushes further forward, her bosom crushing you against the wall to hold your hips immobile while she sucks harder and harder.  Your cock balloons from the suction, thickening inside her neck and beginning to twitch from the irresistible fellative pleasure. An orgasm grows in your " + describeBalls(true, true, player));
        if (player.body.balls.count > 0) CView.text(", the cum-heavy spheres bouncing in your twitching sack as they get ready to explode");
        CView.text(".  Maddie squeezes her puckered cock-suckers tight around the turgid shaft while she whips her melty tongue in circles around it.  Your climax hits like a hammer-blow to the temple, knocking the thoughts from your head while you pump rope after rope of 'icing' down the cupcake's dick-gripping neck-hole.  The suction relaxes as you fill the ravenous pastry with your seed and let your head limply sink deeper against the cushion of her sponge-cake-soft breast.\n\n");

        CView.text("Maddie milks you for what seems like ages");
        if (player.body.cocks.length === 1) CView.text(", your " + describeCock(player, cockThatFits) + " emptying every drop of jizz into the baked cum-tank.");
        else {
            CView.text(" while her skin absorbs the generous donation of your other member");
            if (player.body.cocks.length > 2) CView.text("s");
            CView.text(".");
        }
        CView.text("  When the jizz-guzzling pastry-girl pulls back at last to free your empty member, it's coated from top to bottom in gooey blue jelly, though it's tinged white in places.  The milked-out member slowly softens");
        if (player.body.cocks.length > 1) {
            if (player.body.cocks.length === 2) CView.text(" along with your other penis");
            else CView.text(" along with your other dicks");
        }
        CView.text(".  Satisfied, your body goes limp and sags against the wall while your face leans on the cupcake-girl's departing breast.\n\n");

        CView.text("The cream-filled creation leans back and squirts some more icing onto the straps holding you, but instead of reinforcing the bonds, it eats through the hardened confection to release you into her waiting bosom.  She catches you in the pillowy chest-embrace, stroking your hair while she says in a sing-song voice, \"<i>Thanks for all the icing " + mf(player, "mister", "miss") + "!  I think I have enough for now.  I think I'll go like, check on my Dad and stuff.  Maybe he wants to add some icing to the recipe?</i>\"\n\n");

        CView.text("Oven-warmed tiles kiss your exposed " + describeButt(player) + " as you're gently placed on the floor next to your discarded equipment.  Exhausted and satiated as you are, your eyes drift closed, lulling you into slumber.\n\n");

        CView.text("<b>Later...</b>\n");
        CView.text("You're woken by a furry hand squeezing your shoulder and violently shaking you around.  With such rough treatment, you snap to full alertness in no time.  The minotaur chef is smiling down at you, the expression looking quite strange on his bestial muzzle as he says, \"<i>Sorry.  Experiment backfired.  Glad you gave her what she needed.  Much calmer now.  Will make great assistant.</i>\"\n\n");
        CView.text("Once the beast-man has finished talking you realize the cupcake-girl, Madeleine, is standing behind him.  Her blue-iced 'clothes' have been remade, shaped into a form-fitting apron that accentuates her massive, otherworldly curves.  The minotaur chef utters, \"<i>We go now.  Get dressed.  Maybe sometime can visit Maddie.</i>\"  Maddie claps her hands, bouncing and jiggling with excitement as the two of them leave you there to get dressed.");
    }
    // (FEMALE/Genderpoots)
    else {
        CView.text("\"<i>Dad said my name is Madeleine, but that's no fun.  Just call me Maddie!</i>\" exclaims the airheaded pastry.  You briefly wonder if the yeast is to blame for her state, but you stifle the involuntarily giggle that rises with the stray thought.  Now is hardly the time for such frivolous rambling!  You shout with equal parts terror and rage, demanding she remove her sugary bondage from you immediately.  She looks at you with her alien eyes full of confusion, as if she doesn't comprehend a word you're saying.\n\n");

        CView.text("A nipple is forced between your still-protesting lips, plugging your noise-hole before you can complain further.  Maddie gleefully cheers, \"<i>There we go... now we just need to get some magic icing in you so you'll feel nice and yummy and like, relaxed!</i>\"  Oh no – you don't know what she means by magic icing, but whatever it is, it can't be good.  First, you try to spit the spongy areola out.  It pushes back with incessant pressure, flooding your mouth with cake-like sweetness immediately.  You try to bite down.  Maybe pain will make her draw back?  It doesn't work, and if anything, it just starts the flow of icing.\n\n");

        CView.text("It's delicious – creamy, gooey, and sugary-sweet while at the same time as fluid as mother's milk. You swallow the first mouthful reflexively before you remember you were trying to avoid this exact fate.  The thick icing coats your esophagus with the cupcake's warm secretion. It radiates gentle, oven-like heat throughout you, clouding your mind and dulling your vision with its hazy warmth.  You relax against your saccharine bonds nervelessly and begin to drink of your own volition.\n\n");

        CView.text("\"<i>Shhh, shhh... that's a good " + mf(player, "boy", "girl") + ".  Isn't my icing the absolute best?</i>\" she verbally gushes, just like the nipple between your teeth.  \"<i>Drink up");
        if (player.body.thickness < 60) CView.text(", you're looking awful thin");
        else if (player.body.tone >= 70) CView.text(", you look like you're carved from stone.  A little softness would do you good");
        else CView.text(", you look like you'd better eat to keep up your gorgeous figure");
        CView.text(".  Mmm, don't let it like, spill or nothing!  I'm making this icing special and yummy so you'll feel super good and stop struggling an' stuff.</i>\"  Her voice is as candy-sweet as the milk you're guzzling.  The sound of messy slurps and noisy, gulping swallows fills the air of the small back room.\n\n");

        CView.text("The weighty breast and its spongy nipple retreat, popping from your questing lips.  You whine weakly in disappointment at the sudden disappearance of your treat, licking and smearing the white cream over your already icing-smeared mouth.  Maddie grabs her other tit with a two handed grip and struggles with the wobbling mass while she aims her unused nipple your way.  The areola heaves, bulging out like an overfilled balloon.  The nipple wiggles in place from the pressure, stretching out around the sides until it looks ready to rupture.  Creamy confection beads at the tip, slowly forming a fat, sticky drop that hangs down and threatens to fall to the floor.  Before it falls, the nipple pulses one last time and opens up a flow of icing.  It's like watching a dam burst – awe-inspiring for the first few seconds until the torrent of fluid begins to drown you.\n\n");

        CView.text("You rock back as the gushing stream impacts your solar plexus, splattering the frosty white stuff into a spray of rain.  Goop rains and explodes all around, and Maddie just giggles and moans while she guides the flow over every inch of your form, drenching you in sugary sweetness.  You swallow nearly as much as you spit and sputter.  After a few moments you just kind of open wide and sigh, hoping she'll hold it in your mouth and hit you with enough force to pump it into your gurgling gut.\n\n");

        CView.text("\"<i>Ohhh, you look good enough to eat!</i>\" exclaims Maddie.  Meanwhile, your restraints slowly liquify under the warm, sugary strikes.  They stretch lower and lower, letting you sink into the soft, half-melted pile of icing.  At last the icing-based bindings snap, letting you sink into the sweetened mass as if it was a giant cushion.  Maddie sighs, giving a few last, fickle squirts that splatter in your hair before her flow completely stops.\n\n");

        CView.text("\"<i>Ooooh look at you!  You're all sticky-sweet and soft!  Gosh, I bet all the horny boys and girls would love to lick you right up!</i>\" exclaims the excited cupcake-girl.  She licks a drop of stray icing from one of her plump digits before she utters with a voice full of worry, \"<i>I'm all out of icing.  N- no one will like me if I don't have icing!  Thanks for playing, but I'd better go get some more cream filling from daddy.  You stay still and don't go anywhere until you've eaten all the icing, 'kay?</i>\"\n\n");

        CView.text("The pudgy pastry flounces off, leaving you to wallow in the pile of syrupy cream she leaves behind.  You're so placid and relaxed from her drugged icing that you obey thoughtlessly, shoveling heaping handfuls into your mouth.  Handful after handful, you devour the creamy, drugged topping that's piled up around you.  Somehow it doesn't burst your belly with its sheer volume, but it does make your tummy rumble and protrude slightly ");
        if (player.body.thickness < 60 || player.body.tone >= 50) CView.text("forward");
        else CView.text("more forward than normal");
        CView.text(".  After a time it overwhelms you and you fall into a fitful slumber.\n\n");

        CView.text("<b>Later...</b>\n");
        CView.text("You're woken by a furry hand squeezing your shoulder and violently shaking you around.  With such rough treatment, you snap to full alertness in no time.  The minotaur chef is smiling down at you, the expression looking quite strange on his bestial muzzle as he says, \"<i>Sorry.  Experiment backfired.  Glad you okay.  Gave her more filling and all calm now.  Will make great assistant.</i>\"\n\n");

        CView.text("Once the beast-man has finished talking you realize the cupcake-girl, Madeleine, is standing behind him.  Her blue-iced 'clothes' have been remade, shaped into a form-fitting apron that accentuates her massive, otherworldly curves.  The minotaur chef utters, \"<i>We go now.  Get dressed.  Maybe sometime can visit Maddie.</i>\"  Maddie claps her hands, bouncing and jiggling with excitement as the two of them leave you there to get dressed.");
        CView.text(displayModThickness(player, 100, 10));
        CView.text(displayModTone(player, 0, 10));
    }
    MaddieFlags.UNKNOWN_FLAG_NUMBER_00242 = 3;
    return { next: passTime(1) };
}

// [Next visit to the bakery...]
export function bakeryEpilogue(player: Character): NextScreenChoices {

    CView.text("As soon as you enter the bakery, one of the waitresses pulls you aside.  She positively beams as she hands you a note and says, \"<i>One of our chefs wanted me to give you this.  I didn't even know he could write!  I mean, where does a minotaur learn to handle a pen?</i>\"  You smirk, waving her away before you open up the minotaur's note.\n\n");
    CView.text("\"<i>Thanks.  Figured out what went wrong with Maddie's help.  Made masterpiece.  Buy giant cupcake sometime.  Delicious!  Promise it's safe and non-addictive.  Expensive though.  Ingredients rare.\n\n");
    CView.text("-X</i>\"");
    MaddieFlags.UNKNOWN_FLAG_NUMBER_00242 = 4;
    return { next: bakeryuuuuuu };
}
