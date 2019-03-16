define(["require", "exports", "Engine/Items/Consumable", "../ConsumableName", "Content/Effects/EffectType", "Engine/Items/ItemDesc", "Engine/Display/ContentView", "Engine/Combat/CombatManager"], function (require, exports, Consumable_1, ConsumableName_1, EffectType_1, ItemDesc_1, ContentView_1, CombatManager_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class FishFillet extends Consumable_1.Consumable {
        constructor() {
            super(ConsumableName_1.ConsumableName.FishFillet, new ItemDesc_1.ItemDesc("FishFil", "a fish fillet", "A perfectly cooked piece of fish.  You're not sure what type of fish is, since you're fairly certain \"delicious\" is not a valid species."));
        }
        use(character) {
            ContentView_1.CView.clear();
            if (!CombatManager_1.CombatManager.inCombat)
                ContentView_1.CView.text("You sit down and unwrap your fish fillet. It's perfectly flaky, allowing you to break it off in bite-sized chunks.  The salty meal disappears quickly, and your stomach gives an appreciative gurgle.");
            // (In combat?)
            else
                ContentView_1.CView.text("You produce the fish fillet from your bag.  Rather than unwrap it and savor the taste as you normally would, you take a large bite out of it, leaf wrapping and all.  In no time your salty meal is gone, your stomach giving an appreciative gurgle.");
            // Increase HP by quite a bit!)
            // (Slight chance at increasing Toughness?)
            // (If lake has been tainted, +1 Corruption?)
            if (character.effects.has(EffectType_1.EffectType.FactoryOverload))
                character.stats.cor += 0.5;
            character.stats.cor += 0.1;
            character.stats.HP += Math.round(character.stats.maxHP * .25);
        }
    }
    exports.FishFillet = FishFillet;
});
//# sourceMappingURL=FishFillet.js.map