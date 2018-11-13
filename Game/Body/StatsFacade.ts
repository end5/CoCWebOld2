﻿import { Stats } from './Stats';
import { Gender } from './GenderIdentity';
import { Character } from '../Character/Character';
import { Settings } from '../Settings';

export enum StatType {
    str, tou, spe, int, lib, sens, cor, fatigue, hp, lust, fullness
}

export class StatsFacade {
    private char: Character;
    private stats: Stats;

    public constructor(char: Character, baseStats: Stats) {
        this.char = char;
        this.stats = baseStats;
    }

    public get base(): Stats {
        return this.stats;
    }

    public get str(): number {
        return this.stats.str.value;
    }

    public set str(value: number) {
        value -= this.str;
        this.stats.str.value += value;
    }

    public get tou(): number {
        return this.stats.tou.value;
    }

    public set tou(value: number) {
        value -= this.stats.tou.value;
        this.stats.tou.value += value;

        // Add HP for toughness change.
        this.HP += value * 2;
    }

    public get spe(): number {
        return this.stats.spe.value;
    }

    public set spe(value: number) {
        value -= this.stats.spe.value;
        this.stats.spe.value += value;
    }

    public get int(): number {
        return this.stats.int.value;
    }

    public set int(value: number) {
        value -= this.stats.int.value;
        this.intChange(value);
    }

    public set intBimbo(value: number) {
        value -= this.stats.int.value;
        this.intChange(value, true);
    }

    private intChange(value: number, _bimboIntReduction: boolean = false) {
        this.stats.int.value += value;
    }

    public get lib(): number {
        return this.stats.lib.value;
    }

    public set lib(value: number) {
        value -= this.stats.lib.value;
        this.libChange(value);
    }

    public set libBimbo(value: number) {
        value -= this.stats.lib.value;
        this.libChange(value, true);
    }

    private libChange(value: number, _bimboIntReduction: boolean = false) {
        this.stats.lib.value += value;

        if (this.stats.lib.value < 15 && this.char.gender > 0)
            this.stats.lib.value = 15;
        else if (this.stats.lib.value < 10 && this.char.gender === Gender.NONE)
            this.stats.lib.value = 10;
        if (this.stats.lib.value < this.minLust() * 2 / 3)
            this.stats.lib.value = this.minLust() * 2 / 3;
    }

    public get sens(): number {
        return this.stats.sens.value;
    }

    public set sens(value: number) {
        value -= this.stats.sens.value;

        if (this.stats.sens.value > 50 && value > 0) value /= 2;
        if (this.stats.sens.value > 75 && value > 0) value /= 2;
        if (this.stats.sens.value > 90 && value > 0) value /= 2;
        if (this.stats.sens.value > 50 && value < 0) value *= 2;
        if (this.stats.sens.value > 75 && value < 0) value *= 2;
        if (this.stats.sens.value > 90 && value < 0) value *= 2;

        this.stats.sens.value += value;
    }

    public get cor(): number {
        return this.stats.cor.value;
    }

    public set cor(value: number) {
        value -= this.stats.cor.value;

        this.stats.cor.value += value;
    }

    public clearCor() {
        this.stats.cor.value = 0;
    }

    public get fatigue(): number {
        return this.stats.fatigue.value;
    }

    public set fatigue(value: number) {
        value -= this.stats.fatigue.value;
        this.stats.fatigue.value += value;
    }

    public fatiguePhysical(value: number) {
        this.stats.fatigue.value = value;
    }

    public fatigueMagic(value: number) {
        this.stats.fatigue.value = value;
    }

    public get HP(): number {
        return this.stats.HP.value;
    }

    public set HP(value: number) {
        this.stats.HP.value = value;
    }

    public maxHP(): number {
        return this.stats.HP.max;
    }

    public get lust(): number {
        return this.stats.lust.value;
    }

    public set lust(value: number) {
        value -= this.stats.lust.value;
        this.lustChange(value, true);
    }

    public set lustNoResist(value: number) {
        value -= this.stats.lust.value;
        this.lustChange(value, false);
    }

    private lustChange(value: number, lustResisted: boolean = true) {
        if (Settings.easyMode && value > 0 && lustResisted)
            value /= 2;
        if (value > 0 && lustResisted)
            value *= this.lustPercent() / 100;

        this.stats.lust.value += value;
    }

    public minLust(): number {
        return this.stats.lust.min;
    }

    public lustPercent(): number {
        let lust: number = 100;
        // 2.5% lust resistance per level - max 75.
        if (this.stats.level.value < 21)
            lust -= (this.stats.level.value - 1) * 3;
        else lust = 40;

        lust = Math.round(lust);
        return lust;
    }

    public set lustVuln(value: number) {
        this.stats.lustVuln = value;
    }

    public get lustVuln(): number {
        return this.stats.lustVuln;
    }

    public set XP(value: number) {
        this.stats.XP.value = value;
    }

    public get XP(): number {
        return this.stats.XP.value;
    }

    public set level(value: number) {
        this.stats.level.value = value;
    }

    public get level(): number {
        return this.stats.level.value;
    }

    public set perkPoints(value: number) {
        this.stats.perkPoints = value;
    }

    public get perkPoints(): number {
        return this.stats.perkPoints;
    }

    public set teaseLevel(value: number) {
        this.stats.teaseLevel = value;
    }

    public get teaseLevel(): number {
        return this.stats.teaseLevel;
    }

    public set teaseXP(value: number) {
        this.stats.teaseLevel = value;
    }

    public get teaseXP(): number {
        return this.stats.teaseLevel;
    }
}
