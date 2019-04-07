import { CharacterDescription } from './CharacterDescription';
import { Gender, GenderIdentity } from 'Engine/Body/GenderIdentity';
import { IBody, Body } from 'Engine/Body/Body';
import { Stats, IRawStats } from './Stats';
import { IEffect, Effect } from 'Engine/Effects/Effect';
import { ICharInv, CharacterInventory } from 'Engine/Inventory/CharacterInventory';
import { ISerializable } from 'Engine/Utilities/ISerializable';
import { CombatContainer } from 'Engine/Combat/CombatContainer';
import { generateUUID } from 'Engine/Utilities/Uuid';
import { EffectList, IEffectValueMap } from 'Engine/Effects/EffectList';

export interface ICharacter<V extends IEffectValueMap> {
    type: string;
    UUID: string;
    partyUUID?: string;
    genderPref: Gender;
    body: IBody;
    stats: IRawStats;
    effects: IEffect<string, V[string]>[];
    inventory: ICharInv;
    hoursSinceCum: number;
}

export abstract class Character<V extends IEffectValueMap = any> implements ISerializable<ICharacter<V>> {
    public charType: string;
    public abstract readonly inventory: CharacterInventory;

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

    public genderManager: GenderIdentity;

    public body = new Body();
    public stats = new Stats();
    public readonly effects = new EffectList<V>();
    public hoursSinceCum = 0;

    public constructor(type: string) {
        this.charType = type;
        this.UUID = generateUUID();
        this.genderManager = new GenderIdentity(this.body);
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

    public serialize(): ICharacter<V> {
        const save: ICharacter<V> = {
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

    public deserialize(saveObject: ICharacter<V>) {
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
}
