import { Consumable } from './Consumable';
import { ConsumableName } from './ConsumableName';
import { randInt } from '../../../Engine/Utilities/SMath';
import { VaginaWetness } from '../../Body/Vagina';
import { Character } from '../../Character/Character';
import { PerkType } from '../../Effects/PerkType';
import { ItemDesc } from '../ItemDesc';
import { describeCocksLight } from '../../Descriptors/CockDescriptor';
import { describeClit, describeVagina } from '../../Descriptors/VaginaDescriptor';
import { CView } from '../../../Page/ContentView';
import { FlagType } from '../../FlagType';
import { Flags } from '../../Flags';

export const MinotaurCumFlags = {
    MINOTAUR_CUM_ADDICTION_STATE: 0,
    MINOTAUR_CUM_ADDICTION_TRACKER: 0,
    MINOTAUR_CUM_REALLY_ADDICTED_STATE: 0,
};

Flags.set(FlagType.MinotaurCum, MinotaurCumFlags);

export class MinotaurCum extends Consumable {
    public constructor() {
        super(ConsumableName.MinotaurCum, new ItemDesc("MinoCum", "a sealed bottle of minotaur cum", "This bottle of minotaur cum looks thick and viscous.  You know it has narcotic properties, but aside from that its effects are relatively unknown."), 60);
    }

    public use(character: Character) {
        // Minotaur cum addiction
        // character.minoCumAddiction(7);
        CView.clear();
        CView.text("As soon as you crack the seal on the bottled white fluid, a ");
        if (MinotaurCumFlags.MINOTAUR_CUM_ADDICTION_STATE === 0) CView.text("potent musk washes over you.");
        else CView.text("heavenly scent fills your nostrils.");
        if (MinotaurCumFlags.MINOTAUR_CUM_ADDICTION_TRACKER < 50) CView.text("  It makes you feel dizzy, ditzy, and placid.");
        else CView.text("  It makes you feel euphoric, happy, and willing to do ANYTHING to keep feeling this way.");
        CView.text("  Unbidden, your hand brings the bottle to your lips, and the heady taste fills your mouth as you convulsively swallow the entire bottle.");
        // -Raises lust by 10.
        // -Raises sensitivity
        character.stats.sens += 1;
        character.stats.lust += 10;
        // -Raises corruption by 1 to 50, then by .5 to 75, then by .25 to 100.
        if (character.stats.cor < 50) character.stats.cor += 1;
        else if (character.stats.cor < 75) character.stats.cor += 0.5;
        else character.stats.cor += 0.25;
        CView.text("\n\nIntermittent waves of numbness wash through your body, turning into a warm tingling that makes you feel sensitive all over.  The warmth flows through you, converging in your loins and bubbling up into lust.");
        if (character.body.cocks.length > 0) {
            CView.text("  ");
            if (character.body.cocks.length === 1) CView.text("Y");
            else CView.text("Each of y");
            CView.text("our " + describeCocksLight(character) + " aches, flooding with blood until it's bloating and trembling.");
        }
        if (character.body.vaginas.length > 0) {
            const vagina = character.body.vaginas.get(0)!;
            CView.text("  Your " + describeClit(character) + " engorges, ");
            if (character.body.clit.length < 3) CView.text("parting your lips.");
            else CView.text("bursting free of your lips and bobbing under its own weight.");
            if (vagina.wetness <= VaginaWetness.NORMAL) CView.text("  Wetness builds inside you as your " + describeVagina(character, vagina) + " tingles and aches to be filled.");
            else if (vagina.wetness <= VaginaWetness.SLICK) CView.text("  A trickle of wetness escapes your " + describeVagina(character, vagina) + " as your body reacts to the desire burning inside you.");
            else if (vagina.wetness <= VaginaWetness.DROOLING) CView.text("  Wet fluids leak down your thighs as your body reacts to this new stimulus.");
            else CView.text("  Slick fluids soak your thighs as your body reacts to this new stimulus.");
        }
        // (Minotaur fantasy)
        if (/*!Game.inCombat &&*/ randInt(10) === 1) {
            CView.text("\n\nYour eyes flutter closed for a second as a fantasy violates your mind.  You're on your knees, prostrate before a minotaur.  Its narcotic scent fills the air around you, and you're swaying back and forth with your belly already sloshing and full of spunk.  Its equine-like member is rubbing over your face, and you submit to the beast, stretching your jaw wide to take its sweaty, glistening girth inside you.  Your tongue quivers happily as you begin sucking and slurping, swallowing each drop of pre-cum you entice from the beastly erection.  Gurgling happily, you give yourself to your inhuman master for a chance to swallow into unthinking bliss.");
            character.stats.lib += 1;
            character.stats.lust += randInt(5) + character.stats.cor / 20 + MinotaurCumFlags.MINOTAUR_CUM_ADDICTION_TRACKER / 5;
        }
        // (Healing � if hurt and uber-addicted (hasperk))
        if (character.stats.HP < character.stats.maxHP() && character.perks.has(PerkType.MinotaurCumAddict)) {
            CView.text("\n\nThe fire of your arousal consumes your body, leaving vitality in its wake.  You feel much better!");
            character.stats.HP += Math.floor(character.stats.maxHP() / 4);
        }
        // Uber-addicted status!
        if (character.perks.has(PerkType.MinotaurCumAddict) && MinotaurCumFlags.MINOTAUR_CUM_REALLY_ADDICTED_STATE <= 0) {
            MinotaurCumFlags.MINOTAUR_CUM_REALLY_ADDICTED_STATE = 3 + randInt(2);
            CView.text("\n\n<b>Your body feels so amazing and sensitive.  Experimentally you pinch yourself and discover that even pain is turning you on!</b>");
        }
    }
}
