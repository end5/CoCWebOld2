import { ISerializable } from 'Engine/Utilities/ISerializable';

export interface IRawStats {
    // Primary stats
    str: number;
    tou: number;
    spe: number;
    int: number;
    lib: number;
    sens: number;
    cor: number;
    fatigue: number;

    // Combat Stats
    HP: number;
    maxHP: number;
    lust: number;
    lustVuln: number;

    // Level Stats
    XP: number;
    level: number;
    perkPoints: number;
    teaseXP: number;
    teaseLevel: number;
}

export class RawStats implements ISerializable<IRawStats> {
    // Primary stats
    public str = 15;
    public tou = 15;
    public spe = 15;
    public int = 15;
    public lib = 5;
    public sens = 5;
    public cor = 0;
    public fatigue = 100;

    // Combat Stats
    public HP = 0;
    public maxHP = 0;
    public lust = 0;
    public lustVuln = 0;

    // Level Stats
    public XP = 0;
    public level = 1;
    public perkPoints = 0;
    public teaseXP = 0;
    public teaseLevel = 0;

    public serialize(): IRawStats {
        return {
            str: this.str,
            tou: this.tou,
            spe: this.spe,
            int: this.int,
            lib: this.lib,
            sens: this.sens,
            cor: this.cor,
            fatigue: this.fatigue,
            HP: this.HP,
            maxHP: this.maxHP,
            lust: this.lust,
            lustVuln: this.lustVuln,
            XP: this.XP,
            level: this.level,
            perkPoints: this.perkPoints,
            teaseXP: this.teaseXP,
            teaseLevel: this.teaseLevel
        };
    }

    public deserialize(saveObject: IRawStats) {
        this.str = saveObject.str;
        this.tou = saveObject.tou;
        this.spe = saveObject.spe;
        this.int = saveObject.int;
        this.lib = saveObject.lib;
        this.sens = saveObject.sens;
        this.cor = saveObject.cor;
        this.fatigue = saveObject.fatigue;

        this.HP = saveObject.HP;
        this.maxHP = saveObject.maxHP;
        this.lust = saveObject.lust;
        this.lustVuln = saveObject.lustVuln;

        this.XP = saveObject.XP;
        this.level = saveObject.level;
        this.perkPoints = saveObject.perkPoints;
        this.teaseXP = saveObject.teaseXP;
        this.teaseLevel = saveObject.teaseLevel;
    }
}

export class Stats implements ISerializable<IRawStats> {
    public readonly raw = new RawStats();

    public get str(): number { return this.raw.str; }
    public set str(value: number) { this.raw.str = value; }

    public get tou(): number { return this.raw.tou; }
    public set tou(value: number) { this.raw.tou = value; }

    public get spe(): number { return this.raw.spe; }
    public set spe(value: number) { this.raw.spe = value; }

    public get int(): number { return this.raw.int; }
    public set int(value: number) { this.raw.int = value; }

    public get lib(): number { return this.raw.lib; }
    public set lib(value: number) { this.raw.lib = value; }

    public get sens(): number { return this.raw.sens; }
    public set sens(value: number) { this.raw.sens = value; }

    public get cor(): number { return this.raw.cor; }
    public set cor(value: number) { this.raw.cor = value; }

    public get fatigue(): number { return this.raw.fatigue; }
    public set fatigue(value: number) { this.raw.fatigue = value; }
    public set fatiguePhysical(value: number) { this.raw.fatigue = value; }
    public set fatigueMagic(value: number) { this.raw.fatigue = value; }

    public get HP(): number { return this.raw.HP; }
    public set HP(value: number) { this.raw.HP = value; }

    public get maxHP(): number { return this.raw.maxHP; }
    /**
     * This adds floor(rawToughness * 2 + 50)
     */
    public set maxHP(value: number) { this.raw.maxHP = Math.floor(this.raw.tou * 2 + 50) + value; }

    public get lust(): number { return this.raw.lust; }
    public set lust(value: number) { this.raw.lust = value; }

    public minLust(): number { return 0; }

    public lustPercent(): number { return this.raw.lust; }

    public set lustVuln(value: number) { this.raw.lustVuln = value; }
    public get lustVuln(): number { return this.raw.lustVuln; }

    public set XP(value: number) { this.raw.XP = value; }
    public get XP(): number { return this.raw.XP; }

    public set level(value: number) { this.raw.level = value; }
    public get level(): number { return this.raw.level; }

    public set perkPoints(value: number) { this.raw.perkPoints = value; }
    public get perkPoints(): number { return this.raw.perkPoints; }

    public set teaseLevel(value: number) { this.raw.teaseLevel = value; }
    public get teaseLevel(): number { return this.raw.teaseLevel; }

    public set teaseXP(value: number) { this.raw.teaseLevel = value; }
    public get teaseXP(): number { return this.raw.teaseLevel; }

    public serialize() {
        return this.raw.serialize();
    }

    public deserialize(saveObject: IRawStats) {
        this.raw.deserialize(saveObject);
    }
}
