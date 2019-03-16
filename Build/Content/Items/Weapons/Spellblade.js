define(["require", "exports", "Engine/Items/Weapon", "../WeaponName", "Content/Items/WeaponPerks", "Content/Effects/EffectType", "Engine/Items/ItemDesc"], function (require, exports, Weapon_1, WeaponName_1, WeaponPerks_1, EffectType_1, ItemDesc_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Spellblade extends Weapon_1.Weapon {
        constructor() {
            super(WeaponName_1.WeaponName.Spellblade, new ItemDesc_1.ItemDesc("S.Blade", "a spellblade", "Forged not by a swordsmith but a sorceress, this arcane-infused blade amplifies your magic.  Unlike the wizard staves it is based on, this weapon also has a sharp edge, a technological innovation which has proven historically useful in battle."), "inscribed spellblade", "slash", 8, 500, [WeaponPerks_1.WeaponPerkType.WizardsFocus]);
        }
        onEquip(character) {
            while (character.effects.has(EffectType_1.EffectType.WizardsFocus))
                character.effects.removeByName(EffectType_1.EffectType.WizardsFocus);
            character.effects.create(EffectType_1.EffectType.WizardsFocus, { spellCost: 0.5 });
        }
        onUnequip(character) {
            while (character.effects.has(EffectType_1.EffectType.WizardsFocus))
                character.effects.removeByName(EffectType_1.EffectType.WizardsFocus);
        }
    }
    exports.Spellblade = Spellblade;
});
//# sourceMappingURL=Spellblade.js.map