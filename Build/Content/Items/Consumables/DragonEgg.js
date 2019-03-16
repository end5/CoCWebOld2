define(["require", "exports", "Engine/Items/Consumable", "../ConsumableName", "Content/Effects/EffectType", "Engine/Items/ItemDesc", "Engine/Display/ContentView"], function (require, exports, Consumable_1, ConsumableName_1, EffectType_1, ItemDesc_1, ContentView_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class DragonEgg extends Consumable_1.Consumable {
        constructor() {
            super(ConsumableName_1.ConsumableName.DragonEgg, new ItemDesc_1.ItemDesc("DrgnEgg", "an unfertilized dragon egg", "A large, solid egg, easily the size of your clenched fist.  Its shell color is reddish-white, with blue splotches."));
        }
        use(character) {
            ContentView_1.CView.clear();
            // Effect:
            // Boosts the special effect of Dragonbreath by 20% for 1 use. ie: if Tainted's breath weapon has a 80% chance to stun on hit, +20% equals 100% chance to stun.
            ContentView_1.CView.text("You crack the shell easily and swallow the large yolk and the copious amounts of albumen - the yolk is blue, while the rest is crimson-tinted.  It tastes like... well, it tastes mostly of spiced mint, you think.");
            if (character.effects.has(EffectType_1.EffectType.Dragonfire)) {
                if (character.effects.has(EffectType_1.EffectType.DragonBreathCooldown))
                    character.effects.removeByName(EffectType_1.EffectType.DragonBreathCooldown);
                else if (!character.effects.has(EffectType_1.EffectType.DragonBreathBoost))
                    character.effects.create(EffectType_1.EffectType.DragonBreathBoost);
                // (if PC has breath weapon)
                ContentView_1.CView.text("\n\nA sudden surge of energy fills your being and you feel like you could blast anything to atoms with a single breath, like the mighty dragons of legends.");
            }
            character.stats.fatigue -= 20;
        }
    }
    exports.DragonEgg = DragonEgg;
});
//# sourceMappingURL=DragonEgg.js.map