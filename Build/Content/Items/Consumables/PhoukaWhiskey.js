define(["require", "exports", "Engine/Items/Consumable", "../ConsumableName", "Engine/Utilities/SMath", "Content/Body/Pregnancy/PregnancyType", "Content/Effects/EffectType", "Engine/Items/ItemDesc", "Engine/Display/ContentView", "Engine/Body/Pregnancy/Womb", "Engine/Flags"], function (require, exports, Consumable_1, ConsumableName_1, SMath_1, PregnancyType_1, EffectType_1, ItemDesc_1, ContentView_1, Womb_1, Flags_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.PhoukaWhiskeyFlags = Flags_1.Flags.register("Phouka Whiskey", {
        PREGNANCY_CORRUPTION: 0,
    });
    class PhoukaWhiskey extends Consumable_1.Consumable {
        constructor() {
            super(ConsumableName_1.ConsumableName.PhoukaWhiskey, new ItemDesc_1.ItemDesc("Ph. Whiskey", "a small bottle of whiskey", "A small, corked glass bottle with a dark amber liquid inside.  The whiskey smells strongly of peat."), 20);
        }
        canUse(character) {
            switch (this.phoukaWhiskeyAcceptable(character)) {
                case -4:
                    ContentView_1.CView.text("You stare at the bottle for a moment, but decide not to risk harming one of the children growing inside you.\n\n");
                    return false;
                case -3:
                    ContentView_1.CView.text("You stare at the bottle for a moment, but decide not to risk harming either of the children growing inside you.\n\n");
                    return false;
                case -2:
                    ContentView_1.CView.text("You stare at the bottle for a moment, but decide not to risk harming the child growing inside your colon.\n\n");
                    return false;
                case -1:
                    ContentView_1.CView.text("You stare at the bottle for a moment, but decide not to risk harming the child growing inside your womb.\n\n");
                    return false;
                default:
            }
            return true; // Zero and up will return true
        }
        use(character) {
            switch (this.phoukaWhiskeyDrink(character)) {
                case 0: // Character isn't pregnant
                    ContentView_1.CView.text("You uncork the bottle and drink some whiskey, hoping it will let you relax for a while.\n\nIt's strong stuff and afterwards you worry a bit less about the future.  Surely things will right themselves in the end.");
                    character.stats.cor += SMath_1.randInt(2) + 1; // These gains are permanent
                    character.stats.lust += SMath_1.randInt(8) + 1;
                    break;
                case 1: // Child is a phouka or satyr, loves alcohol
                    ContentView_1.CView.text("You uncork the bottle and drink some whiskey, hoping it will help with the gnawing hunger for alcohol you've had since this baby started growing inside you.\n\nYou down the booze in one shot and a wave of contentment washes over you.  It seems your passenger enjoyed the meal.");
                    break;
                case 2: // Child is a faerie but will become a phouka with this drink
                    ContentView_1.CView.text("At first you feel your baby struggle against the whiskey, then it seems to grow content and enjoy it.");
                    break;
                case 3: // Child is a faerie, hates phouka whiskey
                    ContentView_1.CView.text("You feel queasy and want to throw up.  There's a pain in your belly and you realize the baby you're carrying didn't like that at all.");
            }
            exports.PhoukaWhiskeyFlags.PREGNANCY_CORRUPTION++; // Faerie or phouka babies become more corrupted, no effect if the character is not pregnant or on other types of babies
            this.phoukaWhiskeyAddStatus(character);
        }
        phoukaWhiskeyAcceptable(character) {
            // This function provides a single common test that can be used both by this class and the PhoukaScene class
            // Returns:	0 = canUse (not pregnant), 1 = canUse (single pregnancy, womb), 2 = canUse (single pregnancy, colon), 3 = canUse (double pregnancy, both OK),
            // 			-1 = No (single pregnancy, womb), -2 = No (single pregnancy, colon), -3 = No (double pregnancy, both not OK), -4 = No (double pregnancy, one OK, one not)
            if (character.body.wombs.find(Womb_1.Womb.NotPregnant)) {
                if (!character.body.buttWomb.isPregnant())
                    return 0; // No baby. Simplest, most common case
                else if (character.body.buttWomb.isPregnant() && character.body.buttWomb.pregnancy.type === PregnancyType_1.PregnancyType.SATYR)
                    return 2;
                return -2;
            }
            if (!character.body.butt) { // Single pregnancy, carried in the womb
                if (character.body.wombs.find(Womb_1.Womb.PregnantWithType(PregnancyType_1.PregnancyType.SATYR)))
                    return 1;
                if (character.body.wombs.find(Womb_1.Womb.PregnantWithType(PregnancyType_1.PregnancyType.FAERIE)))
                    return 1;
                return -1;
            }
            // Double pregnancy
            const wombBabyLikesAlcohol = (character.body.wombs.find(Womb_1.Womb.PregnantWithType(PregnancyType_1.PregnancyType.SATYR)) || character.body.wombs.find(Womb_1.Womb.PregnantWithType(PregnancyType_1.PregnancyType.FAERIE)));
            const colonBabyLikesAlcohol = character.body.buttWomb.isPregnant() && character.body.buttWomb.pregnancy.type === PregnancyType_1.PregnancyType.SATYR;
            if (wombBabyLikesAlcohol && colonBabyLikesAlcohol)
                return 3;
            if (!wombBabyLikesAlcohol && !colonBabyLikesAlcohol)
                return -3;
            return -4;
        }
        phoukaWhiskeyDrink(character) {
            // This function provides a single common test that can be used both by this class and the PhoukaScene class
            // Returns:	0 = Character is not pregnant, 1 = Character is pregnant with a satyr or phouka, 2 = Character is pregnant with a faerie that will become a phouka with this drink,
            // 			3 = Character is pregnant with a faerie that will remain a faerie after this drink
            if (character.body.wombs.find(Womb_1.Womb.NotPregnant) && !character.body.buttWomb.isPregnant())
                return 0;
            if (character.body.wombs.find(Womb_1.Womb.PregnantWithType(PregnancyType_1.PregnancyType.FAERIE))) {
                if (exports.PhoukaWhiskeyFlags.PREGNANCY_CORRUPTION === 0)
                    return 2;
                if (exports.PhoukaWhiskeyFlags.PREGNANCY_CORRUPTION < 0)
                    return 3;
            }
            return 1; // Pregnancy has to be either a satyr or a phouka
        }
        phoukaWhiskeyAddStatus(character) {
            const libidoChange = (character.stats.lib + 25 > 100 ? 100 - character.stats.lib : 25);
            const sensChange = -(character.stats.sens < 10 ? character.stats.sens : 10);
            const speedChange = -(character.stats.spe < 20 ? character.stats.spe : 20);
            const intChange = -(character.stats.int < 20 ? character.stats.int : 20);
            const phoukaWhiskeyEffect = character.effects.getByName(EffectType_1.EffectType.PhoukaWhiskeyAffect);
            if (phoukaWhiskeyEffect) {
                if (!phoukaWhiskeyEffect.values.drinksSoFar)
                    phoukaWhiskeyEffect.values.drinksSoFar = 0;
                const drinksSoFar = phoukaWhiskeyEffect.values.drinksSoFar;
                if (drinksSoFar < 4)
                    phoukaWhiskeyEffect.values.drinksSoFar = 8 - (2 * drinksSoFar);
                else
                    phoukaWhiskeyEffect.values.drinksSoFar = 1; // Always get at least one more hour of drunkenness
                phoukaWhiskeyEffect.values.combatExpire = 1;
                phoukaWhiskeyEffect.values.lib = libidoChange;
                phoukaWhiskeyEffect.values.sens = sensChange;
                phoukaWhiskeyEffect.values.spe = speedChange;
                phoukaWhiskeyEffect.values.int = intChange;
                ContentView_1.CView.text("\n\nOh, it tastes so good.  This stuff just slides down your throat.");
            }
            else { // First time
                character.effects.create(EffectType_1.EffectType.PhoukaWhiskeyAffect, {
                    hourExpire: 1,
                    lib: libidoChange,
                    sens: sensChange,
                    spe: speedChange,
                    int: intChange,
                    drinksSoFar: 8,
                });
                // The four stats we’re affecting get paired together to save space. This way we don’t need a second StatusAffect to store more info.
            }
        }
        phoukaWhiskeyExpires(character) {
            const phoukaWhiskeyEffect = character.effects.getByName(EffectType_1.EffectType.PhoukaWhiskeyAffect);
            if (phoukaWhiskeyEffect) {
                if (!phoukaWhiskeyEffect.values.drinksSoFar)
                    phoukaWhiskeyEffect.values.drinksSoFar = 0;
                const numDrunk = phoukaWhiskeyEffect.values.drinksSoFar;
                // Get back all the stats you lost
                character.effects.removeByName(EffectType_1.EffectType.PhoukaWhiskeyAffect);
                if (numDrunk > 3)
                    ContentView_1.CView.text("\n<b>The dizzy sensation dies away and is replaced by a throbbing pain that starts in your skull and then seems to run all through your body, seizing up your joints and making your stomach turn.  The world feels like it’s off kilter and you aren’t in any shape to face it.  You suppose you could down another whiskey, but right now that doesn’t seem like such a good idea.</b>\n");
                else if (numDrunk > 1)
                    ContentView_1.CView.text("\n<b>The fuzzy, happy feeling ebbs away.  With it goes the warmth and carefree feelings.  Your head aches and you wonder if you should have another whiskey, just to tide you over</b>\n");
                else
                    ContentView_1.CView.text("\n<b>The fuzzy, happy feeling ebbs away.  The weight of the world’s problems seems to settle on you once more.  It was nice while it lasted and you wouldn’t mind having another whiskey.</b>\n");
            }
        }
    }
    exports.PhoukaWhiskey = PhoukaWhiskey;
});
//# sourceMappingURL=PhoukaWhiskey.js.map