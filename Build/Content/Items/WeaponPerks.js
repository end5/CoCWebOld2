define(["require", "exports", "Engine/Utilities/SMath", "Content/Effects/EffectType", "Engine/Display/ContentView", "Engine/Items/WeaponPerkLib"], function (require, exports, SMath_1, EffectType_1, ContentView_1, WeaponPerkLib_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var WeaponPerkType;
    (function (WeaponPerkType) {
        WeaponPerkType["Penetrate"] = "Penetrate";
        WeaponPerkType["Aphrodisiac"] = "Aphrodisiac";
        WeaponPerkType["CoiledWhip"] = "CoiledWhip";
        WeaponPerkType["SuccubiWhip"] = "SuccubiWhip";
        WeaponPerkType["Stunning"] = "Stunning";
        WeaponPerkType["Bleeding"] = "Bleeding";
        WeaponPerkType["Large"] = "Large";
        WeaponPerkType["WizardsFocus"] = "Wizard's Focus";
        WeaponPerkType["HolySword"] = "Holy Sword";
    })(WeaponPerkType = exports.WeaponPerkType || (exports.WeaponPerkType = {}));
    WeaponPerkLib_1.WeaponPerkLib.set(WeaponPerkType.Penetrate, Penetrate);
    WeaponPerkLib_1.WeaponPerkLib.set(WeaponPerkType.Aphrodisiac, Aphrodisiac);
    WeaponPerkLib_1.WeaponPerkLib.set(WeaponPerkType.CoiledWhip, CoiledWhip);
    WeaponPerkLib_1.WeaponPerkLib.set(WeaponPerkType.SuccubiWhip, SuccubiWhip);
    WeaponPerkLib_1.WeaponPerkLib.set(WeaponPerkType.Stunning, Stunning);
    WeaponPerkLib_1.WeaponPerkLib.set(WeaponPerkType.Bleeding, Bleeding);
    // WeaponPerkLib.set(WeaponPerkType.Large, undefined);
    function Penetrate(self, target) {
        return target.combat.defense();
    }
    exports.Penetrate = Penetrate;
    function Aphrodisiac(self, target) {
        target.stats.lust += target.stats.lustVuln * (5 + self.stats.cor / 10);
        ContentView_1.CView.text("\n" + target.desc.capitalA + target.desc.short + " shivers as your weapon's 'poison' goes to work.");
    }
    exports.Aphrodisiac = Aphrodisiac;
    function CoiledWhip(self, target) {
        if (SMath_1.randInt(2) === 0) {
            target.stats.lust += target.stats.lustVuln * (5 + self.stats.cor / 12);
            if (!target.desc.plural)
                ContentView_1.CView.text("\n" + target.desc.capitalA + target.desc.short + " shivers and gets turned on from the whipping.");
            else
                ContentView_1.CView.text("\n" + target.desc.capitalA + target.desc.short + " shiver and get turned on from the whipping.");
        }
    }
    exports.CoiledWhip = CoiledWhip;
    function SuccubiWhip(self, target) {
        target.stats.lust += target.stats.lustVuln * (20 + self.stats.cor / 15);
        if (self.stats.cor < 90)
            self.stats.cor += 0.3;
        if (!target.desc.plural)
            ContentView_1.CView.text("\n" + target.desc.capitalA + target.desc.short + " shivers and moans involuntarily from the whip's touches.");
        else
            ContentView_1.CView.text("\n" + target.desc.capitalA + target.desc.short + " shiver and moan involuntarily from the whip's touches.");
        if (SMath_1.randInt(2) === 0) {
            ContentView_1.CView.text("  You get a sexual thrill from it.");
            self.stats.lust += 1;
        }
    }
    exports.SuccubiWhip = SuccubiWhip;
    // Warhammer, Gauntlets
    function Stunning(self, target) {
        if (SMath_1.randInt(10) === 0 && !target.effects.has(EffectType_1.EffectType.Resolute)) {
            ContentView_1.CView.text("\n" + target.desc.capitalA + target.desc.short + " reels from the brutal blow, stunned.");
            target.effects.create(EffectType_1.EffectType.Stunned);
        }
    }
    exports.Stunning = Stunning;
    // Hooked Gauntlets
    function Bleeding(self, target) {
        if (SMath_1.randInt(2) === 0 && target.combat.defense() < 10 && !target.effects.has(EffectType_1.EffectType.IzmaBleed)) {
            target.effects.create(EffectType_1.EffectType.IzmaBleed);
            if (target.desc.plural)
                ContentView_1.CView.text("\n" + target.desc.capitalA + target.desc.short + " bleed profusely from the many bloody gashes your hooked gauntlets leave behind.");
            else
                ContentView_1.CView.text("\n" + target.desc.capitalA + target.desc.short + " bleeds profusely from the many bloody gashes your hooked gauntlets leave behind.");
        }
    }
    exports.Bleeding = Bleeding;
});
//# sourceMappingURL=WeaponPerks.js.map