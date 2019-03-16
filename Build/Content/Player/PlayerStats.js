define(["require", "exports", "Engine/Character/Stats", "Content/Effects/EffectType", "Content/Items/ArmorName", "Content/Settings", "Content/Scenes/Places/TelAdre/UmasShop", "Content/Scenes/NPCs/Shouldra"], function (require, exports, Stats_1, EffectType_1, ArmorName_1, Settings_1, UmasShop_1, Shouldra_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class PlayerStats extends Stats_1.Stats {
        constructor(char) {
            super();
            this.char = char;
        }
        get str() { return this.raw.str; }
        set str(value) {
            const delta = this.spe - value;
            this.raw.str += delta;
            const strong = this.char.effects.getByName(EffectType_1.EffectType.Strong);
            if (delta >= 0 && strong && strong.values.str)
                this.raw.str += delta * strong.values.str;
            if (this.char.effects.has(EffectType_1.EffectType.ChiReflowSpeed))
                if (this.raw.str > UmasShop_1.NEEDLEWORK_SPEED_STRENGTH_CAP)
                    this.raw.str = UmasShop_1.NEEDLEWORK_SPEED_STRENGTH_CAP;
            if (this.raw.str > 100)
                this.raw.str = 100;
            if (this.raw.str < 1)
                this.raw.str = 1;
        }
        get tou() { return this.raw.tou; }
        set tou(value) {
            const delta = this.spe - value;
            this.raw.tou += delta;
            const tough = this.char.effects.getByName(EffectType_1.EffectType.Tough);
            if (delta >= 0 && tough && tough.values.tou)
                this.raw.tou += delta * tough.values.tou;
            if (this.raw.tou > 100)
                this.raw.tou = 100;
            if (this.raw.tou < 1)
                this.raw.tou = 1;
            // Add HP for toughness change.
            this.HP += value * 2;
        }
        get spe() { return this.raw.spe; }
        set spe(value) {
            let delta = this.spe - value;
            if (delta > 0 && this.char.effects.has(EffectType_1.EffectType.ChiReflowSpeed))
                delta *= UmasShop_1.NEEDLEWORK_SPEED_SPEED_MULTI;
            this.raw.spe += delta;
            const fast = this.char.effects.getByName(EffectType_1.EffectType.Fast);
            if (delta >= 0 && fast && fast.values.spe)
                this.raw.spe += delta * fast.values.spe;
            if (this.char.effects.has(EffectType_1.EffectType.ChiReflowDefense))
                if (this.raw.spe > UmasShop_1.NEEDLEWORK_DEFENSE_SPEED_CAP)
                    this.raw.spe = UmasShop_1.NEEDLEWORK_DEFENSE_SPEED_CAP;
            if (this.raw.spe > 100)
                this.raw.spe = 100;
            if (this.raw.spe < 1)
                this.raw.spe = 1;
        }
        get int() { return this.raw.int; }
        set int(value) {
            let delta = this.int - value;
            if (this.char.effects.has(EffectType_1.EffectType.FutaFaculties) ||
                this.char.effects.has(EffectType_1.EffectType.BimboBrains) ||
                this.char.effects.has(EffectType_1.EffectType.BroBrains)) {
                if (delta > 0)
                    delta /= 2;
                if (delta < 0)
                    delta *= 2;
            }
            this.raw.int += delta;
            const smart = this.char.effects.getByName(EffectType_1.EffectType.Smart);
            if (delta >= 0 && smart && smart.values.int)
                this.raw.int += delta * smart.values.int;
            if (this.raw.int > 100)
                this.raw.int = 100;
            if (this.raw.int < 1)
                this.raw.int = 1;
        }
        get lib() { return this.raw.lib; }
        set lib(value) {
            let delta = this.lib - value;
            if (this.char.effects.has(EffectType_1.EffectType.FutaForm) ||
                this.char.effects.has(EffectType_1.EffectType.BimboBody) ||
                this.char.effects.has(EffectType_1.EffectType.BroBody)) {
                if (delta > 0)
                    delta /= 2;
                if (delta < 0)
                    delta *= 2;
            }
            if (delta > 0 && this.char.effects.has(EffectType_1.EffectType.ChiReflowLust))
                delta *= UmasShop_1.NEEDLEWORK_LUST_LIBSENSE_MULTI;
            if (delta > 0 && this.char.effects.has(EffectType_1.EffectType.PurityBlessing))
                delta *= 0.75;
            this.raw.lib += delta;
            const lusty = this.char.effects.getByName(EffectType_1.EffectType.Lusty);
            if (delta >= 0 && lusty && lusty.values.lib)
                this.raw.lib += delta * lusty.values.lib;
            if (this.raw.lib > 100)
                this.raw.lib = 100;
            if (this.raw.lib < 50 && this.char.inventory.armor.name === ArmorName_1.ArmorName.LustyMaidensArmor)
                this.raw.lib = 50;
            else if (this.raw.lib < 15 && this.char.gender > 0)
                this.raw.lib = 15;
            else if (this.raw.lib < 10 && this.char.gender === 0)
                this.raw.lib = 10;
            if (this.raw.lib < this.minLust() * 2 / 3)
                this.raw.lib = this.minLust() * 2 / 3;
        }
        get sens() { return this.raw.sens; }
        set sens(value) {
            let delta = this.sens - value;
            if (delta > 0 && this.char.effects.has(EffectType_1.EffectType.ChiReflowLust))
                delta *= UmasShop_1.NEEDLEWORK_SPEED_SPEED_MULTI;
            if (this.raw.sens > 50 && delta > 0)
                delta /= 2;
            if (this.raw.sens > 75 && delta > 0)
                delta /= 2;
            if (this.raw.sens > 90 && delta > 0)
                delta /= 2;
            if (this.raw.sens > 50 && delta < 0)
                delta *= 2;
            if (this.raw.sens > 75 && delta < 0)
                delta *= 2;
            if (this.raw.sens > 90 && delta < 0)
                delta *= 2;
            this.raw.sens += delta;
            const sensitive = this.char.effects.getByName(EffectType_1.EffectType.Sensitive);
            if (delta >= 0 && sensitive && sensitive.values.sens)
                this.raw.sens += delta * sensitive.values.sens;
            if (this.raw.sens > 100)
                this.raw.sens = 100;
            if (this.raw.sens < 10)
                this.raw.sens = 10;
        }
        get cor() { return this.raw.cor; }
        set cor(value) {
            let delta = this.cor - value;
            if (delta > 0 && this.char.effects.has(EffectType_1.EffectType.PurityBlessing))
                delta *= 0.5;
            if (delta > 0 && this.char.effects.has(EffectType_1.EffectType.PureAndLoving))
                delta *= 0.75;
            this.raw.cor += delta;
            if (this.raw.cor > 100)
                this.raw.cor = 100;
            if (this.raw.cor < 0)
                this.raw.cor = 0;
        }
        get fatigue() { return this.raw.fatigue; }
        set fatigue(value) { this.raw.fatigue = value; }
        set fatiguePhysical(value) { this.raw.fatigue = value; }
        set fatigueMagic(value) { this.raw.fatigue = value; }
        get HP() { return this.raw.HP; }
        set HP(value) { this.raw.HP = value; }
        get maxHP() { return this.raw.maxHP; }
        set maxHP(value) {
            let max = value;
            max += Math.floor(this.raw.tou * 2 + 50);
            if (this.char.effects.has(EffectType_1.EffectType.Tank))
                max += 50;
            if (this.char.effects.has(EffectType_1.EffectType.Tank2))
                max += Math.round(this.raw.tou);
            if (this.char.effects.has(EffectType_1.EffectType.ChiReflowDefense))
                max += UmasShop_1.NEEDLEWORK_DEFENSE_EXTRA_HP;
            if (this.raw.level <= 20)
                max += this.raw.level * 15;
            else
                max += 20 * 15;
            max = Math.round(max);
            if (max > 999)
                max = 999;
            this.raw.maxHP = max;
        }
        get lust() { return this.raw.lust; }
        set lust(value) {
            let delta = this.lust - value;
            if (Settings_1.Settings.easyMode && delta > 0)
                delta /= 2;
            if (delta > 0)
                delta *= this.lustPercent() / 100;
            this.raw.lust += delta;
            if (this.raw.lust > 99)
                this.raw.lust = 100;
            if (this.raw.lust < this.minLust())
                this.raw.lust = this.minLust();
            if (this.raw.lust < 0)
                this.raw.lust = 0;
        }
        minLust() {
            let min = 0;
            if (this.char.effects.has(EffectType_1.EffectType.BimboChampagne) ||
                this.char.effects.has(EffectType_1.EffectType.BimboBody) ||
                this.char.effects.has(EffectType_1.EffectType.BroBody) ||
                this.char.effects.has(EffectType_1.EffectType.FutaForm)) {
                if (min > 40)
                    min += 10;
                else if (min >= 20)
                    min += 20;
                else
                    min += 40;
            }
            if (this.char.effects.has(EffectType_1.EffectType.OmnibusGift)) {
                if (min > 40)
                    min += 10;
                else if (min >= 20)
                    min += 20;
                else
                    min += 35;
            }
            if (this.char.effects.has(EffectType_1.EffectType.Nymphomania)) {
                if (min >= 40)
                    min += 10;
                else if (min >= 20)
                    min += 15;
                else
                    min += 30;
            }
            if (this.char.effects.has(EffectType_1.EffectType.AnemoneArousal)) {
                if (min >= 40)
                    min += 10;
                else if (min >= 20)
                    min += 20;
                else
                    min += 30;
            }
            const hotBlooded = this.char.effects.getByName(EffectType_1.EffectType.HotBlooded);
            if (hotBlooded && hotBlooded.values.minLust) {
                if (min > 0)
                    min += hotBlooded.values.minLust / 2;
                else
                    min += hotBlooded.values.minLust;
            }
            if (this.char.effects.has(EffectType_1.EffectType.LuststickAdapted)) {
                if (min < 50)
                    min += 10;
                else
                    min += 5;
            }
            const piercedCrimstone = this.char.effects.getByName(EffectType_1.EffectType.PiercedCrimstone);
            if (piercedCrimstone && piercedCrimstone.values.minLust)
                min += piercedCrimstone.values.minLust;
            const pentUp = this.char.effects.getByName(EffectType_1.EffectType.PentUp);
            if (pentUp && pentUp.values.minLust)
                min += pentUp.values.minLust;
            if (min < 50 && this.char.effects.has(EffectType_1.EffectType.LustStick))
                min = 50;
            if (Shouldra_1.ShouldraFlags.SHOULDRA_SLEEP_TIMER <= -168) {
                min += 20;
                if (Shouldra_1.ShouldraFlags.SHOULDRA_SLEEP_TIMER <= -216)
                    min += 30;
            }
            if (this.char.body.ovipositor.eggs >= 20) {
                min += 10;
                if (this.char.body.ovipositor.eggs >= 40)
                    min += 10;
            }
            if (min < 30 && this.char.inventory.armor.name === ArmorName_1.ArmorName.LustyMaidensArmor)
                min = 30;
            if (this.char.effects.has(EffectType_1.EffectType.Infested)) {
                if (min < 50)
                    min = 50;
            }
            return min;
        }
        lustPercent() {
            let lust = 100;
            // 2.5% lust resistance per level - max 75.
            if (this.level < 21)
                this.lust -= (this.level - 1) * 3;
            else
                lust = 40;
            // ++++++++++++++++++++++++++++++++++++++++++++++++++
            // ADDITIVE REDUCTIONS
            // THESE ARE FLAT BONUSES WITH LITTLE TO NO DOWNSIDE
            // TOTAL IS LIMITED TO 75%!
            // ++++++++++++++++++++++++++++++++++++++++++++++++++
            // Corrupted Libido reduces lust gain by 10%!
            if (this.char.effects.has(EffectType_1.EffectType.CorruptedLibido))
                lust -= 10;
            // Acclimation reduces by 15%
            if (this.char.effects.has(EffectType_1.EffectType.Acclimation))
                lust -= 15;
            // Purity blessing reduces lust gain
            if (this.char.effects.has(EffectType_1.EffectType.PurityBlessing))
                lust -= 5;
            // Resistance = 10%
            if (this.char.effects.has(EffectType_1.EffectType.Resistance))
                lust -= 10;
            if (this.char.effects.has(EffectType_1.EffectType.ChiReflowLust))
                lust -= UmasShop_1.NEEDLEWORK_LUST_LUST_RESIST;
            if (lust < 25)
                lust = 25;
            const blackCatBeer = this.char.effects.getByName(EffectType_1.EffectType.BlackCatBeer);
            if (blackCatBeer && blackCatBeer.values.duration && blackCatBeer.values.duration > 0) {
                if (lust >= 80)
                    lust = 100;
                else
                    lust += 20;
            }
            const pentUp = this.char.effects.getByName(EffectType_1.EffectType.PentUp);
            if (pentUp && pentUp.values.minLust)
                lust += Math.round(pentUp.values.minLust / 2);
            // ++++++++++++++++++++++++++++++++++++++++++++++++++
            // MULTIPLICATIVE REDUCTIONS
            // THESE PERKS ALSO RAISE MINIMUM LUST OR HAVE OTHER
            // DRAWBACKS TO JUSTIFY IT.
            // ++++++++++++++++++++++++++++++++++++++++++++++++++
            // Bimbo body slows lust gains!
            if ((this.char.effects.has(EffectType_1.EffectType.BimboChampagne) || this.char.effects.has(EffectType_1.EffectType.BimboBody)) && lust > 0)
                lust *= .75;
            if (this.char.effects.has(EffectType_1.EffectType.BroBody) && lust > 0)
                lust *= .75;
            if (this.char.effects.has(EffectType_1.EffectType.FutaForm) && lust > 0)
                lust *= .75;
            // Omnibus' Gift reduces lust gain by 15%
            if (this.char.effects.has(EffectType_1.EffectType.OmnibusGift))
                lust *= .85;
            // Luststick reduces lust gain by 10% to match increased min lust
            if (this.char.effects.has(EffectType_1.EffectType.LuststickAdapted))
                lust *= 0.9;
            if (this.char.effects.has(EffectType_1.EffectType.Berzerking))
                lust *= .6;
            if (this.char.effects.has(EffectType_1.EffectType.PureAndLoving))
                lust *= 0.95;
            // Lust mods from Uma's content -- Given the short duration and the gem cost, I think them being multiplicative is justified.
            // Changing them to an additive bonus should be pretty simple (check the static values in UmasShop.as)
            const umasMassage = this.char.effects.getByName(EffectType_1.EffectType.UmasMassage);
            if (umasMassage) {
                if (umasMassage.values.type && umasMassage.values.bonusValue && (umasMassage.values.type === UmasShop_1.MASSAGE_RELIEF || umasMassage.values.type === UmasShop_1.MASSAGE_LUST)) {
                    lust *= umasMassage.values.bonusValue;
                }
            }
            lust = Math.round(lust);
            return lust;
        }
    }
    exports.PlayerStats = PlayerStats;
});
//# sourceMappingURL=PlayerStats.js.map