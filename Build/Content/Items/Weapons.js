define(["require", "exports", "Engine/Items/Weapon", "./WeaponName", "Content/Items/WeaponPerks", "Engine/Items/ItemDesc", "./Weapons/LargeClaymore", "./Weapons/DragonShellShield", "./Weapons/EldritchStaff", "./Weapons/JeweledRapier", "./Weapons/Katana", "./Weapons/LargeHammer", "./Weapons/RaphaelsRapier", "./Weapons/Spellblade", "./Weapons/WizardsStaff", "./Weapons/HugeWarhammer", "./Weapons/BeautifulSword", "Engine/Items/ItemDict"], function (require, exports, Weapon_1, WeaponName_1, WeaponPerks_1, ItemDesc_1, LargeClaymore_1, DragonShellShield_1, EldritchStaff_1, JeweledRapier_1, Katana_1, LargeHammer_1, RaphaelsRapier_1, Spellblade_1, WizardsStaff_1, HugeWarhammer_1, BeautifulSword_1, ItemDict_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    // key: string, shortName: string, displayname: string, longName: string, verb: string, attack: number, value: number = 0, description: string = undefined, perk: string = ""
    ItemDict_1.ItemDict.add(new Weapon_1.Weapon(WeaponName_1.WeaponName.Fists, new ItemDesc_1.ItemDesc("Fists", "fists"), "fists", "punch", 0));
    ItemDict_1.ItemDict.add(new BeautifulSword_1.BeautifulSword());
    ItemDict_1.ItemDict.add(new LargeClaymore_1.LargeClaymore());
    ItemDict_1.ItemDict.add(new DragonShellShield_1.DragonShellShield());
    ItemDict_1.ItemDict.add(new EldritchStaff_1.EldritchStaff());
    ItemDict_1.ItemDict.add(new Weapon_1.Weapon(WeaponName_1.WeaponName.UrtaHalberd, new ItemDesc_1.ItemDesc("UrtaHlb", "a halberd"), "halberd", "slash", 11, 10, [WeaponPerks_1.WeaponPerkType.Large]));
    ItemDict_1.ItemDict.add(new Weapon_1.Weapon(WeaponName_1.WeaponName.HookedGauntlet, new ItemDesc_1.ItemDesc("H.Gaunt", "a set of hooked gauntlets", "These metal gauntlets are covered in nasty looking hooks that are sure to tear at your foes flesh and cause them harm."), "hooked gauntlets", "clawing punch", 8, 300, [WeaponPerks_1.WeaponPerkType.Stunning, WeaponPerks_1.WeaponPerkType.Bleeding]));
    ItemDict_1.ItemDict.add(new JeweledRapier_1.JeweledRapier());
    ItemDict_1.ItemDict.add(new Katana_1.Katana());
    ItemDict_1.ItemDict.add(new Weapon_1.Weapon(WeaponName_1.WeaponName.LargeAxe, new ItemDesc_1.ItemDesc("L. Axe ", "an axe large enough for a minotaur", "This massive axe once belonged to a minotaur.  It'd be hard for anyone smaller than a giant to wield effectively.  The axe is double-bladed and deadly-looking."), "large axe", "cleave", 15, 100, [WeaponPerks_1.WeaponPerkType.Large]));
    ItemDict_1.ItemDict.add(new Weapon_1.Weapon(WeaponName_1.WeaponName.AphroDagger, new ItemDesc_1.ItemDesc("L.Daggr", "an aphrodisiac-coated dagger", "A dagger with a short blade in a wavy pattern.  Its edge seems to have been enchanted to always be covered in a light aphrodisiac to arouse anything cut with it."), "lust-enchanted dagger", "stab", 3, 150, [WeaponPerks_1.WeaponPerkType.Aphrodisiac]));
    ItemDict_1.ItemDict.add(new LargeHammer_1.LargeHammer());
    ItemDict_1.ItemDict.add(new Weapon_1.Weapon(WeaponName_1.WeaponName.Pipe, new ItemDesc_1.ItemDesc("Pipe", "a pipe", "This is a simple rusted pipe of unknown origins.  It's hefty and could probably be used as an effective bludgeoning tool."), "pipe", "smash", 5, 25));
    ItemDict_1.ItemDict.add(new Weapon_1.Weapon(WeaponName_1.WeaponName.RidingCrop, new ItemDesc_1.ItemDesc("RidingC", "a riding crop", "This riding crop appears to be made of black leather, and could be quite a painful (or exciting) weapon."), "riding crop", "whip-crack", 5, 50));
    ItemDict_1.ItemDict.add(new RaphaelsRapier_1.RaphaelsRapier());
    ItemDict_1.ItemDict.add(new Spellblade_1.Spellblade());
    ItemDict_1.ItemDict.add(new Weapon_1.Weapon(WeaponName_1.WeaponName.SpikedGauntlet, new ItemDesc_1.ItemDesc("S.Gauntlet", "a spiked gauntlet", "This single metal gauntlet has the knuckles tipped with metal spikes.  Though it lacks the damaging potential of other weapons, the sheer pain of its wounds has a chance of stunning your opponent."), "spiked gauntlet", "spiked punch", 5, 400, [WeaponPerks_1.WeaponPerkType.Stunning]));
    ItemDict_1.ItemDict.add(new Weapon_1.Weapon(WeaponName_1.WeaponName.Spear, new ItemDesc_1.ItemDesc("Spear", "a deadly spear", "A staff with a sharp blade at the tip designed to pierce through the toughest armor.  This would ignore most armors."), "deadly spear", "piercing stab", 8, 450, [WeaponPerks_1.WeaponPerkType.Penetrate]));
    ItemDict_1.ItemDict.add(new Weapon_1.Weapon(WeaponName_1.WeaponName.SuccubiWhip, new ItemDesc_1.ItemDesc("SucWhip", "a succubi whip", "This coiled length of midnight-black leather practically exudes lust.  Though it looks like it could do a lot of damage, the feel of that slick leather impacting flesh is sure to inspire lust."), "succubi whip", "sexy whipping", 10, 400, [WeaponPerks_1.WeaponPerkType.SuccubiWhip]));
    ItemDict_1.ItemDict.add(new WizardsStaff_1.WizardsStaff());
    ItemDict_1.ItemDict.add(new HugeWarhammer_1.HugeWarhammer());
    ItemDict_1.ItemDict.add(new Weapon_1.Weapon(WeaponName_1.WeaponName.Whip, new ItemDesc_1.ItemDesc("Whip", "a coiled whip", "A coiled length of leather designed to lash your foes into submission.  There's a chance the bondage inclined might enjoy it!"), "coiled whip", "whip-crack", 5, 500, [WeaponPerks_1.WeaponPerkType.CoiledWhip]));
});
//# sourceMappingURL=Weapons.js.map