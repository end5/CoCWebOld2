import { Character } from 'Engine/Character/Character';
import { NextScreenChoices, choiceWrap, ScreenChoice } from 'Engine/Display/ScreenDisplay';
import { randInt } from 'Engine/Utilities/SMath';
import { passTime } from 'Content/Scenes/PassTime';
import { CView } from 'Engine/Display/ContentView';
import { Cock, CockType } from 'Engine/Body/Cock';
import { playerMenu } from 'Content/Menus/InGame/PlayerMenu';
import { describeCock, describeCocksLight, describeCockHead } from 'Content/Descriptors/CockDescriptor';
import { displayStretchVagina, attemptKnockUp } from 'Content/Modifiers/VaginaModifier';
import { skinFurScales, describeSkin } from 'Content/Descriptors/SkinDescriptor';
import { PregnancyType } from 'Content/Body/Pregnancy/PregnancyType';
import { IncubationTime } from 'Content/Body/Pregnancy/IncubationTime';
import { mf } from 'Content/Descriptors/GenderDescriptor';
import { describeHair } from 'Content/Descriptors/HairDescriptor';
import { Area } from 'Content/Area';
import { Settings } from 'Content/Settings';
import { describeFaceShort } from 'Content/Descriptors/FaceDescriptor';
import { BreastRow } from 'Engine/Body/BreastRow';
import { DesertCaveFlags } from 'Content/Scenes/Dungeons/DesertCave/Rooms';

export function defeatedByCumWitch(player: Character, cumWitch: Character): NextScreenChoices {
    if (player.body.cocks.length > 0 && (player.body.vaginas.length <= 0 || randInt(2) === 0)) {
        if (randInt(2) === 0) return TDMsLoseToCumWitchScene(player, cumWitch);
        else return repeatLoseToCumWitchForDudes(player, cumWitch);
    }
    else if (player.body.vaginas.length > 0) {
        return savinMakesAwesomeFemdom(player, cumWitch);
    }
    else return { next: passTime(1) };
}

// *Victory Intro
export function cumWitchDefeated(player: Character, cumWitch: Character): NextScreenChoices {
    CView.clear();
    // (HP)
    if (cumWitch.stats.HP < 1) CView.text("The chocolate-skinned witch collapses down onto her hands and knees with the tattered remnants of her robes swirling about her.  With her clothing destroyed, you're treated to the perfect view of her semi-erect cock and swollen testes swaying enticingly beneath her, paired with the glimmering wetness of her juicy cunny - also on display.  Her udder-like melons sway and jiggle in sympathy to her uncoordinated swaying.  She grumbles, \"<i>You've beaten me, interloper...</i>\"");
    else CView.text("The chocolate-skinned witch collapses down onto her hands and knees, shredding her robes as she goes.  Her throbbing-hard cock drips with precum above her quaking testes while her equally enticing pussy looks positively soaked with feminine lubricants.  She rolls onto her back, tits jiggling wildly, and jams both her hands into her groin, masturbating furiously.  Panting, the witch moans, \"<i>You win... ooooohhh...  Come over here and fuck me!  Please!</i>\"\n\nWell, she did ask nicely...");
    DesertCaveFlags.CUM_WITCH_DEFEATED = 1;

    const choices: ScreenChoice[] = [];
    if (player.body.cocks.length > 0) {
        // *Male "Too Big" Victory Sex
        if (player.body.cocks.sort(Cock.Largest).get(0)!.area > cumWitch.vaginalCapacity()) choices[0] = ["Too Big Fuck", maleTooBigVictorySex];
        // *Male Victory Sex
        if (player.body.cocks.find(Cock.CockThatFits(cumWitch.vaginalCapacity()))) choices[1] = ["Fuck Her", choiceWrap(menFuckUpSomeCumWitch, cumWitch)];
    }
    // Tentacle Victory Gangbang
    // 3+ Tentas
    if (player.body.cocks.filter(Cock.FilterType(CockType.TENTACLE)).length >= 3) choices[2] = ["Tentacles", tentacleVictoryGangbangCumWitch];
    // Female Victory Sex
    if (player.body.vaginas.length > 0) choices[3] = ["Ladysex", choiceWrap(ladyVictorySex, cumWitch)];

    if (inCombat) {
        if (cumWitch.stats.HP >= 1) choices[9] = ["Leave", declineSandWitch];
        else choices[9] = ["Leave", passTime(1)];
    }
    else choices[9] = ["Back", playerMenu];

    return { choices };
}

// *Decline Sex
export function declineSandWitch(player: Character): NextScreenChoices {
    CView.clear();
    CView.text("Dusting yourself off, you lower your [weapon] and leave the cum witch to recover from the humiliation of losing to you.  The haunted, hungry look in her eyes leaves little doubt that she'll challenge you again or that she still wants to fuck you.  For now, she slips down into her own puddled cum, idly touching herself.");
    if (inCombat)
        return { next: passTime(1) };
    else return { next: playerMenu };
}

// *Male Victory Sex
export function menFuckUpSomeCumWitch(player: Character, cumWitch: Character): NextScreenChoices {
    CView.clear();
    const firstCockThatFits = player.body.cocks.find(Cock.CockThatFits(cumWitch.vaginalCapacity()));
    const secondCockThatFits = player.body.cocks.filter(Cock.CocksThatFit(cumWitch.vaginalCapacity())).get(1);
    CView.text("You shuck out of your [armor] in eager anticipation, [eachCock] aleady ");
    if (player.stats.lust < 50) CView.text("half-hard");
    else CView.text("rock-hard");
    CView.text(" and pulsing with growing readiness.  The cum witch looks up at you with disdain, but the rigidity of her shaft and sloppy wetness of her flushed quim leave no doubt as to her state.   Her body blushes honestly as you reposition her, spreading her legs nice and wide.  You have to lift her hefty sack to expose the thick, wet lips of her pussy.  Jumping in response, her fat cock oozes a trickle of precum onto her dusky belly, oiling her dusky skin into a sensual shine.");

    CView.text("\n\n\"<i>You think THAT compares to m-my wondrous... perfect penis?  I've knocked up more women than youUUU-</i>\" she taunts until you cut her off with a well-placed thrust.  [OneCock] vanishes ");
    if (player.body.cocks.find(Cock.CockThatFits(cumWitch.vaginalCapacity()))) CView.text("most of");
    else CView.text("all of the way");
    CView.text(" inside her, sheathed deep in her under-used twat.  Her tight passage fits around your " + describeCock(player, firstCockThatFits) + " like a custom-made glove, a slippery warm embrace that threatens to rob you of your very reason.  The witch begins pumping her ebony cock along with the motions of your hips, throwing her head back in wordless pleasure that only a true hermaphrodite can experience.");
    if (player.body.vaginas.length > 0) CView.text("  Two can play at that game.");
    // Herm sexback
    if (player.gender === 3) {
        CView.text("\n\nYou pivot around so your [butt] is facing her and your dick is spearing straight down into her honeyed vise.  It's less pleasurable than your previous position, at least until you yank the dickgirl's cock out of her hands and ram it into your slit, fucking both her virile tool and fertile cunt at the same time.  Your futanari lover finally gives in the pleasures of the act and stops resisting.  She begs, \"<i>Yes, don't stop!  Fucking ride me!  By the mothers, that's good!</i>\" while her hips lift against your, slamming hard into your groin with echoing force.");
        // cuntchange
        displayStretchVagina(player, cumWitch.body.cocks.sort(Cock.Largest).get(0)!.area, true, true, false);

        CView.text("\n\nDetermined to ride this rebellious cow into submission, you match her motions thrust for thrust and pump for pump, pushing harder and harder into the ground with each contact.  In no time, you're both covered in a fine sheen of sweat, recklessly rutting with the force of four animals trapped in two meager bodies.  Daringly, the witch begins to spank your [butt] with each concussive clap of crotches, only adding to the cacophony of noisy slaps.  You can't do anything but scowl in displeasure due to your positioning, even though the hits make your cock throb and your pussy clench.");

        CView.text("\n\n");
        if (player.body.balls.count > 0) CView.text("Your sweaty nutsacks slide over each other while you fuck, compressing together into a mass of sweaty orbs twitching against each other in a competition to disgorge their frothy load before the other.");
        else CView.text("Her sweaty nutsack glides over your " + skinFurScales(player) + " as you fuck, compressing and twitching against you as it begs to discharge its frothy load.");

        CView.text("\n\nFortunately, the feverish fucking reaches a simultaneous crescendo with a bone-jarring clap of sex to sex, male and female joined together in perfect, ecstatic harmony.  The brutal ass-slapping immediately turns into passionate, worshipful groping as the witch cums with you.  Both of your cum-bloated tools explode inside the other, disgorging thick flows of seed to paint the matching womb white, balls visibly shrinking as they empty at last.");
        if (player.cumQ() > 2000) CView.text("  Of course, you outlast even the jizz-witch's magics, plugging her so full of semen that her belly rounds into a gravid orb while yours remains only slightly bloated.");
        else if (player.cumQ() > 1000) CView.text("  Of course, you both manage to bulge each other's bellies with sexual discharge.");
        else CView.text("  Of course, she cums far longer and harder than you, plugging your belly full of semen until it has a slightly fecund curve to it.");

        CView.text("\n\nRising slowly, you withdraw yourself from the goo-glazed pussy beneath you and try to ignore the matching river of white that pours out from betwixt your thighs.  You make sure to lean over your onyx lover, salting her with her own dripping seed until the flow slows to a trickle.  She meekly protests at first, then gives up with a lusty sigh, smearing her skin with pristine white as her mind slides back into the gutter.  You make sure to admire your work while you get dressed.");
        // (cum, then +5 lust){preg check for sammitches}
        // sand witch preg
        attemptKnockUp(player, PregnancyType.SAND_WITCH, IncubationTime.SAND_WITCH, 90);
        player.orgasm();
        player.stats.lust += 5;

    }
    // DP Males
    else if (secondCockThatFits) {
        CView.text("\n\nScowling, you pull her hand away from her bouncing, super-hard rod and say, \"<i>You want to feel twice the pleasure?  Then feel THIS!</i>\"  You punctuate the declaration by pulling back and aligning your " + describeCock(player, secondCockThatFits) + " with her back-door, slamming it home without waiting.  She winces in pain and shock, looking up at you aghast but wordless.  Smirking, you twirl a thick lock of her blonde hair about your fist and yank her up for a kiss, tonguing her mouth with the same brutal, forceful intensity that now violates her anus.  The woman screams in pleasure and pain, tongue-fucking back with hateful passion as her muffled cries fade away.");

        CView.text("\n\nThough she still grapples with you, her silken tunnel is soon anxiously squeezing your " + describeCock(player, firstCockThatFits) + ", and her tight pucker gradually loosens.  Even relaxed, it still flutters with a tight warmth that far exceeds her pussy.  You could almost grow addicted to it.  The hapless brown-skinned goddess milks the " + describeCock(player, secondCockThatFits) + " in her butt while her engorged nipples press against your own, sliding slickly over your sweaty skin.  You bite her lip and pound her all the harder, mounting her with hard pounding strokes.  This is entirely about getting YOUR " + describeCocksLight(player) + " off, and you don't worry in the least about her pleasure.");

        CView.text("\n\nThe witch weakly tries to grab at her cock again while you brutalize her ass, but you crudely slap one of her breasts.  She squeezes and drips thick ribbons of pre-cum at the harsh contact.  Well, if that's what she wants...  You begin slapping her tits in time with your thrusts, pounding the mammaries until the dusky, sweat-oiled skin is flushed red in irritation.  Her nipples seem even bigger and harder from the abuse, and once you tire of the pleasant jiggle your strikes induce, you grab one of the chest-buds and pinch, hard.");

        CView.text("\n\nA torrent of thick herm-cream spouts from the woman's neglected erection as you utterly abuse and humiliate her.  Taking this as your signal to go balls out, you twist that nipple sideways and rut her like a " + mf(player, "man", "woman") + " possessed, slapping both cocks into her spasming holes non-stop until you feel the heat surging in your loins, ready to explode inside her.");

        CView.text("\n\nYou ask, \"<i>Are you ready, bitch?</i>\" to the blubbering, orgasmic wreck, and when she fails to answer, you yell out in pleasure and cum.  Jizz ");
        if (player.cumQ() < 250) CView.text("pours out of your dual cum-slits, making a sloppy mess of both holes.");
        else if (player.cumQ() < 500) CView.text("gushes out of your dual cum-slits, soaking both holes in and out with pearly white.");
        else if (player.cumQ() < 1000) CView.text("gushes out with incredible force from your dual cum-slits, quickly plugging both holes so full of seed that the witch's belly slowly rises, cum-inflated.");
        else CView.text("washes out of your dual cum-slits in a tidal wave, flooding the hungry holes with your virile seed.  You cum and cum, spunking up the witch's belly.  First it bulges slightly, but all too soon you have it rounded into a pregnant dome.");
        CView.text("  The bouncing girl-cock above the woman's gushing pussy does a fine job of painting her belly and bust white.  It spurts rope after rope onto her chocolate-toned flesh, and soon she looks more like an icing-drizzled tart than a formidable foe.");
        CView.text("\n\nFeeling empty and sated, you unsheath your double dongs to reveal the fruits of your labors - a pair of juicy creampies, one vertical, the other small, puckered, and oozing.");
        player.orgasm();
    }
    // Regular Dicking
    else {
        CView.text("\n\nPulling the disobedient wench's hand away, you scold, \"<i>Tsk tsk, naughty bitches don't get to have cocks.</i>\"  She pouts like a petulant child and idly blows a lock of blonde hair out of her face, sticking her lower lip out even further. Laughing, you pinch her cheek and tease, \"<i>Come on, if you wanted to fuck for fun, you shouldn't have tried to force yourself at me.  Until you learn how to be polite, your dick is mine to control");
        // (silly:) CView.text(", and I don't want it.  I think it's messy");
        CView.text(".</i>\"");

        CView.text("\n\nThe spellcaster's lube-oozing entrance seems to get wetter at your authoritative denial, so you keep at it, fucking her slowly and idly batting away any attempt from the woman to touch herself.  It isn't until she gives up and gently grabs your shoulders that you give her a smile ");
        if (player.stats.cor < 50) CView.text("and a hint of compassion");
        else CView.text("and finally deign to let her have some pleasure");
        CView.text(".  You gradually increase the tempo of your lovemaking and let your hand lazily drift lower, grabbing the witch by her soft, supple thigh.  Her skin is warm and flushed (or as flushed as ebony skin can get), and the higher your fingers reach, the damper it gets.  Gently, you prod around her lips and your own maleness to find the hardness of clit.");

        CView.text("\n\nThose beautiful onyx thighs cross behind your back as soon as you bump the enchantress's buzzer.  One heel hooks over the other, and they flex encouraging, begging you to pull deeper inside the sexy black minx's twat.  Your cock is in heaven, held deep in a steamy velvet embrace that caresses it with the touch only a skilled lover provide.  Breathing heavily, you lean over the woman as you rhythmically fuck her.  Her arms entwine around your neck, caressing your shoulders and back with previously unseen tenderness.");

        CView.text("\n\nYou kiss up the lady's lithe neck to her ear and whisper, \"<i>That's better,</i>\" just before giving her lobe a soft nibble.  She looks up at you when you pull back, partly confused and more than a little lust-lost, licking her lips and asking, \"<i>Harder... please?</i>\"");

        CView.text("\n\nBrushing back the blond tresses, you give a gentle nod and begin to move faster, sawing your " + describeCock(player, firstCockThatFits) + " through the velvet tunnel faster and faster.  She arches her back hard enough to lift her tits to your mouth, and you greedily suckle one, allowing your fingers to dive down into her spasming cleft to rub her button.  Throughout it all, the witch's member is fitfully bouncing and pulsing as if desperate for attention.  You ignore it and the steadily growing puddle of pre, focused utterly on showing the woman what it means to love as a woman.");

        CView.text("\n\nHer legs tremble behind you, gradually losing their grip.  The witch looks pleadingly looks up and begs, \"<i>I'm gonna... p-p-please... can I - OOooooh... c-can I cum!?  I'm so close... just... just let me cum!</i>\"  Being none too far from climax yourself, you graciously nod and slam your " + describeCock(player, firstCockThatFits) + " deep into its new home, crushing the witch's soft buns into your thighs.  She squeals happily and seizes up, her heels pressing hard into your back, trapping you inside her.  At the same time, her thick tool lifts an inch off her belly and thickens, the urethra bulging out for a moment before it begins to convulse and spray her goo over her tits and face. Her pussy drenches your loins in fragrant female goo, and you finally let go, pushing harder against her even though you're already dick-deep in quim.  Your " + describeCock(player, firstCockThatFits) + " unloads your thick gouts of spunk without delay");
        if (player.cumQ() < 700) CView.text(", spurting with unceasing quantity until she's absolutely flooded with jizz and a little bulgy around the middle.");
        else CView.text(", spooging up her cunny until it's completely flooded, her belly bloated into a rounded dome.");
        if (player.cumQ() >= 1500) CView.text("  You keep going beyond that, but there's just no room, and spouts of semen spurt from the woman's poor, over-filled twat.");

        CView.text("\n\nThe witch sighs and idly rubs her ");
        if (player.cumQ() >= 700) CView.text("swollen ");
        CView.text("tummy, smearing her own wasted goo into her skin as you withdraw and re-dress.");
        if (player.stats.cor < 33) CView.text("  You hope she learned something from the experience, but knowing most people in this strange land, she'll go right back to her rotten ways.");
        else if (player.stats.cor < 66) CView.text("  You wonder if she'll learn anything from this and shrug nonchalantly.  Who cares?");
        else CView.text("  You smirk as you wonder if she'll learn anything from this.  You hope not - it's a fun lesson to teach.");
        player.orgasm();
    }
    if (Area.inDungeon) {
        if (inCombat)
            return { next: passTime(1) };
        else return { next: playerMenu };
    }
    else {
        if (inCombat)
            return { next: passTime(1) };
        else return { next: passTime(1) };
    }
}
// *Male "Too Big" Victory Sex
export function maleTooBigVictorySex(player: Character): NextScreenChoices {
    CView.clear();
    const largestCock = player.body.cocks.sort(Cock.Largest).get(0);
    CView.text("You slip out of your [armor] with deliberate slowness, the tight, constraining pressure on your massive tool shifting in the most delicious way.  The uncomfortable yet tantalizing weight lessens gradually, and at the first hint of freedom, your " + describeCock(player, largestCock) + " flops free to taste the freedom of the open air, nearly doubling in size as your blood surges through it.  The witch's eyes look up in confusion at your prodigious proportions and widen in shock.");

    CView.text("\n\n\"<i>Y-you're bigger than me...</i>\" she drawls, her mouth hanging open in shock at the declaration.  She covers the hanging orifice with her palm, lamely trying to conceal her shock at your gargantuan boner.");

    CView.text("\n\nGripping yourself by the root, you casually aim it forward and let it grow until it brushes up on her nose, your urethra threatening to swallow it whole.  The ebon sorceress's pupils cross to focus on your shaft, and her visage takes on a hungry, somewhat confused look.  She protests, \"<i>This... this will never fit inside me!</i>\"  Glancing up at you with worry, she caresses the underside.  \"<i>I'm sure we can find another way...</i>\"");

    CView.text("\n\nYou push the witch away roughly, flat onto her back.  She lands flat with fear in her eyes and nervously folds her arms across her exposed, jiggling breasts.  You ignore her, firmly grasping her thighs to unceremoniously yank them apart and expose the pink-tinged folds of her flower.  Your dick flops into place now that your supporting hands are gone, draping down to obscure the black flesh with supple, throbbing erection.  The witch pulls her arms out from under your mass, which releases her tits and allows them to drape to the sides, molding around the heavy cock atop her.");

    CView.text("\n\nThe enchantress gives you a smokey look when you begin to move, giving up cute gasps of bliss whenever one of your veins catches on her clit or presses her prick harder into her belly.  Your member quickly grows slick with witch-pre and girl-lube, so when you tug her nipples to get more tit-contact on your pole, it glides right through.  Your lust-dilated urethra disgorges a thick bead of pre onto her chin as you command, \"<i>Hold them there.</i>\"");

    CView.text("\n\nThe witch smiles and answers, \"<i>I can do one better!</i>\"  She gestures with her fingers, wreathing them in pink flames, and then she presses on her rapidly slickening bosom.  As the dark fingers withdraw, pink silhouttes remain, supporting the dick-hugging mammaries for her, and leaving her hands free to caress your " + describeCockHead(largestCock));
    if (player.body.balls.count > 0) CView.text(" or fondle your [balls]");
    CView.text(".  You take her feet in hand and lift them high, bringing the weight of her supple thighs to bear around your [sheath].  With so much smooth skin surrounding you, the pleasure is intense, almost mind-bendingly good.  The witch's hands dance over your shaft, shooting tingles of pleasure up it and into your [balls], and each time you pump it forward, she smears your pre over the head with her plump, dark lips.");

    CView.text("\n\nDuring one of the long, long pulls back, your cum-obsessed companion coos, \"<i>Gods, keep going!  It's so - mrpPPHHH.</i>\"  You plug her rambling with fat cock and marvel when her luscious, sucking cock-pillows reshape into a suctioning 'o'.  You can feel her drawing pre-cum straight through your urethra, all the way to her bulging cheeks.  When she releases the vacuum to swallow, you pop free and slide back again, but you feel even more lusty, more full, more ready to cum than before.  The shadowy beauty smiles up through her low-hanging lashes with overflowing mirth.  You realize she's used her magic on you somehow, likely to boost the strength of your orgasm, but do you really mind the thought of bukkaking this blonde bitch in gratuitous waves of white?");

    CView.text("\n\nYou thrust forward hard enough that the woman is forced to accept the first few inches of your " + describeCockHead(largestCock) + " inside herself and swallow the thick gouts of clear pre-seed that spurt out with each convulsion of pleasure.  Her eyes cross, fluttering from pleasure.  When you pull back, she moans lasciviously, licking the last of your residue from your lips even as her inferior cock bulges underneath your own.  You're aware of some extra warmth and a slimy heat below - did she just cum?  You piston faster, enjoying the extra lubrication and confirming your suspicion.");

    CView.text("\n\nJiggling gently as you fuck her, the witch's asscheeks are a suitable target for your roving hands, and you turn to kneed one, smacking the other.  Still cumming under your girthy cock, she crosses her heels to squeeze you with the whole of both her legs.  Her arms do like-wise, hugging the cum-coated cock tightly into the quaking tit-flesh.  The sorceress seems to be molding her entire body into a masturbation sleeve, and each time you slam your dick into her mouth, she sucks more hungrily upon it, drinking deeply of your essence.  Her eyes close more often than open, and each time her lips aren't locked on cock, she's moaning and creaming her belly.  Her frothing, everpresent cum drips down the sides of her body, but the sight of it only spurs you on to fuck her harder and faster, until you can spill your own mighty load.");

    CView.text("\n\nThe cum-soaked, hermaphrodite witch tries to beg for your cum, but you shut her up with another load of bubbling pre.  As you watch her try to swallow it all, you feel a twinge of heat inside yourself");
    if (player.body.balls.count > 0) CView.text(" along with your [balls] growing tight");
    CView.text(", and you know your climax has arrived.  You hammer your " + describeCock(player, largestCock) + " back home, smashing it into her face.  The first wave seems to languish in your body forever, gradually stretching your urethra wide until you see your " + describeCockHead(largestCock) + " swell and open.  A wave of white fills the bitch's mouth, soaks her hair, and washes over her shoulders.  There's so much of the alabaster gunk that ropes of it dangle around her head in a shroud, slowly dripping into a puddle onto the floor.  You inch back a bit, and let the next explosion take her in the tits.  The jism pours out like it water from a five gallon bucket, and the black tits are immediately wreathed in glistening white.");

    CView.text("\n\nDemanding more friction, your " + describeCock(player, largestCock) + " draws you right back up to her face, and this time she doesn't even try to catch it in her mouth.  The black slut simply plants a kiss just below your opening and meets your gaze as the alabaster flow takes her, holding eye contact for as long as she can.  Of course, that isn't long, and she's quickly drenched in spunk, her eyes glued shut with syrupy strings of spooge.");

    CView.text("\n\nYou aren't done!  Not by a long shot!  This dark creature blessed you with unholy levels of virility, and you aren't going to waste it.  You stand away and butt your " + describeCockHead(largestCock) + " into her nether-lips, and the remainder of your orgasm is injected directly into the woman's waiting womb.  Her belly rounds into a nice, gravid bump that carries her cock up with it, and you're given the first chance to see the results of the cum witch's own orgasm.  The dark, glossy cock is absolutely soaked in sperm, while her balls are wreathed in churned up, frothy cum.  Once you've made her uterus a swollen dome, you aim up and drizzle the last ropes atop her pathetic, half-limp dick.");

    CView.text("\n\nExhausted at last, you pat your " + describeCock(player, largestCock) + " affectionately.  You'd wipe it off on the witch's hair, if it wasn't messier than the " + describeSkin(player) + " you plan to clean.  She begins to lick her fingers and clean the stuff off her face.  You just laugh, and get dressed.  There's still much to do.");
    player.orgasm();
    if (Area.inDungeon) {
        if (inCombat)
            return { next: passTime(1) };
        else return { next: playerMenu };
    }
    else {
        if (inCombat)
            return { next: passTime(1) };
        else return { next: passTime(1) };
    }
}

// Female Victory Sex
export function ladyVictorySex(player: Character, cumWitch: Character): NextScreenChoices {
    CView.clear();
    CView.text("You disrobe, casting aside the garments with a feminine sigh.  As soon as you expose yourself, the witch's eyes twinkle happily.  She caresses her stiff tool and tweaks one of her nipples as she watches you.  \"<i>If you wanted to get fucked by little old me, all you had to do was bend over, honey.</i>\"");

    CView.text("\n\nPlanting a [foot] on her hip, you stop her fidgeting with a menacing glare.  \"<i>You don't get to fuck me, witch.  I'm fucking YOU,</i>\"  you decree.  The well-endowed ganguro slut creases her pretty face into a frown, but meekly nods.  Her pussy still seems puffy and wet, and her cock hasn't shrunk at all.  You sidle up and push a few fingers into her twat, testing the waters.  As you expected, her fluids are as bountiful as most sand witch's breasts.  She squirms weakly at the attention, and her cock bobs happily on her belly.  You affectionally pat the dark-hued member and playfully tug on her ebon skin.");

    CView.text("\n\n\"<i>Ahh... don't tease me!</i>\" she protests as she tries to wriggle away from your probing fingers.  You pinch your fingers into a tight circle around her sack and pull down, stopping her in her tracks.  The lusty woman whines plaintively, but you tighten your grip and jam your fingers deeper inside her.  In spite of her discomfort, the ebony babe's nipples are sticking straight up, huge and puffy.  Her cock is leaking trickles of precum all over her belly, and she gasps, \"<i>Noo...</i>\"");

    CView.text("\n\nFeeling merciful, you release her balls, but you keep your fingers right where they are.  She bites her lower lip in frustration but her hips wiggle up at you.  Sneaking under her balls, your fingers find her clit and begin to diddle it, sliding over, around, and under it.  The little buzzer throbs happily in your grip, almost begging you to touch it, stroke it.  Of course, you do all of that, manipulating the woman's heaving, female flesh into a frenzy of pleasured moans.  She grabs onto your arm for dear life and pulls it deeper into her self, screeching like a banshee as she cums.  Liquid love gushes from her pussy to stain your hands, so you pump a little faster, and get rewarded with an even greater flow.  Her wet walls grab you like a vice, wringing your hand with unholy force, and then like a light going off, she shuts down, babbling weakly.");

    CView.text("\n\nYou wipe your hand on the supple skin of her thigh and scold her for making such a mess.  The witch, for her part, is half conscious and panting, blissed beyond rational thought.  A glaze of white goo puddles on her belly, but her cock is still plenty hard, seemingly super-turgid from the strength of her recent orgasm.  You lift it up gingerly and climb atop it, grinding your own [vagina] along the shaft slowly to get yourself ready.  Only after the swollen rod is liberally coated in fem-spunk do you shift position and aim it up inside.");

    CView.text("\n\nSinking down on the firm pole, you revel in the sensation of it splitting your nethers, beautifully stretching your canal's walls into a wide, cock-swallowing 'o'.  Your [clit] thrums with heat and pleasure while you continue your slow descent, and by the time you hit cock-bottom, your [legs] are shaking weakly and your abdominal muscles are fluttering, clenching uncontrollably.  You bend over to nuzzle against the brown breasts, and they form a comfortable pillow for you to lean upon once you start to move your [hips].");

    // cuntCheck Here
    displayStretchVagina(player, cumWitch.body.cocks.sort(Cock.Largest).get(0)!.area, true, true, false);
    CView.text("\n\nThe semi-conscious witch stirs beneath you, responding to the sexual pleasure you've forced back upon her.  \"<i>...Wha?</i>\" she asks as comprehension washes over her features.  \"<i>Oooh... you're not done?</i>\"  You bite her lower lip as your work her cock over, pumping away with wild abandon.  The only answer she needs is the feel of your body climaxing atop her, and you begin to play with her breasts as you work towards that goal.");

    CView.text("\n\nThe dark-skinned blond pants, \"<i>Too soon... gonna... gonna cum... again!</i>\"  She screws up her eyes and throws back her head, her tongue weakly flopping to the side, and you feel her cock erupt, the heavy orbs of her balls twitching under your [butt].  Molten hot semen gushes through your passage, bathing your womb in thick sperm until you feel full in a whole different way, and as if triggered by biological imperative, you cum, creaming that thick rod with your lady-spunk.");
    if (player.body.vaginas.get(0)!.wetness >= 5) CView.text("  It gushes out of you in a soaking river, utterly drenching the futa's stomach, hips, and butt.");
    if (player.lactationQ() >= 50) CView.text("  At the same time, milk spouts from your bosom to wash over your hermaphrodite.");

    CView.text("\n\nThe orgasm drives your body relentlessly, and you're forced to ride the hermaphrodite like a bucking bronco, milking her cock relentlessly.  You hips thump wetly atop the chocolate lady's thighs, and it isn't until you make that final, echoing smack of soaked flesh on flesh that you come down, sagging weakly into the comfortable tits below.  The witch sighs contently and begins to stroke your [hair], but her fingers fall away after a second as her eyes flutter closed.");

    CView.text("\n\nYou recover after a few minutes and rise up, legs shaking at the overpowering sensation of the witch's withdrawing phallus, but you make it up with spunk pouring from your [vagina].  What a victory!");

    attemptKnockUp(player, PregnancyType.SAND_WITCH, IncubationTime.SAND_WITCH, 90);
    player.orgasm();
    if (Area.inDungeon) {
        if (inCombat)
            return { next: passTime(1) };
        else return { next: playerMenu };
    }
    else {
        if (inCombat)
            return { next: passTime(1) };
        else return { next: passTime(1) };
    }
}

// Tentacle Victory Gangbang
// 3+ Tentas
export function tentacleVictoryGangbangCumWitch(player: Character): NextScreenChoices {
    CView.clear();
    CView.text("The defeated sorceress eyes you questioningly as you step closer, and her surprise only deepens when you part your [armor] to expose your " + describeCocksLight(player) + ".   You gleefully twist your multiple members around each other into a many-layered helix, oily, pre-dripping plant-cocks squirming together in a bundle of barely-restrained, bubbling lust.  The pliant flesh pulsates happily at its freedom and immediately takes a twist towards the horny witch, pausing above her as if considering the tightness of her slick folds or the softness of her erect cock's skin.");

    CView.text("\n\nWith your erections poised to strike, the blonde can only stare and worry.  Her lower lip quivers with uncertainty, but as she soon as she dares to protest, you unspool a wiggling wang and stuff it so deep into her gullet that all she can say is, \"<i>-uRMMPH!!!</i>\"  The ebony girl's throat bulges obscenely while your monstrous tool burrows deeper, nesting the purple-hued head deep in her supple, exquisitely textured throat.  The suction generated by her attempts to breath only make your cock swell larger inside her, pumping you up as effectively as a goblin-machined sex-toy.");

    CView.text("\n\nGroaning from the sensations, you relax the control that kept your bundle of cock twined into a single dick and allow them to fly freely.  The quickest cock immediately snaps down to nuzzle at the cunt-lips, smearing your fluids into her own.  The quick rubs stir the sensual fluids into a bubbly, off-white mess of slippery debauchery.  Unfortunately for it, that early cock is soon supplanted by another of your tentacle members.  The new one glides along the underside of the first, then squeezes between the other dick and the glorious wet slit, arching down to nestle itself inside.  The witch arches her back, eyes rolling wildly, as she struggles both to breathe and endure the sudden, forceful penetration.");

    CView.text("\n\nVibrating spitefully, the now-denied cock arches up, scorpion-like and ready to strike.  It considers its options, perhaps seeing its brothers nailing the horny hussy's two holes through your eyes.  The prehensile penis decides to take a leg and curl about it like a snake, climbing higher and higher across the smooth, dusky skin.  Once it has nearly reached the oozing, freshly-fucked twat, it twists lower, down into the dark valley between the ass-cheeks, and with a happy sigh from your lips, you let your third tentacle pecker slide into the vulnerable anus.  It slides through her sphincter with ease and immediately begins to piston in out and out, slowly sawing through the witch's abused rectum without care for her comfort.");

    CView.text("\n\nYou pull the throat-plugging prong free of the cum witch's oral cavity and smile down at her, laying the spittle-lubricated cock between the spellcaster's perky tits.  She coughs and gasps around, chest heaving.  In response, her swollen udders jiggle pleasantly around your embedded tool, inadvertently massaging your wiggly plug.  You rock your hips in response to the three layers of pleasure, even though your members can thrust quite adequately without you having to add any motion to the ocean.  It just feels so good to cut loose and truly enjoy the fruits of your blessed form!  You pick up the pace, dicks folding back and lunging forward like snakes, setting every part of the spunk-obsessed witch's body shaking, even her leaky cock.");

    if (player.body.cocks.filter(Cock.FilterType(CockType.TENTACLE)).length >= 4) CView.text("\n\nYour fourth free prick twines around the enchantress's dusky shaft, frotting and jerking it all at once, the twin cocks oozing a bubbly mess over each others' lengths.  Arching over top of the ebony tool, your dick leans down and smashes its tip against the other, and you shudder at the feeling of pre being swapped back and forth between the cum-slits.  The cum witch's eyes roll back from the bliss she's been forced to experience.  Simultaneously, her mouth dilates, and drool dribbles from her facile mouth, oozing down her chin.  You tighten your coils around the black cock and squeeze a dollop of fresh pre-jism from it, picking up the pace to match the vigorous fucking you're giving.");

    CView.text("\n\nThe ebony beauty's back arches from the raw sexual power of your many-pronged assault, and she cums, as messily as noisily, her voice screeching like a banshee.  A torrent of white bursts from her bulging, pulsating penis");
    if (player.body.cocks.filter(Cock.FilterType(CockType.TENTACLE)).length >= 4) CView.text(", splatting over your frotting cock-tip in wild abandon");
    CView.text(", more like a firehose than an orgasm.  The alabaster flood rushes across the taut skin of her belly, glazing down your titty-fucking cock and the jiggling underswell of the witch's bust.  Her tight cunt clenches down around you like a vice, with wave-like ripples cycling from your deeply embedded tip all the way to your base.  The tight pucker of the witch's anus contracts likewise, and though it doesn't endeavor to milk your cock like her pussy, the squeezing hot tightness feels utterly divine in its own way.");

    if (player.body.balls.count > 0) CView.text("\n\nYour balls begin to tremble with quaking warmth, releasing their thick cargo to pump up [eachCock].");
    else CView.text("\n\nYour body begins to tremble with the quaking warmth, releasing its thick cargo to pump up [eachCock].");
    CView.text("  You shudder and grab the ebony sorceress's tits in your hands, squeezing her bronzed orbs tightly as you release works through you.  Jets of cum well up to plug the witch's pussy and anus simultaneously.  The spit-soaked, cum-splattered vine between her tits quivers meaningfully, and then unloads, squirting a thick wave of jizz onto her face.");
    if (player.body.cocks.filter(Cock.FilterType(CockType.TENTACLE)).length >= 4) CView.text("  Of course, your fourth prick is not to be outdone, and blasts a gooey coating of cream across the witch's own pulsating prick, wreathing it in drizzles of syrupy white.");
    if (player.cumQ() >= 500) CView.text("  Wave after wave of spunk washes into the tight holes and toned form of your foe, turning her into a complete mess.");
    if (player.cumQ() >= 1000) CView.text("  A few more virile splurts see to her utterly inundated state, bloating her belly into a tightly-stretched dome.");

    CView.text("\n\nYou retract your spent shafts and smirk at the backflow of bukkake that bursts from the cum witch's soiled loins.  She's utterly wrecked, dominated by dick in every sense.  What delicious irony that a sorceress should be taken with the very type of organ she glorifies!  Getting dressed, you give her a lazy wave and invite her to try again some other time.");

    player.orgasm();
    if (Area.inDungeon) {
        if (inCombat)
            return { next: passTime(1) };
        else return { next: playerMenu };
    }
    else {
        if (inCombat)
            return { next: passTime(1) };
        else return { next: passTime(1) };
    }
}

// Repeat Desert Loss Female & Herm
export function savinMakesAwesomeFemdom(player: Character, cumWitch: Character): NextScreenChoices {
    CView.clear();
    // (HP)
    if (player.stats.HP < 1) CView.text("Unable to further withstand the witch's magical assault, you topple over into the soft, warm sands. Before you can recover, the witch is on top of you, her powerful legs straddling your [hips]. Her long, dainty fingers lock through your [armor], pulling your face out of the sand and rolling you over to look up at her.");
    // (Lust)
    else CView.text("Uncontrollable lust surges through you, your heart pounding beneath your [chest] as your [legs] collapse out from under you.  Your hands desperately claw at your [armor], trying to touch your needy cunt, the fire in your genitals burning like whitefire through your veins.  You moan with helpless lust as the witch looms over you, grabbing your hands away from your crotch and pushing you onto your back.  A moment later, she's on you, straddling your [hips] between her lush thighs.");
    CView.text("\n\nPinned beneath the witch, you struggle weakly in her grasp as she slowly strips off your [armor], bearing your [chest] to her surprisingly soft, gentle caresses.  ");
    // if Multiboob:
    if (player.body.chest.length > 1) {
        CView.text("She caresses each of your breasts, cupping each in turn, running her thumb over each nipple");
        if (player.lactationQ() >= 200) CView.text(" until milk streams down your chest, much to her delight");
        CView.text(".");
    }
    else if (player.lactationQ() >= 200) CView.text("Her fingers deftly work across your [nipples], caressing out a trickle of milk, which she laps up with a long, languid motion that electrifies your sun-kissed skin.");
    else CView.text("She tweaks your [nipples] between her dexterous fingers, sending shivers of pleasure up your spine, but seems oddly discontent...  \"<i>No milk for me? We'll have to do something about that...</i>\"");
    CView.text("  Slowly, she works her way down from your [chest] to your belly, peeling off your [armor] as she goes to reveal more and more of your " + skinFurScales(player) + ", never neglecting to run her hands all across you, stroking and kissing along every exposed inch until she comes to your groin.  Instinctively, you writhe in her grip as she tosses the last of you [armor] aside, leaving you wholly bare between her legs.");

    // If PC has a cock:
    if (player.body.cocks.length > 0) {
        CView.text("\n\n[EachCock] sits half-erect, lying against your belly.  With a grin, the cum witch opens her robes, letting them hang on her shoulders to reveal her own endowments.  Her cock, a huge, throbbing pole of meat flops down atop yours, ");
        if (player.body.cocks.sort(Cock.Longest).get(0)!.length < 10) CView.text("overshadowing your comparatively tiny little rod");
        else if (player.body.cocks.sort(Cock.Longest).get(0)!.length < 15) CView.text("nearly equal to your own [cock]");
        else CView.text("seeming tiny compared to your monstrous shaft");
        CView.text(".  Chuckling, she wraps a hand around both your cock and hers and gives a few experimental pumps, gently grinding her hips into yours.  She frots against you for a long while, making you shudder and squirm as her thick fuckpole glides across your sensitive cockflesh... but the penile pleasure lasts only a few minutes, as soon the witch's attention turns elsewhere, to the womanly slit beneath your rod.");
    }

    CView.text("\n\nLicking her ebony lips with lust, the witch ");
    if (player.body.legs.isGoo() || player.body.legs.isNaga() || player.body.legs.isDrider() || player.body.legs.isTaur()) CView.text("shifts down your inhuman body");
    else CView.text("spreads your legs, hiking them over her shoulders so that your feet dangle behind her");
    CView.text(".  She grasps her huge, throbbing cock, stroking it idly in one hand as the other caresses your thighs, exploring your groin and the sensitive flesh around your womanhood.  One of her fingers, surprisingly dainty, slips around your outer lips, circling your hole until it brushes your [clit], sending a shock of pleasure through you; a trickle of feminine fluid leaks from your loins at her touch, lubricating her finger until it sheens in the desert sun.  The witch makes a show of bringing the glistening finger to her lips, running the tip across her full black lips before lapping up the fluids with exquisitely long strokes of her tongue, soon sucking her own finger like a slender little cock covered in your juices.");

    CView.text("\n\nSlowly, the witch turns her attention back to your quivering [vagina].  Her cock, now lying flat on your belly, is thrumming hotly, her heartbeat easily felt through her ready rod, a steady trickle of precum flooding down your chest in eager anticipation of the coming fucking.  You brace yourself as best you can as the witch leans back, sliding her prick down your flesh until its thick head brushes your [vagina].  You shiver, half in anticipation and half in lust-filled need; your quavering cunt's cockhungry muscles easily relax at her touch as she pushes in, the first inches of witchcock spreading your vaginal walls wide in acceptance of the dominating cock, womb ready to be bred, to suck every drop of seed from the cum witch's potent loins.");

    CView.text("\n\n\"<i>There's a good girl,</i>\" the witch coos, stroking your " + describeHair(player) + " as she slowly, tenderly enters you, her wide hips pushing inch after throbbing inch of cock into your hole.  ");
    displayStretchVagina(player, cumWitch.body.cocks.get(0)!.area, true, false, true);
    CView.text("Suddenly, the witch hooks her fingers around the back of your neck, lifting you up from the sand.  You gasp, unsure, until the witch guides your head up to her massive breast, already leaking milk in anticiaption.  She smiles at you, surprisingly warmly, as she nestles your cheek into the wide valley of her cleavage.  A sudden, primal instinct overtakes you, and you wrap your arms around the witch's waist, holding yourself to her in a tight hug.  The witch gasps, surprised by your sudden act, but relaxes in your grasp as you did in hers, allowing you to support yourself as she cups one of her teats for you, guiding the leaking nipple to your lips.  You take it eagerly, breath catching as the first sweet, creamy drops enter your waiting mouth.  You suckle from the witch like a babe, drinking her delicious milk as it pours into you.  The witch moans loudly, her head rolling back as her milk flows into you, her flared hips finally pressing into yours, her tremendous cock fully buried inside you, its head kissing the lips of your cervix.  \"<i>Good girl,</i>\" she echoes, stroking your hair and milk-bloated cheeks, otherwise still in your sexual embrace.");

    CView.text("\n\nSlowly, the witch begins to roll her hips, pulling mere inches from your loins before slipping back in, your lubricants and her free-flowing precum sloshing out around her cock to stain the desert sands.  In tune with your suckling, she fucks your [vagina], pushing in again and again, holding you tight to herself as more and more pre fills your hungry womb.  She moans deeply, eyes closed and head resting against your own, her breath hot and heavy on your bare flesh.");

    CView.text("\n\nNow, the witch almost seems lost in bliss....  Perhaps you could turn the tables on her, and end up on top?  Then again, she's so gentle, and her milk is so very, very good...  Do you even want to resist her as she breeds you, pumping you full of cum and milk?");

    return {
        choices: [
            ["Resist", resistSavinStuff],
            ["Don't", doNotResistSavin],
        ]
    };
}

// Resist
export function resistSavinStuff(player: Character): NextScreenChoices {
    CView.clear();
    CView.text("It takes nothing more than a gentle push to put the witch on her back.  She gasps as you straddle her, [legs] spread around her wide, birthing hips, her cock buried to the hilt inside you.  To your surprise, she reaches up from her now-submissive position, stroking your cheek and purring like a pleasured cat.  You lean down, kissing her lips for once, rather than her teats, leaving a pearly milk stain on the full black lines.  With a smile, you plant your hands on her chest to steady yourself as you begin to rise and fall on her cock, dragging the massive thing nearly out of you before sliding back down with tantalizing slowness, reveling in the sensation of being filled to the brim once again.  Again and again you buck your hips and bounce on her cock, picking up the pace to a fury of lusty fucking, a symphony of moans and primal grunts echoing out across the desert as you breed the witch, coaxing the cum you need so desperately out of her thick, throbbing pole.");

    CView.text("\n\n\"<i>Yes, oh please,</i>\" she groans, clutching at your [hips] as you ride her cock, \"<i>take my seed inside yourself, become great with my children....  We need it, both of us, yes?  Don't hold back... FUCK ME!</i>\"");

    CView.text("\n\nYou slam yourself down on her rod one last time, screaming with pleasure as the first blast of cum smears your inner walls, painting your insides white with potent witchseed.  Your cunt grasps her prick, milking it as the witch groans in feral pleasure, bucking her hips into you as seed fills you and more, spilling out around her cock until the sand seems like snow beneath you.");

    CView.text("\n\n\"<i>Yes, oh yes,</i>\" the witch groans, falling back against the cum-covered dunes, her milky chest heaving, adding to the organic mess.  \"<i>Let me be the father of your children... you'll be an excellent mother, and our children will be glorious.</i>\"");

    CView.text("\n\nSilently, you nod, and collapse atop her, head buried in her milk-laden chest as you pass out from sexual exhaustion.");
    player.orgasm();
    player.stats.sens += 2;

    // knock up hurrrr
    attemptKnockUp(player, PregnancyType.SAND_WITCH, IncubationTime.SAND_WITCH, 90);
    return { next: passTime(1) };
}
// Do Nothing
export function doNotResistSavin(player: Character): NextScreenChoices {
    CView.clear();
    CView.text("You need her inside you, to be filled with her seed... her children.  To be dominated, to be bred.  You sink into the witch's embrace, letting her slowly, lovingly pump her thick hips into you, taking more and more of her pre-cum and milk into you until you feel bloated, heavy-laden with white witchseed and the food you'll soon be making for your shared offspring.  The cum witch is incredibly gentle, her motions always tender, taking the best of care of you -- loving, in their way -- as she fills you with her cock again and again.  You bask in the fullness of it, going limp from pleasure, content to let her fuck you full of little witches, to be the mother of the dunes as you deserve.");

    CView.text("\n\n\"<i>A good girl, beautiful girl.  So strong, so eager.  So willing.  You'll make a fine mother, a good broodmare, won't you?</i>\"  You nod eagerly, punctuated by her thrusting harder, faster into you. \"<i>Our children will be wonderful, beautiful witches, the queens of the desert.  Your womb will be the building block of the demons' downfall.... Now take my seed, and make it yours, a child for us both.</i>\"");

    CView.text("\n\nYou can do nothing more than gasp, milk sputtering from your lips as the first hot spurt of cum pierces your womb.  The witch rocks her hips, pumping you with load after load of creamy seed, filling you with the hope of offspring until thick semen stains your thighs, pouring out around her massive, dominating rod.  The witch seems to go on forever with an infinite reserve of cum inside her, pumping you full of more and more until the dune is snow-white with excess witchseed.");

    CView.text("\n\nFinally, the endless orgasm fades, and the witch groans with contentment, falling back against the cum-covered dunes, her milky chest heaving, adding to the organic mess.  \"<i>Let me be the father of your children... you'll be an excellent mother, and our children will be glorious.</i>\"");

    CView.text("\n\nSilently, you nod, and collapse atop her, head buried in her milk-laden chest as you pass out from sexual exhaustion.");
    player.orgasm();
    player.stats.sens += 2;

    // knock up hurrrr
    attemptKnockUp(player, PregnancyType.SAND_WITCH, IncubationTime.SAND_WITCH, 90);
    return { next: passTime(1) };
}

// Avoid The Too Big Loss Facial
export function tooBigCumWitchLossNoFacial(player: Character): NextScreenChoices {
    CView.clear();
    CView.text("You tell her you'd rather not get a face full of her spunk.  Judging by the sour look on her face, she seems to be honestly surprised by your choice, like she never expected that anyone would choose not to get a faceful of her spunk.  This bitch clearly has spent too much time with her nymphomaniac sisters.");

    CView.text("\n\nShe growls, \"<i>Your loss, " + mf(player, "handsome", "beautiful") + ".  I'm still gonna, gonna... get mine.</i>\"  The Cum Witch forcibly twists her hips to angle your [cock biggest] off to the side, shuddering as her black cock convulses on top of you, spraying a fresh gout of goo on top of you, and she hasn't even cum yet.  Her balls are quaking needily, pulsing and bouncing as they prepare to blow");
    if (player.body.balls.count > 0) CView.text(", just like your own");
    CView.text(", and she smiles cruelly as her feet press harder on you, suddenly tingling with supernatural forces.  Almost painful heat floods through your middle as she frots you harder and harder, inadvertently tit-fucking your immense erection all the way to orgasm.");

    CView.text("\n\nYour first squirt is a nice, long thick spray that immediately soaks into the sand.  The second is much smaller, only a small, slimy trail.  Exploding atop you, the Cum Witch's boner hoses out a globule of cum so big that it breaks apart under its own weight and drops down both sides of your boner on its path to the sands.  Your dick is completely soaked in her jism at this point, and though less noticeable, her girl-cum is dripping down your [sheath] and [hips], marking you with her sweet, feminine scent while her salty goo drenches your bigger boner.  Her sprays get more voluminous as yours dwindle, until you're cumming out pathetic, tiny white droplets so small that it takes a few of them to get big enough to drip down to the ground.");

    CView.text("\n\nExhaustion takes you as you finish, causing you to fall into a fitful slumber while the Cum Witch finishes pumping what looks like a lake out of her wang.  Just how much of your potency did she steal?");

    // Big-ish cum multiplier loss!  Lose some ball size if they're huge
    if (player.body.balls.size > 5) player.body.balls.size -= Math.round(player.body.balls.size * 0.333);
    player.body.cumMultiplier = Math.round(player.body.cumMultiplier * .75);
    player.orgasm();
    return { next: passTime(1) };
}
// TDM's generic loss to cum witch scene
// requires that the PC have a dick that can fit inside the cum witch's vagina.  The scene can be used with herms.
export function TDMsLoseToCumWitchScene(player: Character, cumWitch: Character): NextScreenChoices {
    CView.clear();
    let cockThatFits = player.body.cocks.find(Cock.CockThatFits(cumWitch.vaginalCapacity()));
    if (!cockThatFits) cockThatFits = player.body.cocks.sort(Cock.Smallest).get(0);
    CView.text("Robes already lay discarded nearby and the cum witch stands triumphantly over your body.  A bobbing cock brushes up next to your face, quite erect and eager for service.  The hermaphrodite doesn't bother with conversation and roughly forces you onto your back.  She snaps her fingers; curving bands of stone snap out of the ground, curling over your limbs and binding you securely to the ground.  It's clear that you're about to get fucked, whether you like it or not.  Looking up, a cryptic smile plays across the black woman's visage as she deftly removes your [armor].  In an instant, your " + describeCock(player, cockThatFits) + " has been mounted.");

    // multicock section
    // if the PC has more than one dick, this witch puts hoods on them, which make them feel like they don't exist.
    if (player.body.cocks.length > 1) {
        CView.text("\n\nWith your " + describeCock(player, cockThatFits) + " well entrenched in her singular vagina, the witch reaches over and pulls several small cloth pouches out of her discarded robes.  She smiles when she notices your confusion, but refrains from giving an explanation before putting a pouch onto ");
        // if (cocks = 2)
        if (player.body.cocks.length === 2) CView.text("your other phallus.");
        // [if (cocks > 2)
        else CView.text("the rest of your " + describeCocksLight(player) + ".");
        CView.text("  The futa on top of you continues to smile mysteriously, and spares not another moment of her attention on your genitals.");
    }

    CView.text("\n\nThat finished, your assailant assumes an air of concentration for a moment before saying, \"<i>Enim emoceb lliw nemes dna doohnam ruoy!</i>\"  Magic strikes you, and suddenly [eachCock] goes numb, then you become aware of an alien appendage.  It feels like it is coming out of your crotch, and it feels like a cock, but it isn't ");
    if (player.body.cocks.length > 1) CView.text("one of ");
    CView.text("yours...");

    CView.text("\n\nLooking up once more at the cum witch's mysterious knowing smile, a sense of fear slithers down your spine.  She gently taps her nose with one of her long, black fingers, then leads you down to her bobbing prick.  She gives it a gentle stroke, and you realize just what you've become aware of.  You're feeling her cock as if it were your own!  Based on the laughter of the dark-skinned spellcaster, your amazement and surprise are painted on your face, clear for all to see.");

    CView.text("\n\nThe fearsome futanari proceeds to tease the head of her cock, drawing a small circle around the tip.  You find yourself trying to buck your body up into hers in response.  Unfortunately, this does nothing to increase the stimulation on her phallus, and you still can't feel anything from your own.  A view of her large breasts bouncing in front of you is your only reward.  \"<i>Are you frustrated?</i>\" she asks you, still smiling.  \"<i>Do you want to get off?</i>\"  The teasing continues, only doing the slightest of stimulations on her length.  With an angry grunt you struggle against the sandstone bonds holding you down, desperately trying to get more stimulation.  \"<i>Oh you are!  Good.  Then I have some good news for you.  You will in a moment, don't worry.</i>\"  You're getting really sick of seeing that same cryptic smile plastered all over her face.");

    CView.text("\n\nYour attention is suddenly drawn down to ");
    if (player.body.balls.count > 0) CView.text("the one part of your manhood that you can still feel, your [sack].");
    else CView.text("a part of your body just behind and above the base of [eachCock], probably your prostate.");
    CView.text("\n\nIt feels odd.  It's tingling and feels tight and compressed, like a spring wound up too far.  You feel as if all of your cum is being squeezed out of your body, but it isn't an orgasm; more like you're building up towards something much bigger.  It's a sensation that's really hard to describe, but it does feel good.");

    CView.text("\n\nLeaning in close, her face is only inches away; a gentle whisper comes from her lips, \"<i>Looks like you're ready now.  Do you still want to cum?</i>\"  When you indicate in the affirmative, she snaps her fingers and the bindings around your arms are released.  \"<i>Then let's see how well you can work my meat,</i>\" she proclaims while returning to her old pose and licking her lips.");

    // end of the foreplay?  I guess now we have handjobs!  I've actually never written a handjob scene before... I don't actually know how to go from here!
    CView.text("\n\nYou grip her length with both hands firmly and start jerking it in earnest.  At last, the stimulation that you wanted so much is literally at your fingertips!  Large drops of pre start to flow out of the tip, and the sorcerous seductress encourages you to use her fluids for added lubrication.  Eager to get any more sensation you can from this wonderful cock bobbing and bouncing in front of you, you put every drop of pre that escapes to work accomplishing that very purpose.");

    CView.text("\n\nWorking that black bar is quite an experience.  It feels very different from your " + describeCocksLight(player) + ".  ");
    // [if (sensitivity < 70)]
    if (player.stats.sens < 70) CView.text("It's more sensitive than yours, for one thing, and");
    else CView.text("It isn't as sensitive as yours {are/is}, for one thing, but");
    CView.text(" the flow of her constantly dribbling pre, tingling with magical power is something that you've never felt before.  Making things more interesting, the position that you're in leaves your grip on her dick remarkably different than how you'd grab your own while masturbating.  Of course what is important is that you want to rub every last inch of her lovely length, and feel every second of it through her strange spell.  The feeling of your cum being sucked out of your [balls] only makes the whole experience feel even better.");

    CView.text("\n\nA loud slapping noise fills the air, and you notice that you're actually trying to thrust up into the cum witch's pussy with your " + describeCock(player, cockThatFits) + ", despite the fact that you can't feel it.  You stop yourself, only to have the witch start to gyrate her hips, spinning you around her insides with your " + describeCock(player, cockThatFits) + ", while simultaniously thrusting her cock through your hands.  You guess that while you can't feel your shaft inside her, she certainly can.");

    // orgasmsssss
    CView.text("\n\nNow nearing your peak, the witch commands you to take your hands off her length; you do so reluctantly.  Things seem to pass in slow-motion to you, black hands move down and grip the cock you were just jacking firmly.  The witch leans back.  She aims her hermhood skyward, and a massive gout of spunk flies into the air.");

    // cum volume variations
    if (player.cumQ() < 200) CView.text("\n\nMany streams of jizz fly up several feet before showering down on the ground and your lust locked bodies.  Anything that hits the sand is quickly absorbed into the hungry desert, while you and the dark skinned woman are covered liberally in her semen.  That cum couldn't have been just hers.  You swear what she pulled out of you was mixed in there as well.  It felt like she drew out a lot more than you'd usually let out in a single ejaculation for sure.  You feel completely drained, ");
    else if (player.cumQ() < 3000) CView.text("\n\nThe flow of jizz pumping out of your collective cock lasts for at least half a minute!  A bizarre white fountain of spunk rains down around you, and onto you.  While you and the dark-skinned woman are completely drenched in the stuff, the desert sands look almost completely dry afterwards.  You end up receiving a look of admiration for your generous contribution.  Nodding through your sticky mask, you're somehow sure that most of that was the signature megaload of your [balls], though somehow, it was even more than you usually let go.  Your perverse partner drained you pretty good, ");
    else CView.text("\n\nEverything goes white - there is no other way to say it.  The sensations have overpowered your senses, and it feels as though your very life is being pumped out of that damned cock.  You don't know how long it goes on for, but you know that you cum for minutes, at least.  The experience leaves your whole body drenched in hot, sticky fluid.  The incredible quantity of spunk you normally let out combined with the effects of the witch's strange spell has awoken what feels like the wrath of a jizz god, and you love every second of it.[pg]When it finally ends, you wipe the spunk from your face, and you're very surprised to see the last of the cum that didn't fall on the both of you quickly absorbing into the desert sands.  It feels as if you're on death's door, completely drained of everything, ");
    if (Settings.sillyMode) CView.text("in both body and in [balls].");
    else CView.text("in both body, and in spirit.");

    CView.text("\n\nThe woman covered in your combined spunk rises up off of your body and dons her significantly whiter robes.  She wipes off her face, revealing that same cryptic, knowing smile once more, before gently touching your head and whispering something in your ear.  Another spell grips your body, and you drift off into a deep sleep.");

    // Decrease PC's strength by 2 for every digit of cum production they have after 100 (I can provide an algorithm for that if you need it, it is very simple), set lust to 0, increase cum production multiplier by 1
    player.orgasm();
    player.stats.str += -1;

    player.body.cumMultiplier++;
    if (player.cumQ() >= 200) player.stats.str += -1;

    if (player.cumQ() >= 3000) player.stats.str += -1;

    // Usual loss text+gem loss.
    return { next: passTime(1) };
}

// *Repeat Desert Loss Male
export function repeatLoseToCumWitchForDudes(player: Character, cumWitch: Character): NextScreenChoices {
    CView.clear();
    // HP:
    if (player.stats.HP < 1) {
        CView.text("Collapsing under the weight of your injuries, you tumble back onto your [butt], kicking up a cloud of sand as you fall fully prone.  Laughing at your predicament, the ebony futanari cooly advances, tossing her wide-brimmed hat aside as she goes.  \"<i>Oh you poor, poor Champion.  Did you ask the Sand Mother to let us out so that we could this?  Does the strong, mighty " + mf(player, "hero", "heroine") + " have a thing for submitting to my touches and fat cock?  Or perhaps, you want something else...</i>\"");

        CView.text("\n\nCaressing you as she removes your [armor], the witch shows remarkable tenderness for your injuries, knitting the worst with magic to ensure your well-being and kissing others as if it would somehow make them all better.  She stops at your groin to consider [eachCock] for a moment, slithering her fingers around [oneCock] and hefting its supple, ");
        if (player.stats.lust < 40) CView.text("flaccid");
        else if (player.stats.lust < 60) CView.text("semi-flaccid");
        else if (player.stats.lust < 70) CView.text("semi-hard");
        else CView.text("turgid");
        CView.text(" weight.  Pumping her hand with deft strokes and watching your expression intently, the curvy woman works you into a pleasant, erotic warmth, excitement coursing through your body with such fervor that your remaining wounds seem insignificant in comparison.");
    }
    // Lust:
    else {
        CView.text("Dropping down on your [legs], you rip off your [armor] and flop onto your back so that you can focus on abusing your genitalia.  [EachCock] is already hard enough to be leaking pre");
        if (player.body.balls.count > 0) CView.text(", and your [balls] are practically quaking with need");
        CView.text(".  The ebony futanari laughs at you as she confidently strides forward and discards her hat.  \"<i>Did you really have any intention of fighting me, or did you ask the Sand Mother to send us out so that we could abuse your insatiable libido?  I don't know how you didn't wind up captured, but I suppose I can tend to your needs... this time.</i>\"");

        CView.text("\n\nKneeling next to you, the witch runs her hands across your " + skinFurScales(player) + " toward your groin.  She grabs hold of [oneCock], hefting the rigid weight as she gauges your size.  Her fingers are soon glossy with your dribbling pre-cum, and she slowly pumps you to make sure she has your undivided attention.  \"<i>So helpless...  Still, hopefully this can produce a decent cum-shot.</i>\"  Her eyes twinkle with mirth, and she finishes, \"<i>If not, I can always encourage it.</i>\"");
    }
    // *Dick No Fit Male Loss Scene
    // Frotting -> Double Facial?
    // Urethral Pen?
    // Fingers PC's cock?
    let cockThatFits = player.body.cocks.find(Cock.CockThatFits(cumWitch.vaginalCapacity()));
    if (!cockThatFits) {
        cockThatFits = player.body.cocks.get(0);
        CView.text("\n\nAbruptly, the Cum Witch climbs atop your lust-wracked body.  Her robe is off in a flash, and you're finally able to appreciate her sweat-slicked, onyx-skinned body as she sits on your immense, oversized maleness, her form glistening in the desert sun.  Thumbing a finger just under your " + describeCockHead(cockThatFits) + ", she teases your gigantic dong while her own hard prick flops down on top of it, just heavy enough to leave a cock-shaped impressed on your urethral bulge.  The omnipresent heat and the fight have ensured that both bodies are soaked with sweat and able to slip and slide over each other easily.  Utilizing this, the Cum Witch rocks her hips slowly, folds splayed and leaking over your cock.  Her dick is already dripping a slow flow of girl-jism onto your own, almost claiming it as her own.");

        CView.text("\n\nGiggling, the onyx sperm-mage laughs as she slowly begins to frot with you.  \"<i>Why have a dong this big if you can't fit it in anything?</i>\"  She sensually caresses some of your copious cock before bending down and licking at the " + describeCockHead(cockThatFits) + ".  You shiver and express a drop of pre-cum onto your own ");
        if (player.body.cocks.sort(Cock.Largest).get(0)!.length < player.body.tallness / 2) CView.text("[chest]");
        else if (player.body.cocks.sort(Cock.Largest).get(0)!.length < player.body.tallness / 1.6) CView.text(describeFaceShort(player));
        else CView.text(describeHair(player));
        CView.text(".  The black spellcaster comments, \"<i>I must admit it is fun to look at, but it doesn't look like it's ready to blow just yet.  How about a little encouragement?</i>\"");

        CView.text("\n\nThe Cum Witch snaps her fingers, and two smooth, spherical bits of stone lift up.  They begin to vibrate so fast that you can hear them humming in the air.  They arc over your chest and flutter down onto ");
        if (player.body.chest.reduce(BreastRow.TotalNipples, 0) > 2) CView.text("two of ");
        CView.text("your [nipples]");
        if (player.body.chest.find(BreastRow.FuckableNipples)) CView.text(", sinking inside your moist tit-holes almost immediately");
        CView.text(".  With two vibrators savaging your [nipples] and the black-hued beauty riding your cock like her own personal rocket, you can barely contain yourself.  Your back arches, and you try to buck your hips, to fuck her, her cock, whatever, but you're still too exhausted from the fight to shift her body weight.  You can do nothing but lie there while she uses you, humping your cock, her ebony length dragging its lurid pleasure across your " + describeCock(player, cockThatFits) + " while you wriggle and writhe ecstatically.");

        CView.text("\n\nAfter a while of continual teasing, the sable seductress leans over you and lets her huge breasts sweetly kiss on your elephantine mass.  She leans down as if to kiss you, but at the last moment, she swerves to the side, licking the nape of your neck up to your ear before breathily whispering promises into your ear, \"<i>There's nothing like blowing off some steam out here in the sands after my work.  And to have such a... gifted " + mf(player, "boy", "girl") + " to play with is a treat in and of itself.</i>\"  She grunts, sweaty balls bouncing on your [sheath].  \"<i>You look so helpless for someone who's packing so much.  I look forward to seeing how you look with my cum hiding that expression.</i>\"");

        CView.text("\n\nYou frown until she rubs a particularly sensitive spot on your " + describeCock(player, cockThatFits) + ", then a dopey, pleasure-addled smile replaces it.  She kissing your cheek and coos, \"<i>That's more like it, pet.  I'm going to make you so messy.</i>\"  Her toes fondle your [sheath] as they slide down to your ");
        if (player.body.balls.count > 0) {
            CView.text("[balls], rolling the ");
            if (player.body.balls.size < 2) CView.text("petite ");
            else if (player.body.balls.size >= 5) CView.text("weighty ");
            CView.text("orbs across her soles.");
        }
        else if (player.body.vaginas.length > 0) CView.text("[vagina], slipping a few toes through your folds while a big toe diddles your [clit].");
        else CView.text("taint, softly stroking the sensitive skin between your groin and [asshole].");

        CView.text("\n\nGroaning, the Cum Witch asks, \"<i>Since your big, sensitive shaft is so much fun for me to play with...  oooh, yeah....  Uh, I'll give you a choice!</i>\"  She smirks and slides her whole body along your prodigious length, breasts bouncing along the side while her cock drips all over you, glazing you white.  \"<i>I'll cum all over your face, and make sure you do too, but I'll be sure to leave you just a little more virile in exchange.  Or, I'll aim off the side, but borrow a little bit of your potency when I do.  What'll it be, " + mf(player, "stud", "hun") + "?</i>\"");

        CView.text("\n\nSo if you avoid a facial she'll steal some of your semen production, but if you take it, she'll make you MORE virile.  While you're mulling it over, she's still grinding on you, distracting you with flashes of salacious delight.  The clock is ticking, and if you don't pick soon, she might pick for you.");
        // [Facial] [No Facial]
        player.stats.raw.lust = 100;

        return {
            choices: [
                ["Facial", choiceWrap(tooBigCumWitchLossFacial, cumWitch)],
                ["No Facial", tooBigCumWitchLossNoFacial],
            ]
        };
    }
    else {
        // *Dick Fits Male Loss Scene
        // Get cock ridden
        CView.text("\n\nAbruptly, the Cum Witch climbs atop your lust-wracked body.  Her robe is off in a flash, and you're finally able to appreciate her sweat-slicked, onyx-skinned body as she sits on your midsection, glistening in the desert sun.  She crosses her arms under her immense breasts, so large they'd put a cow-girl to shame, and flexes to make them shake and wobble, big brown nipples swaying hypnotically before you.  Your eyes gravitate towards the heavenly teats, each wide and supple, capped with a hard, pebbly protrusion that seems to call for your tongue.  Giggling, she moves one of her arms back to grab [oneCock], and she rolls her hips back until your boner is devoured by her slippy butt-cheeks, pressing through the ebony crack until it feels her dusky, moist cunt-lips dragging along it.  Your " + describeCockHead(cockThatFits) + " appears underneath her large balls, peeping out to leak its lust onto your belly.");

        CView.text("\n\n\"<i>How about this?  I can just slide back and forth on you while your eyes track my tits, entranced by nipples until you're creaming your little tummy with your spent seed.</i>\" she suggests, interrupted by her own coo of pleasure when your " + describeCock(player, cockThatFits) + " lurches underneath her and floods with excitement.  \"<i>Oh, you liked that huh?  Does the Champion have a titty little hypno-fetish?</i>\"  Her breasts continue to sway slowly, and her hips join in with the same slow rhythm.  Each of her hands is glowing now, lighting up with purplish-white intensite as she shakes her breasts and butt for your pleasure.  Confidently, she explains, \"<i>I'm quite skilled at mental manipulation, but surely you know that already.  My nipples ARE quite erotic.  You can't even look away any more, but surely you don't mind?</i>\"");

        CView.text("\n\nSqueezing her cheeks around your spasming erection, the Cum Witch releases your " + describeCock(player, cockThatFits) + " so that she can support herself as she leans forward, bringing her bouncing, hypnotic breasts closer to your face.  You open your eyes wider to try and take in more of their erotic expanse.  Your " + describeCock(player, cockThatFits) + " is getting hotter and wetter, and the sorceress's own erection has risen to complete and full hardness, the ebony tool bouncing lewdly on your [chest] as she grinds her sopping-wet cunt across you.");

        CView.text("\n\nHer voice purrs, \"<i>Just focus on my nipples and let me worry about making you feel good.  My pussy has your cock entranced and obedient, sure to cum before long, and you can just relax and enjoy the swaying, heavenly shape of chest, can't you?</i>\"");

        CView.text("\n\nYou DO feel good... so good.  It probably won't be long before you're erupting, and as close as her breasts are, there's nothing else to look at anyways.  Increasingly, your muscles are going slack, and a dopey smile has spread on your face.  This woman knows her way around a dick.");

        CView.text("\n\n\"<i>See?  I told you that focusing on my nipples would help you feel good.  Now, just keep looking at them.  Let your mind completely fixate on them to exclusion of all else and I'll keep you feeling better and better,</i>\" the witch says, as everything excepting her supple, dark buds seems to fade into a haze of pleasure.  Her voice goes low and husky as she continues, \"<i>That's right, pet.  You focus on the nipples and listen to my voice.  It'll tell you what you're feeling.</i>\"  There's a sloppy, wet squish as your " + describeCock(player, cockThatFits) + " is pulled into a silky, wet hole.  \"<i>And you're feeling so good thanks to how well you're focusing.  The more you focus, the better it feels and the less you have to worry about what I'm saying and simply FEEL.</i>\"");

        CView.text("\n\nShe's so right, and it feels so good.  It's like your head is slowly emptying of everything but the view of her nipples, and warm, wet pleasure is filling in along with the periphery, along with words you can't take the time to process - enjoying the view and the pleasure is too important.  A high pitched whimper of pleasure escapes your lips when you the snug tunnel compress around your " + describeCock(player, cockThatFits) + ".  It's so perfect - like it was crafted for you and you alone, and the folds are sliding and rubbing every vein, every nerve ending, every part of your tool, washing you with unholy pleasure that you're barely conscious of.  It feels so good to relax underneath her.");

        CView.text("\n\nThe breasts stop swaying, but that doesn't matter - it just lets you oggle her nipples more effectively.  Even when she moves to press one into your lips, you can still see it your minds eye as if viewed from a disembodied perspective.  Her beautiful, bountiful breasts are all over you, and everything is so warm and wet and pleasant that you just feel like you could melt right into her bosom.  It tastes as marvelous as it looks, and you suckle with unthinking passion.");

        // Balls
        if (player.body.balls.count > 0) CView.text("\n\nA hand secures itself to your [sack] firmly, squeezing a tugging on your twitching cum-factories, massaging the bubbling seed within to a frenzy.  The witch's voice grows insistent as she massages your nuts, ");
        else CView.text("\n\nA hand presses down on the border between your gentials and your [asshole], rubbing in slow circles, just hard enough that you can barely feel it pushing on something inside you.  The witch's voice grows insistent as she works your body, ");
        CView.text("loud and firm enough for your dazzled mind to cogitate her words: \"<i>Oh, my pretty bitch " + mf(player, "boy", "girl") + ", feel the pressure building up inside you.  Higher and higher now... It's almost too much, isn't it?  You don't need to answer, just feel it grow thicker and hotter.  You're going to cum like a geyser, because of me, and you're going to love it.  You'll always want to cum for me, won't you?</i>\"");

        CView.text("\n\nA vibrating, staccato pleasure sizzles from the tips of her fingers and directly into your [balls].  Instantly, a heaviness sets in.  There's a palpable denseness in your reproductive organs, like they've swollen slightly or at the very least simply increased in capacity, and they STILL feel so full you're about to burst.  Cum is freely drizzling from [eachCock]");
        if (player.body.cocks.length > 1) CView.text(", particularly the one inside her.");
        CView.text("  It drips all over you, leaking out from inside her nethers, so thick it's tinted whitish with the absurd amount of semen boiling out of you.  You gurgle in delight as a fresh spasm of magical energy washes through your loins, plumping you perfectly down there until you can contain it no longer.  The voice inside you breathily whispers, \"<i>Cum for me,</i>\" and you do.");

        CView.text("\n\nYour orgasm is the most relaxing, sublime orgasm you've had in recent memory.  The ecstatic pleasure shooting through your nervous system is so strong that you're not sure how long you can take it, but your flagging, relaxed body limply lays there while your hips and groin contort themselves to keep up the pulsating biological rhythm going.  Warm splashes splatter across your chest");
        if (player.body.cocks.length > 1) {
            CView.text(" while your extra erection");
            if (player.body.cocks.length > 1) CView.text("s spurt");
            else CView.text(" spurt");
            CView.text(" some cream up the ebony arch of your mistress's back");
        }
        else CView.text(" from her bouncing, ebony erection");
        CView.text(".  At the same time, her clenching, pussy climaxes around you while you fill it.  You're spraying ropes of spooge into her so fast that it's backwashing out around your " + describeCock(player, cockThatFits) + ", the veins pumping almost as hard as your overactive reproductive system.");

        CView.text("\n\nIt goes on for so long that you're still cumming long after you would have thought it should end, and you just can't take it anymore.  Even though you're still fixated on her gorgeous nipples, your eyes start rolling back into your head, jerking further under your eyelids with the frothy seed-packed payloads you're releasing.  You whimper when she pulls off you, seed still dripping from her well-used cunt and slowly-deflating cock.  Still cumming, still feeling the glorious bliss she's conditioned you to feel in the presence of her breasts, you squirt wet ropes straight into the air while she dresses and kneels down next to you, whispering promises of how she'll make you cum more and more every time you give in to her.");

        CView.text("\n\nYou black out when she prods your groin with a fresh tingle of magic, launching a torrent of jism a dozen feet into the air in the process.");

        player.orgasm();
        player.stats.sens += 5;

        if (player.cumQ() < 60000) player.body.cumMultiplier += 2;
        return { next: passTime(1) };
    }
}

// Take The Too Big Loss Facial
export function tooBigCumWitchLossFacial(player: Character, cumWitch: Character): NextScreenChoices {
    CView.clear();
    const cockThatFits = player.body.cocks.find(Cock.CockThatFits(cumWitch.vaginalCapacity()));
    CView.text("Ruefully, you tell her that you don't mind a little cum in exchange for having your own abilities enhanced.  The knowing grin that spreads across her face makes it seem like she knew the result was a foregone conclusion.");
    if (player.stats.cor < 33) CView.text("  You shudder at the knowledge of what's going to happen to you.  Just why did you agree to this?");
    else if (player.stats.cor < 66) CView.text("  You catch yourself licking your lips as the knowledge of what is about to happen to you sinks in. Despite hastily stopping yourself, the Cum Witch still saw, and she smiles.");
    else CView.text("  You give her a lewd look and lick your tongue across your lips as you anticipate the big, fat load she's going to feed you, hungry for wet, decadent pleasure regardless of inhibitions.");

    CView.text("\n\nThe hot moisture she's secreting all over your " + describeCock(player, cockThatFits) + " seems to be affecting you as well as the vibrations ");
    if (player.body.chest.find(BreastRow.FuckableNipples)) CView.text("in");
    else CView.text("on");
    CView.text(" your [nipples].  It feels like there's so much blood being forced inside your erection that the sheer over-tumescence will make you burst.  The need is overwhelming.  You HAVE to cum, and you're so wet, so stained with spunk and juice that there's no time like now.  The Cum Witch's heels press in on your ");
    if (player.body.balls.count > 0) CView.text("[balls], compressing them slightly as a tingle of magic lances into you, fattening them under her ministrations");
    else if (player.body.vaginas.length > 0) CView.text("[vagina], digging into the slippery slit as a tingle of magic spreads through it and into your core, thickening some organ inside you");
    else CView.text("taint, rubbing it as a tingle of electric need phases through your " + skinFurScales(player) + " to assault your swelling prostate and seminal vesicles");
    CView.text(", and in that moment, you lose all ability to hold out.  You're cumming, and you're cumming now.");

    CView.text("\n\nLooking on in awe, you watch your gigantic urethra slowly dilate, opening wide to reveal the onrushing torrent of sticky, white goo, mere moments before it launches straight into your face, hair, and mouth.");
    if (player.body.cocks.sort(Cock.Largest).get(0)!.length >= player.body.tallness / 1.6) CView.text("  The Cum Witch smiles as she holds it, bending it to make sure the overlong shaft deposits its thick load on your " + describeFaceShort(player) + " where it belongs.");
    CView.text("  Your captor is still humping it even as you cum, moaning as the bulges of copious cream press on her smaller boner.  Her visage is alight with ecstasy, and her heavy nipples are dragging on your [chest] as she begins to grunt, her motions going jerky in her ecstasy.");

    CView.text("\n\nOozing jism splatters into you with increasing frequency as your supercharged reproductive system asserts itself, thick globs dripping from your chin even as the Cum Witch peaks, adding her own virile sprays into the semen-shower.  Your " + describeHair(player) + " mats down as it's soaked with the alabaster sperm, so much so that it dangles in sticky ringlets from your ears.  It feels so good that you start to moan, but that's immediately silenced by a cheek-bulging seed-eruption.  You're not sure whether it's yours or hers, but all you can do is swallow it down and try to breathe through the salty mask as it's piled on thicker and thicker.  There's so much that it's forming a hot, wet puddle behind you and dripping down your [chest], making the buzzing stones squish and splash it about as they help to bring you off.");

    CView.text("\n\nThe Cum Witch climbs off you after what must be a minute of non-stop bukkake, but you keep cumming, too addled with pleasure to move your own spooge-hose.  Eyes rolling back in bliss, you cum yourself into unconsciousness while the victorious futanari gets dressed, stopping to rub a last few twinges of magic into you before she goes.  She wouldn't want you to run out of jism early, now would she?");
    // Cum and ballsize boost if appropriate
    if (player.cumQ() < 1000) {
        player.body.cumMultiplier += 5;
    }
    else player.body.cumMultiplier += 2;
    if (player.body.balls.size < 7) player.body.balls.size++;
    player.orgasm();
    player.stats.lib += 1;
    player.stats.sens += 1;

    return { next: passTime(1) };
}
