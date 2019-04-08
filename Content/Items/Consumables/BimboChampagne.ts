import { Consumable } from 'Engine/Items/Consumable';
import { ConsumableName } from '../ConsumableName';
import { Character } from 'Engine/Character/Character';
import { ItemDesc } from 'Engine/Items/ItemDesc';
import { CView } from 'Engine/Display/ContentView';
import { EffectType } from 'Content/Effects/EffectType';
import { BreastRow } from 'Engine/Body/BreastRow';
import { Vagina } from 'Engine/Body/Vagina';
import { bimboChampagne } from 'Content/Scenes/Places/TelAdre/Niamh';

export class BimboChampagne extends Consumable {
    public constructor() {
        super(ConsumableName.BimboChampagne, new ItemDesc("BimboCh", "a bottle of bimbo champagne"), 1);
    }

    public canUse(character: Character) {
        return true;
    }

    public use(character: Character) {
        CView.clear();
        if (
            (character.effects.has(EffectType.FutaFaculties) && character.effects.has(EffectType.FutaForm)) ||
            (character.effects.has(EffectType.BimboBody) && character.effects.has(EffectType.BimboBrains))
        ) {
            CView.text("You could've swore the stuff worked when you saw Niamh do it to others, but for some reason, it had, like, no effect on you. How weird!");
        }
        else if (!character.effects.has(EffectType.BimboChampagne)) CView.text("You uncork the bottle and breathe in the fizzy, spicy aroma of the sparkling liquor.  Breathing deeply, you open your mouth and begin pouring the ever-effervescent fluid inside.  It's sweet and slightly gooey, and the feel of it sliding down your throat is intensely... awesome?  Like, totally!");
        else CView.text("You find yourself falling even further into the dense bimbo mindset.  You do feel, like, super-good and all, though!\n\nMoaning lewdly, you begin to sway your hips from side to side, putting on a show for anyone who might manage to see you.   You just feel so... sexy.  Too sexy to hide it.  Your body aches to show itself and feel the gaze of someone, anyone upon it.  Mmmm, it makes you so wet!  You sink your fingers into your sloppy cunt with a groan of satisfaction.  Somehow, you feel like you could fuck anyone right now!");

        bimboChampagne(character);
    }
}
