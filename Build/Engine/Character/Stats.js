define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class RawStats {
        constructor() {
            // Primary stats
            this.str = 15;
            this.tou = 15;
            this.spe = 15;
            this.int = 15;
            this.lib = 5;
            this.sens = 5;
            this.cor = 0;
            this.fatigue = 100;
            // Combat Stats
            this.HP = 0;
            this.maxHP = 0;
            this.lust = 0;
            this.lustVuln = 0;
            // Level Stats
            this.XP = 0;
            this.level = 1;
            this.perkPoints = 0;
            this.teaseXP = 0;
            this.teaseLevel = 0;
        }
        serialize() {
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
        deserialize(saveObject) {
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
    exports.RawStats = RawStats;
    class Stats {
        constructor() {
            this.raw = new RawStats();
        }
        get str() { return this.raw.str; }
        set str(value) { this.raw.str = value; }
        get tou() { return this.raw.tou; }
        set tou(value) { this.raw.tou = value; }
        get spe() { return this.raw.spe; }
        set spe(value) { this.raw.spe = value; }
        get int() { return this.raw.int; }
        set int(value) { this.raw.int = value; }
        get lib() { return this.raw.lib; }
        set lib(value) { this.raw.lib = value; }
        get sens() { return this.raw.sens; }
        set sens(value) { this.raw.sens = value; }
        get cor() { return this.raw.cor; }
        set cor(value) { this.raw.cor = value; }
        get fatigue() { return this.raw.fatigue; }
        set fatigue(value) { this.raw.fatigue = value; }
        set fatiguePhysical(value) { this.raw.fatigue = value; }
        set fatigueMagic(value) { this.raw.fatigue = value; }
        get HP() { return this.raw.HP; }
        set HP(value) { this.raw.HP = value; }
        get maxHP() { return this.raw.maxHP; }
        /**
         * This adds floor(rawToughness * 2 + 50)
         */
        set maxHP(value) { this.raw.maxHP = Math.floor(this.raw.tou * 2 + 50) + value; }
        get lust() { return this.raw.lust; }
        set lust(value) { this.raw.lust = value; }
        minLust() { return 0; }
        lustPercent() { return this.raw.lust; }
        set lustVuln(value) { this.raw.lustVuln = value; }
        get lustVuln() { return this.raw.lustVuln; }
        set XP(value) { this.raw.XP = value; }
        get XP() { return this.raw.XP; }
        set level(value) { this.raw.level = value; }
        get level() { return this.raw.level; }
        set perkPoints(value) { this.raw.perkPoints = value; }
        get perkPoints() { return this.raw.perkPoints; }
        set teaseLevel(value) { this.raw.teaseLevel = value; }
        get teaseLevel() { return this.raw.teaseLevel; }
        set teaseXP(value) { this.raw.teaseLevel = value; }
        get teaseXP() { return this.raw.teaseLevel; }
        serialize() {
            return this.raw.serialize();
        }
        deserialize(saveObject) {
            this.raw.deserialize(saveObject);
        }
    }
    exports.Stats = Stats;
});
//# sourceMappingURL=Stats.js.map