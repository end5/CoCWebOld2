define(["require", "exports", "Engine/Items/Weapon", "../WeaponName", "Content/Items/WeaponPerks", "Content/Effects/EffectType", "Engine/Items/ItemDesc"], function (require, exports, Weapon_1, WeaponName_1, WeaponPerks_1, EffectType_1, ItemDesc_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class EldritchStaff extends Weapon_1.Weapon {
        constructor() {
            super(WeaponName_1.WeaponName.EldritchStaff, new ItemDesc_1.ItemDesc("E.Staff", "an eldritch staff", "This eldritch staff once belonged to the Harpy Queen, who was killed after her defeat at your hands.  It fairly sizzles with magical power."), "eldritch staff", "thwack", 10, EldritchStaff.DefaultValue, [WeaponPerks_1.WeaponPerkType.WizardsFocus]);
        }
        onEquip(character) {
            while (character.effects.has(EffectType_1.EffectType.WizardsFocus))
                character.effects.removeByName(EffectType_1.EffectType.WizardsFocus);
            character.effects.create(EffectType_1.EffectType.WizardsFocus, { spellCost: 0.6 });
        }
        onUnequip(character) {
            while (character.effects.has(EffectType_1.EffectType.WizardsFocus))
                character.effects.removeByName(EffectType_1.EffectType.WizardsFocus);
        }
    }
    exports.EldritchStaff = EldritchStaff;
});
//# sourceMappingURL=EldritchStaff.js.map