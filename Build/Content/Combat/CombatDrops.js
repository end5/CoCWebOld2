define(["require", "exports", "Engine/Inventory/EquipSlot", "Content/Items/CockSockName", "Engine/Display/ContentView", "Content/Menus/InGame/PlayerMenu", "Content/Items/ConsumableName", "Content/Character/CharacterType", "Content/Items/WeaponName", "Engine/Utilities/SMath", "Content/Scenes/Areas/Forest/BeeGirl", "Content/Scenes/NPCs/Jojo", "Content/Items/ArmorName", "Content/Scenes/NPCs/Ceraph", "Content/Scenes/NPCs/CeraphFollowerScene", "Content/Utilities/Dates", "Content/Items/Consumables/Eggs", "Content/Effects/EffectType", "Engine/Items/ItemDict"], function (require, exports, EquipSlot_1, CockSockName_1, ContentView_1, PlayerMenu_1, ConsumableName_1, CharacterType_1, WeaponName_1, SMath_1, BeeGirl_1, Jojo_1, ArmorName_1, Ceraph_1, CeraphFollowerScene_1, Dates_1, Eggs_1, EffectType_1, ItemDict_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function awardPlayer(character, enemy) {
        const gildedCockSockIndex = character.inventory.cockSocks.findIndex(EquipSlot_1.EquipSlot.FilterName(CockSockName_1.CockSockName.Gilded));
        if (gildedCockSockIndex !== -1) {
            enemy.inventory.gems += enemy.inventory.gems * 0.15 + 5 * character.body.cocks.get(gildedCockSockIndex).length;
        }
        const XP = enemy.stats.XP;
        let gems = 0;
        if (typeof enemy.combat.rewards.gems === 'function')
            gems = enemy.combat.rewards.gems();
        if (typeof enemy.combat.rewards.gems === 'number')
            gems = enemy.combat.rewards.gems;
        if (enemy.combat.endScenes.rewardGems)
            enemy.combat.endScenes.rewardGems(character, gems);
        else {
            if (gems === 1)
                ContentView_1.CView.text("\n\nYou snag a single gem and " + XP + " XP as you walk away from your victory.");
            else if (gems > 1)
                ContentView_1.CView.text("\n\nYou grab " + gems + " gems and " + XP + " XP from your victory.");
            else if (gems === 0)
                ContentView_1.CView.text("\n\nYou gain " + XP + " XP from the battle.");
        }
        character.inventory.gems += gems;
        character.stats.XP += XP;
        const item = dropItem(character, enemy);
        if (item) {
            return character.inventory.items.createAdd(character, item.name, PlayerMenu_1.playerMenu);
        }
        return { next: PlayerMenu_1.playerMenu };
    }
    exports.awardPlayer = awardPlayer;
    //
    // $> Redo all of this
    //
    // function dropItem(character: Character, enemy: Character): Item | undefined {
    //     if (enemy.combat.rewards.drop) {
    //         const item = enemy.combat.rewards.drop.roll();
    //         if (item) {
    //             if (enemy.combat.endScenes.rewardItem)
    //                 enemy.combat.endScenes.rewardItem(character, item); // Each monster can now override the default award text
    //             return getItemFromName(item);
    //         }
    //     }
    //     return;
    // }
    let bonusItemAfterCombat;
    function setBonusItemAfterCombat(name) {
        bonusItemAfterCombat = name;
    }
    exports.setBonusItemAfterCombat = setBonusItemAfterCombat;
    function dropItem(char, enemy) {
        // if (monster.findStatusAffect(StatusEffectType.NoLoot) >= 0) {
        //     return;
        // }
        let plotFight = false;
        let itemName;
        if (enemy.combat.rewards.drop) {
            itemName = enemy.combat.rewards.drop.roll();
        }
        if (enemy.desc.name === "tit-fucked Minotaur") {
            itemName = ConsumableName_1.ConsumableName.MinotaurCum;
        }
        if (enemy.charType === CharacterType_1.CharacterType.Minotaur) {
            if (enemy.inventory.weapon.name === WeaponName_1.WeaponName.LargeAxe) {
                if (SMath_1.randInt(2) === 0) {
                    // 50% breakage!
                    if (SMath_1.randInt(2) === 0) {
                        itemName = WeaponName_1.WeaponName.LargeAxe;
                        if (char.body.tallness < 78) {
                            ContentView_1.CView.text("\nYou find a large axe on the minotaur, but it is too big for a person of your stature to comfortably carry.  ");
                            if (SMath_1.randInt(2) === 0)
                                itemName = undefined;
                            else
                                itemName = ConsumableName_1.ConsumableName.SuccubisDelight;
                        }
                        // Not too tall, dont rob of axe!
                        else
                            plotFight = true;
                    }
                    else
                        ContentView_1.CView.text("\nThe minotaur's axe appears to have been broken during the fight, rendering it useless.  ");
                }
                else
                    itemName = ConsumableName_1.ConsumableName.MinotaurBlood;
            }
        }
        if (enemy.charType === CharacterType_1.CharacterType.BeeGirl) {
            // force honey drop if milked
            if (BeeGirl_1.BeeGirlFlags.FORCE_BEE_TO_PRODUCE_HONEY === 1) {
                if (SMath_1.randInt(2) === 0)
                    itemName = ConsumableName_1.ConsumableName.BeeHoney;
                else
                    itemName = ConsumableName_1.ConsumableName.BeeHoneyPure;
                BeeGirl_1.BeeGirlFlags.FORCE_BEE_TO_PRODUCE_HONEY = 0;
            }
        }
        if (enemy.charType === CharacterType_1.CharacterType.Jojo && Jojo_1.JojoFlags.monk > 4) {
            if (SMath_1.randInt(2) === 0)
                itemName = ConsumableName_1.ConsumableName.IncubusDraft;
            else {
                if (SMath_1.randInt(2) === 0)
                    itemName = ConsumableName_1.ConsumableName.BlackSpellbook;
                else
                    itemName = ConsumableName_1.ConsumableName.SuccubiMilk;
            }
        }
        if (enemy.charType === CharacterType_1.CharacterType.Harpy || enemy.charType === CharacterType_1.CharacterType.Sophie) {
            if (SMath_1.randInt(10) === 0)
                itemName = ArmorName_1.ArmorName.WizardRobes;
            else if (SMath_1.randInt(3) === 0 && char.effects.has(EffectType_1.EffectType.LuststickAdapted))
                itemName = ConsumableName_1.ConsumableName.LustStick;
            else
                itemName = ConsumableName_1.ConsumableName.GoldenSeed;
        }
        // Chance of armor if at level 1 pierce fetish
        if (!plotFight &&
            !(enemy.charType === CharacterType_1.CharacterType.Ember) &&
            !(enemy.charType === CharacterType_1.CharacterType.Kiha) &&
            !(enemy.charType === CharacterType_1.CharacterType.Hel) &&
            !(enemy.charType === CharacterType_1.CharacterType.Isabella) &&
            Ceraph_1.CeraphFlags.PC_FETISH === 1 &&
            SMath_1.randInt(10) === 0 &&
            !char.inventory.items.has(ArmorName_1.ArmorName.SeductiveArmor) &&
            !CeraphFollowerScene_1.ceraphIsFollower()) {
            itemName = ArmorName_1.ArmorName.SeductiveArmor;
        }
        if (!plotFight && SMath_1.randInt(200) === 0 && char.stats.level >= 7)
            itemName = ConsumableName_1.ConsumableName.BroBrew;
        if (!plotFight && SMath_1.randInt(200) === 0 && char.stats.level >= 7)
            itemName = ConsumableName_1.ConsumableName.BimboLiqueur;
        // Chance of eggs if Easter!
        if (!plotFight && SMath_1.randInt(6) === 0 && Dates_1.isEaster()) {
            itemName = Eggs_1.randAnySizeEgg();
        }
        // Bonus loot overrides others
        if (bonusItemAfterCombat) {
            itemName = bonusItemAfterCombat;
        }
        if (itemName) {
            if (enemy.combat.endScenes.rewardItem)
                enemy.combat.endScenes.rewardItem(char, itemName); // Each monster can now override the default award text
            return ItemDict_1.ItemDict.getByName(itemName);
        }
    }
});
//# sourceMappingURL=CombatDrops.js.map