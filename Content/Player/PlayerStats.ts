import { Stats } from 'Engine/Character/Stats';
import { Character } from '../../Engine/Character/Character';
import { EffectType } from 'Content/Effects/EffectType';
import { ArmorName } from 'Content/Items/ArmorName';
import { Settings } from 'Content/Settings';
import { NEEDLEWORK_SPEED_SPEED_MULTI, NEEDLEWORK_LUST_LIBSENSE_MULTI, NEEDLEWORK_DEFENSE_SPEED_CAP, NEEDLEWORK_SPEED_STRENGTH_CAP, NEEDLEWORK_DEFENSE_EXTRA_HP, NEEDLEWORK_LUST_LUST_RESIST, MASSAGE_RELIEF, MASSAGE_LUST } from 'Content/Scenes/Places/TelAdre/UmasShop';
import { ShouldraFlags } from 'Content/Scenes/NPCs/Shouldra';

export class PlayerStats extends Stats {
    public constructor(protected char: Character) { super(); }

    public get str(): number { return this.raw.str; }
    public set str(value: number) {
        const delta = this.spe - value;

        this.raw.str += delta;

        const strong = this.char.effects.getByName(EffectType.Strong);
        if (delta >= 0 && strong && strong.values.str)
            this.raw.str += delta * strong.values.str;

        if (this.char.effects.has(EffectType.ChiReflowSpeed))
            if (this.raw.str > NEEDLEWORK_SPEED_STRENGTH_CAP)
                this.raw.str = NEEDLEWORK_SPEED_STRENGTH_CAP;

        if (this.raw.str > 100) this.raw.str = 100;
        if (this.raw.str < 1) this.raw.str = 1;

    }

    public get tou(): number { return this.raw.tou; }
    public set tou(value: number) {
        const delta = this.spe - value;

        this.raw.tou += delta;

        const tough = this.char.effects.getByName(EffectType.Tough);
        if (delta >= 0 && tough && tough.values.tou)
            this.raw.tou += delta * tough.values.tou;

        if (this.raw.tou > 100) this.raw.tou = 100;
        if (this.raw.tou < 1) this.raw.tou = 1;

        // Add HP for toughness change.
        this.HP += value * 2;
    }

    public get spe(): number { return this.raw.spe; }
    public set spe(value: number) {
        let delta = this.spe - value;

        if (delta > 0 && this.char.effects.has(EffectType.ChiReflowSpeed))
            delta *= NEEDLEWORK_SPEED_SPEED_MULTI;

        this.raw.spe += delta;

        const fast = this.char.effects.getByName(EffectType.Fast);
        if (delta >= 0 && fast && fast.values.spe)
            this.raw.spe += delta * fast.values.spe;

        if (this.char.effects.has(EffectType.ChiReflowDefense))
            if (this.raw.spe > NEEDLEWORK_DEFENSE_SPEED_CAP)
                this.raw.spe = NEEDLEWORK_DEFENSE_SPEED_CAP;

        if (this.raw.spe > 100) this.raw.spe = 100;
        if (this.raw.spe < 1) this.raw.spe = 1;

    }

    public get int(): number { return this.raw.int; }
    public set int(value: number) {
        let delta = this.int - value;

        if (this.char.effects.has(EffectType.FutaFaculties) ||
            this.char.effects.has(EffectType.BimboBrains) ||
            this.char.effects.has(EffectType.BroBrains)) {
            if (delta > 0) delta /= 2;
            if (delta < 0) delta *= 2;
        }

        this.raw.int += delta;

        const smart = this.char.effects.getByName(EffectType.Smart);
        if (delta >= 0 && smart && smart.values.int)
            this.raw.int += delta * smart.values.int;

        if (this.raw.int > 100) this.raw.int = 100;
        if (this.raw.int < 1) this.raw.int = 1;

    }

    public get lib(): number { return this.raw.lib; }
    public set lib(value: number) {
        let delta = this.lib - value;

        if (this.char.effects.has(EffectType.FutaForm) ||
            this.char.effects.has(EffectType.BimboBody) ||
            this.char.effects.has(EffectType.BroBody)) {
            if (delta > 0) delta /= 2;
            if (delta < 0) delta *= 2;
        }

        if (delta > 0 && this.char.effects.has(EffectType.ChiReflowLust))
            delta *= NEEDLEWORK_LUST_LIBSENSE_MULTI;

        if (delta > 0 && this.char.effects.has(EffectType.PurityBlessing))
            delta *= 0.75;

        this.raw.lib += delta;

        const lusty = this.char.effects.getByName(EffectType.Lusty);
        if (delta >= 0 && lusty && lusty.values.lib)
            this.raw.lib += delta * lusty.values.lib;

        if (this.raw.lib > 100) this.raw.lib = 100;

        if (this.raw.lib < 50 && this.char.inventory.armor.name === ArmorName.LustyMaidensArmor)
            this.raw.lib = 50;
        else if (this.raw.lib < 15 && this.char.gender > 0)
            this.raw.lib = 15;
        else if (this.raw.lib < 10 && this.char.gender === 0)
            this.raw.lib = 10;

        if (this.raw.lib < this.minLust() * 2 / 3)
            this.raw.lib = this.minLust() * 2 / 3;
    }

    public get sens(): number { return this.raw.sens; }
    public set sens(value: number) {
        let delta = this.sens - value;

        if (delta > 0 && this.char.effects.has(EffectType.ChiReflowLust))
            delta *= NEEDLEWORK_SPEED_SPEED_MULTI;

        if (this.raw.sens > 50 && delta > 0) delta /= 2;
        if (this.raw.sens > 75 && delta > 0) delta /= 2;
        if (this.raw.sens > 90 && delta > 0) delta /= 2;
        if (this.raw.sens > 50 && delta < 0) delta *= 2;
        if (this.raw.sens > 75 && delta < 0) delta *= 2;
        if (this.raw.sens > 90 && delta < 0) delta *= 2;

        this.raw.sens += delta;

        const sensitive = this.char.effects.getByName(EffectType.Sensitive);
        if (delta >= 0 && sensitive && sensitive.values.sens)
            this.raw.sens += delta * sensitive.values.sens;

        if (this.raw.sens > 100) this.raw.sens = 100;
        if (this.raw.sens < 10) this.raw.sens = 10;

    }

    public get cor(): number { return this.raw.cor; }
    public set cor(value: number) {
        let delta = this.cor - value;

        if (delta > 0 && this.char.effects.has(EffectType.PurityBlessing))
            delta *= 0.5;
        if (delta > 0 && this.char.effects.has(EffectType.PureAndLoving))
            delta *= 0.75;

        this.raw.cor += delta;

        if (this.raw.cor > 100) this.raw.cor = 100;
        if (this.raw.cor < 0) this.raw.cor = 0;

    }

    public get fatigue(): number { return this.raw.fatigue; }
    public set fatigue(value: number) { this.raw.fatigue = value; }
    public set fatiguePhysical(value: number) { this.raw.fatigue = value; }
    public set fatigueMagic(value: number) { this.raw.fatigue = value; }

    public get HP(): number { return this.raw.HP; }
    public set HP(value: number) { this.raw.HP = value; }

    public get maxHP() { return this.raw.maxHP; }
    public set maxHP(value: number) {
        let max = value;
        max += Math.floor(this.raw.tou * 2 + 50);
        if (this.char.effects.has(EffectType.Tank)) max += 50;
        if (this.char.effects.has(EffectType.Tank2)) max += Math.round(this.raw.tou);
        if (this.char.effects.has(EffectType.ChiReflowDefense)) max += NEEDLEWORK_DEFENSE_EXTRA_HP;
        if (this.raw.level <= 20) max += this.raw.level * 15;
        else max += 20 * 15;
        max = Math.round(max);
        if (max > 999) max = 999;
        this.raw.maxHP = max;
    }

    public get lust(): number { return this.raw.lust; }
    public set lust(value: number) {
        let delta = this.lust - value;

        if (Settings.easyMode && delta > 0) delta /= 2;
        if (delta > 0) delta *= this.lustPercent() / 100;

        this.raw.lust += delta;
        if (this.raw.lust > 99) this.raw.lust = 100;
        if (this.raw.lust < this.minLust()) this.raw.lust = this.minLust();
        if (this.raw.lust < 0) this.raw.lust = 0;
    }

    public minLust(): number {
        let min = 0;

        if (this.char.effects.has(EffectType.BimboChampagne) ||
            this.char.effects.has(EffectType.BimboBody) ||
            this.char.effects.has(EffectType.BroBody) ||
            this.char.effects.has(EffectType.FutaForm)) {
            if (min > 40) min += 10;
            else if (min >= 20) min += 20;
            else min += 40;
        }

        if (this.char.effects.has(EffectType.OmnibusGift)) {
            if (min > 40) min += 10;
            else if (min >= 20) min += 20;
            else min += 35;
        }

        if (this.char.effects.has(EffectType.Nymphomania)) {
            if (min >= 40) min += 10;
            else if (min >= 20) min += 15;
            else min += 30;
        }

        if (this.char.effects.has(EffectType.AnemoneArousal)) {
            if (min >= 40) min += 10;
            else if (min >= 20) min += 20;
            else min += 30;
        }

        const hotBlooded = this.char.effects.getByName(EffectType.HotBlooded);
        if (hotBlooded && hotBlooded.values.minLust) {
            if (min > 0) min += hotBlooded.values.minLust / 2;
            else min += hotBlooded.values.minLust;
        }

        if (this.char.effects.has(EffectType.LuststickAdapted)) {
            if (min < 50) min += 10;
            else min += 5;
        }

        const piercedCrimstone = this.char.effects.getByName(EffectType.PiercedCrimstone);
        if (piercedCrimstone && piercedCrimstone.values.minLust)
            min += piercedCrimstone.values.minLust;

        const pentUp = this.char.effects.getByName(EffectType.PentUp);
        if (pentUp && pentUp.values.minLust)
            min += pentUp.values.minLust;

        if (min < 50 && this.char.effects.has(EffectType.LustStick))
            min = 50;

        if (ShouldraFlags.SHOULDRA_SLEEP_TIMER <= -168) {
            min += 20;
            if (ShouldraFlags.SHOULDRA_SLEEP_TIMER <= -216)
                min += 30;
        }

        if (this.char.body.ovipositor.eggs >= 20) {
            min += 10;
            if (this.char.body.ovipositor.eggs >= 40) min += 10;
        }

        if (min < 30 && this.char.inventory.armor.name === ArmorName.LustyMaidensArmor)
            min = 30;

        if (this.char.effects.has(EffectType.Infested)) {
            if (min < 50) min = 50;
        }

        return min;
    }

    public lustPercent() {
        let lust = 100;
        // 2.5% lust resistance per level - max 75.
        if (this.level < 21) this.lust -= (this.level - 1) * 3;
        else lust = 40;

        // ++++++++++++++++++++++++++++++++++++++++++++++++++
        // ADDITIVE REDUCTIONS
        // THESE ARE FLAT BONUSES WITH LITTLE TO NO DOWNSIDE
        // TOTAL IS LIMITED TO 75%!
        // ++++++++++++++++++++++++++++++++++++++++++++++++++
        // Corrupted Libido reduces lust gain by 10%!
        if (this.char.effects.has(EffectType.CorruptedLibido)) lust -= 10;
        // Acclimation reduces by 15%
        if (this.char.effects.has(EffectType.Acclimation)) lust -= 15;
        // Purity blessing reduces lust gain
        if (this.char.effects.has(EffectType.PurityBlessing)) lust -= 5;
        // Resistance = 10%
        if (this.char.effects.has(EffectType.Resistance)) lust -= 10;
        if (this.char.effects.has(EffectType.ChiReflowLust)) lust -= NEEDLEWORK_LUST_LUST_RESIST;

        if (lust < 25) lust = 25;
        const blackCatBeer = this.char.effects.getByName(EffectType.BlackCatBeer);
        if (blackCatBeer && blackCatBeer.values.duration && blackCatBeer.values.duration > 0) {
            if (lust >= 80) lust = 100;
            else lust += 20;
        }
        const pentUp = this.char.effects.getByName(EffectType.PentUp);
        if (pentUp && pentUp.values.minLust)
        lust += Math.round(pentUp.values.minLust / 2);
        // ++++++++++++++++++++++++++++++++++++++++++++++++++
        // MULTIPLICATIVE REDUCTIONS
        // THESE PERKS ALSO RAISE MINIMUM LUST OR HAVE OTHER
        // DRAWBACKS TO JUSTIFY IT.
        // ++++++++++++++++++++++++++++++++++++++++++++++++++
        // Bimbo body slows lust gains!
        if ((this.char.effects.has(EffectType.BimboChampagne) || this.char.effects.has(EffectType.BimboBody)) && lust > 0) lust *= .75;
        if (this.char.effects.has(EffectType.BroBody) && lust > 0) lust *= .75;
        if (this.char.effects.has(EffectType.FutaForm) && lust > 0) lust *= .75;
        // Omnibus' Gift reduces lust gain by 15%
        if (this.char.effects.has(EffectType.OmnibusGift)) lust *= .85;
        // Luststick reduces lust gain by 10% to match increased min lust
        if (this.char.effects.has(EffectType.LuststickAdapted)) lust *= 0.9;
        if (this.char.effects.has(EffectType.Berzerking)) lust *= .6;
        if (this.char.effects.has(EffectType.PureAndLoving)) lust *= 0.95;

        // Lust mods from Uma's content -- Given the short duration and the gem cost, I think them being multiplicative is justified.
        // Changing them to an additive bonus should be pretty simple (check the static values in UmasShop.as)
        const umasMassage = this.char.effects.getByName(EffectType.UmasMassage);
        if (umasMassage) {
            if (umasMassage.values.type && umasMassage.values.bonusValue && (umasMassage.values.type === MASSAGE_RELIEF || umasMassage.values.type === MASSAGE_LUST)) {
                lust *= umasMassage.values.bonusValue;
            }
        }

        lust = Math.round(lust);
        return lust;
    }
}
