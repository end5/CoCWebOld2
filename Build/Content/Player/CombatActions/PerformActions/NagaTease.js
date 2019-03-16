define(["require", "exports", "Engine/Body/GenderIdentity", "Content/Effects/EffectType", "Engine/Utilities/SMath", "Engine/Display/ContentView", "Engine/Combat/Actions/CombatAction", "Content/Descriptors/CockDescriptor", "Content/Combat/CombatUtils", "Engine/Combat/Actions/CombatActionType"], function (require, exports, GenderIdentity_1, EffectType_1, SMath_1, ContentView_1, CombatAction_1, CockDescriptor_1, CombatUtils_1, CombatActionType_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class NagaTease extends CombatAction_1.CombatAction {
        constructor() {
            super(...arguments);
            this.name = "NagaTease";
            this.type = CombatActionType_1.CombatActionType.Tease;
        }
        canUse(character, target) {
            return { canUse: target.effects.has(EffectType_1.EffectType.Constricted) };
        }
        use(character, target) {
            ContentView_1.CView.clear();
            // (if poisoned)
            if (target.effects.has(EffectType_1.EffectType.NagaVenom)) {
                ContentView_1.CView.text("You attempt to stimulate " + target.desc.a + target.desc.short + " by rubbing " + target.desc.possessivePronoun + " nether regions, but " + target.desc.possessivePronoun + " seems too affected by your poison to react.\n\n");
            }
            else if (target.gender === GenderIdentity_1.Gender.NONE) {
                ContentView_1.CView.text("You look over " + target.desc.a + target.desc.short + ", but can't figure out how to tease such an unusual foe.\n\n");
            }
            // (Otherwise)
            else {
                CombatUtils_1.fatigueRecovery(character);
                let damage = 0;
                let chance = 0;
                let bimbo = false;
                let bro = false;
                let futa = false;
                // ==============================
                // Determine basic success chance.
                // ==============================
                chance = 60;
                // 5% chance for each tease level.
                chance += character.stats.teaseLevel * 5;
                // 10% for seduction perk
                if (character.effects.has(EffectType_1.EffectType.Seduction))
                    chance += 10;
                // 10% for sexy armor types
                if (character.effects.has(EffectType_1.EffectType.SluttySeduction))
                    chance += 10;
                // 10% for bimbo shits
                if (character.effects.has(EffectType_1.EffectType.BimboBody)) {
                    chance += 10;
                    bimbo = true;
                }
                if (character.effects.has(EffectType_1.EffectType.BroBody)) {
                    chance += 10;
                    bro = true;
                }
                if (character.effects.has(EffectType_1.EffectType.FutaForm)) {
                    chance += 10;
                    futa = true;
                }
                // 2 & 2 for seductive valentines!
                if (character.effects.has(EffectType_1.EffectType.SensualLover)) {
                    chance += 2;
                }
                // ==============================
                // Determine basic damage.
                // ==============================
                damage = 6 + SMath_1.randInt(3);
                if (character.effects.has(EffectType_1.EffectType.SensualLover)) {
                    damage += 2;
                }
                if (character.effects.has(EffectType_1.EffectType.Seduction))
                    damage += 5;
                // + slutty armor bonus
                if (character.effects.has(EffectType_1.EffectType.SluttySeduction))
                    damage += character.effects.getByName(EffectType_1.EffectType.SluttySeduction).values.teaseDamage;
                // 10% for bimbo shits
                if (bimbo || bro || futa) {
                    damage += 5;
                    bimbo = true;
                }
                damage += character.stats.level;
                damage += character.stats.teaseLevel * 2;
                damage += SMath_1.randInt(7);
                chance += 2;
                // Specific cases for slimes and demons, as the normal ones would make no sense
                if (target.gender === GenderIdentity_1.Gender.MALE) {
                    ContentView_1.CView.text("Your nimble tail begins to gently stroke his " + CockDescriptor_1.describeCockShort(target.body.cocks.get(0)) + ", and you can see it on his face as he tries to hold back the fact that it feels good.");
                }
                if (target.gender === GenderIdentity_1.Gender.FEMALE) {
                    ContentView_1.CView.text("Your nimble tail manages to work its way between her legs, grinding your tail's scaly skin against her clit. She appears to enjoy it, but it is obvious she is trying to hide it from you.");
                }
                if (target.gender === GenderIdentity_1.Gender.HERM) {
                    ContentView_1.CView.text("Your nimble tail manages to work its way between " + target.desc.possessivePronoun + " legs, gaining access to both sets of genitals. As your rough, scaly skin rubs past " + target.desc.possessivePronoun + " clit, your tail gently begins to stroke " + target.desc.possessivePronoun + " cock. The repressed expression on " + target.desc.possessivePronoun + " face betrays " + target.desc.possessivePronoun + " own enjoyment of this kind of treatment.");
                }
                // Land the hit!
                if (SMath_1.randInt(100) <= chance) {
                    // NERF TEASE DAMAGE
                    damage *= .9;
                    if (character.effects.has(EffectType_1.EffectType.HistoryWhore)) {
                        damage *= 1.15;
                    }
                    target.stats.lust += damage;
                    ContentView_1.CView.text("(" + damage + ")");
                    character.stats.teaseXP++;
                }
                // Nuttin honey
                else {
                    character.stats.teaseXP += 5;
                    ContentView_1.CView.text("\n" + target.desc.capitalA + target.desc.short + " seems unimpressed.");
                }
                ContentView_1.CView.text("\n\n");
            }
        }
    }
    exports.NagaTease = NagaTease;
});
//# sourceMappingURL=NagaTease.js.map