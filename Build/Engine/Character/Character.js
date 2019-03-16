define(["require", "exports", "Engine/Body/GenderIdentity", "Engine/Body/Body", "./Stats", "Engine/Effects/Effect", "Engine/Utilities/Uuid", "Engine/Effects/EffectList", "Content/Character/CharacterType", "Engine/Body/Tail", "Engine/Body/Legs", "Engine/Body/Vagina", "Engine/Body/BreastRow", "Engine/Body/Wings", "Engine/Body/Pregnancy/Womb", "Engine/Utilities/SMath", "Content/Effects/EffectType"], function (require, exports, GenderIdentity_1, Body_1, Stats_1, Effect_1, Uuid_1, EffectList_1, CharacterType_1, Tail_1, Legs_1, Vagina_1, BreastRow_1, Wings_1, Womb_1, SMath_1, EffectType_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Character {
        constructor(type) {
            this.genderManager = new GenderIdentity_1.GenderIdentity(this);
            this.body = new Body_1.Body();
            this.stats = new Stats_1.Stats();
            this.effects = new EffectList_1.EffectList();
            this.hoursSinceCum = 0;
            this.charType = type;
            if (type !== CharacterType_1.CharacterType.Player) {
                this.stats.XP = this.totalXP();
            }
            this.UUID = Uuid_1.generateUUID();
        }
        get uuid() {
            return this.UUID;
        }
        get desc() {
            return this.description;
        }
        get combat() {
            return this.combatContainer;
        }
        get gender() {
            return this.genderManager.gender;
        }
        get genderPref() {
            return this.genderManager.preference;
        }
        set genderPref(gender) {
            this.genderManager.preference = gender;
        }
        serialize() {
            const save = {
                type: this.charType,
                UUID: this.UUID,
                genderPref: this.genderPref,
                hoursSinceCum: this.hoursSinceCum,
                body: this.body.serialize(),
                stats: this.stats.serialize(),
                effects: this.effects.serialize(),
                inventory: this.inventory.serialize(),
            };
            if (this.partyUUID)
                save.partyUUID = this.partyUUID;
            return save;
        }
        deserialize(saveObject) {
            this.charType = saveObject.type;
            this.UUID = saveObject.UUID;
            if (saveObject.partyUUID)
                this.partyUUID = saveObject.partyUUID;
            this.genderPref = saveObject.genderPref;
            this.body.deserialize(saveObject.body);
            this.stats.deserialize(saveObject.stats);
            this.effects.deserialize(saveObject.effects, Effect_1.Effect, this);
            this.inventory.deserialize(saveObject.inventory);
            this.hoursSinceCum = saveObject.hoursSinceCum;
        }
        update(hours) {
            this.body.update(hours);
            this.regeneration();
        }
        vaginalCapacity() {
            if (this.body.vaginas.length > 0) {
                let bonus = 0;
                // Centaurs = +50 capacity
                if (this.body.legs.type === Legs_1.LegType.CENTAUR)
                    bonus = 50;
                // Naga = +20 capacity
                else if (this.body.legs.type === Legs_1.LegType.NAGA)
                    bonus = 20;
                const loosestVagina = this.body.vaginas.sort(Vagina_1.Vagina.LoosenessMost).get(0);
                const wettestVagina = this.body.vaginas.sort(Vagina_1.Vagina.WetnessMost).get(0);
                return (bonus + 8 * loosestVagina.looseness * loosestVagina.looseness) *
                    (1 + wettestVagina.wetness / 10);
            }
            return 0;
        }
        analCapacity() {
            let bonus = 0;
            // Centaurs = +30 capacity
            if (this.body.legs.type === Legs_1.LegType.CENTAUR)
                bonus = 30;
            if (this.body.butt.wetness > 0)
                bonus += 15;
            return ((bonus + 6 * this.body.butt.looseness * this.body.butt.looseness) * (1 + this.body.butt.wetness / 10));
        }
        // Calculate bonus virility rating!
        // anywhere from 5% to 100% of normal cum effectiveness thru herbs!
        virilityQ() {
            if (this.body.cocks.length > 0) {
                let percent = 0.01;
                if (this.cumQ() >= 250)
                    percent += 0.01;
                if (this.cumQ() >= 800)
                    percent += 0.01;
                if (this.cumQ() >= 1600)
                    percent += 0.02;
                if (this.effects.has(EffectType_1.EffectType.BroBody))
                    percent += 0.05;
                if (this.effects.has(EffectType_1.EffectType.MaraesGiftStud))
                    percent += 0.15;
                if (this.effects.has(EffectType_1.EffectType.FerasBoonAlpha))
                    percent += 0.10;
                const elvenBounty = this.effects.getByName(EffectType_1.EffectType.ElvenBounty);
                if (elvenBounty && elvenBounty.values.virility && elvenBounty.values.virility > 0)
                    percent += 0.05;
                if (this.effects.has(EffectType_1.EffectType.FertilityPlus))
                    percent += 0.03;
                if (this.effects.has(EffectType_1.EffectType.PiercedFertite))
                    percent += 0.03;
                if (this.effects.has(EffectType_1.EffectType.OneTrackMind))
                    percent += 0.03;
                if (this.effects.has(EffectType_1.EffectType.MagicalVirility))
                    percent += 0.05;
                if (this.effects.has(EffectType_1.EffectType.MessyOrgasms))
                    percent += 0.03;
                if (percent > 1)
                    percent = 1;
                return percent;
            }
            return 0;
        }
        // Calculate cum return
        cumQ() {
            if (this.body.cocks.length > 0) {
                let quantity = 0;
                // Base value is ballsize * ballQ * cumefficiency by a factor of 2.
                // Other things that affect it:
                // lust - 50% = normal output.  0 = half output. 100 = +50% output.
                const lustCoefficient = (this.stats.lust + 50) / 10;
                // Pilgrim's bounty maxxes lust coefficient
                if (this.body.balls.count === 0)
                    quantity = Math.floor(1.25 * 2 * this.body.cumMultiplier * 2 * lustCoefficient * (this.hoursSinceCum + 10) / 24) / 10;
                else
                    quantity = Math.floor(this.body.balls.size * this.body.balls.count * this.body.cumMultiplier * 2 * lustCoefficient * (this.hoursSinceCum + 10) / 24) / 10;
                if (quantity < 2)
                    quantity = 2;
                return quantity;
            }
            return 0;
        }
        lactationQ() {
            const chest = this.body.chest;
            if (chest.sort(BreastRow_1.BreastRow.LactationMost).get(0).lactationMultiplier < 1)
                return 0;
            // (Milk production TOTAL= breastSize x 10 * lactationMultiplier * breast total * milking-endurance (1- default, maxes at 2.  Builds over time as milking as done)
            // (Small – 0.01 mLs – Size 1 + 1 Multi)
            // (Large – 0.8 - Size 10 + 4 Multi)
            // (HUGE – 2.4 - Size 12 + 5 Multi + 4 tits)
            let total;
            total = chest.sort(BreastRow_1.BreastRow.Largest).get(0).rating * 10 * chest.reduce(BreastRow_1.BreastRow.AverageLactation, 0);
            return total;
        }
        isLactating() {
            return this.lactationQ() > 0 ? true : false;
        }
        // PC can fly?
        canFly() {
            // web also makes false!
            switch (this.body.wings.type) {
                case Wings_1.WingType.BAT_LIKE_LARGE:
                case Wings_1.WingType.BEE_LIKE_LARGE:
                case Wings_1.WingType.DRACONIC_LARGE:
                case Wings_1.WingType.FEATHERED_LARGE:
                case Wings_1.WingType.GIANT_DRAGONFLY:
                    return true;
                default:
                    return false;
            }
        }
        canGoIntoHeat() {
            return this.body.vaginas.length > 0 && !this.body.wombs.find(Womb_1.Womb.Pregnant);
        }
        canGoIntoRut() {
            return this.body.cocks.length > 0;
        }
        totalFertility() {
            return this.body.fertility;
        }
        totalXP() {
            const playerLevel = this.stats.level;
            // 1) Nerf xp gains by 20% per level after first two level difference
            // 2) No bonuses for underlevel!
            // 3) Super high level folks (over 10 levels) only get 1 xp!
            let difference = playerLevel - this.stats.level;
            if (difference <= 2)
                difference = 0;
            else
                difference -= 2;
            if (difference > 4)
                difference = 4;
            difference = (5 - difference) * 20.0 / 100.0;
            if (playerLevel - this.stats.level > 10)
                return 1;
            return Math.round(/*this.stats.additionalXP +*/ (this.baseXP() + this.bonusXP()) * difference);
        }
        baseXP() {
            return [200, 10, 20, 30, 40, 50, 55, 60, 66, 75,
                83, 85, 92, 100, 107, 115, 118, 121, 128, 135,
                145][Math.round(this.stats.level)] || 200;
        }
        bonusXP() {
            return SMath_1.randInt([200, 10, 20, 30, 40, 50, 55, 58, 66, 75,
                83, 85, 85, 86, 92, 94, 96, 98, 99, 101,
                107][Math.round(this.stats.level)] || 130);
        }
        regeneration() {
            let healingPercent = 0;
            if (healingPercent > 10)
                healingPercent = 10;
            this.stats.HP += Math.round(this.stats.maxHP * healingPercent / 100);
        }
        modCumMultiplier(delta) {
            if (delta === 0) {
                return delta;
            }
            this.body.cumMultiplier += delta;
            return delta;
        }
        orgasm() {
            this.stats.raw.lust = 0;
            this.hoursSinceCum = 0;
        }
        // commented out for reminder that isNaga can no longer be checked here
        hasLongTail() {
            if (this.body.legs.type === Legs_1.LegType.NAGA)
                return true;
            return this.body.tails.filter((tail) => {
                if (tail)
                    switch (tail.type) {
                        case Tail_1.TailType.DOG:
                        case Tail_1.TailType.DEMONIC:
                        case Tail_1.TailType.COW:
                        case Tail_1.TailType.SHARK:
                        case Tail_1.TailType.CAT:
                        case Tail_1.TailType.LIZARD:
                        case Tail_1.TailType.KANGAROO:
                        case Tail_1.TailType.FOX:
                        case Tail_1.TailType.DRACONIC:
                            return true;
                        default:
                            return false;
                    }
                return false;
            }).length > 0;
        }
        canOvipositSpider() {
            return this.body.ovipositor.canOviposit() && this.body.legs.isDrider() && this.body.tails.filter(Tail_1.Tail.FilterType(Tail_1.TailType.SPIDER_ABDOMEN)).length > 0;
        }
        canOvipositBee() {
            return this.body.ovipositor.canOviposit() && this.body.tails.filter(Tail_1.Tail.FilterType(Tail_1.TailType.BEE_ABDOMEN)).length > 0;
        }
        canLevelUp() {
            return this.stats.XP >= (this.stats.level) * 100;
        }
        roundXPToLevel() {
            return this.canLevelUp() ? this.stats.level * 100 : this.stats.XP;
        }
        slimeFeed() {
        }
        milked() {
        }
    }
    exports.Character = Character;
});
//# sourceMappingURL=Character.js.map