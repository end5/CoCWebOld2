﻿import { CharacterDescription } from './CharacterDescription';
import { Gender, GenderIdentity } from 'Engine/Body/GenderIdentity';
import { IBody, Body } from 'Engine/Body/Body';
import { Stats, IRawStats } from './Stats';
import { IEffect, Effect } from 'Engine/Effects/Effect';
import { ICharInv, CharacterInventory } from 'Engine/Inventory/CharacterInventory';
import { ISerializable } from 'Engine/Utilities/ISerializable';
import { CombatContainer } from 'Engine/Combat/CombatContainer';
import { generateUUID } from 'Engine/Utilities/Uuid';
import { EffectList } from 'Engine/Effects/EffectList';
import { CharacterType } from 'Content/Character/CharacterType';
import { Tail, TailType } from 'Engine/Body/Tail';
import { LegType } from 'Engine/Body/Legs';
import { Vagina } from 'Engine/Body/Vagina';
import { BreastRow } from 'Engine/Body/BreastRow';
import { WingType } from 'Engine/Body/Wings';
import { Womb } from 'Engine/Body/Pregnancy/Womb';
import { randInt } from 'Engine/Utilities/SMath';
import { EffectType } from 'Content/Effects/EffectType';
import { Weapon } from 'Engine/Items/Weapon';
import { Armor } from 'Engine/Items/Armor';

export interface ICharacter {
    type: string;
    UUID: string;
    partyUUID?: string;
    genderPref: Gender;
    body: IBody;
    stats: IRawStats;
    effects: IEffect[];
    inventory: ICharInv;
    hoursSinceCum: number;
}

interface ICharacterConstruction {
    type: string;
    unarmedWeapon: Weapon;
    baseArmor: Armor;
}

export abstract class Character implements ISerializable<ICharacter> {
    public charType: string;
    public readonly inventory: CharacterInventory;

    private UUID: string;
    public get uuid(): string {
        return this.UUID;
    }

    public partyUUID?: string;

    protected abstract description: CharacterDescription;
    public get desc(): CharacterDescription {
        return this.description;
    }

    protected abstract combatContainer: CombatContainer;
    public get combat(): CombatContainer {
        return this.combatContainer;
    }

    public genderManager = new GenderIdentity(this);

    public body = new Body();
    public stats = new Stats();
    public readonly effects = new EffectList();
    public hoursSinceCum = 0;

    public constructor(values: ICharacterConstruction) {
        this.charType = values.type;
        if (values.type !== CharacterType.Player) {
            this.stats.XP = this.totalXP();
        }
        this.UUID = generateUUID();
        this.inventory = new CharacterInventory(this, values.unarmedWeapon, values.baseArmor);
    }

    public get gender(): Gender {
        return this.genderManager.gender;
    }

    public get genderPref(): Gender {
        return this.genderManager.preference;
    }

    public set genderPref(gender: Gender) {
        this.genderManager.preference = gender;
    }

    public serialize(): ICharacter {
        const save: ICharacter = {
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

    public deserialize(saveObject: ICharacter) {
        this.charType = saveObject.type;
        this.UUID = saveObject.UUID;
        if (saveObject.partyUUID)
            this.partyUUID = saveObject.partyUUID;
        this.genderPref = saveObject.genderPref;
        this.body.deserialize(saveObject.body);
        this.stats.deserialize(saveObject.stats);
        this.effects.deserialize(saveObject.effects, Effect, this);
        this.inventory.deserialize(saveObject.inventory);
        this.hoursSinceCum = saveObject.hoursSinceCum;
    }

    public update(hours: number) {
        this.body.update(hours);
        this.regeneration();
    }

    public vaginalCapacity(): number {
        if (this.body.vaginas.length > 0) {
            let bonus: number = 0;
            // Centaurs = +50 capacity
            if (this.body.legs.type === LegType.CENTAUR)
                bonus = 50;
            // Naga = +20 capacity
            else if (this.body.legs.type === LegType.NAGA)
                bonus = 20;
            const loosestVagina = this.body.vaginas.sort(Vagina.LoosenessMost).get(0)!;
            const wettestVagina = this.body.vaginas.sort(Vagina.WetnessMost).get(0)!;

            return (bonus + 8 * loosestVagina.looseness * loosestVagina.looseness) *
                (1 + wettestVagina.wetness / 10);
        }
        return 0;
    }

    public analCapacity(): number {
        let bonus: number = 0;
        // Centaurs = +30 capacity
        if (this.body.legs.type === LegType.CENTAUR)
            bonus = 30;
        if (this.body.butt.wetness > 0)
            bonus += 15;
        return ((bonus + 6 * this.body.butt.looseness * this.body.butt.looseness) * (1 + this.body.butt.wetness / 10));
    }

    // Calculate bonus virility rating!
    // anywhere from 5% to 100% of normal cum effectiveness thru herbs!
    public virilityQ(): number {
        if (this.body.cocks.length > 0) {
            let percent: number = 0.01;
            if (this.cumQ() >= 250)
                percent += 0.01;
            if (this.cumQ() >= 800)
                percent += 0.01;
            if (this.cumQ() >= 1600)
                percent += 0.02;
            if (this.effects.has(EffectType.BroBody))
                percent += 0.05;
            if (this.effects.has(EffectType.MaraesGiftStud))
                percent += 0.15;
            if (this.effects.has(EffectType.FerasBoonAlpha))
                percent += 0.10;
            const elvenBounty =  this.effects.getByName(EffectType.ElvenBounty);
            if (elvenBounty && elvenBounty.values.virility && elvenBounty.values.virility > 0)
                percent += 0.05;
            if (this.effects.has(EffectType.FertilityPlus))
                percent += 0.03;
            if (this.effects.has(EffectType.PiercedFertite))
                percent += 0.03;
            if (this.effects.has(EffectType.OneTrackMind))
                percent += 0.03;
            if (this.effects.has(EffectType.MagicalVirility))
                percent += 0.05;
            if (this.effects.has(EffectType.MessyOrgasms))
                percent += 0.03;
            if (percent > 1)
                percent = 1;
            return percent;
        }
        return 0;
    }

    // Calculate cum return
    public cumQ(): number {
        if (this.body.cocks.length > 0) {
            let quantity: number = 0;
            // Base value is ballsize * ballQ * cumefficiency by a factor of 2.
            // Other things that affect it:
            // lust - 50% = normal output.  0 = half output. 100 = +50% output.
            const lustCoefficient: number = (this.stats.lust + 50) / 10;
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

    public lactationQ(): number {
        const chest = this.body.chest;
        if (chest.sort(BreastRow.LactationMost).get(0)!.lactationMultiplier < 1)
            return 0;
        // (Milk production TOTAL= breastSize x 10 * lactationMultiplier * breast total * milking-endurance (1- default, maxes at 2.  Builds over time as milking as done)
        // (Small – 0.01 mLs – Size 1 + 1 Multi)
        // (Large – 0.8 - Size 10 + 4 Multi)
        // (HUGE – 2.4 - Size 12 + 5 Multi + 4 tits)
        let total: number;
        total = chest.sort(BreastRow.Largest).get(0)!.rating * 10 * chest.reduce(BreastRow.AverageLactation, 0);
        return total;
    }

    public isLactating(): boolean {
        return this.lactationQ() > 0 ? true : false;
    }

    // PC can fly?
    public canFly(): boolean {
        // web also makes false!
        switch (this.body.wings.type) {
            case WingType.BAT_LIKE_LARGE:
            case WingType.BEE_LIKE_LARGE:
            case WingType.DRACONIC_LARGE:
            case WingType.FEATHERED_LARGE:
            case WingType.GIANT_DRAGONFLY:
                return true;
            default:
                return false;
        }
    }

    public canGoIntoHeat() {
        return this.body.vaginas.length > 0 && !this.body.wombs.find(Womb.Pregnant);
    }

    public canGoIntoRut(): boolean {
        return this.body.cocks.length > 0;
    }

    public totalFertility(): number {
        return this.body.fertility;
    }

    private totalXP(): number {
        const playerLevel = this.stats.level;
        // 1) Nerf xp gains by 20% per level after first two level difference
        // 2) No bonuses for underlevel!
        // 3) Super high level folks (over 10 levels) only get 1 xp!
        let difference: number = playerLevel - this.stats.level;
        if (difference <= 2) difference = 0;
        else difference -= 2;
        if (difference > 4) difference = 4;
        difference = (5 - difference) * 20.0 / 100.0;
        if (playerLevel - this.stats.level > 10) return 1;
        return Math.round(/*this.stats.additionalXP +*/(this.baseXP() + this.bonusXP()) * difference);
    }

    private baseXP(): number {
        return [200, 10, 20, 30, 40, 50, 55, 60, 66, 75, // 0-9
            83, 85, 92, 100, 107, 115, 118, 121, 128, 135, // 10-19
            145][Math.round(this.stats.level)] || 200;
    }

    private bonusXP(): number {
        return randInt([200, 10, 20, 30, 40, 50, 55, 58, 66, 75,
            83, 85, 85, 86, 92, 94, 96, 98, 99, 101,
            107][Math.round(this.stats.level)] || 130);
    }

    private regeneration() {
        let healingPercent = 0;
        if (healingPercent > 10) healingPercent = 10;
        this.stats.HP += Math.round(this.stats.maxHP * healingPercent / 100);
    }

    public modCumMultiplier(delta: number): number {
        if (delta === 0) {
            return delta;
        }
        this.body.cumMultiplier += delta;
        return delta;
    }

    public orgasm(): void {
        this.stats.raw.lust = 0;
        this.hoursSinceCum = 0;
    }

    // commented out for reminder that isNaga can no longer be checked here
    public hasLongTail(): boolean {
        if (this.body.legs.type === LegType.NAGA)
            return true;
        return this.body.tails.filter((tail) => {
            if (tail)
                switch (tail.type) {
                    case TailType.DOG:
                    case TailType.DEMONIC:
                    case TailType.COW:
                    case TailType.SHARK:
                    case TailType.CAT:
                    case TailType.LIZARD:
                    case TailType.KANGAROO:
                    case TailType.FOX:
                    case TailType.DRACONIC:
                        return true;
                    default:
                        return false;
                }
            return false;
        }).length > 0;
    }

    public canOvipositSpider(): boolean {
        return this.body.ovipositor.canOviposit() && this.body.legs.isDrider() && this.body.tails.filter(Tail.FilterType(TailType.SPIDER_ABDOMEN)).length > 0;
    }

    public canOvipositBee(): boolean {
        return this.body.ovipositor.canOviposit() && this.body.tails.filter(Tail.FilterType(TailType.BEE_ABDOMEN)).length > 0;
    }

    public canLevelUp(): boolean {
        return this.stats.XP >= (this.stats.level) * 100;
    }

    public roundXPToLevel(): number {
        return this.canLevelUp() ? this.stats.level * 100 : this.stats.XP;
    }

    public slimeFeed() {

    }

    public milked() {

    }
}
