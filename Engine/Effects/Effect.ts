import { EffectDesc } from './EffectDesc';
import { ISerializable } from 'Engine/Utilities/ISerializable';
import { EffectDescLib } from './EffectDescLib';
import { Character } from 'Engine/Character/Character';
import { CombatActionType } from 'Engine/Combat/Actions/CombatActionType';

export interface IEffectValue {
    blockedTypes?: CombatActionType;
    [key: string]: any;
}

export interface IEffect<T = string, V extends IEffectValue = {}> {
    type: T;
    values?: V;
}

export class Effect<T extends string = string, V extends IEffectValue = {}> implements ISerializable<IEffect<T, V>> {
    private effectType: T;
    public readonly desc: EffectDesc;
    private effectValues: V;

    public constructor(type: T, values?: V) {
        this.effectType = type;
        this.desc = EffectDescLib.get(name);
        this.effectValues = values ? values : {} as V;
    }

    public get values() {
        return this.effectValues;
    }

    public get type(): T {
        return this.effectType;
    }

    public combatStart(char: Character): void { }
    public combatTurnStart(char: Character, ...enemies: Character[]): void { }
    public combatTurnEnd(char: Character, ...enemies: Character[]): void { }
    public combatEnd(char: Character): void { }

    public serialize(): IEffect<T, V> {
        if (Object.keys(this.values).length > 0)
            return {
                type: this.effectType,
                values: this.values
            };
        else
            return { type: this.effectType };
    }

    public deserialize(saveObject: IEffect<T, V>) {
        this.effectType = saveObject.type;
        if (saveObject.values)
            this.effectValues = saveObject.values;
    }
}
