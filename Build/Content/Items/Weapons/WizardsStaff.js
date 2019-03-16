define(["require", "exports", "Engine/Items/Weapon", "../WeaponName", "Content/Items/WeaponPerks", "Content/Effects/EffectType", "Engine/Items/ItemDesc"], function (require, exports, Weapon_1, WeaponName_1, WeaponPerks_1, EffectType_1, ItemDesc_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class WizardsStaff extends Weapon_1.Weapon {
        constructor() {
            super(WeaponName_1.WeaponName.WizardsStaff, new ItemDesc_1.ItemDesc("W. Staff", "a wizard's staff", "This staff is made of very old wood and seems to tingle to the touch.  The top has an odd zig-zag shape to it, and the wood is worn smooth from lots of use.  It probably belonged to a wizard at some point and would aid magic use."), "wizard's staff", "smack", 3, 350, [WeaponPerks_1.WeaponPerkType.WizardsFocus]);
        }
        onEquip(character) {
            while (character.effects.has(EffectType_1.EffectType.WizardsFocus))
                character.effects.removeByName(EffectType_1.EffectType.WizardsFocus);
            character.effects.create(EffectType_1.EffectType.WizardsFocus, { spellCost: 0.4 });
        }
        onUnequip(character) {
            while (character.effects.has(EffectType_1.EffectType.WizardsFocus))
                character.effects.removeByName(EffectType_1.EffectType.WizardsFocus);
        }
    }
    exports.WizardsStaff = WizardsStaff;
});
//# sourceMappingURL=WizardsStaff.js.map