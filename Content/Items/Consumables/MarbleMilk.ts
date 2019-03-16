import { Consumable } from 'Engine/Items/Consumable';
import { ConsumableName } from '../ConsumableName';
import { Character } from 'Engine/Character/Character';
import { ItemDesc } from 'Engine/Items/ItemDesc';

export class MarbleMilk extends Consumable {
    public constructor() {
        super(ConsumableName.MarbleMilk, new ItemDesc("M. Milk", "a clear bottle of milk from Marble", "A clear bottle of milk from Marble's breasts. It smells delicious."));
    }

    public use(character: Character) {
        // // Bottle of Marble's milk - item
        // // Description: "A clear bottle of milk from Marble's breasts. �It smells delicious.  "
        // CView.clear();
        // // Text for when the character uses the bottle:
        // // [before the character is addicted, Addiction < 30]
        // if (MarbleFlags.Addiction < 30 && MarbleFlags.isAddict === 0)
        //     CView.text("You gulp down the bottle's contents; Marble makes some good tasting milk.\n\n");
        // // [before the character is addicted, Addiction < 50]
        // else if (MarbleFlags.isAddict <= 0)
        //     CView.text("You gulp down the bottle's contents; Marble makes some really good tasting milk.\n\n");
        // else if (MarbleFlags.isAddict > 0) {
        //     // [character is completely addicted]
        //     if (character.effects.has(EffectType.MarblesMilk)) CView.text("You gulp down the bottle's contents; it's no substitute for the real thing, but it's a nice pick me up.\n\n");
        //     else {
        //         // [character is no longer addicted]
        //         if (character.effects.has(EffectType.MarbleResistant)) CView.text("You gulp down the bottle's contents; you're careful not to get too attached to the taste.\n\n");
        //         // [character is addicted]
        //         else CView.text("You gulp down the bottle's contents; you really needed that.\n\n");
        //     }
        // }
        // // Increases addiction by 5, up to a max of 50 before the character becomes addicted, no max after the character is addicted.
        // // Scenes.marbleScene.marbleStatusChange(0, 5);
        // // Does not apply the 'Marble's Milk' effect
        // // Purge withdrawl
        // if (character.effects.has(EffectType.MarbleWithdrawl)) {
        //     character.effects.removeByName(EffectType.MarbleWithdrawl);
        //     character.stats.tou += 5;
        //     character.stats.int += 5;
        //     CView.text("You no longer feel the symptoms of withdrawal.\n\n");
        // }
        // // Heals the character 70-100 health
        // displayCharacterHPChange(character, 70 + randInt(31));
        // // Restores a portion of fatigue (once implemented)
        // character.stats.fatigue -= 25;
        // // If the character is addicted, this item negates the withdrawal effects for a few hours (suggest 6), there will need to be a check here to make sure the withdrawal effect doesn't reactivate while the character is under the effect of 'Marble's Milk'.
        // if (character.effects.has(EffectType.BottledMilk)) {
        //     character.effects.create(EffectType.BottledMilk)!.values.combatExpire = (6 + randInt(6));
        // }
        // else character.effects.create(EffectType.BottledMilk, { combatExpire: 12 });

        // $> Convert this properly [partially converted ^] [as3 v]

        // player.slimeFeed();
        // //Bottle of Marble's milk - item
        // //Description: "A clear bottle of milk from Marble's breasts.  It smells delicious.  "
        // outputText("", true);
        // //Text for when the player uses the bottle:
        // //[before the player is addicted, Addiction < 30]
        // if (player.statusAffectv2(StatusAffects.Marble) < 30 && player.statusAffectv3(StatusAffects.Marble) == 0) outputText("You gulp down the bottle's contents; Marble makes some good tasting milk.\n\n", false);
        // //[before the player is addicted, Addiction < 50]
        // else if (player.statusAffectv3(StatusAffects.Marble) <= 0) outputText("You gulp down the bottle's contents; Marble makes some really good tasting milk.\n\n", false);
        // else if (player.statusAffectv3(StatusAffects.Marble) > 0) {
        //     //[player is completely addicted]
        //     if (player.findPerk(PerkLib.MarblesMilk) >= 0) outputText("You gulp down the bottle's contents; it's no substitute for the real thing, but it's a nice pick me up.\n\n", false);
        //     else {
        //         //[player is no longer addicted]
        //         if (player.findPerk(PerkLib.MarbleResistant) >= 0) outputText("You gulp down the bottle's contents; you're careful not to get too attached to the taste.\n\n", false);
        //         //[player is addicted]
        //         else outputText("You gulp down the bottle's contents; you really needed that.\n\n", false);
        //     }
        // }
        // //Increases addiction by 5, up to a max of 50 before the player becomes addicted, no max after the player is addicted.
        // kGAMECLASS.marbleScene.marbleStatusChange(0, 5);
        // //Does not apply the 'Marble's Milk' effect
        // //Purge withdrawl
        // if (player.findStatusAffect(StatusAffects.MarbleWithdrawl) >= 0) {
        //     player.removeStatusAffect(StatusAffects.MarbleWithdrawl);
        //     dynStats("tou", 5, "int", 5);
        //     outputText("You no longer feel the symptoms of withdrawal.\n\n", false);
        // }
        // //Heals the player 70-100 health
        // HPChange(70 + rand(31), true);
        // //Restores a portion of fatigue (once implemented)
        // kGAMECLASS.changeFatigue(-25);
        // //If the player is addicted, this item negates the withdrawal effects for a few hours (suggest 6), there will need to be a check here to make sure the withdrawal effect doesn't reactivate while the player is under the effect of 'Marble's Milk'.
        // if (player.findStatusAffect(StatusAffects.BottledMilk) >= 0) {
        //     player.addStatusValue(StatusAffects.BottledMilk, 1, (6 + rand(6)));
        // }
        // else player.createStatusAffect(StatusAffects.BottledMilk, 12, 0, 0, 0);

    }
}
